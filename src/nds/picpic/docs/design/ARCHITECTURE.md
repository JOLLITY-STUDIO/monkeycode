# 总体架构设计（ARCHITECTURE）

> 由 02 系统架构师输出。MVC 分层、页面/架构/游戏逻辑分离、接口契约。目标产物：纯 TS + Canvas 2D 微信小程序（无 DOM，无模拟器）。

## 1. 分层总览
```
┌────────────────────────────────────────────────────┐
│ View 层（渲染）                                     │
│  engine/scenes/*.ts  Canvas 纯渲染（boot/title/     │
│  mode-select/state-select/game/achieve）            │
├────────────────────────────────────────────────────┤
│ Controller 层（接线/输入分发）                       │
│  pages/index/index.ts  页面生命周期 + 触摸接线       │
├────────────────────────────────────────────────────┤
│ Model 层（游戏逻辑/数据）                            │
│  engine/core/engine.ts     状态机/玩法/存档/KV       │
│  engine/core/rom-states.ts ROM 状态常量/模式/槽位    │
│  engine/data/              数据中台 + Repository     │
│    stage-data.ts           关卡数据访问层(Repository)│
│    puzzles/ palettes/      谜题/调色板数据单元       │
├────────────────────────────────────────────────────┤
│ Platform 适配层（10）                                │
│  wx API 封装（getStorageSync/SelectorQuery/触摸）    │
└────────────────────────────────────────────────────┘
```

## 2. MVC 映射（与 ROM 对应）
| 层 | 职责 | ROM 对应 | TS |
|----|------|----------|-----|
| Model-状态机 | 状态/流转/存档 | 0x205113c 调度器 / 0x2052a00 setState | engine.ts |
| Model-玩法 | 涂色/撤销重做/完成判定 | 0x2055bc8 GAME SETUP / 0x2055d9c 完成检查 | engine.ts |
| Model-数据 | 谜题/调色板/关卡索引 | map_d/NCLR 资源 | engine/data/ |
| View-场景 | 各 STATE 画面 | title/ select/ map/ 等资源目录 | scenes/*.ts |
| Controller | 页面接线/触摸 | NDS 触屏中断 | pages/index/index.ts |
| 数据服务层 | Repository（类 API） | - | stage-data.ts（getStageDetail 等） |

## 3. 引擎核心设计
- `PicPicEngine`：构造接收 Canvas 2D 上下文，`start()` 即插即用
- 场景注册表 `Map<STATE, SceneHandler>`：以 STATE 为 key（对应 ROM 按 STATE 分派）
- `setState`：exit 回调 → 写 STATE → enter 回调（仿 0x2052a00）
- 主循环：Canvas rAF → 全局 rAF → setTimeout 回退；`tick` 先查 SUBSTATE 再分派
- 服务状态（0x0C/0x0E/0x10/0x08）无渲染，引擎内部流转

## 4. 数据架构（Code/Data 分离）
- `engine/data/` 与 `engine/core/`/`engine/scenes/` 物理分离
- 数据单元：谜题 `P<id>`（grid 4bit/像素）+ 调色板 `P<id>`（16 色 RGB）
- 访问入口：`stage-data.ts` Repository 接口（getStagesForMode/getStageDetail/getAvailableStageCount）
- 关卡数据按需加载（当前全量引入，后续可懒加载）

## 5. 存档设计
- 5 槽位（对应 ROM 0x2051D5C）：name/createdAt/unlocked/cleared/bestTime
- Storage key：`picpic_saves_v1`；写档仿 0x2051BE8（记通关/最佳/解锁下一关）

## 6. 场景装配
- ST_GAMING 为动态 handler：选关场景 START 时 `replaceHandler` 装载新 GameScene（对应 GAME SETUP）

## 7. 架构图（UML 摘要）
```
PicPicEngine ──注册──► Map<STATE, SceneHandler>
      │                        │
      ├─ 持有 GameState ──────► { rom:{state,subState,...}, slots[], mode, playerGrid, palette, undo/redo }
      │
      ├─ processServiceState()：0x0C/0x0E/0x10/0x08
      └─ scenes: BootScene/TitleScene/ModeSelectScene/StateSelectScene/GameScene/AchieveScene
                 └─ 依赖 stage-data.ts（Repository）→ puzzles/ + palettes/
```

## 8. 多端适配
- 小程序：`pages/index/index.ts` 创建 SelectorQuery 获取 Canvas 节点 → new PicPicEngine(ctx)
- 未来 H5：同引擎，仅宿主容器不同（Canvas 上下文一致）
