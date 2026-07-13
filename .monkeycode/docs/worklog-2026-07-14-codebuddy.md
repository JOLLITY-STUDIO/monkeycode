# 开发工作日志

## 2026-07-14 — Langrisser II 名称输入界面逆向 & 假名 tile 映射

### 会话摘要

1. 逐字节验证 `execution-trace.md` 中名称输入界面的汇编调用链，修正多处地址偏差
2. 确认日文假名面板数据 `$082114` 不是字符编码串，而是 **VDP nametable entry** 数组
3. 追踪资源 `0x8001` 字体 tile 加载路径，定位 tile→假名映射机制
4. 发现 v1.2 官方修复版 ROM

---

### 关键验证: 名称输入调用链逐字节校对

**验证依据**: ROM 二进制 + `rom.asm` 反汇编交叉验证

| 原 trace 描述 | 实际 | 已修正 |
|---|---|---|
| `tst.w ($FF78FA)` 在 ROM `0xC9A0` | 实际在 **0xC9B2**（前有 `jsr C7EC` / `clr A6DC` / `clr FFF350`） | ✅ |
| CA9E → CA68 用 `jmp 0x85EE` 过渡 | 实际用 `rts` 直接返回（无过渡效果） | ✅ |
| `lea $082114, a2` 在前 | 实际 `lea $FFFF94A2, a1` 在前 | ✅ |
| CD70 确认选择 `$A612 → $A49C` 直接存 | 中间多了 `move.w #$0450, d0; bsr 0x955C`（播放音效） | ✅ |

**完整调用链** (0xC9B2 → 名称输入):

```
0xC9B2: tst.w ($FF78FA).l    ; 新游戏标志判断
   bne → loc_00CA32           ; ≠0 → 名称输入初始化
   
loc_00CA32: 初始化
  ├→ move.l #$10001 → $A6DE
  ├→ bsr 0x010AEC             ; 角色数据初始化
  ├→ jsr 0x014D5E             ; 场景/UI 缓冲初始化
  ├→ jsr 0x00C7AE             ; VDP 设置
  └→ set next = 0xCA68, rts   ; (无过渡)

loc_00CA68: 加载资源 0x8001 → VRAM (字体 tile)
  → next = 0xCA8A, jmp 0x85EE

loc_00CA8A: 过渡效果
  → next = 0xCA9E, jmp 0x85EE

loc_00CA9E: 假名面板构建
  ├→ jsr 0xC1D2              ; 假名网格绘制(VDP)
  ├→ lea $FFFF94A2, a1        ; RAM 目标缓冲区
  ├→ lea ($082114), a2        ; ROM 面板 nametable 数据
  ├→ bsr 0x9208               ; memcpy: ROM → RAM
  ├→ lea $FFFF94A2, a2
  ├→ jsr 0xA122               ; 解析假名选择列表
  ├→ set $A614 = 1
  ├→ bsr 0xFBAE               ; 调色板加载
  └→ 新游戏时循环重置 20 角色槽

loc_00CC4E: 画面绘制
  ├→ bsr 0x009020/0x009172
  ├→ jsr 0x0099B2 (加载资源 0x8001 到 VRAM)
  ├→ jsr 0x009FC2 (场景初始化)
  └→ jsr 0x00FC4A (VDP DMA)

loc_00CCB0: 光标循环
  ├→ btst #0/#1, ($FFFF8179)  ; 方向键检测
  └→ 更新 $A612 光标索引 (加减1/行宽7)

loc_00CD70: 确认/取消判断
  ├→ btst #4 → C按钮 = 取消 (→ task 0xD738)
  └→ andi #$A0 → A/B按钮 = 确认
      ├→ $A612 → $A49C       ; 保存选择的假名字符索引
      └→ bra 0xCFB8           ; 进入确认/下一字符过渡
```

---

### 核心发现: 假名数据 = VDP Nametable Entry，不是字符表

**ROM `$082114`** (复制到 RAM `$FFFF94A2`) 保存的不是假名字符串或索引，而是 **VDP nametable entry 数组**：

```
VDP Nametable Entry 格式 (16-bit):
  bits  0-10: Tile 索引 (0-2047)
  bit     11: 水平翻转
  bit     12: 垂直翻转
  bit  13-14: 调色板 (0-3)
  bit     15: 优先级
```

每个 16-bit word 直接对应屏幕上一个 tile 位置，VDP 硬件直接读取并渲染。

**字体 tile 来源**: 资源 `0x8001`（ROM 中压缩的字体图块包）
- 由 `jsr ($0099B2)` 解压后加载到 VRAM
- 每个假名在 VRAM 中占据一个 8×8 像素 tile
- 假名面板通过 nametable entry 的 tile 索引引用这些字体 tile

**文本编码机制**:

```
游戏台词(ROM)             假名面板(RAM $FFFF94A2)        屏幕
单字节索引 ──────────→ AI 查询面板位置 ──────────→ VDP 渲染对应 tile
(如 0x02)               (第2个entry的tile#)          (假名"イ"的像素图)
```

→ **不需要 Shift-JIS**，纯自定义单字节编码，比日文标准编码节省一半空间

---

### ROM 地址速查（新增）

| 偏移 | 内容 |
|------|------|
| `0x082114` | 假名面板 VDP nametable entry 表 (16-bit × ~54项) |
| `0xC9B2` | 新游戏/继续分流判断 `tst.w ($FF78FA)` |
| `0xCA32` | 名称输入初始化入口 |
| `0xCA68` | 加载资源 0x8001 (字体 tile) |
| `0xCA9E` | 假名面板构建 (拷贝 $082114 → $FFFF94A2) |
| `0xCC4E` | 名称输入画面绘制 |
| `0xCCB0` | 光标方向键循环 |
| `0xCD70` | 确认/取消按钮判断 |

### 运行时 RAM (名称输入相关)

| 地址 | 含义 |
|------|------|
| `$FFFF94A2` | 假名面板 nametable 数据 (从 $082114 拷贝) |
| `$FFFFA612` | 光标当前选中的假名面板位置索引 |
| `$FFFFA49C` | 确认选择的假名索引保存区 |
| `$FFFF8179` | 控制器输入读取 |
| `$FFFFAA10` | 取消/删除标志 |
| `$FF78FA` | 新游戏标志 (0=继续, ≠0=新游戏) |

---

### 新增文件

| 文件 | 说明 |
|------|------|
| `src/langrisser2/20260713/Langrisser II (Japan) (v1.2)/Langrisser II (Japan) (v1.2).md` | 官方 1.2 修复版 ROM |

### 文件重组

- `src/langrisser2/md-battle.js` 等 9 个旧模块 → `src/langrisser2/legacy/`
- `src/langrisser2/20260713/` 目录：组织 ROM + 反汇编 + 输出数据

---

### 待解决

- **构建 .tbl 映射表**: 从 `$082114` nametable 提取 tile 索引 → 按面板布局对上假名 → 得知每个字节对应哪个假名
- 资源 `0x8001` 的解压格式（确认字体 tile 在 VRAM 中的排列顺序）
- 游戏台词文本的 ROM 存储位置与编码格式
- 转职路线 ROM 实际存储位置

---

### 执行者

**codebuddy** — AI 编程助手
