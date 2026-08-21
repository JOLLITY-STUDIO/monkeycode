const fs = require('fs');
const data = JSON.parse(fs.readFileSync('_tmp_bank_full_bytes.json', 'utf8'));
const banks = ['bank03', 'bank04', 'bank05', 'bank06'];
for (const b of banks) {
  const arr = data[b];
  // number of scripts per bank from script-id-table
  const count = b === 'bank03' ? 0x10 : b === 'bank04' ? 0x10 : b === 'bank05' ? 0x40 : 0x06;
  console.log(`=== ${b} (${count} scripts) ===`);
  for (let i = 0; i < count; i++) {
    const lo = arr[i * 2];
    const hi = arr[i * 2 + 1];
    const ptr = (hi << 8) | lo;
    console.log(`  id ${i.toString(16).padStart(2,'0').toUpperCase()}: offset=${(i*2).toString(16).padStart(2,'0')} ptr=$${ptr.toString(16).toUpperCase()}`);
  }
}
