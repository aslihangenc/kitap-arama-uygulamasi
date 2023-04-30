import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Input,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from './api';
import Book from './components/book';

function App() {
  const [books, setBooks] = useState([]);
  const [term, setTerm] = useState('Harry Potter');
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = () => {
    setTerm(document.getElementById('search').value);
  };

  const loadMore = () => {
    setLoading(true);
    api
      .pagination(term, books.length)
      .then((res) => {
        if (res.data.items) {
          setBooks([...books, ...res.data.items]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    api
      .search(term)
      .then((res) => {
        setBooks(res.data.items);
        setTotalCount(res.data.totalItems);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [term]);

  return (
    <Box bg="gray.100" pb={6}>
      <Box
        bgImage="/assets/images/hero.webp"
        bgSize="cover"
        bgRepeat="repeat"
        bgPosition="center"
        w="100%"
        h="50vh"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <Input
          id="search"
          placeholder="Search"
          defaultValue={term}
          w={{
            base: '90%',
            md: '50%',
            lg: '25%',
          }}
          bgColor="white"
        />
        <Button onClick={handleSearch} colorScheme="gray" color="black">
          <SearchIcon />
        </Button>
      </Box>
      <Divider orientation="vertical" h="12" />
      <Container maxW="container.xl">
        {loading ? (
          <Flex justifyContent="center" height="36">
            <Spinner size="xl" />
          </Flex>
        ) : null}
        <SimpleGrid
          columns={{
            base: 2,
            md: 3,
            lg: 4,
          }}
          spacing={10}
        >
          {books.map((x) => (
            <Book data={x} key={x.id} />
          ))}
        </SimpleGrid>
        <Center mt={6}>
          <Button
            colorScheme="cyan"
            mx="auto"
            onClick={loadMore}
            isLoading={loading}
            isDisabled={books.length === totalCount}
            loadingText="Yükleniyor..."
          >
            Daha Fazla
          </Button>
        </Center>
      </Container>
    </Box>
  );
}

export default App;
