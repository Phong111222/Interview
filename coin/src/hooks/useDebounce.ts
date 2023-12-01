import { useCallback, useEffect, useMemo, useRef } from 'react';

const useDebounce = <Args extends any[], Type = void>(
  func: (...arg: Args) => Type,
  duration: number = 300
): ReturnType<typeof debounce> => {
  const timerRef = useRef<any>();

  const debounce = useCallback(
    (func: Function) => {
      return (...args: Args) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          func.apply(this, args);
        }, duration);
      };
    },
    [duration]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return useMemo(() => debounce(func), [func]);
};

export default useDebounce;
