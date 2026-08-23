/** 天使之翼2 — 对外入口: core(模拟器) + game(ROM 定义) */
// 小程序编译器对 `export { X } from '...'` re-export 支持有限,
// 改为先 import 再 export, 确保模块注册正确

import { NES_WIDTH, NES_HEIGHT, TILE_PX, NT_COLS, NT_ROWS } from './core/types';
import BrowserMini from './core/browser-mini/index';
import InputMini from './core/browser-mini/input';
import {
  BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START,
  BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT,
} from './core/browser-mini/input';
import type { BrowserMiniOptions, ButtonId } from './core/browser-mini/index';
import { Tsubasa2 } from './game/index';

export {
  NES_WIDTH, NES_HEIGHT, TILE_PX, NT_COLS, NT_ROWS,
  BrowserMini, InputMini,
  BUTTON_A, BUTTON_B, BUTTON_SELECT, BUTTON_START,
  BUTTON_UP, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT,
};
export type { BrowserMiniOptions, ButtonId };

// 组合根 (主类): index 就是主板, page 只启动模拟器
export { Tsubasa2 };
