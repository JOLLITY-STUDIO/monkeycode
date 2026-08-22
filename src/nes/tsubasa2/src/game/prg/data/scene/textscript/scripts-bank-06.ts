/**
 * SCRIPTS_BANK_06 — bank6 剧情脚本 ($A000-$BFFF 窗口)
 * @bank 06
 *
 * 按场景段拆分: 每个脚本 = 多个场景段, 每段一个 readonly number[]。
 * 场景段边界 = sceneLoad(0xFA) / jump(0xFE) / end(0xFF)。
 *
 * bank06 是混合 bank: 前 $1000 字节是脚本, $1000+ 是调色板数据。
 * 调色板单独导出 (PALETTE_BG_06 / PALETTE_SPR_06), 见文件末尾。
 */

// ═══ 脚本 0x00 (entryAddr=0xc, 15B, 1个场景段) ═══
/** SCRIPT_0x00_SCENE_0 — 场景段0 (15B) */
export const SCRIPT_0x00_SCENE_0: readonly number[] = [
  0xe8, 0x00,  // $E8 tableLoad(0x0)
  0xf9,  // $F9 flagBit()
  0x16,  // "ニ"
  0xfb,  // $FB clearBuf()
  0x02, 0xba, 0xbb,  // "イ??"
  0xf3, 0x00,  // $F3 palette(0x0)
  0xed,  // $ED findSlot()
  0x56,  // "?"
  0xf6, 0xa0,  // $F6 waitAnim(0xa0)
  0xff,  // $FF end()
];

/** 脚本 0x00 的场景段列表 */
export const SCRIPT_0x00: readonly (readonly number[])[] = [
  SCRIPT_0x00_SCENE_0,
];

// ═══ 脚本 0x01 (entryAddr=0x1b, 13B, 1个场景段) ═══
/** SCRIPT_0x01_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x01_SCENE_0: readonly number[] = [
  0xe8, 0x00,  // $E8 tableLoad(0x0)
  0xf9,  // $F9 flagBit()
  0x18,  // "ネ"
  0xfb,  // $FB clearBuf()
  0x02, 0xbc, 0xca,  // "イ??"
  0xf3, 0x00,  // $F3 palette(0x0)
  0xf5, 0x0b,  // $F5 setPtr(0xb)
  0xff,  // $FF end()
];

/** 脚本 0x01 的场景段列表 */
export const SCRIPT_0x01: readonly (readonly number[])[] = [
  SCRIPT_0x01_SCENE_0,
];

// ═══ 脚本 0x02 (entryAddr=0x28, 184B, 2个场景段) ═══
/** SCRIPT_0x02_SCENE_0 — 场景段0 (178B) */
export const SCRIPT_0x02_SCENE_0: readonly number[] = [
  0xe8, 0x01,  // $E8 tableLoad(0x1)
  0xed,  // $ED findSlot()
  0x43,  // "J"
  0xec, 0x01, 0x2e,  // $EC textSeq(0x1,0x2e)
  0x78,  // "?"
  0xde,  // wait(120帧)
  0x00, 0x15, 0x2e, 0xaa, 0x78,  // " ナ、??"
  0xfc,  // $FC vramAdvance()
  0xdf,  // wait(240帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0xc2,  // "ア?"
  0xf3, 0x00,  // $F3 palette(0x0)
  0xed,  // $ED findSlot()
  0x27,  // "ロ"
  0xec, 0x05, 0x05,  // $EC textSeq(0x5,0x5)
  0x05, 0x2f,  // "オ。"
  0xda,  // wait(20帧)
  0x00, 0x06, 0x2a, 0x1a, 0x79,  // " カ゛ハ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xed,  // $ED findSlot()
  0x62,  // "?"
  0xed,  // $ED findSlot()
  0x3c,  // "C"
  0xec, 0x04, 0x5f,  // $EC textSeq(0x4,0x5f)
  0x42, 0x53, 0x74, 0x00, 0xc7, 0x6e, 0xba, 0x70, 0x6f, 0x48, 0xaa, 0x79, 0x79,  // "IZ? ?????O???"
  0xeb,  // $EB animSeq()
  0xec, 0x02, 0x4b,  // $EC textSeq(0x2,0x4b)
  0x6e, 0xcd, 0x43, 0x6b, 0x19, 0x00, 0x0c, 0x32, 0x03, 0x28, 0x16,  // "??J?ノ シ2ウワニ"
  0xfc,  // $FC vramAdvance()
  0xba, 0x70, 0x6f, 0x48, 0x08, 0x2e, 0xa0, 0x00, 0x14, 0x03, 0xa6, 0x32, 0x03, 0x79,  // "???Oク、? トウ?2ウ?"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0xc3, 0x6e, 0xb9, 0x42, 0x19, 0x00, 0x2a, 0x2e, 0xc8, 0x12, 0xad, 0x0d, 0x79,  // "???Iノ ゛、?ツ?ス?"
  0xeb,  // $EB animSeq()
  0xfb,  // $FB clearBuf()
  0x01, 0xc3,  // "ア?"
  0xed,  // $ED findSlot()
  0x62,  // "?"
  0xec, 0x04, 0x4b,  // $EC textSeq(0x4,0x4b)
  0x6e, 0x47, 0x71, 0x7d, 0x00, 0x60, 0x4d, 0x50, 0x7d, 0xba, 0x70, 0x6f, 0x48, 0x79,  // "?N?? ?TW????O?"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0xec, 0x02, 0x14,  // $EC textSeq(0x2,0x14)
  0x08, 0xb2, 0x12, 0xb7, 0x4d, 0x54, 0x19,  // "ク?ツ?T?ノ"
  0xfc,  // $FC vramAdvance()
  0x5f, 0x42, 0x53, 0x74, 0x00, 0xc7, 0x6e, 0xba, 0x70, 0x6f, 0x48, 0xad, 0x0c, 0x10, 0x7b,  // "?IZ? ?????O?シタ?"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0x1f, 0x10, 0x00, 0xae, 0x0a, 0x06, 0xad, 0x00, 0x01, 0x02, 0x1f, 0x0c, 0x32, 0x03, 0x79,  // "マタ ?コカ? アイマシ2ウ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xea,  // $EA fadeOutClear()
  0xed,  // $ED findSlot()
  0x31,  // "1"
  0xde,  // wait(120帧)
  0xfa, 0x10,  // $FA sceneLoad(0x10)
];

/** SCRIPT_0x02_SCENE_1 — 场景段1 (6B) */
export const SCRIPT_0x02_SCENE_1: readonly number[] = [
  0xf5, 0x04,  // $F5 setPtr(0x4)
  0xed,  // $ED findSlot()
  0x4d,  // "T"
  0xf4, 0x07,  // $F4 subDispatch(0x7)
];

/** 脚本 0x02 的场景段列表 */
export const SCRIPT_0x02: readonly (readonly number[])[] = [
  SCRIPT_0x02_SCENE_0,
  SCRIPT_0x02_SCENE_1,
];

// ═══ 脚本 0x03 (entryAddr=0xe0, 200B, 1个场景段) ═══
/** SCRIPT_0x03_SCENE_0 — 场景段0 (200B) */
export const SCRIPT_0x03_SCENE_0: readonly number[] = [
  0xe8, 0x01,  // $E8 tableLoad(0x1)
  0xed,  // $ED findSlot()
  0x43,  // "J"
  0xec, 0x01, 0x2e,  // $EC textSeq(0x1,0x2e)
  0x78,  // "?"
  0xde,  // wait(120帧)
  0x00, 0x1f, 0x0b, 0x06, 0x79,  // " マサカ?"
  0xfc,  // $FC vramAdvance()
  0xdf,  // wait(240帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0xc2,  // "ア?"
  0xf3, 0x00,  // $F3 palette(0x0)
  0xed,  // $ED findSlot()
  0x27,  // "ロ"
  0xec, 0x05, 0x05,  // $EC textSeq(0x5,0x5)
  0x2f, 0x14, 0x00, 0xad, 0x10, 0x73, 0x79,  // "。ト ?タ??"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xed,  // $ED findSlot()
  0x62,  // "?"
  0xed,  // $ED findSlot()
  0x3c,  // "C"
  0xec, 0x02, 0xc3,  // $EC textSeq(0x2,0xc3)
  0x6e, 0xb9, 0x42, 0xb3, 0x03, 0x24, 0x19, 0x00, 0x05, 0xad, 0x1f, 0x0c, 0xaa, 0x79,  // "??I?ウリノ オ?マシ??"
  0xeb,  // $EB animSeq()
  0x5c, 0x73, 0x6e, 0x19, 0x20, 0x15, 0x0b, 0x1f, 0x16, 0x00, 0x1e, 0x03, 0x0c, 0x0d, 0x29,  // "???ノヤナサマニ ホウシスン"
  0xfc,  // $FC vramAdvance()
  0x0f, 0x19, 0x00, 0x09, 0x15, 0xa3, 0x15, 0x00, 0x4b, 0x7d, 0xc4, 0x4d, 0x0e, 0x02, 0x0c, 0x2e, 0x79,  // "ソノ ケナ?ナ R??Tセイシ、?"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0x05, 0xa6, 0x0b, 0x2e, 0x00, 0x0f, 0x03, 0x02, 0x03, 0x19, 0x4d, 0x47, 0xaa, 0x15, 0x7b,  // "オ?サ、 ソウイウノTN?ナ?"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0xec, 0x04, 0x26,  // $EC textSeq(0x4,0x26)
  0x2f, 0x00, 0x16, 0x2f, 0xcc, 0x2e, 0x02, 0x11, 0x79,  // "。 ニ。?、イチ?"
  0xeb,  // $EB animSeq()
  0xfb,  // $FB clearBuf()
  0x02, 0xc5, 0xc4,  // "イ??"
  0xed,  // $ED findSlot()
  0x04,  // "エ"
  0xec, 0x01, 0x05,  // $EC textSeq(0x1,0x5)
  0x7d, 0x00, 0x14, 0x2e, 0xaa, 0x79,  // "? ト、??"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xae, 0x0a, 0x1d, 0x00, 0x02, 0x2f, 0x10, 0x2e, 0xaa, 0x78,  // "?コヘ イ。タ、??"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0x01, 0x00, 0x01, 0x2e, 0x15, 0x14, 0x0a, 0x2b, 0x16, 0x79,  // "ア ア、ナトコ゜ニ?"
  0xfc,  // $FC vramAdvance()
  0xdc,  // wait(60帧)
  0xec, 0x05, 0x1a,  // $EC textSeq(0x5,0x1a)
  0x24, 0x08, 0x00, 0x05, 0x28, 0x15, 0x0b, 0x02, 0x79,  // "リク オワナサイ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xec, 0x01, 0xed,  // $EC textSeq(0x1,0xed)
  0x64,  // "?"
  0xd9,  // wait(10帧)
  0xed,  // $ED findSlot()
  0x01,  // "ア"
  0xdc,  // wait(60帧)
  0x2e, 0x78,  // "、?"
  0xfc,  // $FC vramAdvance()
  0xdd,  // wait(80帧)
  0xed,  // $ED findSlot()
  0x56,  // "?"
  0xdf,  // wait(240帧)
  0xea,  // $EA fadeOutClear()
  0xdc,  // wait(60帧)
  0xed,  // $ED findSlot()
  0x4e,  // "U"
  0xf4, 0x07,  // $F4 subDispatch(0x7)
];

/** 脚本 0x03 的场景段列表 */
export const SCRIPT_0x03: readonly (readonly number[])[] = [
  SCRIPT_0x03_SCENE_0,
];

// ═══ 脚本 0x04 (entryAddr=0x1a8, 330B, 2个场景段) ═══
/** SCRIPT_0x04_SCENE_0 — 场景段0 (34B) */
export const SCRIPT_0x04_SCENE_0: readonly number[] = [
  0xe8, 0x01,  // $E8 tableLoad(0x1)
  0xec, 0x00, 0x0f,  // $EC textSeq(0x0,0xf)
  0x19, 0x0a, 0x2b, 0x00, 0xa8, 0x2e, 0x16, 0x1e, 0x2e, 0x19, 0xc6, 0x6e, 0x51, 0xad, 0x1a, 0x3f, 0x3f, 0x3f,  // "ノコ゜ ?、ニホ、ノ??X?ハFFF"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xea,  // $EA fadeOutClear()
  0xfd,  // $FD fillWait()
  0xee,  // $EE clearText()
  0xec, 0xff, 0xf9,  // $EC textSeq(0xff,0xf9)
  0x10,  // "タ"
  0xfa, 0x11,  // $FA sceneLoad(0x11)
];

/** SCRIPT_0x04_SCENE_1 — 场景段1 (296B) */
export const SCRIPT_0x04_SCENE_1: readonly number[] = [
  0xfb,  // $FB clearBuf()
  0x01, 0x67,  // "ア?"
  0xe9,  // $E9 fadeIn()
  0xf5, 0x04,  // $F5 setPtr(0x4)
  0xfb,  // $FB clearBuf()
  0x01, 0x12,  // "アツ"
  0xf3, 0xff,  // $F3 palette(0xff)
  0x00, 0x0c,  // " シ"
  0xe1,  // lineEdit(0xe1)
  0xda,  // wait(20帧)
  0x40, 0x07, 0x20, 0x1a, 0x3f, 0x3f, 0x3f,  // "GキヤハFFF"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x21,  // "アユ"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0xdc,  // wait(60帧)
  0x40, 0x12, 0xaf, 0x0b, 0x7a,  // "Gツ?サ?"
  0xdb,  // wait(40帧)
  0x07, 0x19, 0x03, 0x00, 0x05, 0x2a, 0x1a,  // "キノウ オ゛ハ"
  0xfc,  // $FC vramAdvance()
  0x07, 0x20, 0x10, 0x11, 0x16, 0x00,  // "キヤタチニ "
  0xf8, 0x17, 0x13,  // $F8 external(0x17,0x13)
  0x2e, 0x00, 0x14, 0x27, 0x2a, 0x10, 0x7b,  // "、 トロ゛タ?"
  0xfc,  // $FC vramAdvance()
  0xdc,  // wait(60帧)
  0x0f, 0x19, 0x00, 0x06, 0x28, 0x2d, 0x06, 0x04, 0x0d, 0x06, 0x2c, 0x28, 0x16,  // "ソノ カワッカエスカーワニ"
  0xfc,  // $FC vramAdvance()
  0x02, 0x02, 0x0a, 0x14, 0x2d, 0x05, 0x0c, 0x04, 0x29, 0x26, 0x7b,  // "イイコトッオシエンレ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x66,  // "ア?"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x4c, 0x71, 0x55, 0x42, 0xbe, 0x7d,  // "GS??I??"
  0xef,  // $EF spriteFlip()
  0x3f, 0x3f, 0x3f,  // "FFF"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x21,  // "アユ"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x53, 0x6a, 0x5e, 0x6e, 0x00, 0x42, 0x6e, 0x5c, 0x76, 0x62, 0x7d, 0x4c, 0x72, 0x6e,  // "GZ??? I?????S??"
  0xfc,  // $FC vramAdvance()
  0x53, 0x48, 0x63, 0x00, 0x5e, 0x6f, 0x54, 0x67, 0x42, 0x6e, 0x1a,  // "ZO? ????I?ハ"
  0xdb,  // wait(40帧)
  0x00, 0x33, 0x36, 0x7d, 0x35, 0x35, 0x35, 0x7d,  // " 36?555?"
  0xfc,  // $FC vramAdvance()
  0x3a, 0x38, 0x38, 0x33, 0xad, 0x00, 0x03, 0x09, 0x12, 0x09, 0x13, 0x02, 0x29, 0x26, 0x7b,  // "A883? ウケツケテインレ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x66,  // "ア?"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x01, 0x28, 0xa0, 0x14, 0x03, 0x00, 0x4c, 0x71, 0x55, 0x42, 0xbe, 0x7d, 0x7b,  // "Gアワ?トウ S??I???"
  0xfc,  // $FC vramAdvance()
  0xdc,  // wait(60帧)
  0x0c, 0x01, 0x02, 0xa0, 0x05, 0x2c, 0x2f, 0x10, 0x27, 0x00, 0x0b, 0x2f, 0x0f, 0x08,  // "シアイ?オー。タロ サ。ソク"
  0xfc,  // $FC vramAdvance()
  0x06, 0x09, 0x13, 0x20, 0x29, 0x26, 0x7b,  // "カケテヤンレ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xf7,  // $F7 toggle()
  0xed,  // $ED findSlot()
  0x1e,  // "ホ"
  0xf8, 0x0e, 0xe1,  // $F8 external(0xe,0xe1)
  0x40, 0x15, 0x2e, 0x19, 0x0a, 0x2f, 0x11, 0x30, 0x79,  // "Gナ、ノコ。チ0?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x42,  // "アI"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x1f, 0x01, 0x00, 0x14, 0x16, 0x06, 0x08, 0x00, 0x0b, 0x02, 0xa4, 0x19, 0x0c, 0x01, 0x02, 0xaa,  // "Gマア トニカク サイ?ノシアイ?"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0x08, 0x02, 0x19, 0x15, 0x02, 0x26, 0x03, 0x00, 0x0c, 0x2f, 0x06, 0x28, 0x10, 0x10, 0x06, 0x04, 0x7b,  // "クイノナイレウ シ。カワタタカエ?"
  0xfc,  // $FC vramAdvance()
  0xed,  // $ED findSlot()
  0x62,  // "?"
  0xde,  // wait(120帧)
  0xed,  // $ED findSlot()
  0x31,  // "1"
  0xdc,  // wait(60帧)
  0xf5, 0xff,  // $F5 setPtr(0xff)
  0xf4, 0x07,  // $F4 subDispatch(0x7)
];

/** 脚本 0x04 的场景段列表 */
export const SCRIPT_0x04: readonly (readonly number[])[] = [
  SCRIPT_0x04_SCENE_0,
  SCRIPT_0x04_SCENE_1,
];

// ═══ 脚本 0x05 (entryAddr=0x2f2, 3342B, 2586个场景段) ═══
/** SCRIPT_0x05_SCENE_0 — 场景段0 (104B) */
export const SCRIPT_0x05_SCENE_0: readonly number[] = [
  0xe8, 0x01,  // $E8 tableLoad(0x1)
  0xf3, 0xff,  // $F3 palette(0xff)
  0x24, 0x42,  // "リI"
  0xf6, 0x06,  // $F6 waitAnim(0x6)
  0xf3, 0xff,  // $F3 palette(0xff)
  0x23, 0x41,  // "ラH"
  0xf6, 0x01,  // $F6 waitAnim(0x1)
  0xf3, 0xff,  // $F3 palette(0xff)
  0x20, 0x3f, 0x0f, 0x0c, 0x13, 0x00, 0x0a, 0x0a, 0x16, 0x00, 0x23, 0x03, 0x1b, 0x14, 0x12, 0x19,  // "ヤFソシテ ココニ ラウヒトツノ"
  0xfc,  // $FC vramAdvance()
  0xe1,  // lineEdit(0xe1)
  0x47, 0x70, 0xcf, 0x53, 0x6e, 0x12, 0xaf, 0x0b, 0xa0, 0x00, 0x01, 0x2f, 0x10, 0x3f, 0x3f, 0x3f,  // "N??Z?ツ?サ? ア。タFFF"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xea,  // $EA fadeOutClear()
  0xed,  // $ED findSlot()
  0x31,  // "1"
  0xde,  // wait(120帧)
  0xed,  // $ED findSlot()
  0x01,  // "ア"
  0xfd,  // $FD fillWait()
  0xde,  // wait(120帧)
  0xed,  // $ED findSlot()
  0x51,  // "X"
  0xf2, 0x04,  // $F2 lineLen(0x4)
  0xf9,  // $F9 flagBit()
  0x2d,  // "ッ"
  0xfb,  // $FB clearBuf()
  0x01, 0x0b,  // "アサ"
  0xe9,  // $E9 fadeIn()
  0xf4, 0x05,  // $F4 subDispatch(0x5)
  0xe1,  // lineEdit(0xe1)
  0x02, 0x1f, 0x06, 0x27, 0x00, 0x36, 0x18, 0x2e, 0x1f, 0x04, 0x19, 0x00, 0xc5, 0x67, 0xba, 0x69,  // "イマカロ 6ネ、マエノ ????"
  0xfc,  // $FC vramAdvance()
  0xf4, 0x04,  // $F4 subDispatch(0x4)
  0xde,  // wait(120帧)
  0xdf,  // wait(240帧)
  0xf4, 0x05,  // $F4 subDispatch(0x5)
  0xfd,  // $FD fillWait()
  0xf4, 0x04,  // $F4 subDispatch(0x4)
  0xf2, 0x08,  // $F2 lineLen(0x8)
  0xdf,  // wait(240帧)
  0xfa, 0x12,  // $FA sceneLoad(0x12)
];

/** SCRIPT_0x05_SCENE_1 — 场景段1 (256B) */
export const SCRIPT_0x05_SCENE_1: readonly number[] = [
  0xe1,  // lineEdit(0xe1)
  0x40, 0x26, 0x08, 0x07, 0x10, 0x15,  // "Gレクキタナ"
  0xdb,  // wait(40帧)
  0x00, 0x12, 0xaf, 0x0b, 0x7b,  // " ツ?サ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x4e,  // "アU"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0xdc,  // wait(60帧)
  0x40, 0x6b, 0xc6, 0x69, 0x54,  // "G????"
  0xef,  // $EF spriteFlip()
  0x3f,  // "F"
  0xef,  // $EF spriteFlip()
  0x3f, 0x3f,  // "FF"
  0xfc,  // $FC vramAdvance()
  0xdd,  // wait(80帧)
  0x12, 0x02, 0x16, 0x07, 0x10, 0x26,  // "ツイニキタレ"
  0xdb,  // wait(40帧)
  0x00, 0xc5, 0x67, 0xba, 0x69, 0x1d, 0x7b,  // " ????ヘ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x3b,  // "アB"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x07, 0x32, 0x03, 0x06, 0x27, 0x00, 0x0a, 0x19, 0x4b, 0x6e, 0xcd, 0x43, 0x6b, 0x86, 0x83, 0xa0,  // "Gキ2ウカロ コノR??J????"
  0xfc,  // $FC vramAdvance()
  0x05, 0x1f, 0x04, 0x19, 0x00, 0x5e, 0x7d, 0x61, 0xb6, 0x67, 0x43, 0x6e, 0xc2, 0xaa, 0x7b,  // "オマエノ ?????J????"
  0xfc,  // $FC vramAdvance()
  0xdc,  // wait(60帧)
  0xfb,  // $FB clearBuf()
  0x01, 0x3c, 0x0c, 0x2f, 0x06, 0x28, 0x15, 0x7b,  // "アCシ。カワナ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x11,  // "アチ"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x03, 0x2e, 0x7b,  // "Gウ、?"
  0xfc,  // $FC vramAdvance()
  0xdd,  // wait(80帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x3b,  // "アB"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x05, 0x1f, 0x04, 0xa0, 0x00, 0x0a, 0x2a, 0x06, 0x27, 0x0c, 0x32, 0xa9, 0x08, 0x0d, 0x29,  // "Gオマエ? コ゛カロシ2?クスン"
  0xfc,  // $FC vramAdvance()
  0x65, 0x7d, 0x4d, 0x48, 0x67, 0x4d, 0x1a, 0x00, 0x6a, 0xc6, 0x69, 0x19, 0x10, 0x06, 0x02,  // "??TO?Tハ ???ノタカイ"
  0xfc,  // $FC vramAdvance()
  0x51, 0x7d, 0x61, 0xa0, 0x00, 0x14, 0x08, 0x16, 0x05, 0x05, 0x02, 0x7b,  // "X??? トクニオオイ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x3c,  // "アC"
  0xe1,  // lineEdit(0xe1)
  0x40, 0xaa, 0xa0, 0x00, 0x68, 0x45, 0x46, 0x6f, 0xcf, 0x16, 0x00, 0xad, 0x10, 0x14, 0x0c, 0x10, 0x27,  // "G?? ?LM??ニ ?タトシタロ"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0x02, 0x11, 0xaf, 0x2e, 0x00, 0x07, 0x32, 0x03, 0x13, 0x07, 0x16, 0x15, 0x29, 0x19, 0x1a,  // "イチ?、 キ2ウテキニナンノハ"
  0xfc,  // $FC vramAdvance()
  0x5c, 0x67, 0x62, 0x6e, 0xb8, 0x86, 0x83, 0xaa, 0x2b, 0x03, 0x7b,  // "????????゜ウ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x11,  // "アチ"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x5c, 0x67, 0x62, 0x6e, 0xb8, 0x86, 0x83, 0x78,  // "G????????"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x3c,  // "アC"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xfa, 0x10,  // $FA sceneLoad(0x10)
];

/** SCRIPT_0x05_SCENE_2 — 场景段2 (165B) */
export const SCRIPT_0x05_SCENE_2: readonly number[] = [
  0xe1,  // lineEdit(0xe1)
  0x40, 0x15, 0x06, 0xad, 0x23, 0x00, 0x26, 0x03, 0x11, 0x31, 0x03, 0x02, 0x15, 0x19, 0xa0,  // "Gナカ?ラ レウチ1ウイナノ?"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0xfb,  // $FB clearBuf()
  0x01, 0x5a,  // "ア?"
  0xf7,  // $F7 toggle()
  0xf3, 0x8e,  // $F3 palette(0x8e)
  0x46, 0x69, 0x6b, 0x4d, 0x3f, 0x4b, 0x6e, 0x50, 0x7d, 0x55, 0x14, 0x02, 0x03, 0x00, 0x05, 0x14, 0x0a, 0xaa, 0x7b,  // "M??TFR?W??トイウ オトコ??"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xe1,  // lineEdit(0xe1)
  0x40, 0x0c, 0x32, 0x03, 0x27, 0x02, 0x0e, 0x02, 0x00, 0x55, 0x6e, 0xc3, 0x7d, 0x6c, 0x6e, 0x14, 0x02, 0x2c, 0x2a, 0x29,  // "Gシ2ウロイセイ ??????トイー゛ン"
  0xfc,  // $FC vramAdvance()
  0x06, 0x2a, 0x19, 0x11, 0x06, 0x27, 0x1a,  // "カ゛ノチカロハ"
  0xdb,  // wait(40帧)
  0x00, 0x02, 0x1f, 0x19, 0xa6, 0x13, 0x2e, 0xad,  // " イマノ?テ、?"
  0xfc,  // $FC vramAdvance()
  0x05, 0x1f, 0x04, 0x26, 0x28, 0x00, 0x03, 0x04, 0x06, 0x23, 0x0c, 0x2a, 0x15, 0x02, 0x7b,  // "オマエレワ ウエカラシ゛ナイ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xe1,  // lineEdit(0xe1)
  0x40, 0x06, 0x2a, 0xa0, 0x7a,  // "Gカ゛??"
  0xdb,  // wait(40帧)
  0x06, 0x02, 0x1a, 0x12, 0x11, 0x31, 0x03, 0x19,  // "カイハツチ1ウノ"
  0xfc,  // $FC vramAdvance()
  0x60, 0x67, 0x7d, 0xba, 0x71, 0x4c, 0x71, 0x7d, 0x54, 0x2d, 0x00, 0x06, 0x2e, 0x0e, 0x02, 0x0b, 0x0e, 0x10, 0x27,  // "?????S???ッ カ、セイサセタロ"
  0xfc,  // $FC vramAdvance()
  0xdb,  // wait(40帧)
  0x1f, 0x0b, 0x16, 0x00, 0x21, 0x06, 0x03, 0x14, 0x0a, 0x2b, 0x00, 0x13, 0x07, 0x15, 0x0c, 0xaa, 0x7b,  // "マサニ ユカウトコ゜ テキナシ??"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xea,  // $EA fadeOutClear()
  0xfd,  // $FD fillWait()
  0xf9,  // $F9 flagBit()
  0x13,  // "テ"
  0xfa, 0x12,  // $FA sceneLoad(0x12)
];

/** SCRIPT_0x05_SCENE_3 — 场景段3 (235B) */
export const SCRIPT_0x05_SCENE_3: readonly number[] = [
  0xfb,  // $FB clearBuf()
  0x01, 0x3b,  // "アB"
  0xe9,  // $E9 fadeIn()
  0xe1,  // lineEdit(0xe1)
  0x40, 0x02, 0xa7, 0x2a, 0x00, 0x46, 0x69, 0x6b, 0x4d, 0x14, 0x00, 0x10, 0x10, 0x06, 0x03, 0x14, 0x07, 0xa0,  // "Gイ?゛ M??Tト タタカウトキ?"
  0xfc,  // $FC vramAdvance()
  0x08, 0x29, 0xaa, 0x2b, 0x03, 0x7a,  // "クン?゜ウ?"
  0xdb,  // wait(40帧)
  0x0f, 0x2a, 0x1f, 0xad, 0x00, 0x20, 0x2f, 0x11, 0x28,  // "ソ゛マ? ヤ。チワ"
  0xfc,  // $FC vramAdvance()
  0x07, 0x10, 0x04, 0x29, 0xa9, 0x7b,  // "キタエン??"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x11,  // "アチ"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x46, 0x69, 0x6b, 0x4d, 0x3f, 0x4b, 0x6e, 0x50, 0x7d, 0x55, 0x06,  // "GM??TFR?W??カ"
  0xef,  // $EF spriteFlip()
  0x3f, 0x3f, 0x3f,  // "FFF"
  0xfc,  // $FC vramAdvance()
  0xf6, 0xb4,  // $F6 waitAnim(0xb4)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x3b,  // "アB"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x0b, 0x13,  // "Gサテ"
  0xdb,  // wait(40帧)
  0x00, 0x20, 0x2e, 0x15, 0x16, 0x00, 0x05, 0x1f, 0x04, 0x2d, 0x0c, 0x32, 0x03, 0x06, 0x02,  // " ヤ、ナニ オマエッシ2ウカイ"
  0xfc,  // $FC vramAdvance()
  0x0c, 0x15, 0x02, 0x14, 0x15, 0x7a,  // "シナイトナ?"
  0xdb,  // wait(40帧)
  0x0f, 0x2b, 0x0f, 0x2b, 0x02, 0x0a, 0x03, 0x06, 0x7b,  // "ソ゜ソ゜イコウカ?"
  0xfc,  // $FC vramAdvance()
  0xde,  // wait(120帧)
  0xfd,  // $FD fillWait()
  0xfb,  // $FB clearBuf()
  0x01, 0x4e,  // "アU"
  0xf7,  // $F7 toggle()
  0xf3, 0x00,  // $F3 palette(0x0)
  0xe1,  // lineEdit(0xe1)
  0x40, 0x03, 0x2e, 0x7a,  // "Gウ、?"
  0xdb,  // wait(40帧)
  0x26, 0x7d, 0x0c, 0x00, 0x24, 0x29, 0xa9, 0x79,  // "レ?シ リン??"
  0xfc,  // $FC vramAdvance()
  0xed,  // $ED findSlot()
  0x31,  // "1"
  0xde,  // wait(120帧)
  0xed,  // $ED findSlot()
  0x01,  // "ア"
  0xfd,  // $FD fillWait()
  0xf3, 0xff,  // $F3 palette(0xff)
  0x24, 0x42,  // "リI"
  0xf6, 0x06,  // $F6 waitAnim(0x6)
  0xf3, 0xff,  // $F3 palette(0xff)
  0x23, 0x41,  // "ラH"
  0xf6, 0x01,  // $F6 waitAnim(0x1)
  0xf3, 0xff,  // $F3 palette(0xff)
  0x20, 0x3f,  // "ヤF"
  0xf4, 0x05,  // $F4 subDispatch(0x5)
  0xfd,  // $FD fillWait()
  0xdc,  // wait(60帧)
  0xf2, 0x00,  // $F2 lineLen(0x0)
  0x05, 0x05, 0xa9, 0x27, 0x00, 0x12, 0xaf, 0x0b, 0x00, 0x34, 0x38, 0x0b, 0x02,  // "オオ?ロ ツ?サ 48サイ"
  0xfc,  // $FC vramAdvance()
  0xe2,  // lineEdit(0xe2)
  0x4d, 0x7d, 0xcd, 0x7d, 0x4d, 0x54, 0x67, 0x42, 0x46, 0x7d, 0x1d, 0x19, 0x00, 0x10, 0x10, 0x06, 0x02, 0x1a,  // "T???T??IM?ヘノ タタカイハ"
  0xfc,  // $FC vramAdvance()
  0xe2,  // lineEdit(0xe2)
  0x0a, 0x0a, 0x26, 0x28, 0x00, 0x36, 0x18, 0x2e, 0xa4, 0x16, 0x00, 0x1a, 0xa6, 0x1f, 0x29, 0x3f, 0x3f, 0x3f,  // "ココレワ 6ネ、?ニ ハ?マンFFF"
  0xfc,  // $FC vramAdvance()
  0xf4, 0x04,  // $F4 subDispatch(0x4)
  0xed,  // $ED findSlot()
  0x45,  // "L"
  0xdf,  // wait(240帧)
  0xdf,  // wait(240帧)
  0xf4, 0x07,  // $F4 subDispatch(0x7)
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_4 — 场景段4 (1B) */
export const SCRIPT_0x05_SCENE_4: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_5 — 场景段5 (1B) */
export const SCRIPT_0x05_SCENE_5: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_6 — 场景段6 (1B) */
export const SCRIPT_0x05_SCENE_6: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_7 — 场景段7 (1B) */
export const SCRIPT_0x05_SCENE_7: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_8 — 场景段8 (1B) */
export const SCRIPT_0x05_SCENE_8: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_9 — 场景段9 (1B) */
export const SCRIPT_0x05_SCENE_9: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_10 — 场景段10 (1B) */
export const SCRIPT_0x05_SCENE_10: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_11 — 场景段11 (1B) */
export const SCRIPT_0x05_SCENE_11: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_12 — 场景段12 (1B) */
export const SCRIPT_0x05_SCENE_12: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_13 — 场景段13 (1B) */
export const SCRIPT_0x05_SCENE_13: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_14 — 场景段14 (1B) */
export const SCRIPT_0x05_SCENE_14: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_15 — 场景段15 (1B) */
export const SCRIPT_0x05_SCENE_15: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_16 — 场景段16 (1B) */
export const SCRIPT_0x05_SCENE_16: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_17 — 场景段17 (1B) */
export const SCRIPT_0x05_SCENE_17: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_18 — 场景段18 (1B) */
export const SCRIPT_0x05_SCENE_18: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_19 — 场景段19 (1B) */
export const SCRIPT_0x05_SCENE_19: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_20 — 场景段20 (1B) */
export const SCRIPT_0x05_SCENE_20: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_21 — 场景段21 (1B) */
export const SCRIPT_0x05_SCENE_21: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_22 — 场景段22 (1B) */
export const SCRIPT_0x05_SCENE_22: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_23 — 场景段23 (1B) */
export const SCRIPT_0x05_SCENE_23: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_24 — 场景段24 (1B) */
export const SCRIPT_0x05_SCENE_24: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_25 — 场景段25 (1B) */
export const SCRIPT_0x05_SCENE_25: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_26 — 场景段26 (1B) */
export const SCRIPT_0x05_SCENE_26: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_27 — 场景段27 (1B) */
export const SCRIPT_0x05_SCENE_27: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_28 — 场景段28 (1B) */
export const SCRIPT_0x05_SCENE_28: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_29 — 场景段29 (1B) */
export const SCRIPT_0x05_SCENE_29: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_30 — 场景段30 (1B) */
export const SCRIPT_0x05_SCENE_30: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_31 — 场景段31 (1B) */
export const SCRIPT_0x05_SCENE_31: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_32 — 场景段32 (1B) */
export const SCRIPT_0x05_SCENE_32: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_33 — 场景段33 (1B) */
export const SCRIPT_0x05_SCENE_33: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_34 — 场景段34 (1B) */
export const SCRIPT_0x05_SCENE_34: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_35 — 场景段35 (1B) */
export const SCRIPT_0x05_SCENE_35: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_36 — 场景段36 (1B) */
export const SCRIPT_0x05_SCENE_36: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_37 — 场景段37 (1B) */
export const SCRIPT_0x05_SCENE_37: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_38 — 场景段38 (1B) */
export const SCRIPT_0x05_SCENE_38: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_39 — 场景段39 (1B) */
export const SCRIPT_0x05_SCENE_39: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_40 — 场景段40 (1B) */
export const SCRIPT_0x05_SCENE_40: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_41 — 场景段41 (1B) */
export const SCRIPT_0x05_SCENE_41: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_42 — 场景段42 (1B) */
export const SCRIPT_0x05_SCENE_42: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_43 — 场景段43 (1B) */
export const SCRIPT_0x05_SCENE_43: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_44 — 场景段44 (1B) */
export const SCRIPT_0x05_SCENE_44: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_45 — 场景段45 (1B) */
export const SCRIPT_0x05_SCENE_45: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_46 — 场景段46 (1B) */
export const SCRIPT_0x05_SCENE_46: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_47 — 场景段47 (1B) */
export const SCRIPT_0x05_SCENE_47: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_48 — 场景段48 (1B) */
export const SCRIPT_0x05_SCENE_48: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_49 — 场景段49 (1B) */
export const SCRIPT_0x05_SCENE_49: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_50 — 场景段50 (1B) */
export const SCRIPT_0x05_SCENE_50: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_51 — 场景段51 (1B) */
export const SCRIPT_0x05_SCENE_51: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_52 — 场景段52 (1B) */
export const SCRIPT_0x05_SCENE_52: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_53 — 场景段53 (1B) */
export const SCRIPT_0x05_SCENE_53: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_54 — 场景段54 (1B) */
export const SCRIPT_0x05_SCENE_54: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_55 — 场景段55 (1B) */
export const SCRIPT_0x05_SCENE_55: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_56 — 场景段56 (1B) */
export const SCRIPT_0x05_SCENE_56: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_57 — 场景段57 (1B) */
export const SCRIPT_0x05_SCENE_57: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_58 — 场景段58 (1B) */
export const SCRIPT_0x05_SCENE_58: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_59 — 场景段59 (1B) */
export const SCRIPT_0x05_SCENE_59: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_60 — 场景段60 (1B) */
export const SCRIPT_0x05_SCENE_60: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_61 — 场景段61 (1B) */
export const SCRIPT_0x05_SCENE_61: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_62 — 场景段62 (1B) */
export const SCRIPT_0x05_SCENE_62: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_63 — 场景段63 (1B) */
export const SCRIPT_0x05_SCENE_63: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_64 — 场景段64 (1B) */
export const SCRIPT_0x05_SCENE_64: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_65 — 场景段65 (1B) */
export const SCRIPT_0x05_SCENE_65: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_66 — 场景段66 (1B) */
export const SCRIPT_0x05_SCENE_66: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_67 — 场景段67 (1B) */
export const SCRIPT_0x05_SCENE_67: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_68 — 场景段68 (1B) */
export const SCRIPT_0x05_SCENE_68: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_69 — 场景段69 (1B) */
export const SCRIPT_0x05_SCENE_69: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_70 — 场景段70 (1B) */
export const SCRIPT_0x05_SCENE_70: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_71 — 场景段71 (1B) */
export const SCRIPT_0x05_SCENE_71: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_72 — 场景段72 (1B) */
export const SCRIPT_0x05_SCENE_72: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_73 — 场景段73 (1B) */
export const SCRIPT_0x05_SCENE_73: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_74 — 场景段74 (1B) */
export const SCRIPT_0x05_SCENE_74: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_75 — 场景段75 (1B) */
export const SCRIPT_0x05_SCENE_75: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_76 — 场景段76 (1B) */
export const SCRIPT_0x05_SCENE_76: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_77 — 场景段77 (1B) */
export const SCRIPT_0x05_SCENE_77: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_78 — 场景段78 (1B) */
export const SCRIPT_0x05_SCENE_78: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_79 — 场景段79 (1B) */
export const SCRIPT_0x05_SCENE_79: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_80 — 场景段80 (1B) */
export const SCRIPT_0x05_SCENE_80: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_81 — 场景段81 (1B) */
export const SCRIPT_0x05_SCENE_81: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_82 — 场景段82 (1B) */
export const SCRIPT_0x05_SCENE_82: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_83 — 场景段83 (1B) */
export const SCRIPT_0x05_SCENE_83: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_84 — 场景段84 (1B) */
export const SCRIPT_0x05_SCENE_84: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_85 — 场景段85 (1B) */
export const SCRIPT_0x05_SCENE_85: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_86 — 场景段86 (1B) */
export const SCRIPT_0x05_SCENE_86: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_87 — 场景段87 (1B) */
export const SCRIPT_0x05_SCENE_87: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_88 — 场景段88 (1B) */
export const SCRIPT_0x05_SCENE_88: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_89 — 场景段89 (1B) */
export const SCRIPT_0x05_SCENE_89: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_90 — 场景段90 (1B) */
export const SCRIPT_0x05_SCENE_90: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_91 — 场景段91 (1B) */
export const SCRIPT_0x05_SCENE_91: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_92 — 场景段92 (1B) */
export const SCRIPT_0x05_SCENE_92: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_93 — 场景段93 (1B) */
export const SCRIPT_0x05_SCENE_93: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_94 — 场景段94 (1B) */
export const SCRIPT_0x05_SCENE_94: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_95 — 场景段95 (1B) */
export const SCRIPT_0x05_SCENE_95: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_96 — 场景段96 (1B) */
export const SCRIPT_0x05_SCENE_96: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_97 — 场景段97 (1B) */
export const SCRIPT_0x05_SCENE_97: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_98 — 场景段98 (1B) */
export const SCRIPT_0x05_SCENE_98: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_99 — 场景段99 (1B) */
export const SCRIPT_0x05_SCENE_99: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_100 — 场景段100 (1B) */
export const SCRIPT_0x05_SCENE_100: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_101 — 场景段101 (1B) */
export const SCRIPT_0x05_SCENE_101: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_102 — 场景段102 (1B) */
export const SCRIPT_0x05_SCENE_102: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_103 — 场景段103 (1B) */
export const SCRIPT_0x05_SCENE_103: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_104 — 场景段104 (1B) */
export const SCRIPT_0x05_SCENE_104: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_105 — 场景段105 (1B) */
export const SCRIPT_0x05_SCENE_105: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_106 — 场景段106 (1B) */
export const SCRIPT_0x05_SCENE_106: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_107 — 场景段107 (1B) */
export const SCRIPT_0x05_SCENE_107: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_108 — 场景段108 (1B) */
export const SCRIPT_0x05_SCENE_108: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_109 — 场景段109 (1B) */
export const SCRIPT_0x05_SCENE_109: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_110 — 场景段110 (1B) */
export const SCRIPT_0x05_SCENE_110: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_111 — 场景段111 (1B) */
export const SCRIPT_0x05_SCENE_111: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_112 — 场景段112 (1B) */
export const SCRIPT_0x05_SCENE_112: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_113 — 场景段113 (1B) */
export const SCRIPT_0x05_SCENE_113: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_114 — 场景段114 (1B) */
export const SCRIPT_0x05_SCENE_114: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_115 — 场景段115 (1B) */
export const SCRIPT_0x05_SCENE_115: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_116 — 场景段116 (1B) */
export const SCRIPT_0x05_SCENE_116: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_117 — 场景段117 (1B) */
export const SCRIPT_0x05_SCENE_117: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_118 — 场景段118 (1B) */
export const SCRIPT_0x05_SCENE_118: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_119 — 场景段119 (1B) */
export const SCRIPT_0x05_SCENE_119: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_120 — 场景段120 (1B) */
export const SCRIPT_0x05_SCENE_120: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_121 — 场景段121 (1B) */
export const SCRIPT_0x05_SCENE_121: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_122 — 场景段122 (1B) */
export const SCRIPT_0x05_SCENE_122: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_123 — 场景段123 (1B) */
export const SCRIPT_0x05_SCENE_123: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_124 — 场景段124 (1B) */
export const SCRIPT_0x05_SCENE_124: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_125 — 场景段125 (1B) */
export const SCRIPT_0x05_SCENE_125: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_126 — 场景段126 (1B) */
export const SCRIPT_0x05_SCENE_126: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_127 — 场景段127 (1B) */
export const SCRIPT_0x05_SCENE_127: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_128 — 场景段128 (1B) */
export const SCRIPT_0x05_SCENE_128: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_129 — 场景段129 (1B) */
export const SCRIPT_0x05_SCENE_129: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_130 — 场景段130 (1B) */
export const SCRIPT_0x05_SCENE_130: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_131 — 场景段131 (1B) */
export const SCRIPT_0x05_SCENE_131: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_132 — 场景段132 (1B) */
export const SCRIPT_0x05_SCENE_132: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_133 — 场景段133 (1B) */
export const SCRIPT_0x05_SCENE_133: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_134 — 场景段134 (1B) */
export const SCRIPT_0x05_SCENE_134: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_135 — 场景段135 (1B) */
export const SCRIPT_0x05_SCENE_135: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_136 — 场景段136 (1B) */
export const SCRIPT_0x05_SCENE_136: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_137 — 场景段137 (1B) */
export const SCRIPT_0x05_SCENE_137: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_138 — 场景段138 (1B) */
export const SCRIPT_0x05_SCENE_138: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_139 — 场景段139 (1B) */
export const SCRIPT_0x05_SCENE_139: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_140 — 场景段140 (1B) */
export const SCRIPT_0x05_SCENE_140: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_141 — 场景段141 (1B) */
export const SCRIPT_0x05_SCENE_141: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_142 — 场景段142 (1B) */
export const SCRIPT_0x05_SCENE_142: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_143 — 场景段143 (1B) */
export const SCRIPT_0x05_SCENE_143: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_144 — 场景段144 (1B) */
export const SCRIPT_0x05_SCENE_144: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_145 — 场景段145 (1B) */
export const SCRIPT_0x05_SCENE_145: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_146 — 场景段146 (1B) */
export const SCRIPT_0x05_SCENE_146: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_147 — 场景段147 (1B) */
export const SCRIPT_0x05_SCENE_147: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_148 — 场景段148 (1B) */
export const SCRIPT_0x05_SCENE_148: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_149 — 场景段149 (1B) */
export const SCRIPT_0x05_SCENE_149: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_150 — 场景段150 (1B) */
export const SCRIPT_0x05_SCENE_150: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_151 — 场景段151 (1B) */
export const SCRIPT_0x05_SCENE_151: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_152 — 场景段152 (1B) */
export const SCRIPT_0x05_SCENE_152: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_153 — 场景段153 (1B) */
export const SCRIPT_0x05_SCENE_153: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_154 — 场景段154 (1B) */
export const SCRIPT_0x05_SCENE_154: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_155 — 场景段155 (1B) */
export const SCRIPT_0x05_SCENE_155: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_156 — 场景段156 (1B) */
export const SCRIPT_0x05_SCENE_156: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_157 — 场景段157 (1B) */
export const SCRIPT_0x05_SCENE_157: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_158 — 场景段158 (1B) */
export const SCRIPT_0x05_SCENE_158: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_159 — 场景段159 (1B) */
export const SCRIPT_0x05_SCENE_159: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_160 — 场景段160 (1B) */
export const SCRIPT_0x05_SCENE_160: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_161 — 场景段161 (1B) */
export const SCRIPT_0x05_SCENE_161: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_162 — 场景段162 (1B) */
export const SCRIPT_0x05_SCENE_162: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_163 — 场景段163 (1B) */
export const SCRIPT_0x05_SCENE_163: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_164 — 场景段164 (1B) */
export const SCRIPT_0x05_SCENE_164: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_165 — 场景段165 (1B) */
export const SCRIPT_0x05_SCENE_165: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_166 — 场景段166 (1B) */
export const SCRIPT_0x05_SCENE_166: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_167 — 场景段167 (1B) */
export const SCRIPT_0x05_SCENE_167: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_168 — 场景段168 (1B) */
export const SCRIPT_0x05_SCENE_168: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_169 — 场景段169 (1B) */
export const SCRIPT_0x05_SCENE_169: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_170 — 场景段170 (1B) */
export const SCRIPT_0x05_SCENE_170: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_171 — 场景段171 (1B) */
export const SCRIPT_0x05_SCENE_171: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_172 — 场景段172 (1B) */
export const SCRIPT_0x05_SCENE_172: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_173 — 场景段173 (1B) */
export const SCRIPT_0x05_SCENE_173: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_174 — 场景段174 (1B) */
export const SCRIPT_0x05_SCENE_174: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_175 — 场景段175 (1B) */
export const SCRIPT_0x05_SCENE_175: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_176 — 场景段176 (1B) */
export const SCRIPT_0x05_SCENE_176: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_177 — 场景段177 (1B) */
export const SCRIPT_0x05_SCENE_177: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_178 — 场景段178 (1B) */
export const SCRIPT_0x05_SCENE_178: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_179 — 场景段179 (1B) */
export const SCRIPT_0x05_SCENE_179: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_180 — 场景段180 (1B) */
export const SCRIPT_0x05_SCENE_180: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_181 — 场景段181 (1B) */
export const SCRIPT_0x05_SCENE_181: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_182 — 场景段182 (1B) */
export const SCRIPT_0x05_SCENE_182: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_183 — 场景段183 (1B) */
export const SCRIPT_0x05_SCENE_183: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_184 — 场景段184 (1B) */
export const SCRIPT_0x05_SCENE_184: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_185 — 场景段185 (1B) */
export const SCRIPT_0x05_SCENE_185: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_186 — 场景段186 (1B) */
export const SCRIPT_0x05_SCENE_186: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_187 — 场景段187 (1B) */
export const SCRIPT_0x05_SCENE_187: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_188 — 场景段188 (1B) */
export const SCRIPT_0x05_SCENE_188: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_189 — 场景段189 (1B) */
export const SCRIPT_0x05_SCENE_189: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_190 — 场景段190 (1B) */
export const SCRIPT_0x05_SCENE_190: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_191 — 场景段191 (1B) */
export const SCRIPT_0x05_SCENE_191: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_192 — 场景段192 (1B) */
export const SCRIPT_0x05_SCENE_192: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_193 — 场景段193 (1B) */
export const SCRIPT_0x05_SCENE_193: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_194 — 场景段194 (1B) */
export const SCRIPT_0x05_SCENE_194: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_195 — 场景段195 (1B) */
export const SCRIPT_0x05_SCENE_195: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_196 — 场景段196 (1B) */
export const SCRIPT_0x05_SCENE_196: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_197 — 场景段197 (1B) */
export const SCRIPT_0x05_SCENE_197: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_198 — 场景段198 (1B) */
export const SCRIPT_0x05_SCENE_198: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_199 — 场景段199 (1B) */
export const SCRIPT_0x05_SCENE_199: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_200 — 场景段200 (1B) */
export const SCRIPT_0x05_SCENE_200: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_201 — 场景段201 (1B) */
export const SCRIPT_0x05_SCENE_201: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_202 — 场景段202 (1B) */
export const SCRIPT_0x05_SCENE_202: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_203 — 场景段203 (1B) */
export const SCRIPT_0x05_SCENE_203: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_204 — 场景段204 (1B) */
export const SCRIPT_0x05_SCENE_204: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_205 — 场景段205 (1B) */
export const SCRIPT_0x05_SCENE_205: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_206 — 场景段206 (1B) */
export const SCRIPT_0x05_SCENE_206: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_207 — 场景段207 (1B) */
export const SCRIPT_0x05_SCENE_207: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_208 — 场景段208 (1B) */
export const SCRIPT_0x05_SCENE_208: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_209 — 场景段209 (1B) */
export const SCRIPT_0x05_SCENE_209: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_210 — 场景段210 (1B) */
export const SCRIPT_0x05_SCENE_210: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_211 — 场景段211 (1B) */
export const SCRIPT_0x05_SCENE_211: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_212 — 场景段212 (1B) */
export const SCRIPT_0x05_SCENE_212: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_213 — 场景段213 (1B) */
export const SCRIPT_0x05_SCENE_213: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_214 — 场景段214 (1B) */
export const SCRIPT_0x05_SCENE_214: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_215 — 场景段215 (1B) */
export const SCRIPT_0x05_SCENE_215: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_216 — 场景段216 (1B) */
export const SCRIPT_0x05_SCENE_216: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_217 — 场景段217 (1B) */
export const SCRIPT_0x05_SCENE_217: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_218 — 场景段218 (1B) */
export const SCRIPT_0x05_SCENE_218: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_219 — 场景段219 (1B) */
export const SCRIPT_0x05_SCENE_219: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_220 — 场景段220 (1B) */
export const SCRIPT_0x05_SCENE_220: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_221 — 场景段221 (1B) */
export const SCRIPT_0x05_SCENE_221: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_222 — 场景段222 (1B) */
export const SCRIPT_0x05_SCENE_222: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_223 — 场景段223 (1B) */
export const SCRIPT_0x05_SCENE_223: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_224 — 场景段224 (1B) */
export const SCRIPT_0x05_SCENE_224: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_225 — 场景段225 (1B) */
export const SCRIPT_0x05_SCENE_225: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_226 — 场景段226 (1B) */
export const SCRIPT_0x05_SCENE_226: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_227 — 场景段227 (1B) */
export const SCRIPT_0x05_SCENE_227: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_228 — 场景段228 (1B) */
export const SCRIPT_0x05_SCENE_228: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_229 — 场景段229 (1B) */
export const SCRIPT_0x05_SCENE_229: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_230 — 场景段230 (1B) */
export const SCRIPT_0x05_SCENE_230: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_231 — 场景段231 (1B) */
export const SCRIPT_0x05_SCENE_231: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_232 — 场景段232 (1B) */
export const SCRIPT_0x05_SCENE_232: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_233 — 场景段233 (1B) */
export const SCRIPT_0x05_SCENE_233: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_234 — 场景段234 (1B) */
export const SCRIPT_0x05_SCENE_234: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_235 — 场景段235 (1B) */
export const SCRIPT_0x05_SCENE_235: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_236 — 场景段236 (1B) */
export const SCRIPT_0x05_SCENE_236: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_237 — 场景段237 (1B) */
export const SCRIPT_0x05_SCENE_237: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_238 — 场景段238 (1B) */
export const SCRIPT_0x05_SCENE_238: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_239 — 场景段239 (1B) */
export const SCRIPT_0x05_SCENE_239: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_240 — 场景段240 (1B) */
export const SCRIPT_0x05_SCENE_240: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_241 — 场景段241 (1B) */
export const SCRIPT_0x05_SCENE_241: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_242 — 场景段242 (1B) */
export const SCRIPT_0x05_SCENE_242: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_243 — 场景段243 (1B) */
export const SCRIPT_0x05_SCENE_243: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_244 — 场景段244 (1B) */
export const SCRIPT_0x05_SCENE_244: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_245 — 场景段245 (1B) */
export const SCRIPT_0x05_SCENE_245: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_246 — 场景段246 (1B) */
export const SCRIPT_0x05_SCENE_246: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_247 — 场景段247 (1B) */
export const SCRIPT_0x05_SCENE_247: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_248 — 场景段248 (1B) */
export const SCRIPT_0x05_SCENE_248: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_249 — 场景段249 (1B) */
export const SCRIPT_0x05_SCENE_249: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_250 — 场景段250 (1B) */
export const SCRIPT_0x05_SCENE_250: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_251 — 场景段251 (1B) */
export const SCRIPT_0x05_SCENE_251: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_252 — 场景段252 (1B) */
export const SCRIPT_0x05_SCENE_252: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_253 — 场景段253 (1B) */
export const SCRIPT_0x05_SCENE_253: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_254 — 场景段254 (1B) */
export const SCRIPT_0x05_SCENE_254: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_255 — 场景段255 (1B) */
export const SCRIPT_0x05_SCENE_255: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_256 — 场景段256 (1B) */
export const SCRIPT_0x05_SCENE_256: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_257 — 场景段257 (1B) */
export const SCRIPT_0x05_SCENE_257: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_258 — 场景段258 (1B) */
export const SCRIPT_0x05_SCENE_258: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_259 — 场景段259 (1B) */
export const SCRIPT_0x05_SCENE_259: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_260 — 场景段260 (1B) */
export const SCRIPT_0x05_SCENE_260: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_261 — 场景段261 (1B) */
export const SCRIPT_0x05_SCENE_261: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_262 — 场景段262 (1B) */
export const SCRIPT_0x05_SCENE_262: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_263 — 场景段263 (1B) */
export const SCRIPT_0x05_SCENE_263: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_264 — 场景段264 (1B) */
export const SCRIPT_0x05_SCENE_264: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_265 — 场景段265 (1B) */
export const SCRIPT_0x05_SCENE_265: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_266 — 场景段266 (1B) */
export const SCRIPT_0x05_SCENE_266: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_267 — 场景段267 (1B) */
export const SCRIPT_0x05_SCENE_267: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_268 — 场景段268 (1B) */
export const SCRIPT_0x05_SCENE_268: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_269 — 场景段269 (1B) */
export const SCRIPT_0x05_SCENE_269: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_270 — 场景段270 (1B) */
export const SCRIPT_0x05_SCENE_270: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_271 — 场景段271 (1B) */
export const SCRIPT_0x05_SCENE_271: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_272 — 场景段272 (1B) */
export const SCRIPT_0x05_SCENE_272: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_273 — 场景段273 (1B) */
export const SCRIPT_0x05_SCENE_273: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_274 — 场景段274 (1B) */
export const SCRIPT_0x05_SCENE_274: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_275 — 场景段275 (1B) */
export const SCRIPT_0x05_SCENE_275: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_276 — 场景段276 (1B) */
export const SCRIPT_0x05_SCENE_276: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_277 — 场景段277 (1B) */
export const SCRIPT_0x05_SCENE_277: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_278 — 场景段278 (1B) */
export const SCRIPT_0x05_SCENE_278: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_279 — 场景段279 (1B) */
export const SCRIPT_0x05_SCENE_279: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_280 — 场景段280 (1B) */
export const SCRIPT_0x05_SCENE_280: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_281 — 场景段281 (1B) */
export const SCRIPT_0x05_SCENE_281: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_282 — 场景段282 (1B) */
export const SCRIPT_0x05_SCENE_282: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_283 — 场景段283 (1B) */
export const SCRIPT_0x05_SCENE_283: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_284 — 场景段284 (1B) */
export const SCRIPT_0x05_SCENE_284: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_285 — 场景段285 (1B) */
export const SCRIPT_0x05_SCENE_285: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_286 — 场景段286 (1B) */
export const SCRIPT_0x05_SCENE_286: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_287 — 场景段287 (1B) */
export const SCRIPT_0x05_SCENE_287: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_288 — 场景段288 (1B) */
export const SCRIPT_0x05_SCENE_288: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_289 — 场景段289 (1B) */
export const SCRIPT_0x05_SCENE_289: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_290 — 场景段290 (1B) */
export const SCRIPT_0x05_SCENE_290: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_291 — 场景段291 (1B) */
export const SCRIPT_0x05_SCENE_291: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_292 — 场景段292 (1B) */
export const SCRIPT_0x05_SCENE_292: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_293 — 场景段293 (1B) */
export const SCRIPT_0x05_SCENE_293: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_294 — 场景段294 (1B) */
export const SCRIPT_0x05_SCENE_294: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_295 — 场景段295 (1B) */
export const SCRIPT_0x05_SCENE_295: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_296 — 场景段296 (1B) */
export const SCRIPT_0x05_SCENE_296: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_297 — 场景段297 (1B) */
export const SCRIPT_0x05_SCENE_297: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_298 — 场景段298 (1B) */
export const SCRIPT_0x05_SCENE_298: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_299 — 场景段299 (1B) */
export const SCRIPT_0x05_SCENE_299: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_300 — 场景段300 (1B) */
export const SCRIPT_0x05_SCENE_300: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_301 — 场景段301 (1B) */
export const SCRIPT_0x05_SCENE_301: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_302 — 场景段302 (1B) */
export const SCRIPT_0x05_SCENE_302: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_303 — 场景段303 (1B) */
export const SCRIPT_0x05_SCENE_303: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_304 — 场景段304 (1B) */
export const SCRIPT_0x05_SCENE_304: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_305 — 场景段305 (1B) */
export const SCRIPT_0x05_SCENE_305: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_306 — 场景段306 (1B) */
export const SCRIPT_0x05_SCENE_306: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_307 — 场景段307 (1B) */
export const SCRIPT_0x05_SCENE_307: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_308 — 场景段308 (1B) */
export const SCRIPT_0x05_SCENE_308: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_309 — 场景段309 (1B) */
export const SCRIPT_0x05_SCENE_309: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_310 — 场景段310 (1B) */
export const SCRIPT_0x05_SCENE_310: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_311 — 场景段311 (1B) */
export const SCRIPT_0x05_SCENE_311: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_312 — 场景段312 (1B) */
export const SCRIPT_0x05_SCENE_312: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_313 — 场景段313 (1B) */
export const SCRIPT_0x05_SCENE_313: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_314 — 场景段314 (1B) */
export const SCRIPT_0x05_SCENE_314: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_315 — 场景段315 (1B) */
export const SCRIPT_0x05_SCENE_315: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_316 — 场景段316 (1B) */
export const SCRIPT_0x05_SCENE_316: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_317 — 场景段317 (1B) */
export const SCRIPT_0x05_SCENE_317: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_318 — 场景段318 (1B) */
export const SCRIPT_0x05_SCENE_318: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_319 — 场景段319 (1B) */
export const SCRIPT_0x05_SCENE_319: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_320 — 场景段320 (1B) */
export const SCRIPT_0x05_SCENE_320: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_321 — 场景段321 (1B) */
export const SCRIPT_0x05_SCENE_321: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_322 — 场景段322 (1B) */
export const SCRIPT_0x05_SCENE_322: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_323 — 场景段323 (1B) */
export const SCRIPT_0x05_SCENE_323: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_324 — 场景段324 (1B) */
export const SCRIPT_0x05_SCENE_324: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_325 — 场景段325 (1B) */
export const SCRIPT_0x05_SCENE_325: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_326 — 场景段326 (1B) */
export const SCRIPT_0x05_SCENE_326: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_327 — 场景段327 (1B) */
export const SCRIPT_0x05_SCENE_327: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_328 — 场景段328 (1B) */
export const SCRIPT_0x05_SCENE_328: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_329 — 场景段329 (1B) */
export const SCRIPT_0x05_SCENE_329: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_330 — 场景段330 (1B) */
export const SCRIPT_0x05_SCENE_330: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_331 — 场景段331 (1B) */
export const SCRIPT_0x05_SCENE_331: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_332 — 场景段332 (1B) */
export const SCRIPT_0x05_SCENE_332: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_333 — 场景段333 (1B) */
export const SCRIPT_0x05_SCENE_333: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_334 — 场景段334 (1B) */
export const SCRIPT_0x05_SCENE_334: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_335 — 场景段335 (1B) */
export const SCRIPT_0x05_SCENE_335: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_336 — 场景段336 (1B) */
export const SCRIPT_0x05_SCENE_336: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_337 — 场景段337 (1B) */
export const SCRIPT_0x05_SCENE_337: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_338 — 场景段338 (1B) */
export const SCRIPT_0x05_SCENE_338: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_339 — 场景段339 (1B) */
export const SCRIPT_0x05_SCENE_339: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_340 — 场景段340 (1B) */
export const SCRIPT_0x05_SCENE_340: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_341 — 场景段341 (1B) */
export const SCRIPT_0x05_SCENE_341: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_342 — 场景段342 (1B) */
export const SCRIPT_0x05_SCENE_342: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_343 — 场景段343 (1B) */
export const SCRIPT_0x05_SCENE_343: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_344 — 场景段344 (1B) */
export const SCRIPT_0x05_SCENE_344: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_345 — 场景段345 (1B) */
export const SCRIPT_0x05_SCENE_345: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_346 — 场景段346 (1B) */
export const SCRIPT_0x05_SCENE_346: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_347 — 场景段347 (1B) */
export const SCRIPT_0x05_SCENE_347: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_348 — 场景段348 (1B) */
export const SCRIPT_0x05_SCENE_348: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_349 — 场景段349 (1B) */
export const SCRIPT_0x05_SCENE_349: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_350 — 场景段350 (1B) */
export const SCRIPT_0x05_SCENE_350: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_351 — 场景段351 (1B) */
export const SCRIPT_0x05_SCENE_351: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_352 — 场景段352 (1B) */
export const SCRIPT_0x05_SCENE_352: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_353 — 场景段353 (1B) */
export const SCRIPT_0x05_SCENE_353: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_354 — 场景段354 (1B) */
export const SCRIPT_0x05_SCENE_354: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_355 — 场景段355 (1B) */
export const SCRIPT_0x05_SCENE_355: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_356 — 场景段356 (1B) */
export const SCRIPT_0x05_SCENE_356: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_357 — 场景段357 (1B) */
export const SCRIPT_0x05_SCENE_357: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_358 — 场景段358 (1B) */
export const SCRIPT_0x05_SCENE_358: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_359 — 场景段359 (1B) */
export const SCRIPT_0x05_SCENE_359: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_360 — 场景段360 (1B) */
export const SCRIPT_0x05_SCENE_360: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_361 — 场景段361 (1B) */
export const SCRIPT_0x05_SCENE_361: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_362 — 场景段362 (1B) */
export const SCRIPT_0x05_SCENE_362: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_363 — 场景段363 (1B) */
export const SCRIPT_0x05_SCENE_363: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_364 — 场景段364 (1B) */
export const SCRIPT_0x05_SCENE_364: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_365 — 场景段365 (1B) */
export const SCRIPT_0x05_SCENE_365: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_366 — 场景段366 (1B) */
export const SCRIPT_0x05_SCENE_366: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_367 — 场景段367 (1B) */
export const SCRIPT_0x05_SCENE_367: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_368 — 场景段368 (1B) */
export const SCRIPT_0x05_SCENE_368: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_369 — 场景段369 (1B) */
export const SCRIPT_0x05_SCENE_369: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_370 — 场景段370 (1B) */
export const SCRIPT_0x05_SCENE_370: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_371 — 场景段371 (1B) */
export const SCRIPT_0x05_SCENE_371: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_372 — 场景段372 (1B) */
export const SCRIPT_0x05_SCENE_372: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_373 — 场景段373 (1B) */
export const SCRIPT_0x05_SCENE_373: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_374 — 场景段374 (1B) */
export const SCRIPT_0x05_SCENE_374: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_375 — 场景段375 (1B) */
export const SCRIPT_0x05_SCENE_375: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_376 — 场景段376 (1B) */
export const SCRIPT_0x05_SCENE_376: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_377 — 场景段377 (1B) */
export const SCRIPT_0x05_SCENE_377: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_378 — 场景段378 (1B) */
export const SCRIPT_0x05_SCENE_378: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_379 — 场景段379 (1B) */
export const SCRIPT_0x05_SCENE_379: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_380 — 场景段380 (1B) */
export const SCRIPT_0x05_SCENE_380: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_381 — 场景段381 (1B) */
export const SCRIPT_0x05_SCENE_381: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_382 — 场景段382 (1B) */
export const SCRIPT_0x05_SCENE_382: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_383 — 场景段383 (1B) */
export const SCRIPT_0x05_SCENE_383: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_384 — 场景段384 (1B) */
export const SCRIPT_0x05_SCENE_384: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_385 — 场景段385 (1B) */
export const SCRIPT_0x05_SCENE_385: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_386 — 场景段386 (1B) */
export const SCRIPT_0x05_SCENE_386: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_387 — 场景段387 (1B) */
export const SCRIPT_0x05_SCENE_387: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_388 — 场景段388 (1B) */
export const SCRIPT_0x05_SCENE_388: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_389 — 场景段389 (1B) */
export const SCRIPT_0x05_SCENE_389: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_390 — 场景段390 (1B) */
export const SCRIPT_0x05_SCENE_390: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_391 — 场景段391 (1B) */
export const SCRIPT_0x05_SCENE_391: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_392 — 场景段392 (1B) */
export const SCRIPT_0x05_SCENE_392: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_393 — 场景段393 (1B) */
export const SCRIPT_0x05_SCENE_393: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_394 — 场景段394 (1B) */
export const SCRIPT_0x05_SCENE_394: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_395 — 场景段395 (1B) */
export const SCRIPT_0x05_SCENE_395: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_396 — 场景段396 (1B) */
export const SCRIPT_0x05_SCENE_396: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_397 — 场景段397 (1B) */
export const SCRIPT_0x05_SCENE_397: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_398 — 场景段398 (1B) */
export const SCRIPT_0x05_SCENE_398: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_399 — 场景段399 (1B) */
export const SCRIPT_0x05_SCENE_399: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_400 — 场景段400 (1B) */
export const SCRIPT_0x05_SCENE_400: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_401 — 场景段401 (1B) */
export const SCRIPT_0x05_SCENE_401: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_402 — 场景段402 (1B) */
export const SCRIPT_0x05_SCENE_402: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_403 — 场景段403 (1B) */
export const SCRIPT_0x05_SCENE_403: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_404 — 场景段404 (1B) */
export const SCRIPT_0x05_SCENE_404: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_405 — 场景段405 (1B) */
export const SCRIPT_0x05_SCENE_405: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_406 — 场景段406 (1B) */
export const SCRIPT_0x05_SCENE_406: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_407 — 场景段407 (1B) */
export const SCRIPT_0x05_SCENE_407: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_408 — 场景段408 (1B) */
export const SCRIPT_0x05_SCENE_408: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_409 — 场景段409 (1B) */
export const SCRIPT_0x05_SCENE_409: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_410 — 场景段410 (1B) */
export const SCRIPT_0x05_SCENE_410: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_411 — 场景段411 (1B) */
export const SCRIPT_0x05_SCENE_411: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_412 — 场景段412 (1B) */
export const SCRIPT_0x05_SCENE_412: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_413 — 场景段413 (1B) */
export const SCRIPT_0x05_SCENE_413: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_414 — 场景段414 (1B) */
export const SCRIPT_0x05_SCENE_414: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_415 — 场景段415 (1B) */
export const SCRIPT_0x05_SCENE_415: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_416 — 场景段416 (1B) */
export const SCRIPT_0x05_SCENE_416: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_417 — 场景段417 (1B) */
export const SCRIPT_0x05_SCENE_417: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_418 — 场景段418 (1B) */
export const SCRIPT_0x05_SCENE_418: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_419 — 场景段419 (1B) */
export const SCRIPT_0x05_SCENE_419: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_420 — 场景段420 (1B) */
export const SCRIPT_0x05_SCENE_420: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_421 — 场景段421 (1B) */
export const SCRIPT_0x05_SCENE_421: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_422 — 场景段422 (1B) */
export const SCRIPT_0x05_SCENE_422: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_423 — 场景段423 (1B) */
export const SCRIPT_0x05_SCENE_423: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_424 — 场景段424 (1B) */
export const SCRIPT_0x05_SCENE_424: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_425 — 场景段425 (1B) */
export const SCRIPT_0x05_SCENE_425: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_426 — 场景段426 (1B) */
export const SCRIPT_0x05_SCENE_426: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_427 — 场景段427 (1B) */
export const SCRIPT_0x05_SCENE_427: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_428 — 场景段428 (1B) */
export const SCRIPT_0x05_SCENE_428: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_429 — 场景段429 (1B) */
export const SCRIPT_0x05_SCENE_429: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_430 — 场景段430 (1B) */
export const SCRIPT_0x05_SCENE_430: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_431 — 场景段431 (1B) */
export const SCRIPT_0x05_SCENE_431: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_432 — 场景段432 (1B) */
export const SCRIPT_0x05_SCENE_432: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_433 — 场景段433 (1B) */
export const SCRIPT_0x05_SCENE_433: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_434 — 场景段434 (1B) */
export const SCRIPT_0x05_SCENE_434: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_435 — 场景段435 (1B) */
export const SCRIPT_0x05_SCENE_435: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_436 — 场景段436 (1B) */
export const SCRIPT_0x05_SCENE_436: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_437 — 场景段437 (1B) */
export const SCRIPT_0x05_SCENE_437: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_438 — 场景段438 (1B) */
export const SCRIPT_0x05_SCENE_438: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_439 — 场景段439 (1B) */
export const SCRIPT_0x05_SCENE_439: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_440 — 场景段440 (1B) */
export const SCRIPT_0x05_SCENE_440: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_441 — 场景段441 (1B) */
export const SCRIPT_0x05_SCENE_441: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_442 — 场景段442 (1B) */
export const SCRIPT_0x05_SCENE_442: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_443 — 场景段443 (1B) */
export const SCRIPT_0x05_SCENE_443: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_444 — 场景段444 (1B) */
export const SCRIPT_0x05_SCENE_444: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_445 — 场景段445 (1B) */
export const SCRIPT_0x05_SCENE_445: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_446 — 场景段446 (1B) */
export const SCRIPT_0x05_SCENE_446: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_447 — 场景段447 (1B) */
export const SCRIPT_0x05_SCENE_447: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_448 — 场景段448 (1B) */
export const SCRIPT_0x05_SCENE_448: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_449 — 场景段449 (1B) */
export const SCRIPT_0x05_SCENE_449: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_450 — 场景段450 (1B) */
export const SCRIPT_0x05_SCENE_450: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_451 — 场景段451 (1B) */
export const SCRIPT_0x05_SCENE_451: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_452 — 场景段452 (1B) */
export const SCRIPT_0x05_SCENE_452: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_453 — 场景段453 (1B) */
export const SCRIPT_0x05_SCENE_453: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_454 — 场景段454 (1B) */
export const SCRIPT_0x05_SCENE_454: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_455 — 场景段455 (1B) */
export const SCRIPT_0x05_SCENE_455: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_456 — 场景段456 (1B) */
export const SCRIPT_0x05_SCENE_456: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_457 — 场景段457 (1B) */
export const SCRIPT_0x05_SCENE_457: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_458 — 场景段458 (1B) */
export const SCRIPT_0x05_SCENE_458: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_459 — 场景段459 (1B) */
export const SCRIPT_0x05_SCENE_459: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_460 — 场景段460 (1B) */
export const SCRIPT_0x05_SCENE_460: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_461 — 场景段461 (1B) */
export const SCRIPT_0x05_SCENE_461: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_462 — 场景段462 (1B) */
export const SCRIPT_0x05_SCENE_462: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_463 — 场景段463 (1B) */
export const SCRIPT_0x05_SCENE_463: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_464 — 场景段464 (1B) */
export const SCRIPT_0x05_SCENE_464: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_465 — 场景段465 (1B) */
export const SCRIPT_0x05_SCENE_465: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_466 — 场景段466 (1B) */
export const SCRIPT_0x05_SCENE_466: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_467 — 场景段467 (1B) */
export const SCRIPT_0x05_SCENE_467: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_468 — 场景段468 (1B) */
export const SCRIPT_0x05_SCENE_468: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_469 — 场景段469 (1B) */
export const SCRIPT_0x05_SCENE_469: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_470 — 场景段470 (1B) */
export const SCRIPT_0x05_SCENE_470: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_471 — 场景段471 (1B) */
export const SCRIPT_0x05_SCENE_471: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_472 — 场景段472 (1B) */
export const SCRIPT_0x05_SCENE_472: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_473 — 场景段473 (1B) */
export const SCRIPT_0x05_SCENE_473: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_474 — 场景段474 (1B) */
export const SCRIPT_0x05_SCENE_474: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_475 — 场景段475 (1B) */
export const SCRIPT_0x05_SCENE_475: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_476 — 场景段476 (1B) */
export const SCRIPT_0x05_SCENE_476: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_477 — 场景段477 (1B) */
export const SCRIPT_0x05_SCENE_477: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_478 — 场景段478 (1B) */
export const SCRIPT_0x05_SCENE_478: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_479 — 场景段479 (1B) */
export const SCRIPT_0x05_SCENE_479: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_480 — 场景段480 (1B) */
export const SCRIPT_0x05_SCENE_480: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_481 — 场景段481 (1B) */
export const SCRIPT_0x05_SCENE_481: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_482 — 场景段482 (1B) */
export const SCRIPT_0x05_SCENE_482: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_483 — 场景段483 (1B) */
export const SCRIPT_0x05_SCENE_483: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_484 — 场景段484 (1B) */
export const SCRIPT_0x05_SCENE_484: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_485 — 场景段485 (1B) */
export const SCRIPT_0x05_SCENE_485: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_486 — 场景段486 (1B) */
export const SCRIPT_0x05_SCENE_486: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_487 — 场景段487 (1B) */
export const SCRIPT_0x05_SCENE_487: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_488 — 场景段488 (1B) */
export const SCRIPT_0x05_SCENE_488: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_489 — 场景段489 (1B) */
export const SCRIPT_0x05_SCENE_489: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_490 — 场景段490 (1B) */
export const SCRIPT_0x05_SCENE_490: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_491 — 场景段491 (1B) */
export const SCRIPT_0x05_SCENE_491: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_492 — 场景段492 (1B) */
export const SCRIPT_0x05_SCENE_492: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_493 — 场景段493 (1B) */
export const SCRIPT_0x05_SCENE_493: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_494 — 场景段494 (1B) */
export const SCRIPT_0x05_SCENE_494: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_495 — 场景段495 (1B) */
export const SCRIPT_0x05_SCENE_495: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_496 — 场景段496 (1B) */
export const SCRIPT_0x05_SCENE_496: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_497 — 场景段497 (1B) */
export const SCRIPT_0x05_SCENE_497: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_498 — 场景段498 (1B) */
export const SCRIPT_0x05_SCENE_498: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_499 — 场景段499 (1B) */
export const SCRIPT_0x05_SCENE_499: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_500 — 场景段500 (1B) */
export const SCRIPT_0x05_SCENE_500: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_501 — 场景段501 (1B) */
export const SCRIPT_0x05_SCENE_501: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_502 — 场景段502 (1B) */
export const SCRIPT_0x05_SCENE_502: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_503 — 场景段503 (1B) */
export const SCRIPT_0x05_SCENE_503: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_504 — 场景段504 (1B) */
export const SCRIPT_0x05_SCENE_504: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_505 — 场景段505 (1B) */
export const SCRIPT_0x05_SCENE_505: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_506 — 场景段506 (1B) */
export const SCRIPT_0x05_SCENE_506: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_507 — 场景段507 (1B) */
export const SCRIPT_0x05_SCENE_507: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_508 — 场景段508 (1B) */
export const SCRIPT_0x05_SCENE_508: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_509 — 场景段509 (1B) */
export const SCRIPT_0x05_SCENE_509: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_510 — 场景段510 (1B) */
export const SCRIPT_0x05_SCENE_510: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_511 — 场景段511 (1B) */
export const SCRIPT_0x05_SCENE_511: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_512 — 场景段512 (1B) */
export const SCRIPT_0x05_SCENE_512: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_513 — 场景段513 (1B) */
export const SCRIPT_0x05_SCENE_513: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_514 — 场景段514 (1B) */
export const SCRIPT_0x05_SCENE_514: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_515 — 场景段515 (1B) */
export const SCRIPT_0x05_SCENE_515: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_516 — 场景段516 (1B) */
export const SCRIPT_0x05_SCENE_516: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_517 — 场景段517 (1B) */
export const SCRIPT_0x05_SCENE_517: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_518 — 场景段518 (1B) */
export const SCRIPT_0x05_SCENE_518: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_519 — 场景段519 (1B) */
export const SCRIPT_0x05_SCENE_519: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_520 — 场景段520 (1B) */
export const SCRIPT_0x05_SCENE_520: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_521 — 场景段521 (1B) */
export const SCRIPT_0x05_SCENE_521: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_522 — 场景段522 (1B) */
export const SCRIPT_0x05_SCENE_522: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_523 — 场景段523 (1B) */
export const SCRIPT_0x05_SCENE_523: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_524 — 场景段524 (1B) */
export const SCRIPT_0x05_SCENE_524: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_525 — 场景段525 (1B) */
export const SCRIPT_0x05_SCENE_525: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_526 — 场景段526 (1B) */
export const SCRIPT_0x05_SCENE_526: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_527 — 场景段527 (1B) */
export const SCRIPT_0x05_SCENE_527: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_528 — 场景段528 (1B) */
export const SCRIPT_0x05_SCENE_528: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_529 — 场景段529 (1B) */
export const SCRIPT_0x05_SCENE_529: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_530 — 场景段530 (1B) */
export const SCRIPT_0x05_SCENE_530: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_531 — 场景段531 (1B) */
export const SCRIPT_0x05_SCENE_531: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_532 — 场景段532 (1B) */
export const SCRIPT_0x05_SCENE_532: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_533 — 场景段533 (1B) */
export const SCRIPT_0x05_SCENE_533: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_534 — 场景段534 (1B) */
export const SCRIPT_0x05_SCENE_534: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_535 — 场景段535 (1B) */
export const SCRIPT_0x05_SCENE_535: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_536 — 场景段536 (1B) */
export const SCRIPT_0x05_SCENE_536: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_537 — 场景段537 (1B) */
export const SCRIPT_0x05_SCENE_537: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_538 — 场景段538 (1B) */
export const SCRIPT_0x05_SCENE_538: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_539 — 场景段539 (1B) */
export const SCRIPT_0x05_SCENE_539: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_540 — 场景段540 (1B) */
export const SCRIPT_0x05_SCENE_540: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_541 — 场景段541 (1B) */
export const SCRIPT_0x05_SCENE_541: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_542 — 场景段542 (1B) */
export const SCRIPT_0x05_SCENE_542: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_543 — 场景段543 (1B) */
export const SCRIPT_0x05_SCENE_543: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_544 — 场景段544 (1B) */
export const SCRIPT_0x05_SCENE_544: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_545 — 场景段545 (1B) */
export const SCRIPT_0x05_SCENE_545: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_546 — 场景段546 (1B) */
export const SCRIPT_0x05_SCENE_546: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_547 — 场景段547 (1B) */
export const SCRIPT_0x05_SCENE_547: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_548 — 场景段548 (1B) */
export const SCRIPT_0x05_SCENE_548: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_549 — 场景段549 (1B) */
export const SCRIPT_0x05_SCENE_549: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_550 — 场景段550 (1B) */
export const SCRIPT_0x05_SCENE_550: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_551 — 场景段551 (1B) */
export const SCRIPT_0x05_SCENE_551: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_552 — 场景段552 (1B) */
export const SCRIPT_0x05_SCENE_552: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_553 — 场景段553 (1B) */
export const SCRIPT_0x05_SCENE_553: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_554 — 场景段554 (1B) */
export const SCRIPT_0x05_SCENE_554: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_555 — 场景段555 (1B) */
export const SCRIPT_0x05_SCENE_555: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_556 — 场景段556 (1B) */
export const SCRIPT_0x05_SCENE_556: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_557 — 场景段557 (1B) */
export const SCRIPT_0x05_SCENE_557: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_558 — 场景段558 (1B) */
export const SCRIPT_0x05_SCENE_558: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_559 — 场景段559 (1B) */
export const SCRIPT_0x05_SCENE_559: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_560 — 场景段560 (1B) */
export const SCRIPT_0x05_SCENE_560: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_561 — 场景段561 (1B) */
export const SCRIPT_0x05_SCENE_561: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_562 — 场景段562 (1B) */
export const SCRIPT_0x05_SCENE_562: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_563 — 场景段563 (1B) */
export const SCRIPT_0x05_SCENE_563: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_564 — 场景段564 (1B) */
export const SCRIPT_0x05_SCENE_564: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_565 — 场景段565 (1B) */
export const SCRIPT_0x05_SCENE_565: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_566 — 场景段566 (1B) */
export const SCRIPT_0x05_SCENE_566: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_567 — 场景段567 (1B) */
export const SCRIPT_0x05_SCENE_567: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_568 — 场景段568 (1B) */
export const SCRIPT_0x05_SCENE_568: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_569 — 场景段569 (1B) */
export const SCRIPT_0x05_SCENE_569: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_570 — 场景段570 (1B) */
export const SCRIPT_0x05_SCENE_570: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_571 — 场景段571 (1B) */
export const SCRIPT_0x05_SCENE_571: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_572 — 场景段572 (1B) */
export const SCRIPT_0x05_SCENE_572: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_573 — 场景段573 (1B) */
export const SCRIPT_0x05_SCENE_573: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_574 — 场景段574 (1B) */
export const SCRIPT_0x05_SCENE_574: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_575 — 场景段575 (1B) */
export const SCRIPT_0x05_SCENE_575: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_576 — 场景段576 (1B) */
export const SCRIPT_0x05_SCENE_576: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_577 — 场景段577 (1B) */
export const SCRIPT_0x05_SCENE_577: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_578 — 场景段578 (1B) */
export const SCRIPT_0x05_SCENE_578: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_579 — 场景段579 (1B) */
export const SCRIPT_0x05_SCENE_579: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_580 — 场景段580 (1B) */
export const SCRIPT_0x05_SCENE_580: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_581 — 场景段581 (1B) */
export const SCRIPT_0x05_SCENE_581: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_582 — 场景段582 (1B) */
export const SCRIPT_0x05_SCENE_582: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_583 — 场景段583 (1B) */
export const SCRIPT_0x05_SCENE_583: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_584 — 场景段584 (1B) */
export const SCRIPT_0x05_SCENE_584: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_585 — 场景段585 (1B) */
export const SCRIPT_0x05_SCENE_585: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_586 — 场景段586 (1B) */
export const SCRIPT_0x05_SCENE_586: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_587 — 场景段587 (1B) */
export const SCRIPT_0x05_SCENE_587: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_588 — 场景段588 (1B) */
export const SCRIPT_0x05_SCENE_588: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_589 — 场景段589 (1B) */
export const SCRIPT_0x05_SCENE_589: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_590 — 场景段590 (1B) */
export const SCRIPT_0x05_SCENE_590: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_591 — 场景段591 (1B) */
export const SCRIPT_0x05_SCENE_591: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_592 — 场景段592 (1B) */
export const SCRIPT_0x05_SCENE_592: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_593 — 场景段593 (1B) */
export const SCRIPT_0x05_SCENE_593: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_594 — 场景段594 (1B) */
export const SCRIPT_0x05_SCENE_594: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_595 — 场景段595 (1B) */
export const SCRIPT_0x05_SCENE_595: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_596 — 场景段596 (1B) */
export const SCRIPT_0x05_SCENE_596: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_597 — 场景段597 (1B) */
export const SCRIPT_0x05_SCENE_597: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_598 — 场景段598 (1B) */
export const SCRIPT_0x05_SCENE_598: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_599 — 场景段599 (1B) */
export const SCRIPT_0x05_SCENE_599: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_600 — 场景段600 (1B) */
export const SCRIPT_0x05_SCENE_600: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_601 — 场景段601 (1B) */
export const SCRIPT_0x05_SCENE_601: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_602 — 场景段602 (1B) */
export const SCRIPT_0x05_SCENE_602: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_603 — 场景段603 (1B) */
export const SCRIPT_0x05_SCENE_603: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_604 — 场景段604 (1B) */
export const SCRIPT_0x05_SCENE_604: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_605 — 场景段605 (1B) */
export const SCRIPT_0x05_SCENE_605: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_606 — 场景段606 (1B) */
export const SCRIPT_0x05_SCENE_606: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_607 — 场景段607 (1B) */
export const SCRIPT_0x05_SCENE_607: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_608 — 场景段608 (1B) */
export const SCRIPT_0x05_SCENE_608: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_609 — 场景段609 (1B) */
export const SCRIPT_0x05_SCENE_609: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_610 — 场景段610 (1B) */
export const SCRIPT_0x05_SCENE_610: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_611 — 场景段611 (1B) */
export const SCRIPT_0x05_SCENE_611: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_612 — 场景段612 (1B) */
export const SCRIPT_0x05_SCENE_612: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_613 — 场景段613 (1B) */
export const SCRIPT_0x05_SCENE_613: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_614 — 场景段614 (1B) */
export const SCRIPT_0x05_SCENE_614: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_615 — 场景段615 (1B) */
export const SCRIPT_0x05_SCENE_615: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_616 — 场景段616 (1B) */
export const SCRIPT_0x05_SCENE_616: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_617 — 场景段617 (1B) */
export const SCRIPT_0x05_SCENE_617: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_618 — 场景段618 (1B) */
export const SCRIPT_0x05_SCENE_618: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_619 — 场景段619 (1B) */
export const SCRIPT_0x05_SCENE_619: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_620 — 场景段620 (1B) */
export const SCRIPT_0x05_SCENE_620: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_621 — 场景段621 (1B) */
export const SCRIPT_0x05_SCENE_621: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_622 — 场景段622 (1B) */
export const SCRIPT_0x05_SCENE_622: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_623 — 场景段623 (1B) */
export const SCRIPT_0x05_SCENE_623: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_624 — 场景段624 (1B) */
export const SCRIPT_0x05_SCENE_624: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_625 — 场景段625 (1B) */
export const SCRIPT_0x05_SCENE_625: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_626 — 场景段626 (1B) */
export const SCRIPT_0x05_SCENE_626: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_627 — 场景段627 (1B) */
export const SCRIPT_0x05_SCENE_627: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_628 — 场景段628 (1B) */
export const SCRIPT_0x05_SCENE_628: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_629 — 场景段629 (1B) */
export const SCRIPT_0x05_SCENE_629: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_630 — 场景段630 (1B) */
export const SCRIPT_0x05_SCENE_630: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_631 — 场景段631 (1B) */
export const SCRIPT_0x05_SCENE_631: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_632 — 场景段632 (1B) */
export const SCRIPT_0x05_SCENE_632: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_633 — 场景段633 (1B) */
export const SCRIPT_0x05_SCENE_633: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_634 — 场景段634 (1B) */
export const SCRIPT_0x05_SCENE_634: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_635 — 场景段635 (1B) */
export const SCRIPT_0x05_SCENE_635: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_636 — 场景段636 (1B) */
export const SCRIPT_0x05_SCENE_636: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_637 — 场景段637 (1B) */
export const SCRIPT_0x05_SCENE_637: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_638 — 场景段638 (1B) */
export const SCRIPT_0x05_SCENE_638: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_639 — 场景段639 (1B) */
export const SCRIPT_0x05_SCENE_639: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_640 — 场景段640 (1B) */
export const SCRIPT_0x05_SCENE_640: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_641 — 场景段641 (1B) */
export const SCRIPT_0x05_SCENE_641: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_642 — 场景段642 (1B) */
export const SCRIPT_0x05_SCENE_642: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_643 — 场景段643 (1B) */
export const SCRIPT_0x05_SCENE_643: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_644 — 场景段644 (1B) */
export const SCRIPT_0x05_SCENE_644: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_645 — 场景段645 (1B) */
export const SCRIPT_0x05_SCENE_645: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_646 — 场景段646 (1B) */
export const SCRIPT_0x05_SCENE_646: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_647 — 场景段647 (1B) */
export const SCRIPT_0x05_SCENE_647: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_648 — 场景段648 (1B) */
export const SCRIPT_0x05_SCENE_648: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_649 — 场景段649 (1B) */
export const SCRIPT_0x05_SCENE_649: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_650 — 场景段650 (1B) */
export const SCRIPT_0x05_SCENE_650: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_651 — 场景段651 (1B) */
export const SCRIPT_0x05_SCENE_651: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_652 — 场景段652 (1B) */
export const SCRIPT_0x05_SCENE_652: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_653 — 场景段653 (1B) */
export const SCRIPT_0x05_SCENE_653: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_654 — 场景段654 (1B) */
export const SCRIPT_0x05_SCENE_654: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_655 — 场景段655 (1B) */
export const SCRIPT_0x05_SCENE_655: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_656 — 场景段656 (1B) */
export const SCRIPT_0x05_SCENE_656: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_657 — 场景段657 (1B) */
export const SCRIPT_0x05_SCENE_657: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_658 — 场景段658 (1B) */
export const SCRIPT_0x05_SCENE_658: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_659 — 场景段659 (1B) */
export const SCRIPT_0x05_SCENE_659: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_660 — 场景段660 (1B) */
export const SCRIPT_0x05_SCENE_660: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_661 — 场景段661 (1B) */
export const SCRIPT_0x05_SCENE_661: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_662 — 场景段662 (1B) */
export const SCRIPT_0x05_SCENE_662: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_663 — 场景段663 (1B) */
export const SCRIPT_0x05_SCENE_663: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_664 — 场景段664 (1B) */
export const SCRIPT_0x05_SCENE_664: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_665 — 场景段665 (1B) */
export const SCRIPT_0x05_SCENE_665: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_666 — 场景段666 (1B) */
export const SCRIPT_0x05_SCENE_666: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_667 — 场景段667 (1B) */
export const SCRIPT_0x05_SCENE_667: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_668 — 场景段668 (1B) */
export const SCRIPT_0x05_SCENE_668: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_669 — 场景段669 (1B) */
export const SCRIPT_0x05_SCENE_669: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_670 — 场景段670 (1B) */
export const SCRIPT_0x05_SCENE_670: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_671 — 场景段671 (1B) */
export const SCRIPT_0x05_SCENE_671: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_672 — 场景段672 (1B) */
export const SCRIPT_0x05_SCENE_672: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_673 — 场景段673 (1B) */
export const SCRIPT_0x05_SCENE_673: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_674 — 场景段674 (1B) */
export const SCRIPT_0x05_SCENE_674: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_675 — 场景段675 (1B) */
export const SCRIPT_0x05_SCENE_675: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_676 — 场景段676 (1B) */
export const SCRIPT_0x05_SCENE_676: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_677 — 场景段677 (1B) */
export const SCRIPT_0x05_SCENE_677: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_678 — 场景段678 (1B) */
export const SCRIPT_0x05_SCENE_678: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_679 — 场景段679 (1B) */
export const SCRIPT_0x05_SCENE_679: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_680 — 场景段680 (1B) */
export const SCRIPT_0x05_SCENE_680: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_681 — 场景段681 (1B) */
export const SCRIPT_0x05_SCENE_681: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_682 — 场景段682 (1B) */
export const SCRIPT_0x05_SCENE_682: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_683 — 场景段683 (1B) */
export const SCRIPT_0x05_SCENE_683: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_684 — 场景段684 (1B) */
export const SCRIPT_0x05_SCENE_684: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_685 — 场景段685 (1B) */
export const SCRIPT_0x05_SCENE_685: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_686 — 场景段686 (1B) */
export const SCRIPT_0x05_SCENE_686: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_687 — 场景段687 (1B) */
export const SCRIPT_0x05_SCENE_687: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_688 — 场景段688 (1B) */
export const SCRIPT_0x05_SCENE_688: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_689 — 场景段689 (1B) */
export const SCRIPT_0x05_SCENE_689: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_690 — 场景段690 (1B) */
export const SCRIPT_0x05_SCENE_690: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_691 — 场景段691 (1B) */
export const SCRIPT_0x05_SCENE_691: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_692 — 场景段692 (1B) */
export const SCRIPT_0x05_SCENE_692: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_693 — 场景段693 (1B) */
export const SCRIPT_0x05_SCENE_693: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_694 — 场景段694 (1B) */
export const SCRIPT_0x05_SCENE_694: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_695 — 场景段695 (1B) */
export const SCRIPT_0x05_SCENE_695: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_696 — 场景段696 (1B) */
export const SCRIPT_0x05_SCENE_696: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_697 — 场景段697 (1B) */
export const SCRIPT_0x05_SCENE_697: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_698 — 场景段698 (1B) */
export const SCRIPT_0x05_SCENE_698: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_699 — 场景段699 (1B) */
export const SCRIPT_0x05_SCENE_699: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_700 — 场景段700 (1B) */
export const SCRIPT_0x05_SCENE_700: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_701 — 场景段701 (1B) */
export const SCRIPT_0x05_SCENE_701: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_702 — 场景段702 (1B) */
export const SCRIPT_0x05_SCENE_702: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_703 — 场景段703 (1B) */
export const SCRIPT_0x05_SCENE_703: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_704 — 场景段704 (1B) */
export const SCRIPT_0x05_SCENE_704: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_705 — 场景段705 (1B) */
export const SCRIPT_0x05_SCENE_705: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_706 — 场景段706 (1B) */
export const SCRIPT_0x05_SCENE_706: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_707 — 场景段707 (1B) */
export const SCRIPT_0x05_SCENE_707: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_708 — 场景段708 (1B) */
export const SCRIPT_0x05_SCENE_708: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_709 — 场景段709 (1B) */
export const SCRIPT_0x05_SCENE_709: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_710 — 场景段710 (1B) */
export const SCRIPT_0x05_SCENE_710: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_711 — 场景段711 (1B) */
export const SCRIPT_0x05_SCENE_711: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_712 — 场景段712 (1B) */
export const SCRIPT_0x05_SCENE_712: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_713 — 场景段713 (1B) */
export const SCRIPT_0x05_SCENE_713: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_714 — 场景段714 (1B) */
export const SCRIPT_0x05_SCENE_714: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_715 — 场景段715 (1B) */
export const SCRIPT_0x05_SCENE_715: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_716 — 场景段716 (1B) */
export const SCRIPT_0x05_SCENE_716: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_717 — 场景段717 (1B) */
export const SCRIPT_0x05_SCENE_717: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_718 — 场景段718 (1B) */
export const SCRIPT_0x05_SCENE_718: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_719 — 场景段719 (1B) */
export const SCRIPT_0x05_SCENE_719: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_720 — 场景段720 (1B) */
export const SCRIPT_0x05_SCENE_720: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_721 — 场景段721 (1B) */
export const SCRIPT_0x05_SCENE_721: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_722 — 场景段722 (1B) */
export const SCRIPT_0x05_SCENE_722: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_723 — 场景段723 (1B) */
export const SCRIPT_0x05_SCENE_723: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_724 — 场景段724 (1B) */
export const SCRIPT_0x05_SCENE_724: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_725 — 场景段725 (1B) */
export const SCRIPT_0x05_SCENE_725: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_726 — 场景段726 (1B) */
export const SCRIPT_0x05_SCENE_726: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_727 — 场景段727 (1B) */
export const SCRIPT_0x05_SCENE_727: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_728 — 场景段728 (1B) */
export const SCRIPT_0x05_SCENE_728: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_729 — 场景段729 (1B) */
export const SCRIPT_0x05_SCENE_729: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_730 — 场景段730 (1B) */
export const SCRIPT_0x05_SCENE_730: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_731 — 场景段731 (1B) */
export const SCRIPT_0x05_SCENE_731: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_732 — 场景段732 (1B) */
export const SCRIPT_0x05_SCENE_732: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_733 — 场景段733 (1B) */
export const SCRIPT_0x05_SCENE_733: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_734 — 场景段734 (1B) */
export const SCRIPT_0x05_SCENE_734: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_735 — 场景段735 (1B) */
export const SCRIPT_0x05_SCENE_735: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_736 — 场景段736 (1B) */
export const SCRIPT_0x05_SCENE_736: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_737 — 场景段737 (1B) */
export const SCRIPT_0x05_SCENE_737: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_738 — 场景段738 (1B) */
export const SCRIPT_0x05_SCENE_738: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_739 — 场景段739 (1B) */
export const SCRIPT_0x05_SCENE_739: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_740 — 场景段740 (1B) */
export const SCRIPT_0x05_SCENE_740: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_741 — 场景段741 (1B) */
export const SCRIPT_0x05_SCENE_741: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_742 — 场景段742 (1B) */
export const SCRIPT_0x05_SCENE_742: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_743 — 场景段743 (1B) */
export const SCRIPT_0x05_SCENE_743: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_744 — 场景段744 (1B) */
export const SCRIPT_0x05_SCENE_744: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_745 — 场景段745 (1B) */
export const SCRIPT_0x05_SCENE_745: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_746 — 场景段746 (1B) */
export const SCRIPT_0x05_SCENE_746: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_747 — 场景段747 (1B) */
export const SCRIPT_0x05_SCENE_747: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_748 — 场景段748 (1B) */
export const SCRIPT_0x05_SCENE_748: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_749 — 场景段749 (1B) */
export const SCRIPT_0x05_SCENE_749: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_750 — 场景段750 (1B) */
export const SCRIPT_0x05_SCENE_750: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_751 — 场景段751 (1B) */
export const SCRIPT_0x05_SCENE_751: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_752 — 场景段752 (1B) */
export const SCRIPT_0x05_SCENE_752: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_753 — 场景段753 (1B) */
export const SCRIPT_0x05_SCENE_753: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_754 — 场景段754 (1B) */
export const SCRIPT_0x05_SCENE_754: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_755 — 场景段755 (1B) */
export const SCRIPT_0x05_SCENE_755: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_756 — 场景段756 (1B) */
export const SCRIPT_0x05_SCENE_756: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_757 — 场景段757 (1B) */
export const SCRIPT_0x05_SCENE_757: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_758 — 场景段758 (1B) */
export const SCRIPT_0x05_SCENE_758: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_759 — 场景段759 (1B) */
export const SCRIPT_0x05_SCENE_759: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_760 — 场景段760 (1B) */
export const SCRIPT_0x05_SCENE_760: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_761 — 场景段761 (1B) */
export const SCRIPT_0x05_SCENE_761: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_762 — 场景段762 (1B) */
export const SCRIPT_0x05_SCENE_762: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_763 — 场景段763 (1B) */
export const SCRIPT_0x05_SCENE_763: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_764 — 场景段764 (1B) */
export const SCRIPT_0x05_SCENE_764: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_765 — 场景段765 (1B) */
export const SCRIPT_0x05_SCENE_765: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_766 — 场景段766 (1B) */
export const SCRIPT_0x05_SCENE_766: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_767 — 场景段767 (1B) */
export const SCRIPT_0x05_SCENE_767: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_768 — 场景段768 (1B) */
export const SCRIPT_0x05_SCENE_768: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_769 — 场景段769 (1B) */
export const SCRIPT_0x05_SCENE_769: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_770 — 场景段770 (1B) */
export const SCRIPT_0x05_SCENE_770: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_771 — 场景段771 (1B) */
export const SCRIPT_0x05_SCENE_771: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_772 — 场景段772 (1B) */
export const SCRIPT_0x05_SCENE_772: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_773 — 场景段773 (1B) */
export const SCRIPT_0x05_SCENE_773: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_774 — 场景段774 (1B) */
export const SCRIPT_0x05_SCENE_774: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_775 — 场景段775 (1B) */
export const SCRIPT_0x05_SCENE_775: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_776 — 场景段776 (1B) */
export const SCRIPT_0x05_SCENE_776: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_777 — 场景段777 (1B) */
export const SCRIPT_0x05_SCENE_777: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_778 — 场景段778 (1B) */
export const SCRIPT_0x05_SCENE_778: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_779 — 场景段779 (1B) */
export const SCRIPT_0x05_SCENE_779: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_780 — 场景段780 (1B) */
export const SCRIPT_0x05_SCENE_780: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_781 — 场景段781 (1B) */
export const SCRIPT_0x05_SCENE_781: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_782 — 场景段782 (1B) */
export const SCRIPT_0x05_SCENE_782: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_783 — 场景段783 (1B) */
export const SCRIPT_0x05_SCENE_783: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_784 — 场景段784 (1B) */
export const SCRIPT_0x05_SCENE_784: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_785 — 场景段785 (1B) */
export const SCRIPT_0x05_SCENE_785: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_786 — 场景段786 (1B) */
export const SCRIPT_0x05_SCENE_786: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_787 — 场景段787 (1B) */
export const SCRIPT_0x05_SCENE_787: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_788 — 场景段788 (1B) */
export const SCRIPT_0x05_SCENE_788: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_789 — 场景段789 (1B) */
export const SCRIPT_0x05_SCENE_789: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_790 — 场景段790 (1B) */
export const SCRIPT_0x05_SCENE_790: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_791 — 场景段791 (1B) */
export const SCRIPT_0x05_SCENE_791: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_792 — 场景段792 (1B) */
export const SCRIPT_0x05_SCENE_792: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_793 — 场景段793 (1B) */
export const SCRIPT_0x05_SCENE_793: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_794 — 场景段794 (1B) */
export const SCRIPT_0x05_SCENE_794: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_795 — 场景段795 (1B) */
export const SCRIPT_0x05_SCENE_795: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_796 — 场景段796 (1B) */
export const SCRIPT_0x05_SCENE_796: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_797 — 场景段797 (1B) */
export const SCRIPT_0x05_SCENE_797: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_798 — 场景段798 (1B) */
export const SCRIPT_0x05_SCENE_798: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_799 — 场景段799 (1B) */
export const SCRIPT_0x05_SCENE_799: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_800 — 场景段800 (1B) */
export const SCRIPT_0x05_SCENE_800: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_801 — 场景段801 (1B) */
export const SCRIPT_0x05_SCENE_801: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_802 — 场景段802 (1B) */
export const SCRIPT_0x05_SCENE_802: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_803 — 场景段803 (1B) */
export const SCRIPT_0x05_SCENE_803: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_804 — 场景段804 (1B) */
export const SCRIPT_0x05_SCENE_804: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_805 — 场景段805 (1B) */
export const SCRIPT_0x05_SCENE_805: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_806 — 场景段806 (1B) */
export const SCRIPT_0x05_SCENE_806: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_807 — 场景段807 (1B) */
export const SCRIPT_0x05_SCENE_807: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_808 — 场景段808 (1B) */
export const SCRIPT_0x05_SCENE_808: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_809 — 场景段809 (1B) */
export const SCRIPT_0x05_SCENE_809: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_810 — 场景段810 (1B) */
export const SCRIPT_0x05_SCENE_810: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_811 — 场景段811 (1B) */
export const SCRIPT_0x05_SCENE_811: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_812 — 场景段812 (1B) */
export const SCRIPT_0x05_SCENE_812: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_813 — 场景段813 (1B) */
export const SCRIPT_0x05_SCENE_813: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_814 — 场景段814 (1B) */
export const SCRIPT_0x05_SCENE_814: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_815 — 场景段815 (1B) */
export const SCRIPT_0x05_SCENE_815: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_816 — 场景段816 (1B) */
export const SCRIPT_0x05_SCENE_816: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_817 — 场景段817 (1B) */
export const SCRIPT_0x05_SCENE_817: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_818 — 场景段818 (1B) */
export const SCRIPT_0x05_SCENE_818: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_819 — 场景段819 (1B) */
export const SCRIPT_0x05_SCENE_819: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_820 — 场景段820 (1B) */
export const SCRIPT_0x05_SCENE_820: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_821 — 场景段821 (1B) */
export const SCRIPT_0x05_SCENE_821: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_822 — 场景段822 (1B) */
export const SCRIPT_0x05_SCENE_822: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_823 — 场景段823 (1B) */
export const SCRIPT_0x05_SCENE_823: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_824 — 场景段824 (1B) */
export const SCRIPT_0x05_SCENE_824: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_825 — 场景段825 (1B) */
export const SCRIPT_0x05_SCENE_825: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_826 — 场景段826 (1B) */
export const SCRIPT_0x05_SCENE_826: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_827 — 场景段827 (1B) */
export const SCRIPT_0x05_SCENE_827: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_828 — 场景段828 (1B) */
export const SCRIPT_0x05_SCENE_828: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_829 — 场景段829 (1B) */
export const SCRIPT_0x05_SCENE_829: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_830 — 场景段830 (1B) */
export const SCRIPT_0x05_SCENE_830: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_831 — 场景段831 (1B) */
export const SCRIPT_0x05_SCENE_831: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_832 — 场景段832 (1B) */
export const SCRIPT_0x05_SCENE_832: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_833 — 场景段833 (1B) */
export const SCRIPT_0x05_SCENE_833: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_834 — 场景段834 (1B) */
export const SCRIPT_0x05_SCENE_834: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_835 — 场景段835 (1B) */
export const SCRIPT_0x05_SCENE_835: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_836 — 场景段836 (1B) */
export const SCRIPT_0x05_SCENE_836: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_837 — 场景段837 (1B) */
export const SCRIPT_0x05_SCENE_837: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_838 — 场景段838 (1B) */
export const SCRIPT_0x05_SCENE_838: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_839 — 场景段839 (1B) */
export const SCRIPT_0x05_SCENE_839: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_840 — 场景段840 (1B) */
export const SCRIPT_0x05_SCENE_840: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_841 — 场景段841 (1B) */
export const SCRIPT_0x05_SCENE_841: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_842 — 场景段842 (1B) */
export const SCRIPT_0x05_SCENE_842: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_843 — 场景段843 (1B) */
export const SCRIPT_0x05_SCENE_843: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_844 — 场景段844 (1B) */
export const SCRIPT_0x05_SCENE_844: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_845 — 场景段845 (1B) */
export const SCRIPT_0x05_SCENE_845: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_846 — 场景段846 (1B) */
export const SCRIPT_0x05_SCENE_846: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_847 — 场景段847 (1B) */
export const SCRIPT_0x05_SCENE_847: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_848 — 场景段848 (1B) */
export const SCRIPT_0x05_SCENE_848: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_849 — 场景段849 (1B) */
export const SCRIPT_0x05_SCENE_849: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_850 — 场景段850 (1B) */
export const SCRIPT_0x05_SCENE_850: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_851 — 场景段851 (1B) */
export const SCRIPT_0x05_SCENE_851: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_852 — 场景段852 (1B) */
export const SCRIPT_0x05_SCENE_852: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_853 — 场景段853 (1B) */
export const SCRIPT_0x05_SCENE_853: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_854 — 场景段854 (1B) */
export const SCRIPT_0x05_SCENE_854: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_855 — 场景段855 (1B) */
export const SCRIPT_0x05_SCENE_855: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_856 — 场景段856 (1B) */
export const SCRIPT_0x05_SCENE_856: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_857 — 场景段857 (1B) */
export const SCRIPT_0x05_SCENE_857: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_858 — 场景段858 (1B) */
export const SCRIPT_0x05_SCENE_858: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_859 — 场景段859 (1B) */
export const SCRIPT_0x05_SCENE_859: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_860 — 场景段860 (1B) */
export const SCRIPT_0x05_SCENE_860: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_861 — 场景段861 (1B) */
export const SCRIPT_0x05_SCENE_861: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_862 — 场景段862 (1B) */
export const SCRIPT_0x05_SCENE_862: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_863 — 场景段863 (1B) */
export const SCRIPT_0x05_SCENE_863: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_864 — 场景段864 (1B) */
export const SCRIPT_0x05_SCENE_864: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_865 — 场景段865 (1B) */
export const SCRIPT_0x05_SCENE_865: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_866 — 场景段866 (1B) */
export const SCRIPT_0x05_SCENE_866: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_867 — 场景段867 (1B) */
export const SCRIPT_0x05_SCENE_867: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_868 — 场景段868 (1B) */
export const SCRIPT_0x05_SCENE_868: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_869 — 场景段869 (1B) */
export const SCRIPT_0x05_SCENE_869: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_870 — 场景段870 (1B) */
export const SCRIPT_0x05_SCENE_870: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_871 — 场景段871 (1B) */
export const SCRIPT_0x05_SCENE_871: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_872 — 场景段872 (1B) */
export const SCRIPT_0x05_SCENE_872: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_873 — 场景段873 (1B) */
export const SCRIPT_0x05_SCENE_873: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_874 — 场景段874 (1B) */
export const SCRIPT_0x05_SCENE_874: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_875 — 场景段875 (1B) */
export const SCRIPT_0x05_SCENE_875: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_876 — 场景段876 (1B) */
export const SCRIPT_0x05_SCENE_876: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_877 — 场景段877 (1B) */
export const SCRIPT_0x05_SCENE_877: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_878 — 场景段878 (1B) */
export const SCRIPT_0x05_SCENE_878: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_879 — 场景段879 (1B) */
export const SCRIPT_0x05_SCENE_879: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_880 — 场景段880 (1B) */
export const SCRIPT_0x05_SCENE_880: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_881 — 场景段881 (1B) */
export const SCRIPT_0x05_SCENE_881: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_882 — 场景段882 (1B) */
export const SCRIPT_0x05_SCENE_882: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_883 — 场景段883 (1B) */
export const SCRIPT_0x05_SCENE_883: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_884 — 场景段884 (1B) */
export const SCRIPT_0x05_SCENE_884: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_885 — 场景段885 (1B) */
export const SCRIPT_0x05_SCENE_885: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_886 — 场景段886 (1B) */
export const SCRIPT_0x05_SCENE_886: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_887 — 场景段887 (1B) */
export const SCRIPT_0x05_SCENE_887: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_888 — 场景段888 (1B) */
export const SCRIPT_0x05_SCENE_888: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_889 — 场景段889 (1B) */
export const SCRIPT_0x05_SCENE_889: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_890 — 场景段890 (1B) */
export const SCRIPT_0x05_SCENE_890: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_891 — 场景段891 (1B) */
export const SCRIPT_0x05_SCENE_891: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_892 — 场景段892 (1B) */
export const SCRIPT_0x05_SCENE_892: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_893 — 场景段893 (1B) */
export const SCRIPT_0x05_SCENE_893: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_894 — 场景段894 (1B) */
export const SCRIPT_0x05_SCENE_894: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_895 — 场景段895 (1B) */
export const SCRIPT_0x05_SCENE_895: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_896 — 场景段896 (1B) */
export const SCRIPT_0x05_SCENE_896: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_897 — 场景段897 (1B) */
export const SCRIPT_0x05_SCENE_897: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_898 — 场景段898 (1B) */
export const SCRIPT_0x05_SCENE_898: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_899 — 场景段899 (1B) */
export const SCRIPT_0x05_SCENE_899: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_900 — 场景段900 (1B) */
export const SCRIPT_0x05_SCENE_900: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_901 — 场景段901 (1B) */
export const SCRIPT_0x05_SCENE_901: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_902 — 场景段902 (1B) */
export const SCRIPT_0x05_SCENE_902: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_903 — 场景段903 (1B) */
export const SCRIPT_0x05_SCENE_903: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_904 — 场景段904 (1B) */
export const SCRIPT_0x05_SCENE_904: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_905 — 场景段905 (1B) */
export const SCRIPT_0x05_SCENE_905: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_906 — 场景段906 (1B) */
export const SCRIPT_0x05_SCENE_906: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_907 — 场景段907 (1B) */
export const SCRIPT_0x05_SCENE_907: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_908 — 场景段908 (1B) */
export const SCRIPT_0x05_SCENE_908: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_909 — 场景段909 (1B) */
export const SCRIPT_0x05_SCENE_909: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_910 — 场景段910 (1B) */
export const SCRIPT_0x05_SCENE_910: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_911 — 场景段911 (1B) */
export const SCRIPT_0x05_SCENE_911: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_912 — 场景段912 (1B) */
export const SCRIPT_0x05_SCENE_912: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_913 — 场景段913 (1B) */
export const SCRIPT_0x05_SCENE_913: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_914 — 场景段914 (1B) */
export const SCRIPT_0x05_SCENE_914: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_915 — 场景段915 (1B) */
export const SCRIPT_0x05_SCENE_915: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_916 — 场景段916 (1B) */
export const SCRIPT_0x05_SCENE_916: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_917 — 场景段917 (1B) */
export const SCRIPT_0x05_SCENE_917: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_918 — 场景段918 (1B) */
export const SCRIPT_0x05_SCENE_918: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_919 — 场景段919 (1B) */
export const SCRIPT_0x05_SCENE_919: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_920 — 场景段920 (1B) */
export const SCRIPT_0x05_SCENE_920: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_921 — 场景段921 (1B) */
export const SCRIPT_0x05_SCENE_921: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_922 — 场景段922 (1B) */
export const SCRIPT_0x05_SCENE_922: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_923 — 场景段923 (1B) */
export const SCRIPT_0x05_SCENE_923: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_924 — 场景段924 (1B) */
export const SCRIPT_0x05_SCENE_924: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_925 — 场景段925 (1B) */
export const SCRIPT_0x05_SCENE_925: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_926 — 场景段926 (1B) */
export const SCRIPT_0x05_SCENE_926: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_927 — 场景段927 (1B) */
export const SCRIPT_0x05_SCENE_927: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_928 — 场景段928 (1B) */
export const SCRIPT_0x05_SCENE_928: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_929 — 场景段929 (1B) */
export const SCRIPT_0x05_SCENE_929: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_930 — 场景段930 (1B) */
export const SCRIPT_0x05_SCENE_930: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_931 — 场景段931 (1B) */
export const SCRIPT_0x05_SCENE_931: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_932 — 场景段932 (1B) */
export const SCRIPT_0x05_SCENE_932: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_933 — 场景段933 (1B) */
export const SCRIPT_0x05_SCENE_933: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_934 — 场景段934 (1B) */
export const SCRIPT_0x05_SCENE_934: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_935 — 场景段935 (1B) */
export const SCRIPT_0x05_SCENE_935: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_936 — 场景段936 (1B) */
export const SCRIPT_0x05_SCENE_936: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_937 — 场景段937 (1B) */
export const SCRIPT_0x05_SCENE_937: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_938 — 场景段938 (1B) */
export const SCRIPT_0x05_SCENE_938: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_939 — 场景段939 (1B) */
export const SCRIPT_0x05_SCENE_939: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_940 — 场景段940 (1B) */
export const SCRIPT_0x05_SCENE_940: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_941 — 场景段941 (1B) */
export const SCRIPT_0x05_SCENE_941: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_942 — 场景段942 (1B) */
export const SCRIPT_0x05_SCENE_942: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_943 — 场景段943 (1B) */
export const SCRIPT_0x05_SCENE_943: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_944 — 场景段944 (1B) */
export const SCRIPT_0x05_SCENE_944: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_945 — 场景段945 (1B) */
export const SCRIPT_0x05_SCENE_945: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_946 — 场景段946 (1B) */
export const SCRIPT_0x05_SCENE_946: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_947 — 场景段947 (1B) */
export const SCRIPT_0x05_SCENE_947: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_948 — 场景段948 (1B) */
export const SCRIPT_0x05_SCENE_948: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_949 — 场景段949 (1B) */
export const SCRIPT_0x05_SCENE_949: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_950 — 场景段950 (1B) */
export const SCRIPT_0x05_SCENE_950: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_951 — 场景段951 (1B) */
export const SCRIPT_0x05_SCENE_951: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_952 — 场景段952 (1B) */
export const SCRIPT_0x05_SCENE_952: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_953 — 场景段953 (1B) */
export const SCRIPT_0x05_SCENE_953: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_954 — 场景段954 (1B) */
export const SCRIPT_0x05_SCENE_954: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_955 — 场景段955 (1B) */
export const SCRIPT_0x05_SCENE_955: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_956 — 场景段956 (1B) */
export const SCRIPT_0x05_SCENE_956: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_957 — 场景段957 (1B) */
export const SCRIPT_0x05_SCENE_957: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_958 — 场景段958 (1B) */
export const SCRIPT_0x05_SCENE_958: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_959 — 场景段959 (1B) */
export const SCRIPT_0x05_SCENE_959: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_960 — 场景段960 (1B) */
export const SCRIPT_0x05_SCENE_960: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_961 — 场景段961 (1B) */
export const SCRIPT_0x05_SCENE_961: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_962 — 场景段962 (1B) */
export const SCRIPT_0x05_SCENE_962: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_963 — 场景段963 (1B) */
export const SCRIPT_0x05_SCENE_963: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_964 — 场景段964 (1B) */
export const SCRIPT_0x05_SCENE_964: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_965 — 场景段965 (1B) */
export const SCRIPT_0x05_SCENE_965: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_966 — 场景段966 (1B) */
export const SCRIPT_0x05_SCENE_966: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_967 — 场景段967 (1B) */
export const SCRIPT_0x05_SCENE_967: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_968 — 场景段968 (1B) */
export const SCRIPT_0x05_SCENE_968: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_969 — 场景段969 (1B) */
export const SCRIPT_0x05_SCENE_969: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_970 — 场景段970 (1B) */
export const SCRIPT_0x05_SCENE_970: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_971 — 场景段971 (1B) */
export const SCRIPT_0x05_SCENE_971: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_972 — 场景段972 (1B) */
export const SCRIPT_0x05_SCENE_972: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_973 — 场景段973 (1B) */
export const SCRIPT_0x05_SCENE_973: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_974 — 场景段974 (1B) */
export const SCRIPT_0x05_SCENE_974: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_975 — 场景段975 (1B) */
export const SCRIPT_0x05_SCENE_975: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_976 — 场景段976 (1B) */
export const SCRIPT_0x05_SCENE_976: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_977 — 场景段977 (1B) */
export const SCRIPT_0x05_SCENE_977: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_978 — 场景段978 (1B) */
export const SCRIPT_0x05_SCENE_978: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_979 — 场景段979 (1B) */
export const SCRIPT_0x05_SCENE_979: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_980 — 场景段980 (1B) */
export const SCRIPT_0x05_SCENE_980: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_981 — 场景段981 (1B) */
export const SCRIPT_0x05_SCENE_981: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_982 — 场景段982 (1B) */
export const SCRIPT_0x05_SCENE_982: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_983 — 场景段983 (1B) */
export const SCRIPT_0x05_SCENE_983: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_984 — 场景段984 (1B) */
export const SCRIPT_0x05_SCENE_984: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_985 — 场景段985 (1B) */
export const SCRIPT_0x05_SCENE_985: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_986 — 场景段986 (1B) */
export const SCRIPT_0x05_SCENE_986: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_987 — 场景段987 (1B) */
export const SCRIPT_0x05_SCENE_987: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_988 — 场景段988 (1B) */
export const SCRIPT_0x05_SCENE_988: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_989 — 场景段989 (1B) */
export const SCRIPT_0x05_SCENE_989: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_990 — 场景段990 (1B) */
export const SCRIPT_0x05_SCENE_990: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_991 — 场景段991 (1B) */
export const SCRIPT_0x05_SCENE_991: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_992 — 场景段992 (1B) */
export const SCRIPT_0x05_SCENE_992: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_993 — 场景段993 (1B) */
export const SCRIPT_0x05_SCENE_993: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_994 — 场景段994 (1B) */
export const SCRIPT_0x05_SCENE_994: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_995 — 场景段995 (1B) */
export const SCRIPT_0x05_SCENE_995: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_996 — 场景段996 (1B) */
export const SCRIPT_0x05_SCENE_996: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_997 — 场景段997 (1B) */
export const SCRIPT_0x05_SCENE_997: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_998 — 场景段998 (1B) */
export const SCRIPT_0x05_SCENE_998: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_999 — 场景段999 (1B) */
export const SCRIPT_0x05_SCENE_999: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1000 — 场景段1000 (1B) */
export const SCRIPT_0x05_SCENE_1000: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1001 — 场景段1001 (1B) */
export const SCRIPT_0x05_SCENE_1001: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1002 — 场景段1002 (1B) */
export const SCRIPT_0x05_SCENE_1002: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1003 — 场景段1003 (1B) */
export const SCRIPT_0x05_SCENE_1003: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1004 — 场景段1004 (1B) */
export const SCRIPT_0x05_SCENE_1004: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1005 — 场景段1005 (1B) */
export const SCRIPT_0x05_SCENE_1005: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1006 — 场景段1006 (1B) */
export const SCRIPT_0x05_SCENE_1006: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1007 — 场景段1007 (1B) */
export const SCRIPT_0x05_SCENE_1007: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1008 — 场景段1008 (1B) */
export const SCRIPT_0x05_SCENE_1008: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1009 — 场景段1009 (1B) */
export const SCRIPT_0x05_SCENE_1009: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1010 — 场景段1010 (1B) */
export const SCRIPT_0x05_SCENE_1010: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1011 — 场景段1011 (1B) */
export const SCRIPT_0x05_SCENE_1011: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1012 — 场景段1012 (1B) */
export const SCRIPT_0x05_SCENE_1012: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1013 — 场景段1013 (1B) */
export const SCRIPT_0x05_SCENE_1013: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1014 — 场景段1014 (1B) */
export const SCRIPT_0x05_SCENE_1014: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1015 — 场景段1015 (1B) */
export const SCRIPT_0x05_SCENE_1015: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1016 — 场景段1016 (1B) */
export const SCRIPT_0x05_SCENE_1016: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1017 — 场景段1017 (1B) */
export const SCRIPT_0x05_SCENE_1017: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1018 — 场景段1018 (1B) */
export const SCRIPT_0x05_SCENE_1018: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1019 — 场景段1019 (1B) */
export const SCRIPT_0x05_SCENE_1019: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1020 — 场景段1020 (1B) */
export const SCRIPT_0x05_SCENE_1020: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1021 — 场景段1021 (1B) */
export const SCRIPT_0x05_SCENE_1021: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1022 — 场景段1022 (1B) */
export const SCRIPT_0x05_SCENE_1022: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1023 — 场景段1023 (1B) */
export const SCRIPT_0x05_SCENE_1023: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1024 — 场景段1024 (1B) */
export const SCRIPT_0x05_SCENE_1024: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1025 — 场景段1025 (1B) */
export const SCRIPT_0x05_SCENE_1025: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1026 — 场景段1026 (1B) */
export const SCRIPT_0x05_SCENE_1026: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1027 — 场景段1027 (1B) */
export const SCRIPT_0x05_SCENE_1027: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1028 — 场景段1028 (1B) */
export const SCRIPT_0x05_SCENE_1028: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1029 — 场景段1029 (1B) */
export const SCRIPT_0x05_SCENE_1029: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1030 — 场景段1030 (1B) */
export const SCRIPT_0x05_SCENE_1030: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1031 — 场景段1031 (1B) */
export const SCRIPT_0x05_SCENE_1031: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1032 — 场景段1032 (1B) */
export const SCRIPT_0x05_SCENE_1032: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1033 — 场景段1033 (1B) */
export const SCRIPT_0x05_SCENE_1033: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1034 — 场景段1034 (1B) */
export const SCRIPT_0x05_SCENE_1034: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1035 — 场景段1035 (1B) */
export const SCRIPT_0x05_SCENE_1035: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1036 — 场景段1036 (1B) */
export const SCRIPT_0x05_SCENE_1036: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1037 — 场景段1037 (1B) */
export const SCRIPT_0x05_SCENE_1037: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1038 — 场景段1038 (1B) */
export const SCRIPT_0x05_SCENE_1038: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1039 — 场景段1039 (1B) */
export const SCRIPT_0x05_SCENE_1039: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1040 — 场景段1040 (1B) */
export const SCRIPT_0x05_SCENE_1040: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1041 — 场景段1041 (1B) */
export const SCRIPT_0x05_SCENE_1041: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1042 — 场景段1042 (1B) */
export const SCRIPT_0x05_SCENE_1042: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1043 — 场景段1043 (1B) */
export const SCRIPT_0x05_SCENE_1043: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1044 — 场景段1044 (1B) */
export const SCRIPT_0x05_SCENE_1044: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1045 — 场景段1045 (1B) */
export const SCRIPT_0x05_SCENE_1045: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1046 — 场景段1046 (1B) */
export const SCRIPT_0x05_SCENE_1046: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1047 — 场景段1047 (1B) */
export const SCRIPT_0x05_SCENE_1047: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1048 — 场景段1048 (1B) */
export const SCRIPT_0x05_SCENE_1048: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1049 — 场景段1049 (1B) */
export const SCRIPT_0x05_SCENE_1049: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1050 — 场景段1050 (1B) */
export const SCRIPT_0x05_SCENE_1050: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1051 — 场景段1051 (1B) */
export const SCRIPT_0x05_SCENE_1051: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1052 — 场景段1052 (1B) */
export const SCRIPT_0x05_SCENE_1052: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1053 — 场景段1053 (1B) */
export const SCRIPT_0x05_SCENE_1053: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1054 — 场景段1054 (1B) */
export const SCRIPT_0x05_SCENE_1054: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1055 — 场景段1055 (1B) */
export const SCRIPT_0x05_SCENE_1055: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1056 — 场景段1056 (1B) */
export const SCRIPT_0x05_SCENE_1056: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1057 — 场景段1057 (1B) */
export const SCRIPT_0x05_SCENE_1057: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1058 — 场景段1058 (1B) */
export const SCRIPT_0x05_SCENE_1058: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1059 — 场景段1059 (1B) */
export const SCRIPT_0x05_SCENE_1059: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1060 — 场景段1060 (1B) */
export const SCRIPT_0x05_SCENE_1060: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1061 — 场景段1061 (1B) */
export const SCRIPT_0x05_SCENE_1061: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1062 — 场景段1062 (1B) */
export const SCRIPT_0x05_SCENE_1062: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1063 — 场景段1063 (1B) */
export const SCRIPT_0x05_SCENE_1063: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1064 — 场景段1064 (1B) */
export const SCRIPT_0x05_SCENE_1064: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1065 — 场景段1065 (1B) */
export const SCRIPT_0x05_SCENE_1065: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1066 — 场景段1066 (1B) */
export const SCRIPT_0x05_SCENE_1066: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1067 — 场景段1067 (1B) */
export const SCRIPT_0x05_SCENE_1067: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1068 — 场景段1068 (1B) */
export const SCRIPT_0x05_SCENE_1068: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1069 — 场景段1069 (1B) */
export const SCRIPT_0x05_SCENE_1069: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1070 — 场景段1070 (1B) */
export const SCRIPT_0x05_SCENE_1070: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1071 — 场景段1071 (1B) */
export const SCRIPT_0x05_SCENE_1071: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1072 — 场景段1072 (1B) */
export const SCRIPT_0x05_SCENE_1072: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1073 — 场景段1073 (1B) */
export const SCRIPT_0x05_SCENE_1073: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1074 — 场景段1074 (1B) */
export const SCRIPT_0x05_SCENE_1074: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1075 — 场景段1075 (1B) */
export const SCRIPT_0x05_SCENE_1075: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1076 — 场景段1076 (1B) */
export const SCRIPT_0x05_SCENE_1076: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1077 — 场景段1077 (1B) */
export const SCRIPT_0x05_SCENE_1077: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1078 — 场景段1078 (1B) */
export const SCRIPT_0x05_SCENE_1078: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1079 — 场景段1079 (1B) */
export const SCRIPT_0x05_SCENE_1079: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1080 — 场景段1080 (1B) */
export const SCRIPT_0x05_SCENE_1080: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1081 — 场景段1081 (1B) */
export const SCRIPT_0x05_SCENE_1081: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1082 — 场景段1082 (1B) */
export const SCRIPT_0x05_SCENE_1082: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1083 — 场景段1083 (1B) */
export const SCRIPT_0x05_SCENE_1083: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1084 — 场景段1084 (1B) */
export const SCRIPT_0x05_SCENE_1084: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1085 — 场景段1085 (1B) */
export const SCRIPT_0x05_SCENE_1085: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1086 — 场景段1086 (1B) */
export const SCRIPT_0x05_SCENE_1086: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1087 — 场景段1087 (1B) */
export const SCRIPT_0x05_SCENE_1087: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1088 — 场景段1088 (1B) */
export const SCRIPT_0x05_SCENE_1088: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1089 — 场景段1089 (1B) */
export const SCRIPT_0x05_SCENE_1089: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1090 — 场景段1090 (1B) */
export const SCRIPT_0x05_SCENE_1090: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1091 — 场景段1091 (1B) */
export const SCRIPT_0x05_SCENE_1091: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1092 — 场景段1092 (1B) */
export const SCRIPT_0x05_SCENE_1092: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1093 — 场景段1093 (1B) */
export const SCRIPT_0x05_SCENE_1093: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1094 — 场景段1094 (1B) */
export const SCRIPT_0x05_SCENE_1094: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1095 — 场景段1095 (1B) */
export const SCRIPT_0x05_SCENE_1095: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1096 — 场景段1096 (1B) */
export const SCRIPT_0x05_SCENE_1096: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1097 — 场景段1097 (1B) */
export const SCRIPT_0x05_SCENE_1097: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1098 — 场景段1098 (1B) */
export const SCRIPT_0x05_SCENE_1098: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1099 — 场景段1099 (1B) */
export const SCRIPT_0x05_SCENE_1099: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1100 — 场景段1100 (1B) */
export const SCRIPT_0x05_SCENE_1100: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1101 — 场景段1101 (1B) */
export const SCRIPT_0x05_SCENE_1101: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1102 — 场景段1102 (1B) */
export const SCRIPT_0x05_SCENE_1102: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1103 — 场景段1103 (1B) */
export const SCRIPT_0x05_SCENE_1103: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1104 — 场景段1104 (1B) */
export const SCRIPT_0x05_SCENE_1104: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1105 — 场景段1105 (1B) */
export const SCRIPT_0x05_SCENE_1105: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1106 — 场景段1106 (1B) */
export const SCRIPT_0x05_SCENE_1106: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1107 — 场景段1107 (1B) */
export const SCRIPT_0x05_SCENE_1107: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1108 — 场景段1108 (1B) */
export const SCRIPT_0x05_SCENE_1108: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1109 — 场景段1109 (1B) */
export const SCRIPT_0x05_SCENE_1109: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1110 — 场景段1110 (1B) */
export const SCRIPT_0x05_SCENE_1110: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1111 — 场景段1111 (1B) */
export const SCRIPT_0x05_SCENE_1111: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1112 — 场景段1112 (1B) */
export const SCRIPT_0x05_SCENE_1112: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1113 — 场景段1113 (1B) */
export const SCRIPT_0x05_SCENE_1113: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1114 — 场景段1114 (1B) */
export const SCRIPT_0x05_SCENE_1114: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1115 — 场景段1115 (1B) */
export const SCRIPT_0x05_SCENE_1115: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1116 — 场景段1116 (1B) */
export const SCRIPT_0x05_SCENE_1116: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1117 — 场景段1117 (1B) */
export const SCRIPT_0x05_SCENE_1117: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1118 — 场景段1118 (1B) */
export const SCRIPT_0x05_SCENE_1118: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1119 — 场景段1119 (1B) */
export const SCRIPT_0x05_SCENE_1119: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1120 — 场景段1120 (1B) */
export const SCRIPT_0x05_SCENE_1120: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1121 — 场景段1121 (1B) */
export const SCRIPT_0x05_SCENE_1121: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1122 — 场景段1122 (1B) */
export const SCRIPT_0x05_SCENE_1122: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1123 — 场景段1123 (1B) */
export const SCRIPT_0x05_SCENE_1123: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1124 — 场景段1124 (1B) */
export const SCRIPT_0x05_SCENE_1124: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1125 — 场景段1125 (1B) */
export const SCRIPT_0x05_SCENE_1125: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1126 — 场景段1126 (1B) */
export const SCRIPT_0x05_SCENE_1126: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1127 — 场景段1127 (1B) */
export const SCRIPT_0x05_SCENE_1127: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1128 — 场景段1128 (1B) */
export const SCRIPT_0x05_SCENE_1128: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1129 — 场景段1129 (1B) */
export const SCRIPT_0x05_SCENE_1129: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1130 — 场景段1130 (1B) */
export const SCRIPT_0x05_SCENE_1130: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1131 — 场景段1131 (1B) */
export const SCRIPT_0x05_SCENE_1131: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1132 — 场景段1132 (1B) */
export const SCRIPT_0x05_SCENE_1132: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1133 — 场景段1133 (1B) */
export const SCRIPT_0x05_SCENE_1133: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1134 — 场景段1134 (1B) */
export const SCRIPT_0x05_SCENE_1134: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1135 — 场景段1135 (1B) */
export const SCRIPT_0x05_SCENE_1135: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1136 — 场景段1136 (1B) */
export const SCRIPT_0x05_SCENE_1136: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1137 — 场景段1137 (1B) */
export const SCRIPT_0x05_SCENE_1137: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1138 — 场景段1138 (1B) */
export const SCRIPT_0x05_SCENE_1138: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1139 — 场景段1139 (1B) */
export const SCRIPT_0x05_SCENE_1139: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1140 — 场景段1140 (1B) */
export const SCRIPT_0x05_SCENE_1140: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1141 — 场景段1141 (1B) */
export const SCRIPT_0x05_SCENE_1141: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1142 — 场景段1142 (1B) */
export const SCRIPT_0x05_SCENE_1142: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1143 — 场景段1143 (1B) */
export const SCRIPT_0x05_SCENE_1143: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1144 — 场景段1144 (1B) */
export const SCRIPT_0x05_SCENE_1144: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1145 — 场景段1145 (1B) */
export const SCRIPT_0x05_SCENE_1145: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1146 — 场景段1146 (1B) */
export const SCRIPT_0x05_SCENE_1146: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1147 — 场景段1147 (1B) */
export const SCRIPT_0x05_SCENE_1147: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1148 — 场景段1148 (1B) */
export const SCRIPT_0x05_SCENE_1148: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1149 — 场景段1149 (1B) */
export const SCRIPT_0x05_SCENE_1149: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1150 — 场景段1150 (1B) */
export const SCRIPT_0x05_SCENE_1150: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1151 — 场景段1151 (1B) */
export const SCRIPT_0x05_SCENE_1151: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1152 — 场景段1152 (1B) */
export const SCRIPT_0x05_SCENE_1152: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1153 — 场景段1153 (1B) */
export const SCRIPT_0x05_SCENE_1153: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1154 — 场景段1154 (1B) */
export const SCRIPT_0x05_SCENE_1154: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1155 — 场景段1155 (1B) */
export const SCRIPT_0x05_SCENE_1155: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1156 — 场景段1156 (1B) */
export const SCRIPT_0x05_SCENE_1156: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1157 — 场景段1157 (1B) */
export const SCRIPT_0x05_SCENE_1157: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1158 — 场景段1158 (1B) */
export const SCRIPT_0x05_SCENE_1158: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1159 — 场景段1159 (1B) */
export const SCRIPT_0x05_SCENE_1159: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1160 — 场景段1160 (1B) */
export const SCRIPT_0x05_SCENE_1160: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1161 — 场景段1161 (1B) */
export const SCRIPT_0x05_SCENE_1161: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1162 — 场景段1162 (1B) */
export const SCRIPT_0x05_SCENE_1162: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1163 — 场景段1163 (1B) */
export const SCRIPT_0x05_SCENE_1163: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1164 — 场景段1164 (1B) */
export const SCRIPT_0x05_SCENE_1164: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1165 — 场景段1165 (1B) */
export const SCRIPT_0x05_SCENE_1165: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1166 — 场景段1166 (1B) */
export const SCRIPT_0x05_SCENE_1166: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1167 — 场景段1167 (1B) */
export const SCRIPT_0x05_SCENE_1167: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1168 — 场景段1168 (1B) */
export const SCRIPT_0x05_SCENE_1168: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1169 — 场景段1169 (1B) */
export const SCRIPT_0x05_SCENE_1169: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1170 — 场景段1170 (1B) */
export const SCRIPT_0x05_SCENE_1170: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1171 — 场景段1171 (1B) */
export const SCRIPT_0x05_SCENE_1171: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1172 — 场景段1172 (1B) */
export const SCRIPT_0x05_SCENE_1172: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1173 — 场景段1173 (1B) */
export const SCRIPT_0x05_SCENE_1173: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1174 — 场景段1174 (1B) */
export const SCRIPT_0x05_SCENE_1174: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1175 — 场景段1175 (1B) */
export const SCRIPT_0x05_SCENE_1175: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1176 — 场景段1176 (1B) */
export const SCRIPT_0x05_SCENE_1176: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1177 — 场景段1177 (1B) */
export const SCRIPT_0x05_SCENE_1177: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1178 — 场景段1178 (1B) */
export const SCRIPT_0x05_SCENE_1178: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1179 — 场景段1179 (1B) */
export const SCRIPT_0x05_SCENE_1179: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1180 — 场景段1180 (1B) */
export const SCRIPT_0x05_SCENE_1180: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1181 — 场景段1181 (1B) */
export const SCRIPT_0x05_SCENE_1181: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1182 — 场景段1182 (1B) */
export const SCRIPT_0x05_SCENE_1182: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1183 — 场景段1183 (1B) */
export const SCRIPT_0x05_SCENE_1183: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1184 — 场景段1184 (1B) */
export const SCRIPT_0x05_SCENE_1184: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1185 — 场景段1185 (1B) */
export const SCRIPT_0x05_SCENE_1185: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1186 — 场景段1186 (1B) */
export const SCRIPT_0x05_SCENE_1186: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1187 — 场景段1187 (1B) */
export const SCRIPT_0x05_SCENE_1187: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1188 — 场景段1188 (1B) */
export const SCRIPT_0x05_SCENE_1188: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1189 — 场景段1189 (1B) */
export const SCRIPT_0x05_SCENE_1189: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1190 — 场景段1190 (1B) */
export const SCRIPT_0x05_SCENE_1190: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1191 — 场景段1191 (1B) */
export const SCRIPT_0x05_SCENE_1191: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1192 — 场景段1192 (1B) */
export const SCRIPT_0x05_SCENE_1192: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1193 — 场景段1193 (1B) */
export const SCRIPT_0x05_SCENE_1193: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1194 — 场景段1194 (1B) */
export const SCRIPT_0x05_SCENE_1194: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1195 — 场景段1195 (1B) */
export const SCRIPT_0x05_SCENE_1195: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1196 — 场景段1196 (1B) */
export const SCRIPT_0x05_SCENE_1196: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1197 — 场景段1197 (1B) */
export const SCRIPT_0x05_SCENE_1197: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1198 — 场景段1198 (1B) */
export const SCRIPT_0x05_SCENE_1198: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1199 — 场景段1199 (1B) */
export const SCRIPT_0x05_SCENE_1199: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1200 — 场景段1200 (1B) */
export const SCRIPT_0x05_SCENE_1200: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1201 — 场景段1201 (1B) */
export const SCRIPT_0x05_SCENE_1201: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1202 — 场景段1202 (1B) */
export const SCRIPT_0x05_SCENE_1202: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1203 — 场景段1203 (1B) */
export const SCRIPT_0x05_SCENE_1203: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1204 — 场景段1204 (1B) */
export const SCRIPT_0x05_SCENE_1204: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1205 — 场景段1205 (1B) */
export const SCRIPT_0x05_SCENE_1205: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1206 — 场景段1206 (1B) */
export const SCRIPT_0x05_SCENE_1206: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1207 — 场景段1207 (1B) */
export const SCRIPT_0x05_SCENE_1207: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1208 — 场景段1208 (1B) */
export const SCRIPT_0x05_SCENE_1208: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1209 — 场景段1209 (1B) */
export const SCRIPT_0x05_SCENE_1209: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1210 — 场景段1210 (1B) */
export const SCRIPT_0x05_SCENE_1210: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1211 — 场景段1211 (1B) */
export const SCRIPT_0x05_SCENE_1211: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1212 — 场景段1212 (1B) */
export const SCRIPT_0x05_SCENE_1212: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1213 — 场景段1213 (1B) */
export const SCRIPT_0x05_SCENE_1213: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1214 — 场景段1214 (1B) */
export const SCRIPT_0x05_SCENE_1214: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1215 — 场景段1215 (1B) */
export const SCRIPT_0x05_SCENE_1215: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1216 — 场景段1216 (1B) */
export const SCRIPT_0x05_SCENE_1216: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1217 — 场景段1217 (1B) */
export const SCRIPT_0x05_SCENE_1217: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1218 — 场景段1218 (1B) */
export const SCRIPT_0x05_SCENE_1218: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1219 — 场景段1219 (1B) */
export const SCRIPT_0x05_SCENE_1219: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1220 — 场景段1220 (1B) */
export const SCRIPT_0x05_SCENE_1220: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1221 — 场景段1221 (1B) */
export const SCRIPT_0x05_SCENE_1221: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1222 — 场景段1222 (1B) */
export const SCRIPT_0x05_SCENE_1222: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1223 — 场景段1223 (1B) */
export const SCRIPT_0x05_SCENE_1223: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1224 — 场景段1224 (1B) */
export const SCRIPT_0x05_SCENE_1224: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1225 — 场景段1225 (1B) */
export const SCRIPT_0x05_SCENE_1225: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1226 — 场景段1226 (1B) */
export const SCRIPT_0x05_SCENE_1226: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1227 — 场景段1227 (1B) */
export const SCRIPT_0x05_SCENE_1227: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1228 — 场景段1228 (1B) */
export const SCRIPT_0x05_SCENE_1228: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1229 — 场景段1229 (1B) */
export const SCRIPT_0x05_SCENE_1229: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1230 — 场景段1230 (1B) */
export const SCRIPT_0x05_SCENE_1230: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1231 — 场景段1231 (1B) */
export const SCRIPT_0x05_SCENE_1231: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1232 — 场景段1232 (1B) */
export const SCRIPT_0x05_SCENE_1232: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1233 — 场景段1233 (1B) */
export const SCRIPT_0x05_SCENE_1233: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1234 — 场景段1234 (1B) */
export const SCRIPT_0x05_SCENE_1234: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1235 — 场景段1235 (1B) */
export const SCRIPT_0x05_SCENE_1235: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1236 — 场景段1236 (1B) */
export const SCRIPT_0x05_SCENE_1236: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1237 — 场景段1237 (1B) */
export const SCRIPT_0x05_SCENE_1237: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1238 — 场景段1238 (1B) */
export const SCRIPT_0x05_SCENE_1238: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1239 — 场景段1239 (1B) */
export const SCRIPT_0x05_SCENE_1239: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1240 — 场景段1240 (1B) */
export const SCRIPT_0x05_SCENE_1240: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1241 — 场景段1241 (1B) */
export const SCRIPT_0x05_SCENE_1241: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1242 — 场景段1242 (1B) */
export const SCRIPT_0x05_SCENE_1242: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1243 — 场景段1243 (1B) */
export const SCRIPT_0x05_SCENE_1243: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1244 — 场景段1244 (1B) */
export const SCRIPT_0x05_SCENE_1244: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1245 — 场景段1245 (1B) */
export const SCRIPT_0x05_SCENE_1245: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1246 — 场景段1246 (1B) */
export const SCRIPT_0x05_SCENE_1246: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1247 — 场景段1247 (1B) */
export const SCRIPT_0x05_SCENE_1247: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1248 — 场景段1248 (1B) */
export const SCRIPT_0x05_SCENE_1248: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1249 — 场景段1249 (1B) */
export const SCRIPT_0x05_SCENE_1249: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1250 — 场景段1250 (1B) */
export const SCRIPT_0x05_SCENE_1250: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1251 — 场景段1251 (1B) */
export const SCRIPT_0x05_SCENE_1251: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1252 — 场景段1252 (1B) */
export const SCRIPT_0x05_SCENE_1252: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1253 — 场景段1253 (1B) */
export const SCRIPT_0x05_SCENE_1253: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1254 — 场景段1254 (1B) */
export const SCRIPT_0x05_SCENE_1254: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1255 — 场景段1255 (1B) */
export const SCRIPT_0x05_SCENE_1255: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1256 — 场景段1256 (1B) */
export const SCRIPT_0x05_SCENE_1256: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1257 — 场景段1257 (1B) */
export const SCRIPT_0x05_SCENE_1257: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1258 — 场景段1258 (1B) */
export const SCRIPT_0x05_SCENE_1258: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1259 — 场景段1259 (1B) */
export const SCRIPT_0x05_SCENE_1259: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1260 — 场景段1260 (1B) */
export const SCRIPT_0x05_SCENE_1260: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1261 — 场景段1261 (1B) */
export const SCRIPT_0x05_SCENE_1261: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1262 — 场景段1262 (1B) */
export const SCRIPT_0x05_SCENE_1262: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1263 — 场景段1263 (1B) */
export const SCRIPT_0x05_SCENE_1263: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1264 — 场景段1264 (1B) */
export const SCRIPT_0x05_SCENE_1264: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1265 — 场景段1265 (1B) */
export const SCRIPT_0x05_SCENE_1265: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1266 — 场景段1266 (1B) */
export const SCRIPT_0x05_SCENE_1266: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1267 — 场景段1267 (1B) */
export const SCRIPT_0x05_SCENE_1267: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1268 — 场景段1268 (1B) */
export const SCRIPT_0x05_SCENE_1268: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1269 — 场景段1269 (1B) */
export const SCRIPT_0x05_SCENE_1269: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1270 — 场景段1270 (1B) */
export const SCRIPT_0x05_SCENE_1270: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1271 — 场景段1271 (1B) */
export const SCRIPT_0x05_SCENE_1271: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1272 — 场景段1272 (1B) */
export const SCRIPT_0x05_SCENE_1272: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1273 — 场景段1273 (1B) */
export const SCRIPT_0x05_SCENE_1273: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1274 — 场景段1274 (1B) */
export const SCRIPT_0x05_SCENE_1274: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1275 — 场景段1275 (1B) */
export const SCRIPT_0x05_SCENE_1275: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1276 — 场景段1276 (1B) */
export const SCRIPT_0x05_SCENE_1276: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1277 — 场景段1277 (1B) */
export const SCRIPT_0x05_SCENE_1277: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1278 — 场景段1278 (1B) */
export const SCRIPT_0x05_SCENE_1278: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1279 — 场景段1279 (1B) */
export const SCRIPT_0x05_SCENE_1279: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1280 — 场景段1280 (1B) */
export const SCRIPT_0x05_SCENE_1280: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1281 — 场景段1281 (1B) */
export const SCRIPT_0x05_SCENE_1281: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1282 — 场景段1282 (1B) */
export const SCRIPT_0x05_SCENE_1282: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1283 — 场景段1283 (1B) */
export const SCRIPT_0x05_SCENE_1283: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1284 — 场景段1284 (1B) */
export const SCRIPT_0x05_SCENE_1284: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1285 — 场景段1285 (1B) */
export const SCRIPT_0x05_SCENE_1285: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1286 — 场景段1286 (1B) */
export const SCRIPT_0x05_SCENE_1286: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1287 — 场景段1287 (1B) */
export const SCRIPT_0x05_SCENE_1287: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1288 — 场景段1288 (1B) */
export const SCRIPT_0x05_SCENE_1288: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1289 — 场景段1289 (1B) */
export const SCRIPT_0x05_SCENE_1289: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1290 — 场景段1290 (1B) */
export const SCRIPT_0x05_SCENE_1290: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1291 — 场景段1291 (1B) */
export const SCRIPT_0x05_SCENE_1291: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1292 — 场景段1292 (1B) */
export const SCRIPT_0x05_SCENE_1292: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1293 — 场景段1293 (1B) */
export const SCRIPT_0x05_SCENE_1293: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1294 — 场景段1294 (1B) */
export const SCRIPT_0x05_SCENE_1294: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1295 — 场景段1295 (1B) */
export const SCRIPT_0x05_SCENE_1295: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1296 — 场景段1296 (1B) */
export const SCRIPT_0x05_SCENE_1296: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1297 — 场景段1297 (1B) */
export const SCRIPT_0x05_SCENE_1297: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1298 — 场景段1298 (1B) */
export const SCRIPT_0x05_SCENE_1298: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1299 — 场景段1299 (1B) */
export const SCRIPT_0x05_SCENE_1299: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1300 — 场景段1300 (1B) */
export const SCRIPT_0x05_SCENE_1300: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1301 — 场景段1301 (1B) */
export const SCRIPT_0x05_SCENE_1301: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1302 — 场景段1302 (1B) */
export const SCRIPT_0x05_SCENE_1302: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1303 — 场景段1303 (1B) */
export const SCRIPT_0x05_SCENE_1303: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1304 — 场景段1304 (1B) */
export const SCRIPT_0x05_SCENE_1304: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1305 — 场景段1305 (1B) */
export const SCRIPT_0x05_SCENE_1305: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1306 — 场景段1306 (1B) */
export const SCRIPT_0x05_SCENE_1306: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1307 — 场景段1307 (1B) */
export const SCRIPT_0x05_SCENE_1307: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1308 — 场景段1308 (1B) */
export const SCRIPT_0x05_SCENE_1308: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1309 — 场景段1309 (1B) */
export const SCRIPT_0x05_SCENE_1309: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1310 — 场景段1310 (1B) */
export const SCRIPT_0x05_SCENE_1310: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1311 — 场景段1311 (1B) */
export const SCRIPT_0x05_SCENE_1311: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1312 — 场景段1312 (1B) */
export const SCRIPT_0x05_SCENE_1312: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1313 — 场景段1313 (1B) */
export const SCRIPT_0x05_SCENE_1313: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1314 — 场景段1314 (1B) */
export const SCRIPT_0x05_SCENE_1314: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1315 — 场景段1315 (1B) */
export const SCRIPT_0x05_SCENE_1315: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1316 — 场景段1316 (1B) */
export const SCRIPT_0x05_SCENE_1316: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1317 — 场景段1317 (1B) */
export const SCRIPT_0x05_SCENE_1317: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1318 — 场景段1318 (1B) */
export const SCRIPT_0x05_SCENE_1318: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1319 — 场景段1319 (1B) */
export const SCRIPT_0x05_SCENE_1319: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1320 — 场景段1320 (1B) */
export const SCRIPT_0x05_SCENE_1320: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1321 — 场景段1321 (1B) */
export const SCRIPT_0x05_SCENE_1321: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1322 — 场景段1322 (1B) */
export const SCRIPT_0x05_SCENE_1322: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1323 — 场景段1323 (1B) */
export const SCRIPT_0x05_SCENE_1323: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1324 — 场景段1324 (1B) */
export const SCRIPT_0x05_SCENE_1324: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1325 — 场景段1325 (1B) */
export const SCRIPT_0x05_SCENE_1325: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1326 — 场景段1326 (1B) */
export const SCRIPT_0x05_SCENE_1326: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1327 — 场景段1327 (1B) */
export const SCRIPT_0x05_SCENE_1327: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1328 — 场景段1328 (1B) */
export const SCRIPT_0x05_SCENE_1328: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1329 — 场景段1329 (1B) */
export const SCRIPT_0x05_SCENE_1329: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1330 — 场景段1330 (1B) */
export const SCRIPT_0x05_SCENE_1330: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1331 — 场景段1331 (1B) */
export const SCRIPT_0x05_SCENE_1331: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1332 — 场景段1332 (1B) */
export const SCRIPT_0x05_SCENE_1332: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1333 — 场景段1333 (1B) */
export const SCRIPT_0x05_SCENE_1333: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1334 — 场景段1334 (1B) */
export const SCRIPT_0x05_SCENE_1334: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1335 — 场景段1335 (1B) */
export const SCRIPT_0x05_SCENE_1335: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1336 — 场景段1336 (1B) */
export const SCRIPT_0x05_SCENE_1336: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1337 — 场景段1337 (1B) */
export const SCRIPT_0x05_SCENE_1337: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1338 — 场景段1338 (1B) */
export const SCRIPT_0x05_SCENE_1338: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1339 — 场景段1339 (1B) */
export const SCRIPT_0x05_SCENE_1339: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1340 — 场景段1340 (1B) */
export const SCRIPT_0x05_SCENE_1340: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1341 — 场景段1341 (1B) */
export const SCRIPT_0x05_SCENE_1341: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1342 — 场景段1342 (1B) */
export const SCRIPT_0x05_SCENE_1342: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1343 — 场景段1343 (1B) */
export const SCRIPT_0x05_SCENE_1343: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1344 — 场景段1344 (1B) */
export const SCRIPT_0x05_SCENE_1344: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1345 — 场景段1345 (1B) */
export const SCRIPT_0x05_SCENE_1345: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1346 — 场景段1346 (1B) */
export const SCRIPT_0x05_SCENE_1346: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1347 — 场景段1347 (1B) */
export const SCRIPT_0x05_SCENE_1347: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1348 — 场景段1348 (1B) */
export const SCRIPT_0x05_SCENE_1348: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1349 — 场景段1349 (1B) */
export const SCRIPT_0x05_SCENE_1349: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1350 — 场景段1350 (1B) */
export const SCRIPT_0x05_SCENE_1350: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1351 — 场景段1351 (1B) */
export const SCRIPT_0x05_SCENE_1351: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1352 — 场景段1352 (1B) */
export const SCRIPT_0x05_SCENE_1352: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1353 — 场景段1353 (1B) */
export const SCRIPT_0x05_SCENE_1353: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1354 — 场景段1354 (1B) */
export const SCRIPT_0x05_SCENE_1354: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1355 — 场景段1355 (1B) */
export const SCRIPT_0x05_SCENE_1355: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1356 — 场景段1356 (1B) */
export const SCRIPT_0x05_SCENE_1356: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1357 — 场景段1357 (1B) */
export const SCRIPT_0x05_SCENE_1357: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1358 — 场景段1358 (1B) */
export const SCRIPT_0x05_SCENE_1358: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1359 — 场景段1359 (1B) */
export const SCRIPT_0x05_SCENE_1359: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1360 — 场景段1360 (1B) */
export const SCRIPT_0x05_SCENE_1360: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1361 — 场景段1361 (1B) */
export const SCRIPT_0x05_SCENE_1361: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1362 — 场景段1362 (1B) */
export const SCRIPT_0x05_SCENE_1362: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1363 — 场景段1363 (1B) */
export const SCRIPT_0x05_SCENE_1363: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1364 — 场景段1364 (1B) */
export const SCRIPT_0x05_SCENE_1364: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1365 — 场景段1365 (1B) */
export const SCRIPT_0x05_SCENE_1365: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1366 — 场景段1366 (1B) */
export const SCRIPT_0x05_SCENE_1366: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1367 — 场景段1367 (1B) */
export const SCRIPT_0x05_SCENE_1367: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1368 — 场景段1368 (1B) */
export const SCRIPT_0x05_SCENE_1368: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1369 — 场景段1369 (1B) */
export const SCRIPT_0x05_SCENE_1369: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1370 — 场景段1370 (1B) */
export const SCRIPT_0x05_SCENE_1370: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1371 — 场景段1371 (1B) */
export const SCRIPT_0x05_SCENE_1371: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1372 — 场景段1372 (1B) */
export const SCRIPT_0x05_SCENE_1372: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1373 — 场景段1373 (1B) */
export const SCRIPT_0x05_SCENE_1373: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1374 — 场景段1374 (1B) */
export const SCRIPT_0x05_SCENE_1374: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1375 — 场景段1375 (1B) */
export const SCRIPT_0x05_SCENE_1375: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1376 — 场景段1376 (1B) */
export const SCRIPT_0x05_SCENE_1376: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1377 — 场景段1377 (1B) */
export const SCRIPT_0x05_SCENE_1377: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1378 — 场景段1378 (1B) */
export const SCRIPT_0x05_SCENE_1378: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1379 — 场景段1379 (1B) */
export const SCRIPT_0x05_SCENE_1379: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1380 — 场景段1380 (1B) */
export const SCRIPT_0x05_SCENE_1380: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1381 — 场景段1381 (1B) */
export const SCRIPT_0x05_SCENE_1381: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1382 — 场景段1382 (1B) */
export const SCRIPT_0x05_SCENE_1382: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1383 — 场景段1383 (1B) */
export const SCRIPT_0x05_SCENE_1383: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1384 — 场景段1384 (1B) */
export const SCRIPT_0x05_SCENE_1384: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1385 — 场景段1385 (1B) */
export const SCRIPT_0x05_SCENE_1385: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1386 — 场景段1386 (1B) */
export const SCRIPT_0x05_SCENE_1386: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1387 — 场景段1387 (1B) */
export const SCRIPT_0x05_SCENE_1387: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1388 — 场景段1388 (1B) */
export const SCRIPT_0x05_SCENE_1388: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1389 — 场景段1389 (1B) */
export const SCRIPT_0x05_SCENE_1389: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1390 — 场景段1390 (1B) */
export const SCRIPT_0x05_SCENE_1390: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1391 — 场景段1391 (1B) */
export const SCRIPT_0x05_SCENE_1391: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1392 — 场景段1392 (1B) */
export const SCRIPT_0x05_SCENE_1392: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1393 — 场景段1393 (1B) */
export const SCRIPT_0x05_SCENE_1393: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1394 — 场景段1394 (1B) */
export const SCRIPT_0x05_SCENE_1394: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1395 — 场景段1395 (1B) */
export const SCRIPT_0x05_SCENE_1395: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1396 — 场景段1396 (1B) */
export const SCRIPT_0x05_SCENE_1396: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1397 — 场景段1397 (1B) */
export const SCRIPT_0x05_SCENE_1397: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1398 — 场景段1398 (1B) */
export const SCRIPT_0x05_SCENE_1398: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1399 — 场景段1399 (1B) */
export const SCRIPT_0x05_SCENE_1399: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1400 — 场景段1400 (1B) */
export const SCRIPT_0x05_SCENE_1400: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1401 — 场景段1401 (1B) */
export const SCRIPT_0x05_SCENE_1401: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1402 — 场景段1402 (1B) */
export const SCRIPT_0x05_SCENE_1402: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1403 — 场景段1403 (1B) */
export const SCRIPT_0x05_SCENE_1403: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1404 — 场景段1404 (1B) */
export const SCRIPT_0x05_SCENE_1404: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1405 — 场景段1405 (1B) */
export const SCRIPT_0x05_SCENE_1405: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1406 — 场景段1406 (1B) */
export const SCRIPT_0x05_SCENE_1406: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1407 — 场景段1407 (1B) */
export const SCRIPT_0x05_SCENE_1407: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1408 — 场景段1408 (1B) */
export const SCRIPT_0x05_SCENE_1408: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1409 — 场景段1409 (1B) */
export const SCRIPT_0x05_SCENE_1409: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1410 — 场景段1410 (1B) */
export const SCRIPT_0x05_SCENE_1410: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1411 — 场景段1411 (1B) */
export const SCRIPT_0x05_SCENE_1411: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1412 — 场景段1412 (1B) */
export const SCRIPT_0x05_SCENE_1412: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1413 — 场景段1413 (1B) */
export const SCRIPT_0x05_SCENE_1413: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1414 — 场景段1414 (1B) */
export const SCRIPT_0x05_SCENE_1414: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1415 — 场景段1415 (1B) */
export const SCRIPT_0x05_SCENE_1415: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1416 — 场景段1416 (1B) */
export const SCRIPT_0x05_SCENE_1416: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1417 — 场景段1417 (1B) */
export const SCRIPT_0x05_SCENE_1417: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1418 — 场景段1418 (1B) */
export const SCRIPT_0x05_SCENE_1418: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1419 — 场景段1419 (1B) */
export const SCRIPT_0x05_SCENE_1419: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1420 — 场景段1420 (1B) */
export const SCRIPT_0x05_SCENE_1420: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1421 — 场景段1421 (1B) */
export const SCRIPT_0x05_SCENE_1421: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1422 — 场景段1422 (1B) */
export const SCRIPT_0x05_SCENE_1422: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1423 — 场景段1423 (1B) */
export const SCRIPT_0x05_SCENE_1423: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1424 — 场景段1424 (1B) */
export const SCRIPT_0x05_SCENE_1424: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1425 — 场景段1425 (1B) */
export const SCRIPT_0x05_SCENE_1425: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1426 — 场景段1426 (1B) */
export const SCRIPT_0x05_SCENE_1426: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1427 — 场景段1427 (1B) */
export const SCRIPT_0x05_SCENE_1427: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1428 — 场景段1428 (1B) */
export const SCRIPT_0x05_SCENE_1428: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1429 — 场景段1429 (1B) */
export const SCRIPT_0x05_SCENE_1429: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1430 — 场景段1430 (1B) */
export const SCRIPT_0x05_SCENE_1430: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1431 — 场景段1431 (1B) */
export const SCRIPT_0x05_SCENE_1431: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1432 — 场景段1432 (1B) */
export const SCRIPT_0x05_SCENE_1432: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1433 — 场景段1433 (1B) */
export const SCRIPT_0x05_SCENE_1433: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1434 — 场景段1434 (1B) */
export const SCRIPT_0x05_SCENE_1434: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1435 — 场景段1435 (1B) */
export const SCRIPT_0x05_SCENE_1435: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1436 — 场景段1436 (1B) */
export const SCRIPT_0x05_SCENE_1436: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1437 — 场景段1437 (1B) */
export const SCRIPT_0x05_SCENE_1437: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1438 — 场景段1438 (1B) */
export const SCRIPT_0x05_SCENE_1438: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1439 — 场景段1439 (1B) */
export const SCRIPT_0x05_SCENE_1439: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1440 — 场景段1440 (1B) */
export const SCRIPT_0x05_SCENE_1440: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1441 — 场景段1441 (1B) */
export const SCRIPT_0x05_SCENE_1441: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1442 — 场景段1442 (1B) */
export const SCRIPT_0x05_SCENE_1442: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1443 — 场景段1443 (1B) */
export const SCRIPT_0x05_SCENE_1443: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1444 — 场景段1444 (1B) */
export const SCRIPT_0x05_SCENE_1444: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1445 — 场景段1445 (1B) */
export const SCRIPT_0x05_SCENE_1445: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1446 — 场景段1446 (1B) */
export const SCRIPT_0x05_SCENE_1446: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1447 — 场景段1447 (1B) */
export const SCRIPT_0x05_SCENE_1447: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1448 — 场景段1448 (1B) */
export const SCRIPT_0x05_SCENE_1448: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1449 — 场景段1449 (1B) */
export const SCRIPT_0x05_SCENE_1449: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1450 — 场景段1450 (1B) */
export const SCRIPT_0x05_SCENE_1450: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1451 — 场景段1451 (1B) */
export const SCRIPT_0x05_SCENE_1451: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1452 — 场景段1452 (1B) */
export const SCRIPT_0x05_SCENE_1452: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1453 — 场景段1453 (1B) */
export const SCRIPT_0x05_SCENE_1453: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1454 — 场景段1454 (1B) */
export const SCRIPT_0x05_SCENE_1454: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1455 — 场景段1455 (1B) */
export const SCRIPT_0x05_SCENE_1455: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1456 — 场景段1456 (1B) */
export const SCRIPT_0x05_SCENE_1456: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1457 — 场景段1457 (1B) */
export const SCRIPT_0x05_SCENE_1457: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1458 — 场景段1458 (1B) */
export const SCRIPT_0x05_SCENE_1458: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1459 — 场景段1459 (1B) */
export const SCRIPT_0x05_SCENE_1459: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1460 — 场景段1460 (1B) */
export const SCRIPT_0x05_SCENE_1460: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1461 — 场景段1461 (1B) */
export const SCRIPT_0x05_SCENE_1461: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1462 — 场景段1462 (1B) */
export const SCRIPT_0x05_SCENE_1462: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1463 — 场景段1463 (1B) */
export const SCRIPT_0x05_SCENE_1463: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1464 — 场景段1464 (1B) */
export const SCRIPT_0x05_SCENE_1464: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1465 — 场景段1465 (1B) */
export const SCRIPT_0x05_SCENE_1465: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1466 — 场景段1466 (1B) */
export const SCRIPT_0x05_SCENE_1466: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1467 — 场景段1467 (1B) */
export const SCRIPT_0x05_SCENE_1467: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1468 — 场景段1468 (1B) */
export const SCRIPT_0x05_SCENE_1468: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1469 — 场景段1469 (1B) */
export const SCRIPT_0x05_SCENE_1469: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1470 — 场景段1470 (1B) */
export const SCRIPT_0x05_SCENE_1470: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1471 — 场景段1471 (1B) */
export const SCRIPT_0x05_SCENE_1471: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1472 — 场景段1472 (1B) */
export const SCRIPT_0x05_SCENE_1472: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1473 — 场景段1473 (1B) */
export const SCRIPT_0x05_SCENE_1473: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1474 — 场景段1474 (1B) */
export const SCRIPT_0x05_SCENE_1474: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1475 — 场景段1475 (1B) */
export const SCRIPT_0x05_SCENE_1475: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1476 — 场景段1476 (1B) */
export const SCRIPT_0x05_SCENE_1476: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1477 — 场景段1477 (1B) */
export const SCRIPT_0x05_SCENE_1477: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1478 — 场景段1478 (1B) */
export const SCRIPT_0x05_SCENE_1478: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1479 — 场景段1479 (1B) */
export const SCRIPT_0x05_SCENE_1479: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1480 — 场景段1480 (1B) */
export const SCRIPT_0x05_SCENE_1480: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1481 — 场景段1481 (1B) */
export const SCRIPT_0x05_SCENE_1481: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1482 — 场景段1482 (1B) */
export const SCRIPT_0x05_SCENE_1482: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1483 — 场景段1483 (1B) */
export const SCRIPT_0x05_SCENE_1483: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1484 — 场景段1484 (1B) */
export const SCRIPT_0x05_SCENE_1484: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1485 — 场景段1485 (1B) */
export const SCRIPT_0x05_SCENE_1485: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1486 — 场景段1486 (1B) */
export const SCRIPT_0x05_SCENE_1486: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1487 — 场景段1487 (1B) */
export const SCRIPT_0x05_SCENE_1487: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1488 — 场景段1488 (1B) */
export const SCRIPT_0x05_SCENE_1488: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1489 — 场景段1489 (1B) */
export const SCRIPT_0x05_SCENE_1489: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1490 — 场景段1490 (1B) */
export const SCRIPT_0x05_SCENE_1490: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1491 — 场景段1491 (1B) */
export const SCRIPT_0x05_SCENE_1491: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1492 — 场景段1492 (1B) */
export const SCRIPT_0x05_SCENE_1492: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1493 — 场景段1493 (1B) */
export const SCRIPT_0x05_SCENE_1493: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1494 — 场景段1494 (1B) */
export const SCRIPT_0x05_SCENE_1494: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1495 — 场景段1495 (1B) */
export const SCRIPT_0x05_SCENE_1495: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1496 — 场景段1496 (1B) */
export const SCRIPT_0x05_SCENE_1496: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1497 — 场景段1497 (1B) */
export const SCRIPT_0x05_SCENE_1497: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1498 — 场景段1498 (1B) */
export const SCRIPT_0x05_SCENE_1498: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1499 — 场景段1499 (1B) */
export const SCRIPT_0x05_SCENE_1499: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1500 — 场景段1500 (1B) */
export const SCRIPT_0x05_SCENE_1500: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1501 — 场景段1501 (1B) */
export const SCRIPT_0x05_SCENE_1501: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1502 — 场景段1502 (1B) */
export const SCRIPT_0x05_SCENE_1502: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1503 — 场景段1503 (1B) */
export const SCRIPT_0x05_SCENE_1503: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1504 — 场景段1504 (1B) */
export const SCRIPT_0x05_SCENE_1504: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1505 — 场景段1505 (1B) */
export const SCRIPT_0x05_SCENE_1505: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1506 — 场景段1506 (1B) */
export const SCRIPT_0x05_SCENE_1506: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1507 — 场景段1507 (1B) */
export const SCRIPT_0x05_SCENE_1507: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1508 — 场景段1508 (1B) */
export const SCRIPT_0x05_SCENE_1508: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1509 — 场景段1509 (1B) */
export const SCRIPT_0x05_SCENE_1509: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1510 — 场景段1510 (1B) */
export const SCRIPT_0x05_SCENE_1510: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1511 — 场景段1511 (1B) */
export const SCRIPT_0x05_SCENE_1511: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1512 — 场景段1512 (1B) */
export const SCRIPT_0x05_SCENE_1512: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1513 — 场景段1513 (1B) */
export const SCRIPT_0x05_SCENE_1513: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1514 — 场景段1514 (1B) */
export const SCRIPT_0x05_SCENE_1514: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1515 — 场景段1515 (1B) */
export const SCRIPT_0x05_SCENE_1515: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1516 — 场景段1516 (1B) */
export const SCRIPT_0x05_SCENE_1516: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1517 — 场景段1517 (1B) */
export const SCRIPT_0x05_SCENE_1517: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1518 — 场景段1518 (1B) */
export const SCRIPT_0x05_SCENE_1518: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1519 — 场景段1519 (1B) */
export const SCRIPT_0x05_SCENE_1519: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1520 — 场景段1520 (1B) */
export const SCRIPT_0x05_SCENE_1520: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1521 — 场景段1521 (1B) */
export const SCRIPT_0x05_SCENE_1521: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1522 — 场景段1522 (1B) */
export const SCRIPT_0x05_SCENE_1522: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1523 — 场景段1523 (1B) */
export const SCRIPT_0x05_SCENE_1523: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1524 — 场景段1524 (1B) */
export const SCRIPT_0x05_SCENE_1524: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1525 — 场景段1525 (1B) */
export const SCRIPT_0x05_SCENE_1525: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1526 — 场景段1526 (1B) */
export const SCRIPT_0x05_SCENE_1526: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1527 — 场景段1527 (1B) */
export const SCRIPT_0x05_SCENE_1527: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1528 — 场景段1528 (1B) */
export const SCRIPT_0x05_SCENE_1528: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1529 — 场景段1529 (1B) */
export const SCRIPT_0x05_SCENE_1529: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1530 — 场景段1530 (1B) */
export const SCRIPT_0x05_SCENE_1530: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1531 — 场景段1531 (1B) */
export const SCRIPT_0x05_SCENE_1531: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1532 — 场景段1532 (1B) */
export const SCRIPT_0x05_SCENE_1532: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1533 — 场景段1533 (1B) */
export const SCRIPT_0x05_SCENE_1533: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1534 — 场景段1534 (1B) */
export const SCRIPT_0x05_SCENE_1534: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1535 — 场景段1535 (1B) */
export const SCRIPT_0x05_SCENE_1535: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1536 — 场景段1536 (1B) */
export const SCRIPT_0x05_SCENE_1536: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1537 — 场景段1537 (1B) */
export const SCRIPT_0x05_SCENE_1537: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1538 — 场景段1538 (1B) */
export const SCRIPT_0x05_SCENE_1538: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1539 — 场景段1539 (1B) */
export const SCRIPT_0x05_SCENE_1539: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1540 — 场景段1540 (1B) */
export const SCRIPT_0x05_SCENE_1540: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1541 — 场景段1541 (1B) */
export const SCRIPT_0x05_SCENE_1541: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1542 — 场景段1542 (1B) */
export const SCRIPT_0x05_SCENE_1542: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1543 — 场景段1543 (1B) */
export const SCRIPT_0x05_SCENE_1543: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1544 — 场景段1544 (1B) */
export const SCRIPT_0x05_SCENE_1544: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1545 — 场景段1545 (1B) */
export const SCRIPT_0x05_SCENE_1545: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1546 — 场景段1546 (1B) */
export const SCRIPT_0x05_SCENE_1546: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1547 — 场景段1547 (1B) */
export const SCRIPT_0x05_SCENE_1547: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1548 — 场景段1548 (1B) */
export const SCRIPT_0x05_SCENE_1548: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1549 — 场景段1549 (1B) */
export const SCRIPT_0x05_SCENE_1549: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1550 — 场景段1550 (1B) */
export const SCRIPT_0x05_SCENE_1550: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1551 — 场景段1551 (1B) */
export const SCRIPT_0x05_SCENE_1551: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1552 — 场景段1552 (1B) */
export const SCRIPT_0x05_SCENE_1552: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1553 — 场景段1553 (1B) */
export const SCRIPT_0x05_SCENE_1553: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1554 — 场景段1554 (1B) */
export const SCRIPT_0x05_SCENE_1554: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1555 — 场景段1555 (1B) */
export const SCRIPT_0x05_SCENE_1555: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1556 — 场景段1556 (1B) */
export const SCRIPT_0x05_SCENE_1556: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1557 — 场景段1557 (1B) */
export const SCRIPT_0x05_SCENE_1557: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1558 — 场景段1558 (1B) */
export const SCRIPT_0x05_SCENE_1558: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1559 — 场景段1559 (1B) */
export const SCRIPT_0x05_SCENE_1559: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1560 — 场景段1560 (1B) */
export const SCRIPT_0x05_SCENE_1560: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1561 — 场景段1561 (1B) */
export const SCRIPT_0x05_SCENE_1561: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1562 — 场景段1562 (1B) */
export const SCRIPT_0x05_SCENE_1562: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1563 — 场景段1563 (1B) */
export const SCRIPT_0x05_SCENE_1563: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1564 — 场景段1564 (1B) */
export const SCRIPT_0x05_SCENE_1564: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1565 — 场景段1565 (1B) */
export const SCRIPT_0x05_SCENE_1565: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1566 — 场景段1566 (1B) */
export const SCRIPT_0x05_SCENE_1566: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1567 — 场景段1567 (1B) */
export const SCRIPT_0x05_SCENE_1567: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1568 — 场景段1568 (1B) */
export const SCRIPT_0x05_SCENE_1568: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1569 — 场景段1569 (1B) */
export const SCRIPT_0x05_SCENE_1569: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1570 — 场景段1570 (1B) */
export const SCRIPT_0x05_SCENE_1570: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1571 — 场景段1571 (1B) */
export const SCRIPT_0x05_SCENE_1571: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1572 — 场景段1572 (1B) */
export const SCRIPT_0x05_SCENE_1572: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1573 — 场景段1573 (1B) */
export const SCRIPT_0x05_SCENE_1573: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1574 — 场景段1574 (1B) */
export const SCRIPT_0x05_SCENE_1574: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1575 — 场景段1575 (1B) */
export const SCRIPT_0x05_SCENE_1575: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1576 — 场景段1576 (1B) */
export const SCRIPT_0x05_SCENE_1576: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1577 — 场景段1577 (1B) */
export const SCRIPT_0x05_SCENE_1577: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1578 — 场景段1578 (1B) */
export const SCRIPT_0x05_SCENE_1578: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1579 — 场景段1579 (1B) */
export const SCRIPT_0x05_SCENE_1579: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1580 — 场景段1580 (1B) */
export const SCRIPT_0x05_SCENE_1580: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1581 — 场景段1581 (1B) */
export const SCRIPT_0x05_SCENE_1581: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1582 — 场景段1582 (1B) */
export const SCRIPT_0x05_SCENE_1582: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1583 — 场景段1583 (1B) */
export const SCRIPT_0x05_SCENE_1583: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1584 — 场景段1584 (1B) */
export const SCRIPT_0x05_SCENE_1584: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1585 — 场景段1585 (1B) */
export const SCRIPT_0x05_SCENE_1585: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1586 — 场景段1586 (1B) */
export const SCRIPT_0x05_SCENE_1586: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1587 — 场景段1587 (1B) */
export const SCRIPT_0x05_SCENE_1587: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1588 — 场景段1588 (1B) */
export const SCRIPT_0x05_SCENE_1588: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1589 — 场景段1589 (1B) */
export const SCRIPT_0x05_SCENE_1589: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1590 — 场景段1590 (1B) */
export const SCRIPT_0x05_SCENE_1590: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1591 — 场景段1591 (1B) */
export const SCRIPT_0x05_SCENE_1591: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1592 — 场景段1592 (1B) */
export const SCRIPT_0x05_SCENE_1592: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1593 — 场景段1593 (1B) */
export const SCRIPT_0x05_SCENE_1593: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1594 — 场景段1594 (1B) */
export const SCRIPT_0x05_SCENE_1594: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1595 — 场景段1595 (1B) */
export const SCRIPT_0x05_SCENE_1595: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1596 — 场景段1596 (1B) */
export const SCRIPT_0x05_SCENE_1596: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1597 — 场景段1597 (1B) */
export const SCRIPT_0x05_SCENE_1597: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1598 — 场景段1598 (1B) */
export const SCRIPT_0x05_SCENE_1598: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1599 — 场景段1599 (1B) */
export const SCRIPT_0x05_SCENE_1599: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1600 — 场景段1600 (1B) */
export const SCRIPT_0x05_SCENE_1600: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1601 — 场景段1601 (1B) */
export const SCRIPT_0x05_SCENE_1601: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1602 — 场景段1602 (1B) */
export const SCRIPT_0x05_SCENE_1602: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1603 — 场景段1603 (1B) */
export const SCRIPT_0x05_SCENE_1603: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1604 — 场景段1604 (1B) */
export const SCRIPT_0x05_SCENE_1604: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1605 — 场景段1605 (1B) */
export const SCRIPT_0x05_SCENE_1605: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1606 — 场景段1606 (1B) */
export const SCRIPT_0x05_SCENE_1606: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1607 — 场景段1607 (1B) */
export const SCRIPT_0x05_SCENE_1607: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1608 — 场景段1608 (1B) */
export const SCRIPT_0x05_SCENE_1608: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1609 — 场景段1609 (1B) */
export const SCRIPT_0x05_SCENE_1609: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1610 — 场景段1610 (1B) */
export const SCRIPT_0x05_SCENE_1610: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1611 — 场景段1611 (1B) */
export const SCRIPT_0x05_SCENE_1611: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1612 — 场景段1612 (1B) */
export const SCRIPT_0x05_SCENE_1612: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1613 — 场景段1613 (1B) */
export const SCRIPT_0x05_SCENE_1613: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1614 — 场景段1614 (1B) */
export const SCRIPT_0x05_SCENE_1614: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1615 — 场景段1615 (1B) */
export const SCRIPT_0x05_SCENE_1615: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1616 — 场景段1616 (1B) */
export const SCRIPT_0x05_SCENE_1616: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1617 — 场景段1617 (1B) */
export const SCRIPT_0x05_SCENE_1617: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1618 — 场景段1618 (1B) */
export const SCRIPT_0x05_SCENE_1618: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1619 — 场景段1619 (1B) */
export const SCRIPT_0x05_SCENE_1619: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1620 — 场景段1620 (1B) */
export const SCRIPT_0x05_SCENE_1620: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1621 — 场景段1621 (1B) */
export const SCRIPT_0x05_SCENE_1621: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1622 — 场景段1622 (1B) */
export const SCRIPT_0x05_SCENE_1622: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1623 — 场景段1623 (1B) */
export const SCRIPT_0x05_SCENE_1623: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1624 — 场景段1624 (1B) */
export const SCRIPT_0x05_SCENE_1624: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1625 — 场景段1625 (1B) */
export const SCRIPT_0x05_SCENE_1625: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1626 — 场景段1626 (1B) */
export const SCRIPT_0x05_SCENE_1626: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1627 — 场景段1627 (1B) */
export const SCRIPT_0x05_SCENE_1627: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1628 — 场景段1628 (1B) */
export const SCRIPT_0x05_SCENE_1628: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1629 — 场景段1629 (1B) */
export const SCRIPT_0x05_SCENE_1629: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1630 — 场景段1630 (1B) */
export const SCRIPT_0x05_SCENE_1630: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1631 — 场景段1631 (1B) */
export const SCRIPT_0x05_SCENE_1631: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1632 — 场景段1632 (1B) */
export const SCRIPT_0x05_SCENE_1632: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1633 — 场景段1633 (1B) */
export const SCRIPT_0x05_SCENE_1633: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1634 — 场景段1634 (1B) */
export const SCRIPT_0x05_SCENE_1634: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1635 — 场景段1635 (1B) */
export const SCRIPT_0x05_SCENE_1635: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1636 — 场景段1636 (1B) */
export const SCRIPT_0x05_SCENE_1636: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1637 — 场景段1637 (1B) */
export const SCRIPT_0x05_SCENE_1637: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1638 — 场景段1638 (1B) */
export const SCRIPT_0x05_SCENE_1638: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1639 — 场景段1639 (1B) */
export const SCRIPT_0x05_SCENE_1639: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1640 — 场景段1640 (1B) */
export const SCRIPT_0x05_SCENE_1640: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1641 — 场景段1641 (1B) */
export const SCRIPT_0x05_SCENE_1641: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1642 — 场景段1642 (1B) */
export const SCRIPT_0x05_SCENE_1642: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1643 — 场景段1643 (1B) */
export const SCRIPT_0x05_SCENE_1643: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1644 — 场景段1644 (1B) */
export const SCRIPT_0x05_SCENE_1644: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1645 — 场景段1645 (1B) */
export const SCRIPT_0x05_SCENE_1645: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1646 — 场景段1646 (1B) */
export const SCRIPT_0x05_SCENE_1646: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1647 — 场景段1647 (1B) */
export const SCRIPT_0x05_SCENE_1647: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1648 — 场景段1648 (1B) */
export const SCRIPT_0x05_SCENE_1648: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1649 — 场景段1649 (1B) */
export const SCRIPT_0x05_SCENE_1649: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1650 — 场景段1650 (1B) */
export const SCRIPT_0x05_SCENE_1650: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1651 — 场景段1651 (1B) */
export const SCRIPT_0x05_SCENE_1651: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1652 — 场景段1652 (1B) */
export const SCRIPT_0x05_SCENE_1652: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1653 — 场景段1653 (1B) */
export const SCRIPT_0x05_SCENE_1653: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1654 — 场景段1654 (1B) */
export const SCRIPT_0x05_SCENE_1654: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1655 — 场景段1655 (1B) */
export const SCRIPT_0x05_SCENE_1655: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1656 — 场景段1656 (1B) */
export const SCRIPT_0x05_SCENE_1656: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1657 — 场景段1657 (1B) */
export const SCRIPT_0x05_SCENE_1657: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1658 — 场景段1658 (1B) */
export const SCRIPT_0x05_SCENE_1658: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1659 — 场景段1659 (1B) */
export const SCRIPT_0x05_SCENE_1659: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1660 — 场景段1660 (1B) */
export const SCRIPT_0x05_SCENE_1660: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1661 — 场景段1661 (1B) */
export const SCRIPT_0x05_SCENE_1661: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1662 — 场景段1662 (1B) */
export const SCRIPT_0x05_SCENE_1662: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1663 — 场景段1663 (1B) */
export const SCRIPT_0x05_SCENE_1663: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1664 — 场景段1664 (1B) */
export const SCRIPT_0x05_SCENE_1664: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1665 — 场景段1665 (1B) */
export const SCRIPT_0x05_SCENE_1665: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1666 — 场景段1666 (1B) */
export const SCRIPT_0x05_SCENE_1666: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1667 — 场景段1667 (1B) */
export const SCRIPT_0x05_SCENE_1667: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1668 — 场景段1668 (1B) */
export const SCRIPT_0x05_SCENE_1668: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1669 — 场景段1669 (1B) */
export const SCRIPT_0x05_SCENE_1669: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1670 — 场景段1670 (1B) */
export const SCRIPT_0x05_SCENE_1670: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1671 — 场景段1671 (1B) */
export const SCRIPT_0x05_SCENE_1671: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1672 — 场景段1672 (1B) */
export const SCRIPT_0x05_SCENE_1672: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1673 — 场景段1673 (1B) */
export const SCRIPT_0x05_SCENE_1673: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1674 — 场景段1674 (1B) */
export const SCRIPT_0x05_SCENE_1674: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1675 — 场景段1675 (1B) */
export const SCRIPT_0x05_SCENE_1675: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1676 — 场景段1676 (1B) */
export const SCRIPT_0x05_SCENE_1676: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1677 — 场景段1677 (1B) */
export const SCRIPT_0x05_SCENE_1677: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1678 — 场景段1678 (1B) */
export const SCRIPT_0x05_SCENE_1678: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1679 — 场景段1679 (1B) */
export const SCRIPT_0x05_SCENE_1679: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1680 — 场景段1680 (1B) */
export const SCRIPT_0x05_SCENE_1680: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1681 — 场景段1681 (1B) */
export const SCRIPT_0x05_SCENE_1681: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1682 — 场景段1682 (1B) */
export const SCRIPT_0x05_SCENE_1682: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1683 — 场景段1683 (1B) */
export const SCRIPT_0x05_SCENE_1683: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1684 — 场景段1684 (1B) */
export const SCRIPT_0x05_SCENE_1684: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1685 — 场景段1685 (1B) */
export const SCRIPT_0x05_SCENE_1685: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1686 — 场景段1686 (1B) */
export const SCRIPT_0x05_SCENE_1686: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1687 — 场景段1687 (1B) */
export const SCRIPT_0x05_SCENE_1687: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1688 — 场景段1688 (1B) */
export const SCRIPT_0x05_SCENE_1688: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1689 — 场景段1689 (1B) */
export const SCRIPT_0x05_SCENE_1689: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1690 — 场景段1690 (1B) */
export const SCRIPT_0x05_SCENE_1690: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1691 — 场景段1691 (1B) */
export const SCRIPT_0x05_SCENE_1691: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1692 — 场景段1692 (1B) */
export const SCRIPT_0x05_SCENE_1692: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1693 — 场景段1693 (1B) */
export const SCRIPT_0x05_SCENE_1693: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1694 — 场景段1694 (1B) */
export const SCRIPT_0x05_SCENE_1694: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1695 — 场景段1695 (1B) */
export const SCRIPT_0x05_SCENE_1695: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1696 — 场景段1696 (1B) */
export const SCRIPT_0x05_SCENE_1696: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1697 — 场景段1697 (1B) */
export const SCRIPT_0x05_SCENE_1697: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1698 — 场景段1698 (1B) */
export const SCRIPT_0x05_SCENE_1698: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1699 — 场景段1699 (1B) */
export const SCRIPT_0x05_SCENE_1699: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1700 — 场景段1700 (1B) */
export const SCRIPT_0x05_SCENE_1700: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1701 — 场景段1701 (1B) */
export const SCRIPT_0x05_SCENE_1701: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1702 — 场景段1702 (1B) */
export const SCRIPT_0x05_SCENE_1702: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1703 — 场景段1703 (1B) */
export const SCRIPT_0x05_SCENE_1703: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1704 — 场景段1704 (1B) */
export const SCRIPT_0x05_SCENE_1704: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1705 — 场景段1705 (1B) */
export const SCRIPT_0x05_SCENE_1705: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1706 — 场景段1706 (1B) */
export const SCRIPT_0x05_SCENE_1706: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1707 — 场景段1707 (1B) */
export const SCRIPT_0x05_SCENE_1707: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1708 — 场景段1708 (1B) */
export const SCRIPT_0x05_SCENE_1708: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1709 — 场景段1709 (1B) */
export const SCRIPT_0x05_SCENE_1709: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1710 — 场景段1710 (1B) */
export const SCRIPT_0x05_SCENE_1710: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1711 — 场景段1711 (1B) */
export const SCRIPT_0x05_SCENE_1711: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1712 — 场景段1712 (1B) */
export const SCRIPT_0x05_SCENE_1712: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1713 — 场景段1713 (1B) */
export const SCRIPT_0x05_SCENE_1713: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1714 — 场景段1714 (1B) */
export const SCRIPT_0x05_SCENE_1714: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1715 — 场景段1715 (1B) */
export const SCRIPT_0x05_SCENE_1715: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1716 — 场景段1716 (1B) */
export const SCRIPT_0x05_SCENE_1716: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1717 — 场景段1717 (1B) */
export const SCRIPT_0x05_SCENE_1717: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1718 — 场景段1718 (1B) */
export const SCRIPT_0x05_SCENE_1718: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1719 — 场景段1719 (1B) */
export const SCRIPT_0x05_SCENE_1719: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1720 — 场景段1720 (1B) */
export const SCRIPT_0x05_SCENE_1720: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1721 — 场景段1721 (1B) */
export const SCRIPT_0x05_SCENE_1721: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1722 — 场景段1722 (1B) */
export const SCRIPT_0x05_SCENE_1722: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1723 — 场景段1723 (1B) */
export const SCRIPT_0x05_SCENE_1723: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1724 — 场景段1724 (1B) */
export const SCRIPT_0x05_SCENE_1724: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1725 — 场景段1725 (1B) */
export const SCRIPT_0x05_SCENE_1725: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1726 — 场景段1726 (1B) */
export const SCRIPT_0x05_SCENE_1726: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1727 — 场景段1727 (1B) */
export const SCRIPT_0x05_SCENE_1727: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1728 — 场景段1728 (1B) */
export const SCRIPT_0x05_SCENE_1728: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1729 — 场景段1729 (1B) */
export const SCRIPT_0x05_SCENE_1729: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1730 — 场景段1730 (1B) */
export const SCRIPT_0x05_SCENE_1730: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1731 — 场景段1731 (1B) */
export const SCRIPT_0x05_SCENE_1731: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1732 — 场景段1732 (1B) */
export const SCRIPT_0x05_SCENE_1732: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1733 — 场景段1733 (1B) */
export const SCRIPT_0x05_SCENE_1733: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1734 — 场景段1734 (1B) */
export const SCRIPT_0x05_SCENE_1734: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1735 — 场景段1735 (1B) */
export const SCRIPT_0x05_SCENE_1735: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1736 — 场景段1736 (1B) */
export const SCRIPT_0x05_SCENE_1736: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1737 — 场景段1737 (1B) */
export const SCRIPT_0x05_SCENE_1737: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1738 — 场景段1738 (1B) */
export const SCRIPT_0x05_SCENE_1738: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1739 — 场景段1739 (1B) */
export const SCRIPT_0x05_SCENE_1739: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1740 — 场景段1740 (1B) */
export const SCRIPT_0x05_SCENE_1740: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1741 — 场景段1741 (1B) */
export const SCRIPT_0x05_SCENE_1741: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1742 — 场景段1742 (1B) */
export const SCRIPT_0x05_SCENE_1742: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1743 — 场景段1743 (1B) */
export const SCRIPT_0x05_SCENE_1743: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1744 — 场景段1744 (1B) */
export const SCRIPT_0x05_SCENE_1744: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1745 — 场景段1745 (1B) */
export const SCRIPT_0x05_SCENE_1745: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1746 — 场景段1746 (1B) */
export const SCRIPT_0x05_SCENE_1746: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1747 — 场景段1747 (1B) */
export const SCRIPT_0x05_SCENE_1747: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1748 — 场景段1748 (1B) */
export const SCRIPT_0x05_SCENE_1748: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1749 — 场景段1749 (1B) */
export const SCRIPT_0x05_SCENE_1749: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1750 — 场景段1750 (1B) */
export const SCRIPT_0x05_SCENE_1750: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1751 — 场景段1751 (1B) */
export const SCRIPT_0x05_SCENE_1751: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1752 — 场景段1752 (1B) */
export const SCRIPT_0x05_SCENE_1752: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1753 — 场景段1753 (1B) */
export const SCRIPT_0x05_SCENE_1753: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1754 — 场景段1754 (1B) */
export const SCRIPT_0x05_SCENE_1754: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1755 — 场景段1755 (1B) */
export const SCRIPT_0x05_SCENE_1755: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1756 — 场景段1756 (1B) */
export const SCRIPT_0x05_SCENE_1756: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1757 — 场景段1757 (1B) */
export const SCRIPT_0x05_SCENE_1757: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1758 — 场景段1758 (1B) */
export const SCRIPT_0x05_SCENE_1758: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1759 — 场景段1759 (1B) */
export const SCRIPT_0x05_SCENE_1759: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1760 — 场景段1760 (1B) */
export const SCRIPT_0x05_SCENE_1760: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1761 — 场景段1761 (1B) */
export const SCRIPT_0x05_SCENE_1761: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1762 — 场景段1762 (1B) */
export const SCRIPT_0x05_SCENE_1762: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1763 — 场景段1763 (1B) */
export const SCRIPT_0x05_SCENE_1763: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1764 — 场景段1764 (1B) */
export const SCRIPT_0x05_SCENE_1764: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1765 — 场景段1765 (1B) */
export const SCRIPT_0x05_SCENE_1765: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1766 — 场景段1766 (1B) */
export const SCRIPT_0x05_SCENE_1766: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1767 — 场景段1767 (1B) */
export const SCRIPT_0x05_SCENE_1767: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1768 — 场景段1768 (1B) */
export const SCRIPT_0x05_SCENE_1768: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1769 — 场景段1769 (1B) */
export const SCRIPT_0x05_SCENE_1769: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1770 — 场景段1770 (1B) */
export const SCRIPT_0x05_SCENE_1770: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1771 — 场景段1771 (1B) */
export const SCRIPT_0x05_SCENE_1771: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1772 — 场景段1772 (1B) */
export const SCRIPT_0x05_SCENE_1772: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1773 — 场景段1773 (1B) */
export const SCRIPT_0x05_SCENE_1773: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1774 — 场景段1774 (1B) */
export const SCRIPT_0x05_SCENE_1774: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1775 — 场景段1775 (1B) */
export const SCRIPT_0x05_SCENE_1775: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1776 — 场景段1776 (1B) */
export const SCRIPT_0x05_SCENE_1776: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1777 — 场景段1777 (1B) */
export const SCRIPT_0x05_SCENE_1777: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1778 — 场景段1778 (1B) */
export const SCRIPT_0x05_SCENE_1778: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1779 — 场景段1779 (1B) */
export const SCRIPT_0x05_SCENE_1779: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1780 — 场景段1780 (1B) */
export const SCRIPT_0x05_SCENE_1780: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1781 — 场景段1781 (1B) */
export const SCRIPT_0x05_SCENE_1781: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1782 — 场景段1782 (1B) */
export const SCRIPT_0x05_SCENE_1782: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1783 — 场景段1783 (1B) */
export const SCRIPT_0x05_SCENE_1783: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1784 — 场景段1784 (1B) */
export const SCRIPT_0x05_SCENE_1784: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1785 — 场景段1785 (1B) */
export const SCRIPT_0x05_SCENE_1785: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1786 — 场景段1786 (1B) */
export const SCRIPT_0x05_SCENE_1786: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1787 — 场景段1787 (1B) */
export const SCRIPT_0x05_SCENE_1787: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1788 — 场景段1788 (1B) */
export const SCRIPT_0x05_SCENE_1788: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1789 — 场景段1789 (1B) */
export const SCRIPT_0x05_SCENE_1789: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1790 — 场景段1790 (1B) */
export const SCRIPT_0x05_SCENE_1790: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1791 — 场景段1791 (1B) */
export const SCRIPT_0x05_SCENE_1791: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1792 — 场景段1792 (1B) */
export const SCRIPT_0x05_SCENE_1792: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1793 — 场景段1793 (1B) */
export const SCRIPT_0x05_SCENE_1793: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1794 — 场景段1794 (1B) */
export const SCRIPT_0x05_SCENE_1794: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1795 — 场景段1795 (1B) */
export const SCRIPT_0x05_SCENE_1795: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1796 — 场景段1796 (1B) */
export const SCRIPT_0x05_SCENE_1796: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1797 — 场景段1797 (1B) */
export const SCRIPT_0x05_SCENE_1797: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1798 — 场景段1798 (1B) */
export const SCRIPT_0x05_SCENE_1798: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1799 — 场景段1799 (1B) */
export const SCRIPT_0x05_SCENE_1799: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1800 — 场景段1800 (1B) */
export const SCRIPT_0x05_SCENE_1800: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1801 — 场景段1801 (1B) */
export const SCRIPT_0x05_SCENE_1801: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1802 — 场景段1802 (1B) */
export const SCRIPT_0x05_SCENE_1802: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1803 — 场景段1803 (1B) */
export const SCRIPT_0x05_SCENE_1803: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1804 — 场景段1804 (1B) */
export const SCRIPT_0x05_SCENE_1804: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1805 — 场景段1805 (1B) */
export const SCRIPT_0x05_SCENE_1805: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1806 — 场景段1806 (1B) */
export const SCRIPT_0x05_SCENE_1806: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1807 — 场景段1807 (1B) */
export const SCRIPT_0x05_SCENE_1807: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1808 — 场景段1808 (1B) */
export const SCRIPT_0x05_SCENE_1808: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1809 — 场景段1809 (1B) */
export const SCRIPT_0x05_SCENE_1809: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1810 — 场景段1810 (1B) */
export const SCRIPT_0x05_SCENE_1810: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1811 — 场景段1811 (1B) */
export const SCRIPT_0x05_SCENE_1811: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1812 — 场景段1812 (1B) */
export const SCRIPT_0x05_SCENE_1812: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1813 — 场景段1813 (1B) */
export const SCRIPT_0x05_SCENE_1813: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1814 — 场景段1814 (1B) */
export const SCRIPT_0x05_SCENE_1814: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1815 — 场景段1815 (1B) */
export const SCRIPT_0x05_SCENE_1815: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1816 — 场景段1816 (1B) */
export const SCRIPT_0x05_SCENE_1816: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1817 — 场景段1817 (1B) */
export const SCRIPT_0x05_SCENE_1817: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1818 — 场景段1818 (1B) */
export const SCRIPT_0x05_SCENE_1818: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1819 — 场景段1819 (1B) */
export const SCRIPT_0x05_SCENE_1819: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1820 — 场景段1820 (1B) */
export const SCRIPT_0x05_SCENE_1820: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1821 — 场景段1821 (1B) */
export const SCRIPT_0x05_SCENE_1821: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1822 — 场景段1822 (1B) */
export const SCRIPT_0x05_SCENE_1822: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1823 — 场景段1823 (1B) */
export const SCRIPT_0x05_SCENE_1823: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1824 — 场景段1824 (1B) */
export const SCRIPT_0x05_SCENE_1824: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1825 — 场景段1825 (1B) */
export const SCRIPT_0x05_SCENE_1825: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1826 — 场景段1826 (1B) */
export const SCRIPT_0x05_SCENE_1826: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1827 — 场景段1827 (1B) */
export const SCRIPT_0x05_SCENE_1827: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1828 — 场景段1828 (1B) */
export const SCRIPT_0x05_SCENE_1828: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1829 — 场景段1829 (1B) */
export const SCRIPT_0x05_SCENE_1829: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1830 — 场景段1830 (1B) */
export const SCRIPT_0x05_SCENE_1830: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1831 — 场景段1831 (1B) */
export const SCRIPT_0x05_SCENE_1831: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1832 — 场景段1832 (1B) */
export const SCRIPT_0x05_SCENE_1832: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1833 — 场景段1833 (1B) */
export const SCRIPT_0x05_SCENE_1833: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1834 — 场景段1834 (1B) */
export const SCRIPT_0x05_SCENE_1834: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1835 — 场景段1835 (1B) */
export const SCRIPT_0x05_SCENE_1835: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1836 — 场景段1836 (1B) */
export const SCRIPT_0x05_SCENE_1836: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1837 — 场景段1837 (1B) */
export const SCRIPT_0x05_SCENE_1837: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1838 — 场景段1838 (1B) */
export const SCRIPT_0x05_SCENE_1838: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1839 — 场景段1839 (1B) */
export const SCRIPT_0x05_SCENE_1839: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1840 — 场景段1840 (1B) */
export const SCRIPT_0x05_SCENE_1840: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1841 — 场景段1841 (1B) */
export const SCRIPT_0x05_SCENE_1841: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1842 — 场景段1842 (1B) */
export const SCRIPT_0x05_SCENE_1842: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1843 — 场景段1843 (1B) */
export const SCRIPT_0x05_SCENE_1843: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1844 — 场景段1844 (1B) */
export const SCRIPT_0x05_SCENE_1844: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1845 — 场景段1845 (1B) */
export const SCRIPT_0x05_SCENE_1845: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1846 — 场景段1846 (1B) */
export const SCRIPT_0x05_SCENE_1846: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1847 — 场景段1847 (1B) */
export const SCRIPT_0x05_SCENE_1847: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1848 — 场景段1848 (1B) */
export const SCRIPT_0x05_SCENE_1848: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1849 — 场景段1849 (1B) */
export const SCRIPT_0x05_SCENE_1849: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1850 — 场景段1850 (1B) */
export const SCRIPT_0x05_SCENE_1850: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1851 — 场景段1851 (1B) */
export const SCRIPT_0x05_SCENE_1851: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1852 — 场景段1852 (1B) */
export const SCRIPT_0x05_SCENE_1852: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1853 — 场景段1853 (1B) */
export const SCRIPT_0x05_SCENE_1853: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1854 — 场景段1854 (1B) */
export const SCRIPT_0x05_SCENE_1854: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1855 — 场景段1855 (1B) */
export const SCRIPT_0x05_SCENE_1855: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1856 — 场景段1856 (1B) */
export const SCRIPT_0x05_SCENE_1856: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1857 — 场景段1857 (1B) */
export const SCRIPT_0x05_SCENE_1857: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1858 — 场景段1858 (1B) */
export const SCRIPT_0x05_SCENE_1858: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1859 — 场景段1859 (1B) */
export const SCRIPT_0x05_SCENE_1859: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1860 — 场景段1860 (1B) */
export const SCRIPT_0x05_SCENE_1860: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1861 — 场景段1861 (1B) */
export const SCRIPT_0x05_SCENE_1861: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1862 — 场景段1862 (1B) */
export const SCRIPT_0x05_SCENE_1862: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1863 — 场景段1863 (1B) */
export const SCRIPT_0x05_SCENE_1863: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1864 — 场景段1864 (1B) */
export const SCRIPT_0x05_SCENE_1864: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1865 — 场景段1865 (1B) */
export const SCRIPT_0x05_SCENE_1865: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1866 — 场景段1866 (1B) */
export const SCRIPT_0x05_SCENE_1866: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1867 — 场景段1867 (1B) */
export const SCRIPT_0x05_SCENE_1867: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1868 — 场景段1868 (1B) */
export const SCRIPT_0x05_SCENE_1868: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1869 — 场景段1869 (1B) */
export const SCRIPT_0x05_SCENE_1869: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1870 — 场景段1870 (1B) */
export const SCRIPT_0x05_SCENE_1870: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1871 — 场景段1871 (1B) */
export const SCRIPT_0x05_SCENE_1871: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1872 — 场景段1872 (1B) */
export const SCRIPT_0x05_SCENE_1872: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1873 — 场景段1873 (1B) */
export const SCRIPT_0x05_SCENE_1873: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1874 — 场景段1874 (1B) */
export const SCRIPT_0x05_SCENE_1874: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1875 — 场景段1875 (1B) */
export const SCRIPT_0x05_SCENE_1875: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1876 — 场景段1876 (1B) */
export const SCRIPT_0x05_SCENE_1876: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1877 — 场景段1877 (1B) */
export const SCRIPT_0x05_SCENE_1877: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1878 — 场景段1878 (1B) */
export const SCRIPT_0x05_SCENE_1878: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1879 — 场景段1879 (1B) */
export const SCRIPT_0x05_SCENE_1879: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1880 — 场景段1880 (1B) */
export const SCRIPT_0x05_SCENE_1880: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1881 — 场景段1881 (1B) */
export const SCRIPT_0x05_SCENE_1881: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1882 — 场景段1882 (1B) */
export const SCRIPT_0x05_SCENE_1882: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1883 — 场景段1883 (1B) */
export const SCRIPT_0x05_SCENE_1883: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1884 — 场景段1884 (1B) */
export const SCRIPT_0x05_SCENE_1884: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1885 — 场景段1885 (1B) */
export const SCRIPT_0x05_SCENE_1885: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1886 — 场景段1886 (1B) */
export const SCRIPT_0x05_SCENE_1886: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1887 — 场景段1887 (1B) */
export const SCRIPT_0x05_SCENE_1887: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1888 — 场景段1888 (1B) */
export const SCRIPT_0x05_SCENE_1888: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1889 — 场景段1889 (1B) */
export const SCRIPT_0x05_SCENE_1889: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1890 — 场景段1890 (1B) */
export const SCRIPT_0x05_SCENE_1890: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1891 — 场景段1891 (1B) */
export const SCRIPT_0x05_SCENE_1891: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1892 — 场景段1892 (1B) */
export const SCRIPT_0x05_SCENE_1892: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1893 — 场景段1893 (1B) */
export const SCRIPT_0x05_SCENE_1893: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1894 — 场景段1894 (1B) */
export const SCRIPT_0x05_SCENE_1894: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1895 — 场景段1895 (1B) */
export const SCRIPT_0x05_SCENE_1895: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1896 — 场景段1896 (1B) */
export const SCRIPT_0x05_SCENE_1896: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1897 — 场景段1897 (1B) */
export const SCRIPT_0x05_SCENE_1897: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1898 — 场景段1898 (1B) */
export const SCRIPT_0x05_SCENE_1898: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1899 — 场景段1899 (1B) */
export const SCRIPT_0x05_SCENE_1899: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1900 — 场景段1900 (1B) */
export const SCRIPT_0x05_SCENE_1900: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1901 — 场景段1901 (1B) */
export const SCRIPT_0x05_SCENE_1901: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1902 — 场景段1902 (1B) */
export const SCRIPT_0x05_SCENE_1902: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1903 — 场景段1903 (1B) */
export const SCRIPT_0x05_SCENE_1903: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1904 — 场景段1904 (1B) */
export const SCRIPT_0x05_SCENE_1904: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1905 — 场景段1905 (1B) */
export const SCRIPT_0x05_SCENE_1905: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1906 — 场景段1906 (1B) */
export const SCRIPT_0x05_SCENE_1906: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1907 — 场景段1907 (1B) */
export const SCRIPT_0x05_SCENE_1907: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1908 — 场景段1908 (1B) */
export const SCRIPT_0x05_SCENE_1908: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1909 — 场景段1909 (1B) */
export const SCRIPT_0x05_SCENE_1909: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1910 — 场景段1910 (1B) */
export const SCRIPT_0x05_SCENE_1910: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1911 — 场景段1911 (1B) */
export const SCRIPT_0x05_SCENE_1911: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1912 — 场景段1912 (1B) */
export const SCRIPT_0x05_SCENE_1912: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1913 — 场景段1913 (1B) */
export const SCRIPT_0x05_SCENE_1913: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1914 — 场景段1914 (1B) */
export const SCRIPT_0x05_SCENE_1914: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1915 — 场景段1915 (1B) */
export const SCRIPT_0x05_SCENE_1915: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1916 — 场景段1916 (1B) */
export const SCRIPT_0x05_SCENE_1916: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1917 — 场景段1917 (1B) */
export const SCRIPT_0x05_SCENE_1917: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1918 — 场景段1918 (1B) */
export const SCRIPT_0x05_SCENE_1918: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1919 — 场景段1919 (1B) */
export const SCRIPT_0x05_SCENE_1919: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1920 — 场景段1920 (1B) */
export const SCRIPT_0x05_SCENE_1920: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1921 — 场景段1921 (1B) */
export const SCRIPT_0x05_SCENE_1921: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1922 — 场景段1922 (1B) */
export const SCRIPT_0x05_SCENE_1922: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1923 — 场景段1923 (1B) */
export const SCRIPT_0x05_SCENE_1923: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1924 — 场景段1924 (1B) */
export const SCRIPT_0x05_SCENE_1924: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1925 — 场景段1925 (1B) */
export const SCRIPT_0x05_SCENE_1925: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1926 — 场景段1926 (1B) */
export const SCRIPT_0x05_SCENE_1926: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1927 — 场景段1927 (1B) */
export const SCRIPT_0x05_SCENE_1927: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1928 — 场景段1928 (1B) */
export const SCRIPT_0x05_SCENE_1928: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1929 — 场景段1929 (1B) */
export const SCRIPT_0x05_SCENE_1929: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1930 — 场景段1930 (1B) */
export const SCRIPT_0x05_SCENE_1930: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1931 — 场景段1931 (1B) */
export const SCRIPT_0x05_SCENE_1931: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1932 — 场景段1932 (1B) */
export const SCRIPT_0x05_SCENE_1932: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1933 — 场景段1933 (1B) */
export const SCRIPT_0x05_SCENE_1933: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1934 — 场景段1934 (1B) */
export const SCRIPT_0x05_SCENE_1934: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1935 — 场景段1935 (1B) */
export const SCRIPT_0x05_SCENE_1935: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1936 — 场景段1936 (1B) */
export const SCRIPT_0x05_SCENE_1936: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1937 — 场景段1937 (1B) */
export const SCRIPT_0x05_SCENE_1937: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1938 — 场景段1938 (1B) */
export const SCRIPT_0x05_SCENE_1938: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1939 — 场景段1939 (1B) */
export const SCRIPT_0x05_SCENE_1939: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1940 — 场景段1940 (1B) */
export const SCRIPT_0x05_SCENE_1940: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1941 — 场景段1941 (1B) */
export const SCRIPT_0x05_SCENE_1941: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1942 — 场景段1942 (1B) */
export const SCRIPT_0x05_SCENE_1942: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1943 — 场景段1943 (1B) */
export const SCRIPT_0x05_SCENE_1943: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1944 — 场景段1944 (1B) */
export const SCRIPT_0x05_SCENE_1944: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1945 — 场景段1945 (1B) */
export const SCRIPT_0x05_SCENE_1945: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1946 — 场景段1946 (1B) */
export const SCRIPT_0x05_SCENE_1946: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1947 — 场景段1947 (1B) */
export const SCRIPT_0x05_SCENE_1947: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1948 — 场景段1948 (1B) */
export const SCRIPT_0x05_SCENE_1948: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1949 — 场景段1949 (1B) */
export const SCRIPT_0x05_SCENE_1949: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1950 — 场景段1950 (1B) */
export const SCRIPT_0x05_SCENE_1950: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1951 — 场景段1951 (1B) */
export const SCRIPT_0x05_SCENE_1951: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1952 — 场景段1952 (1B) */
export const SCRIPT_0x05_SCENE_1952: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1953 — 场景段1953 (1B) */
export const SCRIPT_0x05_SCENE_1953: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1954 — 场景段1954 (1B) */
export const SCRIPT_0x05_SCENE_1954: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1955 — 场景段1955 (1B) */
export const SCRIPT_0x05_SCENE_1955: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1956 — 场景段1956 (1B) */
export const SCRIPT_0x05_SCENE_1956: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1957 — 场景段1957 (1B) */
export const SCRIPT_0x05_SCENE_1957: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1958 — 场景段1958 (1B) */
export const SCRIPT_0x05_SCENE_1958: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1959 — 场景段1959 (1B) */
export const SCRIPT_0x05_SCENE_1959: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1960 — 场景段1960 (1B) */
export const SCRIPT_0x05_SCENE_1960: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1961 — 场景段1961 (1B) */
export const SCRIPT_0x05_SCENE_1961: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1962 — 场景段1962 (1B) */
export const SCRIPT_0x05_SCENE_1962: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1963 — 场景段1963 (1B) */
export const SCRIPT_0x05_SCENE_1963: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1964 — 场景段1964 (1B) */
export const SCRIPT_0x05_SCENE_1964: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1965 — 场景段1965 (1B) */
export const SCRIPT_0x05_SCENE_1965: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1966 — 场景段1966 (1B) */
export const SCRIPT_0x05_SCENE_1966: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1967 — 场景段1967 (1B) */
export const SCRIPT_0x05_SCENE_1967: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1968 — 场景段1968 (1B) */
export const SCRIPT_0x05_SCENE_1968: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1969 — 场景段1969 (1B) */
export const SCRIPT_0x05_SCENE_1969: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1970 — 场景段1970 (1B) */
export const SCRIPT_0x05_SCENE_1970: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1971 — 场景段1971 (1B) */
export const SCRIPT_0x05_SCENE_1971: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1972 — 场景段1972 (1B) */
export const SCRIPT_0x05_SCENE_1972: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1973 — 场景段1973 (1B) */
export const SCRIPT_0x05_SCENE_1973: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1974 — 场景段1974 (1B) */
export const SCRIPT_0x05_SCENE_1974: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1975 — 场景段1975 (1B) */
export const SCRIPT_0x05_SCENE_1975: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1976 — 场景段1976 (1B) */
export const SCRIPT_0x05_SCENE_1976: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1977 — 场景段1977 (1B) */
export const SCRIPT_0x05_SCENE_1977: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1978 — 场景段1978 (1B) */
export const SCRIPT_0x05_SCENE_1978: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1979 — 场景段1979 (1B) */
export const SCRIPT_0x05_SCENE_1979: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1980 — 场景段1980 (1B) */
export const SCRIPT_0x05_SCENE_1980: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1981 — 场景段1981 (1B) */
export const SCRIPT_0x05_SCENE_1981: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1982 — 场景段1982 (1B) */
export const SCRIPT_0x05_SCENE_1982: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1983 — 场景段1983 (1B) */
export const SCRIPT_0x05_SCENE_1983: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1984 — 场景段1984 (1B) */
export const SCRIPT_0x05_SCENE_1984: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1985 — 场景段1985 (1B) */
export const SCRIPT_0x05_SCENE_1985: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1986 — 场景段1986 (1B) */
export const SCRIPT_0x05_SCENE_1986: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1987 — 场景段1987 (1B) */
export const SCRIPT_0x05_SCENE_1987: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1988 — 场景段1988 (1B) */
export const SCRIPT_0x05_SCENE_1988: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1989 — 场景段1989 (1B) */
export const SCRIPT_0x05_SCENE_1989: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1990 — 场景段1990 (1B) */
export const SCRIPT_0x05_SCENE_1990: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1991 — 场景段1991 (1B) */
export const SCRIPT_0x05_SCENE_1991: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1992 — 场景段1992 (1B) */
export const SCRIPT_0x05_SCENE_1992: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1993 — 场景段1993 (1B) */
export const SCRIPT_0x05_SCENE_1993: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1994 — 场景段1994 (1B) */
export const SCRIPT_0x05_SCENE_1994: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1995 — 场景段1995 (1B) */
export const SCRIPT_0x05_SCENE_1995: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1996 — 场景段1996 (1B) */
export const SCRIPT_0x05_SCENE_1996: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1997 — 场景段1997 (1B) */
export const SCRIPT_0x05_SCENE_1997: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1998 — 场景段1998 (1B) */
export const SCRIPT_0x05_SCENE_1998: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_1999 — 场景段1999 (1B) */
export const SCRIPT_0x05_SCENE_1999: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2000 — 场景段2000 (1B) */
export const SCRIPT_0x05_SCENE_2000: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2001 — 场景段2001 (1B) */
export const SCRIPT_0x05_SCENE_2001: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2002 — 场景段2002 (1B) */
export const SCRIPT_0x05_SCENE_2002: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2003 — 场景段2003 (1B) */
export const SCRIPT_0x05_SCENE_2003: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2004 — 场景段2004 (1B) */
export const SCRIPT_0x05_SCENE_2004: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2005 — 场景段2005 (1B) */
export const SCRIPT_0x05_SCENE_2005: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2006 — 场景段2006 (1B) */
export const SCRIPT_0x05_SCENE_2006: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2007 — 场景段2007 (1B) */
export const SCRIPT_0x05_SCENE_2007: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2008 — 场景段2008 (1B) */
export const SCRIPT_0x05_SCENE_2008: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2009 — 场景段2009 (1B) */
export const SCRIPT_0x05_SCENE_2009: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2010 — 场景段2010 (1B) */
export const SCRIPT_0x05_SCENE_2010: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2011 — 场景段2011 (1B) */
export const SCRIPT_0x05_SCENE_2011: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2012 — 场景段2012 (1B) */
export const SCRIPT_0x05_SCENE_2012: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2013 — 场景段2013 (1B) */
export const SCRIPT_0x05_SCENE_2013: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2014 — 场景段2014 (1B) */
export const SCRIPT_0x05_SCENE_2014: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2015 — 场景段2015 (1B) */
export const SCRIPT_0x05_SCENE_2015: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2016 — 场景段2016 (1B) */
export const SCRIPT_0x05_SCENE_2016: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2017 — 场景段2017 (1B) */
export const SCRIPT_0x05_SCENE_2017: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2018 — 场景段2018 (1B) */
export const SCRIPT_0x05_SCENE_2018: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2019 — 场景段2019 (1B) */
export const SCRIPT_0x05_SCENE_2019: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2020 — 场景段2020 (1B) */
export const SCRIPT_0x05_SCENE_2020: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2021 — 场景段2021 (1B) */
export const SCRIPT_0x05_SCENE_2021: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2022 — 场景段2022 (1B) */
export const SCRIPT_0x05_SCENE_2022: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2023 — 场景段2023 (1B) */
export const SCRIPT_0x05_SCENE_2023: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2024 — 场景段2024 (1B) */
export const SCRIPT_0x05_SCENE_2024: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2025 — 场景段2025 (1B) */
export const SCRIPT_0x05_SCENE_2025: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2026 — 场景段2026 (1B) */
export const SCRIPT_0x05_SCENE_2026: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2027 — 场景段2027 (1B) */
export const SCRIPT_0x05_SCENE_2027: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2028 — 场景段2028 (1B) */
export const SCRIPT_0x05_SCENE_2028: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2029 — 场景段2029 (1B) */
export const SCRIPT_0x05_SCENE_2029: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2030 — 场景段2030 (1B) */
export const SCRIPT_0x05_SCENE_2030: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2031 — 场景段2031 (1B) */
export const SCRIPT_0x05_SCENE_2031: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2032 — 场景段2032 (1B) */
export const SCRIPT_0x05_SCENE_2032: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2033 — 场景段2033 (1B) */
export const SCRIPT_0x05_SCENE_2033: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2034 — 场景段2034 (1B) */
export const SCRIPT_0x05_SCENE_2034: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2035 — 场景段2035 (1B) */
export const SCRIPT_0x05_SCENE_2035: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2036 — 场景段2036 (1B) */
export const SCRIPT_0x05_SCENE_2036: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2037 — 场景段2037 (1B) */
export const SCRIPT_0x05_SCENE_2037: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2038 — 场景段2038 (1B) */
export const SCRIPT_0x05_SCENE_2038: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2039 — 场景段2039 (1B) */
export const SCRIPT_0x05_SCENE_2039: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2040 — 场景段2040 (1B) */
export const SCRIPT_0x05_SCENE_2040: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2041 — 场景段2041 (1B) */
export const SCRIPT_0x05_SCENE_2041: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2042 — 场景段2042 (1B) */
export const SCRIPT_0x05_SCENE_2042: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2043 — 场景段2043 (1B) */
export const SCRIPT_0x05_SCENE_2043: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2044 — 场景段2044 (1B) */
export const SCRIPT_0x05_SCENE_2044: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2045 — 场景段2045 (1B) */
export const SCRIPT_0x05_SCENE_2045: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2046 — 场景段2046 (1B) */
export const SCRIPT_0x05_SCENE_2046: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2047 — 场景段2047 (1B) */
export const SCRIPT_0x05_SCENE_2047: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2048 — 场景段2048 (1B) */
export const SCRIPT_0x05_SCENE_2048: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2049 — 场景段2049 (1B) */
export const SCRIPT_0x05_SCENE_2049: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2050 — 场景段2050 (1B) */
export const SCRIPT_0x05_SCENE_2050: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2051 — 场景段2051 (1B) */
export const SCRIPT_0x05_SCENE_2051: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2052 — 场景段2052 (1B) */
export const SCRIPT_0x05_SCENE_2052: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2053 — 场景段2053 (1B) */
export const SCRIPT_0x05_SCENE_2053: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2054 — 场景段2054 (1B) */
export const SCRIPT_0x05_SCENE_2054: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2055 — 场景段2055 (1B) */
export const SCRIPT_0x05_SCENE_2055: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2056 — 场景段2056 (1B) */
export const SCRIPT_0x05_SCENE_2056: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2057 — 场景段2057 (1B) */
export const SCRIPT_0x05_SCENE_2057: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2058 — 场景段2058 (1B) */
export const SCRIPT_0x05_SCENE_2058: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2059 — 场景段2059 (1B) */
export const SCRIPT_0x05_SCENE_2059: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2060 — 场景段2060 (1B) */
export const SCRIPT_0x05_SCENE_2060: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2061 — 场景段2061 (1B) */
export const SCRIPT_0x05_SCENE_2061: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2062 — 场景段2062 (1B) */
export const SCRIPT_0x05_SCENE_2062: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2063 — 场景段2063 (1B) */
export const SCRIPT_0x05_SCENE_2063: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2064 — 场景段2064 (1B) */
export const SCRIPT_0x05_SCENE_2064: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2065 — 场景段2065 (1B) */
export const SCRIPT_0x05_SCENE_2065: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2066 — 场景段2066 (1B) */
export const SCRIPT_0x05_SCENE_2066: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2067 — 场景段2067 (1B) */
export const SCRIPT_0x05_SCENE_2067: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2068 — 场景段2068 (1B) */
export const SCRIPT_0x05_SCENE_2068: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2069 — 场景段2069 (1B) */
export const SCRIPT_0x05_SCENE_2069: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2070 — 场景段2070 (1B) */
export const SCRIPT_0x05_SCENE_2070: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2071 — 场景段2071 (1B) */
export const SCRIPT_0x05_SCENE_2071: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2072 — 场景段2072 (1B) */
export const SCRIPT_0x05_SCENE_2072: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2073 — 场景段2073 (1B) */
export const SCRIPT_0x05_SCENE_2073: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2074 — 场景段2074 (1B) */
export const SCRIPT_0x05_SCENE_2074: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2075 — 场景段2075 (1B) */
export const SCRIPT_0x05_SCENE_2075: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2076 — 场景段2076 (1B) */
export const SCRIPT_0x05_SCENE_2076: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2077 — 场景段2077 (1B) */
export const SCRIPT_0x05_SCENE_2077: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2078 — 场景段2078 (1B) */
export const SCRIPT_0x05_SCENE_2078: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2079 — 场景段2079 (1B) */
export const SCRIPT_0x05_SCENE_2079: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2080 — 场景段2080 (1B) */
export const SCRIPT_0x05_SCENE_2080: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2081 — 场景段2081 (1B) */
export const SCRIPT_0x05_SCENE_2081: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2082 — 场景段2082 (1B) */
export const SCRIPT_0x05_SCENE_2082: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2083 — 场景段2083 (1B) */
export const SCRIPT_0x05_SCENE_2083: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2084 — 场景段2084 (1B) */
export const SCRIPT_0x05_SCENE_2084: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2085 — 场景段2085 (1B) */
export const SCRIPT_0x05_SCENE_2085: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2086 — 场景段2086 (1B) */
export const SCRIPT_0x05_SCENE_2086: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2087 — 场景段2087 (1B) */
export const SCRIPT_0x05_SCENE_2087: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2088 — 场景段2088 (1B) */
export const SCRIPT_0x05_SCENE_2088: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2089 — 场景段2089 (1B) */
export const SCRIPT_0x05_SCENE_2089: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2090 — 场景段2090 (1B) */
export const SCRIPT_0x05_SCENE_2090: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2091 — 场景段2091 (1B) */
export const SCRIPT_0x05_SCENE_2091: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2092 — 场景段2092 (1B) */
export const SCRIPT_0x05_SCENE_2092: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2093 — 场景段2093 (1B) */
export const SCRIPT_0x05_SCENE_2093: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2094 — 场景段2094 (1B) */
export const SCRIPT_0x05_SCENE_2094: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2095 — 场景段2095 (1B) */
export const SCRIPT_0x05_SCENE_2095: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2096 — 场景段2096 (1B) */
export const SCRIPT_0x05_SCENE_2096: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2097 — 场景段2097 (1B) */
export const SCRIPT_0x05_SCENE_2097: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2098 — 场景段2098 (1B) */
export const SCRIPT_0x05_SCENE_2098: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2099 — 场景段2099 (1B) */
export const SCRIPT_0x05_SCENE_2099: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2100 — 场景段2100 (1B) */
export const SCRIPT_0x05_SCENE_2100: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2101 — 场景段2101 (1B) */
export const SCRIPT_0x05_SCENE_2101: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2102 — 场景段2102 (1B) */
export const SCRIPT_0x05_SCENE_2102: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2103 — 场景段2103 (1B) */
export const SCRIPT_0x05_SCENE_2103: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2104 — 场景段2104 (1B) */
export const SCRIPT_0x05_SCENE_2104: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2105 — 场景段2105 (1B) */
export const SCRIPT_0x05_SCENE_2105: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2106 — 场景段2106 (1B) */
export const SCRIPT_0x05_SCENE_2106: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2107 — 场景段2107 (1B) */
export const SCRIPT_0x05_SCENE_2107: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2108 — 场景段2108 (1B) */
export const SCRIPT_0x05_SCENE_2108: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2109 — 场景段2109 (1B) */
export const SCRIPT_0x05_SCENE_2109: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2110 — 场景段2110 (1B) */
export const SCRIPT_0x05_SCENE_2110: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2111 — 场景段2111 (1B) */
export const SCRIPT_0x05_SCENE_2111: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2112 — 场景段2112 (1B) */
export const SCRIPT_0x05_SCENE_2112: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2113 — 场景段2113 (1B) */
export const SCRIPT_0x05_SCENE_2113: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2114 — 场景段2114 (1B) */
export const SCRIPT_0x05_SCENE_2114: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2115 — 场景段2115 (1B) */
export const SCRIPT_0x05_SCENE_2115: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2116 — 场景段2116 (1B) */
export const SCRIPT_0x05_SCENE_2116: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2117 — 场景段2117 (1B) */
export const SCRIPT_0x05_SCENE_2117: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2118 — 场景段2118 (1B) */
export const SCRIPT_0x05_SCENE_2118: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2119 — 场景段2119 (1B) */
export const SCRIPT_0x05_SCENE_2119: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2120 — 场景段2120 (1B) */
export const SCRIPT_0x05_SCENE_2120: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2121 — 场景段2121 (1B) */
export const SCRIPT_0x05_SCENE_2121: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2122 — 场景段2122 (1B) */
export const SCRIPT_0x05_SCENE_2122: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2123 — 场景段2123 (1B) */
export const SCRIPT_0x05_SCENE_2123: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2124 — 场景段2124 (1B) */
export const SCRIPT_0x05_SCENE_2124: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2125 — 场景段2125 (1B) */
export const SCRIPT_0x05_SCENE_2125: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2126 — 场景段2126 (1B) */
export const SCRIPT_0x05_SCENE_2126: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2127 — 场景段2127 (1B) */
export const SCRIPT_0x05_SCENE_2127: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2128 — 场景段2128 (1B) */
export const SCRIPT_0x05_SCENE_2128: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2129 — 场景段2129 (1B) */
export const SCRIPT_0x05_SCENE_2129: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2130 — 场景段2130 (1B) */
export const SCRIPT_0x05_SCENE_2130: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2131 — 场景段2131 (1B) */
export const SCRIPT_0x05_SCENE_2131: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2132 — 场景段2132 (1B) */
export const SCRIPT_0x05_SCENE_2132: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2133 — 场景段2133 (1B) */
export const SCRIPT_0x05_SCENE_2133: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2134 — 场景段2134 (1B) */
export const SCRIPT_0x05_SCENE_2134: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2135 — 场景段2135 (1B) */
export const SCRIPT_0x05_SCENE_2135: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2136 — 场景段2136 (1B) */
export const SCRIPT_0x05_SCENE_2136: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2137 — 场景段2137 (1B) */
export const SCRIPT_0x05_SCENE_2137: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2138 — 场景段2138 (1B) */
export const SCRIPT_0x05_SCENE_2138: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2139 — 场景段2139 (1B) */
export const SCRIPT_0x05_SCENE_2139: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2140 — 场景段2140 (1B) */
export const SCRIPT_0x05_SCENE_2140: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2141 — 场景段2141 (1B) */
export const SCRIPT_0x05_SCENE_2141: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2142 — 场景段2142 (1B) */
export const SCRIPT_0x05_SCENE_2142: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2143 — 场景段2143 (1B) */
export const SCRIPT_0x05_SCENE_2143: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2144 — 场景段2144 (1B) */
export const SCRIPT_0x05_SCENE_2144: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2145 — 场景段2145 (1B) */
export const SCRIPT_0x05_SCENE_2145: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2146 — 场景段2146 (1B) */
export const SCRIPT_0x05_SCENE_2146: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2147 — 场景段2147 (1B) */
export const SCRIPT_0x05_SCENE_2147: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2148 — 场景段2148 (1B) */
export const SCRIPT_0x05_SCENE_2148: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2149 — 场景段2149 (1B) */
export const SCRIPT_0x05_SCENE_2149: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2150 — 场景段2150 (1B) */
export const SCRIPT_0x05_SCENE_2150: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2151 — 场景段2151 (1B) */
export const SCRIPT_0x05_SCENE_2151: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2152 — 场景段2152 (1B) */
export const SCRIPT_0x05_SCENE_2152: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2153 — 场景段2153 (1B) */
export const SCRIPT_0x05_SCENE_2153: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2154 — 场景段2154 (1B) */
export const SCRIPT_0x05_SCENE_2154: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2155 — 场景段2155 (1B) */
export const SCRIPT_0x05_SCENE_2155: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2156 — 场景段2156 (1B) */
export const SCRIPT_0x05_SCENE_2156: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2157 — 场景段2157 (1B) */
export const SCRIPT_0x05_SCENE_2157: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2158 — 场景段2158 (1B) */
export const SCRIPT_0x05_SCENE_2158: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2159 — 场景段2159 (1B) */
export const SCRIPT_0x05_SCENE_2159: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2160 — 场景段2160 (1B) */
export const SCRIPT_0x05_SCENE_2160: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2161 — 场景段2161 (1B) */
export const SCRIPT_0x05_SCENE_2161: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2162 — 场景段2162 (1B) */
export const SCRIPT_0x05_SCENE_2162: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2163 — 场景段2163 (1B) */
export const SCRIPT_0x05_SCENE_2163: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2164 — 场景段2164 (1B) */
export const SCRIPT_0x05_SCENE_2164: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2165 — 场景段2165 (1B) */
export const SCRIPT_0x05_SCENE_2165: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2166 — 场景段2166 (1B) */
export const SCRIPT_0x05_SCENE_2166: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2167 — 场景段2167 (1B) */
export const SCRIPT_0x05_SCENE_2167: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2168 — 场景段2168 (1B) */
export const SCRIPT_0x05_SCENE_2168: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2169 — 场景段2169 (1B) */
export const SCRIPT_0x05_SCENE_2169: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2170 — 场景段2170 (1B) */
export const SCRIPT_0x05_SCENE_2170: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2171 — 场景段2171 (1B) */
export const SCRIPT_0x05_SCENE_2171: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2172 — 场景段2172 (1B) */
export const SCRIPT_0x05_SCENE_2172: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2173 — 场景段2173 (1B) */
export const SCRIPT_0x05_SCENE_2173: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2174 — 场景段2174 (1B) */
export const SCRIPT_0x05_SCENE_2174: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2175 — 场景段2175 (1B) */
export const SCRIPT_0x05_SCENE_2175: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2176 — 场景段2176 (1B) */
export const SCRIPT_0x05_SCENE_2176: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2177 — 场景段2177 (1B) */
export const SCRIPT_0x05_SCENE_2177: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2178 — 场景段2178 (1B) */
export const SCRIPT_0x05_SCENE_2178: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2179 — 场景段2179 (1B) */
export const SCRIPT_0x05_SCENE_2179: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2180 — 场景段2180 (1B) */
export const SCRIPT_0x05_SCENE_2180: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2181 — 场景段2181 (1B) */
export const SCRIPT_0x05_SCENE_2181: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2182 — 场景段2182 (1B) */
export const SCRIPT_0x05_SCENE_2182: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2183 — 场景段2183 (1B) */
export const SCRIPT_0x05_SCENE_2183: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2184 — 场景段2184 (1B) */
export const SCRIPT_0x05_SCENE_2184: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2185 — 场景段2185 (1B) */
export const SCRIPT_0x05_SCENE_2185: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2186 — 场景段2186 (1B) */
export const SCRIPT_0x05_SCENE_2186: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2187 — 场景段2187 (1B) */
export const SCRIPT_0x05_SCENE_2187: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2188 — 场景段2188 (1B) */
export const SCRIPT_0x05_SCENE_2188: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2189 — 场景段2189 (1B) */
export const SCRIPT_0x05_SCENE_2189: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2190 — 场景段2190 (1B) */
export const SCRIPT_0x05_SCENE_2190: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2191 — 场景段2191 (1B) */
export const SCRIPT_0x05_SCENE_2191: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2192 — 场景段2192 (1B) */
export const SCRIPT_0x05_SCENE_2192: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2193 — 场景段2193 (1B) */
export const SCRIPT_0x05_SCENE_2193: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2194 — 场景段2194 (1B) */
export const SCRIPT_0x05_SCENE_2194: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2195 — 场景段2195 (1B) */
export const SCRIPT_0x05_SCENE_2195: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2196 — 场景段2196 (1B) */
export const SCRIPT_0x05_SCENE_2196: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2197 — 场景段2197 (1B) */
export const SCRIPT_0x05_SCENE_2197: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2198 — 场景段2198 (1B) */
export const SCRIPT_0x05_SCENE_2198: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2199 — 场景段2199 (1B) */
export const SCRIPT_0x05_SCENE_2199: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2200 — 场景段2200 (1B) */
export const SCRIPT_0x05_SCENE_2200: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2201 — 场景段2201 (1B) */
export const SCRIPT_0x05_SCENE_2201: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2202 — 场景段2202 (1B) */
export const SCRIPT_0x05_SCENE_2202: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2203 — 场景段2203 (1B) */
export const SCRIPT_0x05_SCENE_2203: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2204 — 场景段2204 (1B) */
export const SCRIPT_0x05_SCENE_2204: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2205 — 场景段2205 (1B) */
export const SCRIPT_0x05_SCENE_2205: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2206 — 场景段2206 (1B) */
export const SCRIPT_0x05_SCENE_2206: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2207 — 场景段2207 (1B) */
export const SCRIPT_0x05_SCENE_2207: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2208 — 场景段2208 (1B) */
export const SCRIPT_0x05_SCENE_2208: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2209 — 场景段2209 (1B) */
export const SCRIPT_0x05_SCENE_2209: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2210 — 场景段2210 (1B) */
export const SCRIPT_0x05_SCENE_2210: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2211 — 场景段2211 (1B) */
export const SCRIPT_0x05_SCENE_2211: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2212 — 场景段2212 (1B) */
export const SCRIPT_0x05_SCENE_2212: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2213 — 场景段2213 (1B) */
export const SCRIPT_0x05_SCENE_2213: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2214 — 场景段2214 (1B) */
export const SCRIPT_0x05_SCENE_2214: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2215 — 场景段2215 (1B) */
export const SCRIPT_0x05_SCENE_2215: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2216 — 场景段2216 (1B) */
export const SCRIPT_0x05_SCENE_2216: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2217 — 场景段2217 (1B) */
export const SCRIPT_0x05_SCENE_2217: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2218 — 场景段2218 (1B) */
export const SCRIPT_0x05_SCENE_2218: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2219 — 场景段2219 (1B) */
export const SCRIPT_0x05_SCENE_2219: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2220 — 场景段2220 (1B) */
export const SCRIPT_0x05_SCENE_2220: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2221 — 场景段2221 (1B) */
export const SCRIPT_0x05_SCENE_2221: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2222 — 场景段2222 (1B) */
export const SCRIPT_0x05_SCENE_2222: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2223 — 场景段2223 (1B) */
export const SCRIPT_0x05_SCENE_2223: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2224 — 场景段2224 (1B) */
export const SCRIPT_0x05_SCENE_2224: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2225 — 场景段2225 (1B) */
export const SCRIPT_0x05_SCENE_2225: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2226 — 场景段2226 (1B) */
export const SCRIPT_0x05_SCENE_2226: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2227 — 场景段2227 (1B) */
export const SCRIPT_0x05_SCENE_2227: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2228 — 场景段2228 (1B) */
export const SCRIPT_0x05_SCENE_2228: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2229 — 场景段2229 (1B) */
export const SCRIPT_0x05_SCENE_2229: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2230 — 场景段2230 (1B) */
export const SCRIPT_0x05_SCENE_2230: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2231 — 场景段2231 (1B) */
export const SCRIPT_0x05_SCENE_2231: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2232 — 场景段2232 (1B) */
export const SCRIPT_0x05_SCENE_2232: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2233 — 场景段2233 (1B) */
export const SCRIPT_0x05_SCENE_2233: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2234 — 场景段2234 (1B) */
export const SCRIPT_0x05_SCENE_2234: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2235 — 场景段2235 (1B) */
export const SCRIPT_0x05_SCENE_2235: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2236 — 场景段2236 (1B) */
export const SCRIPT_0x05_SCENE_2236: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2237 — 场景段2237 (1B) */
export const SCRIPT_0x05_SCENE_2237: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2238 — 场景段2238 (1B) */
export const SCRIPT_0x05_SCENE_2238: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2239 — 场景段2239 (1B) */
export const SCRIPT_0x05_SCENE_2239: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2240 — 场景段2240 (1B) */
export const SCRIPT_0x05_SCENE_2240: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2241 — 场景段2241 (1B) */
export const SCRIPT_0x05_SCENE_2241: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2242 — 场景段2242 (1B) */
export const SCRIPT_0x05_SCENE_2242: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2243 — 场景段2243 (1B) */
export const SCRIPT_0x05_SCENE_2243: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2244 — 场景段2244 (1B) */
export const SCRIPT_0x05_SCENE_2244: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2245 — 场景段2245 (1B) */
export const SCRIPT_0x05_SCENE_2245: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2246 — 场景段2246 (1B) */
export const SCRIPT_0x05_SCENE_2246: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2247 — 场景段2247 (1B) */
export const SCRIPT_0x05_SCENE_2247: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2248 — 场景段2248 (1B) */
export const SCRIPT_0x05_SCENE_2248: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2249 — 场景段2249 (1B) */
export const SCRIPT_0x05_SCENE_2249: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2250 — 场景段2250 (1B) */
export const SCRIPT_0x05_SCENE_2250: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2251 — 场景段2251 (1B) */
export const SCRIPT_0x05_SCENE_2251: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2252 — 场景段2252 (1B) */
export const SCRIPT_0x05_SCENE_2252: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2253 — 场景段2253 (1B) */
export const SCRIPT_0x05_SCENE_2253: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2254 — 场景段2254 (1B) */
export const SCRIPT_0x05_SCENE_2254: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2255 — 场景段2255 (1B) */
export const SCRIPT_0x05_SCENE_2255: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2256 — 场景段2256 (1B) */
export const SCRIPT_0x05_SCENE_2256: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2257 — 场景段2257 (1B) */
export const SCRIPT_0x05_SCENE_2257: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2258 — 场景段2258 (1B) */
export const SCRIPT_0x05_SCENE_2258: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2259 — 场景段2259 (1B) */
export const SCRIPT_0x05_SCENE_2259: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2260 — 场景段2260 (1B) */
export const SCRIPT_0x05_SCENE_2260: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2261 — 场景段2261 (1B) */
export const SCRIPT_0x05_SCENE_2261: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2262 — 场景段2262 (1B) */
export const SCRIPT_0x05_SCENE_2262: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2263 — 场景段2263 (1B) */
export const SCRIPT_0x05_SCENE_2263: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2264 — 场景段2264 (1B) */
export const SCRIPT_0x05_SCENE_2264: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2265 — 场景段2265 (1B) */
export const SCRIPT_0x05_SCENE_2265: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2266 — 场景段2266 (1B) */
export const SCRIPT_0x05_SCENE_2266: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2267 — 场景段2267 (1B) */
export const SCRIPT_0x05_SCENE_2267: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2268 — 场景段2268 (1B) */
export const SCRIPT_0x05_SCENE_2268: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2269 — 场景段2269 (1B) */
export const SCRIPT_0x05_SCENE_2269: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2270 — 场景段2270 (1B) */
export const SCRIPT_0x05_SCENE_2270: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2271 — 场景段2271 (1B) */
export const SCRIPT_0x05_SCENE_2271: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2272 — 场景段2272 (1B) */
export const SCRIPT_0x05_SCENE_2272: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2273 — 场景段2273 (1B) */
export const SCRIPT_0x05_SCENE_2273: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2274 — 场景段2274 (1B) */
export const SCRIPT_0x05_SCENE_2274: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2275 — 场景段2275 (1B) */
export const SCRIPT_0x05_SCENE_2275: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2276 — 场景段2276 (1B) */
export const SCRIPT_0x05_SCENE_2276: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2277 — 场景段2277 (1B) */
export const SCRIPT_0x05_SCENE_2277: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2278 — 场景段2278 (1B) */
export const SCRIPT_0x05_SCENE_2278: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2279 — 场景段2279 (1B) */
export const SCRIPT_0x05_SCENE_2279: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2280 — 场景段2280 (1B) */
export const SCRIPT_0x05_SCENE_2280: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2281 — 场景段2281 (1B) */
export const SCRIPT_0x05_SCENE_2281: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2282 — 场景段2282 (1B) */
export const SCRIPT_0x05_SCENE_2282: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2283 — 场景段2283 (1B) */
export const SCRIPT_0x05_SCENE_2283: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2284 — 场景段2284 (1B) */
export const SCRIPT_0x05_SCENE_2284: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2285 — 场景段2285 (1B) */
export const SCRIPT_0x05_SCENE_2285: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2286 — 场景段2286 (1B) */
export const SCRIPT_0x05_SCENE_2286: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2287 — 场景段2287 (1B) */
export const SCRIPT_0x05_SCENE_2287: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2288 — 场景段2288 (1B) */
export const SCRIPT_0x05_SCENE_2288: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2289 — 场景段2289 (1B) */
export const SCRIPT_0x05_SCENE_2289: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2290 — 场景段2290 (1B) */
export const SCRIPT_0x05_SCENE_2290: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2291 — 场景段2291 (1B) */
export const SCRIPT_0x05_SCENE_2291: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2292 — 场景段2292 (1B) */
export const SCRIPT_0x05_SCENE_2292: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2293 — 场景段2293 (1B) */
export const SCRIPT_0x05_SCENE_2293: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2294 — 场景段2294 (1B) */
export const SCRIPT_0x05_SCENE_2294: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2295 — 场景段2295 (1B) */
export const SCRIPT_0x05_SCENE_2295: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2296 — 场景段2296 (1B) */
export const SCRIPT_0x05_SCENE_2296: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2297 — 场景段2297 (1B) */
export const SCRIPT_0x05_SCENE_2297: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2298 — 场景段2298 (1B) */
export const SCRIPT_0x05_SCENE_2298: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2299 — 场景段2299 (1B) */
export const SCRIPT_0x05_SCENE_2299: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2300 — 场景段2300 (1B) */
export const SCRIPT_0x05_SCENE_2300: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2301 — 场景段2301 (1B) */
export const SCRIPT_0x05_SCENE_2301: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2302 — 场景段2302 (1B) */
export const SCRIPT_0x05_SCENE_2302: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2303 — 场景段2303 (1B) */
export const SCRIPT_0x05_SCENE_2303: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2304 — 场景段2304 (1B) */
export const SCRIPT_0x05_SCENE_2304: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2305 — 场景段2305 (1B) */
export const SCRIPT_0x05_SCENE_2305: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2306 — 场景段2306 (1B) */
export const SCRIPT_0x05_SCENE_2306: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2307 — 场景段2307 (1B) */
export const SCRIPT_0x05_SCENE_2307: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2308 — 场景段2308 (1B) */
export const SCRIPT_0x05_SCENE_2308: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2309 — 场景段2309 (1B) */
export const SCRIPT_0x05_SCENE_2309: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2310 — 场景段2310 (1B) */
export const SCRIPT_0x05_SCENE_2310: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2311 — 场景段2311 (1B) */
export const SCRIPT_0x05_SCENE_2311: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2312 — 场景段2312 (1B) */
export const SCRIPT_0x05_SCENE_2312: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2313 — 场景段2313 (1B) */
export const SCRIPT_0x05_SCENE_2313: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2314 — 场景段2314 (1B) */
export const SCRIPT_0x05_SCENE_2314: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2315 — 场景段2315 (1B) */
export const SCRIPT_0x05_SCENE_2315: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2316 — 场景段2316 (1B) */
export const SCRIPT_0x05_SCENE_2316: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2317 — 场景段2317 (1B) */
export const SCRIPT_0x05_SCENE_2317: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2318 — 场景段2318 (1B) */
export const SCRIPT_0x05_SCENE_2318: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2319 — 场景段2319 (1B) */
export const SCRIPT_0x05_SCENE_2319: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2320 — 场景段2320 (1B) */
export const SCRIPT_0x05_SCENE_2320: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2321 — 场景段2321 (1B) */
export const SCRIPT_0x05_SCENE_2321: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2322 — 场景段2322 (1B) */
export const SCRIPT_0x05_SCENE_2322: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2323 — 场景段2323 (1B) */
export const SCRIPT_0x05_SCENE_2323: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2324 — 场景段2324 (1B) */
export const SCRIPT_0x05_SCENE_2324: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2325 — 场景段2325 (1B) */
export const SCRIPT_0x05_SCENE_2325: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2326 — 场景段2326 (1B) */
export const SCRIPT_0x05_SCENE_2326: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2327 — 场景段2327 (1B) */
export const SCRIPT_0x05_SCENE_2327: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2328 — 场景段2328 (1B) */
export const SCRIPT_0x05_SCENE_2328: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2329 — 场景段2329 (1B) */
export const SCRIPT_0x05_SCENE_2329: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2330 — 场景段2330 (1B) */
export const SCRIPT_0x05_SCENE_2330: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2331 — 场景段2331 (1B) */
export const SCRIPT_0x05_SCENE_2331: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2332 — 场景段2332 (1B) */
export const SCRIPT_0x05_SCENE_2332: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2333 — 场景段2333 (1B) */
export const SCRIPT_0x05_SCENE_2333: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2334 — 场景段2334 (1B) */
export const SCRIPT_0x05_SCENE_2334: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2335 — 场景段2335 (1B) */
export const SCRIPT_0x05_SCENE_2335: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2336 — 场景段2336 (1B) */
export const SCRIPT_0x05_SCENE_2336: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2337 — 场景段2337 (1B) */
export const SCRIPT_0x05_SCENE_2337: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2338 — 场景段2338 (1B) */
export const SCRIPT_0x05_SCENE_2338: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2339 — 场景段2339 (1B) */
export const SCRIPT_0x05_SCENE_2339: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2340 — 场景段2340 (1B) */
export const SCRIPT_0x05_SCENE_2340: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2341 — 场景段2341 (1B) */
export const SCRIPT_0x05_SCENE_2341: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2342 — 场景段2342 (1B) */
export const SCRIPT_0x05_SCENE_2342: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2343 — 场景段2343 (1B) */
export const SCRIPT_0x05_SCENE_2343: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2344 — 场景段2344 (1B) */
export const SCRIPT_0x05_SCENE_2344: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2345 — 场景段2345 (1B) */
export const SCRIPT_0x05_SCENE_2345: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2346 — 场景段2346 (1B) */
export const SCRIPT_0x05_SCENE_2346: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2347 — 场景段2347 (1B) */
export const SCRIPT_0x05_SCENE_2347: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2348 — 场景段2348 (1B) */
export const SCRIPT_0x05_SCENE_2348: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2349 — 场景段2349 (1B) */
export const SCRIPT_0x05_SCENE_2349: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2350 — 场景段2350 (1B) */
export const SCRIPT_0x05_SCENE_2350: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2351 — 场景段2351 (1B) */
export const SCRIPT_0x05_SCENE_2351: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2352 — 场景段2352 (1B) */
export const SCRIPT_0x05_SCENE_2352: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2353 — 场景段2353 (1B) */
export const SCRIPT_0x05_SCENE_2353: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2354 — 场景段2354 (1B) */
export const SCRIPT_0x05_SCENE_2354: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2355 — 场景段2355 (1B) */
export const SCRIPT_0x05_SCENE_2355: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2356 — 场景段2356 (1B) */
export const SCRIPT_0x05_SCENE_2356: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2357 — 场景段2357 (1B) */
export const SCRIPT_0x05_SCENE_2357: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2358 — 场景段2358 (1B) */
export const SCRIPT_0x05_SCENE_2358: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2359 — 场景段2359 (1B) */
export const SCRIPT_0x05_SCENE_2359: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2360 — 场景段2360 (1B) */
export const SCRIPT_0x05_SCENE_2360: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2361 — 场景段2361 (1B) */
export const SCRIPT_0x05_SCENE_2361: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2362 — 场景段2362 (1B) */
export const SCRIPT_0x05_SCENE_2362: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2363 — 场景段2363 (1B) */
export const SCRIPT_0x05_SCENE_2363: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2364 — 场景段2364 (1B) */
export const SCRIPT_0x05_SCENE_2364: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2365 — 场景段2365 (1B) */
export const SCRIPT_0x05_SCENE_2365: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2366 — 场景段2366 (1B) */
export const SCRIPT_0x05_SCENE_2366: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2367 — 场景段2367 (1B) */
export const SCRIPT_0x05_SCENE_2367: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2368 — 场景段2368 (1B) */
export const SCRIPT_0x05_SCENE_2368: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2369 — 场景段2369 (1B) */
export const SCRIPT_0x05_SCENE_2369: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2370 — 场景段2370 (1B) */
export const SCRIPT_0x05_SCENE_2370: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2371 — 场景段2371 (1B) */
export const SCRIPT_0x05_SCENE_2371: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2372 — 场景段2372 (1B) */
export const SCRIPT_0x05_SCENE_2372: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2373 — 场景段2373 (1B) */
export const SCRIPT_0x05_SCENE_2373: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2374 — 场景段2374 (1B) */
export const SCRIPT_0x05_SCENE_2374: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2375 — 场景段2375 (1B) */
export const SCRIPT_0x05_SCENE_2375: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2376 — 场景段2376 (1B) */
export const SCRIPT_0x05_SCENE_2376: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2377 — 场景段2377 (1B) */
export const SCRIPT_0x05_SCENE_2377: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2378 — 场景段2378 (1B) */
export const SCRIPT_0x05_SCENE_2378: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2379 — 场景段2379 (1B) */
export const SCRIPT_0x05_SCENE_2379: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2380 — 场景段2380 (1B) */
export const SCRIPT_0x05_SCENE_2380: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2381 — 场景段2381 (1B) */
export const SCRIPT_0x05_SCENE_2381: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2382 — 场景段2382 (1B) */
export const SCRIPT_0x05_SCENE_2382: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2383 — 场景段2383 (1B) */
export const SCRIPT_0x05_SCENE_2383: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2384 — 场景段2384 (1B) */
export const SCRIPT_0x05_SCENE_2384: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2385 — 场景段2385 (1B) */
export const SCRIPT_0x05_SCENE_2385: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2386 — 场景段2386 (1B) */
export const SCRIPT_0x05_SCENE_2386: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2387 — 场景段2387 (1B) */
export const SCRIPT_0x05_SCENE_2387: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2388 — 场景段2388 (1B) */
export const SCRIPT_0x05_SCENE_2388: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2389 — 场景段2389 (1B) */
export const SCRIPT_0x05_SCENE_2389: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2390 — 场景段2390 (1B) */
export const SCRIPT_0x05_SCENE_2390: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2391 — 场景段2391 (1B) */
export const SCRIPT_0x05_SCENE_2391: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2392 — 场景段2392 (1B) */
export const SCRIPT_0x05_SCENE_2392: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2393 — 场景段2393 (1B) */
export const SCRIPT_0x05_SCENE_2393: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2394 — 场景段2394 (1B) */
export const SCRIPT_0x05_SCENE_2394: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2395 — 场景段2395 (1B) */
export const SCRIPT_0x05_SCENE_2395: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2396 — 场景段2396 (1B) */
export const SCRIPT_0x05_SCENE_2396: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2397 — 场景段2397 (1B) */
export const SCRIPT_0x05_SCENE_2397: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2398 — 场景段2398 (1B) */
export const SCRIPT_0x05_SCENE_2398: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2399 — 场景段2399 (1B) */
export const SCRIPT_0x05_SCENE_2399: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2400 — 场景段2400 (1B) */
export const SCRIPT_0x05_SCENE_2400: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2401 — 场景段2401 (1B) */
export const SCRIPT_0x05_SCENE_2401: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2402 — 场景段2402 (1B) */
export const SCRIPT_0x05_SCENE_2402: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2403 — 场景段2403 (1B) */
export const SCRIPT_0x05_SCENE_2403: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2404 — 场景段2404 (1B) */
export const SCRIPT_0x05_SCENE_2404: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2405 — 场景段2405 (1B) */
export const SCRIPT_0x05_SCENE_2405: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2406 — 场景段2406 (1B) */
export const SCRIPT_0x05_SCENE_2406: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2407 — 场景段2407 (1B) */
export const SCRIPT_0x05_SCENE_2407: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2408 — 场景段2408 (1B) */
export const SCRIPT_0x05_SCENE_2408: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2409 — 场景段2409 (1B) */
export const SCRIPT_0x05_SCENE_2409: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2410 — 场景段2410 (1B) */
export const SCRIPT_0x05_SCENE_2410: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2411 — 场景段2411 (1B) */
export const SCRIPT_0x05_SCENE_2411: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2412 — 场景段2412 (1B) */
export const SCRIPT_0x05_SCENE_2412: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2413 — 场景段2413 (1B) */
export const SCRIPT_0x05_SCENE_2413: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2414 — 场景段2414 (1B) */
export const SCRIPT_0x05_SCENE_2414: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2415 — 场景段2415 (1B) */
export const SCRIPT_0x05_SCENE_2415: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2416 — 场景段2416 (1B) */
export const SCRIPT_0x05_SCENE_2416: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2417 — 场景段2417 (1B) */
export const SCRIPT_0x05_SCENE_2417: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2418 — 场景段2418 (1B) */
export const SCRIPT_0x05_SCENE_2418: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2419 — 场景段2419 (1B) */
export const SCRIPT_0x05_SCENE_2419: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2420 — 场景段2420 (1B) */
export const SCRIPT_0x05_SCENE_2420: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2421 — 场景段2421 (1B) */
export const SCRIPT_0x05_SCENE_2421: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2422 — 场景段2422 (1B) */
export const SCRIPT_0x05_SCENE_2422: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2423 — 场景段2423 (1B) */
export const SCRIPT_0x05_SCENE_2423: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2424 — 场景段2424 (1B) */
export const SCRIPT_0x05_SCENE_2424: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2425 — 场景段2425 (1B) */
export const SCRIPT_0x05_SCENE_2425: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2426 — 场景段2426 (1B) */
export const SCRIPT_0x05_SCENE_2426: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2427 — 场景段2427 (1B) */
export const SCRIPT_0x05_SCENE_2427: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2428 — 场景段2428 (1B) */
export const SCRIPT_0x05_SCENE_2428: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2429 — 场景段2429 (1B) */
export const SCRIPT_0x05_SCENE_2429: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2430 — 场景段2430 (1B) */
export const SCRIPT_0x05_SCENE_2430: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2431 — 场景段2431 (1B) */
export const SCRIPT_0x05_SCENE_2431: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2432 — 场景段2432 (1B) */
export const SCRIPT_0x05_SCENE_2432: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2433 — 场景段2433 (1B) */
export const SCRIPT_0x05_SCENE_2433: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2434 — 场景段2434 (1B) */
export const SCRIPT_0x05_SCENE_2434: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2435 — 场景段2435 (1B) */
export const SCRIPT_0x05_SCENE_2435: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2436 — 场景段2436 (1B) */
export const SCRIPT_0x05_SCENE_2436: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2437 — 场景段2437 (1B) */
export const SCRIPT_0x05_SCENE_2437: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2438 — 场景段2438 (1B) */
export const SCRIPT_0x05_SCENE_2438: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2439 — 场景段2439 (1B) */
export const SCRIPT_0x05_SCENE_2439: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2440 — 场景段2440 (1B) */
export const SCRIPT_0x05_SCENE_2440: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2441 — 场景段2441 (1B) */
export const SCRIPT_0x05_SCENE_2441: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2442 — 场景段2442 (1B) */
export const SCRIPT_0x05_SCENE_2442: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2443 — 场景段2443 (1B) */
export const SCRIPT_0x05_SCENE_2443: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2444 — 场景段2444 (1B) */
export const SCRIPT_0x05_SCENE_2444: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2445 — 场景段2445 (1B) */
export const SCRIPT_0x05_SCENE_2445: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2446 — 场景段2446 (1B) */
export const SCRIPT_0x05_SCENE_2446: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2447 — 场景段2447 (1B) */
export const SCRIPT_0x05_SCENE_2447: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2448 — 场景段2448 (1B) */
export const SCRIPT_0x05_SCENE_2448: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2449 — 场景段2449 (1B) */
export const SCRIPT_0x05_SCENE_2449: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2450 — 场景段2450 (1B) */
export const SCRIPT_0x05_SCENE_2450: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2451 — 场景段2451 (1B) */
export const SCRIPT_0x05_SCENE_2451: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2452 — 场景段2452 (1B) */
export const SCRIPT_0x05_SCENE_2452: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2453 — 场景段2453 (1B) */
export const SCRIPT_0x05_SCENE_2453: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2454 — 场景段2454 (1B) */
export const SCRIPT_0x05_SCENE_2454: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2455 — 场景段2455 (1B) */
export const SCRIPT_0x05_SCENE_2455: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2456 — 场景段2456 (1B) */
export const SCRIPT_0x05_SCENE_2456: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2457 — 场景段2457 (1B) */
export const SCRIPT_0x05_SCENE_2457: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2458 — 场景段2458 (1B) */
export const SCRIPT_0x05_SCENE_2458: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2459 — 场景段2459 (1B) */
export const SCRIPT_0x05_SCENE_2459: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2460 — 场景段2460 (1B) */
export const SCRIPT_0x05_SCENE_2460: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2461 — 场景段2461 (1B) */
export const SCRIPT_0x05_SCENE_2461: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2462 — 场景段2462 (1B) */
export const SCRIPT_0x05_SCENE_2462: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2463 — 场景段2463 (1B) */
export const SCRIPT_0x05_SCENE_2463: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2464 — 场景段2464 (1B) */
export const SCRIPT_0x05_SCENE_2464: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2465 — 场景段2465 (1B) */
export const SCRIPT_0x05_SCENE_2465: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2466 — 场景段2466 (1B) */
export const SCRIPT_0x05_SCENE_2466: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2467 — 场景段2467 (1B) */
export const SCRIPT_0x05_SCENE_2467: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2468 — 场景段2468 (1B) */
export const SCRIPT_0x05_SCENE_2468: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2469 — 场景段2469 (1B) */
export const SCRIPT_0x05_SCENE_2469: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2470 — 场景段2470 (1B) */
export const SCRIPT_0x05_SCENE_2470: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2471 — 场景段2471 (1B) */
export const SCRIPT_0x05_SCENE_2471: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2472 — 场景段2472 (1B) */
export const SCRIPT_0x05_SCENE_2472: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2473 — 场景段2473 (1B) */
export const SCRIPT_0x05_SCENE_2473: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2474 — 场景段2474 (1B) */
export const SCRIPT_0x05_SCENE_2474: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2475 — 场景段2475 (1B) */
export const SCRIPT_0x05_SCENE_2475: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2476 — 场景段2476 (1B) */
export const SCRIPT_0x05_SCENE_2476: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2477 — 场景段2477 (1B) */
export const SCRIPT_0x05_SCENE_2477: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2478 — 场景段2478 (1B) */
export const SCRIPT_0x05_SCENE_2478: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2479 — 场景段2479 (1B) */
export const SCRIPT_0x05_SCENE_2479: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2480 — 场景段2480 (1B) */
export const SCRIPT_0x05_SCENE_2480: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2481 — 场景段2481 (1B) */
export const SCRIPT_0x05_SCENE_2481: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2482 — 场景段2482 (1B) */
export const SCRIPT_0x05_SCENE_2482: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2483 — 场景段2483 (1B) */
export const SCRIPT_0x05_SCENE_2483: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2484 — 场景段2484 (1B) */
export const SCRIPT_0x05_SCENE_2484: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2485 — 场景段2485 (1B) */
export const SCRIPT_0x05_SCENE_2485: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2486 — 场景段2486 (1B) */
export const SCRIPT_0x05_SCENE_2486: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2487 — 场景段2487 (1B) */
export const SCRIPT_0x05_SCENE_2487: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2488 — 场景段2488 (1B) */
export const SCRIPT_0x05_SCENE_2488: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2489 — 场景段2489 (1B) */
export const SCRIPT_0x05_SCENE_2489: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2490 — 场景段2490 (1B) */
export const SCRIPT_0x05_SCENE_2490: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2491 — 场景段2491 (1B) */
export const SCRIPT_0x05_SCENE_2491: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2492 — 场景段2492 (1B) */
export const SCRIPT_0x05_SCENE_2492: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2493 — 场景段2493 (1B) */
export const SCRIPT_0x05_SCENE_2493: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2494 — 场景段2494 (1B) */
export const SCRIPT_0x05_SCENE_2494: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2495 — 场景段2495 (1B) */
export const SCRIPT_0x05_SCENE_2495: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2496 — 场景段2496 (1B) */
export const SCRIPT_0x05_SCENE_2496: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2497 — 场景段2497 (1B) */
export const SCRIPT_0x05_SCENE_2497: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2498 — 场景段2498 (1B) */
export const SCRIPT_0x05_SCENE_2498: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2499 — 场景段2499 (1B) */
export const SCRIPT_0x05_SCENE_2499: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2500 — 场景段2500 (1B) */
export const SCRIPT_0x05_SCENE_2500: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2501 — 场景段2501 (1B) */
export const SCRIPT_0x05_SCENE_2501: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2502 — 场景段2502 (1B) */
export const SCRIPT_0x05_SCENE_2502: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2503 — 场景段2503 (1B) */
export const SCRIPT_0x05_SCENE_2503: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2504 — 场景段2504 (1B) */
export const SCRIPT_0x05_SCENE_2504: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2505 — 场景段2505 (1B) */
export const SCRIPT_0x05_SCENE_2505: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2506 — 场景段2506 (1B) */
export const SCRIPT_0x05_SCENE_2506: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2507 — 场景段2507 (1B) */
export const SCRIPT_0x05_SCENE_2507: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2508 — 场景段2508 (1B) */
export const SCRIPT_0x05_SCENE_2508: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2509 — 场景段2509 (1B) */
export const SCRIPT_0x05_SCENE_2509: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2510 — 场景段2510 (1B) */
export const SCRIPT_0x05_SCENE_2510: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2511 — 场景段2511 (1B) */
export const SCRIPT_0x05_SCENE_2511: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2512 — 场景段2512 (1B) */
export const SCRIPT_0x05_SCENE_2512: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2513 — 场景段2513 (1B) */
export const SCRIPT_0x05_SCENE_2513: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2514 — 场景段2514 (1B) */
export const SCRIPT_0x05_SCENE_2514: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2515 — 场景段2515 (1B) */
export const SCRIPT_0x05_SCENE_2515: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2516 — 场景段2516 (1B) */
export const SCRIPT_0x05_SCENE_2516: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2517 — 场景段2517 (1B) */
export const SCRIPT_0x05_SCENE_2517: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2518 — 场景段2518 (1B) */
export const SCRIPT_0x05_SCENE_2518: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2519 — 场景段2519 (1B) */
export const SCRIPT_0x05_SCENE_2519: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2520 — 场景段2520 (1B) */
export const SCRIPT_0x05_SCENE_2520: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2521 — 场景段2521 (1B) */
export const SCRIPT_0x05_SCENE_2521: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2522 — 场景段2522 (1B) */
export const SCRIPT_0x05_SCENE_2522: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2523 — 场景段2523 (1B) */
export const SCRIPT_0x05_SCENE_2523: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2524 — 场景段2524 (1B) */
export const SCRIPT_0x05_SCENE_2524: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2525 — 场景段2525 (1B) */
export const SCRIPT_0x05_SCENE_2525: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2526 — 场景段2526 (1B) */
export const SCRIPT_0x05_SCENE_2526: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2527 — 场景段2527 (1B) */
export const SCRIPT_0x05_SCENE_2527: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2528 — 场景段2528 (1B) */
export const SCRIPT_0x05_SCENE_2528: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2529 — 场景段2529 (1B) */
export const SCRIPT_0x05_SCENE_2529: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2530 — 场景段2530 (1B) */
export const SCRIPT_0x05_SCENE_2530: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2531 — 场景段2531 (1B) */
export const SCRIPT_0x05_SCENE_2531: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2532 — 场景段2532 (1B) */
export const SCRIPT_0x05_SCENE_2532: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2533 — 场景段2533 (1B) */
export const SCRIPT_0x05_SCENE_2533: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2534 — 场景段2534 (1B) */
export const SCRIPT_0x05_SCENE_2534: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2535 — 场景段2535 (1B) */
export const SCRIPT_0x05_SCENE_2535: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2536 — 场景段2536 (1B) */
export const SCRIPT_0x05_SCENE_2536: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2537 — 场景段2537 (1B) */
export const SCRIPT_0x05_SCENE_2537: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2538 — 场景段2538 (1B) */
export const SCRIPT_0x05_SCENE_2538: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2539 — 场景段2539 (1B) */
export const SCRIPT_0x05_SCENE_2539: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2540 — 场景段2540 (1B) */
export const SCRIPT_0x05_SCENE_2540: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2541 — 场景段2541 (1B) */
export const SCRIPT_0x05_SCENE_2541: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2542 — 场景段2542 (1B) */
export const SCRIPT_0x05_SCENE_2542: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2543 — 场景段2543 (1B) */
export const SCRIPT_0x05_SCENE_2543: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2544 — 场景段2544 (1B) */
export const SCRIPT_0x05_SCENE_2544: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2545 — 场景段2545 (1B) */
export const SCRIPT_0x05_SCENE_2545: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2546 — 场景段2546 (1B) */
export const SCRIPT_0x05_SCENE_2546: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2547 — 场景段2547 (1B) */
export const SCRIPT_0x05_SCENE_2547: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2548 — 场景段2548 (1B) */
export const SCRIPT_0x05_SCENE_2548: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2549 — 场景段2549 (1B) */
export const SCRIPT_0x05_SCENE_2549: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2550 — 场景段2550 (1B) */
export const SCRIPT_0x05_SCENE_2550: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2551 — 场景段2551 (1B) */
export const SCRIPT_0x05_SCENE_2551: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2552 — 场景段2552 (1B) */
export const SCRIPT_0x05_SCENE_2552: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2553 — 场景段2553 (1B) */
export const SCRIPT_0x05_SCENE_2553: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2554 — 场景段2554 (1B) */
export const SCRIPT_0x05_SCENE_2554: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2555 — 场景段2555 (1B) */
export const SCRIPT_0x05_SCENE_2555: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2556 — 场景段2556 (1B) */
export const SCRIPT_0x05_SCENE_2556: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2557 — 场景段2557 (1B) */
export const SCRIPT_0x05_SCENE_2557: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2558 — 场景段2558 (1B) */
export const SCRIPT_0x05_SCENE_2558: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2559 — 场景段2559 (1B) */
export const SCRIPT_0x05_SCENE_2559: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2560 — 场景段2560 (1B) */
export const SCRIPT_0x05_SCENE_2560: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2561 — 场景段2561 (1B) */
export const SCRIPT_0x05_SCENE_2561: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2562 — 场景段2562 (1B) */
export const SCRIPT_0x05_SCENE_2562: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2563 — 场景段2563 (1B) */
export const SCRIPT_0x05_SCENE_2563: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2564 — 场景段2564 (1B) */
export const SCRIPT_0x05_SCENE_2564: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2565 — 场景段2565 (1B) */
export const SCRIPT_0x05_SCENE_2565: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2566 — 场景段2566 (1B) */
export const SCRIPT_0x05_SCENE_2566: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2567 — 场景段2567 (1B) */
export const SCRIPT_0x05_SCENE_2567: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2568 — 场景段2568 (1B) */
export const SCRIPT_0x05_SCENE_2568: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2569 — 场景段2569 (1B) */
export const SCRIPT_0x05_SCENE_2569: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2570 — 场景段2570 (1B) */
export const SCRIPT_0x05_SCENE_2570: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2571 — 场景段2571 (1B) */
export const SCRIPT_0x05_SCENE_2571: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2572 — 场景段2572 (1B) */
export const SCRIPT_0x05_SCENE_2572: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2573 — 场景段2573 (1B) */
export const SCRIPT_0x05_SCENE_2573: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2574 — 场景段2574 (1B) */
export const SCRIPT_0x05_SCENE_2574: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2575 — 场景段2575 (1B) */
export const SCRIPT_0x05_SCENE_2575: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2576 — 场景段2576 (1B) */
export const SCRIPT_0x05_SCENE_2576: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2577 — 场景段2577 (1B) */
export const SCRIPT_0x05_SCENE_2577: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2578 — 场景段2578 (1B) */
export const SCRIPT_0x05_SCENE_2578: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2579 — 场景段2579 (1B) */
export const SCRIPT_0x05_SCENE_2579: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2580 — 场景段2580 (1B) */
export const SCRIPT_0x05_SCENE_2580: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2581 — 场景段2581 (1B) */
export const SCRIPT_0x05_SCENE_2581: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2582 — 场景段2582 (1B) */
export const SCRIPT_0x05_SCENE_2582: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2583 — 场景段2583 (1B) */
export const SCRIPT_0x05_SCENE_2583: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2584 — 场景段2584 (1B) */
export const SCRIPT_0x05_SCENE_2584: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x05_SCENE_2585 — 场景段2585 (1B) */
export const SCRIPT_0x05_SCENE_2585: readonly number[] = [
  0xff,  // $FF end()
];

/** 脚本 0x05 的场景段列表 */
export const SCRIPT_0x05: readonly (readonly number[])[] = [
  SCRIPT_0x05_SCENE_0,
  SCRIPT_0x05_SCENE_1,
  SCRIPT_0x05_SCENE_2,
  SCRIPT_0x05_SCENE_3,
  SCRIPT_0x05_SCENE_4,
  SCRIPT_0x05_SCENE_5,
  SCRIPT_0x05_SCENE_6,
  SCRIPT_0x05_SCENE_7,
  SCRIPT_0x05_SCENE_8,
  SCRIPT_0x05_SCENE_9,
  SCRIPT_0x05_SCENE_10,
  SCRIPT_0x05_SCENE_11,
  SCRIPT_0x05_SCENE_12,
  SCRIPT_0x05_SCENE_13,
  SCRIPT_0x05_SCENE_14,
  SCRIPT_0x05_SCENE_15,
  SCRIPT_0x05_SCENE_16,
  SCRIPT_0x05_SCENE_17,
  SCRIPT_0x05_SCENE_18,
  SCRIPT_0x05_SCENE_19,
  SCRIPT_0x05_SCENE_20,
  SCRIPT_0x05_SCENE_21,
  SCRIPT_0x05_SCENE_22,
  SCRIPT_0x05_SCENE_23,
  SCRIPT_0x05_SCENE_24,
  SCRIPT_0x05_SCENE_25,
  SCRIPT_0x05_SCENE_26,
  SCRIPT_0x05_SCENE_27,
  SCRIPT_0x05_SCENE_28,
  SCRIPT_0x05_SCENE_29,
  SCRIPT_0x05_SCENE_30,
  SCRIPT_0x05_SCENE_31,
  SCRIPT_0x05_SCENE_32,
  SCRIPT_0x05_SCENE_33,
  SCRIPT_0x05_SCENE_34,
  SCRIPT_0x05_SCENE_35,
  SCRIPT_0x05_SCENE_36,
  SCRIPT_0x05_SCENE_37,
  SCRIPT_0x05_SCENE_38,
  SCRIPT_0x05_SCENE_39,
  SCRIPT_0x05_SCENE_40,
  SCRIPT_0x05_SCENE_41,
  SCRIPT_0x05_SCENE_42,
  SCRIPT_0x05_SCENE_43,
  SCRIPT_0x05_SCENE_44,
  SCRIPT_0x05_SCENE_45,
  SCRIPT_0x05_SCENE_46,
  SCRIPT_0x05_SCENE_47,
  SCRIPT_0x05_SCENE_48,
  SCRIPT_0x05_SCENE_49,
  SCRIPT_0x05_SCENE_50,
  SCRIPT_0x05_SCENE_51,
  SCRIPT_0x05_SCENE_52,
  SCRIPT_0x05_SCENE_53,
  SCRIPT_0x05_SCENE_54,
  SCRIPT_0x05_SCENE_55,
  SCRIPT_0x05_SCENE_56,
  SCRIPT_0x05_SCENE_57,
  SCRIPT_0x05_SCENE_58,
  SCRIPT_0x05_SCENE_59,
  SCRIPT_0x05_SCENE_60,
  SCRIPT_0x05_SCENE_61,
  SCRIPT_0x05_SCENE_62,
  SCRIPT_0x05_SCENE_63,
  SCRIPT_0x05_SCENE_64,
  SCRIPT_0x05_SCENE_65,
  SCRIPT_0x05_SCENE_66,
  SCRIPT_0x05_SCENE_67,
  SCRIPT_0x05_SCENE_68,
  SCRIPT_0x05_SCENE_69,
  SCRIPT_0x05_SCENE_70,
  SCRIPT_0x05_SCENE_71,
  SCRIPT_0x05_SCENE_72,
  SCRIPT_0x05_SCENE_73,
  SCRIPT_0x05_SCENE_74,
  SCRIPT_0x05_SCENE_75,
  SCRIPT_0x05_SCENE_76,
  SCRIPT_0x05_SCENE_77,
  SCRIPT_0x05_SCENE_78,
  SCRIPT_0x05_SCENE_79,
  SCRIPT_0x05_SCENE_80,
  SCRIPT_0x05_SCENE_81,
  SCRIPT_0x05_SCENE_82,
  SCRIPT_0x05_SCENE_83,
  SCRIPT_0x05_SCENE_84,
  SCRIPT_0x05_SCENE_85,
  SCRIPT_0x05_SCENE_86,
  SCRIPT_0x05_SCENE_87,
  SCRIPT_0x05_SCENE_88,
  SCRIPT_0x05_SCENE_89,
  SCRIPT_0x05_SCENE_90,
  SCRIPT_0x05_SCENE_91,
  SCRIPT_0x05_SCENE_92,
  SCRIPT_0x05_SCENE_93,
  SCRIPT_0x05_SCENE_94,
  SCRIPT_0x05_SCENE_95,
  SCRIPT_0x05_SCENE_96,
  SCRIPT_0x05_SCENE_97,
  SCRIPT_0x05_SCENE_98,
  SCRIPT_0x05_SCENE_99,
  SCRIPT_0x05_SCENE_100,
  SCRIPT_0x05_SCENE_101,
  SCRIPT_0x05_SCENE_102,
  SCRIPT_0x05_SCENE_103,
  SCRIPT_0x05_SCENE_104,
  SCRIPT_0x05_SCENE_105,
  SCRIPT_0x05_SCENE_106,
  SCRIPT_0x05_SCENE_107,
  SCRIPT_0x05_SCENE_108,
  SCRIPT_0x05_SCENE_109,
  SCRIPT_0x05_SCENE_110,
  SCRIPT_0x05_SCENE_111,
  SCRIPT_0x05_SCENE_112,
  SCRIPT_0x05_SCENE_113,
  SCRIPT_0x05_SCENE_114,
  SCRIPT_0x05_SCENE_115,
  SCRIPT_0x05_SCENE_116,
  SCRIPT_0x05_SCENE_117,
  SCRIPT_0x05_SCENE_118,
  SCRIPT_0x05_SCENE_119,
  SCRIPT_0x05_SCENE_120,
  SCRIPT_0x05_SCENE_121,
  SCRIPT_0x05_SCENE_122,
  SCRIPT_0x05_SCENE_123,
  SCRIPT_0x05_SCENE_124,
  SCRIPT_0x05_SCENE_125,
  SCRIPT_0x05_SCENE_126,
  SCRIPT_0x05_SCENE_127,
  SCRIPT_0x05_SCENE_128,
  SCRIPT_0x05_SCENE_129,
  SCRIPT_0x05_SCENE_130,
  SCRIPT_0x05_SCENE_131,
  SCRIPT_0x05_SCENE_132,
  SCRIPT_0x05_SCENE_133,
  SCRIPT_0x05_SCENE_134,
  SCRIPT_0x05_SCENE_135,
  SCRIPT_0x05_SCENE_136,
  SCRIPT_0x05_SCENE_137,
  SCRIPT_0x05_SCENE_138,
  SCRIPT_0x05_SCENE_139,
  SCRIPT_0x05_SCENE_140,
  SCRIPT_0x05_SCENE_141,
  SCRIPT_0x05_SCENE_142,
  SCRIPT_0x05_SCENE_143,
  SCRIPT_0x05_SCENE_144,
  SCRIPT_0x05_SCENE_145,
  SCRIPT_0x05_SCENE_146,
  SCRIPT_0x05_SCENE_147,
  SCRIPT_0x05_SCENE_148,
  SCRIPT_0x05_SCENE_149,
  SCRIPT_0x05_SCENE_150,
  SCRIPT_0x05_SCENE_151,
  SCRIPT_0x05_SCENE_152,
  SCRIPT_0x05_SCENE_153,
  SCRIPT_0x05_SCENE_154,
  SCRIPT_0x05_SCENE_155,
  SCRIPT_0x05_SCENE_156,
  SCRIPT_0x05_SCENE_157,
  SCRIPT_0x05_SCENE_158,
  SCRIPT_0x05_SCENE_159,
  SCRIPT_0x05_SCENE_160,
  SCRIPT_0x05_SCENE_161,
  SCRIPT_0x05_SCENE_162,
  SCRIPT_0x05_SCENE_163,
  SCRIPT_0x05_SCENE_164,
  SCRIPT_0x05_SCENE_165,
  SCRIPT_0x05_SCENE_166,
  SCRIPT_0x05_SCENE_167,
  SCRIPT_0x05_SCENE_168,
  SCRIPT_0x05_SCENE_169,
  SCRIPT_0x05_SCENE_170,
  SCRIPT_0x05_SCENE_171,
  SCRIPT_0x05_SCENE_172,
  SCRIPT_0x05_SCENE_173,
  SCRIPT_0x05_SCENE_174,
  SCRIPT_0x05_SCENE_175,
  SCRIPT_0x05_SCENE_176,
  SCRIPT_0x05_SCENE_177,
  SCRIPT_0x05_SCENE_178,
  SCRIPT_0x05_SCENE_179,
  SCRIPT_0x05_SCENE_180,
  SCRIPT_0x05_SCENE_181,
  SCRIPT_0x05_SCENE_182,
  SCRIPT_0x05_SCENE_183,
  SCRIPT_0x05_SCENE_184,
  SCRIPT_0x05_SCENE_185,
  SCRIPT_0x05_SCENE_186,
  SCRIPT_0x05_SCENE_187,
  SCRIPT_0x05_SCENE_188,
  SCRIPT_0x05_SCENE_189,
  SCRIPT_0x05_SCENE_190,
  SCRIPT_0x05_SCENE_191,
  SCRIPT_0x05_SCENE_192,
  SCRIPT_0x05_SCENE_193,
  SCRIPT_0x05_SCENE_194,
  SCRIPT_0x05_SCENE_195,
  SCRIPT_0x05_SCENE_196,
  SCRIPT_0x05_SCENE_197,
  SCRIPT_0x05_SCENE_198,
  SCRIPT_0x05_SCENE_199,
  SCRIPT_0x05_SCENE_200,
  SCRIPT_0x05_SCENE_201,
  SCRIPT_0x05_SCENE_202,
  SCRIPT_0x05_SCENE_203,
  SCRIPT_0x05_SCENE_204,
  SCRIPT_0x05_SCENE_205,
  SCRIPT_0x05_SCENE_206,
  SCRIPT_0x05_SCENE_207,
  SCRIPT_0x05_SCENE_208,
  SCRIPT_0x05_SCENE_209,
  SCRIPT_0x05_SCENE_210,
  SCRIPT_0x05_SCENE_211,
  SCRIPT_0x05_SCENE_212,
  SCRIPT_0x05_SCENE_213,
  SCRIPT_0x05_SCENE_214,
  SCRIPT_0x05_SCENE_215,
  SCRIPT_0x05_SCENE_216,
  SCRIPT_0x05_SCENE_217,
  SCRIPT_0x05_SCENE_218,
  SCRIPT_0x05_SCENE_219,
  SCRIPT_0x05_SCENE_220,
  SCRIPT_0x05_SCENE_221,
  SCRIPT_0x05_SCENE_222,
  SCRIPT_0x05_SCENE_223,
  SCRIPT_0x05_SCENE_224,
  SCRIPT_0x05_SCENE_225,
  SCRIPT_0x05_SCENE_226,
  SCRIPT_0x05_SCENE_227,
  SCRIPT_0x05_SCENE_228,
  SCRIPT_0x05_SCENE_229,
  SCRIPT_0x05_SCENE_230,
  SCRIPT_0x05_SCENE_231,
  SCRIPT_0x05_SCENE_232,
  SCRIPT_0x05_SCENE_233,
  SCRIPT_0x05_SCENE_234,
  SCRIPT_0x05_SCENE_235,
  SCRIPT_0x05_SCENE_236,
  SCRIPT_0x05_SCENE_237,
  SCRIPT_0x05_SCENE_238,
  SCRIPT_0x05_SCENE_239,
  SCRIPT_0x05_SCENE_240,
  SCRIPT_0x05_SCENE_241,
  SCRIPT_0x05_SCENE_242,
  SCRIPT_0x05_SCENE_243,
  SCRIPT_0x05_SCENE_244,
  SCRIPT_0x05_SCENE_245,
  SCRIPT_0x05_SCENE_246,
  SCRIPT_0x05_SCENE_247,
  SCRIPT_0x05_SCENE_248,
  SCRIPT_0x05_SCENE_249,
  SCRIPT_0x05_SCENE_250,
  SCRIPT_0x05_SCENE_251,
  SCRIPT_0x05_SCENE_252,
  SCRIPT_0x05_SCENE_253,
  SCRIPT_0x05_SCENE_254,
  SCRIPT_0x05_SCENE_255,
  SCRIPT_0x05_SCENE_256,
  SCRIPT_0x05_SCENE_257,
  SCRIPT_0x05_SCENE_258,
  SCRIPT_0x05_SCENE_259,
  SCRIPT_0x05_SCENE_260,
  SCRIPT_0x05_SCENE_261,
  SCRIPT_0x05_SCENE_262,
  SCRIPT_0x05_SCENE_263,
  SCRIPT_0x05_SCENE_264,
  SCRIPT_0x05_SCENE_265,
  SCRIPT_0x05_SCENE_266,
  SCRIPT_0x05_SCENE_267,
  SCRIPT_0x05_SCENE_268,
  SCRIPT_0x05_SCENE_269,
  SCRIPT_0x05_SCENE_270,
  SCRIPT_0x05_SCENE_271,
  SCRIPT_0x05_SCENE_272,
  SCRIPT_0x05_SCENE_273,
  SCRIPT_0x05_SCENE_274,
  SCRIPT_0x05_SCENE_275,
  SCRIPT_0x05_SCENE_276,
  SCRIPT_0x05_SCENE_277,
  SCRIPT_0x05_SCENE_278,
  SCRIPT_0x05_SCENE_279,
  SCRIPT_0x05_SCENE_280,
  SCRIPT_0x05_SCENE_281,
  SCRIPT_0x05_SCENE_282,
  SCRIPT_0x05_SCENE_283,
  SCRIPT_0x05_SCENE_284,
  SCRIPT_0x05_SCENE_285,
  SCRIPT_0x05_SCENE_286,
  SCRIPT_0x05_SCENE_287,
  SCRIPT_0x05_SCENE_288,
  SCRIPT_0x05_SCENE_289,
  SCRIPT_0x05_SCENE_290,
  SCRIPT_0x05_SCENE_291,
  SCRIPT_0x05_SCENE_292,
  SCRIPT_0x05_SCENE_293,
  SCRIPT_0x05_SCENE_294,
  SCRIPT_0x05_SCENE_295,
  SCRIPT_0x05_SCENE_296,
  SCRIPT_0x05_SCENE_297,
  SCRIPT_0x05_SCENE_298,
  SCRIPT_0x05_SCENE_299,
  SCRIPT_0x05_SCENE_300,
  SCRIPT_0x05_SCENE_301,
  SCRIPT_0x05_SCENE_302,
  SCRIPT_0x05_SCENE_303,
  SCRIPT_0x05_SCENE_304,
  SCRIPT_0x05_SCENE_305,
  SCRIPT_0x05_SCENE_306,
  SCRIPT_0x05_SCENE_307,
  SCRIPT_0x05_SCENE_308,
  SCRIPT_0x05_SCENE_309,
  SCRIPT_0x05_SCENE_310,
  SCRIPT_0x05_SCENE_311,
  SCRIPT_0x05_SCENE_312,
  SCRIPT_0x05_SCENE_313,
  SCRIPT_0x05_SCENE_314,
  SCRIPT_0x05_SCENE_315,
  SCRIPT_0x05_SCENE_316,
  SCRIPT_0x05_SCENE_317,
  SCRIPT_0x05_SCENE_318,
  SCRIPT_0x05_SCENE_319,
  SCRIPT_0x05_SCENE_320,
  SCRIPT_0x05_SCENE_321,
  SCRIPT_0x05_SCENE_322,
  SCRIPT_0x05_SCENE_323,
  SCRIPT_0x05_SCENE_324,
  SCRIPT_0x05_SCENE_325,
  SCRIPT_0x05_SCENE_326,
  SCRIPT_0x05_SCENE_327,
  SCRIPT_0x05_SCENE_328,
  SCRIPT_0x05_SCENE_329,
  SCRIPT_0x05_SCENE_330,
  SCRIPT_0x05_SCENE_331,
  SCRIPT_0x05_SCENE_332,
  SCRIPT_0x05_SCENE_333,
  SCRIPT_0x05_SCENE_334,
  SCRIPT_0x05_SCENE_335,
  SCRIPT_0x05_SCENE_336,
  SCRIPT_0x05_SCENE_337,
  SCRIPT_0x05_SCENE_338,
  SCRIPT_0x05_SCENE_339,
  SCRIPT_0x05_SCENE_340,
  SCRIPT_0x05_SCENE_341,
  SCRIPT_0x05_SCENE_342,
  SCRIPT_0x05_SCENE_343,
  SCRIPT_0x05_SCENE_344,
  SCRIPT_0x05_SCENE_345,
  SCRIPT_0x05_SCENE_346,
  SCRIPT_0x05_SCENE_347,
  SCRIPT_0x05_SCENE_348,
  SCRIPT_0x05_SCENE_349,
  SCRIPT_0x05_SCENE_350,
  SCRIPT_0x05_SCENE_351,
  SCRIPT_0x05_SCENE_352,
  SCRIPT_0x05_SCENE_353,
  SCRIPT_0x05_SCENE_354,
  SCRIPT_0x05_SCENE_355,
  SCRIPT_0x05_SCENE_356,
  SCRIPT_0x05_SCENE_357,
  SCRIPT_0x05_SCENE_358,
  SCRIPT_0x05_SCENE_359,
  SCRIPT_0x05_SCENE_360,
  SCRIPT_0x05_SCENE_361,
  SCRIPT_0x05_SCENE_362,
  SCRIPT_0x05_SCENE_363,
  SCRIPT_0x05_SCENE_364,
  SCRIPT_0x05_SCENE_365,
  SCRIPT_0x05_SCENE_366,
  SCRIPT_0x05_SCENE_367,
  SCRIPT_0x05_SCENE_368,
  SCRIPT_0x05_SCENE_369,
  SCRIPT_0x05_SCENE_370,
  SCRIPT_0x05_SCENE_371,
  SCRIPT_0x05_SCENE_372,
  SCRIPT_0x05_SCENE_373,
  SCRIPT_0x05_SCENE_374,
  SCRIPT_0x05_SCENE_375,
  SCRIPT_0x05_SCENE_376,
  SCRIPT_0x05_SCENE_377,
  SCRIPT_0x05_SCENE_378,
  SCRIPT_0x05_SCENE_379,
  SCRIPT_0x05_SCENE_380,
  SCRIPT_0x05_SCENE_381,
  SCRIPT_0x05_SCENE_382,
  SCRIPT_0x05_SCENE_383,
  SCRIPT_0x05_SCENE_384,
  SCRIPT_0x05_SCENE_385,
  SCRIPT_0x05_SCENE_386,
  SCRIPT_0x05_SCENE_387,
  SCRIPT_0x05_SCENE_388,
  SCRIPT_0x05_SCENE_389,
  SCRIPT_0x05_SCENE_390,
  SCRIPT_0x05_SCENE_391,
  SCRIPT_0x05_SCENE_392,
  SCRIPT_0x05_SCENE_393,
  SCRIPT_0x05_SCENE_394,
  SCRIPT_0x05_SCENE_395,
  SCRIPT_0x05_SCENE_396,
  SCRIPT_0x05_SCENE_397,
  SCRIPT_0x05_SCENE_398,
  SCRIPT_0x05_SCENE_399,
  SCRIPT_0x05_SCENE_400,
  SCRIPT_0x05_SCENE_401,
  SCRIPT_0x05_SCENE_402,
  SCRIPT_0x05_SCENE_403,
  SCRIPT_0x05_SCENE_404,
  SCRIPT_0x05_SCENE_405,
  SCRIPT_0x05_SCENE_406,
  SCRIPT_0x05_SCENE_407,
  SCRIPT_0x05_SCENE_408,
  SCRIPT_0x05_SCENE_409,
  SCRIPT_0x05_SCENE_410,
  SCRIPT_0x05_SCENE_411,
  SCRIPT_0x05_SCENE_412,
  SCRIPT_0x05_SCENE_413,
  SCRIPT_0x05_SCENE_414,
  SCRIPT_0x05_SCENE_415,
  SCRIPT_0x05_SCENE_416,
  SCRIPT_0x05_SCENE_417,
  SCRIPT_0x05_SCENE_418,
  SCRIPT_0x05_SCENE_419,
  SCRIPT_0x05_SCENE_420,
  SCRIPT_0x05_SCENE_421,
  SCRIPT_0x05_SCENE_422,
  SCRIPT_0x05_SCENE_423,
  SCRIPT_0x05_SCENE_424,
  SCRIPT_0x05_SCENE_425,
  SCRIPT_0x05_SCENE_426,
  SCRIPT_0x05_SCENE_427,
  SCRIPT_0x05_SCENE_428,
  SCRIPT_0x05_SCENE_429,
  SCRIPT_0x05_SCENE_430,
  SCRIPT_0x05_SCENE_431,
  SCRIPT_0x05_SCENE_432,
  SCRIPT_0x05_SCENE_433,
  SCRIPT_0x05_SCENE_434,
  SCRIPT_0x05_SCENE_435,
  SCRIPT_0x05_SCENE_436,
  SCRIPT_0x05_SCENE_437,
  SCRIPT_0x05_SCENE_438,
  SCRIPT_0x05_SCENE_439,
  SCRIPT_0x05_SCENE_440,
  SCRIPT_0x05_SCENE_441,
  SCRIPT_0x05_SCENE_442,
  SCRIPT_0x05_SCENE_443,
  SCRIPT_0x05_SCENE_444,
  SCRIPT_0x05_SCENE_445,
  SCRIPT_0x05_SCENE_446,
  SCRIPT_0x05_SCENE_447,
  SCRIPT_0x05_SCENE_448,
  SCRIPT_0x05_SCENE_449,
  SCRIPT_0x05_SCENE_450,
  SCRIPT_0x05_SCENE_451,
  SCRIPT_0x05_SCENE_452,
  SCRIPT_0x05_SCENE_453,
  SCRIPT_0x05_SCENE_454,
  SCRIPT_0x05_SCENE_455,
  SCRIPT_0x05_SCENE_456,
  SCRIPT_0x05_SCENE_457,
  SCRIPT_0x05_SCENE_458,
  SCRIPT_0x05_SCENE_459,
  SCRIPT_0x05_SCENE_460,
  SCRIPT_0x05_SCENE_461,
  SCRIPT_0x05_SCENE_462,
  SCRIPT_0x05_SCENE_463,
  SCRIPT_0x05_SCENE_464,
  SCRIPT_0x05_SCENE_465,
  SCRIPT_0x05_SCENE_466,
  SCRIPT_0x05_SCENE_467,
  SCRIPT_0x05_SCENE_468,
  SCRIPT_0x05_SCENE_469,
  SCRIPT_0x05_SCENE_470,
  SCRIPT_0x05_SCENE_471,
  SCRIPT_0x05_SCENE_472,
  SCRIPT_0x05_SCENE_473,
  SCRIPT_0x05_SCENE_474,
  SCRIPT_0x05_SCENE_475,
  SCRIPT_0x05_SCENE_476,
  SCRIPT_0x05_SCENE_477,
  SCRIPT_0x05_SCENE_478,
  SCRIPT_0x05_SCENE_479,
  SCRIPT_0x05_SCENE_480,
  SCRIPT_0x05_SCENE_481,
  SCRIPT_0x05_SCENE_482,
  SCRIPT_0x05_SCENE_483,
  SCRIPT_0x05_SCENE_484,
  SCRIPT_0x05_SCENE_485,
  SCRIPT_0x05_SCENE_486,
  SCRIPT_0x05_SCENE_487,
  SCRIPT_0x05_SCENE_488,
  SCRIPT_0x05_SCENE_489,
  SCRIPT_0x05_SCENE_490,
  SCRIPT_0x05_SCENE_491,
  SCRIPT_0x05_SCENE_492,
  SCRIPT_0x05_SCENE_493,
  SCRIPT_0x05_SCENE_494,
  SCRIPT_0x05_SCENE_495,
  SCRIPT_0x05_SCENE_496,
  SCRIPT_0x05_SCENE_497,
  SCRIPT_0x05_SCENE_498,
  SCRIPT_0x05_SCENE_499,
  SCRIPT_0x05_SCENE_500,
  SCRIPT_0x05_SCENE_501,
  SCRIPT_0x05_SCENE_502,
  SCRIPT_0x05_SCENE_503,
  SCRIPT_0x05_SCENE_504,
  SCRIPT_0x05_SCENE_505,
  SCRIPT_0x05_SCENE_506,
  SCRIPT_0x05_SCENE_507,
  SCRIPT_0x05_SCENE_508,
  SCRIPT_0x05_SCENE_509,
  SCRIPT_0x05_SCENE_510,
  SCRIPT_0x05_SCENE_511,
  SCRIPT_0x05_SCENE_512,
  SCRIPT_0x05_SCENE_513,
  SCRIPT_0x05_SCENE_514,
  SCRIPT_0x05_SCENE_515,
  SCRIPT_0x05_SCENE_516,
  SCRIPT_0x05_SCENE_517,
  SCRIPT_0x05_SCENE_518,
  SCRIPT_0x05_SCENE_519,
  SCRIPT_0x05_SCENE_520,
  SCRIPT_0x05_SCENE_521,
  SCRIPT_0x05_SCENE_522,
  SCRIPT_0x05_SCENE_523,
  SCRIPT_0x05_SCENE_524,
  SCRIPT_0x05_SCENE_525,
  SCRIPT_0x05_SCENE_526,
  SCRIPT_0x05_SCENE_527,
  SCRIPT_0x05_SCENE_528,
  SCRIPT_0x05_SCENE_529,
  SCRIPT_0x05_SCENE_530,
  SCRIPT_0x05_SCENE_531,
  SCRIPT_0x05_SCENE_532,
  SCRIPT_0x05_SCENE_533,
  SCRIPT_0x05_SCENE_534,
  SCRIPT_0x05_SCENE_535,
  SCRIPT_0x05_SCENE_536,
  SCRIPT_0x05_SCENE_537,
  SCRIPT_0x05_SCENE_538,
  SCRIPT_0x05_SCENE_539,
  SCRIPT_0x05_SCENE_540,
  SCRIPT_0x05_SCENE_541,
  SCRIPT_0x05_SCENE_542,
  SCRIPT_0x05_SCENE_543,
  SCRIPT_0x05_SCENE_544,
  SCRIPT_0x05_SCENE_545,
  SCRIPT_0x05_SCENE_546,
  SCRIPT_0x05_SCENE_547,
  SCRIPT_0x05_SCENE_548,
  SCRIPT_0x05_SCENE_549,
  SCRIPT_0x05_SCENE_550,
  SCRIPT_0x05_SCENE_551,
  SCRIPT_0x05_SCENE_552,
  SCRIPT_0x05_SCENE_553,
  SCRIPT_0x05_SCENE_554,
  SCRIPT_0x05_SCENE_555,
  SCRIPT_0x05_SCENE_556,
  SCRIPT_0x05_SCENE_557,
  SCRIPT_0x05_SCENE_558,
  SCRIPT_0x05_SCENE_559,
  SCRIPT_0x05_SCENE_560,
  SCRIPT_0x05_SCENE_561,
  SCRIPT_0x05_SCENE_562,
  SCRIPT_0x05_SCENE_563,
  SCRIPT_0x05_SCENE_564,
  SCRIPT_0x05_SCENE_565,
  SCRIPT_0x05_SCENE_566,
  SCRIPT_0x05_SCENE_567,
  SCRIPT_0x05_SCENE_568,
  SCRIPT_0x05_SCENE_569,
  SCRIPT_0x05_SCENE_570,
  SCRIPT_0x05_SCENE_571,
  SCRIPT_0x05_SCENE_572,
  SCRIPT_0x05_SCENE_573,
  SCRIPT_0x05_SCENE_574,
  SCRIPT_0x05_SCENE_575,
  SCRIPT_0x05_SCENE_576,
  SCRIPT_0x05_SCENE_577,
  SCRIPT_0x05_SCENE_578,
  SCRIPT_0x05_SCENE_579,
  SCRIPT_0x05_SCENE_580,
  SCRIPT_0x05_SCENE_581,
  SCRIPT_0x05_SCENE_582,
  SCRIPT_0x05_SCENE_583,
  SCRIPT_0x05_SCENE_584,
  SCRIPT_0x05_SCENE_585,
  SCRIPT_0x05_SCENE_586,
  SCRIPT_0x05_SCENE_587,
  SCRIPT_0x05_SCENE_588,
  SCRIPT_0x05_SCENE_589,
  SCRIPT_0x05_SCENE_590,
  SCRIPT_0x05_SCENE_591,
  SCRIPT_0x05_SCENE_592,
  SCRIPT_0x05_SCENE_593,
  SCRIPT_0x05_SCENE_594,
  SCRIPT_0x05_SCENE_595,
  SCRIPT_0x05_SCENE_596,
  SCRIPT_0x05_SCENE_597,
  SCRIPT_0x05_SCENE_598,
  SCRIPT_0x05_SCENE_599,
  SCRIPT_0x05_SCENE_600,
  SCRIPT_0x05_SCENE_601,
  SCRIPT_0x05_SCENE_602,
  SCRIPT_0x05_SCENE_603,
  SCRIPT_0x05_SCENE_604,
  SCRIPT_0x05_SCENE_605,
  SCRIPT_0x05_SCENE_606,
  SCRIPT_0x05_SCENE_607,
  SCRIPT_0x05_SCENE_608,
  SCRIPT_0x05_SCENE_609,
  SCRIPT_0x05_SCENE_610,
  SCRIPT_0x05_SCENE_611,
  SCRIPT_0x05_SCENE_612,
  SCRIPT_0x05_SCENE_613,
  SCRIPT_0x05_SCENE_614,
  SCRIPT_0x05_SCENE_615,
  SCRIPT_0x05_SCENE_616,
  SCRIPT_0x05_SCENE_617,
  SCRIPT_0x05_SCENE_618,
  SCRIPT_0x05_SCENE_619,
  SCRIPT_0x05_SCENE_620,
  SCRIPT_0x05_SCENE_621,
  SCRIPT_0x05_SCENE_622,
  SCRIPT_0x05_SCENE_623,
  SCRIPT_0x05_SCENE_624,
  SCRIPT_0x05_SCENE_625,
  SCRIPT_0x05_SCENE_626,
  SCRIPT_0x05_SCENE_627,
  SCRIPT_0x05_SCENE_628,
  SCRIPT_0x05_SCENE_629,
  SCRIPT_0x05_SCENE_630,
  SCRIPT_0x05_SCENE_631,
  SCRIPT_0x05_SCENE_632,
  SCRIPT_0x05_SCENE_633,
  SCRIPT_0x05_SCENE_634,
  SCRIPT_0x05_SCENE_635,
  SCRIPT_0x05_SCENE_636,
  SCRIPT_0x05_SCENE_637,
  SCRIPT_0x05_SCENE_638,
  SCRIPT_0x05_SCENE_639,
  SCRIPT_0x05_SCENE_640,
  SCRIPT_0x05_SCENE_641,
  SCRIPT_0x05_SCENE_642,
  SCRIPT_0x05_SCENE_643,
  SCRIPT_0x05_SCENE_644,
  SCRIPT_0x05_SCENE_645,
  SCRIPT_0x05_SCENE_646,
  SCRIPT_0x05_SCENE_647,
  SCRIPT_0x05_SCENE_648,
  SCRIPT_0x05_SCENE_649,
  SCRIPT_0x05_SCENE_650,
  SCRIPT_0x05_SCENE_651,
  SCRIPT_0x05_SCENE_652,
  SCRIPT_0x05_SCENE_653,
  SCRIPT_0x05_SCENE_654,
  SCRIPT_0x05_SCENE_655,
  SCRIPT_0x05_SCENE_656,
  SCRIPT_0x05_SCENE_657,
  SCRIPT_0x05_SCENE_658,
  SCRIPT_0x05_SCENE_659,
  SCRIPT_0x05_SCENE_660,
  SCRIPT_0x05_SCENE_661,
  SCRIPT_0x05_SCENE_662,
  SCRIPT_0x05_SCENE_663,
  SCRIPT_0x05_SCENE_664,
  SCRIPT_0x05_SCENE_665,
  SCRIPT_0x05_SCENE_666,
  SCRIPT_0x05_SCENE_667,
  SCRIPT_0x05_SCENE_668,
  SCRIPT_0x05_SCENE_669,
  SCRIPT_0x05_SCENE_670,
  SCRIPT_0x05_SCENE_671,
  SCRIPT_0x05_SCENE_672,
  SCRIPT_0x05_SCENE_673,
  SCRIPT_0x05_SCENE_674,
  SCRIPT_0x05_SCENE_675,
  SCRIPT_0x05_SCENE_676,
  SCRIPT_0x05_SCENE_677,
  SCRIPT_0x05_SCENE_678,
  SCRIPT_0x05_SCENE_679,
  SCRIPT_0x05_SCENE_680,
  SCRIPT_0x05_SCENE_681,
  SCRIPT_0x05_SCENE_682,
  SCRIPT_0x05_SCENE_683,
  SCRIPT_0x05_SCENE_684,
  SCRIPT_0x05_SCENE_685,
  SCRIPT_0x05_SCENE_686,
  SCRIPT_0x05_SCENE_687,
  SCRIPT_0x05_SCENE_688,
  SCRIPT_0x05_SCENE_689,
  SCRIPT_0x05_SCENE_690,
  SCRIPT_0x05_SCENE_691,
  SCRIPT_0x05_SCENE_692,
  SCRIPT_0x05_SCENE_693,
  SCRIPT_0x05_SCENE_694,
  SCRIPT_0x05_SCENE_695,
  SCRIPT_0x05_SCENE_696,
  SCRIPT_0x05_SCENE_697,
  SCRIPT_0x05_SCENE_698,
  SCRIPT_0x05_SCENE_699,
  SCRIPT_0x05_SCENE_700,
  SCRIPT_0x05_SCENE_701,
  SCRIPT_0x05_SCENE_702,
  SCRIPT_0x05_SCENE_703,
  SCRIPT_0x05_SCENE_704,
  SCRIPT_0x05_SCENE_705,
  SCRIPT_0x05_SCENE_706,
  SCRIPT_0x05_SCENE_707,
  SCRIPT_0x05_SCENE_708,
  SCRIPT_0x05_SCENE_709,
  SCRIPT_0x05_SCENE_710,
  SCRIPT_0x05_SCENE_711,
  SCRIPT_0x05_SCENE_712,
  SCRIPT_0x05_SCENE_713,
  SCRIPT_0x05_SCENE_714,
  SCRIPT_0x05_SCENE_715,
  SCRIPT_0x05_SCENE_716,
  SCRIPT_0x05_SCENE_717,
  SCRIPT_0x05_SCENE_718,
  SCRIPT_0x05_SCENE_719,
  SCRIPT_0x05_SCENE_720,
  SCRIPT_0x05_SCENE_721,
  SCRIPT_0x05_SCENE_722,
  SCRIPT_0x05_SCENE_723,
  SCRIPT_0x05_SCENE_724,
  SCRIPT_0x05_SCENE_725,
  SCRIPT_0x05_SCENE_726,
  SCRIPT_0x05_SCENE_727,
  SCRIPT_0x05_SCENE_728,
  SCRIPT_0x05_SCENE_729,
  SCRIPT_0x05_SCENE_730,
  SCRIPT_0x05_SCENE_731,
  SCRIPT_0x05_SCENE_732,
  SCRIPT_0x05_SCENE_733,
  SCRIPT_0x05_SCENE_734,
  SCRIPT_0x05_SCENE_735,
  SCRIPT_0x05_SCENE_736,
  SCRIPT_0x05_SCENE_737,
  SCRIPT_0x05_SCENE_738,
  SCRIPT_0x05_SCENE_739,
  SCRIPT_0x05_SCENE_740,
  SCRIPT_0x05_SCENE_741,
  SCRIPT_0x05_SCENE_742,
  SCRIPT_0x05_SCENE_743,
  SCRIPT_0x05_SCENE_744,
  SCRIPT_0x05_SCENE_745,
  SCRIPT_0x05_SCENE_746,
  SCRIPT_0x05_SCENE_747,
  SCRIPT_0x05_SCENE_748,
  SCRIPT_0x05_SCENE_749,
  SCRIPT_0x05_SCENE_750,
  SCRIPT_0x05_SCENE_751,
  SCRIPT_0x05_SCENE_752,
  SCRIPT_0x05_SCENE_753,
  SCRIPT_0x05_SCENE_754,
  SCRIPT_0x05_SCENE_755,
  SCRIPT_0x05_SCENE_756,
  SCRIPT_0x05_SCENE_757,
  SCRIPT_0x05_SCENE_758,
  SCRIPT_0x05_SCENE_759,
  SCRIPT_0x05_SCENE_760,
  SCRIPT_0x05_SCENE_761,
  SCRIPT_0x05_SCENE_762,
  SCRIPT_0x05_SCENE_763,
  SCRIPT_0x05_SCENE_764,
  SCRIPT_0x05_SCENE_765,
  SCRIPT_0x05_SCENE_766,
  SCRIPT_0x05_SCENE_767,
  SCRIPT_0x05_SCENE_768,
  SCRIPT_0x05_SCENE_769,
  SCRIPT_0x05_SCENE_770,
  SCRIPT_0x05_SCENE_771,
  SCRIPT_0x05_SCENE_772,
  SCRIPT_0x05_SCENE_773,
  SCRIPT_0x05_SCENE_774,
  SCRIPT_0x05_SCENE_775,
  SCRIPT_0x05_SCENE_776,
  SCRIPT_0x05_SCENE_777,
  SCRIPT_0x05_SCENE_778,
  SCRIPT_0x05_SCENE_779,
  SCRIPT_0x05_SCENE_780,
  SCRIPT_0x05_SCENE_781,
  SCRIPT_0x05_SCENE_782,
  SCRIPT_0x05_SCENE_783,
  SCRIPT_0x05_SCENE_784,
  SCRIPT_0x05_SCENE_785,
  SCRIPT_0x05_SCENE_786,
  SCRIPT_0x05_SCENE_787,
  SCRIPT_0x05_SCENE_788,
  SCRIPT_0x05_SCENE_789,
  SCRIPT_0x05_SCENE_790,
  SCRIPT_0x05_SCENE_791,
  SCRIPT_0x05_SCENE_792,
  SCRIPT_0x05_SCENE_793,
  SCRIPT_0x05_SCENE_794,
  SCRIPT_0x05_SCENE_795,
  SCRIPT_0x05_SCENE_796,
  SCRIPT_0x05_SCENE_797,
  SCRIPT_0x05_SCENE_798,
  SCRIPT_0x05_SCENE_799,
  SCRIPT_0x05_SCENE_800,
  SCRIPT_0x05_SCENE_801,
  SCRIPT_0x05_SCENE_802,
  SCRIPT_0x05_SCENE_803,
  SCRIPT_0x05_SCENE_804,
  SCRIPT_0x05_SCENE_805,
  SCRIPT_0x05_SCENE_806,
  SCRIPT_0x05_SCENE_807,
  SCRIPT_0x05_SCENE_808,
  SCRIPT_0x05_SCENE_809,
  SCRIPT_0x05_SCENE_810,
  SCRIPT_0x05_SCENE_811,
  SCRIPT_0x05_SCENE_812,
  SCRIPT_0x05_SCENE_813,
  SCRIPT_0x05_SCENE_814,
  SCRIPT_0x05_SCENE_815,
  SCRIPT_0x05_SCENE_816,
  SCRIPT_0x05_SCENE_817,
  SCRIPT_0x05_SCENE_818,
  SCRIPT_0x05_SCENE_819,
  SCRIPT_0x05_SCENE_820,
  SCRIPT_0x05_SCENE_821,
  SCRIPT_0x05_SCENE_822,
  SCRIPT_0x05_SCENE_823,
  SCRIPT_0x05_SCENE_824,
  SCRIPT_0x05_SCENE_825,
  SCRIPT_0x05_SCENE_826,
  SCRIPT_0x05_SCENE_827,
  SCRIPT_0x05_SCENE_828,
  SCRIPT_0x05_SCENE_829,
  SCRIPT_0x05_SCENE_830,
  SCRIPT_0x05_SCENE_831,
  SCRIPT_0x05_SCENE_832,
  SCRIPT_0x05_SCENE_833,
  SCRIPT_0x05_SCENE_834,
  SCRIPT_0x05_SCENE_835,
  SCRIPT_0x05_SCENE_836,
  SCRIPT_0x05_SCENE_837,
  SCRIPT_0x05_SCENE_838,
  SCRIPT_0x05_SCENE_839,
  SCRIPT_0x05_SCENE_840,
  SCRIPT_0x05_SCENE_841,
  SCRIPT_0x05_SCENE_842,
  SCRIPT_0x05_SCENE_843,
  SCRIPT_0x05_SCENE_844,
  SCRIPT_0x05_SCENE_845,
  SCRIPT_0x05_SCENE_846,
  SCRIPT_0x05_SCENE_847,
  SCRIPT_0x05_SCENE_848,
  SCRIPT_0x05_SCENE_849,
  SCRIPT_0x05_SCENE_850,
  SCRIPT_0x05_SCENE_851,
  SCRIPT_0x05_SCENE_852,
  SCRIPT_0x05_SCENE_853,
  SCRIPT_0x05_SCENE_854,
  SCRIPT_0x05_SCENE_855,
  SCRIPT_0x05_SCENE_856,
  SCRIPT_0x05_SCENE_857,
  SCRIPT_0x05_SCENE_858,
  SCRIPT_0x05_SCENE_859,
  SCRIPT_0x05_SCENE_860,
  SCRIPT_0x05_SCENE_861,
  SCRIPT_0x05_SCENE_862,
  SCRIPT_0x05_SCENE_863,
  SCRIPT_0x05_SCENE_864,
  SCRIPT_0x05_SCENE_865,
  SCRIPT_0x05_SCENE_866,
  SCRIPT_0x05_SCENE_867,
  SCRIPT_0x05_SCENE_868,
  SCRIPT_0x05_SCENE_869,
  SCRIPT_0x05_SCENE_870,
  SCRIPT_0x05_SCENE_871,
  SCRIPT_0x05_SCENE_872,
  SCRIPT_0x05_SCENE_873,
  SCRIPT_0x05_SCENE_874,
  SCRIPT_0x05_SCENE_875,
  SCRIPT_0x05_SCENE_876,
  SCRIPT_0x05_SCENE_877,
  SCRIPT_0x05_SCENE_878,
  SCRIPT_0x05_SCENE_879,
  SCRIPT_0x05_SCENE_880,
  SCRIPT_0x05_SCENE_881,
  SCRIPT_0x05_SCENE_882,
  SCRIPT_0x05_SCENE_883,
  SCRIPT_0x05_SCENE_884,
  SCRIPT_0x05_SCENE_885,
  SCRIPT_0x05_SCENE_886,
  SCRIPT_0x05_SCENE_887,
  SCRIPT_0x05_SCENE_888,
  SCRIPT_0x05_SCENE_889,
  SCRIPT_0x05_SCENE_890,
  SCRIPT_0x05_SCENE_891,
  SCRIPT_0x05_SCENE_892,
  SCRIPT_0x05_SCENE_893,
  SCRIPT_0x05_SCENE_894,
  SCRIPT_0x05_SCENE_895,
  SCRIPT_0x05_SCENE_896,
  SCRIPT_0x05_SCENE_897,
  SCRIPT_0x05_SCENE_898,
  SCRIPT_0x05_SCENE_899,
  SCRIPT_0x05_SCENE_900,
  SCRIPT_0x05_SCENE_901,
  SCRIPT_0x05_SCENE_902,
  SCRIPT_0x05_SCENE_903,
  SCRIPT_0x05_SCENE_904,
  SCRIPT_0x05_SCENE_905,
  SCRIPT_0x05_SCENE_906,
  SCRIPT_0x05_SCENE_907,
  SCRIPT_0x05_SCENE_908,
  SCRIPT_0x05_SCENE_909,
  SCRIPT_0x05_SCENE_910,
  SCRIPT_0x05_SCENE_911,
  SCRIPT_0x05_SCENE_912,
  SCRIPT_0x05_SCENE_913,
  SCRIPT_0x05_SCENE_914,
  SCRIPT_0x05_SCENE_915,
  SCRIPT_0x05_SCENE_916,
  SCRIPT_0x05_SCENE_917,
  SCRIPT_0x05_SCENE_918,
  SCRIPT_0x05_SCENE_919,
  SCRIPT_0x05_SCENE_920,
  SCRIPT_0x05_SCENE_921,
  SCRIPT_0x05_SCENE_922,
  SCRIPT_0x05_SCENE_923,
  SCRIPT_0x05_SCENE_924,
  SCRIPT_0x05_SCENE_925,
  SCRIPT_0x05_SCENE_926,
  SCRIPT_0x05_SCENE_927,
  SCRIPT_0x05_SCENE_928,
  SCRIPT_0x05_SCENE_929,
  SCRIPT_0x05_SCENE_930,
  SCRIPT_0x05_SCENE_931,
  SCRIPT_0x05_SCENE_932,
  SCRIPT_0x05_SCENE_933,
  SCRIPT_0x05_SCENE_934,
  SCRIPT_0x05_SCENE_935,
  SCRIPT_0x05_SCENE_936,
  SCRIPT_0x05_SCENE_937,
  SCRIPT_0x05_SCENE_938,
  SCRIPT_0x05_SCENE_939,
  SCRIPT_0x05_SCENE_940,
  SCRIPT_0x05_SCENE_941,
  SCRIPT_0x05_SCENE_942,
  SCRIPT_0x05_SCENE_943,
  SCRIPT_0x05_SCENE_944,
  SCRIPT_0x05_SCENE_945,
  SCRIPT_0x05_SCENE_946,
  SCRIPT_0x05_SCENE_947,
  SCRIPT_0x05_SCENE_948,
  SCRIPT_0x05_SCENE_949,
  SCRIPT_0x05_SCENE_950,
  SCRIPT_0x05_SCENE_951,
  SCRIPT_0x05_SCENE_952,
  SCRIPT_0x05_SCENE_953,
  SCRIPT_0x05_SCENE_954,
  SCRIPT_0x05_SCENE_955,
  SCRIPT_0x05_SCENE_956,
  SCRIPT_0x05_SCENE_957,
  SCRIPT_0x05_SCENE_958,
  SCRIPT_0x05_SCENE_959,
  SCRIPT_0x05_SCENE_960,
  SCRIPT_0x05_SCENE_961,
  SCRIPT_0x05_SCENE_962,
  SCRIPT_0x05_SCENE_963,
  SCRIPT_0x05_SCENE_964,
  SCRIPT_0x05_SCENE_965,
  SCRIPT_0x05_SCENE_966,
  SCRIPT_0x05_SCENE_967,
  SCRIPT_0x05_SCENE_968,
  SCRIPT_0x05_SCENE_969,
  SCRIPT_0x05_SCENE_970,
  SCRIPT_0x05_SCENE_971,
  SCRIPT_0x05_SCENE_972,
  SCRIPT_0x05_SCENE_973,
  SCRIPT_0x05_SCENE_974,
  SCRIPT_0x05_SCENE_975,
  SCRIPT_0x05_SCENE_976,
  SCRIPT_0x05_SCENE_977,
  SCRIPT_0x05_SCENE_978,
  SCRIPT_0x05_SCENE_979,
  SCRIPT_0x05_SCENE_980,
  SCRIPT_0x05_SCENE_981,
  SCRIPT_0x05_SCENE_982,
  SCRIPT_0x05_SCENE_983,
  SCRIPT_0x05_SCENE_984,
  SCRIPT_0x05_SCENE_985,
  SCRIPT_0x05_SCENE_986,
  SCRIPT_0x05_SCENE_987,
  SCRIPT_0x05_SCENE_988,
  SCRIPT_0x05_SCENE_989,
  SCRIPT_0x05_SCENE_990,
  SCRIPT_0x05_SCENE_991,
  SCRIPT_0x05_SCENE_992,
  SCRIPT_0x05_SCENE_993,
  SCRIPT_0x05_SCENE_994,
  SCRIPT_0x05_SCENE_995,
  SCRIPT_0x05_SCENE_996,
  SCRIPT_0x05_SCENE_997,
  SCRIPT_0x05_SCENE_998,
  SCRIPT_0x05_SCENE_999,
  SCRIPT_0x05_SCENE_1000,
  SCRIPT_0x05_SCENE_1001,
  SCRIPT_0x05_SCENE_1002,
  SCRIPT_0x05_SCENE_1003,
  SCRIPT_0x05_SCENE_1004,
  SCRIPT_0x05_SCENE_1005,
  SCRIPT_0x05_SCENE_1006,
  SCRIPT_0x05_SCENE_1007,
  SCRIPT_0x05_SCENE_1008,
  SCRIPT_0x05_SCENE_1009,
  SCRIPT_0x05_SCENE_1010,
  SCRIPT_0x05_SCENE_1011,
  SCRIPT_0x05_SCENE_1012,
  SCRIPT_0x05_SCENE_1013,
  SCRIPT_0x05_SCENE_1014,
  SCRIPT_0x05_SCENE_1015,
  SCRIPT_0x05_SCENE_1016,
  SCRIPT_0x05_SCENE_1017,
  SCRIPT_0x05_SCENE_1018,
  SCRIPT_0x05_SCENE_1019,
  SCRIPT_0x05_SCENE_1020,
  SCRIPT_0x05_SCENE_1021,
  SCRIPT_0x05_SCENE_1022,
  SCRIPT_0x05_SCENE_1023,
  SCRIPT_0x05_SCENE_1024,
  SCRIPT_0x05_SCENE_1025,
  SCRIPT_0x05_SCENE_1026,
  SCRIPT_0x05_SCENE_1027,
  SCRIPT_0x05_SCENE_1028,
  SCRIPT_0x05_SCENE_1029,
  SCRIPT_0x05_SCENE_1030,
  SCRIPT_0x05_SCENE_1031,
  SCRIPT_0x05_SCENE_1032,
  SCRIPT_0x05_SCENE_1033,
  SCRIPT_0x05_SCENE_1034,
  SCRIPT_0x05_SCENE_1035,
  SCRIPT_0x05_SCENE_1036,
  SCRIPT_0x05_SCENE_1037,
  SCRIPT_0x05_SCENE_1038,
  SCRIPT_0x05_SCENE_1039,
  SCRIPT_0x05_SCENE_1040,
  SCRIPT_0x05_SCENE_1041,
  SCRIPT_0x05_SCENE_1042,
  SCRIPT_0x05_SCENE_1043,
  SCRIPT_0x05_SCENE_1044,
  SCRIPT_0x05_SCENE_1045,
  SCRIPT_0x05_SCENE_1046,
  SCRIPT_0x05_SCENE_1047,
  SCRIPT_0x05_SCENE_1048,
  SCRIPT_0x05_SCENE_1049,
  SCRIPT_0x05_SCENE_1050,
  SCRIPT_0x05_SCENE_1051,
  SCRIPT_0x05_SCENE_1052,
  SCRIPT_0x05_SCENE_1053,
  SCRIPT_0x05_SCENE_1054,
  SCRIPT_0x05_SCENE_1055,
  SCRIPT_0x05_SCENE_1056,
  SCRIPT_0x05_SCENE_1057,
  SCRIPT_0x05_SCENE_1058,
  SCRIPT_0x05_SCENE_1059,
  SCRIPT_0x05_SCENE_1060,
  SCRIPT_0x05_SCENE_1061,
  SCRIPT_0x05_SCENE_1062,
  SCRIPT_0x05_SCENE_1063,
  SCRIPT_0x05_SCENE_1064,
  SCRIPT_0x05_SCENE_1065,
  SCRIPT_0x05_SCENE_1066,
  SCRIPT_0x05_SCENE_1067,
  SCRIPT_0x05_SCENE_1068,
  SCRIPT_0x05_SCENE_1069,
  SCRIPT_0x05_SCENE_1070,
  SCRIPT_0x05_SCENE_1071,
  SCRIPT_0x05_SCENE_1072,
  SCRIPT_0x05_SCENE_1073,
  SCRIPT_0x05_SCENE_1074,
  SCRIPT_0x05_SCENE_1075,
  SCRIPT_0x05_SCENE_1076,
  SCRIPT_0x05_SCENE_1077,
  SCRIPT_0x05_SCENE_1078,
  SCRIPT_0x05_SCENE_1079,
  SCRIPT_0x05_SCENE_1080,
  SCRIPT_0x05_SCENE_1081,
  SCRIPT_0x05_SCENE_1082,
  SCRIPT_0x05_SCENE_1083,
  SCRIPT_0x05_SCENE_1084,
  SCRIPT_0x05_SCENE_1085,
  SCRIPT_0x05_SCENE_1086,
  SCRIPT_0x05_SCENE_1087,
  SCRIPT_0x05_SCENE_1088,
  SCRIPT_0x05_SCENE_1089,
  SCRIPT_0x05_SCENE_1090,
  SCRIPT_0x05_SCENE_1091,
  SCRIPT_0x05_SCENE_1092,
  SCRIPT_0x05_SCENE_1093,
  SCRIPT_0x05_SCENE_1094,
  SCRIPT_0x05_SCENE_1095,
  SCRIPT_0x05_SCENE_1096,
  SCRIPT_0x05_SCENE_1097,
  SCRIPT_0x05_SCENE_1098,
  SCRIPT_0x05_SCENE_1099,
  SCRIPT_0x05_SCENE_1100,
  SCRIPT_0x05_SCENE_1101,
  SCRIPT_0x05_SCENE_1102,
  SCRIPT_0x05_SCENE_1103,
  SCRIPT_0x05_SCENE_1104,
  SCRIPT_0x05_SCENE_1105,
  SCRIPT_0x05_SCENE_1106,
  SCRIPT_0x05_SCENE_1107,
  SCRIPT_0x05_SCENE_1108,
  SCRIPT_0x05_SCENE_1109,
  SCRIPT_0x05_SCENE_1110,
  SCRIPT_0x05_SCENE_1111,
  SCRIPT_0x05_SCENE_1112,
  SCRIPT_0x05_SCENE_1113,
  SCRIPT_0x05_SCENE_1114,
  SCRIPT_0x05_SCENE_1115,
  SCRIPT_0x05_SCENE_1116,
  SCRIPT_0x05_SCENE_1117,
  SCRIPT_0x05_SCENE_1118,
  SCRIPT_0x05_SCENE_1119,
  SCRIPT_0x05_SCENE_1120,
  SCRIPT_0x05_SCENE_1121,
  SCRIPT_0x05_SCENE_1122,
  SCRIPT_0x05_SCENE_1123,
  SCRIPT_0x05_SCENE_1124,
  SCRIPT_0x05_SCENE_1125,
  SCRIPT_0x05_SCENE_1126,
  SCRIPT_0x05_SCENE_1127,
  SCRIPT_0x05_SCENE_1128,
  SCRIPT_0x05_SCENE_1129,
  SCRIPT_0x05_SCENE_1130,
  SCRIPT_0x05_SCENE_1131,
  SCRIPT_0x05_SCENE_1132,
  SCRIPT_0x05_SCENE_1133,
  SCRIPT_0x05_SCENE_1134,
  SCRIPT_0x05_SCENE_1135,
  SCRIPT_0x05_SCENE_1136,
  SCRIPT_0x05_SCENE_1137,
  SCRIPT_0x05_SCENE_1138,
  SCRIPT_0x05_SCENE_1139,
  SCRIPT_0x05_SCENE_1140,
  SCRIPT_0x05_SCENE_1141,
  SCRIPT_0x05_SCENE_1142,
  SCRIPT_0x05_SCENE_1143,
  SCRIPT_0x05_SCENE_1144,
  SCRIPT_0x05_SCENE_1145,
  SCRIPT_0x05_SCENE_1146,
  SCRIPT_0x05_SCENE_1147,
  SCRIPT_0x05_SCENE_1148,
  SCRIPT_0x05_SCENE_1149,
  SCRIPT_0x05_SCENE_1150,
  SCRIPT_0x05_SCENE_1151,
  SCRIPT_0x05_SCENE_1152,
  SCRIPT_0x05_SCENE_1153,
  SCRIPT_0x05_SCENE_1154,
  SCRIPT_0x05_SCENE_1155,
  SCRIPT_0x05_SCENE_1156,
  SCRIPT_0x05_SCENE_1157,
  SCRIPT_0x05_SCENE_1158,
  SCRIPT_0x05_SCENE_1159,
  SCRIPT_0x05_SCENE_1160,
  SCRIPT_0x05_SCENE_1161,
  SCRIPT_0x05_SCENE_1162,
  SCRIPT_0x05_SCENE_1163,
  SCRIPT_0x05_SCENE_1164,
  SCRIPT_0x05_SCENE_1165,
  SCRIPT_0x05_SCENE_1166,
  SCRIPT_0x05_SCENE_1167,
  SCRIPT_0x05_SCENE_1168,
  SCRIPT_0x05_SCENE_1169,
  SCRIPT_0x05_SCENE_1170,
  SCRIPT_0x05_SCENE_1171,
  SCRIPT_0x05_SCENE_1172,
  SCRIPT_0x05_SCENE_1173,
  SCRIPT_0x05_SCENE_1174,
  SCRIPT_0x05_SCENE_1175,
  SCRIPT_0x05_SCENE_1176,
  SCRIPT_0x05_SCENE_1177,
  SCRIPT_0x05_SCENE_1178,
  SCRIPT_0x05_SCENE_1179,
  SCRIPT_0x05_SCENE_1180,
  SCRIPT_0x05_SCENE_1181,
  SCRIPT_0x05_SCENE_1182,
  SCRIPT_0x05_SCENE_1183,
  SCRIPT_0x05_SCENE_1184,
  SCRIPT_0x05_SCENE_1185,
  SCRIPT_0x05_SCENE_1186,
  SCRIPT_0x05_SCENE_1187,
  SCRIPT_0x05_SCENE_1188,
  SCRIPT_0x05_SCENE_1189,
  SCRIPT_0x05_SCENE_1190,
  SCRIPT_0x05_SCENE_1191,
  SCRIPT_0x05_SCENE_1192,
  SCRIPT_0x05_SCENE_1193,
  SCRIPT_0x05_SCENE_1194,
  SCRIPT_0x05_SCENE_1195,
  SCRIPT_0x05_SCENE_1196,
  SCRIPT_0x05_SCENE_1197,
  SCRIPT_0x05_SCENE_1198,
  SCRIPT_0x05_SCENE_1199,
  SCRIPT_0x05_SCENE_1200,
  SCRIPT_0x05_SCENE_1201,
  SCRIPT_0x05_SCENE_1202,
  SCRIPT_0x05_SCENE_1203,
  SCRIPT_0x05_SCENE_1204,
  SCRIPT_0x05_SCENE_1205,
  SCRIPT_0x05_SCENE_1206,
  SCRIPT_0x05_SCENE_1207,
  SCRIPT_0x05_SCENE_1208,
  SCRIPT_0x05_SCENE_1209,
  SCRIPT_0x05_SCENE_1210,
  SCRIPT_0x05_SCENE_1211,
  SCRIPT_0x05_SCENE_1212,
  SCRIPT_0x05_SCENE_1213,
  SCRIPT_0x05_SCENE_1214,
  SCRIPT_0x05_SCENE_1215,
  SCRIPT_0x05_SCENE_1216,
  SCRIPT_0x05_SCENE_1217,
  SCRIPT_0x05_SCENE_1218,
  SCRIPT_0x05_SCENE_1219,
  SCRIPT_0x05_SCENE_1220,
  SCRIPT_0x05_SCENE_1221,
  SCRIPT_0x05_SCENE_1222,
  SCRIPT_0x05_SCENE_1223,
  SCRIPT_0x05_SCENE_1224,
  SCRIPT_0x05_SCENE_1225,
  SCRIPT_0x05_SCENE_1226,
  SCRIPT_0x05_SCENE_1227,
  SCRIPT_0x05_SCENE_1228,
  SCRIPT_0x05_SCENE_1229,
  SCRIPT_0x05_SCENE_1230,
  SCRIPT_0x05_SCENE_1231,
  SCRIPT_0x05_SCENE_1232,
  SCRIPT_0x05_SCENE_1233,
  SCRIPT_0x05_SCENE_1234,
  SCRIPT_0x05_SCENE_1235,
  SCRIPT_0x05_SCENE_1236,
  SCRIPT_0x05_SCENE_1237,
  SCRIPT_0x05_SCENE_1238,
  SCRIPT_0x05_SCENE_1239,
  SCRIPT_0x05_SCENE_1240,
  SCRIPT_0x05_SCENE_1241,
  SCRIPT_0x05_SCENE_1242,
  SCRIPT_0x05_SCENE_1243,
  SCRIPT_0x05_SCENE_1244,
  SCRIPT_0x05_SCENE_1245,
  SCRIPT_0x05_SCENE_1246,
  SCRIPT_0x05_SCENE_1247,
  SCRIPT_0x05_SCENE_1248,
  SCRIPT_0x05_SCENE_1249,
  SCRIPT_0x05_SCENE_1250,
  SCRIPT_0x05_SCENE_1251,
  SCRIPT_0x05_SCENE_1252,
  SCRIPT_0x05_SCENE_1253,
  SCRIPT_0x05_SCENE_1254,
  SCRIPT_0x05_SCENE_1255,
  SCRIPT_0x05_SCENE_1256,
  SCRIPT_0x05_SCENE_1257,
  SCRIPT_0x05_SCENE_1258,
  SCRIPT_0x05_SCENE_1259,
  SCRIPT_0x05_SCENE_1260,
  SCRIPT_0x05_SCENE_1261,
  SCRIPT_0x05_SCENE_1262,
  SCRIPT_0x05_SCENE_1263,
  SCRIPT_0x05_SCENE_1264,
  SCRIPT_0x05_SCENE_1265,
  SCRIPT_0x05_SCENE_1266,
  SCRIPT_0x05_SCENE_1267,
  SCRIPT_0x05_SCENE_1268,
  SCRIPT_0x05_SCENE_1269,
  SCRIPT_0x05_SCENE_1270,
  SCRIPT_0x05_SCENE_1271,
  SCRIPT_0x05_SCENE_1272,
  SCRIPT_0x05_SCENE_1273,
  SCRIPT_0x05_SCENE_1274,
  SCRIPT_0x05_SCENE_1275,
  SCRIPT_0x05_SCENE_1276,
  SCRIPT_0x05_SCENE_1277,
  SCRIPT_0x05_SCENE_1278,
  SCRIPT_0x05_SCENE_1279,
  SCRIPT_0x05_SCENE_1280,
  SCRIPT_0x05_SCENE_1281,
  SCRIPT_0x05_SCENE_1282,
  SCRIPT_0x05_SCENE_1283,
  SCRIPT_0x05_SCENE_1284,
  SCRIPT_0x05_SCENE_1285,
  SCRIPT_0x05_SCENE_1286,
  SCRIPT_0x05_SCENE_1287,
  SCRIPT_0x05_SCENE_1288,
  SCRIPT_0x05_SCENE_1289,
  SCRIPT_0x05_SCENE_1290,
  SCRIPT_0x05_SCENE_1291,
  SCRIPT_0x05_SCENE_1292,
  SCRIPT_0x05_SCENE_1293,
  SCRIPT_0x05_SCENE_1294,
  SCRIPT_0x05_SCENE_1295,
  SCRIPT_0x05_SCENE_1296,
  SCRIPT_0x05_SCENE_1297,
  SCRIPT_0x05_SCENE_1298,
  SCRIPT_0x05_SCENE_1299,
  SCRIPT_0x05_SCENE_1300,
  SCRIPT_0x05_SCENE_1301,
  SCRIPT_0x05_SCENE_1302,
  SCRIPT_0x05_SCENE_1303,
  SCRIPT_0x05_SCENE_1304,
  SCRIPT_0x05_SCENE_1305,
  SCRIPT_0x05_SCENE_1306,
  SCRIPT_0x05_SCENE_1307,
  SCRIPT_0x05_SCENE_1308,
  SCRIPT_0x05_SCENE_1309,
  SCRIPT_0x05_SCENE_1310,
  SCRIPT_0x05_SCENE_1311,
  SCRIPT_0x05_SCENE_1312,
  SCRIPT_0x05_SCENE_1313,
  SCRIPT_0x05_SCENE_1314,
  SCRIPT_0x05_SCENE_1315,
  SCRIPT_0x05_SCENE_1316,
  SCRIPT_0x05_SCENE_1317,
  SCRIPT_0x05_SCENE_1318,
  SCRIPT_0x05_SCENE_1319,
  SCRIPT_0x05_SCENE_1320,
  SCRIPT_0x05_SCENE_1321,
  SCRIPT_0x05_SCENE_1322,
  SCRIPT_0x05_SCENE_1323,
  SCRIPT_0x05_SCENE_1324,
  SCRIPT_0x05_SCENE_1325,
  SCRIPT_0x05_SCENE_1326,
  SCRIPT_0x05_SCENE_1327,
  SCRIPT_0x05_SCENE_1328,
  SCRIPT_0x05_SCENE_1329,
  SCRIPT_0x05_SCENE_1330,
  SCRIPT_0x05_SCENE_1331,
  SCRIPT_0x05_SCENE_1332,
  SCRIPT_0x05_SCENE_1333,
  SCRIPT_0x05_SCENE_1334,
  SCRIPT_0x05_SCENE_1335,
  SCRIPT_0x05_SCENE_1336,
  SCRIPT_0x05_SCENE_1337,
  SCRIPT_0x05_SCENE_1338,
  SCRIPT_0x05_SCENE_1339,
  SCRIPT_0x05_SCENE_1340,
  SCRIPT_0x05_SCENE_1341,
  SCRIPT_0x05_SCENE_1342,
  SCRIPT_0x05_SCENE_1343,
  SCRIPT_0x05_SCENE_1344,
  SCRIPT_0x05_SCENE_1345,
  SCRIPT_0x05_SCENE_1346,
  SCRIPT_0x05_SCENE_1347,
  SCRIPT_0x05_SCENE_1348,
  SCRIPT_0x05_SCENE_1349,
  SCRIPT_0x05_SCENE_1350,
  SCRIPT_0x05_SCENE_1351,
  SCRIPT_0x05_SCENE_1352,
  SCRIPT_0x05_SCENE_1353,
  SCRIPT_0x05_SCENE_1354,
  SCRIPT_0x05_SCENE_1355,
  SCRIPT_0x05_SCENE_1356,
  SCRIPT_0x05_SCENE_1357,
  SCRIPT_0x05_SCENE_1358,
  SCRIPT_0x05_SCENE_1359,
  SCRIPT_0x05_SCENE_1360,
  SCRIPT_0x05_SCENE_1361,
  SCRIPT_0x05_SCENE_1362,
  SCRIPT_0x05_SCENE_1363,
  SCRIPT_0x05_SCENE_1364,
  SCRIPT_0x05_SCENE_1365,
  SCRIPT_0x05_SCENE_1366,
  SCRIPT_0x05_SCENE_1367,
  SCRIPT_0x05_SCENE_1368,
  SCRIPT_0x05_SCENE_1369,
  SCRIPT_0x05_SCENE_1370,
  SCRIPT_0x05_SCENE_1371,
  SCRIPT_0x05_SCENE_1372,
  SCRIPT_0x05_SCENE_1373,
  SCRIPT_0x05_SCENE_1374,
  SCRIPT_0x05_SCENE_1375,
  SCRIPT_0x05_SCENE_1376,
  SCRIPT_0x05_SCENE_1377,
  SCRIPT_0x05_SCENE_1378,
  SCRIPT_0x05_SCENE_1379,
  SCRIPT_0x05_SCENE_1380,
  SCRIPT_0x05_SCENE_1381,
  SCRIPT_0x05_SCENE_1382,
  SCRIPT_0x05_SCENE_1383,
  SCRIPT_0x05_SCENE_1384,
  SCRIPT_0x05_SCENE_1385,
  SCRIPT_0x05_SCENE_1386,
  SCRIPT_0x05_SCENE_1387,
  SCRIPT_0x05_SCENE_1388,
  SCRIPT_0x05_SCENE_1389,
  SCRIPT_0x05_SCENE_1390,
  SCRIPT_0x05_SCENE_1391,
  SCRIPT_0x05_SCENE_1392,
  SCRIPT_0x05_SCENE_1393,
  SCRIPT_0x05_SCENE_1394,
  SCRIPT_0x05_SCENE_1395,
  SCRIPT_0x05_SCENE_1396,
  SCRIPT_0x05_SCENE_1397,
  SCRIPT_0x05_SCENE_1398,
  SCRIPT_0x05_SCENE_1399,
  SCRIPT_0x05_SCENE_1400,
  SCRIPT_0x05_SCENE_1401,
  SCRIPT_0x05_SCENE_1402,
  SCRIPT_0x05_SCENE_1403,
  SCRIPT_0x05_SCENE_1404,
  SCRIPT_0x05_SCENE_1405,
  SCRIPT_0x05_SCENE_1406,
  SCRIPT_0x05_SCENE_1407,
  SCRIPT_0x05_SCENE_1408,
  SCRIPT_0x05_SCENE_1409,
  SCRIPT_0x05_SCENE_1410,
  SCRIPT_0x05_SCENE_1411,
  SCRIPT_0x05_SCENE_1412,
  SCRIPT_0x05_SCENE_1413,
  SCRIPT_0x05_SCENE_1414,
  SCRIPT_0x05_SCENE_1415,
  SCRIPT_0x05_SCENE_1416,
  SCRIPT_0x05_SCENE_1417,
  SCRIPT_0x05_SCENE_1418,
  SCRIPT_0x05_SCENE_1419,
  SCRIPT_0x05_SCENE_1420,
  SCRIPT_0x05_SCENE_1421,
  SCRIPT_0x05_SCENE_1422,
  SCRIPT_0x05_SCENE_1423,
  SCRIPT_0x05_SCENE_1424,
  SCRIPT_0x05_SCENE_1425,
  SCRIPT_0x05_SCENE_1426,
  SCRIPT_0x05_SCENE_1427,
  SCRIPT_0x05_SCENE_1428,
  SCRIPT_0x05_SCENE_1429,
  SCRIPT_0x05_SCENE_1430,
  SCRIPT_0x05_SCENE_1431,
  SCRIPT_0x05_SCENE_1432,
  SCRIPT_0x05_SCENE_1433,
  SCRIPT_0x05_SCENE_1434,
  SCRIPT_0x05_SCENE_1435,
  SCRIPT_0x05_SCENE_1436,
  SCRIPT_0x05_SCENE_1437,
  SCRIPT_0x05_SCENE_1438,
  SCRIPT_0x05_SCENE_1439,
  SCRIPT_0x05_SCENE_1440,
  SCRIPT_0x05_SCENE_1441,
  SCRIPT_0x05_SCENE_1442,
  SCRIPT_0x05_SCENE_1443,
  SCRIPT_0x05_SCENE_1444,
  SCRIPT_0x05_SCENE_1445,
  SCRIPT_0x05_SCENE_1446,
  SCRIPT_0x05_SCENE_1447,
  SCRIPT_0x05_SCENE_1448,
  SCRIPT_0x05_SCENE_1449,
  SCRIPT_0x05_SCENE_1450,
  SCRIPT_0x05_SCENE_1451,
  SCRIPT_0x05_SCENE_1452,
  SCRIPT_0x05_SCENE_1453,
  SCRIPT_0x05_SCENE_1454,
  SCRIPT_0x05_SCENE_1455,
  SCRIPT_0x05_SCENE_1456,
  SCRIPT_0x05_SCENE_1457,
  SCRIPT_0x05_SCENE_1458,
  SCRIPT_0x05_SCENE_1459,
  SCRIPT_0x05_SCENE_1460,
  SCRIPT_0x05_SCENE_1461,
  SCRIPT_0x05_SCENE_1462,
  SCRIPT_0x05_SCENE_1463,
  SCRIPT_0x05_SCENE_1464,
  SCRIPT_0x05_SCENE_1465,
  SCRIPT_0x05_SCENE_1466,
  SCRIPT_0x05_SCENE_1467,
  SCRIPT_0x05_SCENE_1468,
  SCRIPT_0x05_SCENE_1469,
  SCRIPT_0x05_SCENE_1470,
  SCRIPT_0x05_SCENE_1471,
  SCRIPT_0x05_SCENE_1472,
  SCRIPT_0x05_SCENE_1473,
  SCRIPT_0x05_SCENE_1474,
  SCRIPT_0x05_SCENE_1475,
  SCRIPT_0x05_SCENE_1476,
  SCRIPT_0x05_SCENE_1477,
  SCRIPT_0x05_SCENE_1478,
  SCRIPT_0x05_SCENE_1479,
  SCRIPT_0x05_SCENE_1480,
  SCRIPT_0x05_SCENE_1481,
  SCRIPT_0x05_SCENE_1482,
  SCRIPT_0x05_SCENE_1483,
  SCRIPT_0x05_SCENE_1484,
  SCRIPT_0x05_SCENE_1485,
  SCRIPT_0x05_SCENE_1486,
  SCRIPT_0x05_SCENE_1487,
  SCRIPT_0x05_SCENE_1488,
  SCRIPT_0x05_SCENE_1489,
  SCRIPT_0x05_SCENE_1490,
  SCRIPT_0x05_SCENE_1491,
  SCRIPT_0x05_SCENE_1492,
  SCRIPT_0x05_SCENE_1493,
  SCRIPT_0x05_SCENE_1494,
  SCRIPT_0x05_SCENE_1495,
  SCRIPT_0x05_SCENE_1496,
  SCRIPT_0x05_SCENE_1497,
  SCRIPT_0x05_SCENE_1498,
  SCRIPT_0x05_SCENE_1499,
  SCRIPT_0x05_SCENE_1500,
  SCRIPT_0x05_SCENE_1501,
  SCRIPT_0x05_SCENE_1502,
  SCRIPT_0x05_SCENE_1503,
  SCRIPT_0x05_SCENE_1504,
  SCRIPT_0x05_SCENE_1505,
  SCRIPT_0x05_SCENE_1506,
  SCRIPT_0x05_SCENE_1507,
  SCRIPT_0x05_SCENE_1508,
  SCRIPT_0x05_SCENE_1509,
  SCRIPT_0x05_SCENE_1510,
  SCRIPT_0x05_SCENE_1511,
  SCRIPT_0x05_SCENE_1512,
  SCRIPT_0x05_SCENE_1513,
  SCRIPT_0x05_SCENE_1514,
  SCRIPT_0x05_SCENE_1515,
  SCRIPT_0x05_SCENE_1516,
  SCRIPT_0x05_SCENE_1517,
  SCRIPT_0x05_SCENE_1518,
  SCRIPT_0x05_SCENE_1519,
  SCRIPT_0x05_SCENE_1520,
  SCRIPT_0x05_SCENE_1521,
  SCRIPT_0x05_SCENE_1522,
  SCRIPT_0x05_SCENE_1523,
  SCRIPT_0x05_SCENE_1524,
  SCRIPT_0x05_SCENE_1525,
  SCRIPT_0x05_SCENE_1526,
  SCRIPT_0x05_SCENE_1527,
  SCRIPT_0x05_SCENE_1528,
  SCRIPT_0x05_SCENE_1529,
  SCRIPT_0x05_SCENE_1530,
  SCRIPT_0x05_SCENE_1531,
  SCRIPT_0x05_SCENE_1532,
  SCRIPT_0x05_SCENE_1533,
  SCRIPT_0x05_SCENE_1534,
  SCRIPT_0x05_SCENE_1535,
  SCRIPT_0x05_SCENE_1536,
  SCRIPT_0x05_SCENE_1537,
  SCRIPT_0x05_SCENE_1538,
  SCRIPT_0x05_SCENE_1539,
  SCRIPT_0x05_SCENE_1540,
  SCRIPT_0x05_SCENE_1541,
  SCRIPT_0x05_SCENE_1542,
  SCRIPT_0x05_SCENE_1543,
  SCRIPT_0x05_SCENE_1544,
  SCRIPT_0x05_SCENE_1545,
  SCRIPT_0x05_SCENE_1546,
  SCRIPT_0x05_SCENE_1547,
  SCRIPT_0x05_SCENE_1548,
  SCRIPT_0x05_SCENE_1549,
  SCRIPT_0x05_SCENE_1550,
  SCRIPT_0x05_SCENE_1551,
  SCRIPT_0x05_SCENE_1552,
  SCRIPT_0x05_SCENE_1553,
  SCRIPT_0x05_SCENE_1554,
  SCRIPT_0x05_SCENE_1555,
  SCRIPT_0x05_SCENE_1556,
  SCRIPT_0x05_SCENE_1557,
  SCRIPT_0x05_SCENE_1558,
  SCRIPT_0x05_SCENE_1559,
  SCRIPT_0x05_SCENE_1560,
  SCRIPT_0x05_SCENE_1561,
  SCRIPT_0x05_SCENE_1562,
  SCRIPT_0x05_SCENE_1563,
  SCRIPT_0x05_SCENE_1564,
  SCRIPT_0x05_SCENE_1565,
  SCRIPT_0x05_SCENE_1566,
  SCRIPT_0x05_SCENE_1567,
  SCRIPT_0x05_SCENE_1568,
  SCRIPT_0x05_SCENE_1569,
  SCRIPT_0x05_SCENE_1570,
  SCRIPT_0x05_SCENE_1571,
  SCRIPT_0x05_SCENE_1572,
  SCRIPT_0x05_SCENE_1573,
  SCRIPT_0x05_SCENE_1574,
  SCRIPT_0x05_SCENE_1575,
  SCRIPT_0x05_SCENE_1576,
  SCRIPT_0x05_SCENE_1577,
  SCRIPT_0x05_SCENE_1578,
  SCRIPT_0x05_SCENE_1579,
  SCRIPT_0x05_SCENE_1580,
  SCRIPT_0x05_SCENE_1581,
  SCRIPT_0x05_SCENE_1582,
  SCRIPT_0x05_SCENE_1583,
  SCRIPT_0x05_SCENE_1584,
  SCRIPT_0x05_SCENE_1585,
  SCRIPT_0x05_SCENE_1586,
  SCRIPT_0x05_SCENE_1587,
  SCRIPT_0x05_SCENE_1588,
  SCRIPT_0x05_SCENE_1589,
  SCRIPT_0x05_SCENE_1590,
  SCRIPT_0x05_SCENE_1591,
  SCRIPT_0x05_SCENE_1592,
  SCRIPT_0x05_SCENE_1593,
  SCRIPT_0x05_SCENE_1594,
  SCRIPT_0x05_SCENE_1595,
  SCRIPT_0x05_SCENE_1596,
  SCRIPT_0x05_SCENE_1597,
  SCRIPT_0x05_SCENE_1598,
  SCRIPT_0x05_SCENE_1599,
  SCRIPT_0x05_SCENE_1600,
  SCRIPT_0x05_SCENE_1601,
  SCRIPT_0x05_SCENE_1602,
  SCRIPT_0x05_SCENE_1603,
  SCRIPT_0x05_SCENE_1604,
  SCRIPT_0x05_SCENE_1605,
  SCRIPT_0x05_SCENE_1606,
  SCRIPT_0x05_SCENE_1607,
  SCRIPT_0x05_SCENE_1608,
  SCRIPT_0x05_SCENE_1609,
  SCRIPT_0x05_SCENE_1610,
  SCRIPT_0x05_SCENE_1611,
  SCRIPT_0x05_SCENE_1612,
  SCRIPT_0x05_SCENE_1613,
  SCRIPT_0x05_SCENE_1614,
  SCRIPT_0x05_SCENE_1615,
  SCRIPT_0x05_SCENE_1616,
  SCRIPT_0x05_SCENE_1617,
  SCRIPT_0x05_SCENE_1618,
  SCRIPT_0x05_SCENE_1619,
  SCRIPT_0x05_SCENE_1620,
  SCRIPT_0x05_SCENE_1621,
  SCRIPT_0x05_SCENE_1622,
  SCRIPT_0x05_SCENE_1623,
  SCRIPT_0x05_SCENE_1624,
  SCRIPT_0x05_SCENE_1625,
  SCRIPT_0x05_SCENE_1626,
  SCRIPT_0x05_SCENE_1627,
  SCRIPT_0x05_SCENE_1628,
  SCRIPT_0x05_SCENE_1629,
  SCRIPT_0x05_SCENE_1630,
  SCRIPT_0x05_SCENE_1631,
  SCRIPT_0x05_SCENE_1632,
  SCRIPT_0x05_SCENE_1633,
  SCRIPT_0x05_SCENE_1634,
  SCRIPT_0x05_SCENE_1635,
  SCRIPT_0x05_SCENE_1636,
  SCRIPT_0x05_SCENE_1637,
  SCRIPT_0x05_SCENE_1638,
  SCRIPT_0x05_SCENE_1639,
  SCRIPT_0x05_SCENE_1640,
  SCRIPT_0x05_SCENE_1641,
  SCRIPT_0x05_SCENE_1642,
  SCRIPT_0x05_SCENE_1643,
  SCRIPT_0x05_SCENE_1644,
  SCRIPT_0x05_SCENE_1645,
  SCRIPT_0x05_SCENE_1646,
  SCRIPT_0x05_SCENE_1647,
  SCRIPT_0x05_SCENE_1648,
  SCRIPT_0x05_SCENE_1649,
  SCRIPT_0x05_SCENE_1650,
  SCRIPT_0x05_SCENE_1651,
  SCRIPT_0x05_SCENE_1652,
  SCRIPT_0x05_SCENE_1653,
  SCRIPT_0x05_SCENE_1654,
  SCRIPT_0x05_SCENE_1655,
  SCRIPT_0x05_SCENE_1656,
  SCRIPT_0x05_SCENE_1657,
  SCRIPT_0x05_SCENE_1658,
  SCRIPT_0x05_SCENE_1659,
  SCRIPT_0x05_SCENE_1660,
  SCRIPT_0x05_SCENE_1661,
  SCRIPT_0x05_SCENE_1662,
  SCRIPT_0x05_SCENE_1663,
  SCRIPT_0x05_SCENE_1664,
  SCRIPT_0x05_SCENE_1665,
  SCRIPT_0x05_SCENE_1666,
  SCRIPT_0x05_SCENE_1667,
  SCRIPT_0x05_SCENE_1668,
  SCRIPT_0x05_SCENE_1669,
  SCRIPT_0x05_SCENE_1670,
  SCRIPT_0x05_SCENE_1671,
  SCRIPT_0x05_SCENE_1672,
  SCRIPT_0x05_SCENE_1673,
  SCRIPT_0x05_SCENE_1674,
  SCRIPT_0x05_SCENE_1675,
  SCRIPT_0x05_SCENE_1676,
  SCRIPT_0x05_SCENE_1677,
  SCRIPT_0x05_SCENE_1678,
  SCRIPT_0x05_SCENE_1679,
  SCRIPT_0x05_SCENE_1680,
  SCRIPT_0x05_SCENE_1681,
  SCRIPT_0x05_SCENE_1682,
  SCRIPT_0x05_SCENE_1683,
  SCRIPT_0x05_SCENE_1684,
  SCRIPT_0x05_SCENE_1685,
  SCRIPT_0x05_SCENE_1686,
  SCRIPT_0x05_SCENE_1687,
  SCRIPT_0x05_SCENE_1688,
  SCRIPT_0x05_SCENE_1689,
  SCRIPT_0x05_SCENE_1690,
  SCRIPT_0x05_SCENE_1691,
  SCRIPT_0x05_SCENE_1692,
  SCRIPT_0x05_SCENE_1693,
  SCRIPT_0x05_SCENE_1694,
  SCRIPT_0x05_SCENE_1695,
  SCRIPT_0x05_SCENE_1696,
  SCRIPT_0x05_SCENE_1697,
  SCRIPT_0x05_SCENE_1698,
  SCRIPT_0x05_SCENE_1699,
  SCRIPT_0x05_SCENE_1700,
  SCRIPT_0x05_SCENE_1701,
  SCRIPT_0x05_SCENE_1702,
  SCRIPT_0x05_SCENE_1703,
  SCRIPT_0x05_SCENE_1704,
  SCRIPT_0x05_SCENE_1705,
  SCRIPT_0x05_SCENE_1706,
  SCRIPT_0x05_SCENE_1707,
  SCRIPT_0x05_SCENE_1708,
  SCRIPT_0x05_SCENE_1709,
  SCRIPT_0x05_SCENE_1710,
  SCRIPT_0x05_SCENE_1711,
  SCRIPT_0x05_SCENE_1712,
  SCRIPT_0x05_SCENE_1713,
  SCRIPT_0x05_SCENE_1714,
  SCRIPT_0x05_SCENE_1715,
  SCRIPT_0x05_SCENE_1716,
  SCRIPT_0x05_SCENE_1717,
  SCRIPT_0x05_SCENE_1718,
  SCRIPT_0x05_SCENE_1719,
  SCRIPT_0x05_SCENE_1720,
  SCRIPT_0x05_SCENE_1721,
  SCRIPT_0x05_SCENE_1722,
  SCRIPT_0x05_SCENE_1723,
  SCRIPT_0x05_SCENE_1724,
  SCRIPT_0x05_SCENE_1725,
  SCRIPT_0x05_SCENE_1726,
  SCRIPT_0x05_SCENE_1727,
  SCRIPT_0x05_SCENE_1728,
  SCRIPT_0x05_SCENE_1729,
  SCRIPT_0x05_SCENE_1730,
  SCRIPT_0x05_SCENE_1731,
  SCRIPT_0x05_SCENE_1732,
  SCRIPT_0x05_SCENE_1733,
  SCRIPT_0x05_SCENE_1734,
  SCRIPT_0x05_SCENE_1735,
  SCRIPT_0x05_SCENE_1736,
  SCRIPT_0x05_SCENE_1737,
  SCRIPT_0x05_SCENE_1738,
  SCRIPT_0x05_SCENE_1739,
  SCRIPT_0x05_SCENE_1740,
  SCRIPT_0x05_SCENE_1741,
  SCRIPT_0x05_SCENE_1742,
  SCRIPT_0x05_SCENE_1743,
  SCRIPT_0x05_SCENE_1744,
  SCRIPT_0x05_SCENE_1745,
  SCRIPT_0x05_SCENE_1746,
  SCRIPT_0x05_SCENE_1747,
  SCRIPT_0x05_SCENE_1748,
  SCRIPT_0x05_SCENE_1749,
  SCRIPT_0x05_SCENE_1750,
  SCRIPT_0x05_SCENE_1751,
  SCRIPT_0x05_SCENE_1752,
  SCRIPT_0x05_SCENE_1753,
  SCRIPT_0x05_SCENE_1754,
  SCRIPT_0x05_SCENE_1755,
  SCRIPT_0x05_SCENE_1756,
  SCRIPT_0x05_SCENE_1757,
  SCRIPT_0x05_SCENE_1758,
  SCRIPT_0x05_SCENE_1759,
  SCRIPT_0x05_SCENE_1760,
  SCRIPT_0x05_SCENE_1761,
  SCRIPT_0x05_SCENE_1762,
  SCRIPT_0x05_SCENE_1763,
  SCRIPT_0x05_SCENE_1764,
  SCRIPT_0x05_SCENE_1765,
  SCRIPT_0x05_SCENE_1766,
  SCRIPT_0x05_SCENE_1767,
  SCRIPT_0x05_SCENE_1768,
  SCRIPT_0x05_SCENE_1769,
  SCRIPT_0x05_SCENE_1770,
  SCRIPT_0x05_SCENE_1771,
  SCRIPT_0x05_SCENE_1772,
  SCRIPT_0x05_SCENE_1773,
  SCRIPT_0x05_SCENE_1774,
  SCRIPT_0x05_SCENE_1775,
  SCRIPT_0x05_SCENE_1776,
  SCRIPT_0x05_SCENE_1777,
  SCRIPT_0x05_SCENE_1778,
  SCRIPT_0x05_SCENE_1779,
  SCRIPT_0x05_SCENE_1780,
  SCRIPT_0x05_SCENE_1781,
  SCRIPT_0x05_SCENE_1782,
  SCRIPT_0x05_SCENE_1783,
  SCRIPT_0x05_SCENE_1784,
  SCRIPT_0x05_SCENE_1785,
  SCRIPT_0x05_SCENE_1786,
  SCRIPT_0x05_SCENE_1787,
  SCRIPT_0x05_SCENE_1788,
  SCRIPT_0x05_SCENE_1789,
  SCRIPT_0x05_SCENE_1790,
  SCRIPT_0x05_SCENE_1791,
  SCRIPT_0x05_SCENE_1792,
  SCRIPT_0x05_SCENE_1793,
  SCRIPT_0x05_SCENE_1794,
  SCRIPT_0x05_SCENE_1795,
  SCRIPT_0x05_SCENE_1796,
  SCRIPT_0x05_SCENE_1797,
  SCRIPT_0x05_SCENE_1798,
  SCRIPT_0x05_SCENE_1799,
  SCRIPT_0x05_SCENE_1800,
  SCRIPT_0x05_SCENE_1801,
  SCRIPT_0x05_SCENE_1802,
  SCRIPT_0x05_SCENE_1803,
  SCRIPT_0x05_SCENE_1804,
  SCRIPT_0x05_SCENE_1805,
  SCRIPT_0x05_SCENE_1806,
  SCRIPT_0x05_SCENE_1807,
  SCRIPT_0x05_SCENE_1808,
  SCRIPT_0x05_SCENE_1809,
  SCRIPT_0x05_SCENE_1810,
  SCRIPT_0x05_SCENE_1811,
  SCRIPT_0x05_SCENE_1812,
  SCRIPT_0x05_SCENE_1813,
  SCRIPT_0x05_SCENE_1814,
  SCRIPT_0x05_SCENE_1815,
  SCRIPT_0x05_SCENE_1816,
  SCRIPT_0x05_SCENE_1817,
  SCRIPT_0x05_SCENE_1818,
  SCRIPT_0x05_SCENE_1819,
  SCRIPT_0x05_SCENE_1820,
  SCRIPT_0x05_SCENE_1821,
  SCRIPT_0x05_SCENE_1822,
  SCRIPT_0x05_SCENE_1823,
  SCRIPT_0x05_SCENE_1824,
  SCRIPT_0x05_SCENE_1825,
  SCRIPT_0x05_SCENE_1826,
  SCRIPT_0x05_SCENE_1827,
  SCRIPT_0x05_SCENE_1828,
  SCRIPT_0x05_SCENE_1829,
  SCRIPT_0x05_SCENE_1830,
  SCRIPT_0x05_SCENE_1831,
  SCRIPT_0x05_SCENE_1832,
  SCRIPT_0x05_SCENE_1833,
  SCRIPT_0x05_SCENE_1834,
  SCRIPT_0x05_SCENE_1835,
  SCRIPT_0x05_SCENE_1836,
  SCRIPT_0x05_SCENE_1837,
  SCRIPT_0x05_SCENE_1838,
  SCRIPT_0x05_SCENE_1839,
  SCRIPT_0x05_SCENE_1840,
  SCRIPT_0x05_SCENE_1841,
  SCRIPT_0x05_SCENE_1842,
  SCRIPT_0x05_SCENE_1843,
  SCRIPT_0x05_SCENE_1844,
  SCRIPT_0x05_SCENE_1845,
  SCRIPT_0x05_SCENE_1846,
  SCRIPT_0x05_SCENE_1847,
  SCRIPT_0x05_SCENE_1848,
  SCRIPT_0x05_SCENE_1849,
  SCRIPT_0x05_SCENE_1850,
  SCRIPT_0x05_SCENE_1851,
  SCRIPT_0x05_SCENE_1852,
  SCRIPT_0x05_SCENE_1853,
  SCRIPT_0x05_SCENE_1854,
  SCRIPT_0x05_SCENE_1855,
  SCRIPT_0x05_SCENE_1856,
  SCRIPT_0x05_SCENE_1857,
  SCRIPT_0x05_SCENE_1858,
  SCRIPT_0x05_SCENE_1859,
  SCRIPT_0x05_SCENE_1860,
  SCRIPT_0x05_SCENE_1861,
  SCRIPT_0x05_SCENE_1862,
  SCRIPT_0x05_SCENE_1863,
  SCRIPT_0x05_SCENE_1864,
  SCRIPT_0x05_SCENE_1865,
  SCRIPT_0x05_SCENE_1866,
  SCRIPT_0x05_SCENE_1867,
  SCRIPT_0x05_SCENE_1868,
  SCRIPT_0x05_SCENE_1869,
  SCRIPT_0x05_SCENE_1870,
  SCRIPT_0x05_SCENE_1871,
  SCRIPT_0x05_SCENE_1872,
  SCRIPT_0x05_SCENE_1873,
  SCRIPT_0x05_SCENE_1874,
  SCRIPT_0x05_SCENE_1875,
  SCRIPT_0x05_SCENE_1876,
  SCRIPT_0x05_SCENE_1877,
  SCRIPT_0x05_SCENE_1878,
  SCRIPT_0x05_SCENE_1879,
  SCRIPT_0x05_SCENE_1880,
  SCRIPT_0x05_SCENE_1881,
  SCRIPT_0x05_SCENE_1882,
  SCRIPT_0x05_SCENE_1883,
  SCRIPT_0x05_SCENE_1884,
  SCRIPT_0x05_SCENE_1885,
  SCRIPT_0x05_SCENE_1886,
  SCRIPT_0x05_SCENE_1887,
  SCRIPT_0x05_SCENE_1888,
  SCRIPT_0x05_SCENE_1889,
  SCRIPT_0x05_SCENE_1890,
  SCRIPT_0x05_SCENE_1891,
  SCRIPT_0x05_SCENE_1892,
  SCRIPT_0x05_SCENE_1893,
  SCRIPT_0x05_SCENE_1894,
  SCRIPT_0x05_SCENE_1895,
  SCRIPT_0x05_SCENE_1896,
  SCRIPT_0x05_SCENE_1897,
  SCRIPT_0x05_SCENE_1898,
  SCRIPT_0x05_SCENE_1899,
  SCRIPT_0x05_SCENE_1900,
  SCRIPT_0x05_SCENE_1901,
  SCRIPT_0x05_SCENE_1902,
  SCRIPT_0x05_SCENE_1903,
  SCRIPT_0x05_SCENE_1904,
  SCRIPT_0x05_SCENE_1905,
  SCRIPT_0x05_SCENE_1906,
  SCRIPT_0x05_SCENE_1907,
  SCRIPT_0x05_SCENE_1908,
  SCRIPT_0x05_SCENE_1909,
  SCRIPT_0x05_SCENE_1910,
  SCRIPT_0x05_SCENE_1911,
  SCRIPT_0x05_SCENE_1912,
  SCRIPT_0x05_SCENE_1913,
  SCRIPT_0x05_SCENE_1914,
  SCRIPT_0x05_SCENE_1915,
  SCRIPT_0x05_SCENE_1916,
  SCRIPT_0x05_SCENE_1917,
  SCRIPT_0x05_SCENE_1918,
  SCRIPT_0x05_SCENE_1919,
  SCRIPT_0x05_SCENE_1920,
  SCRIPT_0x05_SCENE_1921,
  SCRIPT_0x05_SCENE_1922,
  SCRIPT_0x05_SCENE_1923,
  SCRIPT_0x05_SCENE_1924,
  SCRIPT_0x05_SCENE_1925,
  SCRIPT_0x05_SCENE_1926,
  SCRIPT_0x05_SCENE_1927,
  SCRIPT_0x05_SCENE_1928,
  SCRIPT_0x05_SCENE_1929,
  SCRIPT_0x05_SCENE_1930,
  SCRIPT_0x05_SCENE_1931,
  SCRIPT_0x05_SCENE_1932,
  SCRIPT_0x05_SCENE_1933,
  SCRIPT_0x05_SCENE_1934,
  SCRIPT_0x05_SCENE_1935,
  SCRIPT_0x05_SCENE_1936,
  SCRIPT_0x05_SCENE_1937,
  SCRIPT_0x05_SCENE_1938,
  SCRIPT_0x05_SCENE_1939,
  SCRIPT_0x05_SCENE_1940,
  SCRIPT_0x05_SCENE_1941,
  SCRIPT_0x05_SCENE_1942,
  SCRIPT_0x05_SCENE_1943,
  SCRIPT_0x05_SCENE_1944,
  SCRIPT_0x05_SCENE_1945,
  SCRIPT_0x05_SCENE_1946,
  SCRIPT_0x05_SCENE_1947,
  SCRIPT_0x05_SCENE_1948,
  SCRIPT_0x05_SCENE_1949,
  SCRIPT_0x05_SCENE_1950,
  SCRIPT_0x05_SCENE_1951,
  SCRIPT_0x05_SCENE_1952,
  SCRIPT_0x05_SCENE_1953,
  SCRIPT_0x05_SCENE_1954,
  SCRIPT_0x05_SCENE_1955,
  SCRIPT_0x05_SCENE_1956,
  SCRIPT_0x05_SCENE_1957,
  SCRIPT_0x05_SCENE_1958,
  SCRIPT_0x05_SCENE_1959,
  SCRIPT_0x05_SCENE_1960,
  SCRIPT_0x05_SCENE_1961,
  SCRIPT_0x05_SCENE_1962,
  SCRIPT_0x05_SCENE_1963,
  SCRIPT_0x05_SCENE_1964,
  SCRIPT_0x05_SCENE_1965,
  SCRIPT_0x05_SCENE_1966,
  SCRIPT_0x05_SCENE_1967,
  SCRIPT_0x05_SCENE_1968,
  SCRIPT_0x05_SCENE_1969,
  SCRIPT_0x05_SCENE_1970,
  SCRIPT_0x05_SCENE_1971,
  SCRIPT_0x05_SCENE_1972,
  SCRIPT_0x05_SCENE_1973,
  SCRIPT_0x05_SCENE_1974,
  SCRIPT_0x05_SCENE_1975,
  SCRIPT_0x05_SCENE_1976,
  SCRIPT_0x05_SCENE_1977,
  SCRIPT_0x05_SCENE_1978,
  SCRIPT_0x05_SCENE_1979,
  SCRIPT_0x05_SCENE_1980,
  SCRIPT_0x05_SCENE_1981,
  SCRIPT_0x05_SCENE_1982,
  SCRIPT_0x05_SCENE_1983,
  SCRIPT_0x05_SCENE_1984,
  SCRIPT_0x05_SCENE_1985,
  SCRIPT_0x05_SCENE_1986,
  SCRIPT_0x05_SCENE_1987,
  SCRIPT_0x05_SCENE_1988,
  SCRIPT_0x05_SCENE_1989,
  SCRIPT_0x05_SCENE_1990,
  SCRIPT_0x05_SCENE_1991,
  SCRIPT_0x05_SCENE_1992,
  SCRIPT_0x05_SCENE_1993,
  SCRIPT_0x05_SCENE_1994,
  SCRIPT_0x05_SCENE_1995,
  SCRIPT_0x05_SCENE_1996,
  SCRIPT_0x05_SCENE_1997,
  SCRIPT_0x05_SCENE_1998,
  SCRIPT_0x05_SCENE_1999,
  SCRIPT_0x05_SCENE_2000,
  SCRIPT_0x05_SCENE_2001,
  SCRIPT_0x05_SCENE_2002,
  SCRIPT_0x05_SCENE_2003,
  SCRIPT_0x05_SCENE_2004,
  SCRIPT_0x05_SCENE_2005,
  SCRIPT_0x05_SCENE_2006,
  SCRIPT_0x05_SCENE_2007,
  SCRIPT_0x05_SCENE_2008,
  SCRIPT_0x05_SCENE_2009,
  SCRIPT_0x05_SCENE_2010,
  SCRIPT_0x05_SCENE_2011,
  SCRIPT_0x05_SCENE_2012,
  SCRIPT_0x05_SCENE_2013,
  SCRIPT_0x05_SCENE_2014,
  SCRIPT_0x05_SCENE_2015,
  SCRIPT_0x05_SCENE_2016,
  SCRIPT_0x05_SCENE_2017,
  SCRIPT_0x05_SCENE_2018,
  SCRIPT_0x05_SCENE_2019,
  SCRIPT_0x05_SCENE_2020,
  SCRIPT_0x05_SCENE_2021,
  SCRIPT_0x05_SCENE_2022,
  SCRIPT_0x05_SCENE_2023,
  SCRIPT_0x05_SCENE_2024,
  SCRIPT_0x05_SCENE_2025,
  SCRIPT_0x05_SCENE_2026,
  SCRIPT_0x05_SCENE_2027,
  SCRIPT_0x05_SCENE_2028,
  SCRIPT_0x05_SCENE_2029,
  SCRIPT_0x05_SCENE_2030,
  SCRIPT_0x05_SCENE_2031,
  SCRIPT_0x05_SCENE_2032,
  SCRIPT_0x05_SCENE_2033,
  SCRIPT_0x05_SCENE_2034,
  SCRIPT_0x05_SCENE_2035,
  SCRIPT_0x05_SCENE_2036,
  SCRIPT_0x05_SCENE_2037,
  SCRIPT_0x05_SCENE_2038,
  SCRIPT_0x05_SCENE_2039,
  SCRIPT_0x05_SCENE_2040,
  SCRIPT_0x05_SCENE_2041,
  SCRIPT_0x05_SCENE_2042,
  SCRIPT_0x05_SCENE_2043,
  SCRIPT_0x05_SCENE_2044,
  SCRIPT_0x05_SCENE_2045,
  SCRIPT_0x05_SCENE_2046,
  SCRIPT_0x05_SCENE_2047,
  SCRIPT_0x05_SCENE_2048,
  SCRIPT_0x05_SCENE_2049,
  SCRIPT_0x05_SCENE_2050,
  SCRIPT_0x05_SCENE_2051,
  SCRIPT_0x05_SCENE_2052,
  SCRIPT_0x05_SCENE_2053,
  SCRIPT_0x05_SCENE_2054,
  SCRIPT_0x05_SCENE_2055,
  SCRIPT_0x05_SCENE_2056,
  SCRIPT_0x05_SCENE_2057,
  SCRIPT_0x05_SCENE_2058,
  SCRIPT_0x05_SCENE_2059,
  SCRIPT_0x05_SCENE_2060,
  SCRIPT_0x05_SCENE_2061,
  SCRIPT_0x05_SCENE_2062,
  SCRIPT_0x05_SCENE_2063,
  SCRIPT_0x05_SCENE_2064,
  SCRIPT_0x05_SCENE_2065,
  SCRIPT_0x05_SCENE_2066,
  SCRIPT_0x05_SCENE_2067,
  SCRIPT_0x05_SCENE_2068,
  SCRIPT_0x05_SCENE_2069,
  SCRIPT_0x05_SCENE_2070,
  SCRIPT_0x05_SCENE_2071,
  SCRIPT_0x05_SCENE_2072,
  SCRIPT_0x05_SCENE_2073,
  SCRIPT_0x05_SCENE_2074,
  SCRIPT_0x05_SCENE_2075,
  SCRIPT_0x05_SCENE_2076,
  SCRIPT_0x05_SCENE_2077,
  SCRIPT_0x05_SCENE_2078,
  SCRIPT_0x05_SCENE_2079,
  SCRIPT_0x05_SCENE_2080,
  SCRIPT_0x05_SCENE_2081,
  SCRIPT_0x05_SCENE_2082,
  SCRIPT_0x05_SCENE_2083,
  SCRIPT_0x05_SCENE_2084,
  SCRIPT_0x05_SCENE_2085,
  SCRIPT_0x05_SCENE_2086,
  SCRIPT_0x05_SCENE_2087,
  SCRIPT_0x05_SCENE_2088,
  SCRIPT_0x05_SCENE_2089,
  SCRIPT_0x05_SCENE_2090,
  SCRIPT_0x05_SCENE_2091,
  SCRIPT_0x05_SCENE_2092,
  SCRIPT_0x05_SCENE_2093,
  SCRIPT_0x05_SCENE_2094,
  SCRIPT_0x05_SCENE_2095,
  SCRIPT_0x05_SCENE_2096,
  SCRIPT_0x05_SCENE_2097,
  SCRIPT_0x05_SCENE_2098,
  SCRIPT_0x05_SCENE_2099,
  SCRIPT_0x05_SCENE_2100,
  SCRIPT_0x05_SCENE_2101,
  SCRIPT_0x05_SCENE_2102,
  SCRIPT_0x05_SCENE_2103,
  SCRIPT_0x05_SCENE_2104,
  SCRIPT_0x05_SCENE_2105,
  SCRIPT_0x05_SCENE_2106,
  SCRIPT_0x05_SCENE_2107,
  SCRIPT_0x05_SCENE_2108,
  SCRIPT_0x05_SCENE_2109,
  SCRIPT_0x05_SCENE_2110,
  SCRIPT_0x05_SCENE_2111,
  SCRIPT_0x05_SCENE_2112,
  SCRIPT_0x05_SCENE_2113,
  SCRIPT_0x05_SCENE_2114,
  SCRIPT_0x05_SCENE_2115,
  SCRIPT_0x05_SCENE_2116,
  SCRIPT_0x05_SCENE_2117,
  SCRIPT_0x05_SCENE_2118,
  SCRIPT_0x05_SCENE_2119,
  SCRIPT_0x05_SCENE_2120,
  SCRIPT_0x05_SCENE_2121,
  SCRIPT_0x05_SCENE_2122,
  SCRIPT_0x05_SCENE_2123,
  SCRIPT_0x05_SCENE_2124,
  SCRIPT_0x05_SCENE_2125,
  SCRIPT_0x05_SCENE_2126,
  SCRIPT_0x05_SCENE_2127,
  SCRIPT_0x05_SCENE_2128,
  SCRIPT_0x05_SCENE_2129,
  SCRIPT_0x05_SCENE_2130,
  SCRIPT_0x05_SCENE_2131,
  SCRIPT_0x05_SCENE_2132,
  SCRIPT_0x05_SCENE_2133,
  SCRIPT_0x05_SCENE_2134,
  SCRIPT_0x05_SCENE_2135,
  SCRIPT_0x05_SCENE_2136,
  SCRIPT_0x05_SCENE_2137,
  SCRIPT_0x05_SCENE_2138,
  SCRIPT_0x05_SCENE_2139,
  SCRIPT_0x05_SCENE_2140,
  SCRIPT_0x05_SCENE_2141,
  SCRIPT_0x05_SCENE_2142,
  SCRIPT_0x05_SCENE_2143,
  SCRIPT_0x05_SCENE_2144,
  SCRIPT_0x05_SCENE_2145,
  SCRIPT_0x05_SCENE_2146,
  SCRIPT_0x05_SCENE_2147,
  SCRIPT_0x05_SCENE_2148,
  SCRIPT_0x05_SCENE_2149,
  SCRIPT_0x05_SCENE_2150,
  SCRIPT_0x05_SCENE_2151,
  SCRIPT_0x05_SCENE_2152,
  SCRIPT_0x05_SCENE_2153,
  SCRIPT_0x05_SCENE_2154,
  SCRIPT_0x05_SCENE_2155,
  SCRIPT_0x05_SCENE_2156,
  SCRIPT_0x05_SCENE_2157,
  SCRIPT_0x05_SCENE_2158,
  SCRIPT_0x05_SCENE_2159,
  SCRIPT_0x05_SCENE_2160,
  SCRIPT_0x05_SCENE_2161,
  SCRIPT_0x05_SCENE_2162,
  SCRIPT_0x05_SCENE_2163,
  SCRIPT_0x05_SCENE_2164,
  SCRIPT_0x05_SCENE_2165,
  SCRIPT_0x05_SCENE_2166,
  SCRIPT_0x05_SCENE_2167,
  SCRIPT_0x05_SCENE_2168,
  SCRIPT_0x05_SCENE_2169,
  SCRIPT_0x05_SCENE_2170,
  SCRIPT_0x05_SCENE_2171,
  SCRIPT_0x05_SCENE_2172,
  SCRIPT_0x05_SCENE_2173,
  SCRIPT_0x05_SCENE_2174,
  SCRIPT_0x05_SCENE_2175,
  SCRIPT_0x05_SCENE_2176,
  SCRIPT_0x05_SCENE_2177,
  SCRIPT_0x05_SCENE_2178,
  SCRIPT_0x05_SCENE_2179,
  SCRIPT_0x05_SCENE_2180,
  SCRIPT_0x05_SCENE_2181,
  SCRIPT_0x05_SCENE_2182,
  SCRIPT_0x05_SCENE_2183,
  SCRIPT_0x05_SCENE_2184,
  SCRIPT_0x05_SCENE_2185,
  SCRIPT_0x05_SCENE_2186,
  SCRIPT_0x05_SCENE_2187,
  SCRIPT_0x05_SCENE_2188,
  SCRIPT_0x05_SCENE_2189,
  SCRIPT_0x05_SCENE_2190,
  SCRIPT_0x05_SCENE_2191,
  SCRIPT_0x05_SCENE_2192,
  SCRIPT_0x05_SCENE_2193,
  SCRIPT_0x05_SCENE_2194,
  SCRIPT_0x05_SCENE_2195,
  SCRIPT_0x05_SCENE_2196,
  SCRIPT_0x05_SCENE_2197,
  SCRIPT_0x05_SCENE_2198,
  SCRIPT_0x05_SCENE_2199,
  SCRIPT_0x05_SCENE_2200,
  SCRIPT_0x05_SCENE_2201,
  SCRIPT_0x05_SCENE_2202,
  SCRIPT_0x05_SCENE_2203,
  SCRIPT_0x05_SCENE_2204,
  SCRIPT_0x05_SCENE_2205,
  SCRIPT_0x05_SCENE_2206,
  SCRIPT_0x05_SCENE_2207,
  SCRIPT_0x05_SCENE_2208,
  SCRIPT_0x05_SCENE_2209,
  SCRIPT_0x05_SCENE_2210,
  SCRIPT_0x05_SCENE_2211,
  SCRIPT_0x05_SCENE_2212,
  SCRIPT_0x05_SCENE_2213,
  SCRIPT_0x05_SCENE_2214,
  SCRIPT_0x05_SCENE_2215,
  SCRIPT_0x05_SCENE_2216,
  SCRIPT_0x05_SCENE_2217,
  SCRIPT_0x05_SCENE_2218,
  SCRIPT_0x05_SCENE_2219,
  SCRIPT_0x05_SCENE_2220,
  SCRIPT_0x05_SCENE_2221,
  SCRIPT_0x05_SCENE_2222,
  SCRIPT_0x05_SCENE_2223,
  SCRIPT_0x05_SCENE_2224,
  SCRIPT_0x05_SCENE_2225,
  SCRIPT_0x05_SCENE_2226,
  SCRIPT_0x05_SCENE_2227,
  SCRIPT_0x05_SCENE_2228,
  SCRIPT_0x05_SCENE_2229,
  SCRIPT_0x05_SCENE_2230,
  SCRIPT_0x05_SCENE_2231,
  SCRIPT_0x05_SCENE_2232,
  SCRIPT_0x05_SCENE_2233,
  SCRIPT_0x05_SCENE_2234,
  SCRIPT_0x05_SCENE_2235,
  SCRIPT_0x05_SCENE_2236,
  SCRIPT_0x05_SCENE_2237,
  SCRIPT_0x05_SCENE_2238,
  SCRIPT_0x05_SCENE_2239,
  SCRIPT_0x05_SCENE_2240,
  SCRIPT_0x05_SCENE_2241,
  SCRIPT_0x05_SCENE_2242,
  SCRIPT_0x05_SCENE_2243,
  SCRIPT_0x05_SCENE_2244,
  SCRIPT_0x05_SCENE_2245,
  SCRIPT_0x05_SCENE_2246,
  SCRIPT_0x05_SCENE_2247,
  SCRIPT_0x05_SCENE_2248,
  SCRIPT_0x05_SCENE_2249,
  SCRIPT_0x05_SCENE_2250,
  SCRIPT_0x05_SCENE_2251,
  SCRIPT_0x05_SCENE_2252,
  SCRIPT_0x05_SCENE_2253,
  SCRIPT_0x05_SCENE_2254,
  SCRIPT_0x05_SCENE_2255,
  SCRIPT_0x05_SCENE_2256,
  SCRIPT_0x05_SCENE_2257,
  SCRIPT_0x05_SCENE_2258,
  SCRIPT_0x05_SCENE_2259,
  SCRIPT_0x05_SCENE_2260,
  SCRIPT_0x05_SCENE_2261,
  SCRIPT_0x05_SCENE_2262,
  SCRIPT_0x05_SCENE_2263,
  SCRIPT_0x05_SCENE_2264,
  SCRIPT_0x05_SCENE_2265,
  SCRIPT_0x05_SCENE_2266,
  SCRIPT_0x05_SCENE_2267,
  SCRIPT_0x05_SCENE_2268,
  SCRIPT_0x05_SCENE_2269,
  SCRIPT_0x05_SCENE_2270,
  SCRIPT_0x05_SCENE_2271,
  SCRIPT_0x05_SCENE_2272,
  SCRIPT_0x05_SCENE_2273,
  SCRIPT_0x05_SCENE_2274,
  SCRIPT_0x05_SCENE_2275,
  SCRIPT_0x05_SCENE_2276,
  SCRIPT_0x05_SCENE_2277,
  SCRIPT_0x05_SCENE_2278,
  SCRIPT_0x05_SCENE_2279,
  SCRIPT_0x05_SCENE_2280,
  SCRIPT_0x05_SCENE_2281,
  SCRIPT_0x05_SCENE_2282,
  SCRIPT_0x05_SCENE_2283,
  SCRIPT_0x05_SCENE_2284,
  SCRIPT_0x05_SCENE_2285,
  SCRIPT_0x05_SCENE_2286,
  SCRIPT_0x05_SCENE_2287,
  SCRIPT_0x05_SCENE_2288,
  SCRIPT_0x05_SCENE_2289,
  SCRIPT_0x05_SCENE_2290,
  SCRIPT_0x05_SCENE_2291,
  SCRIPT_0x05_SCENE_2292,
  SCRIPT_0x05_SCENE_2293,
  SCRIPT_0x05_SCENE_2294,
  SCRIPT_0x05_SCENE_2295,
  SCRIPT_0x05_SCENE_2296,
  SCRIPT_0x05_SCENE_2297,
  SCRIPT_0x05_SCENE_2298,
  SCRIPT_0x05_SCENE_2299,
  SCRIPT_0x05_SCENE_2300,
  SCRIPT_0x05_SCENE_2301,
  SCRIPT_0x05_SCENE_2302,
  SCRIPT_0x05_SCENE_2303,
  SCRIPT_0x05_SCENE_2304,
  SCRIPT_0x05_SCENE_2305,
  SCRIPT_0x05_SCENE_2306,
  SCRIPT_0x05_SCENE_2307,
  SCRIPT_0x05_SCENE_2308,
  SCRIPT_0x05_SCENE_2309,
  SCRIPT_0x05_SCENE_2310,
  SCRIPT_0x05_SCENE_2311,
  SCRIPT_0x05_SCENE_2312,
  SCRIPT_0x05_SCENE_2313,
  SCRIPT_0x05_SCENE_2314,
  SCRIPT_0x05_SCENE_2315,
  SCRIPT_0x05_SCENE_2316,
  SCRIPT_0x05_SCENE_2317,
  SCRIPT_0x05_SCENE_2318,
  SCRIPT_0x05_SCENE_2319,
  SCRIPT_0x05_SCENE_2320,
  SCRIPT_0x05_SCENE_2321,
  SCRIPT_0x05_SCENE_2322,
  SCRIPT_0x05_SCENE_2323,
  SCRIPT_0x05_SCENE_2324,
  SCRIPT_0x05_SCENE_2325,
  SCRIPT_0x05_SCENE_2326,
  SCRIPT_0x05_SCENE_2327,
  SCRIPT_0x05_SCENE_2328,
  SCRIPT_0x05_SCENE_2329,
  SCRIPT_0x05_SCENE_2330,
  SCRIPT_0x05_SCENE_2331,
  SCRIPT_0x05_SCENE_2332,
  SCRIPT_0x05_SCENE_2333,
  SCRIPT_0x05_SCENE_2334,
  SCRIPT_0x05_SCENE_2335,
  SCRIPT_0x05_SCENE_2336,
  SCRIPT_0x05_SCENE_2337,
  SCRIPT_0x05_SCENE_2338,
  SCRIPT_0x05_SCENE_2339,
  SCRIPT_0x05_SCENE_2340,
  SCRIPT_0x05_SCENE_2341,
  SCRIPT_0x05_SCENE_2342,
  SCRIPT_0x05_SCENE_2343,
  SCRIPT_0x05_SCENE_2344,
  SCRIPT_0x05_SCENE_2345,
  SCRIPT_0x05_SCENE_2346,
  SCRIPT_0x05_SCENE_2347,
  SCRIPT_0x05_SCENE_2348,
  SCRIPT_0x05_SCENE_2349,
  SCRIPT_0x05_SCENE_2350,
  SCRIPT_0x05_SCENE_2351,
  SCRIPT_0x05_SCENE_2352,
  SCRIPT_0x05_SCENE_2353,
  SCRIPT_0x05_SCENE_2354,
  SCRIPT_0x05_SCENE_2355,
  SCRIPT_0x05_SCENE_2356,
  SCRIPT_0x05_SCENE_2357,
  SCRIPT_0x05_SCENE_2358,
  SCRIPT_0x05_SCENE_2359,
  SCRIPT_0x05_SCENE_2360,
  SCRIPT_0x05_SCENE_2361,
  SCRIPT_0x05_SCENE_2362,
  SCRIPT_0x05_SCENE_2363,
  SCRIPT_0x05_SCENE_2364,
  SCRIPT_0x05_SCENE_2365,
  SCRIPT_0x05_SCENE_2366,
  SCRIPT_0x05_SCENE_2367,
  SCRIPT_0x05_SCENE_2368,
  SCRIPT_0x05_SCENE_2369,
  SCRIPT_0x05_SCENE_2370,
  SCRIPT_0x05_SCENE_2371,
  SCRIPT_0x05_SCENE_2372,
  SCRIPT_0x05_SCENE_2373,
  SCRIPT_0x05_SCENE_2374,
  SCRIPT_0x05_SCENE_2375,
  SCRIPT_0x05_SCENE_2376,
  SCRIPT_0x05_SCENE_2377,
  SCRIPT_0x05_SCENE_2378,
  SCRIPT_0x05_SCENE_2379,
  SCRIPT_0x05_SCENE_2380,
  SCRIPT_0x05_SCENE_2381,
  SCRIPT_0x05_SCENE_2382,
  SCRIPT_0x05_SCENE_2383,
  SCRIPT_0x05_SCENE_2384,
  SCRIPT_0x05_SCENE_2385,
  SCRIPT_0x05_SCENE_2386,
  SCRIPT_0x05_SCENE_2387,
  SCRIPT_0x05_SCENE_2388,
  SCRIPT_0x05_SCENE_2389,
  SCRIPT_0x05_SCENE_2390,
  SCRIPT_0x05_SCENE_2391,
  SCRIPT_0x05_SCENE_2392,
  SCRIPT_0x05_SCENE_2393,
  SCRIPT_0x05_SCENE_2394,
  SCRIPT_0x05_SCENE_2395,
  SCRIPT_0x05_SCENE_2396,
  SCRIPT_0x05_SCENE_2397,
  SCRIPT_0x05_SCENE_2398,
  SCRIPT_0x05_SCENE_2399,
  SCRIPT_0x05_SCENE_2400,
  SCRIPT_0x05_SCENE_2401,
  SCRIPT_0x05_SCENE_2402,
  SCRIPT_0x05_SCENE_2403,
  SCRIPT_0x05_SCENE_2404,
  SCRIPT_0x05_SCENE_2405,
  SCRIPT_0x05_SCENE_2406,
  SCRIPT_0x05_SCENE_2407,
  SCRIPT_0x05_SCENE_2408,
  SCRIPT_0x05_SCENE_2409,
  SCRIPT_0x05_SCENE_2410,
  SCRIPT_0x05_SCENE_2411,
  SCRIPT_0x05_SCENE_2412,
  SCRIPT_0x05_SCENE_2413,
  SCRIPT_0x05_SCENE_2414,
  SCRIPT_0x05_SCENE_2415,
  SCRIPT_0x05_SCENE_2416,
  SCRIPT_0x05_SCENE_2417,
  SCRIPT_0x05_SCENE_2418,
  SCRIPT_0x05_SCENE_2419,
  SCRIPT_0x05_SCENE_2420,
  SCRIPT_0x05_SCENE_2421,
  SCRIPT_0x05_SCENE_2422,
  SCRIPT_0x05_SCENE_2423,
  SCRIPT_0x05_SCENE_2424,
  SCRIPT_0x05_SCENE_2425,
  SCRIPT_0x05_SCENE_2426,
  SCRIPT_0x05_SCENE_2427,
  SCRIPT_0x05_SCENE_2428,
  SCRIPT_0x05_SCENE_2429,
  SCRIPT_0x05_SCENE_2430,
  SCRIPT_0x05_SCENE_2431,
  SCRIPT_0x05_SCENE_2432,
  SCRIPT_0x05_SCENE_2433,
  SCRIPT_0x05_SCENE_2434,
  SCRIPT_0x05_SCENE_2435,
  SCRIPT_0x05_SCENE_2436,
  SCRIPT_0x05_SCENE_2437,
  SCRIPT_0x05_SCENE_2438,
  SCRIPT_0x05_SCENE_2439,
  SCRIPT_0x05_SCENE_2440,
  SCRIPT_0x05_SCENE_2441,
  SCRIPT_0x05_SCENE_2442,
  SCRIPT_0x05_SCENE_2443,
  SCRIPT_0x05_SCENE_2444,
  SCRIPT_0x05_SCENE_2445,
  SCRIPT_0x05_SCENE_2446,
  SCRIPT_0x05_SCENE_2447,
  SCRIPT_0x05_SCENE_2448,
  SCRIPT_0x05_SCENE_2449,
  SCRIPT_0x05_SCENE_2450,
  SCRIPT_0x05_SCENE_2451,
  SCRIPT_0x05_SCENE_2452,
  SCRIPT_0x05_SCENE_2453,
  SCRIPT_0x05_SCENE_2454,
  SCRIPT_0x05_SCENE_2455,
  SCRIPT_0x05_SCENE_2456,
  SCRIPT_0x05_SCENE_2457,
  SCRIPT_0x05_SCENE_2458,
  SCRIPT_0x05_SCENE_2459,
  SCRIPT_0x05_SCENE_2460,
  SCRIPT_0x05_SCENE_2461,
  SCRIPT_0x05_SCENE_2462,
  SCRIPT_0x05_SCENE_2463,
  SCRIPT_0x05_SCENE_2464,
  SCRIPT_0x05_SCENE_2465,
  SCRIPT_0x05_SCENE_2466,
  SCRIPT_0x05_SCENE_2467,
  SCRIPT_0x05_SCENE_2468,
  SCRIPT_0x05_SCENE_2469,
  SCRIPT_0x05_SCENE_2470,
  SCRIPT_0x05_SCENE_2471,
  SCRIPT_0x05_SCENE_2472,
  SCRIPT_0x05_SCENE_2473,
  SCRIPT_0x05_SCENE_2474,
  SCRIPT_0x05_SCENE_2475,
  SCRIPT_0x05_SCENE_2476,
  SCRIPT_0x05_SCENE_2477,
  SCRIPT_0x05_SCENE_2478,
  SCRIPT_0x05_SCENE_2479,
  SCRIPT_0x05_SCENE_2480,
  SCRIPT_0x05_SCENE_2481,
  SCRIPT_0x05_SCENE_2482,
  SCRIPT_0x05_SCENE_2483,
  SCRIPT_0x05_SCENE_2484,
  SCRIPT_0x05_SCENE_2485,
  SCRIPT_0x05_SCENE_2486,
  SCRIPT_0x05_SCENE_2487,
  SCRIPT_0x05_SCENE_2488,
  SCRIPT_0x05_SCENE_2489,
  SCRIPT_0x05_SCENE_2490,
  SCRIPT_0x05_SCENE_2491,
  SCRIPT_0x05_SCENE_2492,
  SCRIPT_0x05_SCENE_2493,
  SCRIPT_0x05_SCENE_2494,
  SCRIPT_0x05_SCENE_2495,
  SCRIPT_0x05_SCENE_2496,
  SCRIPT_0x05_SCENE_2497,
  SCRIPT_0x05_SCENE_2498,
  SCRIPT_0x05_SCENE_2499,
  SCRIPT_0x05_SCENE_2500,
  SCRIPT_0x05_SCENE_2501,
  SCRIPT_0x05_SCENE_2502,
  SCRIPT_0x05_SCENE_2503,
  SCRIPT_0x05_SCENE_2504,
  SCRIPT_0x05_SCENE_2505,
  SCRIPT_0x05_SCENE_2506,
  SCRIPT_0x05_SCENE_2507,
  SCRIPT_0x05_SCENE_2508,
  SCRIPT_0x05_SCENE_2509,
  SCRIPT_0x05_SCENE_2510,
  SCRIPT_0x05_SCENE_2511,
  SCRIPT_0x05_SCENE_2512,
  SCRIPT_0x05_SCENE_2513,
  SCRIPT_0x05_SCENE_2514,
  SCRIPT_0x05_SCENE_2515,
  SCRIPT_0x05_SCENE_2516,
  SCRIPT_0x05_SCENE_2517,
  SCRIPT_0x05_SCENE_2518,
  SCRIPT_0x05_SCENE_2519,
  SCRIPT_0x05_SCENE_2520,
  SCRIPT_0x05_SCENE_2521,
  SCRIPT_0x05_SCENE_2522,
  SCRIPT_0x05_SCENE_2523,
  SCRIPT_0x05_SCENE_2524,
  SCRIPT_0x05_SCENE_2525,
  SCRIPT_0x05_SCENE_2526,
  SCRIPT_0x05_SCENE_2527,
  SCRIPT_0x05_SCENE_2528,
  SCRIPT_0x05_SCENE_2529,
  SCRIPT_0x05_SCENE_2530,
  SCRIPT_0x05_SCENE_2531,
  SCRIPT_0x05_SCENE_2532,
  SCRIPT_0x05_SCENE_2533,
  SCRIPT_0x05_SCENE_2534,
  SCRIPT_0x05_SCENE_2535,
  SCRIPT_0x05_SCENE_2536,
  SCRIPT_0x05_SCENE_2537,
  SCRIPT_0x05_SCENE_2538,
  SCRIPT_0x05_SCENE_2539,
  SCRIPT_0x05_SCENE_2540,
  SCRIPT_0x05_SCENE_2541,
  SCRIPT_0x05_SCENE_2542,
  SCRIPT_0x05_SCENE_2543,
  SCRIPT_0x05_SCENE_2544,
  SCRIPT_0x05_SCENE_2545,
  SCRIPT_0x05_SCENE_2546,
  SCRIPT_0x05_SCENE_2547,
  SCRIPT_0x05_SCENE_2548,
  SCRIPT_0x05_SCENE_2549,
  SCRIPT_0x05_SCENE_2550,
  SCRIPT_0x05_SCENE_2551,
  SCRIPT_0x05_SCENE_2552,
  SCRIPT_0x05_SCENE_2553,
  SCRIPT_0x05_SCENE_2554,
  SCRIPT_0x05_SCENE_2555,
  SCRIPT_0x05_SCENE_2556,
  SCRIPT_0x05_SCENE_2557,
  SCRIPT_0x05_SCENE_2558,
  SCRIPT_0x05_SCENE_2559,
  SCRIPT_0x05_SCENE_2560,
  SCRIPT_0x05_SCENE_2561,
  SCRIPT_0x05_SCENE_2562,
  SCRIPT_0x05_SCENE_2563,
  SCRIPT_0x05_SCENE_2564,
  SCRIPT_0x05_SCENE_2565,
  SCRIPT_0x05_SCENE_2566,
  SCRIPT_0x05_SCENE_2567,
  SCRIPT_0x05_SCENE_2568,
  SCRIPT_0x05_SCENE_2569,
  SCRIPT_0x05_SCENE_2570,
  SCRIPT_0x05_SCENE_2571,
  SCRIPT_0x05_SCENE_2572,
  SCRIPT_0x05_SCENE_2573,
  SCRIPT_0x05_SCENE_2574,
  SCRIPT_0x05_SCENE_2575,
  SCRIPT_0x05_SCENE_2576,
  SCRIPT_0x05_SCENE_2577,
  SCRIPT_0x05_SCENE_2578,
  SCRIPT_0x05_SCENE_2579,
  SCRIPT_0x05_SCENE_2580,
  SCRIPT_0x05_SCENE_2581,
  SCRIPT_0x05_SCENE_2582,
  SCRIPT_0x05_SCENE_2583,
  SCRIPT_0x05_SCENE_2584,
  SCRIPT_0x05_SCENE_2585,
];

/** bank6 全部脚本 (index = 区内脚本 id) */
export const SCRIPTS_BANK_06: readonly (readonly (readonly number[])[])[] = [
  SCRIPT_0x00,
  SCRIPT_0x01,
  SCRIPT_0x02,
  SCRIPT_0x03,
  SCRIPT_0x04,
  SCRIPT_0x05,
];
 
export default SCRIPTS_BANK_06;