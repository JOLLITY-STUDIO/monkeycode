/**
 * 多语言（E4）
 * - UI 文案：en/tc/ja/ko 四语（繁中/英文/日文/韩文）
 * - 拼图名：ROM 只提供 en/fr/es，故非英文一律回退英文，再空则回退默认名
 * - 语言持久化：wx.storage / localStorage，key=picross_lang
 */
import { PUZZLE_NAMES } from "../data/messages";
export const LANGS = ["en", "tc", "ja", "ko"];
export const LANG_LABELS = {
    en: "EN",
    tc: "繁中",
    ja: "日本語",
    ko: "한국어",
};
const SAVE_KEY = "picross_lang";
function storage() {
    const w = wx;
    if (w && w.getStorageSync) {
        return { get: (k) => w.getStorageSync(k), set: (k, v) => w.setStorageSync(k, v) };
    }
    const ls = globalThis.localStorage;
    if (ls)
        return { get: (k) => ls.getItem(k), set: (k, v) => ls.setItem(k, v) };
    return { get: () => null, set: () => undefined };
}
export function getLang() {
    const saved = storage().get(SAVE_KEY);
    return saved && LANGS.indexOf(saved) >= 0 ? saved : "tc";
}
export function setLang(l) {
    storage().set(SAVE_KEY, l);
}
/** UI 文案表（puzzleFallback 为函数，其余为字符串） */
export const T = {
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
        undoBtn: "Undo",
        redoBtn: "Redo",
        resumeBtn: "Resume",
        lockedTitle: "???",
        lockedHint: "Clear previous puzzle",
        skipBtn: "Skip",
        tutOk: "OK",
        tutPen: "Pen",
        tutX: "X",
        tutPenMode: "Pen Mode",
        tutXMode: "X Mode",
        puzzleFallback: (n) => `Picross ${n}`,
        // Progress page 专用
        progressTitle: "Progress",
        progressInProgress: (n) => `${n} in-progress`,
        progressEmpty: "No saved progress",
        progressJustNow: "Just now",
        progressMinAgo: (n) => `${n}m ago`,
        progressHourAgo: (n) => `${n}h ago`,
        progressDayAgo: (n) => `${n}d ago`,
        progressCellsStat: (m, t) => `${m}/${t} cells`,
        progressDelete: "Delete",
        progressClearAll: "Clear All",
        progressClearConfirmTitle: "Delete progress?",
        progressClearOneMsg: (id) => `Puzzle #${id} progress will be deleted.`,
        progressClearAllTitle: "Clear all progress?",
        progressClearAllMsg: (n) => `${n} puzzle progress will be cleared.`,
        progressConfirm: "Confirm",
        progressCancel: "Cancel",
        difficultyTitle: "Puzzles",
        lockedShortHint: "Clear previous",
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
        undoBtn: "撤銷",
        redoBtn: "重做",
        resumeBtn: "繼續",
        lockedTitle: "???",
        lockedHint: "通關前置題解鎖",
        skipBtn: "跳過",
        tutOk: "OK",
        tutPen: "筆",
        tutX: "叉",
        tutPenMode: "筆模式",
        tutXMode: "叉模式",
        puzzleFallback: (n) => `Picross ${n}`,
        progressTitle: "繼續",
        progressInProgress: (n) => `${n} 個進行中`,
        progressEmpty: "暫無保存的進度",
        progressJustNow: "剛剛",
        progressMinAgo: (n) => `${n} 分鐘前`,
        progressHourAgo: (n) => `${n} 小時前`,
        progressDayAgo: (n) => `${n} 天前`,
        progressCellsStat: (m, t) => `${m}/${t} 格`,
        progressDelete: "刪除",
        progressClearAll: "清空全部",
        progressClearConfirmTitle: "確認刪除進度",
        progressClearOneMsg: (id) => `題目 #${id} 的當前進度將被刪除。`,
        progressClearAllTitle: "清空全部進度",
        progressClearAllMsg: (n) => `目前 ${n} 個題目進度將被清除。`,
        progressConfirm: "確認",
        progressCancel: "取消",
        difficultyTitle: "拼圖",
        lockedShortHint: "通關前置",
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
        undoBtn: "元に戻す",
        redoBtn: "やり直し",
        resumeBtn: "続きから",
        lockedTitle: "???",
        lockedHint: "前の問題をクリア",
        skipBtn: "スキップ",
        tutOk: "OK",
        tutPen: "ペン",
        tutX: "バツ",
        tutPenMode: "ペンモード",
        tutXMode: "バツモード",
        puzzleFallback: (n) => `Picross ${n}`,
        progressTitle: "続きから",
        progressInProgress: (n) => `${n} 件進行中`,
        progressEmpty: "保存された進行はありません",
        progressJustNow: "たった今",
        progressMinAgo: (n) => `${n} 分前`,
        progressHourAgo: (n) => `${n} 時間前`,
        progressDayAgo: (n) => `${n} 日前`,
        progressCellsStat: (m, t) => `${m}/${t} マス`,
        progressDelete: "削除",
        progressClearAll: "全部クリア",
        progressClearConfirmTitle: "進行を削除しますか",
        progressClearOneMsg: (id) => `問題 #${id} の進行を削除します。`,
        progressClearAllTitle: "全部の進行をクリア",
        progressClearAllMsg: (n) => `現在 ${n} 件の進行をクリアします。`,
        progressConfirm: "確認",
        progressCancel: "キャンセル",
        difficultyTitle: "パズル",
        lockedShortHint: "前の問題を",
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
        undoBtn: "실행 취소",
        redoBtn: "다시 실행",
        resumeBtn: "이어서",
        lockedTitle: "???",
        lockedHint: "이전 문제 클리어",
        skipBtn: "걸러뛰기",
        tutOk: "OK",
        tutPen: "펜",
        tutX: "X",
        tutPenMode: "펜 모드",
        tutXMode: "X 모드",
        puzzleFallback: (n) => `Picross ${n}`,
        progressTitle: "이어서",
        progressInProgress: (n) => `진행 중 ${n}개`,
        progressEmpty: "저장된 진행이 없습니다",
        progressJustNow: "방금 전",
        progressMinAgo: (n) => `${n}분 전`,
        progressHourAgo: (n) => `${n}시간 전`,
        progressDayAgo: (n) => `${n}일 전`,
        progressCellsStat: (m, t) => `${m}/${t}칸`,
        progressDelete: "삭제",
        progressClearAll: "모두 지우기",
        progressClearConfirmTitle: "진행을 삭제하시겠습니까?",
        progressClearOneMsg: (id) => `퍼즐 #${id}의 진행을 삭제합니다.`,
        progressClearAllTitle: "모든 진행 지우기",
        progressClearAllMsg: (n) => `현재 ${n}개의 진행을 모두 지웁니다.`,
        progressConfirm: "확인",
        progressCancel: "취소",
        difficultyTitle: "퍼즐",
        lockedShortHint: "이전 문제",
    },
};
const DIFF_KEYS = ["diffEasy", "diffNormal", "diffHard"];
/** 仅字符串键的 UI 文案（可安全用于 setData） */
export function uiStrings(lang) {
    const out = {};
    const src = T[lang];
    for (const k in src) {
        if (typeof src[k] === "string")
            out[k] = src[k];
    }
    return out;
}
export function diffLabel(lang, diff) {
    return T[lang][DIFF_KEYS[diff] || "diffEasy"] || "";
}
/** 拼图名：ROM 只提供 en/fr/es，因此所有语言均回退英文；空则回退 Picross N */
export function puzzleName(lang, id) {
    const arr = PUZZLE_NAMES["en"];
    const n = arr && arr[id] ? arr[id].replace(/\n/g, "").trim() : "";
    return n || T[lang].puzzleFallback(id + 1);
}
