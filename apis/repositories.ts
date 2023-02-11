import axios from 'axios';

export const getRepositories = async ({ keyword }: { keyword: string }) => {
  const {
    data: { items },
  } = await axios.get('http://localhost:3000/api/get-repositories', {
    params: {
      keyword,
    },
  });

  return items;
};
