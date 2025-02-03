import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FontsService } from './shared/services/fonts.service';
import { Theme, ThemeService } from './shared/services/theme.service';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ScreenSizeService } from './shared/services/screen-size.service';
import { StateService } from './shared/services/state.service';
import { ScrollKeys } from './shared/directives/infinite-scroll.utils';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private _state = inject(StateService);
  private _screenSizeSrv = inject(ScreenSizeService);
  private _webFontSrv = inject(FontsService);
  private _themeSrv = inject(ThemeService);

  freezeSelection = signal<boolean>(false);
  mainScrollValue = signal<number>(0);
  mainHeight = signal<number>(0);

  changeScroll = 0;
  scrollPercentage = 0;
  scrollKey!: ScrollKeys;

  constructor() {
    effect(() => {
      const fs = this.freezeSelection();
      if (fs) document.body.classList.add('freeze-selection');
      else document.body.classList.remove('freeze-selection');
    });
  }

  ngOnInit() {
    this._themeSrv.init();
    this._screenSizeSrv.init();

    setTimeout(() => {
      this._state.setLoaded(true);
    }, 100);
  }

  //#region Future implementations

  changeFontFamily() {
    void this._webFontSrv.loadFont({
      googleFont: 'Roboto:400,700',
      fontFamilyName: 'Roboto',
    });
  }

  setTheme(v: Theme) {
    this._themeSrv.setCurrent(v);
  }

  //#endregion
}
