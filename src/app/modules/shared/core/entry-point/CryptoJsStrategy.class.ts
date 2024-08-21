import { AES, enc } from 'crypto-js';

import { EncryptionStrategy } from '@shared/core/patterns/strategy';

export class CryptoJsStrategy implements EncryptionStrategy {

  private crypto_iv: string;
  private crypto_key: string;

  constructor ({ crypto_iv, crypto_key }: { crypto_iv: string; crypto_key: string }) {
    this.crypto_iv = crypto_iv;
    this.crypto_key = crypto_key;
  }

  private get keysUTF8 () {
    const crypto_key_UTF8 = enc.Utf8.parse(this.crypto_key)
    const crypto_iv_UTF8 = enc.Utf8.parse(this.crypto_iv)
    return { crypto_key_UTF8, crypto_iv_UTF8 }
  }

  async encrypt (data: any): Promise<string> {
    try {
      const { crypto_iv_UTF8, crypto_key_UTF8 } = this.keysUTF8
      if (typeof data == 'object')
        data = JSON.stringify(data);

      data = data.toString();
      const textPlain = AES.encrypt(data, crypto_key_UTF8, { iv : crypto_iv_UTF8 }).toString() ?? '';

      return textPlain

    } catch (_) {
      return ''
    }
  }

  async decrypt<T>(dataEncrypt: string): Promise<T> {
    try {
      const { crypto_iv_UTF8, crypto_key_UTF8 } = this.keysUTF8
      const textPlain = AES.decrypt(dataEncrypt, crypto_key_UTF8, { iv : crypto_iv_UTF8 }).toString(enc.Utf8) ?? '';
      return textPlain as unknown as T
    } catch (_) {
      return {} as T
    }
  }
}
