'use client';
import { useAuthContext } from '@digital-www-pwa/providers';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from 'next/navigation';

export function AuthNav({ setOpen }: { setOpen: (arg0: boolean) => void }) {
  const authContext = useAuthContext();
  const pathname = usePathname();
  const queryParams = new URLSearchParams({
    redirect_target: pathname,
  });

  if (authContext.isAuthenticated) {
    return (
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
    );
  }

  return (
    <ListItem>
      <ListItemButton
        href={`/api/login?${queryParams.toString()}`}
        onClick={authContext.enableBackdrop}
      >
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary={'Login'} />
      </ListItemButton>
    </ListItem>
  );
}
