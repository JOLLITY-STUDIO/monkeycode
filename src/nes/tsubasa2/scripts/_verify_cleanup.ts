/**
 * _verify_cleanup.ts — 验证 Scene0 Cleanup 阶段:
 *   - hideOam: shadowOam + $0200 全 0xF8
 *   - clearNametable: $2000-$27FF 全 0
 *   - fillNametableRows(0xc0,0x23,2,0x20,0x55): $23C0-$23FF = 0x55
 *   - loadSceneData(1): r79=0x40, r7b=0x80 (OPENING_SCENE_TABLE[1])
 *   - 场景切到 2
 *
 * 注意：$23C0 0x55 填充是 Cleanup(f472) 的瞬时状态，f473 changeScene(2)
 * 会按 ROM 语义清 $2000-$23FF（BootRouter.changeScene），因此需在
 * 切换前（f472 末）采样填充，再跑一帧验证切换。
 */
import * as fs from 'fs';
import * as path from 'path';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const store = game.store;

const ppu: any = runtime.ppu;

/** 采样当前 VRAM $2000-$27FF 状态 */
function sampleNT(tag: string): any {
  let ntNonZero = 0;
  const ntSample: Record<string, number> = {};
  for (let a = 0x2000; a <= 0x27ff; a++) {
    const v = ppu.vramMem[a] ?? 0;
    if (v !== 0) {
      ntNonZero++;
      if (ntSample[a] === undefined) ntSample[a] = v;
    }
  }
  const attr = new Array<number>(0x40);
  let attrOk = true;
  for (let i = 0; i < 0x40; i++) {
    const v = ppu.vramMem[0x23c0 + i] ?? 0;
    attr[i] = v;
    if (v !== 0x55) attrOk = false;
  }
  console.log(
    `[${tag}] frame=${store.frame} scene=${store.readByte(0x00ed)}` +
      ` r79=${store.readByte(0x0079)} r7b=${store.readByte(0x007b)}` +
      ` oam[0]=${store.oam.shadowOam[0]} NT非零=${ntNonZero}` +
      ` attr23C0填充=${attrOk ? 'OK' : 'FAIL'}(${attr[0]?.toString(16)})`,
  );
  return { tag, ntNonZero, ntSampleFirst: Object.entries(ntSample).slice(0, 5), attr };
}

const report: any = {};
report.samples = [];

// 跑到 Cleanup 执行帧（frame 472）结束：共 473 帧调用（store.frame 为正在处理的帧号）
for (let f = 0; f < 473; f++) game.frame(runtime);

// 采样 Cleanup 后状态（frame 472 处理完：hideOam + 清 NT + $23C0-$23FF 0x55）
report.samples.push(sampleNT('f472'));

// Cleanup 后状态（f472 末）
const s = report.samples[report.samples.length - 1];
report.cleanup = {
  scene: store.readByte(0x00ed),
  r79: store.readByte(0x0079),
  r7b: store.readByte(0x007b),
  shadowOam0: store.oam.shadowOam[0],
  shadowOam255: store.oam.shadowOam[255],
  ntNonZero: s.ntNonZero,
  attrFillOk: s.attr.every((v: number) => v === 0x55),
};

// 再跑直到场景切换（LoadBlock1 + 切 Scene2），最多 5 帧
let switchedAt = -1;
for (let f = 0; f < 5; f++) {
  game.frame(runtime);
  if (store.readByte(0x00ed) === 2) {
    switchedAt = store.frame;
    break;
  }
}
report.switchedAt = switchedAt;
report.afterSwitch = {
  scene: store.readByte(0x00ed),
  r79: store.readByte(0x0079),
  r7b: store.readByte(0x007b),
  shadowOam0: store.oam.shadowOam[0],
};
let afterNtNonZero = 0;
for (let a = 0x2000; a <= 0x27ff; a++) if ((ppu.vramMem[a] ?? 0) !== 0) afterNtNonZero++;
report.afterSwitch.ntNonZero = afterNtNonZero;

fs.writeFileSync(path.join(__dirname, '..', 'output', 'scene0-h5-cleanup.json'), JSON.stringify(report, null, 2));
console.log('Cleanup: scene=', report.cleanup.scene, 'r79=', report.cleanup.r79, 'r7b=', report.cleanup.r7b,
  'shadowOam[0]=', report.cleanup.shadowOam0, 'shadowOam[255]=', report.cleanup.shadowOam255,
  'NT非零=', report.cleanup.ntNonZero, 'attr0x55=', report.cleanup.attrFillOk);
console.log('切换后: scene=', report.afterSwitch.scene, 'r79=', report.afterSwitch.r79,
  'r7b=', report.afterSwitch.r7b, 'oam[0]=', report.afterSwitch.shadowOam0,
  'NT非零=', report.afterSwitch.ntNonZero, '切换帧=', report.switchedAt);
