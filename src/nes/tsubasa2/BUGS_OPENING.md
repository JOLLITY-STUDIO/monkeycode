# BUG 记录

## OPENING 不自动播放链路断裂 (2026-08-21 检察官查证)

### 现象
游戏启动后 OPENING 开场动画不自动播放，屏幕黑屏，`mainLoop frame=N buttons=0x0` 空转。原版 TECMO Theater 开场靠协程任务表自动推进，无需玩家按键。

### BUG-OPEN-01 (根因·翻译遗漏): 协程调度器 $9EED-$9F0C 整体缺失
- ASM 源: `asm/bank00/_full.s:3635-3652`
- ASM 指令: `LDX #$01` → 遍历 6 协程槽 (ram_0001-$0018), DEC 计时, 归零则 $9F0F 恢复协程现场续跑, 全空档等 NMI 帧标志重扫
- 期望副作用: 主循环即协程调度器, 扫描槽位递减计时, 归零恢复协程续跑, 自动推进场景/脚本
- TS 文件:行号: `src/game/service/bank00/bank00_core.service.ts:119-127`
- TS 实际行为: `mainLoop()` 只 `_frameCount++` + 调 `_mainInputLoop` 一次就返回, 无协程槽遍历/计时递减/恢复续跑
- 偏差类型: 翻译遗漏
- 修复建议: 按 $9EED/$9EEF/$9F0F/$9F52 翻译协程槽表 (6 槽×4B), 或迁移 `boot.ts.bak:209-240` 已有的 Generator 协程循环
- 状态: ✅ 已修复 (`bank00_core.service.ts:344-357 _runCoroutineLoop` + `_spawnCoroutine` + `_bootCoroutine`, 基于 Generator)

### BUG-OPEN-02 (根因·翻译遗漏): $9FA8 协程让出被当作 no-op
- ASM 源: `asm/bank00/_full.s:3736-3771`
- ASM 指令: `STA $0019; TXA; PHA; TYA; PHA; LDA $00ED..$00E6; PHA×8; TSX; TXA; LDX $0000; STA $0001,X; LDA $0024/0025; STA $0002/0003,X; ...`
- 期望副作用: `JSR $9FA8` = 协程让出 N 帧/恢复, 保存现场到槽 + 切 bank 窗口 + RTS 回调度器
- TS 文件:行号: `src/game/service/bank00/bank00_core.service.ts:27` (注释标 `H5 no-op`); bank02_scene.service.ts 多处
- TS 实际行为: 所有 `JSR $9FA8` 被跳过, 依赖让出/恢复的多帧协程永不推进
- 偏差类型: 翻译遗漏
- 修复建议: $9FA8 译为 `_coroutineYield`, $9F69 译为 `_coroutineSpawn`
- 状态: ✅ 已修复 (`bank00_core.service.ts:389-399 _coroutineYield/_coroutineSpawn`, Generator yield 内建现场保存/恢复)

### BUG-OPEN-03 (接线断裂): OpeningSceneController 从未实例化/接线
- TS 文件:行号: `src/game/index.ts:29,40` (仅 export); `src/game/ServiceLoader.ts:60-61` (无 Opening); `src/game/dispatch.service.ts:149-198` (BOOT 未 registerScene)
- TS 实际行为: 全工程无活动代码 `new OpeningSceneController(...)`, 开场数据 `initBoot()` (`scene_opening.controller.ts:325-341`) 从未被调用
- 偏差类型: 接线断裂
- 修复建议: ServiceLoader 实例化 OpeningSceneController, 注册到 DispatchService TaskIndex.BOOT
- 状态: ✅ 已修复 (`ServiceLoader.ts:66-68` 实例化 + `bank00.setOpening`)

### BUG-OPEN-04 (接线断裂): ScriptVM/OpeningController.update() 未被每帧推进
- TS 文件:行号: `src/game/service/bank00/bank00_core.service.ts:141-169` `_mainInputLoop` 只做输入检测就 return; `src/game/service/bank00/scene_opening.controller.ts:515-536` `update()` 无调用方
- TS 实际行为: 开场帧推进 (`_updateAnimation` controller:640-663, maxFrames=180 自动切镜) 与脚本 VM (`_updateScriptAnimation` 549-604) 从不执行
- 偏差类型: 接线断裂
- 修复建议: 协程调度器/主循环每帧调 `OpeningSceneController.update(buttons)`
- 状态: ✅ 已修复 (`bank00_core.service.ts:360-382 _bootCoroutine` 每帧 `syncBootFrame`, `_titleCoroutine` 每帧 `update`)

### BUG-OPEN-05 (根因·接线断裂): PPU 扫描线渲染从未驱动 → 黑屏
- TS 文件:行号: `src/game/Tsubasa2.ts:350-378` `_onRender` → `_forceRender()` (startFrame → 逐扫描线 endScanline → startVBlank 合成+endFrame); `src/core/ppu/index.ts:610-665` `startFrame` 只填 bgColor; `1300-1336` `renderFramePartially`; `1338+` `renderBgScanline`
- 期望副作用: 每帧驱动扫描线 advanceDots → renderBgScanline 把 nameTable+ptTile 合成进 buffer
- 修复: `_forceRender()` 已驱动逐扫描线 `endScanline()` 合成 bgbuffer + `startVBlank()` 合成 buffer
- ⚠️ **补充修复 (黑屏真根因)**: 即使扫描线被驱动, 若 `paletteManager.paletteRAM` 为空 → `PpuSync.syncPalette` → `ppu.updatePalettes()` → imgPalette 恒黑 → 背景全黑。开场控制器此前只写 `DataStore.paletteTable`(H5 帧合成器路径), PPU 渲染读不到。已在 `scene_opening.controller.ts:_applyBootPalette` 增加 `palWriteAll([...bg,...spr])` 写入 paletteRAM, 与 `Bank00RenderView.paletteLoad` 的桥接一致
- 偏差类型: 接线断裂
- 状态: ✅ 已修复

### BUG-OPEN-06 (实现错误): 首帧加载 scene 0x17 (标题菜单) 而非开场
- ASM 源: `asm/bank00/_full.s` $806A-$806C `LDA #$17; JSR $8AF7`
- TS 文件:行号: `src/game/service/bank00/bank00_core.service.ts:206` `this.sceneLoad(0x17)`
- TS 实际行为: 首帧渲染的是标题菜单背景 (cut 0x17), 真实 TECMO Theater 开场数据在 `cut_0x00_boot` 的 `initBoot()` (controller:349-389) 但未接入
- 偏差类型: 实现错误
- 修复建议: 首帧走 `OpeningSceneController.initBoot()` 而非 `sceneLoad(0x17)`
- 状态: ✅ 已修复 (`bank00_core.service.ts:239-241 _firstFrameInit` 调 `_opening.initBoot()`)

### BUG-OPEN-07 (实现错误·次要): _mainInputLoop bit0 交替逻辑与 ASM 不符
- ASM 源: $804D-$8051 / $8087-$808B
- TS 文件:行号: `src/game/service/bank00/bank00_core.service.ts:146-156`
- TS 实际行为: 帧1置bit0→帧2清bit0→帧3重新 `_firstFrameInit` (每2帧重灌一次NT), 与 ASM "一次协程执行只检查一次 bit0" 不符, 可能闪烁
- 偏差类型: 实现错误
- 修复建议: 协程调度器修好后一并校正
- 状态: ✅ 已修复 (`bank00_core.service.ts:177-188` bit0 一次性检测, 不再每帧交替)

### 修复优先级
- P0: BUG-OPEN-05 (PPU 扫描线驱动) — ✅ 已修复 (`_forceRender` 驱动扫描线 + `_applyBootPalette` 写 paletteRAM 解黑屏)
- P0: BUG-OPEN-01+02 (协程调度器 + $9FA8) — ✅ 已修复 (Generator 协程循环)
- P0: BUG-OPEN-03+04 (接入 OpeningSceneController + 每帧 update) — ✅ 已修复
- P1: BUG-OPEN-06 (首帧改走 initBoot) — ✅ 已修复
- P2: BUG-OPEN-07 (bit0 交替逻辑) — ✅ 已修复

### 2026-08-21 修复总结 (开场链路重新打通)
开场链路各环节已全部接线, tsc 零错误:
1. **渲染**: `_onRender → _forceRender()` 逐扫描线 `endScanline` 驱动 `renderBgScanline` 合成 bgbuffer, `startVBlank()` 合成 buffer+精灵
2. **调色板 (本次补充真根因)**: `_applyBootPalette` 增加 `palWriteAll`, 让开场渐显调色板写入 `paletteManager.paletteRAM` → `PpuSync.syncPalette` → PPU imgPalette (此前只写 DataStore.paletteTable, PPU 读不到 → 黑屏)
3. **调度**: `mainLoop → _runCoroutineLoop` 每帧轮转 Generator 协程槽, BOOT 协程每帧 `syncBootFrame` 推进调色板渐显
4. **接线**: ServiceLoader 实例化 OpeningSceneController + `setOpening`, `_firstFrameInit` 走 `initBoot()`
5. **流程**: BOOT 开场 → START/超时 → TITLE (标题菜单 Cut 0x17)

### 参考实现
`src/game/boot.ts.bak:76-97, 196, 203, 209-240` 含基于 TS Generator 的协程调度实现, 曾正确实例化 OpeningSceneController 并 spawn BOOT 协程。修复时可借鉴/迁移, 避免从零重写。
