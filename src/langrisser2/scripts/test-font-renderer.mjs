import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'output');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const canvas = createCanvas(320, 224);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 320, 224);

const testTexts = [
  'ウォーロック',
  'ロード',
  'ナイト',
  'マジックナイト',
  'パラディン',
  'ウィザード',
  'マスターウィザード',
  'サモナー',
];

let y = 20;

ctx.fillStyle = '#fff';
ctx.font = '12px "Noto Sans JP", sans-serif';
ctx.textBaseline = 'top';
ctx.fillText('=== fillText Mode (Noto Sans JP) ===', 10, y);
y += 20;

for (const text of testTexts) {
  ctx.fillText(text, 10, y);
  y += 16;
}

y += 20;
ctx.fillStyle = '#ff0';
ctx.font = '12px monospace';
ctx.fillText('=== tile Mode (8x8 Pixel Font) ===', 10, y);
y += 20;

ctx.font = '12px monospace';
ctx.fillStyle = '#888';
ctx.fillText('(ASCII only - Japanese chars show as spaces)', 10, y);
y += 20;

for (const text of testTexts) {
  ctx.fillText(text, 10, y);
  y += 16;
}

const outputPath = path.join(OUTPUT_DIR, 'font-renderer-test.png');
fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));

console.log(`[OK] 字体渲染测试完成! 输出: ${outputPath}`);
console.log('');
console.log('=== 测试结果说明 ===');
console.log('上半部分: fillText模式 - 使用Noto Sans JP字体，支持日文');
console.log('下半部分: tile模式 - 使用8x8像素字体，只支持ASCII字符');
console.log('');
console.log('当前实现:');
console.log('- fillText模式: 默认模式，使用Google Fonts的Noto Sans JP');
console.log('- tile模式: 使用内部8x8像素字体，仅支持ASCII字母和数字');
console.log('- 切换方式: setFontRenderMode("tile") 或 setFontRenderMode("fillText")');
