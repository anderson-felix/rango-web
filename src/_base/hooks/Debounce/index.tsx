import { DependencyList } from 'react';
import { useUpdateEffect } from '../UpdateEffect';

type FuncType = (callback: () => void, deps: DependencyList, delay: number) => void;

/**
 * Call a callback function after an amount of time the dependencies have changed.
 *
 * @param callback Imperative function that will be called after some delay.
 * @param deps If present, callback will be called if the values in the list change.
 * @param delay Amount of time (in miliseconds) the callback should wait to be called.
 */
export const useDebounce: FuncType = (callback, deps, delay) => {
  useUpdateEffect(() => {
    const desc = setTimeout(callback, delay);

    return () => clearTimeout(desc);
  }, deps);
};
