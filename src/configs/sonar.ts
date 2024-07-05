import eslingPluginSonar from 'eslint-plugin-sonarjs';
import {OFF} from '../constants';
import type {FlatConfigEntry} from '../types';

export interface SonarEslintConfigOptions {
  files?: FlatConfigEntry['files'];
  overrides?: FlatConfigEntry['rules'];
}

export const sonarEslintConfig = (options: SonarEslintConfigOptions = {}): FlatConfigEntry[] => {
  return [
    {
      ...(options.files && {files: options.files}),
      plugins: {
        sonarjs: eslingPluginSonar as never,
      },
      rules: {
        ...eslingPluginSonar.configs.recommended.rules,

        // TODO check all rules
        'sonarjs/cognitive-complexity': OFF,
        'sonarjs/no-duplicate-string': OFF,
        'sonarjs/no-nested-switch': OFF,
        'sonarjs/no-nested-template-literals': OFF,
        'sonarjs/prefer-immediate-return': OFF,

        ...options.overrides,
      },
    },
  ];
};
