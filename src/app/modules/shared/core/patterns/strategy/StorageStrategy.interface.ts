export interface StorageStrategy {
  get<T>(key: string): T
  set(key: string, value: any): boolean
  delete(key: string): boolean
}
