declare class NameTable {
    constructor(width: any, height: any, name: any);
    getTileIndex(x: any, y: any): any;
    getAttrib(x: any, y: any): any;
    writeAttrib(index: any, value: any): void;
    toJSON(): {
        tile: unknown[];
        attrib: unknown[];
    };
    fromJSON(s: any): void;
}
export default NameTable;
