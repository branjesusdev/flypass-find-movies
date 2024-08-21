
export interface StorageDataRepository {
  get<T>(key: string): T
  set(key: string, value: any): boolean
  update(key: string, value: any): boolean
  remove(key: string): void
}
