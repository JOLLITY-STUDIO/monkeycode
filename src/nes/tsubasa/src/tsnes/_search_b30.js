const fs = require('fs');
const c = fs.readFileSync('game-engine/native-game/tsubasa/banks/prg/bank-30-code.ts', 'utf-8');

const checks = [
  { name: 'coroutineCreate_$CB0F', search: 'coroutineCreate' },
  { name: 'irqHandler_$CB02', search: 'irqHandler' },
  { name: 'fn_$EE9F', search: '_$EE9F' },
  { name: 'fn_$E3CA', search: '_$E3CA' },
  { name: 'fn_$DCDF_randomGen', search: 'randomGen' },
  { name: 'fn_$CBB0_audioTrigger', search: 'audioTrigger' },
  { name: 'getCharData_$CD7C', search: 'getCharData' },
  { name: 'fn_$CB02', search: '_$CB02' },
  { name: 'fn_$CA4D', search: '_$CA4D' },
  { name: 'fn_$DE45', search: '_$DE45' },
  { name: 'fn_$CA5B', search: '_$CA5B' },
  { name: 'fn_$DCF0', search: '_$DCF0' },
  { name: 'fn_$DF5A', search: '_$DF5A' },
  { name: 'fn_$CB0F', search: '_$CB0F' },
  { name: 'fn_$CB0D', search: '_$CB0D' },
];

for (const chk of checks) {
  const count = (c.match(new RegExp(chk.search.replace(/\$/g, '\\$'), 'g')) || []).length;
  if (count > 0) console.log(chk.name + ': ' + count + ' ref(s)');
  else console.log(chk.name + ': NOT FOUND');
}
