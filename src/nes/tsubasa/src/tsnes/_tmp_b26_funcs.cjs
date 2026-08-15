// 提取 bank_26 各入口函数体 (按跳转表 + JSR/JMP 目标)
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_26.asm', 'utf8').split('\n');

const parsed = [];
for (const l of lines) {
  const m = l.match(/0x([0-9A-F]{6})\s+([0-9A-F]{2}):([0-9A-F]{4}):\s+((?:[0-9A-F]{2} ){1,3})(.*?)\s*$/);
  if (!m) continue;
  parsed.push({ cpu: parseInt(m[3], 16), text: m[5].trim(), raw: l });
}
parsed.sort((a, b) => a.cpu - b.cpu);

// 入口 (来自 $8000 跳转表 + 主循环)
const entries = [
  0x803C, // 主循环
  0x8127, 0x8132, 0x8148, 0x8170, 0x8176, 0x81BC, 0x81DE, 0x81ED,
  0x8223, 0x8298, 0x82FC, 0x8349, 0x83A2, 0x83F5, 0x847F, 0x8485, 0x848F,
  0x84F8, 0x852F, 0x85AC, 0x85BC, 0x85E3, 0x85F6,
  0x8687, 0x86BD, 0x86D3, 0x86F6,
  0x87E1, 0x8835, 0x888D, 0x88A8, 0x88F3,
  0x892A, 0x8978, 0x89D0, 0x8A4F, 0x8A6F, 0x8AB0,
  0x8B3A, 0x8B4A, 0x8B73, 0x8B9C, 0x8BBA, 0x8BC8, 0x8BD4, 0x8BDF, 0x8BE5,
  0x8C10, 0x8C42, 0x8C6D, 0x8C92, 0x8CA4, 0x8CEA, 0x8CF5, 0x8D06, 0x8D4C, 0x8D60,
  0x8E33, 0x8E6E, 0x8E86, 0x8EE9, 0x8F1F, 0x8F59, 0x8F72, 0x8FF3, 0x8FFB,
  0x904E, 0x9070, 0x9085, 0x9095, 0x90D5, 0x90DD, 0x9110, 0x911C,
];

// 按跳转表 dump 每个入口的前 N 行
for (const e of entries) {
  const idx = parsed.findIndex(p => p.cpu === e);
  if (idx < 0) { console.log(`\n== $${e.toString(16).toUpperCase()}: NOT FOUND`); continue; }
  const next = entries.filter(x => x > e).sort((a, b) => a - b)[0];
  const endIdx = next ? parsed.findIndex(p => p.cpu === next) : -1;
  const limit = endIdx === -1 ? idx + 60 : Math.min(endIdx, idx + 60);
  const body = parsed.slice(idx, limit);
  console.log(`\n--- ENTRY $${e.toString(16).toUpperCase()} (${body.length} lines) ---`);
  for (const p of body) console.log(`$${p.cpu.toString(16).toUpperCase()}: ${p.text}`);
}
