import eslint from './lib/eslint-configs.js';
import stylelint from './lib/stylelint-configs.js';
import prettier from './lib/prettier-configs.js';
import commitlint from './lib/commitlint-config.js';

export const configs = {
  eslint: () => eslint,
  stylelint: () => stylelint,
  prettier: () => prettier,
  commitlint: () => commitlint,
};
