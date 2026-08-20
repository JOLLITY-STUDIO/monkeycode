// 查 debug.txt 运行时 RAM dump 中 HUD 相关地址值
const fs = require('fs');
const s = fs.readFileSync('_tmp_bzk_out/debug.txt', 'utf8');
const ls = s.split('\n');
const pats = ['$0516', '$0517', '$0518', '$0523', '$0524', '$0529', '$052A', '$052B', '$052C', '$052D', '$052E', '$052F', '$0530', '$0531', '$0532', '$0534', '$0536', '$0538', '$053C', '$053A', '$05EA', '$063F', '$0469', '$046F', '$0490', '$0491'];
for (const ln of ls) {
  for (const pt of pats) {
    if (ln.includes(pt)) {
      console.log(ln.trim().slice(0, 120));
      break;
    }
  }
}
