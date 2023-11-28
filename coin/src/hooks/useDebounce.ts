import { useCallback, useMemo } from 'react';

const useDebounce = <Args extends any[], Type = void>(
  func: (...arg: Args) => Type,
  duration: number = 300
): ReturnType<typeof debounce> => {
  const debounce = useCallback(
    (func: Function) => {
      let timer: any;
      return (...args: Args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, duration);
      };
    },
    [duration]
  );

  return useMemo(() => debounce(func), [duration, func]);
};

export default useDebounce;
