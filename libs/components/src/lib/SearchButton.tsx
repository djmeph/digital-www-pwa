'use client';
import { SearchWindow } from '@digital-www-pwa/components';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState, useRef } from 'react';

export function SearchButton() {
  const [searchOpen, setSearchOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        edge="end"
        color="inherit"
        aria-label="clear"
        onClick={() => setSearchOpen(!searchOpen)}
        sx={{ marginLeft: (theme) => theme.spacing(2) }}
      >
        <SearchIcon sx={{ width: '1.5em', height: '1.5em' }} />
      </IconButton>
      <SearchWindow
        open={searchOpen}
        anchorRef={anchorRef}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
