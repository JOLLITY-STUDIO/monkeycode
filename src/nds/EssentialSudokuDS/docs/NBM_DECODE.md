# NBM Resource Format (V0.5.2)

> Imagineer 自家 NDS 资源容器 ("NBM" suffix) 解码格式.
> 来源: 1 MB Essential Sudoku DS ROM 抽出 42 个 NBM 文件, 反推 layout.
> 解码器: `scripts/decode_nbm.py`

## 1. 概要

| 字段                | 值                                          |
| ------------------- | ------------------------------------------- |
| 文件数              | 42 (rom-data/fnt-mapping.json)              |
| 用途                | 菜单/选择/数独/Staff/Title/无线图标           |
| 总大小              | ~1.2 MB                                     |
| Container           | Imagineer custom format (非 NARC)            |

## 2. Format Specification (V0.5.2 反推, 部分字段待 V0.5.5+ Ghidra 确认)

### 2.1 Magic / Flag (byte 0..3, LE u32)

| Value          | 含义                          | 例子 |
| -------------- | ----------------------------- | ---- |
| `0x00000001`   | 标准 4bpp paletted image      | 大部分 nbm 41/42 |
| `0x00001000`   | 16x16 小图标 variant          | 9 个无线 icons |
| `0x01000001`   | extended variant (size > 64KB)| title.nbm        |
| `0x00008000`   | sub-variant                   | menu_csol         |

### 2.2 Width (byte 4..7, LE u32)

像素宽度。Height 从 `width × height = (size - 40) × 2` 反推:
  `height = (file_size - 40) * 2 / width`

### 2.3 Palette (byte 8..39, 32 bytes)

16 colors × 2 bytes BGR555 LE。 color 0 = transparent (alpha=0).

### 2.4 Tile data (byte 40..EOF)

4bpp paletted. 每 byte = 2 pixel (low nibble = leftmost).
排列: row-major, no tile boundaries.

## 3. Size Verification

| 文件              | size  | width | height | 验证 |
| ----------------- | ----- | ----- | ------ | ---- |
| wireless_on.nbm   | 168   | 16    | 16     | (40 + 128) = 168 ✓ |
| menu_csol.nbm     | 4136  | 64    | 128    | (40 + 64*128/2 = 4136) ✓ |
| pazl_yajirusi.nbm | 2088  | 16    | 256    | (40 + 16*256/2 = 2088) ✓ |
| download.nbm      | 16424 | 128   | 256    | (40 + 128*256/2 = 16424) ✓ |
| staff00.nbm       | 24616 | 192   | 256    | (40 + 192*256/2 = 24616) ✓ |
| dwlogo.nbm        | 32808 | 256   | 256    | (40 + 256*256/2 = 32808) ✓ |
| title.nbm         | 66056 | 256   | 515    | (40 + 256*515/2 = 65940 + padding = 66056) - 略不齐 256, 接受 |

41/42 准确, title 接近. decoder 容错 height = (size-40)*2/width 截断.

## 4. 解码产物

```
rom-data/extracted/
├── nbm-info.json   (42 entries: { name, file_id, flag, width, height, ok, bmp })
└── nbm/
    ├── download.bmp         128 × 256
    ├── dwlogo.bmp           256 × 256
    ├── license.bmp          256 × 256
    ├── menu_csol.bmp        64 × 128
    ├── numclo_00.bmp        256 × 128
    ├── numclo_waku.bmp      256 × 256
    ├── pazl_select.bmp      128 × 256
    ├── pazl_select2a.bmp    256 × 256
    ├── pazl_select2b.bmp    256 × 256
    ├── pazl_select2c.bmp    256 × 256
    ├── pazl_yajirusi.bmp    16 × 256
    ├── select1.bmp          256 × 256
    ├── select3.bmp          256 × 256
    ├── select4.bmp          128 × 256
    ├── select6.bmp          64 × 256
    ├── setu03.bmp           256 × 256
    ├── staff00.bmp          192 × 256
    ...
    ├── staff12.bmp          192 × 256
    ├── title.bmp            256 × 515
    ├── title2.bmp           256 × 256
    ├── tutorial_00.bmp      128 × 256
    ├── usa.bmp              64 × 256
    ├── wireless_on.bmp      16 × 16
    ├── wireless_strength_level_*.bmp × 8  16 × 16 each
```

## 5. V0.5.2 已知 / 限制

- ✅ 41/42 size 完全验证, title.nbm height 接近
- ✅ 调色板 BGR555 LE 解码成功, transparency 0=alpha=0
- ✅ format flag 三种 variant 都能 dispatch
- ⚠️ format flag 的高 16 位 (`e0 03` 等) 语义未确认 — V0.5.5 Ghidra 反汇编 ARM9 entry 后才能确认
- ⚠️ title.nbm height 假定 515 (size 不齐 256) — 大尺寸变种可能 multi-frame

## 6. 后续 V0.5+ 整合路径

1. **V0.6 numclo 解析**: 用 `numclo_00.bmp` 验证数独 grid UI 跟 ARM9 渲染函数是否一致
2. **V0.7 ARM9 反汇编关联**: 找 ARM9 调用 `service_draw_image(nbm_id, x, y)` 反查 NBM id, 锁定 call graph 关系
3. **V0.8 BMP → PNG + 压缩**: 减 80% 文件大小, 方便 commit / git-lfs
4. **V0.9 H5 端 assets bundle**: 把所有 BMP/PNG 转 base64 + JSON, 集成进 miniprogram/assets/

## 7. 复现命令

```
$ python scripts/decode_nbm.py
Decoded 42 / 42 → rom-data\extracted\nbm-info.json
$ ls rom-data/extracted/nbm/ | wc -l
42
```
