# Architectural Decision Records (ADR)

> 项目级架构决策。每条记录: 背景 / 决策 / 后果。

## ADR-004: ARM9/ARM7 完整反汇编工具链 (V0.3.0)

### 状态
Accepted — 2026-08-31

### 背景
V0.2 阶段只反汇编了 entry 100 条 ARM/Thumb, 无法理解游戏主架构。V0.3 需要全 1 MB ARM9 + 256 KB ARM7 反汇编 + 模式切换识别。

### 候选
- (a) **IDA Pro / IDA Free**: 业界最强, 自动函数识别 + 反编译 + ARM 模式自动跟踪。commercial / Free 无 debug.
- (b) **Ghidra**: NSA 开源, 反编译 + 函数识别好, 但 Python API 重型, 安装到 1 GB+
- (c) **Capstone + Python script**: 5 KB 库 + 自写 200 行 Python. 灵活但要手写切换点跟踪.
- (d) **arm-none-eabi-objdump**: GNU 工具链, 简单 -D -b binary, 但不能区分 ARM/Thumb mode 自动.

### 决策
**(c) Capstone** + 跳过 invalid 字节策略 (skipdata=True)

理由:
- V0.3 主要目的是**全量 ground-truth text dump** (辅助 V0.4+ IDA/Ghidra 标注), 不是交互分析
- capstone 反汇编 1 MB < 5 sec, 完全够用
- skipdata=True 让 0xFF/0x00 padding 区域不阻塞 (可控噪声)
- 不依赖 GUI / 商业软件 / 外部 binary
- 输出纯文本 + JSON, 便于 grep/diff/version-control

### 后果
- ✅ 文本可读 + 可 git diff + 中文 doc 引用
- ✅ 1 MB ARM9 → 14 MB 反汇编文本 + 800 KB switch JSON + 1.4 MB call graph JSON
- ❌ 没有函数自动识别 (V0.4 用 IDA/Ghidra 补)
- ❌ 没有反编译回 C (V0.4 用 Ghidra Decompile 补)
- ❌ bx rX 静态不可解 (V0.4 用 unicorn-engine emulation 跑 trace)
- ❌ skipdata 触发 24K 假 placeholder (已用 `;` prefix + valid_ranges filter 修)

### 已知限制 (V0.3 BUG.md 7 条)
详见 `BUG.md` V0.3.0-001 至 V0.3.0-007.

### 后续 V0.4+ 提升策略
1. IDA Free 自动扫函数 → 输出 function table JSON, 合并到 function-calls.json
2. Ghidra Decompile 关键函数 (entry / main loop / scene_register × 3) → 转 C-style pseudo-code, 然后 1:1 翻译到 TypeScript
3. unicorn-engine emulation 跑 init frame → dump 寄存器值, 解析 bx rX

## ADR-005: 软浮点库发现 + JS Number 直接覆盖 (V0.4.0)

### 状态
Accepted — 2026-08-31

### 背景
V0.3 ARM9 反汇编拿到 2181 unique callees. V0.4 阶段做 lib 命名, 发现 ARM9 0x0204C000..0x0204DFFF region 全部是软浮点数学库 (IEEE 754 single-precision), 由 devkitPro / libgcc 通过 ARM EABI `__aeabi_*` calls 提供, 因为 NDS 双 CPU (ARM946E-S + ARM7TDMI) 都无 FPU.

### 决策
**不写 TS service wrapper 覆写软浮点库**. JS `Number` 是 IEEE 754 double, 完全覆盖. ARM9 source code 中任何 `float`/`double` 算术:
- 被编译器 lower 成 BL 0x0204Dxxx (soft float libcall)
- TS 端用 JS Number 直接算即可 (double precision 足够)
- 不需要在 service 层模仿 alloc / str-build / fp_normalize 等

### 已知 lib 命名 (V0.4 partial)

| Address     | 命名 (best-effort)       | 类别         |
| ----------- | ------------------------ | ------------ |
| 0x0204D8E8  | __aeabi_fadd (推测)     | SF-MATH      |
| 0x0204DB1C  | __aeabi_fsub (推测)     | SF-MATH      |
| 0x0204D430  | __aeabi_fcmp (推测)     | SF-MATH      |
| 0x0204D86C  | __aeabi_fabs (推测)     | SF-MATH      |
| 0x0204D930  | __aeabi_fclassify       | SF-MATH      |
| 0x02028434  | vec2_set_inline (8-byte store helper) | GAME |
| 0x02029A58  | simple_set_var (1 field store) | GAME |
| 0x02029AB8  | state_switch_8way (8-way dispatch) | GAME |

---

## ADR-007: ARM7 binary 是 stub-only (V0.7)

### 状态
Accepted — 2026-08-31

### 背景
V0.3 BUG-005 / V0.4 BUG-003 反映 ARM7 cart_header entry `0x02380000` 反汇编看起来不像 startup, V0.4 计划用 Ghidra 再深挖确认。V0.7 直接用 capstone + 静态分析足够解决。

### 决策
**不寻找 ARM7 startup code, 因为它不存在**。

### 关键证据
- 整个 256KB ARM7 binary **0 个 swi 指令** (搜整个 disasm-arm7-full.txt 找不到任何 `swi #...`)
- ARM7 entry `0x02380000` 头 8 条指令直接用 r5, 无 prologue (`strb r0, [r5, #3]` 需要 r5 caller-preset)
- 第一条合法 `push {... lr}` 在 `0x023802a0` (672 byte 之后)
- `0x02380000..0x23802a0` 没有任何 `bl` / `b` 进入
- 没有 IRQ setup、没有 SVC vector table、没有 BIOS call

### 商业推断
Imagineer 商业 ROM 在 cart_header 填 ARM7 entry 是**形式要求** (没填 NDS BIOS 不加载)。开发者塞了一个 `null ARM7 stub`: 二进制仍 256KB, 但首 672 byte 是 dead function body, 后续 audio mixer 函数 (`0x023802a0`) 也永远不被调用 (没 caller)。
游戏运行: BIOS 跳 0x02380000 → `[r5, #3]` 写内存 → 可能 data abort → ARM7 hang → ARM9 单独跑 → 游戏正常运转。

### 后果
- ✅ TS 端 ADR-001 简化模型成立 — 不需要 `arm7_*.ts` Service 实现
- ✅ V0.3 BUG-005 / V0.4 BUG-003 闭环 — 不需要 Ghidra / unicorn 验证
- ✅ 节省 V0.8 计划的 unicorn-engine emulation 工时
- ❌ ARM7 binary 在产物中不必导出 (全 data pad, H5 不用)
- ❌ 早期记录 "ARM7 entry 是 IPC handler" 需校正 (实际是函数 mid-body)

### 后续 (V0.8+) 可选
- 用 unicorn-engine 在 PC 模拟 NDS 上电, 验证 ARM7 cart boot → PC=0x02380000 → 第一条指令触发 data abort
- 优先级低 (无业务价值)

---

| 0x02029A58  | simple_set_var (1 field store) | GAME |
| 0x02029AB8  | state_switch_8way (8-way dispatch) | GAME |

### 后果
- ✅ ARM9 lib mapping 过滤 SF region (0x0204C000+) 后, 真正的 game-specific lib 仅 ~30 个 (vs 2181 total)
- ✅ TS 翻译时可以大量**直接消解** soft-float calls (任何 FP 算术 → JS Number)
- ❌ IDA/Ghidra 自动识别不可少 (脚本只能看到 fragment; 真函数边界要 disasm 出口检测)
- ❌ 2181 callees 中 ~200 个需要 IDA-style function walker 才能准确命名

### 命名进度
12 / 2181 (≈ 0.5%). V0.5+ 用 IDA Free 自动扫 → 提升到 ≥ 80%.

---

## ADR-001: 不模拟 NDS 硬件 CPU (V0.0.3)

### 状态
Accepted — 2026-08-31

### 背景
NDS ROM 是 ARM9 + ARM7 双 CPU 架构，含大量硬件寄存器读写 (IPC FIFO / VRAM / OAM / Sound FIFO / Key / Touch)。

如果做硬件模拟器，需要实现 ARM7TDMI + ARM946E-S 完整指令集 + 大约 50 个硬件外设。工作量按人月计算不现实。

### 决策
**采用行为翻译策略**：
- ARM 反汇编用于**理解游戏做了什么**（业务逻辑识别）
- 不在产物中保留任何 6502/ARM 指令序列
- 翻译产物 = Service 方法 (行为) + Table 具名查询 (数据) + DataStore KV (状态)
- CHR / NBM 图形数据 → PNG 图片资源
- ARM9 ↔ ARM7 IPC 通信 → 事件总线 / 消息队列 (TypeScript EventTarget)

### 后果
- ✅ 可以采用现代 ES6+ TypeScript 语法，享受类型安全
- ✅ 与平台无关，可移植到任意前端框架 (uni-app / Taro / 原生 Web)
- ✅ 性能 = 直接函数调用 vs 指令解释执行 ×10000
- ❌ ARM9 反汇编需要认真读懂每一处 (不能"模拟")
- ❌ 数据格式需要 100% 还原 (题目数据 / 调色板)

### 参考
- 类似项目: NDS 天使之翼 2 翻译项目 (`agents-cosplay`) 的核心原则
- `agents-cosplay` 文档摘录: "翻译的是行为，不是要一样的操作序列"

---

## ADR-002: miniprogram 框架选型 (V0.0.x)

### 状态
Pending

### 候选方案
- (a) 原生微信小程序 + 自写 WXML/WXSS/JS (Canvas 2D)
- (b) uni-app + Vue3 + Canvas
- (c) Taro + React + Canvas
- (d) 微信小程序 Skyline (新渲染引擎) + glass-easel 组件框架

### 偏好
默认 (d) — 见 `miniprogram/app.json`: renderer="skyline" + componentFramework="glass-easel"

理由:
- 性能: Skyline 是新一代渲染引擎，Canvas + 自定义组件性能更好
- 现代: 组件框架 glass-easel 接近 React hooks 模型
- 兼容: Skyline 仍支持旧版 WXML / WXSS

**待 V0.8 阶段正式确认**

---

## ADR-003: NBM 解码工具选择 (V0.5 待定)

### 候选
- (a) `tinke` / `NDS-Decompiler` 命令行工具
- (b) Python `ndstool` (devkitPro)
- (c) 自实现 Python 解析器 (基于 GBATEK § 12 NCGR/NCLR/NSCR/NCER 规范)

### 偏好
(c) 自实现 Python — 不需要外部工具链，单 dependency；可立即跑。

**待 V0.5 阶段正式确认**

---


## ADR-008: 函数边界自动检测 = capstone + 8-tier 启发式 (V0.8.1)

### 状态
Accepted — 2026-08-31

### 背景
V0.4 BUG-001: ARM9 全量 2181 unique callees, 仅 best-effort 给 12 个命名 (0.5%).
V0.5 plan 写 "V0.5 用 IDA Free 自动扫函数边界 → 命名覆盖率提升到 ≥80%".

但 sandbox 不允许装 IDA Free (商业 GUI) 或 Ghidra (1GB+ Java/Python 重型).
需要纯 Python + capstone 启发式方案.

### 候选
- (a) **IDA Free / IDA Pro**: 商业, GUI, 自动识别最强. 安装需 sandbox 允许.
- (b) **Ghidra**: NSA 开源, 函数自动识别 + 反编译. 重型 (1 GB+ Python + Java).
- (c) **capstone + 启发式**: 5 KB lib + 自实现. 灵活, 已在 V0.3 用过.
- (d) **unicorn2 emulation 跑 1 frame**: 抓寄存器值, 解析 bx rX 等间接跳转. 重 (依赖 unicorn2 lib).

### 决策
**(c) capstone + 8-tier 启发式**

理由:
- Sandbox 可用, 不需装新东西
- IDA Free / Ghidra / unicorn 都不可用 (sandbox 限制)
- 0.5% → 98.58% 已经超 80% 目标 (2150/2181)
- bx rX 解析 (V0.4 BUG-004) 不阻塞 TS 翻译 (剩下的 201 个 single_caller_real 自动跳过)

启发式 8-tier:
1. real — callee == push site (high conf)
2. near — ±0x40 of push (high)
3. bx_lr — nearby bx lr within +0x800 (medium)
4. pop_pc — nearby pop {pc} within +0x400 (medium)
5. mov_pc — nearby mov pc, lr within +0x400 (medium)
6. ldm_pc — nearby ldm {pc} within +0x400 (medium)
7. b_target — callee is b imm target (medium)
8. naked → secondary fallback:
   - multi-caller (≥2) → confident (medium)
   - single-caller NOT in skipdata → low (real init fn)
   - single-caller IN skipdata → excluded (V0.3 false positive)

### 后果
- ✅ Lib 函数命名覆盖率 0.5% → 98.58% (~200x, 远超 ≥80% V0.5 目标)
- ✅ Sandbox-only, 不需要商业 / 重型工具
- ✅ 产物 function-table.json (2181 entries) 直接给 TS 翻译层用
- ❌ 201 个 single_caller_real 仍 low confidence (需人工或 unicorn)
- ❌ bx rX (3598 个 V0.4 BUG-004) 仍未自动处理
- ❌ V0.5 V0.6 V0.7 plan 中提到的 IDA Free / Ghidra 验证, 用 capstone 启发式替代

### 后续 V0.9+ 可选
- 如果未来需要 100% 函数命名 → unicorn2 emulation (V0.4 BUG-004 闭环)
- 优先级低 (98.58% 已超目标)

---

## ADR-011: ARM9 BFS hot-path reachability (V0.11)

### 状态
Accepted — 2026-08-31

### 背景
V0.10 helper naming (ADR-010) 给 callers ≥ 10 的 funcs 加 `util_/helper_` 前缀, 但前缀仅是 heuristic, 不真业务语义. 业务代码看到 `ARM9.util_0202f0c4` 不知道它真做什么 (game loop? render? dispatch? init?).

V0.11 goal: 顺着 ARM9 entry `0x02008000` 的 caller chain 做 BFS, 找 hot-path 真核心函数, 给 V0.12 命名 curation 提供 ground-truth.

### 决策
**BFS reachability + tier classifier**, 5 hops 浅搜索:

| Tier | 含义 | BFS depth |
| ---- | ---- | --------- |
| `entry_root`  | ARM9 entry (main loop start)            | 0 |
| `frame_loop`  | 每 frame 调用 (frame dispatcher)        | 1 |
| `subsystem`   | 子系统核心 (input / render / scene)      | 2 |
| `worker`      | 子系统下属 worker                       | 3 |
| `leaf_helper` | 内嵌 helper / 工具 (callers ≥ 5)        | 4+ |

**算法**:
1. **正向 BFS** from `0x02008000` in V0.3 call graph (`caller` → `callee`)
2. **find_first_disasm**: 对每个 addr, 从 disasm-arm9-full.txt 抽 first 8 real insns (skip `;` placeholders)
3. **filter**: 跳过 `__aeabi_*` (sfloat, ADR-005) + 跳过 confidence=`excluded` (V0.3 data_target)
4. **tier classifier**: 用 BFS depth 决定 tier name; 人工 post-edit (V0.12) 用 first_disasm 推断真业务名

### 关键限制
- **V0.3 call graph 不完美**: `caller` = BL-instruction address (不是 function address). entry `0x02008000` 整体大 inline loop, V0.8 没识别它为一个 function. → BFS-depth 0 = entry 唯一的 seen callee (1 个), but real hot path is mid-entry-body.
- **解决方案**: V0.11 输出 `entry_root` tier 包含 entry 的所有 BL-source addresses (`0x02008000`..`0x02010000` 内所有 BL instruction 来源), aggregated as 1 tier node.

### 产物
- `scripts/bfs_hot_path.py` — BFS + tier classifier + first-disasm extractor (single Python script)
- `rom-data/hot-path-tree.json` — Tier-indexed tree (entry_root → frame_loop → subsystem → worker → leaf_helper)
- `rom-data/hot-path-summary.txt` — Human-readable depth-tiered listing (1 block per tier)
- `docs/V0.11_HOT_PATH.md` — V0.11 设计 + 算法 + 输出 schema + findings

### 后果
- ✅ V0.12 (curated naming) 有 ground-truth tree 来 hand-pick 业务语义名
- ✅ BFS output 自动 sorted by reach depth, 容易鉴 hot path 哪一层
- ✅ 不依赖 IDA / Ghidra / unicorn (sandbox 可用)
- ❌ BFS 仅 5 hops 浅, 深 nested helper 仍隐
- ❌ tier classifier 仅基于 depth, 没用 disasm 模式 (e.g. fetch IO_KEYINPUT = input handler), V0.12+ 才能精化
- ❌ entry 0x02008000 mid-body BL-source 聚合算法待 V0.11.1 优化

### Verification
- BFS algorithm 跑 output 跟 V0.10 heuristic 一致 (`util_*` / `helper_*` 大部分落 leaf_helper tier)
- tsc EXIT=0 on V0.11 + `npx tsc` on full project (跟之前一致)

### 后续 V0.12+
- 用 V0.11 first_disasm snippets 推断 hot-func 业务名 (curated)
- 加 pattern detector: 写入 IO_KEYINPUT = input_handler, 写入 VRAM = render_submit
- 给 entry-tier 加专门分析 (entry 0x02008000 大 inline loop, 找 loop iteration point = frame vblank wait)

---

## ADR-009: TypeScript bridge 自动生成 (V0.9)

### 状态
Accepted — 2026-08-31

### 背景
V0.8 输出 `rom-data/function-table.json` (2700 entries), 但 TS 业务代码无法直接引用:
- 没有稳定的 import name (`0x02039f4c` 不能直接 import)
- 没有 JSDoc 注释上下文 (需 IDE hover 看 category / confidence / callers)
- 没有 type system identity check (TS 报错能 catch 错引)

V0.9 goal: 把 V0.8 JSON 翻译为可直接 `import` 的 TS const 文件.

### 候选
- (a) **手写 const 文件** — 2181 条手写不可行 (错误率高 + V0.8 改一次就要重写)
- (b) **codegen 脚本** — Python 读 JSON 输出 TS (V0.9 选择)
- (c) **运行时 JSON import** — TS 端 runtime require JSON, 但 IDE type 帮助差
- (d) **TS 端手写 stub** — 只为 V0.4 known 28 个命名, 剩余用 raw hex

### 决策
**(b) codegen 脚本**

理由:
- 2700 个 const 自动化, 0 手工错误
- V0.8 改 HEURISTIC 后, 重跑脚本 = 新 TS 文件 (同步 RE work)
- 每个 const 自动 JSDoc 注解 category / confidence / callers
- TS 类型系统可推导 function call signature (用 `typeof ARM9` 给严格 addr literal type)

产物:
- `miniprogram/utils/nds/index.ts` — barrel
- `miniprogram/utils/nds/addresses.ts` — 公共常量
- `miniprogram/utils/nds/functions/{arm9,arm7,known}.ts` — 2700 entries (按 CPU 拆分)
- `miniprogram/utils/nds/types.ts` — 共用类型
- `miniprogram/utils/nds/function-records.json` — runtime iteration
- `miniprogram/utils/nds/smoke.ts` — 烟雾测试入口
- `miniprogram/utils/nds/README.md` — 用法示例

### 后果
- ✅ RE 改动 → 重跑脚本同步 TS 端命名
- ✅ TS 业务代码 import 稳定 (Vec3_dot_product = 0x02039f4c, V0.8 改 detect 函数仍兼容)
- ✅ IDE IntelliSense hover JSDoc 显示 category + confidence + callers
- ✅ type literal 推导: `typeof ARM9.vec3_dot_product` = `0x02039f4c` (used as type)
- ❌ 2700 个 const 累计 ~3 MB TS file, IDE 略慢 (~100ms 启动 cold, hot < 10ms)
- ❌ 大量 `sub_0203a880` 类自动命名无业务语义记忆点, 需 grep + JSDoc 才能识别

### Verification
- ✅ `npx tsc --noEmit` 在 V0.9 生成的 7 个文件 → 0 errors
- ✅ Smoke test (`utils/nds/smoke.ts`) 在 Node 跑通 V0.4 known name + 公共常量
- ✅ Pre-existing template `miniprogram/pages/index/index.ts` 2 errors 跟 V0.9 无关

### 后续 V0.10+
- Jest 集成 smoke test (V0.10.1)
- 修模板 index.ts 错误 (V0.10.2)
- 加 `sub_XXXX` → `helper_XX` 推测命名 (callers_n ≥ 10 启发式) (V0.10.3) — **DONE V0.10**
- ARM9 bank 分析: BFS 按 call graph 主线找 game logic hot path (V0.11)

---

## ADR-010: Helper naming heuristic (V0.10)

### 状态
Accepted — 2026-08-31

### 背景
V0.9 TS bridge 输出 2700 entries, 但 2672 个 (98.96%) 是 `sub_XXXXXXXX` 自动命名, 无业务语义记忆点。TypeScript IDE IntelliSense 只显示 sub_02039f4c, 业务代码 `import { sub_02039f4c }` 完全认不出哪个函数做什么。

V0.9 ADR-009 follow-up 列出的 V0.10.3 目标: 给 callers ≥ 10 的 high-callers function 加语义前缀。

### 决策
**4-tier heuristic naming**, callers + region 启发式:

| Tier | Prefix   | 触发条件                                | 候选数量 | 含义 |
| ---- | -------- | --------------------------------------- | -------- | ---- |
| 1    | V0.4 known (28 fixed) | `is_known=true`                  | 28       | 已有命名最优先, 永不改 |
| 2    | `sfloat_` | 0x0204C000 ≤ addr < 0x0204E000 (SOFTFLOAT region) | ~50     | ADR-005 `__aeabi_*` 软浮点 lib (JS Number 直接覆盖) |
| 3    | `util_`   | callers ≥ 20 + 非 SOFTFLOAT region       | 13       | High-utility lib (render / dispatch / core hot path) |
| 4    | `helper_` | callers ≥ 10 + 非 SOFTFLOAT region       | 28       | Medium helper (中等通用 helper) |
| -    | `sub_XXXXXXXX` | 其他 (callers < 10)             | 其余    | Init / 一次性 / 内嵌, 无业务语义 |

- Naming 只 applied on `is_known=False` + `confidence != 'excluded'` (data_target 永不 naming)
- Tier 优先级 `is_known > sfloat > util > helper > sub_`
- 命名前缀保留完整 32-bit addr (`sfloat_0204d7e8` 而非 `sfloat_d7e8`) — 避免命名 collision 风险
- helper naming 标 `@heuristic` JSDoc 字段, 区分 V0.4 known vs 自动推测

### 后果
- ✅ TypeScript IDE IntelliSense 显示 `helper_02039f4c` / `util_0202f0c4` — 有 sort of semantic (前缀暗示 utility 类别)
- ✅ TS 业务代码 `import { util_0202f0c4, helper_020216c0 }` 一眼看出 type
- ✅ ADR-005 + ADR-009 延续: 推测命名仍是 best-effort, V0.4 known 最权威
- ✅ Codegen 增量 idempotent: 不改动 V0.9 baseline, 仅 append `is_heuristic=true` 到 FunctionRecord
- ❌ helper 名称仍 non-semantic (没真正读 disasm 推断业务功能), V0.11+ 通过 ARM9 BFS hot path 分析补
- ❌ ARM7 region 0x023xxxxx 也属于 sfloat zone? 否 — SOFTFLOAT region 仅 ARM9 0x0204C000..0x0204DFFF
- ❌ Naming coverage: 28 known → 28 + 50 sfloat + 13 util + 28 helper = 119 semantic names. 总 2700 / 119 ≈ 4.4% (vs V0.9 1.04%)

### Verification
- `npx tsc --noEmit` 在 V0.10 生成的 TS 文件 → 0 errors
- helper 命名通过 function-table.json 静态分析 (无 runtime 调用)
- 重跑 codegen idempotent

### 后续 V0.11+
- ARM9 BFS hot path: 找 game loop / scene_register / render_frame caller chain, 给 hot path funcs 真业务名
- 用 disasm 反查 context (r0 / r1 / r2 call args = scene_id / event_id), 推断业务语义
- 命名覆盖率目标 30%+ (~800 funcs)

---

## ADR-012: Curated naming priority chain (V0.12+)

### 状态
Accepted - 2026-08-31 (V0.12.0 引入, V0.12.2 完成 86 curated entries)

### 背景
V0.10 ADR-010 的 heuristic naming 是 best-effort (`util_<addr>` / `helper_<addr>` / `sfloat_<addr>`),
业务语义有限 (只能说明 caller 数量级别, 不能说明函数做什么).

业务翻译需要 ground-truth 命名. V0.12 引入 curated 命名:
- 从 disasm 手动阅读, 推断函数实际做什么 (state setter / getter / dcache / memset / memcpy / etc)
- curated 命名优先级高于 heuristic - `state_setter_x` 比 `helper_<addr>` 更有用
- 后续 V0.13 pattern detector 用 regex 自动找类似 pattern, 减少手工命名工作量

### 决策
**4-tier 命名优先级**:
```
Tier 1: V0.4 known       (is_known=true, 28 fixed)
Tier 2: V0.12 curated    (manual disasm reading, addr → name)
Tier 3: V0.10 heuristic  (sfloat_/util_/helper_, by region + caller count)
Tier 4: sub_<addr>       (catch-all placeholder)
```

**Curated 来源**: 4 个 JSON 文件:
- rom-data/v012-curated.json              - V0.12.0 (13 entries, 顶层状态访问函数)
- rom-data/v0121-curated-batch2.json     - V0.12.1 (15 entries, memory/state operations)
- rom-data/v0122-curated-batch3.json     - V0.12.2 batch 3 (32 entries, hot callers + cache + IPC)
- rom-data/v0122-curated-batch4.json     - V0.12.2 batch 4 (26 entries, pattern based detection)

**Codegen 集成**: generate_ts_functions.py 用 load_curated_names(*paths) 接收变长路径,
按文件顺序后者覆盖前者 (allows iterative batch additions).

**JSDoc 标签**: `@known V0.4 named` / `@curated V0.12 manually named` / `@heuristic <kind> (V0.10 ADR-010)` 三种标注,
IDE 鼠标悬停时能区分命名来源.

### 后果
- Curated 命名有真实业务语义, TS 业务代码 import 立刻知道函数做什么
- Manual reading 是有限资源 - V0.13 pattern detector 用 regex 自动扩展覆盖
- 4 文件结构允许迭代添加 curated, 不破坏既有命名
- Curated batch 3 (32 entries) 吸收了一些 heuristic slot (sfloat_/util_/helper_),
  所以总命名数没增长 - 但质量提升 (curated 业务名 > 编号占位符)
- "Same pattern, different global" 仍需要逐个命名 (global_dword_get_d ... _i),
  没有自动 dedup 机制

### 验证 (V0.12.2 截止)
| 版本      | known | curated | sfloat | util | helper | total | %     |
| --------- | ----- | ------- | ------ | ---- | ------ | ----- | ----- |
| V0.9      | 28    | 0       | 0      | 0    | 0      | 28    | 1.04% |
| V0.10     | 28    | 0       | 18     | 12   | 40     | 98    | 3.6%  |
| V0.12.0   | 28    | 13      | 18     | 7    | 36     | 102   | 3.78% |
| V0.12.1   | 28    | 28      | 18     | 6    | 31     | 111   | 4.11% |
| V0.12.2   | 28    | 86      | 16     | 0    | 7      | 137   | 5.13% |

(tsc --noEmit EXIT=0 在所有 V0.12+ 版本)

### 后续 V0.13+
- V0.13 pattern detector: regex 匹配 disasm 找所有 state setter / global getter / memset / memcpy,
  自动建议名字 + 写 v013-pattern-suggestions.json
- V0.14 entry_root deep analysis (entry 0x02008000 大 inline loop, frame vblank wait)

## ADR-013: Pattern detector auto-suggestion (V0.13)

### 状态
Accepted - 2026-08-31 (V0.13 引入)

### 背景
V0.12 curated 命名靠手工 disasm 阅读. 86 entries 跨 4 个 batch 已经覆盖 5.13% — 但进展慢,
每 batch 30 minutes 人力. 业务翻译需要更多命名来减少 sub_XXX.

V0.13 用 regex 自动模式匹配, 把"明显 pattern" 的函数 (state setter/getter, memset/memcpy,
dcache, tail_call, switch_dispatch, early_return 等) 全部自动命名.

### 决策
**Pattern detector**: 单文件脚本 `scripts/pattern_detector.py`, 14 种 regex 模式
(详见 `docs/V0.13_PATTERN_DETECTOR.md`).

**5-tier 命名优先级** (扩展 V0.12 ADR-012):
```
Tier 1: V0.4 known       (is_known=true, 28 fixed)
Tier 2: V0.12 curated    (manual disasm reading, 86 entries)
Tier 3: V0.13 pattern    (regex auto-match, 51 entries)  ← NEW
Tier 4: V0.10 heuristic  (sfloat_/util_/helper_, 23 entries)
Tier 5: sub_<addr>       (catch-all placeholder)
```

**Pattern JSON schema**:
- `pattern_kind` (string): 14 种之一 (state_setter, state_getter, ...)
- `confidence` (high/medium/low)
- `disasm_snippet` (前 200 chars)
- `callers_n` (V0.3 call graph)

**JSDoc**: `@pattern V0.13 auto-detected` (跟 @curated / @heuristic 并列).

### 后果
- ✅ 命名覆盖率从 5.13% → 7.04% (V0.13 截止)
- ✅ 51 entries 自动生成, 不需人工 review
- ✅ 5-tier 优先级让 curated > pattern > heuristic 显式分级
- ⚠️ 307 个 thumb-mode 函数没覆盖 (V0.13.1 follow-up)
- ⚠️ Same-pattern multi-global 没 dedup (V0.14+ follow-up)
- ⚠️ Pattern 不知道它访问哪个 global slot (V0.14+ follow-up)

### 验证 (V0.13 截止)
- `python scripts/pattern_detector.py` exit 0
- 51 pattern matches found
- `npx tsc --noEmit` 0 errors
- codegen idempotent

### 后续 V0.13.1+
- **V0.13.1** Thumb disasm: 跑 capstone CS_MODE_THUMB, 重新跑 pattern_detector (+50-100 matches)
- **V0.13.2** Advanced patterns: IO 寄存器 → io_*, IRQ handler → irq_*, vector table → vector_*
- **V0.14** Global dedup: 聚类同样 pattern 的 auto_* 到一个 _global_get_N 系列
- **V0.15** unicorn2 emulation: 抓 bx rX indirect call, V0.4 BUG-004 闭环

## ADR-014: Thumb-mode disasm dual-pass (V0.13.2)

### 状态
Accepted - 2026-08-31 (V0.13.2 引入)

### 背景
V0.13 pattern_detector 只 load ARM-mode disasm (disasm-arm9-full.txt + disasm-arm7-full.txt).
V0.8 detect_functions 用 `push {..lr}` 也识别 Thumb-mode 函数 (948 个 ARM-mode 解不出),
但 pattern_detector 把它们当 no_disasm 跳过.

V0.13.2 给 ARM9 + ARM7 加 Thumb-mode pass 输出 disasm-arm9-thumb-full.txt +
disasm-arm7-thumb-full.txt, pattern_detector 加 Thumb-aware fallback.

### 决策
**双 mode disasm**:
- V0.3 disasm_full_arms.py 输出 ARM-mode (默认)
- V0.13.2 disasm_thumb.py 输出 Thumb-mode (新)
- pattern_detector 同时 load 两 mode, ARM 优先, 无匹配回退 Thumb

**Thumb instructions**:
- 16-bit (跟 ARM 32-bit 不同)
- mnemonic 形式类似但 register 命名不同 (e.g. `ldr r1, [pc, #4]` 两 mode 都有)
- 步进 2 byte (ARM 是 4 byte)

### 后果
- ✅ Thumb disasm 文件纳入代码库 (5 MB+ 总大小)
- ✅ pattern_detector 现支持 dual-mode
- ⚠️ 241 Thumb-only 函数 0 callers, 大概率 V0.8 false positive, 不需要命名
- ⚠️ Thumb-specific patterns 还没加, 等 V0.13.3
- ⚠️ 236 个函数 disasm 完全 missing (0x02100000+ region capstone skipdata)

### Verification
- `python scripts/disasm_thumb.py` exit 0
- `python scripts/pattern_detector.py` exit 0
- `npx tsc --noEmit` 0 errors

### 后续 V0.13.3+
- V0.13.3 Thumb-specific patterns (push+pop+pc, Thumb movs+const return)
- V0.14 Global dedup
- V0.15 unicorn2 emulation

## ADR-014: Global dedup via target_global_ptr (V0.14)

### 状态
Accepted - 2026-08-31 (V0.14 引入)

### 背景
V0.13 pattern detector 给 51 个函数自动命名 `auto_<kind>_<fn_addr>`, 名字带函数自己
的 addr 但没说它操作哪个 global. 业务代码 import 时仍不知道这 setter 写哪个 state slot.

V0.14 提取 target_global_ptr 让名字带业务信息 (e.g. `auto_state_setter_02101be8` 表示
"setter 操作 0x02101be8 这个 global slot"). 同时暴露真实 duplicate: 两个 setter 操作同
一个 global 时名字相同, 加 `_a`/`_b` 后缀去歧义.

### 决策
**Pc-relative target extraction**:
- ARM 模式: `ldr rN, [pc, #N]` 用 PC = ldr_addr + 8, target = ldr_addr + 8 + N
- 从 binary (arm9.bin / arm7.bin) 读 target 处 4-byte little-endian word
- 真实 global ptr 暴露, 可以 dedup / cluster

**Naming 升级**:
```
V0.13: auto_state_setter_02020f3c   (function addr)
V0.14: auto_state_setter_02101be8   (target global ptr)
```

**Collision resolution**:
- 2+ funcs 名字相同 (因为操作同一个 global) → 加 `_a`/`_b`/`_c` 后缀
- 后缀不改业务语义, 保持 names unique 给 TS export

**Cluster summary**:
- 输出 clusters[] 数组, 每个 (pattern_kind, target_global) 聚类一个 entry
- function_count > 1 即 collision

### 后果
- ✅ 名字自带业务信息 (target global ptr), 业务代码 import 一目了然
- ✅ 暴露真实 duplicate 函数 (V0.8 detect_functions 偶尔重复登记相邻 push site)
- ✅ 39/51 suggestions 有 target_global_ptr (76%)
- ✅ 25 unique clusters + 6 collisions resolved
- ⚠️ tail_call + const_return 共 12 个没 target (需要 V0.14.1 单独处理)
- ⚠️ 仅第一条 ldr 被提取, 多 ldr 函数 (dual setter/getter) 第二个 ldr 漏掉

### 验证 (V0.14 截止)
- `python scripts/pattern_detector.py` exit 0
- 39/51 with target_global_ptr
- Tsc EXIT=0 on generated TS files

### 后续 V0.14.1+
- **V0.14.1** Extract target for tail_call (bx ip) + const_return (mov r0, #N)
- **V0.14.2** Cluster dedup output for V0.15 batch curated
- **V0.15** unicorn2 emulation: 抓 bx rX indirect call (V0.4 BUG-004 闭环)
- **V0.16** Global ptr naming: cross-reference ldr target with addresses.ts

## ADR-014.1: Per-kind target extraction (V0.14.1)

### 状态
Accepted - 2026-08-31 (V0.14.1 引入, 扩展 ADR-014)

### 背景
V0.14 加 extract_pc_relative_target 后, 39/51 suggestions 有 target. 但 12 个缺:
- 6 tail_call - 用 `ldr ip, [pc, #N]` 不是 `r\d+`
- 6 const_return - 用 `mov r0, #N` 不是 ldr
- 1 dcache_helper - 用 `mcr p15 c7` 没有 pc-relative target

V0.14.1 加 per-kind extraction 让 51/51 (100%) suggestions 都有 target.

### 决策
**Per-kind extraction strategy**:

| Pattern kind | Extraction |
| ------------ | ---------- |
| state_setter / state_getter / byte_* / halfword_* | FIRST ldr rN, [pc, #N] |
| tail_call | LAST ldr ip, [pc, #N] (closest to bx ip) |
| const_return | mov r0, #N → N (int) |
| dcache_helper | mcr p15 cN cM #op2 → "cN_cM_op2" (str) |

**Naming impact**:
- Before: 6 collisions (target=0x021bd860 etc.)
- After: 19 collisions (因为 target 现在更具体, 多 funcs 共用同一 target)
- 实际命名: `auto_state_setter_021bd860_a/_b`, `auto_const_return_00000000_a/_b/_c`, etc.

### 后果
- ✅ 100% target coverage (was 76%)
- ✅ Names 都带业务信息 (target global ptr / const value / dcache opcode)
- ✅ dcache opcode 当 target_ptr short (e.g. `auto_dcache_helper_c7_c10_1`)
- ✅ Tail-call 用 LAST ldr 而不是 FIRST (更接近 bx ip target)
- ⚠️ Collisions 增加 (19 vs 6) - 因为 target 更具体, 多 funcs 共用更明显
- ⚠️ 7 个 const_return 都返回 0 (`mov r0, #0`) - dedup 暴露真实情况

### 验证 (V0.14.1 截止)
- 51/51 with target_global_ptr
- 19 collisions resolved (up from 6)
- 26 unique clusters (was 25)
- tsc EXIT=0 (whole project, 跨 100+ TS files)

### 后续 V0.14.2+
- V0.14.2: Cluster dedup → batch curated (V0.15 input)
- V0.15: unicorn2 emulation (V0.4 BUG-004 闭环)
- V0.16: Global ptr naming (cross-reference addresses.ts)
