declare class ChannelTriangle {
    constructor(papu: any);
    clockLengthCounter(): void;
    clockLinearCounter(): void;
    getLengthStatus(): 1 | 0;
    readReg(address: any): number;
    writeReg(address: any, value: any): void;
    clockProgrammableTimer(nCycles: any): void;
    clockTriangleGenerator(): void;
    setEnabled(value: any): void;
    updateSampleCondition(): void;
    toJSON(): any;
    fromJSON(s: any): void;
    static JSON_PROPERTIES: string[];
}
export default ChannelTriangle;
