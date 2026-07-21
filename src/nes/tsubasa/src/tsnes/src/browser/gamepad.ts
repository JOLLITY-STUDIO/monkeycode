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
  configs: Record<string, { buttons: GamepadConfigButton[] }>;
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

  constructor(options: GamepadOptions) {
    this.onButtonDown = options.onButtonDown;
    this.onButtonUp = options.onButtonUp;
    this.gamepadState = [];
    this.buttonCallback = null;
  }

  disableIfGamepadEnabled = (callback: (playerId: number, buttonId: number) => void) => {
    var self = this;
    return (playerId: number, buttonId: number) => {
      if (!self.gamepadConfig) {
        return callback(playerId, buttonId);
      }

      var playerGamepadId = self.gamepadConfig.playerGamepadId;
      if (!playerGamepadId || !playerGamepadId[playerId - 1]) {
        return callback(playerId, buttonId);
      }
    };
  };

  _getPlayerNumberFromGamepad = (gamepad: Gamepad): number => {
    if (this.gamepadConfig!.playerGamepadId[0] === gamepad.id) {
      return 1;
    }

    if (this.gamepadConfig!.playerGamepadId[1] === gamepad.id) {
      return 2;
    }

    return 1;
  };

  poll = (): void => {
    const gamepads = (navigator.getGamepads
      ? navigator.getGamepads()
      : (navigator as any).webkitGetGamepads()) as (Gamepad | null)[];

    const usedPlayers: number[] = [];

    for (let gamepadIndex = 0; gamepadIndex < gamepads.length; gamepadIndex++) {
      const gamepad = gamepads[gamepadIndex];
      const previousGamepad = this.gamepadState[gamepadIndex];

      if (!gamepad) {
        continue;
      }

      if (!previousGamepad) {
        this.gamepadState[gamepadIndex] = {
          buttons: gamepad.buttons.map((b: GamepadButton) => ({ pressed: b.pressed })),
          axes: gamepad.axes.slice(0),
        };
        continue;
      }

      const buttons = gamepad.buttons;
      const previousButtons = previousGamepad.buttons;

      if (this.buttonCallback) {
        for (let code = 0; code < gamepad.axes.length; code++) {
          const axis = gamepad.axes[code];
          const previousAxis = previousGamepad.axes[code];

          if (axis === -1 && previousAxis !== -1) {
            this.buttonCallback({
              gamepadId: gamepad.id,
              type: "axis",
              code: code,
              value: axis,
            });
          }

          if (axis === 1 && previousAxis !== 1) {
            this.buttonCallback({
              gamepadId: gamepad.id,
              type: "axis",
              code: code,
              value: axis,
            });
          }
        }

        for (let code = 0; code < buttons.length; code++) {
          const button = buttons[code];
          const previousButton = previousButtons[code];
          if (button.pressed && !previousButton.pressed) {
            this.buttonCallback({
              gamepadId: gamepad.id,
              type: "button",
              code: code,
            });
          }
        }
      } else if (this.gamepadConfig) {
        let playerNumber = this._getPlayerNumberFromGamepad(gamepad);
        if (usedPlayers.length < 2) {
          if (usedPlayers.indexOf(playerNumber) !== -1) {
            playerNumber++;
            if (playerNumber > 2) playerNumber = 1;
          }
          usedPlayers.push(playerNumber);

          if (this.gamepadConfig.configs[gamepad.id]) {
            const configButtons =
              this.gamepadConfig.configs[gamepad.id].buttons;

            for (let i = 0; i < configButtons.length; i++) {
              const configButton = configButtons[i];
              if (configButton.type === "button") {
                const code = configButton.code;
                const button = buttons[code];
                const previousButton = previousButtons[code];

                if (button.pressed && !previousButton.pressed) {
                  this.onButtonDown(playerNumber, configButton.buttonId!);
                } else if (!button.pressed && previousButton.pressed) {
                  this.onButtonUp(playerNumber, configButton.buttonId!);
                }
              } else if (configButton.type === "axis") {
                const code = configButton.code;
                const axis = gamepad.axes[code];
                const previousAxis = previousGamepad.axes[code];

                if (
                  axis === configButton.value &&
                  previousAxis !== configButton.value
                ) {
                  this.onButtonDown(playerNumber, configButton.buttonId!);
                }

                if (
                  axis !== configButton.value &&
                  previousAxis === configButton.value
                ) {
                  this.onButtonUp(playerNumber, configButton.buttonId!);
                }
              }
            }
          }
        }
      }

      this.gamepadState[gamepadIndex] = {
        buttons: buttons.map((b: GamepadButton) => {
          return { pressed: b.pressed };
        }),
        axes: gamepad.axes.slice(0),
      };
    }
  };

  promptButton = (f: ((info: ButtonInfo) => void) | null): void => {
    if (!f) {
      this.buttonCallback = f;
    } else {
      this.buttonCallback = (buttonInfo: ButtonInfo) => {
        this.buttonCallback = null;
        f(buttonInfo);
      };
    }
  };

  loadGamepadConfig = (): void => {
    var gamepadConfig;
    try {
      gamepadConfig = localStorage.getItem("gamepadConfig");
      if (gamepadConfig) {
        gamepadConfig = JSON.parse(gamepadConfig);
      }
    } catch (e) {
      console.warn("Failed to get gamepadConfig from localStorage.", e);
    }

    this.gamepadConfig = gamepadConfig;
  };

  setGamepadConfig = (gamepadConfig: GamepadConfig): void => {
    try {
      localStorage.setItem("gamepadConfig", JSON.stringify(gamepadConfig));
      this.gamepadConfig = gamepadConfig;
    } catch (e) {
      console.warn("Failed to set gamepadConfig in localStorage.", e);
    }
  };

  startPolling = (): { stop: () => void } => {
    if (!(navigator.getGamepads || (navigator as any).webkitGetGamepads)) {
      return { stop: () => {} };
    }

    let stopped = false;
    const loop = () => {
      if (stopped) return;

      this.poll();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return {
      stop: () => {
        stopped = true;
      },
    };
  };
}
