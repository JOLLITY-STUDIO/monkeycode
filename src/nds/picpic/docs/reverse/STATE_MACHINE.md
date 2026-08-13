# 状态机 / 流程分析（STATE_MACHINE）

> 由 05 状态机/流程分析师输出。真实 ROM 状态值，来源：反汇编 `0x205113c` 主调度器 + `rom-states.ts`。

## 1. 双层分派结构
```
主调度器 0x205113c:
  SUBSTATE=1 → STATE 0x00~0x0A（boot / 槽位管理）
  SUBSTATE=2 → STATE 0x0B~0x14（主流程）
  SUBSTATE=3 → 0x205171C 再分派（STATE 0x16~0x19）
```

## 2. 状态常量表（真实 ROM 值）
| STATE | 值 | SUBSTATE | 含义 | 资源 |
|-------|-----|----------|------|------|
| ST_BOOT_INIT | 0x00 | 1 | 上电初始化 | - |
| ST_RESET | 0x05 | 1 | 重置 | - |
| ST_SAVE_CHECK | 0x06 | 1 | 存档检查 | - |
| ST_SLOT_READ | 0x08 | 1/2 | 槽位读取 → 回 state select | - |
| ST_SLOT_SHIFT | 0x09 | 1 | 槽位移位 | - |
| ST_PATH_BUILD | 0x0B | 1/2 | 路径/场景初始化 → 0x11 | boot |
| ST_SCENE_INIT | 0x0B | 2 | 大场景初始化 | boot |
| ST_MODE_INIT | 0x0C | 2 | RNG/模式初始化 → 0x12 | - |
| ST_STATE_SELECT | 0x0D | 2 | 选关 | select/ + No_window_* |
| ST_RESULT_CHECK | 0x0E | 2 | 完成检查 → ==2 → 0x14 | - |
| ST_SAVING | 0x10 | 2 | 写存档槽 → 0x08 | - |
| ST_TITLE | 0x11 | 2 | 标题+建档命名 | title/ + f_make/ |
| ST_MODE_SELECT | 0x12 | 2 | 模式选择 | cinario_select/ |
| ST_GAMING | 0x13 | 2 | 游玩 | map/ lap/ fap/ |
| ST_ACHIEVE | 0x14 | 2 | 完成画面 | *_comp/ |
| ST_TUTORIAL | 0x16 | 3 | 教学 | tutorial/ |
| ST_OPTION | 0x17 | 3 | 设置 | option/ |
| ST_TAIKEN | 0x18 | 3 | 体验 | taiken/ |
| ST_OTAMESI | 0x19 | 3 | 试玩 | otamesi/ |

## 3. 状态流转图
```
boot(0x0B)
  │ 开场播完/点按
  ▼
title(0x11) ──(新档)──► f_make 命名
  │ (有档)
  ▼
mode init(0x0C) ──► mode select(0x12)
                          │ 选模式
                          ▼
                    state select(0x0D)
                     │ 选关          ▲
                     ▼               │ saving(0x10)
              GAME SETUP(0x2055BC8)  │   │
                     ▼               │   ▼
                   gaming(0x13) ──► result check(0x0E)
                                        │ ==2
                                        ▼
                                     achieve(0x14) ──► saving(0x10) → 0x08 → 0x0D

SUBSTATE=3（tutorial/option/taiken/otamesi）从主流程任意处进入，返回主流程
```

## 4. 存档槽（5 个）
- 初始化 `0x2051D5C`；写槽 `0x2051BE8`；每槽：玩家名/解锁关号/通关列表/最短用时
- 流转：`0x10 → 0x08 → 0x0D`（写档后回选关）

## 5. 完成检查
- `0x2055D9C` 读 widget 结构返回退出码，==2 表示完成 → `0x14`
