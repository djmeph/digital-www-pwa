'use client';
import type { VehicleItem } from '@digital-www-pwa/types';
import { MAX_DESCRIPTION_LENGTH } from '@digital-www-pwa/utils';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export function VehicleCard({ vehicle }: { vehicle: VehicleItem }) {
  return (
    <Grid size={{ xxs: 12, md: 6, lg: 4 }}>
      <ButtonBase component={Link} href={`/vehicles/${vehicle.id}`}>
        <Card>
          <CardActionArea>
            <CardHeader title={vehicle.title} />
            <CardContent>
              <Typography variant="subtitle1">
                {vehicle.description.length > MAX_DESCRIPTION_LENGTH
                  ? `${vehicle.description.substring(
                      0,
                      MAX_DESCRIPTION_LENGTH
                    )}…`
                  : vehicle.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </ButtonBase>
    </Grid>
  );
}
