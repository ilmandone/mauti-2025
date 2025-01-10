import {Component, computed, inject} from '@angular/core';
import {ButtonComponent} from '@components/button/button.component';
import {checkMobile} from '../../shared/detect.mobile';
import {FontsService} from '../../shared/services/fonts.service';
import {StateService} from '../../shared/services/state.service';
import {TextTransitionDirective} from "../../shared/directives/text-transition.directive";

@Component({
  selector: 'header[app-header]',
	imports: [
		ButtonComponent,
		TextTransitionDirective
	],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private _fontSrv = inject(FontsService)
  private _stateSrv = inject(StateService)

  sectionTitle = computed(() => {
    return this._stateSrv.section().toUpperCase()
  })

  fontFamily = computed(() => {
    return this._fontSrv.fontData().fontFamilyName.toUpperCase()
  })

  isMobile = checkMobile()
}
