// dump asm/bank11 中 fn_85C2 段落 ($864D-$868A) 验证 pattern 读源
const fs = require('fs');
const d = 'asm/bank11';
for (const f of fs.readdirSync(d)) {
  const c = fs.readFileSync(d + '/' + f, 'utf8').split(/\r?\n/);
  c.forEach((l, i) => {
    if (/^\s*;?\s*\$86(4D|4E|4F|50|51|52|53|54|55|56|57|58|59|5A|5B|5C|5D|5E|5F|60|61|62|63|64|65|66|67|68|69|6A|6B|6C|6D|6E|6F|70|71|72|73|74|75|76|77|78|79|7A|7B|7C|7D|7E|7F|80|81|82|83|84|85|86|87|88|89|8A)/.test(l))
      console.log(f + ':' + (i + 1) + ': ' + l);
  });
}
