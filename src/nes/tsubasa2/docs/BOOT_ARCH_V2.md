# BOOT 架构 v2 — bank00 主循环 + 6-slot dispatcher 翻译

> 状态: stub v1 — API 已落地, slot 注册接入待 trace 完全定位后做。
> 来源: `docs/BANK02_ANALYSIS.md` v4 + `docs/H5_ASM_REVERSE_ANCHOR.md` v1 + `docs/BUG.md` #014 调研

---

## 1. ROM 真模型（已 trace 实证）

### 1.1 三 bank 各司其职

| Bank | CPU 地址 | PRG 角色 |
|---|---|---|
| bank00 (R6=$00) | $8000-$9FFF | 主 dispatcher / scheduler / 子程序调用 |
| bank02 (R7=$02) | $A000-$BFFF | Scene0+ handlers (`$A000` main / `$A160` slot handler 2) |
| bank14 (固定) | $C000-$DFFF | NMI handler + 6-slot timer dispatcher (主循环核心) |
| bank15 (固定) | $E000-$FFFF | reset vector + RST handler |

### 1.2 BOOT timeline（trace 实证）

```
f1      R7=2 切 (boot init in $C000-$FFFF)
f6      bank2 清 RAM ($AA0E loop 256 byte)
f8      BG enable (bank0 PPUMASK=06, PPUCTRL=08)
f10     bank2 NT 装载 ($A01B-$A046 loop)
f11+    bank0 6-slot timer dispatcher 每 NMI frame 调度 (bank14 $C500)
f270    首次 slot 触发 → JSR $A000 (Scene0 main update)
f285    首次不规则 slot 触发 → JSR $A160 (slot handler 2)
f30, f43, f55, …, f259   每 12 帧同步触发 `JSR $A000` (138 次)
f285, f335, f402, …  f4332   不规则触发 `JSR $A160` (71 次)
```

**关键 insight**:
1. **Scene0 不是开机入口**,而是 **dispatcher 每 12 帧触发的持续 handler**
2. **没有 Scene1-13 chain**,它们是 **6-slot timer slot** 各自独立调度
3. R7=2 在 f1 之前的 boot init 已切好 (在 `$C000-$FFFF`)
4. 每个 slot 触发都做 MMC3 CHR swap + save/restore CPU state + JSR

### 1.3 6-slot dispatcher 行为

```
bit 6 $001B = "slot triggered" flag
$003B       = 6-slot shift register
$003C-$003E = saved CPU state for current handler

每个 slot 触发:
  1. SEC; ROR $3B; STA $3C; STX $3D; STY $3E (save state)
  2. STA $8000 = #$A5 (R5 select)
  3. STA $8001 = bank_num (CHR swap to bank 2)
  4. JSR handler_entry ($A000 or $A160)
  5. handler 跑完 → RTS → 自动恢复 state
  6. dispatcher loop 继续 → 检查 next slot
```

---

## 2. H5 翻译方案 v2

### 2.1 双 dispatcher 严格区分

| Service | 对应 PRG 段 | 语义 |
|---|---|---|
| `Bank00SchedulerService` | bank0 $9EEF-$9FA8 | **one-shot 倒数** — push state 等 N 帧后 callback 触发一次 |
| `Bank00MainLoopService` (新) | bank14 $C500 | **recurring 周期触发** — 注册 slot, 每 N 帧持续触发现场 controller.onSlotTick() |

混用示例:
```ts
// scheduler one-shot (PRG $9FA8 翻译): "等 16 帧后调 callback"
scheduler.pushState({ timer: 16, callback: () => { /* do X */ } });

// mainLoop recurring (PRG $C500 翻译): "每 12 帧触发 Scene0 主循环"
mainLoop.registerSlot(0, 270, 12, (slotIdx, tick) => {
  scene0.onSlotTick(slotIdx, tick);
});
```

### 2.2 BootRouter 当前 vs v2

| 项 | v1 (现状) | v2 (目标) |
|---|---|---|
| Scene0 phase 推进 | `BootRouter.update()` 每帧调 `current.onUpdate(frame)` | `Bank00MainLoopService.tickDispatch()` → slot 0 触发 → `current.onSlotTick(slotIdx, tick)` |
| Scene1-23 | `BootRouter.update()` chain return sceneId | 各 scene 注册到对应 slot, slot 触发时直接调 onSlotTick() |
| Boot logo 装载 | `Scene0.onEnter()` 装载 | `Bank00MainLoopService.bootLogoLoad()` (PRG $8053-$8090 翻译), boot init 阶段调用 |
| IRQs/spin | 无翻译 (缺) | `Bank00MainLoopService.waitForVBlank()` 等 (待补) |

### 2.3 6-slot 注册方案

实际 slot 配置待 trace 完全定位后填。初步框架:

```ts
mainLoop.registerSlot(0, 270, 12, (slotIdx, tick) => {
  // Scene0 main handler (PRG $A000 翻译)
  sceneControllers[0].onSlotTick(slotIdx, tick);
});

mainLoop.registerSlot(1, 285, 0, (slotIdx, tick) => {
  // Slot handler 2 (PRG $A160 翻译, 不规则触发)
  // period=0 表示"一次性, initialDelay=285 后触发"
  sceneControllers[0].onSlotTick2(slotIdx, tick);
});
// slot 2-5: 待 trace 定位
```

### 2.4 兼容性策略

v2 不立即切换 BootRouter.update() → mainLoop 触发路径:

```
v2 阶段 1 (本次 stub): 
  - Bank00MainLoopService 新增 + SceneController.onSlotTick() 默认空 + BootRouter.attachMainLoop() stub
  - 旧 BootRouter.update() → current.onUpdate(frame) 路径保留
  - **行为完全不变**, 只是增加了新 API 接入点

v2 阶段 2 (后续 trace 定位后):
  - Tsubasa2.boot() 末尾 mainLoop.start() + tickDispatch() 调
  - 各 scene 注册 slot
  - BootRouter.update() 改成由 mainLoop 触发 (而不是每帧调)

v2 阶段 3 (性能/行为精确):
  - onSlotTick 驱动 phase 推进, 消除"每帧都跑一遍 phase 状态机"的不必要开销
  - 与 ROM 时序对齐 (slot 0 = 每 12 帧, slot 1 = 不规则)
```

---

## 3. 文件落地 (本次 commit)

| 文件 | 变更 |
|---|---|
| `src/game/prg/code/system/Bank00MainLoopService.ts` | **新增**: bank14 $C500 6-slot recurring dispatcher stub |
| `src/game/prg/code/scene/SceneController.ts` | **+**: onSlotTick() 默认空方法 stub |
| `src/game/prg/code/system/BootRouter.ts` | **+**: attachMainLoop() / getMainLoop() stub (不绑死任何 slot) |
| `docs/BOOT_ARCH_V2.md` (本文档) | **新增**: 双 dispatcher 架构说明 |

不动的文件 (避免回归):
- `Scene0Controller.ts` 保持 phase 状态机不变, 只新增 onSlotTick 默认空方法
- `BootRouter.update()` 保持每帧调 `current.onUpdate()` 旧路径
- 旧 BUG #014 TODO 注释保留

---

## 4. 后续路线

1. ❌ trace 验证 frame 1045/2510/3644 处的 slot 触发实际配置 (period/initialDelay)
2. ❌ 各 scene (Scene1-23) slot 分配 (frame 13 之前看不到, 需要更长 trace)
3. ❌ audio/bgm 调度追溯 (bank12 audio engine 跟 dispatcher 关系待定位)
4. ❌ boot logo 装载 (PRG $8053-$8090) 完整翻译 → Bank00MainLoopService.bootLogoLoad()
5. ❌ BootRouter.update() 切换到 mainLoop 驱动 (phase 2)
