import { create } from 'zustand';
import { createRepoSlice, RepositorySlice } from './slices/createRepoSlice';
import { persist } from 'zustand/middleware';

type StoreState = RepositorySlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createRepoSlice(...a),
    }),
    {
      name: 'repository-list',
    }
  )
);
