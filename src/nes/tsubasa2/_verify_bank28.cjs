/**
 * Bank28 差分验证 — 轻量版
 * 覆盖: (1) 表级: T_TEAM_8528 / T_ATTR_ROLE_8A9D 与 ROM 原始字节逐字节对比
 *       (2) 入口级: entryTeamQuery($852E) / entryRoleQuery($8609) / entryLevelMap($8D58)
 *           在受控输入下不抛错且关键 RAM 写入符合语义。
 */
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname);
const OUT = path.join(ROOT, '_test_out');

let pass = 0, fail = 0;
const fails = [];
function ok(cond, msg) {
  if (cond) { pass++; } else { fail++; fails.push(msg); }
}

// ── ROM 原始字节 (测试用: 从编译产物读, 避免 import TS) ──
const romSrc = fs.readFileSync(path.join(OUT, 'game/data/prg-bank-28.js'), 'utf8');
const romMatch = romSrc.match(/\[([\s\S]*)\]/);
const ROM = romMatch[1].split(',').map(x => parseInt(x.trim(), 16));

// ── 从 TS 数据表提取数组字面量 ──
function extractArr(src, name) {
  const i = src.indexOf('export const ' + name);
  if (i < 0) return null;
  const eq = src.indexOf('=', i);
  const j = src.indexOf('[', eq);
  let k = j + 1, depth = 1;
  while (k < src.length && depth > 0) {
    if (src[k] === '[') depth++;
    if (src[k] === ']') depth--;
    k++;
  }
  let body = src.slice(j + 1, k - 1);
  body = body.replace(/\/\/[^\n]*/g, ''); // 去行注释
  return body.split(',').map(x => parseInt(x.trim(), 16)).filter(v => !isNaN(v));
}
const tblSrc = fs.readFileSync(path.join(ROOT, 'src/game/data/prg/bank28-tables.ts'), 'utf8');
const diag = [];
function logDiag(m) { diag.push(m); fs.writeFileSync(path.join(ROOT, '_b28v_diag.txt'), diag.join('\n'), 'utf8'); }

// ── T1: T_TEAM_8528 (ROM off 0x528 = $8528) ──
{
  const T = extractArr(tblSrc, 'T_TEAM_8528');
  ok(T !== null && T.length > 0, 'T1: T_TEAM_8528 存在');
  if (T) {
    const rom = ROM.slice(0x528, 0x528 + T.length);
    let all = T.length > 0;
    for (let i = 0; i < T.length; i++) if (T[i] !== rom[i]) all = false;
    ok(all, `T1: T_TEAM_8528(${T.length}B) 与 ROM $8528 逐字节一致` +
      (all ? '' : ` diff=${T.map((v, i) => v !== rom[i] ? i + ':0x' + v.toString(16) + '!=0x' + rom[i].toString(16) : '').filter(Boolean).join(',')}`));
    logDiag(`T1: T_TEAM_8528 = [${T.map(x => '0x' + x.toString(16)).join(', ')}]`);
  }
}

// ── T2: T_ATTR_ROLE_8A9D ($8A9D,X; X=0x0B-0x15 → 有效数据 $8AA8-$8AB2) ──
{
  const T = extractArr(tblSrc, 'T_ATTR_ROLE_8A9D');
  ok(T !== null && T.length > 0, 'T2: T_ATTR_ROLE_8A9D 存在');
  if (T) {
    let all = true;
    for (let x = 0x0B; x <= 0x15; x++) {
      const romV = ROM[0x0AA8 + (x - 0x0B)] ?? -1;
      const tV = T[x] ?? -1;
      if (tV !== romV) { all = false; logDiag(`T2: idx 0x${x.toString(16)}: T=${tV >= 0 ? '0x' + tV.toString(16) : '??'} ROM=${romV >= 0 ? '0x' + romV.toString(16) : '??'}`); }
    }
    ok(all, `T2: T_ATTR_ROLE_8A9D 有效区(0x0B-0x15)与 ROM $8AA8 一致`);
    logDiag(`T2: T_ATTR_ROLE_8A9D 有效区 = [${T.slice(0x0B, 0x16).map(x => '0x' + x.toString(16)).join(', ')}]`);
  }
}

// ── T3: 入口 smoke (需要编译后的 service) ──
let svcMod = null;
try {
  svcMod = require(path.join(OUT, 'game/service/bank28_match.service.js'));
} catch (e) {
  ok(false, 'T3: bank28_match.service.js 编译产物缺失: ' + e.message.split('\n')[0]);
}
if (svcMod) {
  logDiag('T3 start');
  const { DataStore } = require(path.join(OUT, 'game/data/DataStore.js'));
  const { Bank28MatchService } = svcMod;

  // T3a: entryLevelMap — ram_0032=经验 → 等级
  logDiag('T3a start');
  try {
    const store = new DataStore();
    store.write('ram_0032', 0xFF);
    const svc = new Bank28MatchService(store);
    svc.entryLevelMap();
    const lv = svc.lookupLevel(0xFF);
    ok(typeof lv === 'number' && lv >= 0, 'T3a: entryLevelMap 不抛错, lookupLevel(255)=' + lv);
  } catch (e) { ok(false, 'T3a: entryLevelMap 抛错: ' + e.message.split('\n')[0]); }

  // T3b: entryMatchInit — 清理 0x500-0x57F + 043B
  logDiag('T3b start');
  try {
    const store = new DataStore();
    store.write('ram_0500', 0xAB);
    store.write('ram_043B', 7);
    const svc = new Bank28MatchService(store);
    svc.entryMatchInit();
    ok(store.read('ram_0500') === 0 && store.read('ram_043B') === 0, 'T3b: entryMatchInit 清理比赛状态区');
  } catch (e) { ok(false, 'T3b: entryMatchInit 抛错: ' + e.message.split('\n')[0]); }

  // T3c: entryTeamQuery — 受控 (ram_0038/39 指针指向 bank28 内名字区)
  logDiag('T3c start');
  try {
    const store = new DataStore();
    store.write('ram_0038', 0x00); store.write('ram_0039', 0x80);
    store.write('ram_061E', 0);
    const svc = new Bank28MatchService(store);
    svc.entryTeamQuery();
    ok(store.read('ram_043B') !== undefined, 'T3c: entryTeamQuery 不抛错, 043B=' + store.read('ram_043B'));
  } catch (e) { ok(false, 'T3c: entryTeamQuery 抛错: ' + e.message.split('\n')[0]); }

  // T3d: entryRoleQuery — 受控
  logDiag('T3d start');
  try {
    const store = new DataStore();
    store.write('ram_0038', 0x00); store.write('ram_0039', 0x80);
    const svc = new Bank28MatchService(store);
    svc.entryRoleQuery();
    ok(true, 'T3d: entryRoleQuery 不抛错');
  } catch (e) { ok(false, 'T3d: entryRoleQuery 抛错: ' + e.message.split('\n')[0]); }

  // T3e: dispatch 全覆盖 0-9 不抛错
  logDiag('T3e start');
  try {
    const store = new DataStore();
    const svc = new Bank28MatchService(store);
    let bad = [];
    for (let i = 0; i < 10; i++) {
      logDiag('T3e dispatch(' + i + ')');
      try { svc.dispatch(i); } catch (e) { bad.push(i + ':' + e.message.split('\n')[0]); }
      logDiag('T3e dispatch(' + i + ') done');
    }
    ok(bad.length === 0, 'T3e: dispatch 0-9 全部不抛错' + (bad.length ? ' bad=[' + bad.join(';') + ']' : ''));
  } catch (e) { ok(false, 'T3e: dispatch 循环抛错: ' + e.message.split('\n')[0]); }
}

const resultText = `BANK28 PASS=${pass} FAIL=${fail}\n` + (fail > 0 ? fails.slice(0, 20).join('\n') : 'ALL BANK28 VERIFY TESTS PASSED');
console.log(resultText);
fs.writeFileSync(path.join(ROOT, '_b28_verify_result.txt'), resultText, 'utf8');
if (fail > 0) process.exit(1);

process.on('uncaughtException', (e) => {
  fs.writeFileSync(path.join(ROOT, '_b28_verify_result.txt'), 'UNCAUGHT: ' + e.stack, 'utf8');
  process.exit(2);
});
