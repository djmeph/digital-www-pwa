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
import { useTheme } from '@mui/material/styles';
import lunr from 'lunr';
import { useState, useEffect, useRef } from 'react';

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
  const theme = useTheme();

  useEffect(() => {
    if (eventsIndex && searchText !== '') {
      setEventResults(eventsIndex.search(searchText));
    } else {
      setEventResults([]);
    }
  }, [eventsIndex, searchText]);

  useEffect(() => {
    if (artIndex && searchText !== '') {
      setArtResults(artIndex.search(searchText));
    } else {
      setArtResults([]);
    }
  }, [artIndex, searchText]);

  useEffect(() => {
    if (campsIndex && searchText !== '') {
      setCampResults(campsIndex.search(searchText));
    } else {
      setCampResults([]);
    }
  }, [campsIndex, searchText]);

  useEffect(() => {
    if (radioIndex && searchText !== '') {
      setRadioResults(radioIndex.search(searchText));
    } else {
      setRadioResults([]);
    }
  }, [radioIndex, searchText]);

  useEffect(() => {
    if (vehiclesIndex && searchText !== '') {
      setVehicleResults(vehiclesIndex.search(searchText));
    } else {
      setVehicleResults([]);
    }
  }, [vehiclesIndex, searchText]);

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
          width: '100vw',
          height: '100vh',
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
              <Card>
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
