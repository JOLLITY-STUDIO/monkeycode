const fs = require('fs');
const rom = fs.readFileSync('_pynasm_tool/nesrc/tsubasa2/tsubasa2.nes');

// Bank 0: file offset 0x10, CPU $8000
// $88D2 → file offset 0x10 + 0x8D2 = 0x8E2
const bank0_offset = 0x10;
const addr_88D2 = 0x8E2;
console.log('=== bank_00::$88D2 (copied to player $0468) ===');
console.log('file offset 0x' + addr_88D2.toString(16).toUpperCase());
const data_88D2 = [];
for (let i = 0; i < 48; i++) { // 11 players * 4 bytes each = 44
    data_88D2.push(rom[addr_88D2 + i]);
}
// Print as hex dump
for (let i = 0; i < 11; i++) {
    const o = i * 4;
    console.log('slot ' + i.toString().padStart(2) + ': ' +
        data_88D2.slice(o, o + 4).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' '));
}
// Just IDs
const ids_88D2 = [];
for (let i = 0; i < 11; i++) ids_88D2.push(data_88D2[i * 4]);
console.log('IDs only:', ids_88D2.map(i => i.toString(16).padStart(2, '0').toUpperCase()).join(' '));

// Bank 1: file offset 0x2010, CPU $8000
// $ACA2 → file offset 0x2010 + 0x2CA2 = 0x4CB2
const bank1_offset = 0x2010;
const addr_ACA2 = 0x4CB2;
console.log('\n=== bank_01::$ACA2 (copied to player $0468) ===');
console.log('file offset 0x' + addr_ACA2.toString(16).toUpperCase());
const data_ACA2 = [];
for (let i = 0; i < 48; i++) {
    data_ACA2.push(rom[addr_ACA2 + i]);
}
for (let i = 0; i < 11; i++) {
    const o = i * 4;
    console.log('slot ' + i.toString().padStart(2) + ': ' +
        data_ACA2.slice(o, o + 4).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' '));
}
const ids_ACA2 = [];
for (let i = 0; i < 11; i++) ids_ACA2.push(data_ACA2[i * 4]);
console.log('IDs only:', ids_ACA2.map(i => i.toString(16).padStart(2, '0').toUpperCase()).join(' '));

// Bank 2: file offset 0x4010, CPU $8000
// $8A47 → file offset 0x4010 + 0x0A47 = 0x4A57
const bank2_offset = 0x4010;
const addr_8A47 = 0x4A57;
console.log('\n=== bank_02::$8A47 (copied to opponent $0300) ===');
console.log('file offset 0x' + addr_8A47.toString(16).toUpperCase());
const data_8A47 = [];
for (let i = 0; i < 48; i++) {
    data_8A47.push(rom[addr_8A47 + i]);
}
for (let i = 0; i < 11; i++) {
    const o = i * 4;
    console.log('slot ' + i.toString().padStart(2) + ': ' +
        data_8A47.slice(o, o + 4).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' '));
}
const ids_8A47 = [];
for (let i = 0; i < 11; i++) ids_8A47.push(data_8A47[i * 4]);
console.log('IDs only:', ids_8A47.map(i => i.toString(16).padStart(2, '0').toUpperCase()).join(' '));

// Also dump the full 256 bytes from $88D2
console.log('\n=== Full dump $88D2 (bank_00, player team raw) ===');
for (let i = 0; i < 256; i++) {
    const b = rom[addr_88D2 + i];
    if (i % 16 === 0) process.stdout.write('\n' + (addr_88D2 + i).toString(16).toUpperCase().padStart(4, '0') + ': ');
    process.stdout.write(b.toString(16).padStart(2, '0').toUpperCase() + ' ');
}

// Compare
console.log('\n\n=== COMPARISON ===');
console.log('$88D2 (bank_00 player src):', ids_88D2.map(i => i.toString(16).padStart(2, '0').toUpperCase()).join(' '));
console.log('$ACA2 (bank_01 player src):', ids_ACA2.map(i => i.toString(16).padStart(2, '0').toUpperCase()).join(' '));
console.log('$8A47 (bank_02 opponent src):', ids_8A47.map(i => i.toString(16).padStart(2, '0').toUpperCase()).join(' '));
