# Midnight Pangolin

A three-party escrow smart contract for the Midnight Network, built using the Compact language. It coordinates a seller, buyer, and logistics provider through a privacy-preserving deposit → pickup → delivery → settlement flow with timeout and dispute handling.

[![Midnight Network](https://img.shields.io/badge/Midnight-Network-blue?style=for-the-badge)](https://midnight.io)
[![Compact](https://img.shields.io/badge/Compact-Language-2ea44f?style=for-the-badge&logo=language)](https://docs.midnight.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-68a063?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-GPL%203.0-lightgrey?style=for-the-badge&logo=gnu)](https://opensource.org/licenses/GPL-3.0)
[![GitHub stars](https://img.shields.io/github/stars/M-kip/Midnight-Pangolin?style=for-the-badge)](https://github.com/M-kip/Midnight-Pangolin/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/M-kip/Midnight-Pangolin?style=for-the-badge)](https://github.com/M-kip/Midnight-Pangolin/network/members)
[![CI](https://img.shields.io/github/actions/workflow/status/M-kip/Midnight-Pangolin/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/M-kip/Midnight-Pangolin/actions)

## Overview

Midnight Pangolin is a self-contained Compact contract (`escrow3party.compact`) that implements a trust-minimized escrow between **three** parties instead of the usual two:

- a **Seller**, who lists goods and puts up collateral,
- a **Buyer**, who funds the purchase and a security deposit, and
- a **Logistics** provider, who transports the goods and stakes collateral.

Funds stay locked in the contract until either the buyer confirms delivery (with a secret-based ZK proof) or a timeout/dispute path resolves the escrow and redistributes the staked amounts.

## Project Structure

This repository is a monorepo with two npm packages:

- [`contract/`](contract/) → `@midnight-pangolin/escrow3party` — the Compact contract, its compiled zero‑knowledge artifacts, and the witness implementations (the on‑chain layer).
- [`api/`](api/) → `@midnight-pangolin/escrow3party-api` — a TypeScript SDK that wraps a deployed/found contract in a typed, promise‑based façade (the off‑chain integration layer).
- [`cli/`](cli/) → `@midnight-pangolin/cli` — a command-line interface for managing escrow contracts.

Together they form a ready‑to‑wire foundation for a Midnight DApp.

## Features

- **Privacy-Preserving**: Uses zero-knowledge proofs to verify secrets without revealing them on-chain
- **Three-Party Escrow**: Coordinates seller, buyer, and logistics provider
- **Timeout Handling**: Automatic resolution if delivery deadline passes
- **Dispute Resolution**: Mediated dispute handling with multiple outcome options
- **TypeScript SDK**: Promise-based API for easy integration
- **CLI Tools**: Command-line utilities for deployment and interaction

## Getting Started

### Prerequisites

| Tool | Minimum Version | Notes |
|------|----------------|-------|
| Node.js | 20.x | `nvm install 20 && nvm use 20` |
| npm | 10.x | Bundled with Node 20 |
| `compact` CLI | latest | Verify with `compact --version` |
| Docker (optional) | 27.x | Needed for local devnet and proof‑server |

### Installation

```bash
# Clone the repository
git clone https://github.com/M-kip/Midnight-Pangolin.git
cd Midnight-Pangolin

# Install dependencies for all packages
pnpm install

# Compile the contract
pnpm --filter @midnight-pangolin/contract run compact

# Type-check, lint, and test
pnpm --filter @midnight-pangolin/contract run ci
pnpm --filter @midnight-pangolin/api run ci
pnpm --filter @midnight-pangolin/cli run ci
```

## Development

### Contract Package (`contract/`)

| Command | Description |
|---------|-------------|
| `pnpm run compact` | Compile `src/escrow3party.compact` into `src/managed/escrow3party` (ZK artifacts + bindings) |
| `pnpm run typecheck` | Type-check the TypeScript sources |
| `pnpm run lint` | Lint the sources with ESLint |
| `pnpm test` | Run the Vitest test suite |
| `pnpm run build` | Clean build: `tsc` to `dist/`, then copy `managed/` and the `.compact` source |
| `pnpm run ci` | Full pipeline: `compact` → `typecheck` → `lint` → `build` → `test` |

### API Package (`api/`)

| Command | Description |
|---------|-------------|
| `pnpm run typecheck` | Type-check the SDK sources |
| `pnpm run lint` | Lint` | Lint the SDK with ESLint |
| `pnpm run build` | Build to `dist/` |
| `pnpm run ci` | Pipeline: `typecheck` → `lint` → `build` |

### CLI Package (`cli/`)

| Command | Description |
|---------|-------------|
| `pnpm run typecheck` | Type-check the CLI sources |
| `pnpm run lint` | Lint the CLI sources |
| `pnpm run build` | Build to `dist/` |
| `pnpm run ci` | Pipeline: `typecheck` → `lint` → `build` |
| `pnpm run standalone` | Run CLI in standalone mode |
| `pnpm run preview-remote` | Connect to preview network |
| `pnpm run preprod-remote` | Connect to preproduction network |

## Compiled Contract Artifacts

Running `pnpm --filter @midnight-pangolin/contract run compact` writes the compiler output under `contract/src/managed/escrow3party/`:

- `contract/index.js` and `contract/index.d.ts` — JavaScript/TypeScript bindings for every circuit
- `keys/` — one `.prover` / `.verifier` pair per circuit
- `zkir/` — the `.zkir` / `.bzkir` circuit descriptions used to generate and check proofs
- `journal.jsonl` — a structured log of the compilation run

These artifacts are committed so the package can be imported without recompiling the ZK circuit.

## API Usage

The API package provides a typed, promise-based interface:

```typescript
import { Escrow3PartyApiInstance } from '@midnight-pangolin/escrow3party-api';

// Deploy a new contract
const api = await Escrow3PartyApiInstance.deploy(providers, logger, escrowTerms);

// Or join an existing contract
const api = await Escrow3PartyApiInstance.join(providers, contractAddress, logger);

// Use the API methods
await api.sellerInitialize(escrowTerms);
await api.buyerDeposit();
await api.logisticsDeposit();
// ... etc
```

## License

Distributed under the **GNU General Public License v3.0** — see the `LICENSE` file.

## Resources

- **Midnight Documentation** – https://docs.midnight.io
- **Midnight Network** – https://midnight.io
- **Compact Language** – see the Midnight docs and the `compact` CLI help (`compact --help`)
- **Repository** – https://github.com/M-kip/Midnight-Pangolin
- **CI Build Status** – https://github.com/M-kip/Midnight-Pangolin/actions