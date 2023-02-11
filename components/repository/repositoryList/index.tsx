import React, { FunctionComponent } from 'react';
import RepositoryItem from './RepositoryItem';
import { RepositoryDetailItem } from '@Types/repositories';

type Props = {
  repositories: RepositoryDetailItem[];
};

const TodoList: FunctionComponent<Props> = ({ repositories }) => {
  return (
    <>
      <h2 className="py-3 text-2xl font-semibold">Repositories</h2>
      <div className="relative grid max-h-[440px] w-full grid-cols-1 gap-2 overflow-y-auto pb-4 sm:mb-2">
        {repositories && repositories.length > 0 ? (
          repositories.map((repository) => (
            <RepositoryItem key={repository.id} repository={repository} />
          ))
        ) : (
          <div>No added more repositories..</div>
        )}
      </div>
    </>
  );
};

export default TodoList;
