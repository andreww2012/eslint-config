import type Eslint from 'eslint';
import {OFF} from './constants';

export const genRuleOverrideFn =
  <Prefix extends string>(prefix: Prefix) =>
  <
    BaseRuleName extends string,
    Severity extends Eslint.Linter.Severity,
    Options extends unknown[] = unknown[],
  >(
    baseRuleName: BaseRuleName,
    severity: Severity,
    ...options: Options
  ) =>
    ({
      [baseRuleName]: OFF,
      [`${prefix}/${baseRuleName}`]: [severity, ...options],
    }) as {[Key in BaseRuleName]: typeof OFF} & {
      [Key in `${Prefix}/${BaseRuleName}`]: [Severity, ...Options];
    };

export const disableAutofixForRule = genRuleOverrideFn('disable-autofix');

export const createPluginObjectRenamer = (from: string, to: string) => {
  const fromRegex = new RegExp(`^${from}`);

  return <T extends Record<string, unknown>>(object: T): T =>
    Object.fromEntries(
      Object.entries(object).map(([ruleName, v]) => [ruleName.replace(fromRegex, to), v]),
    ) as T;
};
