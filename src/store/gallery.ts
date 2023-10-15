import { Tape } from '@/constants/temp';
import { atom } from 'jotai';

export const galleryTapeDetailDialogOpenAtom = atom<boolean>(false);
export const galleryTapeDetailAtom = atom<Tape | null>(null);
