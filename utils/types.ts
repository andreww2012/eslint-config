type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;
export type TupleOfLength<N extends number, T = number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;

export type NonFalsy<T> = T extends false | 0 | '' | null | undefined | 0n ? never : T;
