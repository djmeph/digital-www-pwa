'use client';
import { Header } from '@digital-www-pwa/components';
import { useCamp } from '@digital-www-pwa/providers';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export function CampsItemPage({ id }: { id: string }) {
  const camp = useCamp(id);
  return (
    <>
      <Header>{camp === null ? <Skeleton /> : camp.name}</Header>
      <Typography variant="h5">
        {camp === null ? (
          <Skeleton />
        ) : (
          `${camp.neighborhood} - Site ${camp.site}`
        )}
      </Typography>
      <Typography variant="body1">
        {camp === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : camp.description}
      </Typography>
    </>
  );
}
