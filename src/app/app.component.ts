import {Component, inject, OnInit} from '@angular/core';
import {FontsServiceService} from './shared/fonts-service.service';
import {Theme, ThemeService} from './shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  private _webFontSrv = inject(FontsServiceService)
  private _themeSrv = inject(ThemeService)

  title = 'mauti-2025';

  changeFontFamily() {
    void this._webFontSrv.loadFont(
      {
        googleFont: 'Roboto:400,700',
        fontFamilyName: 'Roboto'
      }
    )
  }

  ngOnInit() {
    this._themeSrv.init()
  }

  setTheme(v: Theme) {
    this._themeSrv.setCurrent(v)
  }
}
