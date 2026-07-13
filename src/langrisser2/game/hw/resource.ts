/**
 * 资源加载与解压系统
 *
 * 严格基于 execution-trace.md "资源加载系统完整分析"
 * 数据来源: ROM dump + ghidra-decompile.c + 机器码手工验证
 *
 * 核心函数对应关系:
 *   FUN_00009a0e (ROM 0x9A0E) → resolveResourcePointer()
 *   FUN_000099fa (ROM 0x99FA) → dispatchByType()
 *   FUN_000099b2 (ROM 0x99B2) → loadResource()
 *   FUN_00009dfe (ROM 0x9DFE) → decompressLZSS()  [type 3]
 *   FUN_00009a38 (ROM 0x9A38) → decompressNibbleRLE()  [type 1]
 *
 * @see execution-trace.md "资源加载系统完整分析"
 */

// ============================================================
// 常量
// ============================================================

/** 资源指针表基址 (ROM 0x000B0000) */
export const RESOURCE_POINTER_TABLE_BASE = 0x000b0000;

/** 解压目标缓冲区基址 (RAM 0xFF1000) */
export const DECOMPRESS_BUFFER_BASE = 0x00ff1000;

/** LZSS 滑动窗口基址 (RAM 0xFF0000) */
export const LZSS_WINDOW_BASE = 0x00ff0000;

/** LZSS 滑动窗口大小: 4KB */
export const LZSS_WINDOW_SIZE = 0x1000;

/** LZSS 窗口初始填充值: 0x20 (空格) */
export const LZSS_WINDOW_FILL = 0x20;

/** LZSS 窗口初始写入位置 */
export const LZSS_INITIAL_WINDOW_POS = 0x0fee;

/** 跳转表基址 (ROM 0x99F0) */
export const TYPE_DISPATCH_TABLE_BASE = 0x99f0;

/** 已知资源类型 */
export enum ResourceType {
  /** Type 0: 未知 (handler at 0x9A20) */
  TYPE_0 = 0,
  /** Type 1: Nibble RLE 解压 (handler at 0x9A38) */
  NIBBLE_RLE = 1,
  /** Type 2: 未知 (handler at 0x9C10) */
  TYPE_2 = 2,
  /** Type 3: LZSS 解压 (handler at 0x9DFE) */
  LZSS = 3,
  /** Type 4: 未知 (handler at 0x9AAA) */
  TYPE_4 = 4,
}

// ============================================================
// ROM 数据访问接口
// ============================================================

/**
 * ROM 字节读取接口
 * 由外部提供 (如从 ROM dump 文件加载的 Uint8Array)
 */
export interface RomReader {
  /** 读取指定偏移处的字节 */
  readByte(offset: number): number;
  /** 读取指定偏移处的 16-bit 大端 word */
  readWord(offset: number): number;
  /** 读取指定偏移处的 32-bit 大端 longword */
  readLong(offset: number): number;
  /** 读取字节序列 */
  readBytes(offset: number, length: number): Uint8Array;
}

/**
 * 基于 Uint8Array 的 ROM 读取器
 */
export class ArrayBufferRomReader implements RomReader {
  constructor(private readonly rom: Uint8Array) {}

  readByte(offset: number): number {
    return this.rom[offset] & 0xff;
  }

  readWord(offset: number): number {
    return ((this.rom[offset] & 0xff) << 8) | (this.rom[offset + 1] & 0xff);
  }

  readLong(offset: number): number {
    return (
      ((this.rom[offset] & 0xff) << 24) |
      ((this.rom[offset + 1] & 0xff) << 16) |
      ((this.rom[offset + 2] & 0xff) << 8) |
      (this.rom[offset + 3] & 0xff)
    );
  }

  readBytes(offset: number, length: number): Uint8Array {
    return this.rom.subarray(offset, offset + length);
  }
}

// ============================================================
// 资源指针表查找 (FUN_00009a0e)
// ============================================================

/**
 * 资源指针表查找
 *
 * 对应 ROM 0x9A0E: FUN_00009a0e
 * Ghidra C 反编译错误地认为此函数是 no-op，实际功能:
 *   1. 保存 D0.W (资源ID) 到栈
 *   2. A0 = 0x000B0000 (资源指针表基址)
 *   3. D0.W = ASR.W D2, D0 (用 D2 作为移位计数)
 *   4. A0 = *(long)(A0 + D0.W) (读取32位指针)
 *   5. 恢复 D0.W
 *
 * @param rom ROM 读取器
 * @param resourceId 资源 ID (已清除 DMA 标志, 如 0x0001)
 * @param originalD0 原始 D0 值 (含 DMA 标志, 如 0x8001)
 * @returns 资源数据在 ROM 中的偏移地址
 *
 * @see execution-trace.md "FUN_00009a0e — 资源指针表查找"
 */
export function resolveResourcePointer(
  rom: RomReader,
  resourceId: number,
  originalD0: number,
): number {
  // ASR.W D2, D0: 移位计数 = D2.W mod 64
  const shiftCount = (originalD0 & 0xffff) % 64;
  // 算术右移 (对正数等同于逻辑右移)
  const index = (resourceId & 0x7fff) >> shiftCount;

  // 读取指针表条目: A0 = *(long)(0x000B0000 + index * 4)
  // 注意: 68K 是 (A0, D0.W) 索引，D0.W 是字节偏移，这里 index 已经是值
  // 实际指针表每条目 4 字节，所以需要 *4
  const entryAddr = RESOURCE_POINTER_TABLE_BASE + index * 4;
  const pointer = rom.readLong(entryAddr);
  return pointer;
}

// ============================================================
// 类型分发跳转 (FUN_000099fa)
// ============================================================

/** 跳转表条目 (ROM 0x99F0) */
const TYPE_DISPATCH_TABLE: ReadonlyArray<number> = Object.freeze([
  0x0030, // type 0 → handler at 0x9A20
  0x0048, // type 1 → handler at 0x9A38 (Nibble RLE)
  0x0220, // type 2 → handler at 0x9C10
  0x040e, // type 3 → handler at 0x9DFE (LZSS)
  0x00ba, // type 4 → handler at 0x9AAA
]);

/**
 * 解压结果
 */
export interface DecompressResult {
  /** 解压后的数据 */
  data: Uint8Array;
  /** 实际解压字节数 */
  size: number;
  /** 资源类型 */
  type: number;
}

/**
 * 类型分发解压
 *
 * 对应 ROM 0x99FA: FUN_000099fa
 * 读取资源首字节作为类型码，通过跳转表调用对应 handler
 *
 * @param rom ROM 读取器
 * @param resourceAddr 资源数据起始地址 (类型码所在字节)
 * @returns 解压结果
 *
 * @see execution-trace.md "FUN_000099fa — 类型分发跳转"
 */
export function dispatchByType(
  rom: RomReader,
  resourceAddr: number,
): DecompressResult {
  // 读取类型码 (首字节)
  const typeCode = rom.readByte(resourceAddr);

  if (typeCode === ResourceType.LZSS) {
    return decompressLZSS(rom, resourceAddr);
  } else if (typeCode === ResourceType.NIBBLE_RLE) {
    return decompressNibbleRLE(rom, resourceAddr);
  } else if (typeCode === ResourceType.TYPE_2) {
    return decompressType2(rom, resourceAddr);
  } else {
    throw new Error(
      `未实现的资源类型: ${typeCode} (0x${typeCode.toString(16)}) at 0x${resourceAddr.toString(16)}`,
    );
  }
}

// ============================================================
// Type 3: LZSS 解压器 (FUN_00009dfe)
// ============================================================

/**
 * LZSS 滑动窗口解压
 *
 * 对应 ROM 0x9DFE: FUN_00009dfe
 *
 * 算法参数:
 *   窗口大小: 4KB (0x1000)
 *   窗口初始化: 全 0x20
 *   偏移编码: 12-bit (0x000-0xFFF)
 *   长度编码: 4-bit + 2 = 2-17 字节
 *
 * 资源数据格式:
 *   byte[0]:   类型码 (0x03)
 *   byte[1-2]: 解压后大小 (16-bit big-endian)
 *   byte[3+]:  压缩数据 (LZSS bit-packed)
 *
 * @param rom ROM 读取器
 * @param resourceAddr 资源数据起始地址
 * @returns 解压结果
 *
 * @see execution-trace.md "Type 3: LZSS 解压器 (FUN_00009dfe)"
 */
export function decompressLZSS(
  rom: RomReader,
  resourceAddr: number,
): DecompressResult {
  // 1. 读取头部
  // A0 在 FUN_000099fa 中已被递增 (跳过类型码)
  // 但 handler 内部 A0 仍指向类型码之后 (因为 A0 在 JSR 时已 +1)
  // 实际: handler 读取 *(short*)A0 作为大小, A0+2 作为压缩数据
  // 由于我们传入的是 resourceAddr (类型码地址), 数据从 +1 开始
  const headerAddr = resourceAddr + 1; // 跳过类型码
  const decompressedSize = rom.readWord(headerAddr);
  const compressedDataStart = resourceAddr + 3; // 类型码(1) + 大小(2)

  // 2. 初始化滑动窗口 (4KB, 填充 0x20)
  const window = new Uint8Array(LZSS_WINDOW_SIZE).fill(LZSS_WINDOW_FILL);

  // 3. 初始化变量
  let windowPos = LZSS_INITIAL_WINDOW_POS; // 0x0FEE
  let remaining = decompressedSize; // 剩余输出字节数

  // 输出缓冲区 (解压后的字节)
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;

  // 4. 主解压循环
  let compressedPos = compressedDataStart;

  while (remaining > 0) {
    // 读取 flag 字节
    const flagByte = rom.readByte(compressedPos++);

    // 处理 8 个 bit (LSB first)
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;

      if (isLiteral) {
        // bit=1: 字面量
        const byte = rom.readByte(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        // bit=0: LZ77 匹配
        const b1 = rom.readByte(compressedPos++);
        const b2 = rom.readByte(compressedPos++);
        let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff; // 12-bit offset
        const matchLength = (b2 & 0x0f) + 2; // 2-17 bytes

        // 逐字节复制匹配数据
        for (let i = 0; i < matchLength && remaining > 0; i++) {
          const byte = window[matchOffset];
          window[windowPos] = byte;
          output[outputPos++] = byte;
          matchOffset = (matchOffset + 1) & 0xfff;
          windowPos = (windowPos + 1) & 0xfff;
          remaining--;
        }
      }
    }
  }

  return {
    data: output,
    size: decompressedSize,
    type: ResourceType.LZSS,
  };
}

// ============================================================
// Type 1: Nibble RLE 解压器 (FUN_00009a38)
// ============================================================

/**
 * Nibble RLE 解压
 *
 * 对应 ROM 0x9A38: FUN_00009a38
 *
 * 算法原理:
 *   1. 交替读取高/低 nibble (先高后低, 每字节两个 nibble)
 *   2. 若当前 nibble == 上一个 nibble, 则进入 RLE 模式
 *   3. RLE 模式: 下一个 nibble 是额外重复次数 (0-15)
 *      总共重复 count+1 次 (加上已输出的那个 = count+2 个相同 nibble)
 *   4. 每 4 个 nibble 打包成一个 16-bit word (big-endian) 输出
 *   5. 初始 bVar7=0x7F (哨兵值, 确保第一个 nibble 不会触发 RLE)
 *
 * 资源数据格式:
 *   byte[0]:   类型码 (0x01)
 *   byte[1-2]: 解压后总字节数 (16-bit big-endian)
 *   byte[3+]:  压缩 nibble 数据
 *
 * 寄存器映射 (68K → JS):
 *   in_A0   → 资源数据起始地址 (ushort*)
 *   in_A1   → 输出缓冲区地址 (short*)
 *   D5      → 当前 word 打包寄存器
 *   bVar3   → nibble 切换标志 (false=高 nibble, true=低 nibble)
 *   bVar7   → 上一个 nibble 值 (RLE 比较基准, 初始 0x7F)
 *   sVar6   → nibble 计数 (3→-1, 每 4 个输出一个 word)
 *   uVar10  → 已输出字节数
 *   uVar5   → 目标总字节数 (= *in_A0)
 *
 * @param rom ROM 读取器
 * @param resourceAddr 资源数据起始地址 (类型码所在字节)
 * @returns 解压结果
 *
 * @see execution-trace.md "Type 1: Nibble RLE 解压器 (FUN_00009a38)"
 */
export function decompressNibbleRLE(
  rom: RomReader,
  resourceAddr: number,
): DecompressResult {
  // 1. 读取头部
  // in_A0 指向类型码之后的第一个 word (大小字段)
  const sizeAddr = resourceAddr + 1; // 跳过类型码
  const totalBytes = rom.readWord(sizeAddr); // uVar5 = *in_A0 (解压后总字节数)

  // 压缩数据起始 (in_A0 + 1 = ushort* 指针 +1 = +2 字节)
  // 即 sizeAddr + 2 = resourceAddr + 3
  const compressedStart = sizeAddr + 2;

  // 2. 初始化变量
  let d5 = 0; // 当前 word 打包值 (unaff_D5w, 初始值不影响最终结果)
  let bVar3 = false; // nibble 切换标志 (false=高 nibble 待读)
  let bVar7 = 0x7f; // 上一个 nibble 值 (初始为哨兵 0x7F)
  let sVar6 = 3; // nibble 计数 (3→2→1→0→-1, 共 4 个 nibble 输出一个 word)
  let outputBytes = 0; // uVar10: 已输出字节数

  // 输出缓冲区
  const output = new Uint8Array(totalBytes);
  let outputPos = 0;

  // puVar12 是 byte* 指针 (C 代码中是 ushort*, 但操作是 byte 级的)
  // 初始值 = in_A0 + 1 = sizeAddr + 2 = compressedStart
  let puVar12 = compressedStart;

  // 辅助: 打包一个 nibble 到 D5, 若填满则输出 word
  function packNibble(nibble: number): void {
    const shifted = (d5 << 4) & 0xffff;
    d5 = (shifted | (nibble & 0x0f)) & 0xffff;
    sVar6--;
    if (sVar6 === -1) {
      sVar6 = 3;
      output[outputPos++] = (d5 >> 8) & 0xff;
      output[outputPos++] = d5 & 0xff;
      outputBytes += 2;
    }
  }

  // 3. 主解压循环
  while (outputBytes < totalBytes) {
    // ---- 读取当前 nibble (bVar9) ----
    const bVar2: boolean = !bVar3; // bVar2 = bVar3 ^ 1
    let bVar9: number;    // 当前 nibble 值
    let puVar11: number;  // 临时指针

    if (bVar2) {
      // 高 nibble, 指针不变
      bVar9 = (rom.readByte(puVar12) >> 4) & 0x0f;
      puVar11 = puVar12;
    } else {
      // 低 nibble, 指针前进 1 字节
      puVar11 = puVar12 + 1;
      bVar9 = rom.readByte(puVar12) & 0x0f;
    }
    puVar12 = puVar11;

    if (bVar9 === bVar7) {
      // ---- RLE 模式: 当前 nibble == 上一个 nibble ----
      // 读取 count nibble (注意: 用 bVar3 判断, 不是 bVar2)
      let uVar8: number; // count

      if (bVar3) {
        // 高 nibble
        uVar8 = (rom.readByte(puVar11) >> 4) & 0x0f;
      } else {
        // 低 nibble, 指针前进 1 字节
        puVar12 = puVar11 + 1;
        uVar8 = rom.readByte(puVar11) & 0x0f;
      }

      // 重复 bVar7 共 uVar8 + 1 次 (从 count 递减到 0xFFFF)
      // uVar8 是 16 位无符号数, 减到 0 后再减变为 0xFFFF 退出
      do {
        packNibble(bVar7);
        uVar8 = (uVar8 - 1) & 0xffff;
      } while (uVar8 !== 0xffff && outputBytes < totalBytes);

      // 注意: RLE 分支不更新 bVar3 和 bVar7
      // bVar3 保持不变, bVar7 仍是原来的值
    } else {
      // ---- 普通模式 ----
      packNibble(bVar9);
      bVar3 = bVar2; // 更新切换标志
      bVar7 = bVar9; // 更新"上一个 nibble"
    }
  }

  return {
    data: output,
    size: totalBytes,
    type: ResourceType.NIBBLE_RLE,
  };
}

// ============================================================
// 通用资源加载 (FUN_000099b2)
// ============================================================

/**
 * 通用资源加载结果
 */
export interface LoadResourceResult {
  /** 解压后的数据 */
  data: Uint8Array;
  /** 数据大小 (字节) */
  size: number;
  /** 是否执行了 DMA (基于 D0 高位) */
  dmaEnabled: boolean;
}

/**
 * 通用资源加载 + DMA 提交
 *
 * 对应 ROM 0x99B2: FUN_000099b2
 *
 * 调用约定:
 *   输入: D0 = 资源ID | 0x8000 (DMA标志), A1 = VDP目标地址
 *   输出: 数据解压到 0xFF1000, 若DMA标志置位则返回DMA信息
 *
 * @param rom ROM 读取器
 * @param d0 资源ID (含 DMA 标志, 如 0x8001)
 * @returns 解压结果和 DMA 标志
 *
 * @see execution-trace.md "FUN_000099b2 — 通用资源加载+DMA提交"
 */
export function loadResource(
  rom: RomReader,
  d0: number,
): LoadResourceResult {
  // D2 = D0 (保存原始值)
  const d2 = d0;

  // 检查 DMA 标志 (D0 高位)
  const dmaEnabled = (d0 & 0x8000) !== 0;

  // D0.W &= 0x7FFF (清除 DMA 标志)
  const resourceId = d0 & 0x7fff;

  // FUN_00009a0e: 查找资源指针
  const resourceAddr = resolveResourcePointer(rom, resourceId, d2);

  // FUN_000099fa: 类型分发解压
  const result = dispatchByType(rom, resourceAddr);

  return {
    data: result.data,
    size: result.size,
    dmaEnabled,
  };
}

// ============================================================
// Type 2: 位平面压缩解压器 (FUN_00009c10 + FUN_00009cfc)
// ============================================================

/**
 * Type 2 位平面压缩解压
 *
 * 对应 ROM:
 *   0x9C10: FUN_00009c10 (主入口, 读取 planes 并分发)
 *   0x9CFC: FUN_00009cfc (压缩分支, RLE + 位平面重组)
 *
 * 数据格式 (压缩分支, byte[1] bit7 = 1):
 *   byte[0]:    类型码 (0x02)
 *   byte[1]:    bit7 = 压缩标志 (1=压缩), bit6-0 = planes 参数
 *   byte[2..9]: 查找表 (8 字节, 拆分成 16 个 nibble)
 *   byte[10..11]: size (16-bit big-endian, 控制码区大小)
 *   byte[12..12+size-1]: 控制码区 (RLE 控制位)
 *   byte[12+size..]: 像素数据区 (bit=1 时从这里复制)
 *
 * 数据格式 (未压缩分支, byte[1] bit7 = 0):
 *   byte[0]:    类型码 (0x02)
 *   byte[1]:    bit7 = 0, bit6-0 = planes 参数
 *   byte[2..3]: size (16-bit big-endian)
 *   byte[4..4+size-1]: 数据区 (RLE 控制码 + 像素数据)
 *
 * 算法 (压缩分支):
 *   1. planes = byte[1] & 0x7F
 *   2. planeCount = planes; if (planeCount != 2) planeCount ^= 5
 *      (planes=1 → planeCount=4, planes=2 → planeCount=2, planes=3 → planeCount=6)
 *   3. RLE: planeCount 组控制码, 每组 1 字节 8 bit
 *      bit=1: 从像素数据区复制 planes 字节
 *      bit=0: 填零 planes 字节
 *      总输出/tile = planeCount × 8 × planes 字节
 *   4. 位平面重组: 4 个位平面的 MSB 组合成 4-bit 索引, 查表得到像素值
 *      索引位顺序: bit3=plane3, bit1=plane1, bit2=plane2, bit0=plane0
 *      4 像素打包成 1 short (16 bit)
 *   5. 返回 size × planes × 8
 *
 * @param rom ROM 读取器
 * @param resourceAddr 资源数据起始地址
 * @returns 解压结果
 *
 * @see execution-trace.md "Type 2: 位平面压缩解压器"
 */
export function decompressType2(
  rom: RomReader,
  resourceAddr: number,
): DecompressResult {
  // byte[1]: planes 参数和压缩标志
  // 机器码 0x9C1E: MOVE.B (A0)+, D0 (读取 byte[1], A0 递增)
  // 机器码 0x9C22: AND.W #$007F, D0 (planes = byte[1] & 0x7F, 无 +1)
  const b1 = rom.readByte(resourceAddr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f; // 修复: 直接 & 0x7F, 不 +1

  if (!compressed) {
    // === 未压缩分支 (FUN_00009c10 else) ===
    // pbVar27 = in_A0 + 3 = byte[4]
    // sVar25 = *(short*)(in_A0 + 1) * uVar24 = word[2-3] * planes
    // 返回 sVar25 * 8
    const size = rom.readWord(resourceAddr + 2);
    const outputSize = size * planes * 8;

    // 未压缩分支也有 RLE + 位平面重组, 但无查找表
    // TODO: 完整实现未压缩分支的位平面重组
    // 当前: 简化处理, 直接读取
    const data = rom.readBytes(resourceAddr + 4, outputSize);
    return { data: new Uint8Array(data), size: outputSize, type: ResourceType.TYPE_2 };
  }

  // === 压缩分支 (FUN_00009cfc) ===
  // A0 在 FUN_00009c10 中已递增 (10 18: MOVE.B (A0)+, D0)
  // 所以 FUN_00009cfc 的 A0 指向 byte[2]

  // 1. 读取查找表 (16 nibbles, 从 byte[2..9])
  // 机器码 0x9CFC: LEA $00FF0FF0, A5; MOVE.W #7, D5; 循环 8 次
  // 每次: 读取 *A0, 拆分高低 nibble, A0++
  const lookupTable = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = rom.readByte(resourceAddr + 2 + i);
    lookupTable[i * 2] = (b >> 4) & 0x0f;     // 高 nibble
    lookupTable[i * 2 + 1] = b & 0x0f;         // 低 nibble
  }

  // 2. 读取 size (byte[10..11])
  // Ghidra: sVar9 = *(short*)((int)psVar14 + 1) where psVar14 = byte[2]
  // 即 sVar9 = *(short*)(byte[2] + 1) = *(short*)byte[10] ... 实际是 byte[10..11]
  // 循环结束后 psVar14 = byte[9] (最后一次迭代), +1 = byte[10]
  const size = rom.readWord(resourceAddr + 10);

  // 3. 数据区指针
  // pbVar13 = byte[12] (控制码区起始)
  // pbVar16 = byte[12] + size (控制码区结束 = 像素数据区起始)
  const ctrlStart = resourceAddr + 12;
  const pixelStart = ctrlStart + size;

  // 4. planeCount 变换
  // Ghidra: if (in_D0w != 2) in_D0w = in_D0w ^ 5
  // planes=1 → planeCount=4, planes=2 → planeCount=2, planes=3 → planeCount=6
  let planeCount = planes;
  if (planeCount !== 2) {
    planeCount = planeCount ^ 5;
  }

  // 5. 返回值 = sVar9 * 8 = size * planes * 8
  // Ghidra: return sVar9 * 8 where sVar9 = size * planes
  const outputSize = size * planes * 8;

  // 6. RLE 解压 + 位平面重组
  // 每 tile: planeCount 个控制字节 → planeCount × 8 × planes 字节工作数据 → 32 字节输出
  const bytesPerTile = planeCount * 8 * planes;
  const tileCount = Math.floor(size / planeCount);
  const output = new Uint8Array(outputSize);

  let ctrlPos = ctrlStart;
  let pixelPos = pixelStart;

  for (let tile = 0; tile < tileCount; tile++) {
    // === RLE 解压 (1 tile) ===
    // 工作缓冲区: planeCount × 8 × planes 字节
    // 外层 planeCount 次, 每次读 1 控制字节, 8 bit
    // bit=1: 从像素数据区复制 planes 字节
    // bit=0: 填零 planes 字节
    const workBuf = new Uint8Array(bytesPerTile);
    let workPos = 0;

    for (let plane = 0; plane < planeCount; plane++) {
      const ctrlByte = rom.readByte(ctrlPos++);
      for (let bit = 7; bit >= 0; bit--) {
        const isData = (ctrlByte >> bit) & 1;
        if (isData) {
          // bit=1: 从像素数据区复制 planes 字节
          for (let p = 0; p < planes; p++) {
            workBuf[workPos++] = rom.readByte(pixelPos++);
          }
        } else {
          // bit=0: 填零 planes 字节
          for (let p = 0; p < planes; p++) {
            workBuf[workPos++] = 0;
          }
        }
      }
    }

    // === 位平面重组 (1 tile → 32 字节) ===
    // Ghidra FUN_00009cfc 位平面重组:
    // - workBuf 作为 16 个 short (32 字节)
    // - 位平面 0: short[0..3]  (byte offset 0-7)
    // - 位平面 1: short[4..7]  (byte offset 8-15)
    // - 位平面 2: short[8..11] (byte offset 16-23)
    // - 位平面 3: short[12..15] (byte offset 24-31)
    // - 外层 4 次 (psVar14 += 1, 2 字节), 内层 4 次 (输出 1 short)
    // - 每次内层: 4 像素 (4 × 4-bit 索引), 打包成 1 short
    // - 索引 = (bit3 << 3) | (bit1 << 2) | (bit2 << 1) | bit0
    //   bit0 = MSB of 位平面 0
    //   bit1 = MSB of 位平面 1
    //   bit2 = MSB of 位平面 2
    //   bit3 = MSB of 位平面 3
    const tileOutput = new Uint8Array(32);
    let outWordPos = 0;

    // 读取 4 个位平面的 short (16-bit big-endian, unsigned)
    // 位平面数 = planeCount (通常 4 for planes=1)
    const numPlanes = Math.min(planeCount, 4); // 最多 4 个位平面

    for (let outer = 0; outer < 4; outer++) {
      // 读取 4 个位平面的 short
      // 位平面 p: short[outer + p*4] = workBuf[(outer + p*4) * 2]
      const planeShorts: number[] = [];
      for (let p = 0; p < numPlanes; p++) {
        const byteOffset = (outer + p * 4) * 2;
        const hi = workBuf[byteOffset] || 0;
        const lo = workBuf[byteOffset + 1] || 0;
        planeShorts.push((hi << 8) | lo);
      }

      for (let inner = 0; inner < 4; inner++) {
        // 4 像素
        let pixels = 0;

        for (let pix = 0; pix < 4; pix++) {
          // 4-bit 索引: bit3=plane3, bit1=plane1, bit2=plane2, bit0=plane0
          // 从 MSB 读取 (bit 15)
          const bit0 = numPlanes > 0 ? ((planeShorts[0] & 0x8000) ? 1 : 0) : 0;
          const bit1 = numPlanes > 1 ? ((planeShorts[1] & 0x8000) ? 1 : 0) : 0;
          const bit2 = numPlanes > 2 ? ((planeShorts[2] & 0x8000) ? 1 : 0) : 0;
          const bit3 = numPlanes > 3 ? ((planeShorts[3] & 0x8000) ? 1 : 0) : 0;

          const index = (bit3 << 3) | (bit1 << 2) | (bit2 << 1) | bit0;
          const pixel = lookupTable[index];

          pixels = (pixels << 4) | pixel;

          // 左移 1 位 (消耗 MSB)
          for (let p = 0; p < numPlanes; p++) {
            planeShorts[p] = (planeShorts[p] << 1) & 0xffff;
          }
        }

        // 打包成 short (big-endian)
        tileOutput[outWordPos * 2] = (pixels >> 8) & 0xff;
        tileOutput[outWordPos * 2 + 1] = pixels & 0xff;
        outWordPos++;
      }
    }

    // 复制到输出
    output.set(tileOutput, tile * 32);
  }

  return { data: output, size: outputSize, type: ResourceType.TYPE_2 };
}
