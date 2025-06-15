'use client';
import { Header } from '@digital-www-pwa/components';
import { useVehicle } from '@digital-www-pwa/providers';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router';

export function VehiclesItemPage() {
  const { id } = useParams();
  const vehicle = useVehicle(id);
  return (
    <>
      <Header>{vehicle === null ? <Skeleton /> : vehicle.title}</Header>
      <Typography variant="body1">
        {vehicle === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : vehicle.description}
      </Typography>
    </>
  );
}
