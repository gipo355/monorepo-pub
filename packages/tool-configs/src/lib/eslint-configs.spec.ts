import { eslintConfigs } from './eslint-configs.js';

describe('eslintConfigs', () => {
  it('should work', () => {
    expect(eslintConfigs()).toEqual('eslint-configs');
  });
});
