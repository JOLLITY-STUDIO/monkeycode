/**
 * 多语言（E4）
 * - UI 文案：en/tc/ja/ko 四语（繁中/英文/日文/韩文）
 * - 拼图名：ROM 只提供 en/fr/es，故非英文一律回退英文，再空则回退默认名
 * - 语言持久化：wx.storage / localStorage，key=picross_lang
 */
import { PUZZLE_NAMES } from "../data/messages";

export type Lang = "en" | "tc" | "ja" | "ko";
export const LANGS: Lang[] = ["en", "tc", "ja", "ko"];

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  tc: "繁中",
  ja: "日本語",
  ko: "한국어",
};

const SAVE_KEY = "picross_lang";

function storage(): { get(k: string): string | null; set(k: string, v: string): void } {
  const w = wx as any;
  if (w && w.getStorageSync) {
    return { get: (k) => w.getStorageSync(k), set: (k, v) => w.setStorageSync(k, v) };
  }
  const ls = (globalThis as any).localStorage;
  if (ls) return { get: (k) => ls.getItem(k), set: (k, v) => ls.setItem(k, v) };
  return { get: () => null, set: () => undefined };
}

export function getLang(): Lang {
  const saved = storage().get(SAVE_KEY);
  return saved && (LANGS as string[]).indexOf(saved) >= 0 ? (saved as Lang) : "tc";
}

export function setLang(l: Lang) {
  storage().set(SAVE_KEY, l);
}

type TValue = string | ((n: number) => string);

/** UI 文案表（puzzleFallback 为函数，其余为字符串） */
export const T: Record<Lang, Record<string, TValue>> = {
  en: {
    appTitle: "Picross DS",
    diffEasy: "Easy",
    diffNormal: "Normal",
    diffHard: "Hard",
    cleared: "Cleared",
    solvedTitle: "CLEAR!",
    failedTitle: "GAME OVER",
    failedSub: "No mistakes left",
    retryBtn: "Retry",
    timeLabel: "Time",
    mistakeLabel: "Mistakes",
    nextBtn: "Next",
    prevBtn: "Prev",
    backBtn: "Back to Select",
    resetBtn: "Reset",
    markCross: "Mark X",
    markFill: "Fill",
    selectBtn: "Select",
    playBtn: "Play",
    selectTitle: "Select Puzzle",
    howtoTitle: "How to Play",
    lockedTitle: "???",
    lockedHint: "Clear previous puzzle",
    skipBtn: "Skip",
    tutOk: "OK",
    tutPen: "Pen",
    tutX: "X",
    tutPenMode: "Pen Mode",
    tutXMode: "X Mode",
    puzzleFallback: (n: number) => `Picross ${n}`,
  },
  tc: {
    appTitle: "Picross DS",
    diffEasy: "簡單",
    diffNormal: "普通",
    diffHard: "困難",
    cleared: "已通關",
    solvedTitle: "CLEAR!",
    failedTitle: "GAME OVER",
    failedSub: "失誤次數已用完",
    retryBtn: "重新開始",
    timeLabel: "用時",
    mistakeLabel: "失誤",
    nextBtn: "下一題",
    prevBtn: "上一題",
    backBtn: "返回選擇",
    resetBtn: "重置",
    markCross: "畫叉",
    markFill: "塗黑",
    selectBtn: "選擇",
    playBtn: "開始遊戲",
    selectTitle: "選擇拼圖",
    howtoTitle: "玩法教學",
    lockedTitle: "???",
    lockedHint: "通關前置題解鎖",
    skipBtn: "跳過",
    tutOk: "OK",
    tutPen: "筆",
    tutX: "叉",
    tutPenMode: "筆模式",
    tutXMode: "叉模式",
    puzzleFallback: (n: number) => `Picross ${n}`,
  },
  ja: {
    appTitle: "Picross DS",
    diffEasy: "かんたん",
    diffNormal: "ふつう",
    diffHard: "むずかしい",
    cleared: "クリア済み",
    solvedTitle: "CLEAR!",
    failedTitle: "GAME OVER",
    failedSub: "ミス回数が上限に達しました",
    retryBtn: "リトライ",
    timeLabel: "タイム",
    mistakeLabel: "ミス",
    nextBtn: "次へ",
    prevBtn: "前へ",
    backBtn: "選択に戻る",
    resetBtn: "リセット",
    markCross: "バツをつける",
    markFill: "塗る",
    selectBtn: "選択",
    playBtn: "ゲーム開始",
    selectTitle: "パズルを選ぶ",
    howtoTitle: "遊び方",
    lockedTitle: "???",
    lockedHint: "前の問題をクリア",
    skipBtn: "スキップ",
    tutOk: "OK",
    tutPen: "ペン",
    tutX: "バツ",
    tutPenMode: "ペンモード",
    tutXMode: "バツモード",
    puzzleFallback: (n: number) => `Picross ${n}`,
  },
  ko: {
    appTitle: "Picross DS",
    diffEasy: "쉬움",
    diffNormal: "보통",
    diffHard: "어려움",
    cleared: "클리어",
    solvedTitle: "CLEAR!",
    failedTitle: "GAME OVER",
    failedSub: "실수 횟수를 모두 사용했습니다",
    retryBtn: "다시 시작",
    timeLabel: "시간",
    mistakeLabel: "실수",
    nextBtn: "다음",
    prevBtn: "이전",
    backBtn: "선택으로 돌아가기",
    resetBtn: "리셋",
    markCross: "X 표시",
    markFill: "칠하기",
    selectBtn: "선택",
    playBtn: "게임 시작",
    selectTitle: "퍼즐 선택",
    howtoTitle: "게임 방법",
    lockedTitle: "???",
    lockedHint: "이전 문제 클리어",
    skipBtn: "걸러뛰기",
    tutOk: "OK",
    tutPen: "펜",
    tutX: "X",
    tutPenMode: "펜 모드",
    tutXMode: "X 모드",
    puzzleFallback: (n: number) => `Picross ${n}`,
  },
};

const DIFF_KEYS = ["diffEasy", "diffNormal", "diffHard"];

/** 仅字符串键的 UI 文案（可安全用于 setData） */
export function uiStrings(lang: Lang): Record<string, string> {
  const out: Record<string, string> = {};
  const src = T[lang];
  for (const k in src) {
    if (typeof src[k] === "string") out[k] = src[k] as string;
  }
  return out;
}

export function diffLabel(lang: Lang, diff: number): string {
  return (T[lang][DIFF_KEYS[diff] || "diffEasy"] as string) || "";
}

/** 拼图名：ROM 只提供 en/fr/es，因此所有语言均回退英文；空则回退 Picross N */
export function puzzleName(lang: Lang, id: number): string {
  const arr = (PUZZLE_NAMES as any)["en"] as string[] | undefined;
  const n = arr && arr[id] ? arr[id].replace(/\n/g, "").trim() : "";
  return n || (T[lang].puzzleFallback as (n: number) => string)(id + 1);
}
