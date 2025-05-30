'use client';
import { useAuthContext } from '@digital-www-pwa/providers';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import NextLink from 'next/link';

export function AuthNav({ setOpen }: { setOpen: (arg0: boolean) => void }) {
  const authContext = useAuthContext();

  if (authContext.isAuthenticated) {
    return (
      <>
        <ListItem>
          <ListItemButton
            component={NextLink}
            href={'/volunteer-shifts'}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary={'Volunteer Shifts'} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              authContext.logout();
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </>
    );
  }

  return (
    <ListItem>
      <ListItemButton href={'/api/login'}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary={'Login'} />
      </ListItemButton>
    </ListItem>
  );
}
