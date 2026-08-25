const fs = require('fs');
const path = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/sprite/SpriteService.ts';
let s = fs.readFileSync(path, 'utf8');
const fixes = [
  // getSpriteY
  [`  getSpriteY(slot: number): number {\n    if (slot < 0 || slot >= 64) return 0;\n    return this.store.readByte(0x0468 + slot * 4);\n  }`,
   `  getSpriteY(slot: number): number {\n    if (slot < 0 || slot >= 64) return 0;\n    return this.store.shadowOam[slot * 4 + 0];\n  }`],
  // getSpriteX
  [`  getSpriteX(slot: number): number {\n    if (slot < 0 || slot >= 64) return 0;\n    return this.store.readByte(0x046b + slot * 4);\n  }`,
   `  getSpriteX(slot: number): number {\n    if (slot < 0 || slot >= 64) return 0;\n    return this.store.shadowOam[slot * 4 + 3];\n  }`],
  // getSpriteAttr
  [`  getSpriteAttr(slot: number): number {\n    if (slot < 0 || slot >= 64) return 0;\n    return this.store.readByte(0x046a + slot * 4);\n  }`,
   `  getSpriteAttr(slot: number): number {\n    if (slot < 0 || slot >= 64) return 0;\n    return this.store.shadowOam[slot * 4 + 2];\n  }`],
];
for (const [from, to] of fixes) {
  if (!s.includes(from)) { console.log('NOT FOUND:', from.slice(0,80)); continue; }
  s = s.replace(from, to);
  console.log('replaced 1 block');
}
fs.writeFileSync(path, s);
