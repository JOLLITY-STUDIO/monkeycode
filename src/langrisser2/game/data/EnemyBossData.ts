/**
 * EnemyBossData.ts — Langrisser II 关卡BOSS配置数据
 *
 * 由脚本生成: scripts/extract-enemy-data-full.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * ROM数据源: 0x060600, 每关8字节(4对class_id + level), 0xFF表示空位
 */

export interface BossEntry {
  classId: number;
  level: number;
}

export interface StageBossConfig {
  stage: number;
  bosses: BossEntry[];
}

export const ENEMY_BOSS_DATA: StageBossConfig[] = [
  {
    "stage": 1,
    "bosses": []
  },
  {
    "stage": 2,
    "bosses": [
      {
        "classId": 5,
        "level": 2
      },
      {
        "classId": 8,
        "level": 20
      }
    ]
  },
  {
    "stage": 3,
    "bosses": [
      {
        "classId": 3,
        "level": 2
      },
      {
        "classId": 5,
        "level": 3
      }
    ]
  },
  {
    "stage": 4,
    "bosses": [
      {
        "classId": 6,
        "level": 3
      }
    ]
  },
  {
    "stage": 5,
    "bosses": [
      {
        "classId": 2,
        "level": 2
      }
    ]
  },
  {
    "stage": 6,
    "bosses": [
      {
        "classId": 3,
        "level": 2
      },
      {
        "classId": 4,
        "level": 3
      },
      {
        "classId": 5,
        "level": 2
      }
    ]
  },
  {
    "stage": 7,
    "bosses": [
      {
        "classId": 0,
        "level": 2
      },
      {
        "classId": 8,
        "level": 10
      },
      {
        "classId": 9,
        "level": 3
      }
    ]
  },
  {
    "stage": 8,
    "bosses": [
      {
        "classId": 8,
        "level": 10
      },
      {
        "classId": 9,
        "level": 1
      }
    ]
  },
  {
    "stage": 9,
    "bosses": [
      {
        "classId": 7,
        "level": 2
      },
      {
        "classId": 9,
        "level": 2
      }
    ]
  },
  {
    "stage": 10,
    "bosses": [
      {
        "classId": 1,
        "level": 1
      },
      {
        "classId": 8,
        "level": 10
      },
      {
        "classId": 9,
        "level": 5
      }
    ]
  },
  {
    "stage": 11,
    "bosses": [
      {
        "classId": 4,
        "level": 2
      },
      {
        "classId": 5,
        "level": 2
      },
      {
        "classId": 9,
        "level": 6
      }
    ]
  },
  {
    "stage": 12,
    "bosses": [
      {
        "classId": 10,
        "level": 15
      }
    ]
  },
  {
    "stage": 13,
    "bosses": [
      {
        "classId": 6,
        "level": 2
      },
      {
        "classId": 7,
        "level": 1
      },
      {
        "classId": 8,
        "level": 30
      }
    ]
  },
  {
    "stage": 14,
    "bosses": [
      {
        "classId": 34,
        "level": 34
      },
      {
        "classId": 34,
        "level": 34
      },
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 85,
        "level": 85
      }
    ]
  },
  {
    "stage": 15,
    "bosses": [
      {
        "classId": 37,
        "level": 34
      },
      {
        "classId": 34,
        "level": 85
      },
      {
        "classId": 37,
        "level": 35
      },
      {
        "classId": 30,
        "level": 37
      }
    ]
  },
  {
    "stage": 16,
    "bosses": [
      {
        "classId": 37,
        "level": 33
      },
      {
        "classId": 49,
        "level": 226
      },
      {
        "classId": 37,
        "level": 46
      },
      {
        "classId": 19,
        "level": 30
      }
    ]
  },
  {
    "stage": 17,
    "bosses": [
      {
        "classId": 37,
        "level": 82
      },
      {
        "classId": 225,
        "level": 49
      },
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 46,
        "level": 19
      }
    ]
  },
  {
    "stage": 18,
    "bosses": [
      {
        "classId": 34,
        "level": 34
      },
      {
        "classId": 34,
        "level": 34
      },
      {
        "classId": 85,
        "level": 85
      },
      {
        "classId": 85,
        "level": 82
      }
    ]
  },
  {
    "stage": 19,
    "bosses": [
      {
        "classId": 85,
        "level": 85
      },
      {
        "classId": 85,
        "level": 82
      },
      {
        "classId": 85,
        "level": 85
      },
      {
        "classId": 85,
        "level": 82
      }
    ]
  },
  {
    "stage": 20,
    "bosses": [
      {
        "classId": 85,
        "level": 85
      },
      {
        "classId": 85,
        "level": 82
      },
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 85,
        "level": 82
      }
    ]
  },
  {
    "stage": 21,
    "bosses": [
      {
        "classId": 226,
        "level": 34
      },
      {
        "classId": 37,
        "level": 82
      },
      {
        "classId": 30,
        "level": 103
      },
      {
        "classId": 37,
        "level": 82
      }
    ]
  },
  {
    "stage": 22,
    "bosses": [
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 82,
        "level": 225
      },
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 85,
        "level": 46
      }
    ]
  },
  {
    "stage": 23,
    "bosses": [
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 85,
        "level": 38
      },
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 85,
        "level": 39
      }
    ]
  },
  {
    "stage": 24,
    "bosses": [
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 85,
        "level": 34
      },
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 85,
        "level": 85
      }
    ]
  },
  {
    "stage": 25,
    "bosses": [
      {
        "classId": 37,
        "level": 85
      },
      {
        "classId": 85,
        "level": 85
      },
      {
        "classId": 34,
        "level": 34
      },
      {
        "classId": 34,
        "level": 34
      }
    ]
  },
  {
    "stage": 26,
    "bosses": [
      {
        "classId": 230,
        "level": 114
      },
      {
        "classId": 37,
        "level": 82
      },
      {
        "classId": 99,
        "level": 34
      },
      {
        "classId": 85,
        "level": 82
      }
    ]
  },
  {
    "stage": 27,
    "bosses": [
      {
        "classId": 114,
        "level": 103
      },
      {
        "classId": 37,
        "level": 82
      },
      {
        "classId": 34,
        "level": 118
      },
      {
        "classId": 114,
        "level": 82
      }
    ]
  },
  {
    "stage": 28,
    "bosses": [
      {
        "classId": 37,
        "level": 39
      },
      {
        "classId": 50,
        "level": 82
      },
      {
        "classId": 85,
        "level": 82
      },
      {
        "classId": 34,
        "level": 82
      }
    ]
  },
  {
    "stage": 29,
    "bosses": [
      {
        "classId": 85,
        "level": 85
      },
      {
        "classId": 85,
        "level": 82
      },
      {
        "classId": 34,
        "level": 34
      },
      {
        "classId": 34,
        "level": 34
      }
    ]
  },
  {
    "stage": 30,
    "bosses": [
      {
        "classId": 34,
        "level": 34
      },
      {
        "classId": 34,
        "level": 34
      },
      {
        "classId": 39,
        "level": 50
      },
      {
        "classId": 82,
        "level": 243
      }
    ]
  },
  {
    "stage": 31,
    "bosses": [
      {
        "classId": 44,
        "level": 115
      },
      {
        "classId": 34,
        "level": 239
      },
      {
        "classId": 34,
        "level": 199
      },
      {
        "classId": 34,
        "level": 228
      }
    ]
  }
];
