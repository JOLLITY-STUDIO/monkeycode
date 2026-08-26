/**
 * Opening sprite table - Tecmo logo (frame 30 emulator-observed)
 * Source: tsnes emulator OAM dump (output/emu-reference/frame-030/oam.json).
 * Placeholder until WBS L1/L2/L3 (PRG $21CA/$1DD1/$85EB) translated.
 */
export interface BootSpriteEntry {
    readonly slot: number;
    readonly y: number;
    readonly tile: number;
    readonly attr: number;
    readonly x: number;
}
export declare const BOOT_TECMO_OAM_TABLE: ReadonlyArray<BootSpriteEntry>;
