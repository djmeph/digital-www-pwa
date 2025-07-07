import type { TagItem } from '@digital-www-pwa/types';
import BrushIcon from '@mui/icons-material/Brush';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CampaignIcon from '@mui/icons-material/Campaign';
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
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

export const EVENT_TIMEZONE = 'America/Detroit';
dayjs.tz.setDefault(EVENT_TIMEZONE);

export const EVENT_START = dayjs('2025-07-16 10:00:00').tz(
  EVENT_TIMEZONE,
  true
);
export const EVENT_END = dayjs('2025-07-20 15:00:00').tz(EVENT_TIMEZONE, true);

export const MAX_DESCRIPTION_LENGTH = 200;

export const NAVIGATION_LINKS = [
  {
    title: 'Map',
    path: '/map',
    icon: MapIcon,
  },
  {
    title: 'Happening Now',
    path: '/now',
    icon: CampaignIcon,
  },
  {
    title: 'Favorites',
    path: '/favorites',
    icon: FavoriteIcon,
  },
  {
    title: 'Events',
    path: '/events',
    icon: EventIcon,
  },
  {
    title: 'Upcoming Shifts',
    path: '/volunteer-shifts',
    icon: CalendarTodayIcon,
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
].filter((link) => link !== null);

export const EVENT_DAYS = [
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

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
    latitude: 43.515061171038205,
    longitude: -86.37413487956199,
    top: 7.3,
    left: 33.8,
  },
  {
    latitude: 43.511668744771534,
    longitude: -86.36454573371167,
    top: 48.1,
    left: 97.5,
  },
  {
    latitude: 43.51016474989722,
    longitude: -86.37131958549168,
    top: 62.7,
    left: 50.9,
  },
  {
    latitude: 43.51445245675199,
    longitude: -86.36982846092604,
    top: 13.8,
    left: 61.5,
  },
];

export const MAP_ACCURACY_SIZE_FACTOR = 0.3; // %/m

export const POSITION_STALE_TIME = 90; // seconds
