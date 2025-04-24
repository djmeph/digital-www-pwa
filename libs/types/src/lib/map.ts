export interface GpsCoordinates {
  latitude: number;
  longitude: number;
}

export interface GeolocationContextProps {
  currentPosition: GeolocationPosition | null,
  watchPosition: () => void,
  isGeolocationSupported: boolean,
}
