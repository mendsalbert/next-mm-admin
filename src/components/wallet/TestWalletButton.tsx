'use client';
import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import WalletModal from './WalletModal';

const TestWalletButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="lg">
        Test Connect Wallet
      </Button>
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TestWalletButton;
