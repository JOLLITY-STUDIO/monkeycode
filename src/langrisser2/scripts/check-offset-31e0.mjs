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
  
  console.log(`=== Data around 0x31e0 ===`);
  const start = 0x31d0;
  for (let i = start; i < start + 100; i += 16) {
    const line = [];
    for (let j = 0; j < 16 && i + j < buf.length; j++) {
      line.push(buf[i + j].toString(16).padStart(2, '0'));
    }
    console.log(`0x${i.toString(16).padStart(6, '0')}: ${line.join(' ')}`);
  }
  
  console.log('');
  console.log(`=== Process data from 0x31e0 ===`);
  
  let offset = 0x31e0;
  let currentAddr = 0;
  let currentPort = 0;
  
  while (offset < buf.length && offset < 0x31e0 + 100) {
    const cmd = buf[offset];
    
    if (cmd === 0xFF) {
      if (offset + 1 < buf.length && buf[offset + 1] === 0xFD) {
        console.log(`0x${offset.toString(16)}: END (0xFF 0xFD)`);
        break;
      }
      console.log(`0x${offset.toString(16)}: WAIT (0xFF)`);
      offset++;
      continue;
    }
    
    if (cmd === 0x01) {
      if (offset + 1 < buf.length) {
        currentAddr = buf[offset + 1];
        currentPort = (currentAddr >= 0x80) ? 1 : 0;
        console.log(`0x${offset.toString(16)}: SETADDR addr=0x${currentAddr.toString(16)} port=${currentPort}`);
        offset += 2;
      } else {
        offset++;
      }
    } else if (cmd === 0x00) {
      if (offset + 1 < buf.length) {
        const data = buf[offset + 1];
        console.log(`0x${offset.toString(16)}: WRITE addr=0x${currentAddr.toString(16)} data=0x${data.toString(16)}`);
        offset += 2;
      } else {
        offset++;
      }
    } else {
      const data = cmd;
      console.log(`0x${offset.toString(16)}: WRITE addr=0x${currentAddr.toString(16)} data=0x${data.toString(16)}`);
      offset++;
    }
  }
}
