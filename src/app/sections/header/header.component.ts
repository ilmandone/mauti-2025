import { AfterViewInit, Component, HostBinding, inject } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';
import { StateService } from '../../shared/services/state.service';
import { INTRO_DELAY_TIME } from '../../shared/commons';
import { SoundButtonComponent } from '@components/sound-button/sound-button.component';

@Component({
  selector: 'header[section]',
  template: `
    <social-links />
    <div class="extra">
      @if (!state.soundsOn() && this.showSoundMessage) {
        <div class="sound-message">CLICK FOR SOUND</div>
      }
      <app-sound-button (change)="soundButtonClicked($event)" />
      <div class="version">1.3 - SOUNDS</div>
    </div>
  `,
  styleUrl: './header.component.scss',
  imports: [SocialLinksComponent, SoundButtonComponent],
})
export class HeaderComponent implements AfterViewInit {
  state = inject(StateService);
  showSoundMessage = true;

  @HostBinding('class.ready')
  ready = false;

  @HostBinding('class.hidden')
  get atBottom() {
    return this.state.atBottom() || !this.ready;
  }

  soundButtonClicked($event: boolean) {
    if ($event && this.showSoundMessage) this.showSoundMessage = false;
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.ready = true;
    }, INTRO_DELAY_TIME);
  }
}
