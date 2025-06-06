'use client';
import type { ProcessedShift } from '@digital-www-pwa/types';
import { MAX_DESCRIPTION_LENGTH } from '@digital-www-pwa/utils';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export function ShiftCard({ shift }: { shift: ProcessedShift }) {
  return (
    <Grid size={{ xxs: 12, md: 6, lg: 4 }}>
      <Card>
        <CardActionArea component={Link} href={`/shift/${shift.id}`}>
          <CardHeader
            title={shift.shift_title}
            subheader={`${shift.shift_start.format(
              'dddd LT'
            )} - ${shift.shift_end.format('LT')}`}
          />
          <CardContent>
            <Typography variant="subtitle2">
              {shift.department_title}
            </Typography>
            <Divider variant="middle" />
            <Typography variant="subtitle1">
              {shift.shift_description.length > MAX_DESCRIPTION_LENGTH
                ? `${shift.shift_description.substring(
                    0,
                    MAX_DESCRIPTION_LENGTH
                  )}…`
                : shift.shift_description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
