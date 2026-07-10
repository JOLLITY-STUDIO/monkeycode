/**
 * Langrisser II 魔法 / 道具 / 指令表解析器
 * 基于 FUN_00020cb0 (战斗指令菜单) + ROM 数据表 0x97668
 */

/** 指令菜单槽位表 ROM 地址 */
const CMD_TABLE_ADDR = 0x97660;

/**
 * 解析战斗指令菜单数据 (FUN_00020cb0 等效)
 * ROM 0x97660 起: 6组指令槽数据, 每组 2 个 16 位值
 *
 * 返回结构:
 *   slots: [{ id, name, condition, params }]
 */
export function parseCommandMenu(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const slots = [];

  // 6 个槽位, 每个槽位 2 个 16 位值 (共 12 字节)
  const slotNames = [
    '攻击',         // 槽0: 始终可用
    '移动/指令',    // 槽1: 条件可用
    '装备/物品',    // 槽2: 部队拥有物品
    '法术',         // 槽3: 部队拥有法术
    '法术/物品',    // 槽4: 条件可用
    '物品',         // 槽5: 条件可用
  ];

  const slotConds = [
    '始终可用',
    '单位未移动',
    '部队拥有物品 & bit0',
    '部队拥有法术 & bit0x800000 + 未移动',
    '部队未移动',
    '部队未移动',
  ];

  for (let i = 0; i < 6; i++) {
    const addr = CMD_TABLE_ADDR + i * 2;
    if (addr + 1 > data.length) break;
    const cmdId  = view.getUint16(addr, false);
    const paramLo = view.getUint16(addr + 2, false);

    slots.push({
      slot: i,
      name: slotNames[i] || `槽${i}`,
      condition: slotConds[i] || '?',
      commandId: cmdId,
      paramLo,
      paramHi: view.getUint16(addr + 4, false),
    });
  }

  return slots;
}

/**
 * 法术名称表 (Langrisser II 已知法术)
 */
const SPELL_NAMES = {
  0x01: '魔法弹 (Fireball)',
  0x02: '火焰 (Fire)',
  0x03: '地狱火 (Inferno)',
  0x04: '暴风雪 (Blizzard)',
  0x05: '雷电 (Thunder)',
  0x06: '陨石 (Meteor)',
  0x07: '地震 (Earthquake)',
  0x08: '龙卷风 (Tornado)',
  0x09: '回复1 (Heal1)',
  0x0A: '回复2 (Heal2)',
  0x0B: '回复3 (Heal3)',
  0x0C: '攻击强化 (AttackUp)',
  0x0D: '防御强化 (DefenseUp)',
  0x0E: '加速 (Quick)',
  0x0F: '催眠 (Sleep)',
  0x10: '混乱 (Confuse)',
  0x11: '沉默 (Mute)',
  0x12: '传送 (Teleport)',
  0x13: '石化 (Stone)',
  0x14: '即死 (Death)',
  0x15: '吸血 (Vampire)',
};

/**
 * 解析单位法术槽 (5 个法术槽位)
 */
export function parseUnitSpells(unitData, unitAddr) {
  const spellSlots = [
    { idOff: 0x0C, lvOff: 0x0D },
    { idOff: 0x18, lvOff: 0x19 },
    { idOff: 0x24, lvOff: 0x25 },
    { idOff: 0x30, lvOff: 0x31 },
    { idOff: 0x3C, lvOff: 0x3D },
  ];

  return spellSlots.map((slot, i) => {
    const spellId  = unitData[unitAddr + slot.idOff];
    const spellLv  = unitData[unitAddr + slot.lvOff];
    const name = SPELL_NAMES[spellId] || (spellId !== 0 && spellId < 0xFF ? `法术#${spellId}` : '-');
    return {
      slot: i,
      id: spellId,
      level: spellLv,
      name,
      active: spellId !== 0 && spellId !== 0xFF,
    };
  });
}

/**
 * 道具/装备名称表
 */
const ITEM_NAMES = {
  0x01: '短剑', 0x02: '长剑', 0x03: '阔剑', 0x04: '火焰剑',
  0x05: '恶魔之斧', 0x06: '战锤', 0x07: '魔杖', 0x08: '圣杖',
  0x09: '小盾', 0x0A: '大盾', 0x0B: '龙盾', 0x0C: '魔法护符',
  0x0D: '速度之靴', 0x0E: '王冠', 0x0F: '奥义之书',
  0x10: '神圣戒指', 0x11: '暗黑戒指', 0x12: '经验之书',
  0x13: '转职道具1', 0x14: '转职道具2', 0x15: '转职道具3', 0x16: '转职道具4',
};

/**
 * 解析装备/道具表 (PTR_DAT_00097668 系列)
 */
export function parseEquipmentTable(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const items = [];

  for (let i = 0; i < 5; i++) {
    const addr = 0x97668 + i * 4;
    if (addr + 3 > data.length) break;

    const ptr = view.getUint32(addr, false) & 0xFFFFFF;
    if (ptr < 0x200 || ptr + 3 > data.length) continue;

    const id   = data[ptr];
    const val1 = view.getUint16(ptr + 1, false);
    const val2 = view.getUint16(ptr + 3, false);

    items.push({
      index: i,
      id,
      name: ITEM_NAMES[id] || `道具#${id}`,
      val1, val2,
      romPtr: ptr,
    });
  }

  return items;
}

export { SPELL_NAMES, ITEM_NAMES, CMD_TABLE_ADDR };
