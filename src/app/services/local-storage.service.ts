import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}


  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }


  getItem(key: string): string | null {
    return JSON.parse(sessionStorage.getItem(key) || "[]");
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
