# 6502 → C → JS 编译管线

将 NES ROM + CDL 文件编译为独立 JS 模块，在浏览器/Node.js 中运行 6502 模拟。

## 概览

```
[ROM.nes + .cdl]  →  [scripts/_tmp_bzk_disasm.mjs]  →  _full_disasm.asm
     →  [scripts/asm2c.mjs]  →  prg_bank_XX.c (×48)
     →  [_merge_banks.mjs]  →  _merged_all.c
     →  [emcc]  →  core.js (最终产物)
```

## 文件结构

```
tools/6502-to-js-test/            ← 本目录: 所有管线文件都在这里
├── 6502.h                        # 6502 指令宏定义 (C 头文件)
├── 6502_nes.h                    # NES 扩展指令 (ROL/ROR/RTI)
├── _merge_banks.mjs              # 阶段3: 多 bank C 合并为单一 C
├── main.c / main.js / main.html  # 浏览器端演示 (贪吃蛇)
├── snake_asm.c / snake_raw.txt   # 测试用例 (贪吃蛇)
├── README.md                     # ← 本文件
└── _prg_output/
    ├── prg_bank_XX.c             # 阶段2产物: 各 bank C 代码 (48 个)
    ├── _merged_all.c             # 阶段3产物: 合并后单一 C 文件 (681KB)
    ├── runner_3bank.c            # 阶段4入口: Emscripten 编译目标
    └── core.js                   # 阶段4产物: 最终 JS 模块 (126KB)

scripts/                          ← 反汇编脚本 (项目根 scripts/ 目录)
├── _tmp_bzk_disasm.mjs           # 阶段1: ROM + CDL → BZK 反汇编
└── asm2c.mjs                     # 阶段2: BZK 反汇编 → C 代码
```

## 完整构建流程

> 所有命令从项目根目录 `src/nes/tsubasa/` 运行。

### 前置条件

- Node.js (≥18)
- Python 3 (Emscripten 依赖)
- Emscripten SDK: `tools/emsdk/` (已安装)

### 阶段 0: 验证 emcc

```bash
tools\emsdk\upstream\emscripten\emcc.py --version
```

### 阶段 1: CDL 反汇编

**输入**: ROM 文件 + CDL 文件
**输出**: `_tmp_bzk_out/_full_disasm.asm`

```bash
node scripts/_tmp_bzk_disasm.mjs
```

**修改 CDL 路径**: 编辑 `scripts/_tmp_bzk_disasm.mjs` 开头三行:

```js
const ROM_PATH = 'src/nes/tsubasa/src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan).nes';
const CDL_PATH = 'src/nes/tsubasa/src/legacy/romdata/你的cdl文件名.cdl';  // ← 改这里
const OUT_DIR   = 'src/nes/tsubasa/_tmp_bzk_out';                       // ← 输出目录
```

> 当前有两套 CDL:
> - **全量**: `prg-not-logged-15.13.cdl` → `_tmp_bzk_out/` (15 个 bank 有代码)
> - **开场**: `-openning.cdl` → `_tmp_bzk_out_openning/` (仅开场场景)

| 产物 | 说明 |
|------|------|
| `_full_disasm.asm` | 所有 bank 合并的反汇编 (约 24 万行) |
| `bank_XX.asm` | 每个 bank 独立文件 |
| `_ram_usage.inc` | RAM 地址交叉引用 |
| `_stats.txt` | 每个 bank code/data 统计 |

### 阶段 2: ASM → C 转译

**输入**: `_tmp_bzk_out/_full_disasm.asm`
**输出**: `tools/6502-to-js-test/_prg_output/prg_bank_XX.c`

```bash
node scripts/asm2c.mjs
```

> 默认输入 `_tmp_bzk_out/_full_disasm.asm`，可通过参数覆盖:
> ```bash
> node scripts/asm2c.mjs _tmp_bzk_out_openning/_full_disasm.asm
> ```

产物: `tools/6502-to-js-test/_prg_output/prg_bank_XX.c` (48 个 MMC3 bank)

每条 6502 指令翻译为 C 宏: `L_8000: LDA_ZP(0x27)`

### 阶段 3: 多 Bank 合并

**输入**: `_prg_output/prg_bank_XX.c` (15 个选定 bank)
**输出**: `_prg_output/_merged_all.c`

```bash
node tools/6502-to-js-test/_merge_banks.mjs
```

做的事:
1. 标签加 bank 前缀: `L_8000` → `B0_8000`
2. 跨 bank JSR/JMP 展开为 inline `goto`
3. 分支 (BEQ/BNE/...) 展开
4. 合并全部 `RET_BEGIN/RET_END` 返回表
5. 缺失跳转目标自动生成 stub

合并哪些 bank: 编辑 `_merge_banks.mjs` 的 `bankFiles` 数组。

### 阶段 4: Emscripten 编译为 JS

**输入**: `_prg_output/_merged_all.c` + `runner_3bank.c`
**输出**: `_prg_output/core.js`

```bash
cd tools\6502-to-js-test\_prg_output

python ..\..\emsdk\upstream\emscripten\emcc.py \
  -I.. -O2 -s WASM=0 --no-entry \
  -s EXPORTED_FUNCTIONS="['_update_frame','_load','_store']" \
  -s EXPORTED_RUNTIME_METHODS="['ccall','getValue','setValue','HEAPU8']" \
  -o core.js runner_3bank.c
```

编译参数:

| 参数 | 含义 |
|------|------|
| `-I..` | 包含 `6502.h` / `6502_nes.h` 所在目录 |
| `-O2` | 优化级别 |
| `-s WASM=0` | 输出 asm.js (非 WebAssembly) |
| `--no-entry` | 无 `main()` 入口 |
| `-s EXPORTED_FUNCTIONS` | 导出给 JS 调用的 C 函数 |
| `-s EXPORTED_RUNTIME_METHODS` | 导出 JS 辅助方法 |

## 最终产物 `core.js` 使用

### Node.js

```js
const Module = {
  noExitRuntime: true,
  onRuntimeInitialized() {
    Module._update_frame();                    // 执行一帧 (50000 cycles)

    for (let i = 0; i < 0x800; i++) {         // 读取 NES 内存
      console.log(`$0${i.toString(16)}: ${Module.HEAPU8[i]}`);
    }
  }
};
require('./core.js');
```

### 浏览器

```html
<script src="core.js"></script>
<script>
Module.onRuntimeInitialized = function() {
  Module.ccall('update_frame');
};
</script>
```

### 导出函数

| 函数 | 说明 |
|------|------|
| `_update_frame()` | 执行一帧逻辑 (50000 CPU cycles) |
| `_load(addr)` | 读取内存字节 |
| `_store(addr, val)` | 写入内存字节 |

> `_update_frame` 通过 `CYCLE(n)` 消耗周期，`CHECK_CYCLE()` 在 50000 周期后跳出到 `LABEL_END`。跨 bank 跳转也从此退出，需 JS 侧处理 bank 切换。

## 更新 CDL 后的操作流程

```bash
# === 在项目根目录 src/nes/tsubasa/ 执行 ===

# 1. 把新 .cdl 文件放到 src/legacy/romdata/

# 2. 修改 scripts/_tmp_bzk_disasm.mjs 的 CDL_PATH 指向新文件

# 3. 反汇编
node scripts/_tmp_bzk_disasm.mjs

# 4. C 转译
node scripts/asm2c.mjs

# 5. 合并 bank
node tools/6502-to-js-test/_merge_banks.mjs

# 6. 编译 JS
cd tools\6502-to-js-test\_prg_output
python ..\..\emsdk\upstream\emscripten\emcc.py -I.. -O2 -s WASM=0 --no-entry -s EXPORTED_FUNCTIONS="['_update_frame','_load','_store']" -s EXPORTED_RUNTIME_METHODS="['ccall','getValue','setValue','HEAPU8']" -o core.js runner_3bank.c

# 7. 验证
node -e "Module={noExitRuntime:true,onRuntimeInitialized:()=>console.log('OK')};require('./core.js')"
```

## 关键配置项

| 文件 | 行号 | 配置 | 说明 |
|------|------|------|------|
| `scripts/_tmp_bzk_disasm.mjs` | L7 | `CDL_PATH` | CDL 文件路径 |
| `scripts/_tmp_bzk_disasm.mjs` | L8 | `OUT_DIR` | 反汇编输出目录 |
| `scripts/asm2c.mjs` | L9 | `ASM_FILE` | 默认反汇编输入 |
| `_merge_banks.mjs` | L6-20 | `bankFiles` | 参与合并的 bank |
| `_prg_output/runner_3bank.c` | L22 | `MAX_CYCLES` | 每帧最大周期数 |

## `6502.h` 修复记录

emcc 编译时修复的 8 个原始 bug:

| 行号 | 问题 | 修复 |
|------|------|------|
| ~96 | `LDA_IDR_Y` / `LDA_IDR_X` | → `LDA_IDY` / `LDA_IDX` |
| ~83 | `STA_ABS_X` 少右括号 `)` | 补上 |
| ~340 | `LSR_M` / `LSR_ZP` 等调错宏 | → `_LSR_M` / `_ASL_M` / `_ASL_V` / `_LSR_V` |
| ~363 | `ASL_A(R)` 多余参数 | → `ASL_A()` |
| ~462 | 内联 `interpreter()` 函数 | 删除 |
| ~255 | `STX_ABS` / `STY_ABS` 缺失 | 补充定义 |
| ~258 | `SBC_IDX/Y` 调用 `_SBC` 未定义 | → `_SBC_VAL` |

`6502_nes.h` 开头必须 `#include "6502.h"`，`runner_3bank.c` 开头必须 `#include "6502_nes.h"`。
