'use client';
import React from 'react';
import {
  Box,
  Text,
  Badge,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useWallet } from '../../services/wallet';

const WalletStatus: React.FC = () => {
  const { currentWallet, walletAddress } = useWallet();
  const bgColor = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  if (!currentWallet || !walletAddress) {
    return null;
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 10)}...${address.substring(
      address.length - 8,
    )}`;
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="sm" mb={4}>
      <VStack align="start" spacing={2}>
        <HStack>
          <Text fontWeight="bold" color={textColor}>
            Connected Wallet:
          </Text>
          <Badge colorScheme={currentWallet === 'metamask' ? 'orange' : 'blue'}>
            {currentWallet === 'metamask' ? 'MetaMask' : 'TronLink'}
          </Badge>
        </HStack>
        <HStack>
          <Text fontWeight="bold" color={textColor}>
            Address:
          </Text>
          <Text fontSize="sm">{formatAddress(walletAddress)}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default WalletStatus;
