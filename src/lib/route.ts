import { Routes } from '@constants/router';

type PostParam = {
  id: number | string;
};
export type RouteParams<T extends Routes> = T extends Routes.Post ? PostParam : undefined;

export function routeBuilder<T extends Routes>(route: T, param: RouteParams<typeof route>) {
  let href: string = route;
  if (typeof param === 'undefined') return href;
  switch (route) {
    case Routes.Post:
      href += `/${param.id}`;
      break;
    default:
      break;
  }
  return href;
}
