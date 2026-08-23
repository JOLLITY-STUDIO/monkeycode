/**
 * CpuBus — 去 CPU 化后的内存/中断总线接口
 *
 * 原始 jsnes 中 PPU/PAPU/mapper 通过 `this.nes.cpu` 访问：
 *   - `cpu.mem` (Uint8Array 0x10000) 作为 CPU 内存总线
 *   - `cpu.requestIrq(type)` / `cpu.haltCycles(n)` 中断与周期管理
 *   - `cpu.nmiRaised` / `cpu.nmiRaisedAtCycle` / `cpu.nmiDotsRemainingInStep` NMI 边沿检测
 *   - `cpu.dataBus` / `cpu.instrBusCycles` / `cpu._cpuCycleBase` 数据总线与周期计数
 *
 * 去 CPU 化后，NES 不再持有 CPU 实例，改为持有 `bus: CpuBus`。
 * PPU/PAPU/mapper 通过 `this.nes.cpu`（别名 getter → bus）继续访问，
 * 由外部（H5 Tsubasa2 主板 / 测试驱动）注入满足 CpuBus 接口的对象。
 *
 * 最小注入示例 (H5 Tsubasa2 主板):
 *   new NES({ bus: { mem: new Uint8Array(0x10000), requestIrq() {}, haltCycles() {},
 *                   nmiRaised: false, nmiRaisedAtCycle: 0, nmiDotsRemainingInStep: 0,
 *                   dataBus: 0, instrBusCycles: 0, _cpuCycleBase: 0,
 *                   apuCatchupCycles: 0, cyclesToHalt: 0 } })
 */
export interface CpuBus {
    /** 64KB CPU 内存总线 (RAM/PRG/mapper 寄存器映射区) */
    mem: Uint8Array;
    /** 数据总线当前值 (用于 $4016 joy 读时 bit5 透传等) */
    dataBus: number;
    /** 指令总线周期累计 (PPU NMI 边沿检测用) */
    instrBusCycles: number;
    /** CPU 周期基数 (DMA halt 时累计) */
    _cpuCycleBase: number;
    /** APU 追赶周期数 (frame() 中每指令清零) */
    apuCatchupCycles: number;
    /** 待 halt 的周期数 (DMA 期间 >0) */
    cyclesToHalt: number;
    /** NMI 是否已请求 (PPU 在 VBlank 置位, frame() 循环检测) */
    nmiRaised: boolean;
    /** NMI 请求时的总线周期 (边沿检测用) */
    nmiRaisedAtCycle: number;
    /** 当前指令步进中剩余 NMI dots (边沿检测用) */
    nmiDotsRemainingInStep: number;
    /** 请求中断 (IRQ_NORMAL/RESET 等, mapper/PAPU 触发) */
    requestIrq(type: number): void;
    /** 暂停 N 个周期 (DMC DMA 等待) */
    haltCycles(n: number): void;
}
/** IRQ 类型常量 (与原 CPU 类保持一致, 供 bus.requestIrq 使用) */
export declare const IRQ_NORMAL = 0;
export declare const IRQ_NMI = 1;
export declare const IRQ_RESET = 2;
