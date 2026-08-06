/**
 * 天使之翼1 — 菜单画面 (Bank 6, Sub 0)
 * 
 * 对应原始: Bank 6 Sub 0 ($C00C)
 * 
 * 菜单流程:
 *   - 显示队伍选择/比赛选项
 *   - 等待用户选择
 *   - 转换到比赛初始化 (State 3)
 *   - 后续: Sub 1=结果画面, Sub 3=进球/半场事件
 */
import { DataStore } from '../../data/DataStore';
import { BankModule } from '../../core/BankDispatcher';
import { StateMachine } from '../../core/StateMachine';
import { GameState } from '../../core/types';
import { getRomReader } from '../../data/RomReader';

/** 菜单子状态 */
enum MenuSubState {
  INIT = 0,
  MAIN_MENU = 1,
  TEAM_SELECT = 2,
  CONFIRM = 3,
  EXIT = 4,
}

/** 菜单项 */
enum MenuItem {
  NEW_GAME = 0,
  PASSWORD = 1,
}

export class MenuScene implements BankModule {
  readonly bankId: number = 6;
  
  private ds: DataStore;
  private sm: StateMachine;
  private _subState: MenuSubState = MenuSubState.INIT;
  private _menuSelection: MenuItem = MenuItem.NEW_GAME;
  private _timer: number = 0;
  private _blinkTimer: number = 0;

  constructor(ds: DataStore, sm: StateMachine) {
    this.ds = ds;
    this.sm = sm;
  }

  init(): void {
    console.log('[MenuScene] 菜单画面初始化');
    this._subState = MenuSubState.INIT;
    this._menuSelection = MenuItem.NEW_GAME;
    this._timer = 0;
    this._blinkTimer = 0;
    
    // 设置菜单CHR Banks
    this.ds.currentChrBank0 = 0;
    this.ds.currentChrBank1 = 0;
    this.ds.chrBank0 = 0;
    this.ds.chrBank1 = 0;
    
    this._loadMenuPalette();
    this._drawMenu();
    
    this._subState = MenuSubState.MAIN_MENU;
  }

  callSub(subId: number): void {
    this._timer++;
    this._blinkTimer++;
    
    // 根据subId分发到不同功能
    switch (subId) {
      case 0: // Sub 0: 菜单主逻辑
        this._menuMain();
        break;
      case 1: // Sub 1: 结果画面
        this._resultScreen();
        break;
      case 3: // Sub 3: 进球/半场事件
        this._eventScreen();
        break;
      default:
        this._menuMain();
    }
  }

  // ==================== 菜单主逻辑 ====================

  private _menuMain(): void {
    switch (this._subState) {
      case MenuSubState.MAIN_MENU:
        this._handleMainMenu();
        break;
      case MenuSubState.TEAM_SELECT:
        this._handleTeamSelect();
        break;
      case MenuSubState.CONFIRM:
        this._handleConfirm();
        break;
      case MenuSubState.EXIT:
        this._doExit();
        break;
    }
  }

  private _handleMainMenu(): void {
    // 处理菜单选择
    const upPressed = (this.ds.joy1Edge & 0x08) !== 0;
    const downPressed = (this.ds.joy1Edge & 0x04) !== 0;
    const aPressed = (this.ds.joy1Edge & 0x80) !== 0;
    const startPressed = (this.ds.joy1Edge & 0x10) !== 0;
    
    if (upPressed || downPressed) {
      this._menuSelection = this._menuSelection === MenuItem.NEW_GAME 
        ? MenuItem.PASSWORD : MenuItem.NEW_GAME;
      this._updateMenuCursor();
    }
    
    if (aPressed || startPressed) {
      switch (this._menuSelection) {
        case MenuItem.NEW_GAME:
          this._subState = MenuSubState.TEAM_SELECT;
          this._drawTeamSelect();
          break;
        case MenuItem.PASSWORD:
          // TODO: 密码输入
          this._subState = MenuSubState.TEAM_SELECT;
          this._drawTeamSelect();
          break;
      }
    }
    
    // 闪烁光标 (每30帧切换)
    this._updateCursorBlink();
    
    // 自动选择 (AI模式)
    if (this._timer > 180) {
      this._subState = MenuSubState.TEAM_SELECT;
      this._drawTeamSelect();
    }
  }

  private _handleTeamSelect(): void {
    // 简化: 自动选择南葛队
    if (this._timer > 60) {
      this._subState = MenuSubState.CONFIRM;
      this._drawConfirm();
    }
  }

  private _handleConfirm(): void {
    // 确认后进入比赛
    if (this._timer > 30) {
      this._subState = MenuSubState.EXIT;
    }
  }

  private _doExit(): void {
    console.log('[MenuScene] → 切换到比赛初始化');
    // 设置比赛参数
    this.ds.matchPhase = 0;
    this.ds.scoreA = 0;
    this.ds.scoreB = 0;
    this.sm.transitionTo(GameState.MATCH_INIT);
  }

  // ==================== 结果画面 (Sub 1) ====================

  private _resultScreen(): void {
    // 显示比分结果
    if (this._timer > 180) {
      console.log('[MenuScene] 结果画面 → 回菜单');
      this._subState = MenuSubState.INIT;
      this.sm.transitionTo(GameState.MENU);
    }
    
    this._drawResultScreen();
  }

  // ==================== 事件画面 (Sub 3) ====================

  private _eventScreen(): void {
    // 进球/半场/终场事件
    if (this._timer > 120) {
      if (this.ds.matchPhase >= 7) {
        console.log('[MenuScene] 事件 → 结果画面');
        this.sm.transitionTo(GameState.RESULT);
      } else {
        console.log('[MenuScene] 事件 → 回比赛');
        this.sm.transitionTo(GameState.MATCH_LOOP);
      }
    }
    
    this._drawEventScreen();
  }

  // ==================== 绘制 ====================

  private _loadMenuPalette(): void {
    // 使用默认调色板, 稍暗的背景
    for (let i = 0; i < 16; i++) {
      this.ds.paletteRam[i] = 0x0F;
    }
    // BG0: 黑/白/灰/暗蓝
    this.ds.paletteRam[0] = 0x0F;
    this.ds.paletteRam[1] = 0x30;
    this.ds.paletteRam[2] = 0x10;
    this.ds.paletteRam[3] = 0x02;
    // BG1: 黑/黄/橙/红
    this.ds.paletteRam[4] = 0x0F;
    this.ds.paletteRam[5] = 0x28;
    this.ds.paletteRam[6] = 0x18;
    this.ds.paletteRam[7] = 0x06;
  }

  private _drawMenu(): void {
    const nt = this.ds.nametable0;
    nt.fill(0);
    
    // 顶部边框
    for (let c = 0; c < 32; c++) {
      nt[0 * 32 + c] = 0x01;
    }
    
    // 标题 "CAPTAIN TSUBASA"
    const titleRow = 3;
    const titleTiles = [0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x50, 0x51, 0x52, 0x53, 0x54];
    for (let c = 0; c < titleTiles.length; c++) {
      nt[titleRow * 32 + 7 + c] = titleTiles[c];
    }
    
    // 分隔线
    for (let c = 0; c < 32; c++) {
      nt[5 * 32 + c] = 0x03;
    }
    
    // 菜单选项
    const menuStartRow = 10;
    const menuItems = [
      { text: 'NEW GAME', tiles: [0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67] },
      { text: 'PASSWORD', tiles: [0x68, 0x69, 0x6A, 0x6B, 0x6C, 0x6D, 0x6E, 0x6F] },
    ];
    
    for (let i = 0; i < menuItems.length; i++) {
      const row = menuStartRow + i * 3;
      // 光标
      nt[row * 32 + 4] = 0x10; // ▶
      
      // 菜单文字
      for (let c = 0; c < menuItems[i].tiles.length; c++) {
        nt[row * 32 + 7 + c] = menuItems[i].tiles[c];
      }
    }
    
    // 底部信息
    const bottomRow = 25;
    const bottomTiles = [0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7A, 0x7B];
    for (let c = 0; c < bottomTiles.length; c++) {
      nt[bottomRow * 32 + 8 + c] = bottomTiles[c];
    }
    
    // 底部边框
    for (let c = 0; c < 32; c++) {
      nt[29 * 32 + c] = 0x02;
    }
    
    // 属性表
    this._setAttributes(nt);
  }

  private _drawTeamSelect(): void {
    const nt = this.ds.nametable0;
    nt.fill(0);
    
    // 标题
    const titleTiles = [0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89];
    for (let c = 0; c < titleTiles.length; c++) {
      nt[3 * 32 + 10 + c] = titleTiles[c];
    }
    
    // 队伍列表
    const teams = [
      'NANKATSU SC', 'MEIWA HIGASHI', 'TOHO GAKUEN',
      'FURANO', 'HANABATAKE', 'HIRADO',
      'MINAMIUWA', 'HIGASHI 1', 'KINDAICHI',
    ];
    
    for (let i = 0; i < teams.length; i++) {
      const row = 6 + i;
      if (i === 0) {
        nt[row * 32 + 4] = 0x10; // ▶ 选中
      }
      const tiles = this._stringToTiles(teams[i], 0x90);
      for (let c = 0; c < tiles.length && c < 20; c++) {
        nt[row * 32 + 7 + c] = tiles[c];
      }
    }
    
    this._setAttributes(nt);
  }

  private _drawConfirm(): void {
    const nt = this.ds.nametable0;
    nt.fill(0);
    
    // 确认画面
    const confirmTiles = [0xA0, 0xA1, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9];
    for (let c = 0; c < confirmTiles.length; c++) {
      nt[12 * 32 + 10 + c] = confirmTiles[c];
    }
    
    this._setAttributes(nt);
  }

  private _drawResultScreen(): void {
    const nt = this.ds.nametable0;
    nt.fill(0);
    
    // 比分显示
    const scoreTiles = [0xB0, 0xB1, 0xB2, 0xB3, 0xB4];
    for (let c = 0; c < scoreTiles.length; c++) {
      nt[8 * 32 + 13 + c] = scoreTiles[c];
    }
    
    // 比分数字
    const scoreA = this.ds.scoreA;
    const scoreB = this.ds.scoreB;
    nt[12 * 32 + 13] = 0xC0 + scoreA;
    nt[12 * 32 + 15] = 0xC8; // -
    nt[12 * 32 + 17] = 0xC0 + scoreB;
    
    this._setAttributes(nt);
  }

  private _drawEventScreen(): void {
    const nt = this.ds.nametable0;
    nt.fill(0);
    
    const eventTiles = [0xD0, 0xD1, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7];
    for (let c = 0; c < eventTiles.length; c++) {
      nt[10 * 32 + 11 + c] = eventTiles[c];
    }
    
    this._setAttributes(nt);
  }

  private _updateMenuCursor(): void {
    const nt = this.ds.nametable0;
    const menuStartRow = 10;
    
    // 清除旧光标
    nt[menuStartRow * 32 + 4] = 0x00;
    nt[(menuStartRow + 3) * 32 + 4] = 0x00;
    
    // 设置新光标
    const cursorRow = menuStartRow + this._menuSelection * 3;
    nt[cursorRow * 32 + 4] = 0x10; // ▶
  }

  private _updateCursorBlink(): void {
    if (this._blinkTimer >= 30) {
      this._blinkTimer = 0;
      const nt = this.ds.nametable0;
      const menuStartRow = 10;
      const cursorRow = menuStartRow + this._menuSelection * 3;
      nt[cursorRow * 32 + 4] = nt[cursorRow * 32 + 4] === 0x10 ? 0x00 : 0x10;
    }
  }

  // ==================== 辅助 ====================

  private _stringToTiles(str: string, baseTile: number): number[] {
    const tiles: number[] = [];
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        tiles.push(baseTile + (code - 65));
      } else if (code >= 48 && code <= 57) {
        tiles.push(baseTile + 26 + (code - 48));
      } else if (code === 32) {
        tiles.push(0x00); // 空格
      } else {
        tiles.push(baseTile + 36); // 未知字符用占位符
      }
    }
    return tiles;
  }

  private _setAttributes(nt: Uint8Array): void {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const attrIdx = 960 + r * 8 + c;
        if (attrIdx < 1024) {
          if (r >= 2 && r <= 4) {
            nt[attrIdx] = 0x55; // 标题区域
          } else if (r >= 5 && r <= 6) {
            nt[attrIdx] = 0xAA; // 内容区域
          } else {
            nt[attrIdx] = 0x00; // 默认
          }
        }
      }
    }
  }
}
