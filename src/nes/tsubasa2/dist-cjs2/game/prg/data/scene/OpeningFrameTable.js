"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENING_FRAMES = void 0;
exports.getOpeningFrame = getOpeningFrame;
const opening_tecmo_start_1 = require("./opening/opening-tecmo-start");
const opening_title_1_1 = require("./opening/opening-title-1");
const opening_title_2_1 = require("./opening/opening-title-2");
const opening_subtitle_1_1 = require("./opening/opening-subtitle-1");
const opening_subtitle_2_1 = require("./opening/opening-subtitle-2");
const opening_subtitle_3_1 = require("./opening/opening-subtitle-3");
const opening_subtitle_4_1 = require("./opening/opening-subtitle-4");
const opening_subtitle_5_1 = require("./opening/opening-subtitle-5");
const opening_subtitle_6_1 = require("./opening/opening-subtitle-6");
const opening_subtitle_7_1 = require("./opening/opening-subtitle-7");
const opening_ending_scroll_1 = require("./opening/opening-ending-scroll");
const opening_ending_end_1 = require("./opening/opening-ending-end");
exports.OPENING_FRAMES = [
    ...opening_tecmo_start_1.OPENING_FRAMES_SCENE_1,
    ...opening_title_1_1.OPENING_FRAMES_SCENE_2,
    ...opening_title_2_1.OPENING_FRAMES_SCENE_3,
    ...opening_subtitle_1_1.OPENING_FRAMES_SCENE_4,
    ...opening_subtitle_2_1.OPENING_FRAMES_SCENE_5,
    ...opening_subtitle_3_1.OPENING_FRAMES_SCENE_6,
    ...opening_subtitle_4_1.OPENING_FRAMES_SCENE_7,
    ...opening_subtitle_5_1.OPENING_FRAMES_SCENE_8,
    ...opening_subtitle_6_1.OPENING_FRAMES_SCENE_9,
    ...opening_subtitle_7_1.OPENING_FRAMES_SCENE_10,
    ...opening_ending_scroll_1.OPENING_FRAMES_SCENE_11,
    ...opening_ending_end_1.OPENING_FRAMES_SCENE_12,
];
function getOpeningFrame(nesFrame) {
    const idx = nesFrame - 10;
    return idx >= 0 && idx < exports.OPENING_FRAMES.length ? exports.OPENING_FRAMES[idx] : undefined;
}
