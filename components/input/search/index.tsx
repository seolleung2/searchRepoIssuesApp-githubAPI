import React, { useRef, FunctionComponent } from 'react';
import { Input } from '@mantine/core';
import { FaRegTimesCircle } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';

type Props = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: FunctionComponent<Props> = ({ keyword, setKeyword }) => {
  const keywordRef = useRef<HTMLInputElement>(null);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleClearSearchKeyword = () => {
    setKeyword('');
    keywordRef.current?.focus();
  };

  return (
    <Input
      className="w-full"
      name="searchKeyword"
      icon={<BsGithub size={16} />}
      ref={keywordRef}
      value={keyword}
      onChange={handleChangeSearchInput}
      placeholder="Search github repositories.."
      autoFocus
      autoComplete="off"
      styles={(theme) => ({
        input: {
          '&:focus-within': {
            borderColor: theme.colors.blue[7],
            borderWidth: '2px',
          },
        },
      })}
      rightSection={
        <div
          className={`${
            keyword && keyword !== '' ? 'block' : 'invisible'
          } hover:text-blue-500`}
          onClick={handleClearSearchKeyword}
        >
          <FaRegTimesCircle />
        </div>
      }
    />
  );
};

export default SearchInput;
