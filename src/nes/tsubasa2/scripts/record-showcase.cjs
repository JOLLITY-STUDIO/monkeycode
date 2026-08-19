/**
 * 无界面录制: Bank30 $043C 演出链 → 逐帧 PNG → ffmpeg → mp4
 *
 * 流程:
 *   1. tsc -p tsconfig.play.json 编译 src → _test_out (CommonJS)
 *   2. 无头 new Tsubasa2() → prepare() (RESET→Bank30 init→Boot 根场景)
 *   3. 时间线驱动 043C 演出链: entry_D67C / entry_D717 / triggerShowcase(0x46) /
 *      entry_D7E8 / entry_D792 — 每帧 stepFrame() 推进逻辑+合成帧
 *   4. 捕获帧 → 叠加 HUD(演出链真实状态) + 真实演出画面 (Bank26 executor → ShowcaseView)
 *   5. 写 PNG (零依赖编码) → ffmpeg 编码 showcase-043c.mp4 (60fps, 512×480)
 *
 * 用法: node scripts/record-showcase.cjs
 */
'use strict';

// 颜色常量必须在任何帧回调触发前初始化 (TDZ: const 提升死区)
const COL_WHITE = 0xFFFFFF;
const COL_YELLOW = 0xFFFF00;
const COL_CYAN = 0x00FFFF;
const COL_RED = 0xFF4040;
const COL_GREEN = 0x40FF40;

const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const { execFileSync, spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, '_test_out');
const FRAMES_DIR = path.join(ROOT, 'tmp-frames');
const MP4_PATH = path.join(ROOT, 'showcase-043c.mp4');
const LOG_PATH = path.join(ROOT, 'record_run.log');

/** 日志 (文件 + 控制台) — 规避 shell 重定向/编码问题 */
function log(msg) {
  const line = `[${new Date().toISOString().slice(11, 19)}] ${msg}`;
  try { fs.appendFileSync(LOG_PATH, line + '\n', 'utf8'); } catch (_) { /* ignore */ }
  console.log(line);
}
process.on('uncaughtException', (e) => {
  log('UNCAUGHT: ' + (e && e.stack ? e.stack : String(e)));
  process.exit(1);
});

const W = 256;
const H = 240;
const FPS = 60;
const TOTAL_FRAMES = 660; // 11 秒

// ═══════════════════════════════════════════════════════════
// 1. 编译 TS → _test_out
// ═══════════════════════════════════════════════════════════
log('tsc -p tsconfig.play.json …');
// npx.cmd 在 PowerShell 下不稳定, 直接调本地 tsc
const TSC = path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
execFileSync(process.execPath, [TSC, '-p', 'tsconfig.play.json'], { cwd: ROOT, stdio: 'inherit' });
log('tsc OK');

// ═══════════════════════════════════════════════════════════
// 2. 无头加载游戏
// ═══════════════════════════════════════════════════════════
const { Tsubasa2 } = require(path.join(OUT, 'core/Tsubasa2.js'));
const game = new Tsubasa2();
game.prepare();
log('prepare() OK, root=' + game.store.read('boot_root'));

const store = game.store;
const bank30 = game.bank30;

// ═══════════════════════════════════════════════════════════
// 3. 演出时间线 (帧号 → 触发链)
// ═══════════════════════════════════════════════════════════

/** 构造 $D76B 状态检查所需的名字区 (ram_0034 指针 → $0601/$0602 有差) */
function setupNameArea() {
  store.write('ram_0034', 0x00);
  store.write('ram_0035', 0x06);   // ptr = $0600
  store.write('ram_0601', 0x0f);   // 名字区坐标 X (相对 ram_043F)
  store.write('ram_0602', 0x0f);   // 名字区坐标 Y (相对 ram_0440)
  store.write('ram_043F', 0x00);   // 差值参考清零 → $D76B 判负触发
  store.write('ram_0440', 0x00);
}

/** 清背景 + 场景精灵,让演出单独呈现 (演示隔离用) */
function cleanStage() {
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 32; x++) {
      const blank = { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false };
      store.nt0[y][x] = blank;
      store.nt1[y][x] = blank;
    }
  }
  store.oamShadow.clearAll();
  store.oamShadow.clearHw();
  store.oam.reset();
  store.scrollX = 0;
  store.scrollY = 0;
}

/** 加载 ROM 演出调色板 (Bank31 $FBCC 表) — 真实配色 */
function setupDemoPalette() {
  const { nesColorToRGBA } = require(path.join(OUT, 'game/data/ppu/pallete/paletteManager.js'));
  const { SHOWCASE_PALETTE_TABLE, SHOWCASE_PALETTE_DEFAULT } = require(path.join(OUT, 'game/data/showcase-palette.js'));
  const pal = SHOWCASE_PALETTE_TABLE[SHOWCASE_PALETTE_DEFAULT];
  for (let p = 0; p < 4; p++) {
    for (let c = 0; c < 4; c++) {
      const col = nesColorToRGBA(pal[p * 4 + c] ?? 0x0f);
      store.writeSprColor(p, c, { r: col.r, g: col.g, b: col.b, a: col.a });
    }
  }
  // BG palette 0 纯黑底
  for (let c = 0; c < 4; c++) {
    store.writeBgColor(0, c, { r: 0, g: 0, b: 0, a: 255 });
  }
}

/** 普通射门 (skill 0x00) 初始化: 大空翼特写块 (ram_043B=0 → D6DE→block0) */
function setupNormalShot() {
  store.write('ram_043B', 0x00);   // 演出类型: 0 → block0 (大空翼)
  store.write('ram_043C', 0x00);   // skill 0x00 Normal
  store.write('ram_044E', 0x00);   // 替换源 (043C<3 时用) → 保持普通
  store.write('ram_0448', 0x00);   // Cyclone 触发标志清零
  setupNameArea();
}

const timeline = [
  { f: 200, label: 'D67C 普通射门主链',      fn: () => { cleanStage(); setupDemoPalette(); setupNormalShot(); bank30.entry_D67C(); } },
  { f: 300, label: 'D717 特写判定→#3D',       fn: () => { cleanStage(); setupDemoPalette(); setupNormalShot(); bank30.entry_D717(); } },
  { f: 400, label: 'D7E8 演出#38',            fn: () => { cleanStage(); setupDemoPalette(); setupNormalShot(); bank30.entry_D7E8(); } },
  { f: 500, label: 'D792 判定链 (skill 0x00→无特殊)', fn: () => {
    cleanStage(); setupDemoPalette(); setupNormalShot();
    bank30.entry_D792();
  } },
  { f: 600, label: 'D67C 重触发 (球飞出)',   fn: () => { cleanStage(); setupDemoPalette(); setupNormalShot(); bank30.entry_D67C(); } },
];

/** 当前演出可视化状态 (HUD 用) */
let activeShow = 0;      // 当前演出 ID (0=无)
let activeFrame = 0;     // 已播帧数
let lastLabel = '';

// ═══════════════════════════════════════════════════════════
// 3.5 PNG 编码 (零依赖: zlib.deflateSync + 手写 CRC32)
// ═══════════════════════════════════════════════════════════

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = (crc ^ buf[i]) & 0xff;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

/** Uint32Array (0xRRGGBB) → PNG Buffer */
function bufToPng(buf, w, h) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // color type: truecolor RGB
  // 每扫描行: filter byte 0 + w×3 像素
  const raw = Buffer.alloc(h * (1 + w * 3));
  for (let y = 0; y < h; y++) {
    const rowOff = y * (1 + w * 3);
    for (let x = 0; x < w; x++) {
      const v = buf[y * w + x];
      const o = rowOff + 1 + x * 3;
      raw[o] = (v >> 16) & 0xff;
      raw[o + 1] = (v >> 8) & 0xff;
      raw[o + 2] = v & 0xff;
    }
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ═══════════════════════════════════════════════════════════
// 4. 帧捕获 hook: 触发时间线 → 叠加 HUD → 写 PNG
// ═══════════════════════════════════════════════════════════
fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
fs.mkdirSync(FRAMES_DIR, { recursive: true });

game.onFrameCapture = (buf, w, h, index) => {
  const frame = index;

  // ── 时间线触发 ──
  for (const t of timeline) {
    if (frame === t.f) {
      try {
        t.fn();
        activeShow = store.read('ram_0518');
        activeFrame = 0;
        lastLabel = t.label;
        log(`f=${frame} 触发: ${t.label} → 0518=0x${activeShow.toString(16).toUpperCase()}`);
      } catch (e) {
        log(`f=${frame} ${t.label} 触发异常: ${e && e.message ? e.message : e}`);
      }
    }
  }
  activeFrame++;

  // ── HUD 覆盖层 (读真实链状态) ──
  drawHud(buf, frame);

  // ── 真实演出画面: 由游戏管线渲染 (Bank26 executor → ShowcaseView → 合成帧)
  // 已替换 drawBurst 占位爆发动画

  // ── 写 PNG ──
  fs.writeFileSync(path.join(FRAMES_DIR, `frame-${String(frame).padStart(6, '0')}.png`), bufToPng(buf, w, h));
};

// ═══════════════════════════════════════════════════════════
// HUD 绘制 (5×7 位图字体 + 演出链状态)
// ═══════════════════════════════════════════════════════════

function setPx(buf, x, y, color) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  buf[y * W + x] = color;
}

const FONT = {
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
  '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  '1': ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  '2': ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  '3': ['#####', '...#.', '..#..', '...#.', '....#', '#...#', '.###.'],
  '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  '5': ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  '6': ['.###.', '#....', '#....', '####.', '#...#', '#...#', '.###.'],
  '7': ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  '8': ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  '9': ['.###.', '#...#', '#...#', '.####', '....#', '....#', '.###.'],
  'A': ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  'B': ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  'C': ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  'D': ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  'E': ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  'F': ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  'G': ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.###.'],
  'H': ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  'I': ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  'J': ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  'K': ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  'L': ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  'M': ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  'N': ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  'O': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  'P': ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  'Q': ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  'R': ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  'S': ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  'T': ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  'U': ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  'V': ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  'W': ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
  'X': ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  'Y': ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  'Z': ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  '#': ['.#.#.', '.#.#.', '#####', '.#.#.', '#####', '.#.#.', '.#.#.'],
  '=': ['.....', '.....', '#####', '.....', '#####', '.....', '.....'],
  '(': ['..#..', '.#...', '.#...', '.#...', '.#...', '.#...', '..#..'],
  ')': ['..#..', '...#.', '...#.', '...#.', '...#.', '...#.', '..#..'],
  ':': ['.....', '..#..', '..#..', '.....', '..#..', '..#..', '.....'],
  '/': ['....#', '....#', '...#.', '..#..', '.#...', '#....', '#....'],
  '<': ['...#.', '..#..', '.#...', '#....', '.#...', '..#..', '...#.'],
  '>': ['.#...', '..#..', '...#.', '....#', '...#.', '..#..', '.#...'],
  '-': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
  '_': ['.....', '.....', '.....', '.....', '.....', '.....', '#####'],
  '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
  '!': ['..#..', '..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
  '.': ['.....', '.....', '.....', '.....', '.....', '..#..', '..#..'],
  ',': ['.....', '.....', '.....', '.....', '..#..', '..#..', '.#...'],
};

function drawText(buf, text, x, y, color) {
  let cx = x;
  for (const ch of String(text)) {
    const g = FONT[ch] || FONT[' '];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        if (g[r][c] === '#') setPx(buf, cx + c, y + r, color);
      }
    }
    cx += 6;
  }
}

function hex(v, w = 2) {
  return (v & 0xff).toString(16).toUpperCase().padStart(w, '0');
}

/** 读取演出链真实状态并绘制 HUD */
function drawHud(buf, frame) {
  const root = store.read('boot_root');
  const r516 = store.read('ram_0516');
  const r518 = store.read('ram_0518');
  const r43B = store.read('ram_043B');
  const r43C = store.read('ram_043C');
  const r44E = store.read('ram_044E');
  const ptr = ((store.read('ram_005E') & 0xff) << 8) | (store.read('ram_005D') & 0xff);
  const cur = store.read('ram_003A');
  const p523 = store.read('ram_0523');
  const p524 = store.read('ram_0524');
  const p528 = store.read('ram_0528');
  const p529 = store.read('ram_0529');
  const busy = (r516 & 0x80) !== 0;

  // HUD 放底部,避免遮挡脸部特写 (y=34~50)
  const BY = 170;
  drawText(buf, '043C SHOWCASE CHAIN  RAM 043C:XX', 8, BY, COL_YELLOW);
  drawText(buf, `FRAME=${String(frame).padStart(4, '0')} ROOT=${root} @${FPS}FPS`, 8, BY + 8, COL_WHITE);

  // 链状态
  const showText = activeShow !== 0 ? `#${hex(activeShow)} ACTIVE` : 'IDLE';
  drawText(buf, `SHOW=${showText}  BUSY=${busy ? 1 : 0}  0516=${hex(r516)}`, 8, BY + 18, busy ? COL_RED : COL_GREEN);

  drawText(buf, `043B=${hex(r43B)} 043C=${hex(r43C)} 044E=${hex(r44E)} 0518=${hex(r518)}`, 8, BY + 28, COL_CYAN);
  drawText(buf, `PTR=$${hex((ptr >> 8) & 0xff)}${hex(ptr & 0xff)}+${hex(cur)}`, 8, BY + 38, COL_WHITE);
  drawText(buf, `SKILL 0523=${hex(p523)} 0524=${hex(p524)} 0528=${hex(p528)} 0529=${hex(p529)}`, 8, BY + 48, COL_WHITE);

  if (lastLabel) {
    drawText(buf, `TRIGGER: ${lastLabel}`, 8, BY + 60, COL_YELLOW);
  }

  // 状态栏: 演出链阶段指示 (数据驱动, 非装饰)
  const stage = busy ? (activeShow !== 0 ? 'EXECUTING-SCRIPT' : 'REQUESTED') : 'WAITING';
  drawText(buf, `CHAIN-STAGE=${stage}`, 8, BY + 70, busy ? COL_RED : COL_GREEN);
}

// ═══════════════════════════════════════════════════════════
// 5. 驱动 (放在所有 const/函数声明之后, 规避 TDZ)
// ═══════════════════════════════════════════════════════════
log(`录制 ${TOTAL_FRAMES} 帧 (${TOTAL_FRAMES / FPS}s) …`);
for (let f = 0; f < TOTAL_FRAMES; f++) {
  game.stepFrame();
  if (f % 120 === 0) log(`frame ${f}`);
}

// ═══════════════════════════════════════════════════════════
// 6. ffmpeg → mp4
// ═══════════════════════════════════════════════════════════
const ff = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
if (ff.status !== 0) {
  log('ffmpeg 不可用: ' + ((ff.stderr || '').split('\n')[0] || 'no-ffmpeg'));
  process.exit(2);
}
log('ffmpeg 可用, 编码 mp4 …');
const args = [
  '-y',
  '-framerate', String(FPS),
  '-i', path.join(FRAMES_DIR, 'frame-%06d.png'),
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-preset', 'fast',
  '-crf', '20',
  '-vf', 'scale=512:480:flags=neighbor',
  MP4_PATH,
];
const enc = spawnSync('ffmpeg', args, { cwd: ROOT, encoding: 'utf8' });
if (enc.status !== 0) {
  log('ffmpeg 编码失败: ' + (enc.stderr || '').split('\n').slice(-6).join('\n'));
  process.exit(3);
}
log(`完成 → ${path.relative(ROOT, MP4_PATH)} (${(fs.statSync(MP4_PATH).size / 1024).toFixed(0)} KB)`);
