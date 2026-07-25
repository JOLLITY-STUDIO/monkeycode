/**
 * Phase 1.6 — Player 升级经验表单元测试
 *
 * 测试目标:
 * 1. EXPERIENCE_TABLE 数据正确性
 * 2. calcLevel 等级计算
 * 3. expToNextLevel 升级需求查询
 * 4. Player 经验值/升级行为
 * 5. Player.fromRoster 从原始字节创建
 */

import { describe, it, expect, beforeEach } from './_expect.js';
import {
  Player,
  PlayerPosition,
  EXPERIENCE_TABLE,
  MAX_LEVEL,
  calcLevel,
  expToNextLevel,
  createDefaultStats,
  sumStats,
  STAT_KEYS,
  STAT_LABELS,
  PLAYER_BYTES,
} from '../tsnes/tsubasa-code/domain/player/index.js';
import { SpecialMoveType } from '../tsnes/tsubasa-code/domain/player/SpecialMove.js';

// ==============================================================
// EXPERIENCE_TABLE 验证
// ==============================================================

describe('球员升级系统', () => {

  describe('经验表数据 (EXPERIENCE_TABLE)', () => {

    it('经验表有 31 个条目 (Lv1→32)', () => {
      expect(EXPERIENCE_TABLE.length).toBe(31);
    });

    it('每个条目都是正数', () => {
      EXPERIENCE_TABLE.forEach((exp) => {
        expect(exp).toBeGreaterThan(0);
      });
    });

    it('经验值递增（越高级需要越多）', () => {
      for (let i = 1; i < EXPERIENCE_TABLE.length; i++) {
        expect(EXPERIENCE_TABLE[i]).toBeGreaterThan(EXPERIENCE_TABLE[i - 1]);
      }
    });

    it('Lv1→2 需 20 经验', () => {
      expect(EXPERIENCE_TABLE[0]).toBe(20);
    });

    it('Lv31→32 需 3040 经验', () => {
      expect(EXPERIENCE_TABLE[30]).toBe(3040);
    });

    it('最大等级为 32', () => {
      expect(MAX_LEVEL).toBe(32);
    });
  });

  describe('calcLevel 等级计算', () => {

    it('0 经验 → Lv1', () => {
      expect(calcLevel(0)).toBe(1);
    });

    it('20 经验 → Lv2', () => {
      expect(calcLevel(20)).toBe(2);
    });

    it('60 经验 → Lv3 (20+40)', () => {
      expect(calcLevel(60)).toBe(3);
    });

    it('120 经验 → Lv4 (20+40+60)', () => {
      expect(calcLevel(120)).toBe(4);
    });

    it('200 经验 → Lv5 (20+40+60+80)', () => {
      expect(calcLevel(200)).toBe(5);
    });

    it('19 经验 → 仍为 Lv1（不足升级）', () => {
      expect(calcLevel(19)).toBe(1);
    });

    it('39 经验 → 仍为 Lv2 (刚过 Lv2 但不够 Lv3)', () => {
      expect(calcLevel(39)).toBe(2);
    });

    it('满级 Lv32 (超量经验也返回 32)', () => {
      // 累计总经验 = sum(EXPERIENCE_TABLE) ≈ 39760
      const total = EXPERIENCE_TABLE.reduce((a, b) => a + b, 0);
      expect(calcLevel(total)).toBe(32);
      expect(calcLevel(99999)).toBe(32);
    });
  });

  describe('expToNextLevel 升级所需经验', () => {

    it('Lv1 → 2 需要 20 经验', () => {
      expect(expToNextLevel(1)).toBe(20);
    });

    it('Lv5 → 6 需要 100 经验', () => {
      expect(expToNextLevel(5)).toBe(100);
    });

    it('Lv31 → 32 需要 3040 经验', () => {
      expect(expToNextLevel(31)).toBe(3040);
    });

    it('满级 Lv32 返回 0', () => {
      expect(expToNextLevel(32)).toBe(0);
    });

    it('无效等级返回 0', () => {
      expect(expToNextLevel(0)).toBe(0);
      expect(expToNextLevel(-1)).toBe(0);
      expect(expToNextLevel(33)).toBe(0);
    });
  });
});

// ==============================================================
// Player 类行为验证
// ==============================================================

/** 创建一个标准测试球员 */
function makeTestPlayer(): Player {
  return new Player({
    id: 1,
    nameIdx: 0,
    team: 0,
    number: 10,
    position: PlayerPosition.MF,
    stamina: 800,
    maxStamina: 800,
    level: 1,
    exp: 0,
    stats: { goalkeeping: 5, kick: 70, cut: 65, tackle: 60, pass: 75, speed: 68 },
    moves: [{ id: 1, name: '抽球射门', type: SpecialMoveType.SHOT, cost: 400, power: 200 }],
  });
}

describe('Player 球员实体', () => {

  it('基础属性 — ID 正确', () => {
    const p = makeTestPlayer();
    expect(p.id).toBe(1);
  });

  it('基础属性 — 位置正确', () => {
    const p = makeTestPlayer();
    expect(p.position).toBe(PlayerPosition.MF);
  });

  it('基础属性 — 体力 800', () => {
    const p = makeTestPlayer();
    expect(p.stamina).toBe(800);
  });

  it('基础属性 — 等级从 1 开始', () => {
    const p = makeTestPlayer();
    expect(p.level).toBe(1);
  });

  // ---- 体力 ----

  it('体力 — 消耗 200 → 剩余 600', () => {
    const p = makeTestPlayer();
    expect(p.consumeStamina(200)).toBe(true);
    expect(p.stamina).toBe(600);
  });

  it('体力 — 消耗超过当前体力时返回 false', () => {
    const p = makeTestPlayer();
    expect(p.consumeStamina(900)).toBe(false);
    expect(p.stamina).toBe(800);
  });

  it('体力 — 恢复不超过最大值', () => {
    const p = makeTestPlayer();
    p.consumeStamina(300);
    p.recoverStamina(500);
    expect(p.stamina).toBe(800);
  });

  it('体力 — 比率 = 1.0', () => {
    const p = makeTestPlayer();
    expect(p.staminaRatio).toBe(1);
  });

  it('体力 — 消耗后比率下降', () => {
    const p = makeTestPlayer();
    p.consumeStamina(400);
    expect(p.staminaRatio).toBe(0.5);
  });

  // ---- 升级 ----

  it('升级 — 初始 Lv1, 0 经验', () => {
    const p = makeTestPlayer();
    expect(p.level).toBe(1);
    expect(p.exp).toBe(0);
  });

  it('升级 — 添加 20 经验 → Lv2', () => {
    const p = makeTestPlayer();
    expect(p.addExp(20)).toBe(true);
    expect(p.level).toBe(2);
    expect(p.exp).toBe(0);
  });

  it('升级 — 添加 19 经验 → 不升级', () => {
    const p = makeTestPlayer();
    expect(p.addExp(19)).toBe(false);
    expect(p.level).toBe(1);
    expect(p.exp).toBe(19);
  });

  it('升级 — 两次补满 → Lv2', () => {
    const p = makeTestPlayer();
    p.addExp(19);
    expect(p.addExp(1)).toBe(true);
    expect(p.level).toBe(2);
    expect(p.exp).toBe(0);
  });

  it('升级 — 添加 100 经验 → Lv3 (20+40+60=120, 100<120)', () => {
    const p = makeTestPlayer();
    p.addExp(100);
    expect(p.level).toBe(3);
    expect(p.exp).toBe(40);
  });

  it('升级 — 添加 120 经验 → Lv4', () => {
    const p = makeTestPlayer();
    p.addExp(120);
    expect(p.level).toBe(4);
    expect(p.exp).toBe(0);
  });

  it('升级 — 六维微增 +1', () => {
    const p = makeTestPlayer();
    p.addExp(20); // Lv1→2
    expect(p.stats.kick).toBe(71);
    expect(p.stats.cut).toBe(66);
    expect(p.stats.tackle).toBe(61);
    expect(p.stats.pass).toBe(76);
    expect(p.stats.speed).toBe(69);
  });

  it('升级 — 六维封顶 99', () => {
    const p = makeTestPlayer();
    p.stats.kick = 99;
    p.addExp(20);
    expect(p.stats.kick).toBe(99);
  });

  it('升级 — 满级 Lv32 不再升级', () => {
    const p = makeTestPlayer();
    p.level = MAX_LEVEL;
    expect(p.addExp(9999)).toBe(false);
    expect(p.level).toBe(MAX_LEVEL);
  });

  // ---- serialization ----

  it('序列化 — fromRoster 从原始 12 字节创建', () => {
    const bytes = [0x0A, 0x00, 0x0A, 0x02, 0x20, 0x03, 0x0F, 0x46, 0x41, 0x3C, 0x4B, 0x44];
    // nameIdx=10, team=0, number=10, pos=MF(2), stamina=800 (0x0320)
    const p = Player.fromRoster(0, bytes);
    expect(p.nameIdx).toBe(10);
    expect(p.team).toBe(0);
    expect(p.number).toBe(10);
    expect(p.position).toBe(PlayerPosition.MF);
    expect(p.stamina).toBe(0x0320);
    expect(p.stats.goalkeeping).toBe(15);
    expect(p.stats.kick).toBe(70);
    expect(p.stats.cut).toBe(65);
    expect(p.stats.tackle).toBe(60);
    expect(p.stats.pass).toBe(75);
    expect(p.stats.speed).toBe(68);
  });

  // ---- clone ----

  it('克隆 — clone 后是两个独立对象', () => {
    const p = makeTestPlayer();
    const cloned = p.clone();
    expect(cloned.id).toBe(p.id);
    expect(cloned.stamina).toBe(p.stamina);

    cloned.consumeStamina(100);
    expect(p.stamina).toBe(800);
    expect(cloned.stamina).toBe(700);
  });
});
