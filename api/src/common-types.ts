// common-types.ts — Shared types for the @midnight-pangolin/escrow3party API.
//
// These types tie the compiled 3-party escrow contract to the Midnight deployment
// and runtime helpers (MidnightProviders, FoundContract). They are consumed by the
// deploy/join logic, the ZK circuit wiring, and any DApp that imports this package.
//
// SPDX-License-Identifier: Apache-2.0

import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type {
  Ledger,
  EscrowState,
  Contract,
  Witnesses,
  EscrowPrivateState,
} from '@midnight-pangolin/contract/dist/index';

// Storage key under which the off-chain private state is persisted (e.g. localStorage).
export const escrowPrivateStateKey = 'escrowPrivateState';
export type PrivateStateId = typeof escrowPrivateStateKey;

// Map of every private-state id to its concrete type. Keys here MUST match the
// `...PrivateStateKey` constants above so `PrivateStates[PrivateStateId]` resolves.
export type PrivateStates = {
  readonly escrowPrivateState: EscrowPrivateState;
};

// The contract type, fully parameterized with its private state and witnesses.
export type EscrowContract = Contract<EscrowPrivateState, Witnesses<EscrowPrivateState>>;

// The set of circuit names that can be called (impure circuits only).
export type EscrowCircuitKeys = Exclude<keyof EscrowContract['impureCircuits'], number | symbol>;

// Providers bundle the private state + wallet/network providers needed to drive circuits.
export type EscrowProviders = MidnightProviders<EscrowCircuitKeys, PrivateStateId, EscrowPrivateState>;

// A contract that has been deployed to (or joined on) the chain.
export type DeployedEscrowContract = FoundContract<EscrowContract>;

// Convenience projection of the on-chain ledger, suitable for UI consumption.
export type EscrowDerivedState = {
  readonly ledger: Ledger;
  readonly sequence: bigint;
  readonly escrowState: EscrowState;
  readonly isInitialized: boolean;
};
