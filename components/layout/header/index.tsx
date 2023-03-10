import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { FaAngleLeft } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';

type Props = {
  pageTitle: string;
};

const Header: FunctionComponent<Props> = ({ pageTitle }) => {
  const router = useRouter();

  const { route, query } = router;

  const handleBackToMainPage = () => {
    router.push('/');
  };

  return (
    <div className="flex w-full items-center">
      {route !== '/' ? (
        <FaAngleLeft
          className="cursor-pointer text-6xl text-stone-500 opacity-75 hover:opacity-100"
          onClick={handleBackToMainPage}
        />
      ) : (
        <BsGithub className="block h-full w-28 text-3xl text-stone-500 sm:text-6xl" />
      )}
      <div className="pl-3 sm:pl-6">
        <h1 className="text-2xl font-semibold sm:text-4xl">{pageTitle}</h1>
        <p className="">
          <span className="font-semibold text-slate-500 sm:text-xl">
            [Repository issue tracker App]
          </span>{' '}
          <br />
          <>
            {route === '/' ? (
              <span className="text-sm text-slate-400 sm:text-base">
                Let&apos;s search anything you want using Github API🌷
              </span>
            ) : (
              <span className="text-base font-semibold line-clamp-1 sm:text-base">
                Repo : {query.owner}/{query.repo}
              </span>
            )}
          </>
        </p>
      </div>
    </div>
  );
};

export default Header;
