import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@lib/store';
import { FaWindowClose } from 'react-icons/fa';
import { RepositoryDetailItem } from '@Types/repositories';

type Props = {
  repository: RepositoryDetailItem;
};

const RepositoryItem: FunctionComponent<Props> = ({ repository }) => {
  const { removeRepository } = useAppStore();

  const handleDeleteTodo = (deleteId: number) => {
    removeRepository(deleteId);
  };

  return (
    <>
      <div className="flex h-[100px] rounded-md bg-slate-100 shadow-md shadow-zinc-400">
        <div className="flex items-center justify-center">
          <Image
            className="rounded-full p-1.5"
            src={repository.image}
            width={100}
            height={100}
            alt={repository.value}
          />
        </div>
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
            className="absolute bottom-1 rounded bg-blue-400 py-1.5 px-3 text-xs text-white hover:bg-blue-600"
          >
            레포 이동
          </Link>
          <Link
            href={`https://github.com/${repository.value}`}
            rel="noopener noreferrer"
            target="_blank"
            className="absolute bottom-1 right-20 rounded bg-green-400 py-1.5 px-3 text-xs text-white hover:bg-green-600 sm:right-[312px]"
          >
            상세 이슈 확인
          </Link>
        </div>
      </div>
    </>
  );
};

export default RepositoryItem;
