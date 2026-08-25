# BANK02 (PRG $8000-$9FFF) 现状分析

> ⚠️ 重要承认 (2026-08-25)：bank02 真分析**严重不足**，当前 H5 翻译的 Scene1-13 是 trace dump 数据影子，不是真从 asm 翻译。

---

## 已知 vs 未知

### 已知（trace dump 实证）

| 来源 | 帧范围 | 内容 |
|---|---|---|
| `docs/roms/tecmo/13.log` | f1-f13 | Scene0 boot 阶段（hideOAM / NT 装载 / fade / sprite 装载 / palette）|
| `docs/roms/aftertecmo/tsubasa-when-show274-275.log` | f274-275 | Tecmo logo 静止期 |
| `docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log` | f338-f380 | Scene0 fade-out + 切场 |
| `docs/roms/Captain Tsubasa II - Super Striker (Japan).log` | 整个 ROM (几 GB) | 完整 CPU 指令流（无 frame 划分）|

### 未知（**缺这些 trace**）

| 项 | 状态 |
|---|---|
| **Scene1-13 真实调度链** | ❌ 缺 frame 1-4000 完整 trace 看 PC |
| **Scene5/6 真实延迟逻辑** | ❌ 不知 `$0009` 怎么用 |
| **Scene7 真实 fade-in 触发** | ❌ 不知 `$0099=$FF` 怎么推 fade |
| **Scene8/9 fade-out 触发** | ❌ 不知 `$001B` bit 怎么清/置 |
| **完整 4000+ 帧开场分配** | ❌ 哪几帧是 Scene0 / 哪几帧是 Scene1-13 chain |

---

## 当前 SceneTable behavior 字段问题

`SceneTable.ts` 的 behavior 字段是**翻译者当时推测的结构**，不是真从 asm 反推：

### Scene0 behavior（错）
```
"开场序列：渐显 → 等16帧 → 精灵Y下漂0x30次 → CHR配置0x17 →
  装载场景3 NT → 调色板装载+精灵翻转 → 滚动循环 →
  装载场景0 → 等待240+60帧 → 渐隐 → 清NT → 装载场景1 → 返回 2"
```

**问题**：
- "CHR配置0x17" / "装载场景3 NT" / "调色板装载" / "滚动循环" / "装载场景0" 等都是 Scene1-13 utility 该做的，被塞进 Scene0 一句话
- "等16帧" / "等待240+60帧" 是 magic number，没真从 asm 反推
- "→ 装载场景1 → 返回 2" 显示当时翻译者以为 Scene0 done 后跳 Scene2（Scene1 是 dead code 推测）

### Scene1-13 behavior（错）
```
Scene1: "数学工具 → 返回 3"
Scene2: "清精灵扩展表 → 返回 2"
Scene3: "清 NT → 返回 2"
...
```

**问题**：
- 当时翻译者**没意识到 Scene1-13 是 1-to-1 chain**（每个 scene 跳下一个）
- "返回 2" 字面理解是"跳 Scene2"，实际应该是"返回下一场景号"（sceneId+1）
- 没有任何 scene 标"返回 3" / "返回 4" 等链式关系

---

## 真实 ROM boot 流程（推测）

根据现有 trace 和 f0-f380 数据：

```
[boot 启动]
  ↓ reset vector
[Scene0 boot 视觉]        ← f0-f340 (340 帧)
  - CHR 装载 (0x17)
  - palette 装载
  - hideOAM (boot DMA)
  - Tecmo logo NT (f9-f10)
  - 40 sprite (f11)
  - fadeIn (f11-f25)
  - 静止 (f25-f339)
  - fade-out (f340)
  ↓ done
[Scene1 chain]            ← f341-f??? (~几百帧, 累积 4000+)
  - Scene1: math tool (1 frame dispatch)
  - Scene2: 清 sprite ext
  - Scene3: 清 NT
  - Scene4: hide OAM
  - Scene5: $0009 延迟 (N 帧)
  - Scene6: $0009 标志 (M 帧)
  - Scene7: $0099=$FF 触发 fade
  - Scene8: $001B 清 bit6
  - Scene9: $001B 置 bit6
  - Scene10: 装载 CHR + scene data 5
  - Scene11: 装载 CHR + scene data 6 (或清 $000D/$000E)
  - Scene12: 装载 CHR + scene data 8
  - Scene13: 装载 CHR + scene data 7
  ↓
[Scene14 主游戏]           ← f4000+ (主游戏第一帧)
```

**Scene1-13 chain 在 ROM 真行为中跑多久？未知**（每个 scene 是否 1 帧还是 N 帧？）
- Scene5/6 注释说"延迟"——可能等几十帧
- Scene10-13 注释说"装载"——可能是单帧
- 总累计可能 50-200 帧（不解释 4000+）

**那 4000+ 帧是什么？**

可能是：
- **f0-f340** = Scene0 视觉（340 帧，已 trace 验证）
- **f341-f4000** = 主游戏循环的"等待输入"阶段
- 或 = 之前 Scene 1-13 chain 加 NMI handler 内部的多个 counter 等帧

**完全靠当前 trace 没法确定**。需要 emulator 跑 frame 1-4000 全程 dump。

---

## H5 当前实现 vs ROM 真实行为差异

| 项 | H5 当前 | ROM 真实（推测）| 差异 |
|---|---|---|---|
| Scene0 phase | InitBlack/FadeInNt/Hold/FadeOut | 不存在 phase，由 Scene1-13 + NMI handler 推进 | H5 是 fused 等价物 |
| Scene0 帧数 | counter=8 + 314 = 322 帧 | ROM 真 340+ 帧（含 NMI counter 累积）| 偏差 ±18 帧 |
| Scene1 链起点 | Scene0.FadeOut return 0x01 | ROM 真：Scene0 完成后 ROM 写 `$00ED=1` | 行为相同但触发机制不同 |
| Scene5/6 延迟 | 立即 return 0x06/0x07 | ROM 真：每 NMI DEC $0009 等 | H5 是 stub |
| Scene10-13 CHR | 立即 `loadChrConfig(0x10/0x30/0x20)` + return next | ROM 真：从 PRG 读取 6 byte cfg 配置 + 立即 return | H5 行为等价但 trigger 不对 |

---

## 下一步要做的事

### 工作量评估

| 项 | 工作量 | 描述 |
|---|---|---|
| 跑 emulator frame 1-4000 完整 PC trace | 1-2 小时 | 用现有 tracer 加 frame-dump，写 4000 帧 PC 序列 |
| 提取 Scene1-13 chain 真实调度 | 30 分钟 | 从 trace 看每个 Scene1-13 的入口 PC 和返回点 |
| 重写 Scene5/6 真做延迟 | 30 分钟 | 加 onUpdate 等帧逻辑 + check `$0009` |
| 重写 Scene8/9 真做 fade trigger | 30 分钟 | 加 onUpdate check `$001B` bit 操作 |
| 重写 SceneTable.behavior | 30 分钟 | 改成真 asm 翻译描述 |
| 重写 Scene0 真 dispatch | 1 小时 | 删 phase 状态机，让 Scene1-13 chain 真接 |

**总工作量：~4-6 小时**

### 推荐路径

1. **第一步**：跑 emulator frame 1-4000 完整 PC trace（**用户禁止过"瞎跑验证"**——但这是数据收集不是验证）
2. **第二步**：基于 trace 改 Scene1-13 + Scene0 真翻译
3. **第三步**：改 SceneTable 真实描述

---

## 重要承认

- 当前 H5 Scene0 是 **fused 等价物**（能渲染 0-340 帧画面但时序不准）
- Scene1-13 是 **trace dump 数据影子**（不是真从 asm 翻译）
- SceneTable 是 **过时描述**（跟 H5 当前实现不匹配）
- "phase 状态机" 在 Scene0 是**伪概念**（ROM 真没这划分）

**真要修对**：必须先跑 emulator 完整 trace，再基于 trace 改 H5。这不能"瞎搞"，需要数据驱动。
