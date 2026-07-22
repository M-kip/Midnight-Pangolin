# Midnight Pangolin Project

**Professional README**

---  

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Vision & Goals](#vision--goals)  
3. [Architecture & Key Components](#architecture--key-components)  
4. [Technology Stack](#technology-stack)  
5. [Getting Started](#getting-started)  
6. [Development Workflow](#development-workflow)  
7. [Testing & Verification](#testing--verification)  
8. [Deployment](#deployment)  
9. [Contributing](#contributing)  
10. [License](#license)  
11. [Contact & Support](#contact--support)  

---  

## 1. Project Overview
Midnight Pangolin is a decentralized finance (DeFi) application built on the **Midnight Network**, leveraging the **Compact** smart contract language and the **Midnight SDK**. This repository contains the source code, development tools, and documentation required to extend, test, and deploy the Pangolin protocol.

## 2. Vision & Goals
- **Privacy‑First Finance**: Enable shielded transactions and confidential asset management while maintaining regulatory compliance.  
- **Interoperability**: Provide seamless bridges to other blockchain ecosystems through zk‑proofs and standardized token interfaces.  
- **Security & Audibility**: Implement rigorous formal verification of contracts and comprehensive code‑quality checks.  
- **Community Governance**: Foster an open development model with transparent milestone tracking and inclusive contribution processes.

## 3. Architecture & Key Components
| Component | Description | Location |
|-----------|-------------|----------|
| **MidnightWalletProvider** | Handles wallet creation, signing, and encryption; central to user key management. | `src/wallet/provider/` |
| **Midnight Wallet SDK** | TypeScript library exposing wallet‑SDK functionality to DApp front‑ends. | `middleware/ts-wallet-sdk/` |
| **Midnight Tokens Module** | Implements custom token economics, including dust generation and unshielded UTXO management. | `src/token/` |
| **Midnight Protocol Framework** | Core blockchain primitives (ZK proofs, commitment schemes, consensus). | `protocol/` |
| **CLI & Tooling** | Compact compiler, deployment scripts, and verification utilities. | `tools/` |

## 4. Technology Stack
- **Language**: Compact (v0.31+)  
- **Compilation**: `@midnight-ntwrk/compact` compiler (latest version)  
- **SDK**: `@midnight-ntwrk/midnight-js` (npm)  
- **Frontend**: React + TypeScript + Vite  
- **Testing**: Vitest, Playwright, and Midnight’s built‑in verification suite  
- **CI/CD**: GitHub Actions with automated linting, type‑checking, and integration tests  
- **Infrastructure**: Docker‑based devnet, local indexer, and proof server  

## 5. Getting Started
```bash
# 1. Clone the repository
git clone https://github.com/midnight-pangolin/Midnight-Pangolin.git
cd Midnight-Pangolin

# 2. Install dependencies
pnpm install

# 3. Build the project
pnpm run build

# 4. Run the local devnet (optional)
docker-compose up -d

# 5. Deploy a sample contract
compact compile ./contracts/Counter.compact --language-version >=0.23
```
For detailed step‑by‑step instructions, see the [Development Setup](docs/setup.md) guide.

## 6. Development Workflow
1. **Branch Strategy**  
   - `main` – production‑ready code  
   - `feature/*` – new features  
   - `bugfix/*` – hot‑fixes  
2. **Commit Conventions**  
   - `feat:` – new feature  
   - `fix:` – bug fix  
   - `docs:` – documentation update  
   - `refactor:` – code restructuring without behavior change  
3. **Pull‑Request Process**  
   - Submit PR against `main`  
   - Run the full quality‑check suite (lint, type‑check, tests)  
   - Obtain at least two approvals from core maintainers  
   - Ensure all CI checks pass before merging  

## 7. Testing & Verification
- **Unit Tests** (`pnpm test`) – cover logic layers and SDK utilities.  
- **Integration Tests** (`pnpm test:e2e`) – simulate end‑to‑end user flows on the devnet.  
- **Static Analysis** (`pnpm biome`) – enforce code‑quality rules.  
- **Formal Verification** – use Midnight’s `/compact-core:verify` and `/midnight-verify` agents to compile, type‑check, and run witness‑based checks on smart contracts.  
- **Code Coverage** – target ≥85 % coverage for critical modules.  

## 8. Deployment
1. **Release Candidate Build**  
   ```bash
   pnpm run build:release
   ```  
2. **Package Contracts**  
   ```bash
   compact pack ./contracts/ --output ./releases/
   ```  
3. **Publish to Mainnet** (via governance‑approved process)  
   - Submit a governance proposal with contract metadata.  
   - Undergo community audit and verification.  
   - Deploy using the official Pangolin deployment script.  

## 9. Contributing
- **Fork** the repository and create a feature branch.  
- Follow the **[Commit Message Guide](CONTRIBUTING.md#commit-guidelines)**.  
- Run `pnpm lint && pnpm type:check` before pushing.  
- Submit a **Pull Request** with a clear description of the change and reasoning.  
- All contributions are subject to the **[Code of Conduct](CODE_OF_CONDUCT.md)**.  

## 10. License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file.

## 11. Contact & Support
- **Discord**: `discord.gg/midnight-pangolin`  
- **Email**: `dev@midnight-pangolin.io`  
- **Documentation**: `https://docs.midnight-pangolin.io`  
- **Issue Tracker**: GitHub Issues  

---  

*Prepared by the Midnight Pangolin development team. All contributing authors are listed in the [CONTRIBUTORS](CONTRIBUTORS) file.*