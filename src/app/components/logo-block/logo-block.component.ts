import { AfterViewInit, Component, ElementRef, inject, input, NgZone, viewChildren } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { createTimeline, onScroll, waapi } from 'animejs';

@Component({
  selector: 'app-logo-block',
  imports: [NgOptimizedImage],
  templateUrl: './logo-block.component.html',
  styleUrl: './logo-block.component.scss',
})
export class LogoBlockComponent implements AfterViewInit {
  private _ngZone = inject(NgZone);

  private _pics = viewChildren<ElementRef<HTMLElement>>('pic');

  parent = input<ElementRef>();

  private _startAnimation() {
    const pics = this._pics().map((p) => p.nativeElement);

    const pic1anim = waapi.animate(pics[1], {
      duration: 1400,
      rotate: 16,
      x: '-25vw',
      y: '20vw',
    });

    const pic2anim = waapi.animate(pics[0], {
      duration: 1400,
      rotate: -20,
      x: '-16vw',
      y: '-8vw',
    });

    createTimeline({
      defaults: {
        ease: 'inOutExpo',
      },
      autoplay: onScroll({
        target: this.parent()?.nativeElement,
        enter: 'center top',
        leave: 'center bottom',
        sync: true,
      }),
    })
      .sync(pic1anim, 0)
      .sync(pic2anim, 50);
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._startAnimation();
    });
  }
}
