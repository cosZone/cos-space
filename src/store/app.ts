import { MobileSiderNavType } from '@/components/layout/sider';
import { atom } from 'jotai';

export const oneLevelTabSelectIdxAtom = atom<number>(0);

export const oneLevelMenuExpandAtom = atom<boolean>(false);

export const currentMobileSiderNavAtom = atom<MobileSiderNavType>(MobileSiderNavType.NAV);
