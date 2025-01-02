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

  get currentFont(): FontLoadData {
    return this._currentGF
  }

  //#region Privates

  private _currentGF: FontLoadData = {
    fontFamilyName: 'Rajdhani',
    googleFont: 'Rajdhani:300,400,500,600,700'
  }

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
          resolve();
        },
        inactive: () => {
          reject(new Error(`Unable to load ${options.googleFont} google font.`));
        }
      })
    })
  }
}
