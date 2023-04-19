/**
 * transform: true
 */

import { ProForm } from '@ant-design/pro-components';
import { ProFormQuill } from 'ant-design-ext';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import './index.less';

const formats = [
  'header',
  'font',
  'size',
  'color',
  'background',
  'align',
  'bold',
  'italic',
  'underline',
  'strike',
  'script',
  'indent',
  'list',
  'bullet',
  'check',
  'blockquote',
  'code-block',
  'link',
  'image',
  'video',
];

// todo: 图片可设置宽度和裁剪

export interface DemoProps {}

const Demo: React.FC<DemoProps> = () => {
  const quillRef = React.useRef<any>(null);

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          link: () => {
            const url = window.prompt('Enter the URL');
            if (url) {
              quillRef.current?.getEditor().format('link', url);
            }
          },
          image: () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
              if (input.files?.length) {
                const file = input.files[0];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('businessType', 'png');
                const response = await fetch(
                  'http://localhost:25889/api/file/upload',
                  {
                    method: 'POST',
                    headers: {
                      // 'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                  },
                );

                const data = await response.json();
                const imageUrl =
                  'http://localhost:25889/api/file/download?fileUrl=' +
                  data.data;

                const quill = quillRef.current?.getEditor();
                const range = quill.getSelection(true);
                quill.insertEmbed(range.index, 'image', imageUrl);
              }
            };
          },
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  return (
    <div className="demo-quill">
      <ProForm
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <ProFormQuill
          label="内容"
          name="test"
          rules={[{ required: true, message: '内容必须填写' }]}
          fieldProps={{
            theme: 'snow',
            modules,
            formats,
            ref: (el) => (quillRef.current = el),
          }}
        />
      </ProForm>
    </div>
  );
};

export default React.memo(Demo);
