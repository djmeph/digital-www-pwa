'use client';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, useTheme } from '@mui/material/styles';
import { useRef } from 'react';

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
