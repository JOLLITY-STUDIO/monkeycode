; ============================================================
; bank31/bank31.s - bank 31 fixed bank ($E000-$FFFF, 8KB)
;
; PRG bank 31, fixed at CPU $E000-$FFFF.
; Split: code (main/sub routines) vs data (tables/vectors).
; PC flows continuously from .org $E000, gaps = $FF.
; ============================================================

.segment "PRG_BANK31"
.org $E000

; --- CODE: $E000-$E9D9 + $E9FF-$F159 + $F187-$F328 ---
; Main loop, match logic, player action, sprite rendering,
; collision, dialogue script engine, HUD.
; Contains gap at $E9FA-$E9FE (data_ptrs.s) and $F187-$F186 (data_sprites.s).
.include "code_main.s"

; --- DATA: $E9DA-$E9F9 jump pointer table ---
; 16-bit pointers for function dispatch.
.include "data_ptrs.s"

; --- DATA: $F15A-$F186 sprite attribute table ---
; OAM sprite layout definitions.
.include "data_sprites.s"

; --- DATA: $F329-$FFEF dialogue/strings/palette/exp/pad ---
; Dialogue script ptr table, string data, NT buffers,
; palette, experience tables, $FF padding to $FFEF.
.include "data_scripts.s"

; --- VECTORS: $FFF0-$FFFF RESET + IRQ ---
; RESET=$FFF0 (LDA #$00; STA $8000; JMP $C503)
; NMI=$C5F0, IRQ=$C506 (at $FFFA-$FFFF)
.include "vectors.s"
