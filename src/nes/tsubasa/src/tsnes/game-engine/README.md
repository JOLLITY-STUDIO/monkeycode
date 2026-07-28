# game-engine 结构说明

## 目录映射

新结构下每个子目录与原始代码的对应关系：

| 新目录 | 原始代码来源 | 说明 |
|--------|-------------|------|
| `core/` | `src/` | CPU/PPU/APU/mapper 核心模拟器（逐文件复制，逻辑完全一致） |
| `data/` | `tsubasa-hex2asm/` | ROM 数据层（PRG 32 bank + CHR 16 bank） |
| `scene/` | `prg_bank_00_dispatch_scene_engine.ts` | Bank 00 场景引擎语义翻译 |
| `render/` | 渲染层 | Canvas/ImageData 画面输出 |
| `adapters/` | 平台适配器 | 微信小程序 / Web 浏览器 |

---

## 核心文件对照表

### `core/` ← `src/`（1:1 复制，无逻辑变化）

| 新文件 | 原始文件 | 修改 |
|--------|---------|------|
| `core/cpu.ts` | `src/cpu.ts` | 无 |
| `core/nes.ts` | `src/nes.ts` | `"./rom"` → `"./rom-loader"` |
| `core/rom-loader.ts` | `src/rom.ts` | 无（文件名改了） |
| `core/controller.ts` | `src/controller.ts` | 无 |
| `core/gamegenie.ts` | `src/gamegenie.ts` | 无 |
| `core/tile.ts` | `src/tile.ts` | 无 |
| `core/utils.ts` | `src/utils.ts` | 无 |
| `core/ppu/index.ts` | `src/ppu/index.ts` | 无 |
| `core/ppu/nametable.ts` | `src/ppu/nametable.ts` | 无 |
| `core/ppu/palette-table.ts` | `src/ppu/palette-table.ts` | 无 |
| `core/papu/*.ts` | `src/papu/*.ts` | 无 |
| `core/mappers/*.ts` | `src/mappers/*.ts` | 无 |

### `data/` ← `tsubasa-hex2asm/`

| 新文件 | 原始数据 | 功能 |
|--------|---------|------|
| `data/rom-data.ts` | `prg_banks/prg_bank_00~31_*.ts` | 聚合 32 个 8KB PRG-ROM bank |
| `data/chr-data.ts` | `chr_rom_data.ts` (+ `chr_banks/` + `vrom_banks/`) | 聚合 16 个 8KB + 32 个 4KB CHR-ROM bank |

### `scene/` ← Bank 00 语义翻译

| 新文件 | 对应原始逻辑 |
|--------|-------------|
| `scene/dispatch.ts` | Bank 00 场景分派器（读 `$0041` 场景ID，分发到标题/菜单/比赛） |
| `scene/bytecode.ts` | Bank 00 字节码解释器（WAIT/DIALOG/SET_FLAG 等脚本命令） |
| `scene/opcode-table.ts` | Bank 00 `$8000` 处 JMP dispatch 表 |

### `render/` 渲染层

| 新文件 | 功能 |
|--------|------|
| `render/canvas-renderer.ts` | PPU BGR 帧缓冲 → RGBA ImageData → Canvas |

### `adapters/` 平台适配

| 新文件 | 平台 | 功能 |
|--------|------|------|
| `adapters/web-adapter.ts` | Web 浏览器 | Canvas + AudioContext + 键盘输入 |
| `adapters/mp-adapter.ts` | 微信小程序 | Canvas + wx.createWebAudioContext + 触摸输入 |

### 新增的引导文件

| 新文件 | 功能 |
|--------|------|
| `core/boot.ts` | 启动入口：组装 ROM → 创建 NES 实例 → CPU 从 RESET 向量 ($FFF0) 开始 |
| `index.ts` | 模块总入口，re-export 所有公开 API |

---

## 启动流程从 Bank 31 开始

```
CPU RESET
  │
  ▼
$FFFC-$FFFD → 向量 = $FFF0          (bank 31 固定最后)
  │
  ▼
CODE_RESET ($FFF0):                  (prg_bank_31_boot_vectors.ts)
  LDA #$00
  STA $8000                          写入 MMC3 选中 bank 00 到 $8000 窗口
  JMP $C503
  │
  ▼
Bank 30: $C503 → JMP $C64E           (prg_bank_30_system_lib.ts)
  系统库初始化:
  - 配置 PPU 控制寄存器
  - 清空 CPU RAM ($0000-$1FFF)
  - 初始化 MMC3 mirroring
  - 重置堆栈指针
  - JMP bank 00 dispatch
  │
  ▼
Bank 00: 场景分派引擎                (prg_bank_00_dispatch_scene_engine.ts)
  读 $0041 → 场景 ID
  分发到 标题/菜单/比赛/过场/GameOver
```

MMC3 初始 bank 映射：

| CPU 地址区间 | MMC3 bank | 内容 |
|-------------|-----------|------|
| $8000-$9FFF | bank 00 | 调度/场景引擎 |
| $A000-$BFFF | bank 01 | 比赛跳转表 |
| $C000-$DFFF | bank 30 | 系统库（倒数第二固定）|
| $E000-$FFFF | bank 31 | 启动向量（最后固定）|

---

## 使用示例

```typescript
import { createTsubasaNES, WebAdapter } from './game-engine';

// 创建模拟器（ROM 自动组装，CPU 从 RESET 开始执行）
const nes = createTsubasaNES();

// Web 适配器
const adapter = new WebAdapter({ canvas: document.querySelector('canvas')! });
adapter.startAudio();

// 帧循环
setInterval(() => {
  // 输入同步
  const btns = adapter.getButtons();
  // ... 映射到 nes.buttonDown/buttonUp ...

  // 推进一帧（CPU → PPU → APU）
  nes.frame();

  // 渲染
  adapter.writeFrame(nes.ppu.buffer as Uint32Array);
  adapter.renderToCanvas();
}, 1000 / 60);
```

---

## 修改记录

| 日期 | 变更 |
|------|------|
| 2026-07-28 | 初始版本：从 `src/` 复制核心模拟器、从 `tsubasa-hex2asm/` 聚合 ROM 数据、创建场景引擎翻译骨架、实现 render/adapters 层 |
