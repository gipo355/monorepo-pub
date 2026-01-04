export const configs = {
  astro: () => import('./eslint/astro.js'),
  base: () => import('./eslint/base.js'),
  react: () => import('./eslint/react.js'),
  vue: () => import('./eslint/vue.js'),
  angular: () => import('./eslint/angular.js'),
  node: () => import('./eslint/node.js'),
  svelte: () => import('./eslint/svelte.js'),
};
