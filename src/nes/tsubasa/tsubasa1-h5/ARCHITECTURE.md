# 天使之翼1 H5 — 架构设计文档

> **版本**: v1.1.0 | **日期**: 2026-08-06  
> **目标**: 将NES版天使之翼1完整转写为纯TypeScript+Canvas游戏  
> **主平台**: 微信小程序 (WeChat Mini Program)  
> **副平台**: HTML5浏览器 (开发调试 & 独立部署)

---

## 1. 设计原则

| 原则 | 说明 |
|------|------|
| **非模拟器** | 不使用CPU模拟，直接用TS重写所有游戏逻辑 |
| **前后端分离** | 游戏逻辑(Model/Controller) 与 渲染(View/Canvas) 完全解耦 |
| **数据驱动** | 所有ROM数据提取为结构化TS数据，零二进制硬编码 |
| **即插即用** | 对外仅暴露 `new Tsubasa(ctx).start()` 接口 |
| **可调试** | 内置调试面板查看所有内部数据状态 |
| **双平台** | 微信小程序为主，HTML5浏览器为开发调试/独立部署 |

## 1.1 双平台策略

```
┌─────────────────────────────────────────────────────┐
│                   game/ 目录 (共享)                    │
│  core/ engine/ data/ render/ game/ assets/           │
│  纯 TS 逻辑，不依赖任何平台 API                         │
└──────────────┬──────────────────┬───────────────────┘
               │                  │
     ┌─────────▼────────┐  ┌─────▼──────────────┐
     │  微信小程序 (主)    │  │  HTML5 浏览器 (副)   │
     │  pages/game/      │  │  src/index.html    │
     │  pages/debug/     │  │  独立 HTTP 服务      │
     │  app.ts/json/wxss │  │  Node.js serve      │
     │  微信 Canvas API   │  │  浏览器 Canvas API   │
     └──────────────────┘  └────────────────────┘
```

- **微信小程序** (主): 最终产物，发布到微信生态
- **HTML5 浏览器** (副): 开发阶段快速迭代调试；也可独立部署为 Web 版本

---

## 2. 项目文件结构

```
tsubasa1-h5/
├── app.ts                          # 微信小程序入口
├── app.json                        # 小程序配置
├── app.wxss                        # 全局样式
├── project.config.json             # 项目配置
│
├── pages/
│   ├── game/                       # 主游戏页面
│   │   ├── game.ts                 # 页面逻辑
│   │   ├── game.wxml               # 页面模板
│   │   └── game.wxss               # 页面样式
│   │
│   └── debug/                      # 调试页面集
│       ├── chr-all/                # CHR图库浏览
│       ├── pattern-table-all/      # Pattern Table
│       ├── nametable-all/          # Nametable查看
│       ├── sprite-all/             # 精灵浏览
│       ├── palette-all/            # 调色板浏览
│       ├── audio-all/              # 音频资源
│       └── data-api/               # 数据API调试(Swagger风格)
│
├── src/
│   ├── core/                       # 游戏内核
│   │   ├── Tsubasa.ts              # 主入口类 (对外暴露)
│   │   ├── GameLoop.ts             # 主循环 (原$81EE)
│   │   ├── StateMachine.ts         # 状态机 (原$81F7)
│   │   ├── NmiHandler.ts           # NMI处理 (原$80E0)
│   │   └── BankDispatcher.ts       # Bank调度器 (原$84D2)
│   │
│   ├── engine/                     # 引擎子系统
│   │   ├── PpuEngine.ts            # PPU渲染引擎
│   │   ├── PpuQueue.ts             # PPU更新队列 (原$812F)
│   │   ├── InputManager.ts         # 手柄输入 (原$81B9)
│   │   ├── AudioEngine.ts          # 音频引擎
│   │   └── MathUtils.ts            # 数学工具 (乘除法)
│   │
│   ├── game/                       # 游戏逻辑层
│   │   ├── opening/                # 开场动画 (原Bank 1)
│   │   │   ├── OpeningScene.ts     # 开场调度器
│   │   │   ├── StoryboardEngine.ts # 故事板引擎 (原$DC20)
│   │   │   └── RleDecoder.ts       # RLE解码器
│   │   │
│   │   ├── menu/                   # 菜单系统 (原Bank 6)
│   │   │   ├── MenuScene.ts        # 菜单选择
│   │   │   ├── ResultScene.ts      # 结果画面
│   │   │   └── EventScene.ts       # 进球/半场事件
│   │   │
│   │   ├── match/                  # 比赛系统 (原Bank 4)
│   │   │   ├── MatchEngine.ts      # 比赛主引擎
│   │   │   ├── MatchInit.ts        # 比赛初始化
│   │   │   ├── AiController.ts     # AI控制器
│   │   │   ├── PhysicsEngine.ts    # 物理引擎
│   │   │   └── SpecialMove.ts      # 必杀技系统
│   │   │
│   │   └── title/                  # 标题画面 (原Bank 5)
│   │       └── TitleScene.ts
│   │
│   ├── data/                       # 数据层
│   │   ├── DataStore.ts            # Key-Value数据中心 (替代内存)
│   │   ├── tables/                 # 结构化数据表
│   │   │   ├── PlayerTable.ts      # 球员数据
│   │   │   ├── TeamTable.ts        # 球队数据
│   │   │   ├── EventScriptTable.ts # 事件脚本
│   │   │   ├── TextTable.ts        # 文本数据
│   │   │   └── MatchDataTable.ts   # 比赛配置
│   │   └── raw/                    # 原始ROM数据(声明式)
│   │       ├── bank_00_data.ts
│   │       ├── bank_01_data.ts
│   │       └── ...
│   │
│   ├── render/                     # 渲染层
│   │   ├── Renderer.ts             # Canvas渲染器
│   │   ├── TileRenderer.ts         # Tile渲染
│   │   ├── SpriteRenderer.ts       # 精灵渲染
│   │   ├── NametableRenderer.ts    # Nametable渲染
│   │   └── PaletteManager.ts       # 调色板管理
│   │
│   └── assets/                     # 静态资源
│       ├── chr/                    # CHR导出的PNG图集
│       │   ├── chr_bank_00.png
│       │   ├── chr_bank_01.png
│       │   └── ...
│       └── fonts/                  # 字体tile
│
├── scripts/                        # 工具脚本
│   ├── extract_chr.ts              # CHR→PNG导出
│   ├── generate_data.ts            # ROM数据→TS生成
│   └── auto_test.ts                # 自动化测试脚本
│
├── test/                           # 测试
│   ├── unit/                       # 单元测试
│   └── integration/                # 集成测试
│
└── temp/                           # 临时产物
```

---

## 3. 核心架构 — MVC分层

```
┌─────────────────────────────────────────────────────────┐
│                     VIEW (Canvas渲染)                     │
│  pages/game/game.ts  ←→  Renderer.ts, SpriteRenderer.ts  │
│  用户只看到Canvas画面，通过触摸/键盘操作                   │
└──────────────────────┬──────────────────────────────────┘
                       │ 操作事件
                       ▼
┌─────────────────────────────────────────────────────────┐
│                 CONTROLLER (业务调度)                     │
│  Tsubasa.ts → GameLoop.ts → StateMachine.ts              │
│  BankDispatcher.ts (原$84D2) 协调各Bank逻辑              │
└──────────────────────┬──────────────────────────────────┘
                       │ 读/写
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    MODEL (数据+逻辑)                       │
│  ┌──────────────┐  ┌──────────────────────────────────┐ │
│  │  DataStore   │  │  游戏逻辑模块                      │ │
│  │  (KV缓存)    │  │  opening/ menu/ match/ title/     │ │
│  │  内存映射    │  │  (原各Bank的code逻辑)              │ │
│  └──────────────┘  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐   │
│  │  结构化数据表 (PlayerTable, TeamTable, ...)       │   │
│  │  → 从 raw/ 原始ROM数据构建                        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 4. 数据中心 (DataStore) 设计

替代原来6502的RAM/OAM/VRAM，使用类似Redis的Key-Value结构:

```typescript
class DataStore {
  // ====== 系统区 (原 $0000-$03FF) ======
  // 零页指针
  ptr00: number = 0;     // ram_0000
  ptr01: number = 0;     // ram_0001
  
  // PPU寄存器镜像
  scrollX: number = 0;   // $0016
  scrollY: number = 0;   // $0017
  ppuMask: number = 0;   // $0018
  ppuCtrl: number = 0;   // $0019
  
  // 系统变量
  bankLock: number = 0;  // $0093
  frameCounter: number = 0;  // $0300
  joy1Cur: number = 0;   // $0301
  joy2Cur: number = 0;   // $0302
  joy1Prev: number = 0;  // $0303
  joy2Prev: number = 0;  // $0304
  ppuQueueCount: number = 0; // $0305
  
  // OAM (256B)
  oam: Uint8Array = new Uint8Array(256);
  
  // PPU队列 (原 $0306-$0338)
  ppuQueue: number[] = [];
  
  // VRAM缓冲区 (原 $0339-$03FF)
  vramBuffer: number[] = [];
  
  // ====== 游戏状态区 ======
  gameState: number = 0;    // $03CA (0-7)
  subState: number = 0;     // $03CB
  
  // ====== 比赛区 (原 $0400-$05FF) ======
  scoreA: number = 0;       // $05E0
  scoreB: number = 0;       // $05E1
  matchFlags: number = 0;   // $05EF
  matchPhase: number = 0;   // $064F
  
  // ====== Bank 6 工作区 (原 $0680-$07FF) ======
  rankData: number[] = [];  // $06FF-$0716 (4×6)
  
  // ====== VRAM (Nametables) ======
  nametable0: Uint8Array = new Uint8Array(960);  // 32×30 tiles
  nametable1: Uint8Array = new Uint8Array(960);
  nametable2: Uint8Array = new Uint8Array(960);
  nametable3: Uint8Array = new Uint8Array(960);
  
  // ====== 通用KV存储 (原$04-$FF零页变量) ======
  private _zp: Map<string, number> = new Map();
  
  getZP(key: string): number { return this._zp.get(key) ?? 0; }
  setZP(key: string, val: number): void { this._zp.set(key, val); }
}
```

---

## 5. Tsubasa 主入口API

```typescript
/**
 * 天使之翼1 游戏主入口
 * 用法: const game = new Tsubasa(canvasContext); game.start();
 */
class Tsubasa {
  private ctx: CanvasRenderingContext2D;
  private dataStore: DataStore;
  private gameLoop: GameLoop;
  private renderer: Renderer;
  private inputManager: InputManager;
  private audioEngine: AudioEngine;
  
  // AI挂机模式
  private aiMode: boolean = false;
  private aiController: AiAutoPlay;
  
  constructor(ctx: CanvasRenderingContext2D, options?: TsubasaOptions) {
    this.ctx = ctx;
    this.dataStore = new DataStore();
    this.renderer = new Renderer(ctx, this.dataStore);
    this.inputManager = new InputManager(this.dataStore);
    this.audioEngine = new AudioEngine(this.dataStore);
    this.gameLoop = new GameLoop(this.dataStore, this.renderer, this.inputManager, this.audioEngine);
    
    if (options?.aiMode) {
      this.aiController = new AiAutoPlay(this.dataStore, this.inputManager);
    }
  }
  
  /** 启动游戏 */
  start(): void {
    this.gameLoop.reset();    // 等价于 RESET 流程
    this.gameLoop.start();    // 等价于 JMP $81EE
  }
  
  /** 暂停/恢复 */
  pause(): void { this.gameLoop.pause(); }
  resume(): void { this.gameLoop.resume(); }
  
  /** 设置按键 (外部输入) */
  setButton(player: 1 | 2, buttons: number): void {
    this.inputManager.setButton(player, buttons);
  }
  
  /** 获取调试信息 */
  getDebugInfo(): DebugInfo { return this.dataStore.getDebugSnapshot(); }
}
```

---

## 6. GameLoop 主循环设计

```typescript
class GameLoop {
  private running: boolean = false;
  private animFrameId: number = 0;
  
  /** 帧循环 (对应原 $81EE-$81F6) */
  private frame(): void {
    if (!this.running) return;
    
    // ====== 等价于 NMI ======
    this.nmiHandler.process();   // $80E0: OAM DMA, PPU队列, 输入, 随机数
    
    // ====== 等价于 JSR $81F7 ======
    this.stateMachine.dispatch(); // 根据 gameState 分发
    
    // ====== 渲染 ======
    this.renderer.render();       // Canvas绘制
    
    // ====== 音频 ======
    this.audioEngine.tick();
    
    // ====== 下一帧 ======
    this.animFrameId = requestAnimationFrame(() => this.frame());
  }
  
  start(): void {
    this.running = true;
    this.animFrameId = requestAnimationFrame(() => this.frame());
  }
}
```

---

## 7. StateMachine 状态机

```typescript
/** 游戏状态枚举 */
enum GameState {
  OPENING = 0,   // 开场动画
  TITLE = 1,     // 标题画面
  MENU = 2,      // 菜单选择
  MATCH_INIT = 3,// 比赛初始化
  MATCH_LOOP = 4,// 比赛主循环
  TRANSITION = 5,// 状态转换
  EVENT = 6,     // 进球/半场事件
  RESULT = 7,    // 比赛结果
}

/** 状态分发 (原 $81F7-$8263) */
class StateMachine {
  private handlers: Map<GameState, () => void>;
  
  constructor() {
    this.handlers = new Map([
      [GameState.OPENING,    () => this.bankDispatcher.call(0x10)], // Bank 1, Sub 0
      [GameState.TITLE,      () => this.bankDispatcher.call(0x5D)], // Bank 5, Sub D
      [GameState.MENU,       () => this.bankDispatcher.call(0x60)], // Bank 6, Sub 0
      [GameState.MATCH_INIT, () => this.matchInit.execute()],
      [GameState.MATCH_LOOP, () => this.matchEngine.execute()],
      [GameState.TRANSITION, () => this.transitionManager.execute()],
      [GameState.EVENT,      () => this.bankDispatcher.call(0x63)], // Bank 6, Sub 3
      [GameState.RESULT,     () => this.bankDispatcher.call(0x61)], // Bank 6, Sub 1
    ]);
  }
  
  dispatch(): void {
    const state = this.dataStore.gameState;
    const handler = this.handlers.get(state);
    handler?.();
  }
}
```

---

## 8. MMC1 Bank调度模拟

```typescript
/**
 * Bank调度器 (原 $84D2)
 * 参数A编码: bit7-4=Bank编号, bit3-0=Sub编号
 */
class BankDispatcher {
  private banks: Map<number, BankModule> = new Map();
  private currentBank: number = 0;
  
  /** 调度到指定Bank的Sub (原 JSR $84D2) */
  call(param: number): void {
    const bankId = (param >> 4) & 0x0F;   // Bank编号 (bit7-4)
    const subId = param & 0x0F;            // Sub编号 (bit3-0)
    
    // 如果Bank变了，先切换
    if (bankId !== this.currentBank) {
      this.switchBank(bankId);
    }
    
    // 调用对应Sub
    const bank = this.banks.get(bankId);
    bank?.callSub(subId);
  }
  
  private switchBank(bankId: number): void {
    // 模拟MMC1 Bank切换
    this.currentBank = bankId;
    // 实际上在TS中，这只是改变函数调用目标
  }
}
```

---

## 9. PPU渲染管线

```
原始NES PPU管线                    →    TypeScript Canvas管线
═══════════════                        ═══════════════════
Pattern Table (CHR ROM 8KB)     →    PNG图集 (chr_bank_XX.png)
Nametable (VRAM 2KB)            →    NametableRenderer
OAM (256B精灵属性)               →    SpriteRenderer
Palette RAM (32B)               →    PaletteManager (RGBA数组)
$2006/$2007 写入                 →    TileRenderer.drawTile()

渲染流程 (每帧):
1. 读取 Nametable + Attribute Table
2. 解码每个Tile: Pattern Table索引 + 调色板 → RGBA像素
3. 读取 OAM → 精灵像素叠加
4. 输出到 Canvas (256×240 → 缩放到Canvas尺寸)
```

---

## 10. 音频引擎

由于微信小程序不支持Web Audio API的部分特性，音频方案:
- **方案A**: 使用微信 `InnerAudioContext` 播放预录的OGG/MP3音效
- **方案B**: 使用 `wx.createWebAudioContext()` (若支持)
- **方案C**: 提取Bank 5的APU数据，转换为Web Audio合成

推荐方案A+B混合:
- 背景音乐: 预录OGG循环播放
- 短音效: Web Audio合成或预录

---

## 11. AI自动挂机设计

```typescript
class AiAutoPlay {
  /**
   * 自动决策每帧的操作
   * 返回: 模拟的手柄按键
   */
  decide(): number {
    const state = this.dataStore.gameState;
    
    switch (state) {
      case GameState.OPENING:
        return this.decideOpening();  // 按START跳过
      case GameState.TITLE:
        return this.decideTitle();     // 按START进入
      case GameState.MENU:
        return this.decideMenu();      // 选择新游戏
      case GameState.MATCH_LOOP:
        return this.decideMatch();     // AI比赛操作
      case GameState.EVENT:
        return this.decideEvent();     // 按A继续
      case GameState.RESULT:
        return this.decideResult();    // 按A继续
      default:
        return 0;
    }
  }
  
  /** 比赛AI (核心) */
  private decideMatch(): number {
    // 基于比赛状态做决策
    // - 持球时: 寻找最佳传球/射门/盘带
    // - 防守时: 拦截/抢断
    // 实现原Bank 4中的AI逻辑
  }
}
```

---

## 12. 调试页面设计

| 页面路径 | 功能 | 数据来源 |
|----------|------|---------|
| `pages/debug/chr-all/` | CHR图库浏览 (16Bank×256 tiles) | PNG图集 |
| `pages/debug/pattern-table-all/` | Pattern Table 实时状态 | DataStore.nametable |
| `pages/debug/nametable-all/` | Nametable 可视化 | DataStore.nametable |
| `pages/debug/sprite-all/` | 精灵OAM数据 | DataStore.oam |
| `pages/debug/palette-all/` | 所有调色板 | 原始调色板数据 |
| `pages/debug/audio-all/` | 音频资源列表 | 音频文件 |
| `pages/debug/data-api/` | 数据API (Swagger风格) | 所有DataTable |

---

## 13. 技术栈

| 层级 | 技术 |
|------|------|
| 平台 | 微信小程序 |
| 语言 | TypeScript (严格模式) |
| 渲染 | Canvas 2D API |
| 构建 | 小程序原生 (无npm) |
| 测试 | Node.js MJS脚本 |
| 资源 | PNG图集 (CHR导出) + OGG音频 |

---

## 14. 开发阶段规划

| 阶段 | 内容 | 估时 | 里程碑 |
|------|------|------|--------|
| Phase 1 | ROM分析 + 数据提取 | ✅ 完成 | M1: ROM_STRUCTURE_REPORT |
| Phase 2 | 架构设计 + 代码框架 (小程序+HTML) | ✅ 完成 | M2: 可运行的Hello World |
| Phase 3 | Bank 0 核心引擎 | 🚧 进行中 | M3: 主循环+状态机可运转 |
| Phase 4 | Bank 1 开场动画 | — | M4: 开场动画可播放 |
| Phase 5 | Bank 5+6 菜单系统 | — | M5: 菜单可交互 |
| Phase 6 | Bank 3+4 比赛引擎 | — | M6: 比赛可玩 |
| Phase 7 | 完整流程 | — | M7: 可通关 |
| Phase 8 | AI挂机 + 测试 | — | M8: 自动通关验证 |
| Phase 9 | 优化 + 压缩 | — | M9: 生产版本 |

---

*文档完成日期: 2026-08-06*
*下一步: Phase 3 — Bank 0 核心引擎完善 → Bank 1 开场动画*
