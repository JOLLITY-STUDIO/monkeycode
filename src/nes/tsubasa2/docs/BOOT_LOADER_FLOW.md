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
| `docs/roms/openging-skip-to-title/title-kick-off.log` | NEW |  | 标题画面 kickoff（即新 trace） |
| `docs/roms/openging-skip-to-title/title-kick-off-to-meeting.log` | NEW |  | 标题画面 → 比赛开球（即新 trace） |

---

## 2. **START 按下 → 标题画面**链路（已 trace 实证）

### 2.1 入口 / 兜底处理 — bank06 (asm audio)
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
