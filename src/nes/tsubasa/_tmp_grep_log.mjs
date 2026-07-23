import fs from 'fs';
const d = fs.readFileSync('test_output/opening_disasm_cpu.json', 'utf8');
const arr = JSON.parse(d);
for (let i = 0; i < 5; i++) {
  const f = arr[i];
  console.log(`F${i}: z26=$${f.z26.toString(16).padStart(2,'0')} z27=$${f.z27.toString(16).padStart(2,'0')} z4A=$${f.z4A.toString(16).padStart(2,'0')} z4B=$${f.z4B.toString(16).padStart(2,'0')} z4C=$${f.z4C.toString(16).padStart(2,'0')}`);
}
