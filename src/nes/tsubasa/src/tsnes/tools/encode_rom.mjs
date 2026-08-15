/**
 * 把 rom.nes 编码为 base64 TypeScript 模块
 * 
 * 使用: node tools/encode_rom.mjs
 * 输出: src/rom_data.ts (小程序可直接 import)
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const romPath = resolve(ROOT, 'rom.nes');
const outPath = resolve(ROOT, 'src', 'rom_data.ts');

console.log(`Reading ${romPath}...`);
const raw = readFileSync(romPath);
const b64 = raw.toString('base64');
console.log(`ROM: ${raw.length} bytes -> ${b64.length} chars base64`);

// 生成 TypeScript 模块
// 使用 chunked 字符串避免过长的单行
const CHUNK_SIZE = 2048;
const chunks = [];
for (let i = 0; i < b64.length; i += CHUNK_SIZE) {
  chunks.push(b64.slice(i, i + CHUNK_SIZE));
}

const output = `/**
 * ROM 数据 — 由 tools/encode_rom.mjs 自动生成, 请不要手动修改
 * 原始文件: rom.nes (${raw.length} bytes)
 */
export const ROM_BASE64 = ${JSON.stringify(chunks.join(''))};

/** Base64 → Uint8Array (不使用 atob, 兼容微信小程序) */
export function romUint8Array(): Uint8Array {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const lookup = new Uint8Array(123);
  for (let i = 0; i < chars.length; i++) lookup[chars.charCodeAt(i)] = i;
  const b64 = ROM_BASE64;
  let pad = 0; for (let i = b64.length - 1; i >= 0 && b64[i] === '='; i--) pad++;
  const len = b64.length - pad;
  const outLen = (len * 3) >>> 2;
  const bytes = new Uint8Array(outLen);
  let j = 0;
  for (let i = 0; i < len; i += 4) {
    const e1 = lookup[b64.charCodeAt(i)];
    const e2 = lookup[b64.charCodeAt(i + 1)];
    const e3 = i + 2 < len ? lookup[b64.charCodeAt(i + 2)] : 0;
    const e4 = i + 3 < len ? lookup[b64.charCodeAt(i + 3)] : 0;
    bytes[j++] = (e1 << 2) | (e2 >> 4);
    if (i + 2 < len) bytes[j++] = ((e2 & 15) << 4) | (e3 >> 2);
    if (i + 3 < len) bytes[j++] = ((e3 & 3) << 6) | e4;
  }
  return bytes;
}
/** 从 iNES header 解析 ROM 信息 */
export interface RomHeader {
  prgSizeKB: number;
  chrSizeKB: number;
  mapper: number;
  mapperName: string;
  mirroring: string;
}

const MAPPER_NAMES: Record<number, string> = {
  0: 'NROM', 1: 'MMC1', 2: 'UNROM', 3: 'CNROM',
  4: 'MMC3', 5: 'MMC5', 7: 'AOROM', 9: 'MMC2',
  10: 'MMC4', 11: 'ColorDreams', 19: 'Namco 163',
  23: 'VRC2b', 24: 'VRC6a', 25: 'VRC4', 26: 'VRC6b',
  64: 'RAMBO-1', 71: 'Camerica',
  118: 'MMC3/TLSROM', 119: 'MMC3/TQROM',
};

export function getRomHeader(): RomHeader {
  const d = romUint8Array();
  const prg16k = d[4]; const chr8k = d[5];
  const mapperLo = (d[6] >> 4) & 0xF;
  const mapperHi = d[7] & 0xF0;
  const mapper = mapperHi | mapperLo;
  const mirror = (d[6] & 1) ? 'Vertical' : 'Horizontal';
  return {
    prgSizeKB: prg16k * 16,
    chrSizeKB: chr8k * 8,
    mapper,
    mapperName: MAPPER_NAMES[mapper] || \`Mapper \${mapper}\`,
    mirroring: mirror,
  };
}
`;

writeFileSync(outPath, output, 'utf-8');
console.log(`Written ${outPath}`);
