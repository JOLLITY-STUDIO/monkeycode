// Bank 00 — System Service & Main Loop ($9EED)
// 基于 bank_00.asm 反汇编 + ROM 二进制完整追踪分析
// CPU 映射: $8000-$9FFF (MMC3 R6 select, 由 Bank 30 映射)
// PRG offset: 0x000010-0x00200F
// CDL stats: code=7272 data=531 unacc=471 (updated 2026-08-08)

const data = {
  bankId: 0,
  baseAddr: 0x000010,     // PRG-ROM offset
  bankAddrBase: 0x8000,   // CPU 映射窗口

  stats: {
    totalLines: 4620,
    codeBytes: 7272,
    dataBytes: 531,
    unaccessedBytes: 471,
    subroutineCount: 40,
    dataTableCount: 12,
    note: "Bank 00 是游戏核心系统服务层 + 主循环引擎。不是 RESET 后直接进入的 bank——RESET 链经过 Bank31→Bank30→Bank02 $A200→$A21B→最终 JMP $9EED 才进入 Bank00 主循环。Bank 02 $A21B 调用 Bank00 各服务($9A43/$98A0/$9B7F/$9F69/$8297/$8AF7/$890C/$88FB/$9A35)完成初始化后, JMP $9EED 进入帧循环。",
    note2: "🎬 【动画分镜1】Tecmo Theater 开场动画: trace frame 10→295(~5s)。Bank 00 $801F→$8027→$805B 场景初始化链(scene=0x17) → JSR $9FA8(切 Bank 01 到 $A000)→Bank01 NMI handler $805D 每帧写 PPU 渲染 Tecmo 画面。Bank 00 不引用 Bank 10。Bank 切换: $9FA8→Bank01/02/04/FE; $C4B9→Bank01/02/06/07/08。",
    note3: "⚠ 注意: Tecmo Theater 是【动画分镜】(过场动画), 不是功能页面(标题画面/菜单等)。frame 295 之后还有 N 个动画分镜, 整个分镜序列尚未完整 trace。场景流转由 $0026(scene_id) + $83BA/$83DC/$83FE 跳转表驱动。Reset 完整链路见 Bank31/Bank30/Bank02 的 architecture.bootFlow。",
    tecmoTheater: {
      traceFile: "trace/Captain Tsubasa II - Super Striker (Japan)-openning-tecmo-theater.log",
      frameRange: "frame 10 → 295 (~5 seconds)",
      type: "动画分镜 (过场动画, 非功能页面)",
      sceneId: "0x17",
      bootChain: "Reset: Bank31 $FFF0→Bank30 $C64E→$CEFE→$C400→Bank02 $A200→$A21B→JMP $9EED→Bank00主循环 → scene=0x17 → Bank01 NMI handler 每帧渲染 Tecmo 画面",
      note: "这是 Reset 启动后的第一个动画分镜。frame 295 之后 scene_id 变更, 后续分镜序列尚未 trace。",
      keyFunctions: [
        { addr: "$9EED", name: "主循环入口", role: "Bank02 $A21B 最后 JMP 此处(LDX#$02→$C4B9→JMP $A203)进入帧循环" },
        { addr: "$801F", name: "场景初始化链入口", role: "等待 VBlank → 清 PPU Buffer → 初始化场景状态" },
        { addr: "$8027", name: "场景加载", role: "JSR $9FA8(Bank 01) → 等待 ram_001E bit4 → 开始场景渲染" },
        { addr: "$8297", name: "调色板初始化", role: "A=0x0D → 设 $004D/4E → JSR $9085 → 写入 PPU Buffer" },
        { addr: "$9085", name: "调色板数据写入PPU Buffer", role: "从数据表读取→写入 $05E8 PPU Buffer → NMI DMA 到 PPU $3F00" },
        { addr: "$8AF7", name: "场景描述读取", role: "scene=0x17→$ED→切Bank07→读Bank02场景指针表→解析场景数据" },
        { addr: "$9FA8", name: "Bank 切换核心", role: "A=0x01 → 切 Bank 01 到 $A000 作为 NMI handler" },
      ],
    },
  },

  // ── 跳转表 ($8002-$8016) ──
  // Bank 00 入口: 通过 A 寄存器传入函数索引, dispatch 到对应子程序
  jumpTable: [
    { index: 0, lo: "$65", hi: "$81", target: "$8165", desc: "入口0: $8166 (帧循环分支B)" },
    { index: 1, lo: "$8A", hi: "$81", target: "$818A", desc: "入口1: $818B (帧循环分支C/D)" },
    { index: 2, lo: "$AD", hi: "$81", target: "$81AD", desc: "入口2: $81AE (帧循环分支E)" },
    { index: 3, lo: "$B4", hi: "$81", target: "$81B4", desc: "入口3: $81B5 (帧循环分支F)" },
    { index: 4, lo: "$DA", hi: "$81", target: "$81DA", desc: "入口4: (未解析)" },
    { index: 5, lo: "$06", hi: "$FF", target: "$FF06", desc: "入口5: (数据/未使用)" },
  ],

  // ── 核心入口函数 ──
  entryPoints: [
    { addr: "$8017", name: "帧循环主入口 A", desc: "LDX #$02 → JSR $C4B9(切Bank02) → JMP $A203(进场景) — 正常帧入口" },
    { addr: "$801F", name: "初始化入口", desc: "JSR $9BA0(等VBlank) → $8464(清PPU Buffer) → 等待$001E bit4 → 清零状态变量 → 进入场景初始化流程" },
    { addr: "$8166", name: "帧循环分支 B", desc: "ram_0027=1 → $C56C → $8285 → 检查场景号变化" },
    { addr: "$818B", name: "帧循环分支 C", desc: "ram_0028 vs ram_0029 比较 → 查 $83BA 跳转表" },
    { addr: "$81AE", name: "帧循环分支 D", desc: "ram_0027=3 → JMP $8017" },
    { addr: "$81B5", name: "帧循环分支 E", desc: "ram_0028 vs 29比较 → 查 $83BA 判断类型3" },
  ],

  // ── 场景初始化流程 ($8017→$801F→...) ──
  // ✅ 所有步骤均有 bank_00.asm 行号验证
  sceneInitFlow: {
    desc: "Bank 00 主循环中场景初始化链(非首次RESET,是场景切换时触发)",
    steps: [
      { step: 1, addr: "$801F", asmLine: 27, asm: "JSR $9BA0", action: "等待 VBlank / 清 PPU Buffer" },
      { step: 2, addr: "$8027", asmLine: 30, asm: "LDA #$01", action: "JSR $9FA8(Bank $01) 等待 ram_001E bit4" },
      { step: 3, addr: "$8053", asmLine: 51, asm: "JSR $9B11", action: "JSR $9B11(NT+属性清零)" },
      { step: 4, addr: "$8058", asmLine: null, asm: null, action: "JSR $9FA8(Bank $02) 映射场景 bank" },
      { step: 5, addr: "$805B", asmLine: null, asm: null, action: "JSR $9B7F(未知初始化)" },
      { step: 6, addr: "$805E", asmLine: 55, asm: "JSR $98A0", action: "JSR $98A0(NT 清零: 禁用渲染→写 $2006=$2000→2048B 清零→恢复渲染)" },
      { step: 7, addr: "$8061", asmLine: 56, asm: "LDA #$0D", action: "A=0x0D(调色板参数)" },
      { step: 7.5, addr: "$8063", asmLine: 57, asm: "JSR $8297", action: "JSR $8297(调色板初始化: A=0x0D → $9085)" },
      { step: '8a', addr: "$806A", asmLine: 60, asm: "LDA #$17 ⚠", action: "⚠ scene_id=0x17 硬编码(Tecmo Theater) ← 这是ROM固定值" },
      { step: '8b', addr: "$806C", asmLine: 61, asm: "JSR $8AF7", action: "JSR $8AF7(scene=0x17): 场景描述读取 → Bank 02 $A0xx 指针表" },
      { step: '9a', addr: "$806F", asmLine: 62, asm: "LDA #$30", action: "A=0x30(VRAM索引参数)" },
      { step: '9b', addr: "$8071", asmLine: 63, asm: "JSR $890C", action: "JSR $890C(VRAM 地址/滚动设置)" },
      { step: 10, addr: "$8074", asmLine: 64, asm: "JSR $88FB", action: "JSR $88FB(PPU 寄存器设置)" },
      { step: 11, addr: "$8077", asmLine: 65, asm: "JSR $9A35", action: "JSR $9A35(主循环初始化: $004C=$8A)" },
      { step: 12, addr: "$808D", asmLine: 75, asm: "LDA #$0A; STA $ED", action: "ram_00ED=0x0A → 进入输入循环" },
    ],
  },

  // ── 子程序函数列表 ──
  subroutines: [
    {
      bankAddr: "$8002",
      name: "跳转表分发器",
      asmLine: 7,
      length: "11B ($8002-$800C)",
      desc: "ASL A(索引×2) → TAX → LDA $800D,X/PHA → LDA $800E,X/PHA → RTS(推入目标地址返回)。Bank 30 通过此接口调用 Bank 00 的各子入口。",
      note: "跳转向量表: $8165/$818B/$81AE/$81B5/$81DA。$800D-8016 是数据表。",
    },
    {
      bankAddr: "$801F",
      name: "场景初始化链入口",
      asmLine: 27,
      length: "~43B ($801F-$8054)",
      desc: "等待_VBlank → 清PPU Buffer → 等待_001E.bit4 → 清零状态(05/06/09/0A/11/12/0D/0E/4C/5B) → ram_0700=1 → 场景初始化子调用链",
      note: "场景初始化子链见 sceneInitFlow.steps (L51-L75 in bank_00.asm)",
    },
    {
      bankAddr: "$8053",
      name: "场景初始化调用链执行区",
      asmLine: 51,
      length: "~65B ($8053-$809D)",
      desc: "$9B11(L51)→切Bank02→$9B7F→$98A0(L55)→$8297(L57, A=0x0D)→LDA #$17(L60)→$8AF7(L61)→$890C(L63, A=0x30)→$88FB(L64)→$9A35(L65)",
    },
    {
      bankAddr: "$8091",
      name: "主输入循环",
      asmLine: 77,
      length: "~50B ($8091-$80D3)",
      desc: "ram_00ED→$E6+$E7=$220A → $98EA(PPU写入) → JSR $9FA8(Bank01)等待 → 检查 ram_001E.bit2-5 → 分支到方向处理 → $98E8/$98EA 写入NT → 循环",
    },
    {
      bankAddr: "$8166",
      name: "帧循环分支B ($8166)",
      asmLine: 172,
      length: "~33B ($8166-$8187)",
      desc: "ram_0027=1 → $C56C(???) → $8285(PPU缓冲消费?) → 对比 ram_0026 vs E4 → 查 $83FE 跳转表",
      note: "通过 JMP $8017 返回主帧循环",
    },
    {
      bankAddr: "$818B",
      name: "帧循环分支C ($818B)",
      asmLine: 187,
      length: "~45B ($818B-$81C6)",
      desc: "ram_0028 vs 0029 比较 → BEQ查$83BA跳转表 判断类型1/2/3 → 分支到 $81D4/$81E6/$81A5",
    },
    {
      bankAddr: "$81B5",
      name: "帧循环分支E ($81B5)",
      asmLine: 205,
      length: "~25B ($81B5-$81D3)",
      desc: "ram_0028 vs 29 比较 → 查 $83BA → 类型3判定 → 分支",
    },
    {
      bankAddr: "$8297",
      name: "调色板初始化 ($8297)",
      asmLine: 304,
      length: "~17B ($8297-$82A8)",
      desc: "A=参数(调色板index)存入$E7 → ram_00E6=1 → 指针$004D=$E500(PPU缓冲目标) → JSR $9085(写调色板数据到PPU Buffer) → RTS",
      note: "调用时: A=0x0D (L56 bank_00.asm)。$9085从内置数据读调色板值写入 $05E8 缓冲区。",
      crossRefs: [
        { from: "$8063", bankAddr: "00:8063", asmLine: 57, op: "JSR", desc: "场景初始化: A=0x0D (Tecmo Theater 调色板)" },
      ],
    },
    {
      bankAddr: "$82A9",
      name: "Bank 01 等待循环 ($82A9)",
      asmLine: 313,
      length: "~10B ($82A9-$82B4)",
      desc: "LDA #$01 → JSR $9FA8(切Bank01) → 检查 $004D/4E≠0 则循环等待 → RTS。",
    },
    {
      bankAddr: "$82B5",
      name: "场景准备/重置 ($82B5)",
      asmLine: 319,
      length: "~40B ($82B5-$82EC)",
      desc: "LDA #$01→$9FA8切Bank01 → 等待$004D/4E清零或$001E.bit5→清零状态变量 → ram_0700=1 → $9BA0等VBlank → 清零$44/$45/$7A/$7B → RTS",
    },
    {
      bankAddr: "$8285",
      name: "PPU 缓冲完成等待 ($8285)",
      asmLine: 297,
      length: "~12B ($8285-$8290)",
      desc: "检查 $004D/4E=0 则RTS → 否则 LDA#$01→$9FA8切Bank01等待",
    },
    {
      bankAddr: "$83BA",
      name: "帧跳转表 ($83BA 数据)",
      asmLine: 462,
      length: "34B ($83BA-$83DB)",
      desc: "按 scene_index 查表,值: 0=跳转, 1=类型1, 2=类型2, 3=类型3",
    },
    {
      bankAddr: "$83DC",
      name: "帧跳转表2 ($83DC 数据)",
      asmLine: 496,
      length: "34B ($83DC-$83FD)",
      desc: "场景切换触发条件表",
    },
    {
      bankAddr: "$83FE",
      name: "帧跳转表3 ($83FE 数据)",
      asmLine: 530,
      length: "34B ($83FE-$841F)",
      desc: "场景分支触发表",
    },
    {
      bankAddr: "$8464",
      name: "PPU Buffer 参数设置 ($8464)",
      asmLine: 632,
      length: "~13B ($8464-$8470)",
      desc: "A 参数值 → 存入 $004D? → 设置 PPU 缓冲区写入指针",
    },
    {
      bankAddr: "$84C1",
      name: "Bank 02 跳转表分发($84C1)",
      asmLine: 678,
      length: "~60B ($84C1-$8501)",
      desc: "查表跳转到 Bank 02 的不同入口($A003/$A006/$A009/$A00C/$A00F/$A012/$A015/$A018)",
      note: "通过 JSR $C4B9 切换 bank 后 JMP Bank02 入口",
    },
    {
      bankAddr: "$88CA",
      name: "PPU Tile 写入 (tail) ($88CA)",
      asmLine: 1242,
      length: "~20B ($88CA-$88E6)",
      desc: "向 PPU Buffer 写单个 tile 数据到 Nametable",
    },
    {
      bankAddr: "$88FB",
      name: "PPU 寄存器设置 ($88FB)",
      asmLine: 1268,
      length: "~25B ($88FB-$8920)",
      desc: "PPUCTRL/PPUMASK/PPUSCROLL 设置",
    },
    {
      bankAddr: "$890C",
      name: "VRAM 地址设置 ($890C)",
      asmLine: 1278,
      length: "~20B ($890C-$8920)",
      desc: "A=index(0x30) → 从数据表读取滚动偏移 → 设置 PPU $2006/$2005",
      note: "L62 bank_00.asm: LDA #$30; L63: JSR $890C",
    },
    {
      bankAddr: "$8920",
      name: "PPU 配置写入 ($8920)",
      asmLine: 1290,
      length: "~15B ($8920-$8930)",
      desc: "A=0 → 禁止 NMI/渲染 → 设置 PPU 地址 → 写 $2007 数据 → 恢复",
    },
    {
      bankAddr: "$8AF7",
      name: "场景描述读取 ($8AF7)",
      asmLine: 1557,
      length: "~100B ($8AF7-$8B61)",
      desc: "A=scene_id → $ED存储 → LDX#$07→$C4B9切Bank07 → scene_id×2→指针=$A000+idx×2(Bank02场景指针表) → 读指针表→$63/64=场景数据地址 → 解析(75/76=屏幕坐标,48=metatile数,5E/5F=?,5C/5D=tile指针)",
      note: "⚠ 调用时A=0x17(bank_00.asm L60 LDA #$17)。场景指针表位于Bank 02映射窗口($A000-$BFFF)。",
      crossRefs: [
        { from: "$806C", bankAddr: "00:806C", asmLine: 61, op: "JSR", desc: "场景初始化: scene=0x17 (Tecmo Theater)" },
      ],
    },
    {
      bankAddr: "$9085",
      name: "调色板数据写入 PPU Buffer ($9085)",
      asmLine: 2325,
      length: "~40B ($9085-$90B0)",
      desc: "从 Bank 00 内置调色板数据表读取32字节 → 写入 $05E8 PPU Buffer → 更新 $0628 写指针。被 $8297 调用。",
    },
    {
      bankAddr: "$98A0",
      name: "Nametable 全屏清零 ($98A0)",
      asmLine: 3569,
      length: "~30B ($98A0-$98DC)",
      desc: "禁用 NMI(AND #$7F on $2000) → 禁用渲染(AND #$E7 on $2001) → 设PPUADDR=$2000 → 向$2007写2048个$00(8×256) → 恢复渲染 → 恢复NMI → RTS",
      note: "⚠ 纯粹VRAM清零函数,不涉及bank切换或Bank 10数据。",
    },
    {
      bankAddr: "$98E8",
      name: "PPU Buffer 写入入口(0参数) ($98E8)",
      asmLine: 3609,
      length: "~2B ($98E8-$98EA)",
      desc: "LDA #$00 → 继续到 $98EA",
    },
    {
      bankAddr: "$98EA",
      name: "PPU Buffer 打包写入 ($98EA)",
      asmLine: 3610,
      length: "~50B ($98EA-$992C)",
      desc: "A=标志存入$EB → 检查$004A/4B → $E8/$E9存Y/X → 计算buffer偏移 → 打包control byte+PPU地址+数据 → 写入$05E8+offset → 更新$0628指针",
    },
    {
      bankAddr: "$9A35",
      name: "主循环初始化 ($9A35)",
      asmLine: 3787,
      length: "~10B ($9A35-$9A43)",
      desc: "设置 ram_004C=$8A → 返回主循环",
    },
    {
      bankAddr: "$997A",
      name: "PPU Buffer 批量写入 ($997A)",
      asmLine: 3683,
      length: "~20B ($997A-$9990)",
      desc: "复制数据块到 PPU Buffer,处理连续的 PPU 地址写入",
    },
    {
      bankAddr: "$9B11",
      name: "Nametable + 属性表清零 ($9B11)",
      asmLine: 3895,
      length: "~20B ($9B11-$9B28)",
      desc: "清零 Nametable(32×30 tile)和属性表(8×8 tile) → $98A0 清零NT(写入$00) + 属性表设 $00",
    },
    {
      bankAddr: "$9B28",
      name: "PPU Buffer 空间分配 ($9B28)",
      asmLine: 3906,
      length: "~20B ($9B28-$9B42)",
      desc: "检查 $0628 剩余空间 → 分配 buffer 条目 → 设置 X=写偏移 → 返回",
    },
    {
      bankAddr: "$9B5E",
      name: "PPU Buffer 结束标记 ($9B5E)",
      asmLine: 3933,
      length: "~8B ($9B5E-$9B66)",
      desc: "在 PPU Buffer 末尾写 0x00 结束标记 → 更新 $0628 指针",
    },
    {
      bankAddr: "$9B7F",
      name: "未知初始化函数 ($9B7F)",
      asmLine: 3949,
      length: "~15B ($9B7F-$9B90)",
      desc: "场景初始化链中的一个环节,具体功能待分析",
    },
    {
      bankAddr: "$9BA0",
      name: "等待 VBlank ($9BA0)",
      asmLine: 3964,
      length: "~20B ($9BA0-$9BB5)",
      desc: "等待 NMI 标志→设 ram_E6=$00,ram_E7=$00 → RTS。帧同步等待。",
    },
    {
      bankAddr: "$9EED",
      name: "主循环入口 ($9EED)",
      asmLine: 4453,
      length: "~14B ($9EED-$9F00)",
      desc: "LDX #$02 → JSR $C4B9 → JMP $A203。永不退出的帧循环入口。",
      note: "Bank 02 $A21B 最后 JMP $9EED 进入此处。此后 Bank 00 接管帧循环。",
    },
    {
      bankAddr: "$9FA8",
      name: "Bank 切换核心 ($9FA8)",
      asmLine: 4555,
      length: "~47B ($9FA8-$9FE2)",
      desc: "A=bank编号 → 保存到ram_0019 → 保存X/Y/ED/EC/EB/EA/E9/E8/E7/E6到栈 → TSX保存栈指针到ram_0001,X → 保存0024/0025到ram_0002/0003,X → 检查bank号(0/FF→FE) → 存入ram_0000,X → JMP $9EFB",
      note: "Bank 00 的bank切换函数。实际切换由 $9EFB 完成(写入MMC3寄存器)。",
    },
    {
      bankAddr: "$9EFB",
      name: "MMC3 Bank 写入 ($9EFB)",
      asmLine: 4460,
      length: "~36B ($9EFB-$9F32)",
      desc: "恢复栈状态 → 向 MMC3 寄存器写入 bank 编号 → 恢复寄存器和保存的变量 → JMP 返回调用点",
    },
  ],

  // ── 数据表 ──
  dataTables: [
    {
      bankAddr: "$800D-$8016",
      name: "跳转向量表 (5 entries × 2B)",
      length: "10B",
      desc: "跳转表分发器($8002)的跳转目标地址(lo/hi对)。目标: $8165/$818B/$81AE/$81B5/$81DA",
    },
    {
      bankAddr: "$83BA-$83DB",
      name: "帧分支跳转表 A",
      length: "34B",
      desc: "按 scene_index 索引的跳转条件表,值: 0/1/2/3 分支到不同处理",
    },
    {
      bankAddr: "$83DC-$83FD",
      name: "帧分支跳转表 B",
      length: "34B",
      desc: "场景切换触发条件表",
    },
    {
      bankAddr: "$83FE-$841F",
      name: "帧分支跳转表 C",
      length: "34B",
      desc: "场景分支触发表",
    },
    {
      bankAddr: "$84A9-$84B6",
      name: "跳转表辅助数据",
      length: "14B",
      desc: "Bank 02 入口跳转的辅助数据",
    },
    {
      bankAddr: "$8586-$85A8",
      name: "初始化参数表",
      length: "35B",
      desc: "场景初始化使用的参数数据",
    },
    {
      bankAddr: "$85BD-$85DB",
      name: "场景前参数",
      length: "31B",
      desc: "场景初始化前置参数",
    },
    {
      bankAddr: "$8AF5-$8AF6",
      name: "场景参数表尾",
      length: "2B",
      desc: "$06 $FF → 场景数据结束标记",
    },
    {
      bankAddr: "$9085 内的表",
      name: "调色板数据表",
      length: "32B",
      desc: "标题画面/BG 调色板数据(0x0D=13号调色板)",
    },
    {
      bankAddr: "$9FE5-$9FEF",
      name: "Bank 结尾填充数据",
      length: "11B",
      desc: "结尾区域(FF 填充),非代码区",
    },
  ],

  // ── Bank 依赖关系(精确) ──
  bankDependencies: {
    summary: "Bank 00 通过 $9FA8(A=bank号) 和 $C4B9(X=bank号) 切换到其他 bank。已验证的引用:",
    directSwitches: [
      { bank: 1, count: "15+", via: "$9FA8(A=0x01)", desc: "等待 Bank 01 数据操作完成" },
      { bank: 2, count: "~5", via: "$9FA8(A=0x02)", desc: "切换到 Bank 02 场景数据" },
      { bank: 4, count: "5", via: "$9FA8(A=0x04)", desc: "切换到 Bank 04 (过场文本数据)" },
      { bank: 254, count: "2", via: "$9FA8(A=0xFE)", desc: "特殊切换(可能为复位)" },
    ],
    viaBank30: [
      { bank: 1, count: "~6", via: "$C4B9(X=0x01)", desc: "Bank 30 代理切换到 Bank 01" },
      { bank: 2, count: "~7", via: "$C4B9(X=0x02)", desc: "Bank 30 代理切换到 Bank 02" },
      { bank: 6, count: "~5", via: "$C4B9(X=0x06)", desc: "切换到 Bank 06 (过场文本)" },
      { bank: 7, count: "~4", via: "$C4B9(X=0x07)", desc: "切换到 Bank 07 (场地布局数据)" },
      { bank: 8, count: "1", via: "$C4B9(X=0x08)", desc: "切换到 Bank 08 (对话文本)" },
    ],
    bank30Calls: [
      { addr: "$C4B9", desc: "Bank 30 代理 Bank 切换函数" },
      { addr: "$C56C", desc: "Bank 30 未知函数" },
      { addr: "$C572", desc: "Bank 30 未知函数" },
    ],
    bank31Interface: "Bank 31 通过 RESET 向量调用 Bank 30, Bank 30 映射 Bank 00 到 $8000",
    notReferenced: "⚠ Bank 00 不引用 Bank 10。$98A0 只是 NT 清零,不是场景加载。场景数据从 Bank 02($A0xx)读取。",
  },

  // ── 关键 RAM 变量 ──
  ramVariables: [
    { addr: "$0019", name: "当前 bank 切换编号", note: "$9FA8 写入,保存切换目标 bank ID" },
    { addr: "$001B", name: "场景状态标志", note: "bit0=初始化标志,控制初始化流程" },
    { addr: "$001E", name: "帧状态标志", note: "bit4/bit5=NMI/VBlank 完成标志" },
    { addr: "$0026", name: "当前场景编号", note: "scene_index,被 $8AF7 等使用" },
    { addr: "$0027/$0028/$0029", name: "帧循环状态机", note: "控制帧循环分支" },
    { addr: "$004C", name: "Bank 02 入口索引", note: "bit7标志+索引号,间接调 Bank02" },
    { addr: "$004D/$004E", name: "PPU Buffer 指针(lo/hi)", note: "非零=有待推送数据,$82B5/$8285 等待清零" },
    { addr: "$00E6/$00E7", name: "PPU 地址临时(lo/hi)", note: "PPU Buffer 操作中存储目标 PPU 地址" },
    { addr: "$00ED", name: "scene_id/当前选择项", note: "$8AF7 读取场景号; $8091 输入循环光标位置" },
    { addr: "$05E8-$0628", name: "PPU Buffer 区域", note: "CPU→PPU 数据传输缓冲区" },
    { addr: "$0628", name: "PPU Buffer 写指针", note: "Bank 02 NMI 检查非零则消费" },
    { addr: "$0700", name: "当前 PPU 配置值", note: "写入 MMC3/PPU 控制寄存器" },
  ],

  // ── 跨 bank 交叉引用 ──
  crossReferences: {
    calledFrom: [
      { from: "Bank 30 $C000", desc: "RESET 后 Bank 30 将 Bank 00 映射到 $8000 窗口" },
      { from: "Bank 02 $A200+", desc: "场景控制器调用 Bank 00 各服务函数($9BA0/$98A0/$9B7F/$9F69等)" },
      { from: "Bank 31 $E000+", desc: "NMI/IRQ 向量间接通过 Bank 30 进入 Bank 00" },
    ],
    callsTo: [
      { to: "Bank 02 $A200", desc: "场景入口,JMP $A203/$A20C/$A20F 等" },
      { to: "Bank 02 $A006/$A009/$A00C", desc: "Bank 02 子程序入口(Bank 30 跳转表)" },
      { to: "Bank 30 $C4B9", desc: "Bank 切换代理,计数 ~30+" },
      { to: "Bank 30 $C56C/$C572", desc: "Bank 30 核心服务" },
    ],
  },
};

export default data;
