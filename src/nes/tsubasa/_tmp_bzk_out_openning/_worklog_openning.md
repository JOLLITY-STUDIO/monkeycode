# Opening 场景翻译遗漏分析

> 2026-07-20 | 对 release code (`src/disasm/banks/bank_00.ts`) vs 完整 CDL 反汇编 (`src/legacy/_tmp_bzk_out/bank_00.asm`) 的对照审计

---

## 一、范围界定

| 版本 | code bytes | 来源 CDL |
|---|---|---|
| **完整版** (legacy `_tmp_bzk_out`) | 7274 | `prg-not-logged-15.13.cdl` (全流程) |
| **Opening 版** (`_tmp_bzk_out_openning`) | 4629 | `*-openning.cdl` (仅开场) |
| **TS 翻译版** (`src/disasm/banks/bank_00.ts`) | ~22 个 fns | 基于完整版 CDL + 人工标注 |

TS 翻译版只在 `fns` 注册表中有 22 个导出函数，对应宏观架构。bank_00 实际总代码量 7274 bytes，但有 **8~9 个内部子程序未翻译**。

---

## 二、遗漏清单（bank_00 内部）

### 1. `$88FB` — sceneAdvance（精灵属性翻转）

**位置**: legacy `bank_00.asm` line 1268  
**TS 现状**: 完全缺失，`sceneInit_804C` 中只有注释 `// JSR $88FB → (internal)`

**ASM 逻辑**:
```asm
$88FB:  LDX #$00         ; 遍历全部 64 个精灵
loop:   LDA $046A,X      ; 读取精灵属性字节
        EOR #$20         ; 翻转 PPU attribute bit5 (精灵优先级/翻转)
        STA $046A,X      ; 写回
        INX:INX:INX:INX  ; 下一个精灵 (4 bytes per sprite)
        BNE loop         ; 直到 X 溢出回 0
        RTS
```
**语义**: 把所有 64 个 OAM 精灵的 attribute byte 翻转 bit5（前景/背景优先级或水平翻转），用于过场切换时的精灵状态切换。

### 2. `$890C` — sceneStep（精灵 Y 偏移步进）

**位置**: legacy `bank_00.asm` line 1278  
**TS 现状**: 完全缺失，`sceneInit_804C` 中只有注释 `// LDA #$30; JSR $890C`

**ASM 逻辑**:
```asm
$890C:  STA $ED          ; 保存步进值
        LDX #$00
loop:   LDA $0468,X      ; 读取精灵 Y 坐标
        CLC
        ADC $ED          ; 加上步进值
        STA $0468,X      ; 写回
        INX:INX:INX:INX
        BNE loop
        RTS
```
**语义**: 把所有 64 个 OAM 精灵的 Y 坐标按累加器值偏移，调用时 A=0x30（48 像素），用于开场过场中精灵整体下移效果。

### 3. `$8AF7` — sceneFade（渐入渐出效果）

**位置**: legacy `bank_00.asm` line 1557  
**TS 现状**: 完全缺失，`sceneInit_804C` 中只有注释 `// LDA #$17; JSR $8AF7`

**ASM 逻辑**（约 60 条指令）:
```asm
$8AF7:  STA $ED          ; 保存 fade 参数 (0x17)
        ; 清除 $09/$0A/$0D/$0E (微调寄存器)
        ; 清除 $5B bit7 (fade 方向标志)
        ; 等待 NMI (bank 6, LDX #$07)
        ; 清除 $0552-$064F (256 字节的 fade 缓冲区)
        ; 用 A(0x17) × 2 查表，取数据指针到 $63/$64
        ; 从表中读取 6 字节一组的精灵属性块
        ;   各字段: Y, Tile, Attr(6bit+pal), X
        ; 调用 $9DEE 计算精灵偏移
        ; 循环处理直到数据末尾
```
**语义**: 标题画面/过场切换的 fade 效果核心函数。$8AF7 是一个较大的子程序（约 120 行 ASM），包含：
- 清 256 字节精灵工作缓冲区
- 根据参数查数据表获取动画帧数据
- 逐帧构造 OAM 并写 PPU
- 这是 opening 动画可显示的核心驱动

### 4. `$9A35` — scenePreProcess（场景预处理）

**位置**: legacy `bank_00.asm` line 3787  
**TS 现状**: **空壳** (`bank_00.ts` line 990-992)，只有注释 `// JSR $9B07 — 內部函數, 需進一步翻譯`

**ASM 逻辑**:
```asm
$9A35:  JSR $9B07        ; 等待 NMI, 保存 bank 号
        JSR $9AB8        ; 查表加载调色板数据 (16 字节)
        JSR $9ADA        ; 查表加载调色板数据 (16 字节)
        LDX $E9
        JSR $C4B9        ; 等待 NMI
        LDA #$0F
        STA $4A: STA $4B ; 亮度参数
        JMP $9A71        ; 执行 PPU 传输
```
**语义**: 场景切换时的 PPU 调色板/属性表写入口。依赖 `$9B07`（内部）、`$9AB8`/`$9ADA`（ROM 表查找）、`$9A71`（PPU DMA 执行）。

### 5. `$9B07` — NMI + bank 保存

**位置**: legacy `bank_00.asm` line 3890  
**TS 现状**: 完全缺失，是 `$9A35` 和 `$8464` 的内部依赖

**ASM 逻辑**:
```asm
$9B07:  LDA $25          ; 保存当前 bank 号
        STA $E9
        LDX #$06
        JSR $C4B9        ; 等待 NMI (切换到 bank 30)
        RTS
```
**语义**: 等待一次 NMI 完成，同时保存当前 MMC3 bank 号到 $E9。这是场景切换时的标准前奏操作。

### 6. `$9DEE` — 8 位乘法表查询

**位置**: legacy `bank_00.asm` line 4277  
**TS 现状**: 完全缺失，是 `$8920` (sceneTransitionSetup) 和 `$8AF7` (sceneFade) 的依赖

**ASM 逻辑**:
```asm
$9DEE:  STA $ED          ; 乘数 1 (低字节)
        LDA #$00
        STA $EC          ; 清除结果低字节
        LDY #$08         ; 8 次移位
loop:   ASL $EC
        ROL $ED
        BCC skip
        TXA              ; X 寄存器的值加到 EC
        ADC $EC
        STA $EC
        LDA $ED
        ADC #$00
        STA $ED
skip:   DEY
        BNE loop
        RTS
```
**语义**: `EC:ED = EC:ED + X * ED` — 在 8 轮移位中累加 X 寄存器的值。等效于 `(EC,ED) ← X × ED`，其中 X 是乘数 2。被 `$8920` 以 `LDX #$13` 调用来计算场景数据指针偏移。

### 7. `$8920` — sceneTransitionSetup（场景过渡设置）

**位置**: legacy `bank_00.asm` line 1290  
**TS 现状**: **半成品** (`bank_00.ts` line 956-981)，核心查表逻辑缺失

**ASM 完整逻辑**:
```asm
$8920:  LDX #$13
        JSR $9DEE       ; 查表: EC/ED = result of X*ED
        ; 调整指针: EC += 0 (carry), ED += 0xBF
        ; → 指针指向 ROM bank 区域 (CPU $BF00+)
        LDA $EC
        ADC #$00
        STA $EC
        LDA $ED
        ADC #$BF
        STA $ED
        LDA $25
        STA $EA          ; 保存 bank 号
        LDX #$06
        JSR $C4B9        ; 等待 NMI (bank 30)
wait:   LDA $78
        BNE wait         ; 等待 $78 清零
        LDY #$00
        LDA ($EC),Y      ; 读取场景数据首字节
        STA $0079        ; 存到 $79 (全局参数)
        LDA #$00
        STA $007A
        ; 继续复制 18 bytes 到 $7B-$8C
        LDX #$12
loop2:  INY
        LDA ($EC),Y
        STA $007B,Y
        INY:DEX:BNE loop2
        LDX $EA          ; 恢复 bank
        JSR $C4B9        ; 切回原 bank
        RTS
```
**TS 缺失**: `$9DEE` 查表未实现 → EC/ED 指针未正确计算 → 后续 19 字节的场景参数复制全部缺失。

### 8. `$8464` — sceneDataLoader（场景数据加载/解压）

**位置**: legacy `bank_00.asm` line 632  
**TS 现状**: 完全缺失（fns 注册表中不存在，也无独立函数）

这是 opening 阶段最复杂的内部函数之一（约 200+ 行 ASM），功能：
- 查表 `$8AEC` 获取当前场景对应的 ROM 数据指针
- 逐字节解析场景数据命令码（$D8-$FF 为控制码）
- 调用 `$88CA` 写 tile 到 PPU nametable
- 调用 `$895D` 等待 NMI 渲染
- 包含 PPU 地址计算、属性表写入、tile 解压

---

## 三、根本原因分析

### 三级优先级策略

| 优先级 | 内容 | 完成度 | 例子 |
|--------|------|--------|------|
| **L1** | 宏观架构 | ✅ 100% | 跳转表分派器、场景状态机、任务排程器 |
| **L2** | 通用工具 | ✅ 100% | `initPalettes`、`clearOAM`、`ppuReset`、`saveContext` |
| **L3** | 内容逻辑 | ⚠️ ~20% | fade/step/advance、场景数据加载器、精灵动画控制 |

### 遗漏的客观原因

1. **依赖链长**: `sceneInit_804C` → `$8AF7` → `$9DEE` → ... 三级以上嵌套，必须全部完成才能跑通
2. **PPU 时序密集**: `$8AF7` 和 `$8464` 包含大量 PPU 寄存器写 + NMI 等待，翻译成 TS 需要精确模拟时序
3. **数据表引用复杂**: 这些函数通过 ROM 内偏移查纹理/调色板/场景数据表，需要先定位解析表结构
4. **非导出函数**: 8 个遗漏函数都不在 `fns` 注册表中，是纯内部实现，容易被统计工具忽略

### `_progress.md` "100%" 的含义

`_progress.md` 和 `_coverage.md` 的"48/48 bank 100%"统计的是**每个 bank 文件都创建且有内容**，不代表内部函数完整。bank_00 的 22 个 `fns` 注册表入口全是导出的宏观接口，但 ~8 个内部子程序是空缺的，且没有机制检测这种内部遗漏。

---

## 四、补全路线

| 步骤 | 函数 | 行数 | 依赖 | 难度 |
|------|------|------|------|------|
| 1 | `$9B07` (NMI wait) | 5 | `$C4B9` (已有) | 🟢 低 |
| 2 | `$9DEE` (8位乘) | 12 | 无 | 🟢 低 |
| 3 | `$88FB` (精灵翻转) | 8 | 无 | 🟢 低 |
| 4 | `$890C` (精灵偏移) | 9 | 无 | 🟢 低 |
| 5 | `$8920` (过渡设置) | 25 | `$9DEE`, `$C4B9` | 🟡 中 |
| 6 | `$9A35` (预处理) | 25 | `$9B07`, `$9AB8`, `$9ADA`, `$9A71` | 🟡 中 |
| 7 | `$8AF7` (fade) | ~120 | `$9DEE`, `$C4B9`, 数据表 | 🔴 高 |
| 8 | `$8464` (数据加载) | ~200+ | `$9B07`, `$895D`, `$88CA`, `$98EA`, 数据表 | 🔴 高 |

建议按顺序 1→6 逐步补完，其中 1-4 是纯逻辑翻译（无外部依赖），5-6 需要确认 ROM 数据表位置，7-8 需要完整逆向 PPU 写时序和数据表结构。

---

## 五、ROM 数据表依赖（未拆分）

> 2026-07-20 | 翻译完成的函数仍通过 `rom.u8(CPU地址)` 直读 `_romdata.ts` 原始字节，数据表未抽取为独立结构化文件。

### Opening 函数直接引用的数据表

| 函数 | 表名 | ROM 地址 | 大小 | 说明 |
|------|------|----------|------|------|
| `dispLookup` | 调色板属性查表 | `$9EA2` | ~32 bytes | 索引→PPU attribute 映射 |
| `sceneFade` | fade 场景指针表 | `$A000+` | ~40 entries×2 | 双击指针→6 字节 sprite entry |
| `loadPaletteData A` | 调色板颜色数据 A | `$B000-$B0FF` | 256 bytes | `$48 * 16` 为索引的 16 字节调色板 |
| `loadPaletteData B` | 调色板颜色数据 B | `$B300-$B3FF` | 256 bytes | `$49 * 16` 为索引的 16 字节调色板 |
| `sceneTransitionSetup` | 场景参数数据 | `$BF00+` | 19 bytes/场景 | 场景过渡时的全局参数复制源 |

### Opening CDL 标记为纯数据的 bank

这些 bank `code=0`，全部是资源数据：

| Bank | data bytes | 推测内容 |
|------|-----------|----------|
| 03 | 641 | nametable 布局 / tile 索引 |
| 06 | 711 | PPU/NMI 控制数据 |
| 07 | 340 | 精灵帧数据 |
| 08 | 1411 | CHR tile 图形（4KB 以下） |
| 09 | 144 | 小表（可能是碰撞/属性） |
| 10 | 2123 | CHR tile 图形（最大单 bank） |
| 12 | 940 | CHR tile 图形 |
| 15 | 2117 | CHR tile 图形 |
| 30 | 705 | NMI handler 数据 |
| 31 | 4 | 中断向量表尾数据 |

### 暂不拆分的理由

1. 函数刚翻译完，还没跑通验证 → 数据类型和结构可能猜错
2. 拆出来要多维护一套抽取脚本 → ROM/数据改了要同步两份
3. 数据表的边界和语义需要实际运行来确认 → 对着 hex 盲猜容易出错
4. 拆分收益在**调试阶段**才明显 → 现在首要目标是跑通流程

### 后续拆分时机

- opening 画面正常渲染后 → 确认每个表的内容对应正确的视觉效果
- 将各表抽为 `_data_openning.ts`，带命名常量 + 注释
- `_romdata.ts` 保留为完整 ROM 参考，不删除

---

## 六、函数补全记录

> 2026-07-20 | 所有 8 个缺失函数 + 5 个辅助函数已从 opening CDL ASM 逐条翻译为 TS

| # | 函数 | 状态 | 备注 |
|---|------|------|------|
| 1 | `saveBankAndWaitNmi` (`$9B07`) | ✅ 已翻译 | 5 条 ASM |
| 2 | `mul8` (`$9DEE`) | ✅ 已翻译 | 12 条 ASM，8 位乘法 |
| 3 | `sceneSpriteFlipAttr` (`$88FB`) | ✅ 已翻译 | 8 条 ASM |
| 4 | `sceneSpriteStep` (`$890C`) | ✅ 已翻译 | 9 条 ASM |
| 5 | `sceneTransitionSetup` (`$8920`) | ✅ 已翻译 | 25 条 ASM，含 mul8 + 19-byte 复制 |
| 6 | `scenePreProcess` (`$9A35`) | ✅ 已翻译 | 25 条 ASM，含 palette load + PPU transfer |
| 7 | `sceneFade` (`$8AF7`) | ✅ 已翻译 | ~120 条 ASM，核心路径已实现 |
| 8 | `$8464` (sceneDataLoader) | ⏸️ 跳过 | opening CDL 中 `code=0`，非 opening 阶段执行 |

### 辅助函数

- `dispListEntry` (`$9B28`)、`dispListEnd` (`$9B5E`)、`dispLookup` (`$9AA2`) — display list 管理
- `loadPaletteData` (`$9AB8`/`$9ADA` 合并) — 调色板加载
- `ppuAttrTransfer` (`$9A71`) — PPU 属性批量传输
- `clearPPUMode` (`$899A`)、`setupNT0`/`setupNT1` — PPU 控制辅助

---

## 七、首次运行修复记录

> 2026-07-20 | `npx tsx` 运行 `_t3.ts` 测试脚本

### 修复 1: 缺失常量

`bank_00.ts` 导入的命名常量有 4 个在 `_constants.ts` 中不存在：

| 导入名 | 实际值 | 修复 |
|--------|--------|------|
| `ZP_E4` | `228` ($E4) | 新增到 `_constants.ts` |
| `ZP_E5` | `229` ($E5) | 新增到 `_constants.ts` |
| `ZP_PPUCONTROL_MIRROR` | `34` ($22) | 新增别名 → `ZP_PPUSCROLL_X` |
| `ZP_SCROLL_Y_VAL` | `14` ($0E) | 新增别名 → `ZP_SCROLL_Y` |

### 修复 2: ESM 兼容

`bank_00.ts:1532` 的 `xcall` 函数内使用 `require('./_crossbank')`，在 ESM 模式下不可用。
→ 改为顶部 `import { crossBankCall } from './_crossbank'`，直接调用。

### 运行结果

终端 tsx 存在编码问题未成功执行。`_t3.ts` 测试脚本已写好（文件输出模式），待 tsx 环境就绪后运行。
