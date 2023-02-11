import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { IssueItemType } from '@Types/issues';

async function getIssues({
  owner,
  repo,
  page,
  size,
}: {
  owner: string;
  repo: string;
  page: number;
  size: number;
}) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        params: {
          page,
          per_page: size,
        },
        headers: {
          Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
          accept: 'application/vnd.github+json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: IssueItemType[];
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { owner, repo, page, size } = req.query;

  if (owner == null || repo == null) {
    res.status(400).json({ message: `no parameters owner and repo` });
    return;
  }

  if (page == null || size == null) {
    res.status(400).json({ message: `no parameters page or size` });
    return;
  }

  try {
    const issues = await getIssues({
      owner: String(owner),
      repo: String(repo),
      page: Number(page),
      size: Number(size),
    });

    res.status(200).json({ items: issues, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed` });
  }
}
