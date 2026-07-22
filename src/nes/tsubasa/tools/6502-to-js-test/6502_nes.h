/**
 * 6502.h extensions: ROL, ROR, RTI (missing from original)
 */
#include "6502.h"

// rotate left
#define _ROL_V(R) { uint8_t c = SR_C; SR_C = (R & 128) != 0; R = (R << 1) | c; FLAG_NZ(R); }
#define _ROL_M(ADDR) {                      \
    uint8_t v = GetMem(ADDR);               \
    _ROL_V(v);                              \
    SetMem(ADDR, v);                        \
}

#define ROL_ZP(M)       CYCLE(5); _ROL_M(M);
#define ROL_ZP_X(M)     CYCLE(6); _ROL_M(ZPX(M));
#define ROL_ABS(M)      CYCLE(6); _ROL_M(M);
#define ROL_ABS_X(M)    CYCLE(7); _ROL_M(ABSX(M));
#define ROL_A()         CYCLE(2); _ROL_V(A);

// rotate right
#define _ROR_V(R) { uint8_t c = SR_C; SR_C = (R & 1) != 0; R = (R >> 1) | (c << 7); FLAG_NZ(R); }
#define _ROR_M(ADDR) {                      \
    uint8_t v = GetMem(ADDR);               \
    _ROR_V(v);                              \
    SetMem(ADDR, v);                        \
}

#define ROR_ZP(M)       CYCLE(5); _ROR_M(M);
#define ROR_ZP_X(M)     CYCLE(6); _ROR_M(ZPX(M));
#define ROR_ABS(M)      CYCLE(6); _ROR_M(M);
#define ROR_ABS_X(M)    CYCLE(7); _ROR_M(ABSX(M));
#define ROR_A()         CYCLE(2); _ROR_V(A);

// return from interrupt
#define RTI() {                             \
    CYCLE(6);                               \
    uint8_t sr = GetStack(SP + 1);          \
    SR_N = (sr & 128) != 0;                 \
    SR_V = (sr &  64) != 0;                 \
    SR_B = (sr &  16) != 0;                 \
    SR_D = (sr &   8) != 0;                 \
    SR_I = (sr &   4) != 0;                 \
    SR_Z = (sr &   2) != 0;                 \
    SR_C = (sr &   1) != 0;                 \
    PC = GetStack(SP + 2) << 8 | GetStack(SP + 3); \
    SP += 3;                                \
    CHECK_CYCLE();                          \
    goto _RET_MAP;                          \
}
