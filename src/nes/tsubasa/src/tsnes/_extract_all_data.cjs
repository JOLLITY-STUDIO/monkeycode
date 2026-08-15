// 提取全部数据: 能力值 / 球队阵容 / 特殊技能, 输出 TS 代码片段
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

// ═══ 1. 能力值 ═══
console.log('// ═══ 1. 能力值 (23B 普通 / 8B GK) ═══');
const abil = [
  ['Tsubasa', 0x39FE6, false],
  ['Misaki', 0x39FFE, false],
  ['Nitta', 0x3A016, false],
  ['Ishizaki', 0x3A11E, false],
  ['Kazuo&Masao', 0x3A136, false],
  ['Sano', 0x3A14E, false],
  ['Hyuga', 0x3A166, false],
  ['Souta', 0x3A17E, false],
  ['Jitou', 0x3A196, false],
  ['Matsuyama', 0x3A1AE, false],
  ['Sawada', 0x3A1DE, false],
  ['Misugi', 0x3A1F6, false],
  ['MorisakiGK', 0x3AE8E, true],
  ['WakashimazuGK', 0x3AE96, true],
  ['WakabayashiGK', 0x3AE9E, true],
];
for (const [name, linear, isGK] of abil) {
  const size = isGK ? 8 : 23;
  const data = [];
  for (let i = 0; i < size; i++) {
    const pos = linear + i;
    const bank = Math.floor(pos / 0x2000);
    const off = pos % 0x2000;
    data.push(banks[bank][off]);
  }
  console.log(`${name}: ${arrHex(data)}`);
}

// ═══ 2. 我方阵容 (bank02 off 0xA47 起) ═══
console.log('\n// ═══ 2. 我方阵容 ═══');
const b2 = banks[2];
console.log('SaoPaulo(11):', arrHex(b2.slice(0xA47, 0xA47 + 11)));
console.log('Nankatsu(11):', arrHex(b2.slice(0xA53, 0xA53 + 11)));
console.log('AsianWorld(11):', arrHex(b2.slice(0xA5F, 0xA5F + 11)));
console.log('Bench(10):', arrHex(b2.slice(0xA6A, 0xA6A + 10)));

// ═══ 3. CPU 阵容 (bank29) — 按指南地址 (-0x10) 提取, 每球员 2B ═══
console.log('\n// ═══ 3. CPU 阵容 (2B/球员: 编号+码) ═══');
const cpuTeams = [
  ['Corinthians', [0x03BB1A, 0x03BB1C]],
  ['Gremio', [0x03BB28, 0x03BB2A]],
  ['Palmeiras', [0x03BB36, 0x03BB38]],
  ['Santos', [0x03BB44, 0x03BB46]],
  ['Flamengo', [0x03BB52, 0x03BB54, 0x03BB56]],
  ['Kunimi', [0x03BB62, 0x03BB64]],
  ['Akita', [0x03BB70, 0x03BB72]],
  ['Tatsunami', [0x03BB7E, 0x03BB80]],
  ['Furano', [0x03BB96]],
  ['Toho', [0x03BBA2, 0x03BBA4, 0x03BBA6, 0x03BBA8]],
  ['AsRome', [0x03BBB4]],
  ['Uruguay', [0x03BBC0, 0x03BBC2]],
  ['Hamburg', [0x03BBCE, 0x03BBD0, 0x03BBD2, 0x03BBD4]],
  ['Japan', [0x03BBE0, 0x03BBE2, 0x03BBE4, 0x03BBE6, 0x03BBE8, 0x03BBEA, 0x03BBEC, 0x03BBEE, 0x03BBF0, 0x03BBF2, 0x03BBF4]],
  ['NorthKorea', [0x03BC0A, 0x03BC0C]],
  ['SouthKorea', [0x03BC36, 0x03BC38]],
  ['Poland', [0x03BC4E, 0x03BC50]],
  ['England', [0x03BC5C, 0x03BC5E]],
  ['Russia', [0x03BC6A, 0x03BC6C]],
  ['France', [0x03BC78, 0x03BC7A]],
  ['Mexico', [0x03BC86]],
  ['Italy', [0x03BC92, 0x03BC94]],
  ['Holland', [0x03BCA0, 0x03BCA2]],
  ['Argentina', [0x03BCAE, 0x03BCB0, 0x03BCB2, 0x03BCB4, 0x03BCB6]],
  ['Germany', [0x03BCC2, 0x03BCC4, 0x03BCC6, 0x03BCC8, 0x03BCCA, 0x03BCCC, 0x03BCCE]],
  ['Brazil1st', [0x03BCDA, 0x03BCDC, 0x03BCDE, 0x03BCE0, 0x03BCE2, 0x03BCE4, 0x03BCE6, 0x03BCE8, 0x03BCEA, 0x03BCEC, 0x03BCEE]],
  ['Brazil2nd', [0x03BCDA, 0x03BCDC, 0x03DBFC, 0x03BCE0, 0x03BCE2, 0x03BCE4, 0x03BCE6, 0x03BCE8, 0x03BCEA, 0x03BCEC, 0x03BCEE]],
];
function getAt(fileVal) {
  const linear = fileVal - 0x10;
  const bank = Math.floor(linear / 0x2000);
  const off = linear % 0x2000;
  return banks[bank][off];
}
for (const [name, addrs] of cpuTeams) {
  const ids = addrs.map(getAt);
  console.log(`${name}(${ids.length}): ${arrHex(ids)}`);
}

// ═══ 4. 特殊技能 (14B/角色) ═══
console.log('\n// ═══ 4. 特殊技能 (14B: Shot/Pass/Dribble/1-2/Block/Tackle/PassCut) ═══');
const b28 = banks[28];
const skills = [
  ['TakiKisugiSorimachi', 0x8F07],
  ['Tsubasa', 0x8F17],
  ['Misaki', 0x8F25],
  ['Ishizaki', 0x8F33],
  ['Nitta', 0x8F41],
  ['Masao', 0x8F4F],
  ['Kazuo', 0x8F5D],
  ['Sano', 0x8F6B],
  ['Hyuga', 0x8F79],
  ['Souta', 0x8F87],
  ['Jitou', 0x8F95],
  ['Matsuyama', 0x8FA3],
  ['Sawada', 0x8FB1],
  ['Misugi', 0x8FBF],
  ['Napoleon', 0x920B],
  ['Pierr', 0x9219],
  ['Diaz', 0x926D],
  ['Schneider', 0x9289],
  ['Kapilman', 0x92B3],
  ['CarlosSantana', 0x92C1],
  ['Coimbra', 0x933F],
  ['Riverio', 0x92DD],
  ['Nei', 0x92EB],
  ['Santamaria', 0x92F9],
  ['Toninho', 0x9307],
  ['Jethrio', 0x9323],
  ['Zagalo', 0x92CF],
];
for (const [name, cpu] of skills) {
  const off = cpu - 0x8000;
  const raw = b28.slice(off, off + 14);
  const pairs = [];
  for (let i = 0; i < 14; i += 2) {
    pairs.push(raw[i] | (raw[i + 1] << 8));
  }
  const named = ['Shot', 'Pass', 'Dribble', '1-2', 'Block', 'Tackle', 'PassCut'];
  const desc = pairs.map((p, i) => p ? `${named[i]}=0x${p.toString(16).toUpperCase()}` : '').filter(Boolean).join(', ');
  console.log(`${name} ($${cpu.toString(16).toUpperCase()}): ${arrHex(raw)}  // ${desc}`);
}
