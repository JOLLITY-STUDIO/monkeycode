/**
 * 无头渲染链路校验：
 *  1. CHR：vramMem[$0000-$0FFF]（BG 表）== CHR_BANKS[0] 前 4KB（1KB bank 0,1,2,3）
 *           vramMem[$1000-$1FFF]（SPR 表）== 1KB bank 252/113/82/83 数据
 *  2. 跑 240 帧到开场 Wait4 后：nameTable[0].tile 有内容（$05E8 缓冲被消费）
 *  3. 调色板 vramMem[$3F00-$3F1F] 有内容（渐显写入）
 *  4. PPU 帧缓冲非零像素 > 0
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { CHR_BANKS } from '../src/game/chr/index';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot();

const ppu: any = runtime.ppu;
const store = game.store;

const out: string[] = [];

/** 按 core load1kVromBank 索引规则计算 1KB bank 的期望字节 */
function expected1k(bank1k: number): Uint8Array {
  const b4k = Math.floor(bank1k / 4) % 32;
  const off = (bank1k % 4) * 1024;
  const chrBank = CHR_BANKS[Math.floor(b4k / 2)];
  const base = (b4k % 2) * 4096 + off;
  const out = new Uint8Array(1024);
  for (let i = 0; i < 1024; i++) out[i] = chrBank[base + i] ?? 0xff;
  return out;
}

function sliceEq(actual: Uint8Array, expected: Uint8Array, aoff: number): boolean {
  for (let i = 0; i < expected.length; i++) {
    if (actual[aoff + i] !== expected[i]) return false;
  }
  return true;
}

// 1. CHR 校验（boot 即生效，与场景时序无关）
const vram = ppu.vramMem as Uint8Array;
const chrChecks: { name: string; slot: number; bank: number }[] = [
  { name: 'BG slot0', slot: 0, bank: 0 },
  { name: 'BG slot1', slot: 1, bank: 1 },
  { name: 'BG slot2', slot: 2, bank: 2 },
  { name: 'BG slot3', slot: 3, bank: 3 },
  { name: 'SPR slot4', slot: 4, bank: 252 },
  { name: 'SPR slot5', slot: 5, bank: 113 },
  { name: 'SPR slot6', slot: 6, bank: 82 },
  { name: 'SPR slot7', slot: 7, bank: 83 },
];
let chrAllOk = true;
for (const c of chrChecks) {
  const exp = expected1k(c.bank);
  const ok = sliceEq(vram, exp, c.slot * 0x400);
  if (!ok) chrAllOk = false;
  out.push(`CHR ${c.name} (bank ${c.bank}) @${(c.slot * 0x400).toString(16)} => ${ok ? 'PASS' : 'FAIL'}`);
}

// 2-4. 跑 240 帧（开场 OamDrift→场景3 NT→Wait4→调色板）
for (let f = 0; f < 240; f++) game.frame(runtime);

const nt = ppu.nameTable[0]?.tile as Uint8Array | undefined;
let ntNz = 0;
if (nt) for (let i = 0; i < nt.length; i++) if (nt[i] !== 0) ntNz++;
const ntOk = ntNz > 0;
out.push(`nameTable[0].tile nonzero = ${ntNz} => ${ntOk ? 'PASS' : 'FAIL'}`);

let palNz = 0;
for (let i = 0x3f00; i < 0x3f20; i++) if (vram[i] !== 0) palNz++;
const palOk = palNz > 0;
out.push(`palette vramMem[$3F00-$3F1F] nonzero = ${palNz} => ${palOk ? 'PASS' : 'FAIL'}`);

const buf = ppu.buffer as Uint32Array;
let bufNz = 0;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) bufNz++;
const bufOk = bufNz > 0;
out.push(`ppu.buffer nonzero = ${bufNz} => ${bufOk ? 'PASS' : 'FAIL'}`);

out.push('scene=' + store.readByte(0x00ed) + ' ram_0628=' + store.readByte(0x0628).toString(16) + ' fadeA=' + store.readByte(0x004a) + ' fadeB=' + store.readByte(0x004b));
out.push('OVERALL: ' + (chrAllOk && ntOk && palOk && bufOk ? 'PASS' : 'FAIL'));

const fs = require('fs');
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_verify_chr_out.txt', out.join('\n'));
console.log(out.join('\n'));
