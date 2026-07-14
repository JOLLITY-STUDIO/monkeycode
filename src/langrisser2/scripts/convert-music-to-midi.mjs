import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const MIDI_HEADER = Buffer.from([
  0x4D, 0x54, 0x68, 0x64,
  0x00, 0x00, 0x00, 0x06,
  0x00, 0x01,
  0x00, 0x06,
  0x00, 0x00, 0x00, 0x50,
]);

function encodeVLQ(value) {
  const result = [];
  if (value === 0) {
    result.push(0);
  } else {
    while (value > 0) {
      result.push(value & 0x7F);
      value = value >>> 7;
    }
    for (let i = 0; i < result.length - 1; i++) {
      result[i] |= 0x80;
    }
    result.reverse();
  }
  return Buffer.from(result);
}

function writeMIDIEvent(tick, status, data) {
  const vlq = encodeVLQ(tick);
  const statusByte = Buffer.from([status]);
  const dataBytes = Buffer.from(data);
  return Buffer.concat([vlq, statusByte, dataBytes]);
}

function parseYM2612ToMIDI(data) {
  const events = [];
  const channelFreq = new Array(10).fill(0);
  const channelActive = new Array(10).fill(false);
  let tick = 0;
  
  const TICKS_PER_COMMAND = 8;
  
  let offset = 0;
  
  while (offset < data.length) {
    const addrByte = data[offset];
    
    if (addrByte === 0xFF) {
      if (offset + 1 >= data.length) break;
      const subCmd = data[offset + 1];
      
      if (subCmd === 0xFD) {
        break;
      } else if (subCmd === 0xFE) {
        tick += TICKS_PER_COMMAND;
      } else if (subCmd === 0xFF) {
        tick += TICKS_PER_COMMAND * 4;
      } else {
        tick += TICKS_PER_COMMAND;
      }
      offset += 2;
      continue;
    }
    
    const port = (addrByte >> 7) & 0x01;
    const address = addrByte & 0x7F;
    
    offset++;
    
    if (offset >= data.length) break;
    
    const value = data[offset];
    offset++;
    
    if (address >= 0x40 && address <= 0x6F) {
      const chGroup = (address >> 4) & 0x07;
      let ch = -1;
      
      if (port === 0) {
        switch (chGroup) {
          case 4: ch = 0; break;
          case 5: ch = 1; break;
          case 6: ch = 2; break;
        }
      } else {
        switch (chGroup) {
          case 4: ch = 3; break;
          case 5: ch = 4; break;
          case 6: ch = 5; break;
        }
      }
      
      if (ch >= 0 && ch < 6) {
        const keyCode = value & 0x3F;
        const octave = (value >> 6) & 0x03;
        
        if ((value & 0x80) !== 0) {
          if (channelActive[ch]) {
            events.push(writeMIDIEvent(tick, 0x80 + ch, [channelFreq[ch] & 0x7F, 0]));
            tick = 0;
          }
          channelFreq[ch] = keyCode + octave * 12 + 24;
          channelActive[ch] = true;
          events.push(writeMIDIEvent(tick, 0x90 + ch, [channelFreq[ch] & 0x7F, 100]));
          tick = 0;
        } else {
          if (channelActive[ch]) {
            events.push(writeMIDIEvent(tick, 0x80 + ch, [channelFreq[ch] & 0x7F, 0]));
            tick = 0;
            channelActive[ch] = false;
          }
        }
      }
    } else if (address >= 0x00 && address <= 0x1F) {
      const ssgChannel = (address >> 3) & 0x03;
      const ssgReg = address & 0x07;
      
      if (ssgChannel >= 0 && ssgChannel < 4) {
        const midiCh = ssgChannel + 6;
        
        if (ssgReg >= 0 && ssgReg <= 3) {
          channelFreq[midiCh] = value;
        } else if (ssgReg >= 4 && ssgReg <= 7) {
          channelFreq[midiCh] = (channelFreq[midiCh] & 0x00FF) | ((value & 0x0F) << 8);
          
          const volume = value & 0x0F;
          if (volume > 0) {
            const freq = channelFreq[midiCh];
            if (freq > 0) {
              const note = Math.round(69 + 12 * Math.log2(freq / 440));
              if (note >= 0 && note <= 127) {
                if (channelActive[midiCh]) {
                  events.push(writeMIDIEvent(tick, 0x80 + midiCh, [channelFreq[midiCh] & 0x7F, 0]));
                  tick = 0;
                }
                channelActive[midiCh] = true;
                events.push(writeMIDIEvent(tick, 0x90 + midiCh, [note, volume * 8]));
                tick = 0;
              }
            }
          } else {
            if (channelActive[midiCh]) {
              events.push(writeMIDIEvent(tick, 0x80 + midiCh, [0, 0]));
              tick = 0;
              channelActive[midiCh] = false;
            }
          }
        }
      }
    }
    
    tick += TICKS_PER_COMMAND;
  }
  
  for (let ch = 0; ch < 10; ch++) {
    if (channelActive[ch]) {
      events.push(writeMIDIEvent(tick, 0x80 + ch, [channelFreq[ch] & 0x7F, 0]));
    }
  }
  
  const trackData = Buffer.concat([
    Buffer.from([0x00, 0xFF, 0x2F, 0x00]),
    ...events
  ]);
  
  const trackHeader = Buffer.alloc(8);
  trackHeader.write('MTrk', 0);
  trackHeader.writeUInt32BE(trackData.length, 4);
  
  return Buffer.concat([trackHeader, trackData]);
}

function readMusicDataFromTS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const base64Match = content.match(/MUSIC_\d+_DATA_BASE64\s*=\s*['"]([^'"]+)['"]/);
  const sizeMatch = content.match(/MUSIC_\d+_SIZE\s*=\s*(\d+)/);
  
  if (!base64Match) {
    throw new Error('Base64 data not found');
  }
  
  return {
    base64: base64Match[1],
    size: sizeMatch ? parseInt(sizeMatch[1], 10) : base64Match[1].length
  };
}

async function generateMIDIs() {
  const outputDir = path.join(ROOT, 'output/music');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const musicDir = path.join(ROOT, 'game/data/music');
  const files = fs.readdirSync(musicDir);
  
  const musicIds = files
    .filter(f => f.startsWith('Music') && f.endsWith('Data.ts'))
    .map(f => {
      const match = f.match(/Music(\d+)Data\.ts/);
      return match ? parseInt(match[1], 10) : -1;
    })
    .filter(id => id >= 0)
    .sort((a, b) => a - b);
  
  const successCount = [];
  const failCount = [];
  
  for (const id of musicIds) {
    const tsFilePath = path.join(musicDir, `Music${id.toString().padStart(2, '0')}Data.ts`);
    
    try {
      const entry = readMusicDataFromTS(tsFilePath);
      
      const binary = atob(entry.base64);
      const data = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        data[i] = binary.charCodeAt(i);
      }
      
      const track = parseYM2612ToMIDI(data);
      const midiFile = Buffer.concat([MIDI_HEADER, track]);
      
      const filePath = path.join(outputDir, `Music${id.toString().padStart(2, '0')}.mid`);
      fs.writeFileSync(filePath, midiFile);
      
      successCount.push(id);
      console.log(`Music ${id.toString().padStart(2, '0')}: ${entry.size} bytes → ${midiFile.length} bytes MIDI ✓`);
    } catch (error) {
      failCount.push(id);
      console.log(`Music ${id.toString().padStart(2, '0')}: FAILED - ${error.message}`);
    }
  }
  
  console.log(`\nGenerated ${successCount.length} MIDI files, ${failCount.length} failed`);
  
  if (failCount.length > 0) {
    console.log('Failed IDs:', failCount.join(', '));
  }
}

generateMIDIs();
