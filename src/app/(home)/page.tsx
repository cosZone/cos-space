'use client';
import { Button } from '@/components/ui/button';
import PostList from '@/components/ui/post/PostList';
import { useMutationCreatePost } from '@/hooks/post';
import matter from 'gray-matter';
import _ from 'lodash-es';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export default function Home() {
  const { mutate } = useMutationCreatePost();

  const processFile = useCallback((file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onabort = () => reject(new Error('File reading was aborted'));
      reader.onerror = () => reject(new Error('File reading has failed'));
      reader.onload = () => {
        const content = reader.result;
        if (typeof content !== 'string') {
          toast.error('文件内容不是字符串！');
          return reject(new Error('文件内容不是字符串！'));
        }
        const parsedData = matter(content as string);
        console.log('data:', { content, parsedData });
        resolve(parsedData);
      };
      reader.readAsText(file);
    });
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      Promise.all(acceptedFiles.map((file) => processFile(file)))
        .then((data) => {
          console.log('result:', data);
          console.table(data);
          toast.success('所有文件上传成功');
        })
        .catch((error) => toast.error(`上传出错: ${error.message}`));
    },
    [processFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
    },
  });

  return (
    <>
      <Button
        className="mb-12"
        onClick={() =>
          mutate({
            title: 'test_' + _.random(1000),
            description: '这是一条测试摘要' + _.random(1000),
            content: '# Hello\nTest Word',
          })
        }
      >
        Create Test
      </Button>
      <div className="mb-12">
        上传.md博客文件
        <div className="flex-center w-full rounded-lg bg-card px-10 py-6" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>拖拽.md文件到这里</p>
        </div>
      </div>
      <PostList />
    </>
  );
}
