import type Eslint from 'eslint';

export type FlatConfigEntry<T extends Eslint.Linter.RulesRecord = Eslint.Linter.RulesRecord> =
  Eslint.Linter.FlatConfig<T>;
