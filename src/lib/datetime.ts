import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.locale('zh-cn');

export enum DateFormat {
  'YYYY-MM-DD',
}

export const parseDate = (time: string | number | Date, format: keyof typeof DateFormat) => dayjs(time).format(format);

export const secondOfDays = 86400;
