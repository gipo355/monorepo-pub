import astro from './eslint/astro.js';
import base from './eslint/base.js';
import react from './eslint/react.js';
import vue from './eslint/vue.js';
import angular from './eslint/angular.js';
import node from './eslint/node.js';
import svelte from './eslint/svelte.js';

export const configs = {
  astro: () => astro,
  base: () => base,
  react: () => react,
  vue: () => vue,
  angular: () => angular,
  node: () => node,
  svelte: () => svelte,
};

export default configs;
