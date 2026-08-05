# Bank 05 — 比赛数据 / 脚本 / 音频数据

> **源文件**: `_tmp_disasm_out/banks/bank_05_data.asm`
> **类型**: Data Bank (Switchable)
> **CPU地址**: $8000-$BFFF | **ROM偏移**: $14010-$17FFF | **大小**: ~770KB
> **CDL标记**: Data 为主 | **分析日期**: 2026-08-05

---

## 1. 概述

Bank 05 是游戏 Data Bank，存储比赛脚本、音频数据、标题画面数据。

| 内容 | 说明 |
|------|------|
| **比赛脚本** | 各关卡的剧情脚本、特殊事件触发条件 |
| **音频数据** | 音乐/音效的 APU 寄存器写入序列 |
| **标题画面数据** | State 1 标题画面的 nametable 数据 |
| **调色板数据** | 多种场景的调色板配置 |

---

## 2. 调度入口

### State 1 — 标题画面

```
Bank 0 $81FF: .dw $82A7       → State 1 handler
Bank 0 $82A7: LDA #$5D
Bank 0 $82A9: JSR $84D2       → 调度到 Bank 5, Sub D (13)
```

因此 Bank 5 的 Sub D (`$5D = 0b01011101` → Bank 5, Sub 13) 处理标题画面逻辑。

### NMI 音频回调

```
Bank 0 $8113: JSR $DB00       → Bank 1 音频调度
可能进一步调用 Bank 5 音频数据
```

---

## 3. 数据段 (推断)

### 3.1 标题画面数据

标题画面使用 Bank 5 Sub D (`$84D2(A=$5D)`) 进行加载和渲染:
- Nametable 数据 (tile 映射)
- 调色板配置
- CHR Bank 配置

### 3.2 音频数据

音乐和音效数据存储在此 Bank:
- APU 寄存器写入序列 (方波、三角波、噪声、DMC)
- 音乐时长和循环信息
- 音效触发 ID 映射

### 3.3 比赛脚本数据

类似 Bank 7 的事件脚本，但可能更具体的比赛脚本:
- 关卡 x 的特殊事件序列
- 对话触发条件
- 特殊行动 (必杀技) 的脚本

---

## 4. 待确认/疑问点

- [ ] Bank 5 Sub D (13) 标题画面处理器的完整功能
- [ ] 音频数据的具体格式 (是 raw APU writes 还是压缩格式)
- [ ] 比赛脚本的编码格式
- [ ] 其余 Sub handlers 的功能 (Bank 5 共 16 个 Sub)

---

*分析日期: 2026-08-05*
*依据: bank_00_annotated (State跳转) + DE_LOG + OPENING_ANIMATION_ANALYSIS + ASM_ANNOTATION_PLAN*
