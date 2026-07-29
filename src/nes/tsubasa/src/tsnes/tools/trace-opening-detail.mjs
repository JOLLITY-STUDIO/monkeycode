import { readFileSync } from 'fs';

const d = readFileSync(
  'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log',
  'utf8'
);
const lines = d.split('\n');

// 1. 找出 bank-00 / bank-12 / bank-01 中所有被执行/读取的唯一地址
const bank00Addrs = new Set();
const bank12Addrs = new Set();
const bank01Addrs = new Set();
const bank02Addrs = new Set();
const bank03Addrs = new Set();
const bank0AAddrs = new Set();

lines.forEach((l) => {
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  if (!m) return;
  const bank = parseInt(m[1], 16);
  const addr = parseInt(m[2], 16);
  if (bank === 0 && addr >= 0x8000 && addr < 0xA000) bank00Addrs.add(addr);
  if (bank === 6 && addr >= 0x8000 && addr < 0xA000) bank12Addrs.add(addr);
  if (bank === 1 && addr >= 0xA000) bank01Addrs.add(addr);
  if (bank === 2 && addr >= 0xA000) bank02Addrs.add(addr);
  if (bank === 3 && addr >= 0xA000) bank03Addrs.add(addr);
  if (bank === 0x0a && addr >= 0xA000) bank0AAddrs.add(addr);
});

console.log('=== BANK-00 CODE executed ($8000-$9FFF) ===');
console.log('Count:', bank00Addrs.size);
[...bank00Addrs].sort((a, b) => a - b).forEach(a => console.log('  $' + a.toString(16).toUpperCase().padStart(4, '0')));

console.log('\n=== BANK-12 (phys=$06) CODE executed ($8000-$9FFF) ===');
console.log('Count:', bank12Addrs.size);
[...bank12Addrs].sort((a, b) => a - b).forEach(a => console.log('  $' + a.toString(16).toUpperCase().padStart(4, '0')));

console.log('\n=== BANK-01 DATA reads ($A000+) ===');
console.log('Count:', bank01Addrs.size);
[...bank01Addrs].sort((a, b) => a - b).forEach(a => console.log('  $' + a.toString(16).toUpperCase().padStart(4, '0')));

console.log('\n=== BANK-02 DATA reads ($A000+) ===');
console.log('Count:', bank02Addrs.size);
[...bank02Addrs].sort((a, b) => a - b).forEach(a => console.log('  $' + a.toString(16).toUpperCase().padStart(4, '0')));

console.log('\n=== BANK-03 DATA reads ($A000+) ===');
console.log('Count:', bank03Addrs.size);
[...bank03Addrs].sort((a, b) => a - b).forEach(a => console.log('  $' + a.toString(16).toUpperCase().padStart(4, '0')));

console.log('\n=== BANK-0A DATA reads ($A000+) ===');
console.log('Count:', bank0AAddrs.size);
[...bank0AAddrs].sort((a, b) => a - b).forEach(a => console.log('  $' + a.toString(16).toUpperCase().padStart(4, '0')));
