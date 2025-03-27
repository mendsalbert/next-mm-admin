'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  SimpleGrid,
  useColorModeValue,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  MdBarChart,
  MdAttachMoney,
  MdOutlineAttachMoney,
} from 'react-icons/md';
import IconBox from 'components/icons/IconBox';
import MiniStatistics from 'components/card/MiniStatistics';

interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  total_volume: number;
}

export default function CryptoPage() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>(
    [],
  );
  const [filteredCryptos, setFilteredCryptos] = useState<Cryptocurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const cardBg = useColorModeValue('white', 'navy.700');

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d',
        );
        const data = await response.json();
        setCryptocurrencies(data);
        setFilteredCryptos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        setIsLoading(false);
      }
    };

    fetchCryptocurrencies();
  }, []);

  useEffect(() => {
    // Filter cryptocurrencies based on search term
    const filtered = cryptocurrencies.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Sort cryptocurrencies
    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortBy as keyof Cryptocurrency];
      const bValue = b[sortBy as keyof Cryptocurrency];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    setFilteredCryptos(sorted);
  }, [cryptocurrencies, searchTerm, sortBy, sortDirection]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return formatCurrency(value);
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="80vh">
        <Spinner size="xl" color={brandColor} />
      </Flex>
    );
  }

  // Get top 4 cryptocurrencies for the summary cards
  const topCryptos = filteredCryptos.slice(0, 4);

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
        Cryptocurrency Market
      </Text>
      <Text color={textColorSecondary} fontSize="md" mb="30px">
        Track the latest cryptocurrency prices and market trends
      </Text>

      {/* Mini Statistics Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" mb="20px">
        {topCryptos.map((crypto) => (
          <MiniStatistics
            key={crypto.id}
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Image src={crypto.image} alt={crypto.name} boxSize="32px" />
                }
              />
            }
            name={crypto.name}
            value={formatCurrency(crypto.current_price)}
            growth={`${crypto.price_change_percentage_24h.toFixed(2)}%`}
            isPositive={crypto.price_change_percentage_24h >= 0}
          />
        ))}
      </SimpleGrid>

      {/* Search and Filter */}
      <Card p="0px" mb="20px" bg={cardBg} boxShadow={cardShadow}>
        <CardHeader px="22px" py="18px">
          <Flex justify="space-between" align="center">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              Cryptocurrency List
            </Text>
            <Flex gap={4}>
              <InputGroup maxW={{ base: '100%', md: '300px' }}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search cryptocurrency..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fontSize="sm"
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                />
              </InputGroup>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                maxW="200px"
                fontSize="sm"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="16px"
              >
                <option value="market_cap_rank">Rank</option>
                <option value="name">Name</option>
                <option value="current_price">Price</option>
                <option value="price_change_percentage_24h">24h Change</option>
                <option value="market_cap">Market Cap</option>
                <option value="total_volume">Volume</option>
              </Select>
              <Select
                value={sortDirection}
                onChange={(e) =>
                  setSortDirection(e.target.value as 'asc' | 'desc')
                }
                maxW="150px"
                fontSize="sm"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="16px"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody px="20px" pb="20px" pt="0px">
          <Box overflowX="auto">
            <Table variant="simple" color={textColor} borderColor={borderColor}>
              <Thead>
                <Tr>
                  <Th
                    cursor="pointer"
                    onClick={() => handleSort('market_cap_rank')}
                    borderColor={borderColor}
                    color={textColorSecondary}
                  >
                    #
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => handleSort('name')}
                    borderColor={borderColor}
                    color={textColorSecondary}
                  >
                    Coin
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => handleSort('current_price')}
                    borderColor={borderColor}
                    isNumeric
                    color={textColorSecondary}
                  >
                    Price
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => handleSort('price_change_percentage_24h')}
                    borderColor={borderColor}
                    isNumeric
                    color={textColorSecondary}
                  >
                    24h Change
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => handleSort('market_cap')}
                    borderColor={borderColor}
                    isNumeric
                    color={textColorSecondary}
                  >
                    Market Cap
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => handleSort('total_volume')}
                    borderColor={borderColor}
                    isNumeric
                    color={textColorSecondary}
                  >
                    Volume (24h)
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCryptos.slice(0, 20).map((crypto) => (
                  <Tr key={crypto.id}>
                    <Td borderColor={borderColor}>{crypto.market_cap_rank}</Td>
                    <Td borderColor={borderColor}>
                      <Flex align="center">
                        <Image
                          src={crypto.image}
                          alt={crypto.name}
                          boxSize="24px"
                          mr={2}
                        />
                        <Text fontWeight="bold">{crypto.name}</Text>
                        <Text color={textColorSecondary} ml={2}>
                          {crypto.symbol.toUpperCase()}
                        </Text>
                      </Flex>
                    </Td>
                    <Td borderColor={borderColor} isNumeric>
                      {formatCurrency(crypto.current_price)}
                    </Td>
                    <Td
                      borderColor={borderColor}
                      isNumeric
                      color={
                        crypto.price_change_percentage_24h >= 0
                          ? 'green.500'
                          : 'red.500'
                      }
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </Td>
                    <Td borderColor={borderColor} isNumeric>
                      {formatLargeNumber(crypto.market_cap)}
                    </Td>
                    <Td borderColor={borderColor} isNumeric>
                      {formatLargeNumber(crypto.total_volume)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
