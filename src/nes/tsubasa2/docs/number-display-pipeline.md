# 数值显示链路逆向文档

## 完整链路（已逆向确认）

```
ROM 字节 (编码值, 如体力编码 38)
  ↓ 查表 0x39F1E + 编码*2 (16bit 体力映射表)
真实数值 (16bit, 如 748 = 0x02EC)
  ↓ $8C55 函数 (bank24): 循环除 10 (用 $CD3C 16bit 除法)
余数序列 (8, 4, 7)  ← 逆序产生
  ↓ 每个余数 + 0x33 (公式: tile_id = 数字 + 0x33)
tile IDs (0x3B, 0x37, 0x3A)  ← 逆序存储
  ↓ 写入 PPU Buffer (ram_04A8)
屏幕显示 "748" (正序)
```

## 关键代码位置

| 函数 | ROM 地址 | 所属 Bank | 作用 | 转写状态 |
|------|---------|----------|------|---------|
| 数值→tile | `$8C55` | bank24 | 16bit 值循环除 10，余数+0x33=tile | ❌ 未转写 |
| 16bit 除法 | `$CD3C` | bank30 | shift-subtract 除法 (16次循环) | ❌ 未转写 |
| 数值→图案 | `$CE08` (via `$C527`) | bank30 | 待查 | ❌ 未转写 |
| 跳转表 | `$C51E`→`$CD3C`, `$C527`→`$CE08`, `$C524`→`$CBC2` | bank30 | $C5xx 跳板 | - |
| 球员数据查询 | `$A01E` (entry0) | bank01 | LOOKUP_16BIT 查表 | ✅ 已转写 |
| 数据加载 | `$B050` (entry8) | bank01 | 阵容块拷贝 | ✅ 已转写 |
| 球队初始化 | `$A39B` (entry9) | bank01 | $CD89 指针表 | ✅ 已转写 |

## $8C55 反汇编 (数值→tile, bank24_part02.asm:863-902)

```asm
$8C55: LDY ram_003C       ; 位数计数
       DEY
       BEQ $8C84          ; 归零返回
       STA ram_006F        ; 保存数值 lo (A)
       STX ram_0070        ; 保存数值 hi (X)
       LDA #$0A
       STA ram_0071        ; 除数 = 10
       LDA #$00
       STA ram_0074        ; 余数清零
$8C66: JSR $C51E          ; 16bit 除法 (→ $CD3C)
       LDA ram_0072        ; 商 lo
       JSR $8C7A           ; 递归处理高位
       LDA ram_0070        ; 商 hi
       BNE $8C66           ; hi≠0 继续
       LDA ram_006F        ; 最后低位
       BEQ $8C84
       CMP #$0A
       BCS $8C66
$8C7A: CLC
       ADC #$33            ; ★ 数字 + 0x33 = tile ID ★
       LDY #$00
       JSR $8C85           ; 写入 ram_04A8,X (PPU Buffer)
       DEC ram_003D
$8C84: RTS
```

## $CD3C 反汇编 (16bit 除法, bank30_part03.asm:271-303)

```asm
$CD3C: TXA                 ; 保存 X
       PHA
       LDA #$00
       STA ram_0072        ; 商 lo = 0
       STA ram_0073        ; 商 hi = 0
       LDX #$10            ; 循环 16 次
$CD46: ROL ram_006F        ; 被除数 lo 左移
       ROL ram_0070        ; 被除数 hi 左移
       ROL ram_0072        ; 商 lo 左移
       ROL ram_0073        ; 商 hi 左移
       BCS $CD60           ; carry=1 直接减
       LDA ram_0073        ; 比较高位
       CMP ram_0074
       BEQ $CD5A
       BCC $CD6D           ; 小于不减
$CD60: LDA ram_0072        ; 商 lo
       SBC ram_0071        ; 减除数 lo
       STA ram_0072
       LDA ram_0073        ; 商 hi
       SBC ram_0074        ; 减除数 hi
       STA ram_0073
       SEC                 ; 置 carry (商位置=1)
$CD6D: ROL ram_006F        ; 被除数 lo (余数)
       ROL ram_0070        ; 被除数 hi (余数)
       DEX
       BNE $CD4A
       PLA
       TAX
       RTS
; 结果: ram_006F/0070 = 余数, ram_0072/0073 = 商
```

## 查表数据

### 体力映射表 (ROM 0x39F1E, 16bit per entry)
- 编码 38 → 748 (Tsubasa 一级体力)
- 编码 29 → 694 (满级)
- 表是升序: 464, 482, 490, 498, 506, 514, 522, 530, 538, 546, 554, ...

### 能力映射表 (ROM 0x39E5E, 8bit per entry)
- 编码 0-31 → 显示值 13-29 范围
- code 0→13, code 6→15, code 12→17, code 18→21, code 29→28

### LOOKUP_16BIT 表 (bank01, ROM 0xBA90, 64 entries × 16bit)
- idx 0=0, idx 1=96, idx 2=208, idx 3=336, idx 4=528, idx 5=768...
- 用于 entry0_PlayerData 反向查编码 (16bit 值 → 编码 idx)

## Tsubasa 一级数值对照 (截图验证)

| 字段 | 编码 | 显示值 | tile ID |
|------|------|--------|---------|
| Stamina 体力 | 38 | 748 | 3A 37 3B |
| Shot 射门 | ? | 12 | 0x3F |
| Pass 传球 | ? | 14 | 0x41 |
| Dribble 盘带 | ? | 16 | 0x43 |
| Block 阻挡 | ? | 11 | 0x3E |
| Tackle 铲球 | ? | 12 | 0x3F |
| Intercept 拦截 | ? | 12 | 0x3F |

## 待转写任务

1. $8C55 → bank24_hud.service.ts (数值→tile 显示)
2. $CD3C → bank30 或公共工具 (16bit 除法)
3. player-stats.ts 接入查表逻辑 (编码→真实值)
