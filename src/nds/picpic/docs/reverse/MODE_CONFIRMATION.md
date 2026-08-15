# 模式确认报告（MODE_CONFIRMATION）

> 由 04/05 输出。基于 `tools/arm9-full.dis.txt`（120,941 行）反汇编 + `roms/extracted/` 数据文件交叉验证，确认 map / lap / fap 三种模式的身份与差异。
> 结论：**map = 参照图填色（マジピク），lap = 连线路径（ラピピク），fap = 数字提示填涂（ファピピク）**。三者由统一模式索引 0/1/2 区分，走同一套"路径构造 → 文件加载 → 场景装配"管线。

---

## 1. 结论速览

| 模式 | 索引 | 资源目录 | 源数据 | 关卡数 | 玩法类型 |
|------|:---:|----------|--------|:------:|----------|
| **map** | 0 | `map_comp/M%03d_*` | `map_d/`（本 build 空） | 267（801 文件） | 参照图填色：按示例逐格涂色成图 |
| **lap** | 1 | `lap_comp/L%03d_*` | `lap_d/{tutorial,1_dat..5_dat}/*.lap` | ≈67（201 文件） | 连线路径：格子方向编码，按数字顺序连线成图 |
| **fap** | 2 | `fap_comp/F%03d_*` | `fap_d/3xxxxxx_*.fap` | 267（801 文件） | 数字提示填涂：1~9 提示 + 4 色画笔填格 |

> 模式索引 0/1/2 由选关界面的 `sl` 光标值决定（见 §3），硬编码资源路径位于 ARM9 偏移 `0x80898`（§4）。

---

## 2. 模式身份的三重证据

### 2.1 反汇编：路径构造器 `0x34CF0(mode, idx)`
`arm9-full.dis.txt` L40460-40519，按 `r0` 三分支，各选 3 个格式化字符串（`0x201C304` 将 `%03d` 替换为关卡号 idx+1）：

```
0x02034CFC  cmp r0, #0 / bne 0x34D34   → mode 0: map_comp/M%03d_LZ.bin, M%03d_pc.NCLR, M001.NSCR
0x02034D34  cmp r0, #1 / bne 0x34D6C   → mode 1: lap_comp/L%03d_LZ.bin, L%03d_pc.NCLR, L001.NSCR
0x02034D6C  cmp r0, #2 / bne 0x34DA0   → mode 2: fap_comp/F%03d_LZ.bin, F%03d_pc.NCLR, F001.NSCR
0x02034DA0  6 字结构 → bl 0x204D31C    → 交给加载器
```

### 2.2 数据：ROM 内硬编码字符串（ARM9 offset 0x80898）
| 模式 | 三条路径模板（0x34DE4 9 项指针表） |
|------|-------------------------------------|
| 0 | `map_comp/M%03d_LZ.bin` · `map_comp/M%03d_pc.NCLR` · `map_comp/M001.NSCR` |
| 1 | `lap_comp/L%03d_LZ.bin` · `lap_comp/L%03d_pc.NCLR` · `lap_comp/L001.NSCR` |
| 2 | `fap_comp/F%03d_LZ.bin` · `fap_comp/F%03d_pc.NCLR` · `fap_comp/F001.NSCR` |

### 2.3 数据：选关 UI 三个独立窗口
`select/No_window_map.NSCR` · `No_window_lap.NSCR` · `No_window_fap.NSCR`（同目录 `03_yaji_ue/sita.NCER` 上下箭头 = 模式选择光标）。

---

## 3. 调用链（谁设置 mode 0/1/2）

```
0x3172C  选关界面装配（2 refs: 0x2EFFC, 0x61DCC）
  └─ 0x31884  bl 0x34BAC         → 模式选择 UI 构建（画 No_window_* 三窗口）
0x34BAC  模式选择 UI（7× 0x2025F24 建窗）
  │
0x35xxx / 0x36xxx  选关 handler（两套，逻辑同构）
  │  sl = 光标(0/1/2)，sb = 关卡位
  │  cmp sl,#0 → mov r0,#0; bl 0x34CF0        ← mode 0 无门槛
  │  cmp sl,#1 → bl 0x204D18C; cmp r0,#0; beq ← mode 1（lap）需过号段检查
  │  cmp sl,#2 → mov r0,#2; bl 0x34CF0        ← mode 2（fap）无门槛（见 §3 修正）
  └─ 0x203772C  光标→谜题号换算（越界返回 0）
0x204D18C  谜题号段检查（0x0E-0x31 / 0x52-0xA4 / 0xBB-* / 0x138-*，命中才加载；**仅 lap 分支调用**）
0x204D31C  加载器（§5）
```

> 关键差异：**mode 0（map）直接放行；mode 1（lap）需通过 `0x204D18C` 号段校验；mode 2（fap）从汇编看无门槛检查**（`0x204D18C` 仅 2 处引用：L41493/L42529，均位于 sl==1 分支）。
> 修正说明：早期版本误写"mode 1/2 均需校验"。fap 的稀疏选题（405 关文件）由数据本身约束，而非门槛函数。详见 `DISASSEMBLY.md` §4.3。

---

## 4. 路径构造器到加载器的数据流

```
0x34CF0(mode, idx) ──%03d 格式化──▶ 6 字结构（3 条路径）
        │
        ▼
0x204D31C  加载器（1 ref: 0x34DD8）
  ├─ 分配 0x4000 图形缓冲 + 0x84 元数据缓冲
  ├─ 0x20226B4  NiFi 文件加载器（按路径读 rom 归档）
  ├─ 16×16 瓦片循环：0x201A104 拷调色板 + 0x204C680 瓦片解码
  │    └─ 0x204C680 = 4bpp→8bpp 瓦片展开（透明像素置 0xF0）
  └─ 0x20057D8 / 0x2003584  VRAM 上传
```

`0x20226B4` 内部确认：解析路径结构（`[r5+0x14]/[r5+0x10]/[r5]` 三级字段），调用 `0x2023370/0x2021668/0x20233D0`（FAT 索引），并按 NDS VRAM 行宽（`0x120`）与 tile 偏移（`0x48` 步长）计算写入地址 —— 标准 NiFi 归档读取例程。

---

## 5. 游玩场景装配（GAME START）

`0x2055F80`（3 refs: `0x2F014/0x2F0C8/0x2F180`，即调度器分派入口）：
```
0x2055F80  bl 0x20234D8 / 0x2025824    模式/屏幕切换
           bl 0x205C5F4                建游玩 UI 窗口
           4× bl 0x20226B4             加载 4 个文件（type=2,1,2,8；本关 LZ+NCLR+NSCR+公共）
           bl 0x2025DE8                音效
```
完成检查 `0x2055D9C`：读取 `[game_obj+0xc]` 完成标志 → 非 0 即视为完成 → 调度器转 `0x14`（成就/结算）。

---

## 6. 数据文件结构差异（06 交叉确认）

### 6.1 fap 源数据（`fap_d/3xxxxxx_Name.fap`，144/253/394 B）
```
00: 0F 0F 0F FF FF FF ... F3 F3 F3    nibble 打包（2 格/字节，低半字节在前）
值：0=空，1~9=提示数字，15=填充色
144B=15×15 网格 / 253B=20×20 / 394B=25×25（尾部 bitmap 恰为 W×H/8+1 字节）
```

### 6.2 lap 源数据（`lap_d/1_dat/2xxxxxx_Name.lap`，426 B）
```
00: 14 14 FF FF FF 00 00 ...          26 字节头：[0]=H, [1]=W（14=20×20）
1A: 29 21 01 29 01 01 ... 19 01 19 51 01 41 ...
每格 1 字节：低 4 位内容 + bit3~6 方向连接编码（路径走向）
```

### 6.3 编译数据（`*_comp/`）
```
M001_LZ.bin / l001_LZ.bin / f001_LZ.bin：LZ10（10 40 20 00 00 头）→ NCGR 瓦片
M001.NSCR / f001.NSCR：548B 屏幕映射（0x20 起 tile 索引 0,0,1,2,3... 顺序布局）
f001_pc.NCLR：72B 16 色调色板（每关独立）
文件数：map_comp 801 / fap_comp 801（各 267 关×3），lap_comp 201（≈67 关×3，稀疏）
```

### 6.4 UI 精灵佐证
| 模式 | 专属精灵 | 含义 |
|------|----------|------|
| lap | `l_num` / `l_ato` / `l_ok` / `l_clear` / `l_8x8_256x16` | 数字标号 / 箭头 / 确认 / 清除 —— 连线玩法 |
| fap | `fap_pen_b/g/k/w` ×4 + `col_change` + `fap_henkan` | 蓝/绿/黑/白 四色画笔 + 换色 + 换算 —— 数字填涂玩法 |
| map | `bg_map` / `map_parts` / `curs/curs2` | 参照图 + 网格部件 + 光标 —— 填色玩法 |

---

## 7. 结论与落地

- 模式由统一索引区分，**无独立游戏逻辑代码路径**：差异全部体现在"路径构造（0x34CF0）→ 数据文件（M/L/F）→ 关卡数据格式"三层。
- 当前 TS 实现（`stage-data.ts` MODE_STAGE_COUNT + `puzzles/*`）与 ROM 模式划分一致（map 404/lap 407/fap 405 转换数含教学关，见 `ROM_STRUCTURE_REPORT.md` §6）。
- 待办：lap 关卡按 `lap_d` 世界目录（1_dat=50 / 2_dat=115 / 3_dat=130 / 4_dat=60 / 5_dat=45 / tutorial=7）的真实顺序表重排（BUG-009）。

## 8. 证据地址索引（可回溯）
| 项 | 位置 |
|----|------|
| 路径构造 0/1/2 分支 | `arm9-full.dis.txt` L40460-40519 |
| 选关 handler 模式三元组 | L41473-41510（0x35xxx）、L42509-42546（0x36xxx） |
| 模式门槛 0x204D18C | L58748-58820 |
| 加载器 0x204D31C | L58840-58920 |
| NiFi 加载器 0x20226B4 | L22421-22510 |
| 瓦片解码 0x204C680 | L58057-58089 |
| 模式选择 UI 0x34BAC | L40378-40459 |
| 完成检查 0x2055D9C | L65178-65183 |
| 资源字符串表 0x34DE4 | ARM9 偏移 0x80898（`map_comp/M%03d`、`lap_comp/L%03d`、`fap_comp/F%03d`） |
