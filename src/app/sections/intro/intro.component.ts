import { AfterViewInit, Component, ElementRef, inject, NgZone, viewChild } from '@angular/core';
import { ColorCardComponent } from '@components/color-card/color-card.component';
import { LogoBlockComponent } from '@components/logo-block/logo-block.component';
import { animate } from 'animejs';
import { getTitleAnimationOptions } from '../../shared/commons';

@Component({
  selector: 'section[intro]',
  imports: [ColorCardComponent, LogoBlockComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements AfterViewInit {
  private _ngZone = inject(NgZone);

  aboutEl = viewChild<ElementRef<HTMLElement>>('about');

  private _setAnimation() {
    animate('.intro-text__title', getTitleAnimationOptions('.intro-text'));
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
