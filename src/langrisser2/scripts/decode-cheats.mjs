// Dump ROM data and find callers for all cheat tables
import { readFileSync } from 'fs';
const base = './src/langrisser2/20260713';
const rom = readFileSync(`${base}/Langrisser II (Japan).md`);
const asm = readFileSync(`${base}/asm/m68k/rom.asm`, 'utf8');

const tables = [
  { name: 'Toggle 8174', addr: 0x861C },
  { name: 'Toggle 8176', addr: 0x8630 },
  { name: 'Hidden Shop 1', addr: 0x8636 },
  { name: 'True Hidden Shop', addr: 0x864C },
  { name: 'Scenario Select', addr: 0x2A1A8 },
  { name: 'Debug Mode', addr: 0xD7B8 },
];

// Function to decode table format: [word count] [bytes...] [byte post-condition]
function decodeTable(addr) {
  const count = (rom[addr] << 8) | rom[addr + 1];
  const bytes = [];
  for (let i = 0; i < count; i++) {
    bytes.push(rom[addr + 2 + i]);
  }
  const post = rom[addr + 2 + count];
  // Try to interpret as button sequence
  const btns = {
    0x01: '↑', 0x02: '↓', 0x04: '←', 0x08: '→',
    0x10: 'B', 0x20: 'C', 0x40: 'A', 0x80: 'START',
  };
  const seq = bytes.map(b => btns[b] || `?(${b.toString(16)})`).join(' ');
  let extra = '';
  if (post !== 0 && btns[post]) extra = ` + 按住${btns[post]}`;
  else if (post !== 0) extra = ` + mask 0x${post.toString(16)}`;

  return {
    addr, count, bytes, post,
    sequence: seq,
    extra,
  };
}

for (const t of tables) {
  const d = decodeTable(t.addr);
  console.log(`### ${t.name} @ ROM 0x${t.addr.toString(16).toUpperCase()}`);
  console.log(`  格式: [count=0x${d.count.toString(16)}(${d.count})] [${d.count} bytes] [post=0x${d.post.toString(16)}]`);
  console.log(`  按键序列: ${d.sequence}`);
  if (d.extra) console.log(`  条件: ${d.extra}`);
  console.log('');
}

// Find all lea+jsr 008A20 patterns (callers of sequence matcher)
const lines = asm.split('\n');
const callers = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('jsr') && lines[i].includes('008A20')) {
    // Look back for lea
    for (let j = i - 3; j <= i - 1; j++) {
      if (j >= 0 && lines[j].includes('lea') && !lines[j].includes('a0')) continue;
      if (j >= 0 && lines[j].includes('lea') && lines[j].includes('a0')) {
        const leaMatch = lines[j].match(/\(\$([0-9A-Fa-f]+)\)/);
        if (leaMatch) {
          callers.push({
            romTable: parseInt(leaMatch[1], 16),
            leaLine: j + 1,
            jsrLine: i + 1,
            lea: lines[j].trim(),
          });
        }
      }
    }
  }
}

console.log('### All callers of sequence matcher (loc_008A20):');
for (const c of callers) {
  // Find the context: what happens on success
  let ctx = '';
  for (let k = c.jsrLine; k < Math.min(lines.length, c.jsrLine + 15); k++) {
    ctx += `  L${k+1}: ${lines[k].substring(0, 150)}\n`;
  }
  console.log(`\nTable ROM 0x${c.romTable.toString(16).toUpperCase()}:`);
  console.log(`  LEA: ${c.lea}`);
  console.log(`  JSR: L${c.jsrLine}`);
  console.log(`  Context (success path):`);
  console.log(ctx);
}

// Also find the function that uses Scenario Select at $02A1A8
console.log('\n### Context around Scenario Select & Debug Mode callers:');

// Search for any jsr 008A20 near ROM $00D7B8 area
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('02A1A8') || (lines[i].includes('lea') && lines[i].includes('$02A1'))) {
    for (let j = Math.max(0, i - 10); j < Math.min(lines.length, i + 20); j++) {
      console.log(`L${j+1}: ${lines[j].substring(0, 150)}`);
    }
    console.log('---');
    break;
  }
}

// Search for Debug Mode caller context
console.log('\n### Debug Mode caller context:');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('00D79E') || (lines[i].includes('lea') && lines[i].includes('00D7'))) {
    for (let j = Math.max(0, i - 10); j < Math.min(lines.length, i + 25); j++) {
      console.log(`L${j+1}: ${lines[j].substring(0, 150)}`);
    }
    console.log('---');
    break;
  }
}

// Look for the $FFFF8174 flag toggler context (what it actually does)
console.log('\n### $FFFF8174 toggler caller context:');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('eori.w') && lines[i].includes('8174')) {
    for (let j = Math.max(0, i - 5); j < Math.min(lines.length, i + 15); j++) {
      console.log(`L${j+1}: ${lines[j].substring(0, 150)}`);
    }
    console.log('---');
    break;
  }
}

// Search for $FFFFA6DC and $FFFFA6DA usages (shop type selection)
console.log('\n### $A6DC / $A6DA usages:');
let count = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('A6DC') || lines[i].includes('A6DA')) {
    console.log(`L${i+1}: ${lines[i].substring(0, 150)}`);
    count++;
    if (count >= 40) break;
  }
}

// Look for the table address used by Scenario Select in the LOAD screen
// The lea at $029xxx presumably points to $02A1A8
console.log('\n### LOAD screen handler area ($029000-$02A200) - looking for jsr $008A20:');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('jsr') && lines[i].includes('008A20')) {
    const lineNum = parseInt(lines[i-1] || '');
    // Check if near $029xxx-$02Axxx range
    // Use the actual line
    for (let j = Math.max(0, i - 10); j < Math.min(lines.length, i + 15); j++) {
      const addrMatch = lines[j].match(/;\s*\$([0-9A-Fa-f]+)/);
      if (addrMatch) {
        const addr = parseInt(addrMatch[1], 16);
        if (addr >= 0x29000 && addr <= 0x2A200) {
          // Found a match in LOAD area
          for (let k = Math.max(0, j - 10); k < Math.min(lines.length, j + 15); k++) {
            console.log(`L${k+1}: ${lines[k].substring(0, 150)}`);
          }
          console.log('=== FOUND LOAD SCREEN CHEAT CHECKER ===\n');
        }
      }
    }
  }
}
