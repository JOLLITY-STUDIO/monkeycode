# ARM9/ARM7 Library 函数映射 (V0.4.0)

> V0.3 capstone 反汇编 (238K ARM9 ARM + 6K ARM7 ARM 真指令) + V0.4 lib 重新分类.
> 来源: `rom-data/function-calls.json → top_callees_by_callers` (按 callers 数 top-128).

## 1. 重大发现: Soft-Float Library (V0.4 ADR-005)

ARM9 top callees 中 0x02048000..0x0204C000 区域全部是 **IEEE 754 单精度软浮点 math library**!

证据 (sample disasm header):
- `0x0204D8E8 (136 callers)` — `ands r2, r0, #0x80000000` + `clz r3, r0` + `lsls r0, r0, r3` + `rsb r3, r3, #0x9e` → **FP normalizer** (sign + CLZ-based exponent extract)
- `0x0204D86C` — `bic r1, r0, #0x80000000` 清符号位 → **fabs**
- `0x0204DB1C` — `eors r2, r0, r1` 比较 sign bits → **float compare**
- `0x0204D430` — `mov ip, #0xff` + `ands r3, ip, r0, lsr #23` 提取 exponent 高 8 位 → **float classify**

**真实原因**: NDS 双 CPU 均无硬件 FPU (ARM946E-S + ARM7TDMI). devkitPro / libgcc 提供 soft float via ARM EABI `__aeabi_*` calls. 任何 `float` / `double` 算术都会被编译器 lower 成这些 libcalls.

**含义**:
- V0.4+ TS 端不需要手动重写这些函数; JS 的 `Number` (IEEE 754 double) 直接覆盖
- 不需要 ARM9 lib ident 0x0204Dxxx 名字 — 都是 `__aeabi_fadd`/`__aeabi_fmul`/`__aeabi_fdiv` 等
- 不需要写 service implementations (move to ADR-005 ignored list)

## 2. 真正 Game-Library 函数 (callers ≥ 30)

筛除 SF-MATH region (0x0204C000+) 后, **GAME region** (0x02008000..0x0204BFFF) 的 top callees:

| Address       | Callers | 命名 (v0.4 best-effort)         | 推测职责                              |
| ------------- | ------- | ------------------------------- | ------------------------------------- |
| 0x02028434    |  221    | `vec2_set_inline`               | 8-byte 直接写 — `STR r1,[r0]; STR r2,[r0+4]; BX LR`. 玩家输入坐标 / 描点拷贝 |
| 0x02039F4C    |  154    | `?`                              | 中型 helper, 多 STRB/LDRB → byte-array 操作 |
| 0x02039F38    |  118    | `?` (与 0x2039F4C 兄弟)         | 同模块 helper                          |
| 0x02029BB0    |  104    | `?`                              | 队列/链表 helper                       |
| 0x0202F0E8    |   79    | `?`                              | bl 命中 0x2039F38/0x2039F4C            |
| 0x02029A58    |   67    | `simple_set_var`                | `str r0, [r1]; bx lr` — 单字段赋值       |
| 0x02029AB8    |   60    | `state_switch_8way`             | cmp r0, #7 + addls pc,pc,r0,lsl #2 → 8 路跳转表 |
| 0x0202F0C4    |   49    | `?`                              | (与 0x202F0E8 兄弟)                    |
| 0x0200A098    |   48    | `?` (early stage)               | 0x200A098 在入口附近 → 早期 init          |
| 0x0203A1E4    |   48    | `?`                              |                                       |
| 0x020395BC    |   41    | `?`                              |                                       |
| 0x02020D0C    |   39    | `?`                              |                                       |
| 0x0202BD64    |   38    | `?`                              |                                       |
| 0x0203A880    |   38    | `?`                              |                                       |
| 0x0203A7EC    |   37    | `?`                              |                                       |
| 0x020082CC    |   33    | `?` (entry+0x2CC)               | main 主循环附近 → 主 stage              |
| 0x02029250    |   32    | `?`                              |                                       |

## 3. Entry 调用链 (V0.4.0 命名)

```
ENTRY 0x02008000:
  BL 0x0204D8E8     alloc_init         ; 拿一片新 buffer (or 0x204d930)
  BL 0x0204DB1C     str_build_attach   ; 把 buffer 关联到 string builder
  BL 0x0204D8E8     alloc              ; 第二次 alloc
  BL 0x0204D930     fp_normalize_class ; soft-float classify
  BL 0x0204D430     fp_compare_or_setup_subsystems ; 既可能是 SF 也可能是 game
  BL 0x0204D86C     fp_fabs_classify   ; soft-float
  BL 0x0204CC84     service_register_scene
  BL 0x0204CBC8     service_register_input
  BL 0x0204D8E8     alloc              ; (3rd alloc)
  BL 0x0204DB1C     str_build_attach
  BL 0x0204D86C     fp_fabs_classify
  ...

ENTRY-end → BL 0x02028434 (vec2_set) → 8 call sites in entry; main_scene activate
```

## 4. ARM7 Top callees (callers >= 20)

| Address       | Callers | 命名 (v0.4 best-effort) | 推测职责                          |
| ------------- | ------- | ----------------------- | --------------------------------- |
| 0x023913B8    |  92     | `ipc_fifo_recv_handler` | IPC FIFO 接收 → ARM7 callback |
| 0x02391398    |  77     | `(brother of above)`    | 同模块                             |
| 0x02384350    |  53     | `touch_sample_xy`       | touch X/Y 读取 + ACK               |
| 0x023920B0    |  35     | `lid_close_handler`     | power button interrupt             |
| 0x0239EEF4    |  33     | `spi_transfer`         | SPI bus 主 transfer (touch/wifi)  |
| 0x0238863C    |  26     | `key_sample`           | KEYINPUT register read              |
| 0x023942A4    |  25     | `rtc_read`             | RTC timestamp                      |
| 0x0239F164    |  24     | `?`                    | (FIFO/SPI control)                |
| 0x02391B48    |  22     | `cart_slot_detect`     | cart 插槽 检测                    |
| 0x02399594    |  21     | `gba_slot_detect`     | GBA slot back compat detect       |
| 0x02391CE4    |  21     | `mic_sample`          | mic audio sample                  |
| 0x02394548    |  20     | `spi_ack_wait`        | SPI ACKing transfer                |

## 5. V0.5 后续: Lib 命名收尾

策略:
1. 看 ARM9 lib 头部 disasm 12-50 行 (已经收集)
2. 看 call sites 上下文 (caller's caller, 反推)
3. 用 IDA Free 自动发现函数 prologue / epilogue 标出真函数边界
4. 给所有 2181 unique callees 推测名称 (libnds / devkitPro / game-specific)
5. 输出 `function-calls.json → named_callees.json` 升级版本

进度: 12/2181 已命名 (≈ 0.5%). 后续 V0.5+ 阶段继续推进.

## 6. V0.4 产物

- ✅ `miniprogram/utils/sudoku/board.ts` (V0.4 真实业务)
- ✅ `miniprogram/utils/sudoku/real_puzzle.ts` (3 真实 Sudoku puzzles)
- ✅ `tsconfig.test.json` (test-specific emit)
- ✅ `scripts/test_sudoku.ts` (12 测试, 81 pass)
- ✅ `package.json` `npm test` / `npm run build:test` / `npm run typecheck`
- ✅ `docs/LIBRARY_MAP.md` (本文件)
- ✅ `BUG.md` V0.4.0 updates

ADR-005: NDS 无 FPU, ARM9 lib 在 0x0204C000+ 全是 soft float (跳过)
