import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum EscrowState { UNINITIALIZED = 0,
                          SELLER_DEPOSITED = 1,
                          BUYER_DEPOSITED = 2,
                          LOGISTICS_DEPOSITED = 3,
                          IN_TRANSIT = 4,
                          DELIVERED = 5,
                          DISPUTED = 6,
                          RESOLVED = 7,
                          EXPIRED = 8
}

export enum PartyRole { SELLER = 0, BUYER = 1, LOGISTICS = 2 }

export enum DisputeReason { NONE = 0,
                            GOODS_NOT_AS_DESCRIBED = 1,
                            LOGISTICS_THEFT = 2,
                            LOGISTICS_LATE = 3,
                            BUYER_REFUSAL = 4
}

export type PartyInfo = { address: Uint8Array;
                          stake: bigint;
                          deposited: boolean;
                          pubKeyHash: Uint8Array
                        };

export type EscrowTerms = { goodsHash: Uint8Array;
                            paymentAmount: bigint;
                            paymentAmountSplit: bigint;
                            sellerStake: bigint;
                            buyerStake: bigint;
                            logisticsStake: bigint;
                            logisticsStakeTimeOut: bigint;
                            deliveryDeadline: bigint;
                            logisticsFee: bigint
                          };

export type DisputeInfo = { raisedBy: PartyRole;
                            reason: DisputeReason;
                            raisedAt: bigint;
                            resolved: boolean;
                            resolution: bigint
                          };

export type Witnesses<PS> = {
  localSellerKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  localBuyerKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  localLogisticsKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  pickupSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  deliverySecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  escrow3PartyTerms(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, EscrowTerms];
  mediatorKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  currentBlockHeight(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  deadlinePassed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  splitTimeoutStake(context: __compactRuntime.CircuitContext<PS>,
                    buyerShare_0: bigint,
                    sellerShare_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  sellerInitialize(context: __compactRuntime.CircuitContext<PS>,
                   escrow3_0: EscrowTerms,
                   pickupSecretHashInput_0: Uint8Array,
                   deliverySecretHashInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  buyerDeposit(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  logisticsDeposit(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  confirmPickup(context: __compactRuntime.CircuitContext<PS>,
                pickupSecretInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  confirmDelivery(context: __compactRuntime.CircuitContext<PS>,
                  deliverySecretInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  triggerTimeout(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  raiseDispute(context: __compactRuntime.CircuitContext<PS>,
               reason_0: DisputeReason): __compactRuntime.CircuitResults<PS, []>;
  sellerRaiseDispute(context: __compactRuntime.CircuitContext<PS>,
                     reason_0: DisputeReason): __compactRuntime.CircuitResults<PS, []>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 resolution_0: bigint,
                 mediatorSig_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  getState(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, EscrowState>;
  getTerms(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, EscrowTerms>;
  getSeller(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getBuyer(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getLogistics(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getDispute(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, DisputeInfo>;
  isPickupConfirmed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  isDeliveryConfirmed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  isDeadlinePassed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  getCurrentBlockHeight(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  emergencyPause(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  getSequence(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
}

export type ProvableCircuits<PS> = {
  currentBlockHeight(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  deadlinePassed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  splitTimeoutStake(context: __compactRuntime.CircuitContext<PS>,
                    buyerShare_0: bigint,
                    sellerShare_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  sellerInitialize(context: __compactRuntime.CircuitContext<PS>,
                   escrow3_0: EscrowTerms,
                   pickupSecretHashInput_0: Uint8Array,
                   deliverySecretHashInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  buyerDeposit(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  logisticsDeposit(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  confirmPickup(context: __compactRuntime.CircuitContext<PS>,
                pickupSecretInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  confirmDelivery(context: __compactRuntime.CircuitContext<PS>,
                  deliverySecretInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  triggerTimeout(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  raiseDispute(context: __compactRuntime.CircuitContext<PS>,
               reason_0: DisputeReason): __compactRuntime.CircuitResults<PS, []>;
  sellerRaiseDispute(context: __compactRuntime.CircuitContext<PS>,
                     reason_0: DisputeReason): __compactRuntime.CircuitResults<PS, []>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 resolution_0: bigint,
                 mediatorSig_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  getState(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, EscrowState>;
  getTerms(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, EscrowTerms>;
  getSeller(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getBuyer(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getLogistics(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getDispute(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, DisputeInfo>;
  isPickupConfirmed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  isDeliveryConfirmed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  isDeadlinePassed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  getCurrentBlockHeight(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  emergencyPause(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  getSequence(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
}

export type PureCircuits = {
  checkDeadline(isPastDeadline_0: boolean): [];
  publicKey(sk_0: Uint8Array, seq_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  currentBlockHeight(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  deadlinePassed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  checkDeadline(context: __compactRuntime.CircuitContext<PS>,
                isPastDeadline_0: boolean): __compactRuntime.CircuitResults<PS, []>;
  publicKey(context: __compactRuntime.CircuitContext<PS>,
            sk_0: Uint8Array,
            seq_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  splitTimeoutStake(context: __compactRuntime.CircuitContext<PS>,
                    buyerShare_0: bigint,
                    sellerShare_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  sellerInitialize(context: __compactRuntime.CircuitContext<PS>,
                   escrow3_0: EscrowTerms,
                   pickupSecretHashInput_0: Uint8Array,
                   deliverySecretHashInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  buyerDeposit(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  logisticsDeposit(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  confirmPickup(context: __compactRuntime.CircuitContext<PS>,
                pickupSecretInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  confirmDelivery(context: __compactRuntime.CircuitContext<PS>,
                  deliverySecretInput_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  triggerTimeout(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  raiseDispute(context: __compactRuntime.CircuitContext<PS>,
               reason_0: DisputeReason): __compactRuntime.CircuitResults<PS, []>;
  sellerRaiseDispute(context: __compactRuntime.CircuitContext<PS>,
                     reason_0: DisputeReason): __compactRuntime.CircuitResults<PS, []>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 resolution_0: bigint,
                 mediatorSig_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  getState(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, EscrowState>;
  getTerms(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, EscrowTerms>;
  getSeller(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getBuyer(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getLogistics(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PartyInfo>;
  getDispute(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, DisputeInfo>;
  isPickupConfirmed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  isDeliveryConfirmed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  isDeadlinePassed(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  getCurrentBlockHeight(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
  emergencyPause(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  getSequence(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, bigint>;
}

export type Ledger = {
  readonly state: EscrowState;
  readonly terms: EscrowTerms;
  readonly seller: PartyInfo;
  readonly buyer: PartyInfo;
  readonly logistics: PartyInfo;
  readonly dispute: DisputeInfo;
  readonly pickupSecretHash: Uint8Array;
  readonly deliverySecretHash: Uint8Array;
  readonly pickupConfirmed: boolean;
  readonly deliveryConfirmed: boolean;
  readonly sequence: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
