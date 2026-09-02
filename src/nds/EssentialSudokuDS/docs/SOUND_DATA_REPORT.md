# SDAT Sound Data Format (SOUND-V0.1)

> Essential Sudoku DS MaxMod SDAT 音频容器解码结论.
> 来源: `rom-data/extracted/sdat/sound_data.sdat` (133.75 KB), FAT 起始 offset `0x40C`.
> 解码器: `scripts/extract_sdat.py` / `scripts/analyze_sound_data.py` / `scripts/swav_to_wav.py`
> 参考: GBATEK (problemkaputt.de) DSSEQ/SSAR/SBNK/SWAR/DSWAV 章节 (work/gbatek_*.txt)

## 1. 概要

| 字段 | 值 |
| --- | --- |
| 容器 | MaxMod SDAT (不是 Imagineer NBM) |
| 文件数 | 14 (9 SSEQ + 1 SSAR + 2 SBNK + 2 SWAR) |
| 字符串表 | `_BGM / BANK_SE / WAVE_BGM / WAVE_SE / PLAYER_BGM / PLAYER_SE / GROUP_STATIC` |
| BGM | 9 个 SSEQ (00-08) |
| SE | SSAR 09 含 30 条 SE 序列记录 |
| 乐器库 | 10_sbnk (122 instruments) + 11_sbnk (30 instruments) |
| 波形 | 12_swar (28 samples) + 13_swar (17 samples) = 45 个 DSWAV block |

## 2. SSEQ (BGM 序列)

Header 标准 MaxMod: `magic(4) + bom(2) + version(2) + fsize(4) + hsize(2) + nblk(2)`.

音轨表由 `0x93 TRACK` 引导, 每个 entry `{track_no(1) + rel_off(3 LE)}`, 绝对地址 = `0x1C + rel`.

| 文件 | 音轨 | track0 | 事件量级 (NOTE/REST) |
| --- | --- | --- | --- |
| 00_sseq | 1-6 | 0x3D | 514/301 |
| 01_sseq | 1-6 | 0x3D | 499/339 |
| 02_sseq | 1-6 | 0x3D | 610/390 |
| 03_sseq | 1-10 | 0x51 | 884/960 (10 轨, PITCHBEND 372) |
| 04_sseq | 1-3, 9 | 0x33 | 118/71 (短 jingle) |
| 05_sseq | 3, 9 | 0x29 | 49/76 |
| 06_sseq | 2, 3, 9 | 0x2E | 80/53 |
| 07_sseq | 1-3, 9 | 0x33 | 60/42 |
| 08_sseq | 1-3 | 0x2E | 107/79 |

事件统计确认命令表 (GBATEK): `NOTE(<0x80) / 0x80 REST(VLQ) / 0x81 INSTRUMENT(VLQ) / 0x93 TRACK /
0x94 JUMP / 0x95 CALL / 0xC0 PAN / 0xC1 VOLUME / 0xC5 PITCHBEND / 0xC8 TIE / 0xCA MOD_DEPTH /
0xD5 EXPRESSION / 0xE1 TEMPO / 0xFF EOT`. MIDI VLQ 时值 (0x80 bit 续位) 已实现.

## 3. SSAR (SE 序列存档) — 已修正

`09_ssar.bin`: DATA sub-block `+0x18 nDataOffset(u32) +0x1C nRecords(u32)`.

**每记录 12 字节** (GBATEK, 非 16 字节):
`nOffset(u32) + bnk(u16) + vol(u8) + cpr(u8) + ppr(u8) + ply(u8) + reserved(u16)`
绝对地址 = `nDataOffset + nOffset`.

验证结果 (30 条):
- `nDataOffset = 0x188 (392)`, `nRecords = 30`
- 全部记录 `bank=1, vol=127, cpr=84, ppr=64, ply=1, reserved=0`
- `nOffset = 0..174 步长 6` → abs_offset 392..566, 每条内嵌 6 字节递增序列
  (模式 `81 xx 3c 7f 00 ff`, xx 逐条 +1) — 30 个单音/短音 SE 音效

## 4. SBNK (乐器库)

`+0x38 ninstr(u32)`, instrument records 从 `+0x3C` 每 4 字节:
`{ftype(u8) + reserved(u8) + noff(u16)}`.

- `10_sbnk`: 122 instruments, 前 16 个 ftype=1 (直接单定义), 后续含 ftype=0 (空)
- `11_sbnk`: 30 instruments (SE 用库, 与 SSAR bank=1 对应)

Note 定义 (ftype!=0, 每 def 10 字节):
`swav(u16) + swar_bank(u16) + note(u8) + atk(u8) + dec(u8) + sus(u8) + rel(u8) + pan(u8)`

链接 (SSEQ→SBNK→SWAR):
- 00_sseq instruments = [1,6,12,13,14,64,112,120,121] (跨库引用)
- 10_sbnk 使用 sample ids = [0,1,10,11,12,15,16,21,22,27] → swar bank 0 (12_swar)
- 11_sbnk 30 个 instrument 全部 sample 0 → swar bank 0

## 5. SWAR / DSWAV block — 已修正

SWAR: `+0x38 nsamples(u32)`, offset 表从 `+0x3C` 每 4 字节.

**每 DSWAV block header 12 字节** (非 16 字节 `<IIII`):
`waveType(u8) + loopFlag(u8) + sampleRate(u16) + time(u16) + loopOffset(u16) + loopLength(u32)`
数据从 `+0x0C` 起.

| 文件 | blocks | 全部 waveType | 采样率分布 |
| --- | --- | --- | --- |
| 12_swar | 28 | 2 (IMA-ADPCM) | 11025/11047/12600/16027/18106/22050/32000/24000/22000 |
| 13_swar | 17 | 2 (IMA-ADPCM) | 11025 (全部) |

waveType 0=PCM8, 1=PCM16, 2=IMA-ADPCM, 3=PSG(无数据).

## 6. ADPCM 解码 + WAV 导出闭环

IMA-ADPCM 数据区: `predictor(s16) + stepIndex(u8) + reserved(u8) + 4-bit nibbles` (低 nibble 先).

`scripts/swav_to_wav.py`:
- 标准 89 级 step table + `[-1,-1,-1,-1,2,4,6,8]` index table
- 45 个 block 全部解码成功 → `work/wav/12_swar_bNN.wav` / `13_swar_bNN.wav`
- 输出: mono 16-bit PCM, 每 block 自身 sampleRate, 时长 0.04s - 1.10s
- 样本数/波形合理 (解码器已用 min/max 与包络验证)

## 7. 已知陷阱 (记录避免重犯)

1. SSAR 记录 16B → 12B: 旧 `analyze_sound_data.py` 用 `<III` 解析出错误 size/bank,
   实际记录只有 nOffset/bnk/vol/cpr/ppr/ply/rsv
2. SWAR block header 16B → 12B: 旧解析 `<IIII` 把 data 起点算错; 且 `struct` 格式串
   误写 `<BBIHHI` (B,B,**I**,H,H,I = 14B) 会把 sampleRate u16 + time u16 合并读成
   ~99.5M 垃圾采样率 → 正确 `<BBHHHI` (12B)
3. sampleRate 是 u16 不是 u32, 游戏样本多数 11025 Hz (并非 44.1K)
4. SSAR `nRecords` 在 `+0x1C` 是 u32 (不是 u16)

## 8. 后续 (SOUND-V0.2+)

- SSEQ 完整 disasm 到可播放事件流 (CALL/JUMP 目标展开 + loop)
- SBNK→SWAR 全链接表导出 (JSON) 供渲染器选音
- 按 SSEQ 乐器 id + SBNK 映射试听 BGM 还原
- INFO block 自定义解析 (当前 64 个 block table entries 非标准 MaxMod, 需按 symbol 表重建)
