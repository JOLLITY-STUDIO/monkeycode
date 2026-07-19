/**
 * 诊断脚本：追踪标题画面蓝屏问题
 * 运行：npx tsx tmp-diagnose-title.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { Game } from './game/Game';
import { IPlatform } from './game/platform/IPlatform';
import { DISPLAY } from './game/core/types';

const SRC_DIR = __dirname.includes('tmp-langrisser2-build')
  ? path.resolve(__dirname, '../src/langrisser2')
  : __dirname;

let lastImageData: ImageData | null = null;

const fakeCtx: any = {
  canvas: null,
  width: DISPLAY.WIDTH,
  height: DISPLAY.HEIGHT,
  clearRect: () => {},
  createImageData: (w: number, h: number): ImageData => {
    return {
      width: w,
      height: h,
      data: new Uint8ClampedArray(w * h * 4),
    } as unknown as ImageData;
  },
  putImageData: (imageData: ImageData) => {
    lastImageData = imageData;
  },
};

const fakeCanvas = {
  width: DISPLAY.WIDTH,
  height: DISPLAY.HEIGHT,
  getContext: () => fakeCtx,
};
fakeCtx.canvas = fakeCanvas;

const romPath = path.resolve(
  SRC_DIR,
  '20260713/Langrisser II (Japan).md'
);

const platform: IPlatform = {
  canvas: fakeCanvas as any,
  ctx: fakeCtx as any,
  displayWidth: DISPLAY.WIDTH,
  displayHeight: DISPLAY.HEIGHT,
  requestFrame: () => 0,
  cancelFrame: () => {},
  onTouch: () => {},
  onKey: () => {},
  loadRomBinary: async () => {
    const buf = fs.readFileSync(romPath);
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  },
  saveData: async () => {},
  loadData: async () => null,
  createAudioContext: () => null,
};

async function main() {
  console.log('ROM 路径:', romPath);
  const game = new Game(platform);

  await game.start();

  for (let i = 0; i < 60; i++) {
    for (let s = 0; s < 10000 && !game.cpu.halted; s++) game.cpu.step();
    game.vdp.stepFrame();
  }

  game.renderer.renderFrame(fakeCtx as unknown as CanvasRenderingContext2D);

  const vdp = game.vdp;
  console.log('\n=== VDP 状态 ===');
  console.log('寄存器:', Array.from(vdp.reg).map((v, i) => `R${i}=${v.toString(16).padStart(2, '0')}`).join(' '));
  console.log('planeAAddr:', '0x' + vdp.planeAAddr.toString(16));
  console.log('planeBAddr:', '0x' + vdp.planeBAddr.toString(16));
  console.log('planeWidth:', vdp.planeWidth);
  console.log('planeHeight:', vdp.planeHeight);
  console.log('backgroundColor:', vdp.backgroundColor);
  console.log('displayEnabled:', vdp.displayEnabled);
  console.log('h40Mode:', vdp.h40Mode);

  console.log('\n=== CRAM 前 16 色 (palette 0) ===');
  for (let i = 0; i < 16; i++) {
    const raw = vdp.cram.getColor(i);
    const rgba = vdp.cram.getRGBA(0, i);
    console.log(`  [${i}] raw=0x${raw.toString(16).padStart(4, '0')} RGBA(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`);
  }

  console.log('\n=== Plane A Nametable 前 20 个 entry ===');
  for (let i = 0; i < 20; i++) {
    const word = vdp.vram.readWordLE(vdp.planeAAddr + i * 2);
    console.log(`  [${i}] word=0x${word.toString(16).padStart(4, '0')} tileIdx=${word & 0x7FF} pal=${(word >> 13) & 3} pri=${(word >> 15) & 1}`);
  }

  console.log('\n=== VRAM Tile 数据 前 64 字节 (tile 0) ===');
  const tile0 = vdp.vram.readTileData(0);
  console.log('  ', Array.from(tile0.slice(0, 64)).map(b => b.toString(16).padStart(2, '0')).join(' '));

  console.log('\n=== VRAM 非零统计 ===');
  const raw = vdp.vram.getRawData();
  let nonZero = 0;
  for (let i = 0; i < raw.length; i++) if (raw[i] !== 0) nonZero++;
  console.log(`  VRAM 非零字节: ${nonZero} / ${raw.length}`);

  console.log('\n=== Framebuffer 统计 ===');
  const fb = game.renderer.getFrameBuffer();
  let totalR = 0, totalG = 0, totalB = 0;
  let nonBgCount = 0;
  const bgRaw = vdp.cram.getColor(vdp.backgroundColor);
  const bg = vdp.cram.getRGBA(0, 0);
  console.log(`  背景色 raw=0x${bgRaw.toString(16).padStart(4, '0')} RGBA(${bg.r},${bg.g},${bg.b},${bg.a})`);
  for (let i = 0; i < fb.length; i += 4) {
    const r = fb[i], g = fb[i + 1], b = fb[i + 2], a = fb[i + 3];
    totalR += r; totalG += g; totalB += b;
    if (r !== bg.r || g !== bg.g || b !== bg.b) nonBgCount++;
  }
  const pxCount = fb.length / 4;
  console.log(`  平均 R=${(totalR/pxCount).toFixed(2)} G=${(totalG/pxCount).toFixed(2)} B=${(totalB/pxCount).toFixed(2)}`);
  console.log(`  非背景像素: ${nonBgCount} / ${pxCount} (${(nonBgCount/pxCount*100).toFixed(4)}%)`);

  const ppmPath = path.resolve(SRC_DIR, 'tmp-diagnose-title.ppm');
  const ppm = ['P6', `${DISPLAY.WIDTH} ${DISPLAY.HEIGHT}`, '255'];
  const data = Buffer.alloc(DISPLAY.WIDTH * DISPLAY.HEIGHT * 3);
  let off = 0;
  for (let i = 0; i < fb.length; i += 4) {
    data[off++] = fb[i];
    data[off++] = fb[i + 1];
    data[off++] = fb[i + 2];
  }
  fs.writeFileSync(ppmPath, Buffer.concat([Buffer.from(ppm.join('\n') + '\n'), data]));
  console.log(`\n  已保存 PPM: ${ppmPath}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
