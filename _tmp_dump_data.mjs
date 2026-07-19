import fs from 'fs';
const d = JSON.parse(fs.readFileSync('src/nes/tsubasa/data/_player_data.json', 'utf8'));
console.log('Pointer table first 20:');
for (let i = 0; i < 20; i++) {
  const p = d.pointerTable[i];
  console.log(i, '0x' + p.addr.toString(16), p.lo, p.hi);
}
console.log('\nAttrBlocks:');
for (const b of d.attrBlocks_Bank0C) {
  console.log('ptrIdx', b.ptrIndex, 'addr', '0x' + b.addr.toString(16), 'header', b.header.map(v => v.toString(16).padStart(2, '0')).join(' '), 'body(' + b.body.length + ')', b.body.slice(0, 20).map(v => v.toString(16).padStart(2, '0')).join(' '));
}
console.log('\nClassType table first 32:', d.classTypeTable.slice(0, 32).join(' '));
console.log('\nStatBlock05 all stamina values:');
for (let i = 0; i < d.statBlock05.records.length; i++) {
  console.log(i, d.statBlock05.records[i].map(v => v.toString().padStart(3)).join(' '), 'stamina=' + d.statBlock05.records[i][4]);
}
console.log('\nSkillBlock09_1620 first 20:');
for (let i = 0; i < Math.min(20, d.skillBlock09_1620.records.length); i++) {
  console.log(i, d.skillBlock09_1620.records[i].map(v => v.toString(16).padStart(2, '0')).join(' '));
}
console.log('\nActionTable09_1720 first 20:');
for (let i = 0; i < Math.min(20, d.actionTable09_1720.records.length); i++) {
  console.log(i, d.actionTable09_1720.records[i].map(v => v.toString(16).padStart(2, '0')).join(' '));
}
