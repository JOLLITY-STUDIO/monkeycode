// 提取球队阵容数据: 我方三组阵容(bank02 $AA47) + 场地类型($AA75) + CPU各队(bank29 $BB1A-$BCEE)
// 生成 src/data/team/roster.ts 代码片段
const fs = require('fs');
const path = require('path');

function loadBank(n) {
  const src = path.join(__dirname, 'rom-data', `prg-bank-${String(n).padStart(2, '0')}.ts`);
  const text = fs.readFileSync(src, 'utf8');
  const bytes = [];
  const re = /0x([0-9A-Fa-f]{2})/g;
  let m;
  while ((m = re.exec(text)) !== null) bytes.push(parseInt(m[1], 16));
  return bytes;
}
const banks = {};
for (let i = 0; i < 32; i++) banks[i] = loadBank(i);

function hex(v) { return '0x' + v.toString(16).padStart(2, '0').toUpperCase(); }
function arrHex(bytes) { return '[' + bytes.map(hex).join(', ') + ']'; }
function guideToOff(fileVal) {
  const linear = fileVal - 0x10;
  const bank = Math.floor(linear / 0x2000);
  const off = linear % 0x2000;
  return { bank, off };
}

// ═══ 1. 我方阵容 (bank02 off 0xA47) ═══
const b2 = banks[2];
const saoPaulo = b2.slice(0xA47, 0xA47 + 11);
const nankatsu = b2.slice(0xA53, 0xA53 + 11);
const asianWorld = b2.slice(0xA5F, 0xA5F + 11);
const bench = b2.slice(0xA6A, 0xA6A + 11); // $AA6A-$AA74 (11B, 含第11替补位)
console.log('// ═══ 我方阵容 (bank02 $AA47) ═══');
console.log('SaoPaulo(11):', arrHex(saoPaulo));
console.log('Nankatsu(11):', arrHex(nankatsu));
console.log('AsianWorld(11):', arrHex(asianWorld));
console.log('Bench(11):', arrHex(bench));
console.log('FIELD_KIND(34):', arrHex(b2.slice(0xA75, 0xA75 + 34)));

// ═══ 2. CPU 阵容 (bank29, [位置码,球员编号] 对, 指南地址=编号地址) ═══
console.log('\n// ═══ CPU 阵容 (bank29 $BB1A-$BCEE) ═══');
const cpuTeams = [
  ['Corinthians', 0x03BB1A], ['Gremio', 0x03BB28], ['Palmeiras', 0x03BB36],
  ['Santos', 0x03BB44], ['Flamengo', 0x03BB52],
  ['Kunimi', 0x03BB62], ['Akita', 0x03BB70], ['Tatsunami', 0x03BB7E],
  ['Musashi', 0x03DBFF], ['Furano', 0x03BB96], ['Toho', 0x03BBA2],
  ['AsRome', 0x03BBB4], ['Uruguay', 0x03BBC0], ['Hamburg', 0x03BBCE],
  ['Japan', 0x03BBE0],
  ['NorthKorea', 0x03BC0A], ['SouthKorea', 0x03BC36],
  ['Poland', 0x03BC4E], ['England', 0x03BC5C], ['Russia', 0x03BC6A],
  ['France', 0x03BC78], ['Mexico', 0x03BC86], ['Italy', 0x03BC92],
  ['Holland', 0x03BCA0], ['Argentina', 0x03BCAE], ['Germany', 0x03BCC2],
  ['Brazil1st', 0x03BCDA], ['Brazil2nd', 0x03BCDA], // Brazil2nd 只有第3人不同(03DBFC)
];

for (const [name, firstAddr] of cpuTeams) {
  const { bank, off } = guideToOff(firstAddr);
  const b = banks[bank];
  // 指南地址处 = 球员编号; 位置码在 off-1
  const ids = [];
  const poss = [];
  let i = off - 1; // 第一个位置码
  for (let guard = 0; guard < 24; guard++) {
    const pos = b[i];
    const id = b[i + 1];
    if (id === undefined) break;
    // 终止: 位置码=0x0F(替补GK结束) 或 0x00 或 id>0x75(进入GFX区)
    if (pos === 0x0F || pos === 0x00 || id > 0x75) break;
    poss.push(pos);
    ids.push(id);
    i += 2;
  }
  console.log(`${name}(${ids.length}): ids=${arrHex(ids)} pos=${arrHex(poss)}`);
}

// ═══ 3. Brazil 2nd 半场 第3人 (03DBFC) ═══
const { bank: b2nd, off: o2nd } = guideToOff(0x03DBFC);
console.log('\n// ═══ Brazil 2nd 半场替换球员 (03DBFC) ═══');
console.log(`bank${b2nd} off 0x${o2nd.toString(16)} = 0x${banks[b2nd][o2nd].toString(16).toUpperCase()}`);
console.log(`bank${b2nd} off 0x${(o2nd - 1).toString(16)} (pos) = 0x${banks[b2nd][o2nd - 1].toString(16).toUpperCase()}`);
