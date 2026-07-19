# ROM → TS 翻译 Bug 跟踪

> 最后更新: 2026-07-16

## ✅ 已修复

### 1. LZSS nibble 分配颠倒 (game/resource/Lzss.ts)
- **ROM 位置**: `$9DFE` (不是 `$100A0`，`$100A0` 是精灵 VDP 构造函数)
- **成因**: offset/length 的 nibble 取反了
- **修复**: 
  - offset: `b0 | ((b1 & 0xF0) << 4)`  ← 之前 `((b1 & 0x0F) << 8) | b0`
  - length: `(b1 & 0x0F) + 2` (范围 2-17)  ← 之前 `(b1 >> 4) + 3`
- **补全细节**: 窗口用 `$20` 填充 4096B、写入位置 `$0FEE`、literal/back-ref 都回写窗口

### 2. Demo 路径没加载资源 (game/rom/RomTaskSystem.ts)
- **成因**: `DEMO_LOAD` 只做状态跟踪，不调 `decompressResource`
- **ROM 行为**: `$CA72` → `move.w #$8001,d0; jsr $99B2` 解压字体/tile 到 VRAM
- **修复**: DEMO_LOAD 中加入资源 $8001 解压 + VRAM DMA

### 3. VDP 寄存器未设置 → 黑屏 (game/rom/RomTaskSystem.ts)
- **成因**: `_transl_C7F6()` 只设了窗口位置寄存器 ($11/$12)，缺显示使能/平面地址/平面尺寸
- **修复**: 补充 Reg $01 (Display Enable + DMA + VInt), Reg $0C (H40 mode), Reg $02/$04/$10/$07/$0F

### 4. CRAM 调色板全零 → 全黑 (game/rom/RomTaskSystem.ts)
- **成因**: `pushSceneCramUpdate()` 源 `DISPLAY_LIST` 被 `initDisplayList()` 清零且从未填充
- **修复**: 绕过 ROM 场景系统，`_loadTitleCram()` 直接写入标题画面 64 色调色板到 CRAM

### 5. Plane A nametable 空白 → 无 tilemap (game/rom/RomTaskSystem.ts)
- **成因**: 资源 $8001 tiles 加载到 VRAM $0000，但 nametable ($C000) 未填充任何映射
- **修复**: `_initPlaneANametable()` 填充 64×32 cell 顺序 tile 映射

## ⚠️ 待修复

### 6. CRAM DMA 长度 bug (game/rom/RomDisplayQueue.ts)
- `_cmdCramDma()`: `lenWords = (dmaParam >> 1) = 32`，应读 offset+8 的 count 字段 (64)
- **影响**: 通过显示队列加载 CRAM 时只传一半 (已绕过，当前不触发)

### 7. Demo 场景完整初始化缺失
- ROM 子程序 `$9EC4`/`$FA38`/`$10C4C`/`$C7B8` 均未翻译
- **影响**: Demo 能显示 tiles 但不会有完整的场景/角色/动画

### 8. 反汇编错误 (rom.asm)
- 向量表被当 `ori.b` 指令 ($0000-$00FF)
- ROM 头 ASCII 被当代码 ($0100-$01FF)
- Z80 音乐数据被当 68K 代码 ($1DDC8-$1FFFF)
- LZSS 函数曾被错标在 `$100A0`