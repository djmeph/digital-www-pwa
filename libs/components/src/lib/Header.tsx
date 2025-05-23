'use client';
import Stack from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface HeaderProps extends TypographyProps {
  children: React.ReactNode;
  button?: React.ReactNode;
}

export function Header({ children, button, ...props }: HeaderProps) {
  return (
    <Stack direction="row">
      <Typography
        variant="h1"
        sx={{
          flexGrow: 1,
          '@media print': {
            display: 'none',
          },
        }}
        component="span"
        {...props}
      >
        {children}
      </Typography>
      <Stack justifyContent="center">{button}</Stack>
    </Stack>
  );
}
