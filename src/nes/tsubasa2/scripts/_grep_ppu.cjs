const fs = require('fs');
const files = [
  'pages/bankpage/bank-detail-02/bank-detail.ts',
  'pages/bankpage/bank-detail-12/bank-detail.ts',
  'pages/bankpage/bank-detail-30/bank-detail.ts',
  'pages/bankpage/bank-detail-31/bank-detail.ts',
  'pages/bankpage/bank-detail/bank-detail.ts',
];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8').split('\n');
  console.log('=== ' + f + ' ===');
  s.forEach((l, i) => {
    if (/ppuBufHex/.test(l)) console.log((i + 1) + ': ' + l.trim().slice(0, 120));
  });
}
