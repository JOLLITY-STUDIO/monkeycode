const fs = require('fs');

// Fix SpriteAnimationService.ts: 0x0468+i*4 → shadowOam[i*4+offset]
function fix(path, fixes) {
  let s = fs.readFileSync(path, 'utf8');
  let count = 0;
  for (const [from, to] of fixes) {
    const idx = s.indexOf(from);
    if (idx < 0) { console.log('  NOT FOUND:', path, '|', from.slice(0,80)); continue; }
    s = s.replace(from, to);
    count++;
  }
  fs.writeFileSync(path, s);
  console.log(path, '→ replaced', count, 'blocks');
}

// SpriteService.bootOamInit
fix('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/sprite/SpriteService.ts', [
  // bootOamInit
  [`  bootOamInit(): void {
    for (const e of BOOT_TECMO_OAM_TABLE) {
      const slot = e.slot & 0x3f;
      const base = 0x0468 + slot * 4;
      this.store.writeByte(base + 0, e.y & 0xff);
      this.store.writeByte(base + 1, e.tile & 0xff);
      this.store.writeByte(base + 2, e.attr & 0xff);
      this.store.writeByte(base + 3, e.x & 0xff);
    }
  }`,
   `  bootOamInit(): void {
    for (const e of BOOT_TECMO_OAM_TABLE) {
      const slot = e.slot & 0x3f;
      const base = slot * 4;
      const buf = this.store.shadowOam;
      buf[base + 0] = e.y & 0xff;
      buf[base + 1] = e.tile & 0xff;
      buf[base + 2] = e.attr & 0xff;
      buf[base + 3] = e.x & 0xff;
    }
  }`],
]);

// SpriteAnimationService: 5 处 0x0468 + slot * 4 → shadowOam 直接
const anim = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code/sprite/SpriteAnimationService.ts';
let a = fs.readFileSync(anim, 'utf8');
const animFixes = [
  ['const base = 0x0468 + slot * 4;', 'const base = slot * 4;'],
];
// tickAnimationSlot / flipSpriteAttr / orSpriteAttr / andSpriteAttr 用 base+0 / base+2
// 这些函数原本读 attr 字节 (base+2) 写到 base+2, 没问题, 但 base 已经是绝对地址了
// 现在 base = slot * 4 (shadowOam 偏移), 那么 base+0 = Y, base+1 = tile, base+2 = attr, base+3 = x
// 但所有这些函数只用 base+2 来读/写 attr, 所以 base 偏移改为 slot*4 仍然 OK
let count = 0;
for (const [from, to] of animFixes) {
  while (a.indexOf(from) >= 0) {
    a = a.replace(from, to);
    count++;
  }
}
// blinkOffscreenSprites 用的 readByte(0x0468 + i*4)
const blinkFrom = 'const y = this.store.readByte(0x0468 + i * 4) & 0xff;';
const blinkTo = 'const y = this.store.shadowOam[i * 4 + 0] & 0xff;';
if (a.indexOf(blinkFrom) >= 0) { a = a.replace(blinkFrom, blinkTo); count++; }
fs.writeFileSync(anim, a);
console.log(anim, '→ replaced', count, 'blocks');
