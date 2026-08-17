// 从 Bank 12 $8BDA 提取 SE 通道数据
import bank12 from '../rom-data/prg-bank-12';

const BASE = 0xBDA; // $8BDA offset in bank

interface SeChannelData {
  channel: number;
  nesAddr: number;
  subSections: Array<{ tag: number; ptr: number }>;
  trackData: number[];
}

const channels: SeChannelData[] = [];

for (let ch = 0; ch < 8; ch++) {
  const tableOff = BASE + ch * 2;
  const dataLo = bank12[tableOff];
  const dataHi = bank12[tableOff + 1];
  const dataPtr = (dataHi << 8) | dataLo;
  const dataOff = dataPtr - 0x8000;

  const channel: SeChannelData = {
    channel: ch,
    nesAddr: dataPtr,
    subSections: [],
    trackData: [],
  };

  let pos = dataOff;
  // Parse sub-section pointers: tag, lo, hi, ..., FF
  while (pos < bank12.length) {
    const tag = bank12[pos];
    if (tag === 0xFF) break;
    if (tag >= 0x10) { pos++; continue; } // already in track data
    const ptrLo = bank12[pos + 1];
    const ptrHi = bank12[pos + 2];
    const ptr = (ptrHi << 8) | ptrLo;
    channel.subSections.push({ tag, ptr });
    pos += 3;
  }

  if (bank12[pos] === 0xFF) {
    pos++; // skip terminator
    // Read track data until 0xFF terminator (end of this channel's data block)
    while (pos < bank12.length) {
      const b = bank12[pos];
      channel.trackData.push(b);
      pos++;
      // Stop when we encounter the next channel's header pointer
      // (detected by: FF followed by valid NES addr pattern that matches next ch pointer)
      // Simple approach: stop at FF, or at next channel's start pointer
      // Since channels are sequential in ROM, stop when next ch's header starts
      let nextChStart = -1;
      for (let nc = ch + 1; nc < 8; nc++) {
        const ncOff = BASE + nc * 2;
        const ncLo = bank12[ncOff];
        const ncHi = bank12[ncOff + 1];
        const ncPtr = (ncHi << 8) | ncLo;
        const ncDataOff = ncPtr - 0x8000;
        if (ncDataOff > dataOff) {
          nextChStart = ncDataOff;
          break;
        }
      }
      if (nextChStart > 0 && pos >= nextChStart) {
        // back up to remove stray bytes
        while (channel.trackData.length > 0 && channel.trackData[channel.trackData.length - 1] !== 0xFF) {
          channel.trackData.pop();
        }
        if (channel.trackData.length > 0) channel.trackData.pop(); // remove trailing FF
        break;
      }
    }
  }

  channels.push(channel);
}

// Print summary
console.log('=== SE Channel Data Summary ===\n');
for (const ch of channels) {
  const size = ch.trackData.length;
  const subCount = ch.subSections.length;
  console.log(`Channel ${ch.channel}: $${ch.nesAddr.toString(16)} — ${subCount} sub-sections, ${size} bytes track data`);
  if (subCount > 0) {
    const subs = ch.subSections.map(s => `  0x${s.tag.toString(16)} → $${s.ptr.toString(16)}`).join('\n');
    console.log(subs);
  }
  // Show first 16 track bytes
  const preview = ch.trackData.slice(0, 16).map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ');
  console.log(`  Track: [${preview}${ch.trackData.length > 16 ? ', ...' : ''}]`);
  console.log('');
}

// Output as TS module
console.log('=== Generated TS Data ===\n');
console.log('// SE Data extracted from Bank 12 ($8BDA)');
console.log('// Channel mapping: 0-3=BGM, 4=SQ1, 5=SQ2, 6=TRI, 7=NOISE');
console.log('// SE primarily uses channels 5 (SQ2) and 7 (NOISE)');
console.log('');
for (const ch of channels) {
  if (ch.trackData.length === 0) continue;
  console.log(`export const SE_CH${ch.channel}_TRACK: readonly number[] = [`);
  const data = ch.trackData;
  for (let i = 0; i < data.length; i += 16) {
    const line = data.slice(i, i + 16).map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ');
    console.log(`  ${line}${i + 16 < data.length ? ',' : ''}`);
  }
  console.log(`];\n`);
}

// Also output the sub-section pointer data
console.log('export const SE_SUB_SECTIONS: Record<number, Array<{tag:number, ptr:number}>> = {');
for (const ch of channels) {
  if (ch.subSections.length === 0) continue;
  console.log(`  ${ch.channel}: [`);
  for (const s of ch.subSections) {
    console.log(`    { tag: 0x${s.tag.toString(16)}, ptr: 0x${s.ptr.toString(16)} },`);
  }
  console.log(`  ],`);
}
console.log('};\n');
