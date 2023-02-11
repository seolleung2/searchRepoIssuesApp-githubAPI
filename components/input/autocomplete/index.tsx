import React, { FunctionComponent, useRef, useState } from 'react';
import { Autocomplete } from '@mantine/core';
import { BsGithub } from 'react-icons/bs';
import { FaRegTimesCircle } from 'react-icons/fa';
import Portal from '@components/portal';
import Modal from '@components/modal';
import { RepositoryItem, RepositoryDetailItem } from '@Types/repositories';
import { useAppStore } from '@lib/store';
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
  const [isErrorToAdd, setIsErrorToAdd] = useState<boolean>(false);
  const [isErrorToDuplicate, setIsErrorToDuplicate] = useState<boolean>(false);

  const { addRepository, repositoryList } = useAppStore();

  const keywordRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    setKeyword(value);
  };

  const handleClearSearchKeyword = () => {
    setKeyword('');
    keywordRef.current?.focus();
  };

  const handleCloseErrorToAdd = () => {
    setIsErrorToAdd(false);
  };

  const handleCloseErrorToDuplicate = () => {
    setIsErrorToDuplicate(false);
  };

  const handleAddRepoOrErrorMessage = (
    targetIndex: number,
    item: RepositoryDetailItem
  ) => {
    if (targetIndex === -1) {
      addRepository(item);
      return;
    }
    setIsErrorToDuplicate(true);
  };

  const handleRepositorySelect = (item: RepositoryDetailItem) => {
    if (repositoryList.length < 4) {
      const { id: targetId } = item;
      const repositoryListIndex = repositoryList.findIndex(
        (repo) => repo.id === targetId
      );
      handleAddRepoOrErrorMessage(repositoryListIndex, item);
      return;
    }

    setIsErrorToAdd(true);
  };

  return (
    <>
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
          id: item.id,
          image: item.owner.avatar_url,
          owner: item.owner.login,
          name: item.name,
          url: item.html_url,
          description: item.description || 'No description',
          value: item.full_name,
        }))}
        autoFocus
        limit={10}
        maxDropdownHeight={270}
        dropdownPosition="bottom"
        onItemSubmit={handleRepositorySelect}
        filter={(value, item) => {
          return (
            item.name.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.name.toLowerCase().includes(
              value
                .replace(
                  /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
                  ' '
                )
                .toLowerCase()
                .trim()
            ) ||
            value.toLowerCase().includes(item.name.toLowerCase().trim()) ||
            value
              .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '')
              .toLowerCase()
              .includes(item.name.toLowerCase().trim()) ||
            item.description
              .toLowerCase()
              .includes(value.toLowerCase().trim()) ||
            item.description.toLowerCase().includes(
              value
                .replace(
                  /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
                  ' '
                )
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
      <Portal selector="#portal">
        {isErrorToAdd && (
          <Modal title="추가 등록 오류" onClose={handleCloseErrorToAdd}>
            <p>최대 등록 개수 4개를 초과하였습니다.</p>
          </Modal>
        )}
        {isErrorToDuplicate && (
          <Modal title="중복 등록 오류" onClose={handleCloseErrorToDuplicate}>
            <p>이미 등록된 레포지토리는 다시 추가할 수 없습니다.</p>
          </Modal>
        )}
      </Portal>
    </>
  );
};

export default AutoComplete;
