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
  
  console.log(`=== Music00 SoundSystem Format Analysis ===`);
  console.log(`Total bytes: ${buf.length}`);
  console.log('');
  
  let offset = 0;
  let currentPort = 0;
  let currentAddr = 0;
  let keyOnCount = 0;
  let totalWrites = 0;
  let loops = 0;
  
  while (offset < buf.length) {
    const cmd = buf[offset];
    
    if (cmd === 0xFF && offset + 1 < buf.length && buf[offset + 1] === 0xFD) {
      loops++;
      break;
    }
    
    if (cmd === 0x01) {
      if (offset + 1 < buf.length) {
        currentAddr = buf[offset + 1];
        currentPort = (currentAddr >= 0x80) ? 1 : 0;
        offset += 2;
      } else {
        offset++;
      }
    } else if (cmd === 0x00) {
      if (offset + 1 < buf.length) {
        const data = buf[offset + 1];
        totalWrites++;
        
        const address = currentAddr & 0x7F;
        if (address >= 0x40 && address <= 0x4F) {
          const keyOn = (data >> 7) & 0x01;
          if (keyOn) keyOnCount++;
        }
        
        offset += 2;
      } else {
        offset++;
      }
    } else {
      const data = cmd;
      totalWrites++;
      
      const address = currentAddr & 0x7F;
      if (address >= 0x40 && address <= 0x4F) {
        const keyOn = (data >> 7) & 0x01;
        if (keyOn) keyOnCount++;
      }
      
      offset++;
    }
  }
  
  console.log(`Total writes: ${totalWrites}`);
  console.log(`KeyOn events: ${keyOnCount}`);
  console.log(`Loops detected: ${loops}`);
  console.log(`Final offset: 0x${offset.toString(16)} (${offset} bytes processed)`);
  console.log('');
  
  console.log(`=== First 50 YM2612 writes ===`);
  
  offset = 0;
  currentPort = 0;
  currentAddr = 0;
  let writeCount = 0;
  
  while (offset < buf.length && writeCount < 50) {
    const cmd = buf[offset];
    
    if (cmd === 0xFF && offset + 1 < buf.length && buf[offset + 1] === 0xFD) {
      break;
    }
    
    if (cmd === 0x01) {
      if (offset + 1 < buf.length) {
        currentAddr = buf[offset + 1];
        currentPort = (currentAddr >= 0x80) ? 1 : 0;
        console.log(`[SETADDR] port=${currentPort} addr=0x${currentAddr.toString(16).padStart(2, '0')}`);
        offset += 2;
      } else {
        offset++;
      }
    } else if (cmd === 0x00) {
      if (offset + 1 < buf.length) {
        const data = buf[offset + 1];
        const address = currentAddr & 0x7F;
        const ch = address & 0x03;
        const fullCh = currentPort * 3 + ch;
        const keyOn = (data >> 7) & 0x01;
        
        let info = '';
        if (address >= 0x40 && address <= 0x4F) {
          info = keyOn ? ` [KEYON ch${fullCh}]` : ` [KEYOFF ch${fullCh}]`;
        }
        
        console.log(`[WRITE]  port=${currentPort} addr=0x${currentAddr.toString(16).padStart(2, '0')} data=0x${data.toString(16).padStart(2, '0')}${info}`);
        writeCount++;
        offset += 2;
      } else {
        offset++;
      }
    } else {
      const data = cmd;
      const address = currentAddr & 0x7F;
      const ch = address & 0x03;
      const fullCh = currentPort * 3 + ch;
      const keyOn = (data >> 7) & 0x01;
      
      let info = '';
      if (address >= 0x40 && address <= 0x4F) {
        info = keyOn ? ` [KEYON ch${fullCh}]` : ` [KEYOFF ch${fullCh}]`;
      }
      
      console.log(`[WRITE]  port=${currentPort} addr=0x${currentAddr.toString(16).padStart(2, '0')} data=0x${data.toString(16).padStart(2, '0')}${info}`);
      writeCount++;
      offset++;
    }
  }
}
