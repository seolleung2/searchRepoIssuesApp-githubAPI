import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { RepositoryItem } from '@Types/repositories';

type Params = {
  q: string;
  per_page?: number;
};

async function getRepositories({ keyword }: { keyword: string }) {
  const params: Params = {
    q: keyword || "''",
  };

  if (keyword !== '') params.per_page = 5;

  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories`,
      {
        params,
        headers: {
          accept: 'application/vnd.github+json',
        },
      }
    );

    const { items: repositories } = response.data;

    return repositories;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: RepositoryItem[];
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { keyword } = req.query;

  try {
    const repositories = await getRepositories({ keyword: String(keyword) });

    res.status(200).json({ items: repositories, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
