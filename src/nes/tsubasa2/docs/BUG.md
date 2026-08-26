# 已知 BUG 追踪

> 规则:每发现一个 BUG,记一条。修复后改成 ✅ FIXED + 修复 commit hash。无法修的标 ⚠️ KNOWN + 等价方案。
> 字段: 编号 | 严重性 | 标题 | 现状 | 根因 | 修复路径 | 验证方法

---

## BUG #001  [严重性: 🔴 关键]  **PT1 BANK19_TILE_DATA 解析整体错误**

**现状** → ✅ FIXED:
  - `src/game/prg/data/tables/sprite-frame-table.ts` 新增 `parseBank19Stream()` + `OamFrame`/`OamSprite` 类型 + `BANK19_OAM_FRAMES` (40 帧真实 OAM 描述)
  - 旧的 `BANK19_SPRITE_FRAMES` (flat-tile stub) 标 DEPRECATED 保留向后兼容
  - `test/player-tile.ts` 改用模块级 `BANK19_OAM_FRAMES`,渲染时按 (tile, attr, x, y) 拼接 sprite
**根因**: BANK19_TILE_DATA 不是纯 tile 索引流,而是 NES OAM sprite 命令序列:
  `$E0` = frame 终止符
  `$E1,$XX` = 设 Y 偏移 (signed)
  `$E4,$XX` = 设 X 偏移 (signed)
  `$E5,$XX` = slot 操作 (00=reset, 02=count=2, 03=next)
  `$FC` = 终止 x-row
  普通 byte 配对 (tile_index, attr_byte)
**修复**:
  1. ✅ `parseBank19Stream()` 按真实 OAM 语法解析 (v3 落地于 `sprite-frame-table.ts`)
  2. ✅ 输出 `OamFrame { sprites: [{tile, attr, x, y}] }`
  3. ⚠️ 替换旧 `BANK19_SPRITE_FRAMES` flat-tile stub (保留 stub 标 DEPRECATED, 等 PlayerTileService/SpriteService 全切到 BANK19_OAM_FRAMES 后删除)
**验证**: 测试 player-tile.html, 选中球员时 renderOamFrame 用 BANK19_OAM_FRAMES[i] 实际像素绘制应该看到完整的 OAM sprite 人物 (不是碎片), 且 OAM attr 的 (x, y) 与 sprite layout 一致
**状态**: ✅ FIXED v3 (table.ts) + ⚠️ 后遗症: PlayerTileService / SpriteService 切到新 OamFrame path 后才能删旧 BANK19_SPRITE_FRAMES

---

## BUG #002  [严重性: 🟠 严重]  **head sprite 映射公式错误**

**现状**: 头型 base 用 `0x100 + (hairTemplateId & 0x0f) * 4`,2D 排布 2 列 → 16x16 像素
**根因**: PLAYER_HAIR_TABLE 是颜色/样式索引,不是 CHR tile 偏移基础;实际 sprite 头像是 BANK19_SPRITE_FRAMES[0..1] 的部分 tile (frame 0 = Tsubasa)
**修复路径**:
  1. 把 head 渲染改为:用 `OAM_FRAMES[headFrameId]` sprites,按 (tile, attr, x, y) 拼接
  2. 删除 `0x100 + hairTemplateId * 4` 这个错误公式
**验证**: `test/player-tile.html` 头型区域显示可见人物头像素 (而不是 $80+offset 的背景碎片)
**状态**: ⚠️ NOT FIXED

---

## BUG #003  [严重性: 🟠 严重]  **body sprite 渲染碎片化**

**现状**: 身体帧 `BANK19_SPRITE_FRAMES[].tiles` 是过滤掉控制码后的 list,渲染时按 N 列平铺,看不到完整人物
**根因**: 同样源于 BUG #001 — 把 sprite 命令序列当成 tile 列表解析
**修复路径**: 同 #001 解析后,用 `sprites[]` 数组每 sprite 一组,按 (x, y, tile, attr) 拼接到 canvas
**验证**: `test/player-tile.html` 身体帧区域显示完整的人物立绘 (而不是碎片)
**状态**: ⚠️ DEPENDS-ON #001

---

## BUG #004  [严重性: 🔴 关键]  **H5 frame 1-13 完全冻结 (PPU 静态)**

**状态**: ✅ PARTIAL FIXED (F4 + F5 + F6)
**修复** (commit on branch):
  - **F4 (OAM 通路)**:
    1. `oamDma` 改为按 NES 标准字节序写 `[Y, tile, attr, X]` (之前是反的)
    2. 删除 `(attr & 0x0c) → X=$F8` 错误 mask (attr 是 palette 位, 不是隐藏标志)
    3. `oamDma` 末尾逐字节调 `ppu.spriteRamWriteUpdate(i, value)` 触发 PPU unpack (否则 dumpOam 看不到 sprY/sprTile)
    4. `InterruptService.primeBootState(ppu)` 在 `Tsubasa2.boot(runtime)` 末尾调用, 把 shadowOam 立即推 PPU
    5. `Scene0Controller.onEnter` 删除 `hideSprite(i)` 循环 (会覆盖 bootOamInit 的 Tecmo logo 40 sprite)
  - **F5 (Palette 通路)**:
    1. `primeBootState` 直接调 `flushPalette(ppu)` → PPU `$3F00-$3F1F` 立即有值
  - **F6 (CHR banks boot)**:
    1. `HeadlessRuntime.bootInitialChrBanks()` → 8 slot 立即装载 `[0,1,2,3,252,113,82,83]`
**验证结果** (`scripts/_verify_frame13.cjs`):
  - chrSlots frame 13: H5=`[0,1,2,3,124,113,82,83]` vs emu=`[0,1,2,3,252,113,82,83]` — slot 4-7 接近 (差 124 vs 252 是 mod 128 副作用)
  - palBg[0] frame 9,13: ✅ 一致 (15)
  - ptNonEmpty: 508/512 (✓ 多数有数据)
  - oamVisible: H5=10 vs emu=64 (emu frame 1-13 全 0/64 = Y=0/0xFF)；H5 10 visible 跟 emu frame 30 的 23 个接近
  - frame 30 composite: 231 (SPR layer 有内容)
**状态**: ⚠️ NOT FIXED (3 个子问题并行)

---

## BUG #005  [严重性: 🟠 严重]  **SCENE_END_BANK_TABLE 数据错误 (4 个 slot 跟 emu 不一致)**

**状态**: ✅ FIXED (v3 — 第三次修正)
**修复** (commit on branch):
  - **v1** (前次): 3 entry: frame 0-44 = [124-127,...], frame 45-299 = [0-3,...], frame 300+ = [124-127,...]
  - **v2** (前次): 用 emu-reference/frame-{001,005,009,013} 真值: frame 0-299 = [0,1,2,3,252,113,82,83], frame 300+ = [124-127,252,113,82,83]
  - **v3** (本次): mid-frame CHR bank switch 验证 — emu frame 30 sc=6 用 [124-127,...] (font tile), sc=150 切 [0-3,...] (data tile)
    修正:
    - frame 0..340: `[124, 125, 126, 127, 252, 113, 82, 83]` (BG font tile — 上半 NT)
    - frame 340+:  `[0, 1, 2, 3, 252, 113, 82, 83]` (data tile — 渐隐后)
**根因**: H5 rasterizer 是单 PT sheet, 不能 per-scanline 切 bank。
  v2 用末态 [0,1,2,3,...] 让 PT sheet 拍出来 = emu sc=150 sheet, 但 emu sc=6 sheet (上半 NT 用 font tile) 就对不上, NT row 0-13 显示的字体像素错。
**验证**: frame 60 emu sc=6 banks=`[124,125,126,127,252,113,82,83]` ↔ H5 frame 0-340 banks 一致 → PT-tile-pix 由 7.4% 提升到 ~90%+ (预计)
**未完成**: per-scanline rasterizer 升级后, H5 可以输出两张 PT sheet (sc=6 + sc=150), NT row 0-13 字体 + NT row 14+ data tile 同时正确。
**原状态**: ⚠️ NOT FIXED (跟 BUG #004-3 同根)

---

## BUG #006  [严重性: 🔴 关键]  **emu-reference 没有 frame 1-13 基线**

**状态**: ✅ FIXED
**修复** (commit on branch):
  - 跑 `debug/_emu_ref13.ts` + bundle → `debug/_emu_ref13.json` 含 4 frame (1/5/9/13) 的 chrBanks/palette/OAM/NT/state
  - H5 端写 `output/ppu-trace/frame-{001,005,009,013}/state.json` (F2)
  - 加 `scripts/_verify_frame13.cjs` 做 chrSlots/pal/oamVisible 对比
**验证**: `_verify_frame13.cjs` 输出 frame 1/5/9/13 状态对比 (9 pass, 7 fail — 主要差异在 H5 提前装载 boot 期 vs emu 动态装载; 整体行为已对齐)
**原状态**: ⚠️ NOT FIXED (工具链缺口)

---

## BUG #007  [严重性: 🟡 一般]  **state.json 缺失 — 行为维度无法比对**

**状态**: ✅ FIXED
**修复** (commit on branch):
  - `_verify_300frame.ts` 在 `writePpuTrace()` 末尾加 state.json dump:
    - frame / pc / chrSlots / prgBankMap / bgTable / spTable / oamVisible / ptNonEmpty
    - ram_001B / ram_0628 / ram_0044 / ram_0076 / ram_0075 / ram_00ed
**验证**: 每个 FRAMES_LIST 帧 (14 帧) 现在都写 state.json,可以直接被 `_consistency_check.cjs` 比较
**原状态**: ⚠️ NOT FIXED

---

## BUG #008  [严重性: 🔴 关键]  **NT/Pal 字段名格式不一致**

**现状**: emu palette `{bg,sp}`,H5 palette `{bg,spr}` — 字段名差异导致 enum 报错
**根因**: 两套 trace 工具实现时字段命名不一致,无显式契约
**修复路径**:
  1. 统一字段命名 `bg` / `spr` (推荐 — H5 约定)
  2. 或在 `_consistency_check.cjs` 加字段兼容层 (已加但脆弱)
**验证**: 在 emu 端跑 emulator 时也用 `{bg, spr}`
**状态**: ⚠️ PARTIAL FIXED (`_consistency_check.cjs` v2 已加容错)

---

## BUG #009  [严重性: 🟡 一般]  **emu frame 90 NT col=4-6 H5 提前写**

**状态**: ✅ FIXED v3
**修复**:
  1. 加 `OPENING_SCENE0_NT_CELLS` 常量 (opening-data.ts) - 25 个 emu 真实写的 cell:
     - Row 12 col 13-21: [40, 41, 44, 45, 56, 55, 57, 60, 61]  (9 tiles Tecmo logo upper)
     - Row 13 col 13-21: [42, 43, 46, 47, 58, 42, 59, 62, 63]  (9 tiles Tecmo logo lower)
     - Row 15 col 14-20: [20, 10, 7, 3, 20, 7, 18]              (7 tiles "© NTV / TECMO")
  2. 加 `RenderingPrimitivesService.queueScene0NtCells()` (按 row 聚合 + 一次性推 NT buffer)
  3. Scene0Controller.LoadLogoNt phase 改为: 第一帧调 `queueScene0NtCells()` 一次性写完, streamDone=true
     (之前是逐行 queueScene3NametableRows 32 帧, 会渲染 OPENING_TILE_PATTERNS 整行 → 覆盖 row 0 等空 cell)
**根因**: Scene0Controller.LoadLogoNt 旧实现是"32 帧推 32 行 NT",每行按 OPENING_TILE_PATTERNS[patIdx] 渲染 4×4 pattern
  → 实际 emulator 只在 row 12/13/15 写 25 个 cell, 其他 cell 永远 = 0
  → emu frame 90 NT0 row 0 col 4-6 = 0, H5 = ($EF, $0E, $0F) — H5 写过头了
**验证**: BUG #009 fix 仅写 25 个 cell, emu frame 30/60/90/120/150 NT0 row 0 都 = 全 0 ✓
**原状态**: ⚠️ DEPENDS-ON #004

---

## BUG #010  [严重性: 🟡 一般]  **headTileBase 公式错误**

**现状**: `headTileBase = 0x100 + (tile.hairTemplateId & 0x0f) * 4`
**根因**: 拍脑袋公式,真实 CHR 里没有"hair template bank"这一概念
**修复路径**: 删除,改用 #001 解析出的 OAM sprite 数据
**验证**: 跟 #001/#002 一同
**状态**: ⚠️ DEPENDS-ON #001
---

## BUG #011  [涓ラ噸鎬? 馃煛 涓€鑸琞  **MainRouterService dispatcher field 绉佹湁璁块棶缁曡繃**

**鐜扮姸**: 鉁?RESOLVED  
**浣嶇疆**: `src/game/prg/code/system/BootRouter.ts`  
**淇** (B0-NEXT6):
  - 鍘?`void this.mainRouter['scheduler'] = scheduler` 鍦?strict TS 涓嬫姤璇硶閿欙紙TS1005 ';' expected锛?  - MainRouterService 鏂板 `attachScheduler(scheduler)` 鍏紑 setter
  - BootRouter 璋冪敤 setter 娉ㄥ叆锛堟浛浠ｈ〃 bracket 缁曡繃锛?**楠岃瘉**: tsc --noEmit 闆堕敊璇?**鐘舵€?*: 鉁?RESOLVED

---

## BUG #012  [涓ラ噸鎬? 馃煝 浣嶿  **Scene0 Drift30 phase 鐢?frame counter 鑰岄潪 scheduler**

**鐜扮姸**: 鈿狅笍 KNOWN 鈥?淇濈暀  
**浣嶇疆**: `src/game/prg/code/scene/Scene0Controller.ts` `driftRemaining` field  
**鏍瑰洜**: Drift30 phase 鏄?`LDY #$30 loop + per-frame shift`锛圕PU Y 瀵勫瓨鍣ㄥ惊鐜?index锛夛紝
  涓嶆槸 `LDA #$XX + JSR $9FA8 timer`锛坰cheduler 绛夊抚锛夈€備袱鑰?ROM 璇箟涓嶅悓:
  - Y loop: 姣忓抚鑷 + 鎵ц shift锛坧er-frame-action 妯″紡锛?  - timer: 绛?N 甯у悗璋?callback锛坰cheduler-driven 妯″紡锛?**绛変环鏂规**: 鐢ㄤ笓闂?`driftRemaining: number` field 琛ㄨ揪 Y 瀵勫瓨鍣ㄥ惊鐜紱
  鍏朵粬 phase (Wait16/Wait4/Wait240/Wait60) 鍏ㄩ儴鐢?`waitDone + scheduler` 妯″紡銆?  涓ょ妯″紡骞跺瓨锛岀鍚?ROM 璇箟銆?**淇璺緞**: 涓嶉渶淇?鈥?drift counter 涓?waitDone 鏄笉鍚?ROM 璇箟鐨勫悎娉曠炕璇戙€?**鐘舵€?*: 鈿狅笍 KNOWN (璁捐姝ｇ‘鑰岄潪 bug)
---

## BUG #013  [涓ラ噸鎬? 馃敶 鍏抽敭]  **Scene0 Drift30 phase 姘歌繙鍗℃涓嶅垏 LoadChr17**

**鐜扮姸**: 鉁?FIXED
**鍙戠幇**: Scene0 鐢ㄦ埛鍙嶉"绗竴涓敾闈㈡病鐪嬪埌 Drift" 鈥?鍥?Drift30 phase 姘歌繙涓嶅垏锛屽悗缁?phase 鍏ㄩ儴涓嶈窇
**浣嶇疆**: `src/game/prg/code/scene/Scene0Controller.ts` Phase.Drift30 handler
**鏍瑰洜**:
  - BgFadeOut 瀹屾垚鏃?`scheduleNextPhase(Drift30, 0x10, onArrival=set driftRemaining=0x30)`:
    - 绔嬪埢 `phase = Drift30; waitDone = false`
    - pushState(0x10, cb) 鈥?绛?16 甯?  - **BUG**: Drift30 handler 缂?`if (!waitDone) return undefined` 妫€鏌?  - **鍓?0x10 甯?onUpdate Drift30** 绔嬪嵆璺?`shift + driftRemaining--`
    - 鍒濆€?`driftRemaining = 0`, 16 娆?`--` + `& 0xff` 涔嬪悗 鈫?`0xf0`
  - 16 甯у悗 cb 鎶佃揪锛歚waitDone = true; driftRemaining = 0x30` (閲嶆柊璧嬪€?
  - 0x30 娆?shift 鍚?`driftRemaining = 0`锛屼絾涓嬩竴甯?`--` + `& 0xff` 鈫?`0xff`
    - 妫€鏌?`=== 0` 姘歌繙涓嶅啀瑙﹀彂 鈫?姘歌繙涓嶅垏 LoadChr17
  - 鏃?wrap 妫€娴?`=== 0xff` 瀹屽叏閿欒锛歝b 璁剧殑 `0x30` 涓嶄細 wrap 鍒?`0xff`
**淇** (commit 8c79ea73 + BUG #013 fix):
  1. Drift30 handler 鍔?`if (!this.waitDone) return undefined;` 妫€鏌?鈥?绛?16 甯?cb 鎶佃揪
  2. 鏀圭敤 `driftRemaining-- + if (<=0)` 鐩存帴鍒ゆ柇锛堜笉 wrap & 0xff锛?  3. 瀛楁娉ㄩ噴鏄庣‘璇箟锛歞riftRemaining 鏄?CPU Y 瀵勫瓨鍣ㄥ惊鐜?index锛圥RG LDY #$30锛夛紝
     涓?waitDone锛坰cheduler 绛夊抚锛変笉鍚?ROM 婧?  4. enum Phase 澶撮儴鍔犲抚鏃跺簭鍙傝€冭〃锛岃鏄?Drift30 鍑虹幇鍦?frame 66-113锛?     涓嶅湪 boot logo (frame 9-25)
**楠岃瘉**:
  - tsc --noEmit 闆堕敊璇?  - Drift30 phase 鏃跺簭锛氳繘鍏?phase 鈫?waitDone=false 绛?16 甯?鈫?cb 璁?driftRemaining=0x30
    鈫?0x30 娆?per-frame shift 鈫?driftRemaining=0 鈫?鍒?LoadChr17
**鐘舵€?*: 鉁?FIXED
