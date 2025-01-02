import {Component, computed, inject} from '@angular/core';
import {ButtonComponent} from '@components/button/button.component';
import {checkMobile} from '../../shared/detect.mobile';
import {FontsService} from '../../shared/services/fonts.service';

@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private _fontSrv = inject(FontsService)

  fontFamily = computed(() => {
    return this._fontSrv.fontData().fontFamilyName.toUpperCase()
  })

  isMobile = checkMobile()
}
