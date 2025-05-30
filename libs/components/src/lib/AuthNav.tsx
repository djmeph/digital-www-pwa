import { useAuthContext } from '@digital-www-pwa/providers';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export function AuthNav() {
  const authContext = useAuthContext();

  if (authContext.isAuthenticated) {
    return (
      <ListItem>
        <ListItemButton onClick={() => authContext.logout()}>
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
      <ListItemButton href={'/api/login'}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary={'Login'} />
      </ListItemButton>
    </ListItem>
  );
}
