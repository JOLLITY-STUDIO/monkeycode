// 提取 bank_ram.inc 关键 RAM 定义
const fs = require('fs');
const t = fs.readFileSync('_tmp_bzk_out/bank_ram.inc', 'utf8').split(/\r?\n/);
const keys = ['ram_0034','ram_0035','ram_0036','ram_0037','ram_003A','ram_003B','ram_004B','ram_0052','ram_0053','ram_0054','ram_0055','ram_0056','ram_0057','ram_0058','ram_0059','ram_005A','ram_005B','ram_005C','ram_0441','ram_046B','ram_04A5','ram_04A6','ram_04A7','ram_04AE','ram_04B5','ram_04BC','ram_04AD','ram_04B4','ram_04BB','ram_04C2','ram_04C3','ram_04A5','ram_04A8','ram_04C5','ram_04C1','ram_0515','ram_0516','ram_0518','ram_0524','ram_0525','ram_0526','ram_0527','ram_052A','ram_05C7','ram_05C8','ram_05C9','ram_05CA','ram_05CB','ram_05CC','ram_05CD','ram_05CE','ram_05D0','ram_05D1','ram_05D4','ram_05D5','ram_05D7','ram_05D8','ram_05DB','ram_05DC','ram_05DD','ram_05DE','ram_05DF','ram_05E0','ram_05E1','ram_05E2','ram_05FB','ram_061C','ram_061D','ram_0623','ram_0635','ram_0637','ram_0638','ram_063F','ram_05F4','ram_0020','ram_0022','ram_0023','ram_0024','ram_0025','ram_0030','ram_0031'];
for (const k of keys) {
  const line = t.find(l => new RegExp(`\\b${k}\\b`).test(l) && /\.equ|\.word|\.byte|=/.test(l));
  if (line) console.log(line.trim());
}
