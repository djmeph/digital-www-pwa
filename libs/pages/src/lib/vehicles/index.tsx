'use client';
import { Header, VehicleCard } from '@digital-www-pwa/components';
import { useVehicles } from '@digital-www-pwa/providers';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import { useMemo } from 'react';

export function VehiclesPage() {
  const vehicles = useVehicles();
  const sortedVehicles = useMemo(
    () =>
      vehicles &&
      Object.values(vehicles).toSorted((a, b) =>
        a.title.localeCompare(b.title)
      ),
    [vehicles]
  );

  function renderVehicles() {
    if (!sortedVehicles) {
      return Array(12)
        .fill(null)
        .map((_, index) => (
          <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
            <Skeleton variant="rectangular" width="100%" height={240} />
          </Grid>
        ));
    }
    return sortedVehicles.map((vehicle) => (
      <VehicleCard key={vehicle.id} vehicle={vehicle} />
    ));
  }

  return (
    <>
      <Header>Art Cars</Header>
      <Grid container spacing={2} padding={2}>
        {renderVehicles()}
      </Grid>
    </>
  );
}
