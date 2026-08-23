const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);
// bank 13 = ROM offset 0x1A000
const b13 = prg.slice(0x1A000, 0x1A000 + 0x2000);
console.log('bank13 805E (offset 0x5E):', Array.from(b13.slice(0x5E, 0x62)).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
// 如果也是 CA 10 xx (DEX; BPL)，说明 bank13 也包含这个循环代码
// bank13 是引擎代码后 8KB，可能 $805E 在两个 bank 中都有

// 实际上 MMC3 的 R6 切换 $8000-$9FFF
// bank 12 和 bank 13 是连续的 16KB
// bank 12 = $8000-$9FFF, bank 13 = $A000-$BFFF（通过 R7 固定）
// 但 MMC3 R6 写 $0D 时，$8000-$9FFF = PRG bank 13
// PRG bank 13 = ROM offset 0x1A000
// bank 13 的 $805E = offset 0x5E

// 检查 bank 13 是否包含与 bank 12 相同的 $805E 代码
const b12 = prg.slice(0x18000, 0x18000 + 0x2000);
console.log('bank12 805E:', Array.from(b12.slice(0x5E, 0x62)).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
console.log('bank13 805E:', Array.from(b13.slice(0x5E, 0x62)).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
console.log('相同?', b12[0x5E] === b13[0x5E] && b12[0x5F] === b13[0x5F]);

// 如果不同，说明 SE 路径切换 bank 后 $805E 指向不同代码
// bank 13 的 $805E 可能也是 DEX; BPL 循环（因为 bank13 也包含引擎代码）
// 或者是数据

// 检查 bank 7 的 $805E
const b7 = prg.slice(0xE000, 0xE000 + 0x2000);
console.log('bank7 805E:', Array.from(b7.slice(0x5E, 0x62)).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));

// 总结
console.log('\n=== 结论 ===');
console.log('原版 $8000 BGM 路径: 用 $07FC 值写 $8001');
console.log('  首次 $07FC=0 → MMC3 bank 0 = PRG bank 0 (不是 bank12)');
console.log('  但 MMC3 R6 bank 0 = PRG bank 0 = ROM offset 0');
console.log('  PRG bank 0 是固定区 ($C000-$FFFF 的镜像?)');
console.log('  或者 MMC3 bank value 有偏移');

// MMC3 mapper 4 的 PRG bank switch:
// R6 value 直接 = PRG bank index (0-31)
// 但 MMC3 有 256KB PRG = 32 个 8KB bank
// bank 0 = ROM offset 0 = $C000-$FFFF 固定区的前半

// 实际上 NES PRG 布局:
// $C000-$FFFF = 固定区 (通常是最后两个 8KB bank = bank 30+31)
// $8000-$9FFF = R6 切换
// $A000-$BFFF = R7 切换

// 所以 MMC3 R6 写 $00 → $8000-$9FFF = PRG bank 0
// PRG bank 0 = ROM offset 0 = NES ROM 的第一个 8KB
// 这通常是 Reset 向量所在的代码

// 但天使之翼2 的音频引擎在 bank 12
// 如果 $07FC 初始值 = 0, BGM 路径切到 bank 0
// bank 0 的 $805E 是什么？
const b0 = prg.slice(0, 0x2000);
console.log('\nbank0 805E:', Array.from(b0.slice(0x5E, 0x62)).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
