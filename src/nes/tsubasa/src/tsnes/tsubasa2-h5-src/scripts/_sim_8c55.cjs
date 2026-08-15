// 模拟 $C51E (16位除法) + $8C55 (数字渲染) 验证数字顺序
const ram = new Uint8Array(0x100);
const set = (a, v) => { ram[a & 0xff] = v & 0xff; };
const get = (a) => ram[a & 0xff] & 0xff;

// $C51E: 被除数 (ram_006F:0070), 除数 (ram_0071:0074)
// → 商 (ram_0072:0073), 余数 (ram_006F:0070)
function c51e() {
  set(0x72, 0); set(0x73, 0);
  let carry = 0;
  for (let i = 0; i < 16; i++) {
    // ROL 006F / 0070 / 0072 / 0073 (低位在前)
    for (const a of [0x6f, 0x70, 0x72, 0x73]) {
      const v = get(a);
      const c = (v >> 7) & 1;
      set(a, ((v << 1) | carry) & 0xff);
      carry = c;
    }
    let sub = false;
    if (carry) sub = true;
    else {
      const qh = get(0x73), dh = get(0x74);
      const ql = get(0x72), dl = get(0x71);
      if (qh > dh || (qh === dh && ql >= dl)) sub = true;
    }
    if (sub) {
      // SBC (carry=1)
      const r = get(0x72) - get(0x71) - 1;
      set(0x72, r & 0xff);
      const c2 = r < 0 ? 0 : 1;
      const r2 = get(0x73) - get(0x74) - (1 - c2);
      set(0x73, r2 & 0xff);
      carry = 1;
    } else {
      carry = 0;
    }
    // ROL 006F / 0070 (remainder LSB = carry)
    for (const a of [0x6f, 0x70]) {
      const v = get(a);
      const c = (v >> 7) & 1;
      set(a, ((v << 1) | carry) & 0xff);
      carry = c;
    }
  }
}

// $8C55(A=lo, X=hi) → 渲染数字 (模拟: 记录写入序列, ram_003D 位置)
function r8c55(a, x, pos) {
  set(0x6f, a); set(0x70, x);
  set(0x71, 10); set(0x74, 0);
  let out = [];
  let p = pos;
  for (;;) {
    c51e();
    const q = get(0x72);
    // 写商 (A=q)
    out.push({ pos: p, ch: q + 0x33 });
    p--;
    const rh = get(0x70), rl = get(0x6f);
    if (rh !== 0) continue;
    if (rl === 0) break;
    if (rl >= 10) continue;
    out.push({ pos: p, ch: rl + 0x33 });
    p--;
    break;
  }
  return out;
}

const fs = require('fs');
const lines = [];
try {
for (const v of [0, 5, 9, 10, 11, 12, 45, 54, 99, 100, 123]) {
  const out = r8c55(v, 0, 20);
  out.sort((a, b) => a.pos - b.pos);
  const s = out.map(o => String.fromCharCode(o.ch)).join('');
  lines.push(`V=${v} -> 写入${JSON.stringify(out)} -> "${s}"`);
}
} catch (e) {
  lines.push('ERROR: ' + (e && e.stack || e));
}
lines.push('TOTAL ' + lines.length);
fs.writeFileSync(require('path').join(__dirname, '_sim_8c55_out.txt'), lines.join('\n'));
