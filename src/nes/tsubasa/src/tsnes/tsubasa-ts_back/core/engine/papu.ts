/**
 * ============================================================================
 * papu — NES APU (Audio Processing Unit)
 *
 * 五通道: Square1, Square2, Triangle, Noise, DMC
 * 所有寄存器地址用语义变量代替 hex 地址。
 * ============================================================================
 */

// ═══════════════ 参考时钟 ═══════════════

const CPU_FREQ_NTSC = 1789772.5;

// ═══════════════ 帧计数器步进时刻 (CPU 周期) ═══════════════

const FRAME_STEPS_4 = [7457, 14913, 22371, 29828, 29829];
const FRAME_STEPS_5 = [7457, 14913, 22371, 29829, 37281];
const FRAME_PERIOD_4 = 29830;
const FRAME_PERIOD_5 = 37282;

// ═══════════════ 寄存器 key 常量 (替代 hex 地址) ═══════════════

/** APU 寄存器名 — 无地址，纯语义 */
export const APU_REG = Object.freeze({
  // Square 1 ($4000-$4003)
  SQ1_VOL:       'sq1Vol',
  SQ1_SWEEP:     'sq1Sweep',
  SQ1_TIMER_LO:  'sq1TimerLo',
  SQ1_TIMER_HI:  'sq1TimerHi',
  // Square 2 ($4004-$4007)
  SQ2_VOL:       'sq2Vol',
  SQ2_SWEEP:     'sq2Sweep',
  SQ2_TIMER_LO:  'sq2TimerLo',
  SQ2_TIMER_HI:  'sq2TimerHi',
  // Triangle ($4008-$400B)
  TRI_LINEAR:    'triLinear',
  TRI_UNUSED:    'triUnused',
  TRI_TIMER_LO:  'triTimerLo',
  TRI_TIMER_HI:  'triTimerHi',
  // Noise ($400C-$400F)
  NOISE_VOL:     'noiseVol',
  NOISE_UNUSED:  'noiseUnused',
  NOISE_PERIOD:  'noisePeriod',
  NOISE_LEN:     'noiseLen',
  // DMC ($4010-$4013)
  DMC_FREQ:      'dmcFreq',
  DMC_RAW:       'dmcRaw',
  DMC_START:     'dmcStart',
  DMC_LEN:       'dmcLen',
  // Status ($4015)
  CHANNEL_ENABLE: 'channelEnable',
  // Frame Counter ($4017)
  FRAME_COUNTER: 'frameCounter',
});

// ═══════════════ 查询表 ═══════════════

// prettier-ignore
const LENGTH_TABLE = [
  0x0A, 0xFE, 0x14, 0x02, 0x28, 0x04,
  0x50, 0x06, 0xA0, 0x08, 0x3C, 0x0A,
  0x0E, 0x0C, 0x1A, 0x0E, 0x0C, 0x10,
  0x18, 0x12, 0x30, 0x14, 0x60, 0x16,
  0xC0, 0x18, 0x48, 0x1A, 0x10, 0x1C,
  0x20, 0x1E,
];

// prettier-ignore
const NOISE_PERIOD_TABLE = [
  0x004, 0x008, 0x010, 0x020, 0x040, 0x060, 0x080, 0x0A0,
  0x0CA, 0x0FE, 0x17C, 0x1FC, 0x2FA, 0x3F8, 0x7F2, 0xFE4,
];

const DMC_FREQ_TABLE = [
  0xD60, 0xBE0, 0xAA0, 0xA00,
  0x8F0, 0x7F0, 0x710, 0x6B0,
  0x5F0, 0x500, 0x470, 0x400,
  0x350, 0x2A0, 0x240, 0x1B0,
];

// ═══════════════ Square 通道 decay 波形 ═══════════════

// prettier-ignore
const DUTY_WAVE = [
  0, 1, 0, 0, 0, 0, 0, 0,   // 12.5%
  0, 1, 1, 0, 0, 0, 0, 0,   // 25%
  0, 1, 1, 1, 1, 0, 0, 0,   // 50%
  1, 0, 0, 1, 1, 1, 1, 1,   // 75% (negated)
];

// ═══════════════ 非线性 DAC 混合表 ═══════════════

/**
 * 构建 square 查找表 (索引 = int16 步进, 值 = 非线性 DAC 输出)
 */
function buildSquareTable() {
  const table = new Array(32 * 16);
  for (let i = 0; i < 32 * 16; i++) {
    let value = 95.52 / (8128.0 / (i / 16.0) + 100.0);
    value *= 0.98411 * 50000.0;
    table[i] = Math.floor(value);
  }
  return table;
}

/**
 * 构建 TND (Triangle/Noise/DMC) 查找表
 */
function buildTndTable() {
  const table = new Array(204 * 16);
  for (let i = 0; i < 204 * 16; i++) {
    let value = 163.67 / (24329.0 / (i / 16.0) + 100.0);
    value *= 0.98411 * 50000.0;
    table[i] = Math.floor(value);
  }
  return table;
}

/** 全局 DAC 表 — 所有 APU 实例共享 */
let _squareTable = null;
let _tndTable = null;
let _dacRange = 0;
let _dcValue = 0;

function ensureDacTables() {
  if (_squareTable) return;
  _squareTable = buildSquareTable();
  _tndTable = buildTndTable();
  // 计算 DAC 范围用于 DC 消除
  let maxSqr = 0, maxTnd = 0;
  for (const v of _squareTable) { if (v > maxSqr) maxSqr = v; }
  for (const v of _tndTable)    { if (v > maxTnd) maxTnd = v; }
  _dacRange = maxSqr + maxTnd;
  _dcValue  = Math.floor(_dacRange / 2);
}

// ═══════════════ 创建 APU 状态 ═══════════════

/**
 * 创建 Square 通道状态
 * @param {boolean} isSq1 — true=sq1, false=sq2
 */
function createSquareChannel(isSq1) {
  return {
    isSq1,
    enabled: false,
    lengthHalt: false,
    /** 时长计数器 */
    lengthCounter: 0,
    /** 可编程定时器当前值 */
    timerCounter: 0,
    /** 可编程定时器上限 */
    timerMax: 0,
    /** 波形位置 (0-7) */
    wavePos: 0,
    /** sweep 计数器 */
    sweepCounter: 0,
    /** sweep 计数器上限 */
    sweepMax: 0,
    /** sweep 模式: 0=加, 1=减 */
    sweepMode: 0,
    /** sweep 右移位数 */
    sweepShift: 0,
    /** sweep 是否启用 */
    sweepEnabled: false,
    /** sweep 重新加载标志 */
    sweepReload: false,
    /** envelope 衰减速度 */
    envSpeed: 0,
    /** envelope 计数器 */
    envCounter: 0,
    /** envelope 当前音量 */
    envVolume: 0,
    /** 固定音量标志 (绕过 envelope) */
    envConstVolume: false,
    /** envelope 循环 / length 暂停 */
    envLoop: false,
    /** duty 模式 (0-3) */
    dutyType: 0,
    /** 当前输出采样 (0-15) */
    sample: 0,
  };
}

function createTriangleChannel() {
  return {
    enabled: false,
    lengthHalt: false,
    lengthCounter: 0,
    /** 定时器上限 */
    timerMax: 0,
    /** 定时器当前 */
    timerCounter: 0,
    /** 三角波计数器 (0-31) */
    waveStep: 0,
    /** 线性计数器 */
    linearCounter: 0,
    /** 线性计数器重装值 */
    linearReload: 0,
    /** 线性计数器 halt 标志 */
    linearHalt: false,
    /** 线性计数器控制 */
    linearControl: false,
    /** 当前采样 (0-15) */
    sample: 0,
  };
}

function createNoiseChannel() {
  return {
    enabled: false,
    lengthHalt: false,
    lengthCounter: 0,
    /** 定时器当前 */
    timerCounter: 0,
    /** 定时器上限 (查表) */
    timerMax: 0,
    /** envelope (同 Square) */
    envSpeed: 0,
    envCounter: 0,
    envVolume: 0,
    envConstVolume: false,
    envLoop: false,
    /** LFSR 移位寄存器 (15-bit) */
    shiftReg: 1,
    /** 随机模式: 0=长, 1=短 (93-bit vs 32767-bit) */
    randomMode: 0,
    /** 当前采样 (0-15) */
    sample: 0,
  };
}

function createDmcChannel() {
  return {
    enabled: false,
    /** 播放模式: 0=普通, 1=循环, 2=IRQ */
    playMode: 0,
    /** DMA 频率 (预缩放) */
    dmaFreq: 0,
    /** shift 计数器 */
    shiftCounter: 0,
    /** DAC delta 计数器 */
    delta: 0,
    /** DAC LSB */
    dacLsb: 0,
    /** 采样起始地址 */
    sampleStart: 0,
    /** 采样当前地址 */
    sampleAddr: 0,
    /** 采样长度 (字节) */
    sampleLen: 0,
    /** 采样剩余 */
    sampleRemain: 0,
    /** 当前输出采样 */
    sample: 0,
    /** 采样缓冲区是否有数据 */
    hasSample: false,
    /** 采样缓冲字节 */
    dataBuffer: 0,
    /** IRQ 标志 */
    irqFlag: false,
    /** DMA 计数器 */
    dmaCounter: 0,
  };
}

/**
 * 创建完整 APU 状态
 * @param {number} sampleRate — 输出采样率 (Hz), 默认 48000
 * @returns {object}
 */
export function createApuState(sampleRate = 48000) {
  ensureDacTables();

  const state = {
    /** --- 五通道 --- */
    sq1: createSquareChannel(true),
    sq2: createSquareChannel(false),
    tri: createTriangleChannel(),
    noise: createNoiseChannel(),
    dmc: createDmcChannel(),

    /** --- v register 快照 (上帧写入值) --- */
    /** 通道启用位 ($4015 写入) */
    channelEnable: 0xFF,

    /** --- 帧计数器 --- */
    /** 帧计数器当前周期位置 */
    frameCycle: 0,
    /** 当前帧步进索引 */
    frameStep: 0,
    /** 计数序列: 0=四步, 1=五步 */
    countSeqMode: 0,
    /** 帧 IRQ 是否启用 */
    frameIrqEnable: false,
    /** 帧 IRQ 是否激活 */
    frameIrqFlag: false,
    /** 帧 IRQ clear 挂起 (读 $4015 后 1-2 周期清除) */
    frameIrqClear: false,
    /** APU 周期奇偶 */
    cycleParity: 0,

    /** --- 输出 --- */
    /** 输出采样率 */
    sampleRate,
    /** 采样间隔 (以 CPU 周期 * 1024 为单位) */
    sampleTimerMax: Math.floor((1024.0 * CPU_FREQ_NTSC) / sampleRate),
    /** 采样定时器 */
    sampleTimer: 0,
    /** 累积的 CPU 周期 */
    accumCycles: 0,
    /** 当前帧累积的 sq1 采样和 */
    accSq1: 0,
    /** 当前帧累积的 sq2 采样和 */
    accSq2: 0,
    /** 当前帧累积的 tri 采样和 */
    accTri: 0,
    /** 当前帧累积的 dmc 采样和 */
    accDmc: 0,
    /** 残留周期 (跨帧) */
    extraCycles: 0,

    /** --- panning / 立体声 (默认值) --- */
    panL: [80, 170, 100, 150, 128],   // sq1, sq2, tri, noise, dmc 左声道权重
    panR: [176, 86, 156, 106, 128],   // 右 = 256 - panL

    /** --- callback --- */
    /** 音频采样回调: (left: number, right: number) => void */
    onSample: null,
  };

  // 初始化所有寄存器为 0 (除了 DMC $4010)
  writeReg(state, APU_REG.SQ1_VOL, 0);
  writeReg(state, APU_REG.SQ1_SWEEP, 0);
  writeReg(state, APU_REG.SQ1_TIMER_LO, 0);
  writeReg(state, APU_REG.SQ1_TIMER_HI, 0);
  writeReg(state, APU_REG.SQ2_VOL, 0);
  writeReg(state, APU_REG.SQ2_SWEEP, 0);
  writeReg(state, APU_REG.SQ2_TIMER_LO, 0);
  writeReg(state, APU_REG.SQ2_TIMER_HI, 0);
  writeReg(state, APU_REG.TRI_LINEAR, 0);
  writeReg(state, APU_REG.TRI_TIMER_LO, 0);
  writeReg(state, APU_REG.TRI_TIMER_HI, 0);
  writeReg(state, APU_REG.NOISE_VOL, 0);
  writeReg(state, APU_REG.NOISE_PERIOD, 0);
  writeReg(state, APU_REG.NOISE_LEN, 0);
  writeReg(state, APU_REG.DMC_FREQ, 0x10);
  writeReg(state, APU_REG.DMC_RAW, 0);
  writeReg(state, APU_REG.DMC_START, 0);
  writeReg(state, APU_REG.DMC_LEN, 0);
  writeReg(state, APU_REG.CHANNEL_ENABLE, 0);

  return state;
}

// ═══════════════ 寄存器读取 ═══════════════

/**
 * 读取 APU 状态 ($4015)
 * - bit0: sq1 活跃
 * - bit1: sq2 活跃
 * - bit2: tri 活跃
 * - bit3: noise 活跃
 * - bit4: dmc 活跃
 * - bit5: open bus (CPU 数据总线)
 * - bit6: 帧 IRQ flag
 * - bit7: DMC IRQ flag
 *
 * @param {object} apu
 * @param {number} openBus — CPU 数据总线上的残留值
 * @returns {number}
 */
export function readStatus(apu, openBus = 0) {
  let value = 0;
  if (apu.sq1.lengthCounter > 0 && apu.sq1.enabled)   value |= 1;
  if (apu.sq2.lengthCounter > 0 && apu.sq2.enabled)   value |= 2;
  if (apu.tri.lengthCounter > 0 && apu.tri.enabled)   value |= 4;
  if (apu.noise.lengthCounter > 0 && apu.noise.enabled) value |= 8;
  if (apu.dmc.sampleRemain > 0 && apu.dmc.enabled)      value |= 16;
  value |= openBus & 32;
  if (apu.frameIrqFlag) {
    value |= 64;
    apu.frameIrqClear = true; // 读后 1-2 周期清除
  }
  if (apu.dmc.irqFlag) value |= 128;
  return value;
}

// ═══════════════ 寄存器写入 ═══════════════

/**
 * 写入 APU 寄存器 — 用语义 key, 非 hex 地址
 *
 * @param {object} apu
 * @param {string} reg — 来自 APU_REG 的 key
 * @param {number} value — 8-bit 写入值 (自动 &0xFF)
 */
export function writeReg(apu, reg, value) {
  const v = value & 0xFF;

  switch (reg) {
    // ─── Square 1 ───
    case APU_REG.SQ1_VOL:     writeSqVol(apu.sq1, v); break;
    case APU_REG.SQ1_SWEEP:   writeSqSweep(apu.sq1, v); break;
    case APU_REG.SQ1_TIMER_LO: apu.sq1.timerMax = (apu.sq1.timerMax & 0x700) | v; break;
    case APU_REG.SQ1_TIMER_HI: writeSqTimerHi(apu.sq1, v); break;

    // ─── Square 2 ───
    case APU_REG.SQ2_VOL:     writeSqVol(apu.sq2, v); break;
    case APU_REG.SQ2_SWEEP:   writeSqSweep(apu.sq2, v); break;
    case APU_REG.SQ2_TIMER_LO: apu.sq2.timerMax = (apu.sq2.timerMax & 0x700) | v; break;
    case APU_REG.SQ2_TIMER_HI: writeSqTimerHi(apu.sq2, v); break;

    // ─── Triangle ───
    case APU_REG.TRI_LINEAR:
      apu.tri.linearControl = (v & 0x80) !== 0;
      apu.tri.linearReload  = v & 0x7F;
      apu.tri.lengthHalt    = apu.tri.linearControl;
      break;
    case APU_REG.TRI_UNUSED:
      break; // 无操作
    case APU_REG.TRI_TIMER_LO:
      apu.tri.timerMax = (apu.tri.timerMax & 0x700) | v;
      break;
    case APU_REG.TRI_TIMER_HI:
      apu.tri.timerMax = (apu.tri.timerMax & 0xFF) | ((v & 0x07) << 8);
      apu.tri.lengthHalt = true;
      if (apu.tri.enabled) {
        apu.tri.lengthCounter = lengthLookup(v >> 3);
      }
      break;

    // ─── Noise ───
    case APU_REG.NOISE_VOL:
      apu.noise.envConstVolume = (v & 0x10) !== 0;
      apu.noise.envLoop        = (v & 0x20) !== 0;
      apu.noise.lengthHalt     = apu.noise.envLoop;
      apu.noise.envSpeed       = v & 0x0F;
      if (apu.noise.envConstVolume) {
        apu.noise.sample = apu.noise.envSpeed;
      }
      break;
    case APU_REG.NOISE_UNUSED:
      break; // 无操作
    case APU_REG.NOISE_PERIOD:
      apu.noise.timerMax   = NOISE_PERIOD_TABLE[v & 0x0F];
      apu.noise.randomMode = (v >> 7) & 1;
      break;
    case APU_REG.NOISE_LEN:
      if (apu.noise.enabled) {
        apu.noise.lengthCounter = lengthLookup(v >> 3);
      }
      // envelope 重启
      apu.noise.envCounter = apu.noise.envSpeed;
      apu.noise.envVolume  = 15;
      break;

    // ─── DMC ───
    case APU_REG.DMC_FREQ:
      apu.dmc.dmaFreq = DMC_FREQ_TABLE[v & 0x0F];
      apu.dmc.playMode = (v >> 6) & 3;
      if ((v & 0x80) === 0) {
        apu.dmc.irqFlag = false;
      }
      break;
    case APU_REG.DMC_RAW:
      apu.dmc.delta  = (v >> 1) & 63;
      apu.dmc.dacLsb = v & 1;
      apu.dmc.sample = (apu.dmc.delta << 1) + apu.dmc.dacLsb;
      break;
    case APU_REG.DMC_START:
      apu.dmc.sampleStart = 0xC000 | (v << 6);
      break;
    case APU_REG.DMC_LEN:
      apu.dmc.sampleLen    = (v << 4) + 1;
      apu.dmc.sampleRemain = apu.dmc.sampleLen;
      break;

    // ─── 通道启用 ($4015) ───
    case APU_REG.CHANNEL_ENABLE:
      apu.channelEnable = v;
      apu.sq1.enabled   = (v & 1) !== 0;
      apu.sq2.enabled   = (v & 2) !== 0;
      apu.tri.enabled   = (v & 4) !== 0;
      apu.noise.enabled = (v & 8) !== 0;
      // 关掉未启用的通道长度计数器
      if (!apu.sq1.enabled)   apu.sq1.lengthCounter = 0;
      if (!apu.sq2.enabled)   apu.sq2.lengthCounter = 0;
      if (!apu.tri.enabled)   apu.tri.lengthCounter = 0;
      if (!apu.noise.enabled) apu.noise.lengthCounter = 0;

      // DMC 特殊处理
      apu.dmc.irqFlag = false;
      if ((v & 16) === 0) {
        apu.dmc.enabled = false;
        apu.dmc.sampleRemain = 0;
      } else {
        if (apu.dmc.sampleRemain === 0) {
          apu.dmc.enabled = true;
          apu.dmc.sampleAddr  = apu.dmc.sampleStart;
          apu.dmc.sampleRemain = apu.dmc.sampleLen;
          // 立即触发 DMA fetch
          dmcFetchSample(apu.dmc);
          apu.dmc.dmaCounter   = 8;
          apu.dmc.shiftCounter = apu.dmc.dmaFreq;
          if (apu.dmc.sampleRemain === 0 && apu.dmc.playMode === 2) {
            apu.dmc.irqFlag = true;
          }
        } else {
          apu.dmc.enabled = true;
        }
      }
      break;

    // ─── 帧计数器 ($4017) ───
    case APU_REG.FRAME_COUNTER:
      apu.countSeqMode = (v >> 7) & 1;
      apu.frameIrqEnable = (v & 0x40) === 0;
      if (!apu.frameIrqEnable) {
        apu.frameIrqFlag  = false;
        apu.frameIrqClear = false;
      }
      // 重置帧计数器相位
      apu.frameCycle = 0;
      apu.frameStep  = 0;
      // 写 $4017 会立即触发 quarter/half-frame 时钟
      if (apu.countSeqMode === 1) {
        clockQuarterFrame(apu);
        clockHalfFrame(apu);
      }
      break;

    default:
      break;
  }
}

// ═══════════════ Square 通道辅助 ═══════════════

function writeSqVol(ch, v) {
  ch.envConstVolume = (v & 0x10) !== 0;
  ch.envLoop        = (v & 0x20) !== 0;
  ch.lengthHalt     = ch.envLoop;
  ch.envSpeed       = v & 0x0F;
  ch.dutyType       = (v >> 6) & 3;
  if (ch.envConstVolume) {
    ch.sample = ch.envSpeed;
  }
}

function writeSqSweep(ch, v) {
  ch.sweepEnabled = (v & 0x80) !== 0;
  ch.sweepMax     = ((v >> 4) & 7);
  ch.sweepMode    = (v >> 3) & 1;
  ch.sweepShift   = v & 7;
  ch.sweepReload  = true;
}

function writeSqTimerHi(ch, v) {
  ch.timerMax = (ch.timerMax & 0xFF) | ((v & 0x07) << 8);
  if (ch.enabled) {
    ch.lengthCounter = lengthLookup(v >> 3);
  }
  // envelope 重启
  ch.envCounter = ch.envSpeed;
  ch.envVolume  = 15;
  // 波形复位
  ch.wavePos = 0;
}

function lengthLookup(index) {
  return LENGTH_TABLE[index & 0x1F] || 0;
}

// ═══════════════ 帧计数器时钟 ═══════════════

function clockQuarterFrame(apu) {
  clockSqEnvelope(apu.sq1);
  clockSqEnvelope(apu.sq2);
  clockNoiseEnvelope(apu.noise);
  clockTriLinear(apu.tri);
}

function clockHalfFrame(apu) {
  clockSqLength(apu.sq1);
  clockSqLength(apu.sq2);
  clockTriLength(apu.tri);
  clockNoiseLength(apu.noise);
  clockSqSweep(apu.sq1);
  clockSqSweep(apu.sq2);
}

// ═══════════════ Square envelope ═══════════════

function clockSqEnvelope(ch) {
  if (ch.envCounter > 0) {
    ch.envCounter--;
  } else {
    ch.envCounter = ch.envSpeed;
    if (ch.envVolume > 0) {
      ch.envVolume--;
    } else if (ch.envLoop) {
      ch.envVolume = 15;
    }
  }
}

// ═══════════════ Square sweep ═══════════════

function clockSqSweep(ch) {
  if (ch.sweepReload) {
    ch.sweepCounter = ch.sweepMax;
    ch.sweepReload  = false;
  } else if (ch.sweepCounter > 0) {
    ch.sweepCounter--;
  } else {
    ch.sweepCounter = ch.sweepMax;
    if (ch.sweepEnabled && ch.sweepShift > 0 && ch.timerMax >= 8) {
      const shift = ch.timerMax >> ch.sweepShift;
      if (ch.sweepMode === 0) {
        // 加法
        ch.timerMax += shift;
        if (ch.timerMax > 0x7FF) {
          ch.timerMax = 0x7FF;
        }
      } else {
        // 减法 (sq1 有额外 -1)
        const extra = ch.isSq1 ? 1 : 0;
        ch.timerMax -= shift + extra;
        if (ch.timerMax < 0) ch.timerMax = 0;
      }
    }
  }
}

// ═══════════════ Square length ═══════════════

function clockSqLength(ch) {
  if (!ch.lengthHalt && ch.lengthCounter > 0) {
    ch.lengthCounter--;
  }
}

// ═══════════════ Triangle ═══════════════

function clockTriLinear(ch) {
  if (ch.linearHalt) {
    ch.linearCounter = ch.linearReload;
  } else if (ch.linearCounter > 0) {
    ch.linearCounter--;
  }
  if (!ch.linearControl) {
    ch.linearHalt = false;
  }
}

function clockTriLength(ch) {
  if (!ch.lengthHalt && ch.lengthCounter > 0) {
    ch.lengthCounter--;
  }
}

// ═══════════════ Noise envelope ═══════════════

function clockNoiseEnvelope(ch) {
  if (ch.envCounter > 0) {
    ch.envCounter--;
  } else {
    ch.envCounter = ch.envSpeed;
    if (ch.envVolume > 0) {
      ch.envVolume--;
    } else if (ch.envLoop) {
      ch.envVolume = 15;
    }
  }
}

function clockNoiseLength(ch) {
  if (!ch.lengthHalt && ch.lengthCounter > 0) {
    ch.lengthCounter--;
  }
}

// ═══════════════ DMC fetch ═══════════════

function dmcFetchSample(dmc) {
  // DMC 通过 CPU 地址总线读取样本数据
  // 这里提供回调接口，外部注入 mmap.load 的能力
  dmc.hasSample  = true;
  dmc.dataBuffer = 0; // 默认值，由外部填充
  dmc.sampleRemain--;
  dmc.sampleAddr++;
  if (dmc.sampleAddr > 0xFFFF) {
    dmc.sampleAddr = 0x8000;
  }
}

// ═══════════════ 主时钟驱动 ═══════════════

/**
 * 时钟 APU 帧计数器 + 各通道定时器
 *
 * @param {object} apu
 * @param {number} cpuCycles — 自上次调用后的 CPU 周期数
 */
export function clockFrameCounter(apu, cpuCycles) {
  let cycles = cpuCycles;

  // 处理帧 IRQ clear (读 $4015 后延迟 1-2 周期)
  if (apu.frameIrqClear && cycles > 0) {
    apu.frameIrqClear = false;
    apu.frameIrqFlag  = false;
  }

  apu.cycleParity = (apu.cycleParity + cycles) & 1;

  // ── 通道时钟 ──

  // 1) DMC
  const dmc = apu.dmc;
  if (dmc.enabled && dmc.dmaFreq > 0) {
    dmc.shiftCounter -= cycles;
    let dmcCycles = Math.abs(Math.floor(dmc.shiftCounter / dmc.dmaFreq));
    while (dmc.shiftCounter <= 0 && dmc.dmaFreq > 0) {
      dmc.shiftCounter += dmc.dmaFreq;
      clockDmcOutput(dmc);
    }
  }

  // 2) Square 1
  apu.sq1.timerCounter -= cycles;
  while (apu.sq1.timerCounter <= 0 && apu.sq1.timerMax > 0) {
    apu.sq1.timerCounter += (apu.sq1.timerMax + 1) * 2;
    apu.sq1.wavePos = (apu.sq1.wavePos + 1) & 7;
    updateSqSample(apu.sq1);
  }

  // 3) Square 2 (同 sq1)
  apu.sq2.timerCounter -= cycles;
  while (apu.sq2.timerCounter <= 0 && apu.sq2.timerMax > 0) {
    apu.sq2.timerCounter += (apu.sq2.timerMax + 1) * 2;
    apu.sq2.wavePos = (apu.sq2.wavePos + 1) & 7;
    updateSqSample(apu.sq2);
  }

  // 4) Triangle
  if (apu.tri.timerMax > 0) {
    apu.tri.timerCounter -= cycles;
    while (apu.tri.timerCounter <= 0) {
      apu.tri.timerCounter += apu.tri.timerMax + 1;
      if (apu.tri.linearCounter > 0 && apu.tri.lengthCounter > 0) {
        apu.tri.waveStep = (apu.tri.waveStep + 1) & 31;
        updateTriSample(apu.tri);
      }
    }
  }

  // 5) Noise
  const noise = apu.noise;
  if (noise.timerMax > 0) {
    noise.timerCounter -= cycles;
    while (noise.timerCounter <= 0) {
      noise.timerCounter += noise.timerMax;
      // LFSR 反馈
      const bit0 = noise.shiftReg & 1;
      const bit1 = noise.randomMode === 0
        ? (noise.shiftReg >> 1) & 1
        : (noise.shiftReg >> 6) & 1;
      const fb = bit0 ^ bit1;
      noise.shiftReg = (noise.shiftReg >> 1) | (fb << 14);
      noise.sample = (fb === 0) ? noise.envConstVolume ? noise.envSpeed : noise.envVolume : 0;
    }
  }

  // ── 帧计数器步进 ──
  advanceFrameSteps(apu, cpuCycles);

  // ── 累积采样 ──
  accumSamples(apu, cpuCycles);

  // ── 输出采样 ──
  apu.sampleTimer += cpuCycles * 1024;
  if (apu.sampleTimer >= apu.sampleTimerMax && apu.sampleTimerMax > 0) {
    sample(apu);
    apu.sampleTimer -= apu.sampleTimerMax;
  }
}

function clockDmcOutput(dmc) {
  if (!dmc.hasSample) {
    // 缓冲区空，尝试获取
    dmcFetchSample(dmc);
    dmc.dmaCounter = 8;
  }
  if (dmc.hasSample) {
    // 位解码
    const bit = dmc.dataBuffer & 1;
    if (bit === 0) {
      if (dmc.delta > 0) dmc.delta--;
    } else {
      if (dmc.delta < 63) dmc.delta++;
    }
    dmc.dataBuffer >>= 1;
    dmc.sample = dmc.enabled ? (dmc.delta << 1) + dmc.dacLsb : 0;
    dmc.dmaCounter--;
    if (dmc.dmaCounter <= 0) {
      dmc.hasSample = false;
      dmc.dmaCounter = 8;
      // 循环 / IRQ 检查
      if (dmc.sampleRemain === 0) {
        if (dmc.playMode === 1) {
          // 循环模式 — 重新开始
          dmc.sampleAddr   = dmc.sampleStart;
          dmc.sampleRemain = dmc.sampleLen;
        } else if (dmc.playMode === 2) {
          // IRQ 模式
          dmc.irqFlag = true;
        }
      }
    }
  }
}

// ═══════════════ 采样更新 ═══════════════

function updateSqSample(ch) {
  if (ch.lengthCounter > 0 && ch.enabled && ch.timerMax >= 8) {
    const vol = ch.envConstVolume ? ch.envSpeed : ch.envVolume;
    ch.sample = vol * DUTY_WAVE[(ch.dutyType << 3) + ch.wavePos];
  } else {
    ch.sample = 0;
  }
}

function updateTriSample(ch) {
  // 三角波: waveStep 0-15 上升, 16-31 下降
  if (ch.waveStep < 16) {
    ch.sample = ch.waveStep;
  } else {
    ch.sample = 31 - ch.waveStep;
  }
}

// ═══════════════ 帧步进 ═══════════════

function advanceFrameSteps(apu, nCycles) {
  apu.frameCycle += nCycles;
  const steps = apu.countSeqMode === 0 ? FRAME_STEPS_4 : FRAME_STEPS_5;
  const period = apu.countSeqMode === 0 ? FRAME_PERIOD_4 : FRAME_PERIOD_5;

  for (;;) {
    if (apu.frameStep < steps.length && apu.frameCycle >= steps[apu.frameStep]) {
      fireFrameStep(apu, apu.frameStep);
      apu.frameStep++;
    } else if (apu.frameStep >= steps.length && apu.frameCycle >= period) {
      apu.frameStep = 0;
      apu.frameCycle -= period;
      if (apu.countSeqMode === 0) {
        apu.frameIrqFlag  = apu.frameIrqEnable;
        apu.frameIrqClear = false;
      }
    } else {
      break;
    }
  }
}

function fireFrameStep(apu, step) {
  if (apu.countSeqMode === 0) {
    // 四步序列
    switch (step) {
      case 0: clockQuarterFrame(apu); break;
      case 1: clockQuarterFrame(apu); clockHalfFrame(apu); break;
      case 2: clockQuarterFrame(apu); break;
      case 3:
        apu.frameIrqFlag  = true;
        apu.frameIrqClear = false;
        break;
      case 4:
        clockQuarterFrame(apu);
        clockHalfFrame(apu);
        apu.frameIrqFlag  = true;
        apu.frameIrqClear = false;
        break;
    }
  } else {
    // 五步序列 (无 IRQ)
    switch (step) {
      case 0: clockQuarterFrame(apu); break;
      case 1: clockQuarterFrame(apu); clockHalfFrame(apu); break;
      case 2: clockQuarterFrame(apu); break;
      case 3: break;
      case 4: clockQuarterFrame(apu); clockHalfFrame(apu); break;
    }
  }
}

// ═══════════════ 累积与输出 ═══════════════

function accumSamples(apu, cycles) {
  // 取当前各通道采样值
  const sq1 = apu.sq1.sample;
  const sq2 = apu.sq2.sample;
  const tri = apu.tri.sample;
  const dmcVal = apu.dmc.sample;

  // 三角波精细插值 (子采样分辨率)
  let triFine = tri;
  if (apu.tri.timerMax > 0 && apu.tri.timerCounter >= 0) {
    // 子采样位置调整 (简化)
    const pos = (apu.tri.timerCounter << 4) / (apu.tri.timerMax + 1);
    if (pos <= 16) triFine = tri + pos;
    else           triFine = tri + 16 - pos;
  }

  apu.accSq1 += sq1 * cycles;
  apu.accSq2 += sq2 * cycles;
  apu.accTri += triFine * cycles;
  apu.accDmc += dmcVal * cycles;
  apu.accumCycles += cycles;
}

function sample(apu) {
  if (apu.accumCycles <= 0) {
    apu.accumCycles = 1;
    apu.accSq1 = apu.sq1.sample;
    apu.accSq2 = apu.sq2.sample;
    apu.accTri = apu.tri.sample;
    apu.accDmc = apu.dmc.sample;
  }

  // 平均值
  const avgSq1 = Math.floor((apu.accSq1 * 16) / apu.accumCycles);
  const avgSq2 = Math.floor((apu.accSq2 * 16) / apu.accumCycles);
  const avgTri = Math.floor(apu.accTri / apu.accumCycles);
  const avgDmc = Math.floor((apu.accDmc * 16) / apu.accumCycles);

  // Noise 直接采样
  const smpNoise = apu.noise.sample * 16;

  // ── 非线性混合 (左声道) ──
  let sqIndexL  = (avgSq1 * apu.panL[0] + avgSq2 * apu.panL[1]) >> 8;
  let tndIndexL = (3 * avgTri * apu.panL[2] + smpNoise * apu.panL[3] * 2 + avgDmc * apu.panL[4]) >> 8;

  if (sqIndexL  < 0) sqIndexL  = 0;
  if (sqIndexL  >= _squareTable.length) sqIndexL  = _squareTable.length - 1;
  if (tndIndexL < 0) tndIndexL = 0;
  if (tndIndexL >= _tndTable.length)    tndIndexL = _tndTable.length - 1;

  const sampleL = _squareTable[sqIndexL] + _tndTable[tndIndexL] - _dcValue;

  // ── 右声道 ──
  const panR = [
    256 - apu.panL[0], 256 - apu.panL[1],
    256 - apu.panL[2], 256 - apu.panL[3], 256 - apu.panL[4],
  ];
  let sqIndexR  = (avgSq1 * panR[0] + avgSq2 * panR[1]) >> 8;
  let tndIndexR = (3 * avgTri * panR[2] + smpNoise * panR[3] * 2 + avgDmc * panR[4]) >> 8;

  if (sqIndexR  < 0) sqIndexR  = 0;
  if (sqIndexR  >= _squareTable.length) sqIndexR  = _squareTable.length - 1;
  if (tndIndexR < 0) tndIndexR = 0;
  if (tndIndexR >= _tndTable.length)    tndIndexR = _tndTable.length - 1;

  const sampleR = _squareTable[sqIndexR] + _tndTable[tndIndexR] - _dcValue;

  // ── 归一化为 float [-1.0, 1.0] ──
  const normalizedL = Math.max(-1, Math.min(1, sampleL / 32768));
  const normalizedR = Math.max(-1, Math.min(1, sampleR / 32768));

  // ── 回调 ──
  if (apu.onSample) {
    apu.onSample(normalizedL, normalizedR);
  }

  // 重置累积器
  apu.accSq1  = 0;
  apu.accSq2  = 0;
  apu.accTri  = 0;
  apu.accDmc  = 0;
  apu.accumCycles = 0;
}

// ═══════════════ 便捷方法 ═══════════════

/**
 * 设置频谱声像
 * @param {object} apu
 * @param {number[]} pan — [sq1, sq2, tri, noise, dmc] 0-256 左声道权重
 */
export function setPanning(apu, pan) {
  for (let i = 0; i < 5; i++) {
    apu.panL[i] = Math.max(0, Math.min(256, pan[i] || 128));
  }
}

/**
 * 设置采样回调
 * @param {object} apu
 * @param {function} callback — (left: number, right: number) => void
 */
export function setSampleCallback(apu, callback) {
  apu.onSample = callback;
}

/**
 * 获取帧 IRQ 状态 (供 CPU 检查)
 */
export function getFrameIrq(apu) {
  return apu.frameIrqFlag;
}

/**
 * 获取 DMC IRQ 状态
 */
export function getDmcIrq(apu) {
  return apu.dmc.irqFlag;
}

// ═══════════════ 导出 APU_REG 常量给外部用 ═══════════════
