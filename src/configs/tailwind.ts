// @ts-expect-error no typings
import eslingPluginTailwind from 'eslint-plugin-tailwindcss';
import {OFF} from '../constants';
import type {FlatConfigEntry} from '../types';

export interface TailwindEslintConfigOptions {
  files?: FlatConfigEntry['files'];
  overrides?: FlatConfigEntry['rules'];
}

export const tailwindEslintConfig = (
  options: TailwindEslintConfigOptions = {},
): FlatConfigEntry[] => {
  return [
    {
      ...(options.files && {files: options.files}),
      plugins: {
        tailwindcss: eslingPluginTailwind,
      },
      rules: {
        ...eslingPluginTailwind.configs.recommended.rules,

        // 'tailwindcss/classnames-order': WARN,
        // 'tailwindcss/enforces-negative-arbitrary-values': WARN,
        // 'tailwindcss/enforces-shorthand': WARN,
        // 'tailwindcss/migration-from-tailwind-2': WARN,
        // 'tailwindcss/no-arbitrary-value': OFF,
        'tailwindcss/no-custom-classname': OFF,
        // 'tailwindcss/no-contradicting-classname': ERROR,
        // 'tailwindcss/no-unnecessary-arbitrary-value': WARN,

        ...options.overrides,
      },
    },
  ];
};
