/**
 * pages/tutorial —— 教程页（How to Play）—— 原版 Picross DS 交互式逐步教程移植
 *
 * 与原版一致：不是静态讲解页，而是 5x5 真实拼图上按 ROM 脚本（MESSAGES[37]~[89]）
 * 逐步教学：整列涂满 → 行 3,1 → X Mode 画叉 → 填 X 下方 → 连接已填格 → 自由完成。
 * 每一步展示对应 ROM 原文；错误操作被拦截并弹出 ROM 原文错误提示（MESSAGES[84]~[90]），
 * 同时强制教学 Pen/X 模式切换（工具栏左上角，原版位置）。
 */
import { PicrossEngine } from "../../src/core/engine";
import { PicrossRenderer } from "../../src/render/renderer";
import { puzzleFromData } from "../../src/core/puzzle-loader";
import { TUTORIAL_PUZZLE } from "../../src/data/tutorial";
import { MESSAGES } from "../../src/data/messages";
import { getLang, Lang, uiStrings } from "../../src/i18n/index";
import { Sfx } from "../../src/audio/sfx";
import { bgm } from "../../src/audio/bgm";

type Mark = "filled" | "crossed";
interface CellReq {
  x: number;
  y: number;
  mark: Mark;
}
interface TutorialStep {
  /** ok=仅阅读按OK继续; pen=用笔填充; x=用 X 画叉; free=自由完成（引擎判 solved） */
  mode: "ok" | "pen" | "x" | "free";
  text: string;
  /** 本步必须完成的标记（全部满足 → 自动进入下一步） */
  require?: CellReq[];
  /** 本步允许但非必需的标记（做对不算错） */
  allow?: CellReq[];
}

const T = (x: number, y: number, mark: Mark = "filled"): CellReq => ({ x, y, mark });

/** 由 ROM 消息原文（索引切片拼接，含跨块续句）构造文本 */
const MSG = (...ids: number[]): string => ids.map((i) => MESSAGES[i] || "").join("");

/** 在文本 src 中截取 from→to（含 to 结尾标记）的一段 ROM 原文 */
const grabIn = (src: string, from: string, to: string): string => {
  const i = src.indexOf(from);
  const j = i >= 0 ? src.indexOf(to, i + from.length) : -1;
  return i >= 0 && j > i ? src.slice(i, j + to.length).trim() : "";
};

/** 教程全文（去换行，便于按整句截取）。注意：MESSAGES 按定长块切分，
 *  会从单词中间断开（如 "sliding the st"），必须拼回完整句子 */
const ALL = MSG(
  37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
  63, 64, 65, 66, 67, 68, 69, 70
).replace(/\n/g, " ");

/** 英文步骤文本（ROM 原文） */
const EN_STEPS: string[] = [
  grabIn(ALL, "Welcome to the world", "need to know before playing."),
  grabIn(ALL, "The numbers above each column", "need to be filled in."),
  grabIn(ALL, "For example, the number 5 here", "Fill them in now."),
  grabIn(ALL, "You can fill in all 5 in one go", "start with the large numbers first"),
  grabIn(ALL, "See how the number 5 faded", "filled in the correct number of squares."),
  grabIn(ALL, "The numbers that appear beside each row", "row need to be filled in."),
  grabIn(ALL, "The 3 and 1 here mean", "Go ahead and fill them in."),
  grabIn(ALL, "To show that the remaining square", "between the 3 squares and the 1 square."),
  grabIn(ALL, "Now, take a look at the column", "directly below your X."),
  grabIn(ALL, "Now, go back to Pen Mode", "Now you can fill in the 3 squares below the X."),
  grabIn(ALL, "This column already has a hint", "one X above and one below the filled square."),
  grabIn(ALL, "That X you placed on the top row", "figure out which squares to fill in."),
  grabIn(ALL, "Now, switch back to Pen Mode and fill", "Fill in the square between the two filled squares."),
  grabIn(ALL, "Now, over at the last column", "you can fill in areas that overlap."),
  grabIn(ALL, "Almost done! Just a few more squares", "try to solve the rest of the puzzle on your own."),
];

const EN_SOLVED = grabIn(ALL, "Well done! You've solved", "some of the other features...");
const EN_END = grabIn(MSG(82, 83, 84).replace(/\n/g, " "), "That brings us to the", "Have fun!");

/** 英文错误提示（ROM 原文，程序化截取） */
const EN_ERR = (() => {
  const src = MSG(84, 85, 86, 87, 88, 89).replace(/\n/g, " ");
  const grab = (from: string, to: string) => {
    const i = src.indexOf(from);
    const j = i >= 0 ? src.indexOf(to, i + from.length) : -1;
    return i >= 0 && j > i ? src.slice(i, j).trim() : "";
  };
  return {
    switchX: grab("Go to the X icon", "You don't know if that"),
    notX: grab("You don't know if that", "Go to the Pen icon"),
    switchPen: grab("Go to the Pen icon", "Not so fast!"),
    notYet: grab("Not so fast!", "That square isn't an X."),
    notAX: grab("That square isn't an X.", "You can't fill in that square."),
    cantFill: grab("You can't fill in that square.", "Let's learn "),
  };
})();

/** 错误提示键类型 */
type ErrKey = keyof typeof EN_ERR;

/** 多语言教程文本包 */
interface TutorialBundle {
  steps: string[];
  solved: string;
  end: string;
  err: Record<ErrKey, string>;
}

/** 教程步骤定义（不含文本，纯流程控制） */
const STEP_DEFS: Omit<TutorialStep, "text">[] = [
  { mode: "ok" },
  { mode: "ok" },
  { mode: "pen", require: [T(0, 0), T(0, 1), T(0, 2), T(0, 3), T(0, 4)] },
  { mode: "ok" },
  { mode: "ok" },
  { mode: "ok" },
  { mode: "pen", require: [T(0, 0), T(1, 0), T(2, 0)], allow: [T(4, 0)] },
  { mode: "x", require: [T(3, 0, "crossed")] },
  { mode: "ok" },
  { mode: "pen", require: [T(3, 1), T(3, 2), T(3, 3)] },
  { mode: "x", require: [T(3, 4, "crossed")] },
  { mode: "pen", require: [T(4, 0)] },
  { mode: "pen", require: [T(1, 1), T(2, 1)] },
  { mode: "pen", require: [T(4, 1), T(4, 2), T(4, 3)] },
  { mode: "free" },
];

/** 各语言翻译（英文直接取 ROM 原文；其余为翻译版本） */
const TUTORIAL_TEXTS: Record<Lang, TutorialBundle> = {
  en: {
    steps: EN_STEPS,
    solved: EN_SOLVED,
    end: EN_END,
    err: EN_ERR,
  },
  tc: {
    steps: [
      "歡迎來到 Picross 的世界！教學即將開始。閱讀完畢後，請觸碰下方螢幕的 OK 圖示。本教學會介紹你在開始遊戲前需要了解的基本規則與技巧。",
      "每個列上方的數字，表示該列需要塗黑的方格數。",
      "舉例來說，這裡的數字 5 表示這一列需要塗黑 5 個方格。因為這是個小拼圖（只有 5×5 個方格！），所以你可以安全地把整列都塗黑。現在就塗看看吧。",
      "你可以滑動觸控筆一次塗滿 5 個方格。你會發現先從大數字開始解題會比較容易。",
      "看到數字 5 變淡了嗎？這代表你已經成功塗滿了正確數量的方格。",
      "每個行旁邊的數字，表示該行需要塗黑的方格數。",
      "這裡的 3 和 1 表示你必須從左到右連續塗黑 3 個方格，然後再塗 1 個方格。它們之間至少要留 1 個空格。因為這是 5×5 的拼圖，唯一可能的解法就是塗滿前 3 個方格、留 1 格空格，再塗最後 1 格。動手塗看看吧。",
      "為了表示剩下的那個方格不可能被塗黑，你可以放一個 X 標記來擋住它。X 標記非常重要。首先，觸碰螢幕左上角的 X 圖示，這會啟動 X 模式。現在，在 3 個方格和 1 個方格之間的空格放一個 X。",
      "現在，看看穿過這個方格的那一列，你就會知道 X 有多好用！X 提供了一個提示：你必須連續塗黑 3 個方格，而唯一相連的 3 個方格就在 X 的正下方。",
      "現在，觸碰螢幕左上角的筆圖示回到筆模式。你可以隨時輕觸這些圖示來切換筆模式和 X 模式。現在你可以塗黑 X 下方的 3 個方格了。",
      "這一列已經有了一個提示——你剛才塗黑的方格。你知道它上面和下面的方格必須是空白，所以可以在兩邊都標上 X。我們來標記這兩格吧！首先切換到 X 模式，然後在塗黑方格的上方和下方各放一個 X。",
      "你在最上面那行放的 X 表示，要解開第一行，你必須在已塗黑方格的右邊塗黑一格。利用 X 標記和拼圖邊緣的數字，你就能判斷該塗哪些方格。",
      "現在，切換回筆模式並塗黑那個方格。好，來看看下一行。如果提示只有一個數字，任何未相連的塗黑方格最後一定會連在一起。塗黑兩個已塗黑方格之間的那一格。",
      "現在，來看最後一列，你可以看到有兩種可能的解法：塗黑上方 4 個方格，或下方 4 個方格。但不管怎麼看，中間 3 個方格都一定需要塗黑。所以動手吧！正如你所見，從兩個方向數過來的提示數字可以找出重疊的區域。",
      "快完成了！只剩下幾個方格……記住，Picross 不是靠猜的。每個拼圖都可以用邏輯思考來解開。現在，運用你學到的技巧，試著自己解完剩下的拼圖吧。",
    ],
    solved: "做得好！你已經解開了這個拼圖！你似乎已經掌握了 Picross 的基本規則。現在讓我們來看看其他功能……",
    end: "教學到此結束。你可以隨時從「玩法教學」選項再次觀看本教學。玩得開心！",
    err: {
      switchX: "請到螢幕左上角觸碰 X 圖示，切換到 X 模式。",
      notX: "你還不確定那個方格是否應該標 X。",
      switchPen: "請到螢幕左上角觸碰筆圖示，切換到筆模式。",
      notYet: "還沒那麼快！你還不確定那個方格現在能不能塗黑……",
      notAX: "那個方格不是 X。請再仔細看看提示中的數字。",
      cantFill: "你不能塗黑那個方格。請再仔細看看提示中的數字。",
    },
  },
  ja: {
    steps: [
      "ピクロスの世界へようこそ！チュートリアルを始めます。読み終わったら、下画面のOKアイコンをタッチしてください。このチュートリアルでは、ゲームを始める前に知っておくべき基本ルールとテクニックを紹介します。",
      "各列の上にある数字は、その列で塗りつぶさなければならないマスの数を示しています。",
      "例えば、ここの数字の5は、この列のマスを5つ塗りつぶす必要があることを示しています。これは小さなパズル（5×5マスだけ！）なので、列全体を安全に塗りつぶすことができます。さあ、塗りつぶしてみましょう。",
      "タッチペンを滑らせると、5マスを一度に塗りつぶすことができます。大きな数字から始めると、パズルが解きやすくなることがわかりますよ。",
      "数字の5が薄くなったのがわかりますか？これは、正しい数のマスを塗りつぶすと起こります。",
      "各行の横にある数字は、その行で塗りつぶさなければならないマスの数を示しています。",
      "ここの3と1は、左から右へ3マス連続で塗り、その後1マス塗ることを意味します。それらの間には少なくとも1マスの空白が必要です。このパズルは5×5なので、唯一の解き方は、最初の3マスを塗り、1マス空白を開け、最後の1マスを塗ることです。さあ、塗りつぶしてみましょう。",
      "残りのマスが塗れないことを示すために、Xマークを置いてブロックできます。Xマークは非常に重要です。まず、画面左上のXアイコンをタッチしてXモードに切り替えましょう。そして、3マスと1マスの間のマスにXを置きましょう。",
      "では、このマスを縦に貫く列を見てください。Xがどれほど役に立つかわかりますよ！Xはヒントになります。3マス連続で塗る必要があり、つながっている3マスはXの真下だけです。",
      "再び画面左上のペンアイコンをタッチしてペンモードに戻りましょう。いつでもこれらのアイコンをタップして、ペンモードとXモードを切り替えられます。では、Xの下の3マスを塗りつぶしましょう。",
      "この列にはすでにヒントがあります。さっき塗ったマスのことです。その上と下のマスは空白でなければならないので、両方にXを付けられます。Xを付けましょう！まずXモードに切り替え、塗ったマスの上と下に1つずつXを置きましょう。",
      "最上行に置いたXは、1行目を解くには、すでに塗ったマスの右のマスを塗る必要があることを意味します。Xマークとパズルの端にある数字を使えば、どのマスを塗るべきか判断できます。",
      "ペンモードに切り替えて、そのマスを塗りましょう。さて、次の行を見てみましょう。ヒントが1つの数字だけなら、離れている塗ったマスは最終的に必ずつながります。2つの塗ったマスの間のマスを塗りましょう。",
      "最後の列を見ると、2つの可能性があります。上の4マスを塗るか、下の4マスを塗るかです。しかし、どちらにしても、真ん中の3マスは必ず塗る必要があります。さあ、やってみましょう！このように、ヒントの数字を両方向から数えると、重なる部分を塗ることができます。",
      "もう少しです！あと数マス……。ピクロスは推測に頼るものではありません。すべてのパズルは論理的に考えれば解けます。さあ、学んだテクニックを使って、残りのパズルを自分で解いてみましょう。",
    ],
    solved: "よくできました！パズルを解きましたね！ピクロスの基本ルールをマスターしたようです。次に他の機能を見てみましょう……",
    end: "これでチュートリアルは終了です。「遊び方」オプションから、このチュートリアルをいつでも見直すことができます。楽しんでください！",
    err: {
      switchX: "画面左上のXアイコンをタッチして、Xモードに切り替えてください。",
      notX: "そのマスにXを付けるべきかまだわかりません。",
      switchPen: "画面左上のペンアイコンをタッチして、ペンモードに切り替えてください。",
      notYet: "まだ早いです！そのマスを今塗っていいかまだわかりません……",
      notAX: "そのマスはXではありません。ヒントの数字をもう一度確認してください。",
      cantFill: "そのマスは塗れません。ヒントの数字をもう一度確認してください。",
    },
  },
  ko: {
    steps: [
      "피크로스의 세계에 오신 것을 환영합니다! 튜토리얼을 시작하겠습니다. 읽기를 마치면 하단 화면의 OK 아이콘을 터치하세요. 이 튜토리얼은 게임을 시작하기 전에 알아야 할 기본 규칙과 기술을 소개합니다.",
      "각 열 위의 숫자는 해당 열에서 칠해야 하는 칸의 수를 보여줍니다.",
      "예를 들어, 여기 있는 숫자 5는 이 열의 칸 5개를 칠해야 한다는 뜻입니다. 이 퍼즐은 작은 퍼즐(5×5칸!)이므로 전체 열을 안전하게 칠할 수 있습니다. 지금 칠필보세요.",
      "스타일러스를 밀어서 5칸을 한 번에 칠할 수 있습니다. 큰 숫자부터 시작하면 퍼즐을 더 쉽게 풀 수 있습니다.",
      "숫자 5가 옅어진 것이 보이나요? 이것은 올바른 수의 칸을 성공적으로 칠했을 때 나타납니다.",
      "각 행 옆의 숫자는 해당 행에서 칠해야 하는 칸의 수를 보여줍니다.",
      "여기 있는 3과 1은 왼쪽에서 오른쪽으로 3칸을 연속으로 칠하고, 그 다음 1칸을 더 칠해야 한다는 뜻입니다. 사이에는 최소 1칸의 빈칸이 필요합니다. 이 퍼즐은 5×5이므로 유일한 해결 방법은 앞의 3칸을 칠하고, 1칸 비우고, 마지막 1칸을 칠하는 것입니다. 지금 칠필보세요.",
      "남은 칸을 칠할 수 없다는 것을 표시하려면 X 표시를 해서 막을 수 있습니다. X 표시는 매우 중요합니다. 먼저 화면 왼쪽 위의 X 아이콘을 터치하여 X 모드로 전환하세요. 이제 3칸과 1칸 사이의 칸에 X를 놓으세요.",
      "이제 이 칸을 가로지르는 열을 볼면 X가 얼마나 유용한지 알 수 있습니다! X는 힌트 역할을 합니다. 3칸을 연속으로 칠해야 하고, 유일하게 이어진 3칸은 X 바로 아래에 있습니다.",
      "다시 화면 왼쪽 위의 펜 아이콘을 터치하여 펜 모드로 돌아가세요. 언제든지 이 아이콘을 탭하여 펜 모드와 X 모드를 쉽게 전환할 수 있습니다. 이제 X 아래의 3칸을 칠할 수 있습니다.",
      "이 열에는 이미 힌트가 있습니다. 방금 칠한 칸입니다. 위아래 칸은 비어 있어야 하므로 둘 다 X로 표시할 수 있습니다. 그 칸들을 표시해 봅시다! 먼저 X 모드로 전환한 다음, 칠한 칸 위와 아래에 각각 하나씩 X를 놓으세요.",
      "맨 위 행에 놓은 X는 첫 번째 행을 풀려면 이미 칠한 칸 오른쪽 칸을 칠해야 한다는 뜻입니다. X 표시와 퍼즐 가장자리의 숫자를 사용하면 어떤 칸을 칠해야 할지 알 수 있습니다.",
      "펜 모드로 다시 전환하여 그 칸을 칠하세요. 자, 다음 행을 봅시다. 힌트가 한 개의 숫자뿐이라면, 떨어져 있는 칠한 칸은 반드시 연결됩니다. 두 칠한 칸 사이의 칸을 칠하세요.",
      "마지막 열을 볼면 두 가지 가능성이 있습니다. 위쪽 4칸을 칠하거나 아래쪽 4칸을 칠하는 것입니다. 하지만 어느 쪽이든 가욱 3칸은 반드시 칠해야 합니다. 그러니 시작하세요! 보시다시피, 양쪽 방향에서 힌트 숫자를 세면 겹치는 부분을 칠할 수 있습니다.",
      "거의 다 됐습니다! 이제 몇 칸만 남았습니다…… 기억하세요, 피크로스는 추측에 의존하지 않습니다. 모든 퍼즐은 논리적으로 생각하면 풀 수 있습니다. 이제 배운 기술을 사용하여 나머지 퍼즐을 스스로 풀어보세요.",
    ],
    solved: "잘했습니다! 퍼즐을 풀었습니다! 피크로스의 기본 규칙을 마스터한 것 같습니다. 이제 다른 기능을 살펴겠습니다……",
    end: "튜토리얼이 끝났습니다. '게임 방법' 옵션에서 이 튜토리얼을 다시 볼 수 있습니다. 즐겁게 플레이하세요!",
    err: {
      switchX: "화면 왼쪽 위의 X 아이콘을 터치하여 X 모드로 전환하세요.",
      notX: "그 칸에 X를 표시해야 하는지 아직 모릅니다.",
      switchPen: "화면 왼쪽 위의 펜 아이콘을 터치하여 펜 모드로 전환하세요.",
      notYet: "아직 빠릅니다! 그 칸을 지금 칠해도 되는지 아직 모릅니다……",
      notAX: "그 칸은 X가 아닙니다. 힌트의 숫자를 다시 살펴보세요.",
      cantFill: "그 칸은 칠할 수 없습니다. 힌트의 숫자를 다시 살펴보세요.",
    },
  },
};

/** 按语言生成完整 STEPS */
const makeSteps = (lang: Lang): TutorialStep[] =>
  STEP_DEFS.map((d, i) => ({ ...d, text: TUTORIAL_TEXTS[lang].steps[i] }));

interface BoardNode {
  width: number;
  height: number;
  getContext(type: "2d"): CanvasRenderingContext2D;
  requestAnimationFrame(cb: () => void): number;
}

Page({
  data: {
    stepIdx: 0,
    totalSteps: STEP_DEFS.length,
    msgText: "",
    showOk: false,
    penMode: true,
    errText: "",
    solved: false,
    done: false,
    solvedText: "",
    t: {} as Record<string, string>,
  },

  // ---- 实例字段（挂载到页面对象，避免 setData 开销）----
  sfx: null as Sfx | null,
  engine: null as PicrossEngine | null,
  renderer: null as PicrossRenderer | null,
  board: null as BoardNode | null,
  rect: null as any,
  dpr: 2,
  lang: "tc" as Lang,
  lastCell: null as { x: number; y: number } | null,
  errTimer: null as any,
  boardReady: false,
  steps: [] as TutorialStep[],
  typingTimer: null as any,
  typingFull: "",
  typingIdx: 0,
  digits: null as any,
  tiles: null as any,

  step(): TutorialStep {
    return this.steps[this.data.stepIdx] || this.steps[this.steps.length - 1];
  },

  onLoad() {
    this.lang = getLang();
    this.steps = makeSteps(this.lang);
    const t = uiStrings(this.lang);
    this.setData({
      t,
      totalSteps: this.steps.length,
      solvedText: TUTORIAL_TEXTS[this.lang].solved,
    });
    wx.setNavigationBarTitle({ title: t.howtoTitle });
  },

  onReady() {
    this.sfx = new Sfx();
    bgm.start("title");
    this.dpr = (wx.getSystemInfoSync() && wx.getSystemInfoSync().pixelRatio) || 2;
    wx.createSelectorQuery()
      .select("#board")
      .fields({ node: true, size: true, rect: true })
      .exec((res: any[]) => {
        if (!res || !res[0] || !res[0].node) return;
        const { node, width, height, rect } = res[0];
        node.width = width * this.dpr;
        node.height = height * this.dpr;
        this.board = node;
        this.rect = rect;
        // 预加载 ROM 字体与 UI tile atlas
        this.loadAssets(node, () => {
          this.startEngine();
          this.boardReady = true;
          this.enterStep(0);
          const loop = () => {
            if (this.engine && this.renderer) this.renderer.draw(this.engine.getState());
            node.requestAnimationFrame(loop);
          };
          node.requestAnimationFrame(loop);
        });
      });
  },

  loadAssets(node: BoardNode, cb: () => void) {
    let pending = 2;
    const done = () => {
      pending--;
      if (pending === 0) cb();
    };
    const digits = node.createImage();
    digits.onload = () => { this.digits = digits; done(); };
    digits.onerror = () => { console.warn("[digits] load failed"); done(); };
    digits.src = "/assets/digits.png";
    const tiles = node.createImage();
    tiles.onload = () => { this.tiles = tiles; done(); };
    tiles.onerror = () => { console.warn("[tiles] load failed"); done(); };
    tiles.src = "/assets/nds_tiles.png";
  },

  startEngine() {
    if (this.engine) this.engine.destroy();
    const puzzle = puzzleFromData(TUTORIAL_PUZZLE);
    this.engine = new PicrossEngine(puzzle, {
      onStateChange: () => this.checkStepComplete(),
      onSolved: () => {
        this.setData({ solved: true, done: false });
        if (this.sfx) this.sfx.play("win");
        wx.vibrateShort && wx.vibrateShort({ type: "medium" });
      },
    });
    this.renderer = this.board ? new PicrossRenderer(this.board, { digits: this.digits, tiles: this.tiles }) : null;
    this.lastCell = null;
    this.engine.start();
  },

  /** 进入某一步：启动打字机逐字显示文本 */
  enterStep(i: number) {
    const s = this.steps[i];
    if (!s) return;
    this.setData({ stepIdx: i, errText: "" });
    this.startTyping(s.text);
  },

  /** 启动打字机效果 */
  startTyping(full: string) {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.typingFull = full;
    this.typingIdx = 0;
    this.setData({ msgText: "", showOk: false });
    this.tickTyping();
  },

  tickTyping() {
    if (this.typingIdx >= this.typingFull.length) {
      this.finishTyping();
      return;
    }
    this.typingIdx++;
    this.setData({ msgText: this.typingFull.slice(0, this.typingIdx) });
    this.typingTimer = setTimeout(() => this.tickTyping(), 24);
  },

  /** 立即显示完整文本并显示 OK（需求已满足或纯讲解步） */
  finishTyping() {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
    this.typingIdx = this.typingFull.length;
    const s = this.step();
    const allMet = !!s.require && s.require.every((r) => this.hasMark(r));
    this.setData({ msgText: this.typingFull, showOk: s.mode === "ok" || allMet });
  },

  hasMark(r: CellReq): boolean {
    if (!this.engine) return false;
    return this.engine.getState().marks[r.y * TUTORIAL_PUZZLE.width + r.x] === r.mark;
  },

  /** 每一步动作完成后检查：需求全部满足 → 自动进入下一步 */
  checkStepComplete() {
    if (!this.boardReady || this.data.solved) return;
    // 打字期间不自动推进（等玩家读完当前文本）
    if (this.typingTimer || this.typingIdx < this.typingFull.length) return;
    const s = this.step();
    if (s.mode === "free") return; // free 步骤由引擎 onSolved 收尾
    if (s.require && s.require.every((r) => this.hasMark(r))) {
      this.enterStep(this.data.stepIdx + 1);
    }
  },

  /** OK 按钮：
   *  - 打字中 → 立即显示完整文本
   *  - 纯讲解步骤 / 已满足步骤 → 下一步
   *  - 完成面板 OK → 结束语
   *  - 结束语 OK → 进选择页
   */
  onOk() {
    if (this.typingTimer || this.typingIdx < this.typingFull.length) {
      this.finishTyping();
      return;
    }
    if (this.data.done) {
      this.finish();
      return;
    }
    if (this.data.solved) {
      this.setData({ solved: false, done: true });
      this.startTyping(TUTORIAL_TEXTS[this.lang].end);
      return;
    }
    this.enterStep(this.data.stepIdx + 1);
  },

  onSkip() {
    this.finish();
  },

  finish() {
    const w = wx as any;
    if (w.setStorageSync) w.setStorageSync("picross_tutorial_done", 1);
    else if ((globalThis as any).localStorage)
      (globalThis as any).localStorage.setItem("picross_tutorial_done", "1");
    bgm.stop();
    wx.reLaunch({ url: "/pages/select/select" });
  },

  // ---------- 工具模式 ----------
  onSetPen() {
    this.setData({ penMode: true });
  },

  onSetX() {
    this.setData({ penMode: false });
  },

  showError(text: string) {
    if (this.errTimer) clearTimeout(this.errTimer);
    this.setData({ errText: text });
    if (this.sfx) this.sfx.play("mistake");
    this.errTimer = setTimeout(() => this.setData({ errText: "" }), 2600);
  },

  // ---------- 触摸 ----------
  cellFromTouch(e: any): { x: number; y: number } | null {
    if (!this.engine || !this.rect) return null;
    const t = e.touches && e.touches[0];
    if (!t) return null;
    const state = this.engine.getState();
    const h = this.renderer!.hitTest(
      (t.x - this.rect.left) * this.dpr,
      (t.y - this.rect.top) * this.dpr,
      state
    );
    return h.type === "cell" ? { x: h.x, y: h.y } : null;
  },

  onTouchStart(e: any) {
    const c = this.cellFromTouch(e);
    if (!c || !this.engine) return;
    this.lastCell = c;
    this.applyMark(c.x, c.y);
  },

  onTouchMove(e: any) {
    const c = this.cellFromTouch(e);
    if (!c || !this.engine || !this.lastCell) return;
    if (c.x === this.lastCell.x && c.y === this.lastCell.y) return;
    this.lastCell = c;
    this.applyMark(c.x, c.y);
  },

  onTouchEnd() {
    this.lastCell = null;
  },

  applyMark(x: number, y: number) {
    if (this.data.solved || this.data.done) return;
    // 文本未显示完时禁止棋盘操作（优先读完当前提示）
    if (this.typingTimer || this.typingIdx < this.typingFull.length) return;
    const s = this.step();
    if (s.mode === "ok") return; // 讲解中禁输入（原版文本窗期间不可操作）

    const st = this.engine!.getState();
    const cur = st.marks[y * st.puzzle.width + x];
    const pen = this.data.penMode;
    const isSol = this.isSolution(x, y);

    // 撤销：当前模式下再次点已标记格 → 清除（所有步骤均允许）
    if ((pen && cur === "filled") || (!pen && cur === "crossed")) {
      this.engine!.clearCell(x, y);
      if (this.sfx) this.sfx.play("clear");
      return;
    }

    if (pen) this.attemptFill(x, y, s, isSol);
    else this.attemptX(x, y, s, isSol);
  },

  /** 用笔填充：教学步骤强制 Pen 模式 + 只允许本步推导格 */
  attemptFill(x: number, y: number, s: TutorialStep, isSol: boolean) {
    const err = TUTORIAL_TEXTS[this.lang].err;
    if (s.mode === "x") {
      this.showError(err.switchX);
      return;
    }
    if (!isSol) {
      this.showError(err.cantFill);
      return;
    }
    const allowed = (s.mode === "free") ||
      (s.require && s.require.some((r) => r.mark === "filled" && r.x === x && r.y === y)) ||
      (s.allow && s.allow.some((r) => r.mark === "filled" && r.x === x && r.y === y));
    if (!allowed) {
      this.showError(err.notYet);
      return;
    }
    this.engine!.tapCell(x, y, "mark", "filled");
    if (this.sfx) this.sfx.play("tap");
  },

  /** 用 X 画叉：教学步骤强制 X 模式 + 只允许本步推导 X 格 */
  attemptX(x: number, y: number, s: TutorialStep, isSol: boolean) {
    const err = TUTORIAL_TEXTS[this.lang].err;
    if (s.mode === "pen") {
      this.showError(err.switchPen);
      return;
    }
    if (isSol) {
      this.showError(err.notAX);
      return;
    }
    const allowed = (s.mode === "free") ||
      (s.require && s.require.some((r) => r.mark === "crossed" && r.x === x && r.y === y)) ||
      (s.allow && s.allow.some((r) => r.mark === "crossed" && r.x === x && r.y === y));
    if (!allowed) {
      this.showError(err.notX);
      return;
    }
    this.engine!.tapCell(x, y, "mark", "crossed");
    if (this.sfx) this.sfx.play("cross");
  },

  isSolution(x: number, y: number): boolean {
    const p = this.engine!.getState().puzzle;
    const bit = y * p.width + x;
    return (p.solution[bit >> 3] >> (7 - (bit & 7))) & 1 ? true : false;
  },

  onHide() {
    bgm.stop();
    if (this.typingTimer) clearTimeout(this.typingTimer);
  },

  onUnload() {
    bgm.stop();
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.engine) this.engine.destroy();
  },
});
