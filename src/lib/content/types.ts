/**
 * Content-related type definitions
 */

export type Category = {
  name: string;
  children?: Category[];
};

export type CategoryListResult = {
  categories: Category[];
  countMap: { [key: string]: number };
};
