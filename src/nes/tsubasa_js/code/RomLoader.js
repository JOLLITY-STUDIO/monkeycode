/**
 * NES ROM 加载器 - 解析 .nes 文件
 */
const NES_HEADER_MAGIC = [0x4E, 0x45, 0x53, 0x1A]; // "NES\x1A"

export class RomLoader {
  static detectMapper(header) {
    const m = header.mapper;
    if (m === 0) return 'NROM';
    if (m === 1) return 'MMC1';
    if (m === 2) return 'UNROM';
    if (m === 3) return 'CNROM';
    if (m === 4) return 'MMC3';
    if (m === 7) return 'AOROM';
    return 'Unknown(' + m + ')';
  }

  /** 从 ArrayBuffer 加载 NES ROM */
  static parse(buffer) {
    const bytes = new Uint8Array(buffer);

    // 验证 NES header
    for (let i = 0; i < 4; i++) {
      if (bytes[i] !== NES_HEADER_MAGIC[i]) {
        throw new Error('Invalid NES file: missing "NES\\x1A" header');
      }
    }

    const header = {
      prgSize: bytes[4],
      chrSize: bytes[5],
      mapper: ((bytes[6] >> 4) & 0x0F) | (bytes[7] & 0xF0),
      mirroring: (bytes[6] & 0x01) ? 'vertical' : 'horizontal',
      battery: (bytes[6] & 0x02) !== 0,
      trainer: (bytes[6] & 0x04) !== 0,
    };

    // 检查四屏幕镜像
    if (bytes[6] & 0x08) {
      header.mirroring = 'four-screen';
    }

    // 读取 iNES 2.0 format (if applicable)
    const isNes20 = (bytes[7] & 0x0C) === 0x08;
    if (isNes20) {
      header.mapper |= (bytes[8] & 0x0F) << 8;
    }

    let offset = 16;

    // Trainer (512 bytes, rarely used)
    let trainer;
    if (header.trainer) {
      trainer = bytes.slice(offset, offset + 512);
      offset += 512;
    }

    // PRG ROM
    const prgLen = header.prgSize * 16384;
    const prg = bytes.slice(offset, offset + prgLen);
    offset += prgLen;

    // CHR ROM
    const chrLen = header.chrSize * 8192;
    const chr = offset + chrLen <= bytes.length
      ? bytes.slice(offset, offset + chrLen)
      : new Uint8Array(chrLen); // CHR RAM (empty)

    console.log(
      '[RomLoader] PRG: ' + (prgLen / 1024).toFixed(0) + 'KB, ' +
      'CHR: ' + (chrLen > 0 ? (chrLen / 1024).toFixed(0) + 'KB' : 'RAM') + ', ' +
      'Mapper: ' + header.mapper + ' (' + RomLoader.detectMapper(header) + ')'
    );

    return { header, prg, chr, trainer };
  }
}
