export const configs = {
  eslint: () => import('./lib/eslint-configs.js'),
  stylelint: () => import('./lib/stylelint-configs.js'),
  prettier: () => import('./lib/prettier-configs.js'),
};
