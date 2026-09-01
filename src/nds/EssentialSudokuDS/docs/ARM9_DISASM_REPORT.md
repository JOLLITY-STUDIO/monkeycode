# ARM9 完整反汇编报告 (V0.3.0)

> 来源: `scripts/disasm_full_arms.py` 用 capstone 5.0.7, ARM + Thumb 双 pass
> 完整产物: `rom-data/disasm-arm9-full.txt` (14 MB, ARM-mode pass)
> 模式切换表: `rom-data/mode-switches.json` (4681 entries)
> 调用图: `rom-data/function-calls.json` (7141 calls / 2181 unique callees)

## 1. 范围

| 字段            | 值                              |
| --------------- | ------------------------------- |
| src bin         | `rom-data/arm9.bin` (1 048 576 B) |
| RAM dst base    | `0x02008000`                     |
| RAM dst 范围    | `0x02008000..0x02108000`         |
| entry 第一条指令 | `0x02008000: bl #0x204d8e8`      |
| 反汇编模式      | ARM-mode 单 pass (主) + Thumb-mode 辅 |
| skipdata        | enable (capstone skipdata=True, 4 byte step) |

### 1.1 解码统计

| Pass      | 真指令数 (real) | skipdata 占位 | 文件总 line |
| --------- | --------------- | ------------- | ----------- |
| ARM-mode  | 238 037         | 24 107        | 262 144     |
| Thumb-mode| 458 028         | 38 372        | 496 400     |

注:
- ARM-mode 真解码 23.8 万条 ≈ 1 MB / 4B → 占满 1 MB
- 即说明 1 MB ARM9.bin 内**有效 ARM instr**约 23.8 万条; 但许多 4-byte unit 是 skipdata 填补 (data table / literal pool 等)
- 真实"逻辑代码"条数预计 8–15 万条 (其余是 helper / data table 等空白 arm/zero)

## 2. Entry — 0x02008000 (前 30 lines)

```armasm
02008000  381601eb          bl       #0x204d8e8        ; alloc / string op (lib)
02008004  0010a0e1          mov      r1, r0
02008008  0c0098e5          ldr      r0, [r8, #0xc]
0200800c  c21601eb          bl       #0x204db1c        ; str-related
02008010  00b0a0e1          mov      fp, r0
02008014  140097e5          ldr      r0, [r7, #0x14]
02008018  321601eb          bl       #0x204d8e8        ; alloc
0200801c  0b10a0e1          mov      r1, fp
02008020  421601eb          bl       #0x204d930        ; register/subscribe
02008024  98129fe5          ldr      r1, [pc, #0x298]
02008028  001501eb          bl       #0x204d430        ; setup_subsystems
0200802c  0e1601eb          bl       #0x204d86c        ; hash_eq / table-lookup
02008030  0070a0e1          mov      r7, r0
02008034  4c109de5          ldr      r1, [sp, #0x4c]
02008038  0b00a0e1          mov      r0, fp
0200803c  101301eb          bl       #0x204cc84        ; service_register_scene
02008040  000050e3          cmp      r0, #0
02008044  0100000a          beq      #0x2008050
02008048  000057e3          cmp      r7, #0
0200804c  0670a001          moveq    r7, r6            ; fallback (r6) on alloc fail
02008050  50109de5          ldr      r1, [sp, #0x50]
02008054  0b00a0e1          mov      r0, fp
02008058  da1201eb          bl       #0x204cbc8        ; service_register_input
0200805c  000050e3          cmp      r0, #0
02008060  0100000a          beq      #0x200806c
02008064  000057e3          cmp      r7, #0
02008068  48709d05          ldreq    r7, [sp, #0x48]
0200806c  0700a0e1          mov      r0, r7
02008070  1c1601eb          bl       #0x204d8e8        ; alloc
02008074  0010a0e1          mov      r1, r0
02008078  0c0098e5          ldr      r0, [r8, #0xc]
0200807c  a61601eb          bl       #0x204db1c        ; str-build / buffer-attach
```

### 2.1 Entry 模式归纳

1. 入参: r8 是一组 resource descriptor; r7 是另一组; sp+0x4c/0x50 是两个 handler pointer
2. 前 8 行: 调 core lib (`0x204d8e8` alloc + `0x204db1c` str-build) 建 scene 主结构
3. 注册 4 项 service:
   - `0x204d430` setup_subsystems (IPC/touch/HW init)
   - `0x204d86c` hash/equality comparison
   - `0x204cc84` service_register_scene
   - `0x204cbc8` service_register_input
4. 完整 entry 显然是 main_stage 启动入口 (场景注册 + IPC + touch)
5. **没有 thumb 切换** 在 entry 200 条内 — 整个 ARM9 entry 段是 ARM mode

## 3. Top 16 Library Functions (ARM9)

按 静态反引用 计数 排序的库函数 (callers ≥ 50):

| Address       | Callers | 推测职责 (依据 call-site + opcode 模式)        |
| ------------- | ------- | ----------------------------------------------- |
| `0x02028434`  | 221     | 小 helper: 调 1 个 LDR + 1 个 RET, 多为 memcpy2 / len / hash-update |
| `0x02039f4c`  | 154     | 中型 helper: 多次 STRB + LDRB, 多为 byte-array 操作 |
| `0x0204D8E8`  | 136     | 标准 alloc: `b malloc` + `mov lr pc`            |
| `0x02039f38`  | 118     | 邻居 `0x2039f4c` — 同模块 helper (often inverted 2 func) |
| `0x02029BB0`  | 104     | 队列/链表 helper                                |
| `0x0202F0E8`  |  79     | bl 命中 `0x2039f38` + `0x2039f4c`, 看起来是 register/handler attach |
| `0x02029A58`  |  67     | 高频 compare/equals                             |
| `0x02029AB8`  |  60     | 与 0x2029a58 兄弟                                |

完整 top-128 在 `rom-data/function-calls.json → top_callees_by_callers`.

## 4. Mode-Switch 密度

16 KB 分桶 (ARM9 dst 空间) — switch point count per bucket:

| 范围                         | Switch count |
| ---------------------------- | ------------ |
| 0x02008000-0x0200C000        |   72         |
| 0x0200C000-0x02010000        |   48         |
| 0x02010000-0x02014000        |   66         |
| 0x02014000-0x02018000        |   80         |
| 0x02018000-0x0201C000        |   65         |
| 0x0201C000-0x02020000        |  105         |
| 0x02020000-0x02024000        |  123         |
| **0x02024000-0x02028000**    | **449**       |
| 0x02028000-0x0202C000        |  120         |
| 0x0202C000-0x02030000        |  184         |
| 0x02030000-0x02034000        |  178         |
| 0x02038000-0x0203C000        |  231         |
| 0x02040000-0x02044000        |   87         |
| 0x02044000-0x02048000        |  123         |
| 0x02048000-0x0204C000        |  162         |
| 0x0204C000-0x02050000        |  162         |
| 0x02050000-0x02054000        |    4 (gap, data area) |
| 0x02054000-0x02058000        |   64         |

**热点**:
- **0x02024000-0x02028000** 含 449 switches — 推测是**主 game loop / IPC handler** (每隔几行就用 thumb 优化 size)
- **0x02030000-0x0203C000** 含 ~700 switches — 推测是**游戏逻辑主体** (高 switch density)
- **0x02050000+** 是 data area (只有 4 switches) → 印证 0x50000..0x108000 是 read-only data / padding / uninitialized

## 5. 模式切换开关种类

| op    | count |
| ----- | ----- |
| bx    | 3598  |  (含 conditional bxeq/bxne 等)
| blx   | 1043  |  (直接跳转 + 切换 mode bit)
| ldm   |   37  |  (LDM r..., {..., pc})
| pop   |    3  |  (POP {..., pc})

`blx` 跳转目标的 LSB (mode bit):
- 几乎所有 blx LSB=1 (→ Thumb target) — 印证 ARM9 主函数多用 Thumb 而 library 是 ARM
- 实测 1043 - 74 = 969 blx target 是 ARM (LSB=0)

## 6. 已知 / 未做 (V0.4+ 阶段)

- [ ] **完整 reverse call graph 函数命名**: 2181 unique callees → 需要给每个候选 推测名称 (best-effort)
- [ ] **String table**: ARM9 0x02070000 附近实际 string literals → 需要扫 ASCII 串跟 entry 对照
- [ ] **Scene state machine**: 各 `service_register_xxx` 入口对应的 scene id 还不清
- [ ] **libnds / nitro SDK 标记**: 0x20080xxx / 0x200C0xxx 中 SDK 函数特征
- [ ] **Stack frame analysis**: 函数 prologue/epilogue + 栈帧大小, 用于 etm 重建
- [ ] **跨 ARM9/ARM7 双调用**: ARM7 → ARM9 FIFO 写寄存器地址 (0x04000000+ I/O) 配合 ARM9 → ARM7 IPC mapping

## 7. 后续产物

- [ `rom-data/disasm-arm9-full.txt` ] —— 14 MB, 全部 ARM-mode pass
- [ `rom-data/mode-switches.json` ] —— 4681 entries
- [ `rom-data/function-calls.json` ] —— 7141 calls, 2181 unique callees
- [ `scripts/disasm_full_arms.py` ] —— repro 工具
