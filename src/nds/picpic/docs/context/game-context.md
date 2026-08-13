# Pic Pic 游戏上下文（game-context）

> 由 01 PM 初始化，03/04/05/06 分析过程中持续更新。来源可溯，禁止猜测。

## 基本信息
- 游戏名：Pic Pic（ピクピク）
- ROM：`roms/Pic Pic (Europe) [Rom].nds`（对应截图 `screenshots/Pic Pic (Europe)__7325.png`）
- 说明书：无（本作未提供说明书，玩法由 ROM 分析 + 截图确认）
- 平台/格式：NDS（ARM9 + ARM7 双核，Nitros File System）
- 目标转写产物：H5 风格微信小程序（纯 TypeScript + Canvas 2D，无 DOM，无模拟器）

## ROM 概览（来自 ROM Header 与文件系统）
- 提取目录：`roms/extracted/`
  - `_system/header.bin`（512B 头）、`arm9.bin`（586.52KB 主逻辑）、`arm7.bin`（162.44KB 辅助固件）
  - `Child.srl`（1.13MB，ROM 主文件）、`Nurie_sd.sdat`（1.74MB，音效/音频档案）
- 文件系统（Nitfs）：按资源类型分目录（见 RESOURCE_INDEX.md）
- 主逻辑反汇编：`tools/arm9-full.dis.txt`（4.16MB）、函数表 `tools/arm9-functions.tsv`（159KB）

## 已知资源目录/文件分类
| 目录 | 用途 | 说明 |
|------|------|------|
| `title/` | 标题画面 | logo/背景 |
| `f_make/` | 建档命名 | 5 存档槽 + 罗马字母键盘 UI |
| `select/` | 选关窗口 | No_window_map/lap/fap |
| `main/` | 主流程公共 UI | |
| `map/` `lap/` `fap/` | 三大模式关卡图形（未压缩 NSCR/NCGR/NCLR 系列） | |
| `map_d/` `lap_d/` `fap_d/` | 关卡数据（已解包原始数据） | |
| `map_comp/` `lap_comp/` `fap_comp/` | 通关完成画面资源 | |
| `clear/` | 清除动画资源 | kami_ce/kami_cg/kami_pc |
| `option/` | 设置画面 | |
| `tutorial/` | 教学（SUBSTATE=3 STATE 0x16） | |
| `taiken/` | 体验版（0x18） | |
| `kakuninn/` | 确认弹窗 | |

## 已知状态与场景（初始猜测，已由 05 确认修正）
见 `docs/reverse/STATE_MACHINE.md`。核心链路：

```
boot(0x0B) → title(0x11) → f_make建档 → mode select(0x12) → state select(0x0D)
           → gaming(0x13) → result check(0x0E) → achieve(0x14) → saving(0x10) → 回 state select(0x08→0x0D)
SUBSTATE=3: tutorial(0x16) / option(0x17) / taiken(0x18) / otamesi(0x19)
```

## 玩法要点（来自 ROM 分析 + 截图）
- 三模式：MAP（404 关）、LAP（400 关）、FAP（405 关），均为"涂色填图"（数字涂色）类
- 每关谜题：宽×高格点 + 16 色调色板（NCLR）+ 目标图案网格（4bit/像素）
- 操作：触屏选色 → 涂格；支持撤销/重做；通关后 0x0E 检查（result==2）
- 存档：5 槽位，每槽记录玩家名、各模式已解锁关号、已通关列表、每关最短用时

## 全局结构基址（04 反汇编确认）
- `0x020DEB70`：`[+0x0c]=SCENE`、`[+0x14]=SUBSTATE`、`[+0x28]=STATE`、`[+0x34]=回调表`、`[+0x38]=状态参数`、`[+0x3c]=widget 尺寸`
- 主调度器 `0x205113c`（双层分派）；状态切换仿 `0x2052a00`（exit→写STATE→enter）
- 模式初始化 `0x2053BF4`/`0x205418C`；完成检查 `0x2055D9C`；GAME SETUP `0x2055BC8`
- 存档初始化 `0x2051D5C`（5 slots）、写槽 `0x2051BE8`
