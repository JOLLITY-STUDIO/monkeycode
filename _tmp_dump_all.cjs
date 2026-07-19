const fs = require('fs');
const rom = fs.readFileSync('_pynasm_tool/nesrc/tsubasa2/tsubasa2.nes');

// bank_00: $89CE = file offset 0x10 + 0x1D2 + 0xFC = 0x10 + 0x2CE = wait
// $88D2 file offset = 0x10 + 0x8D2 = 0x8E2
// Y starts at $FC, so first read: $88D2 + $FC = $89CE
// $89CE file offset = 0x10 + 0x9CE = 0x9DE
const base00 = 0x9DE;
console.log('=== bank_00 @ $89CE (LDA $88D2,Y with Y=$FC) ===');
const bytes00 = [];
for (let i = 0; i < 16; i++) bytes00.push(rom[base00 + i]);
console.log(bytes00.join(' '));
console.log('4 bytes: ' + bytes00.slice(0,4).join(' '));

// bank_01: $ACA2 + $FC = $AD9E
// $ACA2 file offset = 0x2010 + 0x2CA2 = 0x4CB2
// $AD9E file offset = 0x2010 + 0x2D9E = 0x4DAE
const base01 = 0x4DAE;
console.log('\n=== bank_01 @ $AD9E (LDA $ACA2,Y with Y=$FC) ===');
const bytes01 = [];
for (let i = 0; i < 16; i++) bytes01.push(rom[base01 + i]);
console.log(bytes01.join(' '));
console.log('4 bytes: ' + bytes01.slice(0,4).join(' '));

// Bank 02: opponent table at $8A47 (already verified)
// Group 0: 02 03 04 05 06 07 08 09 0A 01 0B + ctrl 00
const b2off = 0x4010 + 0x0A47;
console.log('\n=== bank_02 $8A47 Group 0 (OPPONENT for S0-S5,S12-S15) ===');
const opponentG0 = [];
for (let i = 0; i < 12; i++) opponentG0.push(rom[b2off + i]);
console.log('IDs: ' + opponentG0.slice(0,11).join(' ') + '  ctrl: ' + opponentG0[11]);

// Also Group 1 and Group 2
console.log('\nGroup 1 (S6-S11):');
const g1 = [];
for (let i = 12; i < 24; i++) g1.push(rom[b2off + i]);
console.log('IDs: ' + g1.slice(0,11).join(' ') + '  ctrl: ' + g1[11]);

console.log('\nGroup 2 (S16-S21):');
const g2 = [];
for (let i = 24; i < 36; i++) g2.push(rom[b2off + i]);
console.log('IDs: ' + g2.slice(0,11).join(' ') + '  ctrl: ' + g2[11]);

// Bench for Group 2
console.log('\nGroup 2 Bench (S16-S21):');
const bench = [];
for (let i = 35; i < 45; i++) bench.push(rom[b2off + i]);
console.log('IDs: ' + bench.join(' '));

// ACE table at $AA75
console.log('\n=== ACE table @ $AA75 ===');
const aceOff = 0x4010 + 0x2A75;
const aces = [];
for (let i = 0; i < 22; i++) aces.push(rom[aceOff + i]);
console.log('S0-S21: ' + aces.map(b => b.toString(16).padStart(2,'0')).join(' '));
