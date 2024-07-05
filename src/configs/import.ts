import eslintPluginImportX from 'eslint-plugin-import-x';
import {ERROR, OFF} from '../constants';
import type {FlatConfigEntry} from '../types';
import {createPluginObjectRenamer} from '../utils';
import type {TsEslintConfigOptions} from './ts';

export interface ImportEslintConfigOptions extends Pick<TsEslintConfigOptions, 'tsconfigPath'> {
  overrides?: FlatConfigEntry['rules'];
}

const pluginRenamer = createPluginObjectRenamer('import-x', 'import');

export const importEslintConfig = (options: ImportEslintConfigOptions = {}): FlatConfigEntry[] => {
  const isTsEnabled = options.tsconfigPath != null;

  return [
    {
      plugins: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        import: eslintPluginImportX as any,
      },
      settings: {
        ...(isTsEnabled && eslintPluginImportX.configs.typescript.settings),
        'import-x/resolver': {
          ...(isTsEnabled && {
            typescript: {
              project: true,
              alwaysTryTypes: true,
            },
          }),
          node: true, // TODO
        },
        ...(isTsEnabled && {
          'import-x/parsers': {
            '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx'],
          },
        }),
      },
      rules: {
        ...pluginRenamer(eslintPluginImportX.configs.recommended.rules),

        // TODO

        'import/no-named-as-default-member': OFF,
        'import/no-extraneous-dependencies': [ERROR, {peerDependencies: false}],
        'import/no-default-export': ERROR,
        'import/prefer-default-export': OFF,
        'import/extensions': [
          ERROR,
          'ignorePackages',
          {
            // ⚠️ NOT `type: "module"`
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
            // ⚠️ `type: "module"`
            // js: 'always',
            // ts: 'never',
          },
        ],
        'import/no-unresolved': [
          ERROR,
          {
            // ⚠️ If `unplugin-icons` is used
            // ignore: ['^~icons/'],
          },
        ],
        'import/order': [
          ERROR,
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            alphabetize: {order: 'asc'},
          },
        ],
      },
    },
  ];
};
