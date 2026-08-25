关键发现：$99F0-$9A30 是渐显循环（r4A/r4B 从 0x0F 每帧递减，每步 $9A71 同时写调色板 + 精灵→NT 缓冲），f13 时正在执行 $9A7E 的精灵→NT 缓冲装载。ROM 是 fade 与 NT 加载并行的，没有 H5 那种先 fade 16 帧再 OamDrift 48 帧的编造阶段。NT0 全空是因为 H5 的 NT 加载（LoadLogoNt 阶段）要 f65 才开始.

根因找到：loadChrSlot 内 b = (bank1k & 0xff) % 128——H5 CHR 数据只有 128 个 bank，emu 的 bank 252 被 mod 成 124（font tile bank），所以 sprite 图案错。查 buildChrRom() 数据源确认 CHR 大小。


核心机制已明确：bank0 87F8从指针表(87F8从指针表(4D) 读取 2 字节 → $ED(场景索引) + $EC，然后 JSR $A212(分发器)。返回值 2/3 通过 A→Y→8879返回。

关键确认：
8879=‘ADC8879=‘ADC4D`（返回值就是指针推进量）。场景返回 2 = 指针前进 2（普通），scene1 返回 3 = 前进 3。主循环在 84E7。 