/**
 * BGM 轨道数据提取器 — 从 Bank 15 原始数据中解析通道初始化列表和音序数据
 *
 * Bank 15 数据结构:
 *   每个 BGM 从通道初始化列表开始:
 *     [ch(0-7), ptrLo, ptrHi] × N 个通道, 0xFF 终止
 *   ptrLo|ptrHi 是 CPU 地址 ($A000-$BFFF)，转换为数组索引 = cpuAddr - 0xA000
 *   每个通道的音序数据段从对应 ptr 开始，直到下一个通道 ptr 或 0xFF 终止符
 *
 * 用法:
 *   import { PRG_BANK_15 } from '../../rom-data/prg-bank-15';
 *   import { BgmExtractor } from './BgmExtractor';
 *   const tracks = BgmExtractor.extract(PRG_BANK_15, 0x0000);
 *   // tracks → { sq1: number[], sq2: number[], tri: number[], noise: number[], header: ... }
 */

/** 通道初始化列表条目 */
interface ChInitEntry {
  ch: number;       // 0-7
  ptrLo: number;
  ptrHi: number;
  offset: number;   // Bank 15 数组偏移
}

/** 提取的 BGM 轨道数据 */
export interface BgmTrackData {
  /** BGM 名称 */
  name: string;
  /** Bank 15 偏移 */
  offset: number;
  /** 原始通道初始化列表 */
  initList: readonly ChInitEntry[];
  /** SQ1 音序数据 (ch4) */
  sq1: readonly number[];
  /** SQ2 音序数据 (ch5) */
  sq2: readonly number[];
  /** TRI 音序数据 (ch6) */
  tri: readonly number[];
  /** NOISE 音序数据 (ch7) */
  noise: readonly number[];
  /** 完整 Raw 数据 (用于 CALL/JUMP 地址解析) */
  sharedRaw: readonly number[];
  /** NES 基址 */
  nesBase: number;
}

export class BgmExtractor {
  /**
   * 从 Bank 15 数组提取 BGM 轨道数据
   * @param bank15  Bank 15 原始数据 (8192 字节)
   * @param offset  通道初始化列表的数组偏移
   * @param name    BGM 名称 (调试用)
   */
  static extract(
    bank15: readonly number[],
    offset: number,
    name: string = 'BGM',
  ): BgmTrackData | null {
    if (offset >= bank15.length) return null;

    // 1. 解析通道初始化列表
    const initList: ChInitEntry[] = [];
    let pos = offset;

    while (pos < bank15.length - 2) {
      const ch = bank15[pos];
      if (ch >= 0x80) {
        pos++; // skip 0xFF terminator
        break;
      }
      pos++;
      const ptrLo = bank15[pos]; pos++;
      const ptrHi = bank15[pos]; pos++;
      const cpuPtr = (ptrLo | (ptrHi << 8)) & 0xFFFF;
      const arrOffset = cpuPtr - 0xA000;

      initList.push({ ch, ptrLo, ptrHi, offset: arrOffset });
    }

    if (initList.length === 0) return null;

    // 2. 确定数据范围
    const dataStart = Math.min(...initList.map(e => e.offset));
    const sortedByOffset = [...initList].sort((a, b) => a.offset - b.offset);
    const lastPtr = sortedByOffset[sortedByOffset.length - 1].offset;

    // 查找下一个 BGM 通道初始化列表作为数据边界
    // 模式: 0x04,XX,YY, 0x05,XX,YY, 0x06,XX,YY, 0x07,XX,YY, 0xFF
    // 从当前 header 之后开始搜索
    let dataEnd = bank15.length; // 默认到 bank 末尾
    for (let i = offset + 13; i < bank15.length - 12; i++) {
      if (bank15[i] === 0x04 && bank15[i+3] === 0x05 && bank15[i+6] === 0x06 && bank15[i+9] === 0x07 && bank15[i+12] >= 0x80) {
        const np4 = (bank15[i+1] | (bank15[i+2] << 8)) & 0xFFFF;
        if (np4 >= 0xA000 && np4 < 0xC000 && (np4 - 0xA000) > lastPtr) {
          dataEnd = i; // 下一个 BGM header 位置即当前数据的结束
          break;
        }
      }
    }
    // 限制最大共享数据为 4KB (避免加载过多无关数据)
    if (dataEnd - dataStart > 4096) {
      dataEnd = dataStart + 4096;
    }

    // 3. 提取每个通道的轨道数据
    /** 获取指定通道的轨道数据 */
    const getTrackData = (chId: number): number[] => {
      const entry = initList.find(e => e.ch === chId);
      if (!entry) return [];

      const idx = sortedByOffset.findIndex(e => e.ch === chId);
      if (idx < 0) return [];

      let endOffset: number;
      if (idx + 1 < sortedByOffset.length) {
        endOffset = sortedByOffset[idx + 1].offset;
      } else {
        // 最后一个通道: 找到下一个 0xFF 终止符或 track 结尾
        endOffset = dataEnd;
        // 但更精确: 扫描 ~256B 范围找 0xFF
        for (let j = entry.offset; j < Math.min(entry.offset + 256, dataEnd); j++) {
          if (bank15[j] === 0xFF) {
            endOffset = j;
            break;
          }
        }
      }

      return bank15.slice(entry.offset, endOffset);
    };

    const sq1 = getTrackData(4);
    const sq2 = getTrackData(5);
    const tri = getTrackData(6);
    const noise = getTrackData(7);

    // 4. 构建共享 Raw 数据 (包含所有轨道数据 + 子段落)
    const sharedRaw = bank15.slice(dataStart, dataEnd);

    return {
      name,
      offset,
      initList,
      sq1,
      sq2,
      tri,
      noise,
      sharedRaw,
      nesBase: 0xA000 + dataStart,
    };
  }

  /**
   * 获取 Bank 15 中所有 BGM 的偏移
   * 通过扫描 0xFF 终止的 [ch(4-7), ptrLo, ptrHi] 模式来发现
   */
  static findAllBgms(bank15: readonly number[]): BgmTrackData[] {
    const results: BgmTrackData[] = [];
    const bgmNames = ['', '', '', '', ''];  // placeholder names

    // 已知的 BGM 偏移 (来自 bank15_data.service.ts BGM_DATA_MAP)
    const knownOffsets: Record<number, string> = {
      0x17AD: '0x58 (开场BGM, 原BGM00) - TECMO Theater',
      0x0000: 'BGM01 - Title',
      0x0200: 'BGM02 - Meeting?',
      0x0400: 'BGM03 - Match?',
      0x0C00: 'BGM04 - Result?',
    };

    // 方案 A: 按已知偏移提取
    for (const [offsetStr, name] of Object.entries(knownOffsets)) {
      const offset = parseInt(offsetStr);
      const track = this.extract(bank15, offset, name);
      if (track && track.initList.length > 0) {
        results.push(track);
      }
    }

    return results;
  }
}
