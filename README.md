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

The repository is a single npm package (`@midnight-pangolin/escrow3party`) that wraps the compiled
contract and its zero‑knowledge artifacts, ready to be integrated into a Midnight DApp.

---

## Escrow Model

Each party joins sequentially and locks a stake. Two secrets underpin the physical hand‑offs:

| Secret | Committed by | Revealed to | Proved by | Advances state to |
|--------|--------------|-------------|-----------|-------------------|
| Pickup secret | Seller (at init) | Logistics (off‑chain) | `confirmPickup` | `IN_TRANSIT` |
| Delivery secret | Buyer (at init) | Buyer | `confirmDelivery` | `DELIVERED` → `RESOLVED` |

The seller commits a `pickupSecretHash` and the buyer commits a `deliverySecretHash` in
`sellerInitialize`. Logistics learns the raw pickup secret off‑chain from the seller; proving
knowledge of it (without revealing it on‑chain) lets logistics mark the goods as picked up. The
buyer later proves knowledge of the delivery secret to release funds.

Stakes and payments are described by an immutable `EscrowTerms` struct set once at initialization.

---

## State Machine & Lifecycle

```text
            constructor()
                 │
                 ▼
         UNINITIALIZED
                 │  sellerInitialize(terms, pickupSecretHash, deliverySecretHash)
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
            IN_TRANSIT ──────┬───────────────────────────────┐
                 │           │ raiseDispute(reason)          │ raiseDispute(reason)
                 │           │ sellerRaiseDispute(reason)    │ (buyer/seller, after deadline)
                 │           ▼                               │
                 │      DISPUTED                            │ triggerTimeout()
                 │           │ resolveDispute(resolution)   ▼
                 │           ▼                         EXPIRED
                 │      RESOLVED                            │
                 │                                          ▼
                 │                              (distribution computed) RESOLVED
                 │  confirmDelivery(deliverySecret)
                 ▼
            DELIVERED
                 │
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

## Project Structure

```
.
├─ contract/                         # The escrow package (@midnight-pangolin/escrow3party)
│  ├─ src/
│  │  ├─ escrow3party.compact        # Compact source for the 3-party escrow contract
│  │  └─ managed/                    # Generated by `compact compile` (committed)
│  │     └─ escrow3party/
│  │        ├─ contract/             # JS/TS bindings (index.js, index.d.ts)
│  │        ├─ keys/                 # Prover/verifier keys per circuit
│  │        └─ zkir/                 # ZKIR circuit descriptions
│  ├─ package.json                   # Build, lint, test, compile scripts
│  ├─ tsconfig.json
│  └─ tsconfig.build.json
├─ LICENSE                           # GNU General Public License v3.0
├─ README.md                         # ← This file
└─ package-lock.json
```

> The `contract/src/managed/` directory is generated by the compiler. It is committed here so the
> package can be consumed without recompiling the ZK artifacts.

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

`localSellerKey`, `localBuyerKey`, `localLogisticsKey` (party secret keys), `pickupSecret`,
`deliverySecret`, `disputeReason`, `disputeResolution`, `escrow3PartyTerms` (witnessed terms for
`sellerInitialize`), and `mediatorKey` (used by `resolveDispute`).

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

# Install dependencies for the contract package
cd contract
npm ci
```

---

## Development

All scripts run from inside `contract/`.

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

---

## Deployment

This repository contains the **contract and its compiled ZK artifacts**; it does not yet include a
deployment script or a DApp front‑end. To deploy, you will need a running **Midnight node / devnet**
and a deployment harness that consumes the bindings in `contract/src/managed/escrow3party/contract`.
Add the deployment step to the `contract` package once that harness exists, then run it as part of
`npm run ci`.

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

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Make your changes in `contract/` and add/adjust tests.
4. Run the full pipeline from `contract/`:

   ```bash
   npm run ci
   ```

5. Commit and open a Pull Request with a concise description and any related issue references.

> Ensure `npm run lint` and `npm test` pass before submitting.

---

## License

Distributed under the **GNU General Public License v3.0** — see the `LICENSE` file.

> **Heads‑up:** the source header in `contract/src/escrow3party.compact` declares
> `SPDX-License-Identifier: Apache-2.0`, which conflicts with the `LICENSE` file (GPL‑3.0). Please
> reconcile which license actually applies before publishing.

---

## Resources

- **Midnight Documentation** – https://docs.midnight.io
- **Midnight Network** – https://midnight.io
- **Compact Language** – see the Midnight docs and the `compact` CLI help (`compact --help`)
- **Repository** – https://github.com/M-kip/Midnight-Pangolin

---

*Happy building!* 🚀
