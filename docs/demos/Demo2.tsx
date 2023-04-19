import { ExportButton } from 'ant-design-ext';
import { Space } from 'antd';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <Space>
      <ExportButton sourceUrl="/itsm/api/v1/operationOnDuty/output?start_date=2023-01-01&end_date=2023-01-31">
        导出
      </ExportButton>
      <ExportButton
        exportType="blob"
        sourceUrl="/itsm/api/v1/operationOnDuty/output?start_date=2023-01-01&end_date=2023-01-31"
        downLoadFilename="值班导出.xls"
      >
        导出
      </ExportButton>
    </Space>
  );
};

export default React.memo(Demo);
