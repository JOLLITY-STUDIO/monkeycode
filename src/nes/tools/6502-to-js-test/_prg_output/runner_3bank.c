// Runner: combined bank_00 ($8000), bank_01 ($A000), bank_31 ($C000)
// These three don't overlap, forming a complete 24KB address space
// MMC3 switchable banks handled as separate JS modules later

#include <stdint.h>
#include "6502_nes.h"

#define PROG_ASM "_merged_all.c"

uint8_t memory[65536];

uint16_t Reg_PC = 0;
uint8_t Reg_A = 0, Reg_X = 0, Reg_Y = 0, Reg_SP = 0xff;
uint8_t Reg_SR_N = 0, Reg_SR_V = 0, Reg_SR_B = 1, Reg_SR_D = 0, Reg_SR_I = 0, Reg_SR_Z = 0, Reg_SR_C = 0;

uint8_t load(uint16_t addr) { return memory[addr]; }
void store(uint16_t addr, uint8_t val) { memory[addr] = val; }

void update_frame() {
    int cycle_remain = 50000; // ~225 scanlines * ~113.66 CPU cycles

    uint16_t PC = Reg_PC;
    uint8_t A = Reg_A, X = Reg_X, Y = Reg_Y, SP = Reg_SP;
    uint8_t SR_N = Reg_SR_N, SR_V = Reg_SR_V, SR_B = Reg_SR_B;
    uint8_t SR_D = Reg_SR_D, SR_I = Reg_SR_I, SR_Z = Reg_SR_Z, SR_C = Reg_SR_C;

    if (PC) goto _RET_MAP;

    #include PROG_ASM
    #line 1

LABEL_END:
    Reg_PC = PC;
    Reg_A = A; Reg_X = X; Reg_Y = Y; Reg_SP = SP;
    Reg_SR_N = SR_N; Reg_SR_V = SR_V; Reg_SR_B = SR_B;
    Reg_SR_D = SR_D; Reg_SR_I = SR_I; Reg_SR_Z = SR_Z; Reg_SR_C = SR_C;
}
