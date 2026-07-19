# Langrisser II ROM Disassembly Analysis

> Source: rom.asm (1,590,675 lines, 2MB ROM), split into logical segments
> Date: 2026-07-16

## Segment Index

| # | File | ROM | Lines | Type | Description |
|---|---|-----|-------|------|-------------|
| 0 | [00_00_vectors.asm](./00_00_vectors.asm) | $000000–$000200 | 372 | ⚡DATA | 中断向量表 & ROM 头 |
| 1 | [01_01_boot.asm](./01_01_boot.asm) | $000200–$008000 | 21,537 | CODE | 启动代码 |
| 2 | [02_02_reset.asm](./02_02_reset.asm) | $008000–$0082B0 | 402 | CODE | Reset 入口 ($800A) |
| 3 | [03_03_vblank.asm](./03_03_vblank.asm) | $0082B0–$008600 | 413 | CODE | VBlank/HBlank 中断 |
| 4 | [04_04_joypad.asm](./04_04_joypad.asm) | $008600–$0086B0 | 109 | CODE | 控制器输入 |
| 5 | [05_05_dma_init.asm](./05_05_dma_init.asm) | $0086B0–$008A70 | 543 | CODE | DMA 子系统初始化 |
| 6 | [06_06_display_queue.asm](./06_06_display_queue.asm) | $008A70–$009020 | 1,033 | CODE | 显示队列 & DMA 主入口 |
| 7 | [07_07_input_dma.asm](./07_07_input_dma.asm) | $009020–$009430 | 581 | CODE | 输入状态 & VDP DMA 传输 |
| 8 | [08_08_task_scheduler.asm](./08_08_task_scheduler.asm) | $009430–$0097E0 | 591 | CODE | 任务调度器 & 通用 DMA |
| 9 | [09_09_resource_loader.asm](./09_09_resource_loader.asm) | $0097E0–$00FFF0 | 14,142 | CODE | ★ 资源加载系统 (LZSS/RLE/位平面) ★ |
| 10 | [10_10_rle_bitplane.asm](./10_10_rle_bitplane.asm) | $00FFF0–$010130 | 170 | CODE | Nibble RLE & 位平面解压 |
| 11 | [11_12_transition.asm](./11_12_transition.asm) | $00C7F0–$00C810 | 18 | CODE | 过渡效果 |
| 12 | [12_13_game_init.asm](./12_13_game_init.asm) | $00C810–$00CC00 | 504 | CODE | ★ 游戏主初始化 & 标题画面分流 ★ |
| 13 | [13_14_title_menu.asm](./13_14_title_menu.asm) | $00CC00–$010000 | 6,328 | CODE | 标题菜单 & Demo 逻辑 |
| 14 | [14_15_game_body.asm](./14_15_game_body.asm) | $010000–$01C800 | 27,193 | CODE | 游戏主体逻辑 |
| 15 | [15_16_task_chain.asm](./15_16_task_chain.asm) | $01C800–$01CA00 | 271 | CODE | ★ 任务链: 阶段分派器 ★ |
| 16 | [16_17_gap_to_resource.asm](./16_17_gap_to_resource.asm) | $01CA00–$0B0000 | 437,665 | CODE | (中间区域: 游戏数据/代码延续) |
| 17 | [17_18_resource_table.asm](./17_18_resource_table.asm) | $0B0000–$0B8000 | 24,257 | ⚡DATA | DATA: 资源指针表 |
| 18 | [18_19_compressed_data.asm](./18_19_compressed_data.asm) | $0B8000–$1DC000 | 947,020 | ⚡DATA | (压缩图形资源数据) |
| 19 | [19_20_z80_music.asm](./19_20_z80_music.asm) | $1DC000–$200000 | 114,543 | ⚡DATA | DATA: Z80 音乐数据 |

## Coverage: 1,597,692 / 1,590,675 lines (100.4%)

## Key Findings

### 1. LZSS Decompressor (Segment 09)
- **Address**: $9DFE–$9EC2 (NOT $100A0!)
- **Encoding**: `offset = byte0 | ((byte1 & 0xF0) << 4)`, `length = (byte1 & 0x0F) + 2`
- **Window**: 4096B @ $FF0000, pre-filled with $20
- **Previously mislabeled**: $100A0 is actually sprite VDP command constructor

### 2. Resource Type Jump Table ($99F0)
| Type | Offset | Target | Algorithm |
|------|--------|--------|-----------|
| 1 (Nibble RLE) | $0048 | $9A38 | 4bpp tile RLE |
| 2 (Bitplane) | $0220 | $9C10 | Bitplane decompress |
| 3 (LZSS) | $040E | $9DFE | ★ LZSS decompress |

### 3. $C9AA Split Point (Segment 13)
- ROM default: `move.w #$FFFF,($FF78FA)` → Demo/Attract mode on boot
- User input → $FF78FA cleared → normal title screen path

### 4. Known Disassembly Errors
1. Vectors ($000000-$0000FF): SSP/vector addresses → mis-disassembled as `ori.b`
2. ROM header ($000100-$0001FF): ASCII → mis-disassembled as instructions
3. Sprite frame data: Display list data → mis-disassembled as code
4. Z80 music ($1DC000-$1FFFFF): Z80 binary → mis-disassembled as 68K code