interface KeyboardOptions {
    onButtonDown: (controller: number, button: number) => void;
    onButtonUp: (controller: number, button: number) => void;
}
export default class KeyboardController {
    onButtonDown: (controller: number, button: number) => void;
    onButtonUp: (controller: number, button: number) => void;
    keys: Record<number, [number, number, string]>;
    constructor(options: KeyboardOptions);
    loadKeys: () => void;
    setKeys: (newKeys: Record<number, [number, number, string]>) => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleKeyUp: (e: KeyboardEvent) => void;
    handleKeyPress: (e: KeyboardEvent) => void;
}
export {};
