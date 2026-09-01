# ARM7 完整反汇编报告 (V0.3.0)

> 来源: `scripts/disasm_full_arms.py` 用 capstone 5.0.7
> 完整产物: `rom-data/disasm-arm7-full.txt` (3.4 MB, ARM-mode pass)
> 模式切换表: 在 `rom-data/mode-switches.json` 中 ARM7 段部分

## 1. 范围

| 字段            | 值                              |
| --------------- | ------------------------------- |
| src bin         | `rom-data/arm7.bin` (262 144 B) |
| RAM dst base    | `0x02380000`                    |
| RAM dst 范围    | `0x02380000..0x023C0000` (256 KB) |
| entry 第一条指令 | `0x02380000: and r1, r1, #0xff` |
| 反汇编模式      | ARM-mode (主) + Thumb-mode (辅) |

### 1.1 解码统计

| Pass      | 真指令 | skipdata | 文件总 line |
| --------- | ------ | -------- | ----------- |
| ARM-mode  | 62 590 |  2 946   |  65 536     |
| Thumb-mode| 121 743|  4 747   | 126 490     |

注: ARM7 256 KB 几乎被**填满** (skipdata 仅 2.9K); 这与 NDS ARM7 binary 通常固实用于 touch/audio/IPC handler 一致 — **不像 ARM9 含大量未初始化 padding**.

## 2. Entry — 0x02380000 (前 30 lines)

```armasm
02380000  ff1001e2  and r1, r1, #0xff        ; r1 &= 0xFF — IO 寄存器 byte 字段
02380004  1f1001e2  and r1, r1, #0x1f        ; r1 &= 0x1F — 5-bit field
02380008  810180e1  orr r0, r0, r1, lsl #3   ; r0 |= r1 << 3
0238000c  0300c5e5  strb r0, [r5, #3]        ; *(r5+3) = r0
02380010  0300d5e5  ldrb r0, [r5, #3]        ; reload
02380014  0200c0e3  bic r0, r0, #2           ; 清 bit 1
02380018  0300c5e5  strb r0, [r5, #3]        ; 写回
0238001c  120000ea  b   #0x238006c           ; 跳主循环
02380020  0400a0e1  mov r0, r4
02380024  50fbffeb  bl  #0x237ed6c           ; touch_sample
02380028  000050e3  cmp r0, #0
0238002c  0e00001a  bne #0x238006c           ; 有触摸 → 主循环
02380030  483095e5  ldr  r3, [r5, #0x48]     ; 检查 callback
02380034  000053e3  cmp  r3, #0
02380038  22b0c505  strbeq fp, [r5, #0x22]
0238003c  0400000a  beq  #0x2380054
02380040  0500a0e1  mov  r0, r5              ; r0 = ctx
02380044  0710a0e1  mov  r1, r7              ; r1 = ??? (topic?)
02380048  4c2095e5  ldr  r2, [r5, #0x4c]     ; r2 = callback arg
0238004c  0fe0a0e1  mov  lr, pc              ; LR = PC (C caller save)
02380050  13ff2fe1  bx   r3                  ; tail-call 用户 callback
02380054  04009de5  ldr  r0, [sp, #4]
02380058  b402c5e1  strh r0, [r5, #0x24]
0238005c  0300d5e5  ldrb r0, [r5, #3]
02380060  0100c0e3  bic  r0, r0, #1
02380064  0300c5e5  strb r0, [r5, #3]
02380068  820000ea  b    #0x2380278          ; 跳到 r5/+0x278 初始化后回调
```

### 2.1 Entry 模式归纳

1. **入口作用**: 不是 `_start` 全局 entry, 而是 **IPC FIFO 接收 / 触摸响应 callback**
   - 写 r5+3 (一个 byte 寄存器) - 是 IPC FIFO 寄存器之一 (power btn / X/Y btn)
   - 读 r5 状态字, mask 某 bit, 写回
2. **r5 = ctx 指针** (类似 ARM9 风格)
   - r5+0x48 = callback function pointer
   - r5+0x4c = callback argument
   - r5+3 = control register byte
3. **tail-call `MOV LR, PC; BX r3`** — 直接转 user callback (省略 LR 重设)
4. **跳 0x238006c (主 loop)** — 整体 entry 0x2380000 + 30 字节后跳到主 loop, 主 loop 中才做真正 ARM7 work loop

## 3. 主 loop 起点 — 0x0238006C

```armasm
0238006c  0900d5e5  ldrb r0, [r5, #9]
02380070  8010a0e1  lsl  r1, r0, #1
02380074  18029fe5  ldr  r0, [pc, #0x218]     ; 0x2380294 (sint16 偏移表)
02380078  f10090e1  ldrsh r0, [r0, r1]        ; r0 = table[r0 << 1] (signed 16)
0238007c  008088e0  add  r8, r8, r0           ; r8 += offset
02380080  0810d5e5  ldrb r1, [r5, #8]
02380084  0500d5e5  ldrb r0, [r5, #5]
02380088  000041e0  sub  r0, r1, r0           ; delta = byte[r5+8] - byte[r5+5]
0238008c  00a38ae0  add  sl, sl, r0, lsl #6   ; sl += delta << 6 (累积)
02380090  0500a0e1  mov  r0, r5
02380094  0610a0e1  mov  r1, r6
02380098  56ffffeb  bl   #0x237fdf8          ; blit_partial() ?? (191KB 处)
0238009c  008088e0  add  r8, r8, r0
023800a0  0500a0e1  mov  r0, r5
023800a4  0610a0e1  mov  r1, r6
023800a8  72fdffeb  bl   #0x237f678          ; 另一 helper
023800ac  00208ae0  add  r2, sl, r0
023800b0  fc00d5e1  ldrsh r0, [r5, #0xc]
023800b4  001088e0  add  r1, r8, r0
023800b8  f600d5e1  ldrsh r0, [r5, #6]
023800bc  008081e0  add  r8, r1, r0
023800c0  fe00d5e1  ldrsh r0, [r5, #0xe]
023800c4  00a082e0  add  sl, r2, r0
023800c8  0500a0e1  mov  r0, r5
023800cc  0610a0e1  mov  r1, r6
023800d0  41fdffeb  bl   #0x237f5dc          ; 第三个 helper
```

### 3.1 主 loop 模式归纳

1. r8 / sl 是游标 (slide cursor, e.g. coordinate)
2. 通过 `[pc, #0x218]` pc-relative 查表 → table lookup
3. r5 = ctx struct (≤0x28 byte 字段)
4. 调 3 个 helper:
   - `0x237fdf8` — 类似 blit/transfer
   - `0x237f678` — 类似 sort/check
   - `0x237f5dc` — 类似 diff/calc
5. **状态机驱动**: 主 loop 内 多次条件分支 (cmp + beq) 说明是 event-driven FSM

## 4. Top 12 Library Functions (ARM7)

| Address       | Callers | 推测职责                                       |
| ------------- | ------- | ----------------------------------------------- |
| `0x023913B8`  | 92      | IPC FIFO 接收 handler (频繁注册 + 调用)        |
| `0x02391398`  | 77      | 兄弟 helper (同模块)                            |
| `0x02384350`  | 53      | touch panel X/Y 读取 + ACK                      |
| `0x023920B0`  | 35      | power / lid close handler                       |
| `0x0239EEF4`  | 33      | SPI transfer (touch / mic / WiFi 共用)          |
| `0x0238863C`  | 26      | key sample (KEYINPUT register read)             |
| `0x023942A4`  | 25      | RTC 时钟读取                                    |
| `0x0239F164`  | 24      | 串口 / FIFO 控制                                |
| `0x02391B48`  | 22      | cart-slot 检测                                  |
| `0x02399594`  | 21      | GBA slot 检测 (legacy DS backward compat)       |
| `0x02391CE4`  | 21      | mic sample                                      |
| `0x02394548`  | 20      | SPI ACKing                                      |

## 5. Mode-Switch 分布

ARM7 整体是 ARM-mode dominant (主 lib 是 ARM, 触摸/按键 sample 用 ARM, 性能要求低; 只有极少数 freq-callback 用 thumb).
- ARM7 BLX direct: `0x239xxxx` 区域跟 ARM9 共用是 `gap (data area)`
- 实际 ARM7 BLX 主要跳到自身 256 KB 内的 helper
- 样本 0x02380000 起始 30 行无 thumb switch

## 6. 跟 ARM9 调用关系

ARM7 主 loop `bx r3` 风格跳 user callback (likely ARM9 端 shared IRQ handler via IPC FIFO 0x0400010x), but 静态反汇编无法解析 IPC 双方通讯地址.

下一步 V0.4+ 跨 ARM9↔ARM7 调用重建需要
1. ARM9 端 IPC FIFO send handlers (`0x02000000+ I/O register write 0x04000104`)
2. ARM7 端 IPC FIFO recv handlers (本节 main loop)
3. 跨距离中 message 0..15 channel 分类

## 7. 已知 / 未做 (V0.4+)

- [ ] **完整 ctx struct 反推**: r5 字段 (offset/size) 全 layout → 推测每个 field 含义
- [ ] **Touch panel 寄存器地址**: 0x02384350 之类的 helper 跟 SPI bus 0x040xxxxx 关联
- [ ] **Audio handler**: ARM7 主 loop 是否调 SPI → ARM9 audio buffer 写? 现未观察到 audio writereg
- [ ] **WiFi / Cart 移植**: ARM7 BIOS-call 模式 (swi 0x1F/0x16/...) 分析
- [ ] **完整 ARM7 函数 prologue/epilogue**: 函数字典 + 栈帧重建 (后续虚拟化框架依赖)

## 8. 产物文件

- [ `rom-data/disasm-arm7-full.txt` ] — 3.4 MB, 全部 ARM-mode pass
- [ `rom-data/mode-switches.json` ] (含 ARM7 段)
- [ `rom-data/function-calls.json` ] (含 ARM7 段)
- [ `scripts/disasm_full_arms.py` ] — repro 工具
