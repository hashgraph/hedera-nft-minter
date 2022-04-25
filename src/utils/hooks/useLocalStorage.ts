import { useCallback, useEffect, useState } from 'react';

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState<string | null | undefined>(
    localStorage.getItem(key)
  );

  const saveValue = useCallback(
    (newValue: string | undefined | null) => {
      if (!newValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  const handleStorageChange = useCallback(() => {
    setValue(localStorage.getItem(key));
  }, [key]);

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  return [value, saveValue];
}
