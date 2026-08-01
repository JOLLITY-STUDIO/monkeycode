const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'game-engine/native-game/tsubasa/banks/prg/bank-22-sprite-engine-data.ts');
const c = fs.readFileSync(filePath, 'utf8');

// 提取所有 hex 值: 每个 DATA_ 段的起始地址通过注释头识别
const view = new Array(0x2000).fill(0xFF);
const lines = c.split('\n');
let currentStart = -1;
let inArray = false;
let vals = [];

for (const line of lines) {
  // 检测段头: /** $XXXX-$YYYY, ... */
  const seg = line.match(/\*\* (\$[0-9A-F]+)-(\$[0-9A-F]+)/);
  if (seg) {
    currentStart = parseInt(seg[1].replace('$', ''), 16);
    inArray = false;
    vals = [];
    continue;
  }
  // 数组开始
  if (currentStart >= 0 && line.includes('= [')) {
    inArray = true;
    continue;
  }
  // 收集 hex
  if (inArray) {
    const hexes = line.match(/0x[0-9A-Fa-f]+/g);
    if (hexes) vals.push(...hexes.map(v => parseInt(v)));
    // 数组结束
    if (line.trim() === '];') {
      const off = currentStart - 0x8000;
      for (let i = 0; i < vals.length; i++) {
        view[off + i] = vals[i];
      }
      console.log(`$ ${currentStart.toString(16).toUpperCase()}: ${vals.length} bytes @ ${off.toString(16).toUpperCase()}`);
      inArray = false;
      currentStart = -1;
    }
  }
}

function v(off) { return view[off & 0x1FFF]; }

// 验证 pointer table
console.log('\n=== 指针表 $8280 ===');
for (let i = 0; i < 5; i++) {
  const lo = v(0x0280 + i * 2);
  const hi = v(0x0280 + i * 2 + 1);
  const ptr = (hi << 8) | lo;
  console.log(`  #${i}: ptr=$${ptr.toString(16).toUpperCase()} → off=0x${(ptr-0x8000).toString(16).toUpperCase()}`);
}

// 解码字节码函数
function decodeLayout(targetOff) {
  const results = [];
  let o = targetOff;
  let depth = 20;
  while (o < 0x1FFF && depth-- > 0) {
    const ctrl = v(o);
    const cnt = ctrl & 7;
    o++;
    if (cnt === 0) {
      const deltaY = v(o); o++;
      const gc = (ctrl >> 3) & 7;
      const entries = [];
      for (let i = 0; i <= gc; i++) {
        const xAttr = v(o); o++;
        const tile = v(o); o++;
        entries.push({ x: '0x'+xAttr.toString(16).padStart(2,'0').toUpperCase(),
                       t: '0x'+tile.toString(16).padStart(2,'0').toUpperCase() });
      }
      results.push({ type:'GRP', dy:'0x'+deltaY.toString(16).toUpperCase(), e:entries });
    } else if (cnt === 1) {
      results.push({ type:'END' }); break;
    } else if (cnt === 2) {
      const jmp = (v(o+1)<<8)|v(o);
      results.push({ type:'JMP', t:'0x'+jmp.toString(16).toUpperCase() });
      o += 2;
    } else if (cnt === 3) {
      results.push({ type:'ANM', d:'0x'+v(o).toString(16).toUpperCase() });
      o++;
    } else {
      const entries = [];
      for (let i = 0; i < cnt; i++) {
        const xAttr = v(o); o++;
        const tile = v(o); o++;
        entries.push({ x:'0x'+xAttr.toString(16).padStart(2,'0').toUpperCase(),
                       t:'0x'+tile.toString(16).padStart(2,'0').toUpperCase() });
      }
      results.push({ type:'OAM', n:cnt, e:entries });
    }
  }
  return results;
}

// 解码前几个 layout
for (let idx = 0; idx < 5; idx++) {
  const lo = v(0x0280 + idx * 2);
  const hi = v(0x0280 + idx * 2 + 1);
  if (lo === 0xFF && hi === 0xFF) continue;
  const ptr = (hi << 8) | lo;
  const off = ptr - 0x8000;
  console.log(`\n=== layout#${idx} $${ptr.toString(16).toUpperCase()} ===`);
  const decoded = decodeLayout(off);
  for (const d of decoded) {
    if (d.e) {
      const tiles = d.e.map(e => e.t).join(', ');
      console.log(`  ${d.type}: ${tiles}`);
    } else {
      console.log(`  ${JSON.stringify(d)}`);
    }
  }
}

// 直接搜索 tile $50-$5F (标题 OAM 用到的)
console.log('\n=== 搜索 Tile=$50-$5F 在 view 中的位置 ===');
for (let o = 0; o < 0x2000; o++) {
  const b = v(o);
  if (b >= 0x50 && b <= 0x5F) {
    const prev = o > 0 ? v(o - 1) : -1;
    // tile 总是跟在 xAttr 后面 (xAttr bits 7-2 通常非零)
    if ((prev & 0xFC) !== 0) {
      console.log(`  $${(0x8000+o).toString(16).toUpperCase()}: xAttr=0x${prev.toString(16).padStart(2,'0').toUpperCase()} tile=0x${b.toString(16).padStart(2,'0').toUpperCase()}`);
    }
  }
  if (b >= 0xE5 && b <= 0xFF) {
    const prev = o > 0 ? v(o - 1) : -1;
    if ((prev & 0xFC) !== 0) {
      console.log(`  $${(0x8000+o).toString(16).toUpperCase()}: xAttr=0x${prev.toString(16).padStart(2,'0').toUpperCase()} tile=0x${b.toString(16).padStart(2,'0').toUpperCase()} (PAL#4/8)`);
    }
  }
}
