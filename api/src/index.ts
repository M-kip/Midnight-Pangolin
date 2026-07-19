// index.ts — Public API for the @midnight-pangolin/escrow3party package.
//
// Wraps a deployed/found 3-party escrow contract (`DeployedEscrowContract`) in a
// typed, promise-based façade whose method names mirror the contract's impure
// circuits. Every mutating method drives a transaction via
// `contract.callTx.<circuit>(...)`; reads are served by the `state$` observable,
// which projects the full on-chain ledger into `EscrowDerivedState`.
//
// NOTE: circuits that receive terms/secret inputs source the *actual* on-chain
// value from the private-state witnesses declared in the contract
// (`escrow3PartyTerms`, `pickupSecret`, `deliverySecret`). The raw arguments are
// still validated by the circuit's `assert`s and are required by the call
// signature, so `sellerInitialize` passes the terms plus the raw secrets from
// the private state.
//
// SPDX-License-Identifier: GPL-3.0

import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type Logger } from 'pino';
import {
    type EscrowProviders,
    type DeployedEscrowContract,
    type EscrowDerivedState,
    escrowPrivateStateKey,
} from './common-types.js';
import { map, tap, type Observable } from 'rxjs';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import {
    type EscrowPrivateState,
    type EscrowTerms,
    type EscrowState,
    type DisputeReason,
} from '../../contract/src/index.js';

export interface Escrow3PartyApi {
    readonly deployedContractAddress: ContractAddress;
    readonly state$: Observable<EscrowDerivedState>;

    // PHASE 1 — Seller commits terms + secret hashes and deposits stake.
    sellerInitialize: (escrowTerms: EscrowTerms) => Promise<void>;
    // PHASE 2 — Buyer deposits payment + stake.
    buyerDeposit: () => Promise<void>;
    // PHASE 3 — Logistics provider deposits collateral.
    logisticsDeposit: () => Promise<void>;
    // PHASE 4A — Logistics proves possession of the raw pickup secret.
    confirmPickup: (pickupSecret: Uint8Array) => Promise<void>;
    // PHASE 4B — Buyer proves possession of the raw delivery secret.
    confirmDelivery: (deliverySecret: Uint8Array) => Promise<void>;
    // ESCALATION 1 — Deadline elapsed without delivery; timeout payout.
    triggerTimeout: () => Promise<void>;
    // ESCALATION 2 — Buyer raises a dispute.
    raiseDispute: (reason: DisputeReason) => Promise<void>;
    // ESCALATION 3 — Seller raises a dispute.
    sellerRaiseDispute: (reason: DisputeReason) => Promise<void>;
    // ARBITRATION — Mediator resolves an open dispute.
    resolveDispute: (resolution: bigint, mediatorSig: Uint8Array) => Promise<void>;
    // TIMEOUT MATH — Prove the buyer/seller timeout split equals the logistics stake.
    splitTimeoutStake: (buyerShare: bigint, sellerShare: bigint) => Promise<void>;
    // ADMIN — Emergency pause.
    emergencyPause: () => Promise<void>;
}

export class Escrow3PartyApiInstance implements Escrow3PartyApi {
    readonly deployedContractAddress: ContractAddress;
    readonly state$: Observable<EscrowDerivedState>;

    constructor(
        private readonly deployedContract: DeployedEscrowContract,
        private readonly providers: EscrowProviders,
        private readonly logger: Logger
    ) {
        this.deployedContractAddress = deployedContract.deployedContractAddress;

        // `state$` emits a `[ledger, privateState]` tuple; project it into the
        // UI-friendly `EscrowDerivedState`.
        this.state$ = deployedContract.state$.pipe(
            map(([ledger]) => ({
                ledger,
                sequence: ledger.sequence,
                escrowState: ledger.state,
                isInitialized: ledger.state !== EscrowState.UNINITIALIZED,
            })),
            tap((derivedState) => this.logger.debug({ derivedState }, 'Escrow ledger state updated'))
        );
    }

    /**
     * PHASE 1: Seller commits terms, locks the pickup/delivery secret hashes,
     * and deposits stake. The `escrowTerms` argument is validated by the circuit's
     * asserts; the stored terms/secrets themselves come from the private-state
     * witnesses.
     */
    async sellerInitialize(escrowTerms: EscrowTerms): Promise<void> {
        this.logger.info('Initializing escrow contract as Seller...');

        const privateState = await this.providers.privateStateProvider.get<EscrowPrivateState>(escrowPrivateStateKey);
        if (!privateState) throw new Error('Failed to load escrow private state');

        const tx = await this.deployedContract.callTx.sellerInitialize(
            escrowTerms,
            privateState.pickupSecret,
            privateState.deliverySecret
        );
        this.logger.info({ txId: toHex(tx.txId) }, 'Seller initialization tx submitted');
    }

    /**
     * PHASE 2: Buyer joins by depositing payment + stake.
     */
    async buyerDeposit(): Promise<void> {
        this.logger.info('Buyer executing deposit...');
        const tx = await this.deployedContract.callTx.buyerDeposit();
        this.logger.info({ txId: toHex(tx.txId) }, 'Buyer deposit confirmed');
    }

    /**
     * PHASE 3: Logistics provider joins and stakes collateral.
     */
    async logisticsDeposit(): Promise<void> {
        this.logger.info('Logistics provider joining contract escrow...');
        const tx = await this.deployedContract.callTx.logisticsDeposit();
        this.logger.info({ txId: toHex(tx.txId) }, 'Logistics join stake confirmed');
    }

    /**
     * PHASE 4A: Logistics submits the raw pickup secret to confirm possession.
     * Must match the raw secret committed by the seller at initialization.
     */
    async confirmPickup(pickupSecret: Uint8Array): Promise<void> {
        this.logger.info('Submitting pickup secret confirmation...');
        const tx = await this.deployedContract.callTx.confirmPickup(pickupSecret);
        this.logger.info({ txId: toHex(tx.txId) }, 'Pickup milestone confirmed on-chain');
    }

    /**
     * PHASE 4B: Buyer submits the raw delivery secret to confirm delivery.
     * Must match the raw secret committed by the seller at initialization.
     */
    async confirmDelivery(deliverySecret: Uint8Array): Promise<void> {
        this.logger.info('Submitting delivery secret confirmation...');
        const tx = await this.deployedContract.callTx.confirmDelivery(deliverySecret);
        this.logger.info({ txId: toHex(tx.txId) }, 'Delivery milestone confirmed on-chain');
    }

    /**
     * ESCALATION 1: Trigger the timeout payout after the delivery deadline elapses.
     */
    async triggerTimeout(): Promise<void> {
        this.logger.info('Evaluating timeline boundaries for deadline timeout...');
        const tx = await this.deployedContract.callTx.triggerTimeout();
        this.logger.info({ txId: toHex(tx.txId) }, 'Timeout evaluation tx executed');
    }

    /**
     * ESCALATION 2: Buyer flags a problem (goods not as described, etc.).
     */
    async raiseDispute(reason: DisputeReason): Promise<void> {
        this.logger.info({ reason }, 'Buyer initiating active dispute...');
        const tx = await this.deployedContract.callTx.raiseDispute(reason);
        this.logger.info({ txId: toHex(tx.txId) }, 'Buyer dispute claim active');
    }

    /**
     * ESCALATION 3: Seller flags a problem (buyer refusing valid delivery, etc.).
     */
    async sellerRaiseDispute(reason: DisputeReason): Promise<void> {
        this.logger.info({ reason }, 'Seller initiating active dispute...');
        const tx = await this.deployedContract.callTx.sellerRaiseDispute(reason);
        this.logger.info({ txId: toHex(tx.txId) }, 'Seller dispute claim active');
    }

    /**
     * ARBITRATION: Mediator resolves an open dispute.
     */
    async resolveDispute(resolution: bigint, mediatorSig: Uint8Array): Promise<void> {
        this.logger.info({ resolution }, 'Mediator executing dispute resolution...');
        const tx = await this.deployedContract.callTx.resolveDispute(resolution, mediatorSig);
        this.logger.info({ txId: toHex(tx.txId) }, 'Dispute results finalized');
    }

    /**
     * TIMEOUT MATH: Prove the buyer/seller timeout split exactly equals the
     * logistics stake.
     */
    async splitTimeoutStake(buyerShare: bigint, sellerShare: bigint): Promise<void> {
        this.logger.info({ buyerShare, sellerShare }, 'Splitting timeout stake...');
        const tx = await this.deployedContract.callTx.splitTimeoutStake(buyerShare, sellerShare);
        this.logger.info({ txId: toHex(tx.txId) }, 'Timeout stake split confirmed');
    }

    /**
     * ADMIN: Emergency pause.
     */
    async emergencyPause(): Promise<void> {
        this.logger.info('Triggering emergency pause...');
        const tx = await this.deployedContract.callTx.emergencyPause();
        this.logger.info({ txId: toHex(tx.txId) }, 'Emergency pause executed');
    }
}