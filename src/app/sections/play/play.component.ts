import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
import { animate } from 'animejs';
import { getFadeInHorizontalAnimationParams, getFadeInVerticalAnimationParams } from '../../shared/commons';

@Component({
  selector: 'section[play]',
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements AfterViewInit {
  private _ngZone = inject(NgZone);

  private _setAnimation() {
    const target = '.play-texts';
    animate('.play-texts__title', getFadeInHorizontalAnimationParams(target, false));
    animate('.play-texts__text', getFadeInVerticalAnimationParams(target, false));
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
