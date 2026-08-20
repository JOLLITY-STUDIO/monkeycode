# 角色数值与升级规则 — ROM 数据定位文档

> 来源: `tools/tsubasa2-mod-nes` (mazong1123 的 Hack CT2 工具) + `_tmp_bzk_out/CaptainTsubasaVol.II-SuperStrikerROM修改参考.txt` (Whipon 的 ROM Hacking Guide)

## 1. 角色列表 (0x01-0x75 共 117 个明星 + 杂鱼)

| ID | 名称 (英/中) | ID | 名称 | ID | 名称 |
|----|-------------|----|------|----|------|
| 01 | Tsubasa 大空翼 | 02 | Lennart {GK} 雷纳托 | 03 | Lima 利马 |
| 04 | Marini 马里尼 | 05 | Amaral 阿马拉尔 | 06 | Dottil 杜托尔 |
| 07 | Battista 巴蒂斯塔 | 08 | Tahamata 塔哈马塔 | 09 | Babinton 巴宾顿 |
| 0A | Gil 吉尔 | 0B | Platton 普拉顿 | 0C | Urabe 浦边反次 |
| 0D | Kishida 岸田猛 | 0E | Nakayama 中山政人 | 0F | Morisaki {GK} 森崎有三 |
| 10 | Takasugu 高杉真吾 | 11 | Misaki 岬太郎 | 12 | Izawa 井泽守 |
| 13 | Taki 泷一 | 14 | Ishizaki 石崎了 | 15 | Nitta 新田瞬 |
| 16 | Kisugi 来生哲兵 | 17 | Masao 立花政夫 | 18 | Kazuo 立花和夫 |
| 19 | Sano 佐野满 | 1A | Hyuga 日向小次郎 | 1B | Souta 早田诚 |
| 1C | Jitou 次藤洋 | 1D | Matsuyama 松山光 | 1E | Sorimachi 反町一树 |
| 1F | Sawada 沢田武志 | 20 | Misugi 三杉淳 | 21 | Wakabayashi {GK} 若林源三 |
| 22 | Wakashimazu {GK} 若岛津健 | 23 | Satilst 萨托斯泰吉 | 24 | Riverio 里维里奥 |
| 25 | Da Silva 达席尔瓦 | 26 | Meon {GK} 梅昂 | 27 | Toninho 托尼纽 |
| 28 | Nei 内伊 | 29 | Zagalo 扎加洛 | 2A | Dircil 迪尔修 |
| 2B | Carlos 卡洛斯·山塔拿 | 2C | Santamaria 圣马利亚 | 2D | Jethrio 杰特里奥 |
| ... (2E-40 重复: 日本杯/世界杯队员) ... | | | | |
| 57 | Napoleon 拿破仑 | 58 | Pierr 皮埃尔 | 60 | Dias 迪亚斯 |
| 63 | Schneider 施奈德 | 6A | Carlos 卡洛斯 | 75 | Coimbra 辛巴拉 |

**头型数据**: ROM `0x28901` + playerIndex (0-116)，PlayModList 18 种头型模板 (00 Tsubasa ~ 11 Gisecce/Nakanishi)
**颜色数据**: 明星 ROM `0x2b821` + index*5 (肤色/发色/上衣/短裤/备用)，杂鱼 ROM `0x2b6d7` + index*5

## 2. 球员能力值 (ROM `0x39fde`, 每球员 24 字节)

**地址公式**: `0x39fde + playerIndex * 24`

| 偏移 | 字段 | 范围 |
|------|------|------|
| 0 | Stamina (体力) | 0-255 |
| 1 | Shot (射门) | 0-255 |
| 2 | Pass (传球) | 0-255 |
| 3 | Dribble (盘带) | 0-255 |
| 4 | Block (阻挡) | 0-255 |
| 5 | Tackle (铲球) | 0-255 |
| 6 | Intercept (拦截) | 0-255 |
| 7 | Low Shot (低空射门) | |
| 8 | Low Pass (低空传球) | |
| 9 | Low Trap (低空停球) | |
| A | Low Let-through (低空漏球) | |
| B | Low Controlled Clear (低空受控解围) | |
| C | Low Uncontrolled Clear (低空非受控解围) | |
| D | Low Ball Challenge (低空争球) | |
| E | Low Interception (低空拦截) | |
| F | High Shot (高空射门) | |
| 10 | High Pass (高空传球) | |
| 11 | High Trap (高空停球) | |
| 12 | High Let-through (高空漏球) | |
| 13 | High Controlled Clear (高空受控解围) | |
| 14 | High Uncontrolled Clear (高空非受控解围) | |
| 15 | High Ball Challenge (高空争球) | |
| 16 | High Interception (高空拦截) | |

## 3. 守门员能力值 (ROM `0x3ae96`, 每球员 8 字节)

**地址公式**: `0x3ae96 + playerIndex * 8`

| 偏移 | 字段 |
|------|------|
| 0 | Stamina (体力) |
| 1 | Pass (传球) |
| 2 | Catching (扑接) |
| 3 | Punching (击球) |
| 4 | Vs Shots (对射门) |
| 5 | Vs Dribbles (对盘带) |
| 6 | Low Rush (低空冲出) |
| 7 | High Claim (高空摘球) |

## 4. 运行时 RAM 地址 (比赛内存)

### 玩家队球员槽 (RAM `$0300`-$`042f`)
每个球员 12 字节，间隔 `$0C`:
- **Player 01 (GK)**: `$0300` (球员ID), `$0301-0302` (Guts 体力, 16bit), `$0303` (Level 等级)
- **Player 02**: `$030C`, `$030D-030E` (Guts), `$030F` (Level)
- **Player 03**: `$0318`, `$0319-031A`, `$031B`
- ... (步进 `$0C`)
- **Player 11**: `$0378`, `$0379-037A`, `$037B`

### 替补席 (RAM `$0408`-$`042f`)
- **Player 12**: `$0408`, `$0409-040A`, `$040B`
- ... (步进 `$0C`)
- **Player 19**: `$0424`, `$0425-0426`, `$0427`
- **Player 20 (GK)**: `$0428`, `$0429-042A`, `$042B`
- **Player 21 (GK)**: `$042C`, `$042D-042E`, `$042F`

### CPU 队球员槽 (RAM `$0384`-$`03ff`)
- **CPU Player 1 (GK)**: `$0384`, `$0385-0386`, `$0387`
- **CPU Player 2**: `$0390`, `$0391-0392`, `$0393`
- ... (步进 `$0C`)
- **CPU Player 11**: `$03FC`, `$03FD-03FE`, `$03FF`

### 经验值
- RAM `$0454` + playerIndex * 2 (16bit 经验值)
- 或文档中 `$454/$467` 区段 (待精确确认)

### 启用 Cyclone
- RAM `$0448:01` (Tsubasa Cyclone 启用标志)

### 比赛时间
- RAM `$05F7:XX` (playtime)

### 阶段/半场选择
- `$0026` (Stage Select 场景), `$0027` (Half Select: 00=1st, 01=2nd)

## 5. 必杀技 ROM 地址

### 射门类型 (Shot Digits)
| 码 | 名称 | 码 | 名称 |
|----|------|----|------|
| 00 | Normal | 01 | Volley | 02 | Head |
| 03 | Drive Shot | 04 | Drive Bicycle | 05 | Falcon Shot |
| 06 | Falcon Volley | 07 | Razor Shot | 08 | Skylab Huracan |
| 09 | Twin Shot | 0A | Skylab 2X Shot | 0B | Eagle Shot |
| 0C | Tiger Shot | 0D | Neo Tiger Shot | 0E | Bicycle Kick |
| 0F | Hyper Bicycle Kick | 10 | Jumping Volley | 11 | Drive Tiger |
| 12 | Cyclone | 13 | Sano Combo | 14 | Banana Shot |
| 15 | Buster Shot | 16 | Mirage Shot | 17 | Mach Shot |
| 18 | Side Wind | 19 | Slider Shot | 1A | Cannon Shot |
| 1B | Fire Shot | 1C | Dyna Head | 1D | Cyclone Head |
| 1E | Rocket Head | 1F | Red Dragons | 20 | Back Shot |
| 21 | Slider Cannon | 22 | Double Eel |

### 盘带类型 (Dribble Digits)
00 Normal / 01 High Lift / 02 Force Dribble / 03 Fake Dribble / 04 Speed Dribble / 05 Fast Dribble / 06 Super Dribble

### 传球类型 (Pass Digits)
00 Normal / 01 Drive Pass / 02 Razor Pass / 03 Top Spin Pass

### 角色必杀技表 (ROM `$8F00`+ 区)
每个角色 7 项技能 × 2 字节 (RAM地址/ROM地址):
- Shot, Pass, Dribble, 1-2, Block, Tackle, Pass Cut

| 角色 | Shot ROM | Pass ROM | Dribble ROM | ... |
|------|---------|---------|------------|-----|
| Tsubasa (Everytime) | `$8F17/$8F18` `038F27/038F28` | `$8F19/$8F1A` | `$8F1B/$8F1C` | ... |
| Souta | `$8F87/$8F88` `038F97/038F98` | | | |
| Jitou | `$8F95/$8F96` `038FA5/038FA6` | | | |
| Ishizaki | `$8F33/$8F34` `038F43/038F44` | | | |
| Matsuyama | `$8FA3/$8FA4` `038FB3/038FB4` | | | |
| Masao | `$8F4F/$8F50` `038F5F/038F60` | | | |
| Kazuo | `$8F5D/$8F5E` `038F6D/038F6E` | | | |
| Misaki | `$8F25/$8F26` `038F35/038F36` | | | |
| Hyuga | `$8F79/$8F7A` `038F89/038F8A` | | | |
| Nitta | `$8F41/$8F42` `038F51/038F52` | | | |
| Sano | `$8F6B/$8F6C` `038F7B/038F7C` | | | |
| Sawada | `$8FB1/$8FB2` `038FC1/038FC2` | | | |
| Misugi | `$8FBF/$8FC0` `038FCF/038FD0` | | | |
| Napoleon | `$920B/$920C` `3921B/3921C` | | | |
| Pierr | `$9219/$921A` `39229/3922A` | | | |
| Diaz | `$926D/$926E` `3927D/3927E` | | | |
| Schneider | `$9289/$928A` `39299/3929A` | | | |
| Kapilman | `$92B3/$92B4` `392C3/392C4` | | | |
| Carlos Santana | `$92C1/$92C2` `392D1/392D2` | | | |
| Coimbra | `$933F/$9340` `3934F/39350` | | | |

## 6. 升级规则

**经验值地址**: RAM `$0454` + playerIndex * 2 (16bit)
- 文档中 `$454/$467` 区段为经验值存储区

**显示数值 vs 真实数值**:
- 真实体力显示: ROM `0x39F1E` (16bit 值列表, 如 `90 01 98 01...CC 03 D0 03`, 0x0190=400, 0x0198=408)
- 真实能力显示: ROM `0x39E5E` (能力值列表, 如 `08 08...FE FF`)
- 体力上限: 设 stat=29, level=0x3E → 所有 stat 达 246 无副作用

**Stats Modifier (23 bytes per character)**:
| 角色 | ROM 地址 | RAM 地址 |
|------|---------|---------|
| Hyuga | `$A166` `03A176` | |
| Ishizaki | `$A11E` `03A12E` | |
| Jitou | `$A196` `03A1A6` | |
| Kazuo/Masao | `$A136` `03A146` | |
| Matsuyama | `$A1AE` `03A1BE` | |
| Misaki | `$9FFE` `03A00E` | |
| Misugi | `$A1F6` `03A206` | |
| Morisaki (GK) | `$AE8E` `03AE9E` | |
| Nitta | `$A016` `03A026` | |
| Sano | `$A14E` `03A15E` | |
| Sawada | `$A1DE` `03A1EE` | |
| Souta | `$A17E` `03A18E` | |
| Tsubasa | `$9FE6` `039FF6` | |
| Wakabayashi (GK) | `$AE9E` `03AEAE` | |
| Wakashimazu (GK) | `$AE96` `03AEA6` | |

## 7. 队伍编辑 (ROM 地址)

### 玩家队 (Sao Paulo/Nankatsu/Japan) 队员配置
- **Sao Paulo (圣保罗赛事)**: ROM `$AA47`-$`AA51` (11 人)
- **Nankatsu (日本高中联赛)**: ROM `$AA53`-$`AA5D` (11 人)
- **Asian/Exhibition/World Cup**: ROM `$AA5F`-$`AA69` (11 人) + 替补 `$AA6A`-$`AA73` (12 人含 2 GK)

### CPU 队伍 (各赛事)
- **Brazil League**: Corinthians/Gremio/Palmeiras/Santos/Flamengo
  - 各队 ROM `$03BB1A`+ 区 (队员 ID 列表)
- **Japan High School**: Kunimi/Akita/Tatsunami/Musashi/Furano/Toho
  - 各队 ROM `$03BB62`+ 区
- **Japan Cup**: As Rome/Uruguay/Hamburg/Japan
  - 各队 ROM `$03BBB4`+ 区
- **World Cup**: 16 支国家队
  - 各队 ROM `$03BC0A`+ 区, Brazil 半场切换地址 `$03DBFF/$03DBFC`

### 阵型战术 (ROM `$3bac2`)
- 0: 4:3:3, 1: 4:4:2, 2: 3:5:2, 3: Brazilian Formation
- 4: Normal, 5: Pressing, 6: Counterattack
- 队伍配置: 1 byte 高 4 位=防守战术 + 低 4 位=阵型

## 8. 项目待办

1. **新建 `src/game/data/rom-data/player-stats.ts`**: 从 ROM `0x39fde` 提取 117 球员 × 24 字节能力值
2. **新建 `src/game/data/rom-data/gk-stats.ts`**: 从 ROM `0x3ae96` 提取 GK × 8 字节能力值
3. **新建 `src/game/data/rom-data/character-list.ts`**: 117 角色 ID→名称映射
4. **新建 `src/game/data/rom-data/special-moves.ts`**: 角色必杀技 ROM 地址表
5. **新建 `src/game/data/rom-data/team-roster.ts`**: 各赛事队伍队员配置
6. **更新 `src/game/model/types.ts`**: PlayerStats 扩展为 22 字段 (低空/高空各 7 项)
7. **新建 `src/game/service/levelup.service.ts`**: 经验值/升级逻辑 (RAM $0454 区)
