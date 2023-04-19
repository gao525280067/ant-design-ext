import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import React from 'react';

export interface ImportButtonProps extends ButtonProps {}

const ImportButton: React.FC<ImportButtonProps> = (
  props: ImportButtonProps,
) => {
  const { children, ...otherProps } = props;

  return <Button {...otherProps}>{children || '导入'}</Button>;
};

export default React.memo(ImportButton);
