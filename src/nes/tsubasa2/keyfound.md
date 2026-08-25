关键发现：$99F0-$9A30 是渐显循环（r4A/r4B 从 0x0F 每帧递减，每步 $9A71 同时写调色板 + 精灵→NT 缓冲），f13 时正在执行 $9A7E 的精灵→NT 缓冲装载。ROM 是 fade 与 NT 加载并行的，没有 H5 那种先 fade 16 帧再 OamDrift 48 帧的编造阶段。NT0 全空是因为 H5 的 NT 加载（LoadLogoNt 阶段）要 f65 才开始.

根因找到：loadChrSlot 内 b = (bank1k & 0xff) % 128——H5 CHR 数据只有 128 个 bank，emu 的 bank 252 被 mod 成 124（font tile bank），所以 sprite 图案错。查 buildChrRom() 数据源确认 CHR 大小。