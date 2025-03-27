'use client';
import React, { useEffect } from 'react';
import {
  useWallet,
  isMetaMaskAvailable,
  isTronLinkAvailable,
} from '../../services/wallet';

const DirectWalletModal: React.FC = () => {
  const { connectWallet } = useWallet();

  useEffect(() => {
    // Create modal elements
    const createModal = () => {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      overlay.style.zIndex = '9999';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';

      // Create modal content
      const modalContent = document.createElement('div');
      modalContent.style.backgroundColor = 'white';
      modalContent.style.borderRadius = '8px';
      modalContent.style.padding = '20px';
      modalContent.style.width = '400px';
      modalContent.style.maxWidth = '90%';
      modalContent.style.zIndex = '10000';
      modalContent.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

      // Create header
      const header = document.createElement('h2');
      header.textContent = 'Connect Wallet';
      header.style.marginBottom = '20px';
      header.style.fontSize = '1.5rem';
      header.style.fontWeight = 'bold';

      // Create MetaMask button
      const metamaskButton = document.createElement('button');
      metamaskButton.textContent = 'Connect to MetaMask';
      metamaskButton.style.display = 'block';
      metamaskButton.style.width = '100%';
      metamaskButton.style.padding = '12px';
      metamaskButton.style.marginBottom = '10px';
      metamaskButton.style.borderRadius = '4px';
      metamaskButton.style.border = '1px solid #e2e8f0';
      metamaskButton.style.backgroundColor = '#f8f9fa';
      metamaskButton.style.cursor = 'pointer';
      metamaskButton.onclick = async () => {
        if (!isMetaMaskAvailable()) {
          alert(
            'MetaMask is not installed. Please install MetaMask extension and refresh the page.',
          );
          return;
        }
        await connectWallet('metamask');
        document.body.removeChild(overlay);
      };

      // Create TronLink button
      const tronlinkButton = document.createElement('button');
      tronlinkButton.textContent = 'Connect to TronLink';
      tronlinkButton.style.display = 'block';
      tronlinkButton.style.width = '100%';
      tronlinkButton.style.padding = '12px';
      tronlinkButton.style.marginBottom = '20px';
      tronlinkButton.style.borderRadius = '4px';
      tronlinkButton.style.border = '1px solid #e2e8f0';
      tronlinkButton.style.backgroundColor = '#f8f9fa';
      tronlinkButton.style.cursor = 'pointer';
      tronlinkButton.onclick = async () => {
        if (!isTronLinkAvailable()) {
          alert(
            'TronLink is not installed. Please install TronLink extension and refresh the page.',
          );
          return;
        }
        await connectWallet('tronlink');
        document.body.removeChild(overlay);
      };

      // Create cancel button
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.style.display = 'block';
      cancelButton.style.width = '100%';
      cancelButton.style.padding = '12px';
      cancelButton.style.borderRadius = '4px';
      cancelButton.style.border = 'none';
      cancelButton.style.backgroundColor = '#e2e8f0';
      cancelButton.style.cursor = 'pointer';
      cancelButton.onclick = () => {
        document.body.removeChild(overlay);
      };

      // Assemble modal
      modalContent.appendChild(header);
      modalContent.appendChild(metamaskButton);
      modalContent.appendChild(tronlinkButton);
      modalContent.appendChild(cancelButton);
      overlay.appendChild(modalContent);

      // Add to body
      document.body.appendChild(overlay);
    };

    // Show modal after a delay
    const timer = setTimeout(() => {
      createModal();
    }, 1500);

    return () => clearTimeout(timer);
  }, [connectWallet]);

  return null; // This component doesn't render anything directly
};

export default DirectWalletModal;
