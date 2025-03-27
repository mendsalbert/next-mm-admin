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
  Image,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { MdSwapVert, MdSettings, MdInfo } from 'react-icons/md';
import { useWallet } from '../../../services/wallet';

interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
}

export default function SwapPage() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [fromCoin, setFromCoin] = useState<string>('bitcoin');
  const [toCoin, setToCoin] = useState<string>('ethereum');
  const [fromAmount, setFromAmount] = useState<string>('1');
  const [toAmount, setToAmount] = useState<string>('0');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [slippage, setSlippage] = useState<string>('0.5');
  const [isSwapping, setIsSwapping] = useState(false);

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

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1',
        );
        const data = await response.json();
        setCryptocurrencies(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        setIsLoading(false);
      }
    };

    fetchCryptocurrencies();
  }, []);

  useEffect(() => {
    if (cryptocurrencies.length > 0) {
      calculateExchangeRate();
    }
  }, [fromCoin, toCoin, cryptocurrencies]);

  useEffect(() => {
    if (exchangeRate > 0 && fromAmount) {
      const calculatedAmount = (parseFloat(fromAmount) * exchangeRate).toFixed(
        6,
      );
      setToAmount(calculatedAmount);
    }
  }, [fromAmount, exchangeRate]);

  const calculateExchangeRate = () => {
    const fromCoinData = cryptocurrencies.find(
      (crypto) => crypto.id === fromCoin,
    );
    const toCoinData = cryptocurrencies.find((crypto) => crypto.id === toCoin);

    if (fromCoinData && toCoinData) {
      const rate = toCoinData.current_price / fromCoinData.current_price;
      setExchangeRate(rate);
    }
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
  };

  const handleSwapCoins = () => {
    const temp = fromCoin;
    setFromCoin(toCoin);
    setToCoin(temp);
  };

  const handleSwap = async () => {
    if (!currentWallet) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to swap coins',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount to swap',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSwapping(true);

    // Simulate a swap transaction
    try {
      // In a real application, this would call a blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: 'Swap successful',
        description: `Swapped ${fromAmount} ${fromCoin.toUpperCase()} to ${toAmount} ${toCoin.toUpperCase()}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form or keep values as needed
      // setFromAmount('');
      // setToAmount('');
    } catch (error) {
      toast({
        title: 'Swap failed',
        description: 'There was an error processing your swap',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSwapping(false);
    }
  };

  const getFromCoinData = () =>
    cryptocurrencies.find((crypto) => crypto.id === fromCoin);
  const getToCoinData = () =>
    cryptocurrencies.find((crypto) => crypto.id === toCoin);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="80vh">
        <Spinner size="xl" color={brandColor} />
      </Flex>
    );
  }

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
        Swap Coins
      </Text>
      <Text color={textColorSecondary} fontSize="md" mb="30px">
        Exchange cryptocurrencies at the best rates
      </Text>

      {/* Swap Card */}
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="20px" mb="20px">
        <Card p="0px" bg={cardBg} boxShadow={cardShadow}>
          <CardHeader px="22px" py="18px">
            <Flex justify="space-between" align="center">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Swap
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
                  From
                </FormLabel>
                {currentWallet && (
                  <Text color={textColorSecondary} fontSize="sm">
                    Balance:{' '}
                    {/* This would show actual balance in a real app */}
                    {getFromCoinData()?.symbol.toUpperCase()} 0.00
                  </Text>
                )}
              </Flex>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap="10px"
                align={{ base: 'stretch', md: 'center' }}
              >
                <Select
                  value={fromCoin}
                  onChange={(e) => setFromCoin(e.target.value)}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                  fontSize="sm"
                  maxW={{ base: '100%', md: '200px' }}
                >
                  {cryptocurrencies.map((crypto) => (
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol.toUpperCase()})
                    </option>
                  ))}
                </Select>
                <InputGroup size="md">
                  <NumberInput
                    w="100%"
                    value={fromAmount}
                    onChange={handleFromAmountChange}
                    min={0}
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
                  <InputRightElement width="4.5rem" mr="8px">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setFromAmount('1')}
                      colorScheme="gray"
                      variant="ghost"
                    >
                      MAX
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </FormControl>

            {/* Swap Button */}
            <Flex justify="center" my="16px">
              <IconButton
                aria-label="Swap coins"
                icon={<Icon as={MdSwapVert} boxSize="24px" />}
                onClick={handleSwapCoins}
                variant="ghost"
                colorScheme="blue"
                borderRadius="full"
                size="md"
              />
            </Flex>

            {/* To Section */}
            <FormControl mb="24px">
              <Flex justify="space-between" mb="8px">
                <FormLabel color={textColor} fontSize="sm" fontWeight="bold">
                  To
                </FormLabel>
                {currentWallet && (
                  <Text color={textColorSecondary} fontSize="sm">
                    Balance:{' '}
                    {/* This would show actual balance in a real app */}
                    {getToCoinData()?.symbol.toUpperCase()} 0.00
                  </Text>
                )}
              </Flex>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap="10px"
                align={{ base: 'stretch', md: 'center' }}
              >
                <Select
                  value={toCoin}
                  onChange={(e) => setToCoin(e.target.value)}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                  fontSize="sm"
                  maxW={{ base: '100%', md: '200px' }}
                >
                  {cryptocurrencies.map((crypto) => (
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol.toUpperCase()})
                    </option>
                  ))}
                </Select>
                <InputGroup size="md">
                  <NumberInput w="100%" value={toAmount} isReadOnly>
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

            {/* Exchange Rate */}
            <Flex
              justify="space-between"
              align="center"
              bg={boxBg}
              p="12px"
              borderRadius="12px"
              mb="24px"
            >
              <Text color={textColorSecondary} fontSize="sm">
                Exchange Rate
              </Text>
              <Text color={textColor} fontSize="sm" fontWeight="medium">
                1 {getFromCoinData()?.symbol.toUpperCase()} ≈{' '}
                {exchangeRate.toFixed(6)}{' '}
                {getToCoinData()?.symbol.toUpperCase()}
              </Text>
            </Flex>

            {/* Slippage Settings */}
            <FormControl mb="24px">
              <Flex justify="space-between" mb="8px">
                <FormLabel color={textColor} fontSize="sm" fontWeight="bold">
                  Slippage Tolerance
                </FormLabel>
                <Icon as={MdInfo} color={textColorSecondary} />
              </Flex>
              <Flex gap="10px">
                {['0.1', '0.5', '1.0'].map((value) => (
                  <Button
                    key={value}
                    size="sm"
                    variant={slippage === value ? 'solid' : 'outline'}
                    colorScheme="blue"
                    onClick={() => setSlippage(value)}
                    borderRadius="8px"
                  >
                    {value}%
                  </Button>
                ))}
                <InputGroup size="sm">
                  <NumberInput
                    value={slippage}
                    onChange={setSlippage}
                    min={0}
                    max={100}
                    w="100%"
                  >
                    <NumberInputField
                      bg={inputBg}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="8px"
                      placeholder="Custom"
                    />
                  </NumberInput>
                  <InputRightElement>%</InputRightElement>
                </InputGroup>
              </Flex>
            </FormControl>

            {/* Swap Button */}
            <Button
              w="100%"
              h="50px"
              bg={buttonBg}
              color="white"
              fontSize="md"
              fontWeight="bold"
              borderRadius="16px"
              onClick={handleSwap}
              isLoading={isSwapping}
              loadingText="Swapping"
              isDisabled={
                !currentWallet || !fromAmount || parseFloat(fromAmount) <= 0
              }
              _hover={{ bg: 'brand.600' }}
            >
              {currentWallet ? 'Swap' : 'Connect Wallet to Swap'}
            </Button>
          </CardBody>
        </Card>

        {/* Info Card */}
        <Card p="0px" bg={cardBg} boxShadow={cardShadow}>
          <CardHeader px="22px" py="18px">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              Swap Information
            </Text>
          </CardHeader>
          <CardBody px="22px" pb="22px">
            <Flex direction="column" gap="16px">
              {/* From Coin Info */}
              <Flex align="center" gap="12px">
                <Image
                  src={getFromCoinData()?.image}
                  alt={fromCoin}
                  boxSize="40px"
                  borderRadius="full"
                />
                <Box>
                  <Text color={textColor} fontWeight="bold">
                    {getFromCoinData()?.name}
                  </Text>
                  <Text color={textColorSecondary} fontSize="sm">
                    {getFromCoinData()?.symbol.toUpperCase()}
                  </Text>
                </Box>
                <Text ml="auto" color={textColor} fontWeight="medium">
                  ${getFromCoinData()?.current_price.toFixed(2)}
                </Text>
              </Flex>

              {/* To Coin Info */}
              <Flex align="center" gap="12px">
                <Image
                  src={getToCoinData()?.image}
                  alt={toCoin}
                  boxSize="40px"
                  borderRadius="full"
                />
                <Box>
                  <Text color={textColor} fontWeight="bold">
                    {getToCoinData()?.name}
                  </Text>
                  <Text color={textColorSecondary} fontSize="sm">
                    {getToCoinData()?.symbol.toUpperCase()}
                  </Text>
                </Box>
                <Text ml="auto" color={textColor} fontWeight="medium">
                  ${getToCoinData()?.current_price.toFixed(2)}
                </Text>
              </Flex>

              <Box h="1px" bg={borderColor} my="8px" />

              {/* Transaction Details */}
              <Text color={textColor} fontWeight="bold" mb="8px">
                Transaction Details
              </Text>

              <Flex justify="space-between">
                <Text color={textColorSecondary} fontSize="sm">
                  Estimated Gas Fee
                </Text>
                <Text color={textColor} fontSize="sm">
                  0.0005 ETH
                </Text>
              </Flex>

              <Flex justify="space-between">
                <Text color={textColorSecondary} fontSize="sm">
                  Slippage Tolerance
                </Text>
                <Text color={textColor} fontSize="sm">
                  {slippage}%
                </Text>
              </Flex>

              <Flex justify="space-between">
                <Text color={textColorSecondary} fontSize="sm">
                  Minimum Received
                </Text>
                <Text color={textColor} fontSize="sm">
                  {(
                    parseFloat(toAmount) *
                    (1 - parseFloat(slippage) / 100)
                  ).toFixed(6)}{' '}
                  {getToCoinData()?.symbol.toUpperCase()}
                </Text>
              </Flex>

              <Box h="1px" bg={borderColor} my="8px" />

              {/* Connected Wallet */}
              <Text color={textColor} fontWeight="bold" mb="8px">
                Connected Wallet
              </Text>

              {currentWallet ? (
                <Flex align="center" gap="12px">
                  <Box bg={boxBg} borderRadius="full" p="8px">
                    <Image
                      src={`/img/wallets/${currentWallet}.svg`}
                      alt={currentWallet}
                      boxSize="24px"
                    />
                  </Box>
                  <Box>
                    <Text color={textColor} fontWeight="medium">
                      {currentWallet === 'metamask' ? 'MetaMask' : 'TronLink'}
                    </Text>
                    <Text color={textColorSecondary} fontSize="xs">
                      {walletAddress &&
                        `${walletAddress.slice(0, 6)}...${walletAddress.slice(
                          -4,
                        )}`}
                    </Text>
                  </Box>
                </Flex>
              ) : (
                <Text color={textColorSecondary} fontSize="sm">
                  No wallet connected
                </Text>
              )}
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
