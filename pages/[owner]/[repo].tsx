import React, { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Pagination } from '@mantine/core';
import { BaseLayout } from '@components/layout';
import { PAGE_SIZE } from '@Types/issues';
import { getIssues } from '@apis/issues';
import { ParsedUrlQuery } from 'querystring';
import { IssueList } from '@components/issue';

interface Props {
  isError: boolean;
  maxTotalIssues: number;
}

const RepositoryIssuesPage: FunctionComponent<Props> = ({
  isError,
  maxTotalIssues,
}) => {
  const [activePage, setPage] = useState(1);

  const router = useRouter();
  const { query } = router;

  if (isError) return <div>Error occur..</div>;

  return (
    <BaseLayout pageTitle="Issues">
      {'owner' in query && (
        <IssueList
          owner={query.owner as string}
          repo={query.repo as string}
          activePage={activePage}
        />
      )}
      <div className="mt-2 flex w-full">
        <Pagination
          className="m-auto"
          size="sm"
          page={activePage}
          onChange={setPage}
          total={Math.ceil(maxTotalIssues / PAGE_SIZE)}
          color="dark"
        />
      </div>
    </BaseLayout>
  );
};

export default RepositoryIssuesPage;

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { owner: ownerValue, repo: repoValue } = params as ParsedUrlQuery;

  const owner = ownerValue as string;
  const repo = repoValue as string;

  let isError = false;
  let maxTotalIssues = 0;

  try {
    const issues = await getIssues({
      owner,
      repo,
      page: 1,
      size: 100,
    });

    maxTotalIssues = issues.length;
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      isError,
      maxTotalIssues,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
