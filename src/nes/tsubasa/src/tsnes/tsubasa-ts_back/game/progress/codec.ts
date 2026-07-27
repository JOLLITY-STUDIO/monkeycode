/**
 * 密码编解码器 — class PasswordCodec
 */

import type { ProgressSnapshot } from './state';

export class PasswordCodec {
  /** 平假名字符集（密码允许的字符） */
  static readonly CHARSET = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';

  /** 编码：进度状态 → 密码字符串 */
  encode(_progress: ProgressSnapshot): string {
    // TODO: 从 ROM bank 反推实际编码算法
    return '';
  }

  /** 解码：密码字符串 → 进度状态 */
  decode(_password: string): ProgressSnapshot | null {
    // TODO: 从 ROM bank 反推实际解码算法
    return null;
  }

  /** 验证密码是否合法 */
  validate(_password: string): boolean {
    // TODO: checksum 验证
    return true;
  }
}
