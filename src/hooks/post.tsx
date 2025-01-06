// import { createPost, createPosts, fetchPublicAllPost, fetchPublicPost } from '@/lib/api';
// import { CreatePostParam } from '@/lib/api/type';
// import { postActiveTocIdAtom } from '@/store/post';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { useAtom } from 'jotai';
// import { startTransition, useEffect } from 'react';
// import { useGetToken } from './user';
// import { toast } from 'react-toastify';

// export const useActiveTocId = ($headings?: HTMLHeadingElement[]) => {
//   const [activeId, setActiveId] = useAtom(postActiveTocIdAtom);
//   useEffect(() => {
//     if (!$headings) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             startTransition(() => {
//               setActiveId(entry.target.id);
//             });
//           }
//         });
//       },
//       { rootMargin: `80px 0px -80px 0px` }, // 上边缘 80px
//     );
//     $headings.forEach(($heading) => {
//       observer.observe($heading);
//     });
//     return () => {
//       observer.disconnect();
//     };
//   }, [$headings, setActiveId]);

//   return [activeId, setActiveId] as const;
// };

// export const useMutationCreatePost = () => {
//   const getToken = useGetToken();
//   return useMutation({
//     mutationFn: async (data: CreatePostParam) => {
//       const token = await getToken();
//       return createPost({ token, ...data });
//     },
//     onSuccess: (res) => {
//       const { code, data } = res ?? {};
//       if (code !== 200) {
//         toast.error(`发表测试文章失败！`);
//         return;
//       }
//       toast.success(`发表测试文章成功！ title: ${data?.title} id: ${data?.id}`);
//       return data;
//     },
//     onError: (e) => {
//       console.log(e);
//       toast.error(`发表测试文章失败！`);
//     },
//   });
// };

// export const useMutationCreatePosts = () => {
//   const getToken = useGetToken();
//   return useMutation({
//     mutationFn: async (posts: CreatePostParam[]) => {
//       const token = await getToken();
//       return createPosts({ token, posts });
//     },
//     onSuccess: (res) => {
//       const { code, data } = res ?? {};
//       if (code !== 200) {
//         toast.error('批量发表测试文章失败！');
//         return;
//       }
//       toast.success(`批量发表测试文章成功！共发表${data?.count ?? 0}篇文章`);
//       return data;
//     },
//     onError: (e) => {
//       console.log(e);
//       toast.error('发表测试文章失败！');
//     },
//   });
// };

// export const useFetchPublicPostList = () => {
//   return useQuery(['fetch_public_post_list'], () => fetchPublicAllPost(), {
//     select: (res) => {
//       const { code, data } = res ?? {};
//       if (code === 200) {
//         return data;
//       }
//     },
//   });
// };
