# 架构设计文档 - 天使之翼 微信小程序

> 版本: 1.1 | 日期: 2026-08-04

---

## 1. 总体设计原则

| 原则 | 说明 |
|------|------|
| **非模拟器** | 直接重写游戏逻辑，不模拟6502 CPU |
| **纯TS+Canvas** | 不依赖DOM，微信小程序原生Canvas API |
| **即插即用** | `new Tsubasa(platform, ctx).start()` 即可运行 |
| **结构化数据** | 所有数据以声明式结构化形式呈现 |
| **OOP设计** | 面向对象+接口访问 |

---

## 2. 项目目录结构

```
tsubasa1-h5/
├── ROM_STRUCTURE_REPORT.md      # ROM结构分析 (阶段1)
├── ARCHITECTURE.md              # 本文件 (阶段2)
├── BUG_TRACKER.md               # Bug跟踪记录
├── DEV_LOG.md                   # 开发日志
├── WBS_TASKS.md                 # 项目任务跟踪
├── package.json
├── tsconfig.json
├── app.ts                       # 微信小程序入口
├── app.json                     # 小程序配置
├── app.wxss                     # 全局样式
├── sitemap.json
├── project.config.json          # 开发者工具配置
├── public/
│   └── sprites/                 # CHR转换的PNG精灵表
│       ├── chr_bank_00.png ~ chr_bank_0F.png
│       └── chr_mega.png
├── pages/
│   └── game/
│       ├── game.ts              # 游戏页面逻辑
│       ├── game.json            # 页面配置
│       ├── game.wxml            # 页面模板 (Canvas + 虚拟手柄)
│       └── game.wxss            # 页面样式
└── src/
    ├── core/
    │   ├── Tsubasa.ts           # 主游戏类 (对外接口, 依赖IPlatform)
    │   ├── GameLoop.ts           # 游戏主循环 (平台无关)
    │   ├── Constants.ts          # 全局常量/枚举
    │   └── types.ts              # 类型定义
    ├── platform/                 # 平台抽象层
    │   ├── IPlatform.ts          # 平台接口定义 (Canvas/Image/RAF)
    │   └── miniprogram/
    │       └── MpPlatform.ts     # 微信小程序平台实现
    ├── cache/
    │   ├── DataCache.ts          # 数据缓存中心 (RAM模拟)
    │   ├── OamCache.ts           # OAM精灵缓存
    │   ├── PpuQueue.ts           # PPU写入队列
    │   └── BankManager.ts        # Bank切换管理
    ├── input/
    │   └── InputManager.ts       # 输入管理
    ├── renderer/
    │   └── Renderer.ts           # 渲染器 (平台无关, 依赖IPlatform)
    ├── engine/
    │   ├── StateMachine.ts       # 状态机/状态分发器
    │   ├── NmiHandler.ts          # NMI处理逻辑
    │   ├── Bank1Dispatcher.ts     # Bank 1 子状态调度
    │   ├── MatchEngine.ts         # 比赛引擎 (球员/球/AI)
    │   └── states/               # 各游戏状态 (State00-05)
    │       ├── StateBase.ts
    │       └── State00~05_*.ts
    └── utils/
        ├── BitUtils.ts           # 位操作工具
        └── RngGenerator.ts       # 随机数生成器
```

---

## 3. 核心类设计

### 3.1 Tsubasa (主游戏类)

```typescript
class Tsubasa {
  constructor(ctx: CanvasRenderingContext2D);
  start(): void;           // 开始游戏
  pause(): void;           // 暂停
  resume(): void;          // 恢复
  handleInput(input: GameInput): void;  // 输入处理
  getFrameCount(): number; // 获取帧数
}
```

### 3.2 DataCache (数据缓存中心)

替代6502 RAM，采用key-value存储：

```typescript
class DataCache {
  // 零页变量 (0x00-0xFF)
  getZP(addr: number): number;
  setZP(addr: number, value: number): void;
  
  // 通用RAM (0x0200-0x07FF)
  read(addr: number): number;
  write(addr: number, value: number): void;
  
  // 高级结构化访问
  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
}
```

### 3.3 StateMachine (状态机)

```typescript
class StateMachine {
  currentState: GameState;
  registerState(id: number, state: IGameState): void;
  transitionTo(stateId: number): void;
  update(): void;
}

interface IGameState {
  onEnter(): void;
  onUpdate(): void;
  onExit(): void;
}
```

### 3.4 InputManager (输入管理)

```typescript
class InputManager {
  // 模拟 $4016/$4017 读取
  readController(port: number): number;
  // 高层按钮状态
  isPressed(button: Button): boolean;
  isHeld(button: Button): boolean;
}
```

---

## 4. 数据流设计

```
外部输入 → InputManager ──→ StateMachine (状态更新)
                                ↓
                            Game Logic (比赛/AI/脚本)
                                ↓
                            DataCache (状态读写)
                                ↓
                            Renderer (绘制命令)
                                ↓
外部Canvas ←── ctx.drawImage / fillRect / etc.
```

---

## 5. 帧循环设计 (三段式架构 v0.5.0)

NES 硬件的帧时序：

```
NMI触发(VBlank开始)
  → CPU在VBlank期间填充PPU数据 (OAM DMA, VRAM写入, 调色板)
  → NMI返回
  → CPU执行游戏逻辑 (输入处理、状态机、AI)
  → PPU同时用VBlank填入的数据逐行渲染画面
  → 等下一个NMI
```

TS 改写后的三段式帧 (GameLoop.loop)：

```
每帧 (每个RAF回调):
  ═══ 阶段1: PPU数据填充 (NMI) ═══
    a. OAM DMA — CPU RAM → OAM缓存
    b. PPU队列处理 — VRAM批量写入
    c. 读取输入 — 手柄锁存
    d. 帧计数++

  ═══ 阶段2: 游戏逻辑 ═══
    e. bankLock == 0 ? 状态机更新 : skip
       (输入处理、AI、脚本、状态转换)

  ═══ 阶段3: Canvas渲染 ═══
    f. 用阶段1填充的PPU数据绘制到Canvas
       (背景tile + 精灵，全部来自OAM/VRAM)
```

关键设计要点：
- **PPU渲染的是"填充后的数据"**：阶段1先把数据填入OAM/VRAM缓冲区，阶段3用这些数据渲染。这与NES硬件行为一致。
- **游戏逻辑在PPU数据填充之后**：游戏逻辑修改OAM/VRAM是为**下一帧**准备数据。
- **渲染是只读的**：Renderer只读取PPU数据，不修改。

---

## 6. 映射关系表 (6502 → TypeScript)

| 6502 概念 | TypeScript 实现 |
|-----------|----------------|
| A/X/Y 寄存器 | 局部变量 |
| 零页 RAM | `DataCache.zp` Map |
| 栈 ($0100-$01FF) | JS调用栈 (不需要显式模拟) |
| OAM ($0200-$02FF) | `OamCache` |
| RAM ($0300-$07FF) | `DataCache.ram` Uint8Array |
| PPU 寄存器 ($2000-$2007) | `DataCache.ppuCtrl/ppuMask/scrollX/scrollY` |
| NMI 中断 (PPU数据填充) | `PpuDataFiller.fillPpuData()` |
| NMI 中的游戏逻辑调度 | `GameLoop` 阶段2: `stateMachine.update()` |
| 手柄寄存器 ($4016/$4017) | `InputManager` |
| MMC1 寄存器 ($8000-$FFFF) | `BankManager` |
| ROM Bank | 独立的 TypeScript 模块 |

---

## 7. 开发阶段划分

| 阶段 | 内容 | 里程碑 |
|------|------|--------|
| **M1** | 项目框架 + 基础类 | v0.1.0 |
| **M2** | State 00-02 (标题→菜单) | v0.2.0 |
| **M3** | State 03-04 (选队→比赛) | v0.3.0 |
| **M4** | State 05-07 (事件→结果) | v0.4.0 |
| **M5** | 脚本引擎+全部数据 | v0.5.0 |
| **M6** | 渲染完善+CHR资源 | v0.6.0 |
| **M7** | 测试+修复 | v0.7.0 |
| **M8** | 小程序适配 | v0.8.0 |
| **M9** | 最终优化 | v1.0.0 |
