import type { TagItem } from '@digital-www-pwa/types';
import BrushIcon from '@mui/icons-material/Brush';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FestivalIcon from '@mui/icons-material/Festival';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MapIcon from '@mui/icons-material/Map';
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import PaletteIcon from '@mui/icons-material/Palette';
import RadioIcon from '@mui/icons-material/Radio';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

export const MAX_DESCRIPTION_LENGTH = 200;

export const NAVIGATION_LINKS = [
  {
    title: 'Map',
    path: '/map',
    icon: MapIcon,
  },
  {
    title: 'Events',
    path: '/events',
    icon: EventIcon,
  },
  {
    title: 'Favorites',
    path: '/favorites',
    icon: FavoriteIcon,
  },
  {
    title: 'Art',
    path: '/art',
    icon: PaletteIcon,
  },
  {
    title: 'Camps',
    path: '/camps',
    icon: FestivalIcon,
  },
  {
    title: 'Radio SGC',
    path: '/radio',
    icon: RadioIcon,
  },
  {
    title: 'Art Cars',
    path: '/vehicles',
    icon: DriveEtaIcon,
  },
];

export const EVENT_DAYS = [
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const EVENT_TIMEZONE = 'America/Detroit';

export enum Slugs {
  ALCOHOL = 'alcohol',
  CRAFTING = 'crafting',
  FIRE_ART = 'fire_art',
  FOOD = 'food',
  RED_LIGHT = 'red_light',
  SOBER = 'sober',
  SPECTACLE = 'spectacle',
}

export const TAGS: TagItem[] = [
  {
    slug: Slugs.ALCOHOL,
    name: 'Alcohol',
    icon: LocalBarIcon,
  },
  {
    slug: Slugs.CRAFTING,
    name: 'Crafting',
    icon: BrushIcon,
  },
  {
    slug: Slugs.FIRE_ART,
    name: 'Fire Art',
    icon: LocalFireDepartmentIcon,
  },
  {
    slug: Slugs.FOOD,
    name: 'Food',
    icon: LocalDiningIcon,
  },
  {
    slug: Slugs.RED_LIGHT,
    name: 'Red Light',
    icon: LightbulbIcon,
  },
  {
    slug: Slugs.SOBER,
    name: 'Sober',
    icon: NoDrinksIcon,
  },
  {
    slug: Slugs.SPECTACLE,
    name: 'Spectacle',
    icon: TheaterComedyIcon,
  },
];

export const MAP_LOCATION_ANCHORS = [
  {
    latitude: 43.51506239647294,
    longitude: -86.37410569015964,
    top: 4.4,
    left: 19.2,
  },
  {
    latitude: 43.511679315636805,
    longitude: -86.36456949817166,
    top: 43.8,
    left: 84.3,
  },
];

export const MAP_ACCURACY_SIZE_FACTOR = 0.30; // %/m

export const POSITION_STALE_TIME = 90; // seconds
