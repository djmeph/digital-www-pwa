'use client';
import { Header } from '@digital-www-pwa/components';
import { useArt, useLocation } from '@digital-www-pwa/providers';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export function ArtItemPage({ id }: { id: string }) {
  const art = useArt(id);
  const location = useLocation(art?.location);

  function renderFunding() {
    if (art === null) {
      return null;
    }

    if (art.type === 'honoraria') {
      return `Funded ${art.funded} - Honoraria`;
    }

    if (art.type === 'grant') {
      return `Funded ${art.funded} - Grant`;
    }

    return null;
  }

  return (
    <>
      <Header>{art === null ? <Skeleton /> : art.title}</Header>
      <Typography variant="h5">
        {art === null ? <Skeleton /> : `By ${art.artist}`}
      </Typography>
      <Typography variant="h6">
        {art === null ? <Skeleton /> : location ? `Site ${location.name}` : ''}
      </Typography>
      <Typography variant="body1">
        {art === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : art.description}
      </Typography>
      <Typography variant="body2" padding={1}>
        {renderFunding()}
      </Typography>
    </>
  );
}
