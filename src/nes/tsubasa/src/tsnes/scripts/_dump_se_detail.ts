// 详细分析 Bank 12 中每个 SE 通道的数据
import bank12 from '../rom-data/prg-bank-12';

console.log('=== SE 通道数据详解 ===\n');

const BASE = 0xBDA;

for (let ch = 0; ch < 8; ch++) {
  const tableOff = BASE + ch * 2;
  const dataLo = bank12[tableOff];
  const dataHi = bank12[tableOff + 1];
  const dataPtr = (dataHi << 8) | dataLo;
  const dataOff = dataPtr - 0x8000;

  console.log(`--- Channel ${ch}: header @ $${dataPtr.toString(16)} (offset 0x${dataOff.toString(16)}) ---`);
  
  // 解析子段落指针: NN, lo, hi, NN, lo, hi, ..., FF, <track data>
  let pos = dataOff;
  console.log(`  Sub-sections:`);
  while (pos < bank12.length) {
    const tag = bank12[pos];
    if (tag === 0xFF) break;
    if (tag >= 0x10) { pos++; continue; } // 已经是 track 数据了
    
    const ptrLo = bank12[pos + 1];
    const ptrHi = bank12[pos + 2];
    const ptr = (ptrHi << 8) | ptrLo;
    const rel = ptr - 0x8000;
    console.log(`    0x${tag.toString(16).padStart(2,'0')} → $${ptr.toString(16)} = [${rel < bank12.length ? bank12.slice(rel, Math.min(rel+8, bank12.length)).map(b=>'0x'+b.toString(16).padStart(2,'0')).join(', ') : '???'}]`);
    pos += 3;
  }
  
  if (bank12[pos] === 0xFF) {
    pos++; // skip terminator
    // 显示接下来的 track data（音乐命令序列）
    const track = bank12.slice(pos, Math.min(pos + 80, bank12.length));
    console.log(`  Track data (前80B): [${track.map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ')}]`);
    
    // 尝试解析为可读的命令
    let cmdPos = 0;
    const readable: string[] = [];
    while (cmdPos < track.length && readable.length < 30) {
      const cmd = track[cmdPos];
      if (cmd === 0xE0) { readable.push(`E0 n=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0xE1) { readable.push(`E1 n=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0xE2) { readable.push(`E2 i=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0xE3) { readable.push(`E3 d=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0xE5) { readable.push(`E5 v=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0xE8) { readable.push(`E8 jmp=$[${track[cmdPos+1].toString(16)},${track[cmdPos+2].toString(16)}]`); cmdPos += 3; }
      else if (cmd === 0xE9) { readable.push(`E9 call=$[${track[cmdPos+1].toString(16)},${track[cmdPos+2].toString(16)}]`); cmdPos += 3; }
      else if (cmd === 0xEB) { readable.push(`EB loop_start=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0xEC) { readable.push(`EC loop_end`); cmdPos += 1; }
      else if (cmd === 0xED) { readable.push(`ED vib=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0xF9) { readable.push(`F9 RST`); cmdPos += 1; }
      else if (cmd === 0xFA) { readable.push(`FA RST${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0x81) { readable.push(`81 HOLD`); cmdPos += 1; }
      else if (cmd === 0x87) { readable.push(`87 param=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd === 0x8C) { readable.push(`8C param=${track[cmdPos+1].toString(16)}`); cmdPos += 2; }
      else if (cmd >= 0x80 && cmd <= 0x9F) { readable.push(`${cmd.toString(16)} ctrl`); cmdPos += 1; }
      else if (cmd === 0xFF) { readable.push('FF END'); break; }
      else { readable.push(`??0x${cmd.toString(16)}`); cmdPos += 1; }
    }
    if (readable.length > 0) {
      console.log(`  Cmd: ${readable.join(' | ')}`);
    }
  }
  console.log('');
}
