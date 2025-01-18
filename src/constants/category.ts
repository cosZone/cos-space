import transformShokaConfig from '@scripts/transformShokaConfig';

const shokaConfig = transformShokaConfig();

// { '随笔': 'life' }
export const categoryMap: { [name: string]: string } = shokaConfig?.categoryMap || {};
