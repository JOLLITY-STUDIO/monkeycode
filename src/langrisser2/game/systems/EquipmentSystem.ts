/**
 * EquipmentSystem.ts — 装备管理系统
 *
 * 管理队员的武器/防具/饰品装备与卸下
 * 装备属性加成: AT/DF 修正 (A+/D+)
 *
 * 对应 ROM: 装备画面 (兵士配置 → 装备)
 */

import { ParsedItem, getItemCombatBonus, ItemType } from './ItemSystem.js';

// ============================================================================
// 装备槽位
// ============================================================================

export const enum EquipSlot {
  NONE      = 0,
  WEAPON    = 1,
  ARMOR     = 2,
  ACCESSORY = 3,
}

/** 可装备栏数 */
export const EQUIP_SLOTS = 3;

// ============================================================================
// 队员装备状态
// ============================================================================

export interface UnitEquipment {
  /** 武器道具 ID (0 = 空) */
  weapon: number;
  /** 防具道具 ID */
  armor: number;
  /** 饰品道具 ID */
  accessory: number;
}

export interface EquipmentBonus {
  atBonus: number;
  dfBonus: number;
  atCorrection: number;  // A+
  dfCorrection: number;  // D+
}

/**
 * 创建空装备
 */
export function createEmptyEquip(): UnitEquipment {
  return { weapon: 0, armor: 0, accessory: 0 };
}

// ============================================================================
// 装备/卸下逻辑
// ============================================================================

/**
 * 获取道具可装备的槽位
 */
export function getEquipSlot(item: ParsedItem): EquipSlot {
  switch (item.type) {
    case ItemType.WEAPON:
    case ItemType.MAGE_ROD:
      return EquipSlot.WEAPON;
    case ItemType.ARMOR:
      return EquipSlot.ARMOR;
    case ItemType.ACC_1:
    case ItemType.ACC_2:
    case ItemType.ACC_3:
      return EquipSlot.ACCESSORY;
    default:
      return EquipSlot.NONE; // 特殊/召唤道具不可装备
  }
}

/**
 * 装备道具
 * 如果该槽位已有装备, 自动卸下并返回
 *
 * @returns 卸下的道具 ID (0 = 无)
 */
export function equipItem(
  equip: UnitEquipment,
  item: ParsedItem,
): number {
  const slot = getEquipSlot(item);
  let unequipped = 0;

  switch (slot) {
    case EquipSlot.WEAPON:
      unequipped = equip.weapon;
      equip.weapon = item.id;
      break;
    case EquipSlot.ARMOR:
      unequipped = equip.armor;
      equip.armor = item.id;
      break;
    case EquipSlot.ACCESSORY:
      unequipped = equip.accessory;
      equip.accessory = item.id;
      break;
    default:
      return 0; // 不可装备
  }

  return unequipped;
}

/**
 * 卸下指定槽位的装备
 *
 * @returns 卸下的道具 ID
 */
export function unequipSlot(equip: UnitEquipment, slot: EquipSlot): number {
  let removed = 0;
  switch (slot) {
    case EquipSlot.WEAPON:
      removed = equip.weapon;
      equip.weapon = 0;
      break;
    case EquipSlot.ARMOR:
      removed = equip.armor;
      equip.armor = 0;
      break;
    case EquipSlot.ACCESSORY:
      removed = equip.accessory;
      equip.accessory = 0;
      break;
  }
  return removed;
}

/**
 * 计算装备带来的属性加成
 */
export function calcEquipBonus(
  equip: UnitEquipment,
  items: Map<number, ParsedItem>,
): EquipmentBonus {
  const bonus: EquipmentBonus = {
    atBonus: 0,
    dfBonus: 0,
    atCorrection: 0,
    dfCorrection: 0,
  };

  for (const itemId of [equip.weapon, equip.armor, equip.accessory]) {
    if (itemId === 0) continue;
    const item = items.get(itemId);
    if (!item) continue;

    const itemBonus = getItemCombatBonus(item);
    bonus.atBonus += itemBonus.atBonus;
    bonus.dfBonus += itemBonus.dfBonus;
    bonus.atCorrection += itemBonus.atCorrection;
    bonus.dfCorrection += itemBonus.dfCorrection;
  }

  return bonus;
}

/**
 * 判断道具是否可装备 (非特殊/召唤类)
 */
export function isEquippable(item: ParsedItem): boolean {
  return getEquipSlot(item) !== EquipSlot.NONE;
}

/**
 * 获取装备槽位的中文名
 */
export function getSlotName(slot: EquipSlot): string {
  switch (slot) {
    case EquipSlot.WEAPON:    return '武器';
    case EquipSlot.ARMOR:     return '防具';
    case EquipSlot.ACCESSORY: return '饰品';
    default:                  return '--';
  }
}
