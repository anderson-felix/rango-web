import { DependencyList, EffectCallback, useEffect, useMemo } from 'react';

type FuncType = (callback: EffectCallback, deps?: DependencyList) => void;

/**
 * Accepts a function that is called when any dependencies (deps) change.
 * Note that, unlike useEffect, useUpdateEffect won't call the callback for
 * the first time when the component is mounted.
 *
 * @param callback Imperative function that can return a cleanup function.
 * @param deps If present, callback will be called if the values in the list change.
 */
export const useUpdateEffect: FuncType = (callback, deps) => {
  const data = useMemo(() => ({ firstLoad: true }), []);

  useEffect(() => {
    if (data.firstLoad) {
      data.firstLoad = false;
      return undefined;
    }

    return callback();
  }, deps);
};
