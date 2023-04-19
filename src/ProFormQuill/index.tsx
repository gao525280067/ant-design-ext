import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import React from 'react';
import ReactQuill from 'react-quill';

export interface ProFormQuillProps extends ProFormItemProps {
  placeholder?: string;
}

const ProFormQuill: React.FC<ProFormQuillProps> = (
  props: ProFormQuillProps,
) => {
  return (
    <ProForm.Item {...props}>
      <ReactQuill placeholder={props.placeholder} {...props.fieldProps} />
    </ProForm.Item>
  );
};

export default React.memo(ProFormQuill);
