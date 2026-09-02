# SDAT Sound Data Format (SOUND-V0.1 + SOUND-V0.2)

> Essential Sudoku DS MaxMod SDAT 音频容器解码结论.
> 来源: `rom-data/extracted/sdat/sound_data.sdat` (133.75 KB), FAT 起始 offset `0x40C`.
> 解码器: `scripts/extract_sdat.py` / `scripts/analyze_sound_data.py` / `scripts/swav_to_wav.py`
>          + SOUND-V0.2: `scripts/sdat_common.py` / `sseq_playable.py` / `snd_linkage.py` / `parse_sdat_symbols.py`
> 参考: GBATEK (problemkaputt.de) DSSEQ/SSAR/SBNK/SWAR/DSWAV 章节 (work/gbatek_*.txt)
> SOUND-V0.2 产物: `rom-data/sound/sseq-playable.json` / `snd-linkage.json` / `sdat-symbols.json`

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

## 8. SSEQ 可播放事件流 (SOUND-V0.2)

`scripts/sseq_playable.py` (`TrackRenderer`/`decode_cmd` 线性渲染器) 把 9 首 SSEQ 全部
按 track 渲染成**线性可播放事件流** (tempo/tick/ms 全程推进), 输出
`rom-data/sound/sseq-playable.json`:

- 每条 track 从 track pointer (绝对地址 = `nDataOffset + rel24`) 起逐字节解码:
  - `NOTE(<0x80) key/vel/dur` / `0x80 REST` / `0x81 INSTRUMENT` → 事件, tick 推进
  - `0xC0 PAN / 0xC1 VOLUME / 0xC5 PITCHBEND / 0xCA MOD_DEPTH / 0xD5 EXPRESSION / 0xE1 TEMPO`
    等控制码 → 记录当前状态 (每个后续 NOTE 快照完整上下文)
- **CALL 展开**: `0x95 CALL rel24` 目标 = `nDataOffset + rel24`, subroutine 事件**内联**到
  当前 track (tempo/tick 继续推进), 渲染结果与原始字节流一致 (抽样逐字节模拟验证)
- **JUMP 语义**: `0x94 JUMP` 若目标是向后跳 (BGM 主循环段) → 记 `loop: {backTo}` 并结束该
  track 渲染 (段本身即反复循环); 全部 9 文件所有 track 都收敛到 EOT, 无 stale/unknown
- 抽样: SEQ_01 t0 起于 offset 0x3d, 首事件 PAN→EXPRESSION→MOD_DEPTH→NOTE key50 dur12…
  SEQ_12 t9 是 8 事件的 mini track (mono/instrument 120/rest-nothing → 0 tick)

## 9. SBNK→SWAR 全链接表 (SOUND-V0.2)

`scripts/snd_linkage.py` 枚举每首 SSEQ 实际使用的 instrument (从 track 0 起线性扫
`0x81 INSTRUMENT` VLQ 事件, 收集 program id), 经 INFO 的 BANK entry 链
(`BANK entry → 4×SWAR index → SWAR file → sample`) 解析每个 program def 的完整 sample 字典
(`rate/loop/waveType/loopOffset/loopLength/dataSize`), 输出 `rom-data/sound/snd-linkage.json`:

- SSEQ→SBNK 由 INFO SEQ entry 的 `bnk(u16)` 字段给出; SBNK def 内的 `swar` 引用字段
  实际上**恒为 0**, 真正的 SWAR 选择来自 INFO BANK entry 的 4-SWAR array:
  - `BANK_BGM (10_sbnk)` → swars `[0, FFFF, FFFF, FFFF]` → SWAR index 0 = `WAVE_BGM (12_swar)`
  - `BANK_SE (11_sbnk)` → swars `[1, ...]` → SWAR index 1 = `WAVE_SE (13_swar)`
- SBNK def 3 形态全覆盖: ftype<16 单个 10B def / ftype=16 range / ftype=17 regional
  (多组 sample, 每组 12B 含区域边界)
- 抽样验证: SEQ_01 uses prog 1/12/13/14/120/121 → WAVE_BGM samples
  [5,18,17,26,16,0,1,10,11,12,15,21,22,27], 映射一致

## 10. INFO/SYMB Symbol 表重建 (SOUND-V0.2)

`scripts/parse_sdat_symbols.py` (基于 `scripts/sdat_common.py` 共享模块) 输出
`rom-data/sound/sdat-symbols.json`:

- **INFO block 真实结构**: 头部 + **8 个 list offsets** (SEQ/SSAR/BANK/SWAR/Player/Group/
  Player2/STRM), 非旧解析假设的 `magic/size/count + 4 sub-block`. 计数实测:
  SEQ=9 / SSAR=1 / BANK=2 / SWAR=2 / Player=2 / Group=1 / Player2=0 / STRM=0
- **INFO entry 尺寸** (GBATEK): SEQ 12B `fatID(u16)+unk(u16)+bnk(u16)+vol(u8)+cpr(u8)+
  ppr(u8)+ply(u8)+rsv(u16)`; BANK 12B `fatID+unk+4×SWAR u16`; SWAR 2B fatID.
  SEQ entries fatID 0-8, bnk=0, vol=94/64/…; BANK[0]=fat10 swars[0,FFFF];
  BANK[1]=fat11 swars[1,…]; SWAR[0]=fat12(WAVE_BGM) / SWAR[1]=fat13(WAVE_SE)
- **SYMB lists**: file list = `count + N×4 string offset`; SSAR 是 folder list
  (`(nameOff, seqListOff)` pair → 子 SSEQ 文件列表, 30 个 SE 名: botan…search).
  重建后: SEQ names `SEQ_01..04, SEQ_10, SEQ_12..15`; BANK `BANK_BGM/BANK_SE`;
  SWAR `WAVE_BGM/WAVE_SE`; Player `PLAYER_BGM/PLAYER_SE`; SSAR folder `SEQ_SE`
- 14 个 FAT 文件 (9 SSEQ + SSAR + 2 SBNK + 2 SWAR) 全部在表, symbol name 与 FAT id 完整匹配

## 11. 已知陷阱 (SOUND-V0.2 追加)

5. INFO block 没有 `magic/size/count + 4 sub-block offsets`, 就是 8 个 list offsets
   (`sdat_common.info_lists()` 为 ground truth, 弃用 `_dump_sdat_info.py` 的旧解析)
6. SBNK def 里 `swar` 引用字段恒 0, SWAR 选择来自 INFO BANK entry 的 4-SWAR array
7. `0x93 TRACK` 前可能有 `0xFE mask + 3B`, 且 track pointer 的绝对地址 = `nDataOffset + rel`
   (不是文件头 + rel)
8. VLQ 只实现 2-byte 形式 (`b&0x80` → `((b&0x7F)<<8)|next`), 本项目 SSEQ 实测无 3-byte
   VLQ 事件

## 12. 软件渲染闭环 → 可听 BGM WAV (SOUND-V0.3)

`scripts/sseq_render.py` 纯 Python 软件合成器, 把 SOUND-V0.2 两条产物真正播出来:

- 输入: `sseq-playable.json` (事件流) + `snd-linkage.json` (instrument/sample 链) +
  `12_swar`/`13_swar` 原始 ADPCM (解码复用 `swav_to_wav.decode_block`)
- 渲染模型 (verification-grade):
  - 每条 track 维护 tempo/volume/expression/instrument 状态, NOTE 事件落到绝对 ms
    时间线 (event.ms 已含 per-track tempo 换算); CALL 内联/JUMP 语义由 playable 流保证
  - 每个 NOTE = 一个 voice: 取该 program 的 def 中 root note 最近的 def,
    `step = sampleRate/OUT_RATE * 2^((key-root)/12)` 重采样, loopFlag 时在
    `[loopOffset, loopOffset+loopLength)` 内循环 (attack 段只播一次), 简单
    attack/sustain/release 门控, pan 未建模
  - mono 16-bit @ 22050 Hz, peak normalize 0.9 + 首尾静音裁剪, 单遍 body 上限 60s
- 产物: `work/wav/bgm/*.wav` (gitignore, 可再生成) — 9 首全部成功:
  SEQ_01 60.4s / SEQ_02 60.2s / SEQ_03 60.4s / SEQ_04 60.1s / SEQ_10 18.5s /
  SEQ_12 6.0s / SEQ_13 7.7s / SEQ_14 12.7s / SEQ_15 31.9s
- 验证: 5763 NOTE 全渲染, RMS 0.12-0.20 / nonzero 75-98% (无静音/无削顶)

## 13. SSAR SE 渲染 + 空槽发现 (SOUND-V0.3)

`scripts/ssar_render.py`: 30 条 SSAR 记录每条 = 6 字节 mini-SEQ
`81 <prog> 3c 7f 00 ff` (INSTRUMENT prog + NOTE key60 vel127 dur0 + EOT),
bank 取记录头 bnk=1 → 11_sbnk, resolve def → WAVE_SE(13_swar) sample → WAV。

**关键发现 — 11_sbnk 实际只有 17 个有效 instrument** (swav 恰好 1:1 覆盖
13_swar 全部 17 samples, 无复用):
`prog→swav`: 0→1, 1→11, 2→16, 3→14, 4→3, 5→9, 6→5, 7→6, 8→0, 9→8,
11→7, 12→2, 13→4, 14→15, 15→13, 28→10, 29→12 (覆盖 swav 0..16 全集合)

prog 10 与 16-27 (13 个槽位) = ftype=0 空 instrument → 对应 SSAR 记录
(mojibatu/biyobiyo/teen/paieen/seikou/jump/kinzoku/expl/SE010-014 等) 无 def,
渲染 skip — 疑似 SE 预留槽位或未启用目录项, 真机行为需模拟器确认 (不猜)。

产物: `work/wav/se/00_botan.wav … 29_start.wav` (17 个有效 SE, 174-1087ms)。

## 14. 已知陷阱 (SOUND-V0.3 追加)

9. SSEQ NOTE dur 可为 0 (`7f 00` = vel 127, dur 0 tick): SSAR 全部记录如此.
   渲染按"播放 sample 一次到自然结束再 release"处理, 不能按 0 tick 静音处理
10. SBNK `ninstr` 槽位数 ≠ 有效 instrument 数: 11_sbnk 30 槽只有 17 个 ftype=1
    defs; 渲染器必须 defs 为空时 skip, 不可硬凑
11. 渲染输出 mono (未建模 pan), 采样率 22050 非 sample 原生 rate; 大 ratio 采样
    会降混叠, 属验证级品质, 不是 1:1 还原 (后续可加 pan/loop 段校准)
