import { OPENING_SCREENS } from '../src/game/prg/data/scene/OpeningScreenTable';
for (const s of OPENING_SCREENS) {
  console.log(s.id, s.label, s.startFrame, s.endFrame, s.duration);
}
