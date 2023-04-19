import type { ButtonProps, PopconfirmProps } from 'antd';
import { Button, Popconfirm } from 'antd';
import React from 'react';

export interface DeleteButtonProps extends ButtonProps {
  popconfirmProps?: PopconfirmProps;
  /**
   * 确认删除后执行，返回Promise 的异步关闭
   * () => new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });
   */
  onConfirm?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = (
  props: DeleteButtonProps,
) => {
  const { children, onConfirm, popconfirmProps, ...otherProps } = props;
  const { title = '删除确认', ...otherPopconfirmProps } = popconfirmProps || {};

  return (
    <Popconfirm
      title={title}
      description="请确认是否执行删除操作?"
      okText="确认"
      cancelText="取消"
      onConfirm={onConfirm}
      {...otherPopconfirmProps}
    >
      <Button danger {...otherProps}>
        {children || '删除'}
      </Button>
    </Popconfirm>
  );
};

export default React.memo(DeleteButton);
