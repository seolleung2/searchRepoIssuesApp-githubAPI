import { StateCreator } from 'zustand';
import { RepositoryDetailItem } from '@Types/repositories';

export interface RepositorySlice {
  repositoryList: RepositoryDetailItem[];
  addRepository: (item: RepositoryDetailItem) => void;
}

export const createRepoSlice: StateCreator<RepositorySlice> = (set, get) => ({
  repositoryList: [],
  addRepository: (repoItem: RepositoryDetailItem) => {
    const repositoryList = get().repositoryList;

    repositoryList.push(repoItem);

    set({ repositoryList });
  },
});
