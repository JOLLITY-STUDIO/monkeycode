/**
 * trace-opening.cjs — 跟踪完整开场动画: 从启动到自动播放结束 (reset 场景切换时停止)
 *
 * 跟踪内容: CPU 指令 + MMC3 bank 切换 + NT/Palette/OAM/PPURegs 写入
 * 停止条件: ram_00ED 从开场值变化到标题场景 (ram_00ED=0 或 ram_0026 变化)
 *
 * 输出:
 *   debug/trace/opening-cpu.log     — CPU 指令 (最多 200 万行)
 *   debug/trace/opening-mmc3.log    — MMC3 bank 切换
 *   debug/trace/opening-nt.log      — NT 写入
 *   debug/trace/opening-palette.log — 调色板写入
 *   debug/trace/opening-oam.log     — OAM 写入
 *   debug/trace/opening-ppu.log     — PPU 寄存器
 *   debug/trace/opening-summary.txt — 摘要
 */
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
const romData = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
nes.loadROM(romData);

const outDir = path.resolve(__dirname, 'trace');
fs.mkdirSync(outDir, { recursive: true });

// 文件流
const files = {
  cpu: fs.createWriteStream(path.join(outDir, 'opening-cpu.log')),
  mmc3: fs.createWriteStream(path.join(outDir, 'opening-mmc3.log')),
  nt: fs.createWriteStream(path.join(outDir, 'opening-nt.log')),
  palette: fs.createWriteStream(path.join(outDir, 'opening-palette.log')),
  oam: fs.createWriteStream(path.join(outDir, 'opening-oam.log')),
  ppu: fs.createWriteStream(path.join(outDir, 'opening-ppu.log')),
};

// 启动 tracer — 跟踪所有类别
nes.tracer.start(nes, {
  trackCPU: true,
  trackMMC3: true,
  trackNT: true,
  trackPalette: true,
  trackOAM: true,
  trackPPURegs: true,
  maxLines: 2000000, // 最多 200 万行
  callback: (line) => {
    if (line.startsWith('[MMC3]')) files.mmc3.write(line + '\n');
    else if (line.startsWith('[NT_WRITE]') || line.startsWith('[NT_ADDR]')) files.nt.write(line + '\n');
    else if (line.startsWith('[PAL_WRITE]') || line.startsWith('[PAL_ADDR]')) files.palette.write(line + '\n');
    else if (line.startsWith('[OAM]')) files.oam.write(line + '\n');
    else if (line.startsWith('[PPU_REG]')) files.ppu.write(line + '\n');
    else files.cpu.write(line + '\n'); // CPU 指令 (无前缀)
  },
});

// 开场动画检测: ram_00ED 变化序列 = 2→0→7→B8→BF→(标题)
// 停止条件: ram_00ED 回到 0 (标题场景) 或 ram_0026 变化 (进入标题)
let prevED = -1;
let edHistory = [];
let frameCount = 0;
let stopped = false;
const MAX_FRAMES = 6000; // 最多 6000 帧 (100秒) 防止无限运行

console.log('Tracing opening animation... (stop on scene change to title)');

for (let i = 0; i < MAX_FRAMES && !stopped; i++) {
  nes.frame();
  frameCount++;

  // 检查 ram_00ED 变化
  const ed = nes.cpu.mem[0x00ED] ?? 0;
  if (ed !== prevED) {
    edHistory.push({ frame: frameCount, ed });
    console.log(`  frame ${frameCount}: ram_00ED = ${ed} (0x${ed.toString(16).toUpperCase()})`);
    prevED = ed;

    // 开场序列: 2 → 0 → 7 → B8 → BF → (下一帧回到 0 或标题)
    // 当 ram_00ED 从 BF 变回 0 时, 开场动画结束
    if (edHistory.length >= 4) {
      const seq = edHistory.slice(-3).map(e => e.ed);
      // BF → 0 表示开场结束进标题
      if (seq[0] === 0xBF && seq[2] === 0x00) {
        console.log('  → 开场动画结束! (ram_00ED: BF→0)');
        stopped = true;
      }
    }
  }

  // 也检查 ram_0026 (比赛阶段/章节) 变化
  if (frameCount > 100) {
    const t26 = nes.cpu.mem[0x0026] ?? 0;
    if (t26 !== 0 && !stopped) {
      // ram_0026 非 0 表示进入了某个游戏阶段
      console.log(`  frame ${frameCount}: ram_0026 = ${t26} (进入游戏阶段, 可能标题)`);
      // 不立即停止, 继续跟踪几帧确认
    }
  }

  if (frameCount % 500 === 0) {
    console.log(`  ... frame ${frameCount} (ram_00ED=${ed})`);
  }
}

// 停止 tracer
nes.tracer.stop();

// 关闭文件流
for (const k in files) files[k].end();

// 等待流写入完成
setTimeout(() => {
  // 统计
  const summary = [];
  summary.push('=== 开场动画 Trace 摘要 ===');
  summary.push(`总帧数: ${frameCount}`);
  summary.push(`停止原因: ${stopped ? '场景切换到标题' : '达到最大帧数'}`);
  summary.push('');
  summary.push('ram_00ED 变化序列:');
  for (const e of edHistory) {
    summary.push(`  frame ${e.frame}: ${e.ed} (0x${e.ed.toString(16).toUpperCase()})`);
  }
  summary.push('');

  for (const [k, f] of Object.entries(files)) {
    const p = path.join(outDir, 'opening-' + (k === 'cpu' ? 'cpu' : k) + '.log');
    try {
      const content = fs.readFileSync(p, 'utf8');
      const lines = content.split('\n').filter(l => l.length > 0);
      summary.push(`${k}: ${lines.length} 行`);
    } catch(e) {
      summary.push(`${k}: 读取失败`);
    }
  }

  const summaryText = summary.join('\n');
  fs.writeFileSync(path.join(outDir, 'opening-summary.txt'), summaryText);
  console.log('\n' + summaryText);
}, 1000);
