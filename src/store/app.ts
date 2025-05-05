import { HomeSiderSegmentType, HomeSiderType } from '@constants/enum';
import { atom } from 'nanostores';

export const homeSiderSegmentType = atom<HomeSiderSegmentType>(HomeSiderSegmentType.INFO);
export const homeSiderType = atom<HomeSiderType>(HomeSiderType.HOME);
