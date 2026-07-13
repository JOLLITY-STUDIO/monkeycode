# Langrisser II - VDP 写入位置与精灵/瓦片分类完整分析

> 来源: ASM反汇编 + VRAM/CRAM dump + execution-trace.md + 游戏TS代码

---

## 一、VDP 内存布局 (Sega MD 标准)

| VRAM 地址 | 大小 | 用途 | Langrisser II 配置 |
|-----------|------|------|-------------------|
| 0x0000 - 0xBFFF | 49KB | Tile 图案数据 (BG + Sprite共享) | R6=0→精灵tile基址=0x0000 |
| 0xC000 - 0xCFFF | 4KB | Plane A Nametable | R2=0x30→0xC000 |
| 0xD800 - 0xDBFF | 1KB | Sprite Attribute Table (80精灵×8B) | R5=0x6C→0xD800 |
| 0xE000 - 0xEFFF | 4KB | Plane B Nametable | R4=0x07→0xE000 |
| 0xF000 - 0xFFFF | 4KB | Window Nametable | R3=0x3C→0xF000 |

---

## 二、所有 VDP 写入位置 (ASM rom.asm)

### 2.1 VDP 寄存器写入

| ASM行号 | ROM地址 | 操作 | 用途 |
|---------|---------|------|------|
| 22358 | 0x82EA | `move.w #$8014,(VDP_CTRL).l` | **HBlank 中断使能** (Reg#0=$14) |
| 22363 | 0x82F6 | `move.w #$8004,(VDP_CTRL).l` | **显示关闭** (Reg#0=$04) |
| 22651 | 0x8574 | `move.w #$8004,(VDP_CTRL).l` | VBlank内关闭显示 |
| 22374 | 0x830E | `move.w d1,(VDP_CTRL).l` | **DMA 使能/禁止** (Reg#1 bit6 via $FFFF81A9) |
| 22644 | 0x8566 | `move.w d1,(VDP_CTRL).l` | DMA 禁止 (VBlank末尾) |
| 32845 | 0xC7CC | `move.w #$9194,(VDP_CTRL).l` | **WindowH=20** (Reg#17) |
| 32866 | 0xC7FA | `move.w #$929E,(VDP_CTRL).l` | **WindowV=30** (Reg#18) |
| 100482 | 0x2D0B8 | `move.w d1,(VDP_CTRL).l` | DMA 使能 (多处方调用) |

### 2.2 VRAM/CRAM/VSRAM 地址设置 + 数据写入

| ASM行号 | 地址设置 | 数据写入 | 目标 |
|---------|---------|---------|------|
| 22659→22664 | `#$C0000000→VDP_CTRL` (CRAM addr=0) | `#$000E→VDP_DATA` ×64次 | **CRAM 清空**(全黑) |
| 24477→24482 | `#$74000003→VDP_CTRL` (VRAM addr=$F400) | `d0→VDP_DATA` ×184次 | **HScroll表**(184行滚动值) |
| 24533→24535 | `#$40000010→VDP_CTRL` (VSRAM addr=0) | `d0→VDP_DATA` | **VSRAM 垂直滚动** |
| 22612→22616 | `d1→VDP_CTRL` (动态VRAM addr) | `(a2)+,(a2)→VDP_DATA` | **DMA传输**(2 word) |
| 32806 | `d0→VDP_CTRL` (动态VRAM addr) | (后续间接写) | 画面切换VRAM写 |

### 2.3 DMA 命令处理器 (5 个入口)

| ASM行号 | ROM地址 | 函数 | 说明 |
|---------|---------|------|------|
| 22610 | 0x852A | VBlank DMA handler | `lea VDP_DATA,a1` + `(a2)→(a1)` |
| 23422 | 0x8ABA | FUN_00008a6c 主入口 | `lea VDP_CTRL,a3` + `lea VDP_DATA,a4` |
| 27293 | 0xA200 | loc_00A1F6 | 另一个 DMA copy 例程 |
| 31980 | 0xC24A | loc_00C24A | 第三个 DMA copy 例程 |
| 24306 | 0x8F7E | loc_008F60 | 第四个 DMA 例程 |

### 2.4 DMA 命令码 (5word=10B 格式)

| 命令码 | 功能 | 典型用途 |
|--------|------|---------|
| 0xFFF5 | VRAM填充 | 清空 VRAM 区域 |
| 0xFFF6 | DMA传输(带长度) | 通用VRAM拷贝 |
| 0xFFF8 | DMA传输(简化) | 快速拷贝 |
| 0xFFF9 | DMA传输(标准) | **主要传输方式** |
| 0xFFFA | DMA→VRAM | CRAM/VRAM传输 |
| 0xFFFB | DMA→VSRAM | VSRAM传输 |
| 0xFFFC | 单word写VRAM | 寄存器设置 |
| 0xFFFD | VSRAM写入 | 滚动值设置 |
| 0xFFFE | VDP寄存器写 | Reg配置 |
| 0xFFFF | VDP数据写 | 单值写入 |

---

## 三、VRAM Dump 对比分析: 标题画面 vs 开场动画

### 3.1 标题画面 VRAM (共33346字节非零数据)

```
VRAM 区域              大小(tiles)  分类
0x0010 - 0x1D67        ~235 tiles   标题画面主BG (标题logo+背景)
0x1D90 - 0x2AD2        ~107 tiles   标题画面BG延伸
0x2B10 - 0x2BA9          ~5 tiles   BG碎片
0x2BCA - 0x2CC1          ~8 tiles   BG碎片
0x2D10 - 0x2DAF          ~5 tiles   BG碎片
0x4F00 - 0x5A80          ~92 tiles  **UI面板/状态栏** 
0x6206 - 0x6222          ~1 tile    **字体tile #1**
0x6246 - 0x6262          ~1 tile    **字体tile #2**
0x6286 - 0x62A2          ~1 tile    **字体tile #3**
0x62C6 - 0x62E2          ~1 tile    **字体tile #4**
0x6306 - 0x6322          ~1 tile    **字体tile #5**
0x6346 - 0x6362          ~1 tile    **字体tile #6**
0x6386 - 0x63A2          ~1 tile    **字体tile #7**
0x63C6 - 0x63E2          ~1 tile    **字体tile #8**
0x650B - 0x651D          ~1 tile    小图标
0x658C - 0x659C          ~1 tile    小图标
0x70C0 - 0x76C0          ~48 tiles  **角色精灵图或HUD元素**
0x7800 - 0x7868          ~4 tiles   小元素
0x7A01 - 0x7B70          ~12 tiles  小元素
```

### 3.2 开场动画 VRAM (共22854字节非零数据)

```
VRAM 区域              大小(tiles)  分类
0x0018 - 0x032F          ~25 tiles  开场BG
0x1000 - 0x2B90         ~221 tiles  **开场动画主BG**
0x5000 - 0x5840          ~66 tiles  开场UI元素
0x6140-0x64D8 (16块)    ~16 tiles   字体tile (编号偏移不同)
0x7140 - 0x7528          ~32 tiles  开场额外元素
0x7800 - 0x7854          ~3 tiles   小元素
```

### 3.3 关键发现

1. **字体tile位置不同**: 标题画面用VRAM 0x62xx区域，开场动画用0x61xx-0x64xx区域
   这说明**字体是在需要时动态加载到VRAM**的，不是ROM中固定的

2. **BG tile完全不共享**: 标题画面和开场动画的主BG tiles都在不同地址
   证实了每场景独立加载tile数据的机制

3. **Nametable (0xE000-0xFFFF) 全为零**: 说明这些dump在VBlank期间采集(显示OFF)
   或者nametable由DMA动态填充

4. **精灵表区域(0xD800-0xDBFF) 在dump中无法体现**: 
   可能需要从RAM dump中读取Sprite Attribute Table数据

---

## 四、精灵图(Sprite) 相关

### 4.1 精灵属性表 (Sprite Attribute Table)

- **VRAM基址**: 0xD800 (R5=0x6C → 0x6C<<9 = 0xD800)
- **大小**: 80个精灵 × 8字节 = 640字节 (0x280)
- **精灵tile基址**: 0x0000 (R6=0x00 → 0x00<<13 = 0x0000)

### 4.2 精灵数据结构 (每精灵8字节)

```
偏移 0-1: Y位置 (0=隐藏, 1-512=可见Y+128)
偏移 2:   尺寸 (高4位=宽, 低4位=高, tile数)
偏移 3:   Link (链表指针, 0xFF=链表尾)
偏移 4-5: Tile属性 (bit15=pri, bit14-13=pal, bit12=hflip, bit11=vflip, bit10-0=tile#)
偏移 6-7: X位置 (0-512)
```

### 4.3 精灵DMA加载函数 (FUN_0000a052)

**位置**: ROM 0xA052
**功能**: 从精灵脚本指针表加载精灵数据

```
精灵条目 (34字节/条):
  word[0]: 精灵ID (0xFFFF=结束)
  word[1-16]: 32字节精灵数据 (DMA源→VRAM)
```

### 4.4 主角色精灵图判定方法

因为VRAM中tile数据是BG和Sprite共享的同一块区域(0x0000-0xBFFF)，**区分方法**：
- **通过Sprite Attribute Table (0xD800) 来判定哪些tile用作精灵**
- SAT中的 tileStart 字段指向的就是精灵使用的tile
- 不在SAT中的tile → BG tile或未使用

### 4.5 字体tile特征

字体tiles呈现规律分布(每56字节=1个4bpp tile)，在多场景中重复出现：
- 标题画面: 8个字体tile在0x6206-0x63E2
- 开场动画: 16个字体tile在0x6140-0x64D8
- 都是从资源系统按需加载，非ROM固定地址

---

## 五、CRAM 调色板分析

### 标题画面调色板 (4个调色板使用中)

**Palette 0**: 标题画面主调色板
- 含亮蓝(#000049)、金(#ffdb00)、红(#b60000)、橙(#ff9200)等
- 可能是**标题logo/文字**的调色板

**Palette 1**: 灰度+绿色系
- 含黑白灰渐变 + 绿色(#00ff00, #006d00, #004900)
- 可能是**背景/UI面板**的调色板

**Palette 2**: 暖色+绿色系
- 含红色系(#240000→#db0000) + 粉色(#ffb6ff) + 绿色+灰色
- 可能是**角色精灵**的调色板

**Palette 3**: 蓝色系
- 含蓝色渐变(#dbffff→#002449) + 品红(#ff006d×6)
- 可能是**水面/天空/标题背景**的调色板

---

## 六、资源加载系统 (用于理解tile数据来源)

### 资源类型

| 类型码 | 算法 | 用途 |
|--------|------|------|
| 0x01 | Nibble RLE | 4bpp tile图案 |
| 0x02 | 位平面压缩 | 2/4/6-plane tile |
| 0x03 | LZSS | 通用数据(含tile) |

### 加载路径

```
游戏逻辑设置资源ID
  → FUN_000099b2 (通用加载+DMA)
    → FUN_00009a0e (资源指针表查找: ROM 0x0B0000)
    → FUN_000099fa (类型分发: RLE/LZSS/位平面解压)
    → 解压到 RAM 0xFF1000 缓冲区
    → DMA (0xFFF9命令) → VRAM目标地址
```

---

## 七、HScroll 和 VScroll

### HScroll (水平行滚动)

- **VRAM地址**: 0xF400 (通过 `#$74000003` 设置)
- **大小**: 184 word = 368字节 (224行显示 + 额外)
- **写入**: 每帧VBlank中由 FUN_00009074 写入
- **两种模式**:
  - 模式0: 整屏统一滚动
  - 模式1: 逐行滚动 (使用 DAT_ffff905C 滚动表, 184项)

### VScroll (垂直滚动)

- **VSRAM地址**: 0x0000 (通过 `#$40000010` 设置)
- **大小**: 40 word = 80字节
- **写入**: 每帧VBlank写入1个word (2列滚动值)

---

## 八、总结: 瓦片/精灵分类一览

| 类别 | VRAM位置范围 | 识别方式 | 数据来源 |
|------|-------------|---------|---------|
| **BG 主背景tile** | 0x0000-0xBFFF (场景相关) | 被 Plane A/B nametable 引用 | ROM→LZSS/RLE→DMA→VRAM |
| **Sprite 精灵tile** | 0x0000-0xBFFF (与BG共享) | 被 SAT (0xD800) 的 tileStart 引用 | ROM→解压→DMA→VRAM |
| **UI 面板tile** | 0x4F00-0x5A80区域 | 被 nametable 引用, 场景间部分共享 | 按需加载 |
| **字体 tile** | 0x6140-0x64D8区域 | 被 nametable 引用, 规律间隔(56B/tile) | 按需加载 |
| **Plane A Nametable** | 0xC000-0xCFFF | VDP R2 配置 | DMA写入 |
| **Sprite Attribute Table** | 0xD800-0xDBFF | VDP R5 配置 | DMA写入 |
| **Plane B Nametable** | 0xE000-0xEFFF | VDP R4 配置 | DMA写入 |
| **HScroll 表** | 0xF400-0xF6FF | FUN_00009074 写 | 实时计算 |
| **Window Nametable** | 0xF000-0xFFFF | VDP R3 配置 | (本游戏可能未使用) |
| **VSRAM** | CRAM/VSRAM端口 | FUN_00009074 写 | 实时计算 |
| **CRAM 调色板** | CRAM端口 128B | 4组×16色, DMA命令0xFFFA | ROM→DMA→CRAM |
