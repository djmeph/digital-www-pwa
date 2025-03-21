import type { Slugs } from '@digital-www-pwa/utils';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

export interface TagItem {
  slug: Slugs;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
}

export type AllowedSlugs =
  | Slugs.ALCOHOL
  | Slugs.CRAFTING
  | Slugs.FIRE_ART
  | Slugs.FOOD
  | Slugs.RED_LIGHT
  | Slugs.SOBER
  | Slugs.SPECTACLE;

export type SlugFilters = {
  [key in AllowedSlugs]: boolean;
};
