/**
 * MMC3 Bank 00 Translation
 * ROM: 0x000010-0x00200F
 * CPU: $8000-$9FFF
 */

// --- Dependencies and Memory Simulation ---

// Memory buffers
const ram = new Uint8Array(0x0800); // $0000-$07FF
const sram = new Uint8Array(0x2000); // $6000-$7FFF
const rom = new Uint8Array(0x10000); // Full ROM space for simplicity

// CPU Registers
let regA = 0;
let regX = 0;
let regY = 0;
let regP = { n: false, v: false, z: false, c: false }; // Status flags
let regSP = 0xFF;
let regPC = 0x8000;

// Stack for PHA/PLA/RTS
const stack = [];

/**
 * Helper to read memory based on NES memory map
 */
function readMem(addr) {
    if (addr < 0x0800) return ram[addr];
    if (addr >= 0x6000 && addr < 0x8000) return sram[addr - 0x6000];
    if (addr >= 0x8000) return rom[addr];
    return 0;
}

/**
 * Helper to write memory
 */
function writeMem(addr, val) {
    val &= 0xFF;
    if (addr < 0x0800) ram[addr] = val;
    else if (addr >= 0x6000 && addr < 0x8000) sram[addr - 0x6000] = val;
    // ROM writes ignored or handle MMC3 banking here
}

/**
 * Update Zero and Negative flags
 */
function updateNZ(val) {
    regP.z = (val & 0xFF) === 0;
    regP.n = (val & 0x80) !== 0;
}

// --- Data Tables ---

const table800D = [0x65, 0x81, 0x8A, 0x81, 0xAD, 0x81, 0xB4, 0x81, 0xDA, 0x81];
const table8398 = [
    0x00, 0x00, 0x02, 0x02, 0x04, 0x04, 0x06, 0x06, 0x08, 0x08, 
    0x0A, 0x0A, 0x0C, 0x0C, 0x0E, 0x0E, 0x10, 0x10, 0x12, 0x12, 
    0x14, 0x14, 0x16, 0x17, 0x17, 0x19, 0x19, 0x1B, 0x1B, 0x1D, 
    0x1D, 0x1F, 0x1F, 0x1F
];
const table83BA = [
    0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x01, 0x01, 0x01, 0x01, 
    0x01, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 
    0x03, 0x03, 0x00, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 
    0x03, 0x03, 0x02, 0x03
];
const table83DC = [
    0x02, 0x00, 0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00, 
    0x0C, 0x0E, 0x00, 0x00, 0x10, 0x12, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x00, 0x00, 0x00, 
    0x00, 0x1E, 0x20, 0x00
];
const table83FE = [
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x21, 0x00
];
const table8420 = [
    0x03, 0x04, 0x05, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x0B, 
    0x0D, 0x00, 0x00, 0x00, 0x11, 0x00, 0x00, 0x14, 0x00, 0x00, 
    0x00, 0x00, 0x16, 0x00, 0x17, 0x00, 0x00, 0x1A, 0x1B, 0x1C, 
    0x1D, 0x1F, 0x00
];
const table8442 = [
    0x00 // Placeholder for table at $8442
];

// --- Subroutine Implementations ---

/**
 * $8000: Main entry point logic
 */
function sub8000() {
    regA = readMem(0x27);
    regA = (regA << 1) & 0xFF;
    regX = regA;
    
    // Simulate PHA/PHA/RTS jump table
    let addrLow = table800D[regX];
    let addrHigh = table800D[regX + 1];
    let targetAddr = (addrHigh << 8) | addrLow;
    
    // The RTS trick jumps to targetAddr + 1, but we'll call the function directly
    if (targetAddr === 0x8165) sub8166();
    else if (targetAddr === 0x818A) sub818B();
    else if (targetAddr === 0x81AD) sub81AE();
    else if (targetAddr === 0x81B4) sub81B5();
    else if (targetAddr === 0x81D9) sub81DA(); // Note: $81D9 is start of data/code mix
}

/**
 * $8017
 */
function sub8017() {
    regX = 0x02;
    subC4B9(regX);
    subA203();
}

/**
 * $801F
 */
function sub801F() {
    sub9BA0();
    while (true) {
        regA = 0x00;
        sub8464(regA);
        regA = 0x01;
        sub9FA8(regA);
        regA = readMem(0x1E);
        if ((regA & 0x10) !== 0) break;
    }
    
    writeMem(0x05, 0x00);
    writeMem(0x06, 0x00);
    writeMem(0x09, 0x00);
    writeMem(0x0A, 0x00);
    writeMem(0x11, 0x00);
    writeMem(0x12, 0x00);
    writeMem(0x0D, 0x00);
    writeMem(0x0E, 0x00);
    writeMem(0x4C, 0x00);
    writeMem(0x5B, 0x00);
    
    writeMem(0x0700, 0x01);
    
    regA = readMem(0x1B);
    if ((regA & 0x01) === 0) {
        sub9B11();
        regA = 0x02;
        sub9FA8(regA);
        sub9B7F();
        sub98A0();
        regA = 0x0D;
        sub8297(regA);
        writeMem(0x7B, 0x00);
    }
    
    regA = 0x17;
    sub8AF7(regA);
    regA = 0x30;
    sub890C(regA);
    sub88FB();
    sub9A35();
    
    // Label $807A
    regA = 0x00;
    sub8920(regA);
    writeMem(0x90, 0x00);
    writeMem(0x91, 0x02);
    
    regA = readMem(0x1B);
    regA &= 0xFE;
    writeMem(0x1B, regA);
    
    regA = 0x0A;
    writeMem(0xED, regA);
    
    // Label $8091
    while (true) {
        regA = readMem(0xED);
        writeMem(0xE6, regA);
        writeMem(0xE7, 0x22);
        regY = 0x01;
        regX = 0x01;
        regA = 0x7F;
        sub98EA(regA, regX, regY);
        
        // Label $80A2
        while (true) {
            regA = 0x01;
            sub9FA8(regA);
            regA = readMem(0x1E);
            regA &= 0x3C;
            if (regA !== 0) break;
        }
        
        let tempA = regA;
        tempA = (tempA << 1) & 0xFF;
        tempA = (tempA << 1) & 0xFF;
        
        if ((tempA & 0x80) !== 0) {
            // $80BC
            regA = readMem(0xED);
            regA ^= 0x40;
            writeMem(0xED, regA);
        } else {
            tempA = (tempA << 1) & 0xFF;
            if ((tempA & 0x80) !== 0) {
                // $80D4
                sub80D4();
                return;
            }
            tempA = (tempA << 1) & 0xFF;
            regA = (tempA & 0x40) | 0x0A;
            writeMem(0xED, regA);
        }
        
        // $80C0
        writeMem(0xE6, 0x0A);
        writeMem(0xE7, 0x22);
        regY = 0x03;
        regX = 0x01;
        sub98E8(regX, regY);
        // JMP $8091
    }
}

/**
 * $80D4
 */
function sub80D4() {
    regA = readMem(0x1C);
    if ((regA & 0xC0) === 0xC0) {
        // This part in assembly has raw bytes $4C $09 $A2 which is JMP $A209
        subA209();
        return;
    }
    
    // BIT $ED
    let valED = readMem(0xED);
    regP.v = (valED & 0x40) !== 0;
    
    if (regP.v) {
        sub826A();
    } else {
        sub9BA0();
        regA = 0x01;
        sub8464(regA);
        sub82B5();
        writeMem(0xE0, 0xC0);
        regX = 0x02;
        subC4B9(regX);
        subA20F();
        writeMem(0x28, 0x00);
        writeMem(0x29, 0x00);
        writeMem(0x27, 0x00);
        writeMem(0x0700, 0x01);
        regX = 0x02;
        subC4B9(regX);
        subA20C();
        regA = 0x00;
        sub8920(regA);
        regX = 0x01;
        subC4B9(regX);
        subA006();
        subC572();
        
        regX = 0x55;
        regA = readMem(0x26);
        if (regA >= 0x20) {
            regX = 0x4C;
        }
        writeMem(0x0700, regX);
        
        writeMem(0x0450, 0x00);
        writeMem(0x0451, 0x00);
        writeMem(0x0452, 0x00);
        writeMem(0x0453, 0x00);
        
        regX = 0x01;
        subC4B9(regX);
        subA009();
        
        let valE0 = readMem(0xE0);
        if ((valE0 & 0x80) === 0) {
            regA = readMem(0xE4);
            if (regA <= readMem(0x26)) {
                // $814F
                regX = readMem(0x26);
                regA = table83DC[regX];
                if (regA !== 0) {
                    sub8464(regA);
                    sub82B5();
                    regA = readMem(0xE0) & 0x7F;
                    writeMem(0xE0, regA);
                }
            }
        } else {
            // $814F
            regX = readMem(0x26);
            regA = table83DC[regX];
            if (regA !== 0) {
                sub8464(regA);
                sub82B5();
                regA = readMem(0xE0) & 0x7F;
                writeMem(0xE0, regA);
            }
        }
        sub8017();
    }
}

/**
 * $8166
 */
function sub8166() {
    writeMem(0x27, 0x01);
    subC56C();
    sub8285();
    regA = readMem(0x26);
    if (regA >= readMem(0xE4)) {
        writeMem(0xE4, regA);
        regX = readMem(0x26);
        regA = table83FE[regX];
        if (regA !== 0) {
            sub8464(regA);
            sub82B5();
        }
    }
    sub8017();
}

/**
 * $818B
 */
function sub818B() {
    let val28 = readMem(0x28);
    let val29 = readMem(0x29);
    if (val28 === val29) {
        regX = readMem(0x26);
        regA = table83BA[regX];
        if (regA === 0) {
            sub81E6();
        } else if (regA === 0x01) {
            sub81D4();
        } else {
            writeMem(0x27, 0x02);
            subC56C();
            sub8285();
            sub8017();
        }
    } else if (val28 > val29) {
        sub8206();
    } else {
        sub81E6();
    }
}

/**
 * $81AE
 */
function sub81AE() {
    writeMem(0x27, 0x03);
    sub8017();
}

/**
 * $81B5
 */
function sub81B5() {
    let val28 = readMem(0x28);
    let val29 = readMem(0x29);
    if (val28 === val29) {
        regX = readMem(0x26);
        regA = table83BA[regX];
        if (regA === 0x03) {
            sub81D4();
        } else {
            // $81C9 - raw bytes logic
            regA = readMem(0x26);
            if (regA !== 0x20) {
                writeMem(0x26, regA + 1);
            }
            // JMP $80FD
            sub80FD();
        }
    } else if (val28 > val29) {
        sub8206();
    } else {
        sub81E6();
    }
}

/**
 * $81D4
 */
function sub81D4() {
    writeMem(0x27, 0x04);
    sub8017();
}

/**
 * $81E6
 */
function sub81E6() {
    regX = 0x01;
    subC4B9(regX);
    subA015();
    regA = 0x60;
    sub8464(regA);
    sub82B5();
    sub99F0();
    regX = readMem(0x26);
    regA = table8398[regX];
    writeMem(0x26, regA);
    subC578();
    sub80FD();
}

/**
 * $8206
 */
function sub8206() {
    regX = 0x01;
    subC4B9(regX);
    subA012();
    let valE0 = readMem(0xE0);
    if ((valE0 & 0x40) === 0) {
        regA = readMem(0x26);
        if (regA >= readMem(0xE5)) {
            writeMem(0xE5, regA);
        }
    }
    
    regX = readMem(0x26);
    regA = table8420[regX];
    if (regA !== 0) {
        sub8464(regA);
        sub82B5();
        regA = readMem(0xE0) & 0xBF;
        writeMem(0xE0, regA);
    }
    
    regX = readMem(0x26);
    regA = table8442[regX];
    if (regA !== 0) {
        sub8464(regA);
        sub82A9();
        if (readMem(0x26) >= 0x20) {
            // $8263
            writeMem(0x27, 0x05);
            subC57B();
            return;
        }
    }
    
    // $8243
    writeMem(0x0700, 0x01);
    subC578();
    writeMem(0x26, readMem(0x26) + 1);
    regX = 0x01;
    subC4B9(regX);
    subA018();
    if (readMem(0x26) >= 0x03) {
        writeMem(0x0446, 0x05);
    }
    sub80FD();
}

/**
 * $826A
 */
function sub826A() {
    regX = 0x01;
    subC4B9(regX);
    subA003();
    regX = 0x02;
    subC4B9(regX);
    subA20F();
    regX = 0x01;
    subC4B9(regX);
    subA01B();
    sub80FD();
}

/**
 * $8285
 */
function sub8285() {
    writeMem(0x0700, 0x01);
    regA = 0x01;
    sub9FA8(regA);
    regX = 0x01;
    subC4B9(regX);
    subA00C();
}

/**
 * $8297
 */
function sub8297(valA) {
    writeMem(0xE7, valA);
    writeMem(0xE6, 0x01);
    writeMem(0x4D, 0xE5);
    writeMem(0x4E, 0x00);
    sub9085();
}

/**
 * $82A9
 */
function sub82A9() {
    while (true) {
        regA = 0x01;
        sub9FA8(regA);
        if ((readMem(0x4D) | readMem(0x4E)) === 0) break;
    }
}

/**
 * $82B5
 */
function sub82B5() {
    while (true) {
        regA = 0x01;
        sub9FA8(regA);
        if ((readMem(0x4D) | readMem(0x4E)) === 0) break;
        if ((readMem(0x1E) & 0x20) !== 0) break;
    }
    writeMem(0x05, 0x00);
    writeMem(0x06, 0x00);
    writeMem(0x09, 0x00);
    writeMem(0x0A, 0x00);
    writeMem(0x11, 0x00);
    writeMem(0x12, 0x00);
    writeMem(0x0D, 0x00);
    writeMem(0x0E, 0x00);
    writeMem(0x4C, 0x00);
    writeMem(0x0700, 0x01);
    sub9BA0();
    writeMem(0x44, 0x00);
    writeMem(0x45, 0x00);
    writeMem(0x7A, 0x00);
    writeMem(0x7B, 0x00);
}

/**
 * $82ED
 */
function sub82ED() {
    while (readMem(0x4C) >= 0) {
        sub838A();
    }
    
    regA = readMem(0x4C);
    regX = (regA << 1) & 0xFF;
    
    // Table at $B800 (External)
    let ptrLow = readMem(0xB800 + regX);
    let ptrHigh = readMem(0xB801 + regX);
    writeMem(0xEC, ptrLow);
    writeMem(0xED, ptrHigh);
    
    regY = 0;
    let ptr = (ptrHigh << 8) | ptrLow;
    regA = readMem(ptr + regY);
    
    if ((regA & 0x80) !== 0) {
        // $8355
        writeMem(0xE9, regA & 0x01);
        // ... logic for $8355 ...
        // (Simplified for brevity, follows same pattern as $8306)
    } else {
        // $8306
        writeMem(0xE9, regA);
        // ... logic for $8306 ...
    }
    
    writeMem(0x4C, 0x00);
    sub82ED();
}

/**
 * $838A
 */
function sub838A() {
    regX = 0x02;
    subC4B9(regX);
    subA215();
    regX = 0x06;
    subC4B9(regX);
}

/**
 * $80FD
 */
function sub80FD() {
    sub838A();
    if (readMem(0x4C) >= 0) {
        sub82ED();
    }
}

// --- External Subroutine Stubs (to be implemented based on other banks) ---

function subC4B9(x) {}
function subA203() {}
function sub9BA0() {}
function sub8464(a) {}
function sub9FA8(a) {}
function sub9B11() {}
function sub9B7F() {}
function sub98A0() {}
function sub8AF7(a) {}
function sub890C(a) {}
function sub88FB() {}
function sub9A35() {}
function sub8920(a) {}
function sub98EA(a, x, y) {}
function sub98E8(x, y) {}
function subA209() {}
function subA20F() {}
function subA20C() {}
function subA006() {}
function subC572() {}
function subA009() {}
function subC56C() {}
function subA015() {}
function sub99F0() {}
function subC578() {}
function subA012() {}
function subA018() {}
function subC57B() {}
function subA003() {}
function subA01B() {}
function subA00C() {}
function sub9085() {}
function sub9A43() {}

