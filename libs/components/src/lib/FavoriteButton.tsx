'use client';
import {
  useFavoriteEventTimeIds,
  useToggleFavoriteEventTime,
} from '@digital-www-pwa/providers';
import type { ParsedEventTime } from '@digital-www-pwa/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';

export function FavoriteButton({
  eventTime,
  variant = 'small',
  sx,
}: {
  eventTime: ParsedEventTime;
  variant?: string;
  sx?: object;
}) {
  const favoriteEventTimeIds = useFavoriteEventTimeIds();
  const toggleFavoriteEventTime = useToggleFavoriteEventTime();
  const isFavorite = favoriteEventTimeIds.has(eventTime?.event_time_id);

  function handleClick(e: React.MouseEvent) {
    toggleFavoriteEventTime(eventTime.event_time_id);
  }

  if (eventTime === null) {
    return <Skeleton variant="rectangular" width={78} height={36} />;
  }
  if (variant === 'large') {
    return (
      <Button
        variant="outlined"
        startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={handleClick}
        sx={{ margin: 2, ...sx }}
      >
        {isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
      </Button>
    );
  }
  return (
    <IconButton color="inherit" onClick={handleClick} sx={sx}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
