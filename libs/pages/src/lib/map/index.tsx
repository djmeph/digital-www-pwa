'use client';
import { useGeolocationContext } from '@digital-www-pwa/providers';
import {
  MAP_LOCATION_ANCHORS,
  MAP_ACCURACY_SIZE_FACTOR,
  POSITION_STALE_TIME,
  calculateDistance,
} from '@digital-www-pwa/utils';
import ClearIcon from '@mui/icons-material/Clear';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import NorthIcon from '@mui/icons-material/North';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState, useLayoutEffect, useMemo, useRef } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  KeepScale,
} from 'react-zoom-pan-pinch';
import type {
  ReactZoomPanPinchContext,
  ReactZoomPanPinchHandlers,
} from 'react-zoom-pan-pinch';

function gpsToStyle(position: GeolocationPosition | null) {
  if (!position) {
    return null;
  }

  const closestAnchors = MAP_LOCATION_ANCHORS.sort((a, b) => {
    return (
      calculateDistance(position.coords, a) -
      calculateDistance(position.coords, b)
    );
  }).slice(0, 2);

  const left =
    ((position.coords.longitude - closestAnchors[0].longitude) /
      (closestAnchors[1].longitude - closestAnchors[0].longitude)) *
      (closestAnchors[1].left - closestAnchors[0].left) +
    closestAnchors[0].left;
  const top =
    ((position.coords.latitude - closestAnchors[0].latitude) /
      (closestAnchors[1].latitude - closestAnchors[0].latitude)) *
      (closestAnchors[1].top - closestAnchors[0].top) +
    closestAnchors[0].top;

  const size = (position.coords.accuracy || 0) * MAP_ACCURACY_SIZE_FACTOR;

  return { left: `${left}%`, top: `${top}%`, width: `${size}%` };
}

export function MapPage() {
  const theme = useTheme();
  const { currentPosition, watchPosition, isGeolocationSupported } =
    useGeolocationContext();

  const currentPositionStyle = useMemo(() => {
    return gpsToStyle(currentPosition);
  }, [currentPosition]);

  const currentPositionMarkerRef = useRef<HTMLElement | null>(null);
  const [positionStale, setPositionStale] = useState(true);

  useLayoutEffect(() => {
    if (!currentPosition) {
      return;
    }

    const positionAge = Date.now() - currentPosition.timestamp;
    if (positionAge >= POSITION_STALE_TIME) {
      setPositionStale(true);
      return;
    }

    setPositionStale(false);
    const timeout = setTimeout(
      () => setPositionStale(true),
      (POSITION_STALE_TIME - positionAge) * 1000
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [currentPosition]);

  const isCloseToEvent = (() => {
    if (!currentPositionStyle) {
      return false;
    }
    const { left: leftStyle, top: topStyle } = currentPositionStyle;
    const left = Number.parseFloat(leftStyle);
    const top = Number.parseFloat(topStyle);

    return left >= -10 && left <= 110 && top >= -10 && top <= 110;
  })();

  const handleClickFindMyLocation = (
    instance: ReactZoomPanPinchContext,
    zoomToElement: ReactZoomPanPinchHandlers['zoomToElement']
  ) => {
    watchPosition();

    if (isCloseToEvent && currentPositionMarkerRef.current) {
      // Zoom in at least a little bit
      const newScale = Math.max(instance.transformState.scale, 3);

      zoomToElement(currentPositionMarkerRef.current, newScale);
    }
  };

  const renderFindLocationButtonIcon = () => {
    if (!currentPosition) {
      return <GpsNotFixedIcon />;
    }

    const color = positionStale ? 'inherit' : 'currentPosition.main';

    if (!isCloseToEvent) {
      const angle = Math.atan2(
        currentPosition.coords.longitude - MAP_LOCATION_ANCHORS[0].longitude,
        currentPosition.coords.latitude - MAP_LOCATION_ANCHORS[0].latitude
      );
      return <NorthIcon sx={{ color, transform: `rotate(${angle}rad)` }} />;
    }
    return <GpsFixedIcon sx={{ color }} />;
  };

  function renderCurrentPosition() {
    if (!currentPositionStyle) {
      return null;
    }

    return (
      <Box
        sx={{
          ...currentPositionStyle,
          position: 'absolute',
          backgroundColor: alpha(theme.palette.currentPosition.main, 0.3),
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          aspectRatio: 1,
        }}
      >
        <KeepScale
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            ref={currentPositionMarkerRef}
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
            }}
          />
        </KeepScale>
      </Box>
    );
  }

  return (
    <Stack
      sx={{
        position: 'absolute',
        height: 'calc(100svh - 96px)',
        width: '100svw',
        left: 0,
      }}
    >
      <TransformWrapper initialPositionY={-1000}>
        {({ zoomIn, zoomOut, resetTransform, zoomToElement, instance }) => (
          <>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
            >
              <Container>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src="/map.jpg"
                    alt="2025 Lakes of Fire Map"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                  {renderCurrentPosition()}
                </Box>
              </Container>
            </TransformComponent>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: 'absolute',
                left: theme.spacing(1),
                top: theme.spacing(1),
              }}
            >
              <Fab size="small" onClick={() => zoomIn()} aria-label="Zoom In">
                <ZoomInIcon />
              </Fab>
              <Fab size="small" onClick={() => zoomOut()} aria-label="Zoom Out">
                <ZoomOutIcon />
              </Fab>
              <Fab
                size="small"
                onClick={() => resetTransform()}
                aria-label="Reset Zoom"
              >
                <ClearIcon />
              </Fab>
            </Stack>
            {isGeolocationSupported && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  position: 'absolute',
                  right: theme.spacing(1),
                  bottom: theme.spacing(1),
                }}
              >
                {currentPosition && !isCloseToEvent && (
                  <Typography
                    sx={{ padding: 1, background: 'rgba(0,0,0,0.5)' }}
                  >
                    {calculateDistance(
                      currentPosition.coords,
                      MAP_LOCATION_ANCHORS[0]
                    ).toFixed(1)}{' '}
                    miles
                  </Typography>
                )}
                <Fab
                  size="large"
                  aria-label="Locate Me"
                  onClick={() =>
                    handleClickFindMyLocation(instance, zoomToElement)
                  }
                >
                  {renderFindLocationButtonIcon()}
                </Fab>
              </Stack>
            )}
          </>
        )}
      </TransformWrapper>
    </Stack>
  );
}
