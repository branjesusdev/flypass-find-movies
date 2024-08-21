import { StorageDataRepository } from "@shared/core/patterns/repository"

export class SessionStorage implements StorageDataRepository {
  get<T>(key: string): T {
    const storage = sessionStorage.getItem(key)
    return storage as T
  }

  set (key: string, value: any): boolean {
    try {
      sessionStorage.setItem(key, value)
      return true
    } catch (_) {
      return false
    }
  }

  update (key: string, value: any): boolean {
    try {
      sessionStorage.setItem(key, value)
      return true
    } catch (_) {
      return false
    }
  }

  remove (key: string): void {
    sessionStorage.removeItem(key)
  }
}
