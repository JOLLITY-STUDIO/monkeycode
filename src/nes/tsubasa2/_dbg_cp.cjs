const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '.codebuddy', 'agents');
for (const f of fs.readdirSync(dir).slice(0, 3)) {
  const full = path.join(dir, f);
  if (!fs.statSync(full).isFile()) continue;
  const buf = fs.readFileSync(full);
  console.log('=== file:', JSON.stringify(f), 'bytes:', buf.length);
  // 前 80 字节的十六进制
  console.log('hex head:', buf.slice(0, 80).toString('hex'));
}
