import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface TagItem {
  slug:
    | 'alcohol'
    | 'crafting'
    | 'fire_art'
    | 'food'
    | 'red_light'
    | 'sober'
    | 'spectacle';
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
}
