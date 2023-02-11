import axios from 'axios';
import { IssueParams } from '@Types/issues';

export const getIssues = async ({ owner, repo, page, size }: IssueParams) => {
  const {
    data: { items },
  } = await axios.get('http://localhost:3000/api/get-issues', {
    params: {
      owner,
      repo,
      page,
      size,
    },
  });

  return items;
};
