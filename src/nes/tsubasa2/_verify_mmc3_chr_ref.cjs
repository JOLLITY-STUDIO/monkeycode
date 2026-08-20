// MMC3 CHR bank 参考实现校验: 模拟器写序列重放 → 参考状态机 → 逐帧比对
// 1) 单测: 已知命令序列 → 期望 chrBanks
// 2) 集成: tsnes 跑 N 帧, hook $8000/$8001 写, 重放进 Mmc3ChrReference, 每帧比对 chrBanks
const path = require('path');
const fs = require('fs');
const OUT = path.join(__dirname, '_test_out');

const { Mmc3ChrReference } = require(path.join(OUT, 'game/data/ppu/chr/mmc3-chr-reference.js'));
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');

let pass = 0, fail = 0;
function assert(cond, msg) {
  if (cond) { pass++; console.log('  PASS: ' + msg); }
  else { fail++; console.log('  FAIL: ' + msg); }
}
function hex(v, n = 2) { return v.toString(16).padStart(n, '0').toUpperCase(); }

// ═══ 1. 单测: 命令语义 ═══
console.log('\n═══ 1. MMC3 CHR 命令语义单测 ═══');
{
  const r = new Mmc3ChrReference();
  // cmd0: $8000 选命令0 (chrAddressSelect=0) → $8001 写 slot0/1
  r.write(0x8000, 0x00, 0);
  r.write(0x8001, 0x71, 0);
  assert(r.chrBanks[0] === 0x71 && r.chrBanks[1] === 0x72, 'cmd0 slot0/1=71/72, 实际 ' + Array.from(r.chrBanks).map(hex).join(' '));

  // cmd1: slot2/3
  r.write(0x8000, 0x01, 0);
  r.write(0x8001, 0x52, 0);
  assert(r.chrBanks[2] === 0x52 && r.chrBanks[3] === 0x53, 'cmd1 slot2/3=52/53');

  // cmd2-5: 单 slot
  r.write(0x8000, 0x02, 0); r.write(0x8001, 0xFC, 0);
  r.write(0x8000, 0x03, 0); r.write(0x8001, 0x00, 0);
  r.write(0x8000, 0x04, 0); r.write(0x8001, 0x14, 0);
  r.write(0x8000, 0x05, 0); r.write(0x8001, 0x20, 0);
  assert(r.chrBanks[4] === 0xFC && r.chrBanks[5] === 0x00 && r.chrBanks[6] === 0x14 && r.chrBanks[7] === 0x20,
    'cmd2-5 slots=FC/00/14/20, 实际 ' + Array.from(r.chrBanks).map(hex).join(' '));

  // chrAddressSelect=1: cmd0 写到 slot4/5
  r.write(0x8000, 0x80, 0); // command=0 + chrAddressSelect=1
  assert(r.chrAddressSelect === 1, 'chrAddressSelect=1');
  r.write(0x8001, 0x99, 0);
  assert(r.chrBanks[4] === 0x99 && r.chrBanks[5] === 0x9A, 'select=1 时 cmd0 → slot4/5=99/9A');

  // PRG cmd 6/7 不应改 CHR
  const before = Array.from(r.chrBanks);
  r.write(0x8000, 0x06, 0); r.write(0x8001, 0x10, 0);
  r.write(0x8000, 0x07, 0); r.write(0x8001, 0x11, 0);
  assert(Array.from(r.chrBanks).every((v, i) => v === before[i]), 'PRG cmd6/7 不影响 CHR');

  // reset
  r.reset();
  assert(Array.from(r.chrBanks).every(v => v === 0), 'reset 后全部 slot=0');
  assert(r.writeLog.length === 0, 'reset 清空写日志');
}

// ═══ 2. mapToH5 委托 ═══
console.log('\n═══ 2. mapToH5 翻译校验 ═══');
{
  const r = new Mmc3ChrReference();
  r.write(0x8000, 0x00, 0);
  r.write(0x8001, 0x00, 0); // slot0/1=0/1
  r.write(0x8000, 0x01, 0);
  r.write(0x8001, 0x02, 0); // slot2/3=2/3
  r.write(0x8000, 0x02, 0); r.write(0x8001, 0xFC, 0); // slot4=FC
  r.write(0x8000, 0x03, 0); r.write(0x8001, 0x71, 0); // slot5=71
  r.write(0x8000, 0x04, 0); r.write(0x8001, 0x52, 0); // slot6=52
  r.write(0x8000, 0x05, 0); r.write(0x8001, 0x53, 0); // slot7=53
  // BOOT 场景: NT tile → bank0 原样
  const nt = r.mapToH5(0x03, 0);
  assert(nt && nt.bank === 0 && nt.tile === 0x03, 'NT tile 0x03 → H5 bank0 tile03, 实际 ' + JSON.stringify(nt));
  // SPR tile 0x40-0x7F → slot5=71 → bank14
  const sp1 = r.mapToH5(0x50, 1);
  assert(sp1 && sp1.bank === 14, 'SPR tile 0x50 → H5 bank14, 实际 ' + JSON.stringify(sp1));
  // SPR tile 0x80-0xBF → slot6=52 → bank10
  const sp2 = r.mapToH5(0x90, 1);
  assert(sp2 && sp2.bank === 10, 'SPR tile 0x90 → H5 bank10, 实际 ' + JSON.stringify(sp2));
}

// ═══ 3. 集成: tsnes 重放比对 ═══
console.log('\n═══ 3. tsnes 集成: 写序列重放 → chrBanks 逐帧比对 ═══');
{
  const nes = new NES({ emulateSound: false, sampleRate: 0 });
  nes.loadROM(fs.readFileSync(path.join(__dirname, 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

  const ref = new Mmc3ChrReference();
  let totalWrites = 0, mismatchedFrames = 0, frameCount = 30;

  // hook mmap.write: 抓 $8000/$8001 → 喂参考
  const origWrite = nes.mmap.write.bind(nes.mmap);
  nes.mmap.write = (addr, value) => {
    if ((addr & 0xe001) === 0x8000 || (addr & 0xe001) === 0x8001) {
      ref.write(addr, value, 0);
      totalWrites++;
    }
    return origWrite(addr, value);
  };

  const mismatches = [];
  for (let f = 0; f < frameCount; f++) {
    nes.frame();
    const emu = nes.mmap.chrBanks;
    if (!ref.matches(emu)) {
      mismatchedFrames++;
      if (mismatches.length < 5) {
        mismatches.push(`frame${f}: ref=${ref.snapshot().digest} emu=${Array.from(emu).map(hex).join('')}`);
      }
    }
  }

  console.log(`  MMC3 写次数: ${totalWrites} ($8000/$8001)`);
  console.log(`  最终 ref chrBanks: ${ref.snapshot().digest}`);
  console.log(`  最终 emu chrBanks: ${Array.from(nes.mmap.chrBanks).map(hex).join('')}`);
  if (mismatches.length) console.log('  前5处不一致: ' + mismatches.join('; '));
  assert(mismatchedFrames === 0, `30 帧 chrBanks 全一致 (不一致帧=${mismatchedFrames}/${frameCount})`);
  assert(totalWrites > 0, `捕获到 MMC3 CHR 寄存器写 (${totalWrites} 次)`);
}

console.log(`\nMMC3 CHR REFERENCE: PASS=${pass} FAIL=${fail}`);
process.exit(fail > 0 ? 1 : 0);
