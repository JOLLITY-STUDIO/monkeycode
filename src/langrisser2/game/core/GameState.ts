/**
 * GameState.ts — 游戏全局状态容器
 *
 * 严格对应 execution-trace.md RAM 关键地址速查表
 * 变量名 = RAM 地址对应的语义名称
 *
 * 注意: 不模拟 Genesis 硬件，只保存游戏逻辑需要的变量
 */

export class GameState {
  rom: Uint8Array;

  taskFuncPtr: number = 0x0000C92C;
  scenarioIndex: number = 1;
  scenarioActive: number = 0;
  frameCounter: number = 0;
  gameState: number = 0;

  mapWidth: number = 0;
  mapHeight: number = 0;
  scrollX: number = 0;
  scrollY: number = 0;

  mapTiles: Uint8Array = new Uint8Array();

  tileRemapLo: Uint8Array = new Uint8Array();
  tileRemapHi: Uint8Array = new Uint8Array();
  tileAttrLo: number = 0;
  tileAttrHi: number = 0;

  charAbilityTable: Uint8Array = new Uint8Array(10 * 24);

  unitSlots: Uint8Array[] = [];

  skipTitleFlag: number = 0xFFFF;
  titleScreenFlag: number = 0;

  cursorX: number = 1;
  cursorY: number = 1;

  scenarioSpecialConfig: number = 0;

  vdpRegState: number = 0;
  dmaBusyFlag: number = 0;

  nextScenario: number = 0;

  constructor(rom: Uint8Array) {
    this.rom = rom;
    this.unitSlots = [];
    for (let i = 0; i < 20; i++) {
      this.unitSlots.push(new Uint8Array(0x60));
    }
  }
}
