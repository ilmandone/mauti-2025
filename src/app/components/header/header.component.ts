import { Component, computed, effect, inject } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { checkMobile } from '../../shared/detect.mobile';
import { FontsService } from '../../shared/services/fonts.service';
import { StateService } from '../../shared/services/state.service';
import { NoiseSvgComponent } from '@components/noise-svg/noise-svg.component';

@Component({
  selector: 'header[app-header]',
  imports: [ButtonComponent, NoiseSvgComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _fontSrv = inject(FontsService);
  private _stateSrv = inject(StateService);

  fontFamily = computed(() => {
    return this._fontSrv.fontData().fontFamilyName.toUpperCase();
  });

  isMobile = checkMobile();
  show = false;

  constructor() {
    effect(() => {
      if (this._stateSrv.loaded()) this.show = true;
    });
  }
}
