/**
 * BGM 数据表 — 音乐序列数据
 *
 * 来源: Bank 15 ROM offset $800D+ (每个 BGM 一条完整音序)
 *       以及 Bank 0D/0E/0F (跨 Bank 音序片段)
 *
 * 格式: BGM_ID → { notes: [freq, dur][], loop: boolean }
 *   freq: 0=静音, 1-255=音符频率索引 (查 Bank12 频率表)
 *   dur: 0=持续到下一个音符, 1-255=持续帧数
 */
export const bgmData = new Map<number, { notes: [number, number][]; loop: boolean }>();

// ── BGM 0x31: TECMO Theater开场 — Bank15 $800D ──
bgmData.set(0x31, {
  notes: [
    // 旋律: Bank15 ROM offset $800D+
    // 注: 完整音序需从ROM提取，此处为骨架
    [0x40, 4], [0x45, 4], [0x48, 4], [0x4A, 4],
    [0x48, 2], [0x45, 2], [0x40, 8],
  ],
  loop: true,
});

// ── BGM 0x32: 标题画面 — Bank15 $8400+ ──
bgmData.set(0x32, {
  notes: [
    // TODO: 从 Bank15 ROM 提取标题画面BGM音序
    [0x3C, 4], [0x40, 4], [0x3C, 4], [0x3E, 4],
  ],
  loop: true,
});

// ── BGM 0x33: 赛前会议 — Bank15 $8700+ ──
bgmData.set(0x33, {
  notes: [
    // TODO: 从 ROM 提取
  ],
  loop: true,
});

// ── BGM 0x34: 比赛BGM — Bank15 $8A00+ ──
bgmData.set(0x34, {
  notes: [
    // TODO: 比赛BGM音序 — 从 Bank15 + Bank0D/0E/0F 提取
  ],
  loop: true,
});

// ── BGM 0x35: 赛后/结果 — Bank15 $8E00+ ──
bgmData.set(0x35, {
  notes: [
    // TODO: 从 ROM 提取
  ],
  loop: false,
});
