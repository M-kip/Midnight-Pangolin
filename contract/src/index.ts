// index.ts — Public entry point for the @midnight-pangolin/escrow3party package.
//
// Re-exports the generated contract bindings and the witness implementations so a
// DApp or deployment script can import everything it needs from this single module,
// then wraps them in a `CompiledContract` wired with the witnesses and the on-disk
// ZK artifacts. That wrapper is what `deployContract` / `joinContract` consume.
//
// SPDX-License-Identifier: Apache-2.0

import { CompiledContract } from "@midnight-ntwrk/midnight-js-protocol/compact-js";

export * from "./managed/escrow3party/contract/index.js";
export * from "./witnesses.js";

import * as CompiledEscrow3PartyContract from "./managed/escrow3party/contract/index.js";
import * as Witnesses from "./witnesses.js";

// The compiled, witness-wired contract. `name` is the on-chain contract identifier
// (PascalCase of the `escrow3party` module); the asset path points at the directory
// produced by `compact compile` (prover/verifier keys + ZKIR).
export const Escrow3PartyContractComplied = CompiledContract.make<
  CompiledEscrow3PartyContract.Contract<Witnesses.EscrowPrivateState>
>("Escrow3party", CompiledEscrow3PartyContract.Contract<Witnesses.EscrowPrivateState>).pipe(
  CompiledContract.withWitnesses(Witnesses.witnesses),
  CompiledContract.withCompiledFileAssets("./managed/escrow3party"),
);
