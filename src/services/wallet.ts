import { createContext, useContext } from 'react';

export type WalletType = 'metamask' | 'tronlink' | null;

export interface WalletContextType {
  currentWallet: WalletType;
  walletAddress: string | null;
  connectWallet: (type: WalletType) => Promise<boolean>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

// Default context values
export const defaultWalletContext: WalletContextType = {
  currentWallet: null,
  walletAddress: null,
  connectWallet: async () => false,
  disconnectWallet: () => {},
  isConnecting: false,
};

// Create context
export const WalletContext =
  createContext<WalletContextType>(defaultWalletContext);

// Hook to use wallet context
export const useWallet = () => useContext(WalletContext);

// Check if MetaMask is available
export const isMetaMaskAvailable = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    window.ethereum &&
    window.ethereum.isMetaMask
  );
};

// Check if TronLink is available
export const isTronLinkAvailable = (): boolean => {
  // Check for window.tronWeb or window.tronLink
  return (
    typeof window !== 'undefined' &&
    (window.tronWeb !== undefined ||
      window.tronLink !== undefined ||
      // Also check for the TronLink object that might be under a different property
      Object.keys(window).some(
        (key) =>
          key.toLowerCase().includes('tron') && typeof window[key] === 'object',
      ))
  );
};

// Connect to MetaMask
export const connectToMetaMask = async (): Promise<{
  success: boolean;
  address?: string;
}> => {
  if (!isMetaMaskAvailable()) {
    console.error('MetaMask is not available');
    return { success: false };
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    if (accounts && accounts.length > 0) {
      return { success: true, address: accounts[0] };
    }
    return { success: false };
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    return { success: false };
  }
};

// Connect to TronLink
export const connectTronLink = async (): Promise<string | null> => {
  try {
    console.log('Attempting to connect to TronLink...');

    // Check if TronLink is available
    if (!isTronLinkAvailable()) {
      console.error('TronLink is not installed');
      return null;
    }

    // Log what we found
    if (window.tronWeb) {
      console.log('Found window.tronWeb:', window.tronWeb);
    }
    if (window.tronLink) {
      console.log('Found window.tronLink:', window.tronLink);
    }

    // Try to get the account using tronWeb first
    if (window.tronWeb) {
      // Check if already logged in
      if (window.tronWeb.ready) {
        const address = window.tronWeb.defaultAddress.base58;
        console.log('TronWeb is ready, address:', address);
        return address;
      }

      // Try to request account access
      try {
        // Wait for tronWeb to be ready
        console.log('Waiting for TronWeb to be ready...');

        // Some versions of TronLink need a manual trigger
        if (typeof window.tronWeb.request === 'function') {
          await window.tronWeb.request({ method: 'tron_requestAccounts' });
        }

        // Give TronLink a moment to update
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if we have an address now
        if (
          window.tronWeb.defaultAddress &&
          window.tronWeb.defaultAddress.base58
        ) {
          const address = window.tronWeb.defaultAddress.base58;
          console.log('Got TronWeb address after request:', address);
          return address;
        }
      } catch (e) {
        console.error('Error requesting TronWeb accounts:', e);
      }
    }

    // Try tronLink if tronWeb failed
    if (window.tronLink) {
      try {
        console.log('Trying tronLink API...');

        // Try the request method
        if (typeof window.tronLink.request === 'function') {
          const response = await window.tronLink.request({
            method: 'tron_requestAccounts',
          });
          console.log('TronLink request response:', response);

          if (response && response.base58) {
            return response.base58;
          }
        }

        // Try the getAddress method
        if (typeof window.tronLink.getAddress === 'function') {
          const address = await window.tronLink.getAddress();
          console.log('TronLink getAddress result:', address);
          return address;
        }
      } catch (e) {
        console.error('Error with tronLink methods:', e);
      }
    }

    // Last resort: check if TronWeb became ready during our attempts
    if (window.tronWeb && window.tronWeb.defaultAddress) {
      const address = window.tronWeb.defaultAddress.base58;
      if (address) {
        console.log('Found TronWeb address as last resort:', address);
        return address;
      }
    }

    console.error('All TronLink connection attempts failed');
    return null;
  } catch (error) {
    console.error('Unexpected error connecting to TronLink:', error);
    return null;
  }
};
