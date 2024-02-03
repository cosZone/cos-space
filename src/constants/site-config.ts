type SiteConfig = {
  title: string;
  alternate?: string;
  subtitle?: string;
  description?: string;
  avatar?: string;
};
// https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/config/
export const siteConfig: SiteConfig = {
  // TODO: change to backend
  title: '余弦の博客', // 网站名称
  alternate: 'cosine', // 网站名称
  subtitle: 'WA的一声就哭了', // 副标题
  description: '图片迁移完毕，博客待重构~', // 站点简介（一段话）
  avatar: 'https://ysx.cosine.ren/img/avatar.jpg', // 站点头像 logo.png or url
};
