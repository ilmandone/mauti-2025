import {Injectable, signal} from '@angular/core';
import WebFont from 'webfontloader'

export interface FontLoadData  {
  googleFont: string,
  fontFamilyName: string
}

@Injectable({
  providedIn: 'root'
})
export class FontsService {

  private _currentGF: FontLoadData = {
    fontFamilyName: 'Fragment Mono',
    googleFont: 'Fragment Mono:400,600'
  }

  fontData = signal<FontLoadData>(this._currentGF)

  //#region Privates

  private _setBodyFont(fontFamily: string) {
    document.body.style.fontFamily = fontFamily
  }

  //#endregion

  loadFont(options: FontLoadData): Promise<void> {

    if (options.googleFont === this._currentGF.googleFont)
      return Promise.resolve()

    else return new Promise((resolve, reject) => {

      WebFont.load({
        google: {
          families: [options.googleFont]
        },
        active: () => {
          this._setBodyFont(options.fontFamilyName)
          this._currentGF = options
          this.fontData.set(options)
          resolve();
        },
        inactive: () => {
          reject(new Error(`Unable to load ${options.googleFont} google font.`));
        }
      })
    })
  }
}
