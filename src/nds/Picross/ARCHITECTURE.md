# Picross DS → H5 微信小程序 架构设计

> 输入：ROM_STRUCTURE_REPORT.md
> 目标：纯 TypeScript + Canvas 实现，不依赖 ROM/汇编文件，即插即用

## 1. 总体架构（MVC）

```
┌────────────────────────────────────────────────────────┐
│                   微信小程序表现层                       │
│  pages/index (WXML/WXSS) + Canvas 2D                    │
└──────────────────────┬─────────────────────────────────┘
                       │ 触摸事件 / 状态渲染
┌──────────────────────▼─────────────────────────────────┐
│  Render 层 (src/render/renderer.ts)                     │
│  网格/提示/进度条绘制, 坐标→单元 hitTest                 │
│  CanvasLike 接口：兼容小程序 Canvas 2D 与 HTML5 Canvas   │
└──────────────────────┬─────────────────────────────────┘
                       │ GameState (只读快照)
┌──────────────────────▼─────────────────────────────────┐
│  Core 层 (src/core/)  —— 纯 TS 游戏内核                  │
│  engine.ts   状态机/单元格操作/失误/完成检测              │
│  hints.ts    行列提示计算                                │
│  types.ts    类型定义                                    │
│  puzzle-loader.ts  拼图加载（数据管线产物）              │
└──────────────────────┬─────────────────────────────────┘
                       │ Puzzle[] (结构化声明式数据)
┌──────────────────────▼─────────────────────────────────┐
│  Data 层 (src/data/puzzles.ts)                          │
│  由 tools/extract_puzzles.py 从 NDS file_94 提取生成     │
│  位图→1bpp 行主序, 提示运行时计算（与原版一致）          │
└────────────────────────────────────────────────────────┘
```

### 分层原则（与原版 NDS 架构对应）

| NDS 原版 | 转写实现 | 说明 |
|---|---|---|
| ARM9 主逻辑（游戏状态机/流程） | `src/core/engine.ts` | 纯 TS，无平台依赖 |
| ARM9 渲染（BG 图层/OAM 精灵） | `src/render/renderer.ts` | Canvas 2D 单视图（双屏合并） |
| VRAM/OAM/BG 内存 | 渲染层内部状态 | 无需模拟硬件 |
| ARM7 触摸/按键 | 小程序触摸事件 → `engine.tapCell()` | 触摸即核心输入 |
| 消息表 messageList_*.dat | `src/data/messages.ts`（待实现） | 自定义编码需解码表 |
| 音频 PR.sdat | WebAudio/小程序音频（可选） | 待分析 |
| IPC 双核通信 | 事件回调（EngineCallbacks） | 不适用，已合并 |

## 2. 游戏状态机

```
[菜单] → [选择拼图] → [解谜中] → [完成动画] → [结算] → [菜单]
                          ↑_____失误≥5 时提示
```

解谜中状态：`marks[]`（CellMark[]）＋ 行/列提示满足度 ＋ 计时 ＋ 失误计数。

## 3. 核心数据流

```
触摸事件 (x,y) → renderer.hitTest → engine.tapCell(x,y)
→ 状态更新 → cb.onStateChange(GameState) → renderer.draw(state)
```

## 4. 数据管线（NDS → TS）

```
Picross DS (USA).nds
   │ tools/extract_rom.py        FAT/FNT 解包 98 文件
   ▼
extracted/unnamed/file_94.bin (24.8MB 拼图库)
   │ tools/extract_puzzles.py    解析拼图记录（格式见下）
   ▼
src/data/puzzles.ts              Puzzle[] 声明式数据
```

### file_94 拼图记录格式（分析中）

初步观察：文件头为图形资源（2bpp 图标位图，`00/FF/AA/BB` 模式），
拼图记录以小尺寸位图形式嵌入，具体记录头（宽度/高度/编号）待通过
ARM9 加载代码反推确认（WBS-D2 任务）。

## 5. 目录结构

```
Picross/
├── app.json / app.ts / app.wxss / sitemap.json
├── project.config.json
├── pages/index/          小程序页面（画布 + 操作）
├── src/
│   ├── core/             游戏内核（types/hints/engine/puzzle-loader）
│   ├── render/           Canvas 渲染器
│   └── data/             数据产物（puzzles.ts）
├── test/html/            HTML5 测试环境（浏览器直跑）
├── tools/                逆向分析脚本（python）
├── extracted/            解包资源（中间产物）
├── _tmp_disasm_out/      反汇编产物（中间产物）
├── ROM_STRUCTURE_REPORT.md
├── ARCHITECTURE.md
├── WBS_PLAN.md
├── DEVLOG.md             开发日志
└── BUGS.md               已知 BUG
```

## 6. 关键设计决策

1. **双屏合并**：NDS 主屏+触摸屏 → 单 Canvas 网格布局（提示区+网格区）
2. **触摸循环**：点按填充→叉→清除（与原版一致），失误计数 5 次
3. **提示运行时计算**：解法位图 → 行列提示（与原版行为一致，不存冗余）
4. **平台无关**：Core/Render 层不 import 任何 wx API，通过适配层对接
