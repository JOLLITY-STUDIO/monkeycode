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

const japaneseTexts = [
  'ウォーロック',
  'ロード',
  'ナイト',
  'マジックナイト',
  'パラディン',
  'ウィザード',
  'マスターウィザード',
  'サモナー',
  'クレリック',
  'ビショップ',
  'セイント',
  'スナイパー',
  'アサシン',
  'ニンジャ',
  'アーチャー',
];

let y = 20;
ctx.textBaseline = 'top';

for (let i = 0; i < japaneseTexts.length; i++) {
  ctx.font = '14px "Noto Sans JP", sans-serif';
  ctx.fillStyle = '#fff';
  ctx.fillText(japaneseTexts[i], 20, y);
  
  ctx.font = '14px monospace';
  ctx.fillStyle = '#888';
  ctx.fillText(japaneseTexts[i], 200, y);
  
  y += 16;
}

ctx.font = 'bold 16px "Noto Serif JP", serif';
ctx.fillStyle = '#ff0';
ctx.fillText('日本語テスト - Japanese Test', 80, 200);

const outputPath = path.join(OUTPUT_DIR, 'japanese-render-test.png');
fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));

console.log(`[OK] 日文渲染测试完成! 输出: ${outputPath}`);
console.log('');
console.log('=== 测试结果说明 ===');
console.log('左侧: Noto Sans JP (支持日文)');
console.log('右侧: monospace (可能显示方块)');
