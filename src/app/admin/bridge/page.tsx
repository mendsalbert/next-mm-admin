'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  InputGroup,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
  Badge,
  Divider,
  Tooltip,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import {
  MdSwapHoriz,
  MdSettings,
  MdInfo,
  MdArrowForward,
  MdCheckCircle,
  MdError,
  MdCompareArrows,
} from 'react-icons/md';
import { useWallet } from '../../../services/wallet';

interface Token {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  network: 'ETH' | 'TRON';
  balance?: string;
}

const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    network: 'ETH',
    balance: '1000.00',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    network: 'TRON',
    balance: '500.00',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    network: 'ETH',
    balance: '750.00',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    address: 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8',
    network: 'TRON',
    balance: '250.00',
  },
];

export default function BridgePage() {
  const [amount, setAmount] = useState<string>('');
  const [fromToken, setFromToken] = useState<Token>(SUPPORTED_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(SUPPORTED_TOKENS[1]);
  const [isBridging, setIsBridging] = useState(false);
  const [estimatedGas, setEstimatedGas] = useState<string>('0.005');
  const [bridgeFee, setBridgeFee] = useState<string>('0.1');
  const { currentWallet, walletAddress } = useWallet();
  const toast = useToast();

  // Chakra Color Mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );
  const cardBg = useColorModeValue('white', 'navy.700');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const inputBg = useColorModeValue('secondaryGray.100', 'navy.900');
  const buttonBg = useColorModeValue('brand.500', 'brand.400');
  const ethColor = useColorModeValue('blue.500', 'blue.300');
  const tronColor = useColorModeValue('red.500', 'red.300');

  // Calculate estimated gas based on network
  useEffect(() => {
    if (fromToken.network === 'ETH') {
      setEstimatedGas('0.005');
    } else {
      setEstimatedGas('5');
    }
  }, [fromToken]);

  // Calculate bridge fee based on amount
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      const fee = (parseFloat(amount) * 0.001).toFixed(6);
      setBridgeFee(fee);
    } else {
      setBridgeFee('0.00');
    }
  }, [amount]);

  const handleBridge = async () => {
    if (!currentWallet) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to bridge tokens',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount to bridge',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Check if amount exceeds balance
    const fromTokenBalance = parseFloat(fromToken.balance || '0');
    if (parseFloat(amount) > fromTokenBalance) {
      toast({
        title: 'Insufficient balance',
        description: `You don't have enough ${fromToken.symbol} to complete this transaction`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsBridging(true);

    try {
      // Simulate the bridging process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: 'Bridge initiated',
        description: `Bridging ${amount} ${fromToken.symbol} from ${fromToken.network} to ${toToken.network}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Simulate transaction completion after delay
      setTimeout(() => {
        toast({
          title: 'Bridge completed',
          description: `Successfully bridged ${amount} ${fromToken.symbol} to ${toToken.network}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }, 5000);
    } catch (error) {
      toast({
        title: 'Bridge failed',
        description: 'There was an error processing your bridge request',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsBridging(false);
    }
  };

  const handleSwapNetworks = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
  };

  const getNetworkColor = (network: string) => {
    return network === 'ETH' ? ethColor : tronColor;
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Main Heading */}
      <Text
        color={textColor}
        fontWeight="bold"
        fontSize="3xl"
        mb="10px"
        lineHeight="100%"
      >
        Bridge Tokens
      </Text>
      <Text color={textColorSecondary} fontSize="md" mb="30px">
        Transfer tokens between Ethereum and TRON networks
      </Text>

      {/* Bridge Card */}
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="20px" mb="20px">
        <Card p="0px" bg={cardBg} boxShadow={cardShadow}>
          <CardHeader px="22px" py="18px">
            <Flex justify="space-between" align="center">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Cross-Chain Bridge
              </Text>
              <IconButton
                aria-label="Settings"
                icon={<Icon as={MdSettings} />}
                variant="ghost"
                colorScheme="gray"
                size="sm"
              />
            </Flex>
          </CardHeader>
          <CardBody px="22px" pb="22px">
            {/* From Section */}
            <FormControl mb="24px">
              <Flex justify="space-between" mb="8px">
                <FormLabel color={textColor} fontSize="sm" fontWeight="bold">
                  From{' '}
                  <Tag
                    size="sm"
                    variant="solid"
                    colorScheme={fromToken.network === 'ETH' ? 'blue' : 'red'}
                    ml="2"
                  >
                    <TagLabel>{fromToken.network}</TagLabel>
                  </Tag>
                </FormLabel>
                {currentWallet && (
                  <Text color={textColorSecondary} fontSize="sm">
                    Balance: {fromToken.balance} {fromToken.symbol}
                  </Text>
                )}
              </Flex>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap="10px"
                align={{ base: 'stretch', md: 'center' }}
              >
                <Select
                  value={fromToken.symbol}
                  onChange={(e) => {
                    const token = SUPPORTED_TOKENS.find(
                      (t) =>
                        t.symbol === e.target.value &&
                        t.network === fromToken.network,
                    );
                    if (token) setFromToken(token);
                  }}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                  fontSize="sm"
                  maxW={{ base: '100%', md: '200px' }}
                >
                  {SUPPORTED_TOKENS.filter(
                    (t) => t.network === fromToken.network,
                  ).map((token) => (
                    <option key={token.address} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </Select>
                <InputGroup size="md">
                  <NumberInput
                    w="100%"
                    value={amount}
                    onChange={(valueString) => setAmount(valueString)}
                    min={0}
                    max={parseFloat(fromToken.balance || '0')}
                  >
                    <NumberInputField
                      bg={inputBg}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="16px"
                      fontSize="sm"
                      placeholder="0.0"
                    />
                  </NumberInput>
                </InputGroup>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setAmount(fromToken.balance || '0')}
                  borderRadius="16px"
                  borderColor={borderColor}
                >
                  Max
                </Button>
              </Flex>
            </FormControl>

            {/* Network Switch Button */}
            <Flex justify="center" my="24px">
              <IconButton
                aria-label="Switch Networks"
                icon={<Icon as={MdCompareArrows} boxSize="24px" />}
                onClick={handleSwapNetworks}
                variant="ghost"
                colorScheme="blue"
                borderRadius="full"
              />
            </Flex>

            {/* To Section */}
            <FormControl mb="24px">
              <Flex justify="space-between" mb="8px">
                <FormLabel color={textColor} fontSize="sm" fontWeight="bold">
                  To{' '}
                  <Tag
                    size="sm"
                    variant="solid"
                    colorScheme={toToken.network === 'ETH' ? 'blue' : 'red'}
                    ml="2"
                  >
                    <TagLabel>{toToken.network}</TagLabel>
                  </Tag>
                </FormLabel>
              </Flex>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap="10px"
                align={{ base: 'stretch', md: 'center' }}
              >
                <Select
                  value={toToken.symbol}
                  onChange={(e) => {
                    const token = SUPPORTED_TOKENS.find(
                      (t) =>
                        t.symbol === e.target.value &&
                        t.network === toToken.network,
                    );
                    if (token) setToToken(token);
                  }}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                  fontSize="sm"
                  maxW={{ base: '100%', md: '200px' }}
                >
                  {SUPPORTED_TOKENS.filter(
                    (t) => t.network === toToken.network,
                  ).map((token) => (
                    <option key={token.address} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </Select>
                <InputGroup size="md">
                  <NumberInput
                    w="100%"
                    value={parseFloat(amount) > 0 ? amount : '0'}
                    isReadOnly
                  >
                    <NumberInputField
                      bg={inputBg}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="16px"
                      fontSize="sm"
                      placeholder="0.0"
                      readOnly
                    />
                  </NumberInput>
                </InputGroup>
              </Flex>
            </FormControl>

            {/* Fee Summary */}
            <Box bg={boxBg} p="16px" borderRadius="12px" mb="24px">
              <Text color={textColor} fontWeight="bold" mb="12px">
                Fee Summary
              </Text>
              <Flex direction="column" gap="8px">
                <Flex justify="space-between">
                  <Text color={textColorSecondary} fontSize="sm">
                    Bridge Fee
                  </Text>
                  <Text color={textColor} fontSize="sm">
                    {bridgeFee} {fromToken.symbol}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={textColorSecondary} fontSize="sm">
                    Gas Fee (estimated)
                  </Text>
                  <Text color={textColor} fontSize="sm">
                    {estimatedGas} {fromToken.network === 'ETH' ? 'ETH' : 'TRX'}
                  </Text>
                </Flex>
                <Divider my="8px" />
                <Flex justify="space-between">
                  <Text color={textColor} fontWeight="bold" fontSize="sm">
                    You will receive
                  </Text>
                  <Text color={textColor} fontWeight="bold" fontSize="sm">
                    {parseFloat(amount) > 0
                      ? (parseFloat(amount) - parseFloat(bridgeFee)).toFixed(6)
                      : '0'}{' '}
                    {toToken.symbol}
                  </Text>
                </Flex>
              </Flex>
            </Box>

            {/* Bridge Button */}
            <Button
              w="100%"
              h="50px"
              bg={buttonBg}
              color="white"
              fontSize="md"
              fontWeight="bold"
              borderRadius="16px"
              onClick={handleBridge}
              isLoading={isBridging}
              loadingText="Bridging"
              isDisabled={!currentWallet || !amount || parseFloat(amount) <= 0}
              _hover={{ bg: 'brand.600' }}
            >
              Bridge Tokens
            </Button>
          </CardBody>
        </Card>

        {/* Info Card */}
        <Card p="0px" bg={cardBg} boxShadow={cardShadow}>
          <CardHeader px="22px" py="18px">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              Bridge Information
            </Text>
          </CardHeader>
          <CardBody px="22px" pb="22px">
            <Flex direction="column" gap="16px">
              {/* Network Information */}
              <Flex align="center" gap="12px">
                <Tag
                  size="lg"
                  variant="solid"
                  colorScheme={fromToken.network === 'ETH' ? 'blue' : 'red'}
                >
                  <TagLabel>{fromToken.network}</TagLabel>
                </Tag>
                <Icon
                  as={MdArrowForward}
                  color={textColorSecondary}
                  boxSize="20px"
                />
                <Tag
                  size="lg"
                  variant="solid"
                  colorScheme={toToken.network === 'ETH' ? 'blue' : 'red'}
                >
                  <TagLabel>{toToken.network}</TagLabel>
                </Tag>
                <Text color={textColor} fontWeight="medium">
                  Bridge
                </Text>
              </Flex>

              {/* Bridge Process */}
              <Box>
                <Text color={textColor} fontWeight="bold" mb="12px">
                  Bridge Process
                </Text>
                <Flex direction="column" gap="16px">
                  <Flex align="flex-start" gap="12px">
                    <Badge
                      bg={boxBg}
                      color={textColor}
                      borderRadius="full"
                      px="8px"
                      py="4px"
                    >
                      1
                    </Badge>
                    <Box>
                      <Text color={textColor} fontWeight="medium">
                        Lock Tokens
                      </Text>
                      <Text color={textColorSecondary} fontSize="sm">
                        Your tokens are locked in the bridge smart contract on
                        the source network
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="flex-start" gap="12px">
                    <Badge
                      bg={boxBg}
                      color={textColor}
                      borderRadius="full"
                      px="8px"
                      py="4px"
                    >
                      2
                    </Badge>
                    <Box>
                      <Text color={textColor} fontWeight="medium">
                        Wait for Confirmation
                      </Text>
                      <Text color={textColorSecondary} fontSize="sm">
                        The bridge validators confirm the transaction on the
                        source network
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="flex-start" gap="12px">
                    <Badge
                      bg={boxBg}
                      color={textColor}
                      borderRadius="full"
                      px="8px"
                      py="4px"
                    >
                      3
                    </Badge>
                    <Box>
                      <Text color={textColor} fontWeight="medium">
                        Receive Tokens
                      </Text>
                      <Text color={textColorSecondary} fontSize="sm">
                        Equivalent tokens are minted or released on the
                        destination network
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>

              <Divider />

              {/* Connected Wallet */}
              <Box>
                <Text color={textColor} fontWeight="bold" mb="12px">
                  Connected Wallet
                </Text>
                {currentWallet ? (
                  <Flex align="center" gap="12px">
                    <Tag
                      size="md"
                      variant="subtle"
                      colorScheme={
                        currentWallet === 'metamask' ? 'orange' : 'red'
                      }
                    >
                      <TagLabel>
                        {currentWallet === 'metamask' ? 'MetaMask' : 'TronLink'}
                      </TagLabel>
                    </Tag>
                    <Text color={textColorSecondary} fontSize="sm">
                      {walletAddress &&
                        `${walletAddress.slice(0, 6)}...${walletAddress.slice(
                          -4,
                        )}`}
                    </Text>
                  </Flex>
                ) : (
                  <Text color={textColorSecondary} fontSize="sm">
                    No wallet connected
                  </Text>
                )}
              </Box>

              {/* Important Notes */}
              <Box bg={boxBg} p="16px" borderRadius="12px">
                <Text color={textColor} fontWeight="bold" mb="8px">
                  Important Notes
                </Text>
                <Text color={textColorSecondary} fontSize="sm">
                  • Bridging typically takes 15-20 minutes to complete
                </Text>
                <Text color={textColorSecondary} fontSize="sm">
                  • Make sure you have enough native tokens for gas fees
                </Text>
                <Text color={textColorSecondary} fontSize="sm">
                  • Double-check the receiving address before confirming
                </Text>
                <Text color={textColorSecondary} fontSize="sm">
                  • Bridge transactions cannot be reversed once initiated
                </Text>
              </Box>

              {/* Supported Networks */}
              <Box>
                <Text color={textColor} fontWeight="bold" mb="12px">
                  Supported Networks
                </Text>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Tag size="md" variant="solid" colorScheme="blue" mb="2">
                      <TagLabel>Ethereum</TagLabel>
                    </Tag>
                    <Text color={textColorSecondary} fontSize="sm">
                      • ERC-20 tokens
                    </Text>
                    <Text color={textColorSecondary} fontSize="sm">
                      • Gas paid in ETH
                    </Text>
                  </Box>
                  <Box>
                    <Tag size="md" variant="solid" colorScheme="red" mb="2">
                      <TagLabel>TRON</TagLabel>
                    </Tag>
                    <Text color={textColorSecondary} fontSize="sm">
                      • TRC-20 tokens
                    </Text>
                    <Text color={textColorSecondary} fontSize="sm">
                      • Gas paid in TRX
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
