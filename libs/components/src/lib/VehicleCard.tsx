'use client';
import type { VehicleItem } from '@digital-www-pwa/types';
import { MAX_DESCRIPTION_LENGTH } from '@digital-www-pwa/utils';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export function VehicleCard({ vehicle }: { vehicle: VehicleItem }) {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <ButtonBase component={Link} href={`/vehicles/${vehicle.id}`}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">{vehicle.title}</Typography>
          <Typography variant="subtitle1">
            {vehicle.description.length > MAX_DESCRIPTION_LENGTH
              ? `${vehicle.description.substring(0, MAX_DESCRIPTION_LENGTH)}…`
              : vehicle.description}
          </Typography>
        </Paper>
      </ButtonBase>
    </Grid>
  );
}
