import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const BMP_PATH = join(ROOT, 'src/langrisser2/screenshots/Langrisser II (Japan)_034.bmp');
const bmpBuf = readFileSync(BMP_PATH);
const width = bmpBuf.readInt32LE(18);
const height = bmpBuf.readInt32LE(22);
const dataOffset = bmpBuf.readUInt32LE(10);
const rowSize = ((width * 3 + 3) >> 2) * 4;

function getScreenshotPixel(sx, sy) {
  const srcY = height > 0 ? (height - 1 - sy) : sy;
  const srcOff = dataOffset + srcY * rowSize + sx * 3;
  return { r: bmpBuf[srcOff + 2], g: bmpBuf[srcOff + 1], b: bmpBuf[srcOff + 0] };
}

const titleAreaPixels = [];
const bgAreaPixels = [];

for (let py = 40; py < 80; py++) {
  for (let px = 80; px < 240; px++) {
    const c = getScreenshotPixel(px, py);
    if (c.r + c.g + c.b > 20) {
      titleAreaPixels.push(c);
    }
  }
}

for (let py = 100; py < 120; py++) {
  for (let px = 10; px < 30; px++) {
    bgAreaPixels.push(getScreenshotPixel(px, py));
  }
}

const avgTitleR = Math.round(titleAreaPixels.reduce((a,b)=>a+b.r,0)/titleAreaPixels.length);
const avgTitleG = Math.round(titleAreaPixels.reduce((a,b)=>a+b.g,0)/titleAreaPixels.length);
const avgTitleB = Math.round(titleAreaPixels.reduce((a,b)=>a+b.b,0)/titleAreaPixels.length);

const avgBgR = Math.round(bgAreaPixels.reduce((a,b)=>a+b.r,0)/bgAreaPixels.length);
const avgBgG = Math.round(bgAreaPixels.reduce((a,b)=>a+b.g,0)/bgAreaPixels.length);
const avgBgB = Math.round(bgAreaPixels.reduce((a,b)=>a+b.b,0)/bgAreaPixels.length);

console.log('=== 模拟器截图分析 ===');
console.log(`标题区域平均颜色: rgb(${avgTitleR},${avgTitleG},${avgTitleB})`);
console.log(`背景区域平均颜色: rgb(${avgBgR},${avgBgG},${avgBgB})`);

function compareRender(path, label) {
  const buf = readFileSync(path);
  const img = createCanvas(320, 224);
  const ctx = img.getContext('2d');
  ctx.drawImage(
    img.src.decode(buf),
    0, 0
  );
  
  const imgData = ctx.getImageData(0, 0, 320, 224);
  const data = imgData.data;
  
  let renderTitleR = 0, renderTitleG = 0, renderTitleB = 0, titleCount = 0;
  let renderBgR = 0, renderBgG = 0, renderBgB = 0, bgCount = 0;
  
  for (let py = 40; py < 80; py++) {
    for (let px = 80; px < 240; px++) {
      const i = ((py * 320 + px) * 4);
      const r = data[i], g = data[i+1], b = data[i+2];
      if (r + g + b > 20) {
        renderTitleR += r; renderTitleG += g; renderTitleB += b; titleCount++;
      }
    }
  }
  
  for (let py = 100; py < 120; py++) {
    for (let px = 10; px < 30; px++) {
      const i = ((py * 320 + px) * 4);
      renderBgR += data[i]; renderBgG += data[i+1]; renderBgB += data[i+2]; bgCount++;
    }
  }
  
  const avgRenderTitleR = Math.round(renderTitleR / titleCount);
  const avgRenderTitleG = Math.round(renderTitleG / titleCount);
  const avgRenderTitleB = Math.round(renderTitleB / titleCount);
  
  const avgRenderBgR = Math.round(renderBgR / bgCount);
  const avgRenderBgG = Math.round(renderBgG / bgCount);
  const avgRenderBgB = Math.round(renderBgB / bgCount);
  
  const titleDiff = Math.abs(avgTitleR - avgRenderTitleR) + 
                    Math.abs(avgTitleG - avgRenderTitleG) + 
                    Math.abs(avgTitleB - avgRenderTitleB);
  
  const bgDiff = Math.abs(avgBgR - avgRenderBgR) + 
                 Math.abs(avgBgG - avgRenderBgG) + 
                 Math.abs(avgBgB - avgRenderBgB);
  
  console.log('');
  console.log(`=== ${label} ===`);
  console.log(`标题区域: rgb(${avgRenderTitleR},${avgRenderTitleG},${avgRenderTitleB}) 差异=${titleDiff}`);
  console.log(`背景区域: rgb(${avgRenderBgR},${avgRenderBgG},${avgRenderBgB}) 差异=${bgDiff}`);
  
  return { titleDiff, bgDiff };
}

compareRender(join(DATA_DIR, 'output/title-plane-major.png'), 'Plane Major');
compareRender(join(DATA_DIR, 'output/title-row-major.png'), 'Row Major');
compareRender(join(DATA_DIR, 'output/title-fixed.png'), 'Fixed (Row Major)');
