# Midnight Pangolin

[![Midnight Network](https://img.shields.io/badge/Midnight-Network-blue?style=for-the-badge)](https://midnight.io)
[![Compact](https://img.shields.io/badge/Compact-Language-2ea44f?style=for-the-badge)](https://docs.midnight.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-68a063?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/M-kip/Midnight-Pangolin?style=for-the-badge)](https://github.com/M-kip/Midnight-Pangolin/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/M-kip/Midnight-Pangolin?style=for-the-badge)](https://github.com/M-kip/Midnight-Pangolin/network/members)

> A three‑party escrow smart contract for the **Midnight Network**, written in the **Compact** language. It coordinates a seller, a buyer, and a logistics provider through a privacy‑preserving deposit → pickup → delivery → settlement flow, with timeout and dispute handling.

---

## Table of Contents

- [Overview](#overview)
- [Escrow Model](#escrow-model)
- [State Machine & Lifecycle](#state-machine--lifecycle)
- [End-to-End Walkthrough](#end-to-end-walkthrough)
- [Project Structure](#project-structure)
- [Smart Contract Reference](#smart-contract-reference)
  - [Types](#types)
  - [Ledger State](#ledger-state)
  - [Circuits](#circuits)
  - [Witnesses](#witnesses)
- [Privacy & Disclosure Design](#privacy--disclosure-design)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
- [Compiled Contract Artifacts](#compiled-contract-artifacts)
- [API Package (`@midnight-pangolin/escrow3party-api`)](#api-package-midnight-pangolin-escrow3party-api)
- [Deployment](#deployment)
- [Tooling](#tooling)
- [Limitations & Notes](#limitations--notes)
- [Contributing](#contributing)
- [License](#license)
- [Resources](#resources)

---

## Overview

**Midnight Pangolin** is a self‑contained Compact contract (`escrow3party.compact`) that implements a
trust‑minimized escrow between **three** parties instead of the usual two:

- a **Seller**, who lists goods and puts up collateral,
- a **Buyer**, who funds the purchase and a security deposit, and
- a **Logistics** provider, who transports the goods and stakes collateral.

Funds stay locked in the contract until either the buyer confirms delivery (with a secret‑based ZK
proof) or a timeout/dispute path resolves the escrow and redistributes the staked amounts.

The repository is a **monorepo** of two npm packages that work together:

- [`contract/`](contract/) → `@midnight-pangolin/escrow3party` — the Compact contract, its compiled
  zero‑knowledge artifacts, and the witness implementations (the on‑chain layer).
- [`api/`](api/) → `@midnight-pangolin/escrow3party-api` — a TypeScript SDK that wraps a
  deployed/found contract in a typed, promise‑based façade (the off‑chain integration layer).

Together they form a ready‑to‑wire foundation for a Midnight DApp.

---

## Escrow Model

Each party joins sequentially and locks a stake. Two secrets underpin the physical hand‑offs:

| Secret | Origin | Committed at init by | Proved by | Advances state to |
|--------|--------|----------------------|-----------|-------------------|
| Pickup secret | Seller | Seller (`pickupSecret()` witness) | `confirmPickup` (logistics) | `IN_TRANSIT` |
| Delivery secret | Buyer (shared with seller off‑chain) | Seller (`deliverySecret()` witness) | `confirmDelivery` (buyer) | `DELIVERED` → `RESOLVED` |

The seller supplies **both** secret values to `sellerInitialize` via the `pickupSecret()` and
`deliverySecret()` witnesses: the pickup secret is the seller's own, while the delivery secret is
the buyer's, shared with the seller off‑chain beforehand. Logistics later learns the raw pickup
secret off‑chain from the seller; proving knowledge of it (without revealing it on‑chain) lets
logistics mark the goods as picked up. The buyer proves knowledge of the delivery secret to settle.

Stakes and payments are described by an immutable `EscrowTerms` struct set once at initialization.

---

## State Machine & Lifecycle

```text
            constructor()
                 │
                 ▼
         UNINITIALIZED
                 │  sellerInitialize(terms, pickupSecret, deliverySecret)
                 ▼
       SELLER_DEPOSITED
                 │  buyerDeposit()
                 ▼
       BUYER_DEPOSITED
                 │  logisticsDeposit()
                 ▼
     LOGISTICS_DEPOSITED
                 │  confirmPickup(pickupSecret)
                 ▼
            IN_TRANSIT ──────────────────────────┬───────────────────────────┐
                 │                                 │ raiseDispute(reason)      │ triggerTimeout()
                 │                                 │ (buyer)                    │ (buyer/seller, after
                 │                                 ▼                            │  deadline, undelivered)
                 │                            DISPUTED                         ▼
                 │                                 │ resolveDispute(res, sig) EXPIRED
                 │                                 ▼                            │
                 │                             RESOLVED  ◄───────────────── RESOLVED
                 │  confirmDelivery(deliverySecret)
                 ▼
            DELIVERED  (transient)
                 │  sellerRaiseDispute(reason) ───► DISPUTED  (see above)
                 ▼
             RESOLVED
```

**Happy path:** `sellerInitialize` → `buyerDeposit` → `logisticsDeposit` → `confirmPickup` →
`confirmDelivery` → `RESOLVED`.

**Timeout path:** from `IN_TRANSIT`, once the `deliveryDeadline` block height has passed and the
buyer has *not* confirmed delivery, `triggerTimeout()` slashes the logistics stake and splits it
between buyer and seller, then transitions to `RESOLVED`.

**Dispute path:** from `IN_TRANSIT` (buyer) or `DELIVERED` (seller), `raiseDispute` /
`sellerRaiseDispute` move the contract to `DISPUTED`. A mediator resolves it via `resolveDispute`,
which supports four outcomes:

| Resolution | Meaning | Winner(s) |
|-----------|---------|-----------|
| `0` | Goods as described | Seller |
| `1` | Goods not as described | Buyer |
| `2` | Buyer refused a valid delivery | Logistics |
| `3` | Partial fault | Split between buyer & seller |

`DELIVERED` and `EXPIRED` are transient: the circuits that enter them immediately transition to
`RESOLVED` in the same call.

---

## End-to-End Walkthrough

A typical successful trade, mapping each on‑chain step to the circuit that performs it:

1. **Deploy** — `constructor()` leaves the contract in `UNINITIALIZED`.
2. **Seller initializes** (`sellerInitialize`) — the seller supplies the `EscrowTerms`, the pickup
   secret, and the buyer's delivery secret (shared off‑chain beforehand) via witnesses. The seller's
   address is derived from `localSellerKey`, and the secret hashes are committed. → `SELLER_DEPOSITED`.
3. **Buyer deposits** (`buyerDeposit`) — registers the buyer (address derived from `localBuyerKey`)
   and records the buyer's stake per the terms. → `BUYER_DEPOSITED`.
4. **Logistics deposits** (`logisticsDeposit`) — registers the logistics provider (address from
   `localLogisticsKey`) and records its stake. → `LOGISTICS_DEPOSITED`.
5. **Pickup** (`confirmPickup`) — logistics proves knowledge of the seller's pickup secret (ZK);
   the goods are marked in transit. → `IN_TRANSIT`.
6. **Delivery** (`confirmDelivery`) — the buyer proves knowledge of the delivery secret *before* the
   deadline; the delivery distribution is computed and the escrow settles. → `DELIVERED` → `RESOLVED`.

If something goes wrong instead:

- **Timeout** — once `deliveryDeadline` passes with no delivery, a buyer or seller calls
  `triggerTimeout()` → `EXPIRED` → `RESOLVED` (the logistics stake is slashed and split).
- **Dispute** — a buyer calls `raiseDispute` from `IN_TRANSIT`; a mediator then calls
  `resolveDispute(resolution, mediatorSig)` to settle with outcome `0..3` → `RESOLVED`.

> Actual coin movement is out of scope in the current implementation — the distribution circuits
> *compute* what each party is owed, but settlement is represented by the state transition to
> `RESOLVED`. See [Limitations & Notes](#limitations--notes).

---

## Project Structure

```
.
├─ contract/                         # On-chain package (@midnight-pangolin/escrow3party)
│  ├─ src/
│  │  ├─ escrow3party.compact        # Compact source for the 3-party escrow contract
│  │  ├─ witnesses.ts                # TypeScript witness implementations
│  │  ├─ index.ts                    # Public entry: bindings + CompiledContract
│  │  └─ managed/                    # Generated by `compact compile` (committed)
│  │     └─ escrow3party/
│  │        ├─ contract/             # JS/TS bindings (index.js, index.d.ts)
│  │        ├─ keys/                 # Prover/verifier keys per circuit
│  │        └─ zkir/                 # ZKIR circuit descriptions
│  ├─ package.json                   # Build, lint, test, compile scripts
│  ├─ tsconfig.json
│  └─ tsconfig.build.json
├─ api/                              # Off-chain SDK (@midnight-pangolin/escrow3party-api)
│  ├─ src/
│  │  ├─ index.ts                    # Escrow3PartyApi + Escrow3PartyApiInstance
│  │  ├─ common-types.ts             # Shared contract/runtime types & EscrowDerivedState
│  │  └─ utils/index.ts              # randomBytes() CSPRNG helper
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ tsconfig.build.json
├─ LICENSE                           # GNU General Public License v3.0
├─ README.md                         # ← This file
└─ package-lock.json
```

> The `contract/src/managed/` directory is generated by the compiler. It is committed here so the
> package can be consumed without recompiling the ZK artifacts.
>
> The `api/` package imports the compiled contract types from `../../contract/src/index` via a
> relative path — there is no npm workspace yet, so the `contract/` source must exist as a sibling
> (and `npm run compact` run) for `api/` to type‑check and build.

---

## Smart Contract Reference

All declarations below are taken directly from `contract/src/escrow3party.compact`.

### Types

```compact
enum EscrowState { UNINITIALIZED, SELLER_DEPOSITED, BUYER_DEPOSITED,
                   LOGISTICS_DEPOSITED, IN_TRANSIT, DELIVERED,
                   DISPUTED, RESOLVED, EXPIRED }

enum PartyRole { SELLER, BUYER, LOGISTICS }

enum DisputeReason { NONE, GOODS_NOT_AS_DESCRIBED, LOGISTICS_THEFT,
                     LOGISTICS_LATE, BUYER_REFUSAL }

struct PartyInfo { address: Bytes<32>, stake: Field, deposited: Boolean, pubKeyHash: Bytes<32> }

struct EscrowTerms {
  goodsHash: Bytes<32>,            // Hash of goods manifest (immutable)
  paymentAmount: Uint<64>,         // Purchase price + logistics fee
  paymentAmountSplit: Uint<64>,    // Split payment amount for a "split" dispute
  sellerStake: Uint<64>,           // Seller collateral
  buyerStake: Uint<64>,            // Buyer security deposit
  logisticsStake: Uint<64>,        // Logistics collateral
  logisticsStakeTimeOut: Uint<64>, // Logistics stake split on timeout
  deliveryDeadline: Uint<64>,      // Block-height deadline
  logisticsFee: Uint<64>           // Fee paid to the logistics provider
}

struct DisputeInfo {
  raisedBy: PartyRole, reason: DisputeReason, raisedAt: Field,
  resolved: Boolean, resolution: Uint<64>   // 0..3, see dispute table above
}
```

### Ledger State

| Ledger | Type | Meaning |
|--------|------|---------|
| `state` | `EscrowState` | Current lifecycle phase |
| `terms` | `EscrowTerms` | Immutable deal parameters |
| `seller` / `buyer` / `logistics` | `PartyInfo` | Per‑party address, stake, deposit flag, key hash |
| `dispute` | `DisputeInfo` | Active/last dispute details |
| `pickupSecretHash` | `Bytes<32>` | Seller‑committed pickup commitment |
| `deliverySecretHash` | `Bytes<32>` | Buyer‑committed delivery commitment |
| `pickupConfirmed` | `Boolean` | Whether logistics proved pickup |
| `deliveryConfirmed` | `Boolean` | Whether buyer confirmed delivery |
| `sequence` | `Counter` | Monotonic counter for key derivation |

### Circuits

**Setup & deposits**
- `constructor()` — resets to `UNINITIALIZED` and initializes empty party/dispute records.
- `sellerInitialize(escrow3: EscrowTerms, pickupSecretHashInput: Bytes<32>, deliverySecretHashInput: Bytes<32>)` — validates the terms and commits seller info, secret hashes, and the `EscrowTerms`. Requires positive stakes/fees and a future deadline. → `SELLER_DEPOSITED`.
- `buyerDeposit()` — locks the buyer's stake and registers the buyer. → `BUYER_DEPOSITED`.
- `logisticsDeposit()` — locks the logistics stake and registers the provider. → `LOGISTICS_DEPOSITED`.

**Physical hand‑off & settlement**
- `confirmPickup(pickupSecretInput: Bytes<32>)` — logistics proves the seller's pickup secret. → `IN_TRANSIT`.
- `confirmDelivery(deliverySecretInput: Bytes<32>)` — buyer proves the delivery secret (must be before the deadline). Computes the delivery distribution, then → `DELIVERED` → `RESOLVED`.
- `triggerTimeout()` — buyer/seller after the deadline, if not delivered. Slashes logistics and → `EXPIRED` → `RESOLVED`.

**Dispute resolution**
- `raiseDispute(reason: DisputeReason)` — buyer, from `IN_TRANSIT`/`DELIVERED`. → `DISPUTED`.
- `sellerRaiseDispute(reason: DisputeReason)` — seller, from `DELIVERED`. → `DISPUTED`.
- `resolveDispute(resolution: Uint<64>, mediatorSig: Bytes<32>)` — mediator sets the outcome (`0..3`). → `RESOLVED`.

**Admin**
- `emergencyPause()` — any deposited party may signal an emergency pause (placeholder; emits no state change in the current implementation).

**View (read‑only) circuits**
`getState`, `getTerms`, `getSeller`, `getBuyer`, `getLogistics`, `getDispute`, `isPickupConfirmed`,
`isDeliveryConfirmed`, `isDeadlinePassed`, `getCurrentBlockHeight`, `getSequence`.

**Helpers**
`publicKey(sk, seq)`, `currentBlockHeight()`, `deadlinePassed()`, `checkDeadline(isPastDeadline)`,
`splitTimeoutStake(buyerShare, sellerShare)`, `calculatePickupSecretHash(secret)`,
`calculateDeliverySecretHash(secret)`, `verifyPickupSecret(secret)`, `verifyDeliverySecret(secret)`,
plus the internal distribution calculators `computeDeliveryDistribution`,
`computeTimeoutDistribution`, and `computeDisputeDistribution`.

### Witnesses

The contract relies on the following witnesses to supply private inputs at proof time:

`localSellerKey`, `localBuyerKey`, `localLogisticsKey` (party secret keys), `pickupSecret` and
`deliverySecret` (the raw pickup/delivery secrets committed at initialization), `escrow3PartyTerms`
(witnessed `EscrowTerms` for `sellerInitialize`), and `mediatorKey` (used by `resolveDispute`).

> **Note:** `sellerInitialize` still declares `pickupSecretHashInput` / `deliverySecretHashInput`
> parameters, but it actually reads the secrets from the `pickupSecret()` / `deliverySecret()`
> witnesses — the parameters are currently unused.

---

## Privacy & Disclosure Design

- **Address derivation.** A party's on‑chain address is `publicKey(sk, seq) =
  persistentHash(["escrow:pk:", seq, sk])`. The secret key never leaves the witness; only the
  derived address is disclosed and compared against the registered `PartyInfo.address`.
- **Secret commitments.** Pickup and delivery secrets are committed as hashes at initialization and
  later verified with a ZK proof of knowledge (`verifyPickupSecret` / `verifyDeliverySecret`). The
  raw secrets are never disclosed on‑chain.
- **Selective disclosure.** Ledger writes wrap values in `disclose(...)` so only the fields that
  must be public (addresses, terms, secret hashes) are revealed; everything else stays private.
- **Block‑height proxy.** `currentBlockHeight()` returns `sequence` (the `Counter` ledger) cast to a
  `Uint<64>`. In a live network this is replaced by the actual block height; in the test harness the
  counter stands in for it. `deliveryDeadline` is therefore expressed in the same units.

A representative snippet of the privacy‑preserving core:

```compact
// Derive a party's on-chain address from their secret key and the sequence counter
export circuit publicKey(sk: Bytes<32>, seq: Bytes<32>): Bytes<32> {
  return persistentHash<Vector<3, Bytes<32>>>([pad(32, "escrow:pk:"), seq, sk]);
}

// Logistics proves possession of the seller's off-chain pickup secret (ZK)
export circuit confirmPickup(pickupSecretInput: Bytes<32>): [] {
  assert(state == EscrowState.LOGISTICS_DEPOSITED, "All parties must deposit first");
  assertLogistics();
  assert(!pickupConfirmed, "Pickup already confirmed");
  assert(verifyPickupSecret(disclose(pickupSecretInput)), "Invalid pickup secret");
  pickupConfirmed = true;
  state = EscrowState.IN_TRANSIT;
}
```

---

## Getting Started

### Prerequisites

| Tool | Minimum Version | Notes |
|------|-----------------|-------|
| Node.js | 20.x | `nvm install 20 && nvm use 20` |
| npm | 10.x | Bundled with Node 20 |
| `compact` CLI | latest | The Midnight Compact compiler |

> Verify the compiler with `compact --version`. The contract uses `pragma language_version 0.23;`.

### Installation

```bash
# Clone the repository
git clone https://github.com/M-kip/Midnight-Pangolin.git
cd Midnight-Pangolin

# Install dependencies for the on-chain contract package
cd contract
npm ci

# Install dependencies for the off-chain API package
cd ../api
npm ci
```

> The `api/` package imports the compiled contract types via a relative path
> (`../../contract/src/index`), so the `contract/` source must be present as a sibling (and
> `npm run compact` run in `contract/`) before `api/` can type‑check and build.

---

## Development

Both packages run their own scripts from inside their respective directories.

**`contract/` — the Compact contract + ZK artifacts:**

| Command | Description |
|---------|-------------|
| `npm run compact` | Compile `src/escrow3party.compact` into `src/managed/escrow3party` (ZK artifacts + bindings). |
| `npm run typecheck` | Type‑check the TypeScript sources (`tsc -p tsconfig.json --noEmit`). |
| `npm run lint` | Lint the sources with ESLint. |
| `npm test` | Run the Vitest test suite. |
| `npm run build` | Clean build: `tsc` to `dist/`, then copy `managed/` and the `.compact` source. |
| `npm run ci` | Full pipeline: `compact` → `typecheck` → `lint` → `build` → `test`. |

```bash
cd contract

# Compile the contract and generate prover/verifier keys + ZKIR
npm run compact

# Type-check, lint, and test
npm run typecheck
npm run lint
npm test

# Produce the distributable package
npm run build
```

**`api/` — the TypeScript SDK:**

| Command | Description |
|---------|-------------|
| `npm run typecheck` | Type‑check the SDK sources (`tsc -p tsconfig.json --noEmit`). |
| `npm run lint` | Lint the SDK with ESLint. |
| `npm run build` | Build to `dist/` (`tsc --project tsconfig.build.json`). |
| `npm run ci` | Pipeline: `typecheck` → `lint` → `build`. |

```bash
cd api

# Type-check, lint, and build the SDK
npm run typecheck
npm run lint
npm run build
```

---

## Compiled Contract Artifacts

Running `npm run compact` writes the compiler output under
`contract/src/managed/escrow3party/`:

- `contract/index.js` and `contract/index.d.ts` — JavaScript/TypeScript bindings for every circuit
  (provers, verifiers, and the `Witnesses` type used to supply private inputs).
- `keys/` — one `.prover` / `.verifier` pair per circuit (e.g. `sellerInitialize.prover`,
  `confirmPickup.verifier`).
- `zkir/` — the `.zkir` / `.bzkir` circuit descriptions used to generate and check proofs.

These artifacts are committed so the package (`@midnight-pangolin/escrow3party`) can be imported by a
Midnight DApp or deployment script without recompiling the ZK circuit. `npm run build` copies this
`managed/` directory into `dist/` alongside the compiled TypeScript.

---

## API Package (`@midnight-pangolin/escrow3party-api`)

The `api/` package is the **off‑chain integration layer**. It wraps a deployed or found escrow
contract in a typed, promise‑based façade whose method names mirror the contract's impure circuits:

- **Writes** are driven through `deployedContract.callTx.<circuit>(...)` — each mutating method
  submits a transaction and logs its `txId`.
- **Reads** are served by the `state$` observable, which projects the full on‑chain `Ledger` into a
  UI‑friendly `EscrowDerivedState`.

### `Escrow3PartyApi` (interface)

```typescript
interface Escrow3PartyApi {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<EscrowDerivedState>;

  sellerInitialize(escrowTerms: EscrowTerms): Promise<void>;   // PHASE 1 — seller commits terms + stake
  buyerDeposit(): Promise<void>;                               // PHASE 2 — buyer deposits
  logisticsDeposit(): Promise<void>;                           // PHASE 3 — logistics stakes collateral
  confirmPickup(pickupSecret: Uint8Array): Promise<void>;      // PHASE 4A — logistics proves pickup
  confirmDelivery(deliverySecret: Uint8Array): Promise<void>;  // PHASE 4B — buyer proves delivery
  triggerTimeout(): Promise<void>;                            // ESCALATION 1 — timeout payout
  raiseDispute(reason: DisputeReason): Promise<void>;         // ESCALATION 2 — buyer dispute
  sellerRaiseDispute(reason: DisputeReason): Promise<void>;   // ESCALATION 3 — seller dispute
  resolveDispute(resolution: bigint, mediatorSig: Uint8Array): Promise<void>; // ARBITRATION
  splitTimeoutStake(buyerShare: bigint, sellerShare: bigint): Promise<void>; // TIMEOUT MATH
  emergencyPause(): Promise<void>;                            // ADMIN
}
```

### `Escrow3PartyApiInstance` (class)

Implements `Escrow3PartyApi`. Constructed with a `deployedContract`, an `EscrowProviders` bundle,
and a `pino` `Logger`:

```typescript
new Escrow3PartyApiInstance(deployedContract, providers, logger);
```

Its `state$` maps each `[ledger]` emission into:

```typescript
{ ledger, sequence, escrowState: ledger.state, isInitialized: ledger.state !== EscrowState.UNINITIALIZED }
```

### Shared types (`common-types.ts`)

| Export | Meaning |
|--------|---------|
| `escrowPrivateStateKey` | Storage key (`"escrowPrivateState"`) for the off‑chain private state. |
| `PrivateStates` / `PrivateStateId` | Map of private‑state ids to `EscrowPrivateState`. |
| `EscrowContract` | `Contract<EscrowPrivateState, Witnesses<EscrowPrivateState>>`. |
| `EscrowCircuitKeys` | Impure circuit names that can be called. |
| `EscrowProviders` | `MidnightProviders<EscrowCircuitKeys, PrivateStateId, EscrowPrivateState>`. |
| `DeployedEscrowContract` | A deployed/joined `FoundContract<EscrowContract>`. |
| `EscrowDerivedState` | `{ ledger, sequence, escrowState, isInitialized }`. |

### Utility (`utils/index.ts`)

`randomBytes(length: number): Uint8Array` — returns `length` cryptographically random bytes via
`crypto.getRandomValues` (useful for seeds, salts, and secret generation).

> **Relationship to the contract.** `api/` reads the compiled `Ledger`, circuit, witness, and
> private‑state types from `../../contract/src/index` through a relative import. It does **not**
> depend on `@midnight-pangolin/escrow3party` via npm, so the `contract/` source must be present as
> a sibling (and compiled) for `api/` to type‑check and build.

---

## Deployment

This repository provides the **on‑chain contract** (`contract/`) and the **off‑chain SDK**
(`api/`) that drives it; it does not yet ship a standalone deployment script or a DApp front‑end.
To deploy, you will need a running **Midnight node / devnet** and a harness that:

1. compiles the contract (`npm run compact` in `contract/`) to produce the prover/verifier keys and
   ZKIR under `contract/src/managed/escrow3party/`, then
2. uses the `api/` package — specifically `Escrow3PartyApi` / `Escrow3PartyApiInstance` — to
   `deployContract` / `joinContract` and call the escrow circuits from application code.

The `api/` package is the intended integration surface; wire your deploy/join logic and UI against
its façade once a deployment harness exists.

---

## Tooling

| Tool | Purpose | Reference |
|------|---------|-----------|
| `compact` / `compactc` | Compile `.compact` to Midnight bytecode, ZKIR, and keys | Midnight Compact docs |
| ESLint | Lint TypeScript sources | `npm run lint` |
| Vitest | Unit/integration tests | `npm test` |
| TypeScript | Type checking & build | `npm run typecheck`, `npm run build` |

The verification and quality agents available in this environment (`midnight-verify`,
`midnight-cq`, `compact-core`) can be used to compile, type‑check, and verify the contract and its
witness interface.

---

## Limitations & Notes

- **Funds are modeled, not moved.** The distribution circuits (`computeDeliveryDistribution`,
  `computeTimeoutDistribution`, `computeDisputeDistribution`) *calculate* the amounts each party is
  due, but the current implementation only updates ledger state and transitions to `RESOLVED`. Actual
  value transfer / coin management would be added in a production deployment.
- **Mediator is simplified.** `resolveDispute` derives a mediator public key from `mediatorKey` but
  does not yet verify a signature over the dispute; the comment in the source marks this as a
  production TODO (ZK proof or multi‑sig).
- **Timeout split helper is unused.** `splitTimeoutStake` exists to prove the buyer/seller shares
  sum to the logistics stake, but `triggerTimeout` currently uses `logisticsStakeTimeOut` directly.
- **Block height is a counter.** `currentBlockHeight()` reads the `sequence` ledger as a stand‑in for
  the real block height in the test environment.
- **Seller disputes are effectively unreachable.** `sellerRaiseDispute` guards on
  `state == DELIVERED`, but `confirmDelivery` transitions `DELIVERED → RESOLVED` within the same call,
  so the contract never persists in `DELIVERED`. `raiseDispute` also accepts `DELIVERED`, yet no
  circuit leaves the contract parked there. As written, disputes can only originate from `IN_TRANSIT`.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Make your changes in the relevant package(s) — `contract/` for the on‑chain contract, `api/` for
   the off‑chain SDK — and add/adjust tests.
4. Run the full pipeline for each package you touched:

   ```bash
   cd contract && npm run ci
   cd api && npm run ci
   ```

5. Commit and open a Pull Request with a concise description and any related issue references.

> Ensure `npm run lint` and `npm test` pass before submitting.

---

## License

Distributed under the **GNU General Public License v3.0** — see the `LICENSE` file.

> **Heads‑up:** the `LICENSE` file is **GPL‑3.0**, but the source headers are inconsistent with it
> and with each other. `api/package.json` and `api/src/index.ts` declare **GPL‑3.0**, yet
> `api/src/common-types.ts` still carries an `SPDX-License-Identifier: Apache-2.0` header; the
> `contract` source headers (`contract/src/index.ts`, `contract/src/witnesses.ts`) also say
> **Apache‑2.0**, and `contract/package.json` declares no `license` field at all. Please reconcile
> which license actually applies across both packages before publishing.

---

## Resources

- **Midnight Documentation** – https://docs.midnight.io
- **Midnight Network** – https://midnight.io
- **Compact Language** – see the Midnight docs and the `compact` CLI help (`compact --help`)
- **Repository** – https://github.com/M-kip/Midnight-Pangolin

---

*Happy building!* 🚀
