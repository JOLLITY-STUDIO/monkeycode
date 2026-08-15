# 场景映射表（SCENE_MAPPING）

> 由 05 输出。状态机 → 场景/资源 → TS 实现的映射。数据来源：`STATE_MACHINE.md` + `miniprogram/engine/scenes/`。
> 模式（map/lap/fap）身份与差异证据见 `MODE_CONFIRMATION.md`（04/05 反汇编确认）。

## 场景 ↔ 状态 ↔ 资源 ↔ TS
| 场景 | STATE | 资源目录 | TS 实现 | 状态 |
|------|-------|----------|---------|------|
| 启动画面 | 0x0B ST_PATH_BUILD | boot（开场 logo） | `scenes/boot-scene.ts` BootScene | ✅ |
| 标题+建档 | 0x11 ST_TITLE | title/ + f_make/ | `scenes/title-scene.ts` TitleScene（选档→手绘建档→删除确认） | ✅（Canvas 占位渲染，结构对齐截图 7252/8134） |
| 模式选择 | 0x12 ST_MODE_SELECT | cinario_select/ | `scenes/mode-select-scene.ts` ModeSelectScene | ✅ |
| 选关 | 0x0D ST_STATE_SELECT | select/ + No_window_map/lap/fap | `scenes/state-select-scene.ts` StateSelectScene | ✅ |
| 游玩 | 0x13 ST_GAMING | map/ lap/ fap/ | `scenes/game-scene.ts` GameScene（动态装配） | ✅ |
| 完成画面 | 0x14 ST_ACHIEVE | map_comp/ lap_comp/ fap_comp/ | `scenes/achieve-scene.ts` AchieveScene | ✅ |
| 教学 | 0x16 ST_TUTORIAL | tutorial/ | 未注册（后续） | ⏳ |
| 设置 | 0x17 ST_OPTION | option/ | 未注册（后续） | ⏳ |
| 体验 | 0x18 ST_TAIKEN | taiken/ | 未注册（后续） | ⏳ |
| 试玩 | 0x19 ST_OTAMESI | otamesi/ | 未注册（后续） | ⏳ |

## 内部服务状态（无渲染，引擎 processServiceState 处理）
| STATE | 逻辑 | TS 位置 |
|-------|------|---------|
| 0x0C ST_MODE_INIT | RNG/模式初始化 → 0x12 | `engine.ts onModeInit()` |
| 0x0E ST_RESULT_CHECK | 完成检查 → 0x14 / 0x13 | `engine.ts checkCompleteResult()` |
| 0x10 ST_SAVING | 写档 → 0x08 | `engine.ts writeSlot()` |
| 0x08 ST_SLOT_READ | 读档 → 0x0D | `engine.ts readSlot()` |

## 场景注册（页面接线）
`pages/index/index.ts` onReady：按真实状态注册 6 场景 + 服务状态由引擎内部处理。

## 触摸接线
| 事件 | 页面 → 引擎 |
|------|-------------|
| touchstart | 场景 onTouch + 游玩绘制（beginStroke/paintCell/checkComplete） |
| touchmove | 场景 onTouchMove + 游玩绘制 |
| touchend | 场景 onTouchEnd |
