declare const data: {
    bankId: number;
    baseAddr: number;
    bankAddrBase: number;
    mmc3SelectReg: number;
    stats: {
        totalLines: number;
        codeBytes: number;
        dataBytes: number;
        unaccessedBytes: number;
        codeDensityPct: string;
        note: string;
        note2: string;
        note3: string;
        note4: string;
    };
    engineEntryPoints: {
        desc: string;
        entries: {
            pc: string;
            name: string;
            desc: string;
            accessed: string;
        }[];
    };
    ramLayout: {
        desc: string;
        sections: Array<{
            range: string;
            name: string;
            desc: string;
            asmRef: string;
        }>;
    };
    channelParamsLayout: {
        desc: string;
        offsets: {
            offset: number;
            name: string;
            desc: string;
        }[];
    };
    subroutines: ({
        bankAddr: string;
        asmLine: number;
        name: string;
        length: string;
        desc: string;
        note: string;
        crossRefs: {
            from: string;
            desc: string;
        }[];
        dataOnly?: undefined;
        note2?: undefined;
        commands?: undefined;
    } | {
        bankAddr: string;
        asmLine: number;
        name: string;
        length: string;
        desc: string;
        note: string;
        crossRefs?: undefined;
        dataOnly?: undefined;
        note2?: undefined;
        commands?: undefined;
    } | {
        bankAddr: string;
        asmLine: number;
        name: string;
        length: string;
        desc: string;
        note?: undefined;
        crossRefs?: undefined;
        dataOnly?: undefined;
        note2?: undefined;
        commands?: undefined;
    } | {
        bankAddr: string;
        asmLine: number;
        name: string;
        length: string;
        desc: string;
        dataOnly: boolean;
        note?: undefined;
        crossRefs?: undefined;
        note2?: undefined;
        commands?: undefined;
    } | {
        bankAddr: string;
        asmLine: number;
        name: string;
        length: string;
        desc: string;
        note: string;
        note2: string;
        crossRefs?: undefined;
        dataOnly?: undefined;
        commands?: undefined;
    } | {
        bankAddr: string;
        asmLine: number;
        name: string;
        length: string;
        desc: string;
        note: string;
        note2: string;
        crossRefs: {
            from: string;
            asmLine: number;
            desc: string;
        }[];
        dataOnly?: undefined;
        commands?: undefined;
    } | {
        bankAddr: string;
        asmLine: number;
        name: string;
        length: string;
        desc: string;
        note: string;
        commands: {
            code: string;
            desc: string;
        }[];
        crossRefs?: undefined;
        dataOnly?: undefined;
        note2?: undefined;
    })[];
    audioCommands: {
        desc: string;
        list: {
            code: number;
            name: string;
            usageCount: number;
            desc: string;
        }[];
    };
    frequencyTable: {
        freqTableAddr: string;
        freqTableSize: string;
        desc: string;
        note: string;
    };
    durationTable: {
        durTableAddr: string;
        durTableSize: string;
        desc: string;
        note: string;
    };
    soundEffectMap: {
        bankAddr: string;
        asmRef: string;
        format: string;
        terminator: string;
        totalEntries: string;
        entries: {
            seId: number;
            desc: string;
            basePtr: string;
            bank: string;
        }[];
        note: string;
        note2: string;
        note3: string;
    };
    musicTracks: {
        desc: string;
        note: string;
    };
    bankMapping: {
        desc: string;
        note: string;
        banks: ({
            id: number;
            desc: string;
        } | {
            id: null;
            desc: string;
        })[];
    };
    dataTables: ({
        bankAddr: string;
        displayName: string;
        asmLine: number;
        length: string;
        desc: string;
        note?: undefined;
    } | {
        bankAddr: string;
        displayName: string;
        asmLine: number;
        length: string;
        desc: string;
        note: string;
    })[];
    callFlow: {
        desc: string;
        steps: {
            step: number;
            addr: string;
            asmLine: number;
            action: string;
        }[];
    };
    externalInterface: {
        desc: string;
        methods: ({
            name: string;
            mechanism: string;
            example: string;
        } | {
            name: string;
            mechanism: string;
            example?: undefined;
        })[];
    };
};
export default data;
