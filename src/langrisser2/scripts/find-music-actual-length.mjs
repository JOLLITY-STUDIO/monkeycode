import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const MUSIC_DIR = path.join(PROJECT_ROOT, 'game/data/music');

function findActualLength(musicData) {
  let lastNonFF = musicData.length;
  
  for (let i = musicData.length - 1; i >= 0; i--) {
    if (musicData[i] !== 0xFF) {
      lastNonFF = i + 1;
      break;
    }
  }
  
  let lastNonZero = musicData.length;
  for (let i = musicData.length - 1; i >= 0; i--) {
    if (musicData[i] !== 0x00) {
      lastNonZero = i + 1;
      break;
    }
  }
  
  let ffCount = 0;
  let maxFF = 0;
  for (let i = 0; i < musicData.length; i++) {
    if (musicData[i] === 0xFF) {
      ffCount++;
      maxFF = Math.max(maxFF, ffCount);
    } else {
      ffCount = 0;
    }
  }
  
  let hasZeroPadding = false;
  let zeroStart = -1;
  for (let i = 0; i < musicData.length; i++) {
    if (musicData[i] === 0x00) {
      if (zeroStart === -1) zeroStart = i;
    } else if (zeroStart !== -1) {
      const zeroLen = i - zeroStart;
      if (zeroLen > 100) {
        hasZeroPadding = true;
        break;
      }
      zeroStart = -1;
    }
  }
  
  let segmentEndCount = 0;
  for (let i = 0; i < musicData.length - 1; i++) {
    if (musicData[i] === 0xFF && musicData[i + 1] === 0xFD) {
      segmentEndCount++;
    }
  }
  
  return {
    declaredLength: musicData.length,
    lastNonFF,
    lastNonZero,
    maxFFRun: maxFF,
    hasZeroPadding,
    segmentCount: segmentEndCount
  };
}

function main() {
  const musicFiles = fs.readdirSync(MUSIC_DIR).filter(f => f.endsWith('.ts'));
  
  console.log('Music Data Length Analysis:');
  console.log('ID | Declared | LastNonFF | LastNonZero | MaxFFRun | Segments | HasZeroPad');
  console.log('---|----------|-----------|-------------|----------|----------|----------');
  
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
      
      const { declaredLength, lastNonFF, lastNonZero, maxFFRun, hasZeroPadding, segmentCount } = findActualLength(musicData);
      
      console.log(`${musicId.toString().padStart(2, '0')} | ${declaredLength.toString().padStart(8)} | ${lastNonFF.toString().padStart(9)} | ${lastNonZero.toString().padStart(11)} | ${maxFFRun.toString().padStart(8)} | ${segmentCount.toString().padStart(8)} | ${hasZeroPadding ? 'Yes' : 'No'}`);
    } catch (error) {
      console.log(`${musicId.toString().padStart(2, '0')} | ERROR: ${error.message}`);
    }
  });
}

main();
