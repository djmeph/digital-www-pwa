'use client';
import { Header } from '@digital-www-pwa/components';
import { useArt } from '@digital-www-pwa/providers';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export function ArtItemPage({ id }: { id: string }) {
  const art = useArt(id);

  return (
    <>
      <Header>{art === null ? <Skeleton /> : art.title}</Header>
      <Typography variant="h5">
        {art === null ? <Skeleton /> : art.artist}
      </Typography>
      <Typography variant="body1">
        {art === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : art.description}
      </Typography>
    </>
  );
}
