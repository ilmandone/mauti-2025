import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
import { DStripComponent } from '@components/d-strip/d-strip.component';
import { animate } from 'animejs';
import { getTitleAnimationOptions } from '../../shared/commons';

@Component({
  selector: 'section[design]',
  imports: [DStripComponent],
  templateUrl: './design.component.html',
  styleUrl: './design.component.scss',
})
export class DesignComponent implements AfterViewInit {
  private _ngZone = inject(NgZone);

  private _setAnimation() {
    animate('.design-texts__title', getTitleAnimationOptions('.design-texts', false));
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
