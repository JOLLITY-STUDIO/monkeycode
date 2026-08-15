// 查找 asm 中指定地址所在行号 (临时脚本; trace 用 $8000-$9FFF 窗口标签)
const fs = require('fs');
const t = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_01.asm', 'utf8');
const L = t.split(/\r?\n/);
const want = ['9E0C', '9FA8', '9BA0', '997A', '98E8', '98A0', '88CA', '8920', '9D27', '9D50', '9D08', '9CC9', '9CD3', '9C3A', '9BE8', '9C28', '9BE3', '9B6F', '9B74', '9B7F', '99F0', '9895', '9A78', '9A77'];
for (const k of want) {
  const i = L.findIndex(l => l.includes('00:' + k + ':'));
  console.log(k, '-> line', i);
}
// 也搜一下 A63C 对应的 $863C 和 $8xxx 范围内的所有 JSR 目标
