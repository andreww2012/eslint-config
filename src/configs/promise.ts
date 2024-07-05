// @ts-expect-error no typings
import eslintPluginPromise from 'eslint-plugin-promise';
import {ERROR} from '../constants';
import type {FlatConfigEntry} from '../types';

export interface PromiseEslintConfigOptions {
  files?: FlatConfigEntry['files'];
  overrides?: FlatConfigEntry['rules'];
}

export const promiseEslintConfig = (
  options: PromiseEslintConfigOptions = {},
): FlatConfigEntry[] => {
  return [
    {
      ...(options.files && {files: options.files}),
      plugins: {
        promise: eslintPluginPromise,
      },
      rules: {
        ...eslintPluginPromise.configs.recommended.rules,

        // TODO check all rules
        'promise/always-return': [ERROR, {ignoreLastCallback: true}],
        'promise/catch-or-return': [
          ERROR,
          {
            allowThen: true,
            allowFinally: true,
          },
        ],

        ...options.overrides,
      },
    },
  ];
};
