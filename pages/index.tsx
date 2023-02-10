import React, { useState } from 'react';
import { BaseLayout } from '@components/layout';
import { SearchInput } from '@components/input';

export default function Home() {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <BaseLayout pageTitle="Search Github Repo">
      <SearchInput keyword={keyword} setKeyword={setKeyword} />
      <div>Repository List Component will be displayed</div>
    </BaseLayout>
  );
}
