import {Component, computed, effect, inject} from '@angular/core';
import {ButtonComponent} from '@components/button/button.component';
import {checkMobile} from '../../shared/detect.mobile';
import {FontsService} from '../../shared/services/fonts.service';
import {StateService} from '../../shared/services/state.service';
import {TextScrambleLeftRightDirective} from "../../shared/directives/text-scramble-left-right.directive";

@Component({
  selector: 'header[app-header]',
	imports: [
		ButtonComponent,
		TextScrambleLeftRightDirective
	],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{

  private _fontSrv = inject(FontsService)
  private _stateSrv = inject(StateService)

  sectionTitle = computed(() => {
    return this._stateSrv.section().toUpperCase()
  })

  fontFamily = computed(() => {
    return this._fontSrv.fontData().fontFamilyName.toUpperCase()
  })

  isMobile = checkMobile()
  show = false

  constructor() {
    effect(() => {
      this._stateSrv.loaded() && (this.show = true)
    });
  }
}
