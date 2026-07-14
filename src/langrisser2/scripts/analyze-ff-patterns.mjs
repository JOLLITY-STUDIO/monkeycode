import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const MUSIC_DIR = path.join(PROJECT_ROOT, 'game/data/music');

const file = 'Music00Data.ts';
const content = fs.readFileSync(path.join(MUSIC_DIR, file), 'utf8');
const match = content.match(/MUSIC_\d+_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);

if (match) {
  const buf = Buffer.from(match[1], 'base64');
  
  console.log(`=== 0xFF pattern analysis ===`);
  
  const ffCounts = {};
  for (let i = 0; i < buf.length - 1; i++) {
    if (buf[i] === 0xFF) {
      const nextByte = buf[i + 1];
      const key = `0x${nextByte.toString(16)}`;
      ffCounts[key] = (ffCounts[key] || 0) + 1;
    }
  }
  
  console.log(`0xFF followed by:`);
  Object.entries(ffCounts).sort((a, b) => b[1] - a[1]).forEach(([key, count]) => {
    console.log(`  ${key}: ${count} times`);
  });
  
  console.log(`\n=== Check the context of 0xFF FF ===`);
  let count = 0;
  for (let i = 0; i < buf.length - 2; i++) {
    if (buf[i] === 0xFF && buf[i + 1] === 0xFF) {
      if (count < 10) {
        const prev10 = [];
        for (let j = Math.max(0, i - 10); j < i; j++) {
          prev10.push(buf[j].toString(16).padStart(2, '0'));
        }
        const next10 = [];
        for (let j = i + 2; j < Math.min(buf.length, i + 12); j++) {
          next10.push(buf[j].toString(16).padStart(2, '0'));
        }
        console.log(`0x${i.toString(16)}: [...${prev10.join(' ')}] FF FF [${next10.join(' ')}...]`);
      }
      count++;
    }
  }
  console.log(`Total 0xFF FF occurrences: ${count}`);
  
  console.log(`\n=== Check the context of 0xFF FE ===`);
  count = 0;
  for (let i = 0; i < buf.length - 2; i++) {
    if (buf[i] === 0xFF && buf[i + 1] === 0xFE) {
      if (count < 10) {
        const prev10 = [];
        for (let j = Math.max(0, i - 10); j < i; j++) {
          prev10.push(buf[j].toString(16).padStart(2, '0'));
        }
        const next10 = [];
        for (let j = i + 2; j < Math.min(buf.length, i + 12); j++) {
          next10.push(buf[j].toString(16).padStart(2, '0'));
        }
        console.log(`0x${i.toString(16)}: [...${prev10.join(' ')}] FF FE [${next10.join(' ')}...]`);
      }
      count++;
    }
  }
  console.log(`Total 0xFF FE occurrences: ${count}`);
}
