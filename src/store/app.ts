// import { MobileSiderNavType } from '@/components/layout/sider';
import { atom } from 'nanostores';

export const oneLevelTabSelectIdxAtom = atom<number>(0);

export const oneLevelMenuExpandAtom = atom<boolean>(false);

export const pathnameAtom = atom<string>('');
// export const currentMobileSiderNavAtom = atom<MobileSiderNavType>(MobileSiderNavType.NAV);
