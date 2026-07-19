import fs from 'fs';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
function search(seq) {
  const out = [];
  for (let i = 0; i < rom.length - seq.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (rom[i + j] !== seq[j]) { ok = false; break; }
    if (ok) out.push(i);
  }
  return out;
}
const stam = [408, 748, 416, 400, 400, 400, 400, 400, 400, 400, 400];
console.log('LE16 of stamina list:', search(stam.flatMap(v => [v & 0xff, v >> 8])).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('BCD pairs of 408,748,416,400:', search([0x04, 0x08, 0x07, 0x48, 0x04, 0x16, 0x04, 0x00]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('BCD 2-byte (408 as 0x04 0x08 0x07 0x48 0x04 0x16 0x04 0x00)', search([4, 8, 7, 48, 4, 16, 4, 0]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('408 LE16 then 748 LE16:', search([0x98, 0x01, 0xEC, 0x02]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('408 BE16 then 748 BE16:', search([0x01, 0x98, 0x02, 0xEC]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('200,160,90,40 LE16:', search([200 & 0xff, 200 >> 8, 160 & 0xff, 160 >> 8, 90 & 0xff, 90 >> 8, 40 & 0xff, 40 >> 8]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('200,160,90,40 BE16:', search([200 >> 8, 200 & 0xff, 160 >> 8, 160 & 0xff, 90 >> 8, 90 & 0xff, 40 >> 8, 40 & 0xff]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('200,160,90,40 BCD bytes:', search([2, 0, 0, 1, 6, 0, 9, 0, 4, 0]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
