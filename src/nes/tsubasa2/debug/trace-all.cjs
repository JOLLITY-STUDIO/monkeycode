/**
 * trace-all.cjs — tsnes trace 工具 (v2: 分段跑 + 场景状态日志 + 按键脚本)
 *
 * 用法:
 *   node debug/trace-all.cjs [总帧数] [每段帧数] [--keys=按键脚本]
 *
 * 示例:
 *   node debug/trace-all.cjs 600 100                      # 600 帧, 每 100 帧一段
 *   node debug/trace-all.cjs 900 150 --keys="start:350,a:390,start:430"
 *
 * 按键脚本格式: "键名:帧号,键名:帧号,..." 在指定帧按下并保持 8 帧
 *   键名: a/b/select/start/up/down/left/right
 *
 * 输出 (debug/trace/):
 *   cpu_seg%03d.log   — CPU 指令 (每段一个文件, 段内 i 从 0 重新计数)
 *   oam/nt/palette/pt/audio/ppu_regs.log — 硬件寄存器写入 (append 累积)
 *   scene.log         — 每帧一行: 帧号 | 场景 ram_00ED | R6/R7 bank 映射 | 主循环 PC
 *   summary.log       — 每段结束时的场景变化汇总
 */
const fs = require('fs');
const path = require('path');

// ── 参数解析 ──
const args = process.argv.slice(2);
let FRAME_COUNT = 300;
let SEG_FRAMES = 60;
const keysScript = [];
for (const a of args) {
  if (a.startsWith('--keys=')) {
    const spec = a.slice(7).split(',');
    for (const s of spec) {
      if (!s.trim()) continue;
      const [k, f] = s.trim().split(':');
      keysScript.push({ key: k.trim(), frame: parseInt(f, 10) });
    }
  } else if (/^\d+$/.test(a)) {
    if (FRAME_COUNT === 300 && args.indexOf(a) === 0) FRAME_COUNT = parseInt(a, 10);
    else if (!/^\d+$/.test(args[args.indexOf(a) - 1] || '')) SEG_FRAMES = parseInt(a, 10);
  }
}
// 更稳妥的参数解析
const nums = args.filter((a) => /^\d+$/.test(a));
if (nums.length >= 1) FRAME_COUNT = parseInt(nums[0], 10);
if (nums.length >= 2) SEG_FRAMES = parseInt(nums[1], 10);

// ── 按键常量 ──
const KEY_IDS = { a: 0, b: 1, select: 2, start: 3, up: 4, down: 5, left: 6, right: 7 };
const KEY_HOLD_FRAMES = 8;

// ── 加载 tsnes ──
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;

const romPath = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const romData = fs.readFileSync(romPath);

const nes = new NES({ emulateSound: false });
nes.loadROM(romData);

// ── 输出目录 ──
const outDir = path.resolve(__dirname, 'trace');
fs.mkdirSync(outDir, { recursive: true });

// 硬件日志用 append 模式 (跨段累积); CPU 日志每段一个文件
function hwStream(name) {
  return fs.createWriteStream(path.join(outDir, name + '.log'), { flags: 'a' });
}
const hwFiles = { oam: null, nt: null, palette: null, pt: null, audio: null, ppu_regs: null };
for (const k in hwFiles) hwFiles[k] = hwStream(k);

const sceneLog = fs.createWriteStream(path.join(outDir, 'scene.log'), { flags: 'w' });
const summaryLog = fs.createWriteStream(path.join(outDir, 'summary.log'), { flags: 'w' });

// ── 每段启动一个 Tracer (CPU 指令量巨大, 必须分段) ──
let seg = 0;
let cpuStream = null;
let segStartFrame = 0;

function startSegment(frame) {
  seg++;
  segStartFrame = frame;
  cpuStream = fs.createWriteStream(path.join(outDir, `cpu_seg${String(seg).padStart(3, '0')}.log`));
  const segEnd = Math.min(frame + SEG_FRAMES - 1, FRAME_COUNT - 1);
  summaryLog.write(`=== 段 ${seg}: 帧 ${frame}-${segEnd} (i 从 0 计数) ===\n`);
  nes.tracer.start(nes, {
    trackCPU: true,
    trackOAM: true,
    trackNT: true,
    trackPalette: true,
    trackPT: true,
    trackAudio: true,
    trackPPURegs: true,
    maxLines: 3000000, // 每段最多 300 万行 (60 帧 CPU ≈ 65 万行, 足够)
    callback: (line) => {
      if (line.startsWith('[OAM]')) hwFiles.oam.write(line + '\n');
      else if (line.startsWith('[NT_WRITE]') || line.startsWith('[NT_ADDR]')) hwFiles.nt.write(line + '\n');
      else if (line.startsWith('[PAL_WRITE]') || line.startsWith('[PAL_ADDR]')) hwFiles.palette.write(line + '\n');
      else if (line.startsWith('[PT_WRITE]') || line.startsWith('[PT_ADDR]')) hwFiles.pt.write(line + '\n');
      else if (line.startsWith('[AUDIO]')) hwFiles.audio.write(line + '\n');
      else if (line.startsWith('[PPU_REG]')) hwFiles.ppu_regs.write(line + '\n');
      else cpuStream.write(line + '\n');
    },
  });
}

function endSegment() {
  nes.tracer.stop();
  cpuStream.end();
}

// ── 按键脚本 ──
function applyKeys(frame) {
  const pending = [];
  for (const k of keysScript) {
    if (k.frame === frame) {
      const id = KEY_IDS[k.key];
      if (id !== undefined) {
        if (k._up) {
          nes.buttonUp(1, id);
        } else {
          nes.buttonDown(1, id);
          // 安排释放 (保持 KEY_HOLD_FRAMES 帧)
          pending.push({ key: k.key, frame: frame + KEY_HOLD_FRAMES, _up: true });
        }
      }
    }
  }
  for (const p of pending) keysScript.push(p);
}

// ── 每帧场景状态 ──
function logScene(frame) {
  let scene = -1, r6 = -1, r7 = -1, pc = -1;
  try {
    scene = nes.cpu.load(0x00ED) & 0xff;
  } catch (e) { /* ignore */ }
  try {
    const map = nes.mmap.getPrgBankMap ? nes.mmap.getPrgBankMap() : nes.mmap.prgBankMap;
    if (map) {
      r6 = map[0x8000] ?? -1;
      r7 = map[0xA000] ?? -1;
    }
  } catch (e) { /* ignore */ }
  try {
    pc = nes.cpu.REG_PC & 0xffff;
  } catch (e) { /* ignore */ }
  const keyMark = keysScript.some((k) => !k._up && k.frame === frame) ? '  <== 按键' : '';
  sceneLog.write(
    `F${String(frame).padStart(4, '0')} scene=$${scene.toString(16).padStart(2, '0').toUpperCase()}` +
    ` r6=${String(r6).padStart(2, '0')} r7=${String(r7).padStart(2, '0')} pc=$${pc.toString(16).padStart(4, '0').toUpperCase()}${keyMark}\n`
  );
  return scene;
}

// ── 主循环 ──
console.log(`Tracer started: ${FRAME_COUNT} 帧, 每 ${SEG_FRAMES} 帧一段${keysScript.length ? ', 按键: ' + keysScript.map(k => k.key + '@' + k.frame).join(' ') : ''}`);

let prevScene = -1;
const sceneChanges = [];
for (let f = 0; f < FRAME_COUNT; f++) {
  if (f % SEG_FRAMES === 0) {
    if (seg > 0) endSegment();
    startSegment(f);
  }
  applyKeys(f);
  nes.frame();
  const sc = logScene(f);
  if (prevScene !== -1 && sc !== prevScene) {
    sceneChanges.push(`帧 ${f}: scene $${prevScene.toString(16).toUpperCase()} → $${sc.toString(16).toUpperCase()}`);
    summaryLog.write(`场景切换: ${sceneChanges[sceneChanges.length - 1]}\n`);
  }
  prevScene = sc;
  if ((f + 1) % 100 === 0) console.log(`  frame ${f + 1}/${FRAME_COUNT} scene=$${sc.toString(16).toUpperCase()}`);
}
endSegment();

// ── 收尾 ──
for (const k in hwFiles) hwFiles[k].end();
sceneLog.end();
summaryLog.end();

console.log('\n=== Trace 完成 ===');
console.log('场景切换:' + (sceneChanges.length ? '' : ' (无)'));
for (const c of sceneChanges.slice(0, 50)) console.log('  ' + c);
console.log('\n输出: debug/trace/ (cpu_seg*.log + 硬件日志 + scene.log)');
console.log('按键事件: ' + keysScript.map(k => (k._up ? 'up ' : 'down ') + k.key + '@' + k.frame).join(', '));
