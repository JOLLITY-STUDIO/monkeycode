# 天使之翼 2 — Bank 反汇编模块

NES MMC3 架构，48 个 8KB bank（共 384KB PRG-ROM），将原始 6502 汇编逐指令翻译为 TypeScript。

## 目录结构

```
banks/
├── _bank_types.ts          # 类型定义 (BankModule / RomReader / BankFn)
├── _crossbank.ts           # 跨 bank 调度引擎 (resolver + call)
├── _romdata/               # 48 个原始 ROM 数据切片 (bank_XX_data.ts)
├── index.ts                # 统一导出 + 数据 bank 工厂生成
├── runner.ts               # 连接 Canvas 渲染循环的主运行器
│
│  15 个代码 bank (有可执行逻辑)：
├── bank_00_dispatch.ts     # 系统主分派器 + 场景状态机 + 脚本引擎
├── bank_01_match.ts        # 比赛引擎主体 (球员移动/对抗/射门)
├── bank_02_nmi.ts          # NMI 中断处理 + 手柄输入 + PPU 更新 + 初始化
├── bank_11_bg.ts           # 背景 / 瓦片 / Nametable 渲染
├── bank_12_audio.ts        # 音频 / 音效引擎
├── bank_16_scene.ts        # 场景渲染 / 脚本解释器
├── bank_19_lookup.ts       # 通用数据表查找
├── bank_20_team.ts         # 队伍 / 球员选择界面
├── bank_22_sprite.ts       # 精灵 / OAM 元精灵解码
├── bank_24_cutscene.ts     # 比赛过场 / 场景控制
├── bank_26_matchcore.ts    # 核心比赛引擎 (最大代码 bank)
├── bank_27_player.ts       # 球员数据查询
├── bank_28_attr.ts         # 球员属性 / 队伍数据 / 阵型
├── bank_30_sys.ts          # MMC3 系统库 (NMI/PPU 传送/RNG/数学)
└── bank_31_boot.ts         # RESET 启动序列 + 中断向量表
```

> 33 个数据 bank（03~10, 13~15, 17~18, 21, 23, 25, 29, 32~47）无需独立壳文件，由 `index.ts` 中的 `_mkDataBank()` 工厂函数动态生成。

## 架构概览

### MMC3 内存映射

| CPU 地址 | 映射方式 | 典型 bank |
|----------|----------|-----------|
| `$8000-$9FFF` | MMC3 可切换窗口 | 01, 11, 16, 22, 24… |
| `$A000-$BFFF` | MMC3 可切换窗口 | 00, 12, 19, 20… |
| `$C000-$DFFF` | 固定 bank **30** (`bank_30_sys`) | 30 |
| `$E000-$FFFF` | 固定 bank **31** (`bank_31_boot`) | 31 |

### Bank 模块接口

```ts
interface BankModule {
  rom: BankRomSlice;                           // bank 内部 8KB ROM 数据读写
  dispatch(ctx: GameContext, reader: RomReader): void;  // 跳转表分派
  fns: Record<string, BankFn>;                 // CPU 地址 → 翻译函数映射
}
```

### 跨 Bank 调用

`_crossbank.ts` 提供延迟注册 + 地址解析机制：

1. `index.ts` 加载时将 48 个 bank 注册到全局 registry
2. `crossBankCall(ctx, '$C4B9', bank8000, bankA000)` 找到目标 bank 和函数
3. 自动处理 `$Axxx` → `$8xxx` 地址归一化（同 bank 不同映射窗口）

### 数据 Bank 工厂

33 个纯数据 bank 具有相同结构：ROM 数据 + 空 dispatch + 空 fns。通过 `_mkDataBank(rom, bankNum)` 工厂函数在 `index.ts` 中动态生成，无需 33 个重复壳文件。

## 工作流程

> 叠加推进式排错：修复一个问题 → 运行验证 → 发现新问题 → 记录 → 继续修复，如此迭代。

```
[现象] → [根因分析] → [修复] → [验证/发现下一个]
  ↑                                              ↓
  └──────────────── 循环推进 ────────────────────┘
```

详见 [`worklog.md`](./worklog.md)。

## 相关文件

| 文件 | 说明 |
|------|------|
| `_romdata/bank_XX_data.ts` | 每个 bank 的原始 8KB ROM 切片 (4KB Uint8Array) |
| `../_context.ts` | 游戏运行时上下文 (GameContext) |
| `../_types.ts` | 基础类型 (Byte, Word 等) |
| `worklog.md` | 工作日志，记录所有排错/修复过程 |
