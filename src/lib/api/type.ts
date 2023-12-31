export type AuthProps = {
  token?: string | null;
};

export type CreatePostParam = {
  title: string;
  description?: string;
  content?: string;
  coverUrl?: string;
  status?: PostStatus;
  createdAt?: Date;
};

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SHELVE = 'SHELVE',
}

export type PostMetaData = {
  title: string;
  description?: string;
  createdAt?: number;
  tags: string[];
};

export type PostData = {
  id: number;
  title: string;
  description?: string;
  content?: string;
  coverUrl?: string;
  status?: PostStatus;
  authorId?: number;
  createdAt?: number;
};

export enum GalleryType {
  TAPE = 'TAPE',
}
export type CreateGalleryItemParam = {
  name: string;
  cover?: string;
  images: string[];
  org?: string;
  itemType?: GalleryType;
  createdAt?: number;
};

export type GalleryItemData = {
  id: number;
  name: string;
  itemType: string;
  cover?: string;
  images: string[];
  orgId?: number;
  org?: OrgType;
  createdAt: string;
  updatedAt: string;
};

export type OrgType = {
  id: number;
  name: string;
  description?: string;
  avatar?: string;
  createdAt?: number;
  updatedAt?: number;
};

export type BatchPayload = {
  count: number;
};
