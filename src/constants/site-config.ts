type SiteConfig = {
  title: string; // 网站标题名称（banner 上）
  alternate?: string; // 网站英文短名
  subtitle?: string; // 副标题
  name: string; // 作者名称
  description?: string; // 站点简介（一段话）
  avatar?: string; // 站点头像 logo.png or url
  showLogo?: boolean; // 是否显示 logo，否则用 alternate 当·logo
  author?: string; // 文章作者
  // theme
  enableJSGridCover?: boolean; // 是否启用 color4bg 的背景 (写了不舍得扔)
};

// TODO: change to backend

// https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/config/
export const siteConfig: SiteConfig = {
  title: '余弦の博客', // 网站名称
  alternate: 'cosine', // 网站名称
  subtitle: 'WA 的一声就哭了', // 副标题
  name: 'cos',
  description: '图片迁移完毕，博客待重构~', // 站点简介（一段话）
  avatar: 'https://ysx.cosine.ren/img/avatar.jpg', // 站点头像 logo.png or url
  showLogo: true, // 是否显示 logo 否则用 title
  author: 'cos', // 作者名称

  enableJSGridCover: false, // 是否启用 color4bg 的背景
};
const { title, alternate, subtitle } = siteConfig;
export const seoConfig = {
  title: `${alternate ? alternate + ' = ' : ''}${title}${subtitle ? ' = ' + subtitle : ''}`,
  description:
    'cosSpace 是基于 Next.js (App Router)、Typescript、React 和 Tailwind 开发的个人空间，是 cos_blogs 的重构版，为用户提供同时拥有博客和个人空间的平台。',
  keywords: 'cos, cosine, cos_blogs, 博客, 个人空间, 技术, 前端, cos-space',
  url: 'https://space.cosine.ren/',
};

export const defaultCoverList = [
  'https://r2.cosine.ren/i/2025/01/04/9afyt-o0.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorg-cc.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aore-zo.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorb-dz.webp',
  'https://r2.cosine.ren/i/2025/01/04/9al5e-x5.webp',
  'https://r2.cosine.ren/i/2025/01/04/9akor-7p.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorj-k5.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorc-no.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aor9-be.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aore-8n.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorg-qx.webp',
  'https://r2.cosine.ren/i/2025/01/04/9ag08-1r.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorf-yg.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorh-ms.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aord-4w.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorg-1z.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aord-2u.webp',
  'https://r2.cosine.ren/i/2025/01/04/9aorc-q4.webp',
  'https://r2.cosine.ren/i/2025/01/05/96367745_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/97313182_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/97394501_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/97538874_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/98962845_p25.webp',
  'https://r2.cosine.ren/i/2025/01/05/99107083_p1.webp',
  'https://r2.cosine.ren/i/2025/01/05/99231621_p3.webp',
  'https://r2.cosine.ren/i/2025/01/05/99232275_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/99890559_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/100066591_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/100105818_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/100483120_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/100664563_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/100843803_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/100869576_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/100916191_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101000540_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101036223_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101418711_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101490359_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101546027_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101553430_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101586094_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101772766_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/101779793_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/102015472_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/102144283_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/102449607_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/102548617_p0.webp',
  'https://r2.cosine.ren/i/2025/01/05/104060648_p0.webp',
];
