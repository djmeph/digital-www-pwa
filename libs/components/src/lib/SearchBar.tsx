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

export function SearchBar({
  inputRef,
  value,
  onChange,
}: {
  inputRef: React.MutableRefObject<HTMLElement | null>;
  value: string;
  onChange: (value: string) => void;
}) {
  const searchBarRef = useRef(null);
  const [searchText, setSearchText] = useState<string>('');
  const eventsIndex = useEventsIndex();
  const artIndex = useArtIndex();
  const campsIndex = useCampsIndex();
  const radioIndex = useRadioIndex();
  const vehiclesIndex = useVehiclesIndex();
  const theme = useTheme();

  const handleClear = () => {
    onChange('');
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        sx={{
          color: 'inherit',
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        }}
      />
      {value.length > 0 ? (
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
  );
}
