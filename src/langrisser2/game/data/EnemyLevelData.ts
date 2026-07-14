/**
 * EnemyLevelData.ts — Langrisser II 各关卡敌人单位配置
 *
 * 由脚本生成: scripts/extract-enemy-data-full.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * ROM数据源: 0x18005E (场景配置指针表) → 各关卡配置结构
 */

export interface EnemyUnit {
  classId: number;
  commanderId: number;
  x: number;
  y: number;
  attr0: number;
  attr1: number;
  attr2: number;
  attr3: number;
  attr4: number;
  attr5: number;
  extraFlags: number;
}

export interface StageEnemyConfig {
  stage: number;
  enemies: EnemyUnit[];
}

export const ENEMY_LEVEL_DATA: StageEnemyConfig[] = [
  {
    "stage": 1,
    "enemies": [
      {
        "classId": 9,
        "commanderId": 11,
        "x": 4,
        "y": 1,
        "attr0": 786432,
        "attr1": 17921,
        "attr2": 34669312,
        "attr3": 67764224,
        "attr4": 33555203,
        "attr5": 336658432,
        "extraFlags": 32
      },
      {
        "classId": 17,
        "commanderId": 20,
        "x": 5,
        "y": 5,
        "attr0": 805269873,
        "attr1": 1912602623,
        "attr2": 0,
        "attr3": 838926865,
        "attr4": 50332675,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 2,
    "enemies": [
      {
        "classId": 19,
        "commanderId": 19,
        "x": 20,
        "y": 1,
        "attr0": 655363,
        "attr1": 302001408,
        "attr2": 16909098,
        "attr3": 0,
        "attr4": 117442054,
        "attr5": 471597056,
        "extraFlags": 38
      },
      {
        "classId": 19,
        "commanderId": 22,
        "x": 0,
        "y": 0,
        "attr0": 905929828,
        "attr1": 1785397247,
        "attr2": 0,
        "attr3": 290,
        "attr4": 53084160,
        "attr5": 1280,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 3,
    "enemies": [
      {
        "classId": 18,
        "commanderId": 17,
        "x": 0,
        "y": 0,
        "attr0": 655360,
        "attr1": 20481,
        "attr2": 33555200,
        "attr3": 0,
        "attr4": 16778501,
        "attr5": 336658432,
        "extraFlags": 2
      },
      {
        "classId": 20,
        "commanderId": 22,
        "x": 0,
        "y": 0,
        "attr0": 100625773,
        "attr1": 1835925503,
        "attr2": -2147483648,
        "attr3": 65794,
        "attr4": 51314688,
        "attr5": 2311,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 4,
    "enemies": [
      {
        "classId": 42,
        "commanderId": 7,
        "x": 4,
        "y": 1,
        "attr0": 720896,
        "attr1": 20481,
        "attr2": 33620736,
        "attr3": 120193024,
        "attr4": 16778501,
        "attr5": 336658432,
        "extraFlags": 2
      },
      {
        "classId": 18,
        "commanderId": 21,
        "x": 5,
        "y": 5,
        "attr0": 100625773,
        "attr1": 1845493759,
        "attr2": 0,
        "attr3": 1342243329,
        "attr4": 50333962,
        "attr5": 1536,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 5,
    "enemies": [
      {
        "classId": 42,
        "commanderId": 12,
        "x": 0,
        "y": 0,
        "attr0": 589824,
        "attr1": 0,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 16777216,
        "attr5": 353566720,
        "extraFlags": 52
      },
      {
        "classId": 19,
        "commanderId": 21,
        "x": 0,
        "y": 0,
        "attr0": -1342209149,
        "attr1": -2088533117,
        "attr2": 0,
        "attr3": 256,
        "attr4": 67108864,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 6,
    "enemies": [
      {
        "classId": 10,
        "commanderId": 14,
        "x": 0,
        "y": 0,
        "attr0": 851968,
        "attr1": 0,
        "attr2": 16843520,
        "attr3": 235536384,
        "attr4": 134545665,
        "attr5": 387186688,
        "extraFlags": 8
      },
      {
        "classId": 17,
        "commanderId": 21,
        "x": 3,
        "y": 3,
        "attr0": 637494629,
        "attr1": 1701078116,
        "attr2": 0,
        "attr3": 1174471185,
        "attr4": 50332933,
        "attr5": 768,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 7,
    "enemies": [
      {
        "classId": 17,
        "commanderId": 4,
        "x": 4,
        "y": 1,
        "attr0": 786432,
        "attr1": 17921,
        "attr2": 34669312,
        "attr3": 51970048,
        "attr4": 33555203,
        "attr5": 336658432,
        "extraFlags": 34
      },
      {
        "classId": 17,
        "commanderId": 20,
        "x": 3,
        "y": 3,
        "attr0": 805269873,
        "attr1": 1903296511,
        "attr2": 0,
        "attr3": 1174471185,
        "attr4": 50332189,
        "attr5": 512,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 8,
    "enemies": [
      {
        "classId": 19,
        "commanderId": 24,
        "x": 0,
        "y": 129,
        "attr0": 720896,
        "attr1": 7680,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 16777987,
        "attr5": 387252224,
        "extraFlags": 42
      },
      {
        "classId": 21,
        "commanderId": 27,
        "x": 5,
        "y": 5,
        "attr0": -1610646147,
        "attr1": 2105409535,
        "attr2": 0,
        "attr3": 671088897,
        "attr4": 67116307,
        "attr5": 1536,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 9,
    "enemies": [
      {
        "classId": 8,
        "commanderId": 19,
        "x": 0,
        "y": 0,
        "attr0": 851968,
        "attr1": 0,
        "attr2": 66304,
        "attr3": 319291392,
        "attr4": 117440769,
        "attr5": 370343936,
        "extraFlags": 28
      },
      {
        "classId": 20,
        "commanderId": 22,
        "x": 1,
        "y": 1,
        "attr0": 956261476,
        "attr1": 1684300900,
        "attr2": 196608,
        "attr3": 671088641,
        "attr4": 50335749,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 10,
    "enemies": [
      {
        "classId": 14,
        "commanderId": 12,
        "x": 0,
        "y": 0,
        "attr0": 851968,
        "attr1": 0,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 50331648,
        "attr5": 370343936,
        "extraFlags": 35
      },
      {
        "classId": 21,
        "commanderId": 25,
        "x": 2,
        "y": 2,
        "attr0": 1191145070,
        "attr1": 1852768255,
        "attr2": 0,
        "attr3": 335544640,
        "attr4": 67108864,
        "attr5": 1556,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 11,
    "enemies": [
      {
        "classId": 6,
        "commanderId": 18,
        "x": 0,
        "y": 3,
        "attr0": 720896,
        "attr1": 12801,
        "attr2": 4457216,
        "attr3": 2306,
        "attr4": 117445395,
        "attr5": 504430594,
        "extraFlags": 10
      },
      {
        "classId": 32,
        "commanderId": 43,
        "x": 47,
        "y": 47,
        "attr0": 436167780,
        "attr1": 1684340735,
        "attr2": 268316,
        "attr3": 257,
        "attr4": 67109381,
        "attr5": 1792,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 12,
    "enemies": [
      {
        "classId": 8,
        "commanderId": 15,
        "x": 16,
        "y": 37,
        "attr0": 720896,
        "attr1": 23040,
        "attr2": 16843776,
        "attr3": 252182528,
        "attr4": 16784926,
        "attr5": 538640384,
        "extraFlags": 69
      },
      {
        "classId": 30,
        "commanderId": 31,
        "x": 16,
        "y": 16,
        "attr0": -1157657974,
        "attr1": -1970601985,
        "attr2": 0,
        "attr3": 838861057,
        "attr4": 67112202,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 13,
    "enemies": [
      {
        "classId": 3,
        "commanderId": 6,
        "x": 0,
        "y": 1,
        "attr0": 851968,
        "attr1": 12800,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 16778244,
        "attr5": 488046594,
        "extraFlags": 50
      },
      {
        "classId": 26,
        "commanderId": 31,
        "x": 5,
        "y": 5,
        "attr0": -1711310471,
        "attr1": 2038002290,
        "attr2": 0,
        "attr3": 671088896,
        "attr4": 67108864,
        "attr5": 1024,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 14,
    "enemies": [
      {
        "classId": 2,
        "commanderId": 6,
        "x": 0,
        "y": 129,
        "attr0": 720896,
        "attr1": 15360,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 67110149,
        "attr5": 521732096,
        "extraFlags": 42
      },
      {
        "classId": 26,
        "commanderId": 32,
        "x": 6,
        "y": 6,
        "attr0": -1577091715,
        "attr1": 2105409535,
        "attr2": 0,
        "attr3": 1006633216,
        "attr4": 67108864,
        "attr5": 1536,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 15,
    "enemies": []
  },
  {
    "stage": 16,
    "enemies": [
      {
        "classId": 10,
        "commanderId": 13,
        "x": 8,
        "y": 5,
        "attr0": 655363,
        "attr1": 335554560,
        "attr2": 16843776,
        "attr3": 218759168,
        "attr4": 67115032,
        "attr5": 774045700,
        "extraFlags": 13
      },
      {
        "classId": 28,
        "commanderId": 35,
        "x": 10,
        "y": 10,
        "attr0": 1358920571,
        "attr1": 2071689079,
        "attr2": 0,
        "attr3": 1006633217,
        "attr4": 67113996,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 17,
    "enemies": [
      {
        "classId": 4,
        "commanderId": 15,
        "x": 0,
        "y": 0,
        "attr0": 720896,
        "attr1": 0,
        "attr2": 16843776,
        "attr3": 251920384,
        "attr4": 16788781,
        "attr5": 874840064,
        "extraFlags": 14
      },
      {
        "classId": 29,
        "commanderId": 38,
        "x": 52,
        "y": 52,
        "attr0": 1258256247,
        "attr1": 2004319099,
        "attr2": 0,
        "attr3": 1174405377,
        "attr4": 67113221,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 18,
    "enemies": [
      {
        "classId": 20,
        "commanderId": 15,
        "x": 4,
        "y": 1,
        "attr0": 720896,
        "attr1": 17921,
        "attr2": 34603776,
        "attr3": 0,
        "attr4": 33555203,
        "attr5": 336658432,
        "extraFlags": 32
      },
      {
        "classId": 17,
        "commanderId": 20,
        "x": 3,
        "y": 3,
        "attr0": 838824305,
        "attr1": 1903296511,
        "attr2": 0,
        "attr3": 1174471184,
        "attr4": 50331648,
        "attr5": 512,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 19,
    "enemies": [
      {
        "classId": 17,
        "commanderId": 26,
        "x": 136,
        "y": 129,
        "attr0": 655360,
        "attr1": 23041,
        "attr2": 16843776,
        "attr3": 437321728,
        "attr4": 83893276,
        "attr5": 572391424,
        "extraFlags": 42
      },
      {
        "classId": 32,
        "commanderId": 35,
        "x": 12,
        "y": 12,
        "attr0": -2046856333,
        "attr1": 1936946035,
        "attr2": 0,
        "attr3": 1174405377,
        "attr4": 67116568,
        "attr5": 1024,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 20,
    "enemies": [
      {
        "classId": 8,
        "commanderId": 18,
        "x": 0,
        "y": 65,
        "attr0": 655360,
        "attr1": 20481,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 167777300,
        "attr5": 605421632,
        "extraFlags": 62
      },
      {
        "classId": 34,
        "commanderId": 40,
        "x": 0,
        "y": 0,
        "attr0": -1275099771,
        "attr1": -2054847099,
        "attr2": 0,
        "attr3": 256,
        "attr4": 67108864,
        "attr5": 768,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 21,
    "enemies": [
      {
        "classId": 2,
        "commanderId": 23,
        "x": 8,
        "y": 33,
        "attr0": 720896,
        "attr1": 23041,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 16784926,
        "attr5": 555483140,
        "extraFlags": 99
      },
      {
        "classId": 32,
        "commanderId": 33,
        "x": 20,
        "y": 20,
        "attr0": -1073772665,
        "attr1": -2021161081,
        "attr2": 0,
        "attr3": 1258291457,
        "attr4": 67116042,
        "attr5": 1024,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 22,
    "enemies": [
      {
        "classId": 4,
        "commanderId": 14,
        "x": 0,
        "y": 0,
        "attr0": 786432,
        "attr1": 1,
        "attr2": 34669312,
        "attr3": 235143168,
        "attr4": 33555203,
        "attr5": 336658432,
        "extraFlags": 2
      },
      {
        "classId": 36,
        "commanderId": 39,
        "x": 46,
        "y": 46,
        "attr0": 150994943,
        "attr1": -1,
        "attr2": 0,
        "attr3": 1510015505,
        "attr4": 134222084,
        "attr5": 1536,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 23,
    "enemies": [
      {
        "classId": 13,
        "commanderId": 23,
        "x": 8,
        "y": 9,
        "attr0": 720896,
        "attr1": 17920,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 167776272,
        "attr5": 757006338,
        "extraFlags": 42
      },
      {
        "classId": 30,
        "commanderId": 45,
        "x": 21,
        "y": 21,
        "attr0": -1610643320,
        "attr1": -1996488705,
        "attr2": 0,
        "attr3": 1174405377,
        "attr4": 67113233,
        "attr5": 2048,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 24,
    "enemies": [
      {
        "classId": 19,
        "commanderId": 16,
        "x": 0,
        "y": 0,
        "attr0": 720910,
        "attr1": 0,
        "attr2": 16779264,
        "attr3": 0,
        "attr4": 167785267,
        "attr5": 975765504,
        "extraFlags": 14
      },
      {
        "classId": 30,
        "commanderId": 46,
        "x": 64,
        "y": 64,
        "attr0": 1258291199,
        "attr1": -1,
        "attr2": 0,
        "attr3": 1342177536,
        "attr4": 67108864,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 25,
    "enemies": [
      {
        "classId": 18,
        "commanderId": 16,
        "x": 0,
        "y": 0,
        "attr0": 786432,
        "attr1": 1,
        "attr2": 33555200,
        "attr3": 0,
        "attr4": 33555203,
        "attr5": 336658432,
        "extraFlags": 10
      }
    ]
  },
  {
    "stage": 26,
    "enemies": [
      {
        "classId": 20,
        "commanderId": 24,
        "x": 64,
        "y": 33,
        "attr0": 655360,
        "attr1": 1926144,
        "attr2": 16843776,
        "attr3": 403963904,
        "attr4": 83894304,
        "attr5": 639303684,
        "extraFlags": 42
      }
    ]
  },
  {
    "stage": 27,
    "enemies": [
      {
        "classId": 12,
        "commanderId": 15,
        "x": 2,
        "y": 5,
        "attr0": 655360,
        "attr1": 23040,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 167792720,
        "attr5": 841089028,
        "extraFlags": 101
      },
      {
        "classId": 34,
        "commanderId": 50,
        "x": 80,
        "y": 80,
        "attr0": -1006663287,
        "attr1": -1987475320,
        "attr2": 0,
        "attr3": 1509949696,
        "attr4": 67108864,
        "attr5": 2560,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 28,
    "enemies": [
      {
        "classId": 16,
        "commanderId": 14,
        "x": 0,
        "y": 0,
        "attr0": 589824,
        "attr1": 0,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 16777216,
        "attr5": 639238144,
        "extraFlags": 104
      },
      {
        "classId": 26,
        "commanderId": 38,
        "x": 0,
        "y": 0,
        "attr0": -771787403,
        "attr1": 1970632053,
        "attr2": 0,
        "attr3": 256,
        "attr4": 67108864,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 29,
    "enemies": [
      {
        "classId": 3,
        "commanderId": 16,
        "x": 0,
        "y": 65,
        "attr0": 589824,
        "attr1": 17920,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 67111948,
        "attr5": 589299714,
        "extraFlags": 42
      },
      {
        "classId": 32,
        "commanderId": 35,
        "x": 12,
        "y": 12,
        "attr0": -1509984136,
        "attr1": 2021161080,
        "attr2": 0,
        "attr3": 1174405376,
        "attr4": 67108864,
        "attr5": 1024,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 30,
    "enemies": [
      {
        "classId": 11,
        "commanderId": 3,
        "x": 0,
        "y": 33,
        "attr0": 720896,
        "attr1": 20480,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 16783384,
        "attr5": 656539648,
        "extraFlags": 84
      },
      {
        "classId": 34,
        "commanderId": 39,
        "x": 24,
        "y": 24,
        "attr0": -989887356,
        "attr1": -2071689337,
        "attr2": 0,
        "attr3": 1342177536,
        "attr4": 67108864,
        "attr5": 256,
        "extraFlags": 0
      }
    ]
  },
  {
    "stage": 31,
    "enemies": [
      {
        "classId": 55,
        "commanderId": 15,
        "x": 8,
        "y": 65,
        "attr0": 655366,
        "attr1": 320617472,
        "attr2": 16778240,
        "attr3": 0,
        "attr4": 167781155,
        "attr5": 1261830148,
        "extraFlags": 15
      },
      {
        "classId": 54,
        "commanderId": 72,
        "x": 39,
        "y": 39,
        "attr0": 1426027379,
        "attr1": 1936947834,
        "attr2": 266780,
        "attr3": 1510015232,
        "attr4": 67108864,
        "attr5": 2560,
        "extraFlags": 0
      }
    ]
  }
];
