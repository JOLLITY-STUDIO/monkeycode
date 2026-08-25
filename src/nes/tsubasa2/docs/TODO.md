# TODO — 当前迭代 (frame 1-13 验证修复)

> 接 sprint: `docs/WBS_FRAME13.md`
> 规则: 任务列表只能叠加不能清除; 每个任务完成 = 一个可提交节点.

## 进行中 (in_progress)

### T0.  [📋 wbs/todo/bug 文档落地]
- ✅ `docs/BUG.md` (10 条 BUG 跟踪, #005 ✅ FIXED)
- 🆕 `docs/WBS_FRAME13.md` (frame 1-13 修复路线, 11 tasks F1-F11)
- 🆕 `docs/TODO.md` (本文档)

## 待处理 (queue, 按 WBS_FRAME13 F1-F11)

### F1. emu-reference/frame-013 基线
- [ ] esbuild bundle `_emu_ref13.ts`
- [ ] node run, dump 4 frame 到 `output/emu-reference/frame-{001,005,009,013}/state.json`

### F2. H5 `_verify_300frame.ts` 加 `state.json` 输出
- [ ] 在 FRAMES_LIST 每个 frame 写入 `state.json` (pc/chrSlots/ram_001B/ram_0628/sceneId)

### F3. emu NT/Palette 字段名统一 `bg/spr`
- [ ] `_emu_ref13.ts` 写盘前 `sp` → `spr`

### F4. boot 时 OAM DMA 立即推 PPU (32 sprite Tecmo logo)
- [ ] 在 `Tsubasa2.boot()` 末尾调 `sprite.bootOamInit()` 后, 把 `store.oam.oam[256]` → `ppu.spriteMem[256]`

### F5. boot 时调色板 flushPalette 提前触发
- [ ] `Tsubasa2.boot()` 末尾调 `interrupts.flushPalette(ppu)`, 写 `$3F00-$3F1F`

### F6. boot 时 CHR slots 立即装载 (frame 0 终态)
- [ ] `HeadlessRuntime` 新增 `bootInitialChrBanks()`, 在 `Tsubasa2.boot()` 末尾跑
- [ ] 用 `SCENE_END_BANK_TABLE[0].banks` (即 `[124,125,126,127,252,113,82,83]`)

### F7. BANK19 sprite 帧流解析
- [ ] 写 `scripts/_parse_bank19_sprite.cjs` (输入: BANK19_TILE_DATA 字节流, 输出: SpriteFrame[])
- [ ] 替换 `sprite-frame-table.ts` 的 BANK19_SPRITE_FRAMES 数组
- [ ] 格式: `{ sprites: [{tile, attr, x, y}, ...] }[]`

### F8. SpriteService 去掉错误 headTileBase 公式
- [ ] 删除 `headTileBase = 0x100 + (hairTemplateId & 0x0f) * 4`
- [ ] 改用 BANK19 SpriteFrame 拼接

### F9. PlayerTileService 用 SpriteFrame 重写
- [ ] 暴露 `getPlayerSpriteFrame(playerId, frameId)`
- [ ] 渲染走 vromTilesByBank1k 直接 blit

### F10. 全链路验证
- [ ] `_verify_300frame` (H5 14 frame dump)
- [ ] `_emu_ref13` (emu 4 frame dump)
- [ ] `_consistency_check` (7 维度对比)

### F11. git commit + push
- [ ] 单 commit 涵盖 F1-F10 全部或分段 commit

---

## BUG 状态摘要

| 编号 | 标题 | 严重性 | 状态 |
|------|------|--------|------|
| #001 | BANK19_TILE_DATA 解析错误 | 🔴 | ⚠️ NOT FIXED → F7 |
| #002 | head sprite 映射公式错误 | 🟠 | ⚠️ NOT FIXED → F8 |
| #003 | body sprite 渲染碎片化 | 🟠 | ⚠️ DEPENDS-ON #001 → F9 |
| #004 | H5 frame 1-13 完全冻结 | 🔴 | ⚠️ NOT FIXED → F4/F5/F6 |
| #005 | SCENE_END_BANK_TABLE 数据错误 | 🟠 | ✅ FIXED |
| #006 | emu-reference 无 frame 1-13 基线 | 🔴 | ⚠️ NOT FIXED → F1 |
| #007 | state.json 缺失 | 🟡 | ⚠️ NOT FIXED → F2 |
| #008 | NT/Pal 字段名不一致 | 🔴 | ⚠️ PARTIAL → F3 |
| #009 | frame 90 NT 时序差 | 🟡 | ⚠️ DEPENDS-ON #004 |
| #010 | headTileBase 公式错误 | 🟡 | ⚠️ DEPENDS-ON #001 → F8 |

---

## 工具链索引

| 脚本 | 作用 |
|------|------|
| `scripts/_verify_300frame.ts` | H5 跑 14 frame dump (PT/NT/OAM/Pal/CHR/state) |
| `debug/_emu_ref13.ts` | emu 跑 4 frame dump (state.json) |
| `scripts/_consistency_check.cjs` | 7 维度对比 PT/NT/OAM/Pal/Screen/CHR-scl/State |
| `scripts/_chr_bank_audit.cjs` | 审计全 emu frame CHR banks 终态 |
| `scripts/_log_analyze.cjs` | 13.log PC 频次/帧指令数分析 |
| `scripts/_cdl_analyze.cjs` | CDL PRG/CHR 访问足迹 |
| `scripts/_verify_evidence.cjs` | 字节抽样对比 |

---

## 验收门

WBS_FRAME13 F10 跑通 = frame 1/5/9/13 在 7 维度上:
- ✅ PT overall ≥ 30%
- ✅ OAM same ≥ 80%
- ✅ Palette 全对齐
- ✅ NT 一致性 ≥ 50% (frame 1-13 早期)
- ✅ CHR slots 100% 对齐 emu
- ✅ Screen ≥ 80%
- ✅ State.json 字段都有

未达 → 走回头补帧/补routine, 留 BUG # 续修.
