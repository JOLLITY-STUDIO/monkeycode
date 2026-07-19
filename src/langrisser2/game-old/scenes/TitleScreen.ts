/**
 * 标题画面场景 - VDP tile 渲染 + Canvas UI 叠加
 *
 * 两种运行模式:
 *   1. 独立启动 (fromScratch=true, 默认): 完整加载 VRAM/CRAM/寄存器
 *   2. 从开场动画过渡 (fromScratch=false): 保留 OpeningAnimation 帧2的 VDP 状态
 *      OpeningAnimation 帧2 已加载:
 *        Plane A @ 0xA000 (R2=0x28)
 *        Sprite table @ 0xF000 (R5=0x78)
 *        H40 模式 (R12=0x81)
 *        完整 CRAM 调色板
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { invalidateTileCache } from '../hw/vdp/plane.js';
import { invalidateSpriteTileCache } from '../hw/vdp/sprite.js';
import { drawStatusBar } from '../rendering/UI.js';
import {
  TITLE_TILES,
  TITLE_CRAM,
  TITLE_NAMETABLE_A,
  TITLE_NAMETABLE_B,
  TITLE_SPRITES,
} from '../data/TitleScreenData.js';

// VDP 内存布局 — 与 OpeningAnimation 帧2 一致 (R2=0x28, R5=0x78)
const PLANE_A_NT_ADDR = 0xA000;  // R2=0x28 << 13
const PLANE_B_NT_ADDR = 0xE000;  // R4=0x07 << 13
const SPRITE_TABLE_ADDR = 0xF000; // R5=0x78 << 9

/** OpeningAnimation 帧2 的 VDP 配置 (fromScratch=false 时使用) */
const OPENING_VDP_CONFIG = {
  R2: 0x28,   // Plane A @ 0xA000
  R5: 0x78,   // Sprite table @ 0xF000
  R12: 0x81,  // H40 mode
  R7: 0x00,   // 背景色
} as const;

export class TitleScreen implements Scene {
  readonly name = 'TitleScreen';

  private vdp: VDP;
  /** true=完整加载VRAM, false=保留OpeningAnimation帧2的VDP状态 */
  private fromScratch: boolean;

  constructor(vdp: VDP, fromScratch: boolean = true) {
    this.vdp = vdp;
    this.fromScratch = fromScratch;
  }

  init(): void {
    if (this.fromScratch) {
      this._initFromScratch();
    } else {
      this._initFromOpening();
    }
    console.log(`[TitleScreen] 初始化完成 (模式: ${this.fromScratch ? '完整加载' : '从开场动画过渡'})`);
  }

  update(): void {}

  /** Canvas UI: 底部提示 */
  renderUI(ctx: CanvasRenderingContext2D): void {
    drawStatusBar(ctx, [
      { text: 'START - 进入战斗', color: '#aaa' },
    ]);
  }

  destroy(): void {}

  // ============================================================
  // 内部: 两种初始化路径
  // ============================================================

  /** 模式1: 完整加载 VRAM/CRAM/寄存器 (独立启动) */
  private _initFromScratch(): void {
    this._configureVDPRegisters();
    this._loadTiles();
    this._loadCRAM();
    this._loadNametable();
    this._loadSprites();
    this.vdp.displayEnabled = true;
  }

  /** 模式2: 保留 OpeningAnimation 帧2 的 VDP 状态 (逻辑接管) */
  private _initFromOpening(): void {
    // VDP 寄存器/VRAM/CRAM 已经由 OpeningAnimation 帧2 设置完毕
    // 只需确保 displayEnabled 和清除 Plane A 缓存
    this.vdp.displayEnabled = true;
    invalidateTileCache();
  }

  // ============================================================
  // 内部: VDP 配置 + 数据加载 (fromScratch 模式)
  // ============================================================

  private _configureVDPRegisters(): void {
    // 使用与 OpeningAnimation 一致的 VDP 配置
    this.vdp.writeRegister(2, OPENING_VDP_CONFIG.R2);   // Plane A @ 0xA000
    this.vdp.writeRegister(5, OPENING_VDP_CONFIG.R5);   // Sprite @ 0xF000
    this.vdp.writeRegister(12, OPENING_VDP_CONFIG.R12); // H40 mode
    this.vdp.writeRegister(7, OPENING_VDP_CONFIG.R7);   // 背景色
    this.vdp.writeRegister(4, 0x07); // Plane B @ 0xE000 (兼容)
  }

  private _loadTiles(): void {
    for (let i = 0; i < TITLE_TILES.length; i++) {
      this.vdp.writeVRAM(i, TITLE_TILES[i]);
    }
    invalidateTileCache();
    console.log(`[TitleScreen] Tile: ${TITLE_TILES.length}B → VRAM`);
  }

  private _loadCRAM(): void {
    for (let i = 0; i < TITLE_CRAM.length; i++) {
      this.vdp.cram[i] = TITLE_CRAM[i];
    }
    console.log(`[TitleScreen] CRAM: ${TITLE_CRAM.length}B 已加载`);
  }

  private _loadNametable(): void {
    for (let i = 0; i < TITLE_NAMETABLE_A.length; i++) {
      this.vdp.writeVRAM(PLANE_A_NT_ADDR + i, TITLE_NAMETABLE_A[i]);
    }
    for (let i = 0; i < TITLE_NAMETABLE_B.length; i++) {
      this.vdp.writeVRAM(PLANE_B_NT_ADDR + i, TITLE_NAMETABLE_B[i]);
    }
    invalidateTileCache();
    console.log(`[TitleScreen] Nametable 已加载`);
  }

  /** 加载 Sprite Attribute Table (copyright 精灵) */
  private _loadSprites(): void {
    for (let i = 0; i < TITLE_SPRITES.length; i++) {
      this.vdp.writeVRAM(SPRITE_TABLE_ADDR + i, TITLE_SPRITES[i]);
    }
    invalidateSpriteTileCache();
    console.log(`[TitleScreen] Sprites: ${TITLE_SPRITES.length}B → VRAM 0xF000`);
  }
}

export function setupTitleScreen(vdp: VDP): TitleScreen {
  const title = new TitleScreen(vdp);
  title.init();
  return title;
}
