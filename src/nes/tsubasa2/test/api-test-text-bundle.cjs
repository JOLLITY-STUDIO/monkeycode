"use strict";
(() => {
  // src/game/prg/data/tables/player-stats.ts
  var PLAYER_TABLE = [
    {
      id: 1,
      name: "Tsubasa",
      club: 1,
      position: 0,
      stamina: 21,
      shot: 12,
      pass: 23,
      dribble: 14,
      block: 12,
      tackle: 16,
      intercept: 14,
      lowShot: 0,
      lowPass: 32,
      lowTrap: 14,
      lowLet: 21,
      lowCtrlClr: 24,
      lowUnctrl: 9,
      lowChal: 15,
      lowIntc: 15,
      highShot: 17,
      highPass: 21,
      highTrap: 12,
      highLet: 23,
      highCtrlClr: 12,
      highUnctrl: 11,
      highChal: 15,
      highIntc: 14
    },
    {
      id: 2,
      name: "Lennart",
      club: 1,
      position: 1,
      stamina: 0,
      pass: 10,
      catching: 4,
      punching: 4,
      vsShot: 0,
      vsDribble: 0,
      lowRush: 8,
      highClaim: 8,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 3,
      name: "Lima",
      club: 1,
      position: 0,
      stamina: 1,
      shot: 2,
      pass: 7,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 2,
      lowTrap: 5,
      lowLet: 0,
      lowCtrlClr: 1,
      lowUnctrl: 0,
      lowChal: 1,
      lowIntc: 0,
      highShot: 8,
      highPass: 0,
      highTrap: 0,
      highLet: 3,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 4,
      name: "Marini",
      club: 1,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 3,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 1,
      lowTrap: 2,
      lowLet: 5,
      lowCtrlClr: 6,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 1,
      highShot: 5,
      highPass: 5,
      highTrap: 4,
      highLet: 8,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 5,
      name: "Amaral",
      club: 1,
      position: 0,
      stamina: 5,
      shot: 4,
      pass: 8,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 1,
      lowLet: 2,
      lowCtrlClr: 3,
      lowUnctrl: 0,
      lowChal: 1,
      lowIntc: 0,
      highShot: 3,
      highPass: 2,
      highTrap: 1,
      highLet: 6,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 6,
      name: "Dottil",
      club: 1,
      position: 0,
      stamina: 2,
      shot: 1,
      pass: 6,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 6,
      lowLet: 15,
      lowCtrlClr: 13,
      lowUnctrl: 4,
      lowChal: 4,
      lowIntc: 3,
      highShot: 7,
      highPass: 15,
      highTrap: 8,
      highLet: 14,
      highCtrlClr: 5,
      highUnctrl: 3,
      highChal: 7,
      highIntc: 9
    },
    {
      id: 7,
      name: "Battista",
      club: 1,
      position: 0,
      stamina: 15,
      shot: 9,
      pass: 14,
      dribble: 5,
      block: 3,
      tackle: 7,
      intercept: 9,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 3,
      lowLet: 4,
      lowCtrlClr: 4,
      lowUnctrl: 6,
      lowChal: 8,
      lowIntc: 7,
      highShot: 4,
      highPass: 4,
      highTrap: 2,
      highLet: 5,
      highCtrlClr: 7,
      highUnctrl: 5,
      highChal: 9,
      highIntc: 6
    },
    {
      id: 8,
      name: "Tahamata",
      club: 1,
      position: 0,
      stamina: 14,
      shot: 10,
      pass: 13,
      dribble: 16,
      block: 14,
      tackle: 18,
      intercept: 12,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 3,
      lowLet: 4,
      lowCtrlClr: 4,
      lowUnctrl: 6,
      lowChal: 10,
      lowIntc: 5,
      highShot: 12,
      highPass: 13,
      highTrap: 9,
      highLet: 12,
      highCtrlClr: 15,
      highUnctrl: 13,
      highChal: 17,
      highIntc: 11
    },
    {
      id: 9,
      name: "Babinton",
      club: 1,
      position: 0,
      stamina: 4,
      shot: 2,
      pass: 5,
      dribble: 7,
      block: 5,
      tackle: 9,
      intercept: 4,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 2,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 2,
      lowChal: 6,
      lowIntc: 0,
      highShot: 4,
      highPass: 0,
      highTrap: 0,
      highLet: 2,
      highCtrlClr: 4,
      highUnctrl: 2,
      highChal: 6,
      highIntc: 1
    },
    {
      id: 10,
      name: "Gil",
      club: 1,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 2,
      dribble: 4,
      block: 2,
      tackle: 6,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 1,
      lowIntc: 1,
      highShot: 1,
      highPass: 0,
      highTrap: 0,
      highLet: 1,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 0
    },
    {
      id: 11,
      name: "Platton",
      club: 1,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 1,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 2,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 3,
      lowChal: 5,
      lowIntc: 3,
      highShot: 4,
      highPass: 0,
      highTrap: 0,
      highLet: 2,
      highCtrlClr: 5,
      highUnctrl: 3,
      highChal: 7,
      highIntc: 2
    },
    {
      id: 12,
      name: "Urabe",
      club: 1,
      position: 0,
      stamina: 1,
      shot: 0,
      pass: 8,
      dribble: 6,
      block: 4,
      tackle: 8,
      intercept: 3,
      lowShot: 0,
      lowPass: 2,
      lowTrap: 4,
      lowLet: 3,
      lowCtrlClr: 2,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 4,
      highShot: 6,
      highPass: 3,
      highTrap: 0,
      highLet: 5,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 13,
      name: "Kishida",
      club: 1,
      position: 0,
      stamina: 11,
      shot: 8,
      pass: 15,
      dribble: 11,
      block: 9,
      tackle: 13,
      intercept: 8,
      lowShot: 0,
      lowPass: 20,
      lowTrap: 3,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 8,
      lowChal: 7,
      lowIntc: 1,
      highShot: 5,
      highPass: 0,
      highTrap: 0,
      highLet: 2,
      highCtrlClr: 9,
      highUnctrl: 7,
      highChal: 11,
      highIntc: 2
    },
    {
      id: 14,
      name: "Nakayama",
      club: 1,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 2,
      dribble: 9,
      block: 7,
      tackle: 11,
      intercept: 2,
      lowShot: 0,
      lowPass: 32,
      lowTrap: 5,
      lowLet: 2,
      lowCtrlClr: 7,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 7,
      highPass: 2,
      highTrap: 5,
      highLet: 9,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 0
    },
    {
      id: 15,
      name: "Morisaki",
      club: 1,
      position: 1,
      stamina: 20,
      pass: 15,
      catching: 27,
      punching: 38,
      vsShot: 19,
      vsDribble: 19,
      lowRush: 22,
      highClaim: 23,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 16,
      name: "Takasugu",
      club: 1,
      position: 0,
      stamina: 3,
      shot: 7,
      pass: 11,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 0,
      lowShot: 0,
      lowPass: 40,
      lowTrap: 15,
      lowLet: 5,
      lowCtrlClr: 8,
      lowUnctrl: 14,
      lowChal: 16,
      lowIntc: 1,
      highShot: 18,
      highPass: 5,
      highTrap: 8,
      highLet: 15,
      highCtrlClr: 16,
      highUnctrl: 14,
      highChal: 18,
      highIntc: 0
    },
    {
      id: 17,
      name: "Misaki",
      club: 1,
      position: 0,
      stamina: 5,
      shot: 8,
      pass: 15,
      dribble: 16,
      block: 14,
      tackle: 18,
      intercept: 0,
      lowShot: 0,
      lowPass: 32,
      lowTrap: 7,
      lowLet: 2,
      lowCtrlClr: 6,
      lowUnctrl: 3,
      lowChal: 13,
      lowIntc: 1,
      highShot: 10,
      highPass: 2,
      highTrap: 4,
      highLet: 7,
      highCtrlClr: 8,
      highUnctrl: 10,
      highChal: 12,
      highIntc: 0
    },
    {
      id: 18,
      name: "Izawa",
      club: 1,
      position: 0,
      stamina: 2,
      shot: 4,
      pass: 7,
      dribble: 8,
      block: 10,
      tackle: 12,
      intercept: 0,
      lowShot: 0,
      lowPass: 30,
      lowTrap: 7,
      lowLet: 1,
      lowCtrlClr: 5,
      lowUnctrl: 15,
      lowChal: 9,
      lowIntc: 1,
      highShot: 9,
      highPass: 1,
      highTrap: 2,
      highLet: 6,
      highCtrlClr: 11,
      highUnctrl: 9,
      highChal: 14,
      highIntc: 0
    },
    {
      id: 19,
      name: "Taki",
      club: 1,
      position: 0,
      stamina: 1,
      shot: 2,
      pass: 8,
      dribble: 13,
      block: 12,
      tackle: 17,
      intercept: 0,
      lowShot: 0,
      lowPass: 33,
      lowTrap: 10,
      lowLet: 7,
      lowCtrlClr: 15,
      lowUnctrl: 11,
      lowChal: 14,
      lowIntc: 13,
      highShot: 13,
      highPass: 7,
      highTrap: 10,
      highLet: 17,
      highCtrlClr: 13,
      highUnctrl: 11,
      highChal: 15,
      highIntc: 13
    },
    {
      id: 20,
      name: "Ishizaki",
      club: 1,
      position: 0,
      stamina: 7,
      shot: 11,
      pass: 17,
      dribble: 13,
      block: 11,
      tackle: 15,
      intercept: 13,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 4,
      lowLet: 2,
      lowCtrlClr: 2,
      lowUnctrl: 1,
      lowChal: 0,
      lowIntc: 0,
      highShot: 7,
      highPass: 2,
      highTrap: 1,
      highLet: 4,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 21,
      name: "Nitta",
      club: 1,
      position: 0,
      stamina: 2,
      shot: 1,
      pass: 4,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 1,
      lowLet: 7,
      lowCtrlClr: 10,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 3,
      highPass: 7,
      highTrap: 6,
      highLet: 10,
      highCtrlClr: 2,
      highUnctrl: 1,
      highChal: 4,
      highIntc: 1
    },
    {
      id: 22,
      name: "Kisugi",
      club: 2,
      position: 0,
      stamina: 7,
      shot: 6,
      pass: 10,
      dribble: 2,
      block: 1,
      tackle: 4,
      intercept: 1,
      lowShot: 0,
      lowPass: 28,
      lowTrap: 21,
      lowLet: 28,
      lowCtrlClr: 31,
      lowUnctrl: 13,
      lowChal: 28,
      lowIntc: 31,
      highShot: 24,
      highPass: 28,
      highTrap: 19,
      highLet: 32,
      highCtrlClr: 27,
      highUnctrl: 25,
      highChal: 14,
      highIntc: 30
    },
    {
      id: 23,
      name: "Masao",
      club: 2,
      position: 0,
      stamina: 28,
      shot: 19,
      pass: 32,
      dribble: 27,
      block: 25,
      tackle: 14,
      intercept: 30,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 5,
      lowCtrlClr: 3,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 2,
      highPass: 0,
      highTrap: 0,
      highLet: 1,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 24,
      name: "Kazuo",
      club: 2,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 1,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 5,
      lowCtrlClr: 3,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 2,
      highPass: 0,
      highTrap: 0,
      highLet: 1,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 25,
      name: "Sano",
      club: 2,
      position: 0,
      stamina: 0,
      shot: 0,
      pass: 1,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 4,
      lowLet: 7,
      lowCtrlClr: 5,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 7,
      highPass: 4,
      highTrap: 1,
      highLet: 4,
      highCtrlClr: 1,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 26,
      name: "Hyuga",
      club: 2,
      position: 0,
      stamina: 4,
      shot: 1,
      pass: 4,
      dribble: 1,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 4,
      lowLet: 9,
      lowCtrlClr: 7,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 7,
      highPass: 4,
      highTrap: 1,
      highLet: 4,
      highCtrlClr: 1,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 27,
      name: "Souta",
      club: 2,
      position: 0,
      stamina: 4,
      shot: 1,
      pass: 4,
      dribble: 1,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 7,
      lowLet: 19,
      lowCtrlClr: 17,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 9,
      highPass: 1,
      highTrap: 1,
      highLet: 4,
      highCtrlClr: 2,
      highUnctrl: 2,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 28,
      name: "Jitou",
      club: 2,
      position: 0,
      stamina: 9,
      shot: 9,
      pass: 10,
      dribble: 2,
      block: 2,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 9,
      lowLet: 16,
      lowCtrlClr: 20,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 9,
      highPass: 7,
      highTrap: 9,
      highLet: 8,
      highCtrlClr: 2,
      highUnctrl: 2,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 29,
      name: "Matsuyama",
      club: 2,
      position: 0,
      stamina: 7,
      shot: 9,
      pass: 8,
      dribble: 2,
      block: 2,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 7,
      lowLet: 13,
      lowCtrlClr: 16,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 9,
      highPass: 5,
      highTrap: 4,
      highLet: 5,
      highCtrlClr: 3,
      highUnctrl: 0,
      highChal: 2,
      highIntc: 1
    },
    {
      id: 30,
      name: "Sorimachi",
      club: 2,
      position: 0,
      stamina: 5,
      shot: 4,
      pass: 5,
      dribble: 3,
      block: 0,
      tackle: 2,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 7,
      lowLet: 16,
      lowCtrlClr: 20,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 9,
      highPass: 5,
      highTrap: 4,
      highLet: 5,
      highCtrlClr: 2,
      highUnctrl: 0,
      highChal: 2,
      highIntc: 1
    },
    {
      id: 31,
      name: "Sawada",
      club: 2,
      position: 0,
      stamina: 5,
      shot: 4,
      pass: 5,
      dribble: 2,
      block: 0,
      tackle: 2,
      intercept: 1,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 16,
      lowLet: 18,
      lowCtrlClr: 22,
      lowUnctrl: 8,
      lowChal: 8,
      lowIntc: 8,
      highShot: 18,
      highPass: 14,
      highTrap: 14,
      highLet: 23,
      highCtrlClr: 12,
      highUnctrl: 10,
      highChal: 14,
      highIntc: 11
    },
    {
      id: 32,
      name: "Misugi",
      club: 3,
      position: 0,
      stamina: 14,
      shot: 14,
      pass: 23,
      dribble: 12,
      block: 10,
      tackle: 14,
      intercept: 11,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 15,
      lowLet: 17,
      lowCtrlClr: 21,
      lowUnctrl: 4,
      lowChal: 4,
      lowIntc: 4,
      highShot: 17,
      highPass: 7,
      highTrap: 15,
      highLet: 6,
      highCtrlClr: 3,
      highUnctrl: 4,
      highChal: 5,
      highIntc: 5
    },
    {
      id: 33,
      name: "Wakabayashi",
      club: 3,
      position: 1,
      stamina: 28,
      pass: 20,
      catching: 43,
      punching: 46,
      vsShot: 26,
      vsDribble: 26,
      lowRush: 38,
      highClaim: 43,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 34,
      name: "Wakashimazu",
      club: 3,
      position: 1,
      stamina: 0,
      pass: 10,
      catching: 8,
      punching: 8,
      vsShot: 2,
      vsDribble: 2,
      lowRush: 8,
      highClaim: 8,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 35,
      name: "Satilst",
      club: 3,
      position: 0,
      stamina: 17,
      shot: 17,
      pass: 25,
      dribble: 14,
      block: 13,
      tackle: 15,
      intercept: 15,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 13,
      lowLet: 25,
      lowCtrlClr: 24,
      lowUnctrl: 9,
      lowChal: 17,
      lowIntc: 9,
      highShot: 27,
      highPass: 17,
      highTrap: 17,
      highLet: 25,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 15,
      highIntc: 15
    },
    {
      id: 36,
      name: "Riverio",
      club: 3,
      position: 0,
      stamina: 17,
      shot: 14,
      pass: 25,
      dribble: 14,
      block: 13,
      tackle: 15,
      intercept: 15,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 16,
      lowLet: 21,
      lowCtrlClr: 25,
      lowUnctrl: 6,
      lowChal: 6,
      lowIntc: 5,
      highShot: 18,
      highPass: 9,
      highTrap: 17,
      highLet: 6,
      highCtrlClr: 4,
      highUnctrl: 3,
      highChal: 5,
      highIntc: 4
    },
    {
      id: 37,
      name: "DaSilva",
      club: 3,
      position: 0,
      stamina: 9,
      shot: 17,
      pass: 6,
      dribble: 4,
      block: 3,
      tackle: 5,
      intercept: 4,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 16,
      lowLet: 21,
      lowCtrlClr: 25,
      lowUnctrl: 6,
      lowChal: 6,
      lowIntc: 5,
      highShot: 18,
      highPass: 9,
      highTrap: 17,
      highLet: 6,
      highCtrlClr: 4,
      highUnctrl: 3,
      highChal: 4,
      highIntc: 4
    },
    {
      id: 38,
      name: "Meon",
      club: 3,
      position: 1,
      stamina: 0,
      pass: 10,
      catching: 20,
      punching: 20,
      vsShot: 55,
      vsDribble: 55,
      lowRush: 45,
      highClaim: 45,
      shot: 0,
      dribble: 0,
      block: 0,
      tackle: 0,
      intercept: 0,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 0,
      lowLet: 0,
      lowCtrlClr: 0,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 0,
      highShot: 0,
      highPass: 0,
      highTrap: 0,
      highLet: 0,
      highCtrlClr: 0,
      highUnctrl: 0,
      highChal: 0,
      highIntc: 0
    },
    {
      id: 39,
      name: "Toninho",
      club: 3,
      position: 0,
      stamina: 17,
      shot: 17,
      pass: 23,
      dribble: 12,
      block: 11,
      tackle: 12,
      intercept: 12,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 14,
      lowLet: 25,
      lowCtrlClr: 16,
      lowUnctrl: 0,
      lowChal: 0,
      lowIntc: 10,
      highShot: 24,
      highPass: 17,
      highTrap: 17,
      highLet: 23,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 14,
      highIntc: 12
    },
    {
      id: 40,
      name: "Nei",
      club: 3,
      position: 0,
      stamina: 17,
      shot: 17,
      pass: 23,
      dribble: 16,
      block: 15,
      tackle: 14,
      intercept: 12,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 19,
      lowLet: 21,
      lowCtrlClr: 26,
      lowUnctrl: 10,
      lowChal: 10,
      lowIntc: 7,
      highShot: 21,
      highPass: 9,
      highTrap: 17,
      highLet: 11,
      highCtrlClr: 4,
      highUnctrl: 3,
      highChal: 4,
      highIntc: 4
    },
    {
      id: 41,
      name: "Zagalo",
      club: 3,
      position: 0,
      stamina: 9,
      shot: 17,
      pass: 11,
      dribble: 4,
      block: 3,
      tackle: 4,
      intercept: 4,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 19,
      lowLet: 21,
      lowCtrlClr: 26,
      lowUnctrl: 10,
      lowChal: 10,
      lowIntc: 7,
      highShot: 21,
      highPass: 9,
      highTrap: 17,
      highLet: 21,
      highCtrlClr: 4,
      highUnctrl: 3,
      highChal: 4,
      highIntc: 4
    },
    {
      id: 42,
      name: "Dircil",
      club: 3,
      position: 0,
      stamina: 9,
      shot: 17,
      pass: 21,
      dribble: 4,
      block: 3,
      tackle: 4,
      intercept: 4,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 20,
      lowLet: 36,
      lowCtrlClr: 24,
      lowUnctrl: 11,
      lowChal: 24,
      lowIntc: 11,
      highShot: 33,
      highPass: 19,
      highTrap: 19,
      highLet: 30,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 14,
      highIntc: 14
    },
    {
      id: 43,
      name: "Carlos",
      club: 3,
      position: 0,
      stamina: 19,
      shot: 19,
      pass: 30,
      dribble: 14,
      block: 13,
      tackle: 14,
      intercept: 14,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 19,
      lowLet: 27,
      lowCtrlClr: 27,
      lowUnctrl: 11,
      lowChal: 19,
      lowIntc: 11,
      highShot: 31,
      highPass: 19,
      highTrap: 19,
      highLet: 30,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 14,
      highIntc: 15
    },
    {
      id: 44,
      name: "Santamaria",
      club: 3,
      position: 0,
      stamina: 19,
      shot: 19,
      pass: 30,
      dribble: 14,
      block: 13,
      tackle: 14,
      intercept: 15,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 19,
      lowLet: 27,
      lowCtrlClr: 25,
      lowUnctrl: 17,
      lowChal: 19,
      lowIntc: 21,
      highShot: 27,
      highPass: 19,
      highTrap: 19,
      highLet: 30,
      highCtrlClr: 14,
      highUnctrl: 13,
      highChal: 14,
      highIntc: 14
    },
    {
      id: 45,
      name: "Jethrio",
      club: 3,
      position: 0,
      stamina: 19,
      shot: 19,
      pass: 30,
      dribble: 14,
      block: 13,
      tackle: 14,
      intercept: 14,
      lowShot: 0,
      lowPass: 0,
      lowTrap: 15,
      lowLet: 25,
      lowCtrlClr: 29,
      lowUnctrl: 10,
      lowChal: 10,
      lowIntc: 5,
      highShot: 17,
      highPass: 13,
      highTrap: 21,
      highLet: 15,
      highCtrlClr: 8,
      highUnctrl: 7,
      highChal: 8,
      highIntc: 8
    }
  ];

  // src/game/prg/data/tables/player-table.ts
  var PLAYER_TABLE2 = PLAYER_TABLE;
  function findPlayerById(id) {
    for (const p of PLAYER_TABLE2) {
      if (p.id === (id & 255)) return p;
    }
    return null;
  }
  function findPlayerNameById(id) {
    var _a, _b;
    return (_b = (_a = findPlayerById(id)) == null ? void 0 : _a.name) != null ? _b : "";
  }

  // src/game/prg/data/tables/levelup-data.ts
  var LEVEL_UP_TABLE = [
    { level: 1, expRequired: 4640, growth: [13, 13, 13, 13, 13, 208], staminaRaw: 464, abilityMax: 13 },
    { level: 2, expRequired: 4820, growth: [13, 13, 13, 13, 13, 226], staminaRaw: 482, abilityMax: 13 },
    { level: 3, expRequired: 4900, growth: [13, 13, 13, 13, 13, 234], staminaRaw: 490, abilityMax: 13 },
    { level: 4, expRequired: 4980, growth: [14, 14, 14, 14, 14, 242], staminaRaw: 498, abilityMax: 14 },
    { level: 5, expRequired: 5060, growth: [14, 14, 14, 14, 14, 250], staminaRaw: 506, abilityMax: 14 },
    { level: 6, expRequired: 5140, growth: [14, 14, 14, 14, 14, 2], staminaRaw: 514, abilityMax: 14 },
    { level: 7, expRequired: 5220, growth: [15, 15, 15, 15, 15, 10], staminaRaw: 522, abilityMax: 15 },
    { level: 8, expRequired: 5300, growth: [15, 15, 15, 15, 15, 18], staminaRaw: 530, abilityMax: 15 },
    { level: 9, expRequired: 5380, growth: [16, 16, 16, 16, 16, 26], staminaRaw: 538, abilityMax: 16 },
    { level: 10, expRequired: 5460, growth: [16, 16, 16, 16, 16, 34], staminaRaw: 546, abilityMax: 16 },
    { level: 11, expRequired: 5540, growth: [17, 17, 17, 17, 17, 42], staminaRaw: 554, abilityMax: 17 },
    { level: 12, expRequired: 5620, growth: [17, 17, 17, 17, 17, 50], staminaRaw: 562, abilityMax: 17 },
    { level: 13, expRequired: 5700, growth: [17, 17, 17, 17, 17, 58], staminaRaw: 570, abilityMax: 17 },
    { level: 14, expRequired: 5780, growth: [18, 18, 18, 18, 18, 66], staminaRaw: 578, abilityMax: 18 },
    { level: 15, expRequired: 5860, growth: [18, 18, 18, 18, 18, 74], staminaRaw: 586, abilityMax: 18 },
    { level: 16, expRequired: 5940, growth: [19, 19, 19, 19, 19, 82], staminaRaw: 594, abilityMax: 19 },
    { level: 17, expRequired: 6020, growth: [20, 20, 20, 20, 20, 90], staminaRaw: 602, abilityMax: 20 },
    { level: 18, expRequired: 6100, growth: [20, 20, 20, 20, 20, 98], staminaRaw: 610, abilityMax: 20 },
    { level: 19, expRequired: 6180, growth: [21, 21, 21, 21, 21, 106], staminaRaw: 618, abilityMax: 21 },
    { level: 20, expRequired: 6260, growth: [21, 21, 21, 21, 21, 114], staminaRaw: 626, abilityMax: 21 },
    { level: 21, expRequired: 6340, growth: [22, 22, 22, 22, 22, 122], staminaRaw: 634, abilityMax: 22 },
    { level: 22, expRequired: 6420, growth: [22, 22, 22, 22, 22, 130], staminaRaw: 642, abilityMax: 22 },
    { level: 23, expRequired: 6500, growth: [23, 23, 23, 23, 23, 138], staminaRaw: 650, abilityMax: 23 },
    { level: 24, expRequired: 6580, growth: [24, 24, 24, 24, 24, 146], staminaRaw: 658, abilityMax: 24 },
    { level: 25, expRequired: 6640, growth: [24, 24, 24, 24, 24, 152], staminaRaw: 664, abilityMax: 24 },
    { level: 26, expRequired: 6700, growth: [25, 25, 25, 25, 25, 158], staminaRaw: 670, abilityMax: 25 },
    { level: 27, expRequired: 6760, growth: [26, 26, 26, 26, 26, 164], staminaRaw: 676, abilityMax: 26 },
    { level: 28, expRequired: 6820, growth: [26, 26, 26, 26, 26, 170], staminaRaw: 682, abilityMax: 26 },
    { level: 29, expRequired: 6880, growth: [27, 27, 27, 27, 27, 176], staminaRaw: 688, abilityMax: 27 },
    { level: 30, expRequired: 6940, growth: [28, 28, 28, 28, 28, 182], staminaRaw: 694, abilityMax: 28 }
  ];

  // src/game/prg/data/tables/levelup-table.ts
  var LEVEL_UP_TABLE2 = LEVEL_UP_TABLE;
  function findLevelByExp(exp) {
    const target = Math.max(0, exp | 0);
    let level = 1;
    for (const e of LEVEL_UP_TABLE2) {
      if (target >= e.expRequired) level = e.level;
      else break;
    }
    return level;
  }

  // src/game/prg/data/tables/team-roster.ts
  var TEAM_ROSTER_TABLE = [
    { id: 128, name: "SaoPaulo", type: "player", players: [207, 160, 0, 44, 16, 11, 42, 31, 12, 16, 121], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 129, name: "Nankatsu", type: "player", players: [237, 98, 219, 5, 34, 173, 20, 3, 0, 14, 6], subs: [], formation: "4-4-2", tactic: "Normal" },
    { id: 130, name: "AsianCup", type: "player", players: [85, 110, 195, 125, 108, 110, 252, 237, 98, 168, 46], subs: [22, 30, 46, 101, 125, 77, 121, 121, 252, 223, 234, 237], formation: "Brazil", tactic: "Counter" },
    { id: 133, name: "Corinthians", type: "cpu", players: [38, 15, 32, 0, 126, 127, 128, 128, 176, 31, 30], subs: [], formation: "Form9", tactic: "Normal" },
    { id: 134, name: "Gremio", type: "cpu", players: [39, 11, 40, 15, 33, 0, 129, 130, 131, 131, 145], subs: [], formation: "Form15", tactic: "Pressing" },
    { id: 135, name: "Palmeiras", type: "cpu", players: [29, 9, 41, 4, 42, 15, 3, 0, 132, 133, 134], subs: [], formation: "Form6", tactic: "Tact8" },
    { id: 136, name: "Santos", type: "cpu", players: [96, 30, 31, 10, 43, 6, 44, 2, 45, 15, 0], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 137, name: "Flamengo", type: "cpu", players: [135, 136, 137, 137, 145, 31, 29, 4, 46, 9, 47], subs: [], formation: "Form15", tactic: "Normal" },
    { id: 138, name: "Kunimi", type: "cpu", players: [49, 15, 1, 0, 118, 141, 141, 142, 64, 30, 30], subs: [], formation: "Form4", tactic: "Normal" },
    { id: 139, name: "Akita", type: "cpu", players: [50, 1, 51, 15, 2, 0, 143, 144, 145, 145, 112], subs: [], formation: "Form15", tactic: "Pressing" },
    { id: 140, name: "Tatsunami", type: "cpu", players: [28, 15, 0, 0, 146, 147, 148, 148, 112, 31, 31], subs: [], formation: "Form10", tactic: "Normal" },
    { id: 141, name: "Musashi", type: "cpu", players: [53, 15, 3, 0, 118, 149, 150, 150, 96, 31, 30], subs: [], formation: "Form9", tactic: "Normal" },
    { id: 142, name: "Furano", type: "cpu", players: [54, 10, 55, 6, 56, 1, 57, 15, 32, 0, 151], subs: [], formation: "Form8", tactic: "Tact9" },
    { id: 143, name: "Toho", type: "cpu", players: [153, 153, 160, 31, 30, 9, 58, 15, 1, 0, 154], subs: [], formation: "Form11", tactic: "Tact9" },
    { id: 144, name: "AsRome", type: "cpu", players: [3, 0, 118, 157, 158, 158, 112, 30, 30, 7, 61], subs: [], formation: "Form10", tactic: "Normal" },
    { id: 145, name: "Uruguay", type: "cpu", players: [62, 6, 63, 1, 64, 15, 1, 0, 118, 119, 120], subs: [], formation: "Form9", tactic: "Tact7" },
    { id: 146, name: "Hamburg", type: "cpu", players: [48, 31, 27, 9, 65, 11, 66, 6, 67, 10, 68], subs: [], formation: "Form8", tactic: "Normal" },
    { id: 147, name: "Japan", type: "cpu", players: [70, 7, 71, 2, 72, 4, 73, 3, 74, 5, 75], subs: [], formation: "4-4-2", tactic: "Normal" },
    { id: 160, name: "WorldCup_00", type: "cpu", players: [168, 169, 170, 170, 160, 0, 0, 15, 19, 0, 171], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 161, name: "WorldCup_01", type: "cpu", players: [173, 173, 160, 31, 31, 15, 0, 0, 174, 175, 176], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 162, name: "WorldCup_02", type: "cpu", players: [112, 31, 28, 9, 79, 10, 80, 15, 35, 0, 177], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 163, name: "WorldCup_03", type: "cpu", players: [178, 178, 160, 31, 31, 15, 33, 0, 118, 179, 180], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 164, name: "WorldCup_04", type: "cpu", players: [160, 31, 31, 11, 81, 1, 82, 15, 0, 0, 181], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 165, name: "WorldCup_05", type: "cpu", players: [183, 183, 161, 31, 29, 9, 83, 4, 84, 15, 18], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 166, name: "WorldCup_06", type: "cpu", players: [118, 184, 185, 185, 160, 31, 30, 9, 85, 1, 86], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 167, name: "WorldCup_07", type: "cpu", players: [17, 0, 186, 187, 188, 188, 112, 31, 30, 9, 87], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 168, name: "WorldCup_08", type: "cpu", players: [88, 15, 32, 0, 189, 190, 191, 191, 112, 31, 28], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 169, name: "WorldCup_09", type: "cpu", players: [89, 15, 33, 0, 118, 192, 193, 193, 160, 31, 30], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 170, name: "WorldCup_10", type: "cpu", players: [90, 1, 91, 15, 16, 0, 194, 195, 196, 196, 113], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 171, name: "WorldCup_11", type: "cpu", players: [29, 9, 92, 4, 93, 15, 2, 0, 197, 198, 198], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 172, name: "WorldCup_12", type: "cpu", players: [176, 31, 26, 11, 94, 9, 95, 10, 96, 8, 97], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 173, name: "WorldCup_13", type: "cpu", players: [98, 15, 2, 0, 118, 199, 199, 199, 112, 30, 31], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 174, name: "WorldCup_14", type: "cpu", players: [99, 9, 100, 8, 101, 5, 102, 10, 103, 7, 104], subs: [], formation: "4-3-3", tactic: "Normal" },
    { id: 175, name: "WorldCup_15", type: "cpu", players: [105, 15, 3, 0, 118, 119, 120, 121, 97, 30, 40], subs: [], formation: "4-3-3", tactic: "Normal" }
  ];
  var TEAM_TABLE = TEAM_ROSTER_TABLE.map((t) => ({
    id: t.id,
    name: t.name,
    formation: t.players.slice(0, 11),
    players: [...t.players, ...t.subs]
  }));
  function findRosterById(id) {
    for (const t of TEAM_ROSTER_TABLE) {
      if (t.id === (id & 255)) return t;
    }
    return null;
  }

  // src/game/prg/data/tables/team-table.ts
  var TEAM_TABLE2 = TEAM_TABLE;
  function findTeamById(id) {
    for (const t of TEAM_TABLE2) {
      if (t.id === (id & 255)) return t;
    }
    return null;
  }
  function findTeamNameById(id) {
    var _a, _b;
    return (_b = (_a = findTeamById(id)) == null ? void 0 : _a.name) != null ? _b : "";
  }
  function findRosterById2(id) {
    return findRosterById(id);
  }

  // src/game/prg/data/tables/skill-table.ts
  var SKILL_TABLE = [
    // TODO: 从 BANK16_DATA_TABLES 解析结构化技能条目（moveId/name/power/players）
  ];
  function findSkillByMoveId(moveId) {
    for (const s of SKILL_TABLE) {
      if (s.moveId === moveId) return s;
    }
    return null;
  }
  function findSkillsByPlayer(playerId) {
    const ids = [];
    for (const s of SKILL_TABLE) {
      if (s.players.includes(playerId)) ids.push(s.moveId);
    }
    return ids;
  }

  // src/game/prg/data/tables/match-config-table.ts
  var DEFAULT_MATCH_CONFIG = {
    halfLength: 45,
    maxSubstitutions: 2,
    injuryTime: 0,
    durationMinutes: 45,
    extraTime: false,
    homeTeam: 0,
    awayTeam: 0,
    tournament: "saopaulo"
  };
  var MATCH_CONFIG_TABLE = [
    // Sao Paulo 赛（圣保罗）— 短时友谊赛
    { homeTeam: 128, awayTeam: 133, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    { homeTeam: 128, awayTeam: 134, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    { homeTeam: 128, awayTeam: 135, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    { homeTeam: 128, awayTeam: 136, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    { homeTeam: 128, awayTeam: 137, halfLength: 5, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "saopaulo" },
    // Nankatsu 赛（日本高中）— 半时 10 分钟
    { homeTeam: 129, awayTeam: 138, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 139, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 140, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 141, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 142, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    { homeTeam: 129, awayTeam: 143, halfLength: 10, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 20, extraTime: true, tournament: "nankatsu" },
    // Japan Cup 赛（亚洲杯）
    { homeTeam: 130, awayTeam: 144, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: "japanCup" },
    { homeTeam: 130, awayTeam: 145, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: "japanCup" },
    { homeTeam: 130, awayTeam: 146, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: "japanCup" },
    { homeTeam: 130, awayTeam: 147, halfLength: 15, maxSubstitutions: 2, injuryTime: 0, durationMinutes: 30, extraTime: true, tournament: "japanCup" },
    // World Cup 赛（世界杯 — 半时 22.5 分钟）
    { homeTeam: 132, awayTeam: 160, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: "worldCup" },
    { homeTeam: 132, awayTeam: 161, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: "worldCup" },
    { homeTeam: 132, awayTeam: 162, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: "worldCup" },
    { homeTeam: 132, awayTeam: 163, halfLength: 22, maxSubstitutions: 3, injuryTime: 2, durationMinutes: 46, extraTime: true, tournament: "worldCup" },
    // Exhibition（表演赛）
    { homeTeam: 128, awayTeam: 130, halfLength: 5, maxSubstitutions: 5, injuryTime: 0, durationMinutes: 10, extraTime: false, tournament: "exhibition" }
  ];
  function getMatchConfig(homeTeam = 0, awayTeam = 0) {
    for (const e of MATCH_CONFIG_TABLE) {
      if (e.homeTeam === (homeTeam & 255) && e.awayTeam === (awayTeam & 255)) return e;
    }
    return DEFAULT_MATCH_CONFIG;
  }

  // test/api-test-text.ts
  var W = 100;
  var sep = "=".repeat(W);
  var sep2 = "-".repeat(W);
  function pad(s, w, align = "left") {
    const ss = s == null ? "" : String(s);
    const len = [...ss].length;
    if (len >= w) return ss.slice(0, w);
    const fill = " ".repeat(w - len);
    return align === "left" ? ss + fill : fill + ss;
  }
  function row(...cols) {
    return "| " + cols.map((c) => {
      var _a;
      return pad(String((_a = c.s) != null ? _a : ""), c.w, c.a || "left");
    }).join(" | ") + " |";
  }
  function header(title) {
    const t = ` ${title} `;
    const left = Math.floor((W - t.length) / 2);
    const right = W - t.length - left;
    return "=".repeat(left) + t + "=".repeat(right);
  }
  function API_PLAYERS() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const lines = [];
    lines.push(header("GET /api/players \u2014 \u5168\u90E8 45 \u660E\u661F"));
    lines.push(row(
      { s: "ID", w: 6 },
      { s: "NAME", w: 14 },
      { s: "STM", w: 4, a: "right" },
      { s: "SHOT", w: 4, a: "right" },
      { s: "PASS", w: 4, a: "right" },
      { s: "DRB", w: 4, a: "right" },
      { s: "BLK", w: 4, a: "right" },
      { s: "TKL", w: 4, a: "right" },
      { s: "ITC", w: 4, a: "right" },
      { s: "CLUB", w: 5, a: "right" },
      { s: "POS", w: 4 }
    ));
    lines.push(sep2);
    let totalCount = 0;
    for (const p of PLAYER_TABLE2) {
      if (!p) continue;
      totalCount++;
      const id = (_a = p.id) != null ? _a : 0;
      const name = (_b = p.name) != null ? _b : "?";
      const pos = ((_c = p.position) != null ? _c : 0) === 1 ? "GK" : "FW";
      lines.push(row(
        { s: "0x" + id.toString(16).padStart(2, "0").toUpperCase(), w: 6 },
        { s: name, w: 14 },
        { s: ((_d = p.stamina) != null ? _d : 0).toString(), w: 4, a: "right" },
        { s: ((_e = p.shot) != null ? _e : 0).toString(), w: 4, a: "right" },
        { s: ((_f = p.pass) != null ? _f : 0).toString(), w: 4, a: "right" },
        { s: ((_g = p.dribble) != null ? _g : 0).toString(), w: 4, a: "right" },
        { s: ((_h = p.block) != null ? _h : 0).toString(), w: 4, a: "right" },
        { s: ((_i = p.tackle) != null ? _i : 0).toString(), w: 4, a: "right" },
        { s: ((_j = p.intercept) != null ? _j : 0).toString(), w: 4, a: "right" },
        { s: ((_k = p.club) != null ? _k : 0).toString(), w: 5, a: "right" },
        { s: pos, w: 4 }
      ));
    }
    lines.push(sep2);
    lines.push(` TOTAL: ${totalCount} players`);
    return lines.join("\n");
  }
  function API_PLAYER_DETAIL(id) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const p = findPlayerById(id);
    if (!p) return `Player 0x${id.toString(16).padStart(2, "0")} NOT FOUND`;
    const lines = [];
    const pid = (_a = p.id) != null ? _a : 0;
    const club = (_b = p.club) != null ? _b : 0;
    const pos = ((_c = p.position) != null ? _c : 0) === 1 ? "GK" : "FW";
    lines.push(header(`GET /api/player/0x${pid.toString(16).padStart(2, "0").toUpperCase()} \u2014 ${(_d = p.name) != null ? _d : "?"} \u6863\u6848`));
    lines.push(sep2);
    lines.push(` ID       = 0x${pid.toString(16).padStart(2, "0").toUpperCase()}`);
    lines.push(` Name     = ${(_e = p.name) != null ? _e : "?"}`);
    lines.push(` Position = ${pos}    Club = ${club}`);
    lines.push(sep2);
    lines.push(" 7 ABILITY BARS (ROM 0x39fde + idx*24):");
    const max = 23;
    function bar(v) {
      const n = Math.min(max, Math.max(0, v));
      return "[" + "#".repeat(n) + ".".repeat(max - n) + "] " + v.toString().padStart(2, "0");
    }
    lines.push(`   STAMINA  : ${bar((_f = p.stamina) != null ? _f : 0)}`);
    lines.push(`   SHOT     : ${bar((_g = p.shot) != null ? _g : 0)}`);
    lines.push(`   PASS     : ${bar((_h = p.pass) != null ? _h : 0)}`);
    lines.push(`   DRIBBLE  : ${bar((_i = p.dribble) != null ? _i : 0)}`);
    lines.push(`   BLOCK    : ${bar((_j = p.block) != null ? _j : 0)}`);
    lines.push(`   TACKLE   : ${bar((_k = p.tackle) != null ? _k : 0)}`);
    lines.push(`   INTERCEPT: ${bar((_l = p.intercept) != null ? _l : 0)}`);
    lines.push(sep2);
    lines.push(" LOW/HIGH ALTITUDE (low +8 / high +8):");
    const lows = ["lowShot", "lowPass", "lowTrap", "lowLet", "lowCtrlClr", "lowUnctrl", "lowChal", "lowIntc"];
    lows.forEach((k) => {
      var _a2;
      const v = (_a2 = p[k]) != null ? _a2 : 0;
      lines.push(`   ${k.padEnd(10, " ")}: ${v.toString().padStart(2, "0")}`);
    });
    const highs = ["highShot", "highPass", "highTrap", "highLet", "highCtrlClr", "highUnctrl", "highChal", "highIntc"];
    highs.forEach((k) => {
      var _a2;
      const v = (_a2 = p[k]) != null ? _a2 : 0;
      lines.push(`   ${k.padEnd(10, " ")}: ${v.toString().padStart(2, "0")}`);
    });
    lines.push(sep2);
    const skills = findSkillsByPlayer(id);
    lines.push(` SKILLS  : ${skills.length}`);
    skills.forEach((sid, i) => {
      var _a2, _b2;
      const sk = findSkillByMoveId(sid);
      lines.push(`   [${(i + 1).toString().padStart(2, "0")}] 0x${sid.toString(16).padStart(2, "0").toUpperCase()} ${(_a2 = sk == null ? void 0 : sk.name) != null ? _a2 : "?"} (\u5A01\u529B ${(_b2 = sk == null ? void 0 : sk.power) != null ? _b2 : "?"})`);
    });
    return lines.join("\n");
  }
  function API_TEAM(teamId) {
    var _a, _b, _c, _d, _e, _f;
    const team = findTeamById(teamId);
    if (!team) return `Team 0x${teamId.toString(16).padStart(2, "0")} NOT FOUND`;
    const roster = findRosterById2(teamId);
    const ids = (_a = roster == null ? void 0 : roster.players) != null ? _a : [];
    const lines = [];
    lines.push(header(`GET /api/team/0x${teamId.toString(16).padStart(2, "0").toUpperCase()}/roster \u2014 ${(_b = team.name) != null ? _b : "?"}`));
    lines.push(sep2);
    lines.push(` Team      : ${(_c = team.name) != null ? _c : "?"}`);
    lines.push(` Type      : ${(_d = roster == null ? void 0 : roster.type) != null ? _d : "cpu"}`);
    lines.push(` Formation : ${(_e = roster == null ? void 0 : roster.formation) != null ? _e : "?"}`);
    lines.push(` Tactic    : ${(_f = roster == null ? void 0 : roster.tactic) != null ? _f : "?"}`);
    lines.push(` Roster    : ${ids.length} players`);
    lines.push(sep2);
    lines.push(row(
      { s: "#", w: 3 },
      { s: "ID", w: 6 },
      { s: "NAME", w: 14 },
      { s: "POS", w: 4 },
      { s: "SHOT", w: 4, a: "right" },
      { s: "PASS", w: 4, a: "right" },
      { s: "DRB", w: 4, a: "right" },
      { s: "BLK", w: 4, a: "right" },
      { s: "TKL", w: 4, a: "right" },
      { s: "ITC", w: 4, a: "right" },
      { s: "STM", w: 4, a: "right" }
    ));
    lines.push(sep2);
    ids.forEach((pid, i) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i;
      const p = findPlayerById(pid);
      if (!p) return;
      const pos = ((_a2 = p.position) != null ? _a2 : 0) === 1 ? "GK" : "FW";
      lines.push(row(
        { s: (i + 1).toString(), w: 3 },
        { s: "0x" + pid.toString(16).padStart(2, "0").toUpperCase(), w: 6 },
        { s: (_b2 = p.name) != null ? _b2 : "?", w: 14 },
        { s: pos, w: 4 },
        { s: ((_c2 = p.shot) != null ? _c2 : 0).toString(), w: 4, a: "right" },
        { s: ((_d2 = p.pass) != null ? _d2 : 0).toString(), w: 4, a: "right" },
        { s: ((_e2 = p.dribble) != null ? _e2 : 0).toString(), w: 4, a: "right" },
        { s: ((_f2 = p.block) != null ? _f2 : 0).toString(), w: 4, a: "right" },
        { s: ((_g = p.tackle) != null ? _g : 0).toString(), w: 4, a: "right" },
        { s: ((_h = p.intercept) != null ? _h : 0).toString(), w: 4, a: "right" },
        { s: ((_i = p.stamina) != null ? _i : 0).toString(), w: 4, a: "right" }
      ));
    });
    return lines.join("\n");
  }
  function API_LEVEL_EXP(exp) {
    var _a, _b, _c, _d, _e;
    const lv = findLevelByExp(exp);
    const lines = [];
    lines.push(header(`GET /api/level?exp=${exp}`));
    lines.push(sep2);
    if (!lv) {
      lines.push(` EXP ${exp} \u8D85\u51FA\u8303\u56F4`);
      return lines.join("\n");
    }
    lines.push(` Current Level : ${(_a = lv.level) != null ? _a : "?"}`);
    lines.push(` Level Name    : ${(_b = lv.name) != null ? _b : "???"}`);
    lines.push(` Exp to next   : ${(_c = lv.expToNext) != null ? _c : "?"}`);
    lines.push(` Ability Max   : ${(_d = lv.abilityMax) != null ? _d : "?"}`);
    lines.push(` Stamina Raw   : ${(_e = lv.staminaRaw) != null ? _e : "?"}`);
    lines.push(sep2);
    lines.push(" 6 GROWTH BONUSES:");
    const caps = ["SHOT", "PASS", "DRIBBLE", "SPEED", "TECHNIC", "POWER"];
    caps.forEach((cap, i) => {
      var _a2, _b2, _c2;
      const v = (_c2 = (_b2 = lv[cap.toLowerCase()]) != null ? _b2 : (_a2 = lv.growth) == null ? void 0 : _a2[i]) != null ? _c2 : 0;
      lines.push(`   ${cap.padEnd(8, " ")} : +${v}`);
    });
    return lines.join("\n");
  }
  function API_MATCH_CONFIG(home, away) {
    const cfg = getMatchConfig(home, away);
    const lines = [];
    lines.push(header(`GET /api/match/config?home=0x${home.toString(16).padStart(2, "0")}&away=0x${away.toString(16).padStart(2, "0")}`));
    lines.push(sep2);
    lines.push(` Home Team     : ${findTeamNameById(home)} (0x${home.toString(16).padStart(2, "0").toUpperCase()})`);
    lines.push(` Away Team     : ${findTeamNameById(away)} (0x${away.toString(16).padStart(2, "0").toUpperCase()})`);
    lines.push(` Half Length   : ${cfg.halfLength} min`);
    lines.push(` Total Duration: ${cfg.durationMinutes} min`);
    lines.push(` Max Substit   : ${cfg.maxSubstitutions}`);
    lines.push(` Injury Time   : ${cfg.injuryTime} min`);
    lines.push(` Extra Time    : ${cfg.extraTime ? "YES" : "NO"}`);
    lines.push(` Tournament    : ${cfg.tournament}`);
    lines.push(sep2);
    lines.push(" ALL MATCH CONFIGS:");
    lines.push(row(
      { s: "H", w: 5 },
      { s: "A", w: 5 },
      { s: "TOURNAMENT", w: 14 },
      { s: "HALF", w: 5, a: "right" },
      { s: "TOTAL", w: 6, a: "right" },
      { s: "SUB", w: 4, a: "right" },
      { s: "INJ", w: 4, a: "right" },
      { s: "ET", w: 3 }
    ));
    lines.push(sep2);
    for (const c of MATCH_CONFIG_TABLE) {
      if (!c) continue;
      lines.push(row(
        { s: "0x" + c.homeTeam.toString(16).padStart(2, "0").toUpperCase(), w: 5 },
        { s: "0x" + c.awayTeam.toString(16).padStart(2, "0").toUpperCase(), w: 5 },
        { s: c.tournament, w: 14 },
        { s: c.halfLength.toString(), w: 5, a: "right" },
        { s: c.durationMinutes.toString(), w: 6, a: "right" },
        { s: c.maxSubstitutions.toString(), w: 4, a: "right" },
        { s: c.injuryTime.toString(), w: 4, a: "right" },
        { s: c.extraTime ? "Y" : "-", w: 3 }
      ));
    }
    return lines.join("\n");
  }
  function API_SKILLS(playerId) {
    var _a, _b;
    const ids = findSkillsByPlayer(playerId);
    const player = findPlayerById(playerId);
    const lines = [];
    lines.push(header(`GET /api/player/0x${playerId.toString(16).padStart(2, "0").toUpperCase()}/skills \u2014 ${(_a = player == null ? void 0 : player.name) != null ? _a : "?"} \u6280\u80FD`));
    lines.push(sep2);
    lines.push(` Player  : ${(_b = player == null ? void 0 : player.name) != null ? _b : "?"} (0x${playerId.toString(16).padStart(2, "0").toUpperCase()})`);
    lines.push(` Skill N : ${ids.length}`);
    lines.push(sep2);
    lines.push(row(
      { s: "#", w: 3 },
      { s: "ID", w: 6 },
      { s: "NAME", w: 22 },
      { s: "POWER", w: 7, a: "right" },
      { s: "POWER BAR", w: 36 }
    ));
    lines.push(sep2);
    ids.forEach((sid, i) => {
      var _a2, _b2;
      const sk = findSkillByMoveId(sid);
      if (!sk) return;
      const max = 30;
      const power = (_a2 = sk.power) != null ? _a2 : 0;
      const fill = Math.min(max, Math.max(0, power));
      const bar = "[" + "#".repeat(fill) + ".".repeat(max - fill) + "]";
      lines.push(row(
        { s: (i + 1).toString(), w: 3 },
        { s: "0x" + sid.toString(16).padStart(2, "0").toUpperCase(), w: 6 },
        { s: (_b2 = sk.name) != null ? _b2 : "?", w: 22 },
        { s: power.toString(), w: 7, a: "right" },
        { s: bar, w: 36 }
      ));
    });
    lines.push(sep2);
    lines.push(` SKILL TABLE TOTAL: ${SKILL_TABLE.length}`);
    return lines.join("\n");
  }
  function runAllAssertions() {
    var _a, _b, _c, _d;
    const results = [];
    let pass = 0;
    let fail = 0;
    function assert(label, ok) {
      if (ok) pass++;
      else fail++;
      results.push(` ${ok ? "[PASS]" : "[FAIL]"} ${label}`);
    }
    assert("Player 0x01 = Tsubasa", findPlayerNameById(1) === "Tsubasa");
    assert("Player 0x02 = Ishizaki", findPlayerNameById(2) === "Ishizaki");
    assert("PLAYER_TABLE \u226540 entries", PLAYER_TABLE2.length >= 40);
    assert("Team 0x80 = Sao Paulo", (_b = (_a = findTeamNameById(128)) == null ? void 0 : _a.includes("Sao Paulo")) != null ? _b : false);
    assert("Sao Paulo roster \u226511", ((_c = findRosterById2(128).length) != null ? _c : 0) >= 11);
    const lv10 = findLevelByExp(3e3);
    assert("EXP 3000 \u2192 Lv \u2265 5", ((_d = lv10 == null ? void 0 : lv10.level) != null ? _d : 0) >= 5);
    assert("LEVEL_UP_TABLE \u226530 levels", LEVEL_UP_TABLE2.length >= 30);
    assert("Tsubasa \u22651 skill", findSkillsByPlayer(1).length >= 1);
    const cfg = getMatchConfig(128, 133);
    assert("Sao Paulo \u534A\u65F6 5min", cfg.halfLength === 5);
    assert("MATCH_CONFIG \u226520", MATCH_CONFIG_TABLE.length >= 20);
    return { pass, fail, results };
  }
  var ALL_OUTPUT = `
${API_PLAYERS()}

${API_PLAYER_DETAIL(1)}

${API_TEAM(128)}

${API_LEVEL_EXP(5e3)}

${API_MATCH_CONFIG(128, 133)}

${API_SKILLS(1)}

${header("TEST ASSERTIONS")}
${(() => {
    const r = runAllAssertions();
    return [
      ...r.results,
      sep2,
      ` \u901A\u8FC7 ${r.pass} / \u5931\u8D25 ${r.fail}`
    ].join("\n");
  })()}
`;
  if (typeof process !== "undefined" && process.stdout) {
    console.log(ALL_OUTPUT);
  }
  if (typeof document !== "undefined") {
    const summary = document.getElementById("summary");
    if (summary) {
      const r = runAllAssertions();
      summary.textContent = `\u901A\u8FC7 ${r.pass} / \u5931\u8D25 ${r.fail} \u2014 ${r.pass === 0 ? "\u5168\u5931\u8D25\uFF01" : r.fail === 0 ? "\u5168\u90E8\u901A\u8FC7 \u2713" : "\u90E8\u5206\u5931\u8D25"}`;
      summary.style.color = r.fail === 0 ? "#7fdf7f" : "#df7f7f";
    }
    const pre = document.getElementById("output");
    if (pre) {
      pre.textContent = ALL_OUTPUT;
    }
  }
})();
