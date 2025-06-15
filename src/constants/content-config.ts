export interface ContentConfig {
  // 是否为外部链接添加 target="_blank"
  addBlankTarget: boolean;
  // 是否启用锚点链接的平滑滚动
  smoothScroll: boolean;
}

export const defaultContentConfig: ContentConfig = {
  addBlankTarget: true,
  smoothScroll: true,
};
