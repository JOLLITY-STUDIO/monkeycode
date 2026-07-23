/**
 * ============================================================================
 * tsubasa-code — ROM 数据完全静态化，不再依赖 .nes ROM 文件
 *
 * 所有 ROM 数据（header、PRG、CHR）以 TypeScript 常量形式存放:
 *   - rom_header.ts   → iNES 头部元数据 + buildRomBuffer()
 *   - prg_rom_data.ts → PRG-ROM 程序代码 (256KB)
 *   - chr_rom_data.ts → CHR-ROM 图块数据 (128KB)
 *   - constants.ts    → NES 地址空间常量
 *
 * 模拟器初始化不再需要 .nes 文件，全部从这些静态模块加载。
 * ============================================================================
 */

export { TsubasaCpu, createTsubasaCpu } from './cpu';
export { TsubasaNes } from './tsubasa_nes';
export * from './rom_header';
export { CHR_ROM_BANKS, CHR_VROM_BANKS, CHR_BANK_COUNT } from './chr_rom_data';
export { PRG_ROM_BANKS, PRG_8K_BANK_COUNT, readPrgRom } from './prg_rom_data';
