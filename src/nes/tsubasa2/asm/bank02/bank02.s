; ============================================================
; bank02/bank02.s - bank 02 switchable ($8000-$9FFF, 8KB)
;
; PRG bank 02, mapped to CPU $8000-$9FFF via MMC3 R6.
; PC flows continuously from .org $8000, gaps = $FF.
; ============================================================

.segment "PRG_BANK02"
.org $8000

; --- main routines ---
.include "code_main.s"

; --- sub routines ---
.include "code_sub.s"

; --- inline data + routines ---
.include "code_data.s"

; --- data tables ---
.include "data_tables.s"

