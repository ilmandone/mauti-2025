import { AfterViewInit, Component, computed, HostBinding, inject } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';
import { StateService } from '../../shared/services/state.service';
import { INTRO_DELAY_TIME } from '../../shared/commons';
import { SoundButtonComponent } from '@components/sound-button/sound-button.component';
import { soundMsgAnimation } from './header.animation';

@Component({
  selector: 'header[section]',
  template: `
    <social-links />
    <div class="extra">
      @if (!state.soundsOn() && this.showSoundMessage()) {
        <div [@soundMsgAnimation] class="sound-message">CLICK FOR SOUND</div>
      }
      <app-sound-button />
      <div class="version">1.3 - SOUNDS</div>
    </div>
  `,
  styleUrl: './header.component.scss',
  imports: [SocialLinksComponent, SoundButtonComponent],
  animations: [soundMsgAnimation],
})
export class HeaderComponent implements AfterViewInit {
  state = inject(StateService);

  showSoundMessage = computed(() => {
    const at = this.state.atTop();
    const sOn = this.state.soundsOn();
    const sOnOnce = this.state.soundPlaysAtLastOnce();

    return !sOn && !at && !sOnOnce;
  });

  @HostBinding('class.ready')
  ready = false;

  @HostBinding('class.hidden')
  get atBottom() {
    return this.state.atBottom() || !this.ready;
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.ready = true;
    }, INTRO_DELAY_TIME);
  }
}
