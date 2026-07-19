import fs from 'fs';
const data = JSON.parse(fs.readFileSync('src/nes/tsubasa/data/_player_data.json', 'utf8'));
const { rosterMatches, statBlock05 } = data;
function fileOff(bank, addr) { return 16 + bank * 16384 + (addr - 0x8000); }
console.log('Total matches:', rosterMatches.length);
const m0 = rosterMatches[0];
console.log('Match 0 teamA IDs:', m0.teamA.map(id => '0x' + id.toString(16).padStart(2,'0') + '(' + id + ')').join(', '));
console.log('Match 0 teamB IDs:', m0.teamB.map(id => '0x' + id.toString(16).padStart(2,'0') + '(' + id + ')').join(', '));
console.log('Match 0 ctrlByte:', m0.controlByte2C, '0x' + m0.controlByte2C.toString(16));
console.log('Formation (teamA positions):');
for(let i=0;i<10;i++) console.log('  pos'+(i+1)+':', m0.formation[i].map(v=>'0x'+v.toString(16).padStart(2,'0')).join(' '));
console.log('StatBlock05 first 22 records (match 0 teamA+teamB):');
for(let i=0;i<22;i++) {
  const r = statBlock05.records[i];
  console.log('  rec'+i+':', r.join(' '), '  stamina=', r[4]);
}
console.log('Roster table CPU addr 0xAA47 file offset:', fileOff(1, 0xAA47));
console.log('Roster table bytes at file offset (first 32):');
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const off = fileOff(1, 0xAA47);
for(let i=0;i<32;i+=16) console.log('  '+(off+i).toString(16), Array.from(rom.subarray(off+i,off+i+16)).map(v=>v.toString(16).padStart(2,'0')).join(' '));
