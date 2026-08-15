# TECMO 场景说明书 (tsubasa-code 实际运行版)

## 涉及文件

| 文件 | 角色 |
|------|------|
| `src/tsnes/tsubasa-code/cpu.ts` | 拦截 PC=$8000，调 `tsDispatch()` 替代 7 条 6502 指令 |
| `src/tsnes/tsubasa-code/_cpu_ctx.ts` | TS handler 透过 `CpuCtx` 读/写 CPU 内存+寄存器 |
| `src/tsnes/tsubasa-code/_6502asm.ts` | `asm` 模板字面量 → 6502 hex 字节数组 |
| `src/tsnes/tsubasa-code/prg_banks/bank_00.ts` | 整个 8KB bank: 分派器+场景循环+脚本引擎+调度器 |
| `src/tsnes/tsubasa-code/prg_banks/bank_06.ts` | TECMO 调色板 ROM 数据表 |
| `src/tsnes/tsubasa-code/prg_banks/bank_07.ts` | TECMO 精灵/动画 ROM 数据表 |
| `src/tsnes/tsubasa-code/prg_banks/bank_30.ts` | MMC3 系统库 (NMI/PPU/RNG) |
| `src/tsnes/tsubasa-code/prg_banks/bank_31.ts` | RESET 启动+中断向量 |
| `src/tsnes/tsubasa-code/tsubasa_nes.ts` | 完整封闭 NES 实例，内建 ROM |

---

## 一、启动链路 (到达 $8000)

```
RESET → $FFF0 (bank_31 的中断向量) → bank_30 系统初始化
       → MMC3 R6 = 0 (把 bank_00 映射到 $8000-$9FFF)
       → PC 走到 $8000
```

`TsubasaNes` 加载时把完整的 32 个 8KB PRG bank 注入 `this.rom.rom`。MMC3 R6 寄存器控制 `$8000-$9FFF` 映射哪个 bank，初始化为 0 就是 bank_00。

---

## 二、$8000 拦截点 — 真正被消化的第一条指令

### 原来 6502 该做什么 (bank_00 $8000-$800C)：

```asm
LDA $27      ; 读跳转索引
ASL A        ; ×2
TAX
LDA $800E,X  ; 查跳转表低字节
PHA
LDA $800D,X  ; 查跳转表高字节
PHA
RTS          ; 弹出并跳转
```

### TsubasaCpu 实际做什么 (`cpu.ts` line 17-23)：

```typescript
export class TsubasaCpu extends CPU {
  emulate(): number {
    const pc = this.REG_PC + 1;

    // PC=$8000 → 不取字节不跑 6502，直接调 TS
    if (pc === 0x8000) {
      return this._tsHandler(pc, (ctx) => tsDispatch(ctx), 25);
    }

    return super.emulate();
  }
}
```

### tsDispatch 做什么 (`bank_00.ts` line 50-54)：

```typescript
export function tsDispatch(ctx: CpuCtx): void {
  const idx = ctx.load(0x27);           // 读内存 $27
  const addr = JUMP_VECTORS[idx] ?? 0;  // 查表
  ctx.setPC(addr);                       // 直接设 REG_PC
}
```

**跳转向量表** (`bank_00.ts` line 28)：

```typescript
const JUMP_VECTORS = [0x8165, 0x818A, 0x81AD, 0x81B4, 0x81DA];
```

| `$27` | 跳转目标 | 功能 |
|-------|----------|------|
| 0 | `$8165` | 场景初始化/前推 |
| 1 | `$818A` | 计时比较 `$28` vs `$29` |
| 2 | `$81AD` | 直接设 `$27=3` |
| 3 | `$81B4` | 再查计时，可 advance |
| 4 | `$81DA` | 最终计时检查，advance scene |

> **关键**：`_tsHandler` 还处理了 NMI/IRQ 中断逻辑，handler 执行完后 CPU 的 REG_PC 已被 `setPC` 改到目标地址，下一轮 `emulate()` 就从该地址正常执 6502 字节码。

---

## 三、场景状态机主循环 (`$8017-$82EC`)

`bank_00.ts` `buildsceneLoop()` 函数产出这一段 6502 hex 字节（line 372-419），是整个游戏的场景调度核心。

### 场景状态 `$26` (RAM ZP)

- `$26 = 0` → TECMO logo
- `$26` 递增 → 后续场景
- 某个场景退出时 `INC $26` 或查表跳转

### 主循环入口 `$8017`

从 `$8017` 起，6502 CPU 正常执行以下字节码（这是 `buildsceneLoop()` 产出的真实 hex）：

```
$8017: LDX #$02
$8019: JSR $C4B9      ← 跨bank调用: 切 bank_02 (NMI handler)
$801C: JMP $A203      ← 跳转到 bank_01 的 $A003 (场景状态入口)
$801F: JSR $9BA0      ← 关 PPU 渲染
$8022: LDA #$00
$8024: JSR $8464      ← 调 scene 数据加载 ($8464 是数据加载函数)
  ...
```

### 五个分派目标实际做什么

**`$8165` ($27=0) — 场景初始化/前推**：
```
$8166: LDA #$01
$8168: STA $27           ; 设 $27=1 为下轮入口
$816A: JSR $C56C         ; 调 C56C (bank_30 系统函数)
$816D: JSR $8285         ; 切换 bank_01 执行 $A00C
$8170: LDA $26
$8172: CMP $E4            ; $26 和 $E4 比较
$8174: BEQ/JMP ...        ; 决定是否推进场景
```

**`$818A` ($27=1) — 计时比较**：
```
$818B: LDA $28            ; 帧计数器
$818D: CMP $29            ; vs 目标值
$818F: BEQ $8196          ; $28 == $29 → 继续判断
$8191: BCS $8206          ; $28 >= $29 → 可能 advance
```
`$28` 是帧计数，`$29` 是目标。当 `$28 >= $29` 跳到 `$8206`，否则跳到 `$81E6` 做过渡。

**`$8206` — advance scene**：
```
$8206: LDX #$01
$8208: JSR $C4B9          ; 切 bank_01 ($8000)
$820B: JSR $A012          ; 调 bank_01 的 $A012
$820E: BIT $E0
$8210: BVS $821C
  ...
$8232: LDA $8442,X        ; 查表 $8442
$8235: BEQ $8243
  ...
$824B: INC $26            ; 场景号 +1 → 进下个场景
```

**`$81AD` ($27=2) — 直接设 $27=3**：
```
$81AE: LDA #$03
$81B0: STA $27
$81B2: JMP $8017          ; 回主循环
```

**`$81B4` ($27=3) / `$81DA` ($27=4) — 最终计时**：
类似 $27=1 的逻辑，再检查一次计时决定是否 advance。

---

## 四、脚本引擎 (`$82ED-$8397`)

`buildscriptEngine()` (line 423-519) 产出的真实 6502 hex：

```
$82ED: JSR $838A          ; 调子程序做 PPU 更新
$82F0: LDA $4C            ; 读状态字节
$82F2: BPL $82ED          ; bit7=0 → 继续等
$82F4: ASL A              ; bit7=1 → 有指令
$82F5: TAX
$82F6: LDA $B800,X        ; 查指令表低字节
$82F9: STA $EC
$82FB: LDA $B801,X        ; 查指令表高字节
$82FE: STA $ED
$8300: LDY #$00
$8302: LDA ($EC),Y        ; 读指令字节
$8304: BMI $8355          ; bit7=1 → 控制码
$8306: STA $E9            ; < $80 → 字符数据
...
```

**核心机制**：`$4C` 是一个信号字节：
- bit7=0 → 脚本引擎空转 `$82ED` (死等下一个命令)
- bit7=1 → 读取指令字节码，处理后设 `$4C=$00`，回到空转

带 bit7 的字节（≥`$80`）是**控制码**：
- `$80-$BF` (bit7,6=10): 写 RAM `$8E/$8F` + 跟帧延迟
- `$C0-$FF` (bit7,6=11): 跟调色板/属性相关

普通字节（`$00-$7F`）是 tile 数据，写进 PPU VRAM。

---

## 五、核心渲染基础设施

在讲 TECMO logo 怎么画之前，先搞清楚三个底层函数。

### 5.0 PPU 缓冲系统 (`$05E8`)

6502 的 PPU 只能在 VBlank 期间安全写入。游戏维护了一个 RAM 缓冲队列在 `$05E8`：

```
$05E8 缓冲槽格式 (每个槽 3+N 字节):
  [0] 控制字节 (bit6=1 表示待写入, bit7=?)
  [1] PPU 地址高字节
  [2] PPU 地址低字节
  [3..3+N-1] N 字节数据
```

`$0628` = 缓冲写指针 `$0629` = 状态标志 (bit6 = 缓冲忙)

NMI handler（bank_02）负责消费缓冲区：顺序读出 `[addr_H,addr_L,data...]`，发送 `$2006`/`$2006`/`$2007`*N 到 PPU。

### 5.1 `$9B28` — PPU 写命令入队

位于 `bank_00.ts` `buildbytecodeHandlers()` 内（ROM 偏移 ≈$9B28）：

```asm
$9B28: PHA                 ; 保存 PPU 地址高字节 (A)
$9B29: BIT $0629           ; 检查缓冲是否忙
$9B2C: BVC $9B37           ; 不忙 → 继续
$9B2E: LDA #$01
$9B30: JSR $9FA8           ; 等 1 帧 (NMI)
$9B33: PLA
$9B34: JMP $9B28           ; 重试
$9B37: AND #$3F            ; 地址高字节只取低 6 位 (PPU 只认 14 位地址)
$9B39: CLC
$9B3A: ADC $0628           ; + 滚动偏移
$9B3D: CMP #$3D            ; 超一行边界?
$9B3F: BCS $9B2E           ; 超了 → 等一帧
$9B41: PLA                 ; 还原地址高字节
$9B42: ORA #$40            ; 设 bit6 = 有数据待写
$9B44: STA $0629           ; 写控制标志
$9B47: TXA                 ; X = PPU 地址低字节
$9B48: LDX $0628           ; 取缓冲指针
$9B4B: STA $05EA,X         ; 槽[1] = addr_hi
$9B4E: TYA                 ; Y = ???
$9B4F: STA $05E9,X         ; 槽[2] = addr_lo
$9B52: LDA $0629
$9B55: AND #$BF            ; 清 bit6
$9B57: STA $05E8,X         ; 槽[0] = 控制字节
$9B5A: INX
$9B5B: INX
$9B5C: INX                 ; 指针 += 3 (跳过 3 字节头)
$9B5D: RTS
```

调用后 `$05E8+X` 指向数据区，调用者负责把 tile 数据字节直接写进 `$05E8,X`。

### 5.2 `$9B5E` — PPU 写命令封尾

```asm
$9B5E: LDA #$00
$9B60: STA $05E8,X         ; 写终止标记
$9B63: STX $0628           ; 更新缓冲指针
$9B66: LDA $0629
$9B69: AND #$BF            ; 清 bit6 (标记缓冲可消费)
$9B6B: STA $0629
$9B6E: RTS
```

### 5.3 `$98EA` / `$98E8` — 矩形填充

```asm
$98E8: LDA #$00            ; 入口1: 清零后调 $98EA
$98EA: STA $EB             ; $EB = 填充值 (tile index)
$98EC: LDA $4A             ; 大填充模式检查
$98EE: ORA $4B
$98F0: BEQ $992C           ; 0→简单填充路径 ($A92C)
$98F2: STY $E8             ; $E8 = 行数 (Y)
$98F4: STX $E9             ; $E9 = 列数 (X)
                           ; ($E6,$E7) = PPU 起始地址 (由调用者设)
$98F6: LDA $E9             ; 每行宽度
$98F8: LDY $E6             ;  Y = addr_lo
$98FA: LDX $E7             ;  X = addr_hi
$98FC: JSR $9B28           ; 入队: 写地址建立命令
$98FF: LDY $E9             ; 每行宽度
$9901: LDA $EB             ; 填充值
$9903: STA $05E8,X         ; 连续写 N 个字节到缓冲
$9906: INX
$9907: DEY
$9908: BNE $9903
$990A: JSR $9B5E           ; 封尾
$990D: LDA $E8             ; 检查行数标志
$990F: BPL $9916           ; bit7=0 → 不休眠
                           ; bit7=1 → LDA #$01; JSR $9FA8 (等 1 帧)
$9916: LDA $E6             ; PPU 地址 += 32 (下一行)
$9918: CLC
$9919: ADC #$20
$991B: STA $E6
$991D: LDA $E7
$991F: ADC #$00
$9921: STA $E7
$9923: DEC $E8             ; 行数--
$9925: LDA $E8
$9927: AND #$7F
$9929: BNE $98F6           ; 还有行 → 继续
$992B: RTS
```

**典型调用**：`LDY=行数 LDX=列数 LDA=$填充值 JSR $98EA`

### 5.4 `$9A71` — 调色板刷新

```asm
$9A71: LDA #$20           ; PPU addr = $20xx (>> 8)
$9A73: LDY #$00
$9A75: LDX #$3F           ; PPU addr = $3Fxx (lo: $3F00 + ...)
$9A77: JSR $9B28          ; 入队: 写调色板数据到 PPU $3F00
$9A7A: STX $E7            ; 保存数据指针
$9A7C: LDY #$00
$9A7E: LDA $062A,Y        ; 读 RAM 调色板 BG 部分 (16 字节)
$9A81: AND #$30           ; 取高 2 位 (保留 hue, 抹亮度)
$9A83: CLC
$9A84: ADC $4A            ; + 亮度控制 ($4A)
$9A86: JSR $9AA2          ; 查表转换并写入缓冲
$9A89: CPY #$10
$9A8B: BNE $9A7E          ; 循环 16 次
$9A8D: LDA $062A,Y        ; 读 Sprite 调色板 (16 字节)
$9A90: AND #$30
$9A92: CLC
$9A93: ADC $4B            ; + Sprite 亮度控制 ($4B)
$9A95: JSR $9AA2
$9A98: CPY #$20
$9A9A: BNE $9A8D          ; 循环 16 次
$9A9C: LDX $E7
$9A9E: JSR $9B5E           ; 封尾 → 下一次 NMI 就写入 PPU
$9AA1: RTS
```

### 5.5 `$9A43` — 调色板全亮写入

```asm
$9A43: LDA #$0F            ; $0F = 全亮度
$9A45: STA $4A
$9A47: STA $4B             ; BG/Sprite 亮度都设最大
$9A49: JMP $9A71           ; → 刷新调色板
```

### 5.6 `$838A` — 等一帧 (NMI/VBlank)

```asm
$838A: LDX #$02
$838C: JSR $C4B9            ; bank swap → bank_02 (NMI handler 所在)
$838F: JSR $A215            ; 调 NMI handler 核心 (消费 PPU 缓冲)
$8392: LDX #$06
$8394: JSR $C4B9            ; bank swap → bank_06
$8397: RTS
```

**这就是「等一帧」**：切到 NMI handler bank 触发缓冲消费再切回来。每调用一次，所有待处理的 `$05E8` 缓冲命令就写进真正的 PPU 寄存器。

---

## 六、TECMO 场景的数据来源

TECMO 画面 = 调色板 (bank_06) + 精灵 (bank_07) + Nametable tile (字节码解释器) 三者合成。

### 6.1 调色板 — bank_06

场景初始化时：
1. `MMC3 R7 = 6` 切换 bank_06 到 `$A000`
2. 函数 `$9AB8`/`$9ADA` 读 `ROM $B000/$B300` 查表 → RAM `$062A` (32 bytes)
3. `$9A71` 或 `$9B28` 设 PPU addr=`$3F00` 并通过缓冲队列写入

PPU 调色板地址布局：
```
$3F00: 全局背景色
$3F01-$3F03: BG palette 0
$3F05-$3F07: BG palette 1
$3F09-$3F0B: BG palette 2
$3F0D-$3F0F: BG palette 3
$3F11-$3F13: Sprite palette 0 (虽然读 $062A，但 PPU 镜像到 $3F01)
$3F15-$3F17: Sprite palette 1
$3F19-$3F1B: Sprite palette 2
$3F1D-$3F1F: Sprite palette 3
```

> 调色板不是实时写 PPU，而是先写 RAM `$062A`，然后 `$9A71` 在 VBlank 期间把 `$062A` 批量拷贝到 PPU `$3F00`（通过 `$05E8` 缓冲队列）。

### 6.2 精灵 — bank_07

1. `MMC3 R7 = 7` 切换 bank_07 到 `$A000`
2. 读 `ROM $A000 + entry_idx*2` → 精灵数据起始指针
3. 逐 entry 读 4 字节: `[Y, tile#, attr, X]`
4. 写入 RAM `$0468` (OAM shadow, 256 bytes = 64 精灵)
5. NMI handler 通过 `$4014` DMA → PPU OAM

TECMO 场景只用极少量精灵：主要是那个闪烁星点效果（`$8734` 子程序循环写 OAM）。

### 6.3 Nametable tile — 字节码脚本驱动

TECMO logo 的 "THEATER" 等文字是怎么画到屏幕上的？

完整流程拆解：

```
[帧 N] NMI 触发
  → NMI handler (bank_02) 消费 $05E8 缓冲区 → PPU $2006/$2007
  → PPU 渲染管线上屏
  → scene loop $8017 重新执行
  → 脚本引擎 $82ED 被调用
    → 读 $B800 表取指令指针
    → 逐条解释字节码
    → 调 $9B28 入队 nametable 写入
    → 调 $838A 等 NMI → 触发缓冲消费 → 屏幕更新
  → $4C=$00 → 引擎空闲等下一帧
[帧 N+1] NMI 触发 ...
```

**每一帧，脚本引擎只跑有限数量的字节码**（最多 20 条，受 `INSTR_BUDGET` 限制），然后等下一帧 NMI 再跑。这就是逐帧动画的根本原因。

**字节码存储位置**：不在 bank_00，`$B800` 指向的指令表分散在多个 ROM bank（通过 MMC3 切 bank 读数据）。字节码格式：

```
普通字节 (< $80): tile 数据组
  结构: [tile_type][repeat_count][color0_opt][color1_opt][color2_opt]
  效果: 写 3 色 palette → $062A, 调 $9A43 刷新 → PPU, 等 NMI

控制字节 (≥ $80):
  bit1,0: 寄存器号 (0=$8E, 1=$8F, ...)
  bit7,6: 10→写寄存器+延时  11→调色板属性控制
```

**Tile 索引从哪里来？** 字节码中的 tile 索引是 nametable tile 编号（0-255），该编号对应 CHR ROM 中某个 8×8 的 2bpp 图形。TECMO 的 "T""E""C""M""O" 这五个字母的 tile 存储在 CHR ROM 的 bank_15/bank_24 中。PPU 渲染时用 tile 索引去读 CHR ROM 的像素数据 + 用对应 palette 上色。

---

## 七、TECMO logo 动画逐帧过程

基于场景初始化代码 (`$801F-$8087`) 反推：

```
帧 0-1: $26=0, $27=0 → 场景初始化
  $801F: JSR $9BA0      → 关 PPU 渲染 (关 $2001)
  $8022: LDA #$00
  $8024: JSR $8464       → 加载场景数据 (切 bank, 读 ROM 表)
  $8027: LDA #$01
  $8029: JSR $9FA8       → 等 1 帧
  $802C: LDA $1E         → $1E bit4=VBlank 标志
  $802E: AND #$10
  $8030: BEQ $8027       → 等到 VBlank 来
  $8032-$8046: 清零 $05,$06,$09,$0A,$11,$12,$0D,$0E,$4C,$5B
  $8048: LDA #$01
  $804A: STA $0700       → 设任务标志
  $804D: LDA $1B
  $804F: AND #$01
  $8051: BNE $807A       → 跳过初始化 (非初进)

  --- 首次进入 TECMO (bit0=0) ---
  $8053: JSR $9B11       → 初始化 MMC3 滚动
  $8056: LDA #$02
  $8058: JSR $9FA8       → 等 2 帧
  $805B: JSR $9B7F       → 清 OAM ($0468) + 清 Sprite buffer ($0200)
  $805E: JSR $98A0       → 清空所有 PPU 背景 nametable 写 $2007=$00
  $8061: LDA #$0D
  $8063: JSR $8297       → 脚本调用 ($8297 设字节码指针)
  $8066: LDA #$00
  $8068: STA $7B         → 设方向标志 = 0
  $806A: LDA #$17
  $806C: JSR $8AF7       → 场景数据加载 (从 bank_07 读精灵 ROM 表)
  $806F: LDA #$30
  $8071: JSR $890C       → OAM 偏移 (精灵位置整体移动)
  $8074: JSR $88FB       → OAM 翻转 (翻转精灵的 X/Y 属性位)
  $8077: JSR $9A35       → 设 $4A=B=$0F (全亮模式)

帧 2-N: logo 逐块上屏
  $807A: LDA #$00
  $807C: JSR $8920       → 初始化 nametable 数据指针 → RAM $78-$90
  $807F: LDA #$00
  $8081: STA $90         → 设 $90/$91 = nametable 起始 tile
  $8083: LDA #$02
  $8085: STA $91
  $8087: LDA $1B
  $8089: AND #$FE
  $808B: STA $1B         → 清除 bit0 标记
  $808D: LDA #$0A
  $808F: STA $ED         → palette 亮度动画值 = $0A (渐变效果!)
  $8091: LDA $ED
  $8093: STA $E6
  $8095: LDA #$22        → PPU addr $220A
  $8097: STA $E7
  $8099: LDY #$01
  $809B: LDX #$01
  $809D: LDA #$7F        → 写 tile index $7F (通常是空白/边距 tile)
  $809F: JSR $98EA       → 填充 1×1 矩形 ($98EA 矩形填充!)
  $80A2: LDA #$01
  $80A4: JSR $9FA8       → 等 1 帧
  $80A7: LDA $1E
  $80A9: AND #$3C        → 读控制器/输入状态
  $80AB: BEQ $80A2       → 无输入→循环等
  ...                     → 按键才继续
```

**关键发现**：

1. **`$98EA` 矩形填充**：TECMO logo 不是逐个 tile 写，而是 `$98EA` 批量填充矩形。例如 `LDX=1 LDY=1 LDA=#$7F JSR $98EA` 就是往指定 PPU 地址写 1×1 个 tile。

2. **palette 亮度渐变动画**：`$808D: LDA #$0A; STA $ED` 说明 `$ED` 控制亮度。`$80BC-$80C0` 中 `LDA $ED; EOR #$40; STA $ED` 切换亮度值。然后 `JSR $98E8`（rect fill 变体）把相同 tile 用新亮度重写一次。这就是 **TECMO logo 的 "闪烁/呼吸" 效果**：每帧切换亮度值重新填充。

3. **逐帧节奏**：每一帧都调 `$9FA8`（等 NMI），保证缓冲区在 VBlank 被消费、画面更新。`$98E8`/`$98EA` 内部也调 `$9B5E` 封尾（不等于让 NMI 消费），所以每个 `$9FA8` 调用之间，积累的 PPU 写命令在下一 NMI 全部上屏。

4. **故事板模式**：`$82ED` 脚本引擎用 `$4C` bit7 接收外部指令（来自 `$8297`/`$8285` 等调用的字节码表），配合 `$98EA` 矩形填充实现 logo 的逐块展开动画。

---

## 八、完整数据流（从 ROM 到屏幕）

```
                        [脚本引擎 $82ED]
                         │
          $B800 表 ──→ 字节码指针 ($EC,$ED)
                         │
                    读 bytecode
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          tile数据    palette写   控制码
              │          │          │
              │    ┌─────┘          │
              ▼    ▼                ▼
         $9B28 入队         $8E/$8F 寄存器
              │            (动画参数)
    [$05E8 缓冲队列]
              │
         $838A 等 NMI
              │
       NMI handler (bank_02)
              │
        ┌─────┼─────┐
        ▼           ▼
   $2006 设地址  $2007 写数据
        │           │
        └─────┼─────┘
              ▼
       PPU VRAM (nametable)
              │
              ▼
       PPU 渲染管线 (262 lines/frame)
              │
              ▼
          屏幕显示
```

---

## 九、关键 RAM 变量速查

| 地址 | 名称 | 作用 |
|------|------|------|
| `$26` | scene_id | 当前场景号 (0=TECMO) |
| `$27` | state | 场景状态机分派索引 (0-4) |
| `$28` | frame_cnt | 帧计数器 |
| `$29` | target | 目标帧数, `$28 >= $29` → advance |
| `$4C` | script_done | bit7=1 表示字节码有新指令待处理 |
| `$4D/$4E` | script_ptr | 当前字节码数据指针 |
| `$E0` | scene_flags | bit7=场景切换锁, bit6=? |
| `$E4` | max_scene | 已见过的最大场景号 |
| `$E6/$E7` | ppu_addr | 当前 PPU 写入地址 (16-bit) |
| `$E8` | rows | $98EA 填充行数 |
| `$E9` | cols | $98EA 填充列数 |
| `$EB` | fill_val | $98EA 填充 tile 索引 |
| `$4A` | bg_bright | BG 调色板亮度 (0-15) |
| `$4B` | spr_bright | Sprite 调色板亮度 (0-15) |
| `$7B` | direction | 动画方向控制 (0=左→右, 1=右→左) |
| `$ED` | anim_phase | 闪烁/呼吸动画相位 |
| `$0628` | buf_wrptr | PPU 缓冲写指针 |
| `$0629` | buf_flags | PPU 缓冲状态 (bit6=忙) |
| `$062A` | palette_ram | 32 字节 BG+SPR 调色板 (RAM) |
| `$0468` | oam_shadow | 256 字节 OAM shadow (64 精灵×4) |
| `$05E8` | ppu_buf | PPU 命令缓冲区 (地址+数据) |

---

## 十、黑屏原因分析

TECMO 显示后黑屏，从渲染管线角度看最可能的卡点：

### 1. 脚本引擎 `$82ED` 死等 (最可能)

```
$82F0: LDA $4C
$82F2: BPL $82ED           ← bit7=0 → 空转死循环
```

`$4C` bit7 需要脚本引擎的某个控制码来置位。如果字节码序列中没有执行到 `$C4` 等能设 `$4C` 的指令，引擎永远空转。

### 2. PPU 缓冲队列未消费

- `$9B28` 入队后需要 `$9B5E` 封尾和 `$838A` 触发 NMI 消费
- 如果 NMI handler（bank_02）没被调用，PPU 寄存器永远不会被写入
- 表现为：`$05E8` 里有数据但 PPU 没收到

### 3. NMI 没触发 (常见)

`$2000` bit7 不开 → VBlank NMI 不开 → NMI handler 不执行 → 整个帧循环停摆。`$9B28` 内部在 buffer busy 时 `JSR $9FA8` → `JSR $A28B` → 可能死循环等 NMI。

### 4. `$98EA` 填充矩形用了错误的 PPU 地址

`$E6/$E7` 设置的 PPU 地址如果指向 attribute table 而非 nametable，或者超出了有效范围，tile data 写不进去。

### 5. 调色板全黑

`$062A` 全是 `$0F`（黑色）→ `$9A71` 写进 PPU `$3F00` → PPU 渲染的全黑。

### 6. bank 切换后跳空

`$C4B9` 跨 bank 调用需要正确的 MMC3 寄存器值。如果切错 bank 或目标地址在映射的 bank 里不是代码，CPU 飞掉。

---

## 十一、`$26` 场景号完整序列

基于代码中的查表逻辑推测（从 `$83BA`、`$8398`、`$83DC`、`$83FE`、`$8420`、`$8442` 等数据表）：

```
$26=0x00  TECMO logo
$26=0x01  (过渡/循环)
$26=0x02  标题画面?
$26=0x03~...  后续场景
```

TECMO 退出条件：`$26=0` 时 `$28 >= $29` → `INC $26` → `$26=1`。

---

## 十二、调试建议

### 场景状态监控

在 `TsubasaCpu._tsHandler()` 或 `tsDispatch()` 里加 log：

```typescript
// cpu.ts _tsHandler 中加入:
console.log(`[$tsHandler] PC=$${pcBefore.toString(16)} $26=$${ctx.load(0x26).toString(16)} $27=$${ctx.load(0x27).toString(16)} $28=$${ctx.load(0x28).toString(16)} $29=$${ctx.load(0x29).toString(16)} $4C=$${ctx.load(0x4C).toString(16)}`);
```

### 渲染管线监控

在 `$9B28` 被调用时打 log，确认 PPU 缓冲队列入队是否正常：

```typescript
// 在 tsDispatch 或 emulate override 中:
if (pc === 0x9B28 || pc === 0x9A77) {
  const addrHi = ctx.load(0xE7);
  const addrLo = ctx.load(0xE6);
  const bufPtr = ctx.load(0x0628);
  console.log(`[PPU_BUF] enqueue addr=$${addrHi.toString(16)}${addrLo.toString(16)} bufPtr=$${bufPtr.toString(16)}`);
}
```

### 关键断点

| 地址 | 作用 | 检查什么 |
|------|------|----------|
| `$9B28` | PPU 缓冲入队 | `$0629` bit6, `$0628` 指针 |
| `$9B5E` | PPU 缓冲封尾 | 缓冲完成 |
| `$838A` | NMI 消费触发 | 缓冲被真正写入 PPU |
| `$82F2` | 脚本引擎空转 | `$4C` bit7=0 表示引擎饥饿 |
| `$9A77` | 调色板入队 | `$062A` 的值是否非零 |
| `$98FC` | 矩形填充分派 | `$E6/$E7` 地址是否正确 |

### 最小可行性测试

在 `tsDispatch` 中强行写入已知 good 数据来验证 PPU 渲染本身没问题：

```typescript
// 临时测试: 往 nametable 写一个可见 tile
ctx.store(0x2006, 0x20); ctx.store(0x2006, 0x00);
for (let i = 0; i < 32*30; i++) ctx.store(0x2007, 0x01);
// 如果屏幕上出现 tile#1, 说明 PPU+NMI 链路通了
```

如果这个测试也黑屏，问题在 PPU/NMI 基础设施而非 TECMO 逻辑。
