// 列出 bank26 _readArr/_writeArr 调用点 + bank29 read0454/write0454 用法
const fs = require('fs');
const path = require('path');

function show(file, patterns) {
  const full = path.join(__dirname, 'src', 'game', 'service', file);
  const src = fs.readFileSync(full, 'utf8').split(/\r?\n/);
  for (let i = 0; i < src.length; i++) {
    for (const p of patterns) {
      if (src[i].includes(p)) {
        console.log(`${String(i + 1).padStart(5)}| ${src[i].trim()}`);
        break;
      }
    }
  }
}

console.log('===== bank26 _readArr 调用点 =====');
show('bank26_match.service.ts', ['_readArr(']);
console.log('\n===== bank26 _writeArr 调用点 =====');
show('bank26_match.service.ts', ['_writeArr(']);
console.log('\n===== bank26 tactic_slot_ / player_data_ / ram_05FD =====');
show('bank26_match.service.ts', ['tactic_slot_', 'player_data_', 'ram_05FD']);
console.log('\n===== bank29 read0454/write0454 调用点 =====');
show('bank29_roster.service.ts', ['read0454(', 'write0454(']);
