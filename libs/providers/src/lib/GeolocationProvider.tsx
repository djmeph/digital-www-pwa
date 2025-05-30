'use client';
import type { GeolocationContextProps } from '@digital-www-pwa/types';
import {
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
  useEffect,
} from 'react';

const INITIAL_DATA: GeolocationContextProps = {
  currentPosition: null,
  watchPosition: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  isGeolocationSupported: false,
};

export const GeolocationContext =
  createContext<GeolocationContextProps>(INITIAL_DATA);

export function useGeolocationContext(): GeolocationContextProps {
  return useContext(GeolocationContext);
}

export function GeolocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPosition, setCurrentPosition] =
    useState<GeolocationPosition | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  const isGeolocationSupported = Boolean(
    typeof navigator !== 'undefined' && navigator?.geolocation
  );

  const watchPosition = useCallback(() => {
    setWatchId((oldWatchId) => {
      if (oldWatchId) {
        navigator.geolocation.clearWatch(oldWatchId);
      }
      return navigator.geolocation.watchPosition(setCurrentPosition);
    });
  }, []);

  const contextData = useMemo(
    () => ({
      currentPosition,
      watchPosition,
      isGeolocationSupported,
    }),
    [currentPosition, watchPosition, isGeolocationSupported]
  );

  useEffect(() => {
    if (!isGeolocationSupported) {
      return;
    }

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        watchPosition();
      }
    });

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <GeolocationContext.Provider value={contextData}>
      {children}
    </GeolocationContext.Provider>
  );
}
