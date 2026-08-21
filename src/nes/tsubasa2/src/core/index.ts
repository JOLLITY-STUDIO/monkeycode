import Browser from "./browser/index";
import Controller from "./controller";
import GameGenie from "./gamegenie";
import NES from "./nes";
import { RamStore, createRamStore } from "./ram";
import { NES_WIDTH, NES_HEIGHT, TILE_PX, NT_COLS, NT_ROWS } from "./types";

export { Browser, Controller, GameGenie, NES, RamStore, createRamStore };
export { NES_WIDTH, NES_HEIGHT, TILE_PX, NT_COLS, NT_ROWS };

// 小程序版主板外壳 (借鉴 browser, 适配微信小程序 Canvas/触摸/音频)
export { default as BrowserMini } from './browser-mini';
export {
  BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START,
  BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT,
} from './browser-mini';
export type { ButtonId, BrowserMiniOptions, GameInstance } from './browser-mini';
