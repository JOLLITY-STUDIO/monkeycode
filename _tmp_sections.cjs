const fs = require('fs');
const s = fs.readFileSync('d:/studio/github/monkeycode/_tmp_bzk_out/bank_00.asm', 'utf8').split('\n');

// find section headers
console.log('=== SECTION HEADERS ===');
for (let i = 0; i < s.length; i++) {
  const l = s[i];
  if (l.includes('===') || (l.includes('---') && (l.includes('Sub') || l.includes('routine')))) {
    console.log((i+1) + ': ' + l.trim());
  }
}

// find jump targets (function entry points)
console.log('\n=== JUMP TARGETS ===');
for (let i = 0; i < s.length; i++) {
  const l = s[i];
  if (/\$[89A][0-9A-F]{3}:.*J-----/.test(l)) {
    console.log((i+1) + ': ' + l.trim());
  }
}

// find key addresses discussed in conversation
console.log('\n=== KEY ADDRESSES ===');
const keys = ['8464','84D7','84E3','8537','8544','8682','86C6','86D5','879E','88CA','8AEC','8AF7',
  '8920','88FB','890C','98A0','98E8','98EA','99D1','9A0D','9A1F','9A31','9A35','9A4C','9A60',
  '9A71','9AA2','9AB8','9ADA','9BA0','9FA8','9F7E','A006','A009','A20C','C4B9','C572','8297','82B5','8AE6'];
for (const addr of keys) {
  const line = s.findIndex(l => l.includes('$' + addr + ':'));
  if (line >= 0) {
    console.log('$' + addr + ': line ' + (line+1) + ' - ' + s[line].trim());
    // show next 3 lines
    for (let j = line+1; j < Math.min(line+4, s.length); j++) {
      console.log('  -> ' + s[j].trim());
    }
  }
}
