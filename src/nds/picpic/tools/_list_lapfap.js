const fs = require('fs');
const walk = (p, d) => {
  if (d > 3) return;
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    const list = fs.readdirSync(p);
    for (const f of list.slice(0, 8)) {
      const np = p + '/' + f;
      if (fs.statSync(np).isDirectory()) {
        console.log('[D]', np.slice('roms/extracted/'.length));
        walk(np, d + 1);
      } else console.log('    ', np.slice('roms/extracted/'.length), fs.statSync(np).size);
    }
  }
};
for (const d of ['lap_d', 'fap_d']) {
  console.log('==', d);
  walk('roms/extracted/' + d, 0);
}
