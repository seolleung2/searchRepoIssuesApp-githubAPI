import { StateCreator } from 'zustand';
import { RepositoryDetailItem } from '@Types/repositories';

export interface RepositorySlice {
  repositoryList: RepositoryDetailItem[];
  addRepository: (item: RepositoryDetailItem) => void;
  removeRepository: (id: number) => void;
}

export const createRepoSlice: StateCreator<RepositorySlice> = (set, get) => ({
  repositoryList: [],
  addRepository: (repoItem: RepositoryDetailItem) => {
    const repositoryList = get().repositoryList;

    repositoryList.push(repoItem);

    set({ repositoryList });
  },
  removeRepository: (id: number) => {
    const repositoryList = get().repositoryList;

    const remainRepositories = repositoryList.filter(
      (repository) => repository.id !== id
    );

    set({ repositoryList: remainRepositories });
  },
});
