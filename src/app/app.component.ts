import {Component, inject} from '@angular/core';
import {FontsServiceService} from './shared/fonts-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _webFontSrv = inject(FontsServiceService)

  title = 'mauti-2025';

  changeFontFamily() {
    void this._webFontSrv.loadFont(
      {
        googleFont: 'Roboto:400,700',
        fontFamilyName: 'Roboto'
      }
    )
  }
}
