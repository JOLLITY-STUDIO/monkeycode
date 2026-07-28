import { toJSON, fromJSON } from "./utils";

export type ButtonKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

class Controller {
  static readonly BUTTON_A = 0;
  static readonly BUTTON_B = 1;
  static readonly BUTTON_SELECT = 2;
  static readonly BUTTON_START = 3;
  static readonly BUTTON_UP = 4;
  static readonly BUTTON_DOWN = 5;
  static readonly BUTTON_LEFT = 6;
  static readonly BUTTON_RIGHT = 7;
  static readonly BUTTON_TURBO_A = 8;
  static readonly BUTTON_TURBO_B = 9;

  static readonly JSON_PROPERTIES: readonly string[] = [
    "state", "baseA", "baseB", "turboA", "turboB", "turboToggle",
  ];

  state: number[];
  baseA: number;
  baseB: number;
  turboA: boolean;
  turboB: boolean;
  turboToggle: boolean;

  constructor() {
    this.state = new Array(8);
    for (let i = 0; i < this.state.length; i++) this.state[i] = 0x40;
    this.baseA = 0x40;
    this.baseB = 0x40;
    this.turboA = false;
    this.turboB = false;
    this.turboToggle = false;
  }

  buttonDown(key: ButtonKey): void {
    if (key === Controller.BUTTON_TURBO_A) { this.turboA = true; }
    else if (key === Controller.BUTTON_TURBO_B) { this.turboB = true; }
    else {
      this.state[key] = 0x41;
      if (key === Controller.BUTTON_A) this.baseA = 0x41;
      if (key === Controller.BUTTON_B) this.baseB = 0x41;
    }
  }

  buttonUp(key: ButtonKey): void {
    if (key === Controller.BUTTON_TURBO_A) {
      this.turboA = false;
      this.state[Controller.BUTTON_A] = this.baseA;
    } else if (key === Controller.BUTTON_TURBO_B) {
      this.turboB = false;
      this.state[Controller.BUTTON_B] = this.baseB;
    } else {
      this.state[key] = 0x40;
      if (key === Controller.BUTTON_A) this.baseA = 0x40;
      if (key === Controller.BUTTON_B) this.baseB = 0x40;
    }
  }

  clock(): void {
    if (!this.turboA && !this.turboB) return;
    this.turboToggle = !this.turboToggle;
    if (this.turboA) this.state[Controller.BUTTON_A] = this.turboToggle ? 0x41 : 0x40;
    if (this.turboB) this.state[Controller.BUTTON_B] = this.turboToggle ? 0x41 : 0x40;
  }

  toJSON(): any { return toJSON(this); }
  fromJSON(s: any): void { fromJSON(this, s); }
}

export default Controller;
