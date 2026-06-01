import { useState } from 'react';
import { SEARCH_STORAGE_KEY } from '../components/SearchSection/SearchSection';

export function useLocalStorage(
  initialValue: string
) {
  const key = SEARCH_STORAGE_KEY;
  const [storedValue, setStoredValue] = useState<string>(() => {
        try {
      const item = localStorage.getItem(key);

      return item
        ? item
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);

      localStorage.setItem(
        key,
        value.trim()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    storedValue,
    setValue,
    removeValue,
  };
}