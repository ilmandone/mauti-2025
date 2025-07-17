import { Component, computed, effect, ElementRef, input, viewChild, viewChildren } from '@angular/core';
import { createTimeline, onScroll, Timeline } from 'animejs';
import { EmoticonAnimation } from '@components/emoticon/emoticon.types';

@Component({
  selector: 'app-emoticon',
  imports: [],
  templateUrl: './emoticon.component.html',
  styleUrl: './emoticon.component.scss',
})
export class EmoticonComponent {
  private readonly _animationToFunctionMap: Record<
    EmoticonAnimation,
    (handElement: HTMLElement, eyesElements: HTMLElement[]) => void
  > = {
    eyes: this._eyesAnimation.bind(this),
    hand: this._handAnimation.bind(this),
  };

  private _handAnimationTL!: Timeline | undefined;
  private _eyesAnimationTL!: Timeline | undefined;

  private readonly _defaultScrollOptions = {
    enter: 'bottom top',
    leave: 'top bottom',
  };

  handNativeEl = viewChild<ElementRef<HTMLElement>>('hand');
  eyesEls = viewChildren<ElementRef<HTMLElement>>('eye');

  animation = input<EmoticonAnimation[]>();
  eyesOpen = input<boolean>(true);
  eyeCharacter = computed(() => {
    return this.eyesOpen() ? '°' : '^';
  });

  private _eyesAnimation(handElement: HTMLElement, eyesElements: HTMLElement[]) {
    this._eyesAnimationTL = createTimeline({
      loop: true,
      autoplay: onScroll({
        target: handElement,
        ...this._defaultScrollOptions,
      }),
    })
      .add(eyesElements, {
        delay: 1500,
        duration: 400,
        keyframes: [
          { scaleY: 0.15, scaleX: 0.75 },
          { scaleY: 1, scaleX: 1 },
          { scaleY: 0.15, scaleX: 0.75 },
          {
            scaleY: 1,
            scaleX: 1,
          },
        ],
      })
      .add({ duration: 2200 });
  }

  private _handAnimation(handElements: HTMLElement) {
    this._handAnimationTL = createTimeline({
      loop: true,
      autoplay: onScroll({
        target: handElements,
        ...this._defaultScrollOptions,
      }),
    })
      .add(handElements, { rotate: 12, duration: 150 })
      .add(handElements, { rotate: 4, duration: 200 })
      .add(handElements, {
        rotate: 12,
        duration: 150,
      })
      .add({ duration: 100 })
      .add(handElements, { rotate: 0, duration: 400 })
      .add({ duration: 1200 });
  }

  constructor() {
    effect(() => {
      const hel = this.handNativeEl()?.nativeElement;
      const eyes = this.eyesEls().map((e) => e.nativeElement);
      const animations = this.animation();

      if (!hel || !eyes) return;

      if (this._eyesAnimationTL) {
        this._eyesAnimationTL.cancel();
        this._eyesAnimationTL = undefined;
      }

      if (this._handAnimationTL) {
        this._handAnimationTL.cancel();
        this._handAnimationTL = undefined;
      }

      animations?.forEach((a) => {
        this._animationToFunctionMap[a](hel, eyes);
      });
    });
  }
}
