'use client';
import { EVENT_START, EVENT_THEME } from '@digital-www-pwa/utils';
import { useTheme } from '@mui/material/styles';

export function HeadComponent() {
  const theme = useTheme();
  const year = EVENT_START.format('YYYY');
  return (
    <head>
      <title>{`Lakes of Fire ${year} - ${EVENT_THEME}`}</title>
      <link rel="icon" type="image/x-icon" href="favicon.ico" />
      <link rel="shortcut icon" href="favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="preload" as="image" href="/map.jpg" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta
        name="msapplication-TileColor"
        content={theme.palette.tertiary.main}
      />
      <meta name="theme-color" content={theme.palette.tertiary.main} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      <meta name="apple-mobile-web-app-title" content={`LoF ${year} WWW`} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content={`LoF ${year} WWW`} />
      <meta
        name="description"
        content={`Lakes of Fire ${year} Digital What When Where`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`LoF ${year} WWW`} />
      <meta
        property="og:description"
        content={`Lakes of Fire ${year} Digital What When Where`}
      />
      <meta property="og:site_name" content={`LoF ${year} WWW`} />
      <meta property="og:url" content={`https://${year}.lakesoffire.org`} />
      <meta
        property="og:image"
        content={`https://${year}.lakesoffire.org/apple-touch-icon.png`}
      />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <style type="text/css">
        {`
        @font-face {
          font-family: "Optimus Princeps";
          src:
            local("Optimus Princeps"),
            url("OptimusPrinceps.ttf") format("truetype");
        }
        @font-face {
          font-family: "Optimus Princeps Semi Bold";
          src:
            local("Optimus Princeps Semi Bold"),
            url("OptimusPrincepsSemiBold.ttf") format("truetype");
        }
      `}
      </style>
    </head>
  );
}

export default HeadComponent;
