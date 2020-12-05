import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Container, Text } from '@chakra-ui/react';
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
        {photos.map((pic) => (
          <Image
            key={pic.id}
            src={pic.src.landscape}
            alt={pic.url}
            width={600}
            height={400}
          />
        ))}
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
