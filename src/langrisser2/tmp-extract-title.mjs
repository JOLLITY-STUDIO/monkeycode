import fs from 'fs';

const src = fs.readFileSync('game-old/data/TitleScreenData.ts', 'utf8');

function extract(name) {
  const re = new RegExp(`export const ${name} = new Uint8Array\\(\\[([\\s\\S]*?)\\]\\);`);
  const m = src.match(re);
  if (!m) throw new Error('not found: ' + name);
  return `export const ${name} = new Uint8Array([${m[1]}]);`;
}

const out = `// Auto-generated from game-old/data/TitleScreenData.ts
// Title screen extracted data (VRAM/CRAM ready)

${extract('TITLE_CRAM')}

${extract('TITLE_NAMETABLE_A')}

${extract('TITLE_NAMETABLE_B')}
`;

fs.mkdirSync('game/data', { recursive: true });
fs.writeFileSync('game/data/TitleScreenData.ts', out);
console.log('game/data/TitleScreenData.ts created');
