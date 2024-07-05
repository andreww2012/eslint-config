import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-expect-error no typings
import pluginDisableAutofix from 'eslint-plugin-disable-autofix';
import globals from 'globals';
import {getPackageInfoSync, isPackageExists} from 'local-pkg';
import {type ImportEslintConfigOptions, importEslintConfig} from './configs/import';
import {type JsEslintConfigOptions, jsEslintConfig} from './configs/js';
import {type NodeEslintConfigOptions, nodeEslintConfig} from './configs/node';
import {type PromiseEslintConfigOptions, promiseEslintConfig} from './configs/promise';
import {sonarEslintConfig} from './configs/sonar';
import {type TailwindEslintConfigOptions, tailwindEslintConfig} from './configs/tailwind';
import {type TsEslintConfigOptions, tsEslintConfig} from './configs/ts';
import {type UnicornEslintConfigOptions, unicornEslintConfig} from './configs/unicorn';
import {type VueEslintConfigOptions, vueEslintConfig} from './configs/vue';
import {OFF} from './constants';
import {GLOB_CONFIG_FILES} from './globs';
import type {FlatConfigEntry} from './types';

// TODO option to turn warnings into errors
// TODO debug
interface EslintConfigOptions {
  js?: boolean | JsEslintConfigOptions;
  ts?: boolean | TsEslintConfigOptions;
  /**
   * @default true
   */
  unicorn?: boolean | UnicornEslintConfigOptions;
  /**
   * @default true
   */
  import?: boolean | ImportEslintConfigOptions;
  /**
   * @default true
   */
  node?: boolean | NodeEslintConfigOptions;
  /**
   * @default true
   */
  promise?: boolean | PromiseEslintConfigOptions;
  /**
   * @default true
   */
  sonar?: boolean | PromiseEslintConfigOptions;
  /**
   * `false` (do not enable Vue rules) <=> `vue` package is not installed (at any level) or `false` is explicitly passed
   */
  vue?: boolean | VueEslintConfigOptions;
  /**
   * `false` (do not enable Tailwind rules) <=> `tailwindcss` package is not installed (at any level) or `false` is explicitly passed
   */
  tailwind?: boolean | TailwindEslintConfigOptions;
  /**
   * Enables `eslint-config-prettier` at the end of the ruleset.
   * @see https://github.com/prettier/eslint-config-prettier
   * @default true
   */
  disablePrettierIncompatibleRules?: boolean;
}

export const eslintConfig = (options: EslintConfigOptions = {}): FlatConfigEntry[] => {
  const isVueEnabled = Boolean(options.vue) || isPackageExists('vue');
  const isTypescriptEnabled = Boolean(options.ts) || isPackageExists('typescript');

  /* 🔵 JAVASCRIPT */

  const jsOptions: TsEslintConfigOptions = {
    ...(typeof options.js === 'object' && options.js),
  };

  /* 🔵 TYPESCRIPT */

  const tsOptions: TsEslintConfigOptions = {
    extraFileExtensions: [isVueEnabled && 'vue'].filter((v) => v !== false),
    ...(typeof options.ts === 'object' && options.ts),
  };
  tsOptions.tsconfigPath ??= './**/tsconfig*.json';

  /* 🔵 VUE */

  // TODO async?
  const vueFullVersion = getPackageInfoSync('vue')?.version;
  const vueMajorVersionStr = vueFullVersion?.split('.')[0];
  const vueMajorVersion =
    vueMajorVersionStr === '2' ? 2 : vueMajorVersionStr === '3' ? 3 : undefined;

  // TODO async?
  const nuxtMajorVersionStr = getPackageInfoSync('nuxt')?.version?.split('.')[0];
  const nuxtMajorVersion = nuxtMajorVersionStr === '3' ? 3 : undefined;

  const vueOptions: VueEslintConfigOptions = {
    enableTs: isTypescriptEnabled,
    majorVersion: vueMajorVersion,
    nuxtMajorVersion,
    ...(typeof options.vue === 'object' && options.vue),
  };

  /* 🔵 UNICORN */

  const isUnicornEnabled = Boolean(options.unicorn ?? true);
  const unicornOptions: UnicornEslintConfigOptions = {
    ...(typeof options.unicorn === 'object' && options.unicorn),
  };

  /* 🔵 IMPORT */

  const isImportEnabled = Boolean(options.import ?? true);
  const importOptions: ImportEslintConfigOptions = {
    ...(isTypescriptEnabled && {tsconfigPath: tsOptions.tsconfigPath}),
    ...(typeof options.import === 'object' && options.import),
  };

  /* 🔵 NODE */

  const isNodeEnabled = Boolean(options.node ?? true);
  const nodeOptions: ImportEslintConfigOptions = {
    ...(typeof options.node === 'object' && options.node),
  };

  /* 🔵 PROMISE */

  const isPromiseEnabled = Boolean(options.promise ?? true);
  const promiseOptions: ImportEslintConfigOptions = {
    ...(typeof options.promise === 'object' && options.promise),
  };

  /* 🔵 SONARJS */

  const isSonarEnabled = Boolean(options.sonar ?? true);
  const sonarOptions: ImportEslintConfigOptions = {
    ...(typeof options.sonar === 'object' && options.sonar),
  };

  /* 🔵 TAILWIND */

  const isTailwindEnabled =
    options.tailwind === false ? false : options.tailwind ? true : isPackageExists('tailwindcss');
  const tailwindOptions: ImportEslintConfigOptions = {
    ...(typeof options.tailwind === 'object' && options.tailwind),
  };

  return (
    [
      {
        ignores: ['**/node_modules', '**/dist'],
      },
      {
        plugins: {
          'disable-autofix': pluginDisableAutofix,
        },
        languageOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          parserOptions: {
            ecmaVersion: 'latest',
            ecmaFeatures: {
              jsx: true,
            },
            sourceType: 'module',
          },
          globals: {
            ...(isNodeEnabled && globals.node),
          },
        } as const,
      },

      jsEslintConfig(jsOptions),
      isUnicornEnabled && unicornEslintConfig(unicornOptions),
      isImportEnabled && importEslintConfig(importOptions),
      isNodeEnabled && nodeEslintConfig(nodeOptions),
      isPromiseEnabled && promiseEslintConfig(promiseOptions),
      isSonarEnabled && sonarEslintConfig(sonarOptions),
      isTailwindEnabled && tailwindEslintConfig(tailwindOptions),
      // Must come after all rulesets for vanilla JS
      tsEslintConfig(tsOptions),
      vueEslintConfig(vueOptions),

      {
        files: GLOB_CONFIG_FILES,
        rules: {
          'import/no-default-export': OFF,
          'import/no-extraneous-dependencies': OFF,

          'n/no-unpublished-require': OFF,
        },
      },

      // MUST be last
      !options.disablePrettierIncompatibleRules && eslintConfigPrettier,
    ]
      // eslint-disable-next-line no-implicit-coercion
      .filter((v) => !!v)
      .flat()
  );
};
