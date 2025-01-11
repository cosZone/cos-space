import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.locale('zh-cn');

export enum DateFormat {
  'YYYY-MM-DD',
  'YY-MM-DD',
  'HH:mm',
}

export const parseDate = (time: string | number | Date | undefined, format: keyof typeof DateFormat) =>
  time ? dayjs(time).format(format) : '';

export const secondOfDays = 86400;
