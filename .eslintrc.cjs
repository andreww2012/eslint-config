/* eslint-disable unicorn/no-useless-spread, no-unused-vars, @typescript-eslint/no-unused-vars, import/no-unresolved, no-dupe-keys */

/** ********
 * AUXILIARY
 *********** */

let typeCheckedRulesArray = [];
try {
  typeCheckedRulesArray = Object.keys(
    require('@typescript-eslint/eslint-plugin').configs['disable-type-checked'].rules,
  );
} catch {}

const __FALSE__ = false;
const POSSIBLE_JS_TS_EXTENSIONS = ['js', 'cjs', 'mjs', 'ts', 'cts', 'mts'];

const arrayFlattenAndFilterOutFalsyValues = (arr) => arr.flat().filter(Boolean);

/** ******
 * OPTIONS
 ********* */

// ⚠️ Define environment: https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
const ESLINT_ENV = {
  es6: true,
  commonjs: true,
  browser: true,
  node: true,
  // webextensions: true,
  // jest: true,
  // worker: true,
};

const ENV = {
  typescript: true,
  vue: __FALSE__,
  nuxt3: __FALSE__,
  import: true,
  node: Boolean(ESLINT_ENV.node),
};
ENV.nuxt3 = ENV.nuxt3 && ENV.vue;

const OPTIONS = {
  errorsInsteadOfWarnings: __FALSE__,
  realProblemsOnly: true,
  nuxtOrVueProjectDir: '',
};

const NODE = {
  pathsToCheck: [],
};

const TYPESCRIPT = {
  typeCheckedRules: true,
  disallowTypeAssertions: __FALSE__,
  project: arrayFlattenAndFilterOutFalsyValues(['./**/tsconfig*.json']),
};

const VUE = {
  vue2: __FALSE__,
  // ⚠️ If say you use Vue 3.4, then you must also enable earlier 3.x versions of Vue (3.3)
  '>=vue3.3': true,
  '>=vue3.4': true,
  a11y: true,
  extensionRules: true,
  // ⚠️ May come in handy when auto-imports are not disabled OR they are,
  // but imports of user-defined identifiers are not from `#imports` and `#components`
  nuxtDisableImportNoCycleRule: __FALSE__,
  enforceTypescriptInScript: ENV.typescript,
  noUndefComponentsIgnorePatterns: arrayFlattenAndFilterOutFalsyValues([
    ENV.nuxt3 && [/^(lazy-)?nuxt-/, /^(lazy-)?client-only$/],
  ]),
  noPropertyAccessFromIndexSignatureSetInTsconfigForVueFiles: __FALSE__,
};

const MISC = {
  configFiles: arrayFlattenAndFilterOutFalsyValues([
    ...POSSIBLE_JS_TS_EXTENSIONS.map((ext) => [`*.config.${ext}`, `.*rc.${ext}`]),
  ]),
};

const OFF = 0;
const WARNING = OPTIONS.errorsInsteadOfWarnings ? 2 : 1;
const ERROR = 2;

// This will be put at the end of the `rules` object
const GLOBAL_RULE_OVERRIDES = {
  // ...
};

// Additional entries to eslint's "overrides" section
const OVERRIDES = [
  // ...
];

/** ****
 * RULES
 ******* */

const TS_ESLINT_RULES_NOT_TYPE_CHECKED = {
  '@typescript-eslint/ban-types': [ERROR, {types: {object: false, '{}': false}}],
  '@typescript-eslint/consistent-type-imports': [ERROR, {fixStyle: 'inline-type-imports'}],
  '@typescript-eslint/method-signature-style': ERROR,
  '@typescript-eslint/no-import-type-side-effects': ERROR,
  '@typescript-eslint/no-dynamic-delete': WARNING,
  '@typescript-eslint/no-empty-interface': [ERROR, {allowSingleExtends: true}],
  '@typescript-eslint/no-explicit-any': [WARNING, {ignoreRestArgs: true}],
  '@typescript-eslint/prefer-literal-enum-member': [ERROR, {allowBitwiseExpressions: true}],

  // Conflicting with corresponding base rules
  'no-useless-constructor': OFF,

  // Extension Rules
  'default-param-last': OFF,
  '@typescript-eslint/default-param-last': ERROR,
  'no-dupe-class-members': OFF,
  '@typescript-eslint/no-dupe-class-members': ERROR,
  'no-loop-func': OFF,
  '@typescript-eslint/no-loop-func': ERROR,
  'no-redeclare': OFF,
  '@typescript-eslint/no-redeclare': ERROR,
  'no-shadow': OFF,
  '@typescript-eslint/no-shadow': ERROR,
  'no-unused-expressions': OFF,
  '@typescript-eslint/no-unused-expressions': [
    ERROR,
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    },
  ],
  'no-use-before-define': OFF,
  '@typescript-eslint/no-use-before-define': [ERROR, {ignoreTypeReferences: false}],

  ...(OPTIONS.realProblemsOnly && {
    '@typescript-eslint/no-non-null-assertion': OFF,
    '@typescript-eslint/no-shadow': OFF,
    '@typescript-eslint/consistent-type-definitions': OFF,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-import-type-side-effects': OFF,
    '@typescript-eslint/no-use-before-define': WARNING,
    '@typescript-eslint/array-type': OFF,
    '@typescript-eslint/default-param-last': OFF,
    '@typescript-eslint/consistent-type-imports': OFF,
    '@typescript-eslint/consistent-generic-constructors': OFF,
    '@typescript-eslint/unbound-method': WARNING,
    '@typescript-eslint/method-signature-style': WARNING,
    '@typescript-eslint/no-namespace': OFF,
    '@typescript-eslint/dot-notation': WARNING,
    '@typescript-eslint/no-throw-literal': OFF,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/prefer-function-type': OFF,
    '@typescript-eslint/ban-ts-comment': WARNING,
    '@typescript-eslint/no-unsafe-enum-comparison': WARNING,
    '@typescript-eslint/prefer-ts-expect-error': WARNING,
    '@typescript-eslint/no-loop-func': WARNING,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
  }),
};

const TS_ESLINT_RULES_TYPE_CHECKED = {
  '@typescript-eslint/no-floating-promises': WARNING,
  '@typescript-eslint/no-unnecessary-type-assertion': OFF,
  '@typescript-eslint/no-unsafe-argument': WARNING,
  '@typescript-eslint/no-unsafe-assignment': WARNING,
  '@typescript-eslint/no-unsafe-call': WARNING,
  '@typescript-eslint/no-unsafe-member-access': WARNING,
  '@typescript-eslint/no-unsafe-return': WARNING,
  '@typescript-eslint/prefer-nullish-coalescing': OFF,
  '@typescript-eslint/restrict-template-expressions': [
    ERROR,
    {allowAny: false, allowRegExp: false},
  ],
  '@typescript-eslint/switch-exhaustiveness-check': ERROR,

  // Disable auto-fix

  '@typescript-eslint/no-unnecessary-condition': OFF,
  'disable-autofix/@typescript-eslint/no-unnecessary-condition': ERROR,
  // Could remove type aliases
  '@typescript-eslint/no-unnecessary-type-arguments': OFF,
  'disable-autofix/@typescript-eslint/no-unnecessary-type-arguments': ERROR,

  // Extension Rules

  'no-return-await': OFF,
  '@typescript-eslint/return-await': [ERROR, 'always'],

  ...(OPTIONS.realProblemsOnly && {
    '@typescript-eslint/no-floating-promises': OFF,
    '@typescript-eslint/no-unnecessary-condition': OFF,
    'disable-autofix/@typescript-eslint/no-unnecessary-condition': OFF,
    '@typescript-eslint/no-unsafe-argument': OFF,
    '@typescript-eslint/no-unsafe-assignment': OFF,
    '@typescript-eslint/no-unsafe-call': OFF,
    '@typescript-eslint/no-unsafe-member-access': OFF,
    '@typescript-eslint/no-unsafe-return': OFF,
    '@typescript-eslint/restrict-template-expressions': WARNING,
    '@typescript-eslint/no-misused-promises': WARNING,
    '@typescript-eslint/return-await': OFF,
    '@typescript-eslint/no-confusing-void-expression': WARNING,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
  }),
};

const IMPORT_RULES = {
  ...(ENV.nuxt3 &&
    VUE.nuxtDisableImportNoCycleRule && {
      'import/no-cycle': OFF,
    }),
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

  ...(OPTIONS.realProblemsOnly && {
    'import/order': OFF,
    'import/extensions': OFF,
    'import/no-unresolved': OFF,
    'import/no-useless-path-segments': OFF,
    'import/no-relative-packages': OFF,
    'import/no-default-export': OFF,
    'import/no-cycle': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/newline-after-import': WARNING,
    'import/no-dynamic-require': WARNING,
    'import/first': WARNING,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
  }),
};

// TODO check more "Uncategorized" rules
const VUE_RULES = {
  ...(VUE.enforceTypescriptInScript && {
    'vue/block-lang': [ERROR, {script: {lang: 'ts'}}],
  }),
  'vue/component-tags-order': OFF, // Deprecated - but still included in the recommended
  'vue/block-order': [
    ERROR,
    {order: ['template', 'script:not([setup])', 'script[setup]', 'style']},
  ],
  'vue/component-name-in-template-casing': [
    ERROR,
    'kebab-case',
    {
      registeredComponentsOnly: false,
      ignores: arrayFlattenAndFilterOutFalsyValues(['/^[A-Z][a-z]+$/']),
    },
  ],
  'vue/define-emits-declaration': ERROR,
  'vue/define-props-declaration': [ERROR, 'runtime'],
  'vue/define-macros-order': [
    ERROR,
    {
      order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
      ...(VUE['>=vue3.4'] && {defineExposeLast: true}),
    },
  ],
  'vue/html-button-has-type': ERROR,
  'vue/html-self-closing': [
    ERROR,
    {
      html: {
        void: 'any', // Setting other value here for `void` would conflict with Prettier
        normal: 'never',
        component: 'never',
      },
    },
  ],
  'vue/no-deprecated-model-definition': ERROR,
  'vue/no-empty-component-block': ERROR,
  'vue/no-ref-object-reactivity-loss': ERROR,
  'vue/no-required-prop-with-default': ERROR,
  'vue/no-this-in-before-route-enter': ERROR,
  'vue/no-undef-components': [
    ERROR,
    {
      ignorePatterns: [...VUE.noUndefComponentsIgnorePatterns],
    },
  ],
  'vue/no-unused-refs': ERROR,
  'vue/no-use-v-else-with-v-for': ERROR,
  'vue/no-useless-mustaches': ERROR,
  'vue/no-useless-v-bind': ERROR,
  'vue/no-v-html': ERROR,
  'vue/padding-line-between-blocks': ERROR,
  'vue/prefer-separate-static-class': ERROR,
  'vue/prefer-true-attribute-shorthand': ERROR,
  'vue/require-default-prop': OFF,
  'vue/require-explicit-emits': OFF,
  'vue/require-explicit-slots': ERROR,
  'vue/require-typed-object-prop': ERROR,
  'vue/require-typed-ref': ERROR,
  'vue/v-for-delimiter-style': ERROR,
  'vue/v-on-handler-style': [ERROR, 'inline'],

  ...(OPTIONS.realProblemsOnly && {
    'vue/require-explicit-slots': OFF,
    'vue/define-props-declaration': OFF,
    'vue/block-order': OFF,
    'vue/component-name-in-template-casing': OFF,
    'vue/html-self-closing': OFF,
    'vue/define-macros-order': OFF,
    'vue/v-on-handler-style': OFF,
    'vue/no-undef-components': OFF, // TODO WARNING
    'vue/html-button-has-type': WARNING, // TODO do not disable?
    'vue/require-typed-ref': WARNING, // TODO OFF ?
    'vue/prefer-true-attribute-shorthand': OFF,
    'vue/multi-word-component-names': OFF,
    'vue/no-dupe-keys': WARNING,
    'vue/v-on-event-hyphenation': OFF,
    'vue/define-emits-declaration': OFF,
    '': OFF,
  }),
};

const VUE_3_3_RULES = {
  'vue/prefer-define-options': ERROR,
  'vue/valid-define-options': ERROR,
};

const VUE_A11Y_RULES = {
  'vuejs-accessibility/label-has-for': OFF,
  'vuejs-accessibility/form-control-has-label': OFF,
  'vuejs-accessibility/anchor-has-content': OFF,
  // ⚠️ If your project has too much a11y issues, set these or other rules to report warnings instead of errors:
  /*
  'vuejs-accessibility/click-events-have-key-events': WARNING,
  'vuejs-accessibility/no-static-element-interactions': WARNING,
  'vuejs-accessibility/mouse-events-have-key-events': WARNING,
  */
};

const VUE_EXTENSION_RULES = {
  'vue/camelcase': [ERROR, {properties: 'never'}],
  ...(!VUE.noPropertyAccessFromIndexSignatureSetInTsconfigForVueFiles && {
    'vue/dot-notation': ERROR,
  }),
  'vue/eqeqeq': [ERROR, 'always', {null: 'ignore'}],
  'vue/no-console': ERROR,
  'vue/no-constant-condition': WARNING,
  'vue/no-empty-pattern': ERROR,
  'vue/no-irregular-whitespace': ERROR,
  'vue/no-loss-of-precision': ERROR,
  'vue/no-restricted-syntax': ERROR,
  'vue/no-sparse-arrays': ERROR,
  'vue/no-useless-concat': ERROR,
  'vue/object-shorthand': ERROR,
  'vue/prefer-template': ERROR,
};

const NODE_RULES = {
  ...(ENV.import && {
    'n/no-extraneous-import': OFF,
    'n/no-missing-import': OFF,
    'n/no-unpublished-import': OFF,
  }),
};

const SECURITY_RULES = {
  'security/detect-object-injection': OFF,
};

const SONARJS_RULES = {
  'sonarjs/cognitive-complexity': OFF,
  'sonarjs/no-duplicate-string': OFF,
  'sonarjs/no-nested-switch': OFF,
  'sonarjs/no-nested-template-literals': OFF,
  'sonarjs/prefer-immediate-return': OFF,

  ...(OPTIONS.realProblemsOnly && {
    'sonarjs/no-identical-functions': WARNING,
    'sonarjs/no-collapsible-if': WARNING,
    'sonarjs/no-small-switch': WARNING,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
  }),
};

const UNICORN_RULES = {
  'unicorn/catch-error-name': OFF,
  'unicorn/consistent-destructuring': OFF,
  'unicorn/filename-case': OFF,
  'unicorn/no-array-callback-reference': OFF,
  'unicorn/no-array-for-each': OFF,
  'unicorn/no-array-reduce': OFF,
  'unicorn/no-await-expression-member': OFF,
  'unicorn/no-for-loop': OFF,
  'unicorn/no-nested-ternary': OFF,
  'unicorn/no-null': OFF,
  'unicorn/no-unreadable-array-destructuring': OFF,
  'unicorn/numeric-separators-style': [ERROR, {onlyIfContainsSeparator: true}],
  'unicorn/prefer-dom-node-text-content': OFF,
  // ⚠️ Do NOT DISABLE for Angular projects: https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1853
  'unicorn/prefer-event-target': OFF,
  'unicorn/prefer-export-from': [ERROR, {ignoreUsedVariables: true}],
  'unicorn/prefer-module': OFF,
  'unicorn/prefer-regexp-test': OFF,
  'unicorn/prefer-switch': [ERROR, {minimumCases: 4, emptyDefaultCase: 'do-nothing-comment'}],
  'unicorn/prefer-query-selector': OFF,
  'unicorn/prevent-abbreviations': OFF,
  'unicorn/relative-url-style': [ERROR, 'always'],

  // With disable autofixes
  'unicorn/explicit-length-check': OFF,
  'disable-autofix/unicorn/explicit-length-check': ERROR,
  'unicorn/prefer-spread': OFF,
  'disable-autofix/unicorn/prefer-spread': ERROR,
  // ⚠️ May conflict with `array-callback-return` if `allowImplicit` option is NOT set to `true`
  'unicorn/no-useless-undefined': OFF,
  'disable-autofix/unicorn/no-useless-undefined': [ERROR, {checkArguments: false}],

  ...(OPTIONS.realProblemsOnly && {
    'unicorn/prefer-spread': OFF,
    'disable-autofix/unicorn/prefer-spread': OFF,
    'unicorn/prefer-ternary': OFF,
    'unicorn/text-encoding-identifier-case': OFF,
    'unicorn/prefer-string-slice': OFF,
    'unicorn/no-negated-condition': OFF,
    'unicorn/prefer-add-event-listener': OFF,
    'unicorn/explicit-length-check': OFF,
    'disable-autofix/unicorn/explicit-length-check': OFF,
    'unicorn/no-useless-undefined': OFF,
    'disable-autofix/unicorn/no-useless-undefined': OFF,
    'unicorn/prefer-string-replace-all': OFF,
    'unicorn/prefer-switch': OFF,
    'unicorn/switch-case-braces': OFF,
    'unicorn/prefer-keyboard-event-key': OFF,
    'unicorn/no-object-as-default-parameter': OFF,
    'unicorn/prefer-array-flat-map': WARNING,
    'unicorn/prefer-node-protocol': WARNING,
    'unicorn/consistent-function-scoping': WARNING,
    'unicorn/no-lonely-if': WARNING,
    'unicorn/prefer-at': OFF,
    'unicorn/prefer-code-point': OFF,
    'unicorn/no-zero-fractions': OFF,
    'unicorn/prefer-top-level-await': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
  }),
};

const PROMISE_RULES = {
  'promise/always-return': [ERROR, {ignoreLastCallback: true}],
  'promise/catch-or-return': [
    OPTIONS.realProblemsOnly ? WARNING : ERROR,
    {
      allowThen: true,
      allowFinally: true,
    },
  ],

  ...(OPTIONS.realProblemsOnly && {
    '': OFF,
  }),
};

const VANILLA_ESLINT_RULES = {
  camelcase: ERROR,
  'class-methods-use-this': OFF,
  'func-names': OFF,
  'lines-between-class-members': OFF,
  'max-classes-per-file': OFF,
  'no-alert': ERROR,
  'no-await-in-loop': WARNING,
  'no-bitwise': OFF,
  'no-continue': OFF,
  'no-empty': [ERROR, {allowEmptyCatch: true}],
  'no-implicit-coercion': [ERROR, {boolean: true}],
  'no-nested-ternary': OFF,
  'no-new': WARNING,
  'no-param-reassign': [ERROR, {props: false}],
  'no-plusplus': OFF,
  // ⚠️ If semicolons DISABLED:
  // 'no-plusplus': [ERROR, {allowForLoopAfterthoughts: true}],
  'no-restricted-syntax': [
    OPTIONS.realProblemsOnly ? WARNING : ERROR,
    'ForInStatement',
    'LabeledStatement',
    'WithStatement',
  ],
  'no-return-await': OFF,
  'no-underscore-dangle': OFF,
  ...(!ENV.typescript && {
    'no-unused-expressions': [
      ERROR,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
  }),
  'no-useless-constructor': ERROR,
  'no-void': [OPTIONS.realProblemsOnly ? WARNING : ERROR, {allowAsStatement: true}],
  'prefer-const': [ERROR, {destructuring: 'all'}],
  'prefer-destructuring': [
    ERROR,
    {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,
        object: false,
      },
    },
  ],
  'prefer-rest-params': OFF,
  'sort-imports': [ERROR, {ignoreDeclarationSort: true}],

  // Deprecated:
  'global-require': OFF,

  // TODO `quotes`

  ...(OPTIONS.realProblemsOnly && {
    'no-inner-declarations': OFF,
    'no-shadow': OFF,
    'no-empty-function': OFF,
    'no-return-assign': OFF,
    'no-else-return': WARNING,
    'consistent-return': WARNING,
    'no-constructor-return': OFF,
    'no-use-before-define': WARNING,
    'prefer-destructuring': OFF,
    'no-implicit-coercion': OFF,
    'no-param-reassign': OFF,
    'symbol-description': OFF,
    'default-param-last': OFF,
    'no-promise-executor-return': OFF,
    'sort-imports': OFF,
    'guard-for-in': WARNING,
    camelcase: OFF,
    'prefer-template': WARNING,
    'no-lonely-if': WARNING,
    'object-shorthand': WARNING,
    'array-callback-return': [WARNING, {allowImplicit: true}],
    'no-loop-func': WARNING,
    strict: OFF,
    'prefer-object-spread': WARNING,
    'one-var': OFF,
    'no-cond-assign': WARNING,
    'no-multi-assign': WARNING,
    'default-case': WARNING,
    'object-shorthand': OFF,
    'no-constant-condition': OFF,
    'no-cond-assign': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
    '': OFF,
  }),
};

const parser = ENV.typescript ? '@typescript-eslint/parser' : '@babel/eslint-parser';

/** *************************
 * START OF THE ESLINT CONFIG
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 **************************** */

module.exports = {
  root: true,

  env: ESLINT_ENV,

  ...(ENV.vue || (ENV.typescript && TYPESCRIPT.typeCheckedRules)
    ? {
        parserOptions: {
          parser,
          project: ENV.typescript && TYPESCRIPT.typeCheckedRules && TYPESCRIPT.project,
          ecmaVersion: 'latest',
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: arrayFlattenAndFilterOutFalsyValues([ENV.vue && '.vue']),
        },
      }
    : {parser}),

  plugins: arrayFlattenAndFilterOutFalsyValues([
    // 🌐 https://github.com/chiefmikey/eslint-plugin-disable-autofix
    'disable-autofix',

    // 🌐 https://github.com/typescript-eslint/typescript-eslint
    ENV.typescript && '@typescript-eslint',
    ENV.typescript && TYPESCRIPT.disallowTypeAssertions && 'no-type-assertion',

    // 🌐 https://github.com/BrainMaestro/eslint-plugin-optimize-regex
    'optimize-regex',
    // 🌐 https://github.com/SonarSource/eslint-plugin-sonarjs
    'sonarjs',
    // 🌐 https://github.com/sindresorhus/eslint-plugin-unicorn
    'unicorn',
  ]),

  extends: arrayFlattenAndFilterOutFalsyValues([
    // 🌐 https://www.npmjs.com/package/eslint-plugin-sonarjs
    'plugin:sonarjs/recommended',
    // 🌐 https://www.npmjs.com/package/eslint-plugin-unicorn
    'plugin:unicorn/recommended',

    'eslint:recommended',
    // 🌐 https://www.npmjs.com/package/eslint-config-airbnb-base
    'airbnb-base',

    // 🌐 https://github.com/import-js/eslint-plugin-import
    ENV.import && 'plugin:import/recommended',
    // 🌐 https://www.npmjs.com/package/eslint-import-resolver-typescript
    ENV.import && ENV.typescript && 'plugin:import/typescript',

    ...(ENV.typescript && TYPESCRIPT.typeCheckedRules
      ? [
          'plugin:@typescript-eslint/strict-type-checked',
          'plugin:@typescript-eslint/stylistic-type-checked',
        ]
      : ['plugin:@typescript-eslint/strict', 'plugin:@typescript-eslint/stylistic']),

    // 🌐 https://github.com/eslint-community/eslint-plugin-promise
    'plugin:promise/recommended',
    // 🌐 https://github.com/eslint-community/eslint-plugin-security
    'plugin:security/recommended-legacy',

    // 🔴 Must be at the end of the list as it disables incompatible rules from the previous configs
    // 🌐 https://github.com/prettier/eslint-config-prettier
    'prettier',
    'prettier/prettier', // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#arrow-body-style-and-prefer-arrow-callback-issue
  ]),

  settings: {
    ...(ENV.import && {
      'import/resolver': {
        node: ENV.node,
        ...(ENV.typescript && {
          typescript: {
            project: TYPESCRIPT.project,
          },
        }),
      },

      ...(ENV.typescript && {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      }),
    }),
  },

  rules: {
    ...VANILLA_ESLINT_RULES,
    ...(ENV.typescript && {
      ...TS_ESLINT_RULES_NOT_TYPE_CHECKED,
      ...(TYPESCRIPT.typeCheckedRules && TS_ESLINT_RULES_TYPE_CHECKED),
      ...(TYPESCRIPT.disallowTypeAssertions && {
        'no-type-assertion/no-type-assertion': ERROR,
      }),
    }),
    ...(ENV.import && IMPORT_RULES),
    'optimize-regex/optimize-regex': WARNING,
    ...SECURITY_RULES,
    ...SONARJS_RULES,
    ...UNICORN_RULES,
    ...PROMISE_RULES,

    ...GLOBAL_RULE_OVERRIDES,
  },

  overrides: arrayFlattenAndFilterOutFalsyValues([
    ENV.node &&
      NODE.pathsToCheck?.length && {
        files: NODE.pathsToCheck,
        extends: arrayFlattenAndFilterOutFalsyValues([
          // 🌐 https://github.com/eslint-community/eslint-plugin-n
          'plugin:n/recommended',

          'prettier',
          'prettier/prettier',
        ]),
        rules: {
          ...NODE_RULES,
        },
      },

    ENV.vue && {
      files: ['*.vue'],
      plugins: arrayFlattenAndFilterOutFalsyValues([
        // 🌐 https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility
        VUE.a11y && 'vuejs-accessibility',
      ]),
      extends: arrayFlattenAndFilterOutFalsyValues([
        // 🌐 https://github.com/vuejs/eslint-plugin-vue
        !VUE.vue2 && 'plugin:vue/vue3-recommended',
        VUE.vue2 && 'plugin:vue/recommended',
        VUE.a11y && 'plugin:vuejs-accessibility/recommended',

        'prettier',
        'prettier/prettier',
      ]),
      rules: {
        ...VUE_RULES,
        ...(VUE['>=vue3.3'] && VUE_3_3_RULES),
        ...(VUE.a11y && VUE_A11Y_RULES),
        ...(VUE.extensionRules && VUE_EXTENSION_RULES),

        '@typescript-eslint/prefer-function-type': OFF,
        '@typescript-eslint/unified-signatures': OFF,
        'import/first': OFF, // May be wrong if multiple <script> blocks are present
      },
    },

    ENV.typescript && {
      files: arrayFlattenAndFilterOutFalsyValues([
        '*.ts',
        '*.cts',
        '*.mts',
        '*.tsx',
        VUE.enforceTypescriptInScript && '*.vue',
      ]),
      rules: {
        ...(ENV.import && {
          // "We recommend you do not use the following rules, as TypeScript provides the same checks as part of standard type checking" - https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting/#eslint-plugin-import
          'import/named': OFF,
          'import/namespace': OFF,
          'import/default': OFF,
          'import/no-named-as-default-member': OFF,
        }),
      },
    },

    ENV.typescript && {
      files: ['*.js', '*.cjs', '*.mjs', '*.jsx'],
      extends: arrayFlattenAndFilterOutFalsyValues([
        TYPESCRIPT.typeCheckedRules && 'plugin:@typescript-eslint/disable-type-checked',
      ]),
      rules: {
        '@typescript-eslint/no-var-requires': OFF,

        // Type checked rules can fail on non-typescript files, but their "disable-autofix" equivalents must be disabled too
        ...Object.fromEntries(
          typeCheckedRulesArray.map((ruleName) => [`disable-autofix/${ruleName}`, OFF]),
        ),
      },
    },

    ENV.typescript && {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-use-before-define': OFF,
        '@typescript-eslint/no-unused-vars': OFF,
        '@typescript-eslint/no-shadow': OFF,
        '@typescript-eslint/method-signature-style': OFF,
        'vars-on-top': OFF,

        ...(ENV.import && {'import/no-default-export': OFF, 'import/newline-after-import': OFF}),
      },
    },

    ENV.vue && {
      files: [
        `${OPTIONS.nuxtOrVueProjectDir}pages/**/*.vue`,
        ENV.nuxt3 && `${OPTIONS.nuxtOrVueProjectDir}layouts/**/*.vue`,
      ],
      rules: {
        'vue/multi-word-component-names': OFF,
      },
    },

    ENV.vue && {
      files: [ENV.nuxt3 && `${OPTIONS.nuxtOrVueProjectDir}layouts/**/*.vue`],
      rules: {
        'vue/require-explicit-slots': OFF,
      },
    },

    {
      files: MISC.configFiles,
      rules: {
        'import/no-default-export': OFF,
        'import/no-extraneous-dependencies': OFF,

        'n/no-unpublished-require': OFF,
      },
    },

    ENV.vue && {
      files: arrayFlattenAndFilterOutFalsyValues([
        '*.vue',
        '*.tsx',
        ENV.nuxt3 && `${OPTIONS.nuxtOrVueProjectDir}plugins/*.ts`,
        ENV.nuxt3 && `${OPTIONS.nuxtOrVueProjectDir}server/**/*.ts`,
      ]),
      rules: {
        'import/no-default-export': OFF,
      },
    },

    ...OVERRIDES,
  ]),
};
