'use client';
import lunr from 'lunr';
import {
  useEventsIndex,
  useArtIndex,
  useCampsIndex,
  useRadioIndex,
  useVehiclesIndex,
} from '@digital-www-pwa/providers';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useRef } from 'react';

import { SearchResults } from '@digital-www-pwa/components';

export function SearchBar() {
  const searchBarRef = useRef(null);
  const inputRef = useRef<HTMLElement | null>(null);
  const [resultsOpen, setResultsOpen] = useState<boolean>(false);
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
    if (searchText !== '') {
      setResultsOpen(true);
    }
  }, [searchText]);

  const handleClose = () => setResultsOpen(false);

  const handleFocus = () => {
    setResultsOpen(searchText !== '');
  };

  const handleClear = () => {
    setSearchText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Box onFocus={handleFocus} onBlur={handleClose}>
      <Box
        ref={searchBarRef}
        sx={{
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.text.primary, 0.15),
          '&:hover': {
            backgroundColor: alpha(theme.palette.text.primary, 0.25),
          },
          marginLeft: 0,
          paddingRight: theme.spacing(4),
          width: {
            xxs: '17ch',
            sm: '30ch',
          },
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SearchIcon />
        </Box>
        <InputBase
          inputRef={inputRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          sx={{
            color: 'inherit',
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          }}
        />
        {searchText.length > 0 ? (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="clear"
            sx={{
              position: 'absolute',
              right: theme.spacing(2),
              top: 0,
              height: '100%',
            }}
            onClick={handleClear}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Box>
      <Popper
        open={resultsOpen}
        anchorEl={searchBarRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: '0 0 0' }}>
            <Paper>
              <SearchResults
                eventResults={eventResults}
                artResults={artResults}
                campResults={campResults}
                radioResults={radioResults}
                vehicleResults={vehicleResults}
                onClick={handleClose}
              />
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
