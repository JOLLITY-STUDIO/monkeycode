// Bank 27 — 精灵/场景动画数据加载 + 动画帧推进 (Sprite & Scene Animation)
// 基于 bank_27.asm 反汇编 + ROM 二进制分析
//
// ═══════════════════════════════════════════════════════════════
// 0. 翻译状态: ✅ 已完整翻译 (2026-08)
//    H5 生产代码: tsubasa2-h5-src/src/game/bank27_minimal.service.ts
//    H5 数据层:   tsubasa2-h5-src/src/data/bank27-data.ts
//    差分验证:    _verify_bank27.cjs (7274 组 PASS, 含 OAM 逐字节比对)
// ═══════════════════════════════════════════════════════════════
//
// CPU 映射: bank 0x1B = 27, MMC3 R6 切到 $8000-$9FFF
//           代码经 $A000-$BFFF 窗口访问本 bank 表数据 (物理偏移 = cpuAddr - 0xA000)
// PRG offset: 0x036010-0x03800F
//
// 内容: 混合 bank — 2 段代码 (380B) + 大量精灵/场景动画数据表 (6KB+)
//   [code] $8103-$81DB (216B)  入口 entry_8104: 场景/精灵数据加载 (名字区 9 号槽输出)
//   [code] $81EB-$8291 (164B)  入口 entry_81EE: 动画帧推进 (OAM 影子缓冲构建)
//   [data] $A1DC               场景索引递减表 (15B)
//   [data] $A292               动画脚本指针表 (21 项×2B, 14 有效)
//   [data] $A42A               精灵动画块指针表 (30 项×2B)
//   [data] $A6AD               场景指针表 (4 项×2B)
//   [data] $AB65               场景数据指针表 (10 项×2B)
//
// ═══════════════════════════════════════════════════════════════
// 调色板位置 (SPR 调色板) — 精灵颜色来源
// ═══════════════════════════════════════════════════════════════
// 1. bank27 精灵选组: 动画块首字节 (OAM 属性 attr) 低 2 位 → SPR 组 0-3
//    对应 H5 OamManager.ts:226 `palette = slot.attr & 0x03`
//    实测 30 个动画块中: SPR0 (attr&3=0)、SPR1 (attr&3=1)、块 19/27/28/29 用 SPR3
// 2. 颜色值定义: game/bank00_core.service.ts PALETTE_TABLE_0D (32B, PPU $3F00-$3F1F)
//    $3F10-$3F1F = 精灵调色板 4 组 (SPR_OFFSETS = [0x10,0x14,0x18,0x1C])
// 3. 写入流程: paletteInit(0x0D) → palWriteAll(PALETTE_TABLE_0D) → paletteRAM
//    (data/pallete/paletteManager.ts, 对应 PPU $3F00-$3F1F)
//    调用点: game/bank02_scene.service.ts 场景完整初始化
// 4. 颜色换算: nesColorToRGBA + NES_PALETTE (data/pallete/nes-pallete-table.ts)
// 5. ⚠ ROM 真实链路 (待提取): bank00 $8297(paletteInit)→$9085→切 bank09
//    $A000+palIdx*2 指针表 → 数据流 + bank00 $978B 32B 模板。
//    当前 H5 PALETTE_TABLE_0D 为占位数据, 非 ROM 真实调色板。
const data = {
  bankId: 27,
  baseAddr: 0x36010,    // PRG offset (Bank 0x1B * 0x2000 + 0x10)
  bankAddrBase: 0x8000, // CPU 映射窗口 ($8000-$9FFF)

  stats: {
    totalLines: 0,
    codeBytes: 380,     // CDL C 标记: $8103-$81DB + $81EB-$8291
    dataBytes: 6070,    // CDL D 标记
    unaccessedBytes: 1742,
    subroutineCount: 2,
    dataTableCount: 5,
    note: "Bank 27 是混合 bank：2 段代码(380B) + 6KB+ 精灵/场景动画数据。入口 entry_8104 负责场景/精灵数据加载(名字区 9 号槽输出)，entry_81EE 负责动画帧推进(OAM 影子缓冲构建)。2026-08 已完整翻译并通过 7274 组差分验证。",
  },

  // ── 子程序函数列表 (H5 已翻译) ──
  subroutines: [
    {
      startBankAddr: "$8103",
      name: "entry_8104 — 场景/精灵数据加载",
      asmLine: 0,
      length: "216B ($8103-$81DB)",
      desc: "场景/精灵数据加载, 结果写入名字区 (ram_0034)+9。流程: (ram_0034)=$C50C(arg)名字区指针 → Y=ram_062A&$7F → arg≥$0B 时 Y=$A1DC 递减表[Y] → ram_003C/003D=Y*20 → ram_003E=(arg-1)*2+(ram_00E2 bit0), ram_00E2>>=1 → carry=(arg≥$0B)^(ram_05FB≠0) 选择 $A6AD/$AB65 表 → 读字节 → arg≥$0B 且字节≠$F0 时 $C536 坐标转换+取负 → 名字区[9]=结果 → ram_0032≥ram_00E2 时二次写入逻辑",
      note: "入口参数 A 寄存器 (0-0x0A, ≥$0B 时按减 $0B 处理+坐标转换)。H5: entry_8104(arg)",
    },
    {
      startBankAddr: "$81EB",
      name: "entry_81EE — 动画帧推进 (OAM 构建)",
      asmLine: 0,
      length: "164B ($81EB-$8291)",
      desc: "每帧调用一次, 推进动画脚本并构建 OAM 影子缓冲。状态: ram_05F4 0=停止(直接返回)/$80=重启(重载 ram_05F3 脚本)/正数=运行; ram_05F5 帧延迟计数器(>0 递减后返回)。脚本流(ram_0063/0064 指向 $A292 表脚本): 非$FF字节→帧延迟; 下一字节→$A42A 表索引*2→动画块指针; $A42A 块=[count,tileLo,tileHi,tile×count]...0终止, 逐组写 OAM; $FF→跳转(后 2B=新脚本指针, ram_05E3==0→停止并继续)。结束: OAM 置完成($80), 脚本指针+=2",
      note: "H5: entry_81EE()。关键分支: BPL $820C 测 bit7 — bit7 清(正数)=跳过初始化直接推进帧; bit7 置=运行初始化(重载脚本)。",
    },
  ],

  // ── 数据表清单 ──
  dataTables: [
    { name: '场景索引递减表', bankAddr: '$A1DC', length: '15B', desc: 'entry_8104 在 arg≥$0B 时按 ram_062A&0x7F 查表得到子记录索引 Y。索引 0-14 → 0x0E-0x00' },
    { name: '动画脚本指针表', bankAddr: '$A292', length: '21×2B (14 有效)', desc: 'entry_81EE 按 ram_05F3 索引, 指向本 bank $A000 窗口内的脚本流。每脚本为 [帧延迟, 块索引] 对序列, $FF 后跟 2B 新指针做循环跳转' },
    { name: '精灵动画块指针表', bankAddr: '$A42A', length: '30×2B', desc: 'entry_81EE 按脚本帧的块索引*2 定位, 指向动画帧块数据。块格式: [count, tileLo, tileHi, tile×count]... 0 终止; count 首字节低 2 位 = SPR 调色板组 (0-3)' },
    { name: '场景指针表', bankAddr: '$A6AD', length: '4×2B', desc: 'entry_8104 在 (carry clear) 分支按 ram_002C[X]*2 索引。配合 ram_003F=$25 使用' },
    { name: '场景数据指针表', bankAddr: '$AB65', length: '10×2B', desc: 'entry_8104 在 (carry set) 分支按 ram_002D[X]*2 + ram_002C[X]*6 索引。配合 ram_003F=$26 使用' },
  ],

  // ── 依赖关系 (H5 层已连接) ──
  deps: {
    dependsOn: [
      { bank: 30, what: "固定区辅助 (H5 语义化): $C50C→$CD7C (名字区指针= $0300+ID*12), $C515→$CB0F (渲染同步等待, H5 空), $C527→$CE08 (场景缓冲切换, H5 空), $C536→$CDC9 (线性索引→X/Y 场地坐标), $C539→$CDE2 (X/Y→精灵位置索引, 越界 $FF)" },
      { bank: 24, what: "ram_05E3 场景忙标志共享 (0=空闲→停止动画)" },
    ],
    usedBy: [
      { bank: 30, what: "LDA #$1B / STA ram_0025 / JSR $CE2D (切 bank 27 到 $A000 窗口) + JSR $802A 调用 entry_8104 — $CF72/$CF79 图形工具等多处" },
      { bank: 31, what: "LDA #$1B / JSR $CBB0 或 STA ram_0025 / JSR $CE2D 切 bank 27, JSR $801E 调用 — $E043/$E04E/$E0A3 等多处, 比赛动画场景切换" },
    ],
  },

  // ── 核心 RAM 变量 ──
  ramMap: [
    { addr: "$062A", name: "场景索引", desc: "bit7 被 AND $7F 屏蔽后作子记录索引" },
    { addr: "$05FB", name: "状态标志", desc: "表选择 / 坐标常量切换 (carry = (arg≥$0B) XOR (ram_05FB≠0))" },
    { addr: "$00E2", name: "随机/阈值 lo", desc: "LSR 取 bit0 作奇偶选择写入 ram_003E; 后半段与 ram_0032 比较决定二次写入" },
    { addr: "$0032", name: "阈值比较", desc: "ram_0032 ≥ ram_00E2 时触发二次写入逻辑" },
    { addr: "$05F3", name: "动画脚本索引", desc: "→ $A292 动画脚本指针表" },
    { addr: "$05F4", name: "动画状态标志", desc: "0=停止, $01=运行, $80=重启 (bit7 置 → 重载脚本)" },
    { addr: "$05F5", name: "帧延迟计数器", desc: ">0 时递减后返回, =0 时处理当前帧" },
    { addr: "$05E3", name: "场景忙标志", desc: "共享 bank24; 0=空闲 → FF 跳转时停止动画" },
    { addr: "$0034/$0035", name: "名字区指针", desc: "$C50C 结果: $0300 + ID*12" },
    { addr: "$003C/$003D", name: "场景子记录偏移", desc: "Y*20 (16-bit, 含 ASL 进位)" },
    { addr: "$003E", name: "记录内字节偏移", desc: "(arg-1)*2 + ram_00E2 bit0" },
    { addr: "$003F", name: "表选择", desc: "$25=$A6AD 场景 / $26=$AB65 场景数据" },
    { addr: "$0063/$0064", name: "动画脚本指针", desc: "当前脚本流位置 (帧延迟/块索引对)" },
    { addr: "$04A5", name: "精灵影子缓冲", desc: "OamManager 统一管理 (替代 ram_04A5)" },
    { addr: "$0515", name: "OAM 忙标志", desc: "OamManager 统一管理 (0=空闲 1=构建中 $80=完成)" },
  ],

  // ── Bank 30 固定辅助交叉引用 ──
  crossRefs: [
    { addr: "$C50C→$CD7C", desc: "名字区指针加载: A(ID) → (ram_0034) = $0300+ID*12", locations: "entry_8104" },
    { addr: "$C515→$CB0F", desc: "渲染同步等待 (H5 空实现)", locations: "entry_81EE" },
    { addr: "$C527→$CE08", desc: "场景缓冲切换 (H5 空实现)", locations: "entry_8104" },
    { addr: "$C536→$CDC9", desc: "线性索引→X/Y 场地坐标: X=(A/12)*8+$34, Y=(A%12)*8+$54", locations: "entry_8104" },
    { addr: "$C539→$CDE2", desc: "X/Y→精灵位置索引: 行号+12*列号, 越界 $FF", locations: "entry_8104" },
  ],

  // ── 架构说明 ──
  architecture: {
    role: "精灵/场景动画数据 + 动画帧推进 — 被 Bank 30/31 切到 $A000 窗口读取精灵数据",
    pattern: "Bank 27 是数据为主 + 极少量代码的混合 bank。代码段只有两个入口: entry_8104 (场景/精灵数据加载, 输出到名字区 9 号槽) 和 entry_81EE (动画帧推进, 构建 OAM 影子缓冲)。\n\nbank27 表数据均位于本 bank 的 $A000-$BFFF 窗口 (物理偏移 = cpuAddr - 0xA000), 代码通过 MMC3 双窗口映射直接访问。\n\n动画渲染链路: 动画脚本指针表($A292) → 帧延迟/块索引对 → 精灵动画块指针表($A42A) → 动画块数据 [count, tileLo, tileHi, tile×count] → OamManager 影子缓冲 → emitSprites() 输出 DataStore.sprites → 渲染器消费。\n\n调色板链路: 动画块首字节 attr 低 2 位选 SPR 组 → 颜色值来自 PALETTE_TABLE_0D (bank00_core.service.ts) → paletteRAM $3F10-$3F1F (SPR_OFFSETS) → nesColorToRGBA + NES_PALETTE 换算 RGBA。",
    h5Files: [
      "src/game/bank27_minimal.service.ts — Bank27Service (entry_8104 / entry_81EE / 固定辅助语义化)",
      "src/data/bank27-data.ts — 原始字节 + 结构化表访问 (readB27 / readB27U16 / readB27Decrement / readB27AnimScriptPtr / readB27AnimBlockPtr / readB27ScenePtr / readB27SceneDataPtr)",
      "src/data/OamManager.ts — 精灵输出统一管理 (palette = attr & 0x03)",
      "src/data/pallete/paletteManager.ts — paletteRAM $3F00-$3F1F (SPR_OFFSETS=[0x10,0x14,0x18,0x1C])",
      "src/game/bank00_core.service.ts — PALETTE_TABLE_0D (32B 调色板, 当前为占位数据)",
    ],
  },
};

export default data;
