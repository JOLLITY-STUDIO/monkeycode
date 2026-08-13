const fs = require('fs');
const lines = fs.readFileSync('trace/Captain Tsubasa II - Super Striker (Japan)-continue-panel.log', 'utf8').split('\n');

// line format: f1443   A:01 X:02 Y:00 S:EA  $00:9FAA: 8A       TXA
//                        $00:9FAA: 20 43 C4  JSR $C443
const re = /^\S+\s+A:.. X:.. Y:.. S:..\s+\$([0-9A-F]{2}):([0-9A-F]{4}):\s+([0-9A-F]{2})\s+([A-Z]{3})(?:\s+\$([0-9A-F]{4}))?/;

console.log('=== JSR call targets (bank:target x count) ===');
const jsr = {};
for (const l of lines) {
  const m = l.match(re);
  if (m && m[4] === 'JSR' && m[5]) {
    const k = 'bank' + parseInt(m[1], 16) + ':' + m[5];
    jsr[k] = (jsr[k] || 0) + 1;
  }
}
console.log(Object.entries(jsr).sort((a, b) => b[1] - a[1]).slice(0, 50).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== bank6 unique ops by addr (top 30) ===');
const b6 = {};
for (const l of lines) {
  const m = l.match(/^\S+\s+A:.. X:.. Y:.. S:..\s+\$06:([0-9A-F]{4}):\s+([0-9A-F]{2})\s+([A-Z]{3})/);
  if (m) {
    const k = '$06:' + m[1] + ' ' + m[3];
    b6[k] = (b6[k] || 0) + 1;
  }
}
console.log(Object.entries(b6).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== bank15 unique ops by addr (all) ===');
const b15 = {};
for (const l of lines) {
  const m = l.match(/^\S+\s+A:.. X:.. Y:.. S:..\s+\$15:([0-9A-F]{4}):\s+([0-9A-F]{2})\s+([A-Z]{3})/);
  if (m) {
    const k = '$15:' + m[1] + ' ' + m[3];
    b15[k] = (b15[k] || 0) + 1;
  }
}
console.log(Object.entries(b15).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== $4016/$4017 read counts by bank ===');
const input = {};
for (const l of lines) {
  const m = l.match(/^\S+\s+A:.. X:.. Y:.. S:..\s+\$([0-9A-F]{2}):[0-9A-F]{4}:\s+[0-9A-F]{2}\s+(LDA|BIT|LDX|LDY)\s+\$40(1[67])/);
  if (m) {
    const k = 'bank' + parseInt(m[1], 16) + ' $40' + m[2];
    input[k] = (input[k] || 0) + 1;
  }
}
console.log(Object.entries(input).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' x' + v).join('\n'));

console.log('\n=== RAM writes to password area ($05A0-$05DF) by bank ===');
const pwd = {};
for (const l of lines) {
  const m = l.match(/^\S+\s+A:.. X:.. Y:.. S:..\s+\$([0-9A-F]{2}):[0-9A-F]{4}:.*\$(05A[0-9A-F]|05B[0-9A-F]|05C[0-9A-F]|05D[0-9A-F]|05E[0-7])/);
  if (m) {
    const k = 'bank' + parseInt(m[1], 16);
    pwd[k] = (pwd[k] || 0) + 1;
  }
}
console.log(Object.entries(pwd).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' x' + v).join('\n'));
