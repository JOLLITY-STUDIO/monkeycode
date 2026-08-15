// title 资源索引

import { BG_TITLE_T_TILES, BG_TITLE_T_MAP } from './bg_title_t';
import { BG_TITLE_V_TILES, BG_TITLE_V_MAP } from './bg_title_v';
import { SUCCES_TILES, SUCCES_MAP } from './succes';
import { CONCEPTIS_TILES, CONCEPTIS_MAP } from './conceptis';
import { BUTTON_TITLE_OFF_TILES } from './button_title_off';
import { BTN_DOWN_TILES } from './btn_down';
import { BTN_XTOKILL_TILES } from './btn_xtokill';
import { BUTTON_SELECT_TILES } from './button_select';
import { BG_TITLE_PAL, BUTTON_TITLE_PAL, BUTTON_PAL, AUTOSAVE_PAL, AXSS_PAL, BESTTIME_PAL, BTN_DOWN_PAL, BTN_XTOKILL_PAL, SUCCESS_PAL } from './palettes';

export const TITLE_BG = { map: BG_TITLE_T_MAP, tiles: BG_TITLE_T_TILES, pal: BG_TITLE_PAL };
export const TITLE_BG_V = { map: BG_TITLE_V_MAP, tiles: BG_TITLE_V_TILES, pal: BG_TITLE_PAL };
export const TITLE_LOGO_SUCCES = { map: SUCCES_MAP, tiles: SUCCES_TILES, pal: SUCCESS_PAL };
export const TITLE_LOGO_CONCEPTIS = { map: CONCEPTIS_MAP, tiles: CONCEPTIS_TILES, pal: SUCCESS_PAL };
export const TITLE_BTN_START = { tiles: BUTTON_TITLE_OFF_TILES, pal: BUTTON_TITLE_PAL };
export const TITLE_BTN_DOWN = { tiles: BTN_DOWN_TILES, pal: BTN_DOWN_PAL };
export const TITLE_BTN_XTOKILL = { tiles: BTN_XTOKILL_TILES, pal: BTN_XTOKILL_PAL };
export const TITLE_BTN_SELECT = { tiles: BUTTON_SELECT_TILES, pal: BUTTON_TITLE_PAL };