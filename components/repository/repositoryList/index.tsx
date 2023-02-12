import React, { FunctionComponent } from 'react';
import RepositoryItem from './RepositoryItem';
import { RepositoryDetailItem } from '@Types/repositories';

type Props = {
  repositories: RepositoryDetailItem[];
};

const RepositoryList: FunctionComponent<Props> = ({ repositories }) => {
  return (
    <>
      <h2 className="py-3 text-2xl font-semibold">Repositories</h2>
      <div className="relative grid max-h-[440px] w-full grid-cols-1 gap-2 overflow-y-auto pb-4 sm:mb-2">
        {repositories && repositories.length > 0 ? (
          repositories.map((repository) => (
            <RepositoryItem key={repository.id} repository={repository} />
          ))
        ) : (
          <div>추가된 레포지토리가 없습니다. 검색을 통해 추가해주세요.</div>
        )}
      </div>
    </>
  );
};

export default RepositoryList;
