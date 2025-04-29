import { AfterViewInit, Component, ElementRef, inject, NgZone } from '@angular/core';
import { careerSteps } from './boring.configs';
import { animate, stagger, utils } from 'animejs';
import { getDefaultScrollObs } from '../../shared/commons';

@Component({
  selector: 'section[boring]',
  imports: [],
  templateUrl: './boring.component.html',
  styleUrl: './boring.component.scss',
})
export class BoringComponent implements AfterViewInit {
  private _elRef = inject(ElementRef);
  private _ngZone = inject(NgZone);

  careerSteps = careerSteps;

  private _setAnimation() {
    animate('.boring-list__item', {
      opacity: [{ from: 0 }, { to: 1 }],
      delay: stagger(350, {
        grid: [6, 4],
        from: utils.random(0, 11 * 2),
      }),
      duration: 450,
      autoplay: getDefaultScrollObs(this._elRef.nativeElement),
    });
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
