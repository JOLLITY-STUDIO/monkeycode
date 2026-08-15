// 从 .nes 提取 Bank 01 关键缺失字节
const fs = require('fs');
const buf = fs.readFileSync(__dirname + '/_tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan)- spuer-df.nes');
const base = 0x10 + 0x2010; // CPU $A000 对应文件偏移

function hex(v){ return '0x'+v.toString(16).padStart(2,'0').toUpperCase(); }
function dump(name, cpuAddr, len, step) {
  const off = base + (cpuAddr - 0xA000);
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(buf[off + i]);
  let out = `// ${name} CPU $${cpuAddr.toString(16).toUpperCase()} (${len}B): `;
  const lines = [];
  for (let i = 0; i < arr.length; i += step) lines.push(arr.slice(i, i + step).map(hex).join(' '));
  console.log(out + '\n  ' + lines.join('\n  '));
}

dump('$B1A4-$B1D2 脚本handler/解释器', 0xB1A4, 0xB1D3 - 0xB1A4, 16);
dump('$B296-$B305 SCRIPT_ENTRY1', 0xB296, 0x6F, 16);
dump('$B0D0-$B0F0 解释器尾部+跳转表', 0xB0D0, 0x20, 8);
dump('$B305-$B371 SCRIPT_ENTRY2', 0xB305, 0x6C, 16);
