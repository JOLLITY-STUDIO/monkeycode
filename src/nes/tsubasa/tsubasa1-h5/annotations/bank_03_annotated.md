# Bank 03 — 球员/球队数据 Bank

> **源文件**: `_tmp_disasm_out/banks/bank_03_data.asm`
> **类型**: Data Bank (Switchable，主要数据区)
> **CPU地址**: $8000-$BFFF | **ROM偏移**: $0C010-$0FFFF | **大小**: ~869KB
> **CDL标记**: Data 为主 | **分析日期**: 2026-08-05

---

## 1. 概述

Bank 03 是游戏核心数据 Bank，存储所有球员、球队的静态数据。

| 内容 | 说明 |
|------|------|
| **球员数据** | 各球员的能力值、必杀技、属性等 |
| **球队数据** | 各球队的球员列表、阵型等 |
| **关卡数据** | 关卡/比赛的数据配置 |
| **角色属性表** | 球员属性定义和映射 |

Bank 0 的多个 API 函数直接操作此 Bank 数据：
- `$8047`: JMP `$AB6F` — 根据索引获取球员数据结构指针
- `$8050`: JMP `$AB7C` — 球员数据操作
- `$805C`: JMP `$AB94` — 球员数据操作

---

## 2. 数据结构 (推断)

### 2.1 球员数据结构

基于 Bank 0 `$8047` (GetPlayerPointer) 和 `$8050` (PlayerDataOps):

```
每个球员数据块 (估计 32-64 字节):
Offset 0-1:   球员 ID/编号
Offset 2-3:   球员名称指针 (指向 Bank 7 文本)
Offset 4:     位置 (FW/MF/DF/GK)
Offset 5:     能力值 - 射门
Offset 6:     能力值 - 传球
Offset 7:     能力值 - 盘带
Offset 8:     能力值 - 拦截
Offset 9:     能力值 - 速度
Offset 10:    体力
Offset 11-15: 必杀技 ID 列表
Offset 16-31: 其他属性 (头像、特殊技能等)
```

### 2.2 球队数据结构

```
每个球队数据块 (估计 16-32 字节):
Offset 0:     球队 ID
Offset 1:     球员数量
Offset 2-17:  球员 ID 列表 (最多 16 位)
Offset 18:    阵型 ID
Offset 19:    战术风格
```

---

## 3. 与 Bank 7 的交互

Bank 3 数据可在 Bank 2/3 切换时被 Bank 7 的事件脚本访问。
CDL 标记 `D 3` 表明 Bank 7 的数据被 Bank 3 作为数据引用。

---

## 4. 待确认/疑问点

- [ ] 球员数据块精确的字节布局
- [ ] 必杀技 ID 与 Bank 6/7 的关联
- [ ] 球队数据与关卡数据的区分
- [ ] 是否有压缩/编码格式

---

*分析日期: 2026-08-05*
*依据: ASM_ANNOTATION_PLAN + bank_00_annotated (Bank 0 API 函数) + bank_07 CDL marks*
