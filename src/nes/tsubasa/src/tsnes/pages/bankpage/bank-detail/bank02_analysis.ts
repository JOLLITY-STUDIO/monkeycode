// Auto-generated from bank02_analysis.json
// DO NOT EDIT manually — run scripts/analyze_bank02.cjs to regenerate
const data = {
  "bankId": 2,
  "baseAddr": 32768,
  "prgOffset": 16384,
  "stats": {
    "totalLines": 7234,
    "codeBytes": 1836,
    "dataBytes": 261,
    "unaccessedBytes": 6111,
    "subroutineCount": 15,
    "dataTableCount": 18,
    "jsrCount": 74,
    "jmpCount": 18,
    "ldaDataCount": 14,
    "note": "stats from _stats.txt"
  },
  "subroutines": [
    {
      "startLine": 5,
      "endLine": 48,
      "startAddr": 16400,
      "endAddr": 16500,
      "startBankAddr": "8000",
      "endBankAddr": "8064",
      "length": 44,
      "name": "sub_8000",
      "displayName": "sub_$8000"
    },
    {
      "startLine": 62,
      "endLine": 127,
      "startAddr": 16515,
      "endAddr": 16658,
      "startBankAddr": "8073",
      "endBankAddr": "8102",
      "length": 66,
      "name": "sub_8073",
      "displayName": "sub_$8073"
    },
    {
      "startLine": 131,
      "endLine": 156,
      "startAddr": 16663,
      "endAddr": 16711,
      "startBankAddr": "8107",
      "endBankAddr": "8137",
      "length": 26,
      "name": "sub_8107",
      "displayName": "NMI 结束 / 帧同步 ($8107)"
    },
    {
      "startLine": 197,
      "endLine": 256,
      "startAddr": 16752,
      "endAddr": 16883,
      "startBankAddr": "8160",
      "endBankAddr": "81E3",
      "length": 60,
      "name": "sub_8160",
      "displayName": "IRQ 处理 / MMC3 scanline ($8160)"
    },
    {
      "startLine": 285,
      "endLine": 287,
      "startAddr": 16912,
      "endAddr": 16918,
      "startBankAddr": "8200",
      "endBankAddr": "8206",
      "length": 3,
      "name": "sub_8200",
      "displayName": "sub_$8200"
    },
    {
      "startLine": 291,
      "endLine": 294,
      "startAddr": 16924,
      "endAddr": 16933,
      "startBankAddr": "820C",
      "endBankAddr": "8215",
      "length": 4,
      "name": "sub_820C",
      "displayName": "场景入口 D ($820C)"
    },
    {
      "startLine": 298,
      "endLine": 511,
      "startAddr": 16939,
      "endAddr": 17381,
      "startBankAddr": "821B",
      "endBankAddr": "83D5",
      "length": 214,
      "name": "sub_821B",
      "displayName": "场景入口 A: 初始化 ($821B) [RSET后首个业务入口]",
      "note": "RESET后 Bank30 $C400(R7=Bank02)→JMP $A200→$8200: JMP $A21B(→本函数)。密集调用Bank00服务: $9A43(L321)→$98A0(L327 NT清零)→$9B7F(L331)→$9F69(L332)→$8297(L345 调色板)→$8AF7(scene=0x17)→$890C→$88FB→$9A35→JMP $9EED(L511 进Bank00主循环)"
    },
    {
      "startLine": 684,
      "endLine": 691,
      "startAddr": 17556,
      "endAddr": 17568,
      "startBankAddr": "8484",
      "endBankAddr": "8490",
      "length": 8,
      "name": "sub_8484",
      "displayName": "跳转表分发 ($8484)"
    },
    {
      "startLine": 740,
      "endLine": 830,
      "startAddr": 17617,
      "endAddr": 17809,
      "startBankAddr": "84C1",
      "endBankAddr": "8581",
      "length": 91,
      "name": "sub_84C1",
      "displayName": "绘制/初始化大段 ($84C1)"
    },
    {
      "startLine": 870,
      "endLine": 877,
      "startAddr": 17849,
      "endAddr": 17864,
      "startBankAddr": "85A9",
      "endBankAddr": "85B8",
      "length": 8,
      "name": "sub_85A9",
      "displayName": "sub_$85A9"
    },
    {
      "startLine": 913,
      "endLine": 1108,
      "startAddr": 17900,
      "endAddr": 18306,
      "startBankAddr": "85DC",
      "endBankAddr": "8772",
      "length": 196,
      "name": "sub_85DC",
      "displayName": "场地生成主流程 ($85DC)"
    },
    {
      "startLine": 1117,
      "endLine": 1125,
      "startAddr": 18315,
      "endAddr": 18333,
      "startBankAddr": "877B",
      "endBankAddr": "878D",
      "length": 9,
      "name": "sub_877B",
      "displayName": "877B: 场地生成辅助 ($877B)"
    },
    {
      "startLine": 1174,
      "endLine": 1204,
      "startAddr": 18382,
      "endAddr": 18442,
      "startBankAddr": "87BE",
      "endBankAddr": "87FA",
      "length": 31,
      "name": "sub_87BE",
      "displayName": "球门绘制 (A7BE) ($87BE)"
    },
    {
      "startLine": 1257,
      "endLine": 1358,
      "startAddr": 18495,
      "endAddr": 18701,
      "startBankAddr": "882F",
      "endBankAddr": "88FD",
      "length": 102,
      "name": "sub_882F",
      "displayName": "882F: AA47 读取与 OAM 缓冲写入 ($882F)"
    },
    {
      "startLine": 1623,
      "endLine": 1638,
      "startAddr": 18966,
      "endAddr": 18991,
      "startBankAddr": "8A06",
      "endBankAddr": "8A1F",
      "length": 16,
      "name": "sub_8A06",
      "displayName": "8A06: AA06 调色板/CHR（跳转入口） ($8A06)"
    }
  ],
  "dataTables": [
    {
      "startLine": 49,
      "endLine": 52,
      "startAddr": 16502,
      "endAddr": 16505,
      "startBankAddr": "8066",
      "endBankAddr": "8069",
      "length": 4,
      "displayName": "data_$8066 [$8066-$8069, 4B]"
    },
    {
      "startLine": 53,
      "endLine": 61,
      "startAddr": 16506,
      "endAddr": 16514,
      "startBankAddr": "806A",
      "endBankAddr": "8072",
      "length": 9,
      "knownName": "806A code→data 隔离区",
      "displayName": "806A code→data 隔离区 [$806A-$8072, 9B]"
    },
    {
      "startLine": 157,
      "endLine": 160,
      "startAddr": 16712,
      "endAddr": 16715,
      "startBankAddr": "8138",
      "endBankAddr": "813B",
      "length": 4,
      "displayName": "data_$8138 [$8138-$813B, 4B]"
    },
    {
      "startLine": 161,
      "endLine": 196,
      "startAddr": 16716,
      "endAddr": 16751,
      "startBankAddr": "813C",
      "endBankAddr": "815F",
      "length": 36,
      "knownName": "813C 帧同步后数据",
      "displayName": "813C 帧同步后数据 [$813C-$815F, 36B]"
    },
    {
      "startLine": 257,
      "endLine": 260,
      "startAddr": 16884,
      "endAddr": 16887,
      "startBankAddr": "81E4",
      "endBankAddr": "81E7",
      "length": 4,
      "displayName": "data_$81E4 [$81E4-$81E7, 4B]"
    },
    {
      "startLine": 261,
      "endLine": 284,
      "startAddr": 16888,
      "endAddr": 16911,
      "startBankAddr": "81E8",
      "endBankAddr": "81FF",
      "length": 24,
      "knownName": "81E8 IRQ后数据",
      "displayName": "81E8 IRQ后数据 [$81E8-$81FF, 24B]"
    },
    {
      "startLine": 512,
      "endLine": 515,
      "startAddr": 17384,
      "endAddr": 17387,
      "startBankAddr": "83D8",
      "endBankAddr": "83DB",
      "length": 4,
      "displayName": "data_$83D8 [$83D8-$83DB, 4B]"
    },
    {
      "startLine": 516,
      "endLine": 683,
      "startAddr": 17388,
      "endAddr": 17555,
      "startBankAddr": "83DC",
      "endBankAddr": "8483",
      "length": 168,
      "knownName": "83DC 跳转表/调试数据（大段）",
      "displayName": "83DC 跳转表/调试数据（大段） [$83DC-$8483, 168B]"
    },
    {
      "startLine": 712,
      "endLine": 715,
      "startAddr": 17589,
      "endAddr": 17592,
      "startBankAddr": "84A5",
      "endBankAddr": "84A8",
      "length": 4,
      "displayName": "data_$84A5 [$84A5-$84A8, 4B]"
    },
    {
      "startLine": 716,
      "endLine": 729,
      "startAddr": 17593,
      "endAddr": 17606,
      "startBankAddr": "84A9",
      "endBankAddr": "84B6",
      "length": 14,
      "knownName": "84A9 跳转表辅助数据",
      "displayName": "84A9 跳转表辅助数据 [$84A9-$84B6, 14B]"
    },
    {
      "startLine": 831,
      "endLine": 834,
      "startAddr": 17810,
      "endAddr": 17813,
      "startBankAddr": "8582",
      "endBankAddr": "8585",
      "length": 4,
      "displayName": "data_$8582 [$8582-$8585, 4B]"
    },
    {
      "startLine": 835,
      "endLine": 869,
      "startAddr": 17814,
      "endAddr": 17848,
      "startBankAddr": "8586",
      "endBankAddr": "85A8",
      "length": 35,
      "knownName": "8586 初始化后数据",
      "displayName": "8586 初始化后数据 [$8586-$85A8, 35B]"
    },
    {
      "startLine": 878,
      "endLine": 881,
      "startAddr": 17865,
      "endAddr": 17868,
      "startBankAddr": "85B9",
      "endBankAddr": "85BC",
      "length": 4,
      "displayName": "data_$85B9 [$85B9-$85BC, 4B]"
    },
    {
      "startLine": 882,
      "endLine": 912,
      "startAddr": 17869,
      "endAddr": 17899,
      "startBankAddr": "85BD",
      "endBankAddr": "85DB",
      "length": 31,
      "knownName": "85BD 场地前数据",
      "displayName": "85BD 场地前数据 [$85BD-$85DB, 31B]"
    },
    {
      "startLine": 1109,
      "endLine": 1112,
      "startAddr": 18307,
      "endAddr": 18310,
      "startBankAddr": "8773",
      "endBankAddr": "8776",
      "length": 4,
      "displayName": "data_$8773 [$8773-$8776, 4B]"
    },
    {
      "startLine": 1113,
      "endLine": 1116,
      "startAddr": 18311,
      "endAddr": 18314,
      "startBankAddr": "8777",
      "endBankAddr": "877A",
      "length": 4,
      "knownName": "8777 场地后小数据",
      "displayName": "8777 场地后小数据 [$8777-$877A, 4B]"
    },
    {
      "startLine": 1126,
      "endLine": 1129,
      "startAddr": 18334,
      "endAddr": 18337,
      "startBankAddr": "878E",
      "endBankAddr": "8791",
      "length": 4,
      "displayName": "data_$878E [$878E-$8791, 4B]"
    },
    {
      "startLine": 1130,
      "endLine": 1173,
      "startAddr": 18338,
      "endAddr": 18381,
      "startBankAddr": "8792",
      "endBankAddr": "87BD",
      "length": 44,
      "knownName": "8792 球门/场地相关数据",
      "displayName": "8792 球门/场地相关数据 [$8792-$87BD, 44B]"
    },
    {
      "startLine": 1205,
      "endLine": 1208,
      "startAddr": 18443,
      "endAddr": 18446,
      "startBankAddr": "87FB",
      "endBankAddr": "87FE",
      "length": 4,
      "displayName": "data_$87FB [$87FB-$87FE, 4B]"
    },
    {
      "startLine": 1209,
      "endLine": 1256,
      "startAddr": 18447,
      "endAddr": 18494,
      "startBankAddr": "87FF",
      "endBankAddr": "882E",
      "length": 48,
      "knownName": "87FF 球门/边界相关数据",
      "displayName": "87FF 球门/边界相关数据 [$87FF-$882E, 48B]"
    },
    {
      "startLine": 1359,
      "endLine": 1362,
      "startAddr": 18702,
      "endAddr": 18705,
      "startBankAddr": "88FE",
      "endBankAddr": "8901",
      "length": 4,
      "displayName": "data_$88FE [$88FE-$8901, 4B]"
    },
    {
      "startLine": 1363,
      "endLine": 1575,
      "startAddr": 18706,
      "endAddr": 18918,
      "startBankAddr": "8902",
      "endBankAddr": "89D6",
      "length": 213,
      "knownName": "8902 场地大段数据（含 AA47 前导）",
      "displayName": "8902 场地大段数据（含 AA47 前导） [$8902-$89D6, 213B]"
    },
    {
      "startLine": 1576,
      "endLine": 1622,
      "startAddr": 18919,
      "endAddr": 18965,
      "startBankAddr": "89D7",
      "endBankAddr": "8A05",
      "length": 47,
      "displayName": "data_$89D7 [$89D7-$8A05, 47B]"
    },
    {
      "startLine": 1639,
      "endLine": 1642,
      "startAddr": 18992,
      "endAddr": 18995,
      "startBankAddr": "8A20",
      "endBankAddr": "8A23",
      "length": 4,
      "displayName": "data_$8A20 [$8A20-$8A23, 4B]"
    },
    {
      "startLine": 1643,
      "endLine": 1677,
      "startAddr": 18996,
      "endAddr": 19030,
      "startBankAddr": "8A24",
      "endBankAddr": "8A46",
      "length": 35,
      "knownName": "8A24 AA47 前导段",
      "displayName": "8A24 AA47 前导段 [$8A24-$8A46, 35B]"
    },
    {
      "startLine": 1678,
      "endLine": 1756,
      "startAddr": 19031,
      "endAddr": 19109,
      "startBankAddr": "8A47",
      "endBankAddr": "8A95",
      "length": 79,
      "knownName": "AA47 metatile→tile 展开表",
      "displayName": "AA47 metatile→tile 展开表 [$8A47-$8A95, 79B]"
    },
    {
      "startLine": 1758,
      "endLine": 1761,
      "startAddr": 19111,
      "endAddr": 19114,
      "startBankAddr": "8A97",
      "endBankAddr": "8A9A",
      "length": 4,
      "displayName": "data_$8A97 [$8A97-$8A9A, 4B]"
    },
    {
      "startLine": 1762,
      "endLine": 1839,
      "startAddr": 19115,
      "endAddr": 19192,
      "startBankAddr": "8A9B",
      "endBankAddr": "8AE8",
      "length": 78,
      "knownName": "8A9B AA97 场地参数/镜头表",
      "displayName": "8A9B AA97 场地参数/镜头表 [$8A9B-$8AE8, 78B]"
    },
    {
      "startLine": 1846,
      "endLine": 1849,
      "startAddr": 19199,
      "endAddr": 19202,
      "startBankAddr": "8AEF",
      "endBankAddr": "8AF2",
      "length": 4,
      "displayName": "data_$8AEF [$8AEF-$8AF2, 4B]"
    },
    {
      "startLine": 1850,
      "endLine": 1855,
      "startAddr": 19203,
      "endAddr": 19208,
      "startBankAddr": "8AF3",
      "endBankAddr": "8AF8",
      "length": 6,
      "knownName": "8AF3 滚动参数表",
      "displayName": "8AF3 滚动参数表 [$8AF3-$8AF8, 6B]"
    },
    {
      "startLine": 1862,
      "endLine": 1865,
      "startAddr": 19215,
      "endAddr": 19218,
      "startBankAddr": "8AFF",
      "endBankAddr": "8B02",
      "length": 4,
      "displayName": "data_$8AFF [$8AFF-$8B02, 4B]"
    },
    {
      "startLine": 1866,
      "endLine": 1871,
      "startAddr": 19219,
      "endAddr": 19224,
      "startBankAddr": "8B03",
      "endBankAddr": "8B08",
      "length": 6,
      "knownName": "8B03 边界表 v1",
      "displayName": "8B03 边界表 v1 [$8B03-$8B08, 6B]"
    },
    {
      "startLine": 1878,
      "endLine": 1881,
      "startAddr": 19231,
      "endAddr": 19234,
      "startBankAddr": "8B0F",
      "endBankAddr": "8B12",
      "length": 4,
      "displayName": "data_$8B0F [$8B0F-$8B12, 4B]"
    },
    {
      "startLine": 1882,
      "endLine": 1887,
      "startAddr": 19235,
      "endAddr": 19240,
      "startBankAddr": "8B13",
      "endBankAddr": "8B18",
      "length": 6,
      "knownName": "8B13 边界表 v2",
      "displayName": "8B13 边界表 v2 [$8B13-$8B18, 6B]"
    },
    {
      "startLine": 1910,
      "endLine": 1913,
      "startAddr": 19263,
      "endAddr": 19266,
      "startBankAddr": "8B2F",
      "endBankAddr": "8B32",
      "length": 4,
      "displayName": "data_$8B2F [$8B2F-$8B32, 4B]"
    },
    {
      "startLine": 1914,
      "endLine": 7238,
      "startAddr": 19267,
      "endAddr": 24591,
      "startBankAddr": "8B33",
      "endBankAddr": "9FFF",
      "length": 5325,
      "knownName": "8B33 未完全解码数据区",
      "displayName": "8B33 未完全解码数据区 [$8B33-$9FFF, 5325B]"
    }
  ],
  "refs": [
    {
      "from": 16547,
      "fromBankAddr": "8093",
      "to": 41419,
      "op": "JSR",
      "line": 78
    },
    {
      "from": 16794,
      "fromBankAddr": "818A",
      "to": 41384,
      "op": "JMP",
      "line": 215
    },
    {
      "from": 16855,
      "fromBankAddr": "81C7",
      "to": 41419,
      "op": "JSR",
      "line": 244
    },
    {
      "from": 16912,
      "fromBankAddr": "8200",
      "to": 41499,
      "op": "JMP",
      "line": 285
    },
    {
      "from": 16915,
      "fromBankAddr": "8203",
      "to": 41647,
      "op": "JMP",
      "line": 286
    },
    {
      "from": 16918,
      "fromBankAddr": "8206",
      "to": 41704,
      "op": "JMP",
      "line": 287
    },
    {
      "from": 16924,
      "fromBankAddr": "820C",
      "to": 43093,
      "op": "JMP",
      "line": 291
    },
    {
      "from": 16927,
      "fromBankAddr": "820F",
      "to": 43118,
      "op": "JMP",
      "line": 292
    },
    {
      "from": 16930,
      "fromBankAddr": "8212",
      "to": 42116,
      "op": "JMP",
      "line": 293
    },
    {
      "from": 16933,
      "fromBankAddr": "8215",
      "to": 43214,
      "op": "JMP",
      "line": 294
    },
    {
      "from": 16984,
      "fromBankAddr": "8248",
      "to": 43526,
      "op": "JSR",
      "line": 321
    },
    {
      "from": 16997,
      "fromBankAddr": "8255",
      "to": 39491,
      "op": "JSR",
      "line": 327
    },
    {
      "from": 17006,
      "fromBankAddr": "825E",
      "to": 39072,
      "op": "JSR",
      "line": 331
    },
    {
      "from": 17009,
      "fromBankAddr": "8261",
      "to": 39807,
      "op": "JSR",
      "line": 332
    },
    {
      "from": 17035,
      "fromBankAddr": "827B",
      "to": 40809,
      "op": "JSR",
      "line": 345
    },
    {
      "from": 17038,
      "fromBankAddr": "827E",
      "to": 41618,
      "op": "JMP",
      "line": 346
    },
    {
      "from": 17055,
      "fromBankAddr": "828F",
      "to": 40809,
      "op": "JSR",
      "line": 354
    },
    {
      "from": 17072,
      "fromBankAddr": "82A0",
      "to": 40809,
      "op": "JSR",
      "line": 362
    },
    {
      "from": 17084,
      "fromBankAddr": "82AC",
      "to": 40685,
      "op": "JMP",
      "line": 367
    },
    {
      "from": 17087,
      "fromBankAddr": "82AF",
      "to": 39408,
      "op": "JSR",
      "line": 368
    },
    {
      "from": 17090,
      "fromBankAddr": "82B2",
      "to": 39072,
      "op": "JSR",
      "line": 369
    },
    {
      "from": 17093,
      "fromBankAddr": "82B5",
      "to": 39807,
      "op": "JSR",
      "line": 370
    },
    {
      "from": 17138,
      "fromBankAddr": "82E2",
      "to": 43526,
      "op": "JSR",
      "line": 391
    },
    {
      "from": 17141,
      "fromBankAddr": "82E5",
      "to": 50519,
      "op": "JMP",
      "line": 392
    },
    {
      "from": 17162,
      "fromBankAddr": "82FA",
      "to": 40872,
      "op": "JSR",
      "line": 402
    },
    {
      "from": 17176,
      "fromBankAddr": "8308",
      "to": 43743,
      "op": "LDA",
      "line": 410,
      "kind": "data"
    },
    {
      "from": 17186,
      "fromBankAddr": "8312",
      "to": 43744,
      "op": "LDA",
      "line": 415,
      "kind": "data"
    },
    {
      "from": 17193,
      "fromBankAddr": "8319",
      "to": 43744,
      "op": "LDA",
      "line": 418,
      "kind": "data"
    },
    {
      "from": 17221,
      "fromBankAddr": "8335",
      "to": 41720,
      "op": "JMP",
      "line": 433
    },
    {
      "from": 17232,
      "fromBankAddr": "8340",
      "to": 50365,
      "op": "JSR",
      "line": 438
    },
    {
      "from": 17284,
      "fromBankAddr": "8374",
      "to": 40872,
      "op": "JSR",
      "line": 466
    },
    {
      "from": 17328,
      "fromBankAddr": "83A0",
      "to": 41842,
      "op": "JMP",
      "line": 488
    },
    {
      "from": 17341,
      "fromBankAddr": "83AD",
      "to": 40872,
      "op": "JSR",
      "line": 493
    },
    {
      "from": 17361,
      "fromBankAddr": "83C1",
      "to": 40872,
      "op": "JSR",
      "line": 502
    },
    {
      "from": 17381,
      "fromBankAddr": "83D5",
      "to": 41899,
      "op": "JMP",
      "line": 511
    },
    {
      "from": 17560,
      "fromBankAddr": "8488",
      "to": 42130,
      "op": "LDA",
      "line": 687,
      "kind": "data"
    },
    {
      "from": 17564,
      "fromBankAddr": "848C",
      "to": 42129,
      "op": "LDA",
      "line": 689,
      "kind": "data"
    },
    {
      "from": 17617,
      "fromBankAddr": "84C1",
      "to": 39437,
      "op": "JSR",
      "line": 740
    },
    {
      "from": 17622,
      "fromBankAddr": "84C6",
      "to": 40872,
      "op": "JSR",
      "line": 742
    },
    {
      "from": 17629,
      "fromBankAddr": "84CD",
      "to": 40872,
      "op": "JSR",
      "line": 745
    },
    {
      "from": 17634,
      "fromBankAddr": "84D2",
      "to": 35084,
      "op": "JSR",
      "line": 747
    },
    {
      "from": 17648,
      "fromBankAddr": "84E0",
      "to": 35575,
      "op": "JSR",
      "line": 754
    },
    {
      "from": 17657,
      "fromBankAddr": "84E9",
      "to": 35104,
      "op": "JSR",
      "line": 758
    },
    {
      "from": 17670,
      "fromBankAddr": "84F6",
      "to": 40872,
      "op": "JSR",
      "line": 764
    },
    {
      "from": 17673,
      "fromBankAddr": "84F9",
      "to": 39477,
      "op": "JSR",
      "line": 765
    },
    {
      "from": 17676,
      "fromBankAddr": "84FC",
      "to": 35067,
      "op": "JSR",
      "line": 766
    },
    {
      "from": 17681,
      "fromBankAddr": "8501",
      "to": 40872,
      "op": "JSR",
      "line": 768
    },
    {
      "from": 17703,
      "fromBankAddr": "8517",
      "to": 35104,
      "op": "JSR",
      "line": 779
    },
    {
      "from": 17714,
      "fromBankAddr": "8522",
      "to": 40872,
      "op": "JSR",
      "line": 784
    },
    {
      "from": 17719,
      "fromBankAddr": "8527",
      "to": 40872,
      "op": "JSR",
      "line": 786
    },
    {
      "from": 17736,
      "fromBankAddr": "8538",
      "to": 39408,
      "op": "JSR",
      "line": 794
    },
    {
      "from": 17739,
      "fromBankAddr": "853B",
      "to": 39807,
      "op": "JSR",
      "line": 795
    },
    {
      "from": 17742,
      "fromBankAddr": "853E",
      "to": 39072,
      "op": "JSR",
      "line": 796
    },
    {
      "from": 17759,
      "fromBankAddr": "854F",
      "to": 39146,
      "op": "JSR",
      "line": 804
    },
    {
      "from": 17764,
      "fromBankAddr": "8554",
      "to": 35104,
      "op": "JSR",
      "line": 806
    },
    {
      "from": 17804,
      "fromBankAddr": "857C",
      "to": 39825,
      "op": "JSR",
      "line": 828
    },
    {
      "from": 17851,
      "fromBankAddr": "85AB",
      "to": 40854,
      "op": "JSR",
      "line": 871
    },
    {
      "from": 17859,
      "fromBankAddr": "85B3",
      "to": 40841,
      "op": "JSR",
      "line": 875
    },
    {
      "from": 17902,
      "fromBankAddr": "85DE",
      "to": 34965,
      "op": "JSR",
      "line": 914
    },
    {
      "from": 17907,
      "fromBankAddr": "85E3",
      "to": 35104,
      "op": "JSR",
      "line": 916
    },
    {
      "from": 17919,
      "fromBankAddr": "85EF",
      "to": 34965,
      "op": "JSR",
      "line": 922
    },
    {
      "from": 17924,
      "fromBankAddr": "85F4",
      "to": 35104,
      "op": "JSR",
      "line": 924
    },
    {
      "from": 17945,
      "fromBankAddr": "8609",
      "to": 34965,
      "op": "JSR",
      "line": 935
    },
    {
      "from": 17950,
      "fromBankAddr": "860E",
      "to": 35104,
      "op": "JSR",
      "line": 937
    },
    {
      "from": 17967,
      "fromBankAddr": "861F",
      "to": 34965,
      "op": "JSR",
      "line": 946
    },
    {
      "from": 17972,
      "fromBankAddr": "8624",
      "to": 35104,
      "op": "JSR",
      "line": 948
    },
    {
      "from": 17982,
      "fromBankAddr": "862E",
      "to": 35190,
      "op": "JSR",
      "line": 953
    },
    {
      "from": 17985,
      "fromBankAddr": "8631",
      "to": 39477,
      "op": "JSR",
      "line": 954
    },
    {
      "from": 17990,
      "fromBankAddr": "8636",
      "to": 40872,
      "op": "JSR",
      "line": 956
    },
    {
      "from": 18011,
      "fromBankAddr": "864B",
      "to": 43055,
      "op": "JSR",
      "line": 965
    },
    {
      "from": 18023,
      "fromBankAddr": "8657",
      "to": 43671,
      "op": "LDA",
      "line": 971,
      "kind": "data"
    },
    {
      "from": 18042,
      "fromBankAddr": "866A",
      "to": 43671,
      "op": "LDA",
      "line": 982,
      "kind": "data"
    },
    {
      "from": 18048,
      "fromBankAddr": "8670",
      "to": 43671,
      "op": "LDA",
      "line": 985,
      "kind": "data"
    },
    {
      "from": 18056,
      "fromBankAddr": "8678",
      "to": 39720,
      "op": "JSR",
      "line": 989
    },
    {
      "from": 18073,
      "fromBankAddr": "8689",
      "to": 39774,
      "op": "JSR",
      "line": 997
    },
    {
      "from": 18084,
      "fromBankAddr": "8694",
      "to": 40872,
      "op": "JSR",
      "line": 1002
    },
    {
      "from": 18087,
      "fromBankAddr": "8697",
      "to": 42581,
      "op": "JMP",
      "line": 1003
    },
    {
      "from": 18100,
      "fromBankAddr": "86A4",
      "to": 42855,
      "op": "JSR",
      "line": 1009
    },
    {
      "from": 18125,
      "fromBankAddr": "86BD",
      "to": 42796,
      "op": "JSR",
      "line": 1021
    },
    {
      "from": 18142,
      "fromBankAddr": "86CE",
      "to": 42796,
      "op": "JSR",
      "line": 1029
    },
    {
      "from": 18148,
      "fromBankAddr": "86D4",
      "to": 42855,
      "op": "JSR",
      "line": 1032
    },
    {
      "from": 18173,
      "fromBankAddr": "86ED",
      "to": 42796,
      "op": "JSR",
      "line": 1044
    },
    {
      "from": 18180,
      "fromBankAddr": "86F4",
      "to": 42796,
      "op": "JSR",
      "line": 1047
    },
    {
      "from": 18185,
      "fromBankAddr": "86F9",
      "to": 42619,
      "op": "LDA",
      "line": 1049,
      "kind": "data"
    },
    {
      "from": 18212,
      "fromBankAddr": "8714",
      "to": 42796,
      "op": "JSR",
      "line": 1062
    },
    {
      "from": 18288,
      "fromBankAddr": "8760",
      "to": 40872,
      "op": "JSR",
      "line": 1099
    },
    {
      "from": 18297,
      "fromBankAddr": "8769",
      "to": 42615,
      "op": "LDA",
      "line": 1104,
      "kind": "data"
    },
    {
      "from": 18317,
      "fromBankAddr": "877D",
      "to": 34965,
      "op": "JSR",
      "line": 1118
    },
    {
      "from": 18325,
      "fromBankAddr": "8785",
      "to": 40872,
      "op": "JSR",
      "line": 1122
    },
    {
      "from": 18328,
      "fromBankAddr": "8788",
      "to": 35067,
      "op": "JSR",
      "line": 1123
    },
    {
      "from": 18384,
      "fromBankAddr": "87C0",
      "to": 40872,
      "op": "JSR",
      "line": 1175
    },
    {
      "from": 18393,
      "fromBankAddr": "87C9",
      "to": 43055,
      "op": "JSR",
      "line": 1179
    },
    {
      "from": 18401,
      "fromBankAddr": "87D1",
      "to": 34965,
      "op": "JSR",
      "line": 1183
    },
    {
      "from": 18411,
      "fromBankAddr": "87DB",
      "to": 40872,
      "op": "JSR",
      "line": 1188
    },
    {
      "from": 18501,
      "fromBankAddr": "8835",
      "to": 40872,
      "op": "JSR",
      "line": 1260
    },
    {
      "from": 18555,
      "fromBankAddr": "886B",
      "to": 43176,
      "op": "JMP",
      "line": 1288
    },
    {
      "from": 18574,
      "fromBankAddr": "887E",
      "to": 43191,
      "op": "JSR",
      "line": 1297
    },
    {
      "from": 18577,
      "fromBankAddr": "8881",
      "to": 43171,
      "op": "JMP",
      "line": 1298
    },
    {
      "from": 18582,
      "fromBankAddr": "8886",
      "to": 43191,
      "op": "JSR",
      "line": 1300
    },
    {
      "from": 18585,
      "fromBankAddr": "8889",
      "to": 43171,
      "op": "JMP",
      "line": 1301
    },
    {
      "from": 18590,
      "fromBankAddr": "888E",
      "to": 43191,
      "op": "JSR",
      "line": 1303
    },
    {
      "from": 18595,
      "fromBankAddr": "8893",
      "to": 43591,
      "op": "LDA",
      "line": 1305,
      "kind": "data"
    },
    {
      "from": 18611,
      "fromBankAddr": "88A3",
      "to": 43591,
      "op": "LDA",
      "line": 1314,
      "kind": "data"
    },
    {
      "from": 18618,
      "fromBankAddr": "88AA",
      "to": 43637,
      "op": "LDA",
      "line": 1317,
      "kind": "data"
    },
    {
      "from": 18637,
      "fromBankAddr": "88BD",
      "to": 43591,
      "op": "LDA",
      "line": 1327,
      "kind": "data"
    },
    {
      "from": 18656,
      "fromBankAddr": "88D0",
      "to": 40872,
      "op": "JSR",
      "line": 1338
    }
  ],
  "blocks": [
    {
      "type": "code",
      "startAddr": 16400,
      "endAddr": 16500,
      "startLine": 5,
      "endLine": 48,
      "length": 44
    },
    {
      "type": "unaccessed",
      "startAddr": 16502,
      "endAddr": 16514,
      "startLine": 49,
      "endLine": 61,
      "length": 13
    },
    {
      "type": "code",
      "startAddr": 16515,
      "endAddr": 16658,
      "startLine": 62,
      "endLine": 127,
      "length": 66
    },
    {
      "type": "unaccessed",
      "startAddr": 16660,
      "endAddr": 16662,
      "startLine": 128,
      "endLine": 130,
      "length": 3
    },
    {
      "type": "code",
      "startAddr": 16663,
      "endAddr": 16711,
      "startLine": 131,
      "endLine": 156,
      "length": 26
    },
    {
      "type": "unaccessed",
      "startAddr": 16712,
      "endAddr": 16751,
      "startLine": 157,
      "endLine": 196,
      "length": 40
    },
    {
      "type": "code",
      "startAddr": 16752,
      "endAddr": 16883,
      "startLine": 197,
      "endLine": 256,
      "length": 60
    },
    {
      "type": "unaccessed",
      "startAddr": 16884,
      "endAddr": 16911,
      "startLine": 257,
      "endLine": 284,
      "length": 28
    },
    {
      "type": "code",
      "startAddr": 16912,
      "endAddr": 16918,
      "startLine": 285,
      "endLine": 287,
      "length": 3
    },
    {
      "type": "unaccessed",
      "startAddr": 16921,
      "endAddr": 16923,
      "startLine": 288,
      "endLine": 290,
      "length": 3
    },
    {
      "type": "code",
      "startAddr": 16924,
      "endAddr": 16933,
      "startLine": 291,
      "endLine": 294,
      "length": 4
    },
    {
      "type": "unaccessed",
      "startAddr": 16936,
      "endAddr": 16938,
      "startLine": 295,
      "endLine": 297,
      "length": 3
    },
    {
      "type": "code",
      "startAddr": 16939,
      "endAddr": 17381,
      "startLine": 298,
      "endLine": 511,
      "length": 214
    },
    {
      "type": "unaccessed",
      "startAddr": 17384,
      "endAddr": 17555,
      "startLine": 512,
      "endLine": 683,
      "length": 172
    },
    {
      "type": "code",
      "startAddr": 17556,
      "endAddr": 17568,
      "startLine": 684,
      "endLine": 691,
      "length": 8
    },
    {
      "type": "data",
      "startAddr": 17569,
      "endAddr": 17574,
      "startLine": 692,
      "endLine": 697,
      "length": 6
    },
    {
      "type": "unaccessed",
      "startAddr": 17575,
      "endAddr": 17578,
      "startLine": 698,
      "endLine": 701,
      "length": 4
    },
    {
      "type": "data",
      "startAddr": 17579,
      "endAddr": 17582,
      "startLine": 702,
      "endLine": 705,
      "length": 4
    },
    {
      "type": "unaccessed",
      "startAddr": 17583,
      "endAddr": 17588,
      "startLine": 706,
      "endLine": 711,
      "length": 6
    },
    {
      "type": "data",
      "startAddr": 17589,
      "endAddr": 17606,
      "startLine": 712,
      "endLine": 729,
      "length": 18
    },
    {
      "type": "unaccessed",
      "startAddr": 17607,
      "endAddr": 17608,
      "startLine": 730,
      "endLine": 731,
      "length": 2
    },
    {
      "type": "data",
      "startAddr": 17609,
      "endAddr": 17614,
      "startLine": 732,
      "endLine": 737,
      "length": 6
    },
    {
      "type": "unaccessed",
      "startAddr": 17615,
      "endAddr": 17616,
      "startLine": 738,
      "endLine": 739,
      "length": 2
    },
    {
      "type": "code",
      "startAddr": 17617,
      "endAddr": 17809,
      "startLine": 740,
      "endLine": 830,
      "length": 91
    },
    {
      "type": "unaccessed",
      "startAddr": 17810,
      "endAddr": 17848,
      "startLine": 831,
      "endLine": 869,
      "length": 39
    },
    {
      "type": "code",
      "startAddr": 17849,
      "endAddr": 17864,
      "startLine": 870,
      "endLine": 877,
      "length": 8
    },
    {
      "type": "unaccessed",
      "startAddr": 17865,
      "endAddr": 17899,
      "startLine": 878,
      "endLine": 912,
      "length": 35
    },
    {
      "type": "code",
      "startAddr": 17900,
      "endAddr": 18306,
      "startLine": 913,
      "endLine": 1108,
      "length": 196
    },
    {
      "type": "data",
      "startAddr": 18307,
      "endAddr": 18314,
      "startLine": 1109,
      "endLine": 1116,
      "length": 8
    },
    {
      "type": "code",
      "startAddr": 18315,
      "endAddr": 18333,
      "startLine": 1117,
      "endLine": 1125,
      "length": 9
    },
    {
      "type": "unaccessed",
      "startAddr": 18334,
      "endAddr": 18381,
      "startLine": 1126,
      "endLine": 1173,
      "length": 48
    },
    {
      "type": "code",
      "startAddr": 18382,
      "endAddr": 18442,
      "startLine": 1174,
      "endLine": 1204,
      "length": 31
    },
    {
      "type": "unaccessed",
      "startAddr": 18443,
      "endAddr": 18494,
      "startLine": 1205,
      "endLine": 1256,
      "length": 52
    },
    {
      "type": "code",
      "startAddr": 18495,
      "endAddr": 18701,
      "startLine": 1257,
      "endLine": 1358,
      "length": 102
    },
    {
      "type": "unaccessed",
      "startAddr": 18702,
      "endAddr": 18965,
      "startLine": 1359,
      "endLine": 1622,
      "length": 264
    },
    {
      "type": "code",
      "startAddr": 18966,
      "endAddr": 18991,
      "startLine": 1623,
      "endLine": 1638,
      "length": 16
    },
    {
      "type": "unaccessed",
      "startAddr": 18992,
      "endAddr": 19030,
      "startLine": 1639,
      "endLine": 1677,
      "length": 39
    },
    {
      "type": "data",
      "startAddr": 19031,
      "endAddr": 19109,
      "startLine": 1678,
      "endLine": 1756,
      "length": 79
    },
    {
      "type": "unaccessed",
      "startAddr": 19110,
      "endAddr": 19110,
      "startLine": 1757,
      "endLine": 1757,
      "length": 1
    },
    {
      "type": "data",
      "startAddr": 19111,
      "endAddr": 19192,
      "startLine": 1758,
      "endLine": 1839,
      "length": 82
    },
    {
      "type": "unaccessed",
      "startAddr": 19193,
      "endAddr": 19198,
      "startLine": 1840,
      "endLine": 1845,
      "length": 6
    },
    {
      "type": "data",
      "startAddr": 19199,
      "endAddr": 19208,
      "startLine": 1846,
      "endLine": 1855,
      "length": 10
    },
    {
      "type": "unaccessed",
      "startAddr": 19209,
      "endAddr": 19214,
      "startLine": 1856,
      "endLine": 1861,
      "length": 6
    },
    {
      "type": "data",
      "startAddr": 19215,
      "endAddr": 19224,
      "startLine": 1862,
      "endLine": 1871,
      "length": 10
    },
    {
      "type": "unaccessed",
      "startAddr": 19225,
      "endAddr": 19230,
      "startLine": 1872,
      "endLine": 1877,
      "length": 6
    },
    {
      "type": "data",
      "startAddr": 19231,
      "endAddr": 19240,
      "startLine": 1878,
      "endLine": 1887,
      "length": 10
    },
    {
      "type": "unaccessed",
      "startAddr": 19241,
      "endAddr": 19246,
      "startLine": 1888,
      "endLine": 1893,
      "length": 6
    },
    {
      "type": "data",
      "startAddr": 19247,
      "endAddr": 19247,
      "startLine": 1894,
      "endLine": 1894,
      "length": 1
    },
    {
      "type": "unaccessed",
      "startAddr": 19248,
      "endAddr": 19248,
      "startLine": 1895,
      "endLine": 1895,
      "length": 1
    },
    {
      "type": "data",
      "startAddr": 19249,
      "endAddr": 19251,
      "startLine": 1896,
      "endLine": 1898,
      "length": 3
    },
    {
      "type": "unaccessed",
      "startAddr": 19252,
      "endAddr": 19252,
      "startLine": 1899,
      "endLine": 1899,
      "length": 1
    },
    {
      "type": "data",
      "startAddr": 19253,
      "endAddr": 19255,
      "startLine": 1900,
      "endLine": 1902,
      "length": 3
    },
    {
      "type": "unaccessed",
      "startAddr": 19256,
      "endAddr": 19256,
      "startLine": 1903,
      "endLine": 1903,
      "length": 1
    },
    {
      "type": "data",
      "startAddr": 19257,
      "endAddr": 19259,
      "startLine": 1904,
      "endLine": 1906,
      "length": 3
    },
    {
      "type": "unaccessed",
      "startAddr": 19260,
      "endAddr": 19260,
      "startLine": 1907,
      "endLine": 1907,
      "length": 1
    },
    {
      "type": "data",
      "startAddr": 19261,
      "endAddr": 19262,
      "startLine": 1908,
      "endLine": 1909,
      "length": 2
    },
    {
      "type": "unaccessed",
      "startAddr": 19263,
      "endAddr": 24591,
      "startLine": 1910,
      "endLine": 7238,
      "length": 5329
    }
  ]
};
export default data;
