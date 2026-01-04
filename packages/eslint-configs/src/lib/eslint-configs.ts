export function eslintConfigs(): string {
  return 'eslint-configs';
}

export const configs = {
  astro: () => import('./configs/astro.js'),
  base: () => import('./configs/base.js'),
  react: () => import('./configs/react.js'),
  vue: () => import('./configs/vue.js'),
  angular: () => import('./configs/angular.js'),
  node: () => import('./configs/node.js'),
  svelte: () => import('./configs/svelte.js'),
};
