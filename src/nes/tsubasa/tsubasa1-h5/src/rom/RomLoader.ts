/**
 * ROM 文件加载器
 * 解析 .nes 文件头，分割 PRG-ROM 和 CHR-ROM Bank
 */
import { NesHeader, NesRom } from './types';

/** 加载并解析 NES ROM 文件 */
export async function loadRom(url: string): Promise<NesRom> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return parseRom(new Uint8Array(buffer));
}

/** 从 Uint8Array 解析 NES ROM */
export function parseRom(data: Uint8Array): NesRom {
  // 验证 NES 标识
  const magic = String.fromCharCode(data[0], data[1], data[2], data[3]);
  if (magic !== 'NES\u001A') {
    throw new Error(`Invalid NES ROM: magic=${magic}`);
  }

  const header = parseHeader(data);
  const prgRom = splitPrgRom(data, header);
  const chrRom = splitChrRom(data, header);

  return { header, prgRom, chrRom };
}

function parseHeader(data: Uint8Array): NesHeader {
  const flags6 = data[6];
  const flags7 = data[7];

  const mapper = ((flags7 & 0xF0) << 4) | (flags6 >> 4);

  return {
    prgRomSize: data[4],     // 16KB units
    chrRomSize: data[5],     // 8KB units
    mapper,
    mirroring: flags6 & 0x01,
    hasBattery: (flags6 & 0x02) !== 0,
    hasTrainer: (flags6 & 0x04) !== 0,
    fourScreen: (flags6 & 0x08) !== 0,
  };
}

function splitPrgRom(data: Uint8Array, header: NesHeader): Uint8Array[] {
  const prgStart = 16;  // 跳过 16 字节 header
  const bankSize = 16384; // 16KB per bank
  const banks: Uint8Array[] = [];

  for (let i = 0; i < header.prgRomSize; i++) {
    const offset = prgStart + i * bankSize;
    banks.push(data.slice(offset, offset + bankSize));
  }

  return banks;
}

function splitChrRom(data: Uint8Array, header: NesHeader): Uint8Array[] {
  const chrStart = 16 + header.prgRomSize * 16384;
  const bankSize = 8192; // 8KB per bank
  const banks: Uint8Array[] = [];

  for (let i = 0; i < header.chrRomSize; i++) {
    const offset = chrStart + i * bankSize;
    banks.push(data.slice(offset, offset + bankSize));
  }

  return banks;
}
