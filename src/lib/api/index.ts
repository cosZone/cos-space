import request, { Response } from './request';
import { AuthProps, BatchPayload, CreateGalleryItemParam, CreatePostParam, GalleryItemData, PostData } from './type';

export const authHeader = (token?: string | null) => {
  if (!token) return {};
  return { authorization: 'Bearer ' + token };
};

export const createPost = ({ token, ...rest }: CreatePostParam & AuthProps) =>
  request.post<any, Response<PostData>>('/post/add', rest, {
    headers: authHeader(token),
  });

export const createPosts = ({ token, posts }: { posts: CreatePostParam[] } & AuthProps) =>
  request.post<any, Response<BatchPayload>>(
    '/post/add/batch',
    { posts },
    {
      headers: authHeader(token),
    },
  );

export const fetchPublicAllPost = () => request.get<any, Response<PostData[]>>('/post/public/all');
export const fetchPublicPost = ({ id }: { id?: string }) => request.get<any, Response<PostData>>('/post/' + id);

export const createGalleryItem = ({ token, ...rest }: CreateGalleryItemParam & AuthProps) =>
  request.post<any, Response<GalleryItemData>>('/gallery/add', rest, {
    headers: authHeader(token),
  });
export const createManyGalleryItem = ({ token, data }: { data: CreateGalleryItemParam[] } & AuthProps) =>
  request.post<any, Response<BatchPayload>>('/gallery/batch/add', data, {
    headers: authHeader(token),
  });

export const fetchPublicAllGalleryItem = () => request.get<any, Response<GalleryItemData[]>>('/gallery/public/all');
