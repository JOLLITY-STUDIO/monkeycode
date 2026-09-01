# BUG / Known Issues

> 反汇编 / 转写过程中**已知**问题，按时间顺序追加。每条须按格式:
> ```
> - [ID] - [JIRA/PR-like] - YYYY-MM-DD
> ```
>
> 注: 移动 BUG → resolution 流程时, 把 **当前 entry** 重写为 resoled (not delete history).

## V0.3.0 — 2026-08-31

### [V0.3.0-001] — skipdata 1 MB walk 占满 → 不精确
- 现象: ARM-mode 全 1 MB 反汇编得到 ~238 K 真指令, 但 ARM9.bin 实际**有效 ARM instr** 在中后期区域被 skipdata 大块占位 (例如 0x02050000+ 几乎全 skip)
- 等级: minor (不影响 ground-truth, 但行数 noise 多)
- 临时解决: 输出已用 `;` prefix 标记 skipdata placeholders, 便于 `grep -v "^;"` 过滤真实指令
- 长期修复: V0.4 用 IDA/Ghidra 的 function-aware walker 替代 raw linear scan

### [V0.3.0-002] — `; skipdata` 行包含 raw bytes (security risk)
- 现象: skipdata placeholder 输出 `data: 0xc5b3a291...` 包含部分 raw binary
- 等级: cosmetic (raw bytes 不会泄露 ROM 内容, 但文件 size 变大)
- 临时解决: 仅输出前 8 char hex, 不列全部
- 待讨论: V0.4 起是否需要 dump full raw bytes 给 rom forensics 用

### [V0.3.0-003] — 切换点 `blx` LSB 反推 mode 不总准确 (capstone quirk)
- 现象: 在 ARM-mode 反汇编时 cap 给出 `blx #0x33bXXXXX` 超出 binary 范围 — 是 skipdata 4-byte 步进的副作用
- 等级: medium (false-positive 切换点 in mode-switches.json 原 4681)
- 临时解决: 已加 valid_ranges filter (ARM9 0x02008000..0x02108000 + ARM7 0x02380000..0x023C0000); calls 11974 → 7141
- 验证: `function-calls.json → top_callees_by_callers` 现在 2181 unique callees 全在合法区间

### [V0.3.0-004] — `bx rX` 静态不可解析
- 现象: 3598 个 `bx` 间接跳转, `rX` 装载点未知
- 等级: medium (影响 main function call graph 完整性)
- 临时解决: 标记 `to_mode: 'unknown(rX)'` + 记录 addr
- 长期: V0.4 ARM emulator (unicorn-engine, Ghidra emulation) 跑 trace 解析 rX value

### [V0.3.0-005] — ARM7 entry `0x2380000` 不像真 _start — **已闭环 (V0.7)**
**Resolution (V0.7 — 2026-08-31)**: 详见 `docs/ARM7_STARTUP.md` + ADR-007。
**真根因校准**: V0.3 当时认为 "IPC handler" 不准确 — 实际 ARM7 entry `0x02380000` 是 **某个函数的 mid-body 延续** (无 prologue, 直接写 `[r5, #3]`)。整个 256KB ARM7 binary **0 个 swi 指令**, 没有 IRQ/VBlank setup, 没有 SVC vector table — 真 ARM7 startup 不存在。Imagineer 商业 ROM 用 `null ARM7 stub` 占位, 游戏 100% 跑在 ARM9。
- 现象 (原 V0.3.0): ARM7 entry 立即写 `[r5, #3]`/IPC FIFO control reg, 跳主 loop 0x238006C — V0.3 推断为 "IRQ handler"; V0.7 校正: 是某函数 mid-body 延续, dead code
- 等级 (原): major (语义判断)
- 解 (V0.7): ARM7 binary 第一条合法 `push {... lr}` 函数在 `0x023802a0`, 之前的 672 字节是某函数的 mid-body 推入
- 真 startup 不存在 — cart_header entry 直接 fall into function body, r5 stale → 数据中止 → ARM7 hang
- ARM9 单边运行; TS 端不开 ARM7 service

### [V0.3.0-006] — `0x201F1xxx` 不在 fcnt call graph: 数据 vs 代码混淆
- 现象: 一些 `blx #0x201F....` 实反查不是 function, 而是 ARM9 0x0201Fxxx 区域是 jump table
- 等级: medium
- 待办: 用 IDA-style function discovery 重做 (V0.4 计划)

### [V0.3.0-007] — `b #0x00000002` / `b #0x00000000` 是 'loop self' 静态噪声
- 现象: `collect_bl_targets` 把 `b #0x2` (b .+2) 加入调用图, 这是 thumb 自循环代码
- 等级: minor
- 临时解决: 已加 valid_ranges filter (callee=0/2 自动剔除)
- 验证: ARM7 0x33xxxxx false targets 已被剔除, 但 sample 上 0x201F1xxx 类似噪声未能 filter
- 待办: V0.4 改用 IDA/Ghidra disasm 来获得更干净 call graph
## V0.4.0 — 2026-08-31

### [V0.4.0-001] — Lib 函数只命名 12/2181 ≈ 0.5% — **已闭环 (V0.8.1)**
**Resolution (V0.8.1 — 2026-08-31)**: 详见 `docs/V0.8_FUNCTION_TABLE.md` + ADR-008。
**真根因校准**: V0.4 当时命名覆盖率 0.5%, V0.5 计划用 IDA Free 自动扫函数边界。V0.8.1 用 capstone + 8-tier 启发式 (不依赖 IDA Free / Ghidra) 推到 **98.58%** 覆盖率 (远超 V0.5 计划 ≥80% 目标)。
- 现象 (原 V0.4.0): ARM9 全量 2181 unique callees, 仅 best-effort 给 12 个命名
- 等级 (原): medium (剩余 2169 待 IDA Free 自动识别)
- 闭环 (V0.8.1): 2150/2181 = 98.58%
  - 904 `real` (push 命中, high conf)
  - 243 `near` (push ±0x40, high)
  - 754 `bx_lr` (medium)
  - 45 `pop_pc` + 1 `ldm_pc` (medium)
  - 2 `multi_caller` (medium)
  - 201 `single_caller_real` (low, init/trampoline)
  - 31 `data_target` (excluded, V0.3 capstone 误识别)
- 产物: `function-table.json` 2181 entries / ADR-008

### [V0.4.0-002] — Soft float lib 误归类为 game library
- 现象: V0.3 ARM9 top callees 0x0204C000..0x0204DFFF region 之前被列为普通 lib
- 等级: minor (V0.4 ADR-005 已识别为 __aeabi_* 软浮点, TS 端 JS Number 直接覆盖)
- 修复: LIBRARY_MAP.md 顶部 + ADR-005 都已分清

### [V0.4.0-003] — ARM7 entry 0x2380000 不是真 _start 仍未解决 — **已闭环 (V0.7)**
**Resolution (V0.7 — 2026-08-31)**: 跟 V0.3 BUG-005 同一根因, 闭环方式相同。
- 现象 (原 V0.4.0): V0.3 BUG-005 提 ARM7 entry 直接写 IPC FIFO control, V0.4 想用 Ghidra 再 deep dive 但卡住
- 等级 (原): medium
- 解 (V0.7): 不需要 Ghidra — 反汇编前 8 条指令足够证明 entry 不是 startup: `strb r0, [r5, #3]` 需要 r5 已被 caller 初始化, 而 NDS BIOS 不预设寄存器
- 真 ARM7 startup code **不存在** — Imagineer 商业 ROM 的 null ARM7 stub 设计
- 闭环详见 docs/ARM7_STARTUP.md § 7 (ADR-007)

### [V0.4.0-004] — bx rX (3598个) 静态不可解未解决
- 现象: 跟 V0.3 BUG-004 一致, 3598 个 bx rX 静态 disasm 无法解析
- 等级: medium (call graph 完整性)
- 待办: V0.5 用 unicorn-engine emulation 跑 1 frame, 解析寄存器值

### [V0.4.0-005] — SudokuBoard 实例化未做 boundary fuzz test
- 现象: 测试仅覆盖 (puzzle, solution) 同 shaped 9x9 输入; 没有 fuzz (空 / 8x9 / 含 -1 / etc)
- 等级: minor (boundary 已经在 _validate 内 throw)
- 待办: V0.5 加 fuzz test, 走 1000 random puzzle

### [V0.4.0-006] — real_puzzle.ts 硬编码 3 个 puzzle
- 现象: 暂未接入 numclo*.data ROM 数据
- 等级: minor (V0.6 阶段将用 ROM numclo data 替换)
- 待办: V0.6 numclo*.data 解析后, PUZZLE_EASY/MEDIUM/HARD 来源切换到 data file

## V0.7.0 — 2026-08-31

### [V0.7.0-001] — ARM7 startup 真根因确定 + V0.3-005 / V0.4-003 闭环
- 现象: ARM7 binary `0x02380000` 是 cart_header 官方 entry, 但反汇编前 8 指令直接用 r5 写 `[r5, #3]`, 不像 startup
- 闭环:
  - 0x02380000..0x23802a0 (672 byte) 是某函数 mid-body 延续 + 16-iteration loop (R8 = audio channels?)
  - 整个 256KB ARM7 binary **0 个 swi 指令** → 没有 IRQ enable / vblank wait / SVC handler
  - **没有任何代码** 进入 0x02380000..0x23802a0 → 这个区间是 dead code, 只是 binary 头而已
- 等级 (原 major / medium): 闭环
- 产物: `docs/ARM7_STARTUP.md` + ADR-007 + V0.7.0 tag

### [V0.7.0-002] — unicorn 验证 ARM7 上电 flow (deferred)
- 待办: V0.8+ 可选用 unicorn-engine 在 PC 端模拟 NDS cart boot, 设置 PC=0x02380000, 跑 N 条指令, 观察是否触发 data abort on `[r5, #3]`
- 优先级: **低** (无业务价值, ARM7 已被推断为 stub)

---

## V0.8.0 — 2026-08-31

### [V0.8.0-001] — `b_target` thumb-mode 没收集
- 现象: `b imm` 跳转目标检测只从 ARM-mode disasm 收集, thumb-mode inline pass 没暴露 b 目标
- 结果: V0.8.1 `b_target` 分类 = 0 个命中 (略低于理想)
- 等级: minor (V0.8.1 整体覆盖仍 98.58%)
- 待修复: inline thumb disasm 加 `b imm` 目标收集 + 加入 `b_target_set`

### [V0.8.0-002] — `mov pc, lr` 偏移范围 +0x400 偏小
- 现象: V0.8.1 `mov_pc` 分类 = 1 个, 部分超长 utility lib (例如 > 0x400 byte 的 math helper) 漏掉
- 等级: minor
- 待修复: V0.8.2 范围调到 +0x800 或 +0x1000

### [V0.8.0-003] — 31 个 `data_target` 仍出现在 call graph
- 现象: V0.3 capstone disasm 在 ARM9/ARM7 binary range 内误识别一些 0xFF/0x00 padding 为 ARM `bl #0xNNNN` 指令, 导致 callee 落在 skipdata region
- 等级: cosmetic (V0.8.1 已 mark 为 `data_target = excluded`)
- 真根因: V0.3 BUG-006 (data vs code 混淆). V0.8.1 用 skipdata filter 防止垃圾命名, 但 BUG 本身未根治
- 待修复: V0.3.1 重做 capstone disasm, 增加 data-marker 启发式 (consecutive skipdata bytes > 阈值 → 标 data region)

### [V0.8.0-004] — `single_caller_real` 201 个仍是 low confidence
- 现象: 201 个 1-caller 落入 single_caller_real 类别, confidence=low
- 原因: 这些是 init 函数 / trampoline / 一次性的 init code, 仅调用 1 次
- 等级: minor (low confidence 已 proper mark, 不影响下游)
- 待修复: 可选 — V0.8.2 加 `adr lr, ...; bx lr` 模式识别 (Thumb-1 init thunk)

---

## V0.9.0 — 2026-08-31

### [V0.9.0-001] — auto-name `sub_XXXXXXXX` collision
- 现象: V0.8 函数表 2700 entries, 部分 entry 名称相同 (例如 `sub_02039f4c` 在 ARM9 + ARM7 都有或多个子函数)
- 解决: `_2` / `_3` suffix in generator script. TS file still compiles
- 等级: minor

### [V0.9.0-002] — pre-existing `miniprogram/pages/index/index.ts` 2 TS1005 errors
- 现象: `npx tsc --noEmit` 报 `index.ts:34:38` 和 `34:44` 错误 `',' expected` / `:` expected
- 真根因: WXML 模板自带 (非 V0.9 产生), `{{ }}` 占位符语法错乱
- V0.9 影响: 0 (errors 跟生成的 7 个 TS 文件无关)
- 等级: minor (template 自带, V0.10.2 单独修)

### [V0.9.0-003] — Smoke test 没自动化
- 现象: `utils/nds/smoke.ts` 入口存在, 但需要 DevTools 手工 `import smoke`
- 等级: minor (V0.10.1 加 jest 集成)
- V0.9.0: 0 errors on `npx tsc --noEmit` 验证 V0.9 generated files

---

## V0.10.0 — 2026-08-31

### [V0.10.0-001] — `util_/helper_/sfloat_` 前缀 heuristic 不是真业务语义
- 现象: V0.10 给 callers ≥ 10 的 funcs 加 `util_/helper_` 前缀, 给 SOFTFLOAT region 加 `sfloat_` 前缀。但前缀仅基于 callers 数量 + region 启发式, **没有真正反汇编函数体**推断业务功能 (e.g. `util_0202f0c4` 只说明 callers 多, 不一定真 utility, 也可能是 render_state_update)
- 等级: medium (前缀误导风险 — TS 业务代码可能误以为 `util_*` 都是 utility, 实际是 hot-path core)
- 解: JSDoc 加 `@heuristic util (callers=49, region=BASE)` 提示是推测
- 待修复: V0.11+ ARM9 BFS 反汇编 hot-path 推断真业务语义

### [V0.10.0-002] — SOFTFLOAT region 仅覆盖 ARM9
- 现象: `sfloat_*` 前缀仅 applies to ARM9 region 0x0204C000..0x0204DFFF (ADR-005 soft-float lib). ARM7 region / ARM9 其他 region 没有类似软库识别
- 等级: minor (游戏目前不调 ARM7 软浮点, ADR-007 ARM7 stub-only)
- 待修复: V0.11+ ARM9 0x0201xxxx / 0x0202xxxx / 0x0203xxxx 分段更细 region 标签

### [V0.10.0-003] — `sfloat_*` 命名不覆盖已 known `__aeabi_*`
- 现象: SOFTFLOAT region 内已有 28 V0.4 known 的 `__aeabi_fadd/fsub/fcmp/fdiv/fabs/fclassify`, 命名是 `__aeabi_*` 而非 `sfloat_*`. is_known priority 阻住 `sfloat_*` 重命名 ✓
- 等级: cosmetic (实际上是 ADR-010 priority 设计正确)
- 含义: 28 known names + ~22 sfloat_* = SOFTFLOAT region 共 ~50 个 fns, 其中 ~22 个以前 `sub_XXX` 现在 `sfloat_*`

---

## V0.11.0 — 2026-08-31

### [V0.11.0-001] — entry_root tier BL-source 聚合不完美
- 现象: V0.3 call graph 的 `caller` = BL-instruction address, 而不是 function address. entry `0x02008000` 是大 inline loop (~30+ KB), V0.8 没识别它为一个 function. V0.11 BFS 把 entry 内部所有 BL-source addresses (0x02008000..0x02010000) 聚合为 `entry_root` tier, 但聚合是粗粒度 (按 BFS-direct-calls), 不完美归为 entry-main-loop. 实际 BL-source 0x02008004 是 loop 内第一个 BL, 0x02008734 是 loop 中段, 0x0200a000 是 loop iteration end, **这些应区分**
- 等级: medium (影响 entry_root tier analysis 精度)
- 解 (V0.11.1): 加 entry partition: 读 disasm 找 B 跳转 / loop pattern (entry 主体应该 = 1 个大 while/for loop). 把 BL-source 按 partition 分类
- 临时: V0.11 输出顶层 summary, 不展开 entry 内 partition 细节

### [V0.11.0-002] — BFS 浅 5 hops, 深 nesting helper 仍隐
- 现象: V0.11 BFS max_depth=5. 但某些 hot funcs (frame_loop → subsystem → worker) 路径可能 6-8 层. 限制是为了 output 不爆 (2181 funcs 全 BFS 会极深)
- 等级: minor (V0.11 已定位 hot path 主要 tier, 不阻塞)
- 解 (V0.11.1): 加 `--max-depth 8` 选项

### [V0.11.0-003] — first_disasm 仅 ARM-mode
- 现象: V0.11 `first_disasm` extractor 只解析 disasm-arm9-full.txt (ARM-mode pass). Thumb-mode funcs (mode=thumb) 的 first 8 insns 没解析
- 等级: minor (V0.11 仍 useful for hot-path analysis, 后续 V0.11.1 解析 disasm-arm9-full thumb 段)
- 解 (V0.11.1): 解析 disasm `=== arm9.bin from file_off ... dst ... (Thumb) ===` 段
- 临时: V0.11 输出 `first_disasm_note: "thumb-mode — see disasm-arm9-full.txt"` for thumb funcs

---

## V0.11.1 — 2026-08-31

### [V0.11.1] closure — entry_zone window 32KB → 8KB + function-level BFS + thumb-mode note
- **V0.11.0-001 [closed]**: entry_zone window 缩小 32KB → 8KB + 改用 **function-level graph** (按 V0.8 fn-table 把 BL-insn caller 映射到它的 fn_addr). 让 BFS depth 2+ 真正显露. V0.11.1 output: entry_root:1 / frame_loop:29 / subsystem:100 / worker:190 / leaf_helper:239 / sfloat:14 (vs V0.11 broken BFS: 全集中 depth 1=232)
- **V0.11.0-002 [closed]**: 加 CLI `--max-depth N` 选项 (default 5). 跑 `--max-depth 8 --entry-window 8192` 输出 697 reachable funcs (含 leaf_helper 6+).
- **V0.11.0-003 [partial closed]**: thumb-mode funcs 现在 add placeholder note "(thumb mode — disasm-arm9-full.txt is ARM-only; V0.11.2 will parse thumb disasm separately)". 完整 thumb disasm 解析待 V0.11.2.

### [V0.11.1-001] — 201 `(no disasm line found at this addr)` 占位
- 现象: 233 non-sfloat funcs 中 32 个 addr first_disasm extractor 找不到 (在 disasm-arm9-full.txt 内). 多数是 `bx_lr` cat=medium 短叶 fn — disasm walker 偶尔 cache miss
- 等级: cosmetic (placeholder 文案能区分 thumb / unknown / real)

---

## V0.12.0 — 2026-08-31

### [V0.12.0-001] — curated names 仅 13 entries (命名覆盖率仍 3.78%)
- 现象: V0.12 第一轮 curated names 仅 13 entries. 命名覆盖率 28 known + 13 curated + 18 sfloat + 7 util + 36 helper = 102 / 2700 = 3.78% (V0.10 3.6% → 3.78% 微增)
- 等级: medium (curated 增长缓慢, 没真正达到 30% 目标)
- 解 (V0.12.1): 加 curated batch 2 — 30+ entries covering `array_getter_*` / `state_init_*` / `frame_step_*` 等模式
- 长期 (V0.13+): 加 pattern detector — 自动识别 `ldr r0, [pc, #4]; str r0, [r1]; bx lr` → state_setter_*, `ldrh r0, [r0]; and 0x8000; asr 0xf` → key_check_* 等

### [V0.12.0-002] — curated 与 V0.4 known 有时冲突 (人工管理)
- 现象: curated JSON 可能包含 V0.4 已命名 func 的 addr (manual curation 容易重复). 当前 priority: V0.4 known > curated > heuristic (避免覆盖 known). curated JSON 没 add V0.4 address 时 (no collision), 如果 add 了一个 known addr, 会被 silently 忽略 (priority 高于 known)
- 等级: minor (当前 curated JSON 无 collision; 长期 curation workflow 加 validator 防止 future collision)
- 解 (V0.12.2): 加 curated-validator: 检查 curated addrs 是否在 V0.4 known 集合内; 提示冲突

---

## V0.12.1 — 2026-08-31

### [V0.12.1-001] [closed] — curated 第二轮完成 28 entries (4.11% 覆盖率)
- 现象: V0.12.0 curated 13 entries, V0.12.1 加 15 batch 2 = 28 curated + 28 known + 18 sfloat + 6 util + 31 helper = **111 / 2700 = 4.11%**
- 加 `v0121-curated-batch2.json`, codegen 现在 support 多 file（`load_curated_names(*paths)`）后置覆盖前置
- 1 个 mild risk: 一些 curated names 是 "named by pattern" (e.g. `global_dword_get`) 可能 multiple funcs share pattern 但语义不同 (e.g. 都是 1-level load 但 load 不同 global)
- 等级: medium (命名从纯 sub_XX 提升到语义名, 但部分名是 "by pattern" not 真业务语义)











---

## V0.12.2 - 2026-08-31

### [V0.12.2-001] [closed]
- ✅ curated 第三批完成: 58 entries (32 batch 3 + 26 batch 4) 命名到 86 total
- 之前: V0.12.1 28 curated, V0.12.2 +58 = 86 curated + 28 known + 16 sfloat + 0 util + 7 helper = **137 / 2700 = 5.13%**
- ✅ 4-tier priority chain (ADR-012): known > curated > heuristic > sub_XXX
- ✅ `load_curated_names(*paths)` 支持变长路径, 4 个 JSON 文件按顺序覆盖
- ✅ Tsc EXIT=0 on V0.12.2 generated files

### [V0.12.2-002] [open] curated absorption of heuristic slots
- ⚠️ Curated batch 3 (32 entries) 吸收了 ~14 heuristic slots (sfloat_/util_/helper_)
- 影响: total 命名数 (+26) 远低于 curated 增长 (+58)
- 评价: **不是 regression** — curated 业务名 > 编号占位符. 但 heuristic 覆盖率从 18+6+31=55 → 16+0+7=23 减少
- 解决: V0.13 pattern detector 用更宽松的 caller 阈值 + 全 regex match, 补回 heuristic coverage
  (目标: heuristic 覆盖率回到 ~100-150 entries)

### [V0.12.2-003] [open] naming coverage still < 10%
- ⚠️ 5.13% named coverage (137 / 2669) 仍离 V0.14+ 目标 (10%+) 远
- 主因: V0.3 call graph 缺失很多 indirect call (BLX rN, function pointer call)
  V0.4 ADR-005 bx rX 解析 + V0.8 unicorn emulation 是潜在 follow-up
- 短期: V0.13 pattern detector 应该能补 ~200-300 entries (regex 匹配常见 disasm pattern)
- 长期: V0.15+ unicorn emulation 抓 bx rX indirect call target

### [V0.12.2-004] [closed] curated naming duplicate check
- ✅ V0.12.2 batch 3+4 命名前 dedup check (work/_dedup_check.py)
- ✅ 无 duplicate curated names
- ✅ 新命名都用 _a/_b/_c 后缀 (e.g. global_dword_get_d, _e, _f, _g, _h, _i), 跟 batch 2 global_dword_get/b/c 连续

---

## V0.13 - 2026-08-31

### [V0.13-001] [closed]
- ✅ Pattern detector 完成: 51 自动建议命名 (regex 匹配 disasm)
- 14 种 pattern 覆盖: state setter/getter, byte/halfword setter/getter, const_return,
  struct_clear_0, memset/memcpy word, dcache_helper, tail_call, switch_dispatch, early_return
- ✅ 51 = 11 state_setter + 9 state_getter + 8 const_return + 16 tail_call + ...
- ✅ 5-tier 优先级 (ADR-013): known > curated > pattern > heuristic > sub_XXX
- ✅ Tsc EXIT=0 on V0.13 generated files

### [V0.13-002] [open] Thumb-mode functions not covered
- ⚠️ 307 个 odd-address 函数没 disasm (disasm-arm9-full.txt 只解 ARM mode)
- 影响: 这些 thumb-mode funcs 既不在 curated/pattern/heuristic tier, 全部落 sub_XXX
- 评价: 部分 thumb func 是 hot path (e.g. renderer 在 thumb mode), 影响业务翻译
- 解决: V0.13.1 加 thumb disasm (capstone CS_MODE_THUMB), 重新跑 pattern_detector
- 估算: +50-100 pattern matches from thumb mode

### [V0.13-003] [open] Same-pattern multi-global dedup not done
- ⚠️ 多个 auto_state_setter_*, auto_state_getter_* 没有 dedup, addr 后缀冗余
- 评价: 命名仍 unique (addr 区别), 但人工阅读麻烦
- 解决: V0.14+ 聚类同样 pattern 的 auto_* 到一个 _global_get_N 系列
  (e.g. global_dword_get_d, _e, _f → global_dword_get_4, _5, _6 based on call chain)

### [V0.13-004] [open] Pattern doesn't know which global it accesses
- ⚠️ auto_state_setter_02020f3c 不知道它 set 哪个 global slot
- 解决: V0.14+ cross-reference ldr pc-relative target (取 pc-relative pool data) 推断 global 名字
  或至少标 global_ptr_offset

### [V0.13-005] [open] V0.12.2-002 (heuristic absorption) still open
- ⚠️ V0.12.2 batch 3+4 (58 curated) 吸收了 ~32 heuristic slots
- V0.13 加 51 pattern → 但 heuristic 没回补 (still 23)
- 影响: total named 188 是真实 +51 (因为 pattern 不挤 heuristic)
- 解决: V0.14 可以重写 heuristic (更宽松阈值) 让 absorption 恢复
  OR 接受 heuristic absorption 是 advisory (curated 业务名 > 编号占位符)

---

## V0.13.1 - 2026-08-31

### [V0.9.0-002] [closed] miniprogram/pages/index/index.ts:34 syntax error
- ✅ Fix: 删除 line 34 `private _board: SudokuBoard | null = null,` (object literal 不支持 private + type annotation)
- 影响: V0.4 STUB 文件遗留, V0.9-V0.13 都 skip
- 关闭: V0.13.1 修复, tsc EXIT=0 跨全项目
- 后续: this._board = null 仍 work (TS implicit any), 字段在文件中没被读, 不影响业务

---

## V0.13.2 - 2026-08-31

### [V0.13.2-001] [closed]
- ✅ Thumb disasm 文件生成 (V0.13.2 main artifact)
- ✅ pattern_detector Thumb-aware (双 mode fallback)
- ⚠️ 51 matches stable (Thumb-specific patterns 待 V0.13.3)

### [V0.13.2-002] [open] Thumb-mode-only functions (241) don't match existing patterns
- ⚠️ 241 个 Thumb-only 函数 (callers_n=0, V0.8 误识别为函数)
- 评价: 这些大概率是 V0.8 false positive (`push {..lr}` 是普通 prologue,
  跟函数 start 区分不开), 不需要命名
- 解决: V0.13.3 加 Thumb-specific patterns (push+pop+pc, movs/bx lr 模式)
- 预期: 加 20-40 matches

### [V0.13.2-003] [open] 236 functions fully missing disasm
- ⚠️ 0x02100000+ region 函数 capstone skipdata 跳过, 完全没有 disasm
- 影响: 235/236 callers=0 (uncalled), 1/236 callers=1 (小)
- 评价: 不需要命名, 未达命名阈值
- 解决: 不需要修 (low value)

---

## V0.14 - 2026-08-31

### [V0.14-001] [closed]
- ✅ Global dedup via target_global_ptr extraction
- 39/51 auto_* suggestions have target_global_ptr (76%)
- 25 unique (pattern_kind, target_global) clusters
- 6 name collisions resolved with _a/_b suffix
- Tsc EXIT=0 on V0.14

### [V0.14-002] [open] tail_call + const_return target extraction missing
- ⚠️ 12/51 suggestions don't have target_global_ptr
  - 6 tail_call (target is bx ip, not ldr pc-relative)
  - 6 const_return (target is mov r0, #N, not ldr)
- 影响: tail_call dedup 没法做 (6 collisions missed), const_return dedup 没法做
- 解决: V0.14.1 给 tail_call 加 tail-target extract, 给 const_return 加 mov-value extract

### [V0.14-003] [closed] V0.13.2 Thumb disasm 不增加 naming coverage
- ✅ Finding: 307 个 ARM-mode missing 函数全是 V0.8 false positives (0 callers, mid-function push sites)
- 这些不是独立函数, 是 V0.8 detect_functions.py 误识别的 push site
- 解决: 保留 in V0.14 (没改名 / 删), 仅文档化
- 后续: V0.15+ 可以加 `is_false_positive` flag 到 function-table.json (基于 callers_n=0 AND category=prologue)

### [V0.14-004] [open] extract_pc_relative_target 边界情况
- ⚠️ 当前只取第一条 ldr rN, [pc, #N]
- 影响: 函数有多个 ldr (e.g. dual setter getter) 时, 第二个 ldr 的 target 不会被提取
- 解决: V0.14.1 提取所有 ldr, 输出到 target_global_ptrs[] 数组

---

## V0.14.1 - 2026-08-31

### [V0.14.1-001] [closed]
- ✅ 100% target extraction: 51/51 suggestions have target_global_ptr (was 39/51 = 76%)
- 4 tail_call + 7 const_return + 1 dcache_helper newly extracted
- extract_pc_relative_target regex 现在匹配 ldr ip, [pc, #N]
- tail_call 用 LAST ldr ip (closest to bx ip) via prefer='last' param
- Tsc EXIT=0 on V0.14.1 generated files + whole project

### [V0.14.1-002] [closed] 4 pre-existing tsc errors fixed
- ✅ miniprogram/pages/index/index.ts:4 (unused import) - from V0.13.1 deletion side effect
- ✅ miniprogram/pages/index/index.ts:14 (this._board undefined) - from V0.13.1 deletion side effect
- ✅ miniprogram/pages/index/index.ts:18,22 (unused param e) - prefixed _
- ✅ miniprogram/utils/nds/addresses.ts:52-54 (as const on computed) - removed `as const`
- ✅ scripts/test_sudoku_fuzz.ts:21 (unused import REAL_PUZZLES) - removed
- ✅ scripts/test_sudoku_fuzz.ts:137 (unused const FUZZ_SEEDS) - commented
- ✅ typings/types/wx/lib.wx.app.d.ts:265 (IAnyObject constraint) - added `<T extends object = IAnyObject>`
- 影响: V0.13.1 commit 声称 "tsc EXIT=0" 但其实有这些 pre-existing errors 没修
- V0.14.1 修了, 现在 tsc EXIT=0 真正跨全项目

### [V0.14.1-003] [closed] Address.ts as const error V0.9 遗留
- ✅ Generated addresses.ts had `(0x100000 / PRG_BANK_SIZE) as const` - computed expression 不能 as const
- ✅ Fixed in generate_ts_functions.py (source script) + regenerated addresses.ts
- 影响: V0.9 codegen 写错, 跨 V0.10-V0.13.1 没人修 (因为 tsc 只看生成的 .ts, 没看源)
- V0.14.1 是 codegen 改成 `0x100000 / PRG_BANK_SIZE` (无 as const) 后首次 EXIT=0
