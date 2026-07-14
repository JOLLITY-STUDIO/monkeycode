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
  
  console.log(`Music00 total bytes: ${buf.length}`);
  
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
  
  console.log(`Total segments: ${segments.length}`);
  
  let totalSize = 0;
  segments.forEach((seg, idx) => {
    totalSize += seg.length;
    if (idx < 30 || idx >= segments.length - 5) {
      console.log(`  Segment ${idx}: offset=0x${seg.start.toString(16)}, length=${seg.length}`);
    } else if (idx === 30) {
      console.log(`  ... (${segments.length - 35} segments skipped) ...`);
    }
  });
  
  console.log(`\n=== First segment (0x0-0x${segments[0].end.toString(16)}) ===`);
  const seg0 = segments[0];
  for (let i = 0; i < Math.min(200, seg0.length); i += 16) {
    const line = [];
    for (let j = 0; j < 16 && i + j < seg0.length; j++) {
      line.push(buf[seg0.start + i + j].toString(16).padStart(2, '0'));
    }
    console.log(`0x${(seg0.start + i).toString(16).padStart(6, '0')}: ${line.join(' ')}`);
  }
  
  console.log(`\n=== Last segment ===`);
  const lastSeg = segments[segments.length - 1];
  for (let i = 0; i < Math.min(200, lastSeg.length); i += 16) {
    const line = [];
    for (let j = 0; j < 16 && i + j < lastSeg.length; j++) {
      line.push(buf[lastSeg.start + i + j].toString(16).padStart(2, '0'));
    }
    console.log(`0x${(lastSeg.start + i).toString(16).padStart(6, '0')}: ${line.join(' ')}`);
  }
  
  console.log(`\n=== Look for 0xFF FD pattern distribution ===`);
  const fdPositions = [];
  for (let i = 0; i < buf.length - 1; i++) {
    if (buf[i] === 0xFF && buf[i + 1] === 0xFD) {
      fdPositions.push(i);
    }
  }
  
  console.log(`0xFF 0xFD count: ${fdPositions.length}`);
  console.log(`Positions (first 20):`);
  fdPositions.slice(0, 20).forEach((pos, idx) => {
    console.log(`  ${idx}: 0x${pos.toString(16)}`);
  });
  
  console.log(`\n=== Check segment content patterns ===`);
  for (let i = 0; i < Math.min(5, segments.length); i++) {
    const seg = segments[i];
    let hasSetAddr = false;
    let hasSSG = false;
    let hasFM = false;
    let hasKeyOn = false;
    
    let offset = seg.start;
    let currentAddr = 0;
    
    while (offset < seg.end) {
      const cmd = buf[offset];
      
      if (cmd === 0x01) {
        hasSetAddr = true;
        if (offset + 1 < buf.length) {
          currentAddr = buf[offset + 1];
          const innerAddr = currentAddr & 0x7F;
          if (innerAddr < 0x30) hasSSG = true;
          if (innerAddr >= 0x40 && innerAddr <= 0x5F) hasFM = true;
          offset += 2;
        } else {
          offset++;
        }
      } else if (cmd === 0x00) {
        const data = buf[offset + 1];
        if ((currentAddr & 0x7F) >= 0x40 && (currentAddr & 0x7F) <= 0x5F && (data >> 7) === 1) {
          hasKeyOn = true;
        }
        offset += 2;
      } else {
        if ((currentAddr & 0x7F) >= 0x40 && (currentAddr & 0x7F) <= 0x5F && (cmd >> 7) === 1) {
          hasKeyOn = true;
        }
        offset++;
      }
    }
    
    console.log(`Segment ${i}: hasSetAddr=${hasSetAddr}, hasSSG=${hasSSG}, hasFM=${hasFM}, hasKeyOn=${hasKeyOn}`);
  }
}
