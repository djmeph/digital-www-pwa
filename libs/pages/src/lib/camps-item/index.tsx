'use client';
import { Header } from '@digital-www-pwa/components';
import { EventsView } from '@digital-www-pwa/components';
import { useCamp } from '@digital-www-pwa/providers';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router';

export function CampsItemPage() {
  const { id } = useParams();
  const camp = useCamp(id);

  const renderCampEvents = () => {
    if (!camp?.event_count) {
      return null;
    }

    return <EventsView whereType="camp" whereName={camp.name} />;
  };

  return (
    <>
      <Header>{camp === null ? <Skeleton /> : camp.name}</Header>
      <Typography variant="h5">
        {camp === null ? <Skeleton /> : camp.location_name}
      </Typography>
      <Typography variant="body1">
        {camp === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : renderCampEvents()}
      </Typography>
    </>
  );
}
