import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const MUSIC_DIR = path.join(PROJECT_ROOT, 'game/data/music');

function analyzeFormat(musicData, musicId) {
  console.log(`\n=== Music ${musicId} Format Analysis ===`);
  console.log(`Total length: ${musicData.length} bytes`);
  
  console.log('\nFirst 100 bytes (hex):');
  console.log(musicData.slice(0, 100).toString('hex').match(/.{2}/g).join(' '));
  
  console.log('\nFirst 100 bytes (interpreted):');
  let i = 0;
  while (i < Math.min(100, musicData.length)) {
    const byte = musicData[i];
    
    if (byte === 0x01 && i + 1 < musicData.length) {
      console.log(`  [${i.toString().padStart(4, '0')}] 01 ${musicData[i+1].toString(16).padStart(2, '0')} - SET_ADDR`);
      i += 2;
    } else if (byte === 0x00 && i + 1 < musicData.length) {
      console.log(`  [${i.toString().padStart(4, '0')}] 00 ${musicData[i+1].toString(16).padStart(2, '0')} - WRITE_DATA`);
      i += 2;
    } else if (byte === 0xFF && i + 1 < musicData.length) {
      const next = musicData[i + 1];
      if (next === 0xFF) {
        console.log(`  [${i.toString().padStart(4, '0')}] FF FF - ???`);
      } else if (next === 0xFD) {
        console.log(`  [${i.toString().padStart(4, '0')}] FF FD - SEGMENT_END`);
      } else if (next === 0xFE) {
        console.log(`  [${i.toString().padStart(4, '0')}] FF FE - ???`);
      } else {
        console.log(`  [${i.toString().padStart(4, '0')}] FF ${next.toString(16).padStart(2, '0')} - ???`);
      }
      i += 2;
    } else {
      console.log(`  [${i.toString().padStart(4, '0')}] ${byte.toString(16).padStart(2, '0')} - DIRECT_DATA`);
      i += 1;
    }
  }
  
  const ffCount = [];
  let count = 0;
  for (let j = 0; j < musicData.length; j++) {
    if (musicData[j] === 0xFF) {
      count++;
    } else {
      if (count > 0) {
        ffCount.push(count);
        count = 0;
      }
    }
  }
  if (count > 0) ffCount.push(count);
  
  console.log(`\nFF run lengths (top 10):`);
  ffCount.sort((a, b) => b - a);
  console.log(ffCount.slice(0, 10).join(', '));
  
  const fdPositions = [];
  for (let j = 0; j < musicData.length - 1; j++) {
    if (musicData[j] === 0xFF && musicData[j + 1] === 0xFD) {
      fdPositions.push(j);
    }
  }
  
  console.log(`\nFD markers (first 10):`);
  console.log(fdPositions.slice(0, 10).join(', '));
  
  const fePositions = [];
  for (let j = 0; j < musicData.length - 1; j++) {
    if (musicData[j] === 0xFF && musicData[j + 1] === 0xFE) {
      fePositions.push(j);
    }
  }
  
  console.log(`\nFE markers (first 10):`);
  console.log(fePositions.slice(0, 10).join(', '));
  
  const ffPairs = [];
  for (let j = 0; j < musicData.length - 1; j++) {
    if (musicData[j] === 0xFF && musicData[j + 1] === 0xFF) {
      ffPairs.push(j);
    }
  }
  
  console.log(`\nFF FF pairs (first 10):`);
  console.log(ffPairs.slice(0, 10).join(', '));
  
  const addressWrites = [];
  for (let j = 0; j < musicData.length; j++) {
    if (musicData[j] === 0x01 && j + 1 < musicData.length) {
      addressWrites.push(musicData[j + 1]);
      j++;
    }
  }
  
  const addrCounts = {};
  addressWrites.forEach(addr => {
    addrCounts[addr] = (addrCounts[addr] || 0) + 1;
  });
  
  console.log(`\nMost frequent addresses:`);
  Object.entries(addrCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([addr, count]) => {
    console.log(`  0x${parseInt(addr).toString(16).padStart(2, '0')}: ${count} times`);
  });
  
  return { fdPositions, ffPairs, fePositions };
}

function main() {
  const music00Content = fs.readFileSync(path.join(MUSIC_DIR, 'Music00Data.ts'), 'utf8');
  const base64Match = music00Content.match(/MUSIC_00_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);
  
  if (base64Match) {
    const music00Data = Buffer.from(base64Match[1], 'base64');
    analyzeFormat(music00Data, 0);
  }
  
  const music09Content = fs.readFileSync(path.join(MUSIC_DIR, 'Music09Data.ts'), 'utf8');
  const base64Match09 = music09Content.match(/MUSIC_09_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);
  
  if (base64Match09) {
    const music09Data = Buffer.from(base64Match09[1], 'base64');
    analyzeFormat(music09Data, 9);
  }
}

main();
