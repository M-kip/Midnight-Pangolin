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
// 1. Managed smart contract circuit interfaces (Compiled out of compact)
import * as esc3party from '@midnight-pangolin/contract/managed/escrow3party/contract';

// 2. Midnight Protocol Core Types
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';

// 3. Reactive, Utilities, and Diagnostic Logging engines
import { map, tap, type Observable } from 'rxjs';
import { type Logger } from 'pino';
import * as utils from './utils/index.js'; 

// 4. Local API Domain boundary models (Relative internal resolution)
import {
    type EscrowProviders,
    type DeployedEscrowContract,
    type EscrowDerivedState,
    escrowPrivateStateKey,
} from './common-types.js';

// 5. Monorepo Level Contract Exports (Value Imports for Enums & Constants)
import {
    type EscrowPrivateState,
    type EscrowTerms,
    type DisputeReason,
    createEscrowPrivateState,
    EscrowState,                    // 💡 Removed 'type' keyword so it can be checked as a value
    Escrow3PartyContractCompiled,   // 💡 Points directly to your cleanly mapped workspace index
} from '@midnight-pangolin/contract';

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

        static async deploy(
        providers: EscrowProviders,
        logger: Logger,
        escrowTerms: esc3party.EscrowTerms
    ): Promise<Escrow3PartyApiInstance> {
        logger.info('Initializing 3-party escrow contract deployment pipeline...');

        // 1. Properly construct the immutable configuration terms object
        const terms: esc3party.EscrowTerms = {
            goodsHash: escrowTerms.goodsHash,
            paymentAmount: escrowTerms.paymentAmount,
            paymentAmountSplit: escrowTerms.paymentAmountSplit,
            sellerStake: escrowTerms.sellerStake,
            buyerStake: escrowTerms.buyerStake,
            logisticsStake: escrowTerms.logisticsStake,
            logisticsStakeTimeOut: escrowTerms.logisticsStakeTimeOut,
            deliveryDeadline: escrowTerms.deliveryDeadline,
            logisticsFee: escrowTerms.logisticsFee
        };

        // 2. Generate secure random byte keys instead of uninitialized zero-arrays (new Uint8Array(32))
        // Empty zero-arrays will cause critical identity collisions in a real test or node runtime environment.
        const initialPrivateState = createEscrowPrivateState({
            sellerKey: utils.randomBytes(32),
            buyerKey: utils.randomBytes(32),
            logisticsKey: utils.randomBytes(32),
            pickupSecret: utils.randomBytes(32),
            deliverySecret: utils.randomBytes(32),
            mediatorKey: utils.randomBytes(32),
            terms: terms,
        });

        logger.trace('Private witness states generated. Submitting contract ledger transaction...');

        // 3. Populate the deployment parameters required by the Midnight JS SDK
        const deployedContract = await deployContract(providers, {
            compiledContract: Escrow3PartyContractCompiled, // Pass your root compiled output artifact
            privateStateId: escrowPrivateStateKey,        // Inform your provider database where to lock these secrets
            initialPrivateState: initialPrivateState,       // Feed your private witnesses
        });

        logger.info(
            { deployedContractAddress: deployedContract.deployedContractAddress }, 
            'Escrow contract deployed successfully'
        );

        // 4. Return the fully configured API lifecycle engine
        return new Escrow3PartyApiInstance(deployedContract, providers, logger);
    }

        /**
     * FACTORY METHOD: Joins an existing, already deployed contract instance
     * @param providers The wallet and network communication handles of the joining participant
     * @param contractAddress The target contract address on the Midnight ledger
     * @param logger Logging instance
     */
    static async join(
        providers: EscrowProviders,
        contractAddress: ContractAddress,
        logger: Logger
    ): Promise<Escrow3PartyApiInstance> {
        logger.info({ contractAddress }, 'Attempting to attach to existing escrow contract address...');

        // 1. Point your wallet's private state tracking layer to the target contract location
        providers.privateStateProvider.setContractAddress(contractAddress);

        // 2. Query the ledger history via the Midnight SDK to bind the target contract
        const deployedContract = await findDeployedContract(providers, {
            compiledContract: Escrow3PartyContractCompiled,
            contractAddress: contractAddress,
            privateStateId: escrowPrivateStateKey,
        });

        // 3. Fetch the current state snapshot to obtain the deployed immutable contract rules
        const [ledger] = await deployedContract.state();

        // 4. Check if this specific participant wallet already has an active private state.
        // If they are joining for the first time, initialize their local private secrets.
        let privateState = await providers.privateStateProvider.get<EscrowPrivateState>(escrowPrivateStateKey);
        
        if (!privateState) {
            logger.trace('No local private state found for this contract. Initializing unique participant keys...');
            
            // Generate secure random keys matching the contract structural footprint.
            // Note: The public 'terms' are synchronized directly out of the blockchain ledger snapshot!
            privateState = createEscrowPrivateState({
                sellerKey: utils.randomBytes(32),
                buyerKey: utils.randomBytes(32),
                logisticsKey: utils.randomBytes(32),
                pickupSecret: utils.randomBytes(32),
                deliverySecret: utils.randomBytes(32),
                mediatorKey: utils.randomBytes(32),
                terms: ledger.terms, // Synced from on-chain rules
            });

            // Persist the freshly generated secrets locally into this user's secure state database
            await providers.privateStateProvider.set(escrowPrivateStateKey, privateState);
        } else {
            logger.trace('Existing private state footprint detected. Re-using active wallet secrets.');
        }

        logger.info({ contractAddress }, 'Successfully joined and synchronized contract state machine');

        // 5. Instantiation of the same unified API wrapper engine
        return new Escrow3PartyApiInstance(deployedContract, providers, logger);
    }
}
// ============================================================================
// GLOBAL PACKAGE MODULE EXPORTS (Must sit in file scope)
// ============================================================================

export * as utils from './utils/index.js';

export * from './common-types.js';