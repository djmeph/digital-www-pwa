'use client';
import { NAVIGATION_LINKS } from '@digital-www-pwa/utils';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

import { SearchBar } from '@digital-www-pwa/components';

export function AppBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function renderMenuButton() {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </IconButton>
    );
  }

  function renderBackButton() {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </IconButton>
    );
  }

  function renderButton() {
    if (pathname.split('/').length > 2) {
      return renderBackButton();
    }
    return renderMenuButton();
  }

  return (
    <>
      <MuiAppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(90deg, #eb3a52 0%, #e05855 100%)',
        }}
      >
        <Container sx={{ padding: 0 }}>
          <Toolbar id="app-bar">
            {renderButton()}
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                flexGrow: 1,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Lakes of Fire
            </Typography>
            <SearchBar />
          </Toolbar>
        </Container>
      </MuiAppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>
            <ListItemButton
              component={Link}
              href="/"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <Divider />
          {NAVIGATION_LINKS.map((link) => {
            const IconComponent = link.icon;
            return (
              <ListItem key={link.path}>
                <ListItemButton
                  component={Link}
                  href={link.path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
