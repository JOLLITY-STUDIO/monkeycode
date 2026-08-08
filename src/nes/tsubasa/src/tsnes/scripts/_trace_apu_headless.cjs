/**
 * Headless APU Trace — 在 Node.js 中跑 NES 模拟器，抓取所有 $4000-$4017 APU 寄存器写入
 * 
 * 用法: node scripts/_trace_apu_headless.cjs [帧数] [--press-start]
 * 默认跑 1500 帧（约 25 秒），--press-start 会在第 300 帧自动按 Start 跳过标题画面
 */
const path = require('path');

// 由于 NES.ts 使用 TypeScript + ES module，我们用注册钩子的方式加载
// 直接读取已经编译好的 JavaScript 或者用 tsx 运行
// 这里用纯 JavaScript 方式：猴子补丁 PAPU，通过 inject 方式把 trace 注入到 module 加载后

const TRACE_FRAMES = parseInt(process.argv[2]) || 1500;
const PRESS_START = process.argv.includes('--press-start');
const SAMPLE_DUMP_FRAMES = 10; // 每 N 帧 dump 一个采样点

console.log(`[trace] 运行 ${TRACE_FRAMES} 帧，Press Start: ${PRESS_START}`);
console.log(`[trace] 通道说明：SQ1=矩形波1(主旋律), SQ2=矩形波2(副旋律), TRI=三角波(低音), NOISE=噪音(鼓点), DMC=采样`);
console.log('');

// ── 通道名称映射 ──
function channelName(addr) {
  if (addr >= 0x4000 && addr <= 0x4003) return 'SQ1';
  if (addr >= 0x4004 && addr <= 0x4007) return 'SQ2';
  if (addr >= 0x4008 && addr <= 0x400B) return 'TRI';
  if (addr >= 0x400C && addr <= 0x400F) return 'NOISE';
  if (addr >= 0x4010 && addr <= 0x4013) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  if (addr === 0x4017) return 'FRAME';
  return '';
}

// ── 寄存器说明 ──
function regRole(addr) {
  const r = addr & 0x03;
  const base = addr & 0xFFFC;
  if (base === 0x4000 || base === 0x4004) {
    if (r === 0) return 'Env/Duty/Vol'; // 音量/包络/占空比
    if (r === 1) return 'Sweep';        // 扫频
    if (r === 2) return 'FreqLo';       // 频率低8位
    if (r === 3) return 'FreqHi/Len';   // 频率高3位+音长
  }
  if (base === 0x4008) {
    if (r === 0) return 'Linear/Len';   // 线性计数器
    if (r === 1) return '—';            // 不使用
    if (r === 2) return 'FreqLo';
    if (r === 3) return 'FreqHi/Len';
  }
  if (base === 0x400C) {
    if (r === 0) return 'Env/Vol';      // 音量/包络
    if (r === 1) return '—';
    if (r === 2) return 'Period/Loop';  // 噪音周期
    if (r === 3) return 'Len';          // 音长
  }
  return '';
}

// ── 追踪数据 ──
const traceLog = [];
const channelWrites = { SQ1: 0, SQ2: 0, TRI: 0, NOISE: 0, DMC: 0, STAT: 0, FRAME: 0 };
const channelFirstFrame = { SQ1: 0, SQ2: 0, TRI: 0, NOISE: 0, DMC: 0 };
const channelFreqChange = []; // 记录频率变化（用于识别音符/BGM）
let _patched = false;

// ── 注入 monkey patch（在 loadROM 前调用） ──
function patchPAPU(nes) {
  if (_patched) return;
  const papu = nes.papu;
  if (!papu) {
    console.error('[trace] 无法获取 PAPU 实例');
    return;
  }

  const origWriteReg = papu.writeReg.bind(papu);
  const origUpdateChannelEnable = papu.updateChannelEnable.bind(papu);

  // Patch writeReg — 拦截所有 APU 寄存器写入
  papu.writeReg = function(addr, value) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = channelName(addr);
      const role = regRole(addr);
      const frame = nes._traceFrame || 0;

      if (ch) {
        channelWrites[ch] = (channelWrites[ch] || 0) + 1;
        if (channelFirstFrame[ch] === 0) {
          channelFirstFrame[ch] = frame;
        }
      }

      // 记录到日志（只记录关键寄存器以控制输出量）
      const isFreq = (role === 'FreqLo' || role === 'FreqHi/Len');
      const isStat = (addr === 0x4015);
      const isEnvVol = (role === 'Env/Duty/Vol' || role === 'Env/Vol');
      
      if (isFreq || isStat || isEnvVol || role === 'Sweep') {
        const entry = {
          f: frame,
          addr: addr.toString(16).toUpperCase().padStart(4, '0'),
          val: value.toString(16).padStart(2, '0'),
          ch: ch,
          role: role,
        };
        traceLog.push(entry);
        
        // 频率变化：记录音符追踪
        if (isFreq && traceLog.length < 3000) {
          channelFreqChange.push({ f: frame, ch, addr: addr.toString(16).toUpperCase(), val: value.toString(16).padStart(2, '0') });
        }
      }
    }
    return origWriteReg(addr, value);
  };

  _patched = true;
  console.log('[trace] PAPU.writeReg patched');
}

// ── 进度显示 ──
function progressBar(current, total, width) {
  width = width || 30;
  const pct = current / total;
  const filled = Math.round(pct * width);
  return '[' + '#'.repeat(filled) + '-'.repeat(width - filled) + '] ' + Math.round(pct * 100) + '%';
}

// ── 主流程 ──
async function main() {
  // 动态加载 NES 类和 ROM 数据
  console.log('[trace] 加载模块...');

  // 注册 ts 文件加载钩子
  try {
    require('tsx/cjs'); // tsx 对 CommonJS 的支持
  } catch(e) {
    // 如果 tsx 不可用，尝试 ts-node
    try {
      require('ts-node').register();
    } catch(e2) {
      console.error('[trace] 请安装 tsx: npm i -D tsx');
      process.exit(1);
    }
  }

  const NES = require('../src/nes').default;
  const { NES_PRG_ROM, NES_CHR_ROM } = require('../rom-data/index');

  // 构建 ROM
  const NES_HEADER = new Uint8Array([
    0x4E, 0x45, 0x53, 0x1A,  // NES␚
    0x10, 0x10,               // 16 bank PRG, 16 bank CHR
    0x40, 0x08,               // MMC3, horizontal
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
  ]);

  const prg = new Uint8Array(NES_PRG_ROM);
  const chr = new Uint8Array(NES_CHR_ROM);
  const rom = new Uint8Array(NES_HEADER.length + prg.length + chr.length);
  rom.set(NES_HEADER, 0);
  rom.set(prg, NES_HEADER.length);
  rom.set(chr, NES_HEADER.length + prg.length);

  console.log(`[trace] ROM 大小: ${rom.length} bytes`);

  // 创建 NES 实例
  const nes = new NES({
    emulateSound: true,
    sampleRate: 48000,
    onFrame: () => {},
    onAudioSample: () => {},
  });

  // 加载 ROM
  nes.loadROM(rom);
  console.log('[trace] ROM 加载完成');

  // 注入 trace
  patchPAPU(nes);

  // ── 运行帧循环 ──
  console.log(`\n[trace] 开始运行 ${TRACE_FRAMES} 帧...\n`);

  const startTime = Date.now();
  for (let frame = 0; frame < TRACE_FRAMES; frame++) {
    nes._traceFrame = frame; // 记录当前帧号

    // 模拟按键
    if (PRESS_START && frame === 300) {
      console.log(`[trace]   [F${frame}] 按下 Start...`);
      nes.buttonDown(1, 0x10); // START
    }
    if (PRESS_START && frame === 320) {
      nes.buttonUp(1, 0x10);
    }

    // 如果 PRESS_START，每隔一段时间按 A 跳过对话
    if (PRESS_START && frame >= 400 && frame % 60 === 0) {
      nes.buttonDown(1, 0x01); // A
    }
    if (PRESS_START && frame >= 400 && frame % 61 === 0) {
      nes.buttonUp(1, 0x01);
    }

    try {
      nes.frame();
    } catch(e) {
      console.error(`[trace]   [F${frame}] CRASH: ${e.message}`);
      break;
    }

    // 进度显示
    if (frame % 100 === 0 || frame === TRACE_FRAMES - 1) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`\r  ${progressBar(frame, TRACE_FRAMES, 25)} ${elapsed}s  `);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n\n[trace] 完成！耗时 ${elapsed}s\n`);

  // ── 输出结果 ──
  console.log('='.repeat(70));
  console.log('📊 APU 寄存器写入统计');
  console.log('='.repeat(70));

  console.log('\n通道活跃情况：');
  for (const [ch, count] of Object.entries(channelWrites)) {
    if (count > 0) {
      console.log(`  ${ch}: ${String(count).padStart(6)} 次写入, 首帧 F${channelFirstFrame[ch]}`);
    }
  }

  console.log(`\n总计 ${traceLog.length} 条关键记录（频率/音量/扫频变化）`);
  
  if (channelFreqChange.length > 0) {
    console.log(`\n📝 频率变化记录 (前 80 条):`);
    console.log('-'.repeat(50));
    let lastCh = '';
    for (let i = 0; i < Math.min(channelFreqChange.length, 80); i++) {
      const r = channelFreqChange[i];
      if (r.ch !== lastCh) {
        if (lastCh) console.log('');
        console.log(`  ── ${r.ch} ──`);
        lastCh = r.ch;
      }
      console.log(`  F${String(r.f).padStart(5)}  $${r.addr}=0x${r.val}`);
    }
  }

  // 按帧输出前200条关键事件
  console.log(`\n📋 关键 APU 事件时间线 (前 200 条):`);
  console.log('-'.repeat(60));
  for (let i = 0; i < Math.min(traceLog.length, 200); i++) {
    const e = traceLog[i];
    console.log(`  F${String(e.f).padStart(5)}  $${e.addr}=0x${e.val}  ${e.ch.padEnd(6)} ${e.role}`);
  }

  // ── BGM 分析：看 SQ1/SQ2/TRI 有没有持续写频率（说明有旋律在演奏） ──
  console.log(`\n\n🎵 BGM 活动分析：`);
  console.log('-'.repeat(60));
  if (channelFreqChange.length > 0) {
    const sq1Freqs = channelFreqChange.filter(r => r.ch === 'SQ1');
    const sq2Freqs = channelFreqChange.filter(r => r.ch === 'SQ2');
    const triFreqs = channelFreqChange.filter(r => r.ch === 'TRI');
    const noiseFreqs = channelFreqChange.filter(r => r.ch === 'NOISE');

    console.log(`  SQ1 频率变化: ${sq1Freqs.length} 次 → ${sq1Freqs.length > 10 ? '✅ 有主旋律' : '⚠️ 无/极少旋律'}`);
    console.log(`  SQ2 频率变化: ${sq2Freqs.length} 次 → ${sq2Freqs.length > 10 ? '✅ 有副旋律' : '⚠️ 无/极少旋律'}`);
    console.log(`  TRI 频率变化: ${triFreqs.length} 次 → ${triFreqs.length > 10 ? '✅ 有低音线' : '⚠️ 无/极少低音'}`);
    console.log(`  NOISE写入:    ${noiseFreqs.length} 次 → ${noiseFreqs.length > 5 ? '✅ 有鼓点/音效' : '⚠️ 无鼓点'}`);

    if (sq1Freqs.length > 0) {
      const first = sq1Freqs[0].f;
      const last = sq1Freqs[sq1Freqs.length - 1].f;
      console.log(`\n  SQ1 频率范围: F${first} ~ F${last} (持续 ${last - first} 帧 = ${((last - first) / 60).toFixed(1)} 秒)`);
    }
  }

  // ── $4015 通道启用分析 ──
  const statWrites = traceLog.filter(e => e.addr === '4015');
  if (statWrites.length > 0) {
    console.log(`\n📡 $4015 通道开关写入: ${statWrites.length} 次`);
    console.log('  值含义: bit0=SQ1, bit1=SQ2, bit2=TRI, bit3=NOISE, bit4=DMC');
    for (const sw of statWrites) {
      const val = parseInt(sw.val, 16);
      const active = [];
      if (val & 1) active.push('SQ1');
      if (val & 2) active.push('SQ2');
      if (val & 4) active.push('TRI');
      if (val & 8) active.push('NOISE');
      if (val & 16) active.push('DMC');
      console.log(`  F${String(sw.f).padStart(5)}  $4015=0x${sw.val} → ${active.join('+') || '全关'}`);
    }
  }

  process.exit(0);
}

main().catch(e => {
  console.error('[trace] 致命错误:', e.message);
  console.error(e.stack);
  process.exit(1);
});
