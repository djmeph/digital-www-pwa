'use client';
import {
  useFavoriteEventTimeIds,
  useToggleFavoriteEventTime,
} from '@digital-www-pwa/providers';
import type { ParsedEventTime } from '@digital-www-pwa/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

export function FavoriteButton({
  eventTime,
  variant = 'small',
}: {
  eventTime: ParsedEventTime;
  variant?: string;
}) {
  const favoriteEventTimeIds = useFavoriteEventTimeIds();
  const toggleFavoriteEventTime = useToggleFavoriteEventTime();
  const isFavorite = favoriteEventTimeIds.has(eventTime?.event_time_id);

  function handleClick() {
    toggleFavoriteEventTime(eventTime.event_time_id);
  }

  if (eventTime === null) {
    return <Skeleton variant="rectangular" width={78} height={36} />;
  }
  if (variant === 'small') {
    return (
      <Button
        variant="outlined"
        endIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={handleClick}
      >
        {eventTime.event.heart_count + (isFavorite ? 1 : 0)}
      </Button>
    );
  }
  if (variant === 'large') {
    return (
      <Button
        variant="outlined"
        startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={handleClick}
        sx={{ margin: 2 }}
      >
        {isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
      </Button>
    );
  }
}
