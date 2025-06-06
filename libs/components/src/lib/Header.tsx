'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface HeaderProps extends TypographyProps {
  children: React.ReactNode;
  button?: React.ReactNode;
}

export function Header({ children, button, ...props }: HeaderProps) {
  const isLongHeading = typeof children === 'string' && children.length > 25;
  return (
    <Stack direction="row">
      <Typography
        variant="h2"
        sx={{
          flexGrow: 1,
          '@media print': {
            display: 'none',
          },
        }}
        component="span"
        {...props}
      >
        <Box
          sx={{
            fontSize: isLongHeading ? '50%' : 'inherit',
          }}
        >
          {children}
        </Box>
      </Typography>
      <Stack justifyContent="center">{button}</Stack>
    </Stack>
  );
}
