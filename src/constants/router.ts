export type Router = {
  name?: string;
  path?: string;
  icon?: string;
  children?: Router[];
};

export enum Routes {
  Home = '/',
  About = '/about',
  Categories = '/categories',
  Tags = '/tags',
  // Gallery = '/gallery',
  Post = '/post',
  Archives = '/archives',
  // Dashboard = '/dashboard',
}

export const routers: Router[] = [
  { name: '首页', path: Routes.Home, icon: 'fa6-solid:house-chimney' },
  {
    name: '文章',
    icon: 'ri:quill-pen-ai-fill',
    children: [
      { name: '分类', path: Routes.Categories, icon: 'ri:grid-fill' },
      { name: '标签', path: Routes.Tags, icon: 'fa6-solid:tags' },
      { name: '归档', path: Routes.Archives, icon: 'ri:archive-2-fill' },
    ],
  },
  { name: '关于', path: Routes.About, icon: 'fa6-regular:circle-user' },
  // { name: '展示柜', path: Routes.Gallery },
  // { name: '仪表盘', path: Routes.Dashboard, needOwner: true },
];
