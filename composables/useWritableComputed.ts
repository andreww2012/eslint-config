import {type UnwrapRef, ref, watchEffect} from 'vue';

export const computedWritable = <T>(getValue: () => T) => {
  const value = ref(getValue());
  watchEffect(() => {
    value.value = getValue() as UnwrapRef<T>;
  });
  return value;
};
