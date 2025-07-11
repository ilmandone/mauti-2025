import { AfterViewInit, Component, HostBinding, inject } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';
import { StateService } from '../../shared/services/state.service';
import { INTRO_DELAY_TIME } from '../../shared/commons';
import { ToggleButtonComponent } from '@components/toggle-button/toggle-button.component';

@Component({
  selector: 'header[section]',
  template: `
    <social-links />
    <div class="extra">
      <app-toggle-button>
        <ng-template #off>Sounssssd</ng-template>
        <ng-template #on>Attivo</ng-template>
      </app-toggle-button>
      <div class="version">1.3 - SOUNDS</div>
    </div>
  `,
  styleUrl: './header.component.scss',
  imports: [SocialLinksComponent, ToggleButtonComponent],
})
export class HeaderComponent implements AfterViewInit {
  private _state = inject(StateService);

  @HostBinding('class.ready')
  ready = false;

  @HostBinding('class.hidden')
  get atBottom() {
    return this._state.atBottom() || !this.ready;
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.ready = true;
    }, INTRO_DELAY_TIME);
  }
}
