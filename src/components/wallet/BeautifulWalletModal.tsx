'use client';
import React, { useEffect } from 'react';
import {
  useWallet,
  isMetaMaskAvailable,
  isTronLinkAvailable,
} from '../../services/wallet';

const BeautifulWalletModal: React.FC = () => {
  const { connectWallet, currentWallet } = useWallet();

  useEffect(() => {
    // Only show the modal if the user is not already connected
    if (currentWallet) {
      return; // User already has a wallet connected, don't show modal
    }

    // Check if modal is already open
    if (document.getElementById('beautiful-wallet-modal')) {
      return; // Modal is already open, don't create another one
    }

    // Create modal elements
    const createModal = () => {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.id = 'beautiful-wallet-modal'; // Add ID to check if modal exists
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      overlay.style.zIndex = '9999';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.backdropFilter = 'blur(5px)';
      overlay.style.transition = 'all 0.3s ease-in-out';

      // Create modal content
      const modalContent = document.createElement('div');
      modalContent.style.backgroundColor = 'white';
      modalContent.style.borderRadius = '16px';
      modalContent.style.padding = '30px';
      modalContent.style.width = '450px';
      modalContent.style.maxWidth = '90%';
      modalContent.style.zIndex = '10000';
      modalContent.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
      modalContent.style.transform = 'translateY(20px)';
      modalContent.style.opacity = '0';
      modalContent.style.transition = 'all 0.3s ease-in-out';

      // Create header
      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.marginBottom = '25px';

      const title = document.createElement('h2');
      title.textContent = 'Connect Wallet';
      title.style.fontSize = '24px';
      title.style.fontWeight = 'bold';
      title.style.margin = '0';
      title.style.color = '#1A202C';

      const closeButton = document.createElement('button');
      closeButton.innerHTML = '&times;';
      closeButton.style.background = 'none';
      closeButton.style.border = 'none';
      closeButton.style.fontSize = '24px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.color = '#718096';
      closeButton.style.padding = '0';
      closeButton.style.lineHeight = '1';
      closeButton.onclick = () => {
        modalContent.style.transform = 'translateY(20px)';
        modalContent.style.opacity = '0';
        overlay.style.opacity = '0';

        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 300);
      };

      header.appendChild(title);
      header.appendChild(closeButton);

      // Create description
      const description = document.createElement('p');
      description.textContent =
        'Please select a wallet to connect to this application.';
      description.style.marginBottom = '25px';
      description.style.color = '#4A5568';
      description.style.fontSize = '16px';

      // Create wallet options container
      const walletOptions = document.createElement('div');
      walletOptions.style.display = 'flex';
      walletOptions.style.flexDirection = 'column';
      walletOptions.style.gap = '15px';
      walletOptions.style.marginBottom = '25px';

      // Create MetaMask button
      const metamaskButton = document.createElement('button');
      metamaskButton.style.display = 'flex';
      metamaskButton.style.alignItems = 'center';
      metamaskButton.style.padding = '16px';
      metamaskButton.style.borderRadius = '12px';
      metamaskButton.style.border = '1px solid #E2E8F0';
      metamaskButton.style.backgroundColor = '#F7FAFC';
      metamaskButton.style.cursor = 'pointer';
      metamaskButton.style.width = '100%';
      metamaskButton.style.transition = 'all 0.2s ease-in-out';
      metamaskButton.onmouseover = () => {
        metamaskButton.style.backgroundColor = '#EDF2F7';
        metamaskButton.style.transform = 'translateY(-2px)';
      };
      metamaskButton.onmouseout = () => {
        metamaskButton.style.backgroundColor = '#F7FAFC';
        metamaskButton.style.transform = 'translateY(0)';
      };
      metamaskButton.onclick = async () => {
        if (!isMetaMaskAvailable()) {
          showToast(
            'MetaMask not detected',
            'Please install MetaMask extension and refresh the page.',
            'error',
          );
          return;
        }

        const success = await connectWallet('metamask');
        if (success) {
          showToast(
            'Wallet Connected',
            'Successfully connected to MetaMask',
            'success',
          );
          closeButton.click();
        } else {
          showToast(
            'Connection Failed',
            'Failed to connect to MetaMask. Please try again.',
            'error',
          );
        }
      };

      // Create MetaMask icon
      const metamaskIcon = document.createElement('div');
      metamaskIcon.style.width = '30px';
      metamaskIcon.style.height = '30px';
      metamaskIcon.style.marginRight = '16px';
      metamaskIcon.style.backgroundImage = "url('/img/wallets/metamask.svg')";
      metamaskIcon.style.backgroundSize = 'contain';
      metamaskIcon.style.backgroundRepeat = 'no-repeat';
      metamaskIcon.style.backgroundPosition = 'center';

      // Create MetaMask text container
      const metamaskTextContainer = document.createElement('div');
      metamaskTextContainer.style.display = 'flex';
      metamaskTextContainer.style.flexDirection = 'column';

      const metamaskTitle = document.createElement('span');
      metamaskTitle.textContent = 'MetaMask';
      metamaskTitle.style.fontWeight = 'bold';
      metamaskTitle.style.fontSize = '16px';
      metamaskTitle.style.color = '#1A202C';

      const metamaskDesc = document.createElement('span');
      metamaskDesc.textContent = 'Connect to your MetaMask wallet';
      metamaskDesc.style.fontSize = '14px';
      metamaskDesc.style.color = '#718096';

      metamaskTextContainer.appendChild(metamaskTitle);
      metamaskTextContainer.appendChild(metamaskDesc);
      metamaskButton.appendChild(metamaskIcon);
      metamaskButton.appendChild(metamaskTextContainer);

      // Create TronLink button
      const tronlinkButton = document.createElement('button');
      tronlinkButton.style.display = 'flex';
      tronlinkButton.style.alignItems = 'center';
      tronlinkButton.style.padding = '16px';
      tronlinkButton.style.borderRadius = '12px';
      tronlinkButton.style.border = '1px solid #E2E8F0';
      tronlinkButton.style.backgroundColor = '#F7FAFC';
      tronlinkButton.style.cursor = 'pointer';
      tronlinkButton.style.width = '100%';
      tronlinkButton.style.transition = 'all 0.2s ease-in-out';
      tronlinkButton.onmouseover = () => {
        tronlinkButton.style.backgroundColor = '#EDF2F7';
        tronlinkButton.style.transform = 'translateY(-2px)';
      };
      tronlinkButton.onmouseout = () => {
        tronlinkButton.style.backgroundColor = '#F7FAFC';
        tronlinkButton.style.transform = 'translateY(0)';
      };
      tronlinkButton.onclick = async () => {
        if (!isTronLinkAvailable()) {
          showToast(
            'TronLink not detected',
            'Please install TronLink extension and refresh the page.',
            'error',
          );
          return;
        }

        // Show a loading toast
        showToast(
          'Connecting to TronLink',
          'Please approve the connection request in the TronLink extension...',
          'info',
        );

        const success = await connectWallet('tronlink');
        if (success) {
          showToast(
            'Wallet Connected',
            'Successfully connected to TronLink',
            'success',
          );
          closeButton.click();
        } else {
          showToast(
            'Connection Failed',
            'Failed to connect to TronLink. Please make sure your wallet is unlocked and try again.',
            'error',
          );
        }
      };

      // Create TronLink icon
      const tronlinkIcon = document.createElement('div');
      tronlinkIcon.style.width = '30px';
      tronlinkIcon.style.height = '30px';
      tronlinkIcon.style.marginRight = '16px';
      tronlinkIcon.style.backgroundImage = "url('/img/wallets/tronlink.svg')";
      tronlinkIcon.style.backgroundSize = 'contain';
      tronlinkIcon.style.backgroundRepeat = 'no-repeat';
      tronlinkIcon.style.backgroundPosition = 'center';

      // Create TronLink text container
      const tronlinkTextContainer = document.createElement('div');
      tronlinkTextContainer.style.display = 'flex';
      tronlinkTextContainer.style.flexDirection = 'column';

      const tronlinkTitle = document.createElement('span');
      tronlinkTitle.textContent = 'TronLink';
      tronlinkTitle.style.fontWeight = 'bold';
      tronlinkTitle.style.fontSize = '16px';
      tronlinkTitle.style.color = '#1A202C';

      const tronlinkDesc = document.createElement('span');
      tronlinkDesc.textContent = 'Connect to your TronLink wallet';
      tronlinkDesc.style.fontSize = '14px';
      tronlinkDesc.style.color = '#718096';

      tronlinkTextContainer.appendChild(tronlinkTitle);
      tronlinkTextContainer.appendChild(tronlinkDesc);
      tronlinkButton.appendChild(tronlinkIcon);
      tronlinkButton.appendChild(tronlinkTextContainer);

      // Add buttons to wallet options
      walletOptions.appendChild(metamaskButton);
      walletOptions.appendChild(tronlinkButton);

      // Create footer
      const footer = document.createElement('div');
      footer.style.borderTop = '1px solid #E2E8F0';
      footer.style.paddingTop = '20px';
      footer.style.display = 'flex';
      footer.style.justifyContent = 'flex-end';

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.style.padding = '10px 16px';
      cancelButton.style.borderRadius = '8px';
      cancelButton.style.border = 'none';
      cancelButton.style.backgroundColor = '#EDF2F7';
      cancelButton.style.color = '#4A5568';
      cancelButton.style.fontWeight = 'medium';
      cancelButton.style.cursor = 'pointer';
      cancelButton.style.transition = 'all 0.2s ease-in-out';
      cancelButton.onmouseover = () => {
        cancelButton.style.backgroundColor = '#E2E8F0';
      };
      cancelButton.onmouseout = () => {
        cancelButton.style.backgroundColor = '#EDF2F7';
      };
      cancelButton.onclick = () => closeButton.click();

      footer.appendChild(cancelButton);

      // Assemble modal
      modalContent.appendChild(header);
      modalContent.appendChild(description);
      modalContent.appendChild(walletOptions);
      modalContent.appendChild(footer);
      overlay.appendChild(modalContent);

      // Add to body only if it doesn't exist yet
      if (!document.getElementById('beautiful-wallet-modal')) {
        document.body.appendChild(overlay);
      }

      // Animate in
      setTimeout(() => {
        modalContent.style.transform = 'translateY(0)';
        modalContent.style.opacity = '1';
      }, 10);
    };

    // Create toast notification
    const showToast = (title, message, type) => {
      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.padding = '16px 20px';
      toast.style.borderRadius = '8px';
      toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.zIndex = '10001';
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.3s ease-in-out';

      if (type === 'success') {
        toast.style.backgroundColor = '#48BB78';
        toast.style.color = 'white';
      } else if (type === 'error') {
        toast.style.backgroundColor = '#F56565';
        toast.style.color = 'white';
      }

      const toastContent = document.createElement('div');

      const toastTitle = document.createElement('div');
      toastTitle.textContent = title;
      toastTitle.style.fontWeight = 'bold';
      toastTitle.style.marginBottom = '4px';

      const toastMessage = document.createElement('div');
      toastMessage.textContent = message;
      toastMessage.style.fontSize = '14px';

      toastContent.appendChild(toastTitle);
      toastContent.appendChild(toastMessage);

      toast.appendChild(toastContent);
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
      }, 10);

      setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';

        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 5000);
    };

    // Show modal after a delay
    const timer = setTimeout(() => {
      createModal();
    }, 1000);

    return () => clearTimeout(timer);
  }, [connectWallet, currentWallet]);

  return null; // This component doesn't render anything directly
};

export default BeautifulWalletModal;
