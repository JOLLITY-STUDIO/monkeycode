# Langrisser II — MD Emulation (TypeScript)

> **项目定位**: Sega Genesis 版《梦幻模拟战 II》的纯 TypeScript 模拟器
>
> **架构原则**: 所有界面通过 Canvas 渲染 (VDP tile + Canvas 2D UI 叠加)，**不使用 HTML DOM 渲染游戏界面**。

---

## 一、分工与职责

| 角色 | 职责范围 | 关键文件 |
|------|----------|----------|
| **前端 (状态机/输入)** | 游戏状态机 & 场景跳转链、菜单导航逻辑、输入/控制事件处理 | `main.ts`, `SceneManager.ts`, `GameState.ts`, `InputSystem.ts` |
| **渲染 (VDP/Canvas)** | VDP tile 渲染管线、VRAM/CRAM 加载、Canvas 2D UI 组件 | `renderer.ts`, `plane.ts`, `sprite.ts`, `rendering/UI.ts` |

**前端职责细则**:
- 从 ROM 逆向数据 (`execution-trace.md`) 驱动所有游戏逻辑流转
- 维护 `GamePhase` 枚举 → 场景跳转映射
- 实现每个界面的菜单结构、光标导航、按键响应
- 对 `InputSystem` 暴露的 `justPressed`/`isDown`/`getDirection` 做业务层响应

**渲染职责细则**:
- VDP 模拟：tile 解码 → Plane A/B 合成 → `renderFrame()` 输出 `frameBuf`
- Canvas 2D UI 工具：面板/菜单列表/字符绘制 (`rendering/UI.ts`)
- ROM 数据提取 & 格式转换：解压器、资源表、调色板、nametable

---

## 二、渲染管线

```
每帧(Game Loop):
  1. input.poll()                ← 输入系统采样
  2. scene.update(dt, input)     ← 业务逻辑 (光标/菜单/状态)
  3. renderFrame(vdp, frameBuf)  ← VDP tile 渲染 (渲染负责)
  4. ctx.putImageData(frameBuf)  ← 帧缓冲 → Canvas
  5. scene.renderUI(ctx2d)       ← Canvas 2D UI 叠加 (渲染负责)
```

**硬限制**:
- ❌ 禁止在 `scene.update()` 中操作 DOM
- ❌ 禁止在 `scene.renderUI()` 中使用 HTML overlay
- ✅ VDP 帧 + Canvas 2D API 叠加 = 完整画面

---

## 三、核心技术栈

| 模块 | 文件路径 | 说明 |
|------|----------|------|
| 状态机 | `game/core/SceneManager.ts` | `GamePhase` 枚举 + 场景切换 |
| 全局状态 | `game/core/GameState.ts` | 1:1 映射 ROM RAM 地址 (`$FFFFA49C` 等) |
| 游戏引擎 | `game/core/GameEngine.ts` | 帧计数器、VDP 封装 |
| 输入系统 | `game/systems/InputSystem.ts` | 键盘 → Genesis 6-btn 控制器映射 |
| 秘籍系统 | `game/systems/CheatSystem.ts` | 5 种秘籍序列匹配 (VBLANK/LOAD/Map) |
| 存档系统 | `game/systems/SaveSystem.ts` | localStorage + CRAM (存档校验) |
| 道具系统 | `game/systems/ItemSystem.ts` | ROM `0x060530` 道具表解析 |
| VDP 渲染 | `game/hw/vdp/renderer.ts` | `renderFrame()` 主渲染入口 |
| UI 工具 | `game/rendering/UI.ts` | Canvas 2D: 面板/菜单/文字绘制 |

---

## 四、核心流程 (全部提取自 ROM 逆向 + 粉丝站验证)

```
Boot → Sega Logo(跳过) → 开场动画(跳过)
    → 标题画面 (0xC93A)
         ├─ NEW GAME  → 名称输入 (0xCCB0) → MENU I (0xCA00)
         └─ LOAD      → 存档选择         → MENU I (0xCA00)
              MENU I (部署, $FFFFA61C=5)
                1. 兵士配属
                2. 道具装备
                3. 商店 ($00FD7A)
                4. 指挥官配置 → MENU II
              MENU II
                1. 位置配置 | 2. 移动顺序 | 3. 自动配置 | 4. 部队一览
                5. 出击 → 战斗地图 ($FFFFA61C=10)
              ┌──────────战斗地图───────────┐
              │ A→角色行动菜单: 移动/攻击/魔法/召唤/治疗/指令 │
              │ START→机能菜单: SAVE/LOAD/胜利条件/GAME设定/指令终了 │
              │ B→取消            C→回合结束               │
              └──────────────────────────────┘
                 达成胜利条件 → 战后结算 → 下一关 MENU I (循环31关)
```

---

## 五、资料源 (ROM 逆向 & 交叉验证)

| 资料 | 路径 | 说明 |
|------|------|------|
| **ROM dump** | `20260713/Langrisser II (Japan).md` | 官方 v1.1 ROM (2MB) |
| **ROM dump v1.2** | `20260713/Langrisser II (Japan) (v1.2).md` | v1.2 版本 (比对用) |
| **反汇编** | `20260713/asm/m68k/rom.asm` | 完整 68K 反汇编 |
| **VRAM dump** | `20260713/*/...(*VRAM*).ram` | 各场景 VRAM 快照 |
| **RAM dump** | `20260713/*/...(*RAM*).ram` | 各场景 68K RAM 快照 |
| **Ghidra C** | `20260713/*.c` | Ghidra 反编译 C 代码 |
| **主文档** | `docs/execution-trace.md` | **核心**: ROM 逆向综合文档 (三部分) |
| **粉丝站** | `docs/Langrisser专题站·梦幻模拟战Ⅱ-介绍.html` | 游戏系统说明 (langrisser.cn) |
| **地图素材** | `20260713/assets/maps/` | 各场景地图 PNG (spriters-resource) |
| **参考脚本** | `scripts/` | ROM 数据提取/验证脚本 (.mjs) |

### 关键 ROM 地址速查

| 地址 | 内容 |
|------|------|
| `0x05DE00` | 角色数据表 (42个角色) |
| `0x05E64A` | 角色名称/属性 |
| `0x05EDDC` | 职业数据 (约80种) |
| `0x060530` | 道具数据表 |
| `0x061CB0` | 场景参数表 (w, h) |
| `0x0B0000` | 资源指针表 (256个资源) |
| `0x0C0000` | 文本/剧本数据 |

### 关键 RAM 地址速查

| RAM | GameState 字段 | 值域 | 含义 |
|-----|---------------|------|------|
| `$FFFFA49C` | `scenarioIndex` | 1-31 | 当前场景/关卡 |
| `$FFFFA61C` | `gameState` | 5/10 | 5=部署, 10=战斗 |
| `$FFFFA6DC` | `shopMode` | 0/1/2 | 商店类型 |
| `$FF78FA` | `skipTitleFlag` | 0xFFFF/0 | 新游戏标志 |
| `$FFFF8004` | `taskFuncPtr` | ROM addr | 当前任务函数指针 |
| `$FFFFA6DE` | `cursorX` | 0~mapW | 地图光标 X |
| `$FFFFA6E0` | `cursorY` | 0~mapH | 地图光标 Y |
| `$FFFFAE90` | `nextScenario` | 1-31 | 下一场景索引 |

---

## 六、TS 实现状态

| 界面 | ROM | GamePhase | 文件 | 状态 |
|------|-----|-----------|------|------|
| 启动画面 | - | - | `main.ts` | ✅ Canvas 2D |
| 标题画面 | 0xC93A | TITLE (0) | `scenes/TitleScreen.ts` | ✅ VDP+Canvas |
| 名称输入 | 0xCCB0 | NAME_INPUT | `scenes/NameInputScene.ts` | ❌ 待实现 |
| MENU I | 0xCA00 | DEPLOY (3) | `scenes/DeployScene.ts` | ❌ 待实现 |
| MENU II | - | DEPLOY (3) | `scenes/DeployScene.ts` | ❌ 待实现 |
| 战斗地图 | 0xD49E | BATTLE_MAP (4) | `scenes/BattleScene.ts` | ✅ 简化版 |
| 角色菜单 | `$AE50` | BATTLE_ACTION | `scenes/BattleScene.ts` | ❌ 待实现 |
| 机能菜单 | - | BATTLE_PAUSE | `scenes/BattleScene.ts` | ❌ 待实现 |
| 战斗动画 | - | BATTLE_ANIM (5) | - | ❌ 待实现 |
| 商店 | `$FD7A` | SHOP (7) | `scenes/ShopScene.ts` | ✅ Canvas UI |
| 对话/剧情 | 0x09FFE | DIALOGUE (6) | `scenes/DialogueScene.ts` | ❌ 待实现 |
| 战后结算 | 0x1CFC0 | INTERMISSION (8) | `scenes/IntermissionScene.ts` | ❌ 待实现 |
| 存读档 | SRAM | SAVE_LOAD | `scenes/SaveLoadScene.ts` | ❌ 待实现 |

---

## 七、按键映射

| Genesis | 位 | 键盘默认 | 游戏中用途 |
|---------|----|---------|-----------|
| ↑ | bit0 | ArrowUp / W | 上移 |
| ↓ | bit1 | ArrowDown / S | 下移 |
| ← | bit2 | ArrowLeft / A | 左移 |
| → | bit3 | ArrowRight / D | 右移 |
| B | bit4 | X / K | 取消/返回 |
| C | bit5 | C / L | 回合结束/模式切换 |
| A | bit6 | Z / J | 确认/选择 |
| START | bit7 | Enter / Space | 机能菜单/跳过 |

---

## 八、代码规范

1. **所有文件头部**必须有 JSDoc 说明用途和对应的 ROM 地址
2. **所有公共方法**必须有 JSDoc `@param`/`@returns`
3. **状态映射**必须注释对应的 RAM 地址 (如 `// RAM $FFFFA61C = 5`)
4. **场景切换**必须记录触发按键和状态变更
5. 评论区用中文，代码用英文

---

## 九、开发命令

```bash
npm run dev          # 开发服务器 (Vite)
npm run build        # 生产构建
# 访问 http://localhost:5173/src/langrisser2/index.html
```

### 数据分析脚本 (Node.js)

```bash
node src/langrisser2/scripts/extract-all-resources.mjs   # 提取所有资源
node src/langrisser2/scripts/analyze-nametable.mjs         # 分析标题画面 nametable
node src/langrisser2/scripts/verify-ts-title.mts            # 验证标题渲染
```
