/**
 * 多语言（E4）
 * - UI 文案：zh/en/fr/es 四语（人工维护，ROM 只提供 en/fr/es）
 * - 拼图名：优先取 PUZZLE_NAMES[lang]（B3 ROM 提取），无则回退英文/默认名
 * - 语言持久化：wx.storage / localStorage，key=picross_lang
 */
import { PUZZLE_NAMES } from "../data/messages";

export type Lang = "zh" | "en" | "fr" | "es";
export const LANGS: Lang[] = ["zh", "en", "fr", "es"];

export const LANG_LABELS: Record<Lang, string> = {
  zh: "中文",
  en: "EN",
  fr: "FR",
  es: "ES",
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
  return (LANGS as string[]).indexOf(saved) >= 0 ? (saved as Lang) : "zh";
}

export function setLang(l: Lang) {
  storage().set(SAVE_KEY, l);
}

/** UI 文案表 */
export const T: Record<Lang, Record<string, string>> = {
  zh: {
    appTitle: "Picross DS",
    diffEasy: "简单",
    diffNormal: "普通",
    diffHard: "困难",
    cleared: "已通关",
    solvedTitle: "CLEAR!",
    failedTitle: "GAME OVER",
    failedSub: "失误次数已用完",
    retryBtn: "重新开始",
    timeLabel: "用时",
    mistakeLabel: "失误",
    nextBtn: "下一题",
    prevBtn: "上一题",
    backBtn: "返回选择",
    resetBtn: "重置",
    markCross: "画叉",
    markFill: "涂黑",
    puzzleFallback: (n: number) => `Picross ${n}`,
  },
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
    puzzleFallback: (n: number) => `Picross ${n}`,
  },
  fr: {
    appTitle: "Picross DS",
    diffEasy: "Facile",
    diffNormal: "Normal",
    diffHard: "Difficile",
    cleared: "Terminé",
    solvedTitle: "GAGNÉ!",
    failedTitle: "PERDU",
    failedSub: "Plus d'erreurs",
    retryBtn: "Réessayer",
    timeLabel: "Temps",
    mistakeLabel: "Erreurs",
    nextBtn: "Suivant",
    prevBtn: "Précédent",
    backBtn: "Retour",
    resetBtn: "Réinitialiser",
    markCross: "Marquer X",
    markFill: "Remplir",
    puzzleFallback: (n: number) => `Picross ${n}`,
  },
  es: {
    appTitle: "Picross DS",
    diffEasy: "Fácil",
    diffNormal: "Normal",
    diffHard: "Difícil",
    cleared: "Completado",
    solvedTitle: "¡GANA!",
    failedTitle: "FIN",
    failedSub: "Sin errores",
    retryBtn: "Reintentar",
    timeLabel: "Tiempo",
    mistakeLabel: "Errores",
    nextBtn: "Siguiente",
    prevBtn: "Anterior",
    backBtn: "Volver",
    resetBtn: "Reiniciar",
    markCross: "Marcar X",
    markFill: "Rellenar",
    puzzleFallback: (n: number) => `Picross ${n}`,
  },
};

const DIFF_KEYS = ["diffEasy", "diffNormal", "diffHard"];

/** 仅字符串键的 UI 文案（可安全用于 setData） */
export function uiStrings(lang: Lang): Record<string, string> {
  const out: Record<string, string> = {};
  const src = T[lang];
  for (const k in src) {
    if (typeof src[k] === "string") out[k] = src[k];
  }
  return out;
}

export function diffLabel(lang: Lang, diff: number): string {
  return T[lang][DIFF_KEYS[diff] || "diffEasy"] || "";
}

/** 拼图名：PUZZLE_NAMES[lang]（B3），空则回退英文，再空回退 Picross N */
export function puzzleName(lang: Lang, id: number): string {
  const pick = (l: Lang) => {
    const arr = PUZZLE_NAMES[l] as string[] | undefined;
    return arr && arr[id] ? arr[id].replace(/\n/g, "").trim() : "";
  };
  const n = lang === "zh" ? "" : pick(lang);
  const en = pick("en");
  return n || en || T[lang].puzzleFallback(id + 1);
}
