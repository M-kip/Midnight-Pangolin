// witnesses.ts — TypeScript witness implementations for the 3-party escrow contract.
//
// Each witness supplies a private input to the ZK circuit at proof time. The secret
// materials never leave this file: the circuits only ever receive derived/disclosed
// values (addresses via publicKey(), and secret hashes via disclose()).
//
// SPDX-License-Identifier: Apache-2.0

import { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import {
  Ledger,
  Witnesses,
  EscrowTerms,
} from "./managed/escrow3party/contract/index.js";

/**
 * Off-chain (private) state for the escrow contract.
 *
 * Holds every secret the witnesses must provide. Nothing here is sent to the chain;
 * the circuits derive the small set of values that must be public (addresses, secret
 * hashes, terms) and disclose only those.
 *
 * In a real deployment each party runs their own node and seeds only the key/secret
 * they own; the other slots can be left as dummy zeros. For testing the whole flow
 * from one process, a single state holding all secrets is convenient.
 */
export type EscrowPrivateState = {
  /** Seller's secret key — derives the seller's on-chain address. */
  readonly sellerKey: Uint8Array;
  /** Buyer's secret key — derives the buyer's on-chain address. */
  readonly buyerKey: Uint8Array;
  /** Logistics provider's secret key — derives the logistics address. */
  readonly logisticsKey: Uint8Array;
  /** Raw pickup secret committed as a hash at initialization. */
  readonly pickupSecret: Uint8Array;
  /** Raw delivery secret committed as a hash at initialization. */
  readonly deliverySecret: Uint8Array;
  /** Mediator's secret key — checked by resolveDispute. */
  readonly mediatorKey: Uint8Array;
  /** The EscrowTerms disclosed by sellerInitialize(). */
  readonly terms: EscrowTerms;
};

/**
 * Generate a fresh 32-byte secret using the platform CSPRNG.
 * `globalThis.crypto` is available in Node 20+ and in browsers.
 */
export const randomBytes32 = (): Uint8Array => {
  const bytes = new Uint8Array(32);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
};

/**
 * Build a private state object from explicit secret materials.
 */
export const createEscrowPrivateState = (
  state: EscrowPrivateState,
): EscrowPrivateState => state;

/**
 * Create a private state with freshly generated random keys and secrets.
 * Handy for tests and demos; in production each party supplies its own key.
 */
export const createRandomEscrowPrivateState = (
  terms: EscrowTerms,
): EscrowPrivateState => ({
  sellerKey: randomBytes32(),
  buyerKey: randomBytes32(),
  logisticsKey: randomBytes32(),
  pickupSecret: randomBytes32(),
  deliverySecret: randomBytes32(),
  mediatorKey: randomBytes32(),
  terms,
});

/**
 * Witness implementations. Object keys MUST match the Compact `witness` declarations
 * exactly; each returns the (unchanged) private state plus the declared value.
 */
export const witnesses: Witnesses<EscrowPrivateState> = {
  localSellerKey: ({
    privateState,
  }: WitnessContext<Ledger, EscrowPrivateState>): [EscrowPrivateState, Uint8Array] => [
    privateState,
    privateState.sellerKey,
  ],

  localBuyerKey: ({
    privateState,
  }: WitnessContext<Ledger, EscrowPrivateState>): [EscrowPrivateState, Uint8Array] => [
    privateState,
    privateState.buyerKey,
  ],

  localLogisticsKey: ({
    privateState,
  }: WitnessContext<Ledger, EscrowPrivateState>): [EscrowPrivateState, Uint8Array] => [
    privateState,
    privateState.logisticsKey,
  ],

  pickupSecret: ({
    privateState,
  }: WitnessContext<Ledger, EscrowPrivateState>): [EscrowPrivateState, Uint8Array] => [
    privateState,
    privateState.pickupSecret,
  ],

  deliverySecret: ({
    privateState,
  }: WitnessContext<Ledger, EscrowPrivateState>): [EscrowPrivateState, Uint8Array] => [
    privateState,
    privateState.deliverySecret,
  ],

  mediatorKey: ({
    privateState,
  }: WitnessContext<Ledger, EscrowPrivateState>): [EscrowPrivateState, Uint8Array] => [
    privateState,
    privateState.mediatorKey,
  ],

  escrow3PartyTerms: ({
    privateState,
  }: WitnessContext<Ledger, EscrowPrivateState>): [EscrowPrivateState, EscrowTerms] => [
    privateState,
    privateState.terms,
  ],
};