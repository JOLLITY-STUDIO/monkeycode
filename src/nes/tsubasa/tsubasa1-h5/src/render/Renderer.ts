/**
 * 天使之翼1 — Canvas 渲染器 (v2.0 — 滚动/精灵优先级修复)
 * 
 * NES PPU 渲染管线 → Canvas 2D API:
 *   1. 背景渲染: Nametable Tile → Pattern Table → 调色板 → RGBA (含4屏滚动)
 *   2. 精灵渲染: OAM → Pattern Table → 调色板 → RGBA (含behindBg优先级)
 *   3. 输出到 Canvas
 * 
 * 核心修复:
 *   - 4屏滚动: 正确跨越4个Nametable渲染
 *   - 精灵优先级: behindBg=true的精灵仅覆盖背景color0像素
 *   - _bgColorIndex: 每帧从paletteRam[0]更新
 *   - MMC1镜像: 支持水平/垂直镜像
 * 
 * 屏幕尺寸: 256×240 (NES原生), 可缩放到Canvas实际尺寸
 */

import { DataStore } from '../data/DataStore';
import {
  SCREEN_WIDTH, SCREEN_HEIGHT,
  NT_WIDTH, NT_HEIGHT, TILE_SIZE,
  SPRITE_COUNT, NES_PALETTE, GameState,
} from '../core/types';
import { MatchFieldRenderer } from '../game/match/MatchFieldRenderer';

/** CHR图案数据 (每个bank 4096字节 = 256 tiles × 16 B/tile) */
export type ChrBank = Uint8Array;

/** 镜像模式 */
export enum Mirroring {
  HORIZONTAL = 0,  // NT0=NT1, NT2=NT3
  VERTICAL   = 1,  // NT0=NT2, NT1=NT3
  SINGLE_LOW = 2,  // 全部→NT0
  SINGLE_HIGH= 3,  // 全部→NT1
  FOUR_SCREEN= 4,  // 4独立NT
}

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private ds: DataStore;
  
  /** 缩放倍数 */
  private _scale: number = 2;
  
  /** 离屏Canvas (256×240 原始分辨率) */
  private _offscreen: any = null;
  private _offscreenCtx: any = null;
  
  /** CHR图案缓存 */
  private _chrBanks: Map<number, ChrBank> = new Map();
  
  /** Tile渲染缓存 (避免重复解码) */
  private _tileCache: Map<string, { imageData: any; colorMask: Uint8Array }> = new Map();
  
  /** 当前使用的CHR Bank */
  private _activeChr0: number = 0;
  private _activeChr1: number = 0;
  
  /** 背景色索引 (每帧从paletteRam[0]更新) */
  private _bgColorIndex: number = 0;
  
  /** 像素颜色缓冲 (256×240, RGBA Uint32) — 用于精灵优先级 */
  private _pixelBuffer: Uint32Array = new Uint32Array(SCREEN_WIDTH * SCREEN_HEIGHT);
  
  /** 像素色彩标记 (256×240, bit0-1=colorIdx, bit2=isBg) */
  private _colorMask: Uint8Array = new Uint8Array(SCREEN_WIDTH * SCREEN_HEIGHT);
  
  /** 像素脏标记 (用于优化 — 标记哪些像素需要重绘) */
  private _dirtyAll: boolean = true;
  
  /** 镜像模式 */
  private _mirroring: Mirroring = Mirroring.HORIZONTAL;
  
  /** ImageData 缓存 (避免重复 createImageData) */
  private _imageDataCache: any = null;
  
  /** 预计算的NES调色板 RGBA Uint32 查找表 */
  private _paletteLUT: Uint32Array;
  
  /** 比赛场地渲染器 (State 3/4/5 时使用) */
  private _matchRenderer: MatchFieldRenderer;
  
  constructor(ctx: CanvasRenderingContext2D, ds: DataStore, scale: number = 2, canvasNode?: any) {
    this.ctx = ctx;
    this.ds = ds;
    this._scale = scale;
    
    // 构建调色板查找表 (RGBA → Uint32 little-endian)
    this._paletteLUT = new Uint32Array(64);
    for (let i = 0; i < 64; i++) {
      this._paletteLUT[i] = NES_PALETTE[i];  // 已经是 ABGR 格式
    }
    
    // 比赛场地渲染器
    this._matchRenderer = new MatchFieldRenderer(ds);
    
    // 创建离屏Canvas
    this._initOffscreen(canvasNode);
  }
  
  private _initOffscreen(canvasNode?: any): void {
    let offscreen: any = null;
    let offscreenCtx: any = null;
    
    try {
      if (canvasNode && canvasNode.createOffscreenCanvas) {
        offscreen = canvasNode.createOffscreenCanvas({ type: '2d', width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
        if (offscreen) offscreenCtx = offscreen.getContext('2d');
      }
    } catch (e) { /* ignore */ }
    
    if (!offscreenCtx) {
      try {
        if (typeof wx !== 'undefined' && (wx as any).createOffscreenCanvas) {
          offscreen = (wx as any).createOffscreenCanvas({ type: '2d', width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
          if (offscreen) offscreenCtx = offscreen.getContext('2d');
        }
      } catch (e) { /* ignore */ }
    }
    
    if (!offscreenCtx) {
      try {
        if (typeof OffscreenCanvas !== 'undefined') {
          offscreen = new OffscreenCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
          offscreenCtx = offscreen.getContext('2d');
        }
      } catch (e) { /* ignore */ }
    }
    
    if (!offscreenCtx) {
      try {
        if (typeof document !== 'undefined') {
          offscreen = document.createElement('canvas');
          offscreen.width = SCREEN_WIDTH;
          offscreen.height = SCREEN_HEIGHT;
          offscreenCtx = offscreen.getContext('2d');
        }
      } catch (e) { /* ignore */ }
    }
    
    this._offscreen = offscreen;
    this._offscreenCtx = offscreenCtx;
    
    // 预分配 ImageData 缓存
    if (offscreenCtx && offscreenCtx.createImageData) {
      this._imageDataCache = offscreenCtx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
    } else {
      // 降级：尝试在主 ctx 上创建
      try {
        this._imageDataCache = this.ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
      } catch (e) {
        console.warn('[Renderer] 无法创建 ImageData 缓存');
      }
    }
    
    if (!offscreenCtx) {
      console.warn('[Renderer] 离屏Canvas不可用，渲染可能异常');
    }
  }
  
  // ==================== CHR Bank 管理 ====================
  
  loadChrBank(bankId: number, data: Uint8Array): void {
    if (data.length >= 4096) {
      this._chrBanks.set(bankId, data.slice(0, 4096));
    }
  }
  
  setActiveChrBank(chr0: number, chr1: number): void {
    if (this._activeChr0 !== chr0 || this._activeChr1 !== chr1) {
      this._activeChr0 = chr0;
      this._activeChr1 = chr1;
      this._tileCache.clear();
      this._dirtyAll = true;
    }
  }
  
  /** 设置镜像模式 (从MMC1控制寄存器推断) */
  setMirroring(mode: Mirroring): void {
    this._mirroring = mode;
    this._dirtyAll = true;
  }
  
  // ==================== 主渲染流程 ====================
  
  /**
   * 渲染一帧
   * 新流程:
   *   1. 更新活动CHR Bank和背景色
   *   2. 清空像素缓冲
   *   3. 渲染背景 → 像素缓冲
   *   4. 渲染前景精灵 (behindBg=false) → 像素缓冲
   *   5. 渲染后景精灵 (behindBg=true) → 仅覆盖背景color0像素
   *   6. Flush 像素缓冲 → Canvas
   */
  render(): void {
    // 比赛状态: 使用比赛场地渲染器
    const gs = this.ds.gameState;
    if (gs === GameState.MATCH_INIT || gs === GameState.MATCH_LOOP || gs === GameState.TRANSITION) {
      this._renderMatch();
      return;
    }
    
    // 更新活动CHR Bank
    if (this.ds.currentChrBank0 !== this._activeChr0 ||
        this.ds.currentChrBank1 !== this._activeChr1) {
      this.setActiveChrBank(this.ds.currentChrBank0, this.ds.currentChrBank1);
    }
    
    // 更新背景色索引
    this._bgColorIndex = this.ds.paletteRam[0] & 0x3F;
    
    // 更新镜像模式
    const mmcMirror = this.ds.mmcCtrl & 0x03;
    const mirrorMap: Mirroring[] = [Mirroring.SINGLE_LOW, Mirroring.SINGLE_HIGH, Mirroring.VERTICAL, Mirroring.HORIZONTAL];
    const currentMirror = mirrorMap[mmcMirror] ?? Mirroring.HORIZONTAL;
    if (currentMirror !== this._mirroring) {
      this._mirroring = currentMirror;
      this._dirtyAll = true;
    }
    
    // 清空像素缓冲
    this._clearBuffer();
    
    // PPU MASK 检查
    const ppuMask = this.ds.ppuMask;
    const bgEnabled = (ppuMask & 0x08) !== 0;  // bit3: 背景启用
    const sprEnabled = (ppuMask & 0x10) !== 0; // bit4: 精灵启用
    const bgLeft8 = (ppuMask & 0x02) !== 0;    // bit1: 背景左8列
    const sprLeft8 = (ppuMask & 0x04) !== 0;   // bit2: 精灵左8列
    
    // 1. 渲染背景
    if (bgEnabled) {
      this._renderBackground(bgLeft8);
    }
    
    // 2. 收集精灵并分类
    if (sprEnabled) {
      this._renderSprites(sprLeft8);
    }
    
    // 3. Flush到Canvas
    this._flushBuffer();
  }
  
  // ==================== 缓冲操作 ====================
  
  /** 清空像素缓冲 (填充背景色, 标记为背景color0, 允许behindBg精灵覆盖) */
  private _clearBuffer(): void {
    const bgColor = this._paletteLUT[this._bgColorIndex];
    this._pixelBuffer.fill(bgColor);
    // 初始状态: isBg=1, colorIdx=0
    // 这样当背景禁用时, behindBg精灵可以绘制在背景色上
    this._colorMask.fill(4);  // bit2=1 (isBg), colorIdx=0
    this._dirtyAll = true;
  }
  
  /** 
   * 写入像素到缓冲
   * @param px, py 屏幕坐标
   * @param color RGBA Uint32
   * @param colorIdx tile颜色索引 (0-3)
   * @param isBg 是否背景像素
   */
  private _writePixel(px: number, py: number, color: number, colorIdx: number, isBg: boolean): void {
    if (px < 0 || px >= SCREEN_WIDTH || py < 0 || py >= SCREEN_HEIGHT) return;
    const offset = py * SCREEN_WIDTH + px;
    this._pixelBuffer[offset] = color;
    this._colorMask[offset] = colorIdx | (isBg ? 4 : 0);
  }
  
  // ==================== 背景渲染 (4屏滚动) ====================
  
  /**
   * 渲染Nametable背景 — 正确支持4屏滚动
   * 
   * Nametable坐标空间: 2×2网格
   *   NT 0: (0,0)-(255,239)  像素空间
   *   NT 1: (256,0)-(511,239)
   *   NT 2: (0,240)-(255,479)
   *   NT 3: (256,240)-(511,479)
   * 
   * 每个NT: 32×30 tiles = 256×240 pixels
   * 
   * 可见区域从 (scrollX, scrollY) 开始, 大小为 256×240
   * 需要渲染 33×31 个tile (处理部分可见tile)
   */
  private _renderBackground(left8Enabled: boolean): void {
    const scrollX = this.ds.scrollX & 0x1FF;  // 0-511
    const scrollY = this.ds.scrollY & 0x1DF;  // 0-479 (but actually 0-239 for 2-screen, clamped)
    
    // 起始tile (世界坐标)
    const startTileX = Math.floor(scrollX / TILE_SIZE);
    const startTileY = Math.floor(scrollY / TILE_SIZE);
    
    // 子tile偏移 (0-7)
    const fineX = scrollX % TILE_SIZE;
    const fineY = scrollY % TILE_SIZE;
    
    // 需要渲染的tile范围 (含部分可见)
    // 水平: scrollX可能不是8对齐, 所以需要 32+1 = 33 tiles
    // 垂直: 同上, 需要 30+1 = 31 tiles
    const tilesX = Math.ceil((SCREEN_WIDTH + fineX) / TILE_SIZE);   // 33
    const tilesY = Math.ceil((SCREEN_HEIGHT + fineY) / TILE_SIZE);  // 31
    
    // Pattern Bank 选择 ($2000 bit4)
    const patternBank = (this.ds.ppuCtrl & 0x10) ? 1 : 0;
    
    // 计算世界坐标空间中的nametable排列
    // 在2×2网格中, NT宽度 = 256像素 = 32 tiles, NT高度 = 240像素 = 30 tiles
    const NT_PIXEL_W = NT_WIDTH * TILE_SIZE;   // 256
    const NT_PIXEL_H = NT_HEIGHT * TILE_SIZE;  // 240
    const WORLD_TILES_X = NT_WIDTH * 2;         // 64
    const WORLD_TILES_Y = NT_HEIGHT * 2;        // 60
    
    for (let ty = 0; ty < tilesY; ty++) {
      for (let tx = 0; tx < tilesX; tx++) {
        // 世界tile坐标
        const worldTileX = (startTileX + tx) % WORLD_TILES_X;
        const worldTileY = (startTileY + ty) % WORLD_TILES_Y;
        
        // 确定Nametable
        const ntCol = Math.floor(worldTileX / NT_WIDTH);   // 0 或 1
        const ntRow = Math.floor(worldTileY / NT_HEIGHT);  // 0 或 1
        const ntIndex = this._resolveNametable(ntCol, ntRow);
        
        // 本地tile坐标 (在nametable内)
        const localTileX = worldTileX % NT_WIDTH;
        const localTileY = worldTileY % NT_HEIGHT;
        
        // 读取tile索引
        const nt = this._getNametable(ntIndex);
        const tileOffset = localTileY * NT_WIDTH + localTileX;
        const tileIndex = nt[tileOffset];
        
        // 获取属性
        const attrX = localTileX >> 1;
        const attrY = localTileY >> 1;
        const attrOffset = NT_WIDTH * NT_HEIGHT + attrY * 8 + attrX;
        const attrByte = nt[attrOffset];
        const attrShift = ((localTileX & 1) << 1) | ((localTileY & 1) << 2);
        const paletteGroup = (attrByte >> attrShift) & 0x03;
        
        // 屏幕绘制位置
        const screenX = tx * TILE_SIZE - fineX;
        const screenY = ty * TILE_SIZE - fineY;
        
        // 左8列裁剪
        if (!left8Enabled && screenX + TILE_SIZE <= 8) continue;
        
        // 渲染tile
        this._drawTileToBuffer(
          screenX, screenY,
          tileIndex,
          patternBank,
          paletteGroup,
          false, false,
          false  // 背景tile
        );
      }
    }
  }
  
  /**
   * 根据镜像模式解析实际nametable索引
   */
  private _resolveNametable(ntCol: number, ntRow: number): number {
    switch (this._mirroring) {
      case Mirroring.HORIZONTAL:
        // NT0=NT1, NT2=NT3 → col被忽略
        return ntRow * 2;  // 0 或 2
      case Mirroring.VERTICAL:
        // NT0=NT2, NT1=NT3 → row被忽略
        return ntCol;  // 0 或 1
      case Mirroring.SINGLE_LOW:
        return 0;
      case Mirroring.SINGLE_HIGH:
        return 1;
      case Mirroring.FOUR_SCREEN:
      default:
        return ntRow * 2 + ntCol;
    }
  }
  
  // ==================== 精灵渲染 (含behindBg优先级) ====================
  
  /**
   * 渲染所有精灵
   * 分三批:
   *   1. 后景精灵 (behindBg=true) → 存起来最后渲染
   *   2. 前景精灵 (behindBg=false) → 直接覆盖到缓冲
   *   3. 后景精灵 → 仅在背景color0像素上绘制
   * 
   * 精灵索引优先级: 0最高(最前面) → 63最低(最后面)
   * 渲染顺序: 从63到0 (从后往前, 高优先级覆盖低优先级)
   */
  private _renderSprites(left8Enabled: boolean): void {
    // 收集并分类精灵
    const foregroundSprites: SpriteDrawInfo[] = [];
    const behindBgSprites: SpriteDrawInfo[] = [];
    
    const spriteHeight = (this.ds.ppuCtrl & 0x20) ? 16 : 8;  // 8×8 或 8×16
    const patternBank = (this.ds.ppuCtrl & 0x08) ? 1 : 0;    // 精灵使用哪个PT
    
    for (let i = 63; i >= 0; i--) {
      const sprite = this.ds.getSprite(i);
      
      // 跳过Y=$EF+的未使用精灵
      if (sprite.y >= 0xEF) continue;
      
      const info: SpriteDrawInfo = {
        x: sprite.x,
        y: sprite.y + 1,  // NES精灵Y偏移: 屏幕坐标 = OAM Y + 1 (因为精灵在扫描线之后才显示)
        tileIndex: sprite.tileIndex,
        hFlip: (sprite.attr & 0x80) !== 0,
        vFlip: (sprite.attr & 0x40) !== 0,
        behindBg: (sprite.attr & 0x20) !== 0,
        paletteGroup: ((sprite.attr & 0x03) + 4) & 0x07,  // 精灵调色板 4-7
        patternBank,
        spriteHeight,
        spriteIndex: i,
      };
      
      if (info.behindBg) {
        behindBgSprites.push(info);
      } else {
        foregroundSprites.push(info);
      }
    }
    
    // 1. 渲染前景精灵 (直接覆盖, 索引小的后渲染=在上面)
    for (const info of foregroundSprites) {
      this._drawSpriteToBuffer(info, false, left8Enabled);
    }
    
    // 2. 渲染后景精灵 (仅在背景color0像素上绘制)
    for (const info of behindBgSprites) {
      this._drawSpriteToBuffer(info, true, left8Enabled);
    }
  }
  
  /**
   * 绘制精灵到像素缓冲
   */
  private _drawSpriteToBuffer(info: SpriteDrawInfo, behindBg: boolean, left8Enabled: boolean): void {
    const { x, y, tileIndex, hFlip, vFlip, paletteGroup, patternBank, spriteHeight } = info;
    
    // 8×16 精灵使用两个相邻tile
    const tileCount = spriteHeight === 16 ? 2 : 1;
    
    for (let t = 0; t < tileCount; t++) {
      let actualTileIndex: number;
      if (spriteHeight === 16) {
        // 8×16: tileIndex & 0xFE 是基础, t=0用低tile, t=1用高tile
        // vFlip时顺序反转
        actualTileIndex = vFlip 
          ? (tileIndex & 0xFE) + (1 - t)
          : (tileIndex & 0xFE) + t;
      } else {
        actualTileIndex = tileIndex;
      }
      
      const tileY = y + t * 8;
      const chrBank = patternBank === 0 ? this._activeChr0 : this._activeChr1;
      const chrData = this._chrBanks.get(chrBank);
      if (!chrData) continue;
      
      // 调色板
      const palette: number[] = [];
      for (let c = 0; c < 4; c++) {
        const colorIndex = this.ds.paletteRam[paletteGroup * 4 + c] & 0x3F;
        palette[c] = this._paletteLUT[colorIndex];
      }
      
      const baseAddr = (actualTileIndex & 0xFF) * 16;
      
      for (let row = 0; row < 8; row++) {
        const actualRow = vFlip ? (7 - row) : row;
        const plane0 = chrData[baseAddr + actualRow];
        const plane1 = chrData[baseAddr + actualRow + 8];
        
        const screenY = tileY + row;
        if (screenY < 0 || screenY >= SCREEN_HEIGHT) continue;
        
        for (let col = 0; col < 8; col++) {
          const actualCol = hFlip ? (7 - col) : col;
          const bit = 7 - actualCol;
          const colorIdx = ((plane1 >> bit) & 1) << 1 | ((plane0 >> bit) & 1);
          
          // 精灵color0 = 透明
          if (colorIdx === 0) continue;
          
          const screenX = x + col;
          if (screenX < 0 || screenX >= SCREEN_WIDTH) continue;
          
          // 左8列裁剪
          if (!left8Enabled && screenX < 8) continue;
          
          const offset = screenY * SCREEN_WIDTH + screenX;
          
          if (behindBg) {
            // 后景精灵: 仅在背景color0像素上绘制
            const mask = this._colorMask[offset];
            const bgColorIdx = mask & 0x03;
            const isBg = (mask & 4) !== 0;
            // 只有是背景像素且colorIdx=0时才绘制
            if (isBg && bgColorIdx === 0) {
              this._pixelBuffer[offset] = palette[colorIdx];
              this._colorMask[offset] = colorIdx | 0;  // isBg=0 (现在是精灵)
            }
          } else {
            // 前景精灵: 总是覆盖
            this._pixelBuffer[offset] = palette[colorIdx];
            this._colorMask[offset] = colorIdx | 0;  // isBg=0
          }
        }
      }
    }
  }
  
  // ==================== Tile渲染到缓冲 ====================
  
  /**
   * 解码tile并写入像素缓冲
   */
  private _drawTileToBuffer(
    x: number, y: number,
    tileIndex: number,
    patternBank: number,
    paletteGroup: number,
    hFlip: boolean, vFlip: boolean,
    isSprite: boolean
  ): void {
    const chrBank = patternBank === 0 ? this._activeChr0 : this._activeChr1;
    const cacheKey = `${chrBank}_${tileIndex}_${paletteGroup}_${hFlip ? 1 : 0}_${vFlip ? 1 : 0}`;
    
    let cached = this._tileCache.get(cacheKey);
    if (!cached) {
      cached = this._decodeTileData(chrBank, tileIndex, paletteGroup, hFlip, vFlip, isSprite);
      this._tileCache.set(cacheKey, cached);
    }
    
    // 将cached的像素写入缓冲
    const imgData = cached.imageData;
    const pixels = imgData.data;  // Uint8ClampedArray RGBA
    
    // 计算tile的可见区域
    const clipLeft = Math.max(0, -x);
    const clipTop = Math.max(0, -y);
    const clipRight = Math.min(TILE_SIZE, SCREEN_WIDTH - x);
    const clipBottom = Math.min(TILE_SIZE, SCREEN_HEIGHT - y);
    
    for (let row = clipTop; row < clipBottom; row++) {
      const screenY = y + row;
      if (screenY < 0 || screenY >= SCREEN_HEIGHT) continue;
      
      for (let col = clipLeft; col < clipRight; col++) {
        const screenX = x + col;
        if (screenX < 0 || screenX >= SCREEN_WIDTH) continue;
        
        const pixelOffset = (row * TILE_SIZE + col) * 4;
        const alpha = pixels[pixelOffset + 3];
        
        if (alpha === 0) continue;  // 精灵透明色, 但背景不应该有
        
        const r = pixels[pixelOffset];
        const g = pixels[pixelOffset + 1];
        const b = pixels[pixelOffset + 2];
        
        // 构建 RGBA Uint32 (little-endian: ABGR)
        const color = (alpha << 24) | (b << 16) | (g << 8) | r;
        
        // 获取colorIdx
        const colorIdx = cached.colorMask[row * TILE_SIZE + col];
        
        const offset = screenY * SCREEN_WIDTH + screenX;
        this._pixelBuffer[offset] = color;
        this._colorMask[offset] = colorIdx | (isSprite ? 0 : 4);  // isBg标记
      }
    }
  }
  
  /**
   * 解码单个tile为像素数据和色彩标记
   */
  private _decodeTileData(
    chrBankId: number,
    tileIndex: number,
    paletteGroup: number,
    hFlip: boolean, vFlip: boolean,
    isSprite: boolean
  ): { imageData: any; colorMask: Uint8Array } {
    const chrData = this._chrBanks.get(chrBankId);
    const colorMask = new Uint8Array(TILE_SIZE * TILE_SIZE);
    
    // 创建 ImageData
    let imageData: any;
    if (this._offscreenCtx && this._offscreenCtx.createImageData) {
      imageData = this._offscreenCtx.createImageData(TILE_SIZE, TILE_SIZE);
    } else {
      try {
        imageData = this.ctx.createImageData(TILE_SIZE, TILE_SIZE);
      } catch (e) {
        imageData = { data: new Uint8ClampedArray(TILE_SIZE * TILE_SIZE * 4) };
      }
    }
    const pixels = imageData.data;
    
    if (!chrData) {
      // CHR Bank未加载 → 返回透明
      return { imageData, colorMask };
    }
    
    const baseAddr = tileIndex * 16;
    
    // 构建调色板
    const palette: number[] = [];
    for (let c = 0; c < 4; c++) {
      let colorIndex: number;
      if (c === 0 && !isSprite) {
        // 背景tile color0 = 通用背景色
        colorIndex = this._bgColorIndex;
      } else {
        colorIndex = this.ds.paletteRam[paletteGroup * 4 + c] & 0x3F;
      }
      palette[c] = this._paletteLUT[colorIndex];
    }
    
    for (let row = 0; row < 8; row++) {
      const actualRow = vFlip ? (7 - row) : row;
      const plane0 = chrData[baseAddr + actualRow];
      const plane1 = chrData[baseAddr + actualRow + 8];
      
      for (let col = 0; col < 8; col++) {
        const actualCol = hFlip ? (7 - col) : col;
        const bit = 7 - actualCol;
        const colorIdx = ((plane1 >> bit) & 1) << 1 | ((plane0 >> bit) & 1);
        
        const pixelOffset = (row * 8 + col) * 4;
        const color = palette[colorIdx];
        
        // 解包 RGBA Uint32
        pixels[pixelOffset]     = color & 0xFF;          // R
        pixels[pixelOffset + 1] = (color >> 8) & 0xFF;   // G
        pixels[pixelOffset + 2] = (color >> 16) & 0xFF;  // B
        // 背景tile color0 = 不透明 | 精灵tile color0 = 透明
        pixels[pixelOffset + 3] = (colorIdx === 0 && isSprite) ? 0 : 255;
        
        colorMask[row * TILE_SIZE + col] = colorIdx;
      }
    }
    
    return { imageData, colorMask };
  }
  
  // ==================== 缓冲Flush ====================
  
  /**
   * 将像素缓冲写入Canvas
   */
  private _flushBuffer(): void {
    const targetCtx = this._offscreenCtx ?? this.ctx;
    
    if (!targetCtx) {
      console.warn('[Renderer] 无可用Canvas上下文');
      return;
    }
    
    // 使用缓存的ImageData避免重复分配
    let imageData = this._imageDataCache;
    if (!imageData) {
      try {
        imageData = targetCtx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
        this._imageDataCache = imageData;
      } catch (e) {
        console.error('[Renderer] 无法创建ImageData');
        return;
      }
    }
    
    const dst = imageData.data;  // Uint8ClampedArray
    
    // 批量写入 RGBA (每个像素4字节)
    for (let i = 0; i < SCREEN_WIDTH * SCREEN_HEIGHT; i++) {
      const color = this._pixelBuffer[i];
      const offset = i * 4;
      dst[offset]     = color & 0xFF;          // R
      dst[offset + 1] = (color >> 8) & 0xFF;   // G
      dst[offset + 2] = (color >> 16) & 0xFF;  // B
      dst[offset + 3] = (color >> 24) & 0xFF;  // A
    }
    
    // 写入离屏Canvas
    targetCtx.putImageData(imageData, 0, 0);
    
    // 如果用了离屏Canvas，复制到主Canvas
    if (this._offscreen && this._offscreenCtx) {
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(
        this._offscreen,
        0, 0, SCREEN_WIDTH, SCREEN_HEIGHT,
        0, 0, SCREEN_WIDTH * this._scale, SCREEN_HEIGHT * this._scale
      );
    }
  }
  
  // ==================== 辅助方法 ====================
  
  private _getNametable(index: number): Uint8Array {
    switch (index) {
      case 0: return this.ds.nametable0;
      case 1: return this.ds.nametable1;
      case 2: return this.ds.nametable2;
      case 3: return this.ds.nametable3;
      default: return this.ds.nametable0;
    }
  }
  
  /** 设置缩放 */
  setScale(scale: number): void {
    this._scale = Math.max(1, Math.min(4, scale));
  }
  
  /** 清除tile缓存 */
  clearTileCache(): void {
    this._tileCache.clear();
    this._dirtyAll = true;
  }
  
  /** 获取canvas尺寸 */
  getCanvasSize(): { width: number; height: number } {
    return {
      width: SCREEN_WIDTH * this._scale,
      height: SCREEN_HEIGHT * this._scale,
    };
  }
  
  /** 获取当前镜像模式 */
  get mirroring(): Mirroring { return this._mirroring; }
  
  /** 获取滚动偏移 (调试用) */
  get scrollDebug(): { scrollX: number; scrollY: number } {
    return { scrollX: this.ds.scrollX, scrollY: this.ds.scrollY };
  }
  
  /** 获取活跃精灵列表 (调试用) */
  getSpritesDebug(): SpriteDrawInfo[] {
    const result: SpriteDrawInfo[] = [];
    const spriteHeight = (this.ds.ppuCtrl & 0x20) ? 16 : 8;
    const patternBank = (this.ds.ppuCtrl & 0x08) ? 1 : 0;
    
    for (let i = 0; i < SPRITE_COUNT; i++) {
      const sprite = this.ds.getSprite(i);
      if (sprite.y >= 0xEF) continue;
      
      result.push({
        x: sprite.x,
        y: sprite.y + 1,
        tileIndex: sprite.tileIndex,
        hFlip: (sprite.attr & 0x80) !== 0,
        vFlip: (sprite.attr & 0x40) !== 0,
        behindBg: (sprite.attr & 0x20) !== 0,
        paletteGroup: ((sprite.attr & 0x03) + 4) & 0x07,
        patternBank,
        spriteHeight,
        spriteIndex: i,
      });
    }
    return result;
  }
  
  /** 获取像素缓冲 (调试用 — 返回RGBA数据) */
  getPixelBufferDebug(): Uint32Array {
    return this._pixelBuffer;
  }
  
  /** 获取色彩标记缓冲 (调试用) */
  getColorMaskDebug(): Uint8Array {
    return this._colorMask;
  }
}

/** 精灵绘制信息 */
export interface SpriteDrawInfo {
  x: number;
  y: number;
  tileIndex: number;
  hFlip: boolean;
  vFlip: boolean;
  behindBg: boolean;
  paletteGroup: number;
  patternBank: number;
  spriteHeight: number;
  spriteIndex: number;
}
