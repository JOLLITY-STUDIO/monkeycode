const fs = require('fs');
const path = require('path');

const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game';
const patterns = [
  /textbox|dialog|message|border|frame|window/i,
  /nametable|nameTable|nt0|nt1|nt2|nt3|writeTile|writeSingleTile/i,
  /applyNtToPpu|ntQueue|attrQueue|renderCommit/i,
  /input|button|key|replay|restart/i,
  /audio|playBgm|playSe|bgm|se\b/i,
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
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const pat of patterns) {
      if (pat.test(lines[i])) {
        console.log(`${file.replace(root, '')}:${i+1}: ${lines[i].trim()}`);
        break;
      }
    }
  }
}
