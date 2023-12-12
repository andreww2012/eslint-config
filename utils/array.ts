export type MaybeArray<T> = T | T[];

export const arraify = <T>(value?: MaybeArray<T> | null | undefined): T[] =>
  Array.isArray(value) ? value : value == null ? [] : [value];

export const nonNullish = <T>(value: T | null | undefined): value is T => value != null;

// eslint-disable-next-line unicorn/prefer-native-coercion-functions
export const nonFalsy = <T>(value: T | null | undefined | '' | 0 | false | 0n): value is T =>
  Boolean(value);

export type WithoutNullishField<T, K extends string & keyof T> = Exclude<T, K> & {
  [_ in K]: NonNullable<T[K]>;
};

export const fieldNonNullish =
  <T, K extends string & keyof T>(
    key: K,
    additionalFilterFn?: (value: WithoutNullishField<T, K>) => boolean,
  ) =>
  (obj: T): obj is WithoutNullishField<T, K> =>
    // eslint-disable-next-line disable-autofix/@typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unnecessary-condition
    nonNullish(obj?.[key]) &&
    (!additionalFilterFn || additionalFilterFn(obj as WithoutNullishField<T, K>));

export const isArrayUnique = <T>(array: T[], mapFnOrKey?: keyof T | ((t: T) => unknown)): boolean =>
  new Set(
    mapFnOrKey == null
      ? array
      : array.map(typeof mapFnOrKey === 'function' ? mapFnOrKey : (v) => v[mapFnOrKey]),
  ).size === array.length;

export const mergeAndMakeUnique = <T>(...arrays: (T[] | null | undefined)[]): T[] => [
  ...new Set(arrays.filter(nonNullish).flat()),
];

export const groupBySafe = <T, Key extends number | string | symbol | boolean>(
  array: readonly T[],
  groupFn: (value: T, index: number, array: readonly T[]) => Key,
): {key: Key; values: T[]}[] => {
  const result: {key: Key; values: T[]}[] = [];
  array.forEach((value, i) => {
    const key = groupFn(value, i, array);
    const values = result.find((r) => r.key === key);
    if (values) {
      values.values.push(value);
    } else {
      result.push({key, values: [value]});
    }
  });
  return result;
};
