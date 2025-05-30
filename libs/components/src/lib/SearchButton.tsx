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
        edge="end"
        color="inherit"
        aria-label="clear"
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <SearchIcon />
      </IconButton>
      <SearchWindow
        open={searchOpen}
        anchorRef={anchorRef}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
