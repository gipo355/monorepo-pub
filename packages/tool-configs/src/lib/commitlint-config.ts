import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import type { UserConfig } from 'cz-git';

type CommitLintProps = {
  scopes?: string[];
  /**
   * Root directory of the project. Defaults to process.cwd()
   * This is used to discover apps, libs, and packages directories for scope generation.
   */
  projectRoot?: string;
};

/**
 * Generate dynamic scopes from project structure
 * @param projectRoot - Root directory of the project
 * @returns Array of scope strings
 */
const generateScopes = (projectRoot: string): string[] => {
  const readDirSafe = (dir: string): string[] => {
    try {
      return fs.readdirSync(path.resolve(projectRoot, dir));
    } catch {
      return [];
    }
  };

  const apps = readDirSafe('apps');
  const libs = readDirSafe('libs');
  const pkgs = readDirSafe('packages');

  return [
    // used to denote global changes
    'global',
    // spread result of folder names found
    ...apps.map((app) => `app-${app}`),
    ...libs.map((lib) => `lib-${lib}`),
    ...pkgs.map((pkg) => `pkg-${pkg}`),
    // "app",
    'npm',
    'tools',
    'git-hooks',
    'actions',
    'github',
    'docs',
  ];
};

export default ({
  scopes,
  projectRoot = process.cwd(),
}: CommitLintProps = {}): UserConfig => {
  // can find issues from branch name if standardized
  // @tip: git branch name = feature/33-issuename   =>    auto get defaultIssues = #33
  // find the number in the string
  const issue = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim()
    .match(/\d+/)?.[0];

  const definedScopes = scopes ?? generateScopes(projectRoot);

  return {
    rules: {
      // @see: https://commitlint.js.org/#/reference-rules
      'scope-enum': [2, 'always', [...definedScopes]],
    },
    prompt: {
      useEmoji: true,
      customIssuePrefixAlign: !issue ? 'top' : 'bottom',
      defaultIssues: !issue ? '' : `#${issue}`,
      issuePrefixes: [
        {
          name: 'Close issue',
          value: 'closes',
        },
        {
          name: 'Fix issue',
          value: 'fixes',
        },
        {
          name: 'Link issue',
          value: 'links',
        },
        {
          name: 'Reference issue',
          value: 'refs',
        },
      ],

      // allow defining multiple scopes with checklist
      enableMultipleScopes: true,
      scopeEnumSeparator: '/',
    },
  };
};
