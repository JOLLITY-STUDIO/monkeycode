"use strict";
(() => {
  // src/game/prg/data/store/RamViews.ts
  var SceneView = class {
    constructor(s) {
      this.s = s;
    }
    /** 当前场景号（ram_00ED） */
    get currentSceneId() {
      return this.s.readByte(237);
    }
    set currentSceneId(v) {
      this.s.writeByte(237, v & 255);
    }
    /** 滚动标志（ram_0079：bit7 = 文本滚动路径） */
    get scrollFlag() {
      return this.s.readByte(121);
    }
    set scrollFlag(v) {
      this.s.writeByte(121, v & 255);
    }
    /** 滚动 X（ram_007A） */
    get scrollX() {
      return this.s.readByte(122);
    }
    set scrollX(v) {
      this.s.writeByte(122, v & 255);
    }
    /** 滚动 Y（ram_0044，最终 -1 = $007A/0044 路径） */
    get scrollY() {
      return this.s.readByte(68);
    }
    set scrollY(v) {
      this.s.writeByte(68, v & 255);
    }
    /** 主标志（ram_001B：bit0 = 标志 A，bit7 = 渲染路径） */
    get flags() {
      return this.s.readByte(27);
    }
    set flags(v) {
      this.s.writeByte(27, v & 255);
    }
    /** 数据段选择（ram_0077 = ram_0025） */
    get dataSegment() {
      return this.s.readByte(119);
    }
    set dataSegment(v) {
      this.s.writeByte(119, v & 255);
    }
  };
  var PaletteView = class {
    constructor(s) {
      this.s = s;
    }
    /** 16 项 BG 调色板（ram_062A 起 16 字节） */
    get bg() {
      return this.s.ram.subarray(1578, 1594);
    }
    /** 16 项 SPR 调色板（ram_063A 起 16 字节） */
    get spr() {
      return this.s.ram.subarray(1594, 1610);
    }
    /** 装载 BG 调色板（16 字节 → ram_062A） */
    loadBg(palette) {
      for (let i = 0; i < 16; i++) this.s.writeByte(1578 + i, palette[i] & 63);
    }
    /** 装载 SPR 调色板（16 字节 → ram_063A） */
    loadSpr(palette) {
      for (let i = 0; i < 16; i++) this.s.writeByte(1594 + i, palette[i] & 63);
    }
  };
  var OamView = class {
    constructor(s) {
      this.s = s;
    }
    /** 64 个精灵（每精灵 4 字节） */
    get shadowOam() {
      return this.s.ram.subarray(1128, 1384);
    }
    /** 实际 OAM 缓冲（$0200-$02FF） */
    get oam() {
      return this.s.oamBuffer;
    }
    /** 第 i 个精灵的 Y 坐标（$0468+i*4） */
    spriteY(i) {
      return this.s.readByte(1128 + i * 4);
    }
    setSpriteY(i, v) {
      this.s.writeByte(1128 + i * 4, v & 255);
    }
    /** 第 i 个精灵的属性字节（$046A+i*4） */
    spriteAttr(i) {
      return this.s.readByte(1130 + i * 4);
    }
    setSpriteAttr(i, v) {
      this.s.writeByte(1130 + i * 4, v & 255);
    }
    /** 第 i 个精灵的 X 坐标（$046B+i*4） */
    spriteX(i) {
      return this.s.readByte(1131 + i * 4);
    }
    setSpriteX(i, v) {
      this.s.writeByte(1131 + i * 4, v & 255);
    }
    /** 第 i 个精灵的 tile 索引（$0469+i*4） */
    spriteTile(i) {
      return this.s.readByte(1129 + i * 4);
    }
    setSpriteTile(i, v) {
      this.s.writeByte(1129 + i * 4, v & 255);
    }
  };
  var PpuStateView = class {
    constructor(s) {
      this.s = s;
    }
    /** PPU CTRL（$0020：bit7 NMI, bit2-0 背景表/精灵/H8） */
    get ctrl() {
      return this.s.readByte(32);
    }
    set ctrl(v) {
      this.s.writeByte(32, v & 255);
    }
    /** PPU MASK（$0021：BG/SPR 可见 + 灰度 + 强化色） */
    get mask() {
      return this.s.readByte(33);
    }
    set mask(v) {
      this.s.writeByte(33, v & 255);
    }
    /** Bank 基址 / CHR 选择（$0022：bit0-2 cmd base, bit7 chrSel） */
    get chrSelBase() {
      return this.s.readByte(34);
    }
    set chrSelBase(v) {
      this.s.writeByte(34, v & 255);
    }
    /** 滚动 X 临时（$004A + $0538） */
    get scrollTempX() {
      return this.s.readByte(74) + this.s.readByte(1336) & 255;
    }
    /** 滚动 Y 临时（$004B） */
    get scrollTempY() {
      return this.s.readByte(75);
    }
  };
  var FadeView = class {
    constructor(s) {
      this.s = s;
    }
    /** BG 渐显（$004A：$0F 最亮 → 0 最暗） */
    get bg() {
      return this.s.readByte(74) & 15;
    }
    set bg(v) {
      this.s.writeByte(74, v & 15);
    }
    /** SPR 渐显（$004B） */
    get spr() {
      return this.s.readByte(75) & 15;
    }
    set spr(v) {
      this.s.writeByte(75, v & 15);
    }
  };
  var AudioStateView = class {
    constructor(s) {
      this.s = s;
    }
    /** BGM 请求（$0700） */
    get bgmRequest() {
      return this.s.readByte(1792);
    }
    set bgmRequest(v) {
      this.s.writeByte(1792, v & 255);
    }
    /** SE 请求（$0701-$0705） */
    get seRequest1() {
      return this.s.readByte(1793);
    }
    set seRequest1(v) {
      this.s.writeByte(1793, v & 255);
    }
    get seRequest2() {
      return this.s.readByte(1794);
    }
    set seRequest2(v) {
      this.s.writeByte(1794, v & 255);
    }
    get seRequest3() {
      return this.s.readByte(1795);
    }
    set seRequest3(v) {
      this.s.writeByte(1795, v & 255);
    }
    get seRequest4() {
      return this.s.readByte(1796);
    }
    set seRequest4(v) {
      this.s.writeByte(1796, v & 255);
    }
    get seRequest5() {
      return this.s.readByte(1797);
    }
    set seRequest5(v) {
      this.s.writeByte(1797, v & 255);
    }
    /** 全局静音标志（$07E9） */
    get muteAll() {
      return this.s.readByte(2025);
    }
    set muteAll(v) {
      this.s.writeByte(2025, v & 255);
    }
    /** 通道使能位（$0706：8 通道 bit） */
    get channelMask() {
      return this.s.readByte(1798);
    }
    set channelMask(v) {
      this.s.writeByte(1798, v & 255);
    }
    /** 第 ch 通道的计数（$0707+ch*4 起 4 字节） */
    channelCounter(ch) {
      const x = 1799 + ch * 4;
      return {
        durLo: this.s.readByte(x),
        durHi: this.s.readByte(x + 1),
        noteDur: this.s.readByte(x + 2),
        nextDurHi: this.s.readByte(x + 3)
      };
    }
    setChannelCounter(ch, c) {
      const x = 1799 + ch * 4;
      if (c.durLo !== void 0) this.s.writeByte(x, c.durLo & 255);
      if (c.durHi !== void 0) this.s.writeByte(x + 1, c.durHi & 255);
      if (c.noteDur !== void 0) this.s.writeByte(x + 2, c.noteDur & 255);
      if (c.nextDurHi !== void 0) this.s.writeByte(x + 3, c.nextDurHi & 255);
    }
  };
  var RenderQueueView = class {
    constructor(s) {
      this.s = s;
    }
    /** 第一队列计数（$0498，0 = 空） */
    get queue1Count() {
      return this.s.readByte(1176);
    }
    setQueue1Count(v) {
      this.s.writeByte(1176, v & 255);
    }
    /** 第一队列第 i 项 (bank, ptrLo, ptrHi)（$0499+i*3 起 3 字节） */
    queue1Entry(i) {
      const cnt = this.queue1Count;
      if (i < 0 || i >= cnt) return null;
      const x = 1177 + i * 3;
      const bank = this.s.readByte(x);
      const lo = this.s.readByte(x + 1);
      const hi = this.s.readByte(x + 2);
      return { bank, addr: hi << 8 | lo };
    }
    /** 第二队列挂起标志（$0515 bit7） */
    get queue2Pending() {
      return (this.s.readByte(1301) & 128) !== 0;
    }
    setQueue2Pending(v) {
      const cur = this.s.readByte(1301) & 127;
      this.s.writeByte(1301, v ? cur | 128 : cur);
    }
    /** NT 渲染缓冲写入位置（$0628） */
    get ntBufferPos() {
      return this.s.readByte(1576) & 255;
    }
    setNtBufferPos(v) {
      this.s.writeByte(1576, v & 255);
    }
    /** NT 渲染缓冲忙标志（$0629 bit6） */
    get ntBufferBusy() {
      return (this.s.readByte(1577) & 64) !== 0;
    }
    setNtBufferBusy(v) {
      const cur = this.s.readByte(1577) & 191;
      this.s.writeByte(1577, v ? cur | 64 : cur);
    }
    /** NT 渲染缓冲（$05E8-$0627，共 64 字节） */
    get ntBuffer() {
      return this.s.ram.subarray(1512, 1576);
    }
  };
  var MatchRoundView = class {
    constructor(s) {
      this.s = s;
    }
    get active() {
      return this.s.readByte(1507);
    }
    set active(v) {
      this.s.writeByte(1507, v & 255);
    }
    get sequence() {
      return this.s.readByte(1508);
    }
    set sequence(v) {
      this.s.writeByte(1508, v & 255);
    }
    get typeId() {
      return this.s.readByte(1509);
    }
    set typeId(v) {
      this.s.writeByte(1509, v & 255);
    }
    get counter() {
      return this.s.readByte(1513);
    }
    set counter(v) {
      this.s.writeByte(1513, v & 255);
    }
    get paramId() {
      return this.s.readByte(1524);
    }
    set paramId(v) {
      this.s.writeByte(1524, v & 255);
    }
  };
  var MatchEventView = class {
    constructor(s) {
      this.s = s;
    }
    get typeId() {
      return this.s.readByte(1338);
    }
    set typeId(v) {
      this.s.writeByte(1338, v & 255);
    }
    get counter() {
      return this.s.readByte(1339);
    }
    set counter(v) {
      this.s.writeByte(1339, v & 255);
    }
    get phase() {
      return this.s.readByte(1341);
    }
    set phase(v) {
      this.s.writeByte(1341, v & 255);
    }
    get flag0() {
      return this.s.readByte(1344);
    }
    set flag0(v) {
      this.s.writeByte(1344, v & 255);
    }
    get flag1() {
      return this.s.readByte(1345);
    }
    set flag1(v) {
      this.s.writeByte(1345, v & 255);
    }
    get counter3() {
      return this.s.readByte(1347);
    }
    set counter3(v) {
      this.s.writeByte(1347, v & 255);
    }
    get paramLo() {
      return this.s.readByte(1348);
    }
    set paramLo(v) {
      this.s.writeByte(1348, v & 255);
    }
    get paramHi() {
      return this.s.readByte(1349);
    }
    set paramHi(v) {
      this.s.writeByte(1349, v & 255);
    }
    get targetX() {
      return this.s.readByte(1351);
    }
    set targetX(v) {
      this.s.writeByte(1351, v & 255);
    }
    get targetY() {
      return this.s.readByte(1352);
    }
    set targetY(v) {
      this.s.writeByte(1352, v & 255);
    }
  };
  var PlayerMoveView = class {
    constructor(s) {
      this.s = s;
    }
    get directionFlag() {
      return this.s.readByte(1303);
    }
    set directionFlag(v) {
      this.s.writeByte(1303, v & 255);
    }
    get flipX() {
      return (this.directionFlag & 64) !== 0;
    }
    get curX() {
      return this.s.readByte(62);
    }
    set curX(v) {
      this.s.writeByte(62, v & 255);
    }
    get curY() {
      return this.s.readByte(63);
    }
    set curY(v) {
      this.s.writeByte(63, v & 255);
    }
    get segmentPtr() {
      return this.s.readByte(66);
    }
    set segmentPtr(v) {
      this.s.writeByte(66, v & 255);
    }
    get segmentCursor() {
      return this.s.readByte(68);
    }
    set segmentCursor(v) {
      this.s.writeByte(68, v & 255);
    }
  };
  var PlayerNameView = class {
    constructor(s) {
      this.s = s;
    }
    get segmentIndex() {
      return this.s.readByte(1578) & 127;
    }
    set segmentIndex(v) {
      this.s.writeByte(1578, v & 127);
    }
    get charIndex() {
      return this.s.readByte(44);
    }
    set charIndex(v) {
      this.s.writeByte(44, v & 255);
    }
  };

  // src/game/prg/data/store/DataStore.ts
  var DataStore = class _DataStore {
    constructor() {
      /** 工作 RAM $0000-$07FF（含 OAM 缓冲 $0200、NMI 缓冲 $0498/$05E8） */
      this.ram = new Uint8Array(2048);
      /** VRAM 暂存 $2000-$3FFF（无写透目标时的挂起写；attach 后 flush） */
      this.vram = new Uint8Array(8192);
      /** VRAM 脏标记（$2000-$3FFF 相对偏移位图） */
      this.vramDirty = new Uint32Array(8192 / 32);
      /** VRAM 写透目标（由运行时 attach，见 setVramTarget） */
      this.vramTarget = null;
      /** 帧计数（NMI 帧号） */
      this.frame = 0;
      this.scene = new SceneView(this);
      this.palette = new PaletteView(this);
      this.oam = new OamView(this);
      this.ppuState = new PpuStateView(this);
      this.fade = new FadeView(this);
      this.audioState = new AudioStateView(this);
      this.renderQueue = new RenderQueueView(this);
      this.matchRound = new MatchRoundView(this);
      this.matchEvent = new MatchEventView(this);
      this.playerMove = new PlayerMoveView(this);
      this.playerName = new PlayerNameView(this);
    }
    /** 全部清零（等价 Reset 的 RAM 清零循环） */
    reset() {
      this.ram.fill(0);
      this.vram.fill(0);
      this.vramDirty.fill(0);
      this.frame = 0;
    }
    /**
     * 附加 VRAM 写透目标（PPU）。
     * 此前无目标期间的挂起写（$2000-$3FFF）一次性 flush 到目标。
     */
    setVramTarget(target) {
      if (this.vramTarget === target) return;
      if (target) this.flushVram(target);
      this.vramTarget = target;
    }
    /**
     * 将暂存的 VRAM 脏字节写透到目标并清脏。
     * 由渲染管线在每帧 renderCommit 调用。
     */
    flushVram(target) {
      const t = target != null ? target : this.vramTarget;
      if (!t) return;
      for (let i = 0; i < this.vramDirty.length; i++) {
        const word = this.vramDirty[i];
        if (word === 0) continue;
        const base = i * 32;
        for (let b = 0; b < 32; b++) {
          if (word & 1 << b) {
            const addr = 8192 + base + b;
            t.writeMem(addr & 16383, this.vram[base + b]);
          }
        }
        this.vramDirty[i] = 0;
      }
    }
    // ──────────────────────────── 8-bit 读写 ────────────────────────────
    /** 读一个字节。key 形如 'ram_0601'；也兼容 'ram_FFFF' 之外的上层传参 */
    read(key) {
      const addr = _DataStore.keyToAddr(key);
      if (addr < 0 || addr >= 2048) return 0;
      return this.ram[addr] & 255;
    }
    /** 写一个字节（自动 & 0xFF 截断，与 STA 一致） */
    write(key, value) {
      const addr = _DataStore.keyToAddr(key);
      if (addr < 0 || addr >= 2048) return;
      this.ram[addr] = value & 255;
    }
    /** 读一个字节（直接地址，内部用） */
    readByte(addr) {
      if (addr < 0 || addr >= 2048) return 0;
      return this.ram[addr] & 255;
    }
    /** 写一个字节（直接地址，内部用）。$2000-$3FFF 走 VRAM 写透。 */
    writeByte(addr, value) {
      if (addr < 0) return;
      if (addr >= 8192 && addr < 16384) {
        this.vramWrite(addr, value);
        return;
      }
      if (addr >= 2048) return;
      this.ram[addr] = value & 255;
    }
    /**
     * VRAM 写透：$2000-$3FFF（NT/属性表 $23C0-$23FF/调色板 $3F00-$3F1F）。
     * 有目标 → 立即写 PPU；无目标 → 暂存脏区，attach/flush 时补写。
     */
    vramWrite(addr, value) {
      if (addr < 8192 || addr >= 16384) return;
      const off = addr - 8192 & 8191;
      this.vram[off] = value & 255;
      this.vramDirty[off >> 5] |= 1 << (off & 31);
      if (this.vramTarget) {
        this.vramTarget.writeMem(addr & 16383, value & 255);
      }
    }
    // ──────────────────────────── 16-bit 读写 ────────────────────────────
    /** 读 16-bit 小端（低字节在前） */
    readU16(addr) {
      return this.readByte(addr) | this.readByte(addr + 1) << 8;
    }
    /** 写 16-bit 小端 */
    writeU16(addr, value) {
      this.writeByte(addr, value & 255);
      this.writeByte(addr + 1, value >> 8 & 255);
    }
    // ──────────────────────────── 工具 ────────────────────────────
    /** 批量应用 RAM 初始化表 [{addr, value}] */
    loadInitTable(table) {
      for (const e of table) this.writeByte(e.addr, e.value);
    }
    /** 'ram_XXXX' → 地址（小写/无前缀也兼容） */
    static keyToAddr(key) {
      const m = /^ram[_0-9a-fA-F]*0x?([0-9a-fA-F]{1,4})$/.exec(key);
      if (m) return parseInt(m[1], 16);
      const n = key.replace(/^ram[_-]?/i, "");
      return parseInt(n, 16);
    }
    /** 地址 → 键（4 位大写补零） */
    static addrToKey(addr) {
      return "ram_" + addr.toString(16).toUpperCase().padStart(4, "0");
    }
    /** OAM 缓冲 $0200-$02FF 引用（只读视图） */
    get oamBuffer() {
      return this.ram.subarray(512, 768);
    }
    /**
     * NMI 渲染缓冲 $05E8-$0627 视图（共 64 字节）。
     * 容量上限为 $0628（指针），忙标志 $0629，终止标 0。
     */
    get ntRenderBuffer() {
      return this.ram.subarray(1512, 1576);
    }
  };

  // src/game/prg/data/tables/player-stats.ts
  var PLAYER_TABLE = [
    {
      id: 1,
      name: "Tsubasa",
      club: 1,
      position: 0,
      stamina: 21,
      shot: 12,
      pass: 23,
      dribble: 14,
      block: 12,
      tackle: 16,
      intercept: 14,
      lowShot: 0,
      lowPass: 32,
      lowTrap: 14,
      lowLet: 21,
      lowCtrlClr: 24,
      lowUnctrl: 9,
      lowChal: 15,
      lowIntc: 15,
      highShot: 17,
      highPass: 21,
      highTrap: 12,
      highLet: 23,
      highCtrlClr: 12,
      highUnctrl: 11,
      highChal: 15,
      highIntc: 14
    },
    {
      id: 2,
      name: "Lennart",
      club: 1,
      position: 1,
      stamina: 0,
      pass: 10,
      catching: 4,
      punching: 4,
      vsShot: 0,
      vsDribble: 0,
      lowRush: 8,
      highClaim: 8,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 3,
      name: "Lima",
      club: 1,
      position: 0,
      stamina: 1,
      shot: 2,
      pass: 7,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 2,
      lowTrap: 5,
      lowLet: 0,
      lowCtrlClr: 1,
      lowUnctrl: 0,
      lowChal: 1,
      lowIntc: 0,
      highShot: 8,
      highPass: 0,
      highTrap: 0,
      highLet: 3,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 4,
      name: "Marini",
      club: 1,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 3,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 1,
      lowTrap: 2,
      lowLet: 5,
      lowCtrlClr: 6,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 1,
      highShot: 5,
      highPass: 5,
      highTrap: 4,
      highLet: 8,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 5,
      name: "Amaral",
      club: 1,
      position: 0,
      stamina: 5,
      shot: 4,
      pass: 8,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 1,
      lowLet: 2,
      lowCtrlClr: 3,
      lowUnctrl: 0,
      lowChal: 1,
      lowIntc: 0,
      highShot: 3,
      highPass: 2,
      highTrap: 1,
      highLet: 6,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 6,
      name: "Dottil",
      club: 1,
      position: 0,
      stamina: 2,
      shot: 1,
      pass: 6,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 6,
      lowLet: 15,
      lowCtrlClr: 13,
      lowUnctrl: 4,
      lowChal: 4,
      lowIntc: 3,
      highShot: 7,
      highPass: 15,
      highTrap: 8,
      highLet: 14,
      highCtrlClr: 5,
      highUnctrl: 3,
      highChal: 7,
      highIntc: 9
    },
    {
      id: 7,
      name: "Battista",
      club: 1,
      position: 0,
      stamina: 15,
      shot: 9,
      pass: 14,
      dribble: 5,
      block: 3,
      tackle: 7,
      intercept: 9,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 3,
      lowLet: 4,
      lowCtrlClr: 4,
      lowUnctrl: 6,
      lowChal: 8,
      lowIntc: 7,
      highShot: 4,
      highPass: 4,
      highTrap: 2,
      highLet: 5,
      highCtrlClr: 7,
      highUnctrl: 5,
      highChal: 9,
      highIntc: 6
    },
    {
      id: 8,
      name: "Tahamata",
      club: 1,
      position: 0,
      stamina: 14,
      shot: 10,
      pass: 13,
      dribble: 16,
      block: 14,
      tackle: 18,
      intercept: 12,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 3,
      lowLet: 4,
      lowCtrlClr: 4,
      lowUnctrl: 6,
      lowChal: 10,
      lowIntc: 5,
      highShot: 12,
      highPass: 13,
      highTrap: 9,
      highLet: 12,
      highCtrlClr: 15,
      highUnctrl: 13,
      highChal: 17,
      highIntc: 11
    },
    {
      id: 9,
      name: "Babinton",
      club: 1,
      position: 0,
      stamina: 4,
      shot: 2,
      pass: 5,
      dribble: 7,
      block: 5,
      tackle: 9,
      intercept: 4,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 2,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 2,
      lowChal: 6,
      lowIntc: 0,
      highShot: 4,
      highPass: 0,
      highTrap: 0,
      highLet: 2,
      highCtrlClr: 4,
      highUnctrl: 2,
      highChal: 6,
      highIntc: 1
    },
    {
      id: 10,
      name: "Gil",
      club: 1,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 2,
      dribble: 4,
      block: 2,
      tackle: 6,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 1,
      lowIntc: 1,
      highShot: 1,
      highPass: 0,
      highTrap: 0,
      highLet: 1,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 0
    },
    {
      id: 11,
      name: "Platton",
      club: 1,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 1,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 2,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 3,
      lowChal: 5,
      lowIntc: 3,
      highShot: 4,
      highPass: 0,
      highTrap: 0,
      highLet: 2,
      highCtrlClr: 5,
      highUnctrl: 3,
      highChal: 7,
      highIntc: 2
    },
    {
      id: 12,
      name: "Urabe",
      club: 1,
      position: 0,
      stamina: 1,
      shot: 0,
      pass: 8,
      dribble: 6,
      block: 4,
      tackle: 8,
      intercept: 3,
      lowShot: 0,
      lowPass: 2,
      lowTrap: 4,
      lowLet: 3,
      lowCtrlClr: 2,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 4,
      highShot: 6,
      highPass: 3,
      highTrap: 0,
      highLet: 5,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 13,
      name: "Kishida",
      club: 1,
      position: 0,
      stamina: 11,
      shot: 8,
      pass: 15,
      dribble: 11,
      block: 9,
      tackle: 13,
      intercept: 8,
      lowShot: 0,
      lowPass: 20,
      lowTrap: 3,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 8,
      lowChal: 7,
      lowIntc: 1,
      highShot: 5,
      highPass: 0,
      highTrap: 0,
      highLet: 2,
      highCtrlClr: 9,
      highUnctrl: 7,
      highChal: 11,
      highIntc: 2
    },
    {
      id: 14,
      name: "Nakayama",
      club: 1,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 2,
      dribble: 9,
      block: 7,
      tackle: 11,
      intercept: 2,
      lowShot: 0,
      lowPass: 32,
      lowTrap: 5,
      lowLet: 2,
      lowCtrlClr: 7,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 7,
      highPass: 2,
      highTrap: 5,
      highLet: 9,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 0
    },
    {
      id: 15,
      name: "Morisaki",
      club: 1,
      position: 1,
      stamina: 20,
      pass: 15,
      catching: 27,
      punching: 38,
      vsShot: 19,
      vsDribble: 19,
      lowRush: 22,
      highClaim: 23,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 16,
      name: "Takasugu",
      club: 1,
      position: 0,
      stamina: 3,
      shot: 7,
      pass: 11,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 0,
      lowShot: 0,
      lowPass: 40,
      lowTrap: 15,
      lowLet: 5,
      lowCtrlClr: 8,
      lowUnctrl: 14,
      lowChal: 16,
      lowIntc: 1,
      highShot: 18,
      highPass: 5,
      highTrap: 8,
      highLet: 15,
      highCtrlClr: 16,
      highUnctrl: 14,
      highChal: 18,
      highIntc: 0
    },
    {
      id: 17,
      name: "Misaki",
      club: 1,
      position: 0,
      stamina: 5,
      shot: 8,
      pass: 15,
      dribble: 16,
      block: 14,
      tackle: 18,
      intercept: 0,
      lowShot: 0,
      lowPass: 32,
      lowTrap: 7,
      lowLet: 2,
      lowCtrlClr: 6,
      lowUnctrl: 3,
      lowChal: 13,
      lowIntc: 1,
      highShot: 10,
      highPass: 2,
      highTrap: 4,
      highLet: 7,
      highCtrlClr: 8,
      highUnctrl: 10,
      highChal: 12,
      highIntc: 0
    },
    {
      id: 18,
      name: "Izawa",
      club: 1,
      position: 0,
      stamina: 2,
      shot: 4,
      pass: 7,
      dribble: 8,
      block: 10,
      tackle: 12,
      intercept: 0,
      lowShot: 0,
      lowPass: 30,
      lowTrap: 7,
      lowLet: 1,
      lowCtrlClr: 5,
      lowUnctrl: 15,
      lowChal: 9,
      lowIntc: 1,
      highShot: 9,
      highPass: 1,
      highTrap: 2,
      highLet: 6,
      highCtrlClr: 11,
      highUnctrl: 9,
      highChal: 14,
      highIntc: 0
    },
    {
      id: 19,
      name: "Taki",
      club: 1,
      position: 0,
      stamina: 1,
      shot: 2,
      pass: 8,
      dribble: 13,
      block: 12,
      tackle: 17,
      intercept: 0,
      lowShot: 0,
      lowPass: 33,
      lowTrap: 10,
      lowLet: 7,
      lowCtrlClr: 15,
      lowUnctrl: 11,
      lowChal: 14,
      lowIntc: 13,
      highShot: 13,
      highPass: 7,
      highTrap: 10,
      highLet: 17,
      highCtrlClr: 13,
      highUnctrl: 11,
      highChal: 15,
      highIntc: 13
    },
    {
      id: 20,
      name: "Ishizaki",
      club: 1,
      position: 0,
      stamina: 7,
      shot: 11,
      pass: 17,
      dribble: 13,
      block: 11,
      tackle: 15,
      intercept: 13,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 4,
      lowLet: 2,
      lowCtrlClr: 2,
      lowUnctrl: 1,
      lowChal: 0,
      lowIntc: 0,
      highShot: 7,
      highPass: 2,
      highTrap: 1,
      highLet: 4,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 21,
      name: "Nitta",
      club: 1,
      position: 0,
      stamina: 2,
      shot: 1,
      pass: 4,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 1,
      lowLet: 7,
      lowCtrlClr: 10,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 3,
      highPass: 7,
      highTrap: 6,
      highLet: 10,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 22,
      name: "Kisugi",
      club: 2,
      position: 0,
      stamina: 7,
      shot: 6,
      pass: 10,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 28,
      lowTrap: 21,
      lowLet: 28,
      lowCtrlClr: 31,
      lowUnctrl: 13,
      lowChal: 28,
      lowIntc: 31,
      highShot: 24,
      highPass: 28,
      highTrap: 19,
      highLet: 32,
      highCtrlClr: 27,
      highUnctrl: 25,
      highChal: 14,
      highIntc: 30
    },
    {
      id: 23,
      name: "Masao",
      club: 2,
      position: 0,
      stamina: 28,
      shot: 19,
      pass: 32,
      dribble: 27,
      block: 25,
      tackle: 14,
      intercept: 30,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 5,
      lowCtrlClr: 3,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 2,
      highPass: 0,
      highTrap: 0,
      highLet: 1,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 24,
      name: "Kazuo",
      club: 2,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 1,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 5,
      lowCtrlClr: 3,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 2,
      highPass: 0,
      highTrap: 0,
      highLet: 1,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 25,
      name: "Sano",
      club: 2,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 1,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 4,
      lowLet: 7,
      lowCtrlClr: 5,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 7,
      highPass: 4,
      highTrap: 1,
      highLet: 4,
      highCtrlClr: 1,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 26,
      name: "Hyuga",
      club: 2,
      position: 0,
      stamina: 4,
      shot: 1,
      pass: 4,
      dribble: 1,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 4,
      lowLet: 9,
      lowCtrlClr: 7,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 7,
      highPass: 4,
      highTrap: 1,
      highLet: 4,
      highCtrlClr: 1,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 27,
      name: "Souta",
      club: 2,
      position: 0,
      stamina: 4,
      shot: 1,
      pass: 4,
      dribble: 1,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 7,
      lowLet: 19,
      lowCtrlClr: 17,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 9,
      highPass: 1,
      highTrap: 1,
      highLet: 4,
      highCtrlClr: 2,
      highUnctrl: 2,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 28,
      name: "Jitou",
      club: 2,
      position: 0,
      stamina: 9,
      shot: 9,
      pass: 10,
      dribble: 2,
      block: 2,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 9,
      lowLet: 16,
      lowCtrlClr: 20,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 9,
      highPass: 7,
      highTrap: 9,
      highLet: 8,
      highCtrlClr: 2,
      highUnctrl: 2,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 29,
      name: "Matsuyama",
      club: 2,
      position: 0,
      stamina: 7,
      shot: 9,
      pass: 8,
      dribble: 2,
      block: 2,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 7,
      lowLet: 13,
      lowCtrlClr: 16,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 9,
      highPass: 5,
      highTrap: 4,
      highLet: 5,
      highCtrlClr: 3,
      highUnctrl: 0,
      highChal: 2,
      highIntc: 1
    },
    {
      id: 30,
      name: "Sorimachi",
      club: 2,
      position: 0,
      stamina: 5,
      shot: 4,
      pass: 5,
      dribble: 3,
      block: 0,
      tackle: 2,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 7,
      lowLet: 16,
      lowCtrlClr: 20,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 9,
      highPass: 5,
      highTrap: 4,
      highLet: 5,
      highCtrlClr: 2,
      highUnctrl: 0,
      highChal: 2,
      highIntc: 1
    },
    {
      id: 31,
      name: "Sawada",
      club: 2,
      position: 0,
      stamina: 5,
      shot: 4,
      pass: 5,
      dribble: 2,
      block: 0,
      tackle: 2,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 16,
      lowLet: 18,
      lowCtrlClr: 22,
      lowUnctrl: 8,
      lowChal: 8,
      lowIntc: 8,
      highShot: 18,
      highPass: 14,
      highTrap: 14,
      highLet: 23,
      highCtrlClr: 12,
      highUnctrl: 10,
      highChal: 14,
      highIntc: 11
    },
    {
      id: 32,
      name: "Misugi",
      club: 3,
      position: 0,
      stamina: 14,
      shot: 14,
      pass: 23,
      dribble: 12,
      block: 10,
      tackle: 14,
      intercept: 11,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 15,
      lowLet: 17,
      lowCtrlClr: 21,
      lowUnctrl: 4,
      lowChal: 4,
      lowIntc: 4,
      highShot: 17,
      highPass: 7,
      highTrap: 15,
      highLet: 6,
      highCtrlClr: 3,
      highUnctrl: 4,
      highChal: 5,
      highIntc: 5
    },
    {
      id: 33,
      name: "Wakabayashi",
      club: 3,
      position: 1,
      stamina: 28,
      pass: 20,
      catching: 43,
      punching: 46,
      vsShot: 26,
      vsDribble: 26,
      lowRush: 38,
      highClaim: 43,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 34,
      name: "Wakashimazu",
      club: 3,
      position: 1,
      stamina: 0,
      pass: 10,
      catching: 8,
      punching: 8,
      vsShot: 2,
      vsDribble: 2,
      lowRush: 8,
      highClaim: 8,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 35,
      name: "Satilst",
      club: 3,
      position: 0,
      stamina: 17,
      shot: 17,
      pass: 25,
      dribble: 14,
      block: 13,
      tackle: 15,
      intercept: 15,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 13,
      lowLet: 25,
      lowCtrlClr: 24,
      lowUnctrl: 9,
      lowChal: 17,
      lowIntc: 9,
      highShot: 27,
      highPass: 17,
      highTrap: 17,
      highLet: 25,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 15,
      highIntc: 15
    },
    {
      id: 36,
      name: "Riverio",
      club: 3,
      position: 0,
      stamina: 17,
      shot: 14,
      pass: 25,
      dribble: 14,
      block: 13,
      tackle: 15,
      intercept: 15,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 16,
      lowLet: 21,
      lowCtrlClr: 25,
      lowUnctrl: 6,
      lowChal: 6,
      lowIntc: 5,
      highShot: 18,
      highPass: 9,
      highTrap: 17,
      highLet: 6,
      highCtrlClr: 4,
      highUnctrl: 3,
      highChal: 5,
      highIntc: 4
    },
    {
      id: 37,
      name: "DaSilva",
      club: 3,
      position: 0,
      stamina: 9,
      shot: 17,
      pass: 6,
      dribble: 4,
      block: 3,
      tackle: 5,
      intercept: 4,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 16,
      lowLet: 21,
      lowCtrlClr: 25,
      lowUnctrl: 6,
      lowChal: 6,
      lowIntc: 5,
      highShot: 18,
      highPass: 9,
      highTrap: 17,
      highLet: 6,
      highCtrlClr: 4,
      highUnctrl: 3,
      highChal: 4,
      highIntc: 4
    },
    {
      id: 38,
      name: "Meon",
      club: 3,
      position: 1,
      stamina: 0,
      pass: 10,
      catching: 20,
      punching: 20,
      vsShot: 55,
      vsDribble: 55,
      lowRush: 45,
      highClaim: 45,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 39,
      name: "Toninho",
      club: 3,
      position: 0,
      stamina: 17,
      shot: 17,
      pass: 23,
      dribble: 12,
      block: 11,
      tackle: 12,
      intercept: 12,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 14,
      lowLet: 25,
      lowCtrlClr: 16,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 10,
      highShot: 24,
      highPass: 17,
      highTrap: 17,
      highLet: 23,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 14,
      highIntc: 12
    },
    {
      id: 40,
      name: "Nei",
      club: 3,
      position: 0,
      stamina: 17,
      shot: 17,
      pass: 23,
      dribble: 16,
      block: 15,
      tackle: 14,
      intercept: 12,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 19,
      lowLet: 21,
      lowCtrlClr: 26,
      lowUnctrl: 10,
      lowChal: 10,
      lowIntc: 7,
      highShot: 21,
      highPass: 9,
      highTrap: 17,
      highLet: 11,
      highCtrlClr: 4,
      highUnctrl: 3,
      highChal: 4,
      highIntc: 4
    },
    {
      id: 41,
      name: "Zagalo",
      club: 3,
      position: 0,
      stamina: 9,
      shot: 17,
      pass: 11,
      dribble: 4,
      block: 3,
      tackle: 4,
      intercept: 4,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 19,
      lowLet: 21,
      lowCtrlClr: 26,
      lowUnctrl: 10,
      lowChal: 10,
      lowIntc: 7,
      highShot: 21,
      highPass: 9,
      highTrap: 17,
      highLet: 21,
      highCtrlClr: 4,
      highUnctrl: 3,
      highChal: 4,
      highIntc: 4
    },
    {
      id: 42,
      name: "Dircil",
      club: 3,
      position: 0,
      stamina: 9,
      shot: 17,
      pass: 21,
      dribble: 4,
      block: 3,
      tackle: 4,
      intercept: 4,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 20,
      lowLet: 36,
      lowCtrlClr: 24,
      lowUnctrl: 11,
      lowChal: 24,
      lowIntc: 11,
      highShot: 33,
      highPass: 19,
      highTrap: 19,
      highLet: 30,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 14,
      highIntc: 14
    },
    {
      id: 43,
      name: "Carlos",
      club: 3,
      position: 0,
      stamina: 19,
      shot: 19,
      pass: 30,
      dribble: 14,
      block: 13,
      tackle: 14,
      intercept: 14,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 19,
      lowLet: 27,
      lowCtrlClr: 27,
      lowUnctrl: 11,
      lowChal: 19,
      lowIntc: 11,
      highShot: 31,
      highPass: 19,
      highTrap: 19,
      highLet: 30,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 14,
      highIntc: 15
    },
    {
      id: 44,
      name: "Santamaria",
      club: 3,
      position: 0,
      stamina: 19,
      shot: 19,
      pass: 30,
      dribble: 14,
      block: 13,
      tackle: 14,
      intercept: 15,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 19,
      lowLet: 27,
      lowCtrlClr: 25,
      lowUnctrl: 17,
      lowChal: 19,
      lowIntc: 21,
      highShot: 27,
      highPass: 19,
      highTrap: 19,
      highLet: 30,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 14,
      highIntc: 14
    },
    {
      id: 45,
      name: "Jethrio",
      club: 3,
      position: 0,
      stamina: 19,
      shot: 19,
      pass: 30,
      dribble: 14,
      block: 13,
      tackle: 14,
      intercept: 14,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 15,
      lowLet: 25,
      lowCtrlClr: 29,
      lowUnctrl: 10,
      lowChal: 10,
      lowIntc: 5,
      highShot: 17,
      highPass: 13,
      highTrap: 21,
      highLet: 15,
      highCtrlClr: 8,
      highUnctrl: 7,
      highChal: 8,
      highIntc: 8
    }
  ];

  // src/game/prg/data/tables/player-table.ts
  var PLAYER_TABLE2 = PLAYER_TABLE;
  function findPlayerById(id) {
    for (const p of PLAYER_TABLE2) {
      if (p.id === (id & 255)) return p;
    }
    return null;
  }
  function findPlayersByTeam(teamId) {
    const ids = [];
    for (const p of PLAYER_TABLE2) {
      if (p.club === (teamId & 255)) ids.push(p.id);
    }
    return ids;
  }

  // src/game/prg/data/tables/team-roster.ts
  var TEAM_ROSTER_TABLE = [
    { id: 128, name: "SaoPaulo", type: "player", players: [207, 160, 0, 44, 16, 11, 42, 31, 12, 16, 121], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 129, name: "Nankatsu", type: "player", players: [237, 98, 219, 5, 34, 173, 20, 3, 0, 14, 6], subs: [], formation: "4-4-2", tactic: "Normal" },
    { id: 130, name: "AsianCup", type: "player", players: [85, 110, 195, 125, 108, 110, 252, 237, 98, 168, 46], subs: [22, 30, 46, 101, 125, 77, 121, 121, 252, 223, 234, 237], formation: "Brazil", tactic: "Counter" },
    { id: 133, name: "Corinthians", type: "cpu", players: [38, 15, 32, 0, 126, 127, 128, 128, 176, 31, 30], subs: [], formation: "Form9", tactic: "Normal" },
    { id: 134, name: "Gremio", type: "cpu", players: [39, 11, 40, 15, 33, 0, 129, 130, 131, 131, 145], subs: [], formation: "Form15", tactic: "Pressing" },
    { id: 135, name: "Palmeiras", type: "cpu", players: [29, 9, 41, 4, 42, 15, 3, 0, 132, 133, 134], subs: [], formation: "Form6", tactic: "Tact8" },
    { id: 136, name: "Santos", type: "cpu", players: [96, 30, 31, 10, 43, 6, 44, 2, 45, 15, 0], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 137, name: "Flamengo", type: "cpu", players: [135, 136, 137, 137, 145, 31, 29, 4, 46, 9, 47], subs: [], formation: "Form15", tactic: "Normal" },
    { id: 138, name: "Kunimi", type: "cpu", players: [49, 15, 1, 0, 118, 141, 141, 142, 64, 30, 30], subs: [], formation: "Form4", tactic: "Normal" },
    { id: 139, name: "Akita", type: "cpu", players: [50, 1, 51, 15, 2, 0, 143, 144, 145, 145, 112], subs: [], formation: "Form15", tactic: "Pressing" },
    { id: 140, name: "Tatsunami", type: "cpu", players: [28, 15, 0, 0, 146, 147, 148, 148, 112, 31, 31], subs: [], formation: "Form10", tactic: "Normal" },
    { id: 141, name: "Musashi", type: "cpu", players: [53, 15, 3, 0, 118, 149, 150, 150, 96, 31, 30], subs: [], formation: "Form9", tactic: "Normal" },
    { id: 142, name: "Furano", type: "cpu", players: [54, 10, 55, 6, 56, 1, 57, 15, 32, 0, 151], subs: [], formation: "Form8", tactic: "Tact9" },
    { id: 143, name: "Toho", type: "cpu", players: [153, 153, 160, 31, 30, 9, 58, 15, 1, 0, 154], subs: [], formation: "Form11", tactic: "Tact9" },
    { id: 144, name: "AsRome", type: "cpu", players: [3, 0, 118, 157, 158, 158, 112, 30, 30, 7, 61], subs: [], formation: "Form10", tactic: "Normal" },
    { id: 145, name: "Uruguay", type: "cpu", players: [62, 6, 63, 1, 64, 15, 1, 0, 118, 119, 120], subs: [], formation: "Form9", tactic: "Tact7" },
    { id: 146, name: "Hamburg", type: "cpu", players: [48, 31, 27, 9, 65, 11, 66, 6, 67, 10, 68], subs: [], formation: "Form8", tactic: "Normal" },
    { id: 147, name: "Japan", type: "cpu", players: [70, 7, 71, 2, 72, 4, 73, 3, 74, 5, 75], subs: [], formation: "4-4-2", tactic: "Normal" },
    { id: 160, name: "WorldCup_00", type: "cpu", players: [168, 169, 170, 170, 160, 0, 0, 15, 19, 0, 171], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 161, name: "WorldCup_01", type: "cpu", players: [173, 173, 160, 31, 31, 15, 0, 0, 174, 175, 176], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 162, name: "WorldCup_02", type: "cpu", players: [112, 31, 28, 9, 79, 10, 80, 15, 35, 0, 177], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 163, name: "WorldCup_03", type: "cpu", players: [178, 178, 160, 31, 31, 15, 33, 0, 118, 179, 180], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 164, name: "WorldCup_04", type: "cpu", players: [160, 31, 31, 11, 81, 1, 82, 15, 0, 0, 181], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 165, name: "WorldCup_05", type: "cpu", players: [183, 183, 161, 31, 29, 9, 83, 4, 84, 15, 18], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 166, name: "WorldCup_06", type: "cpu", players: [118, 184, 185, 185, 160, 31, 30, 9, 85, 1, 86], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 167, name: "WorldCup_07", type: "cpu", players: [17, 0, 186, 187, 188, 188, 112, 31, 30, 9, 87], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 168, name: "WorldCup_08", type: "cpu", players: [88, 15, 32, 0, 189, 190, 191, 191, 112, 31, 28], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 169, name: "WorldCup_09", type: "cpu", players: [89, 15, 33, 0, 118, 192, 193, 193, 160, 31, 30], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 170, name: "WorldCup_10", type: "cpu", players: [90, 1, 91, 15, 16, 0, 194, 195, 196, 196, 113], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 171, name: "WorldCup_11", type: "cpu", players: [29, 9, 92, 4, 93, 15, 2, 0, 197, 198, 198], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 172, name: "WorldCup_12", type: "cpu", players: [176, 31, 26, 11, 94, 9, 95, 10, 96, 8, 97], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 173, name: "WorldCup_13", type: "cpu", players: [98, 15, 2, 0, 118, 199, 199, 199, 112, 30, 31], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 174, name: "WorldCup_14", type: "cpu", players: [99, 9, 100, 8, 101, 5, 102, 10, 103, 7, 104], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 175, name: "WorldCup_15", type: "cpu", players: [105, 15, 3, 0, 118, 119, 120, 121, 97, 30, 40], subs: [], formation: "4-3-3", tactic: "Normal" }
  ];
  var TEAM_TABLE = TEAM_ROSTER_TABLE.map((t) => ({
    id: t.id,
    name: t.name,
    formation: t.players.slice(0, 11),
    players: [...t.players, ...t.subs]
  }));
  function findRosterById(id) {
    for (const t of TEAM_ROSTER_TABLE) {
      if (t.id === (id & 255)) return t;
    }
    return null;
  }

  // src/game/prg/data/tables/team-table.ts
  var TEAM_TABLE2 = TEAM_TABLE;
  var TEAMS_FULL = TEAM_ROSTER_TABLE;
  function findTeamById(id) {
    for (const t of TEAM_TABLE2) {
      if (t.id === (id & 255)) return t;
    }
    return null;
  }
  function findRosterById2(id) {
    return findRosterById(id);
  }

  // src/game/prg/code/player/PlayerQueryService.ts
  var PlayerQueryService = class {
    constructor(store2) {
      this.store = store2;
    }
    /** 按球员 ID 查询档案 */
    findById(playerId) {
      return findPlayerById(playerId);
    }
    /** 按球队查询队员 ID 列表（先按 TeamRoster 精确查，无则回退到 PLAYER_TABLE.club） */
    findTeamRoster(teamId) {
      const tid = teamId & 255;
      for (const t of TEAMS_FULL) {
        if (t.id === tid) return Array.from(t.players);
      }
      const ids = [];
      for (const p of PLAYER_TABLE2) {
        if (p.club === tid) ids.push(p.id);
      }
      return ids;
    }
    /** 按球员名查询 ID（精确匹配） */
    findIdByName(name) {
      for (const p of PLAYER_TABLE2) {
        if (p.name === name) return p.id;
      }
      return null;
    }
  };

  // src/game/prg/data/tables/levelup-data.ts
  var LEVEL_UP_TABLE = [
    { level: 1, expRequired: 4640, growth: [13, 13, 13, 13, 13, 208], staminaRaw: 464, abilityMax: 13 },
    { level: 2, expRequired: 4820, growth: [13, 13, 13, 13, 13, 226], staminaRaw: 482, abilityMax: 13 },
    { level: 3, expRequired: 4900, growth: [13, 13, 13, 13, 13, 234], staminaRaw: 490, abilityMax: 13 },
    { level: 4, expRequired: 4980, growth: [14, 14, 14, 14, 14, 242], staminaRaw: 498, abilityMax: 14 },
    { level: 5, expRequired: 5060, growth: [14, 14, 14, 14, 14, 250], staminaRaw: 506, abilityMax: 14 },
    { level: 6, expRequired: 5140, growth: [14, 14, 14, 14, 14, 2], staminaRaw: 514, abilityMax: 14 },
    { level: 7, expRequired: 5220, growth: [15, 15, 15, 15, 15, 10], staminaRaw: 522, abilityMax: 15 },
    { level: 8, expRequired: 5300, growth: [15, 15, 15, 15, 15, 18], staminaRaw: 530, abilityMax: 15 },
    { level: 9, expRequired: 5380, growth: [16, 16, 16, 16, 16, 26], staminaRaw: 538, abilityMax: 16 },
    { level: 10, expRequired: 5460, growth: [16, 16, 16, 16, 16, 34], staminaRaw: 546, abilityMax: 16 },
    { level: 11, expRequired: 5540, growth: [17, 17, 17, 17, 17, 42], staminaRaw: 554, abilityMax: 17 },
    { level: 12, expRequired: 5620, growth: [17, 17, 17, 17, 17, 50], staminaRaw: 562, abilityMax: 17 },
    { level: 13, expRequired: 5700, growth: [17, 17, 17, 17, 17, 58], staminaRaw: 570, abilityMax: 17 },
    { level: 14, expRequired: 5780, growth: [18, 18, 18, 18, 18, 66], staminaRaw: 578, abilityMax: 18 },
    { level: 15, expRequired: 5860, growth: [18, 18, 18, 18, 18, 74], staminaRaw: 586, abilityMax: 18 },
    { level: 16, expRequired: 5940, growth: [19, 19, 19, 19, 19, 82], staminaRaw: 594, abilityMax: 19 },
    { level: 17, expRequired: 6020, growth: [20, 20, 20, 20, 20, 90], staminaRaw: 602, abilityMax: 20 },
    { level: 18, expRequired: 6100, growth: [20, 20, 20, 20, 20, 98], staminaRaw: 610, abilityMax: 20 },
    { level: 19, expRequired: 6180, growth: [21, 21, 21, 21, 21, 106], staminaRaw: 618, abilityMax: 21 },
    { level: 20, expRequired: 6260, growth: [21, 21, 21, 21, 21, 114], staminaRaw: 626, abilityMax: 21 },
    { level: 21, expRequired: 6340, growth: [22, 22, 22, 22, 22, 122], staminaRaw: 634, abilityMax: 22 },
    { level: 22, expRequired: 6420, growth: [22, 22, 22, 22, 22, 130], staminaRaw: 642, abilityMax: 22 },
    { level: 23, expRequired: 6500, growth: [23, 23, 23, 23, 23, 138], staminaRaw: 650, abilityMax: 23 },
    { level: 24, expRequired: 6580, growth: [24, 24, 24, 24, 24, 146], staminaRaw: 658, abilityMax: 24 },
    { level: 25, expRequired: 6640, growth: [24, 24, 24, 24, 24, 152], staminaRaw: 664, abilityMax: 24 },
    { level: 26, expRequired: 6700, growth: [25, 25, 25, 25, 25, 158], staminaRaw: 670, abilityMax: 25 },
    { level: 27, expRequired: 6760, growth: [26, 26, 26, 26, 26, 164], staminaRaw: 676, abilityMax: 26 },
    { level: 28, expRequired: 6820, growth: [26, 26, 26, 26, 26, 170], staminaRaw: 682, abilityMax: 26 },
    { level: 29, expRequired: 6880, growth: [27, 27, 27, 27, 27, 176], staminaRaw: 688, abilityMax: 27 },
    { level: 30, expRequired: 6940, growth: [28, 28, 28, 28, 28, 182], staminaRaw: 694, abilityMax: 28 }
  ];

  // src/game/prg/data/tables/levelup-table.ts
  var LEVEL_UP_TABLE2 = LEVEL_UP_TABLE;
  function findLevelByExp(exp) {
    const target = Math.max(0, exp | 0);
    let level = 1;
    for (const e of LEVEL_UP_TABLE2) {
      if (target >= e.expRequired) level = e.level;
      else break;
    }
    return level;
  }
  function findLevelById(level) {
    for (const e of LEVEL_UP_TABLE2) {
      if (e.level === (level & 255)) return e;
    }
    return null;
  }

  // src/game/prg/data/tables/skill-table.ts
  var SKILL_TABLE = [
    // TODO: 从 BANK16_DATA_TABLES 解析结构化技能条目（moveId/name/power/players）
  ];
  function findSkillByMoveId(moveId) {
    for (const s of SKILL_TABLE) {
      if (s.moveId === moveId) return s;
    }
    return null;
  }
  function findSkillsByPlayer(playerId) {
    const ids = [];
    for (const s of SKILL_TABLE) {
      if (s.players.includes(playerId)) ids.push(s.moveId);
    }
    return ids;
  }

  // src/game/prg/data/tables/match-config-table.ts
  var DEFAULT_MATCH_CONFIG = {
    halfLength: 45,
    maxSubstitutions: 2,
    injuryTime: 0,
    durationMinutes: 45,
    extraTime: false,
    homeTeam: 0,
    awayTeam: 0,
    tournament: "saopaulo"
  };
  var MATCH_CONFIG_TABLE = [
    // Sao Paulo 赛（圣保罗）— 短时友谊赛
    { homeTeam: 128, awayTeam: 133, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    { homeTeam: 128, awayTeam: 134, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    { homeTeam: 128, awayTeam: 135, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    { homeTeam: 128, awayTeam: 136, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    { homeTeam: 128, awayTeam: 137, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    // Nankatsu 赛（日本高中）— 半时 10 分钟
    { homeTeam: 129, awayTeam: 138, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 139, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 140, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 141, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 142, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 143, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    // Japan Cup 赛（亚洲杯）
    { homeTeam: 130, awayTeam: 144, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: "japanCup" },
    { homeTeam: 130, awayTeam: 145, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: "japanCup" },
    { homeTeam: 130, awayTeam: 146, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: "japanCup" },
    { homeTeam: 130, awayTeam: 147, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: "japanCup" },
    // World Cup 赛（世界杯 — 半时 22.5 分钟）
    { homeTeam: 132, awayTeam: 160, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: "worldCup" },
    { homeTeam: 132, awayTeam: 161, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: "worldCup" },
    { homeTeam: 132, awayTeam: 162, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: "worldCup" },
    { homeTeam: 132, awayTeam: 163, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: "worldCup" },
    // Exhibition（表演赛）
    { homeTeam: 128, awayTeam: 130, halfLength: 5, maxSubstitutions: 5, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "exhibition" }
  ];
  function getMatchConfig(homeTeam = 0, awayTeam = 0) {
    for (const e of MATCH_CONFIG_TABLE) {
      if (e.homeTeam === (homeTeam & 255) && e.awayTeam === (awayTeam & 255)) return e;
    }
    return DEFAULT_MATCH_CONFIG;
  }

  // test/api-test.ts
  var NES_PALETTE = [
    [84, 84, 84],
    [0, 30, 116],
    [8, 16, 144],
    [48, 0, 136],
    [68, 0, 100],
    [92, 0, 48],
    [84, 4, 0],
    [60, 24, 0],
    [32, 42, 0],
    [8, 58, 0],
    [0, 64, 0],
    [0, 60, 0],
    [0, 50, 60],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [152, 150, 152],
    [8, 76, 196],
    [48, 50, 236],
    [92, 30, 228],
    [136, 20, 176],
    [160, 20, 100],
    [152, 34, 32],
    [120, 60, 0],
    [84, 90, 0],
    [40, 114, 0],
    [8, 124, 0],
    [0, 118, 40],
    [0, 102, 120],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [236, 238, 236],
    [76, 154, 236],
    [120, 124, 236],
    [176, 98, 236],
    [228, 84, 236],
    [236, 88, 180],
    [236, 106, 100],
    [212, 136, 32],
    [160, 170, 0],
    [116, 196, 0],
    [76, 208, 32],
    [56, 204, 108],
    [56, 180, 204],
    [60, 60, 60],
    [0, 0, 0],
    [0, 0, 0],
    [236, 238, 236],
    [168, 204, 236],
    [188, 188, 236],
    [212, 178, 236],
    [236, 174, 236],
    [236, 174, 212],
    [236, 180, 176],
    [228, 196, 144],
    [204, 210, 120],
    [180, 222, 120],
    [168, 226, 144],
    [152, 226, 180],
    [160, 214, 228],
    [160, 162, 160],
    [0, 0, 0],
    [0, 0, 0]
  ];
  var C = (idx) => {
    const [r, g, b] = NES_PALETTE[idx & 63];
    return `rgb(${r},${g},${b})`;
  };
  var BG_DARK = C(0);
  var PANEL_BG = C(15);
  var TEXT_BRIGHT = C(48);
  var TEXT_DIM = C(44);
  var ACCENT_BLUE = C(33);
  var ACCENT_RED = C(22);
  var ACCENT_GREEN = C(26);
  var BAR_FILL = C(40);
  var BAR_BG = C(15);
  var SCALE = 3;
  function setFont(ctx, size) {
    ctx.font = `${size}px "Consolas", "Menlo", "Courier New", monospace`;
    ctx.textBaseline = "top";
  }
  function drawText(ctx, text, x, y, size, color) {
    setFont(ctx, size * SCALE);
    ctx.fillStyle = color;
    ctx.fillText(text, x * SCALE, y * SCALE);
  }
  function drawTextBG(ctx, text, x, y, size, fg, bg) {
    setFont(ctx, size * SCALE);
    const w = ctx.measureText(text).width;
    const h = size * SCALE;
    ctx.fillStyle = bg;
    ctx.fillRect(x * SCALE - 1, y * SCALE - 1, w + 2, h + 2);
    ctx.fillStyle = fg;
    ctx.fillText(text, x * SCALE, y * SCALE);
  }
  var store = new DataStore();
  var playerSvc = new PlayerQueryService(store);
  var pass = 0;
  var fail = 0;
  function assert(name, cond) {
    if (cond) pass++;
    else fail++;
  }
  function renderPlayerList(ctx) {
    ctx.fillStyle = BG_DARK;
    ctx.fillRect(0, 0, 768, 720);
    ctx.fillStyle = C(8);
    ctx.fillRect(0, 0, 768, 28 * 3);
    drawText(ctx, "PLAYER LIST", 76, 10, 2, TEXT_BRIGHT);
    drawText(ctx, "ID  NAME       STM PAS SH DRB", 8, 36, 1, TEXT_DIM);
    ctx.fillStyle = TEXT_DIM;
    ctx.fillRect(8, 46, 240, 1);
    for (let i = 0; i < Math.min(20, PLAYER_TABLE2.length); i++) {
      const p = PLAYER_TABLE2[i];
      const y = 50 + i * 9;
      const idStr = p.id.toString(16).padStart(2, "0").toUpperCase();
      drawText(ctx, idStr, 8, y, 1, ACCENT_GREEN);
      drawText(ctx, p.name.substring(0, 9).padEnd(9, " "), 32, y, 1, TEXT_BRIGHT);
      drawText(ctx, p.stamina.toString().padStart(2, " "), 100, y, 1, ACCENT_RED);
      drawText(ctx, p.pass.toString().padStart(2, " "), 132, y, 1, ACCENT_BLUE);
      drawText(ctx, p.shot.toString().padStart(2, " "), 164, y, 1, ACCENT_BLUE);
      drawText(ctx, p.dribble.toString().padStart(2, " "), 196, y, 1, ACCENT_BLUE);
    }
    ctx.fillStyle = C(8);
    ctx.fillRect(0, 220, 256, 20);
    drawText(ctx, `TOTAL:${PLAYER_TABLE2.length} PLAYERS`, 8, 226, 1, TEXT_BRIGHT);
    drawText(ctx, `TEAMS:${TEAMS_FULL.length}`, 168, 226, 1, TEXT_DIM);
  }
  function renderPlayerDetail(ctx) {
    ctx.fillStyle = BG_DARK;
    ctx.fillRect(0, 0, 256, 240);
    ctx.fillStyle = C(17);
    ctx.fillRect(0, 0, 256, 36);
    drawText(ctx, "ID:01  TSUBASA", 8, 6, 1, TEXT_DIM);
    drawText(ctx, "FWD", 200, 6, 1, ACCENT_GREEN);
    const p = findPlayerById(1);
    if (!p) return;
    drawText(ctx, p.name.toUpperCase(), 16, 16, 2, TEXT_BRIGHT);
    const stats2 = [
      { name: "SHOT", v: p.shot },
      { name: "DRIB", v: p.dribble },
      { name: "PASS", v: p.pass },
      { name: "TACK", v: p.tackle },
      { name: "BLOC", v: p.block },
      { name: "INT ", v: p.intercept }
    ];
    for (let i = 0; i < stats2.length; i++) {
      const y = 48 + i * 18;
      const s = stats2[i];
      drawText(ctx, s.name, 8, y, 1, TEXT_BRIGHT);
      const max = 30;
      const fill = Math.min(15, Math.round(s.v / max * 15));
      ctx.fillStyle = BAR_BG;
      ctx.fillRect(56, y, 15 * 8, 8);
      ctx.fillStyle = s.v >= 20 ? ACCENT_RED : s.v >= 10 ? ACCENT_BLUE : BAR_FILL;
      ctx.fillRect(56, y, fill * 8, 8);
      ctx.strokeStyle = TEXT_DIM;
      ctx.strokeRect(56, y, 15 * 8, 8);
      drawText(ctx, s.v.toString().padStart(2, "0"), 184, y, 1, TEXT_BRIGHT);
    }
    const yStam = 162;
    drawText(ctx, "STAM", 8, yStam, 1, TEXT_BRIGHT);
    const stamFill = Math.min(15, Math.round(p.stamina / 30 * 15));
    ctx.fillStyle = BAR_BG;
    ctx.fillRect(56, yStam, 15 * 8, 8);
    ctx.fillStyle = ACCENT_RED;
    ctx.fillRect(56, yStam, stamFill * 8, 8);
    ctx.strokeStyle = TEXT_DIM;
    ctx.strokeRect(56, yStam, 15 * 8, 8);
    drawText(ctx, p.stamina.toString().padStart(2, "0"), 184, yStam, 1, TEXT_BRIGHT);
    const skillCount = findSkillsByPlayer(p.id).length;
    drawTextBG(ctx, `SKILLS:${skillCount}`, 8, 184, 1, ACCENT_RED, C(16));
    drawTextBG(ctx, "API: /api/player/0x01", 8, 220, 1, TEXT_BRIGHT, C(17));
  }
  function renderTeamView(ctx) {
    ctx.fillStyle = BG_DARK;
    ctx.fillRect(0, 0, 256, 240);
    ctx.fillStyle = C(26);
    ctx.fillRect(0, 0, 256, 32);
    drawText(ctx, "TEAM 0x80", 8, 6, 1, TEXT_BRIGHT);
    drawText(ctx, "SAO PAULO", 80, 8, 2, TEXT_BRIGHT);
    const team = findTeamById(128);
    if (!team) return;
    const roster = findRosterById2(128);
    drawText(ctx, "ID  NAME      POS STM", 8, 42, 1, TEXT_DIM);
    ctx.fillStyle = TEXT_DIM;
    ctx.fillRect(8, 52, 240, 1);
    for (let i = 0; i < Math.min(15, roster.length); i++) {
      const pid = roster[i];
      const player = findPlayerById(pid);
      if (!player) continue;
      const y = 56 + i * 10;
      const idStr = pid.toString(16).padStart(2, "0").toUpperCase();
      drawText(ctx, idStr, 8, y, 1, ACCENT_GREEN);
      drawText(ctx, player.name.substring(0, 10).padEnd(10, " "), 32, y, 1, TEXT_BRIGHT);
      drawText(ctx, player.position === 1 ? "GK" : "FW", 112, y, 1, ACCENT_BLUE);
      drawText(ctx, player.stamina.toString().padStart(2, " "), 140, y, 1, ACCENT_RED);
    }
    ctx.fillStyle = C(26);
    ctx.fillRect(0, 220, 256, 20);
    drawText(ctx, `ROSTER:${roster.length}`, 8, 226, 1, TEXT_BRIGHT);
    drawText(ctx, `ALL TEAMS:${TEAMS_FULL.length}`, 140, 226, 1, TEXT_BRIGHT);
  }
  function renderLevelUp(ctx) {
    ctx.fillStyle = BG_DARK;
    ctx.fillRect(0, 0, 256, 240);
    ctx.fillStyle = C(22);
    ctx.fillRect(0, 0, 256, 36);
    drawText(ctx, "LEVEL UP", 88, 8, 2, TEXT_BRIGHT);
    const exp = 5e3;
    const lv = findLevelByExp(exp);
    const entry = findLevelById(lv);
    const nextLv = lv < 30 ? findLevelById(lv + 1) : null;
    drawText(ctx, `EXP:${exp}  LV:${lv}`, 8, 44, 1, TEXT_BRIGHT);
    if (entry) {
      drawText(ctx, `REQ:${entry.expRequired}`, 120, 44, 1, TEXT_DIM);
    }
    if (entry) {
      const labels = ["SHOT", "DRIB", "PASS", "TACK", "SPD ", "CTRL"];
      for (let i = 0; i < 6; i++) {
        const y = 56 + i * 14;
        const v = entry.growth[i] || 0;
        drawText(ctx, labels[i], 8, y, 1, TEXT_BRIGHT);
        const fill = Math.min(20, Math.round(v / 30 * 20));
        ctx.fillStyle = BAR_BG;
        ctx.fillRect(48, y, 20 * 5, 9);
        ctx.fillStyle = v >= 20 ? ACCENT_RED : v >= 10 ? ACCENT_BLUE : BAR_FILL;
        ctx.fillRect(48, y, fill * 5, 9);
        ctx.strokeStyle = TEXT_DIM;
        ctx.strokeRect(48, y, 20 * 5, 9);
        drawText(ctx, v.toString().padStart(2, "0"), 156, y, 1, TEXT_BRIGHT);
      }
    }
    if (nextLv) {
      ctx.fillStyle = C(17);
      ctx.fillRect(0, 152, 256, 26);
      drawText(ctx, `NEXT LV:${nextLv.level}`, 8, 158, 1, TEXT_BRIGHT);
      drawText(ctx, `EXP NEED:${nextLv.expRequired - exp}`, 96, 158, 1, ACCENT_RED);
    } else {
      drawText(ctx, "MAX LEVEL", 8, 160, 1, ACCENT_RED);
    }
    drawTextBG(ctx, "API: /api/level?exp=5000", 8, 220, 1, TEXT_BRIGHT, C(17));
  }
  function renderMatchConfig(ctx) {
    ctx.fillStyle = BG_DARK;
    ctx.fillRect(0, 0, 256, 240);
    ctx.fillStyle = C(26);
    ctx.fillRect(0, 0, 256, 32);
    drawText(ctx, "MATCH CONFIG", 56, 8, 2, TEXT_BRIGHT);
    const cfg = getMatchConfig(128, 133);
    drawTextBG(ctx, "SAO PAULO  VS  CORINTH", 8, 40, 1, TEXT_BRIGHT, C(8));
    drawText(ctx, "HALF", 8, 56, 1, TEXT_DIM);
    drawText(ctx, `${cfg.halfLength} MIN`, 56, 56, 1, ACCENT_RED);
    drawText(ctx, "SUB", 8, 70, 1, TEXT_DIM);
    drawText(ctx, `${cfg.maxSubstitutions}`, 56, 70, 1, ACCENT_RED);
    drawText(ctx, "INJTIME", 8, 84, 1, TEXT_DIM);
    drawText(ctx, `${cfg.injuryTime} MIN`, 80, 84, 1, ACCENT_RED);
    drawText(ctx, "TOTAL", 8, 98, 1, TEXT_DIM);
    drawText(ctx, `${cfg.durationMinutes} MIN`, 64, 98, 1, ACCENT_RED);
    drawText(ctx, "EXTRA", 8, 112, 1, TEXT_DIM);
    drawText(ctx, cfg.extraTime ? "YES" : "NO", 64, 112, 1, cfg.extraTime ? ACCENT_RED : TEXT_DIM);
    drawText(ctx, "TYPE", 8, 126, 1, TEXT_DIM);
    drawText(ctx, cfg.tournament.toUpperCase(), 56, 126, 1, ACCENT_GREEN);
    drawText(ctx, "ALL CONFIGURATIONS:", 8, 148, 1, TEXT_BRIGHT);
    ctx.fillStyle = TEXT_DIM;
    ctx.fillRect(8, 158, 240, 1);
    for (let i = 0; i < Math.min(6, MATCH_CONFIG_TABLE.length); i++) {
      const c = MATCH_CONFIG_TABLE[i];
      const y = 162 + i * 9;
      drawText(ctx, c.tournament.substring(0, 6).toUpperCase(), 8, y, 1, ACCENT_GREEN);
      drawText(ctx, `${c.halfLength}M`, 80, y, 1, TEXT_DIM);
      drawText(ctx, c.extraTime ? "+ET" : "   ", 112, y, 1, TEXT_DIM);
      drawText(ctx, `0x${c.homeTeam.toString(16).padStart(2, "0").toUpperCase()}`, 136, y, 1, ACCENT_BLUE);
      drawText(ctx, "VS", 168, y, 1, TEXT_DIM);
      drawText(ctx, `0x${c.awayTeam.toString(16).padStart(2, "0").toUpperCase()}`, 184, y, 1, ACCENT_BLUE);
    }
    drawTextBG(ctx, `TOTAL: ${MATCH_CONFIG_TABLE.length} MATCHES`, 8, 220, 1, TEXT_BRIGHT, C(26));
  }
  function renderSkills(ctx) {
    var _a, _b;
    ctx.fillStyle = BG_DARK;
    ctx.fillRect(0, 0, 256, 240);
    ctx.fillStyle = C(24);
    ctx.fillRect(0, 0, 256, 36);
    drawText(ctx, "SKILLS", 92, 8, 2, TEXT_BRIGHT);
    const skillIds = findSkillsByPlayer(1);
    drawText(ctx, "PLAYER 0x01 TSUBASA", 8, 22, 1, ACCENT_GREEN);
    drawText(ctx, `COUNT:${skillIds.length}`, 184, 22, 1, TEXT_DIM);
    drawText(ctx, "ID  NAME        POW", 8, 44, 1, TEXT_DIM);
    ctx.fillStyle = TEXT_DIM;
    ctx.fillRect(8, 54, 240, 1);
    for (let i = 0; i < Math.min(13, skillIds.length); i++) {
      const sid = skillIds[i];
      const sk = findSkillByMoveId(sid);
      const y = 60 + i * 12;
      const idStr = sid.toString(16).padStart(2, "0").toUpperCase();
      drawText(ctx, idStr, 8, y, 1, ACCENT_RED);
      drawText(ctx, ((_a = sk == null ? void 0 : sk.name) != null ? _a : "???").substring(0, 12).padEnd(12, " "), 32, y, 1, TEXT_BRIGHT);
      const power = ((_b = sk == null ? void 0 : sk.power) != null ? _b : 0) & 255;
      const fill = Math.min(8, Math.round(power / 30 * 8));
      ctx.fillStyle = BAR_BG;
      ctx.fillRect(120, y, 8 * 6, 8);
      ctx.fillStyle = power >= 20 ? ACCENT_RED : ACCENT_BLUE;
      ctx.fillRect(120, y, fill * 6, 8);
      drawText(ctx, power.toString().padStart(2, "0"), 180, y, 1, TEXT_BRIGHT);
    }
    drawTextBG(ctx, `ALL SKILLS: ${SKILL_TABLE.length}`, 8, 220, 1, TEXT_BRIGHT, C(24));
  }
  function runAllAssertions() {
    var _a, _b, _c, _d;
    assert("Tsubasa found", ((_a = findPlayerById(1)) == null ? void 0 : _a.name) === "Tsubasa");
    assert("Wakabayashi GK", ((_b = findPlayerById(33)) == null ? void 0 : _b.position) === 1);
    assert("Sao Paulo 11 players", findPlayersByTeam(128).length === 11);
    assert("PLAYER_TABLE >= 40", PLAYER_TABLE2.length >= 40);
    assert("5000 exp -> lv5", findLevelByExp(5e3) === 5);
    assert("lv30 max", ((_c = findLevelById(30)) == null ? void 0 : _c.expRequired) === 6940);
    assert("Sao Paulo team", ((_d = findTeamById(128)) == null ? void 0 : _d.name) === "SaoPaulo");
    assert("TEAMS_FULL >= 20", TEAMS_FULL.length >= 20);
    assert("Tsubasa >= 1 skill", findSkillsByPlayer(1).length >= 1);
    assert("SKILL_TABLE >= 10", SKILL_TABLE.length >= 10);
    const cfg = getMatchConfig(128, 133);
    assert("Sao Paulo 5min", cfg.halfLength === 5);
    assert("MATCH_CONFIG >= 20", MATCH_CONFIG_TABLE.length >= 20);
    return { pass, fail };
  }
  var stats = runAllAssertions();
  if (typeof document !== "undefined") {
    const canvases = {
      list: document.getElementById("canvas-list"),
      detail: document.getElementById("canvas-detail"),
      team: document.getElementById("canvas-team"),
      levelup: document.getElementById("canvas-levelup"),
      match: document.getElementById("canvas-match"),
      skills: document.getElementById("canvas-skills")
    };
    if (canvases.list) renderPlayerList(canvases.list.getContext("2d"));
    if (canvases.detail) renderPlayerDetail(canvases.detail.getContext("2d"));
    if (canvases.team) renderTeamView(canvases.team.getContext("2d"));
    if (canvases.levelup) renderLevelUp(canvases.levelup.getContext("2d"));
    if (canvases.match) renderMatchConfig(canvases.match.getContext("2d"));
    if (canvases.skills) renderSkills(canvases.skills.getContext("2d"));
    const summary = document.getElementById("summary");
    if (summary) {
      summary.textContent = `\u901A\u8FC7 ${stats.pass} / \u5931\u8D25 ${stats.fail}`;
      summary.style.color = stats.fail === 0 ? "#4caf50" : "#f44336";
    }
  }
  if (typeof process !== "undefined" && process.stdout) {
    process.stdout.write(`
[Test] \u901A\u8FC7 ${stats.pass} / \u5931\u8D25 ${stats.fail}
`);
    process.exit(stats.fail === 0 ? 0 : 1);
  }
  var api_test_default = stats;
})();
