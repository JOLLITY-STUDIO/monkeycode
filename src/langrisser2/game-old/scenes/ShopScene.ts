/**
 * ShopScene.ts — Langrisser II 商店场景 (Canvas UI 渲染)
 *
 * ROM 参考: 0x00FD7A (商店初始化入口)
 *   $FFFFA6DC: 商店类型 (0=正常, 1=隐藏商店$65, 2=真隐藏商店$5C)
 *   秘籍系统: CheatSystem 检测按键序列 → 改写 $FFFFA6DC
 *
 * 道具数据: ROM 0x060530 (道具数据表, 8B/条) → ItemSystem.ts
 * 职业数据: ROM 0x05EDDC (职业数据表, 28B/条) → classes.ts
 *
 * 操作 (对应 Genesis 控制器):
 *   ↑↓: 移动光标         (ROM:  方向按钮处理)
 *   A:  购买/卖出/装备确认 (ROM:  Button.A → 菜单确认)
 *   B:  退出当前模式       (ROM:  Button.B → 取消)
 *   C:  切换 buy→sell→equip (ROM: Button.C → 模式切换)
 *   START: 切换隐藏商店    (ROM:  START → $FFFFA6DC 切换)
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import {
  ITEM_NAMES, ITEM_PRICES, NORMAL_SHOP_ITEMS,
  HIDDEN_SHOP_1_ITEMS, TRUE_HIDDEN_SHOP_ITEMS,
} from '../systems/ItemSystem.js';
import {
  SaveData, CharSaveData,
  saveData as doSave,
  addItemToInventory, removeItemFromInventory,
  isEquippedByAny, setEquip, unequipChar,
} from '../systems/SaveSystem.js';
import {
  drawPanel, drawTextLines, drawMenuList, drawStatusBar,
  TextLine,
} from '../rendering/UI.js';

// ============================================================================
// 类型
// ============================================================================

type ShopMode = 'buy' | 'sell' | 'equip';
type ShopType = 'normal' | 'hidden1' | 'hidden2';

const SHOP_TYPE_NAMES: Record<ShopType, string> = {
  normal: '商店', hidden1: '隐藏商店', hidden2: '真·隐藏商店',
};

const SHOP_ITEM_POOLS: Record<ShopType, readonly number[]> = {
  normal:   NORMAL_SHOP_ITEMS,
  hidden1:  HIDDEN_SHOP_1_ITEMS,
  hidden2:  TRUE_HIDDEN_SHOP_ITEMS,
};

const PLAYABLE_CHARACTERS = [
  { id:1, cn:'艾尔文' }, { id:2, cn:'海恩' }, { id:3, cn:'雪莉' },
  { id:4, cn:'阿伦' }, { id:5, cn:'基斯' }, { id:6, cn:'利斯塔' },
  { id:7, cn:'斯科特' }, { id:8, cn:'捷西卡' }, { id:9, cn:'莉亚娜' },
  { id:10, cn:'拉娜' },
];

// ============================================================================
// ShopScene
// ============================================================================

export class ShopScene implements Scene {
  readonly name = 'Shop';

  private vdp: VDP;
  private save: SaveData = null!;

  private shopType: ShopType = 'normal';
  private shopItems: readonly number[] = NORMAL_SHOP_ITEMS;
  private mode: ShopMode = 'buy';
  private cursorIdx = 0;

  private equipCharIdx = 0;
  private equipSlot: 'weapon' | 'armor' | 'accessory' = 'weapon';

  private logLines: string[] = [];
  private onExit: (() => void) | null = null;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  // ============================================================================
  // 打开商店
  // ============================================================================

  /**
   * 打开商店
   * ROM: 0x00FD7A (商店初始化) → 根据 $FFFFA6DC 选择商品列表
   * @param save     当前存档
   * @param shopMode RAM $FFFFA6DC 商店模式 (0=正常, 1=隐藏, 2=真隐藏)
   * @param onExit   关闭回调
   */
  open(save: SaveData, shopMode: number = 0, onExit?: () => void): void {
    this.save = save;
    const modeNames: ShopType[] = ['normal', 'hidden1', 'hidden2'];
    this.shopType = modeNames[shopMode] || 'normal';
    this.shopItems = SHOP_ITEM_POOLS[this.shopType];
    this.onExit = onExit || null;
    this.mode = 'buy';
    this.cursorIdx = 0;
    this.equipCharIdx = 0;
    this.equipSlot = 'weapon';
    this.logLines = [
      `=== ${SHOP_TYPE_NAMES[this.shopType]} ===`,
      `金币:${save.gold} | A:买 C:切换 START:隐藏店`,
    ];
  }

  getSave(): SaveData { return this.save; }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
  }

  update(dt?: number, input?: Mapper): void {
    if (!input || !this.save) return;

    if (input.justPressed(Button.DOWN)) {
      this.cursorIdx = this._wrap(this.cursorIdx + 1, this._itemCount());
    }
    if (input.justPressed(Button.UP)) {
      this.cursorIdx = this._wrap(this.cursorIdx - 1, this._itemCount());
    }

    if (input.justPressed(Button.A)) this._handleA();
    if (input.justPressed(Button.B)) this._handleB();

    if (input.justPressed(Button.C)) {
      if (this.mode === 'buy') {
        this.mode = 'sell'; this.cursorIdx = 0;
        this.logLines.push('[卖出] 选中背包物品 A卖出');
      } else if (this.mode === 'sell') {
        this.mode = 'equip'; this.cursorIdx = 0;
        this.logLines.push('[装备] 选中角色 A装备');
      } else {
        this.mode = 'buy'; this.cursorIdx = 0;
        this.logLines.push('[购买] 选中商品 A购买');
      }
    }

    if (input.justPressed(Button.START)) {
      if (this.shopType === 'normal') {
        this.open(this.save, 'hidden1', this.onExit);
      } else if (this.shopType === 'hidden1') {
        this.open(this.save, 'hidden2', this.onExit);
      }
    }

    if (this.mode === 'equip') {
      this._handleEquipInput(input);
    }

    while (this.logLines.length > 8) this.logLines.shift();
  }

  /** Canvas UI 渲染 */
  renderUI(ctx: CanvasRenderingContext2D): void {
    // 顶部标题栏
    drawPanel(ctx, { x: 2, y: 2, w: 316, h: 22 }, 0.85);

    const modeLabel: Record<ShopMode, string> = {
      buy: '购买', sell: '卖出', equip: '装备',
    };
    drawTextLines(ctx, 6, 4, [
      { text: `${SHOP_TYPE_NAMES[this.shopType]} | 金币:${this.save.gold}G | [${modeLabel[this.mode]}]`, color: '#ff0' },
    ], { fontSize: 11 });

    // 主菜单面板
    const panelRect = { x: 2, y: 26, w: 316, h: 170 };
    drawPanel(ctx, panelRect, 0.85);

    if (this.mode === 'buy') this._renderBuy(ctx, panelRect);
    else if (this.mode === 'sell') this._renderSell(ctx, panelRect);
    else if (this.mode === 'equip') this._renderEquip(ctx, panelRect);

    // 底部日志
    drawStatusBar(ctx,
      this.logLines.map(l => ({ text: l, color: '#afa' })),
      { fontSize: 10, lineHeight: 13 },
    );
  }

  destroy(): void {}

  // ============================================================================
  // Canvas UI 渲染子方法
  // ============================================================================

  private _renderBuy(ctx: CanvasRenderingContext2D, rect: { x: number; y: number; w: number; h: number }): void {
    const items: TextLine[] = this.shopItems.map((id, i) => {
      const info = ITEM_NAMES[id];
      const price = ITEM_PRICES[id] || 0;
      return {
        text: `${(info?.cn || `#${id}0x`).padEnd(14)} ${price}G`,
        color: '#ddd',
      };
    });

    drawMenuList(ctx, items, this.cursorIdx, rect);
  }

  private _renderSell(ctx: CanvasRenderingContext2D, rect: { x: number; y: number; w: number; h: number }): void {
    const inv = this.save.inventory;
    if (inv.length === 0) {
      drawTextLines(ctx, rect.x + 6, rect.y + 6, [
        { text: '背包为空', color: '#888' },
      ]);
      return;
    }

    const items: TextLine[] = inv.map((id, i) => {
      const info = ITEM_NAMES[id];
      const price = Math.floor((ITEM_PRICES[id] || 0) / 2);
      const equipped = isEquippedByAny(this.save, id) ? ' [装备中]' : '';
      return {
        text: `${(info?.cn || `#${id}`).padEnd(14)} +${price}G${equipped}`,
        color: '#cfc',
      };
    });

    drawMenuList(ctx, items, this.cursorIdx, rect);
  }

  private _renderEquip(ctx: CanvasRenderingContext2D, rect: { x: number; y: number; w: number; h: number }): void {
    const chars = this._aliveChars();
    if (chars.length === 0) {
      drawTextLines(ctx, rect.x + 6, rect.y + 6, [{ text: '无可用角色', color: '#888' }]);
      return;
    }

    const ch = chars[this.equipCharIdx];
    const chName = PLAYABLE_CHARACTERS[ch.id - 1]?.cn || `角色${ch.id}`;

    // 角色信息头
    drawTextLines(ctx, rect.x + 4, rect.y + 4, [
      { text: `角色:${chName} | 槽位:${this.equipSlot} | ←→切换`, color: '#ff0' },
      { text: `武器:${this._equipName(ch.weapon)} 防具:${this._equipName(ch.armor)} 饰品:${this._equipName(ch.accessory)}`, color: '#aaa' },
    ], { fontSize: 10, lineHeight: 13 });

    // 背包物品列表
    const inv = this.save.inventory;
    const subRect = { x: rect.x + 4, y: rect.y + 30, w: rect.w - 8, h: rect.h - 34 };

    if (inv.length === 0) {
      drawTextLines(ctx, subRect.x, subRect.y, [{ text: '背包为空', color: '#888' }]);
      return;
    }

    const items: TextLine[] = inv.map((id) => {
      const name = ITEM_NAMES[id]?.cn || `#${id}`;
      return { text: name, color: '#ddd' };
    });

    drawMenuList(ctx, items, this.cursorIdx, subRect, { fontSize: 10, lineHeight: 13 });
  }

  private _equipName(id: number | null): string {
    return id ? (ITEM_NAMES[id]?.cn || `#${id}`) : '无';
  }

  // ============================================================================
  // 内部逻辑 (与之前相同)
  // ============================================================================

  private _wrap(v: number, max: number): number {
    if (max <= 0) return 0;
    return ((v % max) + max) % max;
  }

  private _itemCount(): number {
    if (this.mode === 'buy') return this.shopItems.length;
    if (this.mode === 'sell') return this.save.inventory.length;
    return Math.max(1, this._aliveChars().length);
  }

  private _aliveChars(): CharSaveData[] {
    return this.save.characters.filter(c => c.alive);
  }

  private _handleA(): void {
    if (this.mode === 'buy') this._buy();
    else if (this.mode === 'sell') this._sell();
    else if (this.mode === 'equip') this._equip();
  }

  private _handleB(): void {
    if (this.mode === 'buy') {
      doSave(this.save);
      this.logLines.push('已保存,退出商店');
      if (this.onExit) this.onExit();
    } else {
      this.mode = 'buy';
      this.cursorIdx = 0;
      this.logLines.push('[购买]');
    }
  }

  private _buy(): void {
    const itemId = this.shopItems[this.cursorIdx];
    if (!itemId) return;
    const price = ITEM_PRICES[itemId] || 0;
    const info = ITEM_NAMES[itemId] || { cn: `#${itemId}` };

    if (this.save.gold < price) {
      this.logLines.push(`金币不足: 需${price}G`);
      return;
    }

    this.save.gold -= price;
    addItemToInventory(this.save, itemId);
    this.logLines.push(`购买 ${info.cn} -${price}G | 余额:${this.save.gold}G`);
  }

  private _sell(): void {
    if (this.save.inventory.length === 0) return;
    const itemId = this.save.inventory[this.cursorIdx];
    if (!itemId) return;

    if (isEquippedByAny(this.save, itemId)) {
      this.logLines.push(`${ITEM_NAMES[itemId]?.cn || itemId} 已装备,先卸下`);
      return;
    }

    const price = ITEM_PRICES[itemId] || 0;
    const sellPrice = Math.floor(price / 2);
    const info = ITEM_NAMES[itemId] || { cn: `#${itemId}` };

    removeItemFromInventory(this.save, itemId);
    this.save.gold += sellPrice;
    this.logLines.push(`卖出 ${info.cn} +${sellPrice}G | 余额:${this.save.gold}G`);
  }

  private _equip(): void {
    const chars = this._aliveChars();
    if (chars.length === 0) return;
    const char = chars[this.equipCharIdx];
    if (!char) return;

    const itemId = this.save.inventory[this.cursorIdx];
    if (!itemId) { this.logLines.push('背包空'); return; }

    const info = ITEM_NAMES[itemId] || { cn: `#${itemId}` };

    const oldId = unequipChar(char, this.equipSlot);
    if (oldId) addItemToInventory(this.save, oldId);
    setEquip(char, this.equipSlot, itemId);
    removeItemFromInventory(this.save, itemId);

    this.logLines.push(
      `${PLAYABLE_CHARACTERS[char.id - 1]?.cn || char.id} ` +
      `${this.equipSlot}→${info.cn}`,
    );
  }

  private _handleEquipInput(input: Mapper): void {
    const chars = this._aliveChars();
    if (chars.length === 0) return;

    if (input.justPressed(Button.LEFT)) {
      const slots: Array<'weapon' | 'armor' | 'accessory'> = ['weapon', 'armor', 'accessory'];
      const i = slots.indexOf(this.equipSlot);
      this.equipSlot = slots[(i - 1 + 3) % 3];
      this.logLines.push(`槽位: ${this.equipSlot}`);
    }
    if (input.justPressed(Button.RIGHT)) {
      this.equipCharIdx = (this.equipCharIdx + 1) % chars.length;
      const ch = chars[this.equipCharIdx];
      this.logLines.push(`角色: ${PLAYABLE_CHARACTERS[ch.id - 1]?.cn || ch.id}`);
    }
  }
}
