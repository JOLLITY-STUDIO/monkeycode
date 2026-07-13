import fs from 'fs';
const asm = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

const targets = [
  { addr: '0099B2', name: 'Resource load' },
  { addr: '00942A', name: 'Delay/wait' },
  { addr: '00C7EC', name: 'Title setup' },
  { addr: '02CFC0', name: 'Input handler' },
  { addr: '009EC4', name: 'Map reload' },
  { addr: '010ABE', name: 'UI/Name input?' },
  { addr: '010FDE', name: 'UI render' },
  { addr: '01105C', name: 'Character init' },
  { addr: '0110A8', name: 'Character init' },
  { addr: '011E3A', name: 'Unknown' },
  { addr: '014D5E', name: 'Scenario load' },
  { addr: '011812', name: 'UI update' },
  { addr: '00A78C', name: 'Map init' },
  { addr: '00A6EA', name: 'Map init' },
  { addr: '011D7A', name: 'UI/Dialog' },
  { addr: '00C21E', name: 'Name input?' },
  { addr: '00A89C', name: 'Save/load' },
  { addr: '00A16A', name: 'Init' },
];

for (const {addr, name} of targets) {
  const idx = lines.findIndex(l => l.includes(`loc_${addr.toUpperCase()}:`) || l.includes(`loc_${addr.toLowerCase()}:`));
  if (idx < 0) {
    console.log(`\n=== ${addr} (${name}) === NOT FOUND`);
    continue;
  }
  console.log(`\n=== ${addr} (${name}) at line ${idx+1} ===`);
  const calls = [];
  for (let i = idx; i < Math.min(idx + 80, lines.length); i++) {
    const l = lines[i];
    const trim = l.trim();
    if (trim.startsWith('loc_') && trim !== lines[idx].trim() && /:$/.test(trim)) break;
    
    // Capture jsr/bsr calls
    const callMatch = trim.match(/\b(jsr|bsr)\b\s*\(?\$?([0-9A-Fa-f]+)\)?/);
    if (callMatch) {
      calls.push(`$${callMatch[2].toUpperCase().padStart(6, '0')}`);
    }
  }
  console.log('  calls:', [...new Set(calls)].slice(0, 15).join(', '));
  
  // Show first 40 lines
  for (let i = idx; i < Math.min(idx + 40, lines.length); i++) {
    const trim = lines[i].trim();
    if (trim.startsWith('loc_') && trim !== lines[idx].trim() && /:$/.test(trim)) break;
    console.log(`  L${i+1}: ${trim.substring(0, 130)}`);
  }
  console.log('---');
}
