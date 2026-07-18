import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var EscrowState;
(function (EscrowState) {
  EscrowState[EscrowState['UNINITIALIZED'] = 0] = 'UNINITIALIZED';
  EscrowState[EscrowState['SELLER_DEPOSITED'] = 1] = 'SELLER_DEPOSITED';
  EscrowState[EscrowState['BUYER_DEPOSITED'] = 2] = 'BUYER_DEPOSITED';
  EscrowState[EscrowState['LOGISTICS_DEPOSITED'] = 3] = 'LOGISTICS_DEPOSITED';
  EscrowState[EscrowState['IN_TRANSIT'] = 4] = 'IN_TRANSIT';
  EscrowState[EscrowState['DELIVERED'] = 5] = 'DELIVERED';
  EscrowState[EscrowState['DISPUTED'] = 6] = 'DISPUTED';
  EscrowState[EscrowState['RESOLVED'] = 7] = 'RESOLVED';
  EscrowState[EscrowState['EXPIRED'] = 8] = 'EXPIRED';
})(EscrowState || (EscrowState = {}));

export var PartyRole;
(function (PartyRole) {
  PartyRole[PartyRole['SELLER'] = 0] = 'SELLER';
  PartyRole[PartyRole['BUYER'] = 1] = 'BUYER';
  PartyRole[PartyRole['LOGISTICS'] = 2] = 'LOGISTICS';
})(PartyRole || (PartyRole = {}));

export var DisputeReason;
(function (DisputeReason) {
  DisputeReason[DisputeReason['NONE'] = 0] = 'NONE';
  DisputeReason[DisputeReason['GOODS_NOT_AS_DESCRIBED'] = 1] = 'GOODS_NOT_AS_DESCRIBED';
  DisputeReason[DisputeReason['LOGISTICS_THEFT'] = 2] = 'LOGISTICS_THEFT';
  DisputeReason[DisputeReason['LOGISTICS_LATE'] = 3] = 'LOGISTICS_LATE';
  DisputeReason[DisputeReason['BUYER_REFUSAL'] = 4] = 'BUYER_REFUSAL';
})(DisputeReason || (DisputeReason = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_1 = __compactRuntime.CompactTypeField;

const _descriptor_2 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_3 = __compactRuntime.CompactTypeBoolean;

class _PartyInfo_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment())));
  }
  fromValue(value_0) {
    return {
      address: _descriptor_2.fromValue(value_0),
      stake: _descriptor_1.fromValue(value_0),
      deposited: _descriptor_3.fromValue(value_0),
      pubKeyHash: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.address).concat(_descriptor_1.toValue(value_0.stake).concat(_descriptor_3.toValue(value_0.deposited).concat(_descriptor_2.toValue(value_0.pubKeyHash))));
  }
}

const _descriptor_4 = new _PartyInfo_0();

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(4, 1);

class _DisputeInfo_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_6.alignment().concat(_descriptor_1.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment()))));
  }
  fromValue(value_0) {
    return {
      raisedBy: _descriptor_5.fromValue(value_0),
      reason: _descriptor_6.fromValue(value_0),
      raisedAt: _descriptor_1.fromValue(value_0),
      resolved: _descriptor_3.fromValue(value_0),
      resolution: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.raisedBy).concat(_descriptor_6.toValue(value_0.reason).concat(_descriptor_1.toValue(value_0.raisedAt).concat(_descriptor_3.toValue(value_0.resolved).concat(_descriptor_0.toValue(value_0.resolution)))));
  }
}

const _descriptor_7 = new _DisputeInfo_0();

class _EscrowTerms_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      goodsHash: _descriptor_2.fromValue(value_0),
      paymentAmount: _descriptor_0.fromValue(value_0),
      paymentAmountSplit: _descriptor_0.fromValue(value_0),
      sellerStake: _descriptor_0.fromValue(value_0),
      buyerStake: _descriptor_0.fromValue(value_0),
      logisticsStake: _descriptor_0.fromValue(value_0),
      logisticsStakeTimeOut: _descriptor_0.fromValue(value_0),
      deliveryDeadline: _descriptor_0.fromValue(value_0),
      logisticsFee: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.goodsHash).concat(_descriptor_0.toValue(value_0.paymentAmount).concat(_descriptor_0.toValue(value_0.paymentAmountSplit).concat(_descriptor_0.toValue(value_0.sellerStake).concat(_descriptor_0.toValue(value_0.buyerStake).concat(_descriptor_0.toValue(value_0.logisticsStake).concat(_descriptor_0.toValue(value_0.logisticsStakeTimeOut).concat(_descriptor_0.toValue(value_0.deliveryDeadline).concat(_descriptor_0.toValue(value_0.logisticsFee)))))))));
  }
}

const _descriptor_8 = new _EscrowTerms_0();

const _descriptor_9 = new __compactRuntime.CompactTypeEnum(8, 1);

const _descriptor_10 = new __compactRuntime.CompactTypeVector(3, _descriptor_2);

const _descriptor_11 = new __compactRuntime.CompactTypeVector(1, _descriptor_2);

class _Either_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_3.fromValue(value_0),
      left: _descriptor_2.fromValue(value_0),
      right: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_left).concat(_descriptor_2.toValue(value_0.left).concat(_descriptor_2.toValue(value_0.right)));
  }
}

const _descriptor_12 = new _Either_0();

const _descriptor_13 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.bytes);
  }
}

const _descriptor_14 = new _ContractAddress_0();

const _descriptor_15 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_16 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.localSellerKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localSellerKey');
    }
    if (typeof(witnesses_0.localBuyerKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localBuyerKey');
    }
    if (typeof(witnesses_0.localLogisticsKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localLogisticsKey');
    }
    if (typeof(witnesses_0.pickupSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named pickupSecret');
    }
    if (typeof(witnesses_0.deliverySecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named deliverySecret');
    }
    if (typeof(witnesses_0.escrow3PartyTerms) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named escrow3PartyTerms');
    }
    if (typeof(witnesses_0.mediatorKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named mediatorKey');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      currentBlockHeight: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`currentBlockHeight: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('currentBlockHeight',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 165 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._currentBlockHeight_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      deadlinePassed: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`deadlinePassed: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('deadlinePassed',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 170 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._deadlinePassed_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      checkDeadline(context, ...args_1) {
        return { result: pureCircuits.checkDeadline(...args_1), context };
      },
      publicKey(context, ...args_1) {
        return { result: pureCircuits.publicKey(...args_1), context };
      },
      splitTimeoutStake: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`splitTimeoutStake: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const buyerShare_0 = args_1[1];
        const sellerShare_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('splitTimeoutStake',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 203 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(buyerShare_0) === 'bigint' && buyerShare_0 >= 0 && buyerShare_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('splitTimeoutStake',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'escrow3party.compact line 203 char 1',
                                     'Field',
                                     buyerShare_0)
        }
        if (!(typeof(sellerShare_0) === 'bigint' && sellerShare_0 >= 0 && sellerShare_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('splitTimeoutStake',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'escrow3party.compact line 203 char 1',
                                     'Field',
                                     sellerShare_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(buyerShare_0).concat(_descriptor_1.toValue(sellerShare_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._splitTimeoutStake_0(context,
                                                   partialProofData,
                                                   buyerShare_0,
                                                   sellerShare_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      sellerInitialize: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`sellerInitialize: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const escrow3_0 = args_1[1];
        const pickupSecretHashInput_0 = args_1[2];
        const deliverySecretHashInput_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('sellerInitialize',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 257 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(escrow3_0) === 'object' && escrow3_0.goodsHash.buffer instanceof ArrayBuffer && escrow3_0.goodsHash.BYTES_PER_ELEMENT === 1 && escrow3_0.goodsHash.length === 32 && typeof(escrow3_0.paymentAmount) === 'bigint' && escrow3_0.paymentAmount >= 0n && escrow3_0.paymentAmount <= 18446744073709551615n && typeof(escrow3_0.paymentAmountSplit) === 'bigint' && escrow3_0.paymentAmountSplit >= 0n && escrow3_0.paymentAmountSplit <= 18446744073709551615n && typeof(escrow3_0.sellerStake) === 'bigint' && escrow3_0.sellerStake >= 0n && escrow3_0.sellerStake <= 18446744073709551615n && typeof(escrow3_0.buyerStake) === 'bigint' && escrow3_0.buyerStake >= 0n && escrow3_0.buyerStake <= 18446744073709551615n && typeof(escrow3_0.logisticsStake) === 'bigint' && escrow3_0.logisticsStake >= 0n && escrow3_0.logisticsStake <= 18446744073709551615n && typeof(escrow3_0.logisticsStakeTimeOut) === 'bigint' && escrow3_0.logisticsStakeTimeOut >= 0n && escrow3_0.logisticsStakeTimeOut <= 18446744073709551615n && typeof(escrow3_0.deliveryDeadline) === 'bigint' && escrow3_0.deliveryDeadline >= 0n && escrow3_0.deliveryDeadline <= 18446744073709551615n && typeof(escrow3_0.logisticsFee) === 'bigint' && escrow3_0.logisticsFee >= 0n && escrow3_0.logisticsFee <= 18446744073709551615n)) {
          __compactRuntime.typeError('sellerInitialize',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'escrow3party.compact line 257 char 1',
                                     'struct EscrowTerms<goodsHash: Bytes<32>, paymentAmount: Uint<0..18446744073709551616>, paymentAmountSplit: Uint<0..18446744073709551616>, sellerStake: Uint<0..18446744073709551616>, buyerStake: Uint<0..18446744073709551616>, logisticsStake: Uint<0..18446744073709551616>, logisticsStakeTimeOut: Uint<0..18446744073709551616>, deliveryDeadline: Uint<0..18446744073709551616>, logisticsFee: Uint<0..18446744073709551616>>',
                                     escrow3_0)
        }
        if (!(pickupSecretHashInput_0.buffer instanceof ArrayBuffer && pickupSecretHashInput_0.BYTES_PER_ELEMENT === 1 && pickupSecretHashInput_0.length === 32)) {
          __compactRuntime.typeError('sellerInitialize',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'escrow3party.compact line 257 char 1',
                                     'Bytes<32>',
                                     pickupSecretHashInput_0)
        }
        if (!(deliverySecretHashInput_0.buffer instanceof ArrayBuffer && deliverySecretHashInput_0.BYTES_PER_ELEMENT === 1 && deliverySecretHashInput_0.length === 32)) {
          __compactRuntime.typeError('sellerInitialize',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'escrow3party.compact line 257 char 1',
                                     'Bytes<32>',
                                     deliverySecretHashInput_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_8.toValue(escrow3_0).concat(_descriptor_2.toValue(pickupSecretHashInput_0).concat(_descriptor_2.toValue(deliverySecretHashInput_0))),
            alignment: _descriptor_8.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._sellerInitialize_0(context,
                                                  partialProofData,
                                                  escrow3_0,
                                                  pickupSecretHashInput_0,
                                                  deliverySecretHashInput_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      buyerDeposit: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`buyerDeposit: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('buyerDeposit',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 296 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._buyerDeposit_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      logisticsDeposit: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`logisticsDeposit: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('logisticsDeposit',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 315 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._logisticsDeposit_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      confirmPickup: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`confirmPickup: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const pickupSecretInput_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('confirmPickup',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 337 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(pickupSecretInput_0.buffer instanceof ArrayBuffer && pickupSecretInput_0.BYTES_PER_ELEMENT === 1 && pickupSecretInput_0.length === 32)) {
          __compactRuntime.typeError('confirmPickup',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'escrow3party.compact line 337 char 1',
                                     'Bytes<32>',
                                     pickupSecretInput_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(pickupSecretInput_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._confirmPickup_0(context,
                                               partialProofData,
                                               pickupSecretInput_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      confirmDelivery: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`confirmDelivery: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const deliverySecretInput_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('confirmDelivery',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 355 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(deliverySecretInput_0.buffer instanceof ArrayBuffer && deliverySecretInput_0.BYTES_PER_ELEMENT === 1 && deliverySecretInput_0.length === 32)) {
          __compactRuntime.typeError('confirmDelivery',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'escrow3party.compact line 355 char 1',
                                     'Bytes<32>',
                                     deliverySecretInput_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(deliverySecretInput_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._confirmDelivery_0(context,
                                                 partialProofData,
                                                 deliverySecretInput_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      triggerTimeout: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`triggerTimeout: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('triggerTimeout',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 379 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._triggerTimeout_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      raiseDispute: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`raiseDispute: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const reason_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('raiseDispute',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 391 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(reason_0) === 'number' && reason_0 >= 0 && reason_0 <= 4)) {
          __compactRuntime.typeError('raiseDispute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'escrow3party.compact line 391 char 1',
                                     'Enum<DisputeReason, NONE, GOODS_NOT_AS_DESCRIBED, LOGISTICS_THEFT, LOGISTICS_LATE, BUYER_REFUSAL>',
                                     reason_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(reason_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._raiseDispute_0(context,
                                              partialProofData,
                                              reason_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      sellerRaiseDispute: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`sellerRaiseDispute: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const reason_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('sellerRaiseDispute',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 410 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(reason_0) === 'number' && reason_0 >= 0 && reason_0 <= 4)) {
          __compactRuntime.typeError('sellerRaiseDispute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'escrow3party.compact line 410 char 1',
                                     'Enum<DisputeReason, NONE, GOODS_NOT_AS_DESCRIBED, LOGISTICS_THEFT, LOGISTICS_LATE, BUYER_REFUSAL>',
                                     reason_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(reason_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._sellerRaiseDispute_0(context,
                                                    partialProofData,
                                                    reason_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      resolveDispute: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`resolveDispute: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const resolution_0 = args_1[1];
        const mediatorSig_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 431 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(resolution_0) === 'bigint' && resolution_0 >= 0n && resolution_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'escrow3party.compact line 431 char 1',
                                     'Uint<0..18446744073709551616>',
                                     resolution_0)
        }
        if (!(mediatorSig_0.buffer instanceof ArrayBuffer && mediatorSig_0.BYTES_PER_ELEMENT === 1 && mediatorSig_0.length === 32)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'escrow3party.compact line 431 char 1',
                                     'Bytes<32>',
                                     mediatorSig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(resolution_0).concat(_descriptor_2.toValue(mediatorSig_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_2.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._resolveDispute_0(context,
                                                partialProofData,
                                                resolution_0,
                                                mediatorSig_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getState: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getState: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getState',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 455 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getState_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_9.toValue(result_0), alignment: _descriptor_9.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getTerms: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getTerms: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getTerms',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 459 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getTerms_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_8.toValue(result_0), alignment: _descriptor_8.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getSeller: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getSeller: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getSeller',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 463 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getSeller_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getBuyer: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getBuyer: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getBuyer',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 467 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getBuyer_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getLogistics: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getLogistics: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getLogistics',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 471 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getLogistics_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getDispute: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getDispute: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getDispute',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 475 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getDispute_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_7.toValue(result_0), alignment: _descriptor_7.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      isPickupConfirmed: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`isPickupConfirmed: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('isPickupConfirmed',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 479 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isPickupConfirmed_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      isDeliveryConfirmed: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`isDeliveryConfirmed: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('isDeliveryConfirmed',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 483 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isDeliveryConfirmed_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      isDeadlinePassed: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`isDeadlinePassed: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('isDeadlinePassed',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 487 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isDeadlinePassed_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getCurrentBlockHeight: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getCurrentBlockHeight: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getCurrentBlockHeight',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 491 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getCurrentBlockHeight_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      emergencyPause: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`emergencyPause: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('emergencyPause',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 500 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._emergencyPause_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getSequence: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`getSequence: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getSequence',
                                     'argument 1 (as invoked from Typescript)',
                                     'escrow3party.compact line 508 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getSequence_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      currentBlockHeight: this.circuits.currentBlockHeight,
      deadlinePassed: this.circuits.deadlinePassed,
      splitTimeoutStake: this.circuits.splitTimeoutStake,
      sellerInitialize: this.circuits.sellerInitialize,
      buyerDeposit: this.circuits.buyerDeposit,
      logisticsDeposit: this.circuits.logisticsDeposit,
      confirmPickup: this.circuits.confirmPickup,
      confirmDelivery: this.circuits.confirmDelivery,
      triggerTimeout: this.circuits.triggerTimeout,
      raiseDispute: this.circuits.raiseDispute,
      sellerRaiseDispute: this.circuits.sellerRaiseDispute,
      resolveDispute: this.circuits.resolveDispute,
      getState: this.circuits.getState,
      getTerms: this.circuits.getTerms,
      getSeller: this.circuits.getSeller,
      getBuyer: this.circuits.getBuyer,
      getLogistics: this.circuits.getLogistics,
      getDispute: this.circuits.getDispute,
      isPickupConfirmed: this.circuits.isPickupConfirmed,
      isDeliveryConfirmed: this.circuits.isDeliveryConfirmed,
      isDeadlinePassed: this.circuits.isDeadlinePassed,
      getCurrentBlockHeight: this.circuits.getCurrentBlockHeight,
      emergencyPause: this.circuits.emergencyPause,
      getSequence: this.circuits.getSequence
    };
    this.provableCircuits = {
      currentBlockHeight: this.circuits.currentBlockHeight,
      deadlinePassed: this.circuits.deadlinePassed,
      splitTimeoutStake: this.circuits.splitTimeoutStake,
      sellerInitialize: this.circuits.sellerInitialize,
      buyerDeposit: this.circuits.buyerDeposit,
      logisticsDeposit: this.circuits.logisticsDeposit,
      confirmPickup: this.circuits.confirmPickup,
      confirmDelivery: this.circuits.confirmDelivery,
      triggerTimeout: this.circuits.triggerTimeout,
      raiseDispute: this.circuits.raiseDispute,
      sellerRaiseDispute: this.circuits.sellerRaiseDispute,
      resolveDispute: this.circuits.resolveDispute,
      getState: this.circuits.getState,
      getTerms: this.circuits.getTerms,
      getSeller: this.circuits.getSeller,
      getBuyer: this.circuits.getBuyer,
      getLogistics: this.circuits.getLogistics,
      getDispute: this.circuits.getDispute,
      isPickupConfirmed: this.circuits.isPickupConfirmed,
      isDeliveryConfirmed: this.circuits.isDeliveryConfirmed,
      isDeadlinePassed: this.circuits.isDeadlinePassed,
      getCurrentBlockHeight: this.circuits.getCurrentBlockHeight,
      emergencyPause: this.circuits.emergencyPause,
      getSequence: this.circuits.getSequence
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('currentBlockHeight', new __compactRuntime.ContractOperation());
    state_0.setOperation('deadlinePassed', new __compactRuntime.ContractOperation());
    state_0.setOperation('splitTimeoutStake', new __compactRuntime.ContractOperation());
    state_0.setOperation('sellerInitialize', new __compactRuntime.ContractOperation());
    state_0.setOperation('buyerDeposit', new __compactRuntime.ContractOperation());
    state_0.setOperation('logisticsDeposit', new __compactRuntime.ContractOperation());
    state_0.setOperation('confirmPickup', new __compactRuntime.ContractOperation());
    state_0.setOperation('confirmDelivery', new __compactRuntime.ContractOperation());
    state_0.setOperation('triggerTimeout', new __compactRuntime.ContractOperation());
    state_0.setOperation('raiseDispute', new __compactRuntime.ContractOperation());
    state_0.setOperation('sellerRaiseDispute', new __compactRuntime.ContractOperation());
    state_0.setOperation('resolveDispute', new __compactRuntime.ContractOperation());
    state_0.setOperation('getState', new __compactRuntime.ContractOperation());
    state_0.setOperation('getTerms', new __compactRuntime.ContractOperation());
    state_0.setOperation('getSeller', new __compactRuntime.ContractOperation());
    state_0.setOperation('getBuyer', new __compactRuntime.ContractOperation());
    state_0.setOperation('getLogistics', new __compactRuntime.ContractOperation());
    state_0.setOperation('getDispute', new __compactRuntime.ContractOperation());
    state_0.setOperation('isPickupConfirmed', new __compactRuntime.ContractOperation());
    state_0.setOperation('isDeliveryConfirmed', new __compactRuntime.ContractOperation());
    state_0.setOperation('isDeadlinePassed', new __compactRuntime.ContractOperation());
    state_0.setOperation('getCurrentBlockHeight', new __compactRuntime.ContractOperation());
    state_0.setOperation('emergencyPause', new __compactRuntime.ContractOperation());
    state_0.setOperation('getSequence', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(1n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue({ goodsHash: new Uint8Array(32), paymentAmount: 0n, paymentAmountSplit: 0n, sellerStake: 0n, buyerStake: 0n, logisticsStake: 0n, logisticsStakeTimeOut: 0n, deliveryDeadline: 0n, logisticsFee: 0n }),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(2n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ address: new Uint8Array(32), stake: 0n, deposited: false, pubKeyHash: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(3n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ address: new Uint8Array(32), stake: 0n, deposited: false, pubKeyHash: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(4n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ address: new Uint8Array(32), stake: 0n, deposited: false, pubKeyHash: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(5n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue({ raisedBy: 0, reason: 0, raisedAt: 0n, resolved: false, resolution: 0n }),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(6n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(7n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(8n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(9n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(10n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_16.toValue(10n),
                                                                  alignment: _descriptor_16.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_15.toValue(tmp_0),
                                                                alignment: _descriptor_15.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = { address:
                      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                    stake: 0n,
                    deposited: true,
                    pubKeyHash:
                      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(2n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_2 = { address:
                      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                    stake: 0n,
                    deposited: true,
                    pubKeyHash:
                      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(3n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_2),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_3 = { address:
                      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                    stake: 0n,
                    deposited: true,
                    pubKeyHash:
                      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(4n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_3),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_4 = { raisedBy: 0,
                    reason: 0,
                    raisedAt: 0n,
                    resolved: true,
                    resolution: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(5n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_4),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(8n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(9n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_10, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_11, value_0);
    return result_0;
  }
  _localSellerKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localSellerKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('localSellerKey',
                                 'return value',
                                 'escrow3party.compact line 85 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _localBuyerKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localBuyerKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('localBuyerKey',
                                 'return value',
                                 'escrow3party.compact line 86 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _localLogisticsKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localLogisticsKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('localLogisticsKey',
                                 'return value',
                                 'escrow3party.compact line 87 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _pickupSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.pickupSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('pickupSecret',
                                 'return value',
                                 'escrow3party.compact line 88 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _deliverySecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.deliverySecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('deliverySecret',
                                 'return value',
                                 'escrow3party.compact line 89 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _escrow3PartyTerms_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.escrow3PartyTerms(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && result_0.goodsHash.buffer instanceof ArrayBuffer && result_0.goodsHash.BYTES_PER_ELEMENT === 1 && result_0.goodsHash.length === 32 && typeof(result_0.paymentAmount) === 'bigint' && result_0.paymentAmount >= 0n && result_0.paymentAmount <= 18446744073709551615n && typeof(result_0.paymentAmountSplit) === 'bigint' && result_0.paymentAmountSplit >= 0n && result_0.paymentAmountSplit <= 18446744073709551615n && typeof(result_0.sellerStake) === 'bigint' && result_0.sellerStake >= 0n && result_0.sellerStake <= 18446744073709551615n && typeof(result_0.buyerStake) === 'bigint' && result_0.buyerStake >= 0n && result_0.buyerStake <= 18446744073709551615n && typeof(result_0.logisticsStake) === 'bigint' && result_0.logisticsStake >= 0n && result_0.logisticsStake <= 18446744073709551615n && typeof(result_0.logisticsStakeTimeOut) === 'bigint' && result_0.logisticsStakeTimeOut >= 0n && result_0.logisticsStakeTimeOut <= 18446744073709551615n && typeof(result_0.deliveryDeadline) === 'bigint' && result_0.deliveryDeadline >= 0n && result_0.deliveryDeadline <= 18446744073709551615n && typeof(result_0.logisticsFee) === 'bigint' && result_0.logisticsFee >= 0n && result_0.logisticsFee <= 18446744073709551615n)) {
      __compactRuntime.typeError('escrow3PartyTerms',
                                 'return value',
                                 'escrow3party.compact line 90 char 1',
                                 'struct EscrowTerms<goodsHash: Bytes<32>, paymentAmount: Uint<0..18446744073709551616>, paymentAmountSplit: Uint<0..18446744073709551616>, sellerStake: Uint<0..18446744073709551616>, buyerStake: Uint<0..18446744073709551616>, logisticsStake: Uint<0..18446744073709551616>, logisticsStakeTimeOut: Uint<0..18446744073709551616>, deliveryDeadline: Uint<0..18446744073709551616>, logisticsFee: Uint<0..18446744073709551616>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_8.toValue(result_0),
      alignment: _descriptor_8.alignment()
    });
    return result_0;
  }
  _assertSeller_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            !==
                            0,
                            'Escrow not initialized');
    __compactRuntime.assert(this._equal_0(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_16.toValue(2n),
                                                                                                                                alignment: _descriptor_16.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value).address,
                                          this._publicKey_0(this._localSellerKey_0(context,
                                                                                   partialProofData),
                                                            __compactRuntime.convertFieldToBytes(32,
                                                                                                 _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                                           partialProofData,
                                                                                                                                                           [
                                                                                                                                                            { dup: { n: 0 } },
                                                                                                                                                            { idx: { cached: false,
                                                                                                                                                                     pushPath: false,
                                                                                                                                                                     path: [
                                                                                                                                                                            { tag: 'value',
                                                                                                                                                                              value: { value: _descriptor_16.toValue(10n),
                                                                                                                                                                                       alignment: _descriptor_16.alignment() } }] } },
                                                                                                                                                            { popeq: { cached: true,
                                                                                                                                                                       result: undefined } }]).value),
                                                                                                 'escrow3party.compact line 138 char 56'))),
                            'Not seller');
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(2n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).deposited,
                            'Seller not deposited');
    return [];
  }
  _assertBuyer_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            !==
                            0,
                            'Escrow not initialized');
    __compactRuntime.assert(this._equal_1(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_16.toValue(3n),
                                                                                                                                alignment: _descriptor_16.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value).address,
                                          this._publicKey_0(this._localBuyerKey_0(context,
                                                                                  partialProofData),
                                                            __compactRuntime.convertFieldToBytes(32,
                                                                                                 _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                                           partialProofData,
                                                                                                                                                           [
                                                                                                                                                            { dup: { n: 0 } },
                                                                                                                                                            { idx: { cached: false,
                                                                                                                                                                     pushPath: false,
                                                                                                                                                                     path: [
                                                                                                                                                                            { tag: 'value',
                                                                                                                                                                              value: { value: _descriptor_16.toValue(10n),
                                                                                                                                                                                       alignment: _descriptor_16.alignment() } }] } },
                                                                                                                                                            { popeq: { cached: true,
                                                                                                                                                                       result: undefined } }]).value),
                                                                                                 'escrow3party.compact line 145 char 54'))),
                            'Not buyer');
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(3n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).deposited,
                            'Buyer not deposited');
    return [];
  }
  _assertLogistics_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            !==
                            0,
                            'Escrow not initialized');
    __compactRuntime.assert(this._equal_2(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_16.toValue(4n),
                                                                                                                                alignment: _descriptor_16.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value).address,
                                          this._publicKey_0(this._localLogisticsKey_0(context,
                                                                                      partialProofData),
                                                            __compactRuntime.convertFieldToBytes(32,
                                                                                                 _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                                           partialProofData,
                                                                                                                                                           [
                                                                                                                                                            { dup: { n: 0 } },
                                                                                                                                                            { idx: { cached: false,
                                                                                                                                                                     pushPath: false,
                                                                                                                                                                     path: [
                                                                                                                                                                            { tag: 'value',
                                                                                                                                                                              value: { value: _descriptor_16.toValue(10n),
                                                                                                                                                                                       alignment: _descriptor_16.alignment() } }] } },
                                                                                                                                                            { popeq: { cached: true,
                                                                                                                                                                       result: undefined } }]).value),
                                                                                                 'escrow3party.compact line 152 char 62'))),
                            'Not logistics');
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(4n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).deposited,
                            'Logistics not deposited');
    return [];
  }
  _assertBuyerOrSeller_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            !==
                            0,
                            'Escrow not initialized');
    const caller_0 = this._publicKey_0(this._localSellerKey_0(context,
                                                              partialProofData),
                                       __compactRuntime.convertFieldToBytes(32,
                                                                            _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                      partialProofData,
                                                                                                                                      [
                                                                                                                                       { dup: { n: 0 } },
                                                                                                                                       { idx: { cached: false,
                                                                                                                                                pushPath: false,
                                                                                                                                                path: [
                                                                                                                                                       { tag: 'value',
                                                                                                                                                         value: { value: _descriptor_16.toValue(10n),
                                                                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                                                                       { popeq: { cached: true,
                                                                                                                                                  result: undefined } }]).value),
                                                                            'escrow3party.compact line 159 char 46'));
    __compactRuntime.assert(this._equal_3(caller_0,
                                          _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_16.toValue(2n),
                                                                                                                                alignment: _descriptor_16.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value).address)
                            ||
                            this._equal_4(caller_0,
                                          _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_16.toValue(3n),
                                                                                                                                alignment: _descriptor_16.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value).address),
                            'Not buyer or seller');
    __compactRuntime.assert(this._equal_5(caller_0,
                                          _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_16.toValue(2n),
                                                                                                                                alignment: _descriptor_16.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value).address)
                            &&
                            _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(2n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).deposited
                            ||
                            this._equal_6(caller_0,
                                          _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_16.toValue(3n),
                                                                                                                                alignment: _descriptor_16.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value).address)
                            &&
                            _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(3n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).deposited,
                            'Party not deposited');
    return [];
  }
  _currentBlockHeight_0(context, partialProofData) {
    return ((t1) => {
             if (t1 > 18446744073709551615n) {
               throw new __compactRuntime.CompactError('escrow3party.compact line 166 char 10: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
             }
             return t1;
           })(_descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_16.toValue(10n),
                                                                                                    alignment: _descriptor_16.alignment() } }] } },
                                                                         { popeq: { cached: true,
                                                                                    result: undefined } }]).value));
  }
  _deadlinePassed_0(context, partialProofData) {
    return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(1n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value).deliveryDeadline;
  }
  _checkDeadline_0(isPastDeadline_0) {
    __compactRuntime.assert(isPastDeadline_0 === true,
                            'The delivery deadline has not passed yet');
    return [];
  }
  _publicKey_0(sk_0, seq_0) {
    return this._persistentHash_0([new Uint8Array([101, 115, 99, 114, 111, 119, 58, 112, 107, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   seq_0,
                                   sk_0]);
  }
  _verifyPickupSecret_0(context, partialProofData, secret_0) {
    return this._equal_7(secret_0,
                         _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_16.toValue(6n),
                                                                                                               alignment: _descriptor_16.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value));
  }
  _verifyDeliverySecret_0(context, partialProofData, secret_0) {
    return this._equal_8(secret_0,
                         _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_16.toValue(7n),
                                                                                                               alignment: _descriptor_16.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value));
  }
  _splitTimeoutStake_0(context, partialProofData, buyerShare_0, sellerShare_0) {
    __compactRuntime.assert(__compactRuntime.addField(buyerShare_0,
                                                      sellerShare_0)
                            ===
                            _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(1n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).logisticsStake,
                            'Invalid split calculation');
    return [];
  }
  _sellerInitialize_0(context,
                      partialProofData,
                      escrow3_0,
                      pickupSecretHashInput_0,
                      deliverySecretHashInput_0)
  {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            0,
                            'Escrow already initialized');
    let t_0;
    __compactRuntime.assert((t_0 = escrow3_0.paymentAmount, t_0 > 0n),
                            'Payment amount must be positive');
    let t_1;
    __compactRuntime.assert((t_1 = escrow3_0.sellerStake, t_1 > 0n),
                            'Seller stake must be positive');
    let t_2;
    __compactRuntime.assert((t_2 = escrow3_0.buyerStake, t_2 > 0n),
                            'Buyer stake must be positive');
    let t_3;
    __compactRuntime.assert((t_3 = escrow3_0.logisticsStake, t_3 > 0n),
                            'Logistics stake must be positive');
    let t_4, t_5;
    __compactRuntime.assert((t_5 = escrow3_0.logisticsFee, t_5 > 0n)
                            &&
                            (t_4 = escrow3_0.logisticsFee,
                             t_4 <= escrow3_0.paymentAmount),
                            'Invalid logistics fee');
    let t_6, t_7;
    __compactRuntime.assert((t_7 = escrow3_0.paymentAmountSplit, t_7 > 0n)
                            &&
                            (t_6 = escrow3_0.paymentAmountSplit,
                             t_6 <= escrow3_0.paymentAmount),
                            'Invalid payment amount split');
    let t_8;
    __compactRuntime.assert((t_8 = escrow3_0.deliveryDeadline,
                             t_8
                             >
                             this._currentBlockHeight_0(context,
                                                        partialProofData)),
                            'Deadline must be in future');
    const sellerAddr_0 = this._publicKey_0(this._localSellerKey_0(context,
                                                                  partialProofData),
                                           __compactRuntime.convertFieldToBytes(32,
                                                                                _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                          partialProofData,
                                                                                                                                          [
                                                                                                                                           { dup: { n: 0 } },
                                                                                                                                           { idx: { cached: false,
                                                                                                                                                    pushPath: false,
                                                                                                                                                    path: [
                                                                                                                                                           { tag: 'value',
                                                                                                                                                             value: { value: _descriptor_16.toValue(10n),
                                                                                                                                                                      alignment: _descriptor_16.alignment() } }] } },
                                                                                                                                           { popeq: { cached: true,
                                                                                                                                                      result: undefined } }]).value),
                                                                                'escrow3party.compact line 271 char 50'));
    const tmp_0 = this._escrow3PartyTerms_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(1n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_1 = { address: sellerAddr_0,
                    stake: escrow3_0.sellerStake,
                    deposited: true,
                    pubKeyHash: this._persistentHash_1([sellerAddr_0]) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(2n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_2 = this._pickupSecret_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(6n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_2),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_3 = this._deliverySecret_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(7n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_3),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(8n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(9n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(1),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _buyerDeposit_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            1,
                            'Seller must deposit first');
    const buyerAddr_0 = this._publicKey_0(this._localBuyerKey_0(context,
                                                                partialProofData),
                                          __compactRuntime.convertFieldToBytes(32,
                                                                               _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                         partialProofData,
                                                                                                                                         [
                                                                                                                                          { dup: { n: 0 } },
                                                                                                                                          { idx: { cached: false,
                                                                                                                                                   pushPath: false,
                                                                                                                                                   path: [
                                                                                                                                                          { tag: 'value',
                                                                                                                                                            value: { value: _descriptor_16.toValue(10n),
                                                                                                                                                                     alignment: _descriptor_16.alignment() } }] } },
                                                                                                                                          { popeq: { cached: true,
                                                                                                                                                     result: undefined } }]).value),
                                                                               'escrow3party.compact line 298 char 48'));
    const tmp_0 = { address: buyerAddr_0,
                    stake:
                      _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_16.toValue(1n),
                                                                                                            alignment: _descriptor_16.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value).buyerStake,
                    deposited: true,
                    pubKeyHash: this._persistentHash_1([buyerAddr_0]) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(3n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(2),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _logisticsDeposit_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            2,
                            'Buyer must deposit first');
    const logisticsAddr_0 = this._publicKey_0(this._localLogisticsKey_0(context,
                                                                        partialProofData),
                                              __compactRuntime.convertFieldToBytes(32,
                                                                                   _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                             partialProofData,
                                                                                                                                             [
                                                                                                                                              { dup: { n: 0 } },
                                                                                                                                              { idx: { cached: false,
                                                                                                                                                       pushPath: false,
                                                                                                                                                       path: [
                                                                                                                                                              { tag: 'value',
                                                                                                                                                                value: { value: _descriptor_16.toValue(10n),
                                                                                                                                                                         alignment: _descriptor_16.alignment() } }] } },
                                                                                                                                              { popeq: { cached: true,
                                                                                                                                                         result: undefined } }]).value),
                                                                                   'escrow3party.compact line 318 char 56'));
    const tmp_0 = { address: logisticsAddr_0,
                    stake:
                      _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_16.toValue(1n),
                                                                                                            alignment: _descriptor_16.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value).logisticsStake,
                    deposited: true,
                    pubKeyHash: this._persistentHash_1([logisticsAddr_0]) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(4n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(3),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _confirmPickup_0(context, partialProofData, pickupSecretInput_0) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            3,
                            'All parties must deposit first');
    this._assertLogistics_0(context, partialProofData);
    __compactRuntime.assert(!_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_16.toValue(8n),
                                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Pickup already confirmed');
    __compactRuntime.assert(this._verifyPickupSecret_0(context,
                                                       partialProofData,
                                                       pickupSecretInput_0),
                            'Invalid pickup secret');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(8n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(4),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _confirmDelivery_0(context, partialProofData, deliverySecretInput_0) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            4,
                            'Goods must be in transit');
    this._assertBuyer_0(context, partialProofData);
    __compactRuntime.assert(!_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_16.toValue(9n),
                                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Delivery already confirmed');
    let t_0;
    __compactRuntime.assert((t_0 = this._deadlinePassed_0(context,
                                                          partialProofData),
                             t_0
                             <
                             this._currentBlockHeight_0(context,
                                                        partialProofData)),
                            'Delivery deadline passed - use timeout');
    __compactRuntime.assert(this._verifyDeliverySecret_0(context,
                                                         partialProofData,
                                                         deliverySecretInput_0),
                            'Invalid delivery secret');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(9n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(5),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(7),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _triggerTimeout_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            4,
                            'Goods must be in transit');
    this._assertBuyerOrSeller_0(context, partialProofData);
    let t_0;
    __compactRuntime.assert((t_0 = this._deadlinePassed_0(context,
                                                          partialProofData),
                             t_0
                             >
                             this._currentBlockHeight_0(context,
                                                        partialProofData)),
                            'Delivery deadline not yet passed');
    __compactRuntime.assert(!_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_16.toValue(9n),
                                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Delivery already confirmed');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(8),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(7),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _raiseDispute_0(context, partialProofData, reason_0) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            4
                            ||
                            _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            5,
                            'Invalid state for dispute');
    this._assertBuyer_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(5n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).reason
                            ===
                            0,
                            'Dispute already raised');
    __compactRuntime.assert(reason_0 !== 0, 'Invalid dispute reason');
    const tmp_0 = { raisedBy: 1,
                    reason: reason_0,
                    raisedAt:
                      this._currentBlockHeight_0(context, partialProofData),
                    resolved: false,
                    resolution: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(5n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(6),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _sellerRaiseDispute_0(context, partialProofData, reason_0) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            5,
                            'Invalid state for seller dispute');
    this._assertSeller_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(5n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).reason
                            ===
                            0,
                            'Dispute already raised');
    __compactRuntime.assert(reason_0 !== 0, 'Invalid dispute reason');
    const tmp_0 = { raisedBy: 0,
                    reason: reason_0,
                    raisedAt:
                      this._currentBlockHeight_0(context, partialProofData),
                    resolved: false,
                    resolution: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(5n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(6),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _mediatorKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.mediatorKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('mediatorKey',
                                 'return value',
                                 'escrow3party.compact line 429 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _resolveDispute_0(context, partialProofData, resolution_0, mediatorSig_0) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(0n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            6,
                            'No active dispute');
    __compactRuntime.assert(!_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_16.toValue(5n),
                                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value).resolved,
                            'Dispute already resolved');
    __compactRuntime.assert(resolution_0 <= 3n, 'Invalid resolution');
    const mediatorPubKey_0 = this._publicKey_0(this._mediatorKey_0(context,
                                                                   partialProofData),
                                               __compactRuntime.convertFieldToBytes(32,
                                                                                    _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                              partialProofData,
                                                                                                                                              [
                                                                                                                                               { dup: { n: 0 } },
                                                                                                                                               { idx: { cached: false,
                                                                                                                                                        pushPath: false,
                                                                                                                                                        path: [
                                                                                                                                                               { tag: 'value',
                                                                                                                                                                 value: { value: _descriptor_16.toValue(10n),
                                                                                                                                                                          alignment: _descriptor_16.alignment() } }] } },
                                                                                                                                               { popeq: { cached: true,
                                                                                                                                                          result: undefined } }]).value),
                                                                                    'escrow3party.compact line 437 char 51'));
    const tmp_0 = { raisedBy:
                      _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_16.toValue(5n),
                                                                                                            alignment: _descriptor_16.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value).raisedBy,
                    reason:
                      _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_16.toValue(5n),
                                                                                                            alignment: _descriptor_16.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value).reason,
                    raisedAt:
                      _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_16.toValue(5n),
                                                                                                            alignment: _descriptor_16.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value).raisedAt,
                    resolved: true,
                    resolution: resolution_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(5n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(7),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _getState_0(context, partialProofData) {
    return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(0n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _getTerms_0(context, partialProofData) {
    return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(1n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _getSeller_0(context, partialProofData) {
    return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(2n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _getBuyer_0(context, partialProofData) {
    return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(3n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _getLogistics_0(context, partialProofData) {
    return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(4n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _getDispute_0(context, partialProofData) {
    return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(5n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _isPickupConfirmed_0(context, partialProofData) {
    return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(8n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _isDeliveryConfirmed_0(context, partialProofData) {
    return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(9n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _isDeadlinePassed_0(context, partialProofData) {
    const t_0 = this._deadlinePassed_0(context, partialProofData);
    return t_0 > this._currentBlockHeight_0(context, partialProofData);
  }
  _getCurrentBlockHeight_0(context, partialProofData) {
    return this._currentBlockHeight_0(context, partialProofData);
  }
  _emergencyPause_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(2n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).deposited
                            ||
                            _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(3n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).deposited
                            ||
                            _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_16.toValue(4n),
                                                                                                                  alignment: _descriptor_16.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value).deposited,
                            'No parties deposited');
    return [];
  }
  _getSequence_0(context, partialProofData) {
    return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(10n),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get state() {
      return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(0n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get terms() {
      return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(1n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get seller() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(2n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get buyer() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(3n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get logistics() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(4n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get dispute() {
      return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(5n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get pickupSecretHash() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(6n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get deliverySecretHash() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(7n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get pickupConfirmed() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(8n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get deliveryConfirmed() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(9n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get sequence() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_16.toValue(10n),
                                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  localSellerKey: (...args) => undefined,
  localBuyerKey: (...args) => undefined,
  localLogisticsKey: (...args) => undefined,
  pickupSecret: (...args) => undefined,
  deliverySecret: (...args) => undefined,
  escrow3PartyTerms: (...args) => undefined,
  mediatorKey: (...args) => undefined
});
export const pureCircuits = {
  checkDeadline: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`checkDeadline: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const isPastDeadline_0 = args_0[0];
    if (!(typeof(isPastDeadline_0) === 'boolean')) {
      __compactRuntime.typeError('checkDeadline',
                                 'argument 1',
                                 'escrow3party.compact line 174 char 1',
                                 'Boolean',
                                 isPastDeadline_0)
    }
    return _dummyContract._checkDeadline_0(isPastDeadline_0);
  },
  publicKey: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`publicKey: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    const seq_0 = args_0[1];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('publicKey',
                                 'argument 1',
                                 'escrow3party.compact line 179 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    if (!(seq_0.buffer instanceof ArrayBuffer && seq_0.BYTES_PER_ELEMENT === 1 && seq_0.length === 32)) {
      __compactRuntime.typeError('publicKey',
                                 'argument 2',
                                 'escrow3party.compact line 179 char 1',
                                 'Bytes<32>',
                                 seq_0)
    }
    return _dummyContract._publicKey_0(sk_0, seq_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
