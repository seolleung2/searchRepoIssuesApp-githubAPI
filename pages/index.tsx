import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { BaseLayout } from '@components/layout';
import { AutoComplete } from '@components/input';
import { RepositoryItem } from '@Types/repositories';
import { useRepositories } from '@hooks/api/repositories';
import { getRepositories } from '@apis/repositories';

export default function Home() {
  const [keyword, setKeyword] = useState<string>('');

  const { data: repositories } = useRepositories({
    keyword,
  });

  return (
    <BaseLayout pageTitle="Search Github Repo">
      <AutoComplete
        keyword={keyword}
        setKeyword={setKeyword}
        data={repositories as RepositoryItem[]}
      />
      <div>Repository List Component will be displayed</div>
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
