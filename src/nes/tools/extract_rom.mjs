/**
 * 从 ROM 提取 CHR/PRG 数据，生成嵌入式 JS 模块 (v2)
 * 用二进制 Uint8Array 字面量代替 base64，避免编解码问题
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROM_PATH = process.argv[2] || 'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan).nes';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'tsubasa_js');

const buf = readFileSync(ROM_PATH);
const prgSize = buf[4];
const chrSize = buf[5];
const mapper = ((buf[6] >> 4) & 0x0F) | (buf[7] & 0xF0);

const prgLen = prgSize * 16384;
const chrLen = chrSize * 8192;

// Extract PRG + CHR
const prg = buf.slice(16, 16 + prgLen);
const chr = buf.slice(16 + prgLen, 16 + prgLen + chrLen);

console.log(`ROM: ${ROM_PATH}`);
console.log(`PRG: ${prgSize}×16KB = ${prgLen} bytes`);
console.log(`CHR: ${chrSize}×8KB  = ${chrLen} bytes`);

// Use base64 but store as single unbroken string
const chrB64 = Buffer.from(chr).toString('base64');
const prgB64 = Buffer.from(prg).toString('base64');

// Verify roundtrip
const chrVerify = Buffer.from(chrB64, 'base64');
const prgVerify = Buffer.from(prgB64, 'base64');
console.log(`CHR verify: ${chrVerify.length} bytes (expected ${chrLen})`);
console.log(`PRG verify: ${prgVerify.length} bytes (expected ${prgLen})`);

if (chrVerify.length !== chrLen) throw new Error('CHR encode/decode mismatch!');
if (prgVerify.length !== prgLen) throw new Error('PRG encode/decode mismatch!');

const romName = ROM_PATH.split(/[/\\]/).pop();
const output = `// Embedded ROM data from ${romName} — auto-generated, DO NOT EDIT.
const _CHR_B64 = "${chrB64}";
const _PRG_B64 = "${prgB64}";
function _d(b){const s=atob(b);const a=new Uint8Array(s.length);for(let i=0;i<s.length;i++)a[i]=s.charCodeAt(i);return a}
export const CHR=_d(_CHR_B64);
export const PRG=_d(_PRG_B64);
export const HEADER={prgSize:${prgSize},chrSize:${chrSize},mapper:${mapper}};
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'romData.js'), output);
console.log(`→ Generated: romData.js (${(Buffer.byteLength(output) / 1024).toFixed(0)} KB)`);
