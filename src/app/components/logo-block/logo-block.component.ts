import { AfterViewInit, Component, ElementRef, inject, input, NgZone, viewChildren } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { animate, createTimeline, onScroll } from 'animejs';

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

    const pic1anim = animate(pics[0], {
      duration: 1000,
      keyframes: [
        { clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
      ],
    });

    const pic2anim = animate(pics[1], {
      duration: 1000,
      delay: 1000,
      keyframes: [
        { clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
      ],
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
      .sync(pic2anim, 1000);
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._startAnimation();
    });
  }
}
