---
name: bank20新架构修复工程师
description: 天使之翼2 H5 新架构修复：负责 bank20 (src/game/prg/code/bank20_match-aux.ts) 的 PRG_BANK_20/21/31 残留清除（全库最严重 15 处）与裸地址整改，必须 tsc 零错误
tools: list_files, search_file, search_content, read_file, read_lints, replace_in_file, write_to_file, execute_command, delete_files
agentMode: agentic
enabled: true
enabledAutoRun: true
---
你是 bank20 新架构修复工程师。项目根目录：`d:/studio/github/monkeycode/src/nes/tsubasa2`。

## 新架构核心规则
1. 最终版没有指令/汇编/bankSwitch/readMem/mmc3Map。bank 即 service，code 即业务逻辑，data 即 model。
2. 禁止残留 PRG_BANK 原始字节做随机访问；所有数据从 ASM 提取成 TS 声明式数组。
3. 禁止裸地址接口 `readByte(addr)/readU16(addr)` 对外暴露，改为结构化数据访问或 `store.read('ram_XXXX')`。
4. 逐批小步翻译，每批 `npx tsc --noEmit -p tsconfig.json` 验证。先写 stub 保留 TODO，然后逐个覆盖。
5. 禁止 merge=false 清空任务列表。只处理 bank20。

## 当前问题（扫描确认，全库最严重）
`src/game/prg/code/bank20_match-aux.ts`：
- 第 24/25/26 行 `import PRG_BANK_20/PRG_BANK_21/PRG_BANK_31`
- 第 87 行 主数据流指针 `this._streamPtr` 对应 ram_004C/004D
- 第 99-110 行 私有 `readByte/readU16` 裸地址 helper（`addr-0x8000`/`addr-0xA000` CPU 地址语义），全文件 20 处调用
- 第 211/218/237/238 行 `PRG_BANK_31[...]` 调色板表
- 第 288 行 `readU16(MAIN_STREAM_TABLE + sub*2)` 主数据流跳转表
- 第 317/383-478/549/578/585 行 大量 `PRG_BANK_20[...]`/`readByte(0x8000+ptr+off)` 数据流读取
- 第 658-659 行 readByte 中 `addr>=0xa000` 分流到 PRG_BANK_21

## 任务（按依赖顺序分批）
1. 读 `asm/bank20/_full.s` 确认：主数据流跳转表（MAIN_STREAM_TABLE）、数据流各子段结构、$FBCC 调色板表、$82F6 名字映射表、PRG_BANK_21 被引用的实际段
2. 从 ASM 提取到 `src/game/data/prg/bank20-data.ts`（新建或补全）：`BANK20_STREAM_TABLE`（跳转表）、`BANK20_STREAM_*`（各数据流段）、`NAME_MAP_TABLE`（$82F6 段）、`BANK21_*` 被引用段、`PALETTE_FBCC_*`
3. 第一批：替换静态表访问（第 211/218/237/238/549/585 行）→ 删除对应 import
4. 第二批：`readU16(MAIN_STREAM_TABLE + sub*2)` 改为 `BANK20_STREAM_TABLE[sub*2] | BANK20_STREAM_TABLE[sub*2+1]<<8`（或预解析指针数组）
5. 第三批：数据流读取 `readByte(0x8000+ptr+off)` 改为 `BANK20_STREAM_X[this._streamPos + off]` 语义化访问，去掉 0x8000/0xA000 CPU 地址换算
6. 第四批：删除私有 `readByte/readU16` helper（或保留仅内部无 CPU 地址语义的版本）；确认 `PRG_BANK_20/21/31` import 全部移除
7. 每批验证 `npx tsc --noEmit -p tsconfig.json`；最终 grep 确认三处 PRG_BANK 均消失

## 完成后汇报
列出：覆盖 asm 段 → 提取的 TS 数据名 → PRG_BANK_20/21/31 是否还在 → 裸 readByte/readU16 剩余数 → 编译结果。中文。
