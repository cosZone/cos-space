import { GalleryItemData } from '@/lib/api/type';
import { atom } from 'jotai';

export const galleryTapeDetailDialogOpenAtom = atom<boolean>(false);
export const galleryTapeDetailAtom = atom<GalleryItemData | null>(null);
