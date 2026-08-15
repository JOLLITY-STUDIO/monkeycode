// 模拟 6502 ROL/ROR/SBC 语义的 $CD3C 16bit 除法
// 结构:
//   $CD46: ROL 6F      (循环前一次)
//   $CD48: ROL 70
//   LDX #$10
// 循环 (16 次):
//   $CD4A: ROL 72
//   $CD4C: ROL 73
//   $CD4E: BCS $CD60    (C=1 → 无条件减)
//   $CD50: LDA 73; CMP 74; BEQ $CD5A; BCC $CD6D; BCS $CD60
//   $CD5A: LDA 72; CMP 71; BCC $CD6D (否则落 $CD60)
//   $CD60: LDA 72; SBC 71; STA 72; LDA 73; SBC 74; STA 73; SEC
//   $CD6D: ROL 6F
//   $CD6F: ROL 70
//   $CD71: DEX; BNE 循环
// 结果: 商在 72:73, 余数在 6F:70

function rol8(v, c) {
  const out = ((v << 1) | c) & 0xff;
  const newC = (v & 0x80) ? 1 : 0;
  return { v: out, c: newC };
}
function sbc(a, b, carry) {
  // SBC: result = a - b - (1-carry); new C = result >= 0
  const r = a - b - (carry ? 0 : 1);
  return { v: r & 0xff, c: r >= 0 ? 1 : 0 };
}

function div(nlo, nhi, dlo, dhi) {
  let r6F = nlo, r70 = nhi, r72 = 0, r73 = 0;
  let C = 0;

  // 循环前: ROL 6F, ROL 70
  let t = rol8(r6F, C); r6F = t.v; C = t.c;
  t = rol8(r70, C); r70 = t.v; C = t.c;

  for (let i = 0; i < 16; i++) {
    // ROL 72, ROL 73
    t = rol8(r72, C); r72 = t.v; C = t.c;
    t = rol8(r73, C); r73 = t.v; C = t.c;

    // BCS $CD60
    let doSub = C === 1;
    if (!doSub) {
      // LDA 73; CMP 74
      if (r73 > dhi) {
        doSub = true;          // BCS $CD60
      } else if (r73 === dhi) {
        // BEQ $CD5A → LDA 72; CMP 71; BCC $CD6D
        if (r72 >= dlo) doSub = true;
      }
    }

    if (doSub) {
      // 到 $CD60 的所有路径 C=1
      const s1 = sbc(r72, dlo, 1);
      r72 = s1.v; C = s1.c;
      const s2 = sbc(r73, dhi, C);
      r73 = s2.v; C = s2.c;
      C = 1; // SEC
    } else {
      C = 0;
    }

    // ROL 6F, ROL 70 (商位移入)
    t = rol8(r6F, C); r6F = t.v; C = t.c;
    t = rol8(r70, C); r70 = t.v; C = t.c;
  }
  return { qLo: r72, qHi: r73, rLo: r6F, rHi: r70 };
}

const tests = [
  [27, 0, 10, 0],
  [12345 & 0xff, (12345 >> 8) & 0xff, 10, 0],
  [255, 0, 10, 0],
  [1000 & 0xff, (1000 >> 8) & 0xff, 10, 0],
  [9, 0, 10, 0],
  [9999 & 0xff, (9999 >> 8) & 0xff, 10, 0],
  [65535 & 0xff, (65535 >> 8) & 0xff, 10, 0],
  [65535 & 0xff, (65535 >> 8) & 0xff, 65535 & 0xff, (65535 >> 8) & 0xff],
  [1000 & 0xff, (1000 >> 8) & 0xff, 100 & 0xff, (100 >> 8) & 0xff],
];
for (const [nlo, nhi, dlo, dhi] of tests) {
  const r = div(nlo, nhi, dlo, dhi);
  const n = (nhi << 8) | nlo;
  const d = (dhi << 8) | dlo;
  const q = (r.qHi << 8) | r.qLo;
  const rm = (r.rHi << 8) | r.rLo;
  const eq = q === Math.floor(n / d) && rm === n % d;
  console.log(`n=${n} d=${d} -> q=${q} r=${rm} | 期望 q=${Math.floor(n / d)} r=${n % d} ${eq ? 'OK' : 'FAIL'}`);
}
