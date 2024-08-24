import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AplicationStore<T> {
  private state = new BehaviorSubject<{ [key: string]: T }>({});
  private state$ = this.state.asObservable();

  saveState$({ key, info }: { key: string; info: T }) {
    const currentState = this.state.value;
    this.state.next({
      ...currentState,
      [key]: info,
    });
  }

  getStateValue(key: string): T {
    return this.state.value[key];
  }

  getState$(key: string): Observable<T> {
    return this.state$.pipe(map((state) => state[key] as T));
  }
}
