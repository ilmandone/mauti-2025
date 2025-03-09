import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FontsService } from './shared/services/fonts.service';
import { Theme, ThemeService } from './shared/services/theme.service';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ScreenService } from './shared/services/screen.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private _screenSrv = inject(ScreenService);
  private _webFontSrv = inject(FontsService);
  private _themeSrv = inject(ThemeService);

  freezeSelection = signal<boolean>(false);

  constructor() {
    effect(() => {
      const fs = this.freezeSelection();
      if (fs) document.body.classList.add('freeze-selection');
      else document.body.classList.remove('freeze-selection');
    });
  }

  ngOnInit() {
    this._themeSrv.init();
    this._screenSrv.init();
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
