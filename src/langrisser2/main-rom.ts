/**
 * main-rom.ts — ROM 翻译路径入口 (BootRom + RomInits + RomTaskSystem)
 *
 * 架构: ROM 68K 汇编 → 手工翻译为 TypeScript
 *       不是 CPU 模拟器, 而是直接把 ROM 逻辑搬成 TS 代码
 *
 * 流水线:
 *   1. 用户选择 ROM 文件 (WebPlatform)
 *   2. RomLoader.load() → 解析 ROM 头/中断向量/VDP 初始化表
 *   3. BootRom.execute() → 步骤 1-5: TMSS/VDP/Z80/RAM/校验
 *   4. RomInits.executeAllInits() → 步骤 6-13: 系统/任务/游戏初始化
 *   5. RomTaskSystem 驱动游戏逻辑
 *   6. 60fps 主循环 → VDP stepFrame + Renderer.renderFrame + Canvas flip
 */

import { RomLoader } from './game/core/RomLoader.js';
import { Ram } from './game/core/Ram.js';
import { VdpChip } from './game/vdp/VdpChip.js';
import { Renderer } from './game/vdp/Renderer.js';
import { BootRom } from './game/boot/BootRom.js';
import { RomInits } from './game/rom/RomInits.js';
import { RomTaskSystem } from './game/rom/RomTaskSystem.js';
import { WebPlatform } from './game/platform/WebPlatform.js';

// ============================================================
// DOM
// ============================================================
const canvas   = document.getElementById('gameCanvas') as HTMLCanvasElement;
const btnRom   = document.getElementById('btnRom')   as HTMLButtonElement;
const btnStop  = document.getElementById('btnStop')  as HTMLButtonElement;
const btnVram  = document.getElementById('btnDumpVram') as HTMLButtonElement;
const btnReg   = document.getElementById('btnDumpReg') as HTMLButtonElement;
const infoEl   = document.getElementById('info')     as HTMLDivElement;
const logEl    = document.getElementById('log')      as HTMLPreElement;

const logs: string[] = [];
function log(msg: string, cls: string = ''): void {
  logs.push(msg);
  logEl.innerHTML = logs.map(l => {
    if (l.startsWith('✓')) return `<span class="ok">${l}</span>`;
    if (l.startsWith('✗')) return `<span class="err">${l}</span>`;
    if (l.startsWith('⚠')) return `<span class="warn">${l}</span>`;
    return `<span class="dim">${l}</span>`;
  }).join('\n');
  logEl.scrollTop = logEl.scrollHeight;
}

function setInfo(msg: string): void { infoEl.innerHTML = msg; }

// ============================================================
// 全局实例 — 翻译路径不使用 Game/Cpu/Memory
// ============================================================
const platform = new WebPlatform(canvas);

let rom    = new RomLoader();
let ram    = new Ram();
let vdp    = new VdpChip();
let renderer = new Renderer(vdp);
let romInits: RomInits | null = null;
let taskSystem: RomTaskSystem | null = null;

let animFrameId = 0;
let running = false;

// ============================================================
// ROM 加载 & 启动
// ============================================================

async function onBootRom(): Promise<void> {
  logs.length = 0;
  btnRom.disabled = true;
  setInfo('正在加载 ROM...');

  try {
    // 1. 加载 ROM
    const romBuffer = await platform.loadRomBinary();
    rom.load(romBuffer);

    log(`ROM 大小: ${rom.size} 字节 (${(rom.size / 1024).toFixed(0)} KB)`);
    log(`游戏名称: ${rom.readGameName()}`);
    log(`产品编号: ${rom.readProductCode()}`);

    // 2. 读取中断向量
    const vectors = rom.readInterruptVectors();
    log(`SSP:      $${vectors.ssp.toString(16).toUpperCase()}`);
    log(`Reset PC: $${vectors.reset.toString(16).toUpperCase()}`);
    log(`VBlank:   $${vectors.vblank.toString(16).toUpperCase()}`);
    log(`HBlank:   $${vectors.hblank.toString(16).toUpperCase()}`);

    // 3. 读取 VDP 初始化寄存器数据
    const vdpRegs = rom.readVdpInitRegs();
    log(`VDP 初始化表 ($80B2, ${vdpRegs.length} bytes): ${Array.from(vdpRegs).map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ')}`);

    // 4. 执行 Boot (步骤 1-5)
    setInfo('正在执行 Boot 序列 (步骤 1-5)...');
    const boot = new BootRom(rom, ram, vdp);
    romInits = boot.execute();

    if (!romInits) {
      log('✗ Boot 失败! 校验和不匹配', 'err');
      setInfo('<span class="err">Boot 失败 — ROM 校验错误</span>');
      btnRom.disabled = false;
      return;
    }

    // 5. 系统初始化 (步骤 6-13) — 翻译后的逻辑
    setInfo('正在执行系统初始化 (步骤 6-13)...');
    romInits.executeAllInits();

    // 6. 创建任务调度系统 — 驱动后续游戏逻辑
    taskSystem = new RomTaskSystem(rom.getData(), ram, vdp);
    taskSystem.markInitsDone(); // 通知初始化完成, 驱动状态机

    // 7. 打印 VDP 寄存器状态
    const regStr = Array.from(vdp.reg).map((v, i) =>
      `R$${i.toString(16).toUpperCase()}=${v.toString(16).padStart(2,'0').toUpperCase()}`
    ).join(' ');
    log(`✓ VDP 寄存器已初始化: ${regStr}`);

    // 8. 校验和
    const csum = rom.computeChecksum();
    log(`✓ ROM 校验和: $${csum.toString(16).toUpperCase()} (期望 $D79F)`);

    // 9. 确认 VDP 地址配置
    log(`Plane A Nametable: $${vdp.planeAAddr.toString(16).toUpperCase()}`);
    log(`Plane B Nametable: $${vdp.planeBAddr.toString(16).toUpperCase()}`);
    log(`Sprite Attr Table: $${vdp.spriteTableAddr.toString(16).toUpperCase()}`);
    log(`Display: ${vdp.h40Mode ? '320px H40' : '256px H32'}, ` +
      `${vdp.palMode ? 'PAL' : 'NTSC'}`);

    setInfo('<span class="ok">✓ ROM 加载 & Boot & 初始化完成!</span> ' +
      `<span>游戏: <span class="rom-name">${rom.readGameName()}</span></span>`);

    // 10. 开始 60fps 主循环 (翻译路径: 不跑 CPU 模拟器)
    btnStop.disabled = false;
    running = true;
    gameLoop();

  } catch (err: any) {
    log(`✗ 错误: ${err.message}`, 'err');
    setInfo(`<span class="err">加载失败: ${err.message}</span>`);
    btnRom.disabled = false;
  }
}

/** 60fps 主循环 — 翻译路径 (不使用 CPU 模拟器) */
function gameLoop(): void {
  if (!running) return;

  // 1. 任务调度系统更新 (翻译后的 ROM 逻辑)
  //    包括: 任务链推进 + 显示队列处理 (VRAM/CRAM DMA)
  taskSystem?.frameUpdate();

  // 2. VDP 帧步进 (重置计数器, 推进帧号)
  vdp.stepFrame();

  // 3. 渲染到 Canvas
  renderFrame();

  // 4. 请求下一帧
  animFrameId = platform.requestFrame(gameLoop);
}

/** VDP → Canvas 渲染 */
function renderFrame(): void {
  const ctx = platform.ctx;
  ctx.clearRect(0, 0, platform.displayWidth, platform.displayHeight);

  const imageData = renderer.renderFrame(ctx);
  ctx.putImageData(imageData, 0, 0);
}

function onStop(): void {
  running = false;
  if (animFrameId) {
    platform.cancelFrame(animFrameId);
    animFrameId = 0;
  }
  btnStop.disabled = true;
  btnRom.disabled = false;
  setInfo('已停止');
}

function onDumpVram(): void {
  // 导出 VRAM 前 1KB 到日志
  const vramData = vdp.vram;
  let dump = '';
  for (let i = 0; i < 1024; i += 32) {
    const hex = [];
    for (let j = 0; j < 32; j++) {
      hex.push(vramData.readByte(i + j).toString(16).padStart(2, '0'));
    }
    dump += `$${i.toString(16).padStart(4,'0').toUpperCase()}: ${hex.join(' ')}\n`;
  }
  log(dump);
}

function onDumpReg(): void {
  const lines = [];
  for (let i = 0; i < 24; i++) {
    const v = vdp.reg[i];
    const desc = describeReg(i, v);
    lines.push(`R$${i.toString(16).toUpperCase()}=$${v.toString(16).padStart(2,'0').toUpperCase()} | ${desc}`);
  }
  log(lines.join('\n'));
}

function describeReg(n: number, v: number): string {
  switch (n) {
    case 0x00: return `HInt=${(v>>4)&1} HVlatch=${v&1}`;
    case 0x01: return `Disp=${(v>>6)&1} VInt=${(v>>5)&1} DMA=${(v>>4)&1} PAL=${(v>>3)&1}`;
    case 0x02: return `PlaneA @ $${(v*0x400).toString(16)}`;
    case 0x03: return `Window @ $${(v*0x400).toString(16)}`;
    case 0x04: return `PlaneB @ $${(v*0x400).toString(16)}`;
    case 0x05: return `Sprite @ $${(v*0x200).toString(16)}`;
    case 0x0C: return `H40=${v&1} Shadow=${(v>>3)&1} Interlace=${(v>>2)&1}`;
    case 0x0D: return `HScroll @ $${(v*0x400).toString(16)}`;
    case 0x0F: return `AutoInc=${v}`;
    case 0x10: return `SizeA=${[32,64,0,128][v&3]} SizeB=${[32,64,0,128][(v>>4)&3]}`;
    default: return '';
  }
}

// ============================================================
// 按钮事件
// ============================================================

btnRom.addEventListener('click', onBootRom);
btnStop.addEventListener('click', onStop);
btnVram.addEventListener('click', onDumpVram);
btnReg.addEventListener('click', onDumpReg);

// ============================================================
// 初始画面
// ============================================================
const ctx = canvas.getContext('2d')!;
ctx.fillStyle = '#0a0a0a';
ctx.fillRect(0, 0, 320, 224);
ctx.font = 'bold 16px monospace';
ctx.textAlign = 'center';
ctx.fillStyle = '#e94560';
ctx.fillText('Langrisser II', 160, 100);
ctx.font = '11px monospace';
ctx.fillStyle = '#666';
ctx.fillText('点击「选择 ROM 并启动」开始', 160, 130);
