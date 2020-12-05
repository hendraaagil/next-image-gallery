import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Container, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { getCuratedProps } from '../lib/api';

export default function Home({ data }) {
  const [photos, setPhotos] = useState(data);
  return (
    <div>
      <Head>
        <title>NextJS Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" bg="blue.100" minH="100vh">
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
                transition: '0.3s ease-in',
              }}
            >
              <Image
                src={pic.src.landscape}
                alt={pic.url}
                width={600}
                height={400}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getCuratedProps();
  return {
    props: { data },
  };
}
