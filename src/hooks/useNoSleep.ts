import { useState, useMemo, useCallback, useEffect } from 'react';
import NoSleep from 'nosleep.js';

export const useNoSleep = () => {
  const noSleep = useMemo(() => new NoSleep(), []);
  const [isEnabled, setIsEnabled] = useState(false);

  const enable = useCallback(async () => {
    try {
      await noSleep.enable();
      setIsEnabled(true);
    } catch (err) {
      console.error('Failed to enable NoSleep:', err);
    }
  }, [noSleep]);

  const disable = useCallback(() => {
    try {
      noSleep.disable();
      setIsEnabled(false);
    } catch (err) {
      console.error('Failed to disable NoSleep:', err);
    }
  }, [noSleep]);

  useEffect(() => {
    return () => {
      disable();
    };
  }, [disable]);

  return { isEnabled, enable, disable };
};