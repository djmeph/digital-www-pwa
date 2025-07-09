'use client';
import { SearchBar, SearchResults } from '@digital-www-pwa/components';
import {
  useEventsIndex,
  useArtIndex,
  useCampsIndex,
  useRadioIndex,
  useVehiclesIndex,
} from '@digital-www-pwa/providers';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import lunr from 'lunr';
import { useState, useEffect, useRef, useMemo } from 'react';

export function SearchWindow({
  open,
  anchorRef,
  onClose,
}: {
  open: boolean;
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLElement | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [eventResults, setEventResults] = useState<lunr.Index.Result[]>([]);
  const [artResults, setArtResults] = useState<lunr.Index.Result[]>([]);
  const [campResults, setCampResults] = useState<lunr.Index.Result[]>([]);
  const [radioResults, setRadioResults] = useState<lunr.Index.Result[]>([]);
  const [vehicleResults, setVehicleResults] = useState<lunr.Index.Result[]>([]);
  const eventsIndex = useEventsIndex();
  const artIndex = useArtIndex();
  const campsIndex = useCampsIndex();
  const radioIndex = useRadioIndex();
  const vehiclesIndex = useVehiclesIndex();

  const adjustedSearchText = useMemo(() => {
    const terms = searchText.split(/\s+/);

    return terms
      .map((term) => (term && term.length > 3 ? `${term}~1` : term))
      .join(' ');
  }, [searchText]);

  useEffect(() => {
    if (eventsIndex && adjustedSearchText !== '') {
      setEventResults(eventsIndex.search(adjustedSearchText));
    } else {
      setEventResults([]);
    }
  }, [eventsIndex, adjustedSearchText]);

  useEffect(() => {
    if (artIndex && adjustedSearchText !== '') {
      setArtResults(artIndex.search(adjustedSearchText));
    } else {
      setArtResults([]);
    }
  }, [artIndex, adjustedSearchText]);

  useEffect(() => {
    if (campsIndex && adjustedSearchText !== '') {
      setCampResults(campsIndex.search(adjustedSearchText));
    } else {
      setCampResults([]);
    }
  }, [campsIndex, adjustedSearchText]);

  useEffect(() => {
    if (radioIndex && adjustedSearchText !== '') {
      setRadioResults(radioIndex.search(adjustedSearchText));
    } else {
      setRadioResults([]);
    }
  }, [radioIndex, adjustedSearchText]);

  useEffect(() => {
    if (vehiclesIndex && adjustedSearchText !== '') {
      setVehicleResults(vehiclesIndex.search(adjustedSearchText));
    } else {
      setVehicleResults([]);
    }
  }, [vehiclesIndex, adjustedSearchText]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose && onClose();
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100svw',
          height: '100svh',
          display: open ? 'block' : 'none',
          backgroundColor: 'black',
          opacity: 0.3,
        }}
        onClick={onClose}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
        onKeyUp={handleKeyUp}
      >
        {({ TransitionProps, placement }) => (
          <Box>
            <Grow {...TransitionProps} style={{ transformOrigin: '0 0 0' }}>
              <Card
                sx={{
                  maxWidth: '100svw',
                }}
              >
                <CardContent>
                  <Stack>
                    <SearchBar
                      inputRef={inputRef}
                      value={searchText}
                      onChange={setSearchText}
                    />
                    <SearchResults
                      eventResults={eventResults}
                      artResults={artResults}
                      campResults={campResults}
                      radioResults={radioResults}
                      vehicleResults={vehicleResults}
                      onClick={onClose}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        )}
      </Popper>
    </>
  );
}
