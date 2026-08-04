/**
 * SceneComposer — 场景构建器 (data&view 层)
 *
 * 读取 GameModel (纯数据)，转换为 NES 风格的 VRAM 写入 + OAM 精灵数据。
 * 这层封装了所有"怎样渲染"的知识：tile 布局、调色板、坐标映射等。
 *
 * 类似"前后端分离"中的前端渲染：
 *   GameModel = API 返回的 JSON 数据
 *   SceneComposer = 前端模板引擎 (数据 → DOM/Canvas)
 *
 * 此层完成后，Renderer 照常从 VRAM+OAM 渲染到 Canvas。
 */

import type { Renderer } from '../renderer/Renderer';
import type { OamCache } from '../cache/OamCache';
import type { SpriteEntry } from '../core/types';
import type { GameModel, MenuModel, MemberSelectModel, MatchModel, EventModel } from '../model/GameModel';

/** 场地常量 (Name Table 坐标) */
const FIELD_COLS = 32;
const FIELD_ROWS = 30;
const GRASS_TILE = 0x00;
const LINE_TILE = 0x10;
const MIDLINE_TILE = 0x12;

export class SceneComposer {
  private renderer: Renderer;
  private oamCache: OamCache;

  constructor(renderer: Renderer, oamCache: OamCache) {
    this.renderer = renderer;
    this.oamCache = oamCache;
  }

  // ===================== 主入口 =====================

  /**
   * 每帧调用一次，根据当前 GameModel 构建场景到 VRAM+OAM。
   */
  compose(model: GameModel, stateId: number): void {
    switch (stateId) {
      case 1: return this.composeTitle(model);
      case 2: return this.composeMenu(model);
      case 3: return this.composeMemberSelect(model);
      case 4: return this.composeMatch(model);
      case 5: return this.composeEvent(model);
      default: break;
    }
  }

  // ===================== 底层工具 =====================

  private clearVram(): void {
    // 清空 name table 0 (960 tiles)
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }
    // 清空属性表 (64 bytes)
    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }
  }

  /** 在 name table 指定位置写文字 (ASCII charCode → tile) */
  private writeText(text: string, row: number, col: number): void {
    for (let i = 0; i < text.length; i++) {
      const addr = 0x2000 + row * FIELD_COLS + col + i;
      this.renderer.writeVram(addr, text.charCodeAt(i));
    }
  }

  /** 在 name table 中画一个矩形 tile */
  private fillRect(rowStart: number, colStart: number, height: number, width: number, tile: number): void {
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        this.renderer.writeVram(0x2000 + (rowStart + r) * FIELD_COLS + colStart + c, tile);
      }
    }
  }

  // ===================== 状态 1: 标题画面 =====================

  private composeTitle(_model: GameModel): void {
    // 标题画面由 Bank1Dispatcher 的 RLE 解码器直接写 VRAM，
    // 这里只需要保留清除操作（已在 compose 入口完成）。
    // 闪烁动画效果通过 ppuMask 控制（在 GameModel 中设置）。
  }

  // ===================== 状态 2: 菜单选择 =====================

  private composeMenu(model: GameModel): void {
    this.clearVram();
    const menu = model.menu;

    // 标题
    const titleChars = [
      0x43, 0x41, 0x50, 0x54, 0x41, 0x49, 0x4E, 0x00,
      0x54, 0x53, 0x55, 0x42, 0x41, 0x53, 0x41,
    ];
    for (let i = 0; i < titleChars.length; i++) {
      this.renderer.writeVram(0x2000 + 5 * FIELD_COLS + 9 + i, titleChars[i]);
    }

    // 菜单项
    for (let idx = 0; idx < menu.items.length; idx++) {
      const row = 12 + idx * 3;
      const name = menu.items[idx];
      for (let c = 0; c < name.length; c++) {
        const code = name.charCodeAt(c);
        this.renderer.writeVram(0x2000 + row * FIELD_COLS + 10 + c, this.charToTile(code));
      }
    }

    // 光标精灵
    this.oamCache.clear();
    const cursorY = 96 + menu.selectedIndex * 48;
    this.oamCache.setSprite(0, {
      y: cursorY,
      tileIndex: 0x10,   // 箭头 tile
      attributes: 0x01,  // 调色板 1
      x: 56,
    });
  }

  // ===================== 状态 3: 队员选择 =====================

  private composeMemberSelect(model: GameModel): void {
    this.clearVram();
    const ms = model.memberSelect;

    // 球队名
    this.writeText('TEAM: ' + ms.teamName, 0, 2);

    // 上场人数
    const countStr = `ACTIVE:${ms.activeCount}/11`;
    this.writeText(countStr, 0, 20);

    // 标题
    this.writeText('SELECT MEMBER', 1, 10);

    // 表头
    this.writeText('NO NAME       POS SPD POW TEC STA', 2, 2);

    // 球员列表
    const visibleStart = Math.max(0, ms.cursorIndex - 10);
    const visibleEnd = Math.min(ms.players.length, visibleStart + 23);

    for (let i = visibleStart; i < visibleEnd; i++) {
      const p = ms.players[i];
      const displayRow = 3 + (i - visibleStart);
      const isCursor = i === ms.cursorIndex;

      const prefix = isCursor ? '>' : ' ';
      const activeMark = p.isActive ? '*' : ' ';
      const noStr = String(p.number).padStart(2);
      const nameStr = p.name.padEnd(10);
      const spdStr = String(p.speed).padStart(3);
      const powStr = String(p.power).padStart(3);
      const tecStr = String(p.technique).padStart(3);
      const staStr = String(p.stamina).padStart(3);

      const line = prefix + activeMark + noStr + ' ' + nameStr + p.position + ' ' + spdStr + ' ' + powStr + ' ' + tecStr + ' ' + staStr;
      this.writeText(line, displayRow, 2);
    }

    // 底部提示
    this.writeText('A:TOGGLE  START:PLAY  B:BACK', 28, 4);

    // 精灵 (已由状态清除)
    this.oamCache.clear();
  }

  // ===================== 状态 4: 比赛主循环 =====================

  private composeMatch(model: GameModel): void {
    // renderField() covers all 960 tiles, no explicit clearVram needed
    const m = model.match;

    // --- 场地 ---
    this.renderField();

    // --- 球员精灵 ---
    this.renderMatchSprites(m);

    // --- 球精灵 ---
    this.renderBall(m);

    // --- HUD ---
    this.renderMatchHud(m);
  }

  private renderField(): void {
    // Full field grass + borders
    const rows = FIELD_ROWS;
    const cols = FIELD_COLS;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let tile = GRASS_TILE;
        if (col === 0 || col === cols - 1 || row === 0 || row === rows - 2) {
          tile = LINE_TILE;
        }
        this.renderer.writeVram(0x2000 + row * cols + col, tile);
      }
    }
    // 中线
    for (let row = 1; row < rows - 1; row++) {
      this.renderer.writeVram(0x2000 + row * cols + 16, MIDLINE_TILE);
    }
  }

  private renderMatchSprites(m: MatchModel): void {
    this.oamCache.clear();

    for (let i = 0; i < Math.min(m.players.length, 63); i++) {
      const p = m.players[i];
      if (!p.isActive) continue;

      const sx = Math.floor(p.x / 255 * 256);
      const sy = Math.floor(p.y / 240 * 240);

      const tileIndex = p.hasBall ? 0x30 : 0x20;
      const attr = p.isTeamLeft ? 0x01 : 0x02;

      this.oamCache.setSprite(i, { y: sy, tileIndex, attributes: attr, x: sx });
    }
  }

  private renderBall(m: MatchModel): void {
    const sx = Math.floor(m.ballX / 255 * 256);
    const sy = Math.floor(m.ballY / 240 * 240);
    this.oamCache.setSprite(63, { y: sy, tileIndex: 0x38, attributes: 0x02, x: sx });
  }

  private renderMatchHud(m: MatchModel): void {
    const scoreText = `${m.scoreLeft} - ${m.scoreRight}`;
    // MatchPhase: 0=KICKOFF, 1=PLAYING, 3=SECOND_HALF
    const period = m.phase >= 3 ? '2H' : '1H';
    const timeText = `${period} ${String(m.timeMinutes).padStart(2, '0')}'`;

    this.writeText(scoreText, 0, 13);
    this.writeText(timeText, 0, 22);
  }

  // ===================== 状态 5: 比赛事件 =====================

  private composeEvent(model: GameModel): void {
    this.clearVram();
    const e = model.event;

    switch (e.type) {
      case 'goal': {
        const text = 'GOAL!!';
        this.writeText(text, 14, 12);
        break;
      }
      case 'halftime':
      case 'fulltime': {
        const text = `FINAL  ${e.scoreLeft} - ${e.scoreRight}`;
        this.writeText(text, 12, 10);
        break;
      }
      default: break;
    }
  }

  // ===================== 工具 =====================

  private charToTile(code: number): number {
    if (code >= 0x41 && code <= 0x5A) return code;   // A-Z
    if (code >= 0x30 && code <= 0x39) return code;   // 0-9
    return 0x00;  // space/unknown
  }
}
