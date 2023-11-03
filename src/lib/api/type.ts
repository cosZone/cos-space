export type AuthProps = {
  token?: string | null;
};

export type CreatePostParam = AuthProps & {
  title: string;
  description?: string;
  content?: string;
  coverUrl?: string;
  status?: PostStatus;
};

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SHELVE = 'SHELVE',
}

export type PostData = {
  id: number;
  title: string;
  description?: string;
  content?: string;
  coverUrl?: string;
  status?: PostStatus;
  authorId?: number;
  createdAt?: number;
  updatedAt?: number;
};
