# ARM9 / ARM7 反汇编报告 (V0.0.3)

> 来源: `scripts/disasm_arms.py` 用 capstone 5.0.7 反汇编
> 完整输出: `rom-data/disasm.txt`

## 1. ARM9 entry: 0x02008000 (RAM) / 0x8000 (file)

ARM9 binary 大小约 1 MB，entry 是 Thumb + ARM 混合模式（capstone 先按 ARM 反解）。

### 1.1 前 30 条 (raw, 然后逐条加注)

```armasm
02008000: bl       #0x204d8e8      ; init_main_scene()  初始化主舞台
02008004: mov      r1, r0
02008008: ldr      r0, [r8, #0xc]   ; r0 = scene[0].field_0c
0200800c: bl       #0x204db1c      ; str_builder_attach 字符串构造 attach
02008010: mov      fp, r0
02008014: ldr      r0, [r7, #0x14]
02008018: bl       #0x204d8e8      ; alloc_and_clear (类似) — malloc+memset
0200801c: mov      r1, fp
02008020: bl       #0x204d930      ; set_main_scene() 设主场景
02008024: ldr      r1, [pc, #0x298] ; 静态指针
02008028: bl       #0x204d430      ; setup_subsystems() 启动 IPC/touch
0200802c: bl       #0x204d86c      ; load_resource_table() 载入资源表
02008030: mov      r7, r0
02008034: ldr      r1, [sp, #0x4c]
02008038: mov      r0, fp
0200803c: bl       #0x204cc84      ; service_register_scene() 注册 scene
02008040: cmp      r0, #0
02008044: beq      #0x2008050
02008048: cmp      r7, #0
0200804c: moveq    r7, r6          ; r7 = fallback_resource_table
02008050: ldr      r1, [sp, #0x50]
02008054: mov      r0, fp
02008058: bl       #0x204cbc8      ; service_register_input()
0200805c: cmp      r0, #0
02008060: beq      #0x200806c
02008064: cmp      r7, #0
02008068: ldreq    r7, [sp, #0x48]
0200806c: mov      r0, r7
02008070: bl       #0x204d8e8      ; alloc(scene_action_t)
```

### 1.2 关键观察

1. **入口是 std ARM `BL`-link**,  从未用 `BX LR` 形式 → 调用栈靠 `MOV LR, PC` 维护
2. **库函数表**: 这一段频繁调 6 个 BL target:
   - `0x0204D8E8` (alloc) — 出现 7 次，传入 size 在 LDR 之前
   - `0x0204DB1C` (str-builder attach/append)
   - `0x0204CBC8` (register handler)
   - `0x0204CC84` (push sequence → service)
   - `0x0204D86C` (hash / value-equality)
   - `0x0204D930` (entry point in service table)
3. **资源 table**: `[r8, #0xc]` / `[r7, #0x14]` 是 keyed-by-r8/r7 的两个 resource descriptor 数组
4. **fallback pattern**: `moveq r7, r6` / `ldreq r7, [sp, #0x48]` — failure path 链回 r6/堆栈上一帧的 fallback 指针
5. **双层 alloc**: 0x200807c BL 后 `STR r0, [r8, #0xc]` 直接覆盖资源表 - 像 weak ptr 初始化

## 2. ARM7 entry: 0x02380000 (RAM) / 0x200000 (file)

ARM7 binary 大小约 256 KB（只反了前 100 条）。代码风格更"硬件驱动"。

### 2.1 前 20 条

```armasm
02380000: and      r1, r1, #0xff       ; r1 &= 0xFF (mask byte)
02380004: and      r1, r1, #0x1f       ; r1 &= 0x1F (5-bit field)
02380008: orr      r0, r0, r1, lsl #3  ; r0 |= r1 << 3
0238000c: strb     r0, [r5, #3]       ; 写入控制寄存器 byte 3
02380010: ldrb     r0, [r5, #3]
02380014: bic      r0, r0, #2         ; r0 &= ~2
02380018: strb     r0, [r5, #3]       ; 写入控制寄存器 byte 3 (清位)
0238001c: b        #0x238006c          ; 跳转到主循环入口
02380020: mov      r0, r4             ; r0 = 当前 touch state
02380024: bl       #0x237ed6c         ; touch_sample() 取样触摸
02380028: cmp      r0, #0
0238002c: bne      #0x238006c         ; 有触摸 → 进 main_loop
02380030: ldr      r3, [r5, #0x48]
02380034: cmp      r3, #0
02380038: strbeq   fp, [r5, #0x22]
0238003c: beq      #0x2380054
02380040: mov      r0, r5             ; r0 = ctx
02380044: mov      r1, r7             ; r1 = ???
02380048: ldr      r2, [r5, #0x4c]   ; r2 = ???_callback
0238004c: mov      lr, pc              ; 手动设置 LR
02380050: bx       r3                  ; tail-call user callback
```

### 2.2 关键观察

1. **位掩码驱动模式**: 前 7 句用 `bic`/`orr` 改一个 byte 寄存器 — 这种"清位/置位"是 NDS ARM7 标准的 IO 寄存器（R_BUTTONCNT / IPC_FIFO_CR / etc）操作
2. **r5 是 ctx**: 整个函数都把 r5 当 "ctx 指针"，`STR`/`LDR` 都是 `[r5, #0xXX]` 形式 — 这是面向对象 C 设计（`struct ipc_ctx { ... }`)
3. **touch state in r4**: 0x2380020 / 0x2380024 用 r4 保存前后触摸状态 → diff detection
4. **callback tail-call `MOV LR, PC; BX r3`**: 函数尾以 `bx r3` 调用用户回调 → 支持 C 函数直接传递 + 栈平衡
5. **整段的 control-flow design**: entry 函数 + 跳转 0x238006c 主 loop + 跳 0x2380278 + 跳 0x238006c → 显式 NDS 风格 "loop body + jump-to-top" 没 OS scheduler 概念

### 2.3 主 loop 起点: 0x0238006c

```armasm
0238006c: ldrb     r0, [r5, #9]
02380070: lsl      r1, r0, #1
02380074: ldr      r0, [pc, #0x218]      ; pc-relative 查表 → 0x2380294?
02380078: ldrsh    r0, [r0, r1]          ; r0 = table[index << 1]  int16 查表
0238007c: add      r8, r8, r0            ; r8 是 running offset / pixel 计数
02380080: ldrb     r1, [r5, #8]
02380084: ldrb     r0, [r5, #5]
02380088: sub      r0, r1, r0            ; delta
0238008c: add      sl, sl, r0, lsl #6    ; sl += delta << 6 (累积)
02380090: mov      r0, r5
02380094: mov      r1, r6
02380098: bl       #0x237fdf8            ; blit_partial() 局部块传输
0238009c: add      r8, r8, r0
```

## 3. 库函数候选地址表 (V0.0.3 推测)

| Address        | 推测职责                              |
| -------------- | ------------------------------------- |
| `0x0204D8E8`   | `alloc(size)` — 全局 alloc 入口       |
| `0x0204DB1C`   | `str_builder_attach` (str-builder API)|
| `0x0204CB C8`  | `service_register_input`              |
| `0x0204CC84`   | `service_register_scene`              |
| `0x0204D430`   | `setup_subsystems`                    |
| `0x0204D86C`   | `hash_eq` 或 resource_table_lookup    |
| `0x0204D930`   | `set_main_scene`                      |
| `0x0237ED6C`   | `touch_sample` (ARM7)                 |
| `0x0237FDF8`   | `blit_partial`                        |
| `0x0237F678`   | `??` (BL from r5,r6 → check/state)    |
| `0x0237F5DC`   | `??` (BL after r8/r0 累加)            |

## 4. 已知未做 (V0.0.4+)

1. **完整 library map**: 0x02040000-0x02050000 区间的所有 `BL/BLX` 目标反向列表
2. **ARM7 全 disasm** (256 KB → V0.0.3 entry-only)
3. **ARM9 thumb-mode 切换点**: 大多游戏混合 ARM/Thumb，需要识别 BX/BLX 跳转
4. **string table** 在 ARM9 data 区域 (`0x0207xxxx` 附近，常驻 string literals + game strings)
5. **scene manager state machine**: 主 GameState 表

