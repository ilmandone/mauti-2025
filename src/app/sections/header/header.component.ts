import { AfterViewInit, Component, HostBinding, inject } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';
import { StateService } from '../../shared/services/state.service';
import { INTRO_DELAY_TIME } from '../../shared/commons';
import { ToggleButtonComponent } from '@components/toggle-button/toggle-button.component';
import { AudioService } from '../../shared/services/audio.service';

@Component({
  selector: 'header[section]',
  template: `
    <social-links />
    <div class="extra">
      <app-toggle-button (click)="toggleSound($event)">
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
  private _audio = inject(AudioService);

  @HostBinding('class.ready')
  ready = false;

  @HostBinding('class.hidden')
  get atBottom() {
    return this._state.atBottom() || !this.ready;
  }

  toggleSound($event: boolean) {
    this._state.setSoundsOn($event);
    console.log($event);
    if ($event) this._audio.play('click2');
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.ready = true;
    }, INTRO_DELAY_TIME);
  }
}
