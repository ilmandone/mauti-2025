import { Injectable } from '@angular/core';
import WebFont from 'webfontloader'

export interface FontLoadData  {
  googleFont: string,
  fontFamilyName: string
}

@Injectable({
  providedIn: 'root'
})
export class FontsServiceService {

  private _currentGF!: string

  private _setBodyFont(fontFamily: string) {
    document.body.style.fontFamily = fontFamily
  }

  loadFont(options: FontLoadData): Promise<void> {

    if (options.googleFont === this._currentGF)
      return Promise.resolve()

    else return new Promise((resolve, reject) => {

      WebFont.load({
        google: {
          families: [options.googleFont]
        },
        active: () => {
          this._setBodyFont(options.fontFamilyName)
          this._currentGF = options.googleFont
          resolve();
        },
        inactive: () => {
          reject(new Error(`Unable to load ${options.googleFont} google font.`));
        }
      })
    })
  }
}
