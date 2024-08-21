import { Injectable } from '@angular/core'

import { EncryptionStrategy } from '@shared/core/patterns/strategy'
import { CryptoJsStrategy } from '@shared/core/entry-point/CryptoJsStrategy.class'

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private encryptionStrategy !: EncryptionStrategy

  private async initializeEncryptionStrategy () {
    try {

      const crypto_iv = '1234567890123456'
      const crypto_key = '123456789'

      this.encryptionStrategy = new CryptoJsStrategy({ crypto_iv, crypto_key })
    } catch (_) {
      throw new Error('Faild connection to get api key')
    }
  }

  /**
   * Puede crearse una Statragy diferente a CryptoJs
   * Debe tambien implementar su metodos de EncryptionStrategy
   * Ejemplo: Otro mecanismo diferente a CryptoJs
   * @param strategy
   */
  setEncriptionStrategy (strategy: EncryptionStrategy) {
    this.encryptionStrategy = strategy
  }

  async encodeData (data: any): Promise<string> {
    await this.initializeEncryptionStrategy()
    return await this.encryptionStrategy.encrypt(data)
  }

  async decodeData<T>(dataEncriptData: string): Promise<T> {
    await this.initializeEncryptionStrategy()
    return await this.encryptionStrategy.decrypt(dataEncriptData) as T
  }
}
