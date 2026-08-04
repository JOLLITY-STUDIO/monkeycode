/**
 * 故事对话数据
 *
 * ⚠️ TODO: 对话数据需要从 ROM Bank 7 ($E306-$F968) 提取。
 * ROM 中的对话使用自定义 tile 编码（非 ASCII），
 * 需要通过 Bank 7 的文本解码逻辑来转换。
 *
 * Bank 7 对话数据区域:
 *   - 74段文本数据 ($E306-$F968)
 *   - 33个角色头像 tile 引用 ($41xx-$42xx)
 *   - 22个脚本入口指针表 ($C000)
 */

export interface DialogueLine {
  speaker: string;
  text: string;
  portraitId?: number;
}

export interface StoryScene {
  id: string;
  type: string;
  matchNumber: number;
  dialogues: DialogueLine[];
  durationFrames: number;
}

/** ⚠️ TODO: 从 ROM Bank 7 提取真实对话数据 */
export const STORY_SCENES: StoryScene[] = [];

export function getStoryScene(matchNumber: number, type: StoryScene['type']): StoryScene | undefined {
  return STORY_SCENES.find(s => s.matchNumber === matchNumber && s.type === type);
}

export function getPreMatchScene(matchNumber: number): StoryScene | undefined {
  return getStoryScene(matchNumber, 'pre_match');
}

export function getPostMatchScene(matchNumber: number): StoryScene | undefined {
  return getStoryScene(matchNumber, 'post_match');
}
