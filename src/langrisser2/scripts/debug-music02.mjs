import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const MUSIC_DIR = path.join(PROJECT_ROOT, 'game/data/music');

const file = 'Music02Data.ts';
const content = fs.readFileSync(path.join(MUSIC_DIR, file), 'utf8');
const match = content.match(/MUSIC_\d+_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);

if (match) {
  const buf = Buffer.from(match[1], 'base64');
  
  console.log(`Music02 total bytes: ${buf.length}`);
  
  console.log(`\n=== First 256 bytes ===`);
  for (let i = 0; i < Math.min(256, buf.length); i += 16) {
    const line = [];
    for (let j = 0; j < 16 && i + j < buf.length; j++) {
      line.push(buf[i + j].toString(16).padStart(2, '0'));
    }
    console.log(`0x${i.toString(16).padStart(6, '0')}: ${line.join(' ')}`);
  }
  
  console.log(`\n=== Parse first 100 commands ===`);
  
  let offset = 0;
  let currentAddr = 0;
  let currentPort = 0;
  let cmdCount = 0;
  
  while (offset < buf.length && cmdCount < 100) {
    const cmd = buf[offset];
    
    if (cmd === 0xFF) {
      if (offset + 1 < buf.length && buf[offset + 1] === 0xFD) {
        console.log(`0x${offset.toString(16)}: END (0xFF 0xFD)`);
        break;
      }
      console.log(`0x${offset.toString(16)}: WAIT (0xFF)`);
      offset++;
      cmdCount++;
      continue;
    }
    
    if (cmd === 0x01) {
      if (offset + 1 < buf.length) {
        currentAddr = buf[offset + 1];
        currentPort = (currentAddr >= 0x80) ? 1 : 0;
        console.log(`0x${offset.toString(16)}: SETADDR addr=0x${currentAddr.toString(16)} port=${currentPort}`);
        offset += 2;
        cmdCount++;
      } else {
        offset++;
      }
      continue;
    }
    
    let writeData;
    let dataOffset;
    if (cmd === 0x00) {
      if (offset + 1 < buf.length) {
        writeData = buf[offset + 1];
        dataOffset = offset + 1;
        offset += 2;
      } else {
        offset++;
        continue;
      }
    } else {
      writeData = cmd;
      dataOffset = offset;
      offset++;
    }
    
    const addrKey = `0x${currentAddr.toString(16).padStart(2, '0')}`;
    const port = currentPort;
    const innerAddr = currentAddr & 0x7F;
    const regType = (innerAddr >> 4) & 0x0F;
    const opCh = innerAddr & 0x0F;
    
    let typeDesc = '';
    if (innerAddr < 0x30) {
      typeDesc = `SSG ch=${(innerAddr >> 3) & 0x03} reg=${innerAddr & 0x07}`;
    } else if (innerAddr >= 0x30 && innerAddr < 0x40) {
      typeDesc = `FM OP${opCh} reg=${regType}`;
    } else if (innerAddr >= 0x40 && innerAddr <= 0x5F) {
      typeDesc = `FM KEYON ch=${port * 3 + ((innerAddr >> 4) & 0x03)} op=${opCh >> 2} fNum/block`;
      if ((writeData >> 7) === 1) typeDesc += ' KEYON';
    } else if (innerAddr >= 0x60 && innerAddr <= 0x7F) {
      typeDesc = `FM OP${opCh} reg=${regType}`;
    }
    
    console.log(`0x${offset.toString(16)}: WRITE addr=${addrKey} port=${port} data=0x${writeData.toString(16)} ${typeDesc}`);
    cmdCount++;
  }
  
  console.log(`\n=== Full address distribution ===`);
  const addrCounts = {};
  currentAddr = 0;
  offset = 0;
  
  while (offset < buf.length) {
    const cmd = buf[offset];
    
    if (cmd === 0xFF) {
      if (offset + 1 < buf.length && buf[offset + 1] === 0xFD) {
        break;
      }
      offset++;
      continue;
    }
    
    if (cmd === 0x01) {
      if (offset + 1 < buf.length) {
        currentAddr = buf[offset + 1];
        offset += 2;
      } else {
        offset++;
      }
      continue;
    }
    
    if (cmd === 0x00) {
      offset += 2;
    } else {
      offset++;
    }
    
    const addrKey = `0x${currentAddr.toString(16).padStart(2, '0')}`;
    addrCounts[addrKey] = (addrCounts[addrKey] || 0) + 1;
  }
  
  Object.entries(addrCounts).sort((a, b) => b[1] - a[1]).forEach(([addr, count]) => {
    console.log(`  ${addr}: ${count} writes`);
  });
}
