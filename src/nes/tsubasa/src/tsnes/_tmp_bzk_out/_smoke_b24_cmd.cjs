// bank24 命令表 + $8629 双游标 + $863C 文本流 service 冒烟测试
const { DataStore } = require('./build/data/DataStore.js');
const { Bank24HudService } = require('./build/game/bank24_hud.service.js');
const { readB31, readB31U16 } = require('./build/data/bank24-tables.js');

const store = new DataStore();
const svc = new Bank24HudService(store);
const s = store;
const oam = store.oam;
let pass = 0;
let fail = 0;
const check = (name, cond, extra) => {
  if (cond) { pass++; console.log(`  OK  ${name}${extra ? '  ' + extra : ''}`); }
  else { fail++; console.log(`  FAIL ${name}${extra ? '  ' + extra : ''}`); }
};

// 双游标游标值: 模拟 _sceneSub2 初始化 (e6=14 → 003A=17, 003B=0)
s.write('ram_003A', 17);
s.write('ram_003B', 0);

// ── $C524 映射抽查 (A<$A0 直通; $A0-$C7 → $94; ≥$C8 → $95) ──
console.log('\n== $C524 映射 ==');
const m21 = svc._mapCharC524(0x21);
check('A=$21 → [21,0]', m21[0] === 0x21 && m21[1] === 0);
const ma0 = svc._mapCharC524(0xa0);
check('A=$A0 → [06,94]', ma0[0] === 0x06 && ma0[1] === 0x94);
const mcb = svc._mapCharC524(0xc8);
check('A=$C8 → [1A,95]', mcb[0] === 0x1a && mcb[1] === 0x95);

// ── $863C 文本流渲染 (索引 1 → $F509: 12 AF 0B FC) ──
console.log('\n== $863C 文本流渲染 (索引 1) ==');
const before = oam.slotCount();
svc._renderText863C(1);
// 3 个字符写入: offset 3+17/3+0, 3+18/3+1, 3+19/3+2
const e = oam.readByte(3 + 17);
const a0 = oam.readByte(3 + 0);
const e2 = oam.readByte(3 + 18);
const a2 = oam.readByte(3 + 2);
check('图案[0]=map($12)', e === svc._mapCharC524(0x12)[0], `got $${e.toString(16)}`);
check('属性[0]=map($12)', a0 === svc._mapCharC524(0x12)[1], `got $${a0.toString(16)}`);
check('3 字符游标推进 (003A=20, 003B=3)', s.read('ram_003A') === 20 && s.read('ram_003B') === 3,
  `003A=${s.read('ram_003A')} 003B=${s.read('ram_003B')}`);
check('$FC 终止未越界', oam.slotCount() - before <= 8, `slots=${oam.slotCount() - before}`);

// ── 命令分发冒烟 (不抛异常 + 有输出) ──
console.log('\n== $8364 命令分发 ==');
const reset = () => { s.write('ram_003A', 17); s.write('ram_003B', 0); };
const cmd = (n) => {
  reset();
  try { svc._sceneCmd83xx(n); return true; } catch (e) { console.log(`    EX ${n}:`, e.message); return false; }
};
// cmd 0: 043C=0x80 → $8435[0]=$E8 文本流
s.write('ram_043B', 0); s.write('ram_043C', 0x80); s.write('ram_0628', 0);
check('cmd0 执行', cmd(0));
s.write('ram_043B', 1); s.write('ram_0628', 0x80);
check('cmd0 (043B=1,0628) 执行', cmd(0));
// cmd 1
s.write('ram_043D', 0); s.write('ram_043E', 0x01);
check('cmd1 执行', cmd(1));
// cmd 2
s.write('ram_043C', 0x82); s.write('ram_043B', 0);
check('cmd2 (043C=0x82) 执行', cmd(2));
s.write('ram_043C', 0x80); s.write('ram_043B', 1);
check('cmd2 (043B=1) 执行', cmd(2));
// cmd 3
s.write('ram_043D', 0); s.write('ram_043E', 0x80);
check('cmd3 执行', cmd(3));
// cmd 4/8/9/10/11/13/14 name 渲染
s.write('ram_0441', 0x0b); s.write('ram_0442', 0x0b); s.write('ram_0601', 0x0b);
s.write('ram_0602', 0x0b); s.write('ram_0603', 0x0b); s.write('ram_05FC', 0x0b);
s.write('ram_05FB', 0);
check('cmd4 执行', cmd(4));
check('cmd5 执行', cmd(5));
check('cmd6 执行', cmd(6));
check('cmd7 (0600+0x33) 执行', cmd(7));
check('cmd8 执行', cmd(8));
check('cmd9 执行', cmd(9));
check('cmd10 执行', cmd(10));
check('cmd11 执行', cmd(11));
check('cmd12 执行', cmd(12));
check('cmd13 执行', cmd(13));
check('cmd14 执行', cmd(14));
check('cmd15 执行', cmd(15));
check('cmd16 执行', cmd(16));
s.write('ram_002A', 0x20); s.write('ram_002B', 0x24);
check('cmd17 执行', cmd(17));
check('cmd18 执行', cmd(18));
check('cmd19 执行', cmd(19));
check('cmd20 执行', cmd(20));
check('cmd21 执行', cmd(21));
check('cmd22 执行', cmd(22));
// cmd 23: 场景流 n=2 → 2 次 $7C
s.write('ram_003A', 17); s.write('ram_003B', 0);
s.write('ram_05E5', 0);
s.write('ram_005F', 0x21); s.write('ram_0060', 0x84); // 指向 bank24 $8421 (数据)
const bb = svc._sceneCmd83xx(23);
check('cmd23 执行', true);
check('cmd23 推进 05E5', s.read('ram_05E5') === 1);
check('cmd24 执行', cmd(24));
check('cmd25-30 执行(noop)', cmd(25) && cmd(26) && cmd(27) && cmd(28) && cmd(29) && cmd(30));
check('cmd31 终止场景', (() => { s.write('ram_05E3', 1); svc._sceneCmd83xx(31); return s.read('ram_05E3') === 0; })());

// ── _sceneSub2 全流程: 用 bank24 空闲数据构造场景流 ──
console.log('\n== _sceneSub2 全流程 ==');
{
  s.write('ram_05E4', 2);
  s.write('ram_05E5', 0);
  s.write('ram_05E6', 14);
  s.write('ram_05E7', 0);
  s.write('ram_05E8', 0);
  s.write('ram_003A', 0); s.write('ram_003B', 0);
  // 场景流: 指向 bank24 $80A0 附近数据 (含 ≥$E0 命令字节)
  // 用 $80E0-$80FF 区域的数据测试 (低字节 < $E0 → $8629; ≥$E0 → 命令)
  s.write('ram_005F', 0x00);
  s.write('ram_0060', 0x81); // $8100 起, bank24 数据
  // 手动验证: 流字节 0x9D 0x9E 0x9F ... 直到遇到 ≥$E0
  svc._sceneSub2();
  // 结束: 遇到 ≥$E0 字节触发命令
  console.log('  (sub2 完成, 无死循环)');
  check('sub2 后 05E4/05E3 保护', s.read('ram_05E4') === 2 || s.read('ram_05E3') === 0);
}

console.log(`\n结果: ${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);
