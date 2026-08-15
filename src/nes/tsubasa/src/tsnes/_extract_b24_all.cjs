// 一次性提取 bank24 全部精灵/HUD 数据表, 输出 TS 声明格式
const fs = require('fs');

function load(path) {
  const txt = fs.readFileSync(path, 'utf8');
  const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
  if (!m) throw new Error('cannot parse ' + path);
  return m[1].split(',').map((s) => parseInt(s.trim(), 16));
}

const b24 = load('rom-data/prg-bank-24.ts');
const b25 = load('rom-data/prg-bank-25.ts');
const b28 = load('rom-data/prg-bank-28.ts');
const b29 = load('rom-data/prg-bank-29.ts');

const out = [];
const push = (name, arr, comment) => {
  out.push(`/** ${comment} */`);
  out.push(`export const ${name}: readonly number[] = [`);
  for (let i = 0; i < arr.length; i += 16) {
    const line = arr.slice(i, i + 16).map((v) => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ');
    out.push('  ' + line + (i + 16 < arr.length ? ',' : ''));
  }
  out.push('];\n');
};

// bank24 $8000-$9FFF, offset = cpu - 0x8000
const b24At = (cpu, n) => b24.slice(cpu - 0x8000, cpu - 0x8000 + n);
const b25At = (cpu, n) => b25.slice(cpu - 0xa000, cpu - 0xa000 + n);
const b28At = (cpu, n) => b28.slice(cpu - 0x8000, cpu - 0x8000 + n);
const b29At = (cpu, n) => b29.slice(cpu - 0xa000, cpu - 0xa000 + n);

push('SPR_DISPATCH_89B4', b24At(0x89b4, 67), '$89B4 精灵数据流 dispatch 表 (67B: 64B 表 + 内联 JSR $C509)');
push('POS_TBL_8AAC', b24At(0x8aac, 8), '$8AAC 位置表 8B');
push('TBL_8B0A', b24At(0x8b0a, 8), '$8B0A 表 8B');
push('SKILL_TBL_8B72', b24At(0x8b72, 25), '$8B72 技能表 5x5 25B');
push('DIGIT_TBL_8BC9', b24At(0x8bc9, 12), '$8BC9 计时器数字表 12B');
push('TBL_8D04', b24At(0x8d04, 8), '$8D04 表 8B');
push('NAME_TBL_8D40', b24At(0x8d40, 44), '$8D40 名字区渲染表 44B');
push('SPR_PATTERN_8D9E', b24At(0x8d9e, 130), '$8D9E 精灵图案表 130B (4 组图案模板 4x9B + 15 项 2B 指针)');
push('SPR_BLOCK_PTR_8DC2', b24At(0x8dc2, 30), '$8DC2 精灵数据块指针表 15 项 x2B');
push('BLK_TBL_86B8', b24At(0x86b8, 24), '$86B8 组属性表 24B');
push('NEXT_CFG_86C8', b24At(0x86c8, 32), '$86C8 下一块配置表 32B');
push('SRC_ADDR_86E8', b24At(0x86e8, 32), '$86E8 源地址表 32B');
push('TBL_8686', b24At(0x8686, 32), '$8686 名字区匹配表 32B');

// 15 个精灵数据块 (每块 16B)
for (let i = 0; i < 15; i++) {
  const lo = b24At(0x8dc2 + i * 2, 2);
  const blockAddr = (lo[1] << 8) | lo[0];
  push(`SPR_BLOCK_${i}_${blockAddr.toString(16).toUpperCase()}`, b24At(blockAddr, 16), `精灵数据块 ${i} @ $${blockAddr.toString(16).toUpperCase()} (16B)`);
}

// bank28 $9E4E 等级表 48B
push('T_LEVEL_MAP_9E4E', b28At(0x9e4e, 48), 'bank28 $9E4E 等级表 48B');
// bank28 $9FCE 名字区*10 偏移表
push('B28_T_9FCE', b28At(0x9fce, 64), 'bank28 $9FCE 偏移表');
// bank29 $AE86 96B / $AFAE 96B
push('B29_T_AE86', b29At(0xae86, 96), 'bank29 $AE86 查表 96B (A<<3 索引)');
push('B29_T_AFAE', b29At(0xafae, 96), 'bank29 $AFAE 查表 96B (A*10 索引)');

fs.writeFileSync('_b24_all_tables_out.txt', out.join('\n'), 'utf8');
console.log('OK, lines:', out.length);
