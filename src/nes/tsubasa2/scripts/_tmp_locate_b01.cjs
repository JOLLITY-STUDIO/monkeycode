// 查找 bank30 $C50C / bank31 $F30F 定义 (临时工具)
const fs = require('fs');
const files = fs.readdirSync('_tmp_bzk_out/bank_30').map(f => '_tmp_bzk_out/bank_30/' + f)
  .concat(fs.readdirSync('_tmp_bzk_out/bank_31').map(f => '_tmp_bzk_out/bank_31/' + f));
const targets = ['C50C:', 'C53C:', 'CD6C:', 'CD89:', 'F30F:', 'F329:', 'CE08:', 'C527:'];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    for (const t of targets) {
      if (l.includes(t)) console.log(f, i + 1, l.trim().slice(0, 110));
    }
  });
}
