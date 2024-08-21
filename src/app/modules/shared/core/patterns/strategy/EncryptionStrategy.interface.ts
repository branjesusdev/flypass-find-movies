export interface EncryptionStrategy {
  encrypt(data: any): Promise<string>
  decrypt<T>(dataEncrypt: string): Promise<T>
}
