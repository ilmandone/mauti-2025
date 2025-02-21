import { Component, computed, effect, inject } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { checkMobile } from '../../shared/detect.mobile';
import { StateService } from '../../shared/services/state.service';
import { NoiseSvgComponent } from '@components/noise-svg/noise-svg.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header[app-header]',
  imports: [ButtonComponent, NoiseSvgComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // private _fontSrv = inject(FontsService);
  private _stateSrv = inject(StateService);

  currentSection = computed(() => this._stateSrv.section());

  /*fontFamily = computed(() => {
    return this._fontSrv.fontData().fontFamilyName.toUpperCase();
  });*/

  isMobile = checkMobile();
  show = false;

  constructor() {
    effect(() => {
      if (this._stateSrv.ready()) this.show = true;
    });
  }
}
