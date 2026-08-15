const fs = require('fs');

function analyze(f) {
  const b = fs.readFileSync(f);
  const h = b[0], w = b[1];
  const body = b.slice(6);
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const n = (i & 1) ? (body[i >> 1] >> 4) : (body[i >> 1] & 0x0F);
      row.push(n);
    }
    grid.push(row);
  }

  // 统计每个非0值的邻居分布
  const neighborStats = {};
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = grid[y][x];
      if (v === 0) continue;
      if (!neighborStats[v]) neighborStats[v] = { count: 0, sameNeighbors: 0, diffNeighbors: 0, zeroNeighbors: 0 };
      const s = neighborStats[v];
      s.count++;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = y + dy, nx = x + dx;
          if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;
          const nv = grid[ny][nx];
          if (nv === v) s.sameNeighbors++;
          else if (nv === 0) s.zeroNeighbors++;
          else s.diffNeighbors++;
        }
      }
    }
  }

  console.log('\nFile:', f.split('/').pop());
  console.log('Value stats:');
  for (const v of Object.keys(neighborStats).sort((a,b)=>+a-+b)) {
    const s = neighborStats[v];
    const total = s.sameNeighbors + s.diffNeighbors + s.zeroNeighbors;
    console.log('  %s: count=%d same=%.1f%% diff=%.1f%% zero=%.1f%%',
      v, s.count, s.sameNeighbors/total*100, s.diffNeighbors/total*100, s.zeroNeighbors/total*100);
  }

  // 检查 1-3 和 8-11 是否互补（同一位置不会同时出现）
  let overlap = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = grid[y][x];
      if (v >= 1 && v <= 3) {
        // 检查8-11是否在附近
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
              const nv = grid[ny][nx];
              if (nv >= 8 && nv <= 11) overlap++;
            }
          }
        }
      }
    }
  }
  console.log('Overlap (1-3 near 8-11):', overlap);

  // 检查值是否分层：低3位相同的值是否相邻
  const lowBits = {};
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = grid[y][x];
      if (v === 0) continue;
      const lb = v & 0x07;
      if (!lowBits[lb]) lowBits[lb] = { count: 0, has8: 0, no8: 0 };
      lowBits[lb].count++;
      if (v & 0x08) lowBits[lb].has8++;
      else lowBits[lb].no8++;
    }
  }
  console.log('Low bits (0x07):');
  for (const lb of Object.keys(lowBits).sort((a,b)=>+a-+b)) {
    const s = lowBits[lb];
    console.log('  %s: total=%d with8=%d no8=%d', lb, s.count, s.has8, s.no8);
  }
}

analyze('roms/extracted/map_d/4000101_Cat & mouse.map');
analyze('roms/extracted/map_d/4000201_House.map');
