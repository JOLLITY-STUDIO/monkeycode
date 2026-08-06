import { segmentTable, type SegmentEntry, type TextChar } from '../../../game-engine/native-game/tsubasa/banks/prg/bank-03-segment-table';
import CHR_BANK_00 from '../../../rom-data/chr-bank-00';

/* ═══════════════════════════════════════════
   控制码映射
   ═══════════════════════════════════════════ */
const CONTROL_LABEL: Record<number, string> = {
  0xFC: '⏎换行', 0xDC: '◎新对话框', 0x00: '∅',
  0xFB: '★', 0xFD: '◆', 0xFE: '◇', 0xFA: '▶', 0xF9: '◀',
  0xF8: '▲', 0xF7: '▼', 0xF3: '配色', 0xF4: '色戻', 0xF5: '色进',
  0xE1: '名前', 0xDE: '速度', 0xED: '暂停', 0xEE: '玩家', 0xEF: '对手',
  0xEA: '开窗', 0xEB: '关中', 0xEC: '选窗', 0xE8: '动画', 0xE9: '清屏',
  0xDF: '延迟', 0xDD: '反色', 0xDB: '闪烁', 0xF2: 'END',
};
const BREAK_CODES = new Set([0xFC, 0xDC]);

/* ═══════════════════════════════════════════
   类型定义
   ═══════════════════════════════════════════ */
interface ScriptLine {
  type: 'text' | 'control';
  id: number;
  offset: number;
  text?: string;
  chars?: TextChar[];
  dialogBlockId?: number;
  ctrlHex?: string;
  ctrlLabel?: string;
}

interface DialogLine { chars: TextChar[]; }
interface DialogBlock {
  id: number;
  lines: DialogLine[];
}

interface PlayState {
  blockId: number;
  block: DialogBlock;
  lineIndex: number;
  charIndex: number;
  lineCharCount: number;
  timer: ReturnType<typeof setInterval> | null;
}

/* ═══════════════════════════════════════════
   CHR Tile 解码 + 渲染缓存
   ═══════════════════════════════════════════ */
class TileFont {
  /** 每个 tile 的 8×8 离屏 Canvas（可被 drawImage 缩放） */
  canvases: WechatMiniprogram.OffscreenCanvas[];
  /** 当前渲染用的 tileSize */
  tileSize: number;

  private static PAL: number[][] = [
    [0, 0, 0, 0],        // 0: 透明
    [80, 80, 120, 255],  // 1: 暗灰蓝
    [180, 180, 210, 255],// 2: 浅灰
    [255, 255, 255, 255],// 3: 白色
  ];

  constructor(chrData: readonly number[], tileSize: number) {
    this.canvases = [];
    this.tileSize = tileSize;
    this.decodeAll(chrData);
  }

  private decodeAll(chrData: readonly number[]): void {
    const TILE_BYTES = 16;
    const numTiles = Math.min(Math.floor(chrData.length / TILE_BYTES), 512);
    for (let i = 0; i < numTiles; i++) {
      this.canvases.push(this.buildTile(chrData, i * TILE_BYTES));
    }
    // 补齐空 tile
    const empty = this.createEmptyTile();
    while (this.canvases.length < 512) {
      this.canvases.push(empty);
    }
  }

  private buildTile(chrData: readonly number[], base: number): WechatMiniprogram.OffscreenCanvas {
    const canvs = wx.createOffscreenCanvas({ type: '2d', width: 8, height: 8 });
    const ctx = canvs.getContext('2d')!;
    const img = ctx.createImageData(8, 8);
    for (let y = 0; y < 8; y++) {
      const lo = chrData[base + y];
      const hi = chrData[base + y + 8];
      for (let x = 0; x < 8; x++) {
        const bit = 7 - x;
        const ci = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
        const p = (y * 8 + x) * 4;
        img.data[p] = TileFont.PAL[ci][0];
        img.data[p + 1] = TileFont.PAL[ci][1];
        img.data[p + 2] = TileFont.PAL[ci][2];
        img.data[p + 3] = TileFont.PAL[ci][3];
      }
    }
    ctx.putImageData(img, 0, 0);
    return canvs;
  }

  private createEmptyTile(): WechatMiniprogram.OffscreenCanvas {
    const canvs = wx.createOffscreenCanvas({ type: '2d', width: 8, height: 8 });
    const ctx = canvs.getContext('2d')!;
    ctx.clearRect(0, 0, 8, 8);
    return canvs;
  }

  /** 在 Canvas 上绘制一个 tile */
  drawTile(
    ctx: CanvasRenderingContext2D,
    tileIdx: number,
    dx: number, dy: number,
    isDakuten: boolean, isHandakuten: boolean,
  ): void {
    const tileSize = this.tileSize;
    if (tileIdx < 0 || tileIdx >= this.canvases.length) return;
    const src = this.canvases[tileIdx] as any;
    ctx.drawImage(src, 0, 0, 8, 8, dx, dy, tileSize, tileSize);

    // 浊音/半浊音标记（右上角）
    if (isDakuten) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(dx + tileSize * 0.56, dy + 1, 2.5, 2.5);
      ctx.fillRect(dx + tileSize * 0.78, dy + 1, 2.5, 2.5);
    }
    if (isHandakuten) {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(dx + tileSize * 0.68, dy + 2.5, tileSize * 0.13, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/* ═══════════════════════════════════════════
   页 面
   ═══════════════════════════════════════════ */
Page({
  data: {
    lines: [] as ScriptLine[],
    stats: { total: 0, text: 0, control: 0 },
    mode: 'auto' as 'auto' | 'raw',
    searchText: '',
    playingBlockId: -1,
    dialogText: '',
    dialogBlocksCount: 0,
  },

  font: null as TileFont | null,
  dialogBlocks: [] as DialogBlock[],
  canvasCtx: null as CanvasRenderingContext2D | null,
  canvasW: 0,
  canvasH: 0,
  tileSize: 16,
  boxX: 4,
  boxY: 4,
  maxLines: 3,
  maxCols: 20,
  play: null as PlayState | null,

  /* ── 生命周期 ── */
  onLoad() {
    const sys = wx.getSystemInfoSync();
    // tileSize 选用能完整 2x 缩放的偶数尺寸
    const maxPixels = sys.windowWidth - 16;
    const testSizes = [16, 18, 20, 14, 12];
    let ts = 16;
    for (const s of testSizes) {
      if (s * 22 <= maxPixels) { ts = s; break; }
    }
    this.tileSize = ts;
    this.maxCols = Math.floor((maxPixels - 8) / ts);
    this.boxX = Math.floor((sys.windowWidth - this.maxCols * ts) / 2);

    this.font = new TileFont(CHR_BANK_00, ts);
    this.buildScript();
  },

  onReady() {
    this.initCanvas();
  },

  onUnload() {
    this.stopPlay();
  },

  /* ── Canvas 初始化 ── */
  initCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#dialogCanvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) return;
        const canvas = res[0].node as HTMLCanvasElement;
        const displayW = res[0].width as number;
        const displayH = res[0].height as number;
        this.canvasW = displayW;
        this.canvasH = displayH;
        const dpr = wx.getSystemInfoSync().pixelRatio || 2;
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.scale(dpr, dpr);
        this.canvasCtx = ctx;
        this.drawDialogBg();
      });
  },

  /* ── 对话框绘制 ── */
  drawDialogBg(): void {
    const ctx = this.canvasCtx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.fillStyle = '#0a1628';
    ctx.fillRect(0, 0, this.canvasW, this.canvasH);
    ctx.strokeStyle = '#3a5488';
    ctx.lineWidth = 1;
    ctx.strokeRect(2, 2, this.canvasW - 4, this.canvasH - 4);
  },

  /** 在 Canvas 指定行/列绘一个 tile */
  drawTileAtLine(tileIdx: number, line: number, col: number, isDakuten: boolean, isHandakuten: boolean): void {
    const ctx = this.canvasCtx;
    if (!ctx || !this.font) return;
    const x = this.boxX + col * this.tileSize;
    const y = this.boxY + line * this.tileSize;
    // 清除该 tile 区域
    ctx.fillStyle = '#0a1628';
    ctx.fillRect(x, y, this.tileSize, this.tileSize);
    this.font.drawTile(ctx, tileIdx, x, y, isDakuten, isHandakuten);
  },

  clearDialog(): void {
    this.drawDialogBg();
  },

  /* ── 构建脚本 + 对话块 ── */
  buildScript() {
    const textLines: ScriptLine[] = [];
    const blocks: DialogBlock[] = [];
    let curText = '';
    let curChars: TextChar[] = [];
    let curLines: DialogLine[] = [];
    let blockId = 0;
    let textSegCount = 0;
    let ctrlSegCount = 0;

    const flushText = (seg: SegmentEntry) => {
      if (!curText) return;
      textLines.push({
        type: 'text', id: seg.id, offset: seg.offset - curText.length,
        text: curText, chars: [...curChars],
        dialogBlockId: blockId,
      });
      if (curChars.length) {
        curLines.push({ chars: [...curChars] });
      }
      curText = '';
      curChars = [];
    };

    const newBlock = () => {
      if (curLines.length) {
        blocks.push({ id: blockId, lines: curLines });
        blockId++;
        curLines = [];
      }
    };

    for (let i = 0; i < segmentTable.length; i++) {
      const seg = segmentTable[i];
      if (seg.type === 'text' && seg.chars) {
        textSegCount++;
        for (const ch of seg.chars) {
          curText += this.charToDisplay(ch);
          curChars.push(ch);
        }
      } else if (seg.type === 'control' && seg.bytes) {
        ctrlSegCount++;
        flushText(seg);
        const hasDC = seg.bytes.includes(0xDC);
        const hasFC = seg.bytes.includes(0xFC);
        if (hasDC) {
          newBlock();
          textLines.push({ type: 'control', id: seg.id, offset: seg.offset, ctrlHex: 'DC', ctrlLabel: CONTROL_LABEL[0xDC] });
        } else if (hasFC) {
          textLines.push({ type: 'control', id: seg.id, offset: seg.offset, ctrlHex: 'FC', ctrlLabel: '' });
        } else if (!(seg.bytes.every(b => b === 0x00) && seg.bytes.length <= 2)) {
          const hexStr = seg.bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
          const labels = seg.bytes.map(b => CONTROL_LABEL[b] || '').filter(Boolean).join(',');
          textLines.push({ type: 'control', id: seg.id, offset: seg.offset, ctrlHex: hexStr, ctrlLabel: labels });
        }
      }
    }

    flushText(segmentTable[segmentTable.length - 1]);
    newBlock();

    this.dialogBlocks = blocks;
    this.setData({
      lines: textLines,
      stats: { total: segmentTable.length, text: textSegCount, control: ctrlSegCount },
      dialogBlocksCount: blocks.length,
    });
  },

  charToDisplay(ch: TextChar): string {
    if (ch.label) return ch.label;
    let p = '';
    if (ch.markType === 'dakuten') p = 'ﾞ';
    if (ch.markType === 'handakuten') p = 'ﾟ';
    return p + '〈' + ch.tile.toString(16).toUpperCase().padStart(2, '0') + '〉';
  },

  /* ── 事件 ── */
  switchMode(e: WechatMiniprogram.TouchEvent) {
    const mode = e.currentTarget.dataset.mode as string;
    this.setData({ mode: mode as 'auto' | 'raw' });
  },

  onSearchInput(e: WechatMiniprogram.InputEvent) {
    this.setData({ searchText: e.detail.value || '' });
  },

  onLineTap(e: WechatMiniprogram.TouchEvent) {
    const blockId = e.currentTarget.dataset.block;
    if (blockId === undefined || blockId === '') return;
    this.playDialogBlock(parseInt(blockId, 10));
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  },

  onShareAppMessage() {
    return { title: '天使之翼2 — Bank03 对话脚本' };
  },

  /* ── 打字机动画 ── */
  playDialogBlock(blockId: number) {
    this.stopPlay();
    const block = this.dialogBlocks[blockId];
    if (!block || block.lines.length === 0) return;

    this.clearDialog();
    this.setData({ playingBlockId: blockId, dialogText: '' });

    const state: PlayState = {
      blockId, block,
      lineIndex: 0,
      charIndex: 0,
      lineCharCount: 0,
      timer: null,
    };
    this.play = state;

    const typeDelay = 40;
    let autoTimeout: ReturnType<typeof setTimeout> | null = null;

    state.timer = setInterval(() => {
      if (!this.play || this.play !== state) {
        clearInterval(state.timer!);
        if (autoTimeout) clearTimeout(autoTimeout);
        return;
      }
      const next = this.typeNextChar(state);
      if (!next) {
        clearInterval(state.timer!);
        state.timer = null;
        const nextBid = blockId + 1;
        if (nextBid < this.dialogBlocks.length) {
          autoTimeout = setTimeout(() => this.playDialogBlock(nextBid), 800);
        } else {
          this.setData({ playingBlockId: -1 });
        }
      }
    }, typeDelay);
  },

  typeNextChar(s: PlayState): boolean {
    const ctx = this.canvasCtx;
    if (!ctx || !this.font || !this.canvasW) return false;

    const lines = s.block.lines;
    while (s.lineIndex < lines.length) {
      const line = lines[s.lineIndex];
      const chars = line.chars;

      while (s.charIndex < chars.length) {
        const ch = chars[s.charIndex];
        const nextCh = (s.charIndex + 1 < chars.length) ? chars[s.charIndex + 1] : null;
        const isDakuten = nextCh ? (nextCh.markType === 'dakuten') : false;
        const isHandakuten = nextCh ? (nextCh.markType === 'handakuten') : false;

        // 自动换行
        if (s.lineCharCount >= this.maxCols) {
          s.lineCharCount = 0;
        }

        this.drawTileAtLine(ch.tile, s.lineIndex % this.maxLines, s.lineCharCount, isDakuten, isHandakuten);
        s.charIndex++;
        s.lineCharCount++;
        return true; // 一字符一帧
      }

      // 换行
      s.charIndex = 0;
      s.lineIndex++;
      s.lineCharCount = 0;

      // 超过可见行 → 清屏续排
      if (s.lineIndex >= this.maxLines && s.lineIndex < lines.length) {
        this.clearDialog();
        const startLine = s.lineIndex;
        for (let l = startLine; l < lines.length && (l - startLine) < this.maxLines; l++) {
          for (let c = 0; c < lines[l].chars.length; c++) {
            const ch2 = lines[l].chars[c];
            const nc = (c + 1 < lines[l].chars.length) ? lines[l].chars[c + 1] : null;
            this.drawTileAtLine(ch2.tile, l - startLine, c,
              nc ? nc.markType === 'dakuten' : false,
              nc ? nc.markType === 'handakuten' : false);
          }
        }
      }
      return s.lineIndex < lines.length;
    }
    return false;
  },

  stopPlay() {
    if (this.play?.timer) {
      clearInterval(this.play.timer);
      this.play.timer = null;
    }
    this.play = null;
  },
});
