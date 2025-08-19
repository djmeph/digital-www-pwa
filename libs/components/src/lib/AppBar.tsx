'use client';
import { AuthNav, SearchButton } from '@digital-www-pwa/components';
import { useAuthContext } from '@digital-www-pwa/providers';
import {
  NAVIGATION_LINKS,
  EVENT_START,
  EVENT_END,
} from '@digital-www-pwa/utils';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export function AppBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const authContext = useAuthContext();

  function renderMenuButton() {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon sx={{ width: '1.5em', height: '1.5em' }} />
      </IconButton>
    );
  }

  function renderBackButton() {
    if (pathname.split('/').length <= 2) {
      return null;
    }
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => router.back()}
        sx={{ marginRight: (theme) => theme.spacing(2) }}
      >
        <ArrowBackIcon sx={{ width: '1.5em', height: '1.5em' }} />
      </IconButton>
    );
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
            {renderBackButton()}
            <Link
              component={NextLink}
              href="/"
              style={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <img
                src="/logo.png"
                alt="Lakes of Fire 2025 - Doorways in Time"
                style={{ height: 48 }}
              />
            </Link>
            {renderMenuButton()}
            <SearchButton />
          </Toolbar>
        </Container>
      </MuiAppBar>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>
            <ListItemButton
              component={NextLink}
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
          {!authContext.isAuthenticated && <AuthNav setOpen={setOpen} />}
          {NAVIGATION_LINKS.map((link) => {
            if (
              link.path === '/now' &&
              !dayjs().isBetween(EVENT_START, EVENT_END)
            ) {
              return null;
            }
            const IconComponent = link.icon;
            return (
              <ListItem key={link.path}>
                <ListItemButton
                  component={NextLink}
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
          {authContext.isAuthenticated && <AuthNav setOpen={setOpen} />}
        </List>
      </Drawer>
    </>
  );
}
