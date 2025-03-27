'use client';
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  useToast,
  Box,
} from '@chakra-ui/react';
import {
  useWallet,
  isMetaMaskAvailable,
  isTronLinkAvailable,
} from '../../services/wallet';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connectWallet, isConnecting } = useWallet();
  const toast = useToast();

  // Add console logs for debugging
  console.log('Modal isOpen:', isOpen);

  const handleConnect = async (walletType: 'metamask' | 'tronlink') => {
    console.log('Attempting to connect to:', walletType);

    if (walletType === 'metamask' && !isMetaMaskAvailable()) {
      toast({
        title: 'MetaMask not detected',
        description: 'Please install MetaMask extension and refresh the page.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (walletType === 'tronlink' && !isTronLinkAvailable()) {
      toast({
        title: 'TronLink not detected',
        description: 'Please install TronLink extension and refresh the page.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const success = await connectWallet(walletType);

    if (success) {
      toast({
        title: 'Wallet Connected',
        description: `Successfully connected to ${
          walletType === 'metamask' ? 'MetaMask' : 'TronLink'
        }`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect to wallet. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Button
              onClick={() => handleConnect('metamask')}
              isLoading={isConnecting}
              variant="outline"
              height="60px"
              justifyContent="flex-start"
              px={4}
            >
              <HStack spacing={4} width="100%">
                <Image
                  src="/img/wallets/metamask.svg"
                  alt="MetaMask"
                  boxSize="30px"
                />
                <Box>
                  <Text fontWeight="bold">MetaMask</Text>
                  <Text fontSize="sm" color="gray.500">
                    Connect to your MetaMask wallet
                  </Text>
                </Box>
              </HStack>
            </Button>

            <Button
              onClick={() => handleConnect('tronlink')}
              isLoading={isConnecting}
              variant="outline"
              height="60px"
              justifyContent="flex-start"
              px={4}
            >
              <HStack spacing={4} width="100%">
                <Image
                  src="/img/wallets/tronlink.svg"
                  alt="TronLink"
                  boxSize="30px"
                />
                <Box>
                  <Text fontWeight="bold">TronLink</Text>
                  <Text fontSize="sm" color="gray.500">
                    Connect to your TronLink wallet
                  </Text>
                </Box>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
