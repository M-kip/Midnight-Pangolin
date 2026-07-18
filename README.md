# Midnight Pangolin

[![Midnight Network](https://img.shields.io/badge/Midnight-Network-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3JtSW5kZXg9IjAgMCI+PC9zdmc+)](https://midnight.io)
[![Compact](https://img.shields.io/badge/Compact-Language-2ea44f?style=for-the-badge)](https://docs.midnight.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-68a063?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-f47a20?style=for-the-badge)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/midnight-ntwrk/midnight-pangolin?style=for-the-badge)](https://github.com/midnight-ntwrk/midnight-pangolin/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/midnight-ntwrk/midnight-pangolin?style=for-the-badge)](https://github.com/midnight-ntwrk/midnight-pangolin/network/members)
[![Build Status](https://img.shields.io/github/actions/workflow/status/midnight-ntwrk/midnight-pangolin/ci.yml?branch=main&style=for-the-badge&label=Build)](https://github.com/midnight-ntwrk/midnight-pangolin/actions)

> A privacy‑focused blockchain platform built on the Midnight Network, featuring Compact smart contracts, zk‑SNARK proofs, and a modular SDK for decentralized applications.

---

## Table of Contents

- [Overview](#overview)  
- [Key Features](#key-features)  
- [Architecture](#architecture)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Project Structure](#project-structure)  
- [Development Workflow](#development-workflow)  
  - [Writing Compact Contracts](#writing-compact-contracts)  
  - [Testing & Verification](#testing--verification)  
  - [Building & Deployment](#building--deployment)  
- [Tooling](#tooling)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact & Resources](#contact--resources)  

---

## Overview

Midnight Pangolin is the reference implementation of the **Midnight** blockchain, a decentralized network that combines transparent transaction throughput with **privacy‑preserving** smart contract execution. It uses the **Compact** programming language for on‑chain logic, leverages **zk‑SNARK** proofs for confidentiality, and provides a rich SDK for building front‑end wallets, indexers, and off‑chain services.

This repository contains the core protocol, the Midnight SDK, sample contracts, development tools, and documentation.

---

## Key Features

- **Privacy‑first design** – Transactions are shielded by default using zk‑SNARK proofs.  
- **Compact language** – A statically typed, functional language designed for expressiveness and formal verification.  
- **Modular SDK** – TypeScript/JavaScript libraries for wallet integration, indexer APIs, and tooling.  
- **Deterministic CLI** – `compact` and `compactc` compilers, linter, and deployment utilities.  
- **Composable privacy patterns** – Nullifiers, commitments, Merkle proofs, and shielded transfers.  
- **Extensive testing harness** – Unit, integration, and end‑to‑end tests using Vitest and Playwright.  

---

## Architecture

```
.
├─ contracts/            # Compact smart contracts (.compact)
├─ src/                  # SDK source code (TypeScript)
├─ scripts/              # Automation scripts (deployment, seeding)
├─ test/                 # Test suites (unit, integration, e2e)
├─ .claude/              # Agent memory and scheduled tasks
├─ .github/              # CI/CD workflows
├─ design/               # Design system and UI assets
├─ README.md             # ← This file
└─ package.json          # Project dependencies & scripts
```

- **Compact Compiler (`compact` / `compactc`)** – Compiles `.compact` source toMidnight bytecode.  
- **Midnight Runtime (`@midnight-ntwrk/midnight-js`)** – Executes contracts on the node.  
- **SDK (`@midnight-ntwrk/midnight-js`)** – Provides wallet, indexer, and proof‑generation APIs.  
- **Verification Agents** – Specialized agents that compile, type‑check, and verify contracts and witnesses.

---

## Getting Started

### Prerequisites

| Tool | Minimum Version | Install |
|------|-----------------|---------|
| Node.js | 20.x | `nvm install 20 && nvm use 20` |
| Python | 3.11 | (for some tooling) |
| Git | 2.40+ | `git --version` |
| Docker | 24.x | (for local devnet) |
| `compact` CLI | latest | `npm i -g @midnight-ntwrk/compact-cli` |
| `midnight-node` | latest | `npm i -g @midnight-ntwrk/midnight-node` |

> **Tip:** Verify versions with `compact --version` and `npm view @midnight-ntwrk/midnight-js version`.

### Installation

```bash
# Clone the repo
git clone https://github.com/midnight-ntwrk/midnight-pangolin.git
cd midnight-pangolin

# Install dependencies
npm ci

# Initialise submodules (if any)
git submodule update --init --recursive
```

### Project Structure

- `contracts/` – Write your `.compact` contracts here.  
- `src/` – Core SDK modules.  
- `scripts/` – Helper scripts for deployment and testing.  
- `test/` – Automated test suites.  
- `.claude/` – Agent memory, scheduled tasks, and worktree configs.  
- `design/` – UI component library and branding assets.  

---

## Development Workflow

### Writing Compact Contracts

1. Create a new contract file under `contracts/`.  
2. Use the **Compact Core** reference for syntax and patterns.  
3. Include proper `disclose()` statements to avoid implicit disclosure errors.  

```compact
// Example: Simple transfer contract
contract Transfer {
  pub fn transfer(amount:币值, to:Address) {
    // ... implementation ...
  }
}
```

### Testing & Verification

- **Unit Tests** – Run with `npm test`.  
- **Integration Tests** – Use the Midnight SDK testkit.  
- **ZK Verification** – Compile with `--no-skip-zk` and run the `zkir-checker`.  

```bash
# Compile and verify a contract
compact compile contracts/my_contract.compact --no-skip-zk
midnight-verify verify-by-cli-execution --contract contracts/my_contract.compact
```

### Building & Deployment

```bash
# Build the SDK and run type checking
npm run build
npm run typecheck

# Deploy to a local devnet
midnight-node start --dev
compact deploy --network devnet contracts/MyContract.compact
```

---

## Tooling

| Tool | Purpose | Command |
|------|---------|---------|
| `compact` | Compiler front‑end | `compact <file.compact>` |
| `compactc` | Low‑level compiler | `compactc <file.compact>` |
| `midnight-verify` | Verification harness | `midnight-verify verify-by-devnet` |
| `compact-cli-dev` | Scaffold CLI tools | `compact-cli-dev init` |
| `midnight-fact-check` | Claim validation | `midnight-fact-check check` |
| `midnight-cq` | Code‑quality checks | `midnight-cq quality-check` |
| `midnight-dapp-dev` | DApp frontend scaffolding | `midnight-dapp-dev init` |

All commands are documented in the respective skill help sections.

---

## Contributing

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feat/your‑feature`).  
3. Write code **and** tests.  
4. Run the full quality suite:  

   ```bash
   npm run lint && npm run test && npm run e2e
   ```

5. Submit a Pull Request with a concise description and any relevant issue references.  

> **Note:** All contributions must pass the `midnight-cq` checks before merging.

---

## License

Midnight Pangolin is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## Contact & Resources

- **Documentation** – https://docs.midnight.io  
- **Forum** – https://community.midnight.io  
- **Discord** – `discord.gg/midnight`  
- **Twitter** – `@MidnightNetwork`  
- **GitHub Issues** – Use the issue tracker for bugs and feature requests.  

--- 

*Happy building!* 🚀