import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const MUSIC_DIR = path.join(PROJECT_ROOT, 'game/data/music');

function findSegments(buf) {
  const segments = [];
  let start = 0;
  
  for (let i = 0; i < buf.length - 1; i++) {
    if (buf[i] === 0xFF && buf[i + 1] === 0xFD) {
      segments.push({ start, end: i, length: i - start });
      start = i + 2;
    }
  }
  
  if (start < buf.length) {
    segments.push({ start, end: buf.length, length: buf.length - start });
  }
  
  return segments;
}

function analyzeMusicFile(file) {
  const content = fs.readFileSync(path.join(MUSIC_DIR, file), 'utf8');
  const match = content.match(/MUSIC_\d+_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);
  
  if (!match) return;
  
  const buf = Buffer.from(match[1], 'base64');
  const segments = findSegments(buf);
  
  console.log(`\n=== ${file} (${buf.length} bytes) ===`);
  console.log(`Number of segments: ${segments.length}`);
  
  segments.forEach((seg, idx) => {
    console.log(`  Segment ${idx}: offset=0x${seg.start.toString(16)}, length=${seg.length} bytes`);
  });
  
  if (segments.length > 1) {
    console.log(`\nFirst 64 bytes of segment 1:`);
    const seg1 = segments[1];
    for (let i = 0; i < Math.min(64, seg1.length); i += 16) {
      const line = [];
      for (let j = 0; j < 16 && i + j < seg1.length; j++) {
        line.push(buf[seg1.start + i + j].toString(16).padStart(2, '0'));
      }
      console.log(`0x${(seg1.start + i).toString(16).padStart(6, '0')}: ${line.join(' ')}`);
    }
  }
}

const files = ['Music02Data.ts', 'Music09Data.ts', 'Music48Data.ts'];
files.forEach(f => analyzeMusicFile(f));
