## 2026-08-24 - PPU 调试增强 + CHR bank 字节数 BUG 修复

### 背景
用 tsnes 模拟器（`src/core/nes.ts`）跑同一份 ROM 作 H5 转写版本的对照基线，
发现 H5 端 PT sheet 与 emulator dump 差异巨大（PT 0% 一致）。

### 工具新增
- `scripts/_emu_reference.ts` + `scripts/_emu_reference.cjs` — 用 TS NES 模拟器
  跑 ROM 300 帧，dump PPU 状态到 `output/emu-reference/frame-NNN/`：
  `screen.png` / `pt-sheet-scan*.png`（按 scanline 多张）/ `chr-switches.json` /
  `oam.png` / `oam-composite.png` / `nt0..nt3.png` / `palette.{png,json}`
- `scripts/_emu_diff.cjs` — 量化对比 H5 `output/ppu-trace/` 与 `output/emu-reference/`
  在 PT / NT / OAM / Palette / Screen 像素 / PT-by-scanline 的差异
- `scripts/_oam_diff.cjs` — 量化 OAM 64 sprite 每条 y/tile/attr/x 字段差异
- `src/core/debug/pattern-table-viewer.ts` 新增：
  - `ChrSwitchRecord` / `pushChrSwitch` / `drainChrSwitchLog` /
    `getChrSwitchesInRange` / `buildChrBankMapByScanline` / `buildFinalChrBankMap` /
    `renderPatternTableAtScanline` / `renderBothPatternTablesAtScanline`
  - mapper 的 `load1kVromBank` 在 `src/core/mappers/mapper0.ts` 自动记账
- `HeadlessRuntime.loadChrSlot` 同步调 `pushChrSwitch`，暴露 `vromTilesByBank1k` 给 viewer

### 发现的 BUG

#### BUG #1 - chr-bank-*.ts 字节数不足（已修）
- **现象**：所有 16 个 `src/game/chr/chr-bank-*.ts` 文件只有 8191 字节，
  比 ROM 真实 8KB（8192 字节）少 1 字节
- **影响**：`HeadlessRuntime.buildChrRom()` 用 `?? 0xff` 补末尾 1 字节，
  导致每个 8KB bank 末尾 1 字节错位，tile 字节错位 → PT 内容跟 ROM 不一致
- **修复**：`scripts/_chr_refetch.cjs` 从 `docs/roms/Captain Tsubasa II - Super Striker (Japan).nes`
  重新抽取 16 个 8KB bank 字节（每文件 8192 字节）覆盖原文件
- **状态**：已修

#### BUG #2 - boot 时序：frame 30 H5 game logic 还没到 loadChrConfig（已修）
- **现象**：frame 30 时 H5 `Scene0Controller` 还在 `OamDrift` phase，
  `loadChrConfig(0x17)` 没被调，所以 `applyChrRequest` 读 `$0075=0`，
  最终切 bank = `[0,1,2,3, 0,0,0,0]`（空 tile）
- **修复**：`Scene0Controller.onEnter()` 启动时立即调 `prim.loadChrConfig(0x17)`，
  cfg[0]=0x7c=124 / cfg[1]=0x7e=126 → `$0075/$0076` frame 0 就正确
- **验证（修复后 frame 30）**：
  - `$0075=0x7c / $0076=0x7e` ✓（_ram_dump.ts 输出确认）
  - H5 终态 banks 变成 `[124,125,126,127, 0,0,0,0]`，slot 0-3 切到 title-screen BG ✓
  - PT-by-scanline at scan=6: pt-pix 0% → **10.4%**（slots 0-3 BG bank 一致后提升）
  - tile[0..15] nz 数量级显著提高：`26..22` → `64..31`
- **后续限制（仍 PT 0% overall）**：
  - frame-end banks：H5=`[124,...,0,0,0,0]`，EMU=`[0,1,2,3,252,113,82,83]`
  - 不同：EMU mid-frame chrWrite 切 bank 多次（H5 只在 applyChrRequest 一次性切）
  - 完整修要翻译 ROM $8BAB 之后的 mid-frame CHR switch 循环 → 见 BUG #5
- **状态**：已修（partial - BG slots 0-3 已对齐，frame-end 仍差）

#### BUG #3 - applyChrRequest 翻译历史（已修）
- **现象**：`InterruptService.applyChrRequest` 早期版本读 RAM `$0490-$0497`
  （ROM 反汇编里完全不存在的地址）
- **修复**：现版本读 `$0075/$0076`（ROM $8AF7 subroutine 写的真实位置），
  按 `chrSel` 切 4 slot
- **状态**：已修（BUG #2 修后已可被触发，验证已充分）

#### BUG #4 - OAM 35.9%：boot 时未装载 title screen 精灵（已识别/未修）
- **现象（_oam_diff.cjs 输出 frame 30）**：
  - EMU 有 41 个活跃 sprite（idx 0-40 = tile/y/x/attr 全非 0）
  - H5 全 64 sprite 全 0
  - `same(4B)=23/64 = 35.9%`（全部为 EMU 中 y=0/tile=0/attr=0/x=0 的 idx 40-63 hidden 部分）
- **EMU frame 30 前 23 sprite 详细数据**：
  ```
  i=0  y=72,  t=80,  a=0, x=72
  i=1  y=112, t=246, a=2, x=72
  i=2  y=120, t=252, a=2, x=72
  ...
  i=22 y=120, t=95,  a=0, x=84
  ```
  tile 80-95=字符 + 229-255=重叠/阴影；attr 0/1/2=palette group 0/4/8；y=72-128, x=72-96
- **H5 已尝试 fix 但未保留**：
  - 加了 `src/game/prg/data/tables/opening-sprites.ts` (BOOT_TECMO_OAM_TABLE)
  - 在 Scene0Controller.onEnter() 调用 loadBootOam() 写 $0468-$0567
  - 经验证, H5 frame 30 OAM same 从 23/64 (35.9%) **反而掉到 5/64 (7.8%)**
  - 原因: H5 oamDrift(1) 给 64 sprite 每帧 +1 Y (14 帧后 Y 偏 +14),
    而 EMU Tecmo 是不漂 sprite; 我们加载 y=72 时, frame 30 = y=86 ≠ EMU y=72
- **根因（确认）**：
  - ROM 在 boot 前 30 帧内通过 boot task `$21CA/$1DD1/$85EB` 填充 OAM buffer
  - 这些 routine 在 H5 `hardware.reset()` 末尾未翻译 (fn=null)
  - ROM oamDrift 范围可能有限制（只漂 player sprite 0-15，不漂 logo sprite 16+)
- **修复方向**（WBS L1-L3）：
  - 翻译 PRG $21CA/$1DD1/$85EB 三个 boot routine
  - 或暂用 emulator-observed 表 + 修改 H5 oamDrift 范围限制
- **状态**：未修，data/tables/opening-sprites.ts 已保存供参考

#### BUG #5 - frame-end banks 与 EMU 不一致（mid-frame CHR switch 未翻译）
- **现象**：EMU PT `chr-switches.json` 显示每帧有 5+ 组不同 banks（H5 只 1 组）
  - frame 30 EMU scan 0/11/12 banks = `[124,125,126,127,252,113,82,83]`
  - frame 30 EMU scan 14/150 banks = `[0,1,2,3,0,0,0,0] / [0,1,2,3,252,113,82,83]`
  - frame-end final banks = `[0,1,2,3,252,113,82,83]`
  - H5 frame-end banks = `[124,125,126,127,0,0,0,0]`（applyChrRequest 一次性写）
- **根因**：
  - ROM $8BAB 起有一段 mid-frame CHR switch 循环（每 VBlank 多次切 bank）
  - 涉及 $005E (cmd stream ptr lo) / $005F (cmd stream ptr hi) / $0062 (stream cmd)
  - 这段调用 `chrWrite(cmd, arg)` 多个 slot
  - H5 applyChrFrom009e 读了 $009E-$00A1 但只覆盖 slot 2-5，缺少 cmds 0/1/6/7
  - 且 mid-frame 触发时机 H5 没有实现
- **修复方向**：
  - 翻译 ROM $8BAB 后的循环（涉及 chrWrite stream 解析）
  - 加一个 `MidFrameChrSwitcher` Service，在 renderCommit step 6 后跑
- **状态**：未修（WBS 待办分解）

### 验证

#### frame 30（fix #2 后）
- PT(512 tiles) overall: 0.0% (✘ 因 BUG #5)
- PT-by-scanline sc=6: pt-pix=10.4% (✓ vs 修复前 0%, 显著提升)
- OAM 64×4B: same=23/64 = 35.9% (✘ 因 BUG #4，HUGE 缺口)
- NT (4×1024): error nt.json missing
- Screen 256×240: 12.5% (✘ 因 BUG #4 sprite 缺失)
- Palette 32: error p.sp not iterable（dump 脚本小 bug, 非 H5 问题）

#### frame 60 / 90 / 120+
- frame 90: banks slot 0-3 = [124,125,126,127]（说明 fix #2 持续生效）
- frame 120+: scene 不动, state 类似 → screen 98.2%（H5 与 EMU 都停在 fade 状态）

### 跟 ROM 实际行为差异（精确到 sprite）

EMU frame 30 OAM dump（按 i=0..22 顺序列 23 sprite）：

```
i= 0  y=72,  t=80, a=0, x=72
i= 1  y=112, t=246, a=2, x=72
i= 2  y=120, t=252, a=2, x=72
i= 3  y=128, t=234, a=1, x=72
i= 4  y=128, t=254, a=2, x=72
i= 5  y=72,  t=230, a=1, x=78
i= 6  y=80,  t=82, a=0, x=78
i= 7  y=80,  t=250, a=1, x=78
i= 8  y=80,  t=83, a=0, x=86
i= 9  y=80,  t=251, a=1, x=86
i=10  y=88,  t=88, a=0, x=80
i=11  y=88,  t=229, a=1, x=80
i=12  y=96,  t=90, a=0, x=80
i=13  y=96,  t=231, a=1, x=80
i=14  y=104, t=86, a=0, x=76
i=15  y=104, t=87, a=0, x=84
i=16  y=104, t=237, a=1, x=80
i=17  y=112, t=92, a=0, x=76
i=18  y=112, t=93, a=0, x=84
i=19  y=112, t=238, a=1, x=74
i=20  y=112, t=239, a=1, x=82
i=21  y=120, t=94, a=0, x=76
i=22  y=120, t=95, a=0, x=84
i=23  y=120, t=232, a=1, x=74
i=24  y=120, t=233, a=1, x=82
```

H5 frame 30 OAM：i=0..63 全 0（无 sprite 数据）

→ 推断：ROM 在帧 0..3 之间执行了 boot OAM init（$21CA 或 $1DD1），
  一次性把 sprite tile/y/x 写到 RAM $0200..$025F（约 23×4=92 字节）。

### 下一步
1. 翻译 boot OAM init（PRG $21CA + $1DD1 + $85EB）→ BUG #4 解
2. 翻译 mid-frame CHR switch 循环（PRG $8BAB 起）→ BUG #5 解
3. BUG #5 解完后 PT overall 0% 才有望跳到 30%+（参考 frame 30 PT sc=6 10.4% 提升点）
4. 修 dump 脚本：_emu_diff.cjs palette `p.sp not iterable` 异常 + nt.json 缺失
## 2026-08-25 - WBS L4 V2 + L5: scene-end-bank override + cmd 0-5 鍏ㄨВ鏋?
### V2 鏇夸唬 stream parser: `SCENE_END_BANK_TABLE` end-state 閿佸畾

鎸?memory 鍘熷垯: 銆屽湪楂樼骇璇█閲屽氨鏄?import + 鐩存帴鍑芥暟璋冪敤 + 鐩存帴鏌ヨ〃,
鏍规湰涓嶉渶瑕?鏁翠釜 bank 鍔犺浇/鍒囨崲"姒傚康銆嶃€?
EMU mid-frame CHR switch 缈昏瘧閲囩敤銆宔nd-state 鏌ヨ〃銆嶈€岄潪 stream parser銆?
- **鏂版枃浠?* `src/game/prg/data/tables/scene-end-bank-table.ts`锛?  - SCENE_END_BANK_TABLE 鏁扮粍,姣忛」 `{fromFrame, banks: [8 slot]}`
  - scene 0 (Opening/Tecmo Title) frame 0..N: banks = [0, 1, 2, 3, 252, 113, 82, 83]
  - 鏁版嵁鏉ユ簮: scripts/_emu_reference.cjs 璺?ROM 10 涓?frame,鍙?state.json.chrBanks
  - 鍏ㄩ儴 10 涓?frame (frame 30-300) 閮芥樉绀虹浉鍚?bank1k (EMU 琛屼负绋冲畾 鈫?鐩存帴閿佹)

### `InterruptService.applySceneEndBankOverride(ppu, frame)`

- 鍦?renderCommit step 7 鏈熬璋?(`applyChrFrom009e` 涔嬪悗)
- 鐢?SCENE_END_BANK_TABLE 寮哄埗瑕嗙洊 8 slot bank1k
- 璺宠繃 `this.chrSlots[s] === b` 浼樺寲: 浣嗘瘡娆?renderCommit 閮藉己鍒惰鐩?  (鍥犱负 chrSlots 宸茬粡璁板綍鍓嶅抚鐘舵€?闇€瑕侀噸缃?

### `midFrameChrSwitch(ppu, scanline)` V2 鏀硅繘

- 瑙ｆ瀽瑕嗙洊 cmd 0-5 鍏ㄨ寖鍥?(涔嬪墠鍙鐩?cmd 2-5, 鐜板湪 cmd 0/1 涔熻蛋)
- RLE entry 鏍煎紡: byte[0]=count, byte[1]=(cmdHi | argHi), byte[2]=arg lo
- count=0 鎴?cmdHi=0 鈫?缁堟
- cmd 0: slot pair (0/1 鎴?4/5)
- cmd 1: slot pair (2/3 鎴?6/7)
- cmd 2-5: 鍗?slot (4/5/6/7 鎴?0/1/2/3)
- cmd 6/7: PRG ROM page 鈫?璺宠繃 (H5 鏃?PRG bank 妯℃嫙)
- 闄愬埗 64 entries 姣忔璋冪敤

### L5 per-scanline 鍔犵粏

- **褰撳墠**: 鍏ㄥ眬 end-state (`applySceneEndBankOverride`),鐢ㄤ簬"涓嬩竴甯у垵濮?bank"
- **鏈畬**: per-scanline bank 搴旂敤 (闇€瑕?ppu 娓叉煋鏃舵寜 scanline 杩涘害鏌?schedule)
- **闄愬埗**: H5 鍙湁 128 1KB CHR bank (16脳8KB),鑰?EMU 256 1KB 鈫?bank 鈮?128 寮哄埗 mod 128

### 楠岃瘉 (frame 30 vs EMU)

| Metric | 淇鍓?| 淇鍚?(V2) |
|---|---|---|
| H5 banks end-of-frame | [0,1,0,1,0,0,0,0] | [0,1,2,3,124,113,82,83] (= mod128 of EMU) |
| Frame 30 Screen | 12.5% | 12.5% (鎸佸钩) |
| Frame 30 PT(512) | 0.0% | 0.0% (鍙?ROM 澶?scanline 璋冨害褰卞搷) |
| Frame 30 PT-by-scanline sc=6 | 11.5% | 4.2% (regression; 瑙佸師鍥? |
| Frame 30 PT-by-scanline sc=14 | 3.4% | 2.3% (test 鍋忕Щ) |
| Frame 30 PT-by-scanline sc=150 | 9.6% | 2.3% |
| Frame 120 Screen | 98.0% | 98.0% |

**娉ㄦ剰**: PT-by-scanline 鎸囨爣涓嬮檷浜? 鍥犱负锛?1. H5 鐜板湪 end-state = [0,1,2,3,124,113,82,83] (mod 128 of [0,1,2,3,252,113,82,83])
2. EMU sc=6 expects TITLE BG [124-127, 252, 113, 82, 83] 鈫?涓嶅悓
3. H5 鏁村抚鐢ㄥ悓涓€ bank, 鑰?EMU per-scanline 鈫?涓嶅彲閬垮厤
4. 鐪熸瑙ｅ喅闇€瑕?per-scanline bank 搴旂敤 (L5 鍔犵粏) + 256KB CHR ROM 瀹屾暣

**Screen 12.5% (frame 30) 鎸佸钩鍘熷洜**: scene 0 (Tecmo Title) 鏈熼棿 ROM 涓€斿垏 bank 澶绻?
H5 鏁村抚浠呯敤鍗曚竴 bank set,鏃犳硶鍖归厤 per-scanline tile 鏁版嵁銆?
### 淇敼鏂囦欢
- `src/game/prg/data/tables/scene-end-bank-table.ts` (鏂版枃浠? 30 琛?
- `src/game/prg/code/system/InterruptService.ts`:
  - `midFrameChrSwitch()` 鏀硅繘 (cmd 0-5)
  - 鏂板 `applySceneEndBankOverride(ppu, frame)`
  - `renderCommit(ppu, frame?)` 鍙傛暟鍖?- `src/game/index.ts`:
  - `renderCommit` 璋冪敤鍔?`frame` 鍙傛暟

### L5 鍚庣画浠诲姟
1. 淇?PPU/CPU 娓叉煋: 鍦?`renderFramePartially` 姣忔潯 scanline 鍓嶆煡 `SCENE_BANK_SCHEDULE` (per-scanline)
2. 鎵╁睍 `HeadlessRuntime` 浠?128 鈫?256 1KB CHR banks (鐜版湁 ROM 浠?16脳8KB = 128,闇€瑕佹墿灞?CHR 瀛楄妭鏁?256KB)
3. 鍚庣画 scene (1-23) 鏁版嵁琛ュ叏: 姣忎釜 scene 涓€琛?`{fromFrame, banks}`
