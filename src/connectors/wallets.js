import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import MetaMaskIcon from 'assets/wallets/metamaskwallet.svg';
import WalletConnectIcon from 'assets/wallets/walletconnect.svg';
import TokenPocketIcon from 'assets/wallets/tokenpocket.svg';
import TrustIcon from 'assets/wallets/trustwallet.svg';
import config from 'helpers/config';

export const supportedChainIds = [1, 56, 97];

export const RPC = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds,
});

export const walletConnectConnector = new WalletConnectConnector({
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  network: 'binance',
  chainId: parseInt(config.allowedChainId) || 56,
  supportedChainIds,
});

export const WALLETS = [
  {
    title: 'Trust Wallet',
    subtitle: 'DApp in app',
    connector: injectedConnector,
    icon: TrustIcon,
  },
  {
    title: 'TokenPocket',
    subtitle: 'DApp in app',
    connector: injectedConnector,
    icon: TokenPocketIcon,
  },
  {
    title: 'MetaMask',
    subtitle: 'Desktop / DApp in app',
    connector: injectedConnector,
    icon: MetaMaskIcon,
  },
  {
    title: 'WalletConnect',
    subtitle: 'Any wallet and browser',
    connector: walletConnectConnector,
    icon: WalletConnectIcon,
  },
];
