// Bank 12 — Audio Engine & BGM/SFX Data ($8000-$9FFF)
// 基于 bank_12.asm 反汇编 + ROM 二进制完整追踪分析 + APU trace 验证
// CPU 映射: $8000-$9FFF (MMC3 R6 select，F6 首次映射)
// PRG offset: 0x018010-0x01A00F
// CDL stats: code=839 data=6088 unacc=440 (2026-08-08)
// 最后更新: 2026-08-08 — 添加 4 个音频引擎关键入口点 (trace 验证)

const data = {
  bankId: 12,
  baseAddr: 0x018010,       // PRG-ROM offset
  bankAddrBase: 0x8000,     // CPU 映射窗口
  mmc3SelectReg: 0x07,      // MMC3 寄存器 7 控制 $A000-$BFFF 窗口

  stats: {
    totalLines: 7367,
    codeBytes: 839,
    dataBytes: 6088,
    unaccessedBytes: 440,
    codeDensityPct: "11.4%",
    note: "Bank 12 是游戏音频引擎入口。代码只有 11.4%，其余全是音乐/音效数据。",
    note2: "音频工作区: $0700-$07FF (256B)。$0700-05: 请求队列(6slot)。$0706: chMask。$0707-$07E6: 8ch×16B 参数块。$07E8: DMC标志。$07FC: bank缓存。",
    note3: "⚠ 调用方式: 外部代码将音频ID写入 ram_0700,X → 下一次NMI Bank12映射→$8002入口处理请求。",
    note4: "🔗 BGM数据: Bank 15 ($17AD-$1FF1, 2117B) 被引擎读取播放开场动画BGM。Bank 13-14 可砍。",
  },

  // ── 音频引擎入口点 (trace 验证) ──
  engineEntryPoints: {
    desc: "APU trace 4500帧中 PC 地址出现的频率，确认这些是音频引擎的核心子例程",
    entries: [
      { pc: "0x818E", name: "音轨状态更新", desc: "读取 Bank 15 音序数据，更新通道状态和音符参数", accessed: "F280+" },
      { pc: "0x81A0", name: "音色/效果处理", desc: "处理 E2(音色)、E5(效果)、F3(滑音) 等指令", accessed: "F280+" },
      { pc: "0x81B7", name: "频率写入APU", desc: "将解析后的频率值写入 $4002/$4003($4006/$4007/$400A/$400B)", accessed: "F281+" },
      { pc: "0x81CC", name: "音长/帧计数更新", desc: "处理 E3(音长) 指令，更新通道持续时间计数器", accessed: "F281+" },
      { pc: "0x8002", name: "音频请求处理入口", desc: "NMI 触发后的入口，处理 ram_0700 队列中的音频请求", accessed: "F6+" },
    ],
  },

  // ── RAM 工作区 ($0700-$07FF) ──
  ramLayout: {
    desc: "音频引擎状态存储，每通道 16 字节间隔(0x10 stride)",
    sections: [
      { range: "$0700-$0705", name: "音频请求队列", desc: "6 个请求槽。非零值=播放请求(0x01-0x72)。值区分 bank 映射: $32-$43→Bank $0D, $44-$50→Bank $0E, $51-$5B→Bank $0F", asmRef: "L7, L47" },
      { range: "$0706", name: "通道活动标志", desc: "bitmask: bit0=ch1, bit1=ch2, ... 1=活跃。LSR 时检查当前通道是否到期", asmRef: "L87, L139" },
      { range: "$0707-$0708", name: "CH0 参数 (duration)", desc: "通道 0: dur_lo/dur_hi。每通道间隔 $10 字节", asmRef: "L94-95" },
      { range: "$0709-$070A", name: "CH0 参数 (next_dur)", desc: "通道 0: 下一个音符的持续时间", asmRef: "L115, L118" },
      { range: "$0727-$073F", name: "CH0-CH7 音符频率表", desc: "每通道 4 字节: period_lo, period_hi, ?, volume 初始值", asmRef: "L462-470" },
      { range: "$07AF-$07B6", name: "通道类型 (8×1B)", desc: "0=关, 1=方波/三角(跳$8257), 2=特殊(跳$82D2)", asmRef: "L281, L905" },
      { range: "$07B7-$07BE", name: "通道基础频率 LO (8×1B)", desc: "音符频率低字节，被 pitch bend 调整后写入 $4002", asmRef: "L319, L328" },
      { range: "$07BF-$07CE", name: "通道基础频率 HI (8×1B)", desc: "音符频率高字节，配合 $07B7 形成 16-bit 周期值", asmRef: "L321, L331" },
      { range: "$07C7-$07D6", name: "通道音序索引 (8×1B)", desc: "当前在音序中的位置 0-9，10 个值循环。$82D2 查跳转表用", asmRef: "L289, L356" },
      { range: "$07CF-$07DE", name: "通道音量/模式 (8×1B)", desc: "音量衰减计数器或模式值。$81DB 读取并递减", asmRef: "L240, L245" },
      { range: "$07DF-$07DE+4", name: "通道控制", desc: "额外的通道控制值", asmRef: "L53, L451" },
      { range: "$07E0-$07E3", name: "最后 $4003 写入缓存 (4B)", desc: "去重优化，避免重复写相同值到 APU 寄存器", asmRef: "L216, L223" },
      { range: "$07E4-$07E7", name: "通道静音标志 (4B)", desc: "非零=通道已静音, 跳过 $4003 写入", asmRef: "L197, L220" },
      { range: "$07E8", name: "DMC 播放标志", desc: "非零=有 DMC 采样在播放，清空后触发 DMC 重启", asmRef: "L255, L918" },
      { range: "$07FC", name: "当前辅助 bank 缓存", desc: "记录上次写入 MMC3 R7 的 bank 号，去重优化", asmRef: "L12, L21" },
    ] as Array<{ range: string; name: string; desc: string; asmRef: string }>,
  },

  // 每通道 16 字节参数块布局 (0x10 stride, 通道索引 * 4 为起点)
  // ram_00F2 = 通道基索引 (0,4,8,12,...28)
  channelParamsLayout: {
    desc: "每个音频通道在 $0707 开始有 16 字节参数块。通道索引为 ram_00F2 (0→CH0, 4→CH1, 8→CH2, ...)",
    offsets: [
      { offset: 0, name: "dur_lo", desc: "当前音符剩余帧数低字节" },
      { offset: 1, name: "dur_hi", desc: "当前音符剩余帧数高字节" },
      { offset: 2, name: "next_dur_lo", desc: "下个音符的持续时间低字节" },
      { offset: 3, name: "next_dur_hi", desc: "下个音符的持续时间高字节" },
      { offset: 4, name: "freq_lo", desc: "音符频率低字节(带 pitch bend)" },
      { offset: 5, name: "freq_hi", desc: "音符频率高字节(带 pitch bend)" },
      { offset: 6, name: "volume_raw?", desc: "音量原始值(初始化时从音序读取)" },
      { offset: 7, name: "freq_raw_lo?", desc: "原始频率低字节(pitch bend 基准)" },
      { offset: 8, name: "freq_raw_hi?", desc: "原始频率高字节(pitch bend 基准)" },
      { offset: 9, name: "channel_type", desc: "$07AF 区: 通道类型(0/1/2)" },
      { offset: 10, name: "base_freq_lo", desc: "$07B7 区: base 频率低字节" },
      { offset: 11, name: "base_freq_hi", desc: "$07BF 区: base 频率高字节" },
      { offset: 12, name: "seq_index", desc: "$07C7 区: 音序位置(0-9循环)" },
      { offset: 13, name: "vol_mode", desc: "$07CF 区: 音量/模式衰减" },
      { offset: 14, name: "?", desc: "$07D7 区" },
      { offset: 15, name: "?", desc: "$07DF 区" },
    ],
  },

  // ── 入口函数 ──
  subroutines: [
    {
      bankAddr: "$8002",
      asmLine: 7,
      name: "音频主循环入口",
      length: "~80B ($8002-$805D)",
      desc: "遍历 ram_0700,X(6 个请求槽 X=6→0): 值 $01-$31→$8349 播放; 值 $32-$43→MMC3 R7=0D; $44-$50→R7=0E; $51-$5B→R7=0F; 值 $31→初始化音量/衰减值($19/$0A)。处理完后 X=5→0 遍历活跃通道: dec 剩余时长 → $83CB 更新音序。然后设置 ram_00F0/00F1/00F2/00F3 为通道参数块指针和通道数(3 组: SQ1/SQ2/NOISE+DPCM 共 8 个流槽位)。",
      note: "这是每帧被 NMI 调用的音频核心函数。先处理请求队列，再更新活跃通道。",
      crossRefs: [
        { from: "NMI handler $C76E", desc: "每帧调用" },
      ],
    },
    {
      bankAddr: "$816E",
      asmLine: 172,
      name: "APU 寄存器写入 ($816E)",
      length: "~60B ($816E-$81DA)",
      desc: "将当前通道参数写入 APU $4000-$4003。索引计算: (3 - channel_group) × 4 → X 寄存器作为 $4000,X 基址。检查 channel_group: 0=方波, 1=三角, 2=NOISE/DMC。设置方波 duty cycle(bit6-7), 三角波 Linear Counter。写入 $4000(vol/env) + $4001(sweep) + $4002(freq_lo) + $4003(freq_hi+length)。去重优化: 比较 $4003 与上次值 $07E0。",
      note: "⚠ 仅处理 $4000-$4003 写入。$4004-$400F 通过 X 偏移的索引寻址实现(通道组 × 4)。",
    },
    {
      bankAddr: "$81DB",
      asmLine: 225,
      name: "音量/衰减处理 ($81DB)",
      length: "~78B ($81DB-$8233)",
      desc: "读取当前音符的音量参数 → 递减 $07CF 衰减计数器 → 到零后: 音量 +1 → 到 0x0F → 清零 $07D7 并设置 $07E8=0x80 触发新音序 → 音量综合到原始音符值 → 写入 $4000 低 4 位(vol)。处理 $07AF 通道类型: type=1→JMP $8257 频率处理; type=2→JMP $82D2 特殊处理。",
      note: "音量衰减和包络的核心。$07AF 区分方波/三角(JMP $8257)和特殊通道(JMP $82D2 含 $82E4 跳转表)。",
    },
    {
      bankAddr: "$8257",
      asmLine: 288,
      name: "频率计算/通道类型1 ($8257)",
      length: "~30B ($8257-$828D)",
      desc: "根据 $07C7 音序索引(0-9)查 $82E4 跳转表，对 $07B7/$07BF 频率做修改(±1, ±2, ±3, ±6, 0)。支持 pitch bend 效果。",
    },
    {
      bankAddr: "$82D2",
      asmLine: 356,
      name: "特殊通道处理($82D2) / 跳转表",
      length: "~90B ($82D2-$8370)",
      desc: "根据 $07C7 索引查 $82E4 跳转表(0-5 共 6 个目标): $830E(不变), $832B(+1), $8340(+2), $82F4(+3), $8309(+6), $828D→$82B4(-1), $82C9(-2)。对频率进行加减操作后返回。",
    },
    {
      bankAddr: "$82E4",
      asmLine: 364,
      name: "频率修改跳转表 ($82E4)",
      length: "16B (8 × 2B 指针)",
      desc: "8 项跳转表: $830E(不变), $832B(+1), $8340(+2), $832B(+1), $830E(不变), $82F4(+3), $8309(+6), $82F4(+3)。索引 0-9(DEC)→0-7 循环。",
      dataOnly: true,
    },
    {
      bankAddr: "$8349",
      asmLine: 434,
      name: "音乐播放初始化 ($8349)",
      length: "~75B ($8349-$83CA)",
      desc: "A=音效ID → 查 $8BDA 指针表获取通道初始化列表地址。遍历 [ch, ptrLo, ptrHi]×N: ch∈[0,7] → slot=8-ch → 清空 per-ch 状态 → 存 track ptr 到 $0727+ch×16 → vol=$0F → dur=1 → 设 $0706 bitmask。读到 ≥$80(terminator)→$0F→$4015→RTS。",
      note: "⚠ 关键: 不在 init 中设置 $07AF(chType)=0 保持为 0。chType 由 $EC 命令在音序运行时动态设置。通道在 chType≠0 前不发声。",
      note2: "⚠ 多通道共享数据块: 不同 ch 的 track ptr 可指向同一数据块不同偏移，实现 polyphonic。指向 terminator 后的通道静音。",
    },
    {
      bankAddr: "$83CB",
      asmLine: 485,
      name: "音乐音序读取器 ($83CB)",
      length: "~100B ($83CB-$84C8)",
      desc: "$83DF: LDA (ram_00F4),Y 读数据。$83E1: BPL→b<$80 是纯时长字节。$83E3: CMP #$E0→BCC $83ED→b≥$E0 进命令分发($84C9)。$83ED: CMP #$B0→BCC $83F4→b∈[$80,$DF]全是音符(CDL 确认 $B0+ 代码从未执行，$83F1-$83F3 是 data 不是 code)。$83F4: AND #$3F→查 $8725 时长表→写 $0707。$8404-$845C: 频率计算(备注子 nibble→FREQ_TBL, ≥12 做八度偏移)。",
      note: "⚠ $83ED-$83F3 的 CMP #$B0/BCC 路径虽然存在，但 $83F1-$83F3 三字节(CDL 标记为 unaccessed data=$C8 $D0 $EB)不会被 CPU 执行。所有 $80-$DF 统一走 $83F4 时长表。",
      note2: "音序器不直接修改 chType — APU 写入依赖 $07AF 值，初始=0→无输出，直到 $EC 命令激活。",
      crossRefs: [
        { from: "$80DE", asmLine: 96, desc: "通道剩余时长为0时调用" },
      ],
    },
    {
      bankAddr: "$84C9",
      asmLine: 501,
      name: "音频命令分发器 ($84C9)",
      length: "~200B ($84C9-$8698)",
      desc: "根据音频命令字节($E0-$EF)分发到对应处理程序。每个命令有专用的处理逻辑(修改时长、音量、跳转、循环、包络等)。",
      note: "14 个音频命令: $E0-$EF 各不同含义",
      commands: [
        { code: "$E0", desc: "音符时长设置 — 读取下个字节作为新的音符持续帧数" },
        { code: "$E2", desc: "音量/力度设置" },
        { code: "$E3", desc: "音量直接设置 — 下个字节存到 $07CF 和 $0730" },
        { code: "$E4", desc: "子调用 — push 当前地址，跳转到子序列" },
        { code: "$E5", desc: "返回 — 从子调用返回" },
        { code: "$E8", desc: "子序列跳转 — 类似 $E4 但永久跳转" },
        { code: "$E9", desc: "相对跳转" },
        { code: "$EA", desc: "包络/滑动设置" },
        { code: "$EB", desc: "音量包络 — 用于 fade 效果" },
        { code: "$EC", desc: "包络/效果控制 — 设置通道效果类型" },
        { code: "$ED", desc: "DMC 采样ID — 选择播放哪个 DMC 采样" },
        { code: "$EE", desc: "Fade 方向设置" },
      ],
    },
    {
      bankAddr: "$8699",
      asmLine: 915,
      name: "APU 初始化 A (DMC 采样 $0300)",
      length: "~30B ($8699-$86B7)",
      desc: "LDA #$0F→$4015(关所有通道) → 检查 $07E8→0 则: $4010=$0F(DMC 频率), $4012=$00(采样地址=$0300), $4013=$0C(采样长度 12×16+1=193B), $4015=$1F(开 SQ1+SQ2+TRI+NOISE+DMC)。",
      note: "DMC 采样基地址 = $C000(固定，CPU $C000-$DFFF)。$4012=$00→采样地址=$C000+$00×64=$C000(实际映射到当前 bank)。",
    },
    {
      bankAddr: "$86B8",
      asmLine: 928,
      name: "APU 初始化 B (DMC 采样 $0300×$20)",
      length: "~30B ($86B8-$86D6)",
      desc: "$4012=$03→采样地址=$C000+$03×64=$C0C0, $4013=$20→长度 32×16+1=513B。",
    },
    {
      bankAddr: "$86D7",
      asmLine: 941,
      name: "APU 初始化 C (DMC 采样 $0B00×$13)",
      length: "~30B ($86D7-$86F5)",
      desc: "$4012=$0B→采样地址=$C000+$0B×64=$C2C0, $4013=$13→长度 19×16+1=305B。",
    },
  ],

  // ── 音频命令字 ($E0-$EF) ──
  audioCommands: {
    desc: "音乐数据中的控制码。高位 bit7=1 的字节被解释为命令(0xE0-0xFF)。$E0-$EF 由 $84C9 分发器处理。",
    list: [
      { code: 0xE0, name: "SET_NOTE_LENGTH", usageCount: 120, desc: "设置后续音符的默认持续帧数。下一字节为帧数。" },
      { code: 0xE1, name: "UNUSED?", usageCount: 0, desc: "未出现在数据中" },
      { code: 0xE2, name: "SET_VOLUME_ENV", usageCount: 52, desc: "设置音量/包络参数" },
      { code: 0xE3, name: "SET_VOLUME", usageCount: 317, desc: "直接设置通道音量(0-15)。最常用的命令。" },
      { code: 0xE4, name: "SUB_CALL", usageCount: 39, desc: "将当前位置压栈后跳转到子序列" },
      { code: 0xE5, name: "SUB_RETURN", usageCount: 66, desc: "从子序列返回到调用点" },
      { code: 0xE6, name: "CMD_E6", usageCount: 1, desc: "极少用" },
      { code: 0xE7, name: "CMD_E7", usageCount: 1, desc: "极少用" },
      { code: 0xE8, name: "JUMP_SUB", usageCount: 21, desc: "跳转到子序列(不保存返回地址)" },
      { code: 0xE9, name: "RELATIVE_JUMP", usageCount: 51, desc: "相对地址跳转" },
      { code: 0xEA, name: "ENV_SLIDE", usageCount: 14, desc: "设置音量滑动/portamento 效果" },
      { code: 0xEB, name: "VOLUME_FADE", usageCount: 57, desc: "音量衰减包络控制" },
      { code: 0xEC, name: "EFFECT_CTRL", usageCount: 57, desc: "效果类型控制 — 设置通道效果模式" },
      { code: 0xED, name: "DMC_SAMPLE_ID", usageCount: 23, desc: "选择 DMC 采样编号。配合 APU init 切换。" },
      { code: 0xEE, name: "FADE_DIRECTION", usageCount: 4, desc: "设置音量衰减方向" },
      { code: 0xEF, name: "CMD_EF", usageCount: 10, desc: "待分析" },
    ],
  },

  // ── 频率表 & 时长表 ──
  frequencyTable: {
    freqTableAddr: "$870D",
    freqTableSize: "12 entries × 2B (24 bytes) → $870D-$8724",
    desc: "NES APU 11-bit 周期表，每个条目 = lo | ((hi & 7) << 8)。12 半音一个八度。",
    note: "$8725 起是时长表(DUR_TBL)，不是频率数据。ASM $83F7: LDA $8725,X; AND #$3F 索引。",
  },

  durationTable: {
    durTableAddr: "$8725",
    durTableSize: "~48 有效条目 (理论上 64B，索引 48-63 含重叠数据如 85 A8 FF)",
    desc: "音符持续帧数表。$83F4: AND #$3F → 查 $8725,X。每个条目 1 字节(帧数)。",
    note: "索引 0-47 有效，48+ 含 $870D 频率表尾和后续数据重叠。",
  },

  // ── 音效指针表 ($8BDA-$8BFF) ──
  soundEffectMap: {
    bankAddr: "$8BDA",
    asmRef: "ASM $8349: LDA $8BDA,Y / LDA $8BDB,Y → 2 级间接查表",
    format: "音效ID → 2 字节指针 → 通道初始化列表。每个 entry 2B (lo, hi)，无 padding。",
    terminator: "payload $00 $FF → ptr=$FF00 为表结束哨兵。",
    totalEntries: "31 个有效音效条目 ($8BDA-$8BFD, 含 $FF00 哨兵)。",
    entries: [
      { seId: 0x01, desc: "静音(8ch)", basePtr: "$8E42", bank: "12" },
      { seId: 0x02, desc: "静音(4ch)", basePtr: "$8E5B", bank: "12" },
      { seId: 0x03, desc: "ch0:$8E71 ch1:$8E71 ch3:$8E72", basePtr: "$8E68", bank: "12" },
      { seId: 0x04, desc: "ch0:$8E92 ch1:$8E92 ch3:$8E93", basePtr: "$8E89", bank: "12" },
      { seId: 0x05, desc: "ch0:$8ED8 ch1:$8ED8 ch3:$8ED9", basePtr: "$8ECF", bank: "12" },
      { seId: 0x06, desc: "ch0:$8FB6 ch1:$8FB6 ch3:$8FB7", basePtr: "$8FAD", bank: "12" },
      { seId: 0x07, desc: "ch0:$8F1D ch1:$8F47 ch3:$8F1E", basePtr: "$8F14", bank: "12" },
      { seId: 0x08, desc: "ch0:$90AD ch1:$90DD ch3:$90AE", basePtr: "$90A4", bank: "12" },
      { seId: 0x09, desc: "ch0:$923E ch1:$923F ch3:$92DC", basePtr: "$9235", bank: "12" },
      { seId: 0x0A, desc: "ch0:$96D5 ch1:$96D6 ch3:$9721", basePtr: "$96CC", bank: "12" },
      { seId: 0x0B, desc: "ch0:$9752 ch1:$9752 ch3:$9753", basePtr: "$9749", bank: "12" },
      { seId: 0x0C, desc: "ch0:$918A ch1:$918B ch3:$91A4", basePtr: "$9181", bank: "12" },
      { seId: 0x0D, desc: "ch0:$91F4 ch1:$9230 ch3:$91F3", basePtr: "$91EA", bank: "12" },
      { seId: 0x0E, desc: "ch0:$9126 ch1:$9127 ch3:$9157", basePtr: "$911D", bank: "12" },
      { seId: 0x0F, desc: "ch0:$9082 ch1:$9082 ch3:$9083", basePtr: "$9079", bank: "12" },
      { seId: 0x10, desc: "ch0:$8FA4 ch1:$8F89 ch3:$8F64", basePtr: "$8F5A", bank: "12" },
      { seId: 0x11, desc: "ch0:$8FC5 ch1:$9041 ch3:$9046", basePtr: "$8FBB", bank: "12" },
      { seId: 0x12, desc: "ch0:$9436 ch1:$9437 ch3:$9444", basePtr: "$942D", bank: "12" },
      { seId: 0x13, desc: "ch0:$946B ch1:$946C ch3:$9491", basePtr: "$9462", bank: "12" },
      { seId: 0x14, desc: "ch0:$94CF ch1:$94D0 ch3:$94F9", basePtr: "$94C6", bank: "12" },
      { seId: 0x15, desc: "ch0:$9DED ch1:$9DED ch3:$9DEE", basePtr: "$9DE4", bank: "12" },
      { seId: 0x16, desc: "ch0:$9E06 ch1:$9E06 ch3:$9E07", basePtr: "$9DFD", bank: "12" },
      { seId: 0x17, desc: "ch0:$9363 ch1:$93A7 ch3:$93EB", basePtr: "$9359", bank: "12" },
      { seId: 0x18, desc: "ch0:$96A2 ch1:$9678 ch3:$965D", basePtr: "$9653", bank: "12" },
      { seId: 0x19, desc: "ch0:$9E88 ch1:$9E88 ch3:$9E89", basePtr: "$9E7F", bank: "12" },
      { seId: 0x1A, desc: "ch0:$9780 ch1:$9781 ch3:$978F", basePtr: "$9777", bank: "0D/0E/0F" },
      { seId: 0x1B, desc: "ch0:$9B27 ch1:$9B28 ch3:$9B46", basePtr: "$9B1E", bank: "0D/0E/0F" },
      { seId: 0x1C, desc: "ch0:$9EDC ch1:$9EE9 ch3:$9EDD", basePtr: "$9ED3", bank: "0D/0E/0F" },
      { seId: 0x1D, desc: "ch0:$9AD7 ch1:$9AFB ch3:$9B04", basePtr: "$9ACD", bank: "0D/0E/0F" },
      { seId: 0x1E, desc: "ch0:$9B5A ch1:$9B7A ch3:$9B59", basePtr: "$9B50", bank: "0D/0E/0F" },
      { seId: 0x1F, desc: "ch0:$9BA6 ch1:$9BA7 ch3:$9BA6", basePtr: "$9B9D", bank: "0D/0E/0F" },
    ],
    note: "通道初始化列表格式: [ch(0-7), ptrLo, ptrHi] × N, 以 ≥$80 字节终止。$8349-init 扫描到终止符时写 $0F→$4015 并 RTS。",
    note2: "⚠ '死通道'机制: 多通道可指向同一 init list terminator($FF)，它们在 init 时被设置但不发声 — 因 $07AF(chType)=0 直到 $EC 命令激活。",
    note3: "⚠ $870D 频率表 vs $8725 时长表是两块独立数据，不可混淆。时长表索引 48-63 的值无效。",
  },

  // ── 音乐序列数据 ──
  musicTracks: {
    desc: "每首曲子由 3 个音轨组成(SQ1+SQ2+TRI)。通过 $00 $xx $yy 格式的 header 定义。$FF=null 表示该通道静音。",
    note: "数据从 $8BB9 开始。约 14 首音乐分布在 Bank 0D/0E/0F(通过 MMC3 R7 映射到 $A000)。音序中 $FE 标记行末，$FF 标记序列结束。",
  },

  // ── MMC3 Bank 映射 ──
  bankMapping: {
    desc: "音频引擎通过 MMC3 寄存器 7($8000/8001) 切换 $A000-$BFFF 窗口来访问不同音效 bank。",
    note: "写 $8000=$07 选 R7，再写 $8001=bank 号。ram_07FC 缓存上次值做去重优化。",
    banks: [
      { id: 0x0D, desc: "音效数据 Bank 0D — 音序和音符数据(第一组)" },
      { id: 0x0E, desc: "音效数据 Bank 0E — 音序和音符数据(第二组)" },
      { id: 0x0F, desc: "音效数据 Bank 0F — 音序和音符数据(第三组)" },
      { id: null, desc: "当前 bank 12 本身映射在 $8000-$9FFF" },
    ],
  },

  // ── 数据表清单 ──
  dataTables: [
    {
      bankAddr: "$8000-$8001",
      displayName: "MMC3 数据(2B — 非代码, 是 MMC3 Bank 选择窗口)",
      asmLine: 5,
      length: "2B",
      desc: "$A2 $05 是未映射的残留数据。$8002 才是第一个有效入口。",
    },
    {
      bankAddr: "$870D-$8724",
      displayName: "NES 频率周期表 (12 entries × 2B)",
      asmLine: 990,
      length: "24B",
      desc: "12 半音一个八度的 APU 11-bit 周期值 (lo | (hi&7)<<8)。如 $06AE → 周期 1710 → ~65Hz。",
      note: "警告: 与 $8725 时长表不相邻，$8725-$8724 之间无间隔。",
    },
    {
      bankAddr: "$8725-$8764",
      displayName: "音符时长表 (~48 有效条目, 64B 总大小)",
      asmLine: 995,
      length: "64B (前 ~48 有效)",
      desc: "按 AND #$3F 索引的帧数表。索引 0-47 有效($00 $01 $02...)，索引 48-63 含来自相邻数据区的无效值($85 $A8 $FF等)。",
      note: "$83F7: LDA $8725,X → STA ram_0707(duration counter)。X = noteByte & 0x3F。",
    },
    {
      bankAddr: "$82E4-$82F3",
      displayName: "频率修改跳转表",
      asmLine: 364,
      length: "16B (8 × 2B 指针)",
      desc: "8 项指针: $830E(不变), $832B(+1), $8340(+2), $832B(+1), $830E(不变), $82F4(+3), $8309(+6), $82F4(+3)。",
    },
    {
      bankAddr: "$8BDA-$8DFF",
      displayName: "音效指针表 + 通道初始化列表 + 音乐序列数据",
      asmLine: 2206,
      length: "~800B (指针表 + init lists)，其余为音乐序列",
      desc: "格式: 2B 指针表($8BDA-$8Cxx) → 指针指向的通道初始化列表[ch,ptrLo,ptrHi]×N+$FF → 列表后续是音乐序列数据(notes + commands)",
      note: "指针表: 每个 entry 2B (lo,hi)→$FF00 哨兵结束。通道列表末尾 $FF 后紧跟音乐序列数据。",
    },
  ],

  // ── 调用流程 ──
  callFlow: {
    desc: "音频引擎每帧执行流程",
    steps: [
      { step: 1, addr: "$8002", asmLine: 7, action: "遍历 ram_0700,X 请求队列(6槽): 非零→映射 bank→$8349 播放" },
      { step: 2, addr: "$8063", asmLine: 46, action: "遍历活跃通道 X=5→0: ram_0700,X=0→跳过; $31→特殊初始化; 其他→$8349" },
      { step: 3, addr: "$80BA", asmLine: 79, action: "设置 ram_00F0/F1=通道参数基址 → 检查 $0706 bitmask → 处理到期通道" },
      { step: 4, addr: "$80D7", asmLine: 93, action: "DEC $0707 剩余时长 → !=0 跳过; =0 → $83CB 读下一个音序字节" },
      { step: 5, addr: "$80E8", asmLine: 100, action: "DEC $0709 音符时长 → =0 → 读下个音符 → 调用 $81DB 音量处理" },
      { step: 6, addr: "$810C", asmLine: 120, action: "下一通道 (+$10 偏移, +$04 索引) → 8 通道全部处理后进入组处理" },
      { step: 7, addr: "$811D", asmLine: 129, action: "3 组 × 各通道: $816E 写 APU 寄存器 ($4000+)" },
      { step: 8, addr: "$816D", asmLine: 171, action: "RTS 返回 → 等待下一帧 NMI 再次调用" },
    ],
  },

  // ── 对外接口 ──
  externalInterface: {
    desc: "外部系统(Bank 00 NMI handler 等)如何调用音频引擎",
    methods: [
      {
        name: "播放音效/音乐",
        mechanism: "将音效ID(0x01-0x72)写入 ram_0700,X (X=0-5)。下一次 NMI 时 Bank 12 被映射到 $8000 窗口，$8002 入口处理请求。",
        example: "LDA #$31 → STA ram_0700 → 播放 Tecmo Theater 开场音效(ID=$31)。",
      },
      {
        name: "停止音效",
        mechanism: "将对应槽位写入 $00 停止该通道。",
      },
      {
        name: "切换音效 bank",
        mechanism: "自动: $32-$43→Bank $0D, $44-$50→Bank $0E, $51-$5B→Bank $0F。引擎自行通过 MMC3 R7 切换。",
      },
    ],
  },
};

export default data;
