export const getError = {
    notFound: (url: string) => {
      throw  Error(`Failed to fetch data from ${url}`);
    },
  };