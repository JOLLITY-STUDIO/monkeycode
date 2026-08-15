# 迷宫模式（Map Mode）玩法规范

> 基于 NDS 原版截图 `maze-007.png` + 转换数据 `map_d/` + `maze-scene.ts` 实现。
> 与早期错误实现"线稿描画"不同，真实玩法为**迷宫走格填色**。

## 1. 数据层

### 1.1 原始数据
- 来源：`roms/extracted/map_d/` 下的 `.map` 文件
- 格式：每关二进制文件，`w × h` 字节，每个字节低 nibble（0-15）为格子值
  - `0` = **黑墙**（不可进入）
  - `1-15` = **白路径**（可进入），值同时是**颜色索引**（对应 NCLR 调色板）
- 有效谜题数：392 关（原始 404 个文件，去除 w/h 为 0 或空数据的无效项）
- 调色板：每关独立的 16 色 NCLR 已转换，key 为 `P<id>`（如 `P4000101`）
- 完成图：前 400 关有 `completions/` 下的完成图（编号 001-400），上屏通关时显示

### 1.2 数据结构
```ts
interface StageEntry {
  stage: number;        // 1-based 关号（当前按数字 ID 排序，非 ROM 真实顺序）
  id: string;            // 原始 ID（如 4000101）
  name: string;
  w: number; h: number;
  grid: Uint8Array;      // w*h 长度，0=墙, >0=路径+颜色索引
  palette: number[][];    // 16 色 RGB
  completion?: { w, h, palette, pixels }; // 上屏完成图
}
```

## 2. 屏幕分工（双屏结构）

| 屏幕 | 内容 | 说明 |
|------|------|------|
| **上屏** | 目标完成图 + 当前进度 | 只显示**已走过**的格子，按 grid 颜色索引 + palette 填充。未走过的格子留白。 |
| **下屏** | 迷宫网格 + 操作 + 状态 | 全屏迷宫，顶栏显示返回/关名/进度计时，底部提示。 |

> 截图 `maze-007.png`（Rooster）确认：下屏为黑白迷宫网格，上屏为已填充颜色的完成图。通关后显示 "Clear"。

## 3. 移动规则

### 3.1 起点
- 从左上角开始扫描，**第一个 `grid > 0` 的格子**为起点（无需寻找特定入口）。
- 起点自动标记为已走过（`visited = true`）。

### 3.2 移动方式
- **点击**下屏迷宫格。
- 只能移动到**相邻**的白格（上/下/左/右，四邻域）。
- 不允许斜向移动；不允许移动到墙（`grid == 0`）；不允许移动到非相邻格。
- 代码判定：`Math.abs(gx - px) + Math.abs(gy - py) === 1`

### 3.3 足迹
- 走过的格子变为**绿色高亮**（`VISITED_COLOR = '#43d17c'`），对应原版下屏的绿色足迹。
- 玩家当前位置显示为**红色方块**（带白色描边）。

## 4. 完成条件与结算

### 4.1 完成条件
- **所有路径格（`grid > 0`）都被 visited** → 触发完成。
- 不需要走特定路径，只需要覆盖全部可行走格子（迷宫本身是连通的，通常只有一条通路，但实现上只检查覆盖度）。

### 4.2 完成流程
1. 完成标记 `completed = true`。
2. 下屏底部提示变为 **"CLEAR!"**。
3. 计时停止。
4. 延迟 0.8 秒后进入 `ST_RESULT_CHECK`（0x0E）→ `ST_ACHIEVE`（0x14）。
5. 上屏 palette 合并为 RGB 值，连同完成图数据传给状态机。

## 5. 与原版差异 / 已知问题

| 项目 | 当前实现 | 原版 / 期望 | 状态 |
|------|----------|-------------|------|
| 关卡排序 | 按数字 ID 升序（001, 002...） | ROM 内部有独立顺序表（如第 7 关实际是 Rooster） | ⚠️ BUG-009 待修复 |
| 完成图 | 前 400 关有 `completions/` 数据 | 所有 392 关理论上都有完成图 | ✅ 已接入 |
| 调色板 | 每关独立 NCLR 已转换 | 与 ROM 一致 | ✅ 已接入 |
| 移动验证 | 四邻域点击 | 与原版一致 | ✅ 已实现 |

## 6. 关联文件

| 文件 | 职责 |
|------|------|
| `miniprogram/engine/scenes/maze-scene.ts` | 迷宫渲染 + 移动交互 + 完成检查 |
| `miniprogram/engine/scenes/state-select-scene.ts` | 选关后进入 map 模式时实例化 `MazeScene` |
| `miniprogram/engine/data/stage-data.ts` | 提供 `StageEntry`（grid/palette/completion） |
| `tools/convert_maps.py` | `.map` 原始数据转换 |
| `screenshots/org/Pic Pic (Europe)__maze-007.png` | 截图对照（Rooster 关卡） |
