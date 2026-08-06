/**
 * Bank 详情页 — 支持 PRG (hex dump + 柱状图) 与 CHR (图块画廊) 两种视图
 */
import { NES_PRG_ROM, NES_CHR_ROM } from '../../../rom-data/index';

const BANK_SIZE = 8192;
// CHR 参数: 每个 tile 16 bytes, 8×8 pixel, bank 有 512 tiles
const CHR_TILES = 512;
const CHR_BYTES_PER_TILE = 16;
const TILE_PX = 8;
const TILE_COLS = 32;
const TILE_ROWS = Math.ceil(CHR_TILES / TILE_COLS); // 16
const TILE_SCALE = 3; // 每个 pixel 放大 3×
const CHR_CANVAS_W = TILE_COLS * TILE_PX * TILE_SCALE;
const CHR_CANVAS_H = TILE_ROWS * TILE_PX * TILE_SCALE;

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
    viewMode: 'hex' as 'hex' | 'histogram',
    isCHR: false,

    // Hex dump 数据
    hexLines: [] as string[],
    hexAddr: [] as string[],

    // Histogram 数据
    histogramReady: false,

    // CHR 常量
    TILE_COLS: TILE_COLS,
    TILE_ROWS: TILE_ROWS,
  },

  _bankData: [] as number[],

  // ── 生命周期 ──
  onLoad(options: any) {
    const type = options.type || 'PRG';
    const id = parseInt(options.id || '0', 10);
    const isCHR = type === 'CHR';
    const label = `${type} Bank ${String(id).padStart(2, '0')}`;
    const desc = this._getDescription(type, id);

    // 读取 Bank 数据
    const src = isCHR ? NES_CHR_ROM : NES_PRG_ROM;
    const offset = id * BANK_SIZE;
    const bankData: number[] = [];
    // WeChat mini-program 环境可能不支持 Uint8Array slice 直接遍历
    for (let i = 0; i < BANK_SIZE; i++) {
      const b = src[offset + i];
      bankData.push(b);
    }
    this._bankData = bankData;

    // 统计
    const stats = this._getStats(type, id);
    const cpuMap = isCHR
      ? `PPU $${(id * 0x2000).toString(16).toUpperCase().padStart(4, '0')}`
      : stats.cpu;

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
    });

    // 生成 hex dump 行
    this._buildHexDump(bankData);

    // CHR 需要在 onReady 后渲染画布
    if (isCHR) {
      this.setData({ viewMode: 'hex' });
    }
  },

  onReady() {
    if (this.data.isCHR) {
      // 延迟确保 canvas 节点就绪
      setTimeout(() => this._renderCHRGallery(), 200);
    }
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
  onViewCHRTiles() {
    if (this.data.isCHR) {
      this.setData({ viewMode: 'tiles' });
      setTimeout(() => this._renderCHRGallery(), 300);
    }
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

        // 统计频率
        const freq = new Array(256).fill(0);
        for (const b of that._bankData) freq[b]++;
        const maxFreq = Math.max(...freq);

        // 绘制
        const barW = (w - 2) / 256;
        const chartH = h - 20;

        // 背景
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, w, h);

        // 网格线
        ctx.strokeStyle = '#161b22';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= 4; i++) {
          const y = chartH - (chartH * i / 4);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // 柱子
        for (let i = 0; i < 256; i++) {
          const barH = maxFreq > 0 ? (freq[i] / maxFreq) * chartH : 0;
          const x = 1 + i * barW;
          const y = chartH - barH;

          // 颜色: 按区域渐变
          const r = i & 0x80 ? 88 : 63;
          const g = i & 0x40 ? 166 : 251;
          const b = i & 0x20 ? 255 : 149;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, barW - 1, barH);
        }

        // x 轴标签
        ctx.fillStyle = '#484f58';
        ctx.font = '10px monospace';
        for (let i = 0; i < 256; i += 32) {
          ctx.fillText(byteHex(i), 1 + i * barW, h - 2);
        }

        that.setData({ histogramReady: true });
      });
  },

  // ── CHR 图块画廊 ──
  _renderCHRGallery() {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('#chrCanvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        const canvas = res?.[0]?.node;
        if (!canvas) {
          setTimeout(() => that._renderCHRGallery(), 300);
          return;
        }
        // 使用固定尺寸
        const w = CHR_CANVAS_W;
        const h = CHR_CANVAS_H;
        const dpr = 1; // pixel art 不需要 dpr 缩放
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        // 背景
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, w, h);

        // NES 2bpp 灰度调色板
        const palette = ['#010409', '#484f58', '#8b949e', '#e6edf3'];

        const data = that._bankData;
        const tileScale = TILE_SCALE;
        const tileCanvasW = TILE_PX * tileScale;

        for (let ti = 0; ti < CHR_TILES; ti++) {
          const col = ti % TILE_COLS;
          const row = Math.floor(ti / TILE_COLS);
          const base = ti * CHR_BYTES_PER_TILE;
          const ox = col * tileCanvasW;
          const oy = row * tileCanvasW;

          // 渲染一个 8×8 tile
          for (let py = 0; py < TILE_PX; py++) {
            const plane0 = data[base + py];
            const plane1 = data[base + py + 8];
            for (let px = 0; px < TILE_PX; px++) {
              const bit = 7 - px;
              const c0 = (plane0 >> bit) & 1;
              const c1 = (plane1 >> bit) & 1;
              const colorIdx = (c1 << 1) | c0;
              ctx.fillStyle = palette[colorIdx];
              ctx.fillRect(
                ox + px * tileScale,
                oy + py * tileScale,
                tileScale,
                tileScale,
              );
            }
          }

          // 边框
          ctx.strokeStyle = '#161b22';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(ox, oy, tileCanvasW, tileCanvasW);
        }

        // 列号
        ctx.fillStyle = '#484f58';
        ctx.font = '9px monospace';
        ctx.textAlign = 'left';
        for (let col = 0; col < TILE_COLS; col += 4) {
          ctx.fillText(`${col}`, col * tileCanvasW + 2, h - 2);
        }
      });
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
      0:'系统初始化 & 标题/菜单主循环', 1:'数据查询服务（球员/队伍数据检索）',
      2:'二级场景/密码/选择界面', 3:'球员属性数据 (Part 1)',
      4:'球员属性数据 (Part 2)', 5:'队伍阵型/策略数据',
      6:'剧情/脚本数据块 (Part 1)', 7:'剧情/脚本数据块 (Part 2)',
      8:'文本/对话数据 (Part 1)', 9:'文本/对话数据 (Part 2)',
      10:'场景描述/地图定位数据', 11:'比赛回合逻辑 & 行动数据',
      12:'比赛回合逻辑 & 行动数据', 13:'动画/过场帧数据 (Part 1)',
      14:'动画/演出数据 (Part 2)', 15:'动画/演出数据 (Part 3)',
      16:'特殊动作/技能逻辑+数据', 17:'大型数据块 (Part 1)',
      18:'大型数据块 (Part 2)', 19:'辅助逻辑 & 数据',
      20:'比赛辅助逻辑 & 数据', 21:'扩展数据存储',
      22:'数据密集型 + 少量代码', 23:'扩展数据存储',
      24:'AI/决策逻辑 & 数据', 25:'扩展数据存储',
      26:'比赛核心引擎（最大代码 Bank）', 27:'数据密集型 + 极少量代码',
      28:'辅助逻辑 & 数据', 29:'扩展数据存储',
      30:'核心系统库（PPU/APU/控制器）FIXED', 31:'通用工具 + 中断向量 FIXED',
    };
    return descs[id] || '未知';
  },
});
