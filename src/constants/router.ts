type Router = {
  name?: string;
  key?: string;
  path: string;
};
export enum Routes {
  Home = '/',
  About = '/about',
  Gallery = '/gallery',
  Post = '/post',
}
export const routers: Router[] = [
  { name: '首页', path: Routes.Home },
  { name: '关于', path: Routes.About },
  { name: '展示柜', path: Routes.Gallery },
];
