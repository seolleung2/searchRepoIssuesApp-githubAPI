import React, { FunctionComponent } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { useIssues } from '@hooks/api/issues';
import { PAGE_SIZE } from '@Types/issues';
import IssueItem from './IssueItem';

type Props = {
  owner: string;
  repo: string;
  activePage: number;
};

const IssueList: FunctionComponent<Props> = ({ owner, repo, activePage }) => {
  const { data: issueList } = useIssues({
    owner,
    repo,
    page: activePage,
    size: PAGE_SIZE,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full flex-col items-center">
        <LoadingOverlay visible={!issueList} overlayBlur={2} />
        <h2 className="py-3 text-2xl font-semibold">Related Issues</h2>
        <div className="relative mb-4 grid w-fit grid-cols-1 gap-2">
          {(issueList || []).map((issueItem) => {
            return <IssueItem key={issueItem.id} issueItem={issueItem} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default IssueList;
