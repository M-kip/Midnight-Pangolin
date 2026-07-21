import { UnshieldedTokenType } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { type FacadeState, type WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { type ShieldedWalletAPI, type ShieldedWalletState } from '@midnight-ntwrk/wallet-sdk-shielded';
import { type UnshieldedWalletAPI, type UnshieldedWalletState } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import * as Rx from 'rxjs';

import { FaucetClient, type EnvironmentConfiguration } from '@midnight-ntwrk/testkit-js';
import { Logger } from 'pino';
import { UnshieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import { getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

export const getInitialShieldedState = async (
  logger: Logger,
  wallet: ShieldedWalletAPI,
): Promise<ShieldedWalletState> => {
  logger.info('Getting initial state of wallet...');
  return Rx.firstValueFrom(wallet.state);
};

export const getInitialUnshieldedState = async (
  logger: Logger,
  wallet: UnshieldedWalletAPI,
): Promise<UnshieldedWalletState> => {
  logger.info('Getting initial state of wallet...');
  return Rx.firstValueFrom(wallet.state);
};

const isProgressStrictlyComplete = (progress: unknown): boolean => {
  if (!progress || typeof progress !== 'object') {
    return false;
  }
  const candidate = progress as { isStrictlyComplete?: unknown };
  if (typeof candidate.isStrictlyComplete !== 'function') {
    return false;
  }
  return (candidate.isStrictlyComplete as () => boolean)();
};

const isFacadeStateSynced = (state: FacadeState): boolean =>
  isProgressStrictlyComplete(state.shielded.state.progress) &&
  isProgressStrictlyComplete(state.dust.state.progress) &&
  isProgressStrictlyComplete(state.unshielded.progress);

export const syncWallet = (logger: Logger, wallet: WalletFacade, throttleTime = 2_000) => {
  logger.info('Syncing wallet...');

  return Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.tap((state: FacadeState) => {
        const shieldedSynced = isProgressStrictlyComplete(state.shielded.state.progress);
        const unshieldedSynced = isProgressStrictlyComplete(state.unshielded.progress);
        const dustSynced = isProgressStrictlyComplete(state.dust.state.progress);
        logger.debug(
          `Wallet synced state emission: { shielded=${shieldedSynced}, unshielded=${unshieldedSynced}, dust=${dustSynced} }`,
        );
      }),
      Rx.throttleTime(throttleTime),
      Rx.tap((state: FacadeState) => {
        const shieldedSynced = isProgressStrictlyComplete(state.shielded.state.progress);
        const unshieldedSynced = isProgressStrictlyComplete(state.unshielded.progress);
        const dustSynced = isProgressStrictlyComplete(state.dust.state.progress);
        const isSynced = shieldedSynced && dustSynced && unshieldedSynced;

        logger.debug(
          `Wallet synced state emission (synced=${isSynced}): { shielded=${shieldedSynced}, unshielded=${unshieldedSynced}, dust=${dustSynced} }`,
        );
      }),
      Rx.filter((state: FacadeState) => isFacadeStateSynced(state)),
      Rx.tap(() => logger.info('Sync complete')),
      Rx.tap((state: FacadeState) => {
        const shieldedBalances = state.shielded.balances || {};
        const unshieldedBalances = state.unshielded.balances || {};
        const dustBalances = state.dust.balance(new Date(Date.now())) || 0n;

        logger.info(
          `Wallet balances after sync - Shielded: ${JSON.stringify(shieldedBalances)}, Unshielded: ${JSON.stringify(unshieldedBalances)}, Dust: ${dustBalances}`,
        );
      }),
    ),
  );
};