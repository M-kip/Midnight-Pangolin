import { Witnesses, EscrowTerms } from "./managed/escrow3party/contract/index.js";
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
export declare const randomBytes32: () => Uint8Array;
/**
 * Build a private state object from explicit secret materials.
 */
export declare const createEscrowPrivateState: (state: EscrowPrivateState) => EscrowPrivateState;
/**
 * Create a private state with freshly generated random keys and secrets.
 * Handy for tests and demos; in production each party supplies its own key.
 */
export declare const createRandomEscrowPrivateState: (terms: EscrowTerms) => EscrowPrivateState;
/**
 * Witness implementations. Object keys MUST match the Compact `witness` declarations
 * exactly; each returns the (unchanged) private state plus the declared value.
 */
export declare const witnesses: Witnesses<EscrowPrivateState>;
