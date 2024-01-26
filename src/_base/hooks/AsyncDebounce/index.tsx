import { DependencyList } from 'react';
import { useAsyncCallback } from '../AsyncCallback';
import { useDebounce } from '../Debounce';

type FuncType = (callback: () => void, deps: DependencyList, delay: number) => void;

/**
 * Call an async callback function after an amount of time the dependencies have changed.
 *
 * @param callback Asynchronous function that will be called after some delay.
 * @param deps If present, callback will be called if the values in the list change.
 * @param delay Amount of time (in miliseconds) the callback should wait to be called.
 */
export const useAsyncDebounce: FuncType = (callback, deps, delay) => {
  useDebounce(useAsyncCallback(callback, deps), deps, delay);
};
