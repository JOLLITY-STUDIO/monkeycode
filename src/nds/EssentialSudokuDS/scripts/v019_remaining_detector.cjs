// V0.19 detector: 剩余候选 (未命名 callers>=1, disasm 有指令, 4 对齐)
// 新模式: indirect_thunk (ldr ip,[pc]+bx ip) / mode_getter (mrs+and #0x1f) /
//         minmax (cmp+movXX+bx lr) / bl2_wrap (bl+bl+bx lr) / gptr (复用 v018)
const fs = require('fs');
const dir = 'rom-data';

const ft = JSON.parse(fs.readFileSync(dir + '/function-table.json', 'utf8'));
const funcs = ft.functions || ft;

const curatedFiles = [
  'v012-curated.json', 'v0121-curated-batch2.json', 'v0122-curated-batch3.json',
  'v0122-curated-batch4.json', 'v0142-curated-batch5.json', 'v016-curated-batch6.json',
  'v017-curated-batch7.json', 'v017-curated-batch8.json', 'v017-curated-batch9.json',
  'v017-curated-batch10.json', 'v017-curated-batch11.json', 'v017-curated-batch12.json',
  'v017-curated-batch13.json', 'v017-curated-batch14.json', 'v017-curated-batch15.json',
  'v017-curated-batch16.json', 'v017-curated-batch17.json', 'v017-curated-batch18.json',
  'v017-curated-batch19.json', 'v017-curated-batch20.json', 'v017-curated-batch21.json',
  'v019-curated-batch.json',
];
const patternFiles = [
  'v013-pattern-suggestions.json', 'v014-pattern-suggestions.json',
  'v017-pattern-bulk.json', 'v017-pattern-bulk2.json', 'v017-pattern-bulk3.json',
  'v017-pattern-final.json', 'v017-pattern-merged.json', 'v018-pattern-global.json',
];
const named = new Set();
for (const f of curatedFiles.concat(patternFiles)) {
  const j = JSON.parse(fs.readFileSync(dir + '/' + f, 'utf8'));
  for (const e of (j.names || [])) if (e.addr) named.add(e.addr);
}

const disasm = {};
for (const cpu of ['arm9', 'arm7']) {
  const lines = fs.readFileSync(dir + '/disasm-' + cpu + '-full.txt', 'utf8').split('\n');
  const map = new Map();
  const re = /^([0-9a-f]{8}) +[^ ]+ +(.+)$/;
  for (const l of lines) {
    const t = l.trim();
    const m = t.match(re);
    if (m) map.set(parseInt(m[1], 16), m[2].trim().replace(/[ \t]+/g, ' '));
  }
  disasm[cpu] = map;
}
const bin9 = fs.readFileSync(dir + '/arm9.bin');
const bin7 = fs.readFileSync(dir + '/arm7.bin');
function readPtr9(romAddr) {
  const off = romAddr - 0x02008000;
  if (off < 0 || off + 4 > bin9.length) return null;
  return (bin9[off] | (bin9[off+1] << 8) | (bin9[off+2] << 16) | (bin9[off+3] << 24)) >>> 0;
}
function readPtr7(romAddr) {
  const off = romAddr - 0x02380000;
  if (off < 0 || off + 4 > bin7.length) return null;
  return (bin7[off] | (bin7[off+1] << 8) | (bin7[off+2] << 16) | (bin7[off+3] << 24)) >>> 0;
}
const addrToCpu = {};
for (const f of funcs) addrToCpu[parseInt(f.addr, 16)] = f.cpu;
const allAddrs = funcs.map(f => parseInt(f.addr, 16)).sort((a, b) => a - b);
const addrSet = new Set(allAddrs);
function getBody(addr, cpu, loose) {
  const map = disasm[cpu];
  const insns = [];
  let cur = addr;
  let dataPool = 0;
  while (map.has(cur)) {
    const t = map.get(cur);
    // 数据池特征: andeq/andseq/ldrshteq/strdeq/svceq 等条件解码字面量, 连续 2 条即截断
    if (/^(andeq|andseq|ldrshteq|strdeq|svceq|svcle|rscseq|teqeq) /.test(t)) {
      dataPool++;
      if (dataPool >= 2) break;
    } else {
      dataPool = 0;
    }
    insns.push({ a: cur, t });
    cur += 4;
    if (insns.length > 200) break;
    // loose 模式: 忽略 V0.8 误报相邻条目截断 (真实函数可能紧邻数据误报条目)
    if (!loose && addrSet.has(cur)) break;
    // 函数结尾: pop {..} + bx lr 连续 → 停
    if (insns.length >= 2 && insns[insns.length - 2].t.startsWith('pop ') && insns[insns.length - 1].t === 'bx lr') break;
  }
  return insns;
}
function ldrPcTarget(t) {
  // 支持 [pc, #N] 和 [pc] (无偏移 = #0)
  let m = t.match(/^ldr +(r[0-9]+|ip) *, *\[pc *, *#(0x[0-9a-f]+|[0-9]+)\]/);
  if (m) return { reg: m[1], imm: parseInt(m[2], 16) };
  m = t.match(/^ldr +(r[0-9]+|ip) *, *\[pc\]/);
  if (m) return { reg: m[1], imm: 0 };
  return null;
}
function parseInsn(t) {
  const sp = t.split(/ +/);
  return { mne: (sp[0] || '').toLowerCase(), ops: sp.slice(1).join(' ') };
}

const cands = funcs.filter(f => {
  if (named.has(f.addr)) return false;
  if (!String(f.name || '').startsWith('sub_')) return false;
  if ((f.callers_n || 0) < 1) return false;
  const a = parseInt(f.addr, 16);
  if (a % 4 !== 0) return false;
  return disasm[f.cpu].has(a);
});
console.log('candidates:', cands.length);

const results = [];
const skip = [];
const seenNames = new Set();
const nameCounter = {};
function uniqueName(base) {
  if (!seenNames.has(base)) { seenNames.add(base); return base; }
  const n = (nameCounter[base] = (nameCounter[base] || 1) + 1);
  return base + '_' + n;
}

for (const f of cands) {
  const addr = parseInt(f.addr, 16);
  const cpu = f.cpu;
  let body = getBody(addr, cpu);
  let text = body.map(i => i.t);
  let joined = text.join(' | ');
  let kind = null, detail = null, targetPtr = null;

  // H. return+数据尾截断: 最后一个返回指令 (bx rN/pop pc) 之后全条件后缀 = 数据池
  {
    let lastRet = -1;
    for (let idx = 0; idx < body.length; idx++) {
      if (/^bx +(r[0-9]+|ip|lr)$/.test(body[idx].t) || /^pop +\{[^}]*pc/.test(body[idx].t) || /^ldm +[^}]*\{[^}]*pc/.test(body[idx].t)) lastRet = idx;
    }
    if (lastRet >= 0 && lastRet < body.length - 1) {
      const tail = body.slice(lastRet + 1);
      const tailAllCond = tail.every(i => /^[a-z]+(eq|ne|ls|hi|lo|hs|ge|lt|gt|le|pl|mi|vc|vs) +/.test(i.t) || /^(andeq|andseq)/.test(i.t));
      if (tailAllCond && tail.length <= 4) {
        body = body.slice(0, lastRet + 1);
        text = body.map(i => i.t);
        joined = text.join(' | ');
      }
    }
  }

  // 数据噪音: svc/mcr/pld/rfed/cdp/stc/ldc/umull/rsb 等解码垃圾占比高
  const junk = body.filter(i => /^(svc|mcr|mrc|pld|rfedb|ldcl|stcl|blo|svclo|mcrhi|andeq|teqlo|tstne|ldrsht|strd|cdp2?|stc2?l?|ldc2?l?|umull|smlal|mla|mul|rsb|orrlo|orrmi|eoreq|teqmi|ldmlo|ldmiblo|stmlo|stmhi|stmia|ldmne|bgt|bllt|blo|bne|beq|ldrshteq|strbne|strbt|ldrbt|andsvc|orrmi|adcmi|rscsmi|andne)/.test(i.t));
  if (junk.length > body.length * 0.4) { skip.push({ addr: f.addr, reason: 'data-noise' }); continue; }
  // 短 body 数据噪音: 1-2 条且全部是条件指令 (随机 word 解码特征)
  if (body.length <= 2 && body.length > 0 && body.every(i => /^[a-z]+(eq|ne|ls|hi|lo|hs|ge|lt|gt|le|pl|mi|vc|vs) +/.test(i.t))) {
    skip.push({ addr: f.addr, reason: 'cond-short' }); continue;
  }
  if (body.length === 1 && (text[0] === 'bx lr' || text[0].startsWith('push {'))) {
    skip.push({ addr: f.addr, reason: 'empty-or-data' }); continue;
  }
  // addr-shift 误判: body 开头是上函数结尾 (bx lr / pop / 条件回跳) — V0.8 地址对准上函数尾
  const firstT = body[0].t;
  if (body.length >= 2 && (firstT === 'bx lr' || firstT.startsWith('pop ') ||
      /^b(ne|eq|ls|hi|lo|hs|ge|lt|gt|le|pl|mi) +#/.test(firstT))) {
    skip.push({ addr: f.addr, reason: 'addr-shift' }); continue;
  }
  // 条件后缀占比高 = 随机 word 解码 (数据区特征): 真实函数以无条件指令为主
  const cond = body.filter(i => /^[a-z]+(eq|ne|ls|hi|lo|hs|ge|lt|gt|le|pl|mi|vc|vs) +/.test(i.t));
  if (body.length >= 4 && cond.length >= body.length * 0.6) { skip.push({ addr: f.addr, reason: 'cond-data' }); continue; }

  // A. mode_getter: mrs rN, apsr + and rN, #0x1f + bx lr
  const mg = joined.match(/mrs +r([0-9]+), *apsr *\| *and +r\1, *r\1, *#0x1f *\| *bx +lr/);
  if (mg) { kind = 'mode_getter'; detail = 'apsr'; }
  // B. indirect_thunk: ldr rN,[pc] + mov 参数 + bx rN (经全局/绝对指针间接跳转)
  else {
    const bxRegs = body.filter(i => /^bx +(r[0-9]+|ip)$/.test(i.t));
    const ldrs = [];
    for (const i of body) {
      const l = ldrPcTarget(i.t);
      if (l) ldrs.push({ insn: i, ...l });
    }
    const bxReg = bxRegs.length ? bxRegs[0].t.replace('bx ', '').trim() : null;
    const targetLdrs = ldrs.filter(l => l.reg === bxReg);
    if (bxRegs.length === 1 && targetLdrs.length === 1 && body.length <= 8) {
      const l = targetLdrs[0];
      const romAddr = l.insn.a + 8 + l.imm;
      const ptr = cpu === 'arm9' ? readPtr9(romAddr) : readPtr7(romAddr);
      if (ptr !== null && ptr !== 0) {
        const ptrHex = '0x' + ptr.toString(16).padStart(8, '0');
        const nargs = body.filter(i => /^mov +r[0-9]+,/.test(i.t) || /^ldr +r[0-9]+, *\[/.test(i.t)).length;
        kind = 'indirect_thunk';
        detail = ptrHex + '_' + (nargs > 0 ? 'n' + nargs : '');
        targetPtr = ptrHex;
      }
    }
    // C. minmax/clamp: cmp rN,rM + cond mov + (bx lr 或 cond-branch lr) (<=6 insn)
    if (!kind && body.length <= 6) {
      const hasCmp = body.some(i => /^cmp +r[0-9]+, *r[0-9]+/.test(i.t));
      const condMoves = body.filter(i => /^mov(ls|hi|ge|lt|gt|le|eq|ne|lo|hs) +r[0-9]+, *r[0-9]+/.test(i.t));
      const endsLr = text[text.length - 1] === 'bx lr' || body.some(i => /^b(ls|hi|ge|lt|gt|le|eq|ne|lo|hs) +lr$/.test(i.t));
      if (hasCmp && condMoves.length >= 1 && endsLr) { kind = 'minmax'; detail = 'cmp' + condMoves.length; }
    }
    // D. bl2_wrap: stmdb + bl + bl + ... + bx lr (2 个 bl, 短)
    if (!kind && body.length <= 8) {
      const bls = body.filter(i => /^bl +/.test(i.t));
      if (bls.length === 2 && text[text.length - 1] === 'bx lr') {
        const t1 = bls[0].t.match(/bl +#(0x[0-9a-f]+)/);
        const t2 = bls[1].t.match(/bl +#(0x[0-9a-f]+)/);
        kind = 'bl2_wrap'; detail = (t1 ? t1[1] : '?') + '_' + (t2 ? t2[1] : '?');
      }
    }
    // F. cpsr_flip: mrs r0, apsr + bic/orr r1, r0, #0x80 + msr cpsr_c + and r0, r0, #0x80 + bx lr
    if (!kind && body.length <= 8) {
      const hasMrs = body.some(i => /^mrs +r[0-9]+, *apsr/.test(i.t));
      const hasMsr = body.some(i => /^msr +cpsr_c,/.test(i.t));
      const mod = body.filter(i => /^(bic|orr) +r[0-9]+, *r[0-9]+, *#0x80/.test(i.t));
      if (hasMrs && hasMsr && mod.length >= 1) {
        const isSet = mod[0].t.startsWith('orr');
        kind = 'cpsr_flip'; detail = isSet ? 'set' : 'clear';
      }
    }
    // G. field_access: str/ldr rX,[r0,#N] + bx lr (2-3 条 struct 字段读写)
    if (!kind && body.length <= 3 && text[text.length - 1] === 'bx lr') {
      const fa = body.filter(i => /^(ldr|str|ldrh|strh|ldrb|strb) +r[0-9]+, *\[r[0-9]+, *#(0x[0-9a-f]+|[0-9]+)\]/.test(i.t));
      if (fa.length >= 1) {
        const first = fa[0].t.match(/^(ldr|str|ldrh|strh|ldrb|strb) +r[0-9]+, *\[r[0-9]+, *#(0x[0-9a-f]+|[0-9]+)\]/);
        const dir = first[1].startsWith('str') ? 'setter' : 'getter';
        const off = first[2];
        const isSameBase = fa.every(i => /\[r[0-9]+, *#(0x[0-9a-f]+|[0-9]+)\]/.test(i.t));
        kind = 'field_access'; detail = dir + '_off' + off + (isSameBase ? '' : '_multi');
      }
    }
    // I. const_call: 恰好 1 个 bl + mov r0,#const (命令/操作码分发器)
    if (!kind && body.length <= 16 && text[text.length - 1] === 'bx lr') {
      const bls = body.filter(i => /^bl +/.test(i.t));
      if (bls.length === 1) {
        const constMov = [...body].reverse().find(i => /^mov +r0, *#(0x[0-9a-f]+|[0-9]+)/.test(i.t));
        if (constMov) {
          const c = constMov.t.match(/#(0x[0-9a-f]+|[0-9]+)/)[1];
          const tgt = bls[0].t.match(/bl +#(0x[0-9a-f]+)/);
          kind = 'const_call'; detail = c + '_to_' + (tgt ? tgt[1] : '?');
        }
      }
    }
    // J. wrap: 1-4 bl + 无条件分支 + 标准返回 (适配器/初始化器)
    if (!kind && body.length >= 3 && body.length <= 24) {
      const bls = body.filter(i => /^bl +/.test(i.t));
      const condB = body.filter(i => /^b(eq|ne|ge|lt|gt|le|ls|hi|lo|hs|pl|mi) +/.test(i.t));
      const last2ok = text[text.length - 1] === 'bx lr' || (text.length >= 2 && text[text.length - 2].startsWith('pop ') && text[text.length - 1] === 'bx lr');
      if (bls.length >= 1 && bls.length <= 4 && condB.length === 0 && last2ok) {
        const tgts = bls.map(b => (b.t.match(/bl +#(0x[0-9a-f]+)/) || [])[1] || '?').join('_');
        kind = 'wrap'; detail = bls.length + 'bl_' + tgts;
      }
    }
    // K. list_unlink: ldr r2,[r0] + cmp r2,#0 + beq + ldr r1,[r2,#N] + str r1,[r0] + ... + mov r0,r2
    if (!kind && body.length >= 9 && body.length <= 18) {
      const mN = joined.match(/ldr r1, \[r2, #(0x[0-9a-f]+|[0-9]+)\]/);
      if (mN && /ldr r2, \[r0\]/.test(joined) && /cmp r2, #0/.test(joined) && /str r1, \[r0\]/.test(joined) && /mov r0, r2/.test(joined) && /beq /.test(joined)) {
        kind = 'list_unlink'; detail = 'next_off' + mN[1];
      }
    }
    // L. list_relink: ldr r2,[r1,#N] + ldr r1,[r1,#M] + cmp + streq/strne 互链
    if (!kind && body.length >= 8 && body.length <= 16) {
      const m1 = joined.match(/ldr r2, \[r1, #(0x[0-9a-f]+|[0-9]+)\]/);
      const m2 = joined.match(/ldr r1, \[r1, #(0x[0-9a-f]+|[0-9]+)\]/);
      if (m1 && m2 && /streq r1, \[r0/.test(joined) && /strne r1, \[r2/.test(joined)) {
        kind = 'list_relink'; detail = 'off' + m1[1] + '_' + m2[1];
      }
    }
    // M. zero_init: 首条 mov rN,#0 + 大量 str [r0] 字段清零 + bx lr
    if (!kind && body.length >= 4 && body.length <= 16 && text[text.length - 1] === 'bx lr') {
      if (/^mov +r[0-9]+, *#0$/.test(body[0].t)) {
        const strs = body.filter(i => /^str +r[0-9]+, *\[r0/.test(i.t) || /^stm +r0!/.test(i.t));
        if (strs.length >= 3) {
          const clean = body.every(i => /^mov +r[0-9]+, *#/.test(i.t) || /^str +r[0-9]+, *\[r0/.test(i.t) || /^ldr +r[0-9]+, *\[r0/.test(i.t) || /^stm +r0!/.test(i.t) || /^bx lr$/.test(i.t));
          if (clean) { kind = 'zero_init'; detail = 'n' + strs.length; }
        }
      }
    }
    // N. stm_fill: mov rN,#const + 连续 stm r0! (块填充)
    if (!kind && body.length >= 5 && body.length <= 16 && text[text.length - 1] === 'bx lr') {
      const stms = body.filter(i => /^stm +r0!/.test(i.t));
      if (stms.length >= 3) {
        const c0 = body[0].t.match(/#(0x[0-9a-f]+|[0-9]+)/);
        const clean = body.every(i => /^mov +r[0-9]+, *#/.test(i.t) || /^stm +r0!/.test(i.t) || /^bx lr$/.test(i.t));
        if (clean) { kind = 'stm_fill'; detail = 'n' + stms.length + (c0 ? '_c' + c0[1] : ''); }
      }
    }
    // O. sp_fields_copy: 从 sp 栈参数拷贝 N 字段到 [r0]
    if (!kind && body.length >= 6 && body.length <= 16 && text[text.length - 1] === 'bx lr') {
      const strR0 = body.filter(i => /^str +r[0-9]+, *\[r0/.test(i.t));
      const ldrSp = body.filter(i => /^ldr +r[0-9]+, *\[sp/.test(i.t));
      if (strR0.length >= 4 && ldrSp.length >= 1) {
        kind = 'sp_fields_copy'; detail = 'n' + strR0.length;
      }
    }
    // P. struct_init: str r0,[r1,#4] + str #0,[r1] + cmp r0,#0 + strne r1,[r0] + mov r0,r1
    if (!kind && body.length <= 8 && text[text.length - 1] === 'bx lr') {
      if (/^str +r0, *\[r1, *#4\]/.test(joined) && /^mov +r0, *r1/.test(joined) && /str +r[0-9]+, *\[r1\]/.test(joined) && /cmp +r0, *#0/.test(joined)) {
        kind = 'struct_init'; detail = 'self_ptr';
      }
    }
    // Q. null_guarded_setter: ldr rX,[r0] + cmp rX,#0 + bxeq lr + 字段写 + bx lr
    if (!kind && body.length <= 10 && text[text.length - 1] === 'bx lr') {
      if (/^ldr +r[0-9]+, *\[r0\]/.test(body[0].t) && /^cmp +r[0-9]+, *#0$/.test(body[1].t) && /^bxeq +lr$/.test(body[2].t)) {
        const writes = body.filter(i => /^strh? +r[0-9]+, *\[r[0-9]+, *#/.test(i.t));
        if (writes.length >= 2) { kind = 'null_guarded_setter'; detail = 'n' + writes.length; }
      }
    }
    // R. struct_copy: ldr rX,[r1,#N] | str rX,[r0,#N] 成对拷贝 (>=3 对, 无条件分支)
    if (!kind && body.length >= 8 && body.length <= 80) {
      const pairs = joined.match(/ldr r[0-9]+, \[r1, #[0-9a-fx]+\] \| str r[0-9]+, \[r0, #[0-9a-fx]+\]/g);
      const condB = body.filter(i => /^b(eq|ne|ge|lt|gt|le|ls|hi|lo|hs|pl|mi) +/.test(i.t)).length;
      if (pairs && pairs.length >= 3 && condB === 0 && text[text.length - 1] === 'bx lr') {
        kind = 'struct_copy'; detail = 'n' + pairs.length;
      }
    }
    // S. multi_bl_init: 4+ bl 无条件链 + 标准返回 (多阶段初始化/收尾)
    if (!kind && body.length >= 8 && body.length <= 80) {
      const bls = body.filter(i => /^bl +/.test(i.t));
      const condB = body.filter(i => /^b(eq|ne|ge|lt|gt|le|ls|hi|lo|hs|pl|mi) +/.test(i.t)).length;
      const last2ok = text[text.length - 1] === 'bx lr' || (text.length >= 2 && text[text.length - 2].startsWith('pop ') && text[text.length - 1] === 'bx lr');
      if (bls.length >= 4 && condB === 0 && last2ok) {
        const tgts = bls.map(b => (b.t.match(/bl +#(0x[0-9a-f]+)/) || [])[1] || '?').join('_');
        kind = 'multi_bl_init'; detail = bls.length + 'bl_' + tgts;
      }
    }
    // T. io_4000138: mov ip,#0x4000000 + add ip,ip,#0x138 + bic/orr 位操作 (ARM7 keypad/JOY 寄存器族)
    if (!kind && body.length <= 40) {
      if (/mov ip, #0x4000000/.test(joined) && /add ip, ip, #0x138/.test(joined)) {
        const bic = body.find(i => /^bic +r[0-9]+, *r[0-9]+, *#(0x[0-9a-f]+|[0-9]+)/.test(i.t));
        const orr = body.find(i => /^orr +r[0-9]+, *r[0-9]+, *#(0x[0-9a-f]+|[0-9]+)/.test(i.t));
        const bv = bic ? bic.t.match(/#(0x[0-9a-f]+|[0-9]+)/)[1] : '?';
        const ov = orr ? orr.t.match(/#(0x[0-9a-f]+|[0-9]+)/)[1] : '?';
        kind = 'io_4000138'; detail = 'bic' + bv + '_orr' + ov;
      }
    }
    // E. gptr 复用 v018 (ldr [pc] + 解引用)
    if (!kind) {
      const pcLdrs = [];
      for (const i of body) {
        const l = ldrPcTarget(i.t);
        if (l) pcLdrs.push({ insn: i, ...l });
      }
      const accesses = [];
      for (const i of body) {
        const { mne, ops } = parseInsn(i.t);
        if (/^(ldr|str|ldrh|strh|ldrb|strb|ldrsh|ldrsb)$/.test(mne)) accesses.push({ mne, ops });
      }
      const deref = accesses.filter(x => /\[(r[0-9]+|ip)[,\]]/.test(x.ops));
      if (pcLdrs.length && deref.length) {
        const pl = pcLdrs[0];
        const romAddr = pl.insn.a + 8 + pl.imm;
        const ptr = cpu === 'arm9' ? readPtr9(romAddr) : readPtr7(romAddr);
        if (ptr !== null && ptr !== 0) {
          const hasWrite = accesses.some(x => x.mne.startsWith('str'));
          const hasRead = accesses.some(x => x.mne.startsWith('ldr'));
          const sizes = new Set(accesses.map(x => {
            const r = x.mne.replace('ldr', '').replace('str', '').replace('sh', '').replace('sb', '');
            return r || 'w';
          }));
          const size = sizes.size === 1 ? [...sizes][0] : 'mix';
          const ptrHex = '0x' + ptr.toString(16).padStart(8, '0');
          const dir = hasWrite && hasRead ? 'access' : (hasWrite ? 'setter' : 'getter');
          kind = 'gptr';
          detail = size + '_' + dir + '_' + ptrHex;
          targetPtr = ptrHex;
        }
      }
    }
  }

  if (kind) {
    const base = 'auto_' + kind + (detail ? '_' + detail : '');
    const name = uniqueName(base);
    results.push({
      addr: f.addr, name, pattern_kind: kind, confidence: 'high',
      callers_n: f.callers_n, category: f.category, cpu,
      disasm_snippet: text.slice(0, 6).join('|'),
      target_global_ptr: targetPtr,
    });
  } else if (body.length <= 3) {
    // 短 body 未命中: 可能是被 V0.8 误报相邻条目截断 → loose 重读再试一次
    const looseBody = getBody(addr, cpu, true);
    if (looseBody.length > body.length && looseBody.length <= 8) {
      const ltext = looseBody.map(i => i.t);
      const ljoined = ltext.join(' | ');
      let lkind = null, ldetail = null;
      // 复用 gptr 检测
      const pcLdrs = [];
      for (const i of looseBody) {
        const l = ldrPcTarget(i.t);
        if (l) pcLdrs.push({ insn: i, ...l });
      }
      const accesses = [];
      for (const i of looseBody) {
        const { mne, ops } = parseInsn(i.t);
        if (/^(ldr|str|ldrh|strh|ldrb|strb|ldrsh|ldrsb)$/.test(mne)) accesses.push({ mne, ops });
      }
      const deref = accesses.filter(x => /\[(r[0-9]+|ip)[,\]]/.test(x.ops));
      if (pcLdrs.length && deref.length) {
        const pl = pcLdrs[0];
        const romAddr = pl.insn.a + 8 + pl.imm;
        const ptr = cpu === 'arm9' ? readPtr9(romAddr) : readPtr7(romAddr);
        if (ptr !== null && ptr !== 0) {
          const hasWrite = accesses.some(x => x.mne.startsWith('str'));
          const hasRead = accesses.some(x => x.mne.startsWith('ldr'));
          const ptrHex = '0x' + ptr.toString(16).padStart(8, '0');
          const dir = hasWrite && hasRead ? 'access' : (hasWrite ? 'setter' : 'getter');
          lkind = 'gptr'; ldetail = 'w_' + dir + '_' + ptrHex;
        }
      }
      // field_access
      if (!lkind && ltext[ltext.length - 1] === 'bx lr') {
        const fa = looseBody.filter(i => /^(ldr|str|ldrh|strh|ldrb|strb) +r[0-9]+, *\[r[0-9]+, *#(0x[0-9a-f]+|[0-9]+)\]/.test(i.t));
        if (fa.length >= 1 && fa[0].t.match(/^str/)) {
          const off = fa[0].t.match(/#(0x[0-9a-f]+|[0-9]+)/)[1];
          lkind = 'field_access'; ldetail = 'setter_off' + off;
        }
      }
      if (lkind) {
        const base = 'auto_' + lkind + (ldetail ? '_' + ldetail : '');
        const name = uniqueName(base);
        results.push({
          addr: f.addr, name, pattern_kind: lkind, confidence: 'high',
          callers_n: f.callers_n, category: f.category, cpu,
          disasm_snippet: ltext.slice(0, 6).join('|'),
          target_global_ptr: lkind === 'gptr' ? ldetail.match(/0x[0-9a-f]+/)[0] : null,
        });
        continue;
      }
    }
    skip.push({ addr: f.addr, reason: 'short-' + body.length + 'insn', callers_n: f.callers_n });
  } else {
    skip.push({ addr: f.addr, reason: 'complex-' + body.length + 'insn', callers_n: f.callers_n });
  }
}

console.log('named:', results.length);
const byKind = {};
for (const r of results) byKind[r.pattern_kind] = (byKind[r.pattern_kind] || 0) + 1;
console.log('by kind:', JSON.stringify(byKind));
const byReason = {};
for (const s of skip) byReason[s.reason] = (byReason[s.reason] || 0) + 1;
console.log('skip:', skip.length, JSON.stringify(byReason));

fs.writeFileSync(dir + '/v019-pattern-remaining.json', JSON.stringify({ names: results, generated: 'V0.19 remaining detector', total: results.length, skipped: skip.length }, null, 1));
fs.writeFileSync('_v019_skip.txt', skip.map(s => s.addr + ' ' + s.reason + ' callers=' + (s.callers_n || 0)).join('\n'));
console.log('written v019-pattern-remaining.json');
