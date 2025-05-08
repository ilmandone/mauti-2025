import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
import { animate } from 'animejs';
import {
  getDefaultScrollObs,
  getFadeInHorizontalAnimationParams,
  getFadeInVerticalAnimationParams,
} from '../../shared/animejs';
import { PlayerComponent } from './animation/player/player.component';

@Component({
  selector: 'section[play]',
  imports: [PlayerComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements AfterViewInit {
  private _ngZone = inject(NgZone);

  private _setAnimation() {
    const target = '.play-texts';
    animate('.play-texts__title', getFadeInHorizontalAnimationParams(target, false));
    animate('.play-texts__text', getFadeInVerticalAnimationParams(target, false));
    animate('.play-texts__top-line', {
      width: [{ from: 0 }, { to: '100%' }],
      duration: 700,
      autoplay: getDefaultScrollObs(target),
    });
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
