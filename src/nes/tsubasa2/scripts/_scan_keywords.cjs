const fs = require('fs');
const path = require('path');

const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game';
const keywords = [
  'golden', 'comb', 'コンビ', 'でた', 'ゴールデン',
  'dialog', 'textbox', 'message', 'messageBox', 'window',
  'nt1', 'NT1', 'nameTable', 'nameTable1',
  'replay', 'restart', 'input',
  'bank18', 'bank19', 'BANK18', 'BANK19'
];

function scan(dir, files=[]) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) scan(full, files);
    else if (full.endsWith('.ts')) files.push(full);
  }
  return files;
}

for (const file of scan(root)) {
  const text = fs.readFileSync(file, 'utf8');
  const hits = [];
  for (const kw of keywords) {
    const i = text.indexOf(kw);
    if (i >= 0) hits.push(kw);
  }
  if (hits.length) {
    console.log(file.replace(root, '') + ' : ' + hits.join(', '));
  }
}
