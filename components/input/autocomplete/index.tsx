import React, { FunctionComponent, useRef } from 'react';
import { Autocomplete } from '@mantine/core';
import { BsGithub } from 'react-icons/bs';
import { FaRegTimesCircle } from 'react-icons/fa';
import { RepositoryItem } from '@Types/repositories';
import AutoCompleteItem from './AutoCompleteItem';

type Props = {
  data: RepositoryItem[];
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

const AutoComplete: FunctionComponent<Props> = ({
  data,
  keyword,
  setKeyword,
}) => {
  const keywordRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    setKeyword(value);
  };

  const handleClearSearchKeyword = () => {
    setKeyword('');
    keywordRef.current?.focus();
  };

  return (
    <Autocomplete
      ref={keywordRef}
      icon={<BsGithub size={16} />}
      label="Choose repository you have searched."
      placeholder="Search github repositories.."
      itemComponent={AutoCompleteItem}
      onChange={handleInputChange}
      value={keyword}
      data={(data || []).map((item) => ({
        // ...item,
        image: item.owner.avatar_url,
        owner: item.owner.login,
        value: item.full_name,
        name: item.name,
        description: item.description || 'No description',
      }))}
      autoFocus
      limit={5}
      dropdownPosition="bottom"
      filter={(value, item) => {
        return (
          item.name.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.name.toLowerCase().includes(
            value
              .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, ' ')
              .toLowerCase()
              .trim()
          ) ||
          value.toLowerCase().includes(item.name.toLowerCase().trim()) ||
          value
            .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '')
            .toLowerCase()
            .includes(item.name.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(
            value
              .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, ' ')
              .toLowerCase()
              .trim()
          ) ||
          value.toLowerCase().includes(item.description.toLowerCase().trim())
        );
      }}
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

export default AutoComplete;
