/**
 * BANK08_MAP_METATILE — bank08 地图 metatile 定义表 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 08
 *
 * 与 bank07 的区分 (文件名 bank07-scenes-metatile.ts vs bank08-map-metatile.ts):
 *   bank07 = 场景描述符 (scene descriptor): 24 个场景, 每个含 [ptr,ctrl,w,h,pos] + NT tile + 调色板 + 精灵
 *   bank08 = 地图 metatile 字典 (map metatile dictionary): 482 条等长记录, 每条 = 类型标记 + 16B tile 数据
 *   即: bank07 说"这个场景长什么样"(用哪些 metatile 铺), bank08 说"每个 metatile 长什么样"(4 个 tile 编号)
 *   bank07 是"图纸", bank08 是"积木块定义"。两者配合: bank07 引用 metatile 索引, bank08 提供索引对应的 tile。
 *
 * 作用: 足球场的"积木目录"。比赛画面所有草地/球门/看台/球员精灵的图块定义都在这里。
 *       没有 bank8,比赛画面就是一片空白。剧情/MEETING 场景的背景带(草皮+看台+天空)也来自 bank8。
 *
 * 来源: asm/bank08/data_tables.s + data_maps.s + data_tail.s (纯 .byte 流, 无 label)
 * 结构 (asm 实证, 见 bank00/code_render.s:$8EF0 地图画面绘制子程 — 注意是"地图"不是"界面"):
 *   等长 17 字节记录数组, 共 482 条. 索引 N → bank8 偏移 N×17.
 *   每条记录: [0]=类型标记, [1..16]=16 字节数据 (4 个 8×8 tile = 1 个 16×16 metatile)
 *
 * 类型标记:
 *   $AA = 背景 metatile (147 条, 球场静态画面元素)
 *   $FF = 地图行数据 (190 条, 球场一整行的 tile 序列, 把 metatile 铺成完整画面)
 *   $FA = 精灵 metatile (23 条, 动态元素: 足球/球员阴影/特效)
 *   $0F = 精灵 metatile 连续块 (16 条, 紧跟 $FA 后的精灵动画帧)
 *   其他首字节 (106 条): 地图数据区里 tile 编号碰巧是 $00/$55 等, 不是独立类型
 *
 * 含义索引 (按 MT 编号段, 结合 tile 编号 + 比赛截图人工归类):
 *
 *   一、纯色基础 metatile (BG, 4 条, MT_000~MT_003)
 *      MT_000 透明 / MT_001 草皮底色 / MT_002 深色块(看台/暗区) / MT_003 看台色
 *
 *   二、草皮/看台背景带 (BG, MT_008~MT_011, 草皮+看台过渡纹理)
 *
 *   三、广告牌/看台细节 (BG, MT_044~MT_068, 含 tile $1A/$0D/$4E/$6F/$7A/$7B 等)
 *
 *   四、球门网区域 (BG, MT_056~MT_061, 含 tile $50-$5F = 球门网)
 *
 *   五、观众席人群 (BG, MT_080~MT_083, 含 tile $72/$73/$78-$7E)
 *
 *   六、场地白线/边界 (BG, MT_090~MT_104, 含 tile $F0-$F9 = 白色斜线/中圈/角旗)
 *
 *   七、看台结构 (BG, MT_105~MT_111, 含 tile $8D/$27/$F7)
 *
 *   八、球场细节/广告 (BG, MT_117~MT_155, 含 tile $02-$1F)
 *
 *   九、比赛画面人物 (BG, MT_152~MT_155, 含 tile $82-$AD = 球员剪影/远景)
 *
 *   十、天空+看台带 (MAP, MT_004~MT_007, 比赛场地上方的天空+看台行)
 *
 *   十一、地图行数据 (MAP, MT_012~MT_017, MT_046~MT_053, MT_063~MT_079, MT_084~MT_089,
 *                  MT_092, MT_111~MT_116, MT_127, MT_139, MT_146, MT_149)
 *                  把上面的 metatile 铺成完整球场画面的行序列
 *
 *   十二、精灵 metatile (SPR, MT_018~MT_023, 动态元素: 足球/球员阴影/特效)
 *
 *   十三、精灵续块 (SPR2, MT_024~MT_039 紧跟 SPR 后, 精灵动画连续帧)
 *
 *   十四、其他记录 (MT_052/054/055/069~071/081/118~128/130, 首字节非标准, 地图数据区内容)
 *
 * 消费方 (asm 实证):
 *   bank00/code_render.s:$8EF0 地图画面绘制子程 (注意: 只管"地图绘制", 不管"界面渲染"):
 *     入口 A = metatile 索引; 算 $00EA/$00EB 指针 = $A000 + 索引×17;
 *     LDX #$08; JSR $C4B9 (切 bank8 到 $A000 窗口);
 *     LDA ($00EA),Y (读 bank8 记录, Y=0 读类型标记, Y=1.. 读 tile 数据);
 *     读完 LDX #$07; JSR $C4B9 (切回 bank7).
 *   这是全项目唯一切 bank8 的地方 (54 处 $C4B9 调用中仅 1 处 LDX #$08).
 *   $8EF0 全项目仅 1 处调用 (bank00/code_scene.s:436 地图绘制循环, LDA($0063),Y 读地图数据).
 *   bank26 不读 bank8 (bank26 调的 $C50C 是 RAM 玩家数据指针查表, 非 bank8).
 *
 * 注意区分 NES 两套画面机制 (避免误以为 bank00 管"界面渲染"):
 *   地图画面绘制 = bank00 code_render.s $8EF0, 用 NT + metatile 铺图, 读 bank8 ← 本文件
 *   界面/菜单渲染 = bank02 NMI 回调 ($84C1 等), 画文字/窗口边框, 不读 bank8
 *   bank8 只服务于"地图画面"链路, 标题/密码/对话框等界面不碰 bank8.
 *
 * 去 CPU 化: 消费方按 metatile 索引取具名导出 MT_NNN, 不做字节偏移.
 */
/** metatile 记录类型标记 (首字节). 标准 4 种 + 其他值(地图数据区首字节) */
export declare const enum MetatileType {
    BG = 170,/** 背景 metatile */
    MAP = 255,/** 地图行数据 */
    SPR = 250,/** 精灵 metatile */
    SPR2 = 15
}
/** 单条 metatile 记录: 类型标记 + 16 字节 tile 数据 */
export interface MetatileRecord {
    /** 首字节原始值. 标准: $AA=BG / $FF=MAP / $FA=SPR / $0F=SPR2; 其他=地图数据区首字节 */
    readonly type: number;
    readonly tiles: readonly number[]; /** 16 字节 = 4 个 8×8 tile */
}
/** 判断记录是否为标准 metatile 类型 */
export declare function isStandardMetatile(rec: MetatileRecord): boolean;
/** MT_000 (偏移 0, 类型 BG) */
export declare const MT_000: MetatileRecord;
/** MT_001 (偏移 17, 类型 BG) */
export declare const MT_001: MetatileRecord;
/** MT_002 (偏移 34, 类型 BG) */
export declare const MT_002: MetatileRecord;
/** MT_003 (偏移 51, 类型 BG) */
export declare const MT_003: MetatileRecord;
/** MT_004 (偏移 68, 类型 MAP) */
export declare const MT_004: MetatileRecord;
/** MT_005 (偏移 85, 类型 MAP) */
export declare const MT_005: MetatileRecord;
/** MT_006 (偏移 102, 类型 MAP) */
export declare const MT_006: MetatileRecord;
/** MT_007 (偏移 119, 类型 MAP) */
export declare const MT_007: MetatileRecord;
/** MT_008 (偏移 136, 类型 BG) */
export declare const MT_008: MetatileRecord;
/** MT_009 (偏移 153, 类型 BG) */
export declare const MT_009: MetatileRecord;
/** MT_010 (偏移 170, 类型 BG) */
export declare const MT_010: MetatileRecord;
/** MT_011 (偏移 187, 类型 BG) */
export declare const MT_011: MetatileRecord;
/** MT_012 (偏移 204, 类型 MAP) */
export declare const MT_012: MetatileRecord;
/** MT_013 (偏移 221, 类型 MAP) */
export declare const MT_013: MetatileRecord;
/** MT_014 (偏移 238, 类型 MAP) */
export declare const MT_014: MetatileRecord;
/** MT_015 (偏移 255, 类型 MAP) */
export declare const MT_015: MetatileRecord;
/** MT_016 (偏移 272, 类型 MAP) */
export declare const MT_016: MetatileRecord;
/** MT_017 (偏移 289, 类型 MAP) */
export declare const MT_017: MetatileRecord;
/** MT_018 (偏移 306, 类型 SPR) */
export declare const MT_018: MetatileRecord;
/** MT_019 (偏移 323, 类型 SPR) */
export declare const MT_019: MetatileRecord;
/** MT_020 (偏移 340, 类型 SPR) */
export declare const MT_020: MetatileRecord;
/** MT_021 (偏移 357, 类型 SPR) */
export declare const MT_021: MetatileRecord;
/** MT_022 (偏移 374, 类型 SPR) */
export declare const MT_022: MetatileRecord;
/** MT_023 (偏移 391, 类型 SPR) */
export declare const MT_023: MetatileRecord;
/** MT_024 (偏移 408, 类型 SPR2) */
export declare const MT_024: MetatileRecord;
/** MT_025 (偏移 425, 类型 SPR2) */
export declare const MT_025: MetatileRecord;
/** MT_026 (偏移 442, 类型 SPR2) */
export declare const MT_026: MetatileRecord;
/** MT_027 (偏移 459, 类型 SPR2) */
export declare const MT_027: MetatileRecord;
/** MT_028 (偏移 476, 类型 SPR2) */
export declare const MT_028: MetatileRecord;
/** MT_029 (偏移 493, 类型 SPR2) */
export declare const MT_029: MetatileRecord;
/** MT_030 (偏移 510, 类型 SPR2) */
export declare const MT_030: MetatileRecord;
/** MT_031 (偏移 527, 类型 SPR2) */
export declare const MT_031: MetatileRecord;
/** MT_032 (偏移 544, 类型 SPR) */
export declare const MT_032: MetatileRecord;
/** MT_033 (偏移 561, 类型 SPR) */
export declare const MT_033: MetatileRecord;
/** MT_034 (偏移 578, 类型 SPR) */
export declare const MT_034: MetatileRecord;
/** MT_035 (偏移 595, 类型 SPR) */
export declare const MT_035: MetatileRecord;
/** MT_036 (偏移 612, 类型 SPR) */
export declare const MT_036: MetatileRecord;
/** MT_037 (偏移 629, 类型 SPR) */
export declare const MT_037: MetatileRecord;
/** MT_038 (偏移 646, 类型 SPR) */
export declare const MT_038: MetatileRecord;
/** MT_039 (偏移 663, 类型 SPR) */
export declare const MT_039: MetatileRecord;
/** MT_040 (偏移 680, 类型 SPR) */
export declare const MT_040: MetatileRecord;
/** MT_041 (偏移 697, 类型 SPR) */
export declare const MT_041: MetatileRecord;
/** MT_042 (偏移 714, 类型 SPR) */
export declare const MT_042: MetatileRecord;
/** MT_043 (偏移 731, 类型 SPR) */
export declare const MT_043: MetatileRecord;
/** MT_044 (偏移 748, 类型 BG) */
export declare const MT_044: MetatileRecord;
/** MT_045 (偏移 765, 类型 BG) */
export declare const MT_045: MetatileRecord;
/** MT_046 (偏移 782, 类型 MAP) */
export declare const MT_046: MetatileRecord;
/** MT_047 (偏移 799, 类型 MAP) */
export declare const MT_047: MetatileRecord;
/** MT_048 (偏移 816, 类型 BG) */
export declare const MT_048: MetatileRecord;
/** MT_049 (偏移 833, 类型 MAP) */
export declare const MT_049: MetatileRecord;
/** MT_050 (偏移 850, 类型 SPR) */
export declare const MT_050: MetatileRecord;
/** MT_051 (偏移 867, 类型 SPR) */
export declare const MT_051: MetatileRecord;
/** MT_052 (偏移 884, 类型 UNK) */
export declare const MT_052: MetatileRecord;
/** MT_053 (偏移 901, 类型 MAP) */
export declare const MT_053: MetatileRecord;
/** MT_054 (偏移 918, 类型 UNK) */
export declare const MT_054: MetatileRecord;
/** MT_055 (偏移 935, 类型 UNK) */
export declare const MT_055: MetatileRecord;
/** MT_056 (偏移 952, 类型 BG) */
export declare const MT_056: MetatileRecord;
/** MT_057 (偏移 969, 类型 BG) */
export declare const MT_057: MetatileRecord;
/** MT_058 (偏移 986, 类型 BG) */
export declare const MT_058: MetatileRecord;
/** MT_059 (偏移 1003, 类型 BG) */
export declare const MT_059: MetatileRecord;
/** MT_060 (偏移 1020, 类型 BG) */
export declare const MT_060: MetatileRecord;
/** MT_061 (偏移 1037, 类型 BG) */
export declare const MT_061: MetatileRecord;
/** MT_062 (偏移 1054, 类型 SPR) */
export declare const MT_062: MetatileRecord;
/** MT_063 (偏移 1071, 类型 MAP) */
export declare const MT_063: MetatileRecord;
/** MT_064 (偏移 1088, 类型 BG) */
export declare const MT_064: MetatileRecord;
/** MT_065 (偏移 1105, 类型 BG) */
export declare const MT_065: MetatileRecord;
/** MT_066 (偏移 1122, 类型 BG) */
export declare const MT_066: MetatileRecord;
/** MT_067 (偏移 1139, 类型 BG) */
export declare const MT_067: MetatileRecord;
/** MT_068 (偏移 1156, 类型 BG) */
export declare const MT_068: MetatileRecord;
/** MT_069 (偏移 1173, 类型 UNK) */
export declare const MT_069: MetatileRecord;
/** MT_070 (偏移 1190, 类型 UNK) */
export declare const MT_070: MetatileRecord;
/** MT_071 (偏移 1207, 类型 UNK) */
export declare const MT_071: MetatileRecord;
/** MT_072 (偏移 1224, 类型 MAP) */
export declare const MT_072: MetatileRecord;
/** MT_073 (偏移 1241, 类型 MAP) */
export declare const MT_073: MetatileRecord;
/** MT_074 (偏移 1258, 类型 MAP) */
export declare const MT_074: MetatileRecord;
/** MT_075 (偏移 1275, 类型 MAP) */
export declare const MT_075: MetatileRecord;
/** MT_076 (偏移 1292, 类型 MAP) */
export declare const MT_076: MetatileRecord;
/** MT_077 (偏移 1309, 类型 MAP) */
export declare const MT_077: MetatileRecord;
/** MT_078 (偏移 1326, 类型 MAP) */
export declare const MT_078: MetatileRecord;
/** MT_079 (偏移 1343, 类型 MAP) */
export declare const MT_079: MetatileRecord;
/** MT_080 (偏移 1360, 类型 BG) */
export declare const MT_080: MetatileRecord;
/** MT_081 (偏移 1377, 类型 UNK) */
export declare const MT_081: MetatileRecord;
/** MT_082 (偏移 1394, 类型 BG) */
export declare const MT_082: MetatileRecord;
/** MT_083 (偏移 1411, 类型 BG) */
export declare const MT_083: MetatileRecord;
/** MT_084 (偏移 1428, 类型 MAP) */
export declare const MT_084: MetatileRecord;
/** MT_085 (偏移 1445, 类型 MAP) */
export declare const MT_085: MetatileRecord;
/** MT_086 (偏移 1462, 类型 MAP) */
export declare const MT_086: MetatileRecord;
/** MT_087 (偏移 1479, 类型 MAP) */
export declare const MT_087: MetatileRecord;
/** MT_088 (偏移 1496, 类型 MAP) */
export declare const MT_088: MetatileRecord;
/** MT_089 (偏移 1513, 类型 MAP) */
export declare const MT_089: MetatileRecord;
/** MT_090 (偏移 1530, 类型 BG) */
export declare const MT_090: MetatileRecord;
/** MT_091 (偏移 1547, 类型 BG) */
export declare const MT_091: MetatileRecord;
/** MT_092 (偏移 1564, 类型 MAP) */
export declare const MT_092: MetatileRecord;
/** MT_093 (偏移 1581, 类型 SPR2) */
export declare const MT_093: MetatileRecord;
/** MT_094 (偏移 1598, 类型 SPR2) */
export declare const MT_094: MetatileRecord;
/** MT_095 (偏移 1615, 类型 SPR2) */
export declare const MT_095: MetatileRecord;
/** MT_096 (偏移 1632, 类型 BG) */
export declare const MT_096: MetatileRecord;
/** MT_097 (偏移 1649, 类型 BG) */
export declare const MT_097: MetatileRecord;
/** MT_098 (偏移 1666, 类型 BG) */
export declare const MT_098: MetatileRecord;
/** MT_099 (偏移 1683, 类型 BG) */
export declare const MT_099: MetatileRecord;
/** MT_100 (偏移 1700, 类型 BG) */
export declare const MT_100: MetatileRecord;
/** MT_101 (偏移 1717, 类型 BG) */
export declare const MT_101: MetatileRecord;
/** MT_102 (偏移 1734, 类型 BG) */
export declare const MT_102: MetatileRecord;
/** MT_103 (偏移 1751, 类型 BG) */
export declare const MT_103: MetatileRecord;
/** MT_104 (偏移 1768, 类型 BG) */
export declare const MT_104: MetatileRecord;
/** MT_105 (偏移 1785, 类型 BG) */
export declare const MT_105: MetatileRecord;
/** MT_106 (偏移 1802, 类型 BG) */
export declare const MT_106: MetatileRecord;
/** MT_107 (偏移 1819, 类型 BG) */
export declare const MT_107: MetatileRecord;
/** MT_108 (偏移 1836, 类型 BG) */
export declare const MT_108: MetatileRecord;
/** MT_109 (偏移 1853, 类型 BG) */
export declare const MT_109: MetatileRecord;
/** MT_110 (偏移 1870, 类型 BG) */
export declare const MT_110: MetatileRecord;
/** MT_111 (偏移 1887, 类型 MAP) */
export declare const MT_111: MetatileRecord;
/** MT_112 (偏移 1904, 类型 MAP) */
export declare const MT_112: MetatileRecord;
/** MT_113 (偏移 1921, 类型 MAP) */
export declare const MT_113: MetatileRecord;
/** MT_114 (偏移 1938, 类型 MAP) */
export declare const MT_114: MetatileRecord;
/** MT_115 (偏移 1955, 类型 MAP) */
export declare const MT_115: MetatileRecord;
/** MT_116 (偏移 1972, 类型 MAP) */
export declare const MT_116: MetatileRecord;
/** MT_117 (偏移 1989, 类型 BG) */
export declare const MT_117: MetatileRecord;
/** MT_118 (偏移 2006, 类型 UNK) */
export declare const MT_118: MetatileRecord;
/** MT_119 (偏移 2023, 类型 UNK) */
export declare const MT_119: MetatileRecord;
/** MT_120 (偏移 2040, 类型 UNK) */
export declare const MT_120: MetatileRecord;
/** MT_121 (偏移 2057, 类型 BG) */
export declare const MT_121: MetatileRecord;
/** MT_122 (偏移 2074, 类型 BG) */
export declare const MT_122: MetatileRecord;
/** MT_123 (偏移 2091, 类型 UNK) */
export declare const MT_123: MetatileRecord;
/** MT_124 (偏移 2108, 类型 BG) */
export declare const MT_124: MetatileRecord;
/** MT_125 (偏移 2125, 类型 UNK) */
export declare const MT_125: MetatileRecord;
/** MT_126 (偏移 2142, 类型 UNK) */
export declare const MT_126: MetatileRecord;
/** MT_127 (偏移 2159, 类型 MAP) */
export declare const MT_127: MetatileRecord;
/** MT_128 (偏移 2176, 类型 UNK) */
export declare const MT_128: MetatileRecord;
/** MT_129 (偏移 2193, 类型 BG) */
export declare const MT_129: MetatileRecord;
/** MT_130 (偏移 2210, 类型 UNK) */
export declare const MT_130: MetatileRecord;
/** MT_131 (偏移 2227, 类型 BG) */
export declare const MT_131: MetatileRecord;
/** MT_132 (偏移 2244, 类型 BG) */
export declare const MT_132: MetatileRecord;
/** MT_133 (偏移 2261, 类型 UNK) */
export declare const MT_133: MetatileRecord;
/** MT_134 (偏移 2278, 类型 UNK) */
export declare const MT_134: MetatileRecord;
/** MT_135 (偏移 2295, 类型 UNK) */
export declare const MT_135: MetatileRecord;
/** MT_136 (偏移 2312, 类型 BG) */
export declare const MT_136: MetatileRecord;
/** MT_137 (偏移 2329, 类型 BG) */
export declare const MT_137: MetatileRecord;
/** MT_138 (偏移 2346, 类型 BG) */
export declare const MT_138: MetatileRecord;
/** MT_139 (偏移 2363, 类型 MAP) */
export declare const MT_139: MetatileRecord;
/** MT_140 (偏移 2380, 类型 BG) */
export declare const MT_140: MetatileRecord;
/** MT_141 (偏移 2397, 类型 UNK) */
export declare const MT_141: MetatileRecord;
/** MT_142 (偏移 2414, 类型 UNK) */
export declare const MT_142: MetatileRecord;
/** MT_143 (偏移 2431, 类型 UNK) */
export declare const MT_143: MetatileRecord;
/** MT_144 (偏移 2448, 类型 UNK) */
export declare const MT_144: MetatileRecord;
/** MT_145 (偏移 2465, 类型 UNK) */
export declare const MT_145: MetatileRecord;
/** MT_146 (偏移 2482, 类型 MAP) */
export declare const MT_146: MetatileRecord;
/** MT_147 (偏移 2499, 类型 BG) */
export declare const MT_147: MetatileRecord;
/** MT_148 (偏移 2516, 类型 BG) */
export declare const MT_148: MetatileRecord;
/** MT_149 (偏移 2533, 类型 MAP) */
export declare const MT_149: MetatileRecord;
/** MT_150 (偏移 2550, 类型 BG) */
export declare const MT_150: MetatileRecord;
/** MT_151 (偏移 2567, 类型 BG) */
export declare const MT_151: MetatileRecord;
/** MT_152 (偏移 2584, 类型 BG) */
export declare const MT_152: MetatileRecord;
/** MT_153 (偏移 2601, 类型 BG) */
export declare const MT_153: MetatileRecord;
/** MT_154 (偏移 2618, 类型 BG) */
export declare const MT_154: MetatileRecord;
/** MT_155 (偏移 2635, 类型 BG) */
export declare const MT_155: MetatileRecord;
/** MT_156 (偏移 2652, 类型 BG) */
export declare const MT_156: MetatileRecord;
/** MT_157 (偏移 2669, 类型 BG) */
export declare const MT_157: MetatileRecord;
/** MT_158 (偏移 2686, 类型 BG) */
export declare const MT_158: MetatileRecord;
/** MT_159 (偏移 2703, 类型 BG) */
export declare const MT_159: MetatileRecord;
/** MT_160 (偏移 2720, 类型 BG) */
export declare const MT_160: MetatileRecord;
/** MT_161 (偏移 2737, 类型 BG) */
export declare const MT_161: MetatileRecord;
/** MT_162 (偏移 2754, 类型 BG) */
export declare const MT_162: MetatileRecord;
/** MT_163 (偏移 2771, 类型 BG) */
export declare const MT_163: MetatileRecord;
/** MT_164 (偏移 2788, 类型 BG) */
export declare const MT_164: MetatileRecord;
/** MT_165 (偏移 2805, 类型 MAP) */
export declare const MT_165: MetatileRecord;
/** MT_166 (偏移 2822, 类型 MAP) */
export declare const MT_166: MetatileRecord;
/** MT_167 (偏移 2839, 类型 MAP) */
export declare const MT_167: MetatileRecord;
/** MT_168 (偏移 2856, 类型 MAP) */
export declare const MT_168: MetatileRecord;
/** MT_169 (偏移 2873, 类型 MAP) */
export declare const MT_169: MetatileRecord;
/** MT_170 (偏移 2890, 类型 MAP) */
export declare const MT_170: MetatileRecord;
/** MT_171 (偏移 2907, 类型 UNK) */
export declare const MT_171: MetatileRecord;
/** MT_172 (偏移 2924, 类型 MAP) */
export declare const MT_172: MetatileRecord;
/** MT_173 (偏移 2941, 类型 MAP) */
export declare const MT_173: MetatileRecord;
/** MT_174 (偏移 2958, 类型 MAP) */
export declare const MT_174: MetatileRecord;
/** MT_175 (偏移 2975, 类型 UNK) */
export declare const MT_175: MetatileRecord;
/** MT_176 (偏移 2992, 类型 UNK) */
export declare const MT_176: MetatileRecord;
/** MT_177 (偏移 3009, 类型 UNK) */
export declare const MT_177: MetatileRecord;
/** MT_178 (偏移 3026, 类型 UNK) */
export declare const MT_178: MetatileRecord;
/** MT_179 (偏移 3043, 类型 UNK) */
export declare const MT_179: MetatileRecord;
/** MT_180 (偏移 3060, 类型 UNK) */
export declare const MT_180: MetatileRecord;
/** MT_181 (偏移 3077, 类型 UNK) */
export declare const MT_181: MetatileRecord;
/** MT_182 (偏移 3094, 类型 MAP) */
export declare const MT_182: MetatileRecord;
/** MT_183 (偏移 3111, 类型 MAP) */
export declare const MT_183: MetatileRecord;
/** MT_184 (偏移 3128, 类型 MAP) */
export declare const MT_184: MetatileRecord;
/** MT_185 (偏移 3145, 类型 MAP) */
export declare const MT_185: MetatileRecord;
/** MT_186 (偏移 3162, 类型 MAP) */
export declare const MT_186: MetatileRecord;
/** MT_187 (偏移 3179, 类型 BG) */
export declare const MT_187: MetatileRecord;
/** MT_188 (偏移 3196, 类型 BG) */
export declare const MT_188: MetatileRecord;
/** MT_189 (偏移 3213, 类型 UNK) */
export declare const MT_189: MetatileRecord;
/** MT_190 (偏移 3230, 类型 UNK) */
export declare const MT_190: MetatileRecord;
/** MT_191 (偏移 3247, 类型 BG) */
export declare const MT_191: MetatileRecord;
/** MT_192 (偏移 3264, 类型 UNK) */
export declare const MT_192: MetatileRecord;
/** MT_193 (偏移 3281, 类型 UNK) */
export declare const MT_193: MetatileRecord;
/** MT_194 (偏移 3298, 类型 UNK) */
export declare const MT_194: MetatileRecord;
/** MT_195 (偏移 3315, 类型 UNK) */
export declare const MT_195: MetatileRecord;
/** MT_196 (偏移 3332, 类型 UNK) */
export declare const MT_196: MetatileRecord;
/** MT_197 (偏移 3349, 类型 UNK) */
export declare const MT_197: MetatileRecord;
/** MT_198 (偏移 3366, 类型 UNK) */
export declare const MT_198: MetatileRecord;
/** MT_199 (偏移 3383, 类型 UNK) */
export declare const MT_199: MetatileRecord;
/** MT_200 (偏移 3400, 类型 UNK) */
export declare const MT_200: MetatileRecord;
/** MT_201 (偏移 3417, 类型 UNK) */
export declare const MT_201: MetatileRecord;
/** MT_202 (偏移 3434, 类型 UNK) */
export declare const MT_202: MetatileRecord;
/** MT_203 (偏移 3451, 类型 UNK) */
export declare const MT_203: MetatileRecord;
/** MT_204 (偏移 3468, 类型 UNK) */
export declare const MT_204: MetatileRecord;
/** MT_205 (偏移 3485, 类型 MAP) */
export declare const MT_205: MetatileRecord;
/** MT_206 (偏移 3502, 类型 MAP) */
export declare const MT_206: MetatileRecord;
/** MT_207 (偏移 3519, 类型 MAP) */
export declare const MT_207: MetatileRecord;
/** MT_208 (偏移 3536, 类型 MAP) */
export declare const MT_208: MetatileRecord;
/** MT_209 (偏移 3553, 类型 MAP) */
export declare const MT_209: MetatileRecord;
/** MT_210 (偏移 3570, 类型 MAP) */
export declare const MT_210: MetatileRecord;
/** MT_211 (偏移 3587, 类型 MAP) */
export declare const MT_211: MetatileRecord;
/** MT_212 (偏移 3604, 类型 MAP) */
export declare const MT_212: MetatileRecord;
/** MT_213 (偏移 3621, 类型 MAP) */
export declare const MT_213: MetatileRecord;
/** MT_214 (偏移 3638, 类型 MAP) */
export declare const MT_214: MetatileRecord;
/** MT_215 (偏移 3655, 类型 MAP) */
export declare const MT_215: MetatileRecord;
/** MT_216 (偏移 3672, 类型 MAP) */
export declare const MT_216: MetatileRecord;
/** MT_217 (偏移 3689, 类型 MAP) */
export declare const MT_217: MetatileRecord;
/** MT_218 (偏移 3706, 类型 MAP) */
export declare const MT_218: MetatileRecord;
/** MT_219 (偏移 3723, 类型 MAP) */
export declare const MT_219: MetatileRecord;
/** MT_220 (偏移 3740, 类型 MAP) */
export declare const MT_220: MetatileRecord;
/** MT_221 (偏移 3757, 类型 MAP) */
export declare const MT_221: MetatileRecord;
/** MT_222 (偏移 3774, 类型 BG) */
export declare const MT_222: MetatileRecord;
/** MT_223 (偏移 3791, 类型 MAP) */
export declare const MT_223: MetatileRecord;
/** MT_224 (偏移 3808, 类型 UNK) */
export declare const MT_224: MetatileRecord;
/** MT_225 (偏移 3825, 类型 SPR2) */
export declare const MT_225: MetatileRecord;
/** MT_226 (偏移 3842, 类型 SPR2) */
export declare const MT_226: MetatileRecord;
/** MT_227 (偏移 3859, 类型 SPR2) */
export declare const MT_227: MetatileRecord;
/** MT_228 (偏移 3876, 类型 SPR2) */
export declare const MT_228: MetatileRecord;
/** MT_229 (偏移 3893, 类型 BG) */
export declare const MT_229: MetatileRecord;
/** MT_230 (偏移 3910, 类型 BG) */
export declare const MT_230: MetatileRecord;
/** MT_231 (偏移 3927, 类型 BG) */
export declare const MT_231: MetatileRecord;
/** MT_232 (偏移 3944, 类型 BG) */
export declare const MT_232: MetatileRecord;
/** MT_233 (偏移 3961, 类型 BG) */
export declare const MT_233: MetatileRecord;
/** MT_234 (偏移 3978, 类型 BG) */
export declare const MT_234: MetatileRecord;
/** MT_235 (偏移 3995, 类型 BG) */
export declare const MT_235: MetatileRecord;
/** MT_236 (偏移 4012, 类型 BG) */
export declare const MT_236: MetatileRecord;
/** MT_237 (偏移 4029, 类型 BG) */
export declare const MT_237: MetatileRecord;
/** MT_238 (偏移 4046, 类型 BG) */
export declare const MT_238: MetatileRecord;
/** MT_239 (偏移 4063, 类型 BG) */
export declare const MT_239: MetatileRecord;
/** MT_240 (偏移 4080, 类型 MAP) */
export declare const MT_240: MetatileRecord;
/** MT_241 (偏移 4097, 类型 MAP) */
export declare const MT_241: MetatileRecord;
/** MT_242 (偏移 4114, 类型 MAP) */
export declare const MT_242: MetatileRecord;
/** MT_243 (偏移 4131, 类型 UNK) */
export declare const MT_243: MetatileRecord;
/** MT_244 (偏移 4148, 类型 BG) */
export declare const MT_244: MetatileRecord;
/** MT_245 (偏移 4165, 类型 UNK) */
export declare const MT_245: MetatileRecord;
/** MT_246 (偏移 4182, 类型 MAP) */
export declare const MT_246: MetatileRecord;
/** MT_247 (偏移 4199, 类型 MAP) */
export declare const MT_247: MetatileRecord;
/** MT_248 (偏移 4216, 类型 UNK) */
export declare const MT_248: MetatileRecord;
/** MT_249 (偏移 4233, 类型 MAP) */
export declare const MT_249: MetatileRecord;
/** MT_250 (偏移 4250, 类型 UNK) */
export declare const MT_250: MetatileRecord;
/** MT_251 (偏移 4267, 类型 UNK) */
export declare const MT_251: MetatileRecord;
/** MT_252 (偏移 4284, 类型 MAP) */
export declare const MT_252: MetatileRecord;
/** MT_253 (偏移 4301, 类型 MAP) */
export declare const MT_253: MetatileRecord;
/** MT_254 (偏移 4318, 类型 UNK) */
export declare const MT_254: MetatileRecord;
/** MT_255 (偏移 4335, 类型 MAP) */
export declare const MT_255: MetatileRecord;
/** MT_256 (偏移 4352, 类型 BG) */
export declare const MT_256: MetatileRecord;
/** MT_257 (偏移 4369, 类型 BG) */
export declare const MT_257: MetatileRecord;
/** MT_258 (偏移 4386, 类型 BG) */
export declare const MT_258: MetatileRecord;
/** MT_259 (偏移 4403, 类型 BG) */
export declare const MT_259: MetatileRecord;
/** MT_260 (偏移 4420, 类型 BG) */
export declare const MT_260: MetatileRecord;
/** MT_261 (偏移 4437, 类型 BG) */
export declare const MT_261: MetatileRecord;
/** MT_262 (偏移 4454, 类型 BG) */
export declare const MT_262: MetatileRecord;
/** MT_263 (偏移 4471, 类型 BG) */
export declare const MT_263: MetatileRecord;
/** MT_264 (偏移 4488, 类型 BG) */
export declare const MT_264: MetatileRecord;
/** MT_265 (偏移 4505, 类型 BG) */
export declare const MT_265: MetatileRecord;
/** MT_266 (偏移 4522, 类型 BG) */
export declare const MT_266: MetatileRecord;
/** MT_267 (偏移 4539, 类型 BG) */
export declare const MT_267: MetatileRecord;
/** MT_268 (偏移 4556, 类型 BG) */
export declare const MT_268: MetatileRecord;
/** MT_269 (偏移 4573, 类型 BG) */
export declare const MT_269: MetatileRecord;
/** MT_270 (偏移 4590, 类型 BG) */
export declare const MT_270: MetatileRecord;
/** MT_271 (偏移 4607, 类型 BG) */
export declare const MT_271: MetatileRecord;
/** MT_272 (偏移 4624, 类型 BG) */
export declare const MT_272: MetatileRecord;
/** MT_273 (偏移 4641, 类型 BG) */
export declare const MT_273: MetatileRecord;
/** MT_274 (偏移 4658, 类型 BG) */
export declare const MT_274: MetatileRecord;
/** MT_275 (偏移 4675, 类型 BG) */
export declare const MT_275: MetatileRecord;
/** MT_276 (偏移 4692, 类型 BG) */
export declare const MT_276: MetatileRecord;
/** MT_277 (偏移 4709, 类型 BG) */
export declare const MT_277: MetatileRecord;
/** MT_278 (偏移 4726, 类型 BG) */
export declare const MT_278: MetatileRecord;
/** MT_279 (偏移 4743, 类型 BG) */
export declare const MT_279: MetatileRecord;
/** MT_280 (偏移 4760, 类型 BG) */
export declare const MT_280: MetatileRecord;
/** MT_281 (偏移 4777, 类型 BG) */
export declare const MT_281: MetatileRecord;
/** MT_282 (偏移 4794, 类型 BG) */
export declare const MT_282: MetatileRecord;
/** MT_283 (偏移 4811, 类型 BG) */
export declare const MT_283: MetatileRecord;
/** MT_284 (偏移 4828, 类型 BG) */
export declare const MT_284: MetatileRecord;
/** MT_285 (偏移 4845, 类型 BG) */
export declare const MT_285: MetatileRecord;
/** MT_286 (偏移 4862, 类型 UNK) */
export declare const MT_286: MetatileRecord;
/** MT_287 (偏移 4879, 类型 SPR2) */
export declare const MT_287: MetatileRecord;
/** MT_288 (偏移 4896, 类型 UNK) */
export declare const MT_288: MetatileRecord;
/** MT_289 (偏移 4913, 类型 UNK) */
export declare const MT_289: MetatileRecord;
/** MT_290 (偏移 4930, 类型 UNK) */
export declare const MT_290: MetatileRecord;
/** MT_291 (偏移 4947, 类型 UNK) */
export declare const MT_291: MetatileRecord;
/** MT_292 (偏移 4964, 类型 UNK) */
export declare const MT_292: MetatileRecord;
/** MT_293 (偏移 4981, 类型 BG) */
export declare const MT_293: MetatileRecord;
/** MT_294 (偏移 4998, 类型 MAP) */
export declare const MT_294: MetatileRecord;
/** MT_295 (偏移 5015, 类型 MAP) */
export declare const MT_295: MetatileRecord;
/** MT_296 (偏移 5032, 类型 UNK) */
export declare const MT_296: MetatileRecord;
/** MT_297 (偏移 5049, 类型 UNK) */
export declare const MT_297: MetatileRecord;
/** MT_298 (偏移 5066, 类型 UNK) */
export declare const MT_298: MetatileRecord;
/** MT_299 (偏移 5083, 类型 UNK) */
export declare const MT_299: MetatileRecord;
/** MT_300 (偏移 5100, 类型 UNK) */
export declare const MT_300: MetatileRecord;
/** MT_301 (偏移 5117, 类型 UNK) */
export declare const MT_301: MetatileRecord;
/** MT_302 (偏移 5134, 类型 UNK) */
export declare const MT_302: MetatileRecord;
/** MT_303 (偏移 5151, 类型 UNK) */
export declare const MT_303: MetatileRecord;
/** MT_304 (偏移 5168, 类型 UNK) */
export declare const MT_304: MetatileRecord;
/** MT_305 (偏移 5185, 类型 UNK) */
export declare const MT_305: MetatileRecord;
/** MT_306 (偏移 5202, 类型 UNK) */
export declare const MT_306: MetatileRecord;
/** MT_307 (偏移 5219, 类型 UNK) */
export declare const MT_307: MetatileRecord;
/** MT_308 (偏移 5236, 类型 UNK) */
export declare const MT_308: MetatileRecord;
/** MT_309 (偏移 5253, 类型 BG) */
export declare const MT_309: MetatileRecord;
/** MT_310 (偏移 5270, 类型 UNK) */
export declare const MT_310: MetatileRecord;
/** MT_311 (偏移 5287, 类型 UNK) */
export declare const MT_311: MetatileRecord;
/** MT_312 (偏移 5304, 类型 UNK) */
export declare const MT_312: MetatileRecord;
/** MT_313 (偏移 5321, 类型 UNK) */
export declare const MT_313: MetatileRecord;
/** MT_314 (偏移 5338, 类型 UNK) */
export declare const MT_314: MetatileRecord;
/** MT_315 (偏移 5355, 类型 UNK) */
export declare const MT_315: MetatileRecord;
/** MT_316 (偏移 5372, 类型 UNK) */
export declare const MT_316: MetatileRecord;
/** MT_317 (偏移 5389, 类型 UNK) */
export declare const MT_317: MetatileRecord;
/** MT_318 (偏移 5406, 类型 UNK) */
export declare const MT_318: MetatileRecord;
/** MT_319 (偏移 5423, 类型 UNK) */
export declare const MT_319: MetatileRecord;
/** MT_320 (偏移 5440, 类型 BG) */
export declare const MT_320: MetatileRecord;
/** MT_321 (偏移 5457, 类型 BG) */
export declare const MT_321: MetatileRecord;
/** MT_322 (偏移 5474, 类型 MAP) */
export declare const MT_322: MetatileRecord;
/** MT_323 (偏移 5491, 类型 UNK) */
export declare const MT_323: MetatileRecord;
/** MT_324 (偏移 5508, 类型 MAP) */
export declare const MT_324: MetatileRecord;
/** MT_325 (偏移 5525, 类型 UNK) */
export declare const MT_325: MetatileRecord;
/** MT_326 (偏移 5542, 类型 BG) */
export declare const MT_326: MetatileRecord;
/** MT_327 (偏移 5559, 类型 BG) */
export declare const MT_327: MetatileRecord;
/** MT_328 (偏移 5576, 类型 BG) */
export declare const MT_328: MetatileRecord;
/** MT_329 (偏移 5593, 类型 UNK) */
export declare const MT_329: MetatileRecord;
/** MT_330 (偏移 5610, 类型 SPR) */
export declare const MT_330: MetatileRecord;
/** MT_331 (偏移 5627, 类型 BG) */
export declare const MT_331: MetatileRecord;
/** MT_332 (偏移 5644, 类型 BG) */
export declare const MT_332: MetatileRecord;
/** MT_333 (偏移 5661, 类型 BG) */
export declare const MT_333: MetatileRecord;
/** MT_334 (偏移 5678, 类型 BG) */
export declare const MT_334: MetatileRecord;
/** MT_335 (偏移 5695, 类型 UNK) */
export declare const MT_335: MetatileRecord;
/** MT_336 (偏移 5712, 类型 UNK) */
export declare const MT_336: MetatileRecord;
/** MT_337 (偏移 5729, 类型 UNK) */
export declare const MT_337: MetatileRecord;
/** MT_338 (偏移 5746, 类型 UNK) */
export declare const MT_338: MetatileRecord;
/** MT_339 (偏移 5763, 类型 UNK) */
export declare const MT_339: MetatileRecord;
/** MT_340 (偏移 5780, 类型 UNK) */
export declare const MT_340: MetatileRecord;
/** MT_341 (偏移 5797, 类型 BG) */
export declare const MT_341: MetatileRecord;
/** MT_342 (偏移 5814, 类型 UNK) */
export declare const MT_342: MetatileRecord;
/** MT_343 (偏移 5831, 类型 UNK) */
export declare const MT_343: MetatileRecord;
/** MT_344 (偏移 5848, 类型 UNK) */
export declare const MT_344: MetatileRecord;
/** MT_345 (偏移 5865, 类型 UNK) */
export declare const MT_345: MetatileRecord;
/** MT_346 (偏移 5882, 类型 SPR) */
export declare const MT_346: MetatileRecord;
/** MT_347 (偏移 5899, 类型 UNK) */
export declare const MT_347: MetatileRecord;
/** MT_348 (偏移 5916, 类型 BG) */
export declare const MT_348: MetatileRecord;
/** MT_349 (偏移 5933, 类型 BG) */
export declare const MT_349: MetatileRecord;
/** MT_350 (偏移 5950, 类型 UNK) */
export declare const MT_350: MetatileRecord;
/** MT_351 (偏移 5967, 类型 MAP) */
export declare const MT_351: MetatileRecord;
/** MT_352 (偏移 5984, 类型 UNK) */
export declare const MT_352: MetatileRecord;
/** MT_353 (偏移 6001, 类型 BG) */
export declare const MT_353: MetatileRecord;
/** MT_354 (偏移 6018, 类型 UNK) */
export declare const MT_354: MetatileRecord;
/** MT_355 (偏移 6035, 类型 UNK) */
export declare const MT_355: MetatileRecord;
/** MT_356 (偏移 6052, 类型 UNK) */
export declare const MT_356: MetatileRecord;
/** MT_357 (偏移 6069, 类型 UNK) */
export declare const MT_357: MetatileRecord;
/** MT_358 (偏移 6086, 类型 BG) */
export declare const MT_358: MetatileRecord;
/** MT_359 (偏移 6103, 类型 BG) */
export declare const MT_359: MetatileRecord;
/** MT_360 (偏移 6120, 类型 BG) */
export declare const MT_360: MetatileRecord;
/** MT_361 (偏移 6137, 类型 BG) */
export declare const MT_361: MetatileRecord;
/** MT_362 (偏移 6154, 类型 BG) */
export declare const MT_362: MetatileRecord;
/** MT_363 (偏移 6171, 类型 BG) */
export declare const MT_363: MetatileRecord;
/** MT_364 (偏移 6188, 类型 BG) */
export declare const MT_364: MetatileRecord;
/** MT_365 (偏移 6205, 类型 BG) */
export declare const MT_365: MetatileRecord;
/** MT_366 (偏移 6222, 类型 BG) */
export declare const MT_366: MetatileRecord;
/** MT_367 (偏移 6239, 类型 BG) */
export declare const MT_367: MetatileRecord;
/** MT_368 (偏移 6256, 类型 BG) */
export declare const MT_368: MetatileRecord;
/** MT_369 (偏移 6273, 类型 MAP) */
export declare const MT_369: MetatileRecord;
/** MT_370 (偏移 6290, 类型 MAP) */
export declare const MT_370: MetatileRecord;
/** MT_371 (偏移 6307, 类型 MAP) */
export declare const MT_371: MetatileRecord;
/** MT_372 (偏移 6324, 类型 MAP) */
export declare const MT_372: MetatileRecord;
/** MT_373 (偏移 6341, 类型 MAP) */
export declare const MT_373: MetatileRecord;
/** MT_374 (偏移 6358, 类型 MAP) */
export declare const MT_374: MetatileRecord;
/** MT_375 (偏移 6375, 类型 MAP) */
export declare const MT_375: MetatileRecord;
/** MT_376 (偏移 6392, 类型 MAP) */
export declare const MT_376: MetatileRecord;
/** MT_377 (偏移 6409, 类型 BG) */
export declare const MT_377: MetatileRecord;
/** MT_378 (偏移 6426, 类型 BG) */
export declare const MT_378: MetatileRecord;
/** MT_379 (偏移 6443, 类型 BG) */
export declare const MT_379: MetatileRecord;
/** MT_380 (偏移 6460, 类型 BG) */
export declare const MT_380: MetatileRecord;
/** MT_381 (偏移 6477, 类型 BG) */
export declare const MT_381: MetatileRecord;
/** MT_382 (偏移 6494, 类型 UNK) */
export declare const MT_382: MetatileRecord;
/** MT_383 (偏移 6511, 类型 UNK) */
export declare const MT_383: MetatileRecord;
/** MT_384 (偏移 6528, 类型 UNK) */
export declare const MT_384: MetatileRecord;
/** MT_385 (偏移 6545, 类型 UNK) */
export declare const MT_385: MetatileRecord;
/** MT_386 (偏移 6562, 类型 MAP) */
export declare const MT_386: MetatileRecord;
/** MT_387 (偏移 6579, 类型 MAP) */
export declare const MT_387: MetatileRecord;
/** MT_388 (偏移 6596, 类型 MAP) */
export declare const MT_388: MetatileRecord;
/** MT_389 (偏移 6613, 类型 MAP) */
export declare const MT_389: MetatileRecord;
/** MT_390 (偏移 6630, 类型 MAP) */
export declare const MT_390: MetatileRecord;
/** MT_391 (偏移 6647, 类型 MAP) */
export declare const MT_391: MetatileRecord;
/** MT_392 (偏移 6664, 类型 MAP) */
export declare const MT_392: MetatileRecord;
/** MT_393 (偏移 6681, 类型 MAP) */
export declare const MT_393: MetatileRecord;
/** MT_394 (偏移 6698, 类型 MAP) */
export declare const MT_394: MetatileRecord;
/** MT_395 (偏移 6715, 类型 MAP) */
export declare const MT_395: MetatileRecord;
/** MT_396 (偏移 6732, 类型 MAP) */
export declare const MT_396: MetatileRecord;
/** MT_397 (偏移 6749, 类型 MAP) */
export declare const MT_397: MetatileRecord;
/** MT_398 (偏移 6766, 类型 MAP) */
export declare const MT_398: MetatileRecord;
/** MT_399 (偏移 6783, 类型 MAP) */
export declare const MT_399: MetatileRecord;
/** MT_400 (偏移 6800, 类型 MAP) */
export declare const MT_400: MetatileRecord;
/** MT_401 (偏移 6817, 类型 MAP) */
export declare const MT_401: MetatileRecord;
/** MT_402 (偏移 6834, 类型 MAP) */
export declare const MT_402: MetatileRecord;
/** MT_403 (偏移 6851, 类型 MAP) */
export declare const MT_403: MetatileRecord;
/** MT_404 (偏移 6868, 类型 MAP) */
export declare const MT_404: MetatileRecord;
/** MT_405 (偏移 6885, 类型 MAP) */
export declare const MT_405: MetatileRecord;
/** MT_406 (偏移 6902, 类型 MAP) */
export declare const MT_406: MetatileRecord;
/** MT_407 (偏移 6919, 类型 MAP) */
export declare const MT_407: MetatileRecord;
/** MT_408 (偏移 6936, 类型 MAP) */
export declare const MT_408: MetatileRecord;
/** MT_409 (偏移 6953, 类型 MAP) */
export declare const MT_409: MetatileRecord;
/** MT_410 (偏移 6970, 类型 MAP) */
export declare const MT_410: MetatileRecord;
/** MT_411 (偏移 6987, 类型 MAP) */
export declare const MT_411: MetatileRecord;
/** MT_412 (偏移 7004, 类型 MAP) */
export declare const MT_412: MetatileRecord;
/** MT_413 (偏移 7021, 类型 MAP) */
export declare const MT_413: MetatileRecord;
/** MT_414 (偏移 7038, 类型 MAP) */
export declare const MT_414: MetatileRecord;
/** MT_415 (偏移 7055, 类型 MAP) */
export declare const MT_415: MetatileRecord;
/** MT_416 (偏移 7072, 类型 MAP) */
export declare const MT_416: MetatileRecord;
/** MT_417 (偏移 7089, 类型 MAP) */
export declare const MT_417: MetatileRecord;
/** MT_418 (偏移 7106, 类型 MAP) */
export declare const MT_418: MetatileRecord;
/** MT_419 (偏移 7123, 类型 MAP) */
export declare const MT_419: MetatileRecord;
/** MT_420 (偏移 7140, 类型 MAP) */
export declare const MT_420: MetatileRecord;
/** MT_421 (偏移 7157, 类型 MAP) */
export declare const MT_421: MetatileRecord;
/** MT_422 (偏移 7174, 类型 MAP) */
export declare const MT_422: MetatileRecord;
/** MT_423 (偏移 7191, 类型 MAP) */
export declare const MT_423: MetatileRecord;
/** MT_424 (偏移 7208, 类型 MAP) */
export declare const MT_424: MetatileRecord;
/** MT_425 (偏移 7225, 类型 MAP) */
export declare const MT_425: MetatileRecord;
/** MT_426 (偏移 7242, 类型 MAP) */
export declare const MT_426: MetatileRecord;
/** MT_427 (偏移 7259, 类型 MAP) */
export declare const MT_427: MetatileRecord;
/** MT_428 (偏移 7276, 类型 MAP) */
export declare const MT_428: MetatileRecord;
/** MT_429 (偏移 7293, 类型 MAP) */
export declare const MT_429: MetatileRecord;
/** MT_430 (偏移 7310, 类型 MAP) */
export declare const MT_430: MetatileRecord;
/** MT_431 (偏移 7327, 类型 MAP) */
export declare const MT_431: MetatileRecord;
/** MT_432 (偏移 7344, 类型 MAP) */
export declare const MT_432: MetatileRecord;
/** MT_433 (偏移 7361, 类型 MAP) */
export declare const MT_433: MetatileRecord;
/** MT_434 (偏移 7378, 类型 MAP) */
export declare const MT_434: MetatileRecord;
/** MT_435 (偏移 7395, 类型 MAP) */
export declare const MT_435: MetatileRecord;
/** MT_436 (偏移 7412, 类型 MAP) */
export declare const MT_436: MetatileRecord;
/** MT_437 (偏移 7429, 类型 MAP) */
export declare const MT_437: MetatileRecord;
/** MT_438 (偏移 7446, 类型 MAP) */
export declare const MT_438: MetatileRecord;
/** MT_439 (偏移 7463, 类型 MAP) */
export declare const MT_439: MetatileRecord;
/** MT_440 (偏移 7480, 类型 MAP) */
export declare const MT_440: MetatileRecord;
/** MT_441 (偏移 7497, 类型 MAP) */
export declare const MT_441: MetatileRecord;
/** MT_442 (偏移 7514, 类型 MAP) */
export declare const MT_442: MetatileRecord;
/** MT_443 (偏移 7531, 类型 MAP) */
export declare const MT_443: MetatileRecord;
/** MT_444 (偏移 7548, 类型 MAP) */
export declare const MT_444: MetatileRecord;
/** MT_445 (偏移 7565, 类型 MAP) */
export declare const MT_445: MetatileRecord;
/** MT_446 (偏移 7582, 类型 MAP) */
export declare const MT_446: MetatileRecord;
/** MT_447 (偏移 7599, 类型 MAP) */
export declare const MT_447: MetatileRecord;
/** MT_448 (偏移 7616, 类型 MAP) */
export declare const MT_448: MetatileRecord;
/** MT_449 (偏移 7633, 类型 MAP) */
export declare const MT_449: MetatileRecord;
/** MT_450 (偏移 7650, 类型 MAP) */
export declare const MT_450: MetatileRecord;
/** MT_451 (偏移 7667, 类型 MAP) */
export declare const MT_451: MetatileRecord;
/** MT_452 (偏移 7684, 类型 MAP) */
export declare const MT_452: MetatileRecord;
/** MT_453 (偏移 7701, 类型 MAP) */
export declare const MT_453: MetatileRecord;
/** MT_454 (偏移 7718, 类型 MAP) */
export declare const MT_454: MetatileRecord;
/** MT_455 (偏移 7735, 类型 MAP) */
export declare const MT_455: MetatileRecord;
/** MT_456 (偏移 7752, 类型 MAP) */
export declare const MT_456: MetatileRecord;
/** MT_457 (偏移 7769, 类型 MAP) */
export declare const MT_457: MetatileRecord;
/** MT_458 (偏移 7786, 类型 MAP) */
export declare const MT_458: MetatileRecord;
/** MT_459 (偏移 7803, 类型 MAP) */
export declare const MT_459: MetatileRecord;
/** MT_460 (偏移 7820, 类型 MAP) */
export declare const MT_460: MetatileRecord;
/** MT_461 (偏移 7837, 类型 MAP) */
export declare const MT_461: MetatileRecord;
/** MT_462 (偏移 7854, 类型 MAP) */
export declare const MT_462: MetatileRecord;
/** MT_463 (偏移 7871, 类型 MAP) */
export declare const MT_463: MetatileRecord;
/** MT_464 (偏移 7888, 类型 MAP) */
export declare const MT_464: MetatileRecord;
/** MT_465 (偏移 7905, 类型 MAP) */
export declare const MT_465: MetatileRecord;
/** MT_466 (偏移 7922, 类型 MAP) */
export declare const MT_466: MetatileRecord;
/** MT_467 (偏移 7939, 类型 MAP) */
export declare const MT_467: MetatileRecord;
/** MT_468 (偏移 7956, 类型 MAP) */
export declare const MT_468: MetatileRecord;
/** MT_469 (偏移 7973, 类型 MAP) */
export declare const MT_469: MetatileRecord;
/** MT_470 (偏移 7990, 类型 MAP) */
export declare const MT_470: MetatileRecord;
/** MT_471 (偏移 8007, 类型 MAP) */
export declare const MT_471: MetatileRecord;
/** MT_472 (偏移 8024, 类型 MAP) */
export declare const MT_472: MetatileRecord;
/** MT_473 (偏移 8041, 类型 MAP) */
export declare const MT_473: MetatileRecord;
/** MT_474 (偏移 8058, 类型 MAP) */
export declare const MT_474: MetatileRecord;
/** MT_475 (偏移 8075, 类型 MAP) */
export declare const MT_475: MetatileRecord;
/** MT_476 (偏移 8092, 类型 MAP) */
export declare const MT_476: MetatileRecord;
/** MT_477 (偏移 8109, 类型 MAP) */
export declare const MT_477: MetatileRecord;
/** MT_478 (偏移 8126, 类型 MAP) */
export declare const MT_478: MetatileRecord;
/** MT_479 (偏移 8143, 类型 MAP) */
export declare const MT_479: MetatileRecord;
/** MT_480 (偏移 8160, 类型 MAP) */
export declare const MT_480: MetatileRecord;
/** MT_481 (偏移 8177, 类型 MAP) */
export declare const MT_481: MetatileRecord;
/** 全部 482 条 metatile 记录 (按索引顺序) */
export declare const METATILE_TABLE: readonly MetatileRecord[];
/** 按索引查询 metatile 记录 (等价 bank8 偏移 N×17 的读取) */
export declare function getMetatile(index: number): MetatileRecord;
