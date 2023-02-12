import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { IssueItemType } from '@Types/issues';
import Link from 'next/link';

type Props = {
  issueItem: IssueItemType;
};

const IssueItem: FunctionComponent<Props> = ({ issueItem }) => {
  const subDate = issueItem.updated_at.substr(0, 10);

  return (
    <Link href={issueItem.html_url} rel="noopener noreferrer" target="_blank">
      <div className="h-30 flex rounded-md bg-zinc-100 shadow-md shadow-zinc-400 hover:bg-zinc-200">
        <Image
          className="w-24 rounded-tl-lg rounded-bl-lg object-cover object-center opacity-100 hover:opacity-80 sm:w-32"
          src={issueItem.user?.avatar_url || '/images/github_image.jpeg'}
          width={100}
          height={100}
          alt="user-avatar"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPceehQPQAHNwK+rYgiWwAAAABJRU5ErkJggg=="
        />
        <div className="w-60 p-2.5 sm:w-72">
          <p className="mb-1 break-all text-sm font-semibold line-clamp-1">
            {decodeURIComponent(issueItem.title)}
          </p>
          <p className="text-xs line-clamp-1">
            {issueItem.repository_url.split('/repos/')[1]}
          </p>
          <p className="text-xs line-clamp-1">
            {moment(subDate, 'YYYY-MM-DD').add(5, 'days').format('YYYY.MM.DD')}{' '}
            에 업데이트됨
          </p>
          <p className="text-xs font-semibold text-stone-500 line-clamp-1">
            {issueItem.user?.login}
          </p>
          <p className="flex h-[26px] flex-row items-center space-x-1 overflow-x-hidden break-words line-clamp-1">
            {(issueItem.labels || []).map((label) => (
              <span
                key={label.id}
                className={`whitespace-nowrap rounded bg-slate-300 p-0.5 text-xs font-semibold shadow-md shadow-zinc-400`}
              >
                {label.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default IssueItem;
