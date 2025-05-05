import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
import { DStripComponent } from '@components/d-strip/d-strip.component';
import { animate } from 'animejs';
import { getFadeInHorizontalAnimationParams, getFadeInVerticalAnimationParams } from '../../shared/animejs';

@Component({
  selector: 'section[design]',
  imports: [DStripComponent],
  templateUrl: './design.component.html',
  styleUrl: './design.component.scss',
})
export class DesignComponent implements AfterViewInit {
  private _ngZone = inject(NgZone);

  private _setAnimation() {
    animate('.design-texts__title', getFadeInHorizontalAnimationParams('.design-texts', false));
    animate('.design-texts__text', getFadeInVerticalAnimationParams('.design-texts'));
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
