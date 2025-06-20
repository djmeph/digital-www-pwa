'use client';
import { EventCountdown, NavigationButton } from '@digital-www-pwa/components';
import {
  NAVIGATION_LINKS,
  EVENT_START,
  EVENT_END,
} from '@digital-www-pwa/utils';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

const DIRECTIONS_URL =
  'https://maps.google.com/maps/dir//Lucky+Lake+Campground+%26+Outdoor+Center+MAIL+ADDRESS:+3977+W.+Wilke+Rd+GPS:+3280+Winston+Rd.+Rothbury+49432+GPS:+3474+W.+Winston+Rd,+Rothbury+49452+Montague,+MI+49437/';

const EXTERNAL_LINKS = [
  {
    title: 'Directions',
    url: DIRECTIONS_URL,
  },
  {
    title: 'Gate Hours',
    url: 'https://lakesoffire.org/departments/gate/',
  },
  {
    title: 'Exodus',
    url: 'https://lakesoffire.org/the-event/survival-guide/#:~:text=EXODUS,-All',
  },
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

  return (
    <Grid container spacing={2} sx={{ paddingBottom: theme.spacing(16) }}>
      <Grid size={{ xxs: 12 }} display="flex" justifyContent="center">
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
          }}
        >
          <Stack>
            <Box sx={{ color: 'highlight.main', fontSize: '1.8rem' }}>
              Lakes of Fire Presents
            </Box>
            <Box
              sx={{
                color: 'primary.main',
                fontSize: '4.5rem',
                filter: 'drop-shadow(4px 4px 4px black)',
              }}
            >
              Doorways in Time
            </Box>
            <MuiLink sx={{ fontSize: '1.8rem' }} href={DIRECTIONS_URL}>
              Lucky Lake Campground
            </MuiLink>
          </Stack>
        </Typography>
      </Grid>
      <Grid
        padding={2}
        size={{ xxs: 12 }}
        sx={{
          textAlign: 'center',
        }}
      >
        <Stack
          direction={{ xxs: 'column', md: 'row' }}
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          {dayjs().isBefore(EVENT_START) ? <EventCountdown /> : null}
          <Typography variant="h2">
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                textAlign: 'center',
                color: 'highlight.main',
              }}
            >
              <Box sx={{ fontSize: '1.7em' }}>{EVENT_START.format('MMMM')}</Box>
              <Stack
                direction="column"
                alignItems="center"
                sx={{ fontSize: '1.2em' }}
              >
                <Box sx={{ display: 'flex', marginBottom: '-1rem' }}>
                  {EVENT_START.format('D')}-{EVENT_END.format('D')}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    letterSpacing: '0.25rem',
                    marginRight: '-0.25rem',
                  }}
                >
                  {EVENT_START.format('YYYY')}
                </Box>
              </Stack>
            </Stack>
          </Typography>
        </Stack>
      </Grid>
      {NAVIGATION_LINKS.map((linkData) => {
        if (
          linkData.path === '/now' &&
          !dayjs().isBetween(EVENT_START, EVENT_END)
        ) {
          return null;
        }
        return (
          <Grid key={linkData.path} size={{ xxs: 12, sm: 6, md: 4 }}>
            <NavigationButton linkData={linkData} />
          </Grid>
        );
      })}
      <Grid size={{ xxs: 12 }}></Grid>
      {EXTERNAL_LINKS.map((linkData) => (
        <Grid key={linkData.url} size={{ xxs: 12, sm: 6 }}>
          <Button
            component={MuiLink}
            href={linkData.url}
            target="_blank"
            rel="noreferrer"
            color="primary"
          >
            {linkData.title}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
