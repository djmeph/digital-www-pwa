'use client';
import {
  NAVIGATION_LINKS,
  EVENT_START,
  EVENT_END,
} from '@digital-www-pwa/utils';
import dayjs from 'dayjs';
import { EventCountdown, NavigationButton } from '@digital-www-pwa/components';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import RouterLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const EXTERNAL_LINKS = [
  {
    title: 'Survival Guide',
    url: 'http://lakesoffire.org/the-event/survival-guide',
  },
  {
    title: 'Volunteeripate',
    url: 'https://volunteer.lakesoffire.org/',
  },
  {
    title: 'Shouting Fire',
    url: 'https://shoutingfire.com/',
  },
  {
    title: 'Code of Conduct',
    url: 'http://lakesoffire.org/code-of-conduct',
  },
];

export function HomePage() {
  const theme = useTheme();
  const tinyScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid container spacing={2}>
      <Grid size={{ xxs: 12 }} display="flex" justifyContent="center">
        <img
          src="/logo.png"
          alt="Lakes of Fire 2025 - Doorways in Time"
          style={{ width: '100%', maxWidth: 320 }}
        />
      </Grid>
      <Grid
        padding={2}
        size={{ xxs: 12 }}
        sx={{
          color: 'white',
          background: 'linear-gradient(90deg, #eb3a52 0%, #e05855 100%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">
          {EVENT_START.format('MMMM D')} to{' '}
          {EVENT_END.format(tinyScreen ? 'MMMM D' : 'MMMM D YYYY')}
        </Typography>
        {dayjs().isBefore(EVENT_START) ? <EventCountdown /> : null}
      </Grid>
      {EXTERNAL_LINKS.map((linkData) => (
        <Grid key={linkData.url} size={{ xxs: 12, md: 6 }}>
          <Button
            component={MuiLink}
            href={linkData.url}
            target="_blank"
            rel="noreferrer"
            sx={{ width: '100%', height: '100%', padding: 2 }}
            variant="outlined"
            endIcon={<LaunchIcon />}
          >
            {linkData.title}
          </Button>
        </Grid>
      ))}
      <Divider sx={{ width: '100%' }} />
      {NAVIGATION_LINKS.map((linkData) => {
        const IconComponent = linkData.icon;
        return (
          <Grid key={linkData.path} size={{ xxs: 12, md: 6, lg: 4 }}>
            <Button
              component={RouterLink}
              href={linkData.path}
              sx={{ width: '100%', height: '100%', padding: 2 }}
              variant="contained"
              startIcon={<IconComponent />}
            >
              {linkData.title}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}
