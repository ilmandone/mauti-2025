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
    const boringListItem = this._elRef.nativeElement.querySelectorAll('.boring-list__item');

    animate(boringListItem, {
      opacity: [{ from: 0 }, { to: 1 }],
      delay: stagger(150, {
        from: utils.random(0, 6),
      }),
      duration: 1000,
      autoplay: getDefaultScrollObs(this._elRef.nativeElement),
    });
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
