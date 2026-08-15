function div(lo, hi, dLo, dHi, debug) {
  let m6F = lo, m70 = hi, m71 = dLo, m74 = dHi, m72 = 0, m73 = 0;
  let C = 0;
  const rol = (v) => { const c = (v >> 7) & 1; const r = ((v << 1) | C) & 0xff; C = c; return r; };
  let X = 0x10;
  let iter = 0;
  do {
    iter++;
    m6F = rol(m6F); m70 = rol(m70); m72 = rol(m72); m73 = rol(m73);
    let Cc = 0;
    if (C === 1) Cc = 1;
    else if (m73 > m74 || (m73 === m74 && m72 >= m71)) Cc = 1;
    if (Cc) { m72 = (m72 - m71) & 0xff; m73 = (m73 - m74) & 0xff; C = 1; }
    else C = 0;
    m6F = rol(m6F); m70 = rol(m70);
    if (debug) console.log(`iter${iter}: 6F=${m6F.toString(16).padStart(2, '0')} 70=${m70.toString(16).padStart(2, '0')} 72=${m72.toString(16).padStart(2, '0')} 73=${m73.toString(16).padStart(2, '0')} C=${C} sub=${Cc}`);
    X--;
  } while (X !== 0);
  return { m6F, m70, m72, m73 };
}

console.log('=== 258/10 ===');
let r = div(0x02, 0x01, 10, 0, true);
console.log('result:', JSON.stringify(r), 'quot(6F:70)=', (r.m70 << 8) | r.m6F, 'rem(72:73)=', (r.m73 << 8) | r.m72);
