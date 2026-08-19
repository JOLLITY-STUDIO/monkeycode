const fs = require('fs');
const files = fs.readdirSync('_tmp_bzk_out/bank_01');
const buf = fs.readFileSync('_tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl');
const out = [];
out.push('FILES: ' + files.join(', '));
out.push('CDL SIZE: ' + buf.length);
out.push('first bytes: ' + buf.slice(0, 32).toString('hex'));
// 尝试按 latin1 解码
const latin = buf.toString('latin1');
out.push('latin1 head:\n' + latin.slice(0, 1200));
fs.writeFileSync('_cdl_probe.txt', out.join('\n'), 'utf8');
