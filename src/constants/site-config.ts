type SiteConfig = {
  title: string; // 网站标题名称（banner 上）
  alternate?: string; // 网站英文短名
  subtitle?: string; // 副标题
  name: string; // 站点作者
  description?: string; // 站点简介（一段话）
  avatar?: string; // 站点头像 logo.png or url
  showLogo?: boolean; // 是否显示 logo，否则用 alternate 当·logo
  author?: string; // 文章作者
  // theme
  enableJSGridCover?: boolean; // 是否启用 color4bg 的背景 (写了不舍得扔)
  site: string; // 站点线上域名 用于 RSS 生成等
  startYear?: number; // 站点创建年份

  featuredCategories?: {
    link: string;
    image: string;
    label?: string;
    description?: string;
  }[];
};

// 社交媒体配置类型
type SocialPlatform = {
  url: string;
  icon: string;
  color: string; // default bg-primary/20
};

type SocialConfig = {
  github?: SocialPlatform;
  google?: SocialPlatform;
  twitter?: SocialPlatform;
  zhihu?: SocialPlatform;
  music?: SocialPlatform;
  weibo?: SocialPlatform;
  about?: SocialPlatform;
  email?: SocialPlatform;
  facebook?: SocialPlatform;
  stackoverflow?: SocialPlatform;
  youtube?: SocialPlatform;
  instagram?: SocialPlatform;
  skype?: SocialPlatform;
  douban?: SocialPlatform;
  bilibili?: SocialPlatform;
  rss?: SocialPlatform;
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
  site: 'https://space.cosine.ren/',
  startYear: 2020,
  featuredCategories: [
    {
      link: 'life',
      label: '随笔',
      image: '/img/cover/2.webp',
      description: '生活记录、年度总结等',
    },
    {
      link: 'note/front-end',
      label: '前端笔记',
      image: '/img/cover/1.webp',
      description: '前端相关的笔记',
    },
    {
      link: 'project',
      label: '项目集锦',
      image: '/img/cover/3.webp',
      description: '项目集锦',
    },
    {
      link: 'note',
      label: '笔记',
      image: '/img/cover/4.webp',
      description: '技术笔记、学习笔记等',
    },
    {
      link: 'tools',
      label: '工具',
      image: '/img/cover/11.webp',
      description: '工具使用、软件推荐等',
    },
    {
      link: 'coding-train',
      label: '题目记录',
      image: '/img/cover/6.webp',
      description: '曾经的刷题记录等',
    },
    {
      link: 'note/bytedance-note',
      label: '青训营笔记',
      image: '/img/cover/9.webp',
      description: '初学前端时的笔记',
    },
    {
      link: 'note/cs-basics',
      label: 'CS基础',
      image: '/img/cover/8.webp',
      description: '大学时期的 CS 基础笔记',
    },
  ],
};

// 社交媒体配置
// https://icon-sets.iconify.design/ri/
export const socialConfig: SocialConfig = {
  github: {
    url: 'https://github.com/yusixian',
    icon: 'ri:github-fill',
    color: '#191717',
  },
  // zhihu: {
  //   url: 'https://www.zhihu.com/people/qi-jiu-en',
  //   icon: 'ri:zhihu-fill',
  //   color: '#1e88e5',
  // },
  bilibili: {
    url: 'https://space.bilibili.com/10730895',
    icon: 'ri:bilibili-fill',
    color: '#da708a',
  },
  music: {
    url: 'https://music.163.com/#/user/home?id=361029804',
    icon: 'ri:netease-cloud-music-line',
    color: '#e60026',
  },
  email: {
    url: 'mailto:cosine_yu@qq.com',
    icon: 'ri:mail-line',
    color: '#55acd5',
  },
  twitter: {
    url: 'https://x.com/_cosine_x',
    icon: 'ri:twitter-fill',
    color: '#4b9ae4',
  },
  rss: {
    url: '/rss.xml',
    icon: 'ri:rss-line',
    color: '#ff6600',
  },
  // #google: https://plus.google.com/yourname || google
  // # about: https://about.me/amehime || address-card || "#3b5998"
  // #facebook: https://www.facebook.com/yourname || facebook
  // #stackoverflow: https://stackoverflow.com/yourname || stack-overflow
  // #youtube: https://youtube.com/yourname || youtube
  // #instagram: https://instagram.com/yourname || instagram
  // #skype: skype:yourname?call|chat || skype
  // #douban: https://www.douban.com/people/yourname/ || douban
  // # weibo: https://weibo.com/amehime || weibo || "#ea716e"
};

const { title, alternate, subtitle } = siteConfig;
export const seoConfig = {
  title: `${alternate ? alternate + ' = ' : ''}${title}${subtitle ? ' = ' + subtitle : ''}`,
  description:
    'cosSpace 是基于 Next.js (App Router)、Typescript、React 和 Tailwind 开发的个人空间，是 cos_blogs 的重构版，为用户提供同时拥有博客和个人空间的平台。',
  keywords: 'cos, cosine, cos_blogs, 博客, 个人空间, 技术, 前端, cos-space',
  url: 'https://space.cosine.ren/',
};

export const defaultCoverList = Array.from({ length: 12 }, (_, index) => index + 1).map((item) => `/img/cover/${item}.webp`);
