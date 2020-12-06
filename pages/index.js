import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Container,
  Text,
  Wrap,
  WrapItem,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getCuratedProps, getQueryPhotos } from '../lib/api';

export default function Home({ data }) {
  const [photos, setPhotos] = useState(data);
  const [query, setQuery] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (query === '') {
      toast({
        title: 'Error.',
        description: 'Empty Search',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } else {
      const res = await getQueryPhotos(query);
      await setPhotos(res);
      await setQuery('');
    }
  };

  return (
    <div>
      <Head>
        <title>NextJS Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" bg="blue.200" minH="100vh">
        <Container>
          <Text
            color="blue.900"
            fontWeight="bold"
            mb="1rem"
            textAlign="center"
            fontSize={['4xl', '4xl', '5xl', '5xl']}
          >
            NextJS Image Gallery
          </Text>

          <form onSubmit={handleSubmit}>
            <InputGroup pb="1rem">
              <Input
                placeholder="Search for Apple"
                variant="ghost"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <InputRightElement
                children={
                  <IconButton
                    aria-label="Search"
                    icon={<SearchIcon />}
                    bg="blue.500"
                    color="blue.50"
                    onClick={handleSubmit}
                  />
                }
              />
            </InputGroup>
          </form>
        </Container>
        <Wrap px="1rem" spacing={4} justify="center">
          {photos.map((pic) => (
            <WrapItem
              key={pic.id}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              bg="blue.50"
              lineHeight="0"
              _hover={{
                boxShadow: '2xl',
                transform: 'scale(0.98)',
                transition: '0.2s ease-in',
              }}
            >
              <Link href={`/photos/${pic.id}`}>
                <a>
                  <Image
                    src={pic.src.landscape}
                    alt={pic.url}
                    width={600}
                    height={320}
                  />
                </a>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getCuratedProps();
  return { props: { data } };
}
