declare class ChannelNoise {
    constructor(papu: any);
    clockLengthCounter(): void;
    clockEnvDecay(): void;
    updateSampleValue(): void;
    writeReg(address: any, value: any): void;
    setEnabled(value: any): void;
    getLengthStatus(): 1 | 0;
    toJSON(): any;
    fromJSON(s: any): void;
    static JSON_PROPERTIES: string[];
}
export default ChannelNoise;
