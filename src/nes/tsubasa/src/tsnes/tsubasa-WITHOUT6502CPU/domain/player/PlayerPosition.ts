/**
 * 球员位置枚举
 * 对照 ROM 中位置编码：0=GK, 1=DF, 2=MF, 3=FW
 */
export enum PlayerPosition {
  /** 守门员 Goalkeeper */
  GK = 0,
  /** 后卫 Defender */
  DF = 1,
  /** 中场 Midfielder */
  MF = 2,
  /** 前锋 Forward */
  FW = 3,
}

/** 中文位置描述 */
export const POSITION_LABELS: Record<PlayerPosition, string> = {
  [PlayerPosition.GK]: 'GK',
  [PlayerPosition.DF]: 'DF',
  [PlayerPosition.MF]: 'MF',
  [PlayerPosition.FW]: 'FW',
};

/** 根据编码获取位置 */
export function parsePosition(code: number): PlayerPosition {
  if (code in POSITION_LABELS) return code as PlayerPosition;
  return PlayerPosition.FW; // fallback
}
