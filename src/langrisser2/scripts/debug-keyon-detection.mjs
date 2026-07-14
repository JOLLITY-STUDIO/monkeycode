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
  
  console.log(`=== Music00 KeyOn Detection Debug ===`);
  console.log(`Total bytes: ${buf.length}`);
  console.log('');
  
  let keyOnCount = 0;
  
  for (let i = 0; i < buf.length; i += 2) {
    const addr = buf[i];
    const data = buf[i + 1];
    
    const port = addr >= 0x80 ? 1 : 0;
    const address = addr & 0x7F;
    
    const channelNum = (address >> 3) & 0x03;
    const regOffset = address & 0x07;
    const ch = port * 3 + channelNum;
    
    if ((address & 0xF0) === 0x50) {
      const keyOn = (data >> 7) & 0x01;
      if (keyOn) {
        keyOnCount++;
        const fNumber = (buf[i - 2] || 0) | ((data & 0x03) << 8);
        const block = (data >> 2) & 0x07;
        console.log(`KeyOn at 0x${i.toString(16)}: addr=0x${addr.toString(16)} port=${port} ch=${ch} fNum=0x${fNumber.toString(16)} block=${block} data=0x${data.toString(16)}`);
        if (keyOnCount > 20) break;
      }
    }
  }
  
  console.log('');
  console.log(`Total KeyOn in 0x50-0x5F range: ${keyOnCount}`);
  
  console.log('');
  console.log(`=== Also check 0x40-0x4F range ===`);
  keyOnCount = 0;
  
  for (let i = 0; i < buf.length; i += 2) {
    const addr = buf[i];
    const data = buf[i + 1];
    
    const port = addr >= 0x80 ? 1 : 0;
    const address = addr & 0x7F;
    
    const channelNum = (address >> 3) & 0x03;
    const ch = port * 3 + channelNum;
    
    if ((address & 0xF0) === 0x40) {
      const keyOn = (data >> 7) & 0x01;
      if (keyOn) {
        keyOnCount++;
        console.log(`KeyOn at 0x${i.toString(16)}: addr=0x${addr.toString(16)} port=${port} ch=${ch} data=0x${data.toString(16)}`);
        if (keyOnCount > 20) break;
      }
    }
  }
  
  console.log('');
  console.log(`Total KeyOn in 0x40-0x4F range: ${keyOnCount}`);
}
