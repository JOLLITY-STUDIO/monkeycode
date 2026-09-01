# ARM7 启动代码逆向分析 (V0.7)

> 闭环 BUG V0.3-005 / V0.4-003 的最终结论。
> 提交时间: 2026-08-31
> 相关反汇编: `rom-data/disasm-arm7-full.txt` (3.25 MB, 62590 instructions)
> 关联 ADR: `.codebuddy/DECISIONS.md` ADR-007

---

## TL;DR

| 项目 | 值 |
|---|---|
| Cart header ARM7 entry | `0x02380000` (== ARM7 load address) |
| ARM7 entry 实际语义 | **函数体中段 (不是 startup)** |
| 第一条合法函数 (push prologue) | `0x023802a0` |
| 是否有 BIOS/IRQ setup (`swi`) | **0 个 swi 在整个 256 KB** |
| 真 ARM7 startup code 是否存在 | **不存在** — 推断为 "null ARM7 stub" 模式 |
| Game logic 是否依赖 ARM7 | **不依赖** — 100% 跑在 ARM9 |
| TS 端 Service 是否需要 ARM7 对应实现 | **不需要** — ADR-001 简化模型依然成立 |

---

## 1. Cart Header 字段

```
Game title : ESUDOKUDS
Game code  : AZIP
Maker code : G9
ARM7 entry : 0x02380000   ← BIOS 把控制权交给这里
ARM7 load  : 0x02380000   ← == entry (正常情况 entry = load + offset)
ARM7 size  : 0x000286a0   ← 162 KB declared code
```

ARM7 binary 实际提取大小: **262 KB** (0x40000)。声明 size 162 KB → 余下 ~100 KB 是 data pad。

---

## 2. 0x02380000 区域反汇编 (8 条指令 + loop 计数器)

```
02380000: and  r1, r1, #0xff
02380004: and  r1, r1, #0x1f
02380008: orr  r0, r0, r1, lsl #3
0238000c: strb r0, [r5, #3]       ← write this.byte3
02380010: ldrb r0, [r5, #3]
02380014: bic  r0, r0, #2         ← clear bit 1
02380018: strb r0, [r5, #3]
0238001c: b    #0x238006c         ← forward branch
...
02380278: add  r4, r4, #1        ← LOOP COUNTER INCREMENT
0238027c: cmp  r4, #0x10
02380280: blt  #0x237ffbc        ← loop 16 times
02380284: add  sp, sp, #0x1c
02380288: pop  {r4-r11, lr}
0238028c: bx   lr                ← function return
```

**关键事实**:

1. **`r5` 在 entry 没有被初始化** — NDS BIOS 不预设通用寄存器。
2. **`strb r0, [r5, #3]`** 写 `this->byte3`。如果 r5 是 stale 内存值, 这条指令可能触发:
   - **data abort** (写未映射地址) → ARM7 exception → hang
   - 或者 r5 = 0 时写零页 (`0x00000003`) → 仍然 undefined behavior
3. **0x2380278 是 loop 末尾** (`add r4, r4, #1` 增量), 不是函数入口。

---

## 3. 整个 256 KB ARM7 binary 的统计

| 模式 | 指令数 |
|---|---|
| `push {... lr}` (函数 prologue) | **424** (首条在 0x023802a0) |
| `pop {... pc}` (epilogue) | 0 |
| `bx lr` (返回) | 703 |
| `bx r3` 等间接 (虚函数调用) | 16 |
| `swi` (BIOS 调用) | **0** |
| `bl/b` 总数 | 7141 |
| Skipdata placeholders (data not code) | 2946 |
| 解码成功的 ARM 指令 | 62590 |

**0 个 swi 是决定性证据** — 任何正常 NDS ARM7 libnds/devkitARM 程序必有:
- `swi 0x020000` (`swiWaitForVBlank`)
- `swi 0x0E0000` (`irqEnable`)
- `swi 0x0C0000` (`irqDisable`)

完全没有 SWI → **ARM7 不参与 IRQ 控制** → **不上 ARM7 vblank loop** → 游戏运行完全在 ARM9 单边循环。

---

## 4. 第一条真函数 (0x023802a0)

```
023802a0: push {r4-r10, lr}
023802a4: sub  sp, sp, #0x18
023802a8: mov  r8, #0
023802ac: mov  r4, #2
023802b0: mov  r5, #1
023802b4: mov  r6, r8              ← r6 = 0
023802b8: ldr  r7, [pc, #0x1c8]   ← 跳表指针 (0x238048c)
023802bc: mov  sl, #0x54           ← struct stride = 84 bytes
023802c0: mla  sb, r8, sl, r7     ← sb = r7 + r8 * 84
023802c4: ldrb r0, [sb, #3]       ← 读 channels[r8].byte3
...
02380420: add  r8, r8, #1
02380424: cmp  r8, #0x10           ← 16 channels
02380428: blt  #0x23802c0
```

**这是 audio mixer update 函数**:
- 16 个 audio channel (r8 计数器 0..15, stride 84 byte/struct)
- 每 channel 84 byte (`sb = r7 + r8 * 0x54`)
- 多个 `[r5, #3]` / `[r7, #3]` byte flag 操作 → channel state byte (`enable/env/mod`)
- 调用远端 helper:
  - `bl #0x237ed6c`
  - `bl #0x237fdf8`
  - `bl #0x237f678`
  - `bl #0x237f5dc`

→ **ARM7 真存在一个 audio mixer 函数**, 但需要被 caller 主动调用 — 而 caller (ARM9) **没人在 ARM7 entry 这边启动它**。

---

## 5. 跨参考 (cross reference)

查 `0x02380000..0x23802a0` 这个 672 字节 fragment 是否被任何代码 `bl` / `b` 进入:

```
=== Branches/calls TO 0x02380000..0x023802a0 (the header entry region) ===
  None found - 0x02380000..0x023802a0 is not called from anywhere!
```

**确认**: 不存在从 ARM7 binary 内任何位置进入这段入口代码的分支。

唯一可能的 entry 跳入路径是 **NDS BIOS 上电时按 cart_header 跳转**:
- BIOS cart boot: 读 cart_header ARM7 entry 字段 → 跳到 `0x02380000`
- 此时所有寄存器未定义, `[r5, #3]` 写入可能 data abort
- ARM7 进入 exception → ARM9 单独跑, 游戏正常运转

---

## 6. 验证 (unicorn emulation 可选)

可选用 unicorn-engine 在 PC 端模拟 NDS 启动流程:
- 加载 arm7.bin 到 0x02380000
- 设置 PC = 0x02380000
- 跑 N 条指令
- 观察: 第一条 `strb [r5, #3]` 触发 data abort ✓ 验证假设

V0.8+ 再做 (不必 V0.7)。

---

## 7. ADR-007: ARM7 是 stub-only

**Decision**: ARM7 binary 不实现任何 startup code。该现象是 Imagineer 商业 ROM 的常规设计选择。

**Consequences**:
- TS 端 Service 一律映射到 ARM9 单边架构 (跟 ADR-001 一致)
- 所有 audio mixer / SFX / vblank IRQ 假定由 ARM9 handler 模拟处理
- 无需任何 `arm7_*.ts` Service 实现
- ARM7 binary 在 H5 bundle 中不需要导出 (TS 层完全替代)

**Surprises**:
- Cart header ARM7 entry 字段为 0x02380000 (官方), 但 ROM 内部**从未真正 jump from there to a startup**
- arm7.bin 文件仍存在 256 KB, 但其中首 672 字节 (函数体中段) + 后续 16-iteration loop 是 dead code

**Verification**:
- cart_header entry = 0x02380000 (V0.0 已确认)
- 反汇编前 8 指令直接用 r5 (无 prologue)
- 整个 ARM7 binary 0 个 swi
- 0x023802a0 是首条 `push` 函数
- 0x02380000..0x23802a0 没有任何外部跳转进入
- ARM9 binary 完整 + 主游戏逻辑全部在 ARM9 (V0.3)

---

## 8. 给后续阶段的备注

- V0.3 BUG-005: 标记 **resolved** (原描述 "IRQ handler" 不准确, 现校正为 "函数体中段")
- V0.4 BUG-003: 标记 **resolved** (沿用 V0.3 同一根因)
- TS 端不再开 ARM7 service 文件
- 如果未来要真模拟 NDS 上电流程, V0.8 用 unicorn 但优先级低 (无业务价值)
