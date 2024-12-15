import {effect, inject, Injectable, signal} from '@angular/core';
import {CookiesService} from './cookies.service';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService{

  private _cookieSrv = inject(CookiesService)

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
    this._cookieSrv.setCookie('theme', v)
  }

  init() {
    const savedTheme = this._cookieSrv.getCookie('theme') as Theme
    if (savedTheme) {
      this.setCurrent(savedTheme)
    }
  }
}
