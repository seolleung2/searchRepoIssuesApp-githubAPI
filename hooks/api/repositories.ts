import { useQuery } from '@tanstack/react-query';
import * as api from '@apis/repositories';
import { RepositoryItem } from '@Types/repositories';

export const useRepositories = ({ keyword }: { keyword: string }) => {
  return useQuery<{ items: RepositoryItem[] }, unknown, RepositoryItem[]>(
    ['repositories', keyword],
    () => api.getRepositories({ keyword }),
    {
      staleTime: 1000 * 5,
    }
  );
};
