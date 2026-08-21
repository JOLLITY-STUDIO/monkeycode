// 综合校验: bank07 SCENE_0x17 (标题场景群) + bank02 密码系统表 vs ROM
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const B07 = (addr) => 0x10 + 7 * 0x2000 + (addr - 0xA000);
const B02 = (addr) => 0x10 + 2 * 0x2000 + (addr - 0xA000);

function extract(name, srcPath) {
  const src = fs.readFileSync(srcPath, 'utf8');
  const re = new RegExp('export const ' + name + '\\s*(?::\\s*[^=]*)?=\\s*\\[([\\s\\S]*?)\\n\\](?:\\s*as const)?\\s*;');
  const m = src.match(re);
  if (!m) return null;
  const arr = [];
  for (const line of m[1].split('\n')) {
    const clean = line.replace(/\/\/.*$/, '').trim();
    if (!clean) continue;
    for (const tok of clean.split(',')) {
      const t = tok.trim();
      if (!t) continue;
      arr.push(parseInt(t, t.toLowerCase().startsWith('0x') ? 16 : 10));
    }
  }
  return arr;
}

function cmp(name, arr, base, count) {
  let ok = true; const d = [];
  for (let i = 0; i < count; i++) {
    if (arr[i] !== rom[base + i]) { ok = false; if (d.length < 6) d.push('+' + i.toString(16) + ' ROM=0x' + rom[base + i].toString(16) + ' TS=0x' + arr[i].toString(16)); }
  }
  console.log((ok ? 'PASS' : 'FAIL') + ' ' + name + ' (' + count + 'B @$' + (0xA000 + (base - B07(0xA000))).toString(16).toUpperCase() + ')');
  if (!ok) d.forEach(x => console.log('  ' + x));
  return ok;
}

// === bank07 SCENE_0x17 @$A373 (3198B) ===
const s17 = extract('SCENE_0x17', 'src/game/prg/data/tables/bank07-scenes-metatile.ts');
console.log('SCENE_0x17 解析 ' + s17.length + ' 项');
cmp('SCENE_0x17', s17, B07(0xA373), s17.length);

// === bank07 SCENE_PTR_TABLE (24×2B LE @$A0D4 起, 实际指针表起始) ===
// 找指针表位置: 从 $A0D4 前 48 字节找小端升序
// 简单方式: 直接在 TS 中提取并对照已知 $A0D4 区
const ptr = extract('SCENE_PTR_TABLE', 'src/game/prg/data/tables/bank07-scenes-metatile.ts');
console.log('SCENE_PTR_TABLE 解析 ' + ptr.length + ' 项');
let okP = true;
// 指针表位于 bank07 窗口基址 $A000 起
for (let start = 0xA000; start < 0xA0D4; start++) {
  okP = true;
  for (let i = 0; i < 24; i++) {
    const rv = rom[B07(start) + i * 2] | (rom[B07(start) + i * 2 + 1] << 8);
    if (rv !== ptr[i]) { okP = false; break; }
  }
  if (okP) { console.log('PASS SCENE_PTR_TABLE @$' + start.toString(16).toUpperCase() + ' (24×16bit LE)'); break; }
}
if (!okP) console.log('FAIL SCENE_PTR_TABLE 未找到匹配起点');

// === bank07 各场景 0x00-0x16 ===
const scenes = {};
for (let i = 0; i <= 0x16; i++) {
  const nm = 'SCENE_0x' + (i < 0x10 ? '0' : '') + i.toString(16).toUpperCase();
  scenes[nm] = extract(nm, 'src/game/prg/data/tables/bank07-scenes-metatile.ts');
  if (!scenes[nm]) { console.log('SKIP ' + nm + ' (未找到)'); continue; }
  // 场景起始地址 = 前一项指针 或 $A0D4 + 前项长度 (用指针表推导)
}
// 用指针推导地址: idx0=$A0D4, 后续 = 前指针 + 前场景长度
let addr = 0xA0D4;
for (let i = 0; i <= 0x16; i++) {
  const nm = 'SCENE_0x' + (i < 0x10 ? '0' : '') + i.toString(16).toUpperCase();
  const arr = scenes[nm];
  if (!arr) continue;
  cmp(nm, arr, B07(addr), arr.length);
  addr += arr.length;
  // 对齐检查: 指针表项是否等于 addr
  if (i < 23) {
    const pv = ptr[i + 1];
    if (pv !== addr) console.log('  注意: 指针[' + (i + 1) + ']=$' + pv.toString(16) + ' 但推算=$' + addr.toString(16) + ' (差 ' + (addr - pv) + ')');
  }
}

// === bank02 密码表 NMI_CALLBACK_TABLE ($A491 24×2B LE) ===
const nmicb = extract('NMI_CALLBACK_TABLE', 'src/game/prg/data/tables/bank02-tables.ts');
if (nmicb) {
  console.log('NMI_CALLBACK_TABLE 解析 ' + nmicb.length + ' 项');
  let ok2 = true; const d2 = [];
  for (let i = 0; i < 24; i++) {
    const rv = rom[B02(0xA491) + i * 2] | (rom[B02(0xA491) + i * 2 + 1] << 8);
    if (nmicb[i] !== rv) { ok2 = false; if (d2.length < 6) d2.push('idx' + i + ' ROM=0x' + rv.toString(16) + ' TS=0x' + nmicb[i].toString(16)); }
  }
  console.log((ok2 ? 'PASS' : 'FAIL') + ' NMI_CALLBACK_TABLE @$A491 (24×16bit LE)');
  if (!ok2) d2.forEach(x => console.log('  ' + x));
} else console.log('SKIP NMI_CALLBACK_TABLE (未找到)');

// === bank02 SPRITE_POS_TABLE ($A98E 118B) ===
const spr = extract('SPRITE_POS_TABLE', 'src/game/prg/data/tables/bank02-tables.ts');
if (spr) {
  console.log('SPRITE_POS_TABLE 解析 ' + spr.length + ' 项');
  cmp('SPRITE_POS_TABLE', spr, B02(0xA98E), spr.length);
} else console.log('SKIP SPRITE_POS_TABLE (未找到)');
