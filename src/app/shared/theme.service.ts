import {effect, Injectable, signal} from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService{

  constructor() {
    effect(() => {
      const ct = this._currentTheme()
      document.body.classList.remove(ct === 'light' ? 'dark' : 'light')
      document.body.classList.add(ct)
    });
  }

  private _currentTheme = signal<Theme>('light');

  get current() {
    return this._currentTheme.asReadonly()
  }

  setCurrent(v: Theme) {
    this._currentTheme.set(v)
  }

  init() {
    console.log(document.body)
  }
}
