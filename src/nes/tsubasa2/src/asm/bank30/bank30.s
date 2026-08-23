; ============================================================
; bank30/bank30.s - bank 30 switchable ($C000-$DFFF, 8KB)
;
; PRG bank 30, mapped to CPU $C000-$DFFF via MMC3 R6.
; PC flows continuously from .org $C000, gaps = $FF.
; ============================================================

.segment "PRG_BANK30"
.org $C000

; --- main routines ---
.include "code_main.s"

; --- sub routines ---
.include "code_sub.s"

; --- inline data + routines ---
.include "code_data.s"

