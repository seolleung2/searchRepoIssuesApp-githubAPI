import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWindowClose } from 'react-icons/fa';
import { RepositoryDetailItem } from '@Types/repositories';

type Props = {
  repository: RepositoryDetailItem;
};

const RepositoryItem: FunctionComponent<Props> = ({ repository }) => {
  const handleDeleteTodo = (deleteId: number) => {
    // * 스토어에서 해당 항목을 지우도록 할 예정
  };

  return (
    <>
      <div className="flex rounded-md bg-slate-100 shadow-md shadow-zinc-400">
        <Image
          className="rounded-full p-3"
          src={repository.image}
          width={100}
          height={100}
          alt={repository.value}
        />
        <div className="relative flex w-full p-2">
          <div className="w-full">
            <p className="mb-1 break-all text-sm font-semibold line-clamp-1">
              {repository.value}
            </p>
            <p className="text-xs line-clamp-2">{repository.description}</p>
          </div>
          <div className="cursor-pointer pl-1.5 text-xl">
            <FaWindowClose
              className="opacity-60 hover:opacity-100"
              onClick={handleDeleteTodo.bind(null, repository.id)}
            />
          </div>
          <Link
            href={`https://github.com/${repository.value}`}
            rel="noopener noreferrer"
            target="_blank"
            className="absolute bottom-1 rounded bg-blue-400 p-1.5 text-xs text-white hover:bg-blue-600"
          >
            레포 이동
          </Link>
          <Link
            href={`https://github.com/${repository.value}`}
            rel="noopener noreferrer"
            target="_blank"
            className="absolute bottom-1 right-20 rounded bg-green-400 p-1.5 text-xs text-white hover:bg-green-600 sm:right-80"
          >
            상세 이슈 확인
          </Link>
        </div>
      </div>
    </>
  );
};

export default RepositoryItem;
