import { Component, effect, inject, output } from '@angular/core';
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
  private _audio = inject(AudioService);
  state = inject(StateService);

  change = output<boolean>();

  constructor() {
    effect(() => {
      const sOn = this.state.soundsOn();

      this._audio.exec(sOn ? 'click' : 'click2');
    });
  }

  activeChanged($event: boolean) {
    this.state.setSoundsOn($event);
    this.change.emit($event);
  }
}
