/**
 * SFX 音效数据表
 *
 * 来源: Bank 15 SE_POINTER_TABLE → 每个 seId 指向通道初始化列表
 *       通道初始化列表 → 音序数据 (Bank 15 + Bank 0D/0E/0F)
 *
 * 格式: SFX_ID → { notes: [freq, dur][] }
 *   每个 SFX 可以有多个通道 (0-7)，由 Bank12 引擎管理
 *
 * 31 个音效 (seId 0x01-0x1F):
 *   seId=01: 静音(8ch)    seId=02: 静音(4ch)
 *   seId=03-1F: 实际音效 — 需要从ROM提取音序数据
 */
export const sfxData = new Map<number, { notes: [number, number][] }>();

// ── SE 0x01: 静音 8ch (全通道静音化) ──
// ROM $8E42: ch0-7 → 静音命令
sfxData.set(0x01, { notes: [[0, 1]] });

// ── SE 0x03: 短音效 (ch0/1/3) ──
// ROM $8E68: ch0→$8E71 ch1→$8E71 ch3→$8E72
sfxData.set(0x03, { notes: [[0x40, 2], [0x42, 2], [0x40, 4]] });

// ── SE 0x04: 确认音 (ch0/1/3) ──
// ROM $8E89
sfxData.set(0x04, { notes: [[0x48, 2], [0x4A, 4]] });

// ── SE 0x05: 选择移动 (ch0/1/3) ──
sfxData.set(0x05, { notes: [[0x3E, 1]] });

// ── SE 0x07: 长音效 —
// ROM $8F14: ch0→$8F1D ch1→$8F47 ch3→$8F1E
sfxData.set(0x07, { notes: [[0x45, 6], [0x43, 4], [0x40, 8]] });

// ── SE 0x0C: 哨声 —
sfxData.set(0x0C, { notes: [[0x50, 4], [0x52, 8]] });

// ── SE 0x1A-0x1F: 跨Bank音效 (Bank 0D/0E/0F 数据) ──
// TODO: 从 Bank 0D/0E/0F ROM 提取完整音序
for (let id = 0x1A; id <= 0x1F; id++) {
  sfxData.set(id, { notes: [] });
}
