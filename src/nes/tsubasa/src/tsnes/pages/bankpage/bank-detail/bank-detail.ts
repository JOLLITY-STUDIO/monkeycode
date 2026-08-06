/**
 * Bank 详情页 — 支持 HEX / 柱状图 / 记录视图 / CHR 图块画廊
 * 自动检测数据类型：游戏数据 vs 渲染数据
 */
import { NES_PRG_ROM, NES_CHR_ROM } from '../../../rom-data/index';

const BANK_SIZE = 8192;
// CHR 参数: 每个 tile 16 bytes, 8×8 pixel, bank 有 512 tiles
const CHR_TILES = 512;
const CHR_PT_TILES = 256;        // PT0 / PT1 各 256 tiles
const CHR_BYTES_PER_TILE = 16;
const CHR_PT_BYTES = CHR_PT_TILES * CHR_BYTES_PER_TILE; // 4KB
const TILE_PX = 8;             // 原始 8×8 像素
const TILE_COLS_FULL = 32;
const TILE_ROWS_FULL = 16;
const TILE_COLS_PT = 16;         // PT0/PT1 用 16×16 网格
const TILE_ROWS_PT = 16;
const TILE_SCALE = 1;            // 保持原始比例，不放大
const CHR_CANVAS_W_FULL = TILE_COLS_FULL * TILE_PX;  // 256
const CHR_CANVAS_H_FULL = TILE_ROWS_FULL * TILE_PX;  // 128
const CHR_CANVAS_W_PT = TILE_COLS_PT * TILE_PX;      // 128
const CHR_CANVAS_H_PT = TILE_ROWS_PT * TILE_PX;      // 128
const CHR_BANK_COUNT = 16;

// ── 数据类型判定 ──
type DataClass = 'render' | 'game' | 'text' | 'unknown';

/** 判定当前 Bank 的数据类型 */
function classifyBank(bankId: number, type: string): DataClass {
  if (type === 'CHR') return 'render'; // CHR = 肯定是渲染数据
  // PRG banks: 根据 ROM_REFERENCE 描述
  const renderBanks = [13, 14, 15]; // 动画/过场帧 → 直接写 OAM
  const textBanks = [3, 4, 8, 9];   // 文本/对话 → 直接写 NT（Bank 03/04=解说/旁白 typewriter）
  const mixedBanks = [10, 17, 18];  // 场景/地图 → 部分写 NT
  if (renderBanks.includes(bankId)) return 'render';
  if (textBanks.includes(bankId)) return 'text';
  if (mixedBanks.includes(bankId)) return 'text'; // 也尝试文本解读
  return 'game'; // 其余都是游戏数据
}

/** 数据记录 */
interface ParsedRecord {
  offset: number;
  hex: string;
  len: number;
  vals16: number[];
  vals8: number[];
  ascii: string;
}

function byteHex(b: number): string {
  return b.toString(16).toUpperCase().padStart(2, '0');
}

function toAscii(b: number): string {
  return (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
}

Page({
  data: {
    // Bank 元数据
    bankType: '' as string,
    bankId: -1,
    bankLabel: '',
    description: '',
    cpuMap: '',
    codeBytes: 0,
    dataBytes: 0,
    unaccessed: 0,

    // 视图控制
    viewMode: 'hex' as 'hex' | 'histogram' | 'records',
    isCHR: false,

    // 数据类型
    dataClass: 'unknown' as DataClass,
    dataClassLabel: '',
    dataClassHint: '',

    // Hex dump 数据
    hexLines: [] as string[],
    hexAddr: [] as string[],

    // Histogram 数据
    histogramReady: false,

    // ── Record View 数据 ──
    recordMode: 'auto' as 'auto' | '4byte' | 'fc' | '8byte' | '16byte',
    recordAutoMethod: '',       // 自动检测到的方法
    records: [] as ParsedRecord[],
    recordStats: {              // 统计摘要
      $00count: 0,
      $FCcount: 0,
      $FDcount: 0,
      $FFcount: 0,
      avgBlockSize: 0,
      totalBlocks: 0,
    },
    recordsReady: false,

    // CHR 常量
    TILE_COLS: TILE_COLS_FULL,
    TILE_ROWS: TILE_ROWS_FULL,

    // ── CHR 图块映射 ──
    tileViewMode: 'mapped' as 'direct' | 'mapped',  // 查看图块 / 数据映射
    chrBankIdx: 0,              // 当前映射的 CHR Bank (0–15)
    ptMode: 'pt0' as 'pt0' | 'pt1' | 'all',  // PT0=0-255 / PT1=256-511 / all
    tileCanvasWidth: 128,       // 图块画布逻辑宽度（px，原始比例）
    tileCanvasHeight: 128,      // 图块画布逻辑高度（px）
    tileCanvasHint: '',        // 图块视图底部提示
  },

  _bankData: [] as number[],
  _chrBankData: [] as number[], // 当前选中的 CHR bank 数据

  // ── 生命周期 ──
  onLoad(options: any) {
    const type = options.type || 'PRG';
    const id = parseInt(options.id || '0', 10);
    const isCHR = type === 'CHR';
    const label = `${type} Bank ${String(id).padStart(2, '0')}`;
    const desc = this._getDescription(type, id);
    const dClass = classifyBank(id, type);

    // 读取 Bank 数据
    const src = isCHR ? NES_CHR_ROM : NES_PRG_ROM;
    const offset = id * BANK_SIZE;
    const bankData: number[] = [];
    for (let i = 0; i < BANK_SIZE; i++) {
      bankData.push(src[offset + i]);
    }
    this._bankData = bankData;

    // 预加载默认 CHR bank (00) 供图块视图使用
    this._loadCHRBank(0);

    // 统计
    const stats = this._getStats(type, id);
    const cpuMap = isCHR
      ? `PPU $${(id * 0x2000).toString(16).toUpperCase().padStart(4, '0')}`
      : stats.cpu;

    const classLabels: Record<DataClass, string> = {
      render: '🎨 渲染数据',
      game: '📦 游戏数据',
      text: '📝 文本/地图数据',
      unknown: '❓ 未知',
    };
    const classHints: Record<DataClass, string> = {
      render: '此数据直接写入 PPU OAM/VRAM → 可模拟渲染环境查看',
      game: '此数据为游戏逻辑数据（球员/关卡/剧情） → 不需 VRAM 模拟',
      text: '此数据用于 Nametable 文本/地图 ← 可搭配 NT+PAL 渲染',
      unknown: '',
    };

    this.setData({
      bankType: type,
      bankId: id,
      bankLabel: label,
      description: desc,
      cpuMap,
      codeBytes: stats.code,
      dataBytes: stats.data,
      unaccessed: stats.unacc,
      isCHR,
      viewMode: isCHR ? 'hex' : 'hex',
      dataClass: dClass,
      dataClassLabel: classLabels[dClass],
      dataClassHint: classHints[dClass],
    });

    // 生成 hex dump + 预解析记录
    this._buildHexDump(bankData);
    this._parseRecords(bankData, 'auto');
  },

  onReady() {
    // 默认: PT0 模式，CHR bank 00，256 tiles
    // 所有 bank 都可以切换到图块视图
  },

  // ── 视图切换 ──
  onViewHex() {
    this.setData({ viewMode: 'hex' });
  },
  onViewHistogram() {
    this.setData({ viewMode: 'histogram' });
    if (!this.data.histogramReady) {
      setTimeout(() => this._renderHistogram(), 300);
    }
  },
  onViewRecords() {
    this.setData({ viewMode: 'records' });
    if (!this.data.recordsReady) {
      this._parseRecords(this._bankData, this.data.recordMode);
    }
  },
  onViewCHRTiles() {
    // PRG bank 默认进入"数据映射"模式，CHR bank 默认"查看图块"
    const defaultMode = this.data.isCHR ? 'direct' : 'mapped';
    this.setData({ viewMode: 'tiles', tileViewMode: defaultMode });
    setTimeout(() => this._renderCHRGallery(), 300);
  },
  // 切换「查看图块」/「数据映射」
  onTileViewModeSwitch(e: any) {
    const mode = e.currentTarget.dataset.mode as 'direct' | 'mapped';
    this.setData({ tileViewMode: mode });
    setTimeout(() => this._renderCHRGallery(), 200);
  },
  // 切换 CHR Bank (图块数据源)
  onCHRBankSelect(e: any) {
    const idx = parseInt(e.currentTarget.dataset.idx, 10);
    if (isNaN(idx) || idx < 0 || idx >= CHR_BANK_COUNT) return;
    this._loadCHRBank(idx);
    this.setData({ chrBankIdx: idx });
    setTimeout(() => this._renderCHRGallery(), 200);
  },
  // 切换 PT0 / PT1 / 全部
  onPTModeSwitch(e: any) {
    const mode = e.currentTarget.dataset.mode as 'pt0' | 'pt1' | 'all';
    this.setData({ ptMode: mode });
    setTimeout(() => this._renderCHRGallery(), 200);
  },
  // 从 NES_CHR_ROM 加载指定 CHR bank 到 _chrBankData
  _loadCHRBank(idx: number) {
    const offset = idx * BANK_SIZE;
    const data: number[] = [];
    for (let i = 0; i < BANK_SIZE; i++) {
      data.push(NES_CHR_ROM[offset + i]);
    }
    this._chrBankData = data;
  },
  // 记录视图内切换解析方式
  onRecordModeSwitch(e: any) {
    const mode = e.currentTarget.dataset.mode as 'auto' | '4byte' | 'fc' | '8byte' | '16byte';
    this.setData({ recordMode: mode });
    this._parseRecords(this._bankData, mode);
  },


  // ── 记录解析（核心逻辑) ──
  /** 用多种方式解析 Record 并填充 data */
  _parseRecords(data: number[], mode: string) {
    const stats = {
      $00count: 0, $FCcount: 0, $FDcount: 0, $FFcount: 0,
      avgBlockSize: 0, totalBlocks: 0,
    };
    for (const b of data) {
      if (b === 0x00) stats.$00count++;
      if (b === 0xFC) stats.$FCcount++;
      if (b === 0xFD) stats.$FDcount++;
      if (b === 0xFF) stats.$FFcount++;
    }

    let records: ParsedRecord[];
    let autoMethod = '';

    if (mode === 'auto') {
      // 自动检测最佳方式: 看 $FC 密度
      if (stats.$FCcount > 200) {
        autoMethod = '$FC 分隔 (检测到分隔符)';
        records = this._parseByFC(data);
      } else if (this.data.isCHR) {
        autoMethod = '16-byte tiles (CHR 2bpp)';
        records = this._parseBySize(data, 16);
      } else {
        // 默认 4-byte（$A72C 格式）
        autoMethod = '4-byte 记录 ($A72C 默认格式)';
        records = this._parseBySize(data, 4);
      }
    } else {
      autoMethod = `${mode} 手动模式`;
      if (mode === 'fc') records = this._parseByFC(data);
      else if (mode === '8byte') records = this._parseBySize(data, 8);
      else if (mode === '16byte') records = this._parseBySize(data, 16);
      else records = this._parseBySize(data, 4); // 默认 4-byte
    }

    const blockSizes = records.map(r => r.len);
    stats.totalBlocks = records.length;
    stats.avgBlockSize = records.length > 0
      ? Math.round(blockSizes.reduce((a, b) => a + b, 0) / records.length)
      : 0;

    this.setData({
      recordAutoMethod: autoMethod,
      records: records.slice(0, 100), // 最多展示 100 条
      recordStats: stats,
      recordsReady: true,
    });
  },

  /** 按 $FC 字节切分 */
  _parseByFC(data: number[]): ParsedRecord[] {
    const out: ParsedRecord[] = [];
    let start = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0xFC) {
        if (i > start + 1) {
          const chunk = data.slice(start, i);
          out.push(this._makeRecord(start, chunk));
        }
        start = i + 1;
      }
    }
    if (data.length > start + 1) {
      out.push(this._makeRecord(start, data.slice(start)));
    }
    return out;
  },

  /** 按固定字节切分 */
  _parseBySize(data: number[], size: number): ParsedRecord[] {
    const out: ParsedRecord[] = [];
    for (let off = 0; off + size <= data.length; off += size) {
      out.push(this._makeRecord(off, data.slice(off, off + size)));
    }
    return out;
  },

  /** 构建单条记录 */
  _makeRecord(offset: number, chunk: number[]): ParsedRecord {
    const vals16: number[] = [];
    for (let i = 0; i + 1 < chunk.length; i += 2) {
      vals16.push(chunk[i] | (chunk[i + 1] << 8));
    }
    return {
      offset,
      len: chunk.length,
      hex: chunk.map(b => byteHex(b)).join(' '),
      vals16,
      vals8: [...chunk],
      ascii: chunk.map(b => toAscii(b)).join(''),
    };
  },

  // ── HEX DUMP ──
  _buildHexDump(data: number[]) {
    const hexLines: string[] = [];
    const hexAddr: string[] = [];
    for (let addr = 0; addr < data.length; addr += 16) {
      const row = data.slice(addr, addr + 16);
      const hexPart = row.map(b => byteHex(b)).join(' ');
      const asciiPart = row.map(b => toAscii(b)).join('');
      hexLines.push(`${hexPart.padEnd(48)} ${asciiPart}`);
      hexAddr.push(byteHex(addr >> 8) + byteHex(addr & 0xFF));
    }
    this.setData({ hexLines, hexAddr });
  },

  // ── 字节柱状图 (Canvas) ──
  _renderHistogram() {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('#histoCvs')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        const canvas = res?.[0]?.node;
        if (!canvas) {
          setTimeout(() => that._renderHistogram(), 300);
          return;
        }
        const w = res[0].width;
        const h = res[0].height;
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        const freq = new Array(256).fill(0);
        for (const b of that._bankData) freq[b]++;
        const maxFreq = Math.max(...freq);

        const barW = (w - 2) / 256;
        const chartH = h - 20;

        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = '#161b22';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= 4; i++) {
          const y = chartH - (chartH * i / 4);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        for (let i = 0; i < 256; i++) {
          const barH = maxFreq > 0 ? (freq[i] / maxFreq) * chartH : 0;
          const x = 1 + i * barW;
          const y = chartH - barH;
          const r = i & 0x80 ? 88 : 63;
          const g = i & 0x40 ? 166 : 251;
          const b = i & 0x20 ? 255 : 149;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, barW - 1, barH);
        }

        ctx.fillStyle = '#484f58';
        ctx.font = '10px monospace';
        for (let i = 0; i < 256; i += 32) {
          ctx.fillText(byteHex(i), 1 + i * barW, h - 2);
        }

        that.setData({ histogramReady: true });
      });
  },

  // ── 图块渲染入口（分发）─
  _renderCHRGallery() {
    if (this.data.tileViewMode === 'mapped' && !this.data.isCHR) {
      this._renderDataAsTiles();
    } else {
      this._renderCHRDirect();
    }
  },

  // ── 模式 A：直接展示 CHR Bank 图块 ──
  _renderCHRDirect() {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('#chrCanvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        const canvas = res?.[0]?.node;
        if (!canvas) { setTimeout(() => that._renderCHRGallery(), 300); return; }
        const isPT = that.data.ptMode !== 'all';
        const cw = isPT ? CHR_CANVAS_W_PT : CHR_CANVAS_W_FULL;
        const ch = isPT ? CHR_CANVAS_H_PT : CHR_CANVAS_H_FULL;
        canvas.width = cw; canvas.height = ch;
        const hint = `CHR Bank ${that.data.chrBankIdx} · ${that.data.ptMode === 'pt0' ? 'PT0 0–255' : that.data.ptMode === 'pt1' ? 'PT1 256–511' : '全部 0–511'} · ${cw}×${ch}px · 8×8px 原始比例`;
        that.setData({ tileCanvasWidth: cw, tileCanvasHeight: ch, tileCanvasHint: hint });
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, cw, ch);

        const palette = ['#010409', '#484f58', '#8b949e', '#e6edf3'];
        const data = that._chrBankData;
        const tcw = TILE_PX; // 原始 8px
        const cols = isPT ? TILE_COLS_PT : TILE_COLS_FULL;
        let tileStart = 0, tileCount = CHR_TILES;
        if (that.data.ptMode === 'pt0') { tileStart = 0; tileCount = CHR_PT_TILES; }
        else if (that.data.ptMode === 'pt1') { tileStart = CHR_PT_TILES; tileCount = CHR_PT_TILES; }

        for (let ti = 0; ti < tileCount; ti++) {
          const absTile = tileStart + ti;
          const col = ti % cols, row = Math.floor(ti / cols);
          const base = absTile * CHR_BYTES_PER_TILE;
          const ox = col * tcw, oy = row * tcw;
          if (base + 16 > data.length) continue;
          for (let py = 0; py < TILE_PX; py++) {
            const p0 = data[base + py], p1 = data[base + py + 8];
            for (let px = 0; px < TILE_PX; px++) {
              const bit = 7 - px;
              const ci = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1);
              ctx.fillStyle = palette[ci];
              ctx.fillRect(ox + px, oy + py, 1, 1);
            }
          }
        }
      });
  },

  // ── 模式 B：数据映射 → PRG 字节当作 tile 索引渲染 ──
  // 调色板 RGBA uint32 (little-endian 即 ABGR)
  _mappedPalette: [0xFF090401, 0xFF58504F, 0xFF9E948B, 0xFFF3EDE6] as const,
  _tileCache: null as Map<number, Uint32Array> | null,

  _renderDataAsTiles() {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('#chrCanvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        const canvas = res?.[0]?.node;
        if (!canvas) { setTimeout(() => that._renderCHRGallery(), 300); return; }

        const TPR = 16; // tiles per row
        const tilePx = TILE_PX; // 原始 8px
        const totalBytes = that._bankData.length;
        const rows = Math.ceil(totalBytes / TPR);
        const cw = TPR * tilePx; // 128
        const ch = rows * tilePx;
        canvas.width = cw; canvas.height = ch;
        const hint = `映射: ${that.data.bankLabel} → CHR Bank ${that.data.chrBankIdx} (${that.data.ptMode === 'pt0' ? 'PT0' : 'PT1'}) · ${totalBytes}B · ${rows}行 · 16 tiles/row · 8×8px 原始比例`;
        that.setData({ tileCanvasWidth: cw, tileCanvasHeight: ch, tileCanvasHint: hint });
        const ctx = canvas.getContext('2d');

        // 清空 + 背景色
        const imgData = ctx.createImageData(cw, ch);
        const buf = new Uint32Array(imgData.data.buffer);
        buf.fill(0xFF07090D); // dark bg

        const chr = that._chrBankData;
        const ptMode = that.data.ptMode;
        const pal = that._mappedPalette;
        const maxTile = ptMode === 'pt1' ? 511 : 255;
        const ptOffset = ptMode === 'pt1' ? 256 : 0;

        // 预渲染 tile 缓存（避免重复解码同一 tile）
        that._tileCache = new Map();

        for (let i = 0; i < totalBytes; i++) {
          const rawByte = that._bankData[i];
          const tileIdx = rawByte + ptOffset;
          if (tileIdx > maxTile) continue;

          // 从缓存或预渲染中获取 tile 像素
          let tileBuf = that._tileCache.get(tileIdx);
          if (!tileBuf) {
            tileBuf = that._buildTilePixels(chr, tileIdx, pal, 1);
            that._tileCache.set(tileIdx, tileBuf);
          }

          const col = i % TPR;
          const row = Math.floor(i / TPR);
          const ox = col * tilePx;
          const oy = row * tilePx;
          that._blitTileToBuffer(buf, cw, ox, oy, tileBuf, tilePx);
        }

        ctx.putImageData(imgData, 0, 0);
        that._tileCache = null; // 释放
      });
  },

  /** 解码一个 CHR tile 为原始比例的 Uint32Array (scale×8 × scale×8 pixels) */
  _buildTilePixels(chr: number[], tileIdx: number, pal: readonly number[], scale: number): Uint32Array {
    const size = TILE_PX * scale;
    const out = new Uint32Array(size * size);
    const base = tileIdx * CHR_BYTES_PER_TILE;
    for (let py = 0; py < TILE_PX; py++) {
      const p0 = chr[base + py];
      const p1 = chr[base + py + 8];
      for (let px = 0; px < TILE_PX; px++) {
        const bit = 7 - px;
        const ci = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1);
        const color = pal[ci] >>> 0;
        const sx = px * scale, sy = py * scale;
        for (let dy = 0; dy < scale; dy++) {
          const rowOff = (sy + dy) * size + sx;
          for (let dx = 0; dx < scale; dx++) {
            out[rowOff + dx] = color;
          }
        }
      }
    }
    return out;
  },

  /** 将 tile 像素 blit 到大画布 buffer 的 (ox, oy) 位置 */
  _blitTileToBuffer(dst: Uint32Array, dstW: number, ox: number, oy: number, tile: Uint32Array, tileSize: number) {
    for (let ry = 0; ry < tileSize; ry++) {
      const dstOff = (oy + ry) * dstW + ox;
      const srcOff = ry * tileSize;
      for (let rx = 0; rx < tileSize; rx++) {
        dst[dstOff + rx] = tile[srcOff + rx];
      }
    }
  },

  _getStats(type: string, id: number): { code: number; data: number; unacc: number; cpu: string } {
    if (type === 'CHR') {
      return { code: 0, data: 8192, unacc: 0, cpu: `PPU` };
    }
    const stats: Record<number, any> = {
      0: { code:7274, data:427, unacc:491, cpu:'$8000' },
      1: { code:4239, data:3556, unacc:397, cpu:'$8000' },
      2: { code:1828, data:245, unacc:6119, cpu:'$8000' },
      3: { code:0, data:8186, unacc:6, cpu:'$8000' },
      4: { code:0, data:8158, unacc:34, cpu:'$8000' },
      5: { code:0, data:8157, unacc:35, cpu:'$8000' },
      6: { code:0, data:3345, unacc:4847, cpu:'$8000' },
      7: { code:0, data:3908, unacc:4284, cpu:'$8000' },
      8: { code:0, data:6358, unacc:1834, cpu:'$8000' },
      9: { code:0, data:6645, unacc:1547, cpu:'$8000' },
      10:{ code:0, data:7039, unacc:1153, cpu:'$8000' },
      11:{ code:1477, data:5958, unacc:757, cpu:'$8000' },
      12:{ code:1674, data:6088, unacc:430, cpu:'$8000' },
      13:{ code:0, data:8176, unacc:16, cpu:'$8000' },
      14:{ code:0, data:8177, unacc:15, cpu:'$8000' },
      15:{ code:0, data:8134, unacc:58, cpu:'$8000' },
      16:{ code:1860, data:4599, unacc:1733, cpu:'$8000' },
      17:{ code:0, data:7239, unacc:953, cpu:'$8000' },
      18:{ code:0, data:7616, unacc:576, cpu:'$8000' },
      19:{ code:877, data:5021, unacc:2294, cpu:'$8000' },
      20:{ code:2002, data:6070, unacc:120, cpu:'$8000' },
      21:{ code:0, data:6901, unacc:1291, cpu:'$8000' },
      22:{ code:453, data:7388, unacc:351, cpu:'$8000' },
      23:{ code:0, data:8047, unacc:145, cpu:'$8000' },
      24:{ code:2774, data:4686, unacc:732, cpu:'$8000' },
      25:{ code:0, data:7520, unacc:672, cpu:'$8000' },
      26:{ code:7331, data:584, unacc:277, cpu:'$8000' },
      27:{ code:384, data:6021, unacc:1787, cpu:'$8000' },
      28:{ code:2871, data:4189, unacc:1132, cpu:'$8000' },
      29:{ code:0, data:3866, unacc:4326, cpu:'$8000' },
      30:{ code:6350, data:1495, unacc:347, cpu:'$C000' },
      31:{ code:3951, data:3387, unacc:854, cpu:'$E000' },
    };
    return stats[id] || { code:0, data:0, unacc:BANK_SIZE, cpu:'$8000' };
  },

  _getDescription(type: string, id: number): string {
    if (type === 'CHR') {
      return `图块数据 ${8*id}–${8*id+8}KB (tile #${512*id}–#${512*(id+1)-1})`;
    }
    const descs: Record<number, string> = {
      0:'Boot & Main Menu — 系统初始化 & 标题/菜单主循环',
      1:'Data Query Service — 球员/队伍数据查询服务',
      2:'Scene Selector & Password — 场景/密码/选择界面',
      3:'Narration Typewriter Text (PT1) — 解说/过场打字机文本（CHR tile 序列，含浊点/半浊点复合 tile）',
      4:'Narration Typewriter Text (PT2) — 解说/过场打字机文本数据',
      5:'Team Formation & Tactics — 队伍阵型/策略数据',
      6:'Story Script Data (PT1) — 剧情/脚本数据块',
      7:'Story Script Data (PT2) — 剧情/脚本数据块',
      8:'Dialog Text Data (PT1) — 对话文本数据',
      9:'Dialog Text Data (PT2) — 对话文本数据',
      10:'Scene Map & Location — 场景描述/地图定位数据',
      11:'Match Turn Logic (PT1) — 比赛回合逻辑 & 行动数据',
      12:'Match Turn Logic (PT2) — 比赛回合逻辑 & 行动数据',
      13:'Animation Frames (PT1) — 动画/过场帧数据',
      14:'Animation Data (PT2) — 动画/演出数据',
      15:'Animation Data (PT3) — 动画/演出数据',
      16:'Special Moves & Skills — 特殊动作/技能逻辑+数据',
      17:'Large Data Block (PT1) — 大型数据块',
      18:'Large Data Block (PT2) — 大型数据块',
      19:'Auxiliary Logic & Data — 辅助逻辑 & 数据',
      20:'Match Auxiliary Logic — 比赛辅助逻辑 & 数据',
      21:'Extended Data Storage — 扩展数据存储',
      22:'Data+Code Hybrid — 数据密集型 + 少量代码',
      23:'Extended Data Storage — 扩展数据存储',
      24:'AI & Decision Logic — AI/决策逻辑 & 数据',
      25:'Extended Data Storage — 扩展数据存储',
      26:'Match Core Engine — 比赛核心引擎',
      27:'Data + Minimal Code — 数据密集型 + 极少量代码',
      28:'Auxiliary Logic & Data — 辅助逻辑 & 数据',
      29:'Extended Data (Low Usage) — 扩展数据（低利用率）',
      30:'Core System Library (FIXED) — 核心系统库',
      31:'Interrupt Vectors & Utils (FIXED) — 中断向量 & 通用工具',
    };
    return descs[id] || '未知';
  },
});
