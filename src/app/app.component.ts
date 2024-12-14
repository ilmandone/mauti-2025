import {Component, inject} from '@angular/core';
import {FontsServiceService} from './shared/fonts-service.service';
import {TestImportComponent} from '@components/test-import/test-import.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [TestImportComponent],
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
