import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const MUSIC_DIR = path.join(PROJECT_ROOT, 'game/data/music');

const file = 'Music00Data.ts';
const content = fs.readFileSync(path.join(MUSIC_DIR, file), 'utf8');
const match = content.match(/MUSIC_00_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);

if (match) {
  const buf = Buffer.from(match[1], 'base64');
  
  console.log(`=== Deep Format Analysis: Music00 ===`);
  console.log(`Total bytes: ${buf.length}`);
  console.log('');
  
  console.log(`=== Looking for all 0x01 commands and following bytes ===`);
  for (let i = 0; i < buf.length - 2; i++) {
    if (buf[i] === 0x01) {
      const next = buf[i + 1];
      const next2 = buf[i + 2];
      console.log(`0x${i.toString(16).padStart(6, '0')}: 0x01 0x${next.toString(16)} 0x${next2.toString(16)}`);
      if (i > 0x1000) break;
    }
  }
  
  console.log('');
  console.log(`=== Analyze byte frequencies ===`);
  const freq = new Array(256).fill(0);
  for (let i = 0; i < buf.length; i++) {
    freq[buf[i]]++;
  }
  
  console.log('Top 20 most frequent bytes:');
  const sorted = freq.map((count, val) => ({ val, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
  
  for (const { val, count } of sorted) {
    console.log(`  0x${val.toString(16).padStart(2, '0')}: ${count} (${((count / buf.length) * 100).toFixed(2)}%)`);
  }
  
  console.log('');
  console.log(`=== Look for 0x01 followed by non-zero address ===`);
  for (let i = 0; i < buf.length - 1; i++) {
    if (buf[i] === 0x01 && buf[i + 1] !== 0x00) {
      console.log(`0x${i.toString(16).padStart(6, '0')}: 0x01 0x${buf[i + 1].toString(16)}`);
    }
  }
}
