/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-standard-scss',

    'stylelint-config-recommended-vue/scss',
    'stylelint-config-prettier-scss',
  ],

  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'custom-property-empty-line-before': null,
      },
    },
  ],

  rules: {
    // 'order/properties-order': null,

    'property-no-vendor-prefix': null,
    'color-function-notation': null,
    'media-feature-range-notation': null,

    'color-hex-length': 'long',
    'color-named': 'never',

    'font-family-name-quotes': 'always-unless-keyword',

    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],

    // May alter function names from external libs!
    'function-name-case': null,

    'declaration-block-no-duplicate-properties': true,

    'selector-attribute-quotes': 'always',
    'selector-class-pattern': null,
    'selector-max-id': 1,

    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-blockless'],
        ignore: ['after-comment'],
      },
    ],

    'no-descending-specificity': null,
    'no-invalid-position-at-import-rule': null,

    // Allow for empty lines between $-variables
    'scss/dollar-variable-empty-line-before': null,

    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
  },
};
