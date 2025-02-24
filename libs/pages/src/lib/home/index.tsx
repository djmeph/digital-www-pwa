'use client';
import { Header } from '@digital-www-pwa/components';
import { NAVIGATION_LINKS } from '@digital-www-pwa/utils';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import RouterLink from 'next/link';

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
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Header align="center">Welcome Home!</Header>
      </Grid>
      {EXTERNAL_LINKS.map((linkData) => (
        <Grid key={linkData.url} size={{ xs: 12, md: 6 }}>
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
          <Grid key={linkData.path} size={{ xs: 12, md: 6, lg: 4 }}>
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
