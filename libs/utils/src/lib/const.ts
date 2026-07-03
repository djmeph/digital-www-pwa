import type { TagItem } from '@digital-www-pwa/types';
import BrushIcon from '@mui/icons-material/Brush';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChildCareIcon from '@mui/icons-material/ChildCare';
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

export const EVENT_START = dayjs('2026-07-15 10:00:00').tz(
  EVENT_TIMEZONE,
  true
);
export const EVENT_END = dayjs('2026-07-19 15:00:00').tz(EVENT_TIMEZONE, true);

export const MAX_DESCRIPTION_LENGTH = 200;
export const EVENT_THEME = 'Grand Masquerade';

export const NAVIGATION_LINKS = [
  /*
  {
    title: 'Map',
    path: '/map',
    icon: MapIcon,
  },
  */
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
  /*
  {
    title: 'Art',
    path: '/art',
    icon: PaletteIcon,
  },
  */
  {
    title: 'Camps',
    path: '/camps',
    icon: FestivalIcon,
  },
  /*
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
  */
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
  KID_FRIENDLY = 'kid_friendly',
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
  {
    slug: Slugs.KID_FRIENDLY,
    name: 'Kid Friendly',
    icon: ChildCareIcon,
  },
];

export const MAP_LOCATION_ANCHORS = [
  {
    latitude: 44.07494731468901,
    longitude: -85.72300670119047,
    top: 0,
    left: 0,
  },
  {
    latitude: 44.07068383660502,
    longitude: -85.71272873581458,
    top: 100,
    left: 100,
  },
];

export const MAP_ACCURACY_SIZE_FACTOR = 0.3; // %/m

export const POSITION_STALE_TIME = 90; // seconds
