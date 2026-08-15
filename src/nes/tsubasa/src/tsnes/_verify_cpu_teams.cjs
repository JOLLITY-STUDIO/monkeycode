// 完整 dump bank29 0x1B00-0x1D00 (CPU 球队阵容区域) 对照指南
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

function hex(bytes) {
  return bytes.map(v => v.toString(16).padStart(2, '0').toUpperCase()).join(' ');
}

// 指南地址 -> 线性偏移（-0x10 header）后的 bank/off
function guideToOff(guideVal) {
  const linear = guideVal - 0x10;
  const bank = Math.floor(linear / 0x2000);
  const off = linear % 0x2000;
  return { bank, off };
}

console.log('=== bank29 0x1B00-0x1D00 dump ===');
const b = banks[29];
for (let i = 0x1B00; i < 0x1D00; i += 16) {
  console.log(`0x${(i).toString(16).toUpperCase()} ${hex(b.slice(i, i + 16))}`);
}

// 打印指南给出的地址对应的值
console.log('\n=== 指南地址对照 (值应匹配) ===');
const checks = [
  ['Corinthians 1', 0x03BB1A], ['Corinthians 2', 0x03BB1C],
  ['Gremio 1', 0x03BB28], ['Gremio 2', 0x03BB2A],
  ['Palmeiras 1', 0x03BB36], ['Palmeiras 2', 0x03BB38],
  ['Santos 1', 0x03BB44], ['Santos 2', 0x03BB46],
  ['Flamengo 1', 0x03BB52], ['Flamengo 2', 0x03BB54], ['Flamengo 3', 0x03BB56],
  ['Kunimi 1', 0x03BB62], ['Kunimi 2', 0x03BB64],
  ['Akita 1', 0x03BB70], ['Akita 2', 0x03BB72],
  ['Tatsunami 1', 0x03BB7E], ['Tatsunami 2', 0x03BB80],
  ['Furano 1', 0x03BB96],
  ['Toho 1', 0x03BBA2], ['Toho 2', 0x03BBA4], ['Toho 3', 0x03BBA6], ['Toho 4', 0x03BBA8],
  ['As Rome', 0x03BBB4],
  ['Uruguay 1', 0x03BBC0], ['Uruguay 2', 0x03BBC2],
  ['Hamburg 1', 0x03BBCE], ['Hamburg 2', 0x03BBD0], ['Hamburg 3', 0x03BBD2], ['Hamburg 4', 0x03BBD4],
  ['N.Korea 1', 0x03BC0A], ['N.Korea 2', 0x03BC0C],
  ['S.Korea 1', 0x03BC36], ['S.Korea 2', 0x03BC38],
  ['Poland 1', 0x03BC4E], ['Poland 2', 0x03BC50],
  ['England 1', 0x03BC5C], ['England 2', 0x03BC5E],
  ['Russia 1', 0x03BC6A], ['Russia 2', 0x03BC6C],
  ['France 1', 0x03BC78], ['France 2', 0x03BC7A],
  ['Mexico', 0x03BC86],
  ['Italy 1', 0x03BC92], ['Italy 2', 0x03BC94],
  ['Holland 1', 0x03BCA0], ['Holland 2', 0x03BCA2],
  ['Argentina 1', 0x03BCAE], ['Argentina 2', 0x03BCB0], ['Argentina 3', 0x03BCB2], ['Argentina 4', 0x03BCB4], ['Argentina 5', 0x03BCB6],
  ['Germany 1', 0x03BCC2], ['Germany 2', 0x03BCC4], ['Germany 3', 0x03BCC6], ['Germany 4', 0x03BCC8], ['Germany 5', 0x03BCCA], ['Germany 6', 0x03BCCC], ['Germany 7', 0x03BCCE],
  ['Brazil 1', 0x03BCDA], ['Brazil 2', 0x03BCDC], ['Brazil 3', 0x03BCDE], ['Brazil 4', 0x03BCE0], ['Brazil 5', 0x03BCE2], ['Brazil 6', 0x03BCE4], ['Brazil 7', 0x03BCE6], ['Brazil 8', 0x03BCE8], ['Brazil 9', 0x03BCEA], ['Brazil 10', 0x03BCEC], ['Brazil 11', 0x03BCEE],
];
for (const [name, guideVal] of checks) {
  const { bank, off } = guideToOff(guideVal);
  const val = banks[bank][off];
  console.log(`${name} 指南=${guideVal.toString(16).toUpperCase()} -> bank${bank} off 0x${off.toString(16).toUpperCase()} = 0x${val.toString(16).toUpperCase()} (${val})`);
}
