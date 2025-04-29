import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
import { animate } from 'animejs';
import { getTitleAnimationOptions } from '../../shared/commons';

@Component({
  selector: 'section[play]',
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements AfterViewInit {
  private _ngZone = inject(NgZone);

  private _setAnimation() {
    animate('.play-title', getTitleAnimationOptions('.texts-wrapper', false));
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
