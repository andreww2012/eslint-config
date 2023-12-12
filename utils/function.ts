export type MaybeFn<ReturnType, Args extends readonly unknown[] = []> =
  | ((...args: Args) => ReturnType)
  | ReturnType;

export const maybeCall = <ReturnType = unknown, Args extends readonly unknown[] = []>(
  fnOrValue: MaybeFn<ReturnType, Args>,
  ...args: Args
): ReturnType =>
  typeof fnOrValue === 'function'
    ? (fnOrValue as (..._args: Args) => ReturnType)(...args)
    : fnOrValue;
