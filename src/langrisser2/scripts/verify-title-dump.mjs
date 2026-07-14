import { readFileSync, writeFileSync } from 'fs';
import { PNG } from 'pngjs';
import { VDP, cramToRGB, planeABase, planeBBase } from '../game/hw/vdp/vdp.js';
import { renderPlane } from '../game/hw/vdp/plane.js';

const VRAM_PATH = 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram';
const CRAM_PATH = 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram';
const OUTPUT_PATH = 'src/langrisser2/20260713/output/title-from-dump.png';

function createPNG(width, height) {
  return new PNG({ width, height });
}

function renderToPng(pixels, width, height) {
  const png = createPNG(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const pidx = idx;
      png.data[idx] = pixels[pidx];
      png.data[idx + 1] = pixels[pidx + 1];
      png.data[idx + 2] = pixels[pidx + 2];
      png.data[idx + 3] = pixels[pidx + 3];
    }
  }
  return png;
}

function savePNG(png, path) {
  const buffer = PNG.sync.write(png);
  writeFileSync(path, buffer);
  console.log(`Saved: ${path} (${png.width}x${png.height})`);
}

function main() {
  console.log('=== 标题画面 VRAM/CRAM dump 渲染验证\n');
  
  const vramData = readFileSync(VRAM_PATH);
  const cramData = readFileSync(CRAM_PATH);
  
  console.log(`VRAM dump: ${vramData.length} bytes`);
  console.log(`CRAM dump: ${cramData.length} bytes`);
  
  const vdp = new VDP();
  vdp.reset();
  
  for (let i = 0; i < Math.min(vramData.length, 0x10000); i++) {
    vdp.writeVRAM(i, vramData[i]);
  }
  
  const cramSize = Math.min(cramData.length, 128);
  for (let i = 0; i < cramSize; i++) {
    vdp.cram[i] = cramData[i];
  }
  
  console.log(`\nPlane A base: 0x${vdp.planeABaseAddr.toString(16).toUpperCase()}`);
  console.log(`Plane B base: 0x${vdp.planeBBaseAddr.toString(16).toUpperCase()}`);
  console.log(`Display: ${vdp.width}x${vdp.height}`);
  
  const bgColor = vdp.backgroundColor;
  const bgCram = vdp.readCRAM(bgColor);
  const bgRGB = cramToRGB(bgCram);
  console.log(`Background color: index=${bgColor}, cram=0x${bgCram.toString(16).padStart(4,'0')}, rgb(${bgRGB.r},${bgRGB.g},${bgRGB.b})`);
  
  console.log('\nCRAM palette dump (first 4 palettes):');
  for (let p = 0; p < 4; p++) {
    console.log(`  Palette ${p}:`);
    for (let i = 0; i < 16; i++) {
      const idx = p * 16 + i;
      const cv = vdp.readCRAM(idx);
      const rgb = cramToRGB(cv);
      console.log(`    [${idx.toString().padStart(2,'0')}] 0x${cv.toString(16).padStart(4,'0')} → rgb(${rgb.r},${rgb.g},${rgb.b})`);
    }
  }
  
  const width = 320;
  const height = 224;
  const pixels = new Uint8Array(width * height * 4);
  
  pixels.fill(0);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    pixels[idx] = bgRGB.r;
    pixels[idx + 1] = bgRGB.g;
    pixels[idx + 2] = bgRGB.b;
    pixels[idx + 3] = 255;
  }
  
  console.log('\nRendering Plane B (low priority)...');
  renderPlane(vdp, vdp.planeBBaseAddr, 0, 0, false, pixels, width, height, 0);
  
  console.log('Rendering Plane A (low priority)...');
  renderPlane(vdp, vdp.planeABaseAddr, 0, 0, true, pixels, width, height, 0);
  
  console.log('Rendering Plane B (high priority)...');
  renderPlane(vdp, vdp.planeBBaseAddr, 0, 0, false, pixels, width, height, 1);
  
  console.log('Rendering Plane A (high priority)...');
  renderPlane(vdp, vdp.planeABaseAddr, 0, 0, true, pixels, width, height, 1);
  
  const png = renderToPng(pixels, width, height);
  savePNG(png, OUTPUT_PATH);
  
  console.log('\nDone!');
}

main();
