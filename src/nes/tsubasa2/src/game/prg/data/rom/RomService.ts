/**
 * RomService — PRG ROM 流读取器（$C8FB/$C951 渲染队列 RLE 流的 bank 定位）
 *
 * @bank 全 bank（PRG 数据总线）
 *
 * 实现 RomStreamReader（InterruptService 注入）：
 *   readByte(bank, addr) — 读 PRG (bank, addr) 处字节。
 *
 * 原始 ROM 布局：16 字节 header + 32×8KB PRG（offset 16 起）+ 16×8KB CHR。
 * MMC3 PRG bank 号 = 0-31（8KB 粒度），CPU 地址 $8000-$FFFF → offset = addr & $1FFF。
 * bank 参数可能带 bit7 标志（$049B hi bit7 指示 PRG 切换），H5 下 & 0x1F 取低 5 位。
 */
import { PRG_BANKS } from './index';
import type { RomStreamReader } from '../../code/system/InterruptService';

export class RomService implements RomStreamReader {
  /** 读 PRG (bank, addr)；addr 为 CPU 地址 $8000-$FFFF */
  readByte(bank: number, addr: number): number {
    const b = (bank & 0x1f) >>> 0;
    const off = addr & 0x1fff;
    if (b >= PRG_BANKS.length) return 0;
    const bankData = PRG_BANKS[b];
    return bankData[off] ?? 0xff;
  }

  /** 读一段连续数据（供调试/校验） */
  readBytes(bank: number, addr: number, len: number): number[] {
    const out: number[] = [];
    for (let i = 0; i < len; i++) out.push(this.readByte(bank, addr + i));
    return out;
  }
}
