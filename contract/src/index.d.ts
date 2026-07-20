import { CompiledContract } from "@midnight-ntwrk/midnight-js-protocol/compact-js";
export * from "./managed/escrow3party/contract/index.js";
export * from "./witnesses.js";
import * as CompiledEscrow3PartyContract from "./managed/escrow3party/contract/index.js";
import * as Witnesses from "./witnesses.js";
export declare const Escrow3PartyContractComplied: CompiledContract.CompiledContract<CompiledEscrow3PartyContract.Contract<Witnesses.EscrowPrivateState, CompiledEscrow3PartyContract.Witnesses<Witnesses.EscrowPrivateState>>, Witnesses.EscrowPrivateState, never>;
