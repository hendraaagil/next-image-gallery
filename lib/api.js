const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export const getCuratedProps = async () => {
  const res = await fetch(
    `https://api.pexels.com/v1/curated?page=11&per_page=18`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const resJson = await res.json();
  return resJson.photos;
};

export const getQueryPhotos = async (query) => {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const resJson = await res.json();
  return resJson.photos;
};
