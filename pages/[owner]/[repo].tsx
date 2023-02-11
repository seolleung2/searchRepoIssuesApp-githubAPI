import React, { FunctionComponent } from 'react';
import { BaseLayout } from '@components/layout';
import { useIssues } from '@hooks/api/issues';
import { useRouter } from 'next/router';

const RepositoryIssuesPage: FunctionComponent = () => {
  const router = useRouter();
  const { route } = router;
  const { data } = useIssues({
    owner: 'codestates',
    repo: 'naganda-client',
    page: 1,
    size: 5,
  });

  console.log(data);
  return (
    <BaseLayout pageTitle="Issues">
      <h2 className="py-3 text-2xl font-semibold">Related Issues</h2>
    </BaseLayout>
  );
};

export default RepositoryIssuesPage;
