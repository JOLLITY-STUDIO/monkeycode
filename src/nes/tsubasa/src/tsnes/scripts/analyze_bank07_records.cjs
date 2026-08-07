const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, '../rom-data/prg-bank-07.ts'), 'utf8');
// Extract hex numbers like 0xD4, 0xA0
const nums = [];
const re = /0x([0-9A-Fa-f]{2})/g;
let m;
while ((m = re.exec(text))) {
  nums.push(parseInt(m[1], 16));
}
const data = nums;

function toHex(b) { return b.toString(16).toUpperCase().padStart(2,'0'); }

// Split by 00 A0
const records = [];
let start = 0;
for (let i = 0; i < data.length - 1; i++) {
  if (data[i] === 0x00 && data[i+1] === 0xA0) {
    const chunk = data.slice(start, i);
    if (chunk.length > 0) records.push(chunk);
    start = i + 2;
    if (start < data.length && data[start] === 0xFF) break;
  }
}

console.log(`Total records (split by 00 A0): ${records.length}`);
console.log(`First record length (pointer table): ${records[0]?.length}`);

for (let i = 1; i < Math.min(records.length, 40); i++) {
  const rec = records[i];
  const h0 = rec[0], h1 = rec[1];
  const b2 = rec[2], b3 = rec[3], b4 = rec[4], b5 = rec[5];
  const payloadLen = rec.length - 6;
  // Try interpret b4 as width, b5 as height
  const w = b4;
  const h = b5;
  const fits = w > 0 && h > 0 && w * h <= payloadLen && payloadLen - w * h < Math.max(w, h);
  // Try payload / w integer
  const hFromPayload = payloadLen % w === 0 ? payloadLen / w : -1;
  console.log(
    `#${i} off=${start.toString(16).toUpperCase()} len=${rec.length} ` +
    `header=${toHex(h0)} ${toHex(h1)} b2=${toHex(b2)} b3=${toHex(b3)} b4=${toHex(b4)}(${b4}) b5=${toHex(b5)}(${b5}) ` +
    `payload=${payloadLen} ` +
    `wh=${w}×${h} fits=${fits} hFromPayload=${hFromPayload}`
  );
}
