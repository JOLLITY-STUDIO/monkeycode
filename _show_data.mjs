import { readFileSync } from 'fs';

const d = JSON.parse(readFileSync('src/nes/tsubasa/data/_data_blocks.json', 'utf-8'));

// Show key data blocks per bank
for (let bank = 0; bank <= 0x0f; bank++) {
  const blocks = d.filter(x => x.bank === bank);
  if (blocks.length === 0) continue;
  console.log(`\n--- Bank $${bank.toString(16)} (${blocks.length} blocks) ---`);
  for (const b of blocks) {
    const addrHex = b.addr.toString(16).padStart(4, '0');
    const hex = b.hex.slice(0, 64);
    const ctx = (b.context || '').slice(0, 70);
    console.log(`  $${addrHex} [${b.count}B] ${hex}`);
    if (ctx) console.log(`    ↳ ${ctx}`);
  }
}
