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
      <app-toggle-button mode="neutral" (click)="toggleSound($event)">
        <ng-template #off>
          <div class="sound sound--off"></div>
        </ng-template>
        <ng-template #on>
          <div class="sound sound--on"></div>
        </ng-template>
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

  /**
   * Set sounds on state and play click sound
   * @param $event
   */
  toggleSound($event: boolean) {
    this._state.setSoundsOn($event);

    if ($event) {
      this._audio.play('click');
      this._audio.play('bg', true, 0.65);
    } else {
      this._audio.play('click2');
      this._audio.pause('bg');
    }
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.ready = true;
    }, INTRO_DELAY_TIME);
  }
}
