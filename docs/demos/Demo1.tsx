import { FormDesignEdit } from 'ant-design-ext';
import React from 'react';

export interface DemoProps {}

const Demo: React.FC<DemoProps> = () => {
  return <FormDesignEdit />;
};

export default React.memo(Demo);
