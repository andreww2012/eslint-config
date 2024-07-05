import eslintPluginNode from 'eslint-plugin-n';
import {OFF} from '../constants';
import type {FlatConfigEntry} from '../types';

export interface NodeEslintConfigOptions {
  files?: FlatConfigEntry['files'];
  overrides?: FlatConfigEntry['rules'];
}

export const nodeEslintConfig = (options: NodeEslintConfigOptions = {}): FlatConfigEntry[] => {
  if (options.files == null) {
    return [];
  }

  return [
    eslintPluginNode.configs['flat/recommended'],
    {
      rules: {
        // TODO only disable when import plugin is enabled?
        'n/no-extraneous-import': OFF,
        'n/no-missing-import': OFF,
        'n/no-unpublished-import': OFF,
      },
    },
  ];
};
