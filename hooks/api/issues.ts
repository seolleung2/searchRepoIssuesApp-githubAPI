import { useQuery } from '@tanstack/react-query';
import * as api from '@apis/issues';
import { IssueParams, IssueItemType } from '@Types/issues';

export const useIssues = ({ owner, repo, page, size }: IssueParams) => {
  return useQuery<{ items: IssueItemType[] }, unknown, IssueItemType[]>(
    ['issues', owner, repo, page, size],
    () => api.getIssues({ owner, repo, page, size })
  );
};
