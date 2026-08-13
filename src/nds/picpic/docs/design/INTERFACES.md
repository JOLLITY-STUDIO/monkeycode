# 核心接口契约与数据模型（INTERFACES）

> 由 02 系统架构师输出。接口签名稳定，下游（07-10）按契约开发。命名以 `engine/core/engine.ts` 为准。

## 1. 核心类型
### Vec2
```ts
interface Vec2 { x: number; y: number }
```

### PuzzleData（谜题）
```ts
interface PuzzleData {
  id: string;          // 如 '4000101'
  name: string;
  w: number;           // 宽（格）
  h: number;           // 高（格）
  grid: Uint8Array;    // 每像素 4bit 色号（行优先），0=空白
}
```

### PlayerGrid（玩家网格）
```ts
interface PlayerGrid {
  w: number;
  h: number;
  cells: Uint8Array;   // 4bit/像素，0=空白，1..15=颜色
}
```

### RomGlobal（镜像 0x020DEB70）
```ts
interface RomGlobal {
  state: number;      // [+0x28]
  subState: number;   // [+0x14]
  scene: number;      // [+0x0c]
  stateParam: number; // [+0x38]
  widgetSize: number; // [+0x3c]
}
```

### SaveSlot（存档槽）
```ts
interface SaveSlot {
  index: number;
  name: string;                        // f_make 建档命名
  createdAt: number;
  unlocked: Record<ModeId, number>;    // 每模式已解锁关号（1-based）
  cleared: Record<ModeId, number[]>;   // 每模式已通关列表
  bestTime: Record<ModeId, Record<number, number>>; // 每关最短用时(秒)
}
```

### GameState
```ts
interface GameState {
  rom: RomGlobal;
  mode: ModeId;         // 'map'|'lap'|'fap'
  slotIndex: number;
  slots: SaveSlot[];    // 5 槽
  puzzleIndex: number;  // 当前关号（1-based）
  playerGrid: PlayerGrid | null;
  tool: number;         // 0=画笔 1=橡皮 2=标记
  palette: number[];    // 16 色 RGB 合并值
  undoStack: Uint8Array[];
  redoStack: Uint8Array[];
  completed: boolean;
  timeElapsed: number;
  result: number;       // 0x2055D9C 返回值（==2 完成）
}
```

## 2. 场景接口 SceneHandler
```ts
interface SceneHandler {
  onEnter?(state: GameState, engine: PicPicEngine): void;
  onExit?(state: GameState, engine: PicPicEngine): void;
  update(dt: number, state: GameState, engine: PicPicEngine): void;
  render(ctx: CanvasRenderingContext2D, state: GameState): void;
  onTouch?(x: number, y: number, state: GameState, engine: PicPicEngine): void;
  onTouchMove?(x: number, y: number, state: GameState, engine: PicPicEngine): void;
  onTouchEnd?(state: GameState, engine: PicPicEngine): void;
}
```

## 3. 引擎接口 PicPicEngine（对外暴露）
```ts
class PicPicEngine {
  constructor(ctx: CanvasRenderingContext2D);   // 即插即用
  start(): void;
  stop(): void;
  register(state: number, handler: SceneHandler): void;
  replaceHandler(state: number, handler: SceneHandler): void;
  getHandler(state: number): SceneHandler | undefined;
  setState(next: number): void;     // 仿 0x2052a00
  setSubState(s: number): void;
  loadSlotsFromStorageSafe(): void; // 5 槽初始化
  loadPuzzle(puzzle: PuzzleData, palette: number[][]): void; // GAME SETUP
  paintCell(x: number, y: number, color: number): boolean;
  beginStroke(): void;              // undo 快照
  undo(): void;
  redo(): void;
  checkComplete(puzzle: PuzzleData): boolean; // 完成判定
  cssColor(i: number): string;
}
```

## 4. 状态常量（rom-states.ts）
- `ROM_STATE`：ST_* 常量（0x00~0x19，见 STATE_MACHINE.md）
- `ROM_SUBSTATE`：SUB_BOOT=1 / SUB_MAIN=2 / SUB_EXTRA=3
- `MODES`：map/lap/fap 三模式定义（资源目录映射）
- `MODE_STAGE_COUNT`：map=404 / lap=400 / fap=405
- `SAVE_SLOT_COUNT` = 5
- `GBL`：全局结构偏移

## 5. 数据服务层接口（Repository，stage-data.ts）
```ts
interface StageEntry {
  stage: number;       // 关号（1-based）
  id: string;          // 原始 ID（如 4000101）
  name: string;
  w: number; h: number;
  grid: Uint8Array;
  palette: number[][]; // 16 色
}
getStagesForMode(mode: ModeId): StageEntry[];
getStageDetail(mode: ModeId, stage: number): StageEntry | null; // null=未转换/超范围
getAvailableStageCount(mode: ModeId): number;
```

## 6. 变更管理
- 契约变更须经 02 架构师审批，通知所有下游（07/08/09/10/11）
- 记录变更日志于本文件底部
