# 用户指令记忆

本文件记录了用户的指令、偏好和教导，用于在未来的交互中提供参考。

## 格式

### 用户指令条目
用户指令条目应遵循以下格式：

[用户指令摘要]
- Date: [YYYY-MM-DD]
- Context: [提及的场景或时间]
- Instructions:
  - [用户教导或指示的内容，逐行描述]

### 项目知识条目
Agent 在任务执行过程中发现的条目应遵循以下格式：

[项目知识摘要]
- Date: [YYYY-MM-DD]
- Context: Agent 在执行 [具体任务描述] 时发现
- Category: [运维部署|构建方法|测试方法|排错调试|工作流协作|环境配置]
- Instructions:
  - [具体的知识点，逐行描述]

## 去重策略
- 添加新条目前，检查是否存在相似或相同的指令
- 若发现重复，跳过新条目或与已有条目合并
- 合并时，更新上下文或日期信息

## 条目

---

Langrisser II MD ROM 地址速查
- Date: 2026-07-12 (07-13更新: 角色初始表/场景配置/职业表字段完整破解)
- Context: ROM 逆向工程地址映射 (全面修订 + 场景加载调用链 + 角色初始化)
- Category: 环境配置
- Instructions:
  - 所有地址均为 32 位大端 (68K 格式), 不可用 24 位掩码
  - === 角色初始值 (已定位, 纠正之前的误判) ===
  - 角色能力初始表: 0x05E64A (10角色×0x18字节, FUN_00010a94→RAM 0xFFFFA4CC)
  - 角色初始CLASS_ID: 0x05E64A+0x10=0x05E65A (DAT_ffffa4dc, 每角色+0x18)
  - 职业基础AT/DF表: 0x05EDDC (0x1C字节/职业, class_id×0x1C索引, FUN_00010bbe读取)
    ★修正: 0x05EDDC是表起始, 不是0x05EDE9. 0x05EDE9是表内偏移0x0D(MV字段)
  - 角色AT/DF修正表: 0x082A59 (6字节/角色, FUN_00010bbe叠加)
  - 数据流: ROM 0x05E64A →[FUN_00010a94]→ RAM 0xFFFFA4CC →[FUN_00010bbe]→ 0xFF60xx槽
  - 角色RAM槽回写: FUN_0000e2da/FUN_00011c78 从0xFF603C写回0xFFFFA4CC
  - === 0x05E64A 角色能力初始表字段定义 (14B有效+10B预留=0x18B/角色) ===
    ROM[0x00] baseClassId  基础职业ID    → 角色槽0x00
    ROM[0x01] baseMP       MP基础值      → 角色槽0x38/0x39 (CLASS_ID==0x1D时翻倍,上限99)
    ROM[0x02-03] atModifier AT修正word   → 角色槽0x2E-2F
    ROM[0x04-05] dfModifier DF修正word   → 角色槽0x3A-3B
    ROM[0x06-09] skillBits   技能位dword → 角色槽0x50-53
    ROM[0x0A-0B] reserved    预留
    ROM[0x0C] moveRange     移动范围     → 角色槽0x15
    ROM[0x0D] portraitIdx   头像索引     → 角色槽0x5F (FUN_00010d04)
    ROM[0x0E] subClass      子职业       → 角色槽0x09
    ROM[0x0F] classFlags    附加职业属性 → 角色槽0x0A
    ROM[0x10] classId       CLASS_ID ★   → 角色槽0x0B
    ROM[0x11] commandRange  指挥范围     → 角色槽0x16 (FUN_00010d04)
    ROM[0x12-13] reserved   预留
  - === 0x082A59 角色AT/DF/MV修正表 (6B/角色, 10角色) ===
    byte[0x00] atBonus  AT修正 (加到角色槽0x46)
    byte[0x01] dfBonus  DF修正 (加到角色槽0x47)
    byte[0x02] mvBonus  MV修正 (加到角色槽0x44)
    byte[0x03-05] unknown 预留(FUN_00010bbe未读取)
  - === 0x0821BE 场景单位配置指针表 (4B×31关, 每指针指向128B配置) ===
    ★修正: 不是直接128B/关, 而是4B指针表, 每指针指向128B配置块
    128B配置分为4段(每段32B=8 dword), 按单位阵营选择 (FUN_0000a16a):
    段0 (0x00-0x1F): 玩家方 (unit[0x20]==1)
    段1 (0x20-0x3F): AI特殊 (unit[0x20]==3)
    段2 (0x40-0x5F): NPC (其他)
    段3 (0x60-0x7F): 默认敌方
    6种变体: 0x08223A(默认), 0x0822BA(4,12,23), 0x08233A(8),
             0x0823BA(11), 0x08243A(25-27,31), 0x0824BA(22,28,30)
  - === 0x05EDDC 职业数据表 (0x1C字节/职业, 修正字段定义) ===
    offset 0x00 (word): dataOffset 相对偏移 → 数据指针 = 0x05EDDC + 此值
                        Ghidra: *(char**)(unit+0x0F) = &DAT_0005eddc + *(short*)(DAT_0005eddc + classId*0x1C)
    offset 0x02 (word): field_02 (FUN_0000b558读取作为索引)
    offset 0x04 (word): terrainModOff 地形修正表相对偏移
                        terrainDef = DAT_0005eddc[terrainId + DAT_0005ede0[classId*0x1C]]
    offset 0x06 (byte): moveType 移动类型 (0x0F=飞行? 0x10=水兵? 见FUN_0000c010)
    offset 0x07 (byte): field_07
    offset 0x08 (byte): flag_08 标志位 (==0检查)
    offset 0x09-0A (word): reserved
    offset 0x0B (byte): cmdRange2 → 角色槽0x17 (DAT_0005ede7)
    offset 0x0C (byte): cmdRange3 → 角色槽0x19 (DAT_0005ede8)
    offset 0x0D (byte): mv MV移动力 → 角色槽0x44 (DAT_0005ede9)
    offset 0x0E (byte): range Range射程 → 角色槽0x45 (DAT_0005edea)
    offset 0x0F (byte): baseAT AT基础 → 角色槽0x46 (DAT_0005edeb)
    offset 0x10 (byte): baseDF DF基础 → 角色槽0x47 (DAT_0005edec)
    offset 0x11-12 (word): reserved
    offset 0x13 (byte): mp MP/能力位 → 角色槽0x50 (DAT_0005edef)
    offset 0x14-1B (8B): reserved
  - === 数据结构表 ===
  - 职业名表: 0x05E958 (FF分隔, 自定义1字节编码, 非标准Shift-JIS)
  - 职业数据表: 0x05EDDC (28B/条目, class_id×0x1C索引) ★字段定义已修正
  - 角色RAM槽位表: 0x05E5D8 (4B×16条目, 指向0xFF60xx, 每槽0x60=96字节)
  - 兵种克制矩阵: 0x060200 (FF分隔三角矩阵, 8×8基础兵种)
  - 道具名表: 0x060404 (FF分隔, 36条, 以0xFF开头)
  - 道具数据表: 0x060530 (8B×38条目)
  - 场景Boss表: 0x060600 (8B/关, 共12关, 字节对=(class_id,level))
  - 名称指针表: 0x0618E8 (4B/条目, 80条, 指向FF分隔文本, 自定义编码)
  - 地图指针表: 0x061CB0 (4B/条目, 31关, 每指针指向(w:2,h:2,tiles...))
  - Tile属性表: 0x061D2C(底层)+0x061D30(高层) (4B/条目, 交替索引, 各0x280字节)
  - Tile重映射表: 0x061E24(lo)+0x061E28(hi) (4B/条目, 交替索引, 各0x100字节)
  - 地图数据区: 0x061F1C-0x06AE28 (31张地图连续存储, 最大31×64)
  - 角色精灵/头像表: 0x061D40-0x061F1C (4B/条目, 指向0x07xxxx+)
  - === 运行时RAM/Ghidra关键地址 ===
  - 场景加载单位配置: 0x0821BE (4B×31指针数组, 每条128B, 6种变体)
  - 单位组数据指针表: 0x097380 (4B×31指针数组, 指向FFFF分隔组)
  - 单位基础数据组: 0x0975F4+ (滑动窗口, FFFF分隔变长组, ~18组)
  - 场景单位放置组: 0x097400+ (FFFF分隔变长组, 49组含精灵指针)
  - 场景字节码(场景12/23): 0x080328+ (0x11字节/条目的DMA脚本)
  - AI魔法数据: 0x08203E (AI行动参数表)
  - 战斗公式: 0x010932 (跳转表, Ghidra FUN_000108c8)
  - === 单位数据格式 ===
  - FFFF分隔变长组: [word, ..., word, TERM]; TERM∈{FFFF,FFF9,FFFA,FFFB,FFFC,FFFE}
  - FFFF=标准单位入口, FFF9=角色职业序列0..11, FFFB/C/A/E=特殊标志
  - 角色RAM槽结构(0x60B): byte[0]=存在标志, byte[0x0B]=CLASS_ID, byte[6]=X, byte[7]=Y, byte[8]=flags
  - 每角色含8个佣兵子槽(各12B), 通过pcVar2+=0xC遍历, 5个道具槽(各0xC偏移)
  - === Ghidra 场景加载调用链 ===
  - VBLANK(0x8294) → FUN_0000870a → FUN_00009074 → FUN_00009400 → FUN_00000270
  - 地图加载: FUN_00009ec4 (0x061CB0+tile属性+重映射)
  - 场景初始化: FUN_00009fc2 → FUN_00009ffe(加载字节码) → FUN_0000a0ac
  - 单位数据拷贝: FUN_0000a122 ← 从0x0821BE读128B配置
  - 角色槽位初始化: FUN_0000a16a ← 通过0x05E5D8表
  - 精灵DMA: FUN_0000a052 ← 从0x080328读0x11B条目
  - 字节码解释器: FUN_00009498 (脚本调度器, 0x94C2位于此函数循环出口)
  - === 游戏初始化(Ghidra关键函数) ===
  - FUN_0000c80c: 游戏主初始化, 清零DAT_ffffa4aa后调用FUN_00010a94
  - FUN_00010a94: 从ROM 0x05E64A加载10角色能力表, 每角色0x0E字节+0x0A填零=0x18
  - FUN_00010bbe: 玩家角色初始化, 从DAT_ffffa4cc读CLASS_ID→槽0x0B, 从0x05EDDC/0x082A59读AT/DF
  - FUN_00010d04: NPC/敌方单位初始化, 与FUN_00010bbe类似但走另一分支
  - FUN_00010e46: 玩家方单位初始化(从模板0x1E字节直接复制)
  - FUN_00010ed8: 单位槽位遍历与8个佣兵子槽初始化
  - FUN_0000e2da: 将0xFF603C角色槽写回DAT_ffffa4cc能力表(同步更新)
  - FUN_00011c78: 同上, 第二处回写点
  - === 角色清单 ===
  - 10可玩角色 (docs/Langrisser专题站·梦幻模拟战Ⅱ·转职表.html, GBK编码)
  - 英文脚本 (english-script.txt): 35有名角色, Hiryuu Honyaku翻译
  - Riana/Lana共用转职树, 各角色4阶转职
  - === 核心模块 ===
  - md-scenario.js(关卡全数据), md-map.js(地图解析), md-battle.js(战斗),
    md-troops.js(兵种), md-sprite.js(精灵), md-magic.js(道具), md-units.js(单位),
    md-character.js(角色初始表+AT/DF修正+RAM槽位+场景单位配置, NEW)
  - === 参考文件 ===
  - src/langrisser2/ghidra-decompile.c: Ghidra反编译C代码 (44042行)
  - src/langrisser2/english-script.txt: 英文化补丁剧情文本 (228KB)
