import { useMemoizedFn, useRequest } from 'ahooks';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import React from 'react';

/**
 * 1. 直接以链接的形式在新窗口打开下载
 * 2. 通过转化blob数据下载
 * 3. 在导出前弹窗选择参数后按上面两种形式下载
 */
export interface ExportButtonProps extends ButtonProps {
  /**
   * link: 以链接的方式在新窗口打开
   * blob: blob的数据返回处理
   */
  exportType?: 'link' | 'blob';
  /**
   * 导出的资源url
   */
  sourceUrl?: string;
  /**
   * axios请求配置
   */
  axiosRequestconfig?: AxiosRequestConfig;
  /**
   * 下载的文件名称
   */
  downLoadFilename?: string;
  /**
   * 导出错误抛出
   */
  onExportError?: (error: Error) => void;
}

const ExportButton: React.FC<ExportButtonProps> = (
  props: ExportButtonProps,
) => {
  const {
    children,
    exportType = 'link',
    sourceUrl,
    axiosRequestconfig,
    downLoadFilename = '下载.xls',
    onExportError = () => null,
    ...otherProps
  } = props;
  const { loading, runAsync } = useRequest(
    () =>
      axios({
        url: sourceUrl,
        method: 'get',
        responseType: 'blob',
        ...axiosRequestconfig,
      }),
    {
      manual: true,
    },
  );

  const handleClick = useMemoizedFn(() => {
    if (exportType === 'link') {
      window.open(sourceUrl);
    } else if (exportType === 'blob') {
      runAsync()
        .then((data) => {
          if (data.status === 200) {
            const blob = data.data;
            const urlObject = window.URL || window.webkitURL || window;
            const export_blob = new Blob([blob]);
            const a = document.createElementNS(
              'http://www.w3.org/1999/xhtml',
              'a',
            ) as HTMLAnchorElement; // 利用a标签特性下载
            const url = urlObject.createObjectURL(export_blob);
            a.href = url;
            a.download = downLoadFilename;
            a.click();
          } else {
            console.log('导出失败');
            onExportError(new Error('导出失败'));
          }
        })
        .catch((error) => {
          console.log(error);
          onExportError(error);
        });
    }
  });

  return (
    <Button onClick={handleClick} loading={loading} {...otherProps}>
      {children || '导出'}
    </Button>
  );
};

export default React.memo(ExportButton);
