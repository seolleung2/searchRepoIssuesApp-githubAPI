import React, { FunctionComponent } from 'react';

const Instruction: FunctionComponent = () => {
  return (
    <>
      <h2 className="py-3 text-2xl font-semibold">How to use</h2>
      <div className="text-sm">
        <p className="py-1.5">
          1. 깃허브 레포지토리명을 입력창에 입력해 주세요.
        </p>
        <p className="py-1.5">
          2. 이후, 검색 결과에서 원하는 항목을 클릭해 주세요.
        </p>
        <p className="py-1.5">
          3. 클릭 시 아래에 추가되며 추가되는 항목은 최대 4개를 넘을 수
          없습니다.
        </p>
        <p className="py-1.5">
          4. 추가된 항목들 중 개별 항목을 삭제할 수 있습니다.
        </p>
        <p className="py-1.5">
          5. 추가된 개별 항목 내 각 버튼을 클릭 시 항목별 깃허브 레포 페이지
          이동 또는 상세 이슈를 확인할 수 있는 페이지로 이동합니다.
        </p>
      </div>
    </>
  );
};

export default Instruction;
