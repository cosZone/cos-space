type Router = {
  name?: string;
  path: string;
};
export enum Routes {
  Home = '/',
  About = '/about',
  Categories = '/categories',
  // Gallery = '/gallery',
  Post = '/post',
  // Dashboard = '/dashboard',
}
export const routers: Router[] = [
  { name: '首页', path: Routes.Home },
  { name: '分类', path: Routes.Categories },
  { name: '关于', path: Routes.About },
  // { name: '展示柜', path: Routes.Gallery },
  // { name: '仪表盘', path: Routes.Dashboard, needOwner: true },
];
