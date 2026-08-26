interface GamepadButtonInfo {
    pressed: boolean;
}
interface SavedGamepadState {
    buttons: GamepadButtonInfo[];
    axes: number[];
}
interface ButtonInfo {
    gamepadId: string;
    type: string;
    code: number;
    value?: number;
}
interface GamepadConfig {
    playerGamepadId: [string | null, string | null];
    configs: Record<string, {
        buttons: GamepadConfigButton[];
    }>;
}
interface GamepadConfigButton {
    type: string;
    code: number;
    buttonId?: number;
    value?: number;
}
interface GamepadOptions {
    onButtonDown: (player: number, button: number) => void;
    onButtonUp: (player: number, button: number) => void;
}
export default class GamepadController {
    onButtonDown: (player: number, button: number) => void;
    onButtonUp: (player: number, button: number) => void;
    gamepadState: SavedGamepadState[];
    buttonCallback: ((info: ButtonInfo) => void) | null;
    gamepadConfig?: GamepadConfig;
    constructor(options: GamepadOptions);
    disableIfGamepadEnabled: (callback: (playerId: number, buttonId: number) => void) => (playerId: number, buttonId: number) => void;
    _getPlayerNumberFromGamepad: (gamepad: Gamepad) => number;
    poll: () => void;
    promptButton: (f: ((info: ButtonInfo) => void) | null) => void;
    loadGamepadConfig: () => void;
    setGamepadConfig: (gamepadConfig: GamepadConfig) => void;
    startPolling: () => {
        stop: () => void;
    };
}
export {};
