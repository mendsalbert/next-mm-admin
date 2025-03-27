'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import {
  WalletContext,
  WalletType,
  connectToMetaMask,
  connectTronLink,
  isMetaMaskAvailable,
  isTronLinkAvailable,
} from '../services/wallet';

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [currentWallet, setCurrentWallet] = useState<WalletType>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check for existing connections on startup
  useEffect(() => {
    const checkExistingConnections = async () => {
      // Check for MetaMask
      if (isMetaMaskAvailable() && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts && accounts.length > 0) {
          setCurrentWallet('metamask');
          setWalletAddress(accounts[0]);
        }
      }

      // Check for TronLink
      if (isTronLinkAvailable() && window.tronWeb && window.tronWeb.ready) {
        const address = window.tronWeb.defaultAddress.base58;
        if (address) {
          setCurrentWallet('tronlink');
          setWalletAddress(address);
        }
      }
    };

    checkExistingConnections();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // MetaMask account change listener
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (currentWallet === 'metamask') {
          if (accounts.length === 0) {
            // User disconnected
            disconnectWallet();
          } else {
            // Account changed
            setWalletAddress(accounts[0]);
          }
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup
      return () => {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged,
        );
      };
    }
  }, [currentWallet]);

  const connectWallet = async (type: WalletType): Promise<boolean> => {
    if (!type) return false;

    setIsConnecting(true);

    try {
      if (type === 'metamask') {
        const result = await connectToMetaMask();
        if (result.success && result.address) {
          setCurrentWallet('metamask');
          setWalletAddress(result.address);

          // Save to localStorage
          localStorage.setItem('currentWallet', 'metamask');
          localStorage.setItem('walletAddress', result.address);

          return true;
        }
      } else if (type === 'tronlink') {
        const address = await connectTronLink();
        if (address) {
          setCurrentWallet('tronlink');
          setWalletAddress(address);

          // Save to localStorage
          localStorage.setItem('currentWallet', 'tronlink');
          localStorage.setItem('walletAddress', address);

          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setCurrentWallet(null);
    setWalletAddress(null);

    // Clear localStorage
    localStorage.removeItem('currentWallet');
    localStorage.removeItem('walletAddress');
  };

  return (
    <WalletContext.Provider
      value={{
        currentWallet,
        walletAddress,
        connectWallet,
        disconnectWallet,
        isConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
