import { DeleteButton } from 'ant-design-ext';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <>
      <DeleteButton
        onConfirm={() =>
          new Promise((resolve) => {
            setTimeout(() => resolve(null), 3000);
          })
        }
      >
        删除
      </DeleteButton>
      <DeleteButton
        type="link"
        onConfirm={() =>
          new Promise((resolve) => {
            setTimeout(() => resolve(null), 3000);
          })
        }
      >
        删除
      </DeleteButton>
    </>
  );
};

export default React.memo(Demo);
