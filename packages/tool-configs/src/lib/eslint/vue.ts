import { Config, defineConfig } from 'eslint/config';

const configs: Record<string, Config[]> = {
  recommended: defineConfig(),
};

export default configs;
