import { Component, computed, effect, input } from '@angular/core';
import { createTimeline, onScroll, Timeline } from 'animejs';
import { EmoticonAnimation } from '@components/emoticon/emoticon.types';

@Component({
  selector: 'app-emoticon',
  imports: [],
  templateUrl: './emoticon.component.html',
  styleUrl: './emoticon.component.scss',
})
export class EmoticonComponent {
  private _handAnimationTL!: Timeline | undefined;
  private _eyesAnimationTL!: Timeline | undefined;

  private readonly _animationToFunctionMap: Record<EmoticonAnimation, () => void> = {
    eyes: this._eyesAnimation,
    hand: this._handAnimation,
  };

  animation = input<EmoticonAnimation[]>();
  eyesOpen = input<boolean>(true);
  eyeCharacter = computed(() => {
    return this.eyesOpen() ? '°' : '^';
  });

  private _eyesAnimation() {
    const onScrollOptions = {
      target: '.hand',
      enter: 'bottom top',
      leave: 'top bottom',
    };

    this._eyesAnimationTL = createTimeline({
      loop: true,
      autoplay: onScroll(onScrollOptions),
    })
      .add('.eye', {
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

  private _handAnimation() {
    const onScrollOptions = {
      target: '.hand',
      enter: 'bottom top',
      leave: 'top bottom',
    };

    this._handAnimationTL = createTimeline({
      loop: true,
      autoplay: onScroll(onScrollOptions),
    })
      .add('.hand', { rotate: 12, duration: 150 })
      .add('.hand', { rotate: 4, duration: 200 })
      .add('.hand', {
        rotate: 12,
        duration: 150,
      })
      .add({ duration: 100 })
      .add('.hand', { rotate: 0, duration: 400 })
      .add({ duration: 1200 });
  }

  constructor() {
    effect(() => {
      const animations = this.animation();

      if (this._eyesAnimationTL) {
        this._eyesAnimationTL.cancel();
        this._eyesAnimationTL = undefined;
      }

      if (this._handAnimationTL) {
        this._handAnimationTL.cancel();
        this._handAnimationTL = undefined;
      }

      animations?.forEach((a) => {
        this._animationToFunctionMap[a]();
      });
    });
  }
}
