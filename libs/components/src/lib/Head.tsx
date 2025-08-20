'use client';
import { useTheme } from '@mui/material/styles';

export function HeadComponent() {
  const theme = useTheme();
  return (
    <head>
      <title>Lakes of Fire 2025 - Doorways in Time</title>
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
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="preload" as="image" href="/map.jpg" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="msapplication-TileColor" content={theme.palette.sky.main} />
      <meta name="theme-color" content={theme.palette.sky.main} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      <meta name="apple-mobile-web-app-title" content="LoF 2025 WWW" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="LoF 2025 WWW" />
      <meta
        name="description"
        content="Lakes of Fire 2025 Digital What When Where"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="LoF 2025 WWW" />
      <meta
        property="og:description"
        content="Lakes of Fire 2025 Digital What When Where"
      />
      <meta property="og:site_name" content="LoF 2025 WWW" />
      <meta property="og:url" content="https://2025.lakesoffire.org" />
      <meta
        property="og:image"
        content="https://2025.lakesoffire.org/apple-touch-icon.png"
      />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
    </head>
  );
}

export default HeadComponent;
