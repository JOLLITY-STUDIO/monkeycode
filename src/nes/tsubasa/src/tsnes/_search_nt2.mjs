import fs from 'fs';
import path from 'path';

// The NT data row 12 tiles: 28 29 2C 2D 38 37 39 3C 3D
const TARGET = [0x28, 0x29, 0x2C, 0x2D, 0x38, 0x37, 0x39, 0x3C, 0x3D];

// Search with different possible formats
const FORMATS = [
  (d) => `db $${d.toString(16).toUpperCase().padStart(2,'0')}`,      // db $28
  (d) => `$${d.toString(16).toUpperCase().padStart(2,'0')}`,          // $28
  (d) => `0x${d.toString(16).padStart(2,'0')}`,                       // 0x28
  (d) => `${d},`,                                                       // 28,
  (d) => `'\\x${d.toString(16).padStart(2,'0')}'`,                    // '\x28'
];

function search(dirs, exts) {
  const allFiles = [];
  for (const dir of dirs) {
    walk(dir, allFiles, exts);
  }
  
  for (const f of allFiles) {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    
    for (let fmt of FORMATS) {
      const searchStr = TARGET.slice(0, 5).map(fmt).join(',?\\s*');
      try {
        const re = new RegExp(searchStr, 'i');
        for (let i = 0; i < lines.length; i++) {
          if (re.test(lines[i])) {
            console.log(`FOUND [${fmt(TARGET[0])}] ${f}:${i+1}`);
            console.log(`  ${lines[i].trim().substring(0, 200)}`);
            return;
          }
        }
      } catch(e) { continue; }
    }
  }
  console.log('NOT FOUND in', dirs.join(', '));
}

function walk(d, results, exts) {
  try {
    const items = fs.readdirSync(d);
    for (const item of items) {
      const p = path.join(d, item);
      if (item.startsWith('.') || item === 'node_modules') continue;
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p, results, exts);
      else if (st.isFile() && exts.some(e => p.endsWith(e))) results.push(p);
    }
  } catch(e) {}
}

// Search everywhere
search(['game-engine', 'rom-data', '_tmp_bzk_out', 'tsubasa-2asm', 'src'], ['.ts', '.asm']);
