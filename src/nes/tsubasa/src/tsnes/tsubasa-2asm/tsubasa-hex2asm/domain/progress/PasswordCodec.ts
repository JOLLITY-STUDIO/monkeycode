/**
 * 密码编解码器
 *
 * 天使之翼 II 使用密码系统来保存/恢复进度。
 * 密码是平假名字符串，对应编码后的二进制数据。
 *
 * 本模块提供 stub 实现，后续从 ROM 反推完整算法。
 */

import type { ProgressSnapshot } from './ProgressState';

/** 密码编解码器 */
export class PasswordCodec {
  /** 平假名字符集（密码允许的字符） */
  static readonly CHARSET = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';

  /**
   * 编码：进度状态 → 密码字符串
   * @param progress 进度快照
   * @returns 密码字符串（平假名）
   */
  encode(_progress: ProgressSnapshot): string {
    // TODO: 从 ROM bank 反推实际编码算法
    // ROM 中密码相关逻辑在 bank_19（查表）和场景密码输入处
    return '';
  }

  /**
   * 解码：密码字符串 → 进度状态
   * @param password 密码字符串（平假名）
   * @returns 进度快照，解码失败返回 null
   */
  decode(_password: string): ProgressSnapshot | null {
    // TODO: 从 ROM bank 反推实际解码算法
    return null;
  }

  /**
   * 验证密码是否合法
   * @param password 密码字符串
   */
  validate(_password: string): boolean {
    // TODO: checksum 验证
    return true;
  }
}
