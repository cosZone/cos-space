'use client';
import { Button } from '@/components/ui/button';
import PostList from '@/components/ui/post/PostList';
import { useMutationCreatePost, useMutationCreatePosts } from '@/hooks/post';
import { CreatePostParam } from '@/lib/api/type';
import matter, { GrayMatterFile } from 'gray-matter';
import _ from 'lodash-es';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export default function Home() {
  const { mutate } = useMutationCreatePosts();
  const processFile = useCallback((file: File) => {
    return new Promise<{
      parsedData: GrayMatterFile<string>;
      raw: string;
    }>((resolve, reject) => {
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
        const data = { parsedData, raw: content };
        resolve(data);
      };
      reader.readAsText(file);
    });
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      Promise.all(acceptedFiles.map((file) => processFile(file)))
        .then((data) => {
          toast.success('所有文件上传成功');
          const posts = data.map(({ raw, parsedData }) => {
            console.log({ raw, parsedData });
            const { categories, date, title, subtitle, tags, link, lang } = parsedData.data;
            const post: CreatePostParam = {
              title: title ?? '未命名',
              description: subtitle,
              content: raw,
              createdAt: date,
            };
            return post;
          });
          mutate(posts);
        })
        .catch((error) => toast.error(`上传出错: ${error.message}`));
    },
    [mutate, processFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
    },
  });

  return (
    <>
      <div className="mb-12">
        上传.md博客文件
        <div className="flex-center w-full cursor-pointer rounded-lg bg-card px-10 py-6" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>拖拽.md文件到这里，可批量导入</p>
        </div>
      </div>
      <PostList />
    </>
  );
}
