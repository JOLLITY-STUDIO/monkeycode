/**
 * 标题画面场景 - VDP tile 渲染 + Canvas UI 叠加
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { invalidateTileCache } from '../hw/vdp/plane.js';
import { drawStatusBar } from '../rendering/UI.js';
import {
  TITLE_TILES,
  TITLE_CRAM,
  TITLE_NAMETABLE_A,
  TITLE_NAMETABLE_B,
} from '../data/TitleScreenData.js';

const PLANE_A_NT_ADDR = 0xC000;
const PLANE_B_NT_ADDR = 0xE000;

export class TitleScreen implements Scene {
  readonly name = 'TitleScreen';

  private vdp: VDP;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  init(): void {
    this.configureVDPRegisters();
    this.loadTiles();
    this.loadCRAM();
    this.loadNametable();
    this.vdp.displayEnabled = true;
    console.log('[TitleScreen] 初始化完成');
  }

  update(): void {}

  /** Canvas UI: 底部提示 */
  renderUI(ctx: CanvasRenderingContext2D): void {
    drawStatusBar(ctx, [
      { text: 'START - 进入战斗', color: '#aaa' },
    ]);
  }

  destroy(): void {}

  private configureVDPRegisters(): void {
    this.vdp.writeRegister(2, 0x30);
    this.vdp.writeRegister(4, 0x07);
    this.vdp.writeRegister(12, 0x81);
    this.vdp.writeRegister(7, 0x00);
  }

  private loadTiles(): void {
    for (let i = 0; i < TITLE_TILES.length; i++) {
      this.vdp.writeVRAM(i, TITLE_TILES[i]);
    }
    invalidateTileCache();
    console.log(`[TitleScreen] Tile: ${TITLE_TILES.length}B → VRAM`);
  }

  private loadCRAM(): void {
    for (let i = 0; i < TITLE_CRAM.length; i++) {
      this.vdp.cram[i] = TITLE_CRAM[i];
    }
    console.log(`[TitleScreen] CRAM: ${TITLE_CRAM.length}B 已加载`);
  }

  private loadNametable(): void {
    for (let i = 0; i < TITLE_NAMETABLE_A.length; i++) {
      this.vdp.writeVRAM(PLANE_A_NT_ADDR + i, TITLE_NAMETABLE_A[i]);
    }
    for (let i = 0; i < TITLE_NAMETABLE_B.length; i++) {
      this.vdp.writeVRAM(PLANE_B_NT_ADDR + i, TITLE_NAMETABLE_B[i]);
    }
    console.log(`[TitleScreen] Nametable 已加载`);
  }
}

export function setupTitleScreen(vdp: VDP): TitleScreen {
  const title = new TitleScreen(vdp);
  title.init();
  return title;
}
