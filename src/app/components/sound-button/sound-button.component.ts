import { Component, effect, inject, output, signal } from '@angular/core';
import { ToggleButtonComponent } from '@components/toggle-button/toggle-button.component';
import { StateService } from '../../shared/services/state.service';
import { AudioService } from '../../shared/services/audio.service';

@Component({
  selector: 'app-sound-button',
  imports: [ToggleButtonComponent],
  templateUrl: './sound-button.component.html',
  styleUrl: './sound-button.component.scss',
})
export class SoundButtonComponent {
  private _state = inject(StateService);
  private _audio = inject(AudioService);

  change = output<boolean>();

  soundOn = signal<boolean>(false);

  constructor() {
    effect(() => {
      const sOn = this.soundOn();
      this._state.setSoundsOn(sOn);

      if (sOn) {
        this._audio.play('click');
        this._audio.play('bg', true, 0.65);
      } else {
        this._audio.play('click2');
        this._audio.pause('bg');
      }
    });
  }
}
