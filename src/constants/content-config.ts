export interface ContentConfig {
  // 是否为外部链接添加 target="_blank"
  addBlankTarget: boolean;
}

export const defaultContentConfig: ContentConfig = {
  addBlankTarget: true,
};
