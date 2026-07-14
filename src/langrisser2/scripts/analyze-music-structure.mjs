import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const MUSIC_DIR = path.join(PROJECT_ROOT, 'game/data/music');

function analyzeMusicData(musicData) {
  const segments = [];
  let currentSegment = [];
  let currentTick = 0;
  let noteCount = 0;
  
  let i = 0;
  while (i < musicData.length) {
    if (i + 1 < musicData.length && musicData[i] === 0xFF && musicData[i + 1] === 0xFD) {
      segments.push({
        length: currentSegment.length,
        ticks: currentTick,
        notes: noteCount
      });
      currentSegment = [];
      currentTick = 0;
      noteCount = 0;
      i += 2;
      continue;
    }
    
    if (i + 1 < musicData.length && musicData[i] === 0xFF && musicData[i + 1] === 0xFF) {
      currentTick += 48;
      i += 2;
      continue;
    }
    
    if (i + 1 < musicData.length && musicData[i] === 0xFF) {
      i += 2;
      continue;
    }
    
    currentSegment.push(musicData[i]);
    
    const byte = musicData[i];
    if (byte >= 0x40 && byte <= 0x5F) {
      noteCount++;
    }
    
    i++;
  }
  
  if (currentSegment.length > 0) {
    segments.push({
      length: currentSegment.length,
      ticks: currentTick,
      notes: noteCount
    });
  }
  
  const ffPairs = [];
  i = 0;
  while (i < musicData.length - 1) {
    if (musicData[i] === 0xFF && musicData[i + 1] === 0xFF) {
      ffPairs.push(i);
      i += 2;
    } else {
      i++;
    }
  }
  
  const singleFFs = [];
  i = 0;
  while (i < musicData.length) {
    if (musicData[i] === 0xFF) {
      if (i + 1 >= musicData.length || musicData[i + 1] !== 0xFF) {
        singleFFs.push(i);
      }
      i++;
    } else {
      i++;
    }
  }
  
  const fdMarkers = [];
  i = 0;
  while (i < musicData.length - 1) {
    if (musicData[i] === 0xFF && musicData[i + 1] === 0xFD) {
      fdMarkers.push(i);
      i += 2;
    } else {
      i++;
    }
  }
  
  let potentialEnd = musicData.length;
  for (let j = musicData.length - 1; j >= 0; j--) {
    if (musicData[j] !== 0xFF) {
      potentialEnd = j + 1;
      break;
    }
  }
  
  return {
    totalLength: musicData.length,
    segments,
    ffPairs: ffPairs.length,
    singleFFs: singleFFs.length,
    fdMarkers: fdMarkers.length,
    fdPositions: fdMarkers.slice(0, 5),
    potentialEnd
  };
}

function main() {
  const musicFiles = fs.readdirSync(MUSIC_DIR).filter(f => f.endsWith('.ts'));
  
  console.log('Music Data Structure Analysis:');
  console.log('ID | TotalLen | Segments | FFPairs | SingleFF | PotentialEnd');
  console.log('---|----------|----------|---------|----------|-------------');
  
  musicFiles.forEach(file => {
    const match = file.match(/Music(\d+)Data\.ts/);
    if (!match) return;
    
    const musicId = parseInt(match[1], 10);
    
    try {
      const content = fs.readFileSync(path.join(MUSIC_DIR, file), 'utf8');
      const base64Match = content.match(/MUSIC_\d+_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);
      
      if (!base64Match) return;
      
      const base64Data = base64Match[1];
      const musicData = Buffer.from(base64Data, 'base64');
      
      const { totalLength, segments, ffPairs, singleFFs, potentialEnd } = analyzeMusicData(musicData);
      
      console.log(`${musicId.toString().padStart(2, '0')} | ${totalLength.toString().padStart(8)} | ${segments.length.toString().padStart(8)} | ${ffPairs.toString().padStart(7)} | ${singleFFs.toString().padStart(8)} | ${potentialEnd.toString().padStart(11)}`);
    } catch (error) {
      console.log(`${musicId.toString().padStart(2, '0')} | ERROR: ${error.message}`);
    }
  });
  
  console.log('\n--- Detailed Segment Analysis for Music 00 ---');
  const music00Content = fs.readFileSync(path.join(MUSIC_DIR, 'Music00Data.ts'), 'utf8');
  const base64Match = music00Content.match(/MUSIC_00_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);
  if (base64Match) {
    const music00Data = Buffer.from(base64Match[1], 'base64');
    const { segments, fdPositions } = analyzeMusicData(music00Data);
    
    console.log(`Total segments: ${segments.length}`);
    console.log(`FD markers at: ${fdPositions.join(', ')}...`);
    console.log('\nSegment details:');
    let totalTicks = 0;
    let totalNotes = 0;
    segments.forEach((seg, idx) => {
      totalTicks += seg.ticks;
      totalNotes += seg.notes;
      console.log(`  Seg ${idx + 1}: ${seg.length} bytes, ${seg.ticks} ticks, ${seg.notes} notes`);
    });
    console.log(`Total: ${totalTicks} ticks = ${(totalTicks / 480).toFixed(1)} sec, ${totalNotes} notes`);
    
    console.log('\nFirst 50 bytes of Music 00:');
    console.log(music00Data.slice(0, 50).toString('hex').match(/.{2}/g).join(' '));
    
    console.log('\nLast 50 bytes (before potential end):');
    const { potentialEnd } = analyzeMusicData(music00Data);
    console.log(music00Data.slice(Math.max(0, potentialEnd - 50), potentialEnd).toString('hex').match(/.{2}/g).join(' '));
  }
}

main();
