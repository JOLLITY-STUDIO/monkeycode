declare class ChannelDM {
    static MODE_NORMAL: number;
    static MODE_LOOP: number;
    static MODE_IRQ: number;
    static JSON_PROPERTIES: string[];
    constructor(papu: any);
    clockDmc(): void;
    endOfSample(): void;
    nextSample(): void;
    writeReg(address: any, value: any): void;
    setEnabled(value: any): void;
    getLengthStatus(): 0 | 1;
    getIrqStatus(): 0 | 1;
    toJSON(): any;
    fromJSON(s: any): void;
}
export default ChannelDM;
