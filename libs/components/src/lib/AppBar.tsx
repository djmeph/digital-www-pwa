'use client';
import { NAVIGATION_LINKS } from '@digital-www-pwa/utils';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { SearchButton } from '@digital-www-pwa/components';

export function AppBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const tinyScreen = useMediaQuery(theme.breakpoints.down('xs'));

  function renderMenuButton() {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
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
      <MuiAppBar>
        <Container
          sx={{
            padding: 0,
            [theme.breakpoints.down('md')]: {
              padding: 0,
            },
          }}
        >
          <Toolbar sx={{ paddingLeft: 0, alignItems: 'center' }}>
            {renderButton()}
            <Link
              href="/"
              style={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'row',
                alignItems: 'center',
                color: 'inherit',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              <img
                src="/logo.png"
                alt="Lakes of Fire 2025 - Doorways in Time"
                style={{ height: 48 }}
              />
              <Stack
                direction="row"
                sx={{
                  flexGrow: 1,
                  justifyContent: 'space-around',

                  [theme.breakpoints.up('xs')]: {
                    paddingLeft: '10%',
                    paddingRight: '10%',
                  },
                }}
              >
                <Box>What</Box>
                <Box>Where</Box>
                <Box>When</Box>
              </Stack>
            </Link>
            <SearchButton />
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
