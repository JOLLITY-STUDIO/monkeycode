/**
 * BattleScene.ts — 战斗地图场景 (VDP tile 渲染版)
 *
 * 使用 StageConfig 加载的 StageData + ROM 提取的 terrain tileset
 * 真实 VDP nametable tile 渲染 + 单位标记 + 光标 + 滚动
 */
import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { GameState } from '../core/GameState.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { SaveData, saveData } from '../systems/SaveSystem.js';
import { StageData, StageUnit } from '../systems/StageConfig.js';
import { TILESET_1_BASE64 } from '../data/TilesetData.js';
import { buildTileAtlas, renderMap, TileAtlas } from '../rendering/TileRenderer.js';
import { drawStatusBar, drawLogOverlay, TextLine } from '../rendering/UI.js';

// ============================================================================
// Faction colors for unit markers
// ============================================================================
const FACTION_COLORS: Record<string, string> = {
  player:  '#0ff',
  npc:     '#0f0',
  enemy:   '#f44',
  special: '#f0f',
};

interface Cursor { x: number; y: number; }

const TILE_SIZE = 16; // pixels per tile on canvas (2x zoom for 8x8 tiles)

export class BattleScene implements Scene {
  readonly name = 'BattleMap';

  private vdp: VDP;
  private state: GameState;
  private save: SaveData;
  private stage: StageData | null = null;

  private cursor: Cursor = { x: 1, y: 1 };
  private scrollX = 0;
  private scrollY = 0;
  private turn = 1;
  private logLines: string[] = [];

  private onStartMenu: (() => void) | null = null;
  private onCharAction: ((charIdx: number) => void) | null = null;

  /** Tile atlas for terrain rendering */
  private tileAtlas: TileAtlas | null = null;
  /** Whether tile rendering is available */
  private useTileRender = true;

  constructor(vdp: VDP, state: GameState, save: SaveData) {
    this.vdp = vdp;
    this.state = state;
    this.save = save;
    this._initTileset();
  }

  /** Decode base64 tileset and build atlas */
  private _initTileset(): void {
    try {
      const raw = Uint8Array.from(atob(TILESET_1_BASE64), c => c.charCodeAt(0));
      this.tileAtlas = buildTileAtlas(raw);
    } catch (e) {
      console.warn('Tile atlas build failed, using fallback colors', e);
      this.useTileRender = false;
    }
  }

  setStage(stage: StageData): void {
    this.stage = stage;
    this.cursor = { x: 1, y: 1 };
    this.scrollX = 0;
    this.scrollY = 0;
  }

  setStartMenuCallback(cb: () => void): void { this.onStartMenu = cb; }
  setCharActionCallback(cb: (charIdx: number) => void): void { this.onCharAction = cb; }
  getSave(): SaveData { return this.save; }
  getTurn(): number { return this.turn; }

  init(): void {
    this.vdp.displayEnabled = true;
    const pals = [
      0x0000, 0x0EEE, 0x0E00, 0x00E0, 0x000E, 0x0EE0, 0x0E0E, 0x00EE,
      0x0EEE, 0x0E44, 0x0E80, 0x0444, 0x0088, 0x0E08, 0x0008, 0x0442,
    ];
    for (let i = 0; i < pals.length; i++) this.vdp.writeCRAM(i, pals[i]);

    const s = this.stage;
    if (s) {
      this.logLines.push(`剧本 ${s.scenarioId} | ${s.mapWidth}x${s.mapHeight} | 回合 ${this.turn}`);
      this.logLines.push(`单位: 我方${s.playerUnits.length} 敌方${s.enemyUnits.length} NPC${s.npcUnits.length}`);
    } else {
      this.logLines.push(`回合 ${this.turn} — 无关卡数据`);
    }
    this.logLines.push(`金币:${this.save.gold} | 队伍:${this.save.characters.filter(c => c.joined && c.alive).length}人`);
  }

  update(_dt?: number, input?: Mapper): void {
    if (!input || !this.stage) return;

    const stage = this.stage;
    const mw = stage.mapWidth;
    const mh = stage.mapHeight;

    // Direction → move cursor
    const dir = input.getDirection();
    if (dir.x !== 0) this.cursor.x = Math.max(0, Math.min(mw - 1, this.cursor.x + dir.x));
    if (dir.y !== 0) this.cursor.y = Math.max(0, Math.min(mh - 1, this.cursor.y + dir.y));

    // Auto-scroll
    const visW = Math.floor(320 / TILE_SIZE);
    const visH = Math.floor(200 / TILE_SIZE);
    if (this.cursor.x < this.scrollX + 3) this.scrollX = Math.max(0, this.cursor.x - 3);
    if (this.cursor.x >= this.scrollX + visW - 3) this.scrollX = Math.min(mw - visW, this.cursor.x - visW + 4);
    if (this.cursor.y < this.scrollY + 2) this.scrollY = Math.max(0, this.cursor.y - 2);
    if (this.cursor.y >= this.scrollY + visH - 2) this.scrollY = Math.min(mh - visH, this.cursor.y - visH + 3);

    // B → log cursor info
    if (input.justPressed(Button.B)) {
      const tile = stage.tiles[this.cursor.y * mw + this.cursor.x];
      const mc = stage.moveCost[this.cursor.y * mw + this.cursor.x];
      const unit = stage.units.find(u => u.x === this.cursor.x && u.y === this.cursor.y);
      if (unit) {
        this.logLines.push(`光标:(${this.cursor.x},${this.cursor.y}) ${unit.name}(${unit.className})`);
      } else {
        this.logLines.push(`光标:(${this.cursor.x},${this.cursor.y}) tile=0x${tile.toString(16)} mc=${mc}`);
      }
    }

    // C → end turn
    if (input.justPressed(Button.C)) {
      this.turn++;
      this.save.turn = this.turn;
      saveData(this.save);
      this.logLines.push(`-- 回合 ${this.turn} --`);
    }

    // A → character action
    if (input.justPressed(Button.A)) {
      const unit = stage.units.find(u => u.x === this.cursor.x && u.y === this.cursor.y);
      if (unit) {
        this.onCharAction?.(unit.index);
      }
    }

    // START → menu
    if (input.justPressed(Button.START)) {
      this.onStartMenu?.();
    }

    while (this.logLines.length > 8) this.logLines.shift();
  }

  /** Canvas 2D UI render */
  renderUI(ctx: CanvasRenderingContext2D): void {
    this._renderMap(ctx);
    this._renderUnits(ctx);
    this._renderCursor(ctx);
    this._renderOverlays(ctx);
  }

  // === Private render helpers ===

  private _renderMap(ctx: CanvasRenderingContext2D): void {
    if (!this.stage) return;
    const { mapWidth, mapHeight, tiles } = this.stage;
    const visW = Math.min(Math.ceil(320 / TILE_SIZE) + 1, mapWidth - this.scrollX);
    const visH = Math.min(Math.ceil(200 / TILE_SIZE) + 1, mapHeight - this.scrollY);

    // Try tile rendering first
    if (this.useTileRender && this.tileAtlas) {
      try {
        renderMap({
          ctx, atlas: this.tileAtlas,
          nametable: tiles, mapWidth, mapHeight,
          scrollX: this.scrollX, scrollY: this.scrollY,
          viewW: visW, viewH: visH,
          displayTileSize: TILE_SIZE,
        });
        return;
      } catch (e) {
        this.useTileRender = false;
      }
    }

    // Fallback: color block rendering
    this._renderMapFallback(ctx, visW, visH);
  }

  private _renderMapFallback(ctx: CanvasRenderingContext2D, visW: number, visH: number): void {
    const { mapWidth, tiles, moveCost } = this.stage!;
    const sx = this.scrollX, sy = this.scrollY;

    // Simple terrain color palette
    const TILE_COLORS: Record<number, string> = {
      0x00: '#4a8', 0x01: '#2a6', 0x02: '#860', 0x03: '#36a',
      0x04: '#666', 0x05: '#884', 0x06: '#a80', 0x07: '#c84',
      0x08: '#888', 0x09: '#ba6', 0x0A: '#484', 0x0B: '#ccf',
      0x0C: '#888', 0x0D: '#654', 0x0E: '#048', 0x0F: '#222',
    };

    for (let vy = 0; vy < visH; vy++) {
      for (let vx = 0; vx < visW; vx++) {
        const mx = sx + vx, my = sy + vy;
        const idx = my * mapWidth + mx;
        const raw = tiles[idx] ?? 0;
        const type = raw & 0x0F;
        const mc = moveCost[idx] ?? 1;
        ctx.fillStyle = (mc >= 99) ? '#111' : TILE_COLORS[type] || '#333';
        ctx.fillRect(vx * 16, vy * 16, 15, 15);
      }
    }
  }

  private _renderUnits(ctx: CanvasRenderingContext2D): void {
    if (!this.stage) return;
    const sx = this.scrollX, sy = this.scrollY;

    for (const unit of this.stage.units) {
      const ux = unit.x - sx, uy = unit.y - sy;
      if (ux < -1 || uy < -1 || ux > 22 || uy > 14) continue;

      const cx = ux * TILE_SIZE + TILE_SIZE / 2;
      const cy = uy * TILE_SIZE + TILE_SIZE / 2;
      const color = FACTION_COLORS[unit.faction] || '#fff';

      // Faction dot
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Unit name
      ctx.font = '7px monospace';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(unit.name.slice(0, 2), cx, cy - 9);
    }
  }

  private _renderCursor(ctx: CanvasRenderingContext2D): void {
    const cx = (this.cursor.x - this.scrollX) * TILE_SIZE;
    const cy = (this.cursor.y - this.scrollY) * TILE_SIZE;
    ctx.strokeStyle = '#ff0';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx + 0.5, cy + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);

    if (Math.floor(Date.now() / 300) % 2 === 0) {
      ctx.fillStyle = 'rgba(255,255,0,0.4)';
      const cx2 = cx + TILE_SIZE / 2;
      const cy2 = cy + TILE_SIZE / 2;
      ctx.beginPath();
      ctx.moveTo(cx2, cy2 - 4);
      ctx.lineTo(cx2 + 4, cy2);
      ctx.lineTo(cx2, cy2 + 4);
      ctx.lineTo(cx2 - 4, cy2);
      ctx.closePath();
      ctx.fill();
    }
  }

  private _renderOverlays(ctx: CanvasRenderingContext2D): void {
    drawLogOverlay(ctx, this.logLines);

    const alive = this.save.characters.filter(c => c.joined && c.alive).length;
    const infoLines: TextLine[] = [
      { text: `(${this.cursor.x},${this.cursor.y})`, color: '#0ff' },
      { text: `金币:${this.save.gold}`, color: '#ff0' },
      { text: `队伍:${alive}人`, color: '#afa' },
    ];
    this._drawInfoBox(ctx, 260, 2, infoLines);

    drawStatusBar(ctx, [
      { text: '方向:移动 B:查看 C:回合终了 A:角色 START:菜单', color: '#888' },
    ]);
  }

  private _drawInfoBox(ctx: CanvasRenderingContext2D, x: number, y: number, lines: TextLine[]): void {
    ctx.font = '10px monospace';
    ctx.textBaseline = 'top';
    const maxW = Math.max(...lines.map(l => ctx.measureText(l.text).width));
    const w = maxW + 12;
    const h = lines.length * 13 + 8;
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(x, y, w, h);
    for (let i = 0; i < lines.length; i++) {
      ctx.fillStyle = lines[i].color ?? '#fff';
      ctx.fillText(lines[i].text, x + 4, y + 4 + i * 13);
    }
  }

  destroy(): void {}
}
