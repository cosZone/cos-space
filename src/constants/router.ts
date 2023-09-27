type Router = {
  name?: string;
  key?: string;
  path: string;
};
export const routers: Router[] = [
  { name: '首页', path: '/' },
  { name: '关于', path: '/about' },
];
