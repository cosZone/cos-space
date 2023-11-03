import request, { Response } from './request';
import { CreatePostParam, PostData } from './type';

export const authHeader = (token?: string | null) => {
  if (!token) return {};
  return { authorization: 'Bearer ' + token };
};

export const createPost = ({ token, ...rest }: CreatePostParam) =>
  request.post<any, Response<PostData>>('/post', rest, {
    headers: authHeader(token),
  });
