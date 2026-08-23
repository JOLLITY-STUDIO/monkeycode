// 扫描 H5 GameSystemService/BootRouter 是否实现 bank0 渲染子程: 98EA 98A0 9B28 9B5E 992C 985C 994F 982F 9B7F 98EF
const fs = require('fs');
const path = require('path');

const files = [
  'src/game/prg/code/system/GameSystemService.ts',
  'src/game/prg/code/system/BootRouter.ts',
  'src/game/prg/code/system/HardwareInitService.ts',
];
const targets = ['98EA', '98A0', '9B28', '9B5E', '992C', '985C', '994F', '982F', '9B7F', '98EF', '98EC', '98F6', '99F0', '9A0D', '9B07', '9AB8', '9ADA'];

for (const f of files) {
  const p = path.join(__dirname, '..', f);
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  console.log(`\n=== ${f} ===`);
  for (let i = 0; i < lines.length; i++) {
    for (const t of targets) {
      if (lines[i].includes(t)) {
        console.log(`${i + 1}: ${lines[i].trim().slice(0, 110)}`);
      }
    }
  }
}
