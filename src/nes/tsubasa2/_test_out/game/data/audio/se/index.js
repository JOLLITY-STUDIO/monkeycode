"use strict";
/**
 * SE Data Index — 所有音效通道数据
 * 同步自 mini-audio/se-data，自动生成于 Bank 12 SE 指针表 ($8BDA)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SE_COUNT = exports.SE_CHANNELS = void 0;
const SE0_1 = require("./SE0");
const SE1_1 = require("./SE1");
const SE2_1 = require("./SE2");
const SE3_1 = require("./SE3");
const SE4_1 = require("./SE4");
const SE5_1 = require("./SE5");
const SE6_1 = require("./SE6");
const SE7_1 = require("./SE7");
const SE8_1 = require("./SE8");
const SE9_1 = require("./SE9");
const SE10_1 = require("./SE10");
const SE11_1 = require("./SE11");
const SE12_1 = require("./SE12");
const SE13_1 = require("./SE13");
const SE14_1 = require("./SE14");
const SE15_1 = require("./SE15");
exports.SE_CHANNELS = [
    {
        index: 0,
        headerAddr: 36418,
        subSections: SE0_1.SE0_SUB_SECTIONS,
        subData: SE0_1.SE0_SUB_DATA,
        track: SE0_1.SE0_TRACK,
    },
    {
        index: 1,
        headerAddr: 36443,
        subSections: SE1_1.SE1_SUB_SECTIONS,
        subData: SE1_1.SE1_SUB_DATA,
        track: SE1_1.SE1_TRACK,
    },
    {
        index: 2,
        headerAddr: 36456,
        subSections: SE2_1.SE2_SUB_SECTIONS,
        subData: SE2_1.SE2_SUB_DATA,
        track: SE2_1.SE2_TRACK,
    },
    {
        index: 3,
        headerAddr: 36489,
        subSections: SE3_1.SE3_SUB_SECTIONS,
        subData: SE3_1.SE3_SUB_DATA,
        track: SE3_1.SE3_TRACK,
    },
    {
        index: 4,
        headerAddr: 36559,
        subSections: SE4_1.SE4_SUB_SECTIONS,
        subData: SE4_1.SE4_SUB_DATA,
        track: SE4_1.SE4_TRACK,
    },
    {
        index: 5,
        headerAddr: 36781,
        subSections: SE5_1.SE5_SUB_SECTIONS,
        subData: SE5_1.SE5_SUB_DATA,
        track: SE5_1.SE5_TRACK,
    },
    {
        index: 6,
        headerAddr: 36628,
        subSections: SE6_1.SE6_SUB_SECTIONS,
        subData: SE6_1.SE6_SUB_DATA,
        track: SE6_1.SE6_TRACK,
    },
    {
        index: 7,
        headerAddr: 37028,
        subSections: SE7_1.SE7_SUB_SECTIONS,
        subData: SE7_1.SE7_SUB_DATA,
        track: SE7_1.SE7_TRACK,
    },
    {
        index: 8,
        headerAddr: 37429,
        subSections: SE8_1.SE8_SUB_SECTIONS,
        subData: SE8_1.SE8_SUB_DATA,
        track: SE8_1.SE8_TRACK,
    },
    {
        index: 9,
        headerAddr: 38604,
        subSections: SE9_1.SE9_SUB_SECTIONS,
        subData: SE9_1.SE9_SUB_DATA,
        track: SE9_1.SE9_TRACK,
    },
    {
        index: 10,
        headerAddr: 38729,
        subSections: SE10_1.SE10_SUB_SECTIONS,
        subData: SE10_1.SE10_SUB_DATA,
        track: SE10_1.SE10_TRACK,
    },
    {
        index: 11,
        headerAddr: 37249,
        subSections: SE11_1.SE11_SUB_SECTIONS,
        subData: SE11_1.SE11_SUB_DATA,
        track: SE11_1.SE11_TRACK,
    },
    {
        index: 12,
        headerAddr: 37354,
        subSections: SE12_1.SE12_SUB_SECTIONS,
        subData: SE12_1.SE12_SUB_DATA,
        track: SE12_1.SE12_TRACK,
    },
    {
        index: 13,
        headerAddr: 37149,
        subSections: SE13_1.SE13_SUB_SECTIONS,
        subData: SE13_1.SE13_SUB_DATA,
        track: SE13_1.SE13_TRACK,
    },
    {
        index: 14,
        headerAddr: 36985,
        subSections: SE14_1.SE14_SUB_SECTIONS,
        subData: SE14_1.SE14_SUB_DATA,
        track: SE14_1.SE14_TRACK,
    },
    {
        index: 15,
        headerAddr: 36698,
        subSections: SE15_1.SE15_SUB_SECTIONS,
        subData: SE15_1.SE15_SUB_DATA,
        track: SE15_1.SE15_TRACK,
    },
];
/** SE 总数 */
exports.SE_COUNT = 16;
