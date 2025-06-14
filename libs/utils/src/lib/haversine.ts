import type { GpsCoordinates } from '@digital-www-pwa/types';

export function calculateDistance(pos1: GpsCoordinates, pos2: GpsCoordinates) {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_MI = 3959;

  const dLat = distance(pos2.latitude, pos1.latitude);
  const dLon = distance(pos2.longitude, pos1.longitude);

  const lat1 = toRadian(pos1.latitude);
  const lat2 = toRadian(pos2.latitude);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  return RADIUS_OF_EARTH_IN_MI * c;
}
