'use client';
import { Header } from '@digital-www-pwa/components';
import { useRadio } from '@digital-www-pwa/providers';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export function RadioItemPage({ id }: { id: string }) {
  const radio = useRadio(id);
  return (
    <>
      <Header>{!radio ? <Skeleton /> : radio.radio_dj_name}</Header>
      <Typography variant="h5">
        {!radio ? <Skeleton /> : radio.radio_time.format('dddd LT')}
      </Typography>
      <Typography variant="body1">
        {!radio
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : radio.radio_description}
      </Typography>
    </>
  );
}
