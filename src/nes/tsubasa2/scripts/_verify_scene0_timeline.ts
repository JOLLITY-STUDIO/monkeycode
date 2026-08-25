/**
 * _verify_scene0_timeline.ts — Scene0 完整序列逐帧时间线 dump（H5）
 *
 * 目的：验证 Scene0 17 阶段状态机在 H5 中的帧时序与数据语义，
 *      与 emu-full f3644-f4096（Scene0 实际执行窗口）比对。
 *
 * 输出（output/）：
 *   scene0-h5-timeline.json   每帧关键 RAM/状态（scene/scrollY/palette idx/fade/OAM）
 *   scene0-h5-phases.json     阶段转换点（状态变化帧）
 *   scene0-h5-snap/fNNN.png   关键帧合成图
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const TOTAL = 700;
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

const store = game.store;
const ppu: any = runtime.ppu;

// ── PNG encoder（同 _verify_300frame）──
const CRC_TABLE: number[] = (() => {
  const t: number[] = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(d: Buffer): number {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < d.length; i++) c = CRC_TABLE[(c ^ d[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function makeChunk(t: string, d: Buffer): Buffer {
  const lb = Buffer.alloc(4); lb.writeUInt32BE(d.length, 0);
  const tb = Buffer.from(t, 'ascii');
  const cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0);
  return Buffer.concat([lb, tb, d, cb]);
}
function encodePng(w: number, h: number, rgba: Buffer): Buffer {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9);
  const row = w * 4;
  const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (row + 1)] = 0;
    rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row);
  }
  return Buffer.concat([sig, makeChunk('IHDR', ihdr),
    makeChunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    makeChunk('IEND', Buffer.alloc(0))]);
}

// ── 输出目录 ──
const outDir = path.join(__dirname, '..', 'output');
const snapDir = path.join(outDir, 'scene0-h5-snap');
fs.mkdirSync(snapDir, { recursive: true });

// ── 每帧状态采集 ──
const snapshots: any[] = [];
const phases: any[] = [];
let lastSig = '';

function collect(frame: number): void {
  const r44 = store.readByte(0x0044);
  const r48 = store.readByte(0x0048);
  const r49 = store.readByte(0x0049);
  const r5b = store.readByte(0x005b);
  const r79 = store.readByte(0x0079);
  const r7b = store.readByte(0x007b);
  const r7c = store.readByte(0x007c);
  const r1b = store.readByte(0x001b);
  const r90 = store.readByte(0x0090);
  const r91 = store.readByte(0x0091);
  const scene = store.readByte(0x00ed);
  const fadeBg = store.fade.bg;
  const fadeSpr = store.fade.spr;
  const oamY0 = store.oam.spriteY(0);
  const oamY5 = store.oam.spriteY(5);
  const oamAttr0 = store.oam.spriteAttr(0);
  const sig = `${scene}|${r44}|${r48}|${r49}|${r5b}|${r79}|${r7b}|${r7c}|${r1b}|${r90}|${r91}|${fadeBg}|${fadeSpr}|${oamY0}|${oamY5}|${oamAttr0}`;
  if (sig !== lastSig) {
    phases.push({ frame, scene, r44, r48, r49, r5b, r79, r7b, r7c, r1b, r90, r91, fadeBg, fadeSpr, oamY0, oamY5, oamAttr0 });
    lastSig = sig;
  }
  snapshots.push({ frame, scene, r44, r48, r49, r5b, r79, r7b, r7c, r1b, r90, r91, fadeBg, fadeSpr, oamY0, oamY5, oamAttr0 });
}

// ── 关键帧 PNG 快照 ──
const SNAP_FRAMES = new Set([1, 10, 16, 25, 40, 60, 80, 95, 100, 105, 110, 130, 155, 160, 200, 300, 400, 455, 460, 470, 480]);
function snapPng(frame: number): void {
  const buf = ppu.buffer as Uint32Array;
  const rgba = Buffer.alloc(256 * 240 * 4);
  for (let i = 0; i < 256 * 240; i++) {
    const v = buf[i] >>> 0;
    rgba[i * 4 + 0] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  fs.writeFileSync(path.join(snapDir, `f${String(frame).padStart(3, '0')}.png`),
    encodePng(256, 240, rgba));
}

// ── 主循环 ──
for (let f = 0; f < TOTAL; f++) {
  game.frame(runtime);
  collect(f);
  if (SNAP_FRAMES.has(f)) snapPng(f);
}

fs.writeFileSync(path.join(outDir, 'scene0-h5-timeline.json'), JSON.stringify(snapshots, null, 0));
fs.writeFileSync(path.join(outDir, 'scene0-h5-phases.json'), JSON.stringify(phases, null, 2));

// ── 阶段变化摘要 ──
console.log('=== Scene0 H5 阶段转换点 ===');
for (const p of phases) {
  console.log(
    `f${String(p.frame).padStart(3)} scene=${p.scene}` +
    ` scrollY=${String(p.r44).padStart(3)} cfgBg=${String(p.r48).padStart(2)} cfgSpr=${String(p.r49).padStart(2)}` +
    ` 5B=${String(p.r5b).padStart(3)} 79=${String(p.r79).padStart(3)} 7B=${String(p.r7b).padStart(3)} 7C=${String(p.r7c).padStart(3)}` +
    ` 1B=${String(p.r1b).padStart(3)} 90=${String(p.r90).padStart(3)} 91=${String(p.r91).padStart(3)}` +
    ` fade=${p.fadeBg}/${p.fadeSpr} oamY0=${p.oamY0} oamY5=${p.oamY5} attr0=${p.oamAttr0.toString(16)}`,
  );
}
console.log(`\n输出: output/scene0-h5-timeline.json (${snapshots.length} 帧)`);
console.log(`     output/scene0-h5-phases.json (${phases.length} 个阶段转换)`);
console.log(`     output/scene0-h5-snap/fNNN.png (${SNAP_FRAMES.size} 张关键帧)`);
