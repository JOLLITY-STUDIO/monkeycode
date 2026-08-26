declare class ChannelSquare {
    constructor(papu: any, square1: any);
    clockLengthCounter(): void;
    clockEnvDecay(): void;
    clockSweep(): void;
    updateSampleValue(): void;
    writeReg(address: any, value: any): void;
    setEnabled(value: any): void;
    getLengthStatus(): 0 | 1;
    toJSON(): any;
    fromJSON(s: any): void;
    static JSON_PROPERTIES: string[];
}
export default ChannelSquare;
