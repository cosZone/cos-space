import { atom } from 'jotai';

export const postActiveTocIdAtom = atom<string | null>(null);

export const postIsEditAtom = atom(false);
