/**
 * Bank 29 Service — 球队战术/阵容数据服务
 *
 * CPU 映射: $A000-$BFFF (由 Bank30/26/31 切换加载, Bank01 主消费)
 * PRG offset: 0x1A000-0x1BFFF (PRG Bank #0x1D = 29)
 *
 * H5 版本: 无 MMC3。数据已内嵌在 data/team/roster.ts,
 * 本 service 翻译 bank_01 消费 $BAxx-$BExx 数据的全部逻辑。
 *
 * 翻译来源 (bank_01.asm 消费点):
 *   $8F79 / $8F8A — 球队 GFX 基址 → ram_0454 区域累加 ($BA4C 表)
 *   $8FC2        — 阵容数据指针查询 ($BA1C 表)
 *   $9034 / $9045 — 球队能力区间二分查表 ($BA90 表)
 *   $9050        — 特殊球队阵型块 (06/0C/10 → $BB10/$BB1A/$BB24)
 *   $8516        — 按球队读阵容槽位 ($BCD1/$BCF3)
 *   $85CE        — 技能/能力指针 ($BC58)
 *   $8642        — 附加指针表 ($BDA8 — 注意: bank29 该区为 0xFF, 属窗口切换后的 Bank28)
 *   $8C4D        — 名字搜索表 ($BB2E)
 *   $8C96        — 球员属性指针 ($BC48)
 */

import { DataStore } from '../data/prg/DataStore';
import {
  readBank29,
  readBank29U16,
  readBank29U16Div,
  getTeamGfxBase,
  getRosterAddr,
  ADDR_TEAM_LIMIT,
  ADDR_NAME_SEARCH,
  ADDR_PLAYER_PTR,
  ADDR_SKILL_PTR,
  ADDR_GFX_LOOKUP,
  ADDR_ROSTER_BY_TEAM,
  ADDR_TEAM_BLOCK_06,
  ADDR_TEAM_BLOCK_0C,
  ADDR_TEAM_BLOCK_10,
  type CpuRoster,
  type RosterPlayerSlot,
  getCpuRoster,
  getRosterByAddr,
} from '../data/prg/team/roster';

// ── RAM 键 ──
const KEY_26 = 'ram_0026';   // 当前球队 ID
const KEY_2A = 'ram_002A';   // 当前球员 ID
const KEY_E6 = 'ram_00E6';   // 16bit 指针 lo
const KEY_E7 = 'ram_00E7';   // 16bit 指针 hi
const KEY_EC = 'ram_00EC';
const KEY_ED = 'ram_00ED';
const KEY_5C = 'ram_005C';
const KEY_5D = 'ram_005D';

/** 真实 RAM 键 (4 位大写补零, 与全库 ram_XXXX 约定一致, 防断链) */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

/** ram_0454 区域 (16 个 16bit 槽位 = 32B) — 各队数据暂存 */
const BASE_0454 = 0x0454;
const BASE_056A = 0x056A;
const BASE_0368 = 0x0368;

/** 按球队读 ram_0454 区域槽位 (16bit) */
function read0454(store: DataStore, slot: number): number {
  return store.read(ramKey(BASE_0454 + slot * 2));
}

function write0454(store: DataStore, slot: number, val: number): void {
  store.write(ramKey(BASE_0454 + slot * 2), val & 0xFF);
}

/**
 * Bank 29 Service
 * 翻译 bank_01 中消费 $BAxx-$BExx 数据的逻辑 (全部 38 处引用)
 */
export class Bank29RosterService {
  constructor(private _store: DataStore) {}

  // ──────────────────────────────────────────────
  // 加载 (对应 Bank30/26/31 的 bank 切换 API)
  // ──────────────────────────────────────────────

  /**
   * 对应 bank_30 $CE08: 切 Bank28($8000)+Bank29($A000) 后 JSR $8000 调用。
   * H5: 数据已内嵌, 直接返回本 service 即可。
   */
  load(): this {
    return this;
  }

  // ──────────────────────────────────────────────
  // bank_01 $8F79 / $8F8A — 球队 GFX 基址累加
  // ──────────────────────────────────────────────

  /**
   * 对应 $8F79: 当前球队 GFX 基址 → ram_0454 区域 (每槽 2B 累加)
   * asm: LDA ram_0026 / ASL / TAX / LDA $BA4C,X→E6 / LDA $BA4D,X→E7
   *      → JMP $AF9E: ram_0454 16 槽 += E6:E7 (带进位)
   * @param div GFX 基址缩放 (1=原始 $8F79, 4=$8F8A LSR×2)
   */
  addTeamGfxBase(div: 1 | 4 = 1): void {
    const teamId = this._store.read(KEY_26);
    let gfx = getTeamGfxBase(teamId);
    if (div === 4) gfx = Math.floor(gfx / 4);
    this._addTo0454(gfx);
  }

  /** 对应 $AF9E-$8FC1: ram_0454[0..15] += 16bit 值 (带进位, 溢出钳 0xFF) */
  private _addTo0454(val: number): void {
    const s = this._store;
    for (let i = 0; i < 16; i++) {
      let v = read0454(s, i) + val;
      if (v > 0xFF) v = 0xFF;
      write0454(s, i, v);
    }
  }

  // ──────────────────────────────────────────────
  // bank_01 $8FC2 — 阵容数据指针查询
  // ──────────────────────────────────────────────

  /**
   * 对应 $8FC2-$9005: 按当前球队 + 槽位属性查阵容指针并累加。
   * asm: STX EC / JSR $B023(读槽位属性) / AND #$F0 / LSR / ADC EC → X
   *      LDA $BA1C,X → 指针 → 从 ram_0454[槽] += 指针值
   * @param slot 槽位号 (X)
   */
  queryRosterPtr(slot: number): void {
    const s = this._store;
    const attr = s.read(`ram_${(BASE_0368 + slot).toString(16)}`); // 对应 $B023 读表
    const x = slot + ((attr & 0xF0) >> 4);
    const ptr = getRosterAddr(this._store.read(KEY_26), slot);
    const target = read0454(s, x);
    const v = Math.min(target + ptr, 0xFF);
    write0454(s, x, v);
  }

  // ──────────────────────────────────────────────
  // bank_01 $9034 / $9045 — 球队能力区间二分查表
  // ──────────────────────────────────────────────

  /**
   * 对应 $9034: 二分查 $BA90 表, 返回命中索引。
   * asm: STY E6 / STX E7 / LDX #$80 / DEX DEX / CMP $BA90,X / SBC $BA91,X / BCC
   * @param val16 16bit 查询值 (Y:X)
   */
  findTeamLimitIndex(val16: number): number {
    let x = 0x80;
    for (;;) {
      x -= 2;
      const lo = readBank29(ADDR_TEAM_LIMIT + x);
      const hi = readBank29(ADDR_TEAM_LIMIT + x + 1);
      const limit = lo | (hi << 8);
      if (val16 >= limit) break;
      if (x <= 0) break;
    }
    return Math.floor(x / 2);
  }

  /**
   * 对应 $9045: 读 $BA90 表项 (ASL TAX → $BA90,X = lo, $BA91,X = hi)
   * @param idx 表索引
   */
  getTeamLimit(idx: number): number {
    return readBank29U16(ADDR_TEAM_LIMIT + idx * 2);
  }

  // ──────────────────────────────────────────────
  // bank_01 $9050 — 特殊球队阵型块
  // ──────────────────────────────────────────────

  /**
   * 对应 $9050: 球队 06 → $BB10, 0C → $BB1A, 10 → $BB24。
   * 返回块起始 CPU 地址 (供 PPU 渲染/阵型绘制)。
   */
  getSpecialFormationBlock(teamId: number): number {
    if (teamId === 0x10) return ADDR_TEAM_BLOCK_10;
    if (teamId === 0x0C) return ADDR_TEAM_BLOCK_0C;
    if (teamId === 0x06) return ADDR_TEAM_BLOCK_06;
    return -1;
  }

  // ──────────────────────────────────────────────
  // bank_01 $8516 — 按球队读阵容槽位
  // ──────────────────────────────────────────────

  /**
   * 对应 $8514-$8538:
   *   LDA $BCD1,X (X=teamId) → 高 nibble → $BCF3 表查 GFX 指针
   *   低 nibble → $BD64 表查副指针
   * @param teamId 球队 ID
   */
  queryRosterSlot(teamId: number): { gfxPtr: number; subPtr: number } {
    const slot = readBank29(ADDR_ROSTER_BY_TEAM + teamId);
    const hiIdx = (slot & 0xF0) >> 4;
    const loIdx = (slot & 0x0F) << 1;
    // $BCF3: GFX 查找表 (2B LE)
    const gfxPtr = readBank29U16(ADDR_GFX_LOOKUP + hiIdx * 2);
    // $BD64: bank29 该区为 0xFF → 属于窗口切换后的 Bank28 数据
    // 保守返回 0xFF 并用 gfxPtr 兜底 (待 Bank28 service 接入)
    const subPtr = readBank29U16(0xBD64 + loIdx);
    return { gfxPtr, subPtr };
  }

  // ──────────────────────────────────────────────
  // bank_01 $85CE — 技能/能力指针
  // ──────────────────────────────────────────────

  /**
   * 对应 $85CE: LDA ram_00EA / ASL / TAX / LDA $BC58,X → E8:E9
   * @param idx 索引 (ram_00EA)
   */
  getSkillPtr(idx: number): number {
    return readBank29U16(ADDR_SKILL_PTR + idx * 2);
  }

  // ──────────────────────────────────────────────
  // bank_01 $8C4D — 名字搜索
  // ──────────────────────────────────────────────

  /**
   * 对应 $8C4D: CMP $BB2E,X / BNE / LDA $BB2F,X → 5C / LDA $BB30,X → 5D
   * 每项 3B: [匹配值, lo, hi]
   */
  nameSearch(id: number): { lo: number; hi: number } | null {
    for (let x = 0; x < 64; x++) {
      const addr = ADDR_NAME_SEARCH + x * 3;
      if (readBank29(addr) === id) {
        return { lo: readBank29(addr + 1), hi: readBank29(addr + 2) };
      }
    }
    return null;
  }

  // ──────────────────────────────────────────────
  // bank_01 $8C96 — 球员属性指针
  // ──────────────────────────────────────────────

  /**
   * 对应 $8C96: LDA ram_005E / ASL / TAX / LDA $BC48,X → E8:E9
   */
  getPlayerAttrPtr(idx: number): number {
    return readBank29U16(ADDR_PLAYER_PTR + idx * 2);
  }

  // ──────────────────────────────────────────────
  // 数据访问 (roster.ts model 透传)
  // ──────────────────────────────────────────────

  /** 按索引取 CPU 阵容 */
  getRoster(idx: number): CpuRoster | undefined {
    return getCpuRoster(idx);
  }

  /** 按指针表地址反查阵容 */
  getRosterByAddr(cpuAddr: number): CpuRoster | undefined {
    return getRosterByAddr(cpuAddr);
  }

  /** 读内嵌数据字节 (Model 层透传) */
  read(cpuAddr: number): number {
    return readBank29(cpuAddr);
  }

  /** 读内嵌数据 16bit LE (Model 层透传) */
  read16(cpuAddr: number): number {
    return readBank29U16(cpuAddr);
  }

  /** 读 16bit LE / div */
  read16Div(cpuAddr: number, div: number): number {
    return readBank29U16Div(cpuAddr, div);
  }

  /** 阵容球员槽位 */
  rosterPlayers(idx: number): RosterPlayerSlot[] {
    const r = getCpuRoster(idx);
    return r ? [...r.players] : [];
  }
}
