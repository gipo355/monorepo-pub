import { configs } from './eslint-configs.js';

describe('eslintConfigs', () => {
  it('should export configs object', () => {
    expect(configs).toBeDefined();
    expect(typeof configs.base).toBe('function');
  });
});
