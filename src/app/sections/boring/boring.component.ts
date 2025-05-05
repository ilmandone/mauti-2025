import { AfterViewInit, Component, ElementRef, inject, NgZone, viewChild } from '@angular/core';
import { careerSteps } from './boring.configs';
import { animate, onScroll, stagger, utils } from 'animejs';

import { getDefaultScrollObs } from '../../shared/animejs';

@Component({
  selector: 'section[boring]',
  imports: [],
  templateUrl: './boring.component.html',
  styleUrl: './boring.component.scss',
})
export class BoringComponent implements AfterViewInit {
  private _elRef = inject(ElementRef);
  private _ngZone = inject(NgZone);
  private _career = viewChild<ElementRef<HTMLElement>>('career');

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

    const careerItems = this._elRef.nativeElement.querySelectorAll('.career__item');
    animate(careerItems, {
      opacity: [{ from: 0 }, { to: 1 }],
      rotateX: [{ from: -90 }, { to: 0 }],
      delay: stagger(150, {
        from: utils.random(0, 15),
      }),
      ease: 'outElastic',
      duration: 2500,
      autoplay: onScroll({
        target: this._career()?.nativeElement,
        enter: '90% top',
        leave: '10% bottom',
      }),
    });
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
