import {Component, inject, OnInit, signal} from '@angular/core';
import {FontsService} from './shared/services/fonts.service';
import {Theme, ThemeService} from './shared/services/theme.service';
import {HelloSectionComponent} from './sections/hello-section/hello-section.component';
import {WhatSectionComponent} from './sections/what-section/what-section.component';
import {UntilNowSectionComponent} from './sections/until-now-section/until-now-section.component';
import {HeaderComponent} from '@components/header/header.component';
import {FooterComponent} from '@components/footer/footer.component';
import {ScreenSizeService} from './shared/services/screen-size.service';
import {StateService} from './shared/services/state.service';
import {InfiniteScrollDirective} from './shared/directives/infinite-scroll.directive';
import {InfiniteTranslationDirective} from './shared/directives/infinite-translation.directive';
import {ScrollKeys} from './shared/directives/infinite-scroll.utils';
import {ScrollerComponent} from '@components/scroller/scroller.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    HelloSectionComponent,
    WhatSectionComponent,
    UntilNowSectionComponent,
    HeaderComponent,
    FooterComponent,
    InfiniteScrollDirective,
    InfiniteTranslationDirective,
    ScrollerComponent,
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  private _state = inject(StateService)
  private _screenSizeSrv = inject(ScreenSizeService)
  private _webFontSrv = inject(FontsService)
  private _themeSrv = inject(ThemeService)

  mainScrollValue = signal<number>(0)
  mainHeight = signal<number>(0)

  scrollPercentage = 0
  scrollKey!: ScrollKeys

  ngOnInit() {
    this._themeSrv.init()
    this._screenSizeSrv.init()
    this._state.setLoaded(true)
  }

  //#region Future implementations

  changeFontFamily() {
    void this._webFontSrv.loadFont(
      {
        googleFont: 'Roboto:400,700',
        fontFamilyName: 'Roboto'
      }
    )
  }


  setTheme(v: Theme) {
    this._themeSrv.setCurrent(v)
  }

  //#endregion
}
