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
  // 是否启用链接嵌入功能
  enableLinkEmbed: boolean;
  // 是否启用 Tweet 嵌入
  enableTweetEmbed: boolean;
  // 是否启用 OG 链接预览
  enableOGPreview: boolean;
  // 预览数据缓存时间（秒）
  previewCacheTime: number;
  // 是否懒加载嵌入内容
  lazyLoadEmbeds: boolean;
}

export const defaultContentConfig: ContentConfig = {
  addBlankTarget: true,
  smoothScroll: true,
  addHeadingLevel: true,
  enhanceCodeBlock: true,
  enableCodeCopy: true,
  enableCodeFullscreen: true,
  enableLinkEmbed: true,
  enableTweetEmbed: true,
  enableOGPreview: true,
  previewCacheTime: 3600, // 1 hour
  lazyLoadEmbeds: true,
};
