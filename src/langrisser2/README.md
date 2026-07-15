# Langrisser II — TypeScript Web 实现

> **项目定位**: Sega 梦幻模拟战 II 的纯 TypeScript + Canvas 版本，包含游戏代码、资源和渲染，不需要额外的模拟器和原始 ROM。

> **架构原则**: 所有界面通过 Canvas 渲染 (VDP tile + Canvas 2D UI 叠加)，**不使用 HTML DOM 渲染游戏界面**。

---

## 一、项目结构

```
src/langrisser2/
├── 20260713/                    # ROM分析核心目录
│   ├── Langrisser II (Japan).md  # ★ 唯一ROM依据(2MB)
│   ├── analysis/                 # ROM分析报告
│   │   ├── rom-analysis-report.md        # ROM分析主报告
│   │   └── _vdp_analysis_report.md       # VDP/VRAM分析报告
│   ├── asm/m68k/                 # 68K反汇编
│   │   └── rom.asm               # sega2asm生成的反汇编
│   ├── assets/                   # 提取的游戏素材图片
│   │   ├── battles/              # 战斗场景背景
│   │   ├── characters/           # 角色/指挥官头像
│   │   ├── maps/                 # 关卡地图
│   │   └── units/                # 单位图标
│   ├── stages/                   # 关卡RAM dump
│   └── otherversionroms/         # 其他版本ROM
├── docs/                         # 游戏资料
│   ├── execution-trace.md        # 启动流程追踪文档
│   └── Langrisser专题站·*/       # 粉丝制作的游戏说明
├── game/                         # ★ TypeScript游戏实现
│   ├── core/                     # 游戏核心引擎
│   │   ├── GameEngine.ts         # 游戏主引擎
│   │   ├── GameState.ts          # 游戏状态管理
│   │   ├── SceneManager.ts       # 场景管理器
│   │   └── types.ts              # 类型定义
│   ├── data/                     # ROM提取的数据
│   │   ├── music/                # 38首音乐数据
│   │   ├── Stage{N}Data.ts       # 31关关卡数据
│   │   ├── DialogueData.ts       # ★ 关卡对话(27关英文翻译)
│   │   ├── TitleScreenData.ts    # 标题画面数据
│   │   ├── OpeningAnimationData.ts
│   │   ├── FontData8001.ts       # 字体数据
│   │   ├── character.ts          # 角色定义
│   │   ├── classes.ts            # 职业定义
│   │   ├── units.ts              # 单位数据
│   │   ├── troops.ts             # 部队配置
│   │   ├── map.ts                # 地图数据
│   │   └── scenario.ts           # 关卡配置
│   ├── hw/                       # 硬件抽象层
│   │   ├── vdp/                  # VDP显示系统
│   │   │   ├── vdp.ts            # VDP主控制器
│   │   │   ├── tile.ts           # Tile渲染
│   │   │   ├── sprite.ts         # 精灵渲染
│   │   │   ├── plane.ts          # 平面渲染
│   │   │   └── renderer.ts       # 渲染器
│   │   ├── fm/                   # 音频系统
│   │   │   └── YM2612.ts         # YM2612 FM合成器
│   │   └── resource.ts           # 资源加载系统
│   ├── rendering/                # 渲染层
│   │   ├── FontRenderer.ts       # 字体渲染
│   │   ├── TileRenderer.ts       # Tile渲染
│   │   └── UI.ts                 # UI组件
│   ├── scenes/                   # 游戏场景
│   │   ├── TitleScreen.ts        # 标题画面
│   │   ├── OpeningAnimation.ts   # 开场动画
│   │   ├── BattleScene.ts        # 战斗场景
│   │   ├── DeployScene.ts        # 出击场景
│   │   ├── DialogueScene.ts      # 对话场景
│   │   └── ...                   # 其他场景
│   └── systems/                  # 游戏子系统
│       ├── CombatSystem.ts       # 战斗系统
│       ├── MagicSystem.ts        # 魔法系统
│       ├── ItemSystem.ts         # 道具系统
│       ├── InputSystem.ts        # 输入系统
│       ├── SoundSystem.ts        # 音效系统
│       └── SaveSystem.ts         # 存档系统
├── scripts/                      # 分析脚本
│   ├── generate-rom-analysis.mjs # ROM分析报告生成
│   ├── parse-english-script.mjs  # ★ 对话脚本解析(english-script.txt→DialogueData.ts)
│   ├── extract-title-data.mjs    # 标题数据提取
│   ├── extract-opening-data.mjs  # 开场动画提取
│   ├── extract-music-data.mjs    # 音乐数据提取
│   └── ...                       # 其他分析脚本
└── main.ts                       # 游戏入口
```

---

## 二、ROM 分析报告

### 2.1 核心报告

| 报告文件 | 内容 |
|---------|------|
| [rom-analysis-report.md](file:///d:/studio/github/monkeycode/src/langrisser2/20260713/analysis/rom-analysis-report.md) | ROM完整分析报告 |
| [_vdp_analysis_report.md](file:///d:/studio/github/monkeycode/src/langrisser2/20260713/_vdp_analysis_report.md) | VDP/VRAM/CRAM分析 |
| [execution-trace.md](file:///d:/studio/github/monkeycode/src/langrisser2/docs/execution-trace.md) | 启动流程追踪 |

### 2.2 ROM 内存映射

| 地址范围 | 大小 | 类型 | 用途 |
|---------|------|------|------|
| \$000000-\$0000FF | 256B | 向量表 | 中断向量 |
| \$000100-\$0001FF | 256B | ROM头 | SEGA标志/游戏信息 |
| \$000200-\$007FFF | 31.5KB | 代码 | 启动/VDP初始化 |
| \$008000-\$00FFFF | 56KB | 代码 | 核心系统(VBLANK/DMA) |
| \$010000-\$05DFFF | 312KB | 代码 | 游戏逻辑 |
| \$05E000-\$06FFFF | 88KB | 数据 | 角色能力/对话脚本 |
| \$070000-\$08FFFF | 128KB | 数据 | 地图/场景配置 |
| \$090000-\$0AFFFF | 128KB | 数据 | 单位/音乐指针 |
| \$0B0000-\$0B7FFF | 32KB | 数据 | **资源指针表** |
| \$0B8000-\$1DBFFF | 16.5MB | 数据 | 压缩图形资源 |
| \$1DC000-\$1FFFFF | 256KB | 数据 | **Z80音乐数据** |

### 2.3 关键函数

| 地址 | 函数 | 用途 |
|------|------|------|
| \$00800A | Reset | 系统复位入口 |
| \$0082B4 | VBLANK | 60Hz主心跳 |
| \$00C80C | FUN_0000c80c | 游戏主初始化 |
| \$0099B2 | FUN_000099b2 | 资源加载 |
| \$00FFF8 | FUN_0000fff8 | Nibble RLE解压 |
| \$00FC1A | FUN_0000fc1a | YM2612音频播放 |

---

## 三、资源加载系统

### 3.1 资源类型

| 类型码 | 算法 | 用途 |
|--------|------|------|
| 0x01 | Nibble RLE | 4bpp tile图案 |
| 0x02 | 位平面压缩 | 2/4/6-plane tile |
| 0x03 | LZSS | 通用数据 |

### 3.2 加载流程

```
资源ID → FUN_000099b2 → FUN_00009a0e(指针表查找)
    → FUN_000099fa(类型分发) → 解压到RAM → DMA到VRAM
```

---

## 四、VDP 显示系统

### 4.1 VRAM 布局

| VRAM地址 | 大小 | 用途 |
|---------|------|------|
| \$0000-\$BFFF | 49KB | Tile图案数据 |
| \$C000-\$CFFF | 4KB | Plane A Nametable |
| \$D800-\$DBFF | 1KB | Sprite Attribute Table |
| \$E000-\$EFFF | 4KB | Plane B Nametable |
| \$F000-\$FFFF | 4KB | Window Nametable |

---

## 五、开发指南

### 5.1 数据提取状态

| 数据类型 | 状态 | 文件 |
|---------|------|------|
| 标题画面 | ✅完成 | TitleScreenData.ts |
| 开场动画 | ✅完成 | OpeningAnimationData.ts |
| 字体 | ✅完成 | FontData8001.ts |
| 音乐(38首) | ✅完成 | music/*.ts |
| 关卡数据(31关) | ✅完成 | Stage{N}Data.ts |
| 角色定义 | ✅完成 | character.ts |
| 职业定义 | ✅完成 | classes.ts |
| 对话脚本 | ✅完成 | DialogueData.ts (27关英文翻译) |
| 魔法数据 | ✅完成 | MagicSystem.ts (21个法术) |
| 道具数据 | ✅完成 | ItemSystem.ts (37个道具) |

### 5.2 系统实现状态

| 系统 | 状态 | 文件 |
|------|------|------|
| 游戏引擎 | ✅完成 | GameEngine.ts |
| 场景管理 | ✅完成 | SceneManager.ts |
| VDP渲染 | ✅完成 | hw/vdp/ |
| YM2612音频 | ✅完成 | hw/fm/YM2612.ts |
| 资源加载(3种解压) | ✅完成 | hw/resource.ts |
| 战斗系统 | ✅完成 | CombatSystem.ts |
| 魔法系统 | ✅完成 | MagicSystem.ts |
| 道具系统 | ✅完成 | ItemSystem.ts |
| 输入系统 | ✅完成 | InputSystem.ts |
| 存档系统 | ✅完成 | SaveSystem.ts |
| 对话系统 | ✅完成 | DialogueScene.ts + DialogueData.ts |

---

## 六、分析脚本使用

```bash
# 生成ROM分析报告
node scripts/generate-rom-analysis.mjs

# 解析对话脚本 (english-script.txt → DialogueData.ts)
node scripts/parse-english-script.mjs

# 提取标题画面数据
node scripts/extract-title-data.mjs

# 提取音乐数据
node scripts/extract-music-data.mjs
```

---

## 七、技术栈

- **语言**: TypeScript
- **渲染**: HTML5 Canvas
- **音频**: Web Audio API (YM2612 FM合成)
- **构建**: Vite
- **数据来源**: Langrisser II (Japan) ROM (MD格式)

---

## 八、参考文档

1. [execution-trace.md](file:///d:/studio/github/monkeycode/src/langrisser2/docs/execution-trace.md) - 启动流程追踪
2. [_vdp_analysis_report.md](file:///d:/studio/github/monkeycode/src/langrisser2/20260713/_vdp_analysis_report.md) - VDP分析
3. [rom-analysis-report.md](file:///d:/studio/github/monkeycode/src/langrisser2/20260713/analysis/rom-analysis-report.md) - ROM分析报告
4. Langrisser专题站 - 游戏资料(职业/道具/魔法表)