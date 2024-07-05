import {toArray} from '@antfu/utils';
import type {ParserOptions} from '@typescript-eslint/parser';
import type Eslint from 'eslint';
import type {ESLintRules as BuiltinEslintRules} from 'eslint/rules';
import {parser as parserTs, plugin as pluginTs} from 'typescript-eslint';
import {ERROR, OFF, WARNING} from '../constants';
import {GLOB_TS, GLOB_TSX} from '../globs';
import type {FlatConfigEntry} from '../types';
import {disableAutofixForRule, genRuleOverrideFn} from '../utils';
import {
  RULE_NO_UNUSED_EXPRESSIONS_OPTIONS,
  RULE_NO_USE_BEFORE_DEFINE_OPTIONS,
  RULE_PREFER_DESTRUCTURING_OPTIONS,
} from './js';

export interface TsEslintConfigOptions {
  files?: FlatConfigEntry['files'];
  tsconfigPath?: string | string[];
  parserOptions?: Omit<ParserOptions, 'sourceType'> & {
    sourceType?: Eslint.Linter.ParserOptions['sourceType'];
  };
  /**
   * Do not put `.` (dot) before an extension
   * @example ['vue']
   */
  extraFileExtensions?: string[];
  /**
   * Pass `true` to enable type-aware checks for all `files`
   * @default false
   */
  filesTypeAware?: FlatConfigEntry['files'] | boolean;
  overrides?: FlatConfigEntry['rules'];
  overridesTypeAware?: FlatConfigEntry['rules'];
  // TODO no-type-assertion
}

const overrideBaseRule = genRuleOverrideFn('@typescript-eslint');

export const tsEslintConfig = (options: TsEslintConfigOptions = {}): FlatConfigEntry[] => {
  const tsFiles = options.files || [
    GLOB_TS,
    GLOB_TSX,
    ...(options.extraFileExtensions || []).map((ext) => `**/*.${ext}`),
  ];
  const tsFilesTypeAware =
    options.filesTypeAware === true
      ? [...tsFiles]
      : options.filesTypeAware === false
        ? []
        : options.filesTypeAware || [];
  const allTsFiles = [...tsFiles, ...tsFilesTypeAware];

  const generateBaseOptions = ({
    isTypeAware,
  }: {
    isTypeAware: boolean;
  } & Pick<FlatConfigEntry, 'files' | 'ignores'>): FlatConfigEntry => ({
    languageOptions: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parser: parserTs as any, // TODO
      ...(isTypeAware && {
        project: toArray(options.tsconfigPath),
        tsconfigRootDir: process.cwd(), // TODO
      }),
      parserOptions: {
        extraFileExtensions: options.extraFileExtensions?.map((ext) => `.${ext}`),
        sourceType: 'module',
        ...options.parserOptions,
      },
    },
  });

  const baseRegularRules = {
    ...pluginTs.configs?.strict?.rules,
    ...pluginTs.configs?.stylistic?.rules,
  };
  const baseTypeAwareRules = {
    ...pluginTs.configs?.strictTypeCheckedOnly?.rules,
    ...pluginTs.configs?.stylisticTypeCheckedOnly?.rules,
  };

  // LEGEND:
  // ❄️ = Feature-frozen in ts-eslint
  // 👍 = Auto-checked and there's barely any need to use this rule

  const typescriptConfigRegular: FlatConfigEntry<BuiltinEslintRules> = {
    files: tsFiles,
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(baseRegularRules as any),

      // 🔵 Strict - overrides

      // '@typescript-eslint/ban-ts-comment': ERROR,
      '@typescript-eslint/ban-types': [ERROR, {types: {object: false, '{}': false}}],
      ...overrideBaseRule('no-array-constructor', ERROR),
      // '@typescript-eslint/no-duplicate-enum-values': ERROR,
      '@typescript-eslint/no-dynamic-delete': WARNING,
      '@typescript-eslint/no-explicit-any': [WARNING, {ignoreRestArgs: true}],
      // '@typescript-eslint/no-extra-non-null-assertion': ERROR,
      // '@typescript-eslint/no-extraneous-class': ERROR,
      // '@typescript-eslint/no-invalid-void-type': ERROR,
      ...overrideBaseRule('no-loss-of-precision', ERROR),
      // '@typescript-eslint/no-misused-new': ERROR,
      // '@typescript-eslint/no-namespace': ERROR,
      // '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ERROR,
      // '@typescript-eslint/no-non-null-asserted-optional-chain': ERROR,
      '@typescript-eslint/no-non-null-assertion': WARNING,
      // '@typescript-eslint/no-this-alias': ERROR,
      // '@typescript-eslint/no-unnecessary-type-constraint': ERROR,
      // '@typescript-eslint/no-unsafe-declaration-merging': ERROR,
      ...overrideBaseRule('no-unused-vars', ERROR, {ignoreRestSiblings: true}),
      ...overrideBaseRule('no-useless-constructor', ERROR),
      // '@typescript-eslint/no-var-requires': ERROR,
      // '@typescript-eslint/prefer-as-const': ERROR,
      '@typescript-eslint/prefer-literal-enum-member': [ERROR, {allowBitwiseExpressions: true}],
      // '@typescript-eslint/triple-slash-reference': ERROR,
      // '@typescript-eslint/unified-signatures': ERROR,

      // 🔵 Stylistic - overrides

      // '@typescript-eslint/adjacent-overload-signatures': ERROR,
      // '@typescript-eslint/array-type': ERROR,
      // '@typescript-eslint/ban-tslint-comment': ERROR,
      // '@typescript-eslint/class-literal-property-style': ERROR,
      // '@typescript-eslint/consistent-generic-constructors': ERROR,
      // '@typescript-eslint/consistent-indexed-object-style': ERROR,
      // '@typescript-eslint/consistent-type-assertions': ERROR,
      // '@typescript-eslint/consistent-type-definitions': ERROR,
      // '@typescript-eslint/no-confusing-non-null-assertion': ERROR,
      ...overrideBaseRule('no-empty-function', ERROR),
      '@typescript-eslint/no-empty-interface': [ERROR, {allowSingleExtends: true}],
      // '@typescript-eslint/no-inferrable-types': ERROR,
      // '@typescript-eslint/prefer-for-of': ERROR,
      // '@typescript-eslint/prefer-function-type': ERROR,
      // '@typescript-eslint/prefer-namespace-keyword': ERROR,

      // 🔵 Additional rules

      ...overrideBaseRule('class-methods-use-this', ERROR, {
        ignoreOverrideMethods: true,
        ignoreClassesThatImplementAnInterface: true,
      }),
      '@typescript-eslint/consistent-type-imports': [
        ERROR,
        {
          fixStyle: 'inline-type-imports', // TODO only available in TypeScript 4.5
          disallowTypeAnnotations: false,
        },
      ],
      ...overrideBaseRule('default-param-last', ERROR),
      // '@typescript-eslint/explicit-function-return-type': OFF,
      '@typescript-eslint/explicit-member-accessibility': [
        ERROR,
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
            properties: 'off',
          },
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': OFF,
      // ...overrideBaseRule('init-declarations', OFF),
      // ...overrideBaseRule('max-params', OFF),
      // '@typescript-eslint/member-ordering': OFF, // ❄️
      '@typescript-eslint/method-signature-style': ERROR,
      // ...overrideBaseRule('no-dupe-class-members', OFF), // 👍
      '@typescript-eslint/no-empty-object-type': [
        ERROR,
        {
          allowInterfaces: 'with-single-extends',
          allowObjectTypes: 'always',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': ERROR,
      // ...overrideBaseRule('no-invalid-this', OFF), // 👍
      ...overrideBaseRule('no-loop-func', ERROR),
      // ...overrideBaseRule('no-magic-numbers', OFF),
      'no-redeclare': OFF,
      // '@typescript-eslint/no-redeclare': OFF, // 👍
      // '@typescript-eslint/no-require-imports': OFF,
      // ...overrideBaseRule('no-restricted-imports', OFF),
      ...overrideBaseRule('no-shadow', ERROR),
      ...overrideBaseRule('no-unused-expressions', ERROR, RULE_NO_UNUSED_EXPRESSIONS_OPTIONS),
      ...overrideBaseRule('no-use-before-define', ERROR, RULE_NO_USE_BEFORE_DEFINE_OPTIONS),
      '@typescript-eslint/no-useless-empty-export': ERROR,
      // '@typescript-eslint/parameter-properties': OFF,
      // '@typescript-eslint/prefer-enum-initializers': OFF,
      // '@typescript-eslint/typedef': OFF,

      // 🔵 Disable conflicting rules

      'no-useless-constructor': OFF,
      'dot-notation': OFF,

      ...options.overrides,
    },
  };

  const typescriptConfigTypeAware: FlatConfigEntry<BuiltinEslintRules> = {
    files: tsFilesTypeAware,
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(baseTypeAwareRules as any),

      // 🔵 Strict - overrides

      // '@typescript-eslint/await-thenable': ERROR,
      // '@typescript-eslint/no-array-delete': ERROR,
      // '@typescript-eslint/no-base-to-string': ERROR,
      '@typescript-eslint/no-confusing-void-expression': [
        ERROR,
        {
          ignoreArrowShorthand: true,
        },
      ],
      // '@typescript-eslint/no-duplicate-type-constituents': ERROR,
      // '@typescript-eslint/no-floating-promises': ERROR,
      // '@typescript-eslint/no-for-in-array': ERROR,
      ...overrideBaseRule('no-implied-eval', ERROR),
      // '@typescript-eslint/no-meaningless-void-operator': ERROR,
      // '@typescript-eslint/no-misused-promises': ERROR,
      // '@typescript-eslint/no-mixed-enums': ERROR,
      // '@typescript-eslint/no-redundant-type-constituents': ERROR,
      // '@typescript-eslint/no-unnecessary-boolean-literal-compare': ERROR,
      ...disableAutofixForRule('@typescript-eslint/no-unnecessary-condition', ERROR, {
        allowConstantLoopConditions: true,
      }),
      // '@typescript-eslint/no-unnecessary-template-expression': ERROR,
      // Reason for disabling autofix: could remove type aliases
      ...disableAutofixForRule('@typescript-eslint/no-unnecessary-type-arguments', ERROR),
      // '@typescript-eslint/no-unnecessary-type-assertion': ERROR,
      '@typescript-eslint/no-unsafe-argument': WARNING,
      '@typescript-eslint/no-unsafe-assignment': WARNING,
      '@typescript-eslint/no-unsafe-call': WARNING,
      '@typescript-eslint/no-unsafe-enum-comparison': WARNING,
      '@typescript-eslint/no-unsafe-member-access': WARNING,
      '@typescript-eslint/no-unsafe-return': WARNING,
      'no-throw-literal': OFF, // Note: has different name
      '@typescript-eslint/only-throw-error': [
        ERROR,
        {
          allowThrowingUnknown: true,
        },
      ],
      'unicorn/prefer-includes': OFF, // Note: in Unicorn
      '@typescript-eslint/prefer-includes': ERROR,
      ...overrideBaseRule('prefer-promise-reject-errors', ERROR),
      // '@typescript-eslint/prefer-reduce-type-parameter': ERROR,
      // '@typescript-eslint/prefer-return-this-type': ERROR,
      ...overrideBaseRule('require-await', ERROR),
      // '@typescript-eslint/restrict-plus-operands': ERROR,
      '@typescript-eslint/restrict-template-expressions': [
        ERROR,
        {allowAny: false, allowRegExp: false},
      ],
      // '@typescript-eslint/unbound-method': ERROR,
      // '@typescript-eslint/use-unknown-in-catch-callback-variable': ERROR,

      // 🔵 Stylistic - overrides

      ...overrideBaseRule('dot-notation', ERROR, {
        allowIndexSignaturePropertyAccess: true,
      }),
      // '@typescript-eslint/non-nullable-type-assertion-style': ERROR,
      '@typescript-eslint/prefer-nullish-coalescing': OFF,
      // '@typescript-eslint/prefer-optional-chain': ERROR,
      '@typescript-eslint/prefer-string-starts-ends-with': [
        ERROR,
        {
          allowSingleElementEquality: true,
        },
      ],

      // 🔵 Additional rules

      // ...overrideBaseRule('consistent-return', OFF),
      '@typescript-eslint/consistent-type-exports': [
        ERROR,
        {fixMixedExportsWithInlineTypeSpecifier: true},
      ],
      // '@typescript-eslint/naming-convention': OFF, // ❄️
      // '@typescript-eslint/no-unnecessary-qualifier': OFF,
      '@typescript-eslint/no-unsafe-unary-minus': ERROR,
      ...overrideBaseRule('prefer-destructuring', ERROR, RULE_PREFER_DESTRUCTURING_OPTIONS),
      'unicorn/prefer-array-find': OFF, // Note: in Unicorn
      '@typescript-eslint/prefer-find': ERROR,
      '@typescript-eslint/prefer-readonly': ERROR,
      // '@typescript-eslint/prefer-readonly-parameter-types': OFF,
      // '@typescript-eslint/prefer-regexp-exec': OFF,
      '@typescript-eslint/promise-function-async': ERROR,
      // '@typescript-eslint/require-array-sort-compare': OFF,
      // Note: has different name. Also note that the original rule is deprecated and not included in this config, but we disable it anyway just for safety
      'no-return-await': OFF,
      '@typescript-eslint/return-await': [ERROR, 'always'],
      // '@typescript-eslint/strict-boolean-expressions': OFF,
      '@typescript-eslint/switch-exhaustiveness-check': ERROR,

      ...options.overridesTypeAware,
    },
  };

  return (
    [
      {
        plugins: {
          '@typescript-eslint': pluginTs as never,
        },
      },

      generateBaseOptions({
        isTypeAware: false,
        files: tsFiles,
      }),
      typescriptConfigRegular,

      options.filesTypeAware && [
        generateBaseOptions({
          isTypeAware: true,
          files: tsFilesTypeAware,
        }),
        typescriptConfigTypeAware,
      ],

      // Handled by TS compiler
      {
        files: allTsFiles,
        rules: {
          'constructor-super': OFF,
          'getter-return': OFF,
          'no-const-assign': OFF,
          'no-dupe-args': OFF,
          'no-dupe-class-members': OFF,
          'no-dupe-keys': OFF,
          'no-func-assign': OFF,
          // "Note that the compiler will not catch the Object.assign() case. Thus, if you use Object.assign() in your codebase, this rule will still provide some value." - https://eslint.org/docs/latest/rules/no-import-assign#handled_by_typescript
          // 'no-import-assign': OFF,
          // "Note that, technically, TypeScript will only catch this if you have the strict or noImplicitThis flags enabled. These are enabled in most TypeScript projects, since they are considered to be best practice." - https://eslint.org/docs/latest/rules/no-invalid-this#rule-details
          // 'no-invalid-this': OFF,
          'no-new-native-nonconstructor': OFF, // successor of no-new-symbol
          'no-obj-calls': OFF,
          // "Note that while TypeScript will catch let redeclares and const redeclares, it will not catch var redeclares. Thus, if you use the legacy var keyword in your TypeScript codebase, this rule will still provide some value." - https://eslint.org/docs/latest/rules/no-redeclare#handled_by_typescript
          // 'no-redeclare': OFF,
          'no-setter-return': OFF,
          'no-this-before-super': OFF,
          'no-undef': OFF,
          // "TypeScript must be configured with allowUnreachableCode: false for it to consider unreachable code an error." - https://eslint.org/docs/latest/rules/no-unreachable#handled_by_typescript
          // 'no-unreachable': OFF,
          'no-unsafe-negation': OFF,
        },
      },

      {
        files: ['**/*.d.?([cm])ts'],
        rules: {
          '@typescript-eslint/consistent-indexed-object-style': OFF,
          '@typescript-eslint/no-explicit-any': OFF,
          '@typescript-eslint/no-use-before-define': OFF,
          '@typescript-eslint/no-unused-vars': OFF,
          '@typescript-eslint/no-shadow': OFF,
          '@typescript-eslint/method-signature-style': OFF,

          'import/no-default-export': OFF,
          'import/newline-after-import': OFF,
        },
      },
    ]
      .flat()
      // eslint-disable-next-line no-implicit-coercion
      .filter((v) => !!v)
  );
};
