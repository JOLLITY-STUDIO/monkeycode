/**
 * ============================================================================
 * TsubasaNes — 完全封闭的 NES 模拟器实例
 *
 * PRG-ROM、CHR-ROM、iNES header 全部内建于 tsubasa-code 模块中。
 * 外部仅通过构造函数传入回调（onFrame / onAudioSample 等），
 * 无法访问 ROM 数据，也不接受外部 ROM 输入。
 *
 * ============================================================================
 */

import NES, { type NESOptions } from '../src/nes';
import { createTsubasaCpu } from './cpu';
import { PRG_ROM_BANKS } from './prg_rom_data';
import { CHR_ROM_BANKS } from './chr_rom_data';
import { buildRomBuffer, RAW_HEADER } from './rom_header';

export class TsubasaNes extends NES {
  constructor(opts: Omit<NESOptions, 'cpuFactory'>) {
    super({
      ...opts,
      cpuFactory: (nes: any) => createTsubasaCpu(nes),
    });
    // ROM 数据内建，构造函数中直接加载
    this._loadInternalRom();
  }

  // ================================================================
  // 封锁外部 ROM 访问
  // ================================================================

  /** 覆盖 loadROM — 外部不可访问 ROM 数据 */
  loadROM(_data: any): void {
    throw new Error('[TsubasaNes] ROM data is sealed — cannot load external ROM');
  }

  /** 覆盖 reloadROM — 从内部数据重新加载 */
  reloadROM(): void {
    this._loadInternalRom();
  }

  /** 覆盖 reset — NES.reset() 重建 CPU/Mapper 后需重写 cpu.mem */
  reset(): void {
    super.reset();
    this._patchPrgBanks();
  }

  // ================================================================
  // 内部方法
  // ================================================================

  /** 从静态 TS 数据构建 ROM 并加载（内部使用，绕过 thrown loadROM） */
  private _loadInternalRom(): void {
    const romBuffer = buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS);
    console.log('[TsubasaNes] ROM built from static data: %d bytes (PRG=%d CHR=%d mapper=%d)',
      romBuffer.length,
      PRG_ROM_BANKS.length * 8192,
      CHR_ROM_BANKS.length * 8192,
      ((RAW_HEADER[6] >> 4) | (RAW_HEADER[7] & 0xF0)));

    // 直接调用父类的 loadROM（我们自己的 loadROM 已抛异常）
    NES.prototype.loadROM.call(this, romBuffer);
    this._patchPrgBanks();
  }

  /** 直接注入 32×8KB PRG bank，load8kRomBank 自动兼容 */
  private _patchPrgBanks(): void {
    this.rom.rom = [...PRG_ROM_BANKS];
    this.rom.romCount = PRG_ROM_BANKS.length; // = 32
  }
}
