function div(lo, hi, dLo, dHi) {
  let m6F = lo, m70 = hi, m71 = dLo, m74 = dHi, m72 = 0, m73 = 0;
  let C = 0;
  const rol = (v) => { const c = (v >> 7) & 1; const r = ((v << 1) | C) & 0xff; C = c; return r; };
  let X = 0x10;
  do {
    m6F = rol(m6F); m70 = rol(m70); m72 = rol(m72); m73 = rol(m73);
    let Cc = 0;
    if (C === 1) Cc = 1;
    else if (m73 > m74 || (m73 === m74 && m72 >= m71)) Cc = 1;
    if (Cc) {
      let t = m72 - m71;
      m72 = t & 0xff;
      t = m73 - m74 - (t < 0 ? 1 : 0);
      m73 = t & 0xff;
      C = 1;
    } else C = 0;
    m6F = rol(m6F); m70 = rol(m70);
    X--;
  } while (X !== 0);
  return { m6F, m70, m72, m73 };
}

const cases = [
  [0x02, 0x01, 10, 0], // 258 / 10 = 25 r 8
  [10, 0, 10, 0], // 10/10 = 1 r 0
  [123, 0, 10, 0], // 12 r 3
  [0xff, 0x7f, 10, 0], // 32767 / 10 = 3276 r 7
  [0, 0, 10, 0], // 0
  [0x63, 0, 60, 0], // 99/60 = 1 r 39
];
for (const [lo, hi, dLo, dHi] of cases) {
  const r = div(lo, hi, dLo, dHi);
  const num = (hi << 8) | lo;
  const d = (dHi << 8) | dLo;
  const q = (r.m70 << 8) | r.m6F;
  const rem = (r.m73 << 8) | r.m72;
  const eq = `quot=${q} rem=${rem}`;
  const exp = `quot=${Math.floor(num / d)} rem=${num % d}`;
  console.log(`num=${num}/${d}: 6F:70=${r.m6F.toString(16)}:${r.m70.toString(16)} 72:73=${r.m72.toString(16)}:${r.m73.toString(16)} → ${eq} | 期望 ${exp} | ${eq === exp ? 'OK' : 'MISMATCH'}`);
}
