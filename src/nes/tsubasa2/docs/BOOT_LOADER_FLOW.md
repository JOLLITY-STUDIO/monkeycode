# Bank00 Boot Loader 全帧流转图（trace 实证）

**目的**: 不再硬编码 "3644 帧等待" / "Scene0.onEnter 装载" 等任意数字，反推出 ROM 全 frame 1-4355+ 的真实行为语义，落成可实现的 H5 service。

---

## 1. trace 来源清单

| 路径 | frames | banks | 覆盖 |
|---|---|---|---|
| `docs/roms/tecmo/13.log` | 6-13 | 00,01 | Capcom logo 明细 |
| `docs/roms/tecmo/Captain...frame13.cdl` | 6-13 | CDL | Code/Data Log |
| `docs/roms/tecmo/strippeddataframe13.nes` | 6-13 | NES ROM | f13 状态 ROM |
| `docs/roms/opening-all/opening-all.log` | 6-4355 | 00,01,06,0F | 全 boot+开场 |
| `docs/roms/openging-skip-to-title/press-start-to-title.log` | 3302-3375 | 00,01,06 | **NEW**: 按下 START 后跳转（73 帧截取，停在 PPU bulk 写中途） |
## 2.5 **标题画面 → 比赛开球**链路（`title-kick-off-to-meeting.log` F51316-F62431 实证）

### 2.5.1 trace 元信息
- **TOTAL**: 201078 lines, **range**: F51316..62431 (4065 帧 ≈ 67s)
- 覆盖"用户在标题画面按 START → 比赛开球"完整链路
- **重要发现**: trace 不含 `$2000`/`$2001`/`$0026`/`$0027` 写入（PPU 模式/状态切换在更早 trace 已发生）

### 2.5.2 关键事件表

| Frame | Bank (asm) | PC | 行为 |
|---|---|---|---|
| F51316-F51325 | bank00 | `$00:9AA3: BD A2 9E LDA $9EA2,X` | **Capcom logo 重放** OAM unpack（连续 9 帧） |
| F51334-F51341 | **bank02** | `$01:A039: STA $2007 = #$XX` | **标题 tile 装载 PPU bulk write**（280 次确认，全在 bank02） |
| F51339 | bank00 | `$00:9051: AND #$20` | **按键状态读取** |
| F51350-F52418 | bank00+06 | `$9F06/$9ED`/$`6:8002` | 标题 idle（vsync + audio 主循环） |
| **F52419** | **bank00** | `$00:9F3C-$9FA8` | **scheduler tick 首次调用**（MainRouterService.dispatchByMode 实证触发） |
| **F52421** | **bank12 audio** | `$06:8241: LDY #$06` | **meeting 启动**（音频 + 场景切换） |
| F52450-F53500 | bank06 audio | `$06:8119: DEC $F3` | 比赛开场动画（audio timer 主导） |

### 2.5.3 关键发现

1. **`$2007` PPU 写入 280 次，全部 bank02** → 标题 tile 装载 100% bank02 工作（不是 bank00/06/dispatcher 触发）
2. **`$9FA8` scheduler tick 首次出现在 F52419** → scheduler 是 title→meeting 切换的实际调度器（不是 BootRouter.changeScene）
3. **`$06:8241` 是 meeting kickoff 启动点**（bank12 audio 在 F52421 触发）
4. **该 trace 没有 `$2000`/`$2001` 写入** → PPU 模式（$2000=$89 enable）已在更早 press-start trace 中完成
5. **Capcom logo OAM 装载**在 51316（远晚于 boot）也出现 → 这个 routine (`$9AA3`) 是**复用的 sprite 装载器**，被多种 sprite 场景使用

### 2.5.4 ❌ 校正：用户问"是不是 sceneId=2 触发标题屏幕"

答案明确：**不是**。
- `SceneTable.ts:33-36` 显示 Scene2 是"清精灵扩展表；返回 2"（**hub 占位 do-nothing**）
- 所有 scene 14/15/16/18/19/20/22/23 都"返回 2"，因为 Scene2 是 hub
- 标题屏幕实际触发 = `MainRouterService.dispatchByMode(N)`（PRG `$0027`），具体 mode 待定

### 2.5.5 **修正 H5 实现路径**（已 commit `e19a99e1`）

- ❌ `BootRouter.changeScene(sceneId=2)` 用于标题屏幕 —— 错
- ❌ `sceneId=2 = 标题屏幕` —— 错（这是 hub）
- ✅ 标题屏幕触发 = `MainRouterService.dispatchByMode(mode=N)`
- ✅ 标题 tile 装载实际发生在 **bank02 PPU bulk-write** (`$01:A01B-$A17F`)
- ✅ title→meeting 调度 = `Bank00SchedulerService.tick` (mode N)

---

---

## 3. **标题画面**完整链路（`title-kick-off-to-meeting.log` F51316-F62431 实证）

### 3.1 trace 元信息
- **TOTAL**: 201078 lines (~9.6MB)
- **range**: F51316..F62431 = 4065 帧 ≈ 67 秒
- **覆盖**: 用户在标题画面按 START → 比赛开球（meeting kickoff）
- 关键 PC 涉及 bank00 / bank02 / bank06 / bank12
- 整段 trace 中 `$2000` / `$2001` / `$0026` / `$0027` 写入 0 次（PPU 模式 + scene status 已在更早 trace 完成）

### 3.2 logo replay 段 — bank00 sprite 复用
```
F51316 PC $00:9AA3: BD A2 9E LDA $9EA2,X @ $9EB0 = #$00
F51316 PC $00:9AA6: 85 E6    STA $E6 = #$30            ← sprite 索引基数
F51316 PC $00:9AA8: B9 2A 06 LDA $062A,Y @ $062E = #$0F ← 读 packed sprite byte
F51316 PC $00:9AAB: 29 0F    AND #$0F                  ← 拆 nibble（低 4 位）
F51316 PC $00:9AB1: 9D E8 05 STA $05E8,X @ $05EF = #$0F ← 写拆出字节到 $05E8,X
F51316 PC $00:9AB7: 60       RTS (from $9AA2)
```
- 与 boot F13 logo OAM unpack **使用同一个 routine**
- 数据源 `$062A` (packed sprite data)、`$9EA2` (index table)、`$05E8` (slot)
- 每次 unpack 16 cycles (CPY #$10 outer loop)
- **H5 翻译**: `Bank00MainLoopService.unpackSpriteTable(slot=$05E8, src=$9EA2, len=16)`

### 3.3 标题 tile bulk write 段 — bank02 PPU stream
```
F51334 PC $01:A01B: A0 80    LDY #$80                  ← 字数 = 0x80 = 128 字节
F51334 PC $01:A01D: BD E8 05 LDA $05E8,X @ $05F3 = #$04
F51334 PC $01:A020: 10 04    BPL $A026                  ← 检测 0x04 含义（end-of-block）
F51334 PC $01:A026: 8C 00 20 STY $2000 = #$80           ← PPU CTRL = $80 (display off, NMI off)
F51334 PC $01:A029: A8       TAY
F51334 PC $01:A02A: BD EA 05 LDA $05EA,X @ $0611 = #$20  ← row low byte
F51334 PC $01:A02D: 8D 06 20 STA $2006 = #$D4             ← PPU VRAM address high ($20 | row)
F51334 PC $01:A030: BD E9 05 LDA $05E9,X @ $0610 = #$F0  ← col byte
F51334 PC $01:A033: 8D 06 20 STA $2006 = #$F0             ← PPU VRAM address low
F51334 PC $01:A036: BD EB 05 LDA $05EB,X @ $05F3 = #$01  ← 读 sprite data
F51334 PC $01:A039: 8D 07 20 STA $2007                    ← 写 PPU VRAM 数据端口
F51334 PC $01:A03C: E8       INX
F51334 PC $01:A03D: 88       DEY
F51334 PC $01:A03E: D0 F6    BNE $A036                  ← 循环到 0
```
- **PPU VRAM address** = `$20D4` high + `$F0` low → NT cell (row=$14, col=$F0)
- **数据源** = `$05EB..` sprite packed data，由 dispatcher 写入 `$05E8..$05EF` (5 字节 header: x_offset, y_offset, count, attr, tile_id)
- **stream 控制**: 行首写 `$2006` (地址)，数据循环 `STA $2007`
- **整 trace 共 280 次** `$2007` 写入，全部在 bank02

### 3.4 标题 idle 段 — bank00 + bank06 主循环
```
F51342 PC $00:9F04 LDA $1B = #$40          ← bank00 vsync flag poll (同 boot)
F51350 PC $06:8002 BC 00 07 LDY $0700,X     ← bank12 audio sample-load
F51354 PC $01:A8EE STA $0202,Y @ $02FA = #$00 ← bank02 OAM copy → 0x0200-0x02FF
F51365 PC $01:A0ED LDA $4015,X @ $4017 = #$01 ← bank02 audio poll
... (1076 frames of repeating cycle)
```
- **每帧** ~3 banks 轮流执行：bank00 vsync → bank06 audio stream → bank02 OAM refetch → bank02 audio poll
- 整段 1076 帧 ≈ 18 秒，标题画面持续可见
- **没有触发任何 mode / dispatch / tile change**

### 3.5 meeting 切换点 — bank12 audio + bank00 scheduler
```
F52410 PC $06:8241 LDY #$06                ← bank12 audio: 第一帧 LDY #$06
...
F52419 PC $00:9F3C STA $E8 = #$00          ← bank00 scheduler tick first call
F52419 PC $00:9F51 60 RTS (from $9FA8)     ← bank00 RTS from scheduler
F52420 PC $01:A0ED LDA $4015,X             ← 切回 audio poll
F52421 PC $06:8241 LDY #$06                ← bank12 audio tick (meeting 启动)
```
- **F52419** 是 bank00 第一次正式入 dispatcher (`$9F3C`) — 之前 1000+ 帧都是 idle poll
- **F52419 scheduler tick** 后立刻 RTS，下一帧 (F52420) 回 audio poll
- **F52421** bank12 `$06:8241 LDY #$06` 持续 → meeting kickoff 持续触发

**结论: meeting 切换是渐进过程**，由 3 个并行信号驱动：
- bank12 audio timer 触发 (`$06:8241 LDY #$06`)
- bank00 scheduler mode dispatch (`$9F3C-$9FA8`)
- bank02 audio poll 持续

**没有单一的"开门 event"**，是 3 个 bank 协调推进。

### 3.6 比赛开场动画段 — bank06 audio 主控
```
F53500-F53600 PC $06:8241 LDY #$06         ← audio timer 每 5-6 frame 触发
F53500-F53600 PC $06:84BA LDA #$00         ← audio stream read
F53500-F53600 PC $06:8119 DEC $F3 = #$07   ← audio duration counter
F53500-F53600 PC $01:A8EE STA $0202,Y      ← OAM sprite update (球员动作)
```

### 3.7 ⚠️ 实证校正：用户问"标题屏幕是 sceneId=2 吗"

答案明确：**不是**。
- `SceneTable.ts:33-36`: Scene2 = "清精灵扩展表；返回 2"（**hub 占位**）
- 所有 scene 14/15/16/18/19/20/22/23 都"返回 2"（回 hub）
- 标题屏幕实际触发 = `MainRouterService.dispatchByMode(N)`（PRG `$0027`），具体 mode 待定

### 3.8 ❌ 禁止清单
- ❌ `BootRouter.changeScene(sceneId=2)` 用于标题屏幕 —— 错（sceneId=2 = hub）
- ❌ 假设 `STA $0026`/`$0027` 触发 scene 切换 —— 错（全 trace 0 hits）
- ❌ `Scene0.onEnter → 装载 boot logo` 替代主循环 —— 错
- ❌ 硬编码 "等 N 帧" —— 错（bank00 用 vsync flag `$1B` 自然 poll）

### 3.9 ✅ H5 实现路径（最终）
```typescript
// 行为翻译而非指令抄搬
joypadInput.pollStart()
  → ButtonBus.emit('start')

bank00MainLoop.tick()
  ├─ pollButton()       // bank06 ($06:80EA) 间接读
  ├─ scheduler.tick()    // $9F3C-$9FA8 dispatcher
  └─ if (start) {
       dispatchByMode(N)    // PRG $0027, MainRouterService
     }

titleScreenModule.run()   // 翻译自 $01:A01B-$A17F PPU bulk write
  ├─ ppu.disable()                 // $2000 = #$80
  ├─ ppu.streamTileToVram(addr)    // $2006/$2007 × 280
  └─ ppu.enable(0x89)              // $2000 = #$89 (NMI+BG+Spr)

meetingKickoffModule.run()
  ├─ audio.startKickoffSample()    // bank12 $06:8241
  ├─ oam.copyPlayers()             // bank02 $A8EE
  └─ scheduler.startMatchTick()    // bank00 $9F3C
```

### 3.10 现有 bug & 待办

| BUG | 描述 | 状态 |
|---|---|---|
| **#013** | Drift30 phase 计数器 wrap 死循环 | 已修 (commit `b2112253`) |
| **#014** | 36xx 帧硬编码跳转 Scene0 | 修正用 trace 实证替代 (commit `297d181f`) |
| **#015 (新)** | Bank06 audio 持续 poll 按钮 → title→meeting 是渐进 3-bank 协同 | 已记录 |
| **#016 (新)** | Capcom logo OAM 装载 routine 在 F51316 重现 → 该 routine 是复用的 sprite loader (被多种 sprite 场景共享) | 已记录 |

---

## 4. **START 按下 → 标题画面**链路（press-start-to-title F3302-F3375 实证，73 帧）

### 4.1 入口 / 兜底处理 — bank06 (asm audio)
```
F3342 PC $06:80EA  LDA ($F0),Y @ $0789 = #$BE
                   ▲ 音频引擎通过间接寻址读零页字节 $0789 = 按钮 OR 状态
```
- 音频引擎 `$06:8002-$80C6` 是常驻 NMI 上下文，不停轮询按钮状态 (0xBE 即 START 触发)
- 通过 `$F0/$F1/$F2` (3 字节 zero-page 指针) 间接读：`LDA ($F0),Y`
- **H5 翻译**: `AudioService.pollButton()` → 读 joypad 后置 `ButtonBus.state.start=true`

### 2.2 主循环判读 — bank00 (asm main loop)
```
F3341 PC $00:82F0  LDA $4C ; BPL $82ED ; JSR $838A
F3341 PC $00:838A  LDX #$02 ; JSR $C4B9  ← PRG 模块切换
        ▼ $C4B9 写 $8000=A5 $8001=27 ← MMC3 把新模块装入 $A000-$BFFF
F3341 PC $00:8397  RTS
F3341 PC $01:A8EE-...  bank02 OAM 拷贝循环（$0468-$046B → $0200-$02FF）
```
- bank00 主循环 `$82F0-$8397` 不直接写 `$0026`（**`$0026`/`$0027`/`$0028` 在全 trace 中为 0 hits**）
- 实际场景切换通过 **`JSR $C4B9` 触发 PRG bank switching**（trace 中 `$C4B9` 计 617 次，`$8000` 计 882 次，`$8001` 计 899 次）
- OAM 拷贝准备发生在 bank02 sprite 拷贝 routine `$01:A8A0-$A8FD`

### 2.3 PPU 关闭 + VRAM 清场 — bank02 (asm)
```
F3349 PC $01:A01B STY $2000 = #$80    ← PPU NMI 关闭、显示关闭
F3349 PC $01:A02A-$A039 循环          ← $2006/$2007 bulk 写 tile 到 PPU VRAM
F3351 PC $01:A026 STY $2000 = #$80    ← 重复
```
- `$2000 = #$80` = 仅 NMI 关闭、显示 OFF（不能立刻改 CHR，必须先 off）
- 然后 `STA $2006`（VRAM 地址）+ `STA $2007`（VRAM 数据）流式写
- 这是**标题画面实际装载发生的银行**

### 2.4 PPU 重新开启 — bank02 (asm)
```
opening-all.log F2510 PC $01:A17F STA $2000 = #$89
                  ▲ #$89 = NMI+BG+Spr on (8x8) ← 标题正式呈现
```
- 该 PC 在 trace 中仅 1 次（在 title-kick-off trace 中应该可见完整过程）
- **H5 翻译**: `PpuTransferService.enablePpuDisplay(mode=0x89)`

---

## 3. 关键 trace 数据点（opening-all.log 全 9.6MB 实测）

### 3.1 RAM 高频访问（4 位 ZP）
| addr | count | 含义 |
|---|---|---|
| `$0095` | 194 | sprite 临时 buffer |
| `$0096` | 208 | sprite 临时 buffer |
| `$009A` | 78 | sprite ptr |
| `$009B` | 92 | sprite ptr |
| `$009C/$9D` | 116 ea | sprite ptr |
| `$00F9` | 37 | 临时 |

### 3.2 全零 hits（trace 实证存在但未触发的地址）
| addr | 期望 (asm) | 实际 | 结论 |
|---|---|---|---|
| `$0026` | sceneId | **0 hits** | sceneId 不用此地址 |
| `$0027` | scheduler mode | **0 hits** | 同上 |
| `$0028/$29` | 指针 | **0 hits** | 同上 |
| `$0044/$4C/$5B` | state 标志 | **0 hits** | 同上 |
| `$804D` (LDA $001B main loop 入口) | 0 hits | bank00 main loop 全局循环未触发进位 |

**结论**: `$0026`/`$0027`/`$004C`/`$005B` 等不是真正的 scene-id 存储位置，
**实际场景切换通过 `JSR $C4B9` PRG 切换驱动**。

### 3.3 PRG bank 切换（PRG 模块加载机制）
| addr | count | 说明 |
|---|---|---|
| `$C4B9` | 617 | PRG bank 切换 routine 入口 |
| `$8000` | 882 | MMC3 Bank Select 寄存器写 |
| `$8001` | 899 | MMC3 Bank Data 寄存器写 |

**翻译原则**: 不要模拟 `C4B9`/`$8000`/`$8001`，直接 `import { ModuleX } from './modules/x'`，调 `ModuleX.method()`。

---

## 4. H5 翻译骨架（最终 — 校正：标题屏幕不是 sceneId=2）

### 4.1 ⚠️ 标题屏幕走 **dispatch 路径**，不是 changeScene
- `SceneTable.ts` 第 33 行：Scene2 = "清精灵扩展表；返回 2"（**hub 占位 do-nothing**，所有 scene 都返回 2）
- Scene14/15/16/18/19/20/22/23 等都是子场景，**结束都返回 Scene2**
- **标题屏幕实际机制** = `MainRouterService.dispatchByMode(mode=N)`:
  - PRG `$8000-$8014` dispatcher table: `LDA $0027 / ASL TAX / LDA $800E,X / PHA / LDA $800D,X / PHA / RTS`
  - 5-mode dispatch (mode 0..4) 经 `dispatchTable[mode]` 回调
  - 标题屏幕 = mode 调用 → `dispatchByMode(2)` 或 `dispatchByMode(N)` 触发 (具体 mode 待定)
- `BootRouter.changeScene()` 不适用于开屏/标题屏幕，仅用于 scene 切换

### 4.2 Service 拆分（不照搬 PRG bank）
```
Bank00MainLoopService                   ← PRG $8000 主循环 + 5-mode dispatch (v2)
  ├─ MainRouterService                  ← $8000-$8014 dispatcher table (status mode 0..4)
  │   ├─ mode 0: 帧步进/装载
  │   ├─ mode 1: 计时比较
  │   ├─ mode 2: 步进场景            ← 标题屏幕可能在这 (待 trace 确认)
  │   ├─ mode 3: 计时比较
  │   └─ mode 4: 计时 + 装载 + 渐隐
  ├─ Bank00SchedulerService             ← $9FA8 6-slot recurring dispatcher
  │   └─ pushState/tickDispatch
  ├─ JoypadInputService.pollStart()     ← 翻译自 bank06 $06:80EA 间接按钮读
  └─ ModuleLoader.switch(id)            ← 翻译自 $C4B9 PRG switch

BootRouter                              ← bank02 Scene 路由
  ├─ changeScene(sceneId)               ← 仅用于 scene 切换 (非开屏)
  ├─ SceneController[0..23] 各 controller
  │   └─ Scene2 = hub 占位 (所有 scene 返回 2)
  └─ PpuTransferService.loadCfgBlock(sceneId) ← PRG $8464 cfg 装载

PpuTransferService                      ← 翻译 $8464 + bank02 $A01B-$A17F PPU bulk-write
  └─ streamTileToVram / setPpuCtrl(0x89)
```

### 4.3 行为禁止清单（**绝对不允许**）
- ❌ `if (frame > 3644) ...` 硬编码帧数
- ❌ `BootRouter.changeScene(sceneId=2)` 触发标题屏幕（**sceneId=2 是 hub 不是 title**）
- ❌ `Scene0.onEnter → loadCfgBlock(sceneId=0)` 替代主循环
- ❌ `scheduleAfter(N, cb)` 倒计时等帧
- ❌ `bankSwitch/mmc3Map/readMem/setPrgBank` 任何硬件窗口模拟
- ❌ 假设 `STA $0026` 是 sceneId 切换（trace 实证 `$0026`/`$0027`/`$0028` 全 0 hits）
- ❌ `sceneId=2 = 标题屏幕`（**这是我的错误** —— Scene2 = hub)

### 4.4 允许保留 stub
- `Bank00MainLoopService` 类骨架（tick 函数空实现）
- `Scene0Controller` 现有 18 phases 保留不删
- `BootRouter.bootHook()` 注释掉（per BUG #014 调查未完）

---

## 5. 现状检讨

**问题 1: Scene0.onEnter 装载 boot logo 是错的**
- 当前 H5：frame 1 进 Scene0.onEnter → loadCfgBlock 立即画 logo
- ROM 实测：frame 13 在 bank00 `$9A7E` 解 OAM；frame 2510 在 bank02 `STA $2000=89` PPU 开
- 差距 = 13 帧等 bank00 unpack + 1994 帧等 bank02 PPU 开（这两段不该在 Scene0.onEnter 里实现）

**问题 2: Scene0 内部硬编码 Drift / Wait timer 是错的**
- 原因：bank00 `$9F04 LDA $1B; BPL $9F04` 是 **vsync 标志等待**（不是数字倒计时）
- H5 不能 `scheduleAfter(3600)`。需实现 vsync poll：`DataStore.get('$1B') & 0x80 === 0` 时再前进。

**问题 3: 36xx 帧跳转 Scene0 是错的**
- ROM 全 frame 1-4355 都在 bank00 main loop 调度，**没有"切 Scene0" 概念**
- Scene0 是 bank00 内部 scheduler mode=0 的入口，由 PRG 切换 + `$C4B9` 驱动
- H5 必须用 `Bank00SchedulerService` + `Bank00MainLoopService` 协同模拟

---

## 6. asm 文件定位参考

### 6.1 bank00 主循环关键 PC
| PC | 来源文件 | 行号 |
|---|---|---|
| `$801F` | `code_main.s` | 17 |
| `$8027` (主循环轮询) | `code_main.s` | 23 |
| `$9BA0` | 待查 | - |
| `$8464` (CFG loader) | 待查 | - |
| `$9FA8` (scheduler tick) | code_util.s:349-area | - |
| `$9EEF-$9F06` (vsync wait) | `code_sub.s` | 1750-1763 |
| `$9A7E-$9AB7` (logo OAM unpack) | `code_sub.s` | 1186-1208 |
| `$91A1-$95FA` (第二画面 OAM/attr) | `code_sub.s`+`code_render.s` | 136 + 359 |
| `$C4B9` (PRG 切换) | 待查 | - |

### 6.2 bank02 (asm) 标题装载 PC
| PC | 翻译目标 |
|---|---|
| `$01:A01B-$A039` | `PpuTransferService.streamTileToVram(addr, data)` |
| `$01:A07F-$A0FE` | `PpuTransferService.streamPalette(addr, data)` |
| `$01:A17F` | `PpuTransferService.setPpuCtrl(0x89)` (enable rendering) |
| `$01:A0ED-$A0FA` | `AudioService.pollApuStatus()` |

---

## 7. 待办（必须做）

1. **Bank00MainLoopService** 框架骨架（先 stub）
2. **unpackLogoOam()** 翻译 bank00 `$9A7E-$9AB7` (per trace F13)
3. **bootTitleScreen()** 翻译 bank02 `$A01B-$A17F` PPU bulk-write (per trace F3349+)
4. **JoypadInputService.pollStart()** 翻译 `$06:80EA` 间接按钮读 (per F3342)
5. **ModuleLoader.switch(id)** 翻译 `$C4B9` 为 import+函数调用 (消除所有 PRG 切换代码)

---

## 8. 旧 trace 表格、bank 映射、routine 翻译表

**保留**：见上次写的章节 1-5（不再重复）
