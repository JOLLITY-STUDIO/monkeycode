/**
 * Boot & Main Menu Service
 *
 * Bank 00 (PRG $8000-$9FFF, SWITCHABLE)
 * 功能: 系统初始化 & 标题/菜单主循环
 *
 * - RESET 入口 → RAM/VRAM 清零 → MMC3 初始化
 * - 标题画面循环（等待 START）
 * - 主菜单（新游戏/继续/密码）
 * - 通过 $9FA8 切换 PRG bank 到其他服务
 */

import { DataStore } from '../data/DataStore';
import { PlayerPosition } from '../model/types';

export class BootService {
  /** 当前选中的菜单项 */
  private _menuCursor = 0;

  constructor(private _store: DataStore) {}

  // ── 主入口 ──

  /** 每帧被外部驱动 */
  update(buttons: number, _frameCount: number): void {
    // TODO: 翻译 Bank 00 标题/菜单逻辑
    // 1. 初始化阶段: 清 RAM/VRAM → 加载调色板 → 加载 CHR
    // 2. 标题画面: 等待 START 按键
    // 3. 主菜单: 上下选择 → START 确认
    // 4. bank 切换: 跳转到 Bank 01/02 等
  }

  // ── 菜单相关 ──

  get menuCursor(): number { return this._menuCursor; }
  set menuCursor(v: number) { this._menuCursor = v; }
}
