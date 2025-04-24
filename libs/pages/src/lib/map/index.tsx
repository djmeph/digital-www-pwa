'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import { Header } from '@digital-www-pwa/components';
import { TransformWrapper, TransformComponent, KeepScale } from "react-zoom-pan-pinch";
import type { ReactZoomPanPinchContext, ReactZoomPanPinchHandlers } from "react-zoom-pan-pinch";
import { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { alpha } from '@mui/material';
import { MAP_LOCATION_ANCHORS, MAP_ACCURACY_SIZE_FACTOR, POSITION_STALE_TIME } from '@digital-www-pwa/utils';
import type { GpsCoordinates } from '@digital-www-pwa/types';
import { useGeolocationContext } from '@digital-www-pwa/providers';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ClearIcon from '@mui/icons-material/Clear';
import MyLocationIcon from '@mui/icons-material/MyLocation';

function calculateDistance (a: GpsCoordinates, b: GpsCoordinates) {
  return Math.sqrt((a.latitude - b.latitude) ** 2 + (a.longitude - b.longitude) ** 2);
};

function gpsToStyle (position: GeolocationPosition | null) {
  if (!position) return null;

  const closestAnchors = MAP_LOCATION_ANCHORS.sort((a, b) => {
    return calculateDistance(position.coords, a) - calculateDistance(position.coords, b);
  }).slice(0, 2);

  const left = (position.coords.longitude - closestAnchors[0].longitude)
    / (closestAnchors[1].longitude - closestAnchors[0].longitude)
    * (closestAnchors[1].left - closestAnchors[0].left)
    + closestAnchors[0].left;
  const top = (position.coords.latitude - closestAnchors[0].latitude)
    / (closestAnchors[1].latitude - closestAnchors[0].latitude)
    * (closestAnchors[1].top - closestAnchors[0].top)
    + closestAnchors[0].top;

  const size = (position.coords.accuracy || 0) * MAP_ACCURACY_SIZE_FACTOR;

  return { left: `${left}%`, top: `${top}%`, width: `${size}%` };
};

export function MapPage() {
  const {
    currentPosition,
    watchPosition,
    isGeolocationSupported,
  } = useGeolocationContext();

  const currentPositionStyle = useMemo(() => {
    return gpsToStyle(currentPosition);
  }, [currentPosition]);

  const currentPositionMarkerRef = useRef<HTMLElement|null>(null);
  const [positionStale, setPositionStale] = useState(true);

  useLayoutEffect(() => {
    if (!currentPosition) return;

    const positionAge = Date.now() - currentPosition.timestamp;
    if (positionAge >= POSITION_STALE_TIME) {
      setPositionStale(true);
      return;
    }

    setPositionStale(false);
    const timeout = setTimeout(() => setPositionStale(true), (POSITION_STALE_TIME - positionAge) * 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [currentPosition]);

  const handleClickFindMyLocation = (instance: ReactZoomPanPinchContext, setTransform: ReactZoomPanPinchHandlers["setTransform"]) => {
    watchPosition();
    const offsetParent = currentPositionMarkerRef?.current?.offsetParent as HTMLElement|null;
    const offsetParentParent = offsetParent?.offsetParent as HTMLElement|null;
    if (
      currentPositionMarkerRef.current && offsetParent && offsetParentParent
      && currentPositionMarkerRef.current.offsetLeft >= -currentPositionMarkerRef.current.offsetWidth
      && currentPositionMarkerRef.current.offsetTop >= -currentPositionMarkerRef.current.offsetHeight
      && currentPositionMarkerRef.current.offsetLeft <= offsetParent.offsetWidth + currentPositionMarkerRef.current.offsetWidth
      && currentPositionMarkerRef.current.offsetTop <= offsetParent.offsetHeight + currentPositionMarkerRef.current.offsetHeight
    ) {
      const scale = Math.max(instance.transformState.scale, 3);
      const left = offsetParentParent.offsetWidth / 2 - currentPositionMarkerRef.current.offsetLeft * scale;
      const top = offsetParentParent.offsetHeight / 2 - currentPositionMarkerRef.current.offsetTop * scale;
      setTransform(
        Math.max(-offsetParentParent.offsetWidth * scale, Math.min(0, left)),
        Math.max(-offsetParentParent.offsetHeight * scale, Math.min(0, top)),
        scale
      );
    }
  }


  function renderCurrentPosition() {
    if (!currentPositionStyle) return null;

    return <>
      <Box
        ref={currentPositionMarkerRef}
        sx={{
          ...currentPositionStyle,
          position: 'absolute',
          backgroundColor: (theme) => alpha(theme.palette.currentPosition.main, 0.3),
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          aspectRatio: 1,
        }}>
        <KeepScale style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
          <Box
            sx={{
              top: '50%',
              left: '50%',
              position: 'absolute',
              backgroundColor: positionStale ? 'grey' : 'currentPosition.main',
              border: 1,
              borderColor: 'currentPosition.contrastText',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
            }} />
        </KeepScale>
      </Box>
    </>
  }

  return (
    <>
      <Stack sx={{position: 'relative', height: 'calc(100vh - 96px)'}}>
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, setTransform, instance }) => (
            <>
              <TransformComponent>
                <img src="/map.jpg" alt="2025 Lakes of Fire Map" style={{maxWidth: '100%', maxHeight: '100%'}} />
                {renderCurrentPosition()}
              </TransformComponent>
              <Stack direction="row" spacing={1} sx={{position: 'absolute', left: (theme) => theme.spacing(1), top: (theme) => theme.spacing(1)}}>
                <Fab size="small" onClick={() => zoomIn()} aria-label="Zoom In"><ZoomInIcon /></Fab>
                <Fab size="small" onClick={() => zoomOut()} aria-label="Zoom Out"><ZoomOutIcon /></Fab>
                <Fab size="small" onClick={() => resetTransform()} aria-label="Reset Zoom"><ClearIcon /></Fab>
              </Stack>
              {isGeolocationSupported && <Fab
                size="large"
                aria-label="Locate Me"
                onClick={() => handleClickFindMyLocation(instance, setTransform)}
                sx={{
                  position: 'absolute',
                  right: (theme) => theme.spacing(1),
                  bottom: (theme) => theme.spacing(1),
                }}>
                  <MyLocationIcon sx={{color: 'currentPosition.main'}}/>
              </Fab>}
            </>
          )}
        </TransformWrapper>
      </Stack>
    </>
  );
}
