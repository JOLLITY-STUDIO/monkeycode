"use strict";
/**
 * scene/index.ts — 场景控制器集中导出
 *
 * BootRouter 从本入口统一 import 全部 Scene0-23 controller，
 * 避免硬编码 ../scene/SceneXController 路径。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEETING_SCENE_ID = exports.MeetingSceneController = exports.TITLE_MENU_SCENE_ID = exports.TitleMenuSceneController = exports.OPENING_SCENE_ID = exports.OpeningSceneController = exports.getSceneEntry = exports.SCENE_TABLE = exports.SceneController = exports.Scene23Controller = exports.Scene22Controller = exports.Scene21Controller = exports.Scene20Controller = exports.Scene19Controller = exports.Scene18Controller = exports.Scene17Controller = exports.Scene16Controller = exports.Scene15Controller = exports.Scene14Controller = exports.Scene13Controller = exports.Scene12Controller = exports.Scene11Controller = exports.Scene10Controller = exports.Scene9Controller = exports.Scene8Controller = exports.Scene7Controller = exports.Scene6Controller = exports.Scene5Controller = exports.Scene4Controller = exports.Scene3Controller = exports.Scene2Controller = exports.Scene1Controller = exports.Scene0Controller = void 0;
// Scene 0 (Tecmo logo 开场)
var Scene0Controller_1 = require("./Scene0Controller");
Object.defineProperty(exports, "Scene0Controller", { enumerable: true, get: function () { return Scene0Controller_1.Scene0Controller; } });
// Scene 1-13 (utility chain)
var Scene1Controller_1 = require("./Scene1Controller");
Object.defineProperty(exports, "Scene1Controller", { enumerable: true, get: function () { return Scene1Controller_1.Scene1Controller; } });
var Scene2Controller_1 = require("./Scene2Controller");
Object.defineProperty(exports, "Scene2Controller", { enumerable: true, get: function () { return Scene2Controller_1.Scene2Controller; } });
var Scene3Controller_1 = require("./Scene3Controller");
Object.defineProperty(exports, "Scene3Controller", { enumerable: true, get: function () { return Scene3Controller_1.Scene3Controller; } });
var Scene4Controller_1 = require("./Scene4Controller");
Object.defineProperty(exports, "Scene4Controller", { enumerable: true, get: function () { return Scene4Controller_1.Scene4Controller; } });
var Scene5Controller_1 = require("./Scene5Controller");
Object.defineProperty(exports, "Scene5Controller", { enumerable: true, get: function () { return Scene5Controller_1.Scene5Controller; } });
var Scene6Controller_1 = require("./Scene6Controller");
Object.defineProperty(exports, "Scene6Controller", { enumerable: true, get: function () { return Scene6Controller_1.Scene6Controller; } });
var Scene7Controller_1 = require("./Scene7Controller");
Object.defineProperty(exports, "Scene7Controller", { enumerable: true, get: function () { return Scene7Controller_1.Scene7Controller; } });
var Scene8Controller_1 = require("./Scene8Controller");
Object.defineProperty(exports, "Scene8Controller", { enumerable: true, get: function () { return Scene8Controller_1.Scene8Controller; } });
var Scene9Controller_1 = require("./Scene9Controller");
Object.defineProperty(exports, "Scene9Controller", { enumerable: true, get: function () { return Scene9Controller_1.Scene9Controller; } });
var Scene10Controller_1 = require("./Scene10Controller");
Object.defineProperty(exports, "Scene10Controller", { enumerable: true, get: function () { return Scene10Controller_1.Scene10Controller; } });
var Scene11Controller_1 = require("./Scene11Controller");
Object.defineProperty(exports, "Scene11Controller", { enumerable: true, get: function () { return Scene11Controller_1.Scene11Controller; } });
var Scene12Controller_1 = require("./Scene12Controller");
Object.defineProperty(exports, "Scene12Controller", { enumerable: true, get: function () { return Scene12Controller_1.Scene12Controller; } });
var Scene13Controller_1 = require("./Scene13Controller");
Object.defineProperty(exports, "Scene13Controller", { enumerable: true, get: function () { return Scene13Controller_1.Scene13Controller; } });
// Scene 14-23 (主游戏)
var Scene14Controller_1 = require("./Scene14Controller");
Object.defineProperty(exports, "Scene14Controller", { enumerable: true, get: function () { return Scene14Controller_1.Scene14Controller; } });
var Scene15Controller_1 = require("./Scene15Controller");
Object.defineProperty(exports, "Scene15Controller", { enumerable: true, get: function () { return Scene15Controller_1.Scene15Controller; } });
var Scene16Controller_1 = require("./Scene16Controller");
Object.defineProperty(exports, "Scene16Controller", { enumerable: true, get: function () { return Scene16Controller_1.Scene16Controller; } });
var Scene17Controller_1 = require("./Scene17Controller");
Object.defineProperty(exports, "Scene17Controller", { enumerable: true, get: function () { return Scene17Controller_1.Scene17Controller; } });
var Scene18Controller_1 = require("./Scene18Controller");
Object.defineProperty(exports, "Scene18Controller", { enumerable: true, get: function () { return Scene18Controller_1.Scene18Controller; } });
var Scene19Controller_1 = require("./Scene19Controller");
Object.defineProperty(exports, "Scene19Controller", { enumerable: true, get: function () { return Scene19Controller_1.Scene19Controller; } });
var Scene20Controller_1 = require("./Scene20Controller");
Object.defineProperty(exports, "Scene20Controller", { enumerable: true, get: function () { return Scene20Controller_1.Scene20Controller; } });
var Scene21Controller_1 = require("./Scene21Controller");
Object.defineProperty(exports, "Scene21Controller", { enumerable: true, get: function () { return Scene21Controller_1.Scene21Controller; } });
var Scene22Controller_1 = require("./Scene22Controller");
Object.defineProperty(exports, "Scene22Controller", { enumerable: true, get: function () { return Scene22Controller_1.Scene22Controller; } });
var Scene23Controller_1 = require("./Scene23Controller");
Object.defineProperty(exports, "Scene23Controller", { enumerable: true, get: function () { return Scene23Controller_1.Scene23Controller; } });
// 场景控制器基类 + 行为表
var SceneController_1 = require("./SceneController");
Object.defineProperty(exports, "SceneController", { enumerable: true, get: function () { return SceneController_1.SceneController; } });
var SceneTable_1 = require("./SceneTable");
Object.defineProperty(exports, "SCENE_TABLE", { enumerable: true, get: function () { return SceneTable_1.SCENE_TABLE; } });
Object.defineProperty(exports, "getSceneEntry", { enumerable: true, get: function () { return SceneTable_1.getSceneEntry; } });
// 片头序列（附加场景 sceneId=100，boot 后进、播完切 Scene0）
var OpeningSceneController_1 = require("./OpeningSceneController");
Object.defineProperty(exports, "OpeningSceneController", { enumerable: true, get: function () { return OpeningSceneController_1.OpeningSceneController; } });
Object.defineProperty(exports, "OPENING_SCENE_ID", { enumerable: true, get: function () { return OpeningSceneController_1.OPENING_SCENE_ID; } });
// 主菜单 title（附加场景 sceneId=200，ROM 主菜单；由 OpeningScene START 触发）
var TitleMenuSceneController_1 = require("./TitleMenuSceneController");
Object.defineProperty(exports, "TitleMenuSceneController", { enumerable: true, get: function () { return TitleMenuSceneController_1.TitleMenuSceneController; } });
Object.defineProperty(exports, "TITLE_MENU_SCENE_ID", { enumerable: true, get: function () { return TitleMenuSceneController_1.TITLE_MENU_SCENE_ID; } });
// 第一关 meeting 页面（附加场景 sceneId=300，Scene14-23 chain 链路终点）
var MeetingSceneController_1 = require("./MeetingSceneController");
Object.defineProperty(exports, "MeetingSceneController", { enumerable: true, get: function () { return MeetingSceneController_1.MeetingSceneController; } });
Object.defineProperty(exports, "MEETING_SCENE_ID", { enumerable: true, get: function () { return MeetingSceneController_1.MEETING_SCENE_ID; } });
