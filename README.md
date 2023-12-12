# ESLint 

A comprehensive ESLint config primarily designed for either generic TS/JS applications or Vue {2,3}/Nuxt 3 applications on Frontend.

As a bonus, this "template" includes a Nuxt 3 config that **completely disables** auto-importing functionality as well as some useful generic types & utilities.

Everything is customizable, removable and overridable. Nothing is set in stone!

## What's included

- **Package manager:** `pnpm` with `shamefully-hoist=true` and `save-exact=true` set by default.
- `type: module` & Node 18
- **ESLint rules:**
  - Official "recommended" config
  - `config-airbnb-base`
  - `config-prettier`
    - Prettier is run **separately**.
  - `@typescript-eslint/{eslint-plugin,parser}`
  - `plugin-disable-autofix`
  - `plugin-unicorn` & `plugin-sonarjs`
  - `plugin-vue` & `plugin-vuejs-accessibility`
  - `plugin-import` & `import-resolver-typescript`
  - `plugin-promise`
  - `plugin-n` (nodejs specific rules)
  - `plugin-optimize-regex`
  - `plugin-security`
  - `plugin-no-type-assertion`
- **Prettier plugins:**
  - `organize-attributes` as well as Vue official style guide compliant attributes order for Vue templates.
  - `plugin-tailwindcss`
- tailwindcss
  - Includes tailwind config with some useful utilities & bug fixes
- [`ts-reset`](https://github.com/total-typescript/ts-reset)
- VSCode specific files
  - Settings to run Prettier on save for majority of the file types it's working with
  - Some tailwindcss specific settings
  - Extension recommendations
- **Stylelint configs:**
  - `config-recess-order` (to sort properties)
  - `config-standard-scss` (general rules for CSS & SCSS)
  - `config-prettier-scss` (to work with Prettier)
  - `config-recommended-vue` (to support .vue files)
- npm scripts to run linters & type checking
- `lefthook` set up with pre-push hook to run linters