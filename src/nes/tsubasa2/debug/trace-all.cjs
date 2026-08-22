/**
 * trace-all.cjs — 跑 300 帧, trace 所有硬件寄存器写入 + CPU 指令
 *
 * 输出文件:
 *   debug/trace/cpu.log    — CPU 指令 (trackCPU)
 *   debug/trace/oam.log    — OAM 写入
 *   debug/trace/nt.log     — NT/属性表写入
 *   debug/trace/palette.log — 调色板写入
 *   debug/trace/pt.log     — pattern table 写入
 *   debug/trace/audio.log  — 音频寄存器写入
 *   debug/trace/ppu_regs.log — PPU 控制寄存器写入
 */
const fs = require('fs');
const path = require('path');

// 加载 tsnes (路径: tsubasa2/debug/ → 上两级 → tsnes/_build)
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;

// ROM 路径 (tsubasa2/docs/roms/)
const romPath = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const romData = fs.readFileSync(romPath);

// 创建 NES 实例
const nes = new NES();
nes.loadROM(romData);

// 创建输出目录 (tsubasa2/debug/trace/)
const outDir = path.resolve(__dirname, 'trace');
fs.mkdirSync(outDir, { recursive: true });

// 文件输出流
const files = {
  cpu: fs.createWriteStream(path.join(outDir, 'cpu.log')),
  oam: fs.createWriteStream(path.join(outDir, 'oam.log')),
  nt: fs.createWriteStream(path.join(outDir, 'nt.log')),
  palette: fs.createWriteStream(path.join(outDir, 'palette.log')),
  pt: fs.createWriteStream(path.join(outDir, 'pt.log')),
  audio: fs.createWriteStream(path.join(outDir, 'audio.log')),
  ppu_regs: fs.createWriteStream(path.join(outDir, 'ppu_regs.log')),
};

// 每个类别一个 Tracer 实例 (因为 traceWrite 里按 opts 过滤)
// 但 Tracer.start 只能启动一个。我们需要多个 Tracer。
// 方案: 创建 7 个 Tracer, 每个只跟踪一个类别。
const tracers = [];
const configs = [
  { name: 'cpu', opts: { trackCPU: true, callback: (l) => files.cpu.write(l + '\n') } },
  { name: 'oam', opts: { trackCPU: false, trackOAM: true, callback: (l) => files.oam.write(l + '\n') } },
  { name: 'nt', opts: { trackCPU: false, trackNT: true, callback: (l) => files.nt.write(l + '\n') } },
  { name: 'palette', opts: { trackCPU: false, trackPalette: true, callback: (l) => files.palette.write(l + '\n') } },
  { name: 'pt', opts: { trackCPU: false, trackPT: true, callback: (l) => files.pt.write(l + '\n') } },
  { name: 'audio', opts: { trackCPU: false, trackAudio: true, callback: (l) => files.audio.write(l + '\n') } },
  { name: 'ppu_regs', opts: { trackCPU: false, trackPPURegs: true, callback: (l) => files.ppu_regs.write(l + '\n') } },
];

// 问题: nes.tracer 是单个实例。CPU.write() 只调 nes.tracer.traceWrite。
// 我们需要让一个 Tracer 同时跟踪所有类别, 然后按类别写到不同文件。
// 方案: 用一个 Tracer, opts 包含所有 trackXxx=true, callback 按行首 [CATEGORY] 分发。

const allCategories = '[CPU] [OAM] [NT_WRITE] [NT_ADDR] [PAL_WRITE] [PAL_ADDR] [PT_WRITE] [PT_ADDR] [AUDIO] [PPU_REG]';

// 启动单个 Tracer, 跟踪所有类别
nes.tracer.start(nes, {
  trackCPU: true,
  trackOAM: true,
  trackNT: true,
  trackPalette: true,
  trackPT: true,
  trackAudio: true,
  trackPPURegs: true,
  maxLines: 500000, // 限制总行数防止过大
  callback: (line) => {
    // 按行首 [CATEGORY] 分发到对应文件
    if (line.startsWith('[OAM]')) files.oam.write(line + '\n');
    else if (line.startsWith('[NT_WRITE]') || line.startsWith('[NT_ADDR]')) files.nt.write(line + '\n');
    else if (line.startsWith('[PAL_WRITE]') || line.startsWith('[PAL_ADDR]')) files.palette.write(line + '\n');
    else if (line.startsWith('[PT_WRITE]') || line.startsWith('[PT_ADDR]')) files.pt.write(line + '\n');
    else if (line.startsWith('[AUDIO]')) files.audio.write(line + '\n');
    else if (line.startsWith('[PPU_REG]')) files.ppu_regs.write(line + '\n');
    else files.cpu.write(line + '\n'); // CPU 指令 (无前缀)
  },
});

console.log('Tracer started, running 300 frames...');

// 跑 300 帧
const FRAME_COUNT = 300;
for (let i = 0; i < FRAME_COUNT; i++) {
  nes.frame();
  if ((i + 1) % 50 === 0) {
    console.log(`  frame ${i + 1}/${FRAME_COUNT}`);
  }
}

// 停止 tracer
nes.tracer.stop();

// 关闭文件流
for (const key in files) {
  files[key].end();
}

// 统计行数
console.log('\n=== Trace 完成, 统计行数 ===');
for (const key in files) {
  const filePath = path.join(outDir, key + '.log');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(l => l.length > 0);
    console.log(`  ${key}.log: ${lines.length} 行`);
  } catch(e) {
    console.log(`  ${key}.log: 读取失败`);
  }
}
console.log('\n输出目录: ' + outDir);
