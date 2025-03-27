'use client';
import { useEffect } from 'react';
import { useWallet } from '../../services/wallet';

const SimpleWalletPrompt: React.FC = () => {
  const { connectWallet } = useWallet();

  useEffect(() => {
    const timer = setTimeout(() => {
      const walletType = window.confirm(
        'Would you like to connect a wallet?\n\nPress OK for MetaMask or Cancel for TronLink',
      );

      if (walletType) {
        connectWallet('metamask');
      } else {
        connectWallet('tronlink');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [connectWallet]);

  return null;
};

export default SimpleWalletPrompt;
