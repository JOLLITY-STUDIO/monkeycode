/**
 * 天使之翼2 - NMI (VBlank) 处理器
 * 
 * 对应原版 Bank $01:
 *   $01:8000-$01:8137: NMI handler 主体
 *   $01:80AF-$01:80D4: MMC3 CHR bank 切换
 *   $01:80D7-$01:8114: 手柄轮询
 *   $01:8116-$01:812B: 画面效果更新
 *   $01:812F-$01:8137: 场景标志 + 帧计数
 * 
 * NMI 每帧在 VBlank 期间由 PPU 触发, 执行:
 *   1. OAM DMA: CPU $0200-$02FF → PPU OAM (精灵属性表)
 *   2. VRAM 缓冲区刷新: 遍历 $05E8 队列写入 PPU
 *   3. 调色板更新: PPU $3F00 写入
 *   4. PPU 控制寄存器 ($2000, $2001)
 *   5. 滚屏寄存器 ($2005)
 *   6. MMC3 CHR bank 动画切换
 *   7. 手柄轮询 ($4016/$4017)
 *   8. 音乐/音效更新
 *   9. MMC3 IRQ 管理
 */

import { GameState } from '../types';
import { NesMemory } from './Memory';

// ============================================================================
// NMI 帧处理主函数
// 每帧调用一次, 在 VBlank 期间模拟 NES NMI
// ============================================================================
export function nmiFrame(ctx: GameState, mem: NesMemory): void {
  const ppu = ctx.ppu;
  const mmc3 = ctx.mmc3;
  const ram = ctx.cpu.ram;
  
  // ── 1. OAM DMA ($01:8000-$01:8007) ──
  // PPU OAM 地址归零 → DMA 从 $0200 复制 256 字节到 PPU OAM
  ppu.oamAddr = 0;
  for (let i = 0; i < 256; i++) {
    ppu.oam[i] = mem.ram[0x0200 + i];
  }
  
  // ── 2. VRAM 缓冲区刷新 ($01:800A-$01:8048) ──
  if (mem.ram[0x0628] !== 0) {
    // 检查 $0629 bit6 → 如果设置, 跳过 VRAM 写入
    if ((mem.ram[0x0629] & 0x40) === 0) {
      // 关 PPU 渲染
      ppu.mask = 0x00;
      
      // 遍历 $05E8 队列 (4 字节/条目)
      let idx = 0;
      while (idx < 256) {
        const control = mem.ram[0x05E8 + idx];
        if (control === 0) break;          // 队列结束
        
        const count = (control & 0x80) ? (control & 0x3F) : 128;
        const ppuCtrl = (control & 0x80) ? 0x84 : 0x80;
        // 写 PPU_CTRL
        ppu.ctrl = ppuCtrl;
        
        const addrHi = mem.ram[0x05E8 + idx + 2];
        const addrLo = mem.ram[0x05E8 + idx + 1];
        
        // 设 PPU 地址 ($2006 两次)
        ppu.vramAddr = ((addrHi << 8) | addrLo) & 0x3FFF;
        
        // 循环写数据
        for (let j = 0; j < count; j++) {
          const data = mem.ram[0x05E8 + idx + 3 + j * 4];
          ppu.frameBuffer[ppu.vramAddr & 0x3FFF] = data;
          ppu.vramAddr = (ppu.vramAddr + ppu.vramInc) & 0x3FFF;
        }
        
        idx += 4;
        if (mem.ram[0x05E8 + idx] === 0) break;
      }
    }
    
    // 清 VRAM 缓冲区标志
    mem.ram[0x0628] = 0;
    
    // 设调色板地址 ($3F00)
    ppu.vramAddr = 0x3F00;
    ppu.vramAddr = 0x3F00;                 // 第二次写 $2006
  }
  
  // ── 3. PPU 控制寄存器恢复 ($01:805D-$01:805F) ──
  ppu.mask = ram[0x21];                    // $2001 = $21
  
  // ── 4. 音乐效果/滚屏处理 ($01:8062-$01:8081) ──
  // ppu.ctrl bit1 = $45 bit7 (nametable 选择)
  // ppu.ctrl bit2 = $7B bit0 (滚屏开关)
  let ppuCtrlBits = 0;
  ppuCtrlBits |= ((ram[0x45] & 0x80) >> 6); // bit7→bit1
  ppuCtrlBits |= ((ram[0x7B] & 0x01) << 1); // bit0→bit1
  ppu.ctrl = (ppu.ctrl & 0xF8) | ppuCtrlBits;
  
  // ── 5. 写滚屏寄存器 ($01:8086-$01:808E) ──
  ppu.scrollX = ram[0x7A];                 // $2005 = $7A
  ppu.scrollY = (ram[0x44] > 0) ? (ram[0x44] - 1) : 0; // $2005 = X-1
  
  // ── 6. 音乐/音效更新 ($01:8091-$01:8093) ──
  // JSR $A1CB → 比赛引擎音效回调
  // (待实现)
  
  // ── 7. MMC3 IRQ 设置 ($01:8096-$01:80AD) ──
  if (ram[0x79] !== 0) {
    mmc3.irqLatch = ram[0x79] << 1;
    mmc3.irqCounter = ram[0x79] << 1;
    mmc3.irqEnabled = true;
    ram[0x78] = 4;                         // 音乐轨道
  } else {
    mmc3.irqEnabled = false;
    ram[0x78] = 0;
  }
  
  // ── 8. MMC3 CHR bank 动画切换 ($01:80AF-$01:80D4) ──
  // CHR bank 2: $9E
  mmc3.chrBank[2] = ram[0x9E] || 2;
  // CHR bank 3: $9F  
  mmc3.chrBank[3] = ram[0x9F] || 3;
  // CHR bank 4: $A0
  mmc3.chrBank[4] = ram[0xA0] || 4;
  // CHR bank 5: $A1
  mmc3.chrBank[5] = ram[0xA1] || 5;
  
  // ── 9. 手柄轮询 ($01:80D7-$01:8114) ──
  pollControllers(ctx, mem);
  
  // ── 10. 画面效果更新 ($01:8116-$01:812B) ──
  // 效果参数每帧递增:
  // $E1 += 0x83
  // $E2 += 0x0D
  // $E3 += 0x11
  ram[0xE1] = (ram[0xE1] + 0x83) & 0xFF;
  ram[0xE2] = (ram[0xE2] + 0x0D) & 0xFF;
  ram[0xE3] = (ram[0xE3] + 0x11) & 0xFF;
  
  // $8129-$812D: 清 $46/$47
  ram[0x46] = 0;
  ram[0x47] = 0;
  
  // ── 11. 场景标志 + 帧计数 ($01:812F-$01:8137) ──
  // $1B bit7 = 1 → 标记已进入场景
  ram[0x1B] = ram[0x1B] | 0x80;
  // INC $3A → 帧计数低字节
  ram[0x3A] = (ram[0x3A] + 1) & 0xFF;
}

// ============================================================================
// 手柄轮询
// 对应 $01:80D7-$01:8114
// 
// 每个手柄读取流程:
//   1. 写 $4016 bit0 = 1 (锁存)
//   2. 写 $4016 bit0 = 0
//   3. 循环 8 次读 $4016/$4017 → 每位存到 $3F
//   4. 比较上次状态 → 计算按下/按住/弹起
// ============================================================================
function pollControllers(_ctx: GameState, mem: NesMemory): void {
  const ram = mem.ram;
  
  // 手柄 1
  let joy1 = mem.ram[0x1B];                // $1B = 游戏阶段/场景ID (复用为上次值)
  if (mem.ram[0x40] > 0) {                 // $40 = 重试计数
    ram[0x40]--;
  }
  
  // 读当前状态 ($3F → 实际存储在手柄状态寄存器中)
  const curState = readController(mem, 0);
  
  // $8107-$810D: 计算按下状态
  // $1D (按下) = (~$1B) & $3F
  // $1B = $3F
  const prevState = ram[0x1B];
  ram[0x1D] = ((~prevState) & curState) & 0xFF;
  ram[0x1B] = curState;
  
  // 手柄 2 (同样逻辑)
  let joy2 = mem.ram[0x1C];
  const prevJoy2 = mem.ram[0x1C];
  const curJoy2 = readController(mem, 1);
  mem.ram[0x20] = ((~prevJoy2) & curJoy2) & 0xFF;
  mem.ram[0x1C] = curJoy2;
}

/**
 * 读取单个手柄
 * 返回 8 位状态:
 *   bit7 = A
 *   bit6 = B
 *   bit5 = Select
 *   bit4 = Start
 *   bit3 = Up
 *   bit2 = Down
 *   bit1 = Left
 *   bit0 = Right
 */
function readController(_mem: NesMemory, _index: number): number {
  // 在模拟环境中, 从外部输入获取
  // 实际值由 index.ts 的键盘映射提供
  // 这里返回 0 (无输入)
  return 0;
}

// ============================================================================
// 导出控制器状态读取
// ============================================================================

/** 设置当前帧的控制器输入状态 */
export function setControllerState(mem: NesMemory, joy1: number, joy2: number = 0): void {
  mem.ram[0x1B] = joy1;
  mem.ram[0x1C] = joy2;
}

/** 获取按下(上升沿)状态 */
export function getPressed(mem: NesMemory, player: number): number {
  return player === 0 ? mem.ram[0x1D] : mem.ram[0x20];
}

/** 获取按住状态 */
export function getHeld(mem: NesMemory, player: number): number {
  return player === 0 ? mem.ram[0x1B] : mem.ram[0x1C];
}
