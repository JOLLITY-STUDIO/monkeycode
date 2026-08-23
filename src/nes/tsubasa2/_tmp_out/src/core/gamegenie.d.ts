export interface GameGeniePatch {
    addr: number;
    value: number;
    wantskey: boolean;
    key?: number;
}
declare class GameGenie {
    patches: GameGeniePatch[];
    enabled: boolean;
    onChange: (() => void) | null;
    constructor();
    setEnabled(enabled: boolean): void;
    addCode(code: string): void;
    addPatch(addr: number, value: number, key?: number): void;
    removeAllCodes(): void;
    applyCodes(addr: number, value: number): number;
    decode(code: string): GameGeniePatch | null;
    encodeHex(addr: number, value: number, key?: number, wantskey?: boolean): string;
    decodeHex(s: string): GameGeniePatch | null;
    encode(addr: number, value: number, key?: number, wantskey?: boolean): string;
}
export default GameGenie;
