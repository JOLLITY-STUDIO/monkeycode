/**
 * 验证 BootRouter.nmiRender() $05E8 buffer 回放 (headless):
 * 1. NT 组 ($2000) → nt0 网格 tile 连续写入 (验证 X=count+3 推进)
 * 2. 调色板组 ($3F00) → paletteTable RGB (NES 索引 → RGB)
 * 3. ram_0628 清 0
 */
const { DataStore } = require('./_tmp_out/game/prg/data/store/DataStore.js');
const { BootRouter } = require('./_tmp_out/game/prg/code/system/BootRouter.js');
const { InterruptService } = require('./_tmp_out/game/prg/code/system/InterruptService.js');
const { GameSystemService } = require('./_tmp_out/game/prg/code/system/GameSystemService.js');

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log(`PASS ${name}`); }
  else { fail++; console.log(`FAIL ${name}`); }
}

const store = new DataStore();
const system = new GameSystemService(store);
const router = new BootRouter(store);
const ints = new InterruptService(store, system);
ints.attachRouter(router);

// ── 构建 $05E8 buffer ──
// 组1: ctrl=0x04, addr=$2000, data 0x01 0x02 0x03 0x04 (NT tile)
// 组2: ctrl=0x02, addr=$3F00, data 0x0F 0x06 (调色板 BG 通用色 + 第1色)
// 终止: 0x00
const buf = [
  0x04, 0x00, 0x20, 0x01, 0x02, 0x03, 0x04,
  0x02, 0x00, 0x3F, 0x0F, 0x06,
  0x00,
];
for (let i = 0; i < buf.length; i++) {
  store.write(`ram_${(0x05E8 + i).toString(16).toUpperCase().padStart(4, '0')}`, buf[i]);
}
store.write('ram_0628', 0x01); // 有 buffer 待回放

ints.nmi(0);

// ── 验证 NT 组 ──
check('nt0[0][0].tile == 0x01', store.readNT(0, 0, 0)?.tile === 0x01);
check('nt0[0][1].tile == 0x02', store.readNT(0, 1, 0)?.tile === 0x02);
check('nt0[0][2].tile == 0x03', store.readNT(0, 2, 0)?.tile === 0x03);
check('nt0[0][3].tile == 0x04', store.readNT(0, 3, 0)?.tile === 0x04);
// 组2 不应写 NT (地址 $3F00 是调色板)
check('nt0[0][4].tile == 0 (调色板组不污染 NT)', store.readNT(0, 4, 0)?.tile === 0);

// ── 验证调色板组 ──
// 0x0F → NES_NTSC_RGB[15] = 0x000000 (黑色/通用色)
const c0 = store.paletteTable.bgPalettes[0].colors[0];
check('bg[0].colors[0] == RGB(0x0F)=black', c0.r === 0 && c0.g === 0 && c0.b === 0);
// 0x06 → NES_NTSC_RGB[6] = 0x00005F
const c1 = store.paletteTable.bgPalettes[0].colors[1];
check('bg[0].colors[1] == RGB(0x06)=0x00005F', c1.r === 0 && c1.g === 0 && c1.b === 0x5f);

// ── 验证 ram_0628 清 0 ──
check('ram_0628 == 0 (buffer 回放后清标志)', store.read('ram_0628') === 0);

// ── 验证 $2800 基址 → nt1 (水平镜像布局) ──
const buf2 = [0x02, 0x00, 0x28, 0x77, 0x78, 0x00];
for (let i = 0; i < buf2.length; i++) {
  store.write(`ram_${(0x05E8 + i).toString(16).toUpperCase().padStart(4, '0')}`, buf2[i]);
}
store.write('ram_0628', 0x01);
ints.nmi(1);
check('nt1[0][0].tile == 0x77 ($2800 → nt1)', store.readNT(1, 0, 0)?.tile === 0x77);
check('nt1[0][1].tile == 0x78', store.readNT(1, 1, 0)?.tile === 0x78);

console.log(`\n=== RESULT: ${pass} PASS / ${fail} FAIL ===`);
process.exit(fail === 0 ? 0 : 1);
