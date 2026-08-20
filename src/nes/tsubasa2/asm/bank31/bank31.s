; ============================================================
; bank31/bank31.s - bank 31 fixed bank ($E000-$FFFF, 8KB)
;
; PRG bank 31, fixed at CPU $E000-$FFFF.
; Contains: main loop, match logic, data tables, RESET, IRQ vectors.
;
; Structure (subfiles merged via .include, PC flows continuously
; from .org $E000, gaps filled with $FF by default):
; ============================================================

.segment "PRG_BANK31"
.org $E000

; --- $E000-$E6CE: main loop / match logic ---
; Frame counter, match state machine, player action dispatch.
.include "entry_E000.s"

; --- $E6CF-$E9D9: speed table / collision detection ---
; Movement speed lookup, ball-player collision, kickoff logic.
.include "entry_E6CF.s"

; --- $E9DA-$F159: jump ptrs / sprite meta / dialogue ---
; Jump pointer table, sprite layout data, dialogue script data.
.include "entry_E9DA.s"

; --- $F15A-$F328: sprite attr table / NT layout ---
; Sprite attribute tables, nametable layout definitions.
.include "entry_F15A.s"

; --- $F329-$FA6A: dialogue script ptr table ---
; 16-bit pointers to dialogue script entries.
.include "data_F329.s"

; --- $FA6B-$FFEF: strings / NT / palette / exp table / pad ---
; String data, nametable buffers, palette, experience tables,
; $FF padding to $FFEF.
.include "data_FA6B.s"

; --- $FFF0-$FFFF: RESET + IRQ vectors ---
; RESET=$FFF0 (LDA #$00; STA $8000; JMP $C503)
; NMI=$C5F0, IRQ=$C506 (at $FFFA-$FFFF)
.include "vectors.s"
