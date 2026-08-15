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
    if (Cc) { let t = m72 - m71; m72 = t & 0xff; t = m73 - m74 - (t < 0 ? 1 : 0); m73 = t & 0xff; C = 1; }
    else C = 0;
    m6F = rol(m6F); m70 = rol(m70);
    X--;
  } while (X !== 0);
  return { m6F, m70, m72, m73 };
}

// 连续输入 0..40 / 10, 观察输出规律
for (let n = 0; n <= 40; n++) {
  const r = div(n & 0xff, (n >> 8) & 0xff, 10, 0);
  const low = (r.m70 << 8) | r.m6F;
  const rem = r.m72;
  console.log(`${String(n).padStart(3)}/10 → 6F:70=${low.toString(16).padStart(4, '0')} (bin=${low.toString(2).padStart(16, '0')}) 72=${rem.toString(16)} | q=${Math.floor(n / 10)} r=${n % 10}`);
}
