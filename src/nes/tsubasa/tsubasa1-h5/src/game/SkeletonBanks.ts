/**
 * 天使之翼1 — 骨架Bank模块 (最小可用实现)
 * 
 * 这些骨架Bank让游戏能跑通基本流程:
 *   State 0 (Opening) → State 1 (Title) → State 2 (Menu) → State 3 (Match Init) → ...
 * 
 * 每个Bank只实现最小逻辑，后续会被完整实现替换。
 */

import { DataStore } from '../data/DataStore';
import { BankModule } from '../core/BankDispatcher';
import { StateMachine } from '../core/StateMachine';
import { GameState } from '../core/types';

// ==================== Bank 1: 骨架开场动画 ====================

export class SkeletonBank1 implements BankModule {
  readonly bankId: number = 1;
  private ds: DataStore;
  private sm: StateMachine;
  private _subState: number = 0;
  private _timer: number = 0;

  constructor(ds: DataStore, sm: StateMachine) {
    this.ds = ds;
    this.sm = sm;
  }

  init(): void {
    console.log('[SkeletonBank1] 开场动画初始化');
    this._subState = 0;
    this._timer = 0;

    // 设置CHR Bank: 开场动画使用 CHR 04+06
    // (Bank 1 RLE数据在 $C000-$DFFF, CHR来自 Bank 04/06)
    this.ds.currentChrBank0 = 4;
    this.ds.currentChrBank1 = 6;
    this.ds.chrBank0 = 4;
    this.ds.chrBank1 = 6;

    // 加载默认调色板 (NES标准调色板)
    this._loadDefaultPalette();

    // 写入"天使之翼"标题到 nametable
    this._writeTitleToNametable();
  }

  callSub(subId: number): void {
    // 渐进式子状态
    this._timer++;

    switch (this._subState) {
      case 0: // 显示标题画面
        if (this._timer > 180) { // 3秒后自动进入下一状态
          this._subState = 1;
          this._timer = 0;
        }
        break;
      case 1: // 过渡
        if (this._timer > 60) {
          // 切换到标题状态
          this.ds.currentChrBank0 = 0;
          this.ds.currentChrBank1 = 0;
          this.sm.transitionTo(GameState.TITLE);
          console.log('[SkeletonBank1] → 切换到标题画面');
        }
        break;
    }
  }

  /** 加载默认NES调色板 */
  private _loadDefaultPalette(): void {
    // NES标准背景调色板 (灰度→蓝→紫→红)
    const bgPalette = [
      0x0F, 0x00, 0x10, 0x30,  // 背景调色板0
      0x0F, 0x06, 0x16, 0x26,  // 背景调色板1
      0x0F, 0x09, 0x19, 0x29,  // 背景调色板2
      0x0F, 0x0A, 0x1A, 0x2A,  // 背景调色板3
    ];
    // 精灵调色板
    const sprPalette = [
      0x0F, 0x0F, 0x11, 0x31,  // 精灵调色板0
      0x0F, 0x16, 0x27, 0x37,  // 精灵调色板1
      0x0F, 0x18, 0x28, 0x38,  // 精灵调色板2
      0x0F, 0x1A, 0x2A, 0x3A,  // 精灵调色板3
    ];

    for (let i = 0; i < 16; i++) {
      this.ds.paletteRam[i] = bgPalette[i];
      this.ds.paletteRam[i + 16] = sprPalette[i];
    }
  }

  /** 写入简单的标题tile到nametable (使用Bank 4的CHR tile) */
  private _writeTitleToNametable(): void {
    const nt = this.ds.nametable0;

    // 用前几个tile填充nametable (可以看到的图案)
    // Bank 4 CHR的前几个tile应该包含字体/图形
    const startRow = 10;
    const startCol = 4;
    const titleTiles = [
      0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
      0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
    ];

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < titleTiles.length; c++) {
        const row = startRow + r;
        const col = startCol + c;
        const idx = row * 32 + col;
        if (idx < 960) {
          nt[idx] = titleTiles[c];
        }
      }
    }

    // 设置属性表 (使调色板生效)
    this._fillAttributeTable(nt, startRow, startCol, 4, titleTiles.length, 0);
  }

  /** 填充属性表 (每2×2 tiles一个属性字节) */
  private _fillAttributeTable(nt: Uint8Array, startRow: number, startCol: number, rows: number, cols: number, paletteId: number): void {
    const attrBase = 960; // 属性表从960开始
    for (let r = startRow >> 1; r < (startRow + rows + 1) >> 1; r++) {
      for (let c = startCol >> 1; c < (startCol + cols + 1) >> 1; c++) {
        const attrIdx = attrBase + r * 8 + c;
        if (attrIdx < 1024) {
          // 每个属性字节覆盖2×2 tile网格
          // 设置所有4个象限使用相同调色板
          nt[attrIdx] = paletteId | (paletteId << 2) | (paletteId << 4) | (paletteId << 6);
        }
      }
    }
  }
}


// ==================== Bank 5: 骨架标题画面 ====================

export class SkeletonBank5 implements BankModule {
  readonly bankId: number = 5;
  private ds: DataStore;
  private sm: StateMachine;
  private _subState: number = 0;
  private _timer: number = 0;

  constructor(ds: DataStore, sm: StateMachine) {
    this.ds = ds;
    this.sm = sm;
  }

  init(): void {
    console.log('[SkeletonBank5] 标题画面初始化');
    this._subState = 0;
    this._timer = 0;

    // 设置CHR Bank
    this.ds.currentChrBank0 = 0;
    this.ds.currentChrBank1 = 0;

    // 写入标题画面nametable数据
    this._writeTitleScreen();
  }

  callSub(subId: number): void {
    this._timer++;

    // 检测按键或自动超时 → 进入菜单
    const isAuto = this._timer > 120; // 2秒自动
    const startPressed = (this.ds.joy1Edge & 0x10) !== 0; // START键

    if (isAuto || startPressed) {
      this.sm.transitionTo(GameState.MENU);
      console.log('[SkeletonBank5] → 切换到菜单画面');
    }
  }

  private _writeTitleScreen(): void {
    // 简单的标题nametable (使用Bank 0 CHR数据)
    const nt = this.ds.nametable0;
    nt.fill(0);

    // 顶部显示简单文字tile
    for (let r = 5; r < 15; r++) {
      for (let c = 2; c < 30; c++) {
        nt[r * 32 + c] = (r + c) & 0xFF;
      }
    }

    // 设置属性
    for (let i = 960; i < 1024; i++) {
      nt[i] = 0x55; // 交替调色板0和1
    }
  }
}


// ==================== Bank 6: 骨架菜单画面 ====================

export class SkeletonBank6 implements BankModule {
  readonly bankId: number = 6;
  private ds: DataStore;
  private sm: StateMachine;
  private _subState: number = 0;
  private _timer: number = 0;

  constructor(ds: DataStore, sm: StateMachine) {
    this.ds = ds;
    this.sm = sm;
  }

  init(): void {
    console.log('[SkeletonBank6] 菜单画面初始化');
    this._subState = 0;
    this._timer = 0;

    // 写入菜单nametable
    this._writeMenuScreen();
  }

  callSub(subId: number): void {
    this._timer++;

    // 根据subId执行不同逻辑
    switch (subId) {
      case 0: // 菜单主逻辑
        this._menuMain();
        break;
      case 1: // 结果画面
        this._resultScreen();
        break;
      case 3: // 事件画面
        this._eventScreen();
        break;
    }
  }

  private _menuMain(): void {
    // 自动选择 → 进入比赛初始化
    if (this._timer > 120) {
      this.sm.transitionTo(GameState.MATCH_INIT);
      console.log('[SkeletonBank6] → 切换到比赛初始化');
    }
  }

  private _resultScreen(): void {
    // 结果画面: 显示比分后回菜单
    if (this._timer > 180) {
      this.sm.transitionTo(GameState.MENU);
      console.log('[SkeletonBank6] → 回菜单');
    }
  }

  private _eventScreen(): void {
    // 事件画面: 进球/半场提示
    if (this._timer > 120) {
      // 回到比赛或结果
      if (this.ds.matchPhase >= 7) {
        this.sm.transitionTo(GameState.RESULT);
      } else {
        this.sm.transitionTo(GameState.MATCH_LOOP);
      }
      console.log('[SkeletonBank6] → 事件结束');
    }
  }

  private _writeMenuScreen(): void {
    const nt = this.ds.nametable0;
    nt.fill(0);

    // 简单菜单显示
    for (let r = 3; r < 20; r++) {
      for (let c = 4; c < 28; c++) {
        nt[r * 32 + c] = ((r * 3 + c) & 0x3F) + 0x10;
      }
    }

    for (let i = 960; i < 1024; i++) {
      nt[i] = 0xAA;
    }
  }
}
