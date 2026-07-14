import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const MUSIC_DIR = path.join(PROJECT_ROOT, 'game/data/music');

function analyzeMusicFile(file) {
  const content = fs.readFileSync(path.join(MUSIC_DIR, file), 'utf8');
  const match = content.match(/MUSIC_\d+_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);
  
  if (!match) {
    console.log(`${file}: No Base64 data`);
    return;
  }
  
  const buf = Buffer.from(match[1], 'base64');
  
  console.log(`\n=== ${file} (${buf.length} bytes) ===`);
  
  const keyOnAddrs = [];
  let currentAddr = 0;
  let currentPort = 0;
  let offset = 0;
  
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
        currentPort = (currentAddr >= 0x80) ? 1 : 0;
        offset += 2;
      } else {
        offset++;
      }
      continue;
    }
    
    let writeData;
    if (cmd === 0x00) {
      if (offset + 1 < buf.length) {
        writeData = buf[offset + 1];
        offset += 2;
      } else {
        offset++;
        continue;
      }
    } else {
      writeData = cmd;
      offset++;
    }
    
    const address = currentAddr & 0x7F;
    const regType = (address >> 4) & 0x0F;
    
    if ((regType === 0x04 || regType === 0x05) && (writeData >> 7) === 1) {
      keyOnAddrs.push({
        offset: offset - (cmd === 0x00 ? 2 : 1),
        addr: currentAddr,
        port: currentPort,
        address: address,
        regType: regType,
        data: writeData,
        fNumber: (writeData & 0x03) << 8,
        block: (writeData >> 2) & 0x07
      });
    }
  }
  
  console.log(`KeyOn events found: ${keyOnAddrs.length}`);
  
  if (keyOnAddrs.length > 0) {
    console.log('First 10 KeyOn events:');
    keyOnAddrs.slice(0, 10).forEach(ev => {
      console.log(`  0x${ev.offset.toString(16)}: addr=0x${ev.addr.toString(16)} port=${ev.port} regType=${ev.regType} data=0x${ev.data.toString(16)} fNum=${ev.fNumber} block=${ev.block}`);
    });
  }
  
  console.log(`\nAddress distribution (top 10):`);
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
    
    const addrKey = `0x${currentAddr.toString(16)}`;
    addrCounts[addrKey] = (addrCounts[addrKey] || 0) + 1;
  }
  
  const sortedAddrs = Object.entries(addrCounts).sort((a, b) => b[1] - a[1]);
  sortedAddrs.slice(0, 10).forEach(([addr, count]) => {
    console.log(`  ${addr}: ${count} writes`);
  });
}

const files = ['Music09Data.ts', 'Music14Data.ts', 'Music48Data.ts'];
files.forEach(f => analyzeMusicFile(f));
