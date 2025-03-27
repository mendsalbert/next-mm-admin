'use client';
import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
  useDisclosure,
  Icon,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaWallet } from 'react-icons/fa';
import { useWallet } from '../../services/wallet';
import WalletModal from './WalletModal';

const WalletButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentWallet, walletAddress, disconnectWallet } = useWallet();

  // Add console logs for debugging
  console.log('WalletButton rendered');
  console.log('isOpen state:', isOpen);

  // Format address for display
  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
    )}`;
  };

  const handleOpenModal = () => {
    console.log('Opening wallet modal');
    onOpen();
  };

  return (
    <>
      {currentWallet && walletAddress ? (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="brand"
            variant="solid"
          >
            <HStack>
              <Icon as={FaWallet} />
              <Text>{formatAddress(walletAddress)}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={disconnectWallet}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          onClick={handleOpenModal}
          colorScheme="brand"
          leftIcon={<Icon as={FaWallet} />}
        >
          Connect Wallet
        </Button>
      )}

      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default WalletButton;
