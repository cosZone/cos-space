export interface ContentConfig {
  // 是否为外部链接添加 target="_blank"
  addBlankTarget: boolean;
  // 是否启用锚点链接的平滑滚动
  smoothScroll: boolean;
  // 是否为标题添加级别标签 (H1, H2, etc.)
  addHeadingLevel: boolean;
  // 是否增强代码块 (Mac 窗口风格)
  enhanceCodeBlock: boolean;
  // 是否启用代码复制功能
  enableCodeCopy: boolean;
  // 是否启用代码全屏预览
  enableCodeFullscreen: boolean;
}

export const defaultContentConfig: ContentConfig = {
  addBlankTarget: true,
  smoothScroll: true,
  addHeadingLevel: true,
  enhanceCodeBlock: true,
  enableCodeCopy: true,
  enableCodeFullscreen: true,
};
