// witnesses.ts — TypeScript witness implementations for the 3-party escrow contract.
//
// Each witness supplies a private input to the ZK circuit at proof time. The secret
// materials never leave this file: the circuits only ever receive derived/disclosed
// values (addresses via publicKey(), and secret hashes via disclose()).
//
// SPDX-License-Identifier: Apache-2.0
/**
 * Generate a fresh 32-byte secret using the platform CSPRNG.
 * `globalThis.crypto` is available in Node 20+ and in browsers.
 */
export const randomBytes32 = () => {
    const bytes = new Uint8Array(32);
    globalThis.crypto.getRandomValues(bytes);
    return bytes;
};
/**
 * Build a private state object from explicit secret materials.
 */
export const createEscrowPrivateState = (state) => state;
/**
 * Create a private state with freshly generated random keys and secrets.
 * Handy for tests and demos; in production each party supplies its own key.
 */
export const createRandomEscrowPrivateState = (terms) => ({
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
export const witnesses = {
    localSellerKey: ({ privateState, }) => [
        privateState,
        privateState.sellerKey,
    ],
    localBuyerKey: ({ privateState, }) => [
        privateState,
        privateState.buyerKey,
    ],
    localLogisticsKey: ({ privateState, }) => [
        privateState,
        privateState.logisticsKey,
    ],
    pickupSecret: ({ privateState, }) => [
        privateState,
        privateState.pickupSecret,
    ],
    deliverySecret: ({ privateState, }) => [
        privateState,
        privateState.deliverySecret,
    ],
    mediatorKey: ({ privateState, }) => [
        privateState,
        privateState.mediatorKey,
    ],
    escrow3PartyTerms: ({ privateState, }) => [
        privateState,
        privateState.terms,
    ],
};
//# sourceMappingURL=witnesses.js.map