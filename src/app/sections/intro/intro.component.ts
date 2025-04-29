import { AfterViewInit, Component, ElementRef, inject, NgZone, viewChild } from '@angular/core';
import { ColorCardComponent } from '@components/color-card/color-card.component';
import { LogoBlockComponent } from '@components/logo-block/logo-block.component';
import { animate } from 'animejs';
import { getFadeInHorizontalAnimationParams, getFadeInVerticalAnimationParams } from '../../shared/commons';

@Component({
  selector: 'section[intro]',
  imports: [ColorCardComponent, LogoBlockComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements AfterViewInit {
  private _ngZone = inject(NgZone);

  aboutEl = viewChild.required<ElementRef<HTMLElement>>('about');

  private _setAnimation() {
    animate('.intro-text__title', getFadeInVerticalAnimationParams('.intro-text'));
    animate('.about__left', getFadeInHorizontalAnimationParams(this.aboutEl().nativeElement, false));
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
