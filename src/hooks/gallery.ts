import { createGalleryItem, createManyGalleryItem, fetchPublicAllGalleryItem } from '@/lib/api';
import { CreateGalleryItemParam } from '@/lib/api/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useGetToken } from './user';

export const useMutationCreateGalleryItem = () => {
  const getToken = useGetToken();
  return useMutation({
    mutationFn: async (data: CreateGalleryItemParam) => {
      const token = await getToken();
      return createGalleryItem({ token, ...data });
    },
    onSuccess: (res) => {
      const { code, data } = res ?? {};
      if (code !== 200) {
        toast.error('添加胶带大失败！(☍﹏⁰)');
        return;
      }
      console.log('success', { res, data });
      toast.success(`添加胶带大成功！๐•ᴗ•๐`);
      return data;
    },
    onError: (e) => {
      console.log(e);
      toast.error('添加胶带大失败！(☍﹏⁰)');
    },
  });
};

export const useFetchPublicAllGalleryItem = () => {
  return useQuery(['fetch_public_all_gallery_item'], () => fetchPublicAllGalleryItem(), {
    select: (res) => {
      const { code, data } = res ?? {};
      if (code === 200) {
        return data;
      }
    },
  });
};

export const useMutationCreateManyGalleryItem = () => {
  const getToken = useGetToken();
  return useMutation({
    mutationFn: async (data: CreateGalleryItemParam[]) => {
      const token = await getToken();
      return createManyGalleryItem({ token, data });
    },
    onSuccess: (res) => {
      const { code, data } = res ?? {};
      if (code !== 200) {
        toast.error(`批量创建测试项失败！`);
        return;
      }
      console.log('success', { res, data });
      toast.success(`批量测试项成功！`);
      return data;
    },
    onError: (e) => {
      console.log(e);
      toast.error(`批量创建测试项失败！`);
    },
  });
};
