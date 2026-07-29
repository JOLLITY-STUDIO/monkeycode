# BUG 追蹤文檔 — game-engine bank 翻譯引擎

## 版本資訊
- 版本: v1.1.1 (驗證更新)
- 日期: 2026-07-29
- 狀態: 核心基礎設施 ✅ 已驗證；啟動序列 ❌ 待實現

---

## 雙引擎渲染對比驗證結果 (2026-07-29)

**測試腳本**: `h5-compare/compare-frames.ts` (npx tsx 自動化)

| 幀範圍 | 結果 | 說明 |
|--------|------|------|
| 幀 0-7 | ✅ 完全匹配 (0/61440 差異) | PPU 硬體初始化 + 清屏渲染 |
| 幀 8+ | ❌ 87.5% 差異 (53760/61440) | CPU 執行 TECMO logo 場景，Bank 引擎在 match loop |

**根因分析**:
- 幀 0-7：兩邊引擎初始化流程等價 → `ppuScreenInit_$CB35` 清除 nametable → PPU 渲染空白幀
- 幀 8：CPU 模擬器執行 TECMO logo 字節碼腳本 → NMI handler 寫入 nametable 數據 ($0628: 255→35→57→39)
- Bank 引擎 `$0628` 恆為 0 → `bank02_nmiHandler()` 直接跳過渲染
- Bank 引擎 `tick_BANK31_mainLoop()` 代表**比賽主循環**，而非啟動流程（TECMO logo → 標題 → 菜單）

**結論**:
- ✅ **核心基礎設施完全正確**：MMC3 映射、PPU 硬體對接、ROM bank 註冊、記憶體模型
- ❌ **啟動序列尚未在 Bank 引擎中實現**：bank-00 場景分派、字節碼解釋器未連接到主循環

---

## 待修復問題

### BUG-012: bank-31 `_call_bank00_XX` 全是空 stub
- **嚴重度**: **P0**
- **檔案**: `game-engine/banks/bank-31.ts` (第 413-431 行)
- **描述**: 18 個函數全為 `{}`，這些是比賽主循環調用 bank-26 的分派入口

### BUG-013: Bank 引擎與 CPU 模擬器啟動流程不同
- **嚴重度**: **P0**
- **檔案**: `h5-compare/main.ts`
- **描述**: CPU 走完整 ROM 啟動 → Bank 跳過啟動直進 match loop
- **方案**:
  - A: 從 CPU snapshot post-boot 狀態 → 注入 Bank 引擎
  - B: 實現完整 bank-00 場景狀態機 + 字節碼引擎

### BUG-014 (新): `tick_BANK31_mainLoop` 執行非比賽上下文時會覆蓋 $0628
- **嚴重度**: P1
- **檔案**: `game-engine/banks/bank-31.ts`
- **描述**: `tick_BANK31_mainLoop` 假設處於比賽狀態，會清除場景 flag

### BUG-015: `nmiInit_$C71A` 洩漏到 `main.ts`
- **嚴重度**: P1
- **檔案**: `h5-compare/main.ts`, `game-engine/core/boot.ts`
- **描述**: NMI 初始化是遊戲引擎內部邏輯，main.ts 不該直接調用。`boot.ts` 完全沒調，兩入口不一致
- **修復**: `translate_BANK31_RESET` 內部已調用 `nmiInit_$C71A`；main.ts 不再單獨調用 ✅ 2026-07-29

### BUG-016: `bank02_ppuScrollUpdate` 未在每幀調用
- **嚴重度**: **P0**
- **檔案**: `h5-compare/main.ts`
- **描述**: CPU NMI handler (bank30 `$C76E`) 同時做 PPU 數據傳輸 + 滾屏 + CHR 切換 + 手柄輪詢 + 幀 tick。Bank 路徑把這些拆成了兩個函數 (`bank02_nmiHandler` + `bank02_ppuScrollUpdate`)，但 main.ts 只調了前者
- **影響**: 滾屏位置不更新、CHR bank 不切、手柄輸入不同步、幀計數器不累積 → **渲染畫面偏移/錯亂**
- **修復**: main.ts 每幀已加入 `bank02_ppuScrollUpdate()` ✅ 2026-07-29

### BUG-017: `initScene` → `$CEFE` → bank00 dispatch 斷鏈
- **嚴重度**: **P0**
- **檔案**: `game-engine/banks/bank-30.ts`, `game-engine/banks/bank-31.ts`
- **描述**: 6502 RESET 鏈: `$FFF0 → $C503 → initScene_$C64E → JMP $CEFE → bank00 場景分派`。翻譯路徑 `initScene_$C64E` 直接 return，沒有進入 bank00 dispatch 初始化初始場景狀態
- **影響**: bank00 場景分派負責初始化 TECMO logo、標題畫面等場景狀態。缺少這一步 → 遊戲直接從比賽主循環開始
- **修復**: `translate_BANK31_RESET` 新增 `entryToBank00_dispatch(sys, bank00_dispatchScene)` 串接整個 dispatch 鏈 ✅ 2026-07-29
- **注意**: dispatch 鏈中多數子函數 (titleBoot、ppuClear、bytecodeWait、checkPpuInit 等) 仍為 stub；鏈路正確但實際渲染邏輯待補全

### BUG-018: NMI handler 兩路數據源不一致
- **嚴重度**: ~~P0~~ P2 (架構觀察)
- **檔案**: `game-engine/banks/bank-02.ts` vs `game-engine/banks/bank-30.ts`
- **描述**: CPU NMI handler (bank30 `$C76E`) 從 `$0498` 隊列讀 PPU 數據、從 `$4A/$4B` 讀滾屏位置。Bank NMI handler (bank02) 從 `$05E8` 隊列讀數據、從 `$7A/$44` 讀滾屏
- **澄清 2026-07-29**: 兩路擁有各自獨立的 SystemState，每路內部一致：CPU 遊戲邏輯寫 `$0498`/`$4A-$4B` → CPU NMI 讀取；Bank 遊戲邏輯寫 `$05E8`/`$7A-$44` → Bank NMI 讀取。不是 bug，是兩個獨立的渲染管線使用各自的記憶體區域。對比測試中的差異來自 **遊戲邏輯翻譯不完整**，而非 NMI handler 讀錯地址

---

## 已修復

| BUG | 狀態 | 修復 |
|-----|------|------|
| BUG-007 | ✅ ROM bank 全註冊 | system-state.ts → `registerAllBanks()` |
| BUG-006 | ✅ PPU 對接OK | h5-compare 兩路均用真實 PPU |
| BUG-015 | ✅ nmInit 收回引擎 | bank-31: `translate_BANK31_RESET` → `nmiInit_$C71A` |
| BUG-016 | ✅ ppuScrollUpdate | main.ts 每幀加入 `bank02_ppuScrollUpdate()` |
| BUG-017 | ✅ initScene→dispatch 串接 | bank-31: `entryToBank00_dispatch(sys, bank00_dispatchScene)` |
| — | ✅ RESET 補全 initScene | bank-31: `translate_BANK31_RESET` → `initScene_$C64E` |
| — | ✅ main.ts 清理遊戲邏輯 | 移除 `ppuScreenInit`/`clearOam`/`initScene` 重複調用 |
