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
  
  console.log(`=== Music00 Raw Format Analysis ===`);
  console.log(`Total bytes: ${buf.length}`);
  console.log('');
  
  console.log(`First 40 address-data pairs:`);
  for (let i = 0; i < 80 && i < buf.length; i += 2) {
    const addr = buf[i];
    const data = buf[i + 1];
    
    const port = addr >= 0x80 ? 1 : 0;
    const channelAddr = addr & 0x7F;
    const ch = (channelAddr & 0x0F) >> 1;
    const reg = channelAddr & 0xF0;
    
    let regName = '';
    if (reg === 0x00) regName = 'TL/AR';
    else if (reg === 0x10) regName = 'DR/SR';
    else if (reg === 0x20) regName = 'SL/RR';
    else if (reg === 0x30) regName = 'SSG-EG';
    else if (reg === 0x40) regName = 'F-Number L';
    else if (reg === 0x50) regName = 'F-Number H/KeyOn';
    else if (reg === 0x60) regName = 'Algorithm/Feedback';
    else if (reg === 0x70) regName = 'Operator';
    
    const keyOn = (reg === 0x50 && (data & 0x80)) ? ' KEYON' : '';
    
    console.log(`0x${i.toString(16).padStart(4, '0')}: addr=0x${addr.toString(16).padStart(2, '0')} (port${port} ch${ch} ${regName}) data=0x${data.toString(16).padStart(2, '0')}${keyOn}`);
  }
  
  console.log('');
  console.log(`=== KeyOn events scan ===`);
  let keyOnCount = 0;
  for (let i = 0; i < buf.length; i += 2) {
    const addr = buf[i];
    const data = buf[i + 1];
    const channelAddr = addr & 0x7F;
    if ((channelAddr & 0xF0) === 0x50 && (data & 0x80)) {
      const port = addr >= 0x80 ? 1 : 0;
      const ch = ((channelAddr & 0x0F) >> 1) + port * 3;
      keyOnCount++;
      if (keyOnCount <= 20) {
        const fNum = (data & 0x3F) | ((addr & 0x0F) << 6);
        console.log(`KeyOn at 0x${i.toString(16)}: ch${ch} fNum=0x${fNum.toString(16)} data=0x${data.toString(16)}`);
      }
    }
  }
  console.log(`Total KeyOn: ${keyOnCount}`);
  
  console.log('');
  console.log(`=== Search for 0xFF patterns ===`);
  for (let i = 0; i < buf.length; i += 2) {
    const addr = buf[i];
    const data = buf[i + 1];
    if (addr === 0xFF) {
      console.log(`0x${i.toString(16)}: addr=0xFF data=0x${data.toString(16)}`);
      if (i > 0x1000) break;
    }
  }
}
