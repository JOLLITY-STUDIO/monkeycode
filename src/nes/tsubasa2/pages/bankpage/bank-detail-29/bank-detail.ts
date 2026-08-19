/**
 * Bank 29 详情页 — 球队战术/阵容数据 (Team Tactics & CPU Roster)
 *
 * 纯数据 bank (8192B 全部 .byte)。结构:
 *   [0x0000-0x1AB1] 241 个 22 字节战术块 (00 00 分隔)
 *   [0x1AB2-0x1AF5] 34 项指针表 → $BAF6-$BCE0
 *   [0x1AF8-0x1CFE] CPU 球队阵容区 (GFX 4B + 队标 3B + [位置码,球员ID]×N + $0F)
 *   [0x1D00-0x1FFF] 0xFF 填充
 */
import { NES_PRG_ROM } from '../../../src/game/data/rom-data/index';
import BANK29_ANALYSIS from '../bank-detail/bank29_analysis';

const BANK_SIZE = 8192;
const ROSTER_PTR_OFF = 0x1AB2;   // 指针表 offset
const ROSTER_AREA_OFF = 0x1AF8;  // 阵容区 offset
const FF_FILL_OFF = 0x1D00;      // 0xFF 填充起点

function byteHex(b: number): string {
  return b.toString(16).toUpperCase().padStart(2, '0');
}

interface TacticalBlock {
  idx: number;
  offset: number;
  cpuAddr: string;
  len: number;
  hex: string;
  summary: string;
}

interface RosterEntry {
  idx: number;
  offset: number;
  cpuAddr: string;
  gfx: string;
  team: string;
  players: { pos: number; player: number }[];
  hex: string;
}

Page({
  data: {
    // Bank 元数据
    bankType: 'PRG',
    bankId: 29,
    bankLabel: 'PRG Bank 29',
    bankName: 'Team Tactics & CPU Roster',
    description: '',
    cpuMap: '$A000 (MMC3 切换)',
    codeBytes: 0,
    dataBytes: 4635,
    unaccessed: 3557,

    // 视图控制
    viewMode: 'hex' as 'hex' | 'histogram' | 'records' | 'structure' | 'roster',
    dataClass: 'game' as 'render' | 'game' | 'text' | 'unknown',
    dataClassLabel: '📦 游戏数据',
    dataClassHint: '球队战术/阵容纯数据 → 由 Bank 01 查询消费',

    // HEX
    hexLines: [] as string[],
    hexAddr: [] as string[],

    // 记录
    recordMode: '22byte' as '22byte' | 'auto',
    records: [] as any[],
    recordStats: { totalBlocks: 0, avgBlockSize: 0 },

    // 结构
    tacticalBlocks: [] as TacticalBlock[],
    rosterPointers: [] as any[],
    structureInfo: null as any,

    // 阵容
    rosterEntries: [] as RosterEntry[],
  },

  onLoad() {
    // 读取 bank 数据
    const offset = 29 * BANK_SIZE;
    const bankData: number[] = [];
    for (let i = 0; i < BANK_SIZE; i++) bankData.push(NES_PRG_ROM[offset + i]);

    this.setData({
      description: '球队战术/阵型 + CPU 阵容纯数据 (CDL: code 0B / data 4635B / unacc 3557B)',
    });

    this._buildHexDump(bankData);
    this._parseTacticalBlocks(bankData);
    this._parsePointerTable(bankData);
    this._parseRoster(bankData);
    this._buildStructureInfo();
  },

  // ── 视图切换 ──
  onViewHex() { this.setData({ viewMode: 'hex' }); },
  onViewHistogram() { this.setData({ viewMode: 'histogram' }); },
  onViewRecords() { this.setData({ viewMode: 'records' }); },
  onViewStructure() { this.setData({ viewMode: 'structure' }); },
  onViewRoster() { this.setData({ viewMode: 'roster' }); },

  onRecordModeSwitch(e: any) {
    this.setData({ recordMode: e.currentTarget.dataset.mode });
  },

  // ── HEX dump ──
  _buildHexDump(data: number[]) {
    const lines: string[] = [];
    const addrs: string[] = [];
    for (let off = 0; off < data.length; off += 16) {
      const row = data.slice(off, off + 16);
      lines.push(row.map(byteHex).join(' '));
      addrs.push(off.toString(16).toUpperCase().padStart(4, '0'));
    }
    this.setData({ hexLines: lines, hexAddr: addrs });
  },

  // ── 战术块解析 (0x0000-0x1AB1, 00 00 分隔) ──
  _parseTacticalBlocks(data: number[]) {
    const blocks: TacticalBlock[] = [];
    let start = 0;
    const limit = ROSTER_PTR_OFF;
    let idx = 0;
    for (let i = 0; i < limit - 1; i++) {
      if (data[i] === 0x00 && data[i + 1] === 0x00) {
        if (i - start >= 4) {
          const slice = data.slice(start, i);
          blocks.push({
            idx: idx++,
            offset: start,
            cpuAddr: '$' + (0xA000 + start).toString(16).toUpperCase(),
            len: slice.length,
            hex: slice.map(byteHex).join(' '),
            summary: slice.slice(0, 8).map(byteHex).join(' ') + '...',
          });
        }
        let j = i;
        while (j < limit && data[j] === 0x00) j++;
        i = j - 1;
        start = j;
      }
    }
    if (limit - start >= 4) {
      const slice = data.slice(start, limit);
      blocks.push({
        idx: idx++,
        offset: start,
        cpuAddr: '$' + (0xA000 + start).toString(16).toUpperCase(),
        len: slice.length,
        hex: slice.map(byteHex).join(' '),
        summary: slice.slice(0, 8).map(byteHex).join(' ') + '...',
      });
    }
    this.setData({
      tacticalBlocks: blocks,
      recordStats: {
        totalBlocks: blocks.length,
        avgBlockSize: Math.round(blocks.reduce((s, b) => s + b.len, 0) / Math.max(1, blocks.length)),
      },
    });
  },

  // ── 指针表 (0x1AB2-0x1AF5, 34 项 2B LE) ──
  _parsePointerTable(data: number[]) {
    const ptrs: any[] = [];
    for (let off = ROSTER_PTR_OFF; off + 1 < FF_FILL_OFF; off += 2) {
      const lo = data[off], hi = data[off + 1];
      const v = (hi << 8) | lo;
      if (v === 0) break; // 表尾
      ptrs.push({
        idx: ptrs.length,
        offset: off,
        cpuAddr: '$' + (0xA000 + off).toString(16).toUpperCase(),
        target: '$' + v.toString(16).toUpperCase(),
        targetOffset: '0x' + (v - 0xA000).toString(16).toUpperCase(),
      });
    }
    this.setData({ rosterPointers: ptrs });
  },

  // ── 阵容区解析 (0x1AF8-0x1CFE: GFX 4B + 队标 3B + [位置,球员]×N + $0F) ──
  _parseRoster(data: number[]) {
    const entries: RosterEntry[] = [];
    let off = ROSTER_AREA_OFF;
    let idx = 0;
    while (off + 8 < FF_FILL_OFF) {
      // 跳过前导分隔字节 (00 xx)
      while (off < FF_FILL_OFF && data[off] === 0x00) off++;
      if (off >= FF_FILL_OFF) break;
      if (data[off] === 0xFF) break;

      const start = off;
      const gfx = data.slice(off, off + 4);
      const team = data.slice(off + 4, off + 7);
      off += 7;
      const players: { pos: number; player: number }[] = [];
      while (off < FF_FILL_OFF && data[off] !== 0x0F) {
        players.push({ pos: data[off], player: data[off + 1] });
        off += 2;
      }
      if (off < FF_FILL_OFF) off += 1; // 跳过 $0F
      const slice = data.slice(start, off);
      entries.push({
        idx: idx++,
        offset: start,
        cpuAddr: '$' + (0xA000 + start).toString(16).toUpperCase(),
        gfx: gfx.map(byteHex).join(' '),
        team: team.map(byteHex).join(' '),
        players,
        hex: slice.map(byteHex).join(' '),
      });
    }
    this.setData({ rosterEntries: entries });
  },

  // ── 结构信息 ──
  _buildStructureInfo() {
    this.setData({
      structureInfo: {
        blockCount: BANK29_ANALYSIS.structure.blockCount,
        blockRange: `0x0000-0x1AB1 (241 块 × ~22B)`,
        ptrTable: `0x1AB2-0x1AF5 · 34 项 · → $BAF6-$BCE0`,
        rosterArea: `0x1AF8-0x1CFE · GFX 4B + 队标 3B + [位置,球员]×N + $0F`,
        ffFill: `0x1D00-0x1FFF · 768B 未使用`,
        loaders: BANK29_ANALYSIS.loaders,
        consumers: BANK29_ANALYSIS.consumers,
      },
    });
  },
});
