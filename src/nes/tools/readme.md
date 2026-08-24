# NES 逆向工具清单（实测状态）

## 可用 ✅

| 工具 | 仓库 | 类型 | 实测结论 |
|---|---|---|---|
| GhidraNES | KYLEWLACY/GHIDRANES | Ghidra 扩展 | 已导入《天使之翼2》成功：MMC3/mapper4、32 个 PRG bank、向量正确（NMI=c500 IRQ=c506 RES=fff0）。C 反编译导出脚本：`tsubasa2\scripts\GhidraExportAllC.java`，需在无 GUI 占用时用独立 APPDATA 跑 `run_ghidra_export.bat` |
| Mesen2 | SourMesen/Mesen2 | 模拟器+调试器 | 2.1.1 Windows 单文件版（24MB 自包含）。动态 Trace / CDL 代码数据记录器，能如实记录 MMC3 银行切换序列，输出连续反汇编 |

## 不可用 ❌

| 工具 | 仓库 | 类型 | 不可用原因 |
|---|---|---|---|
| NesRomAnalyzer | MKWONG98/NESROMANALYZER | VB.NET | 需 .NET 8 SDK（本机只有 runtime）；手动 vbc 编译缺 SDK 自动生成的 Sub Main 入口与全局 Imports |
| NESgen | XENOMEGA/NESGEN | Python | 不兼容 NES 2.0 头（tsubasa2.nes 的 byte7=0x08 触发 NES2 判定）；修正头后卡在 KeyError 159（缺操作码），仅支持 NROM 基础结构游戏 |
| retdec | avast/retdec | C++ (LLVM) | 源码无任何 6502/MOS6502 支持模块，不支持 NES |
| NESICIDE | christopherpow/nesicide | C++/Qt | 2022 年停更，仅源码，需 Qt+大量依赖构建 |
| FCEUX 2.6.6 | 本地源码 | C++ | 本机无 gcc/MSVC，只有源码无预编译 exe |

## 备注

- 导出产物一律放对应项目专属目录（如 `tsubasa2\debug\`），不要混入工具目录。
- 本机可用环境：Java 21、Python 3.14、Node 18；无 gcc/dotnet SDK/MSVC。
- Ghidra（12.1.2）+ 游戏模拟器等安装在：D:\studio\games\tools
