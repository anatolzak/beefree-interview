import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T | null = null) => {
  const [value, setValue] = useState<T | null>(() => {
    const existingVal = localStorage.getItem(key);
    if (existingVal !== null) return JSON.parse(existingVal) as T;
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;