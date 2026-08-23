; ============================================================
; bank20/bank20.s - bank 20 switchable ($8000-$9FFF, 8KB)
;
; PRG bank 20, mapped to CPU $8000-$9FFF via MMC3 R6.
; PC flows continuously from .org $8000, gaps = $FF.
; ============================================================

.segment "PRG_BANK20"
.org $8000

; --- main routines ---
.include "code_main.s"

; --- sub routines ---
.include "code_sub.s"

; --- inline data + routines ---
.include "code_data.s"

; --- data tables ---
.include "data_tables.s"

