'use client';
import { Header } from '@digital-www-pwa/components';
import { EventsView } from '@digital-www-pwa/components';
import { useCamp } from '@digital-www-pwa/providers';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export function CampsItemPage({ id }: { id: string }) {
  const camp = useCamp(id);

  const renderCampEvents = () => {
    if (!camp?.event_count) {
      return null;
    }

    return <EventsView whereType="camp" whereName={camp.name} />;
  };

  return (
    <>
      <Header>{!camp ? <Skeleton /> : camp.name}</Header>
      <Typography variant="h5" color="highlight">
        {!camp ? <Skeleton /> : camp.location_name}
      </Typography>
      <Typography
        variant="body1"
        sx={{ paddingBottom: (theme) => theme.spacing(3) }}
      >
        {!camp ? <Skeleton /> : camp.description}
      </Typography>
      {!camp
        ? Array(4)
            .fill(null)
            .map((_, index) => <Skeleton key={index} />)
        : renderCampEvents()}
    </>
  );
}
