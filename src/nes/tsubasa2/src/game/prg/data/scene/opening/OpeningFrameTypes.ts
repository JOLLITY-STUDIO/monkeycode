/**
 * OpeningFrameTable 类型定义 (供分画面数据文件与聚合入口共用)
 */
export interface OpeningFrameChr { s: number; b: ReadonlyArray<number>; }

export interface OpeningFrameNtRow { ni: number; r: number; d: ReadonlyArray<number>; }

export interface OpeningFrameScroll {
  readonly v: number; readonly h: number; readonly vt: number; readonly ht: number;
  readonly fv: number; readonly fh: number; readonly cv: number; readonly ch: number;
  readonly cvt: number; readonly cht: number;
}

/** 帧中横向 scroll 切换点（buffer row），由 $2005 mid-frame 写入触发 */
export interface OpeningFrameScrollOverride {
  readonly s: number;
  readonly h: number;
  readonly ht: number;
  readonly fh: number;
}

export interface OpeningFrameEntry {
  readonly f: number;
  readonly c: ReadonlyArray<OpeningFrameChr>;
  readonly p: { readonly bg: ReadonlyArray<number>; readonly spr: ReadonlyArray<number> } | null;
  readonly o: ReadonlyArray<ReadonlyArray<number>>;
  readonly n: ReadonlyArray<OpeningFrameNtRow>;
  readonly a: ReadonlyArray<OpeningFrameNtRow>;
  readonly s: OpeningFrameScroll;
  readonly sc?: ReadonlyArray<OpeningFrameScrollOverride>;
}
