import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { BaseLayout } from '@components/layout';
import { AutoComplete } from '@components/input';
import { RepositoryList } from '@components/repository';
import Instruction from '@components/instruction';
import { RepositoryItem, RepositoryDetailItem } from '@Types/repositories';
import { useAppStore } from '@lib/store';
import useDebounce from '@hooks/useDebounce';
import { useRepositories } from '@hooks/api/repositories';
import { getRepositories } from '@apis/repositories';

export default function Home() {
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce<string>(keyword);
  const [remainRepositories, setRemainRepositories] = useState<
    RepositoryDetailItem[]
  >([]);

  const { data: repositories } = useRepositories({
    keyword: debouncedKeyword,
  });

  const { repositoryList } = useAppStore();

  useEffect(() => {
    setRemainRepositories(repositoryList);
  }, [repositoryList]);

  return (
    <BaseLayout pageTitle="Search Github Repo">
      <AutoComplete
        keyword={keyword}
        setKeyword={setKeyword}
        data={repositories as RepositoryItem[]}
      />
      <Instruction />
      <RepositoryList repositories={remainRepositories} />
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['repositories', ''], () =>
      getRepositories({
        keyword: '',
      })
    );
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      isError,
      // dehydratedState: dehydrate(queryClient),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
