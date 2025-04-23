import { AfterViewInit, Component, ElementRef, inject, input, NgZone, viewChildren } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { createTimeline, onScroll } from 'animejs';

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

    const tl = createTimeline({
      duration: 2000,
      autoplay: onScroll({
        target: this.parent()?.nativeElement,
        enter: 'center top',
        leave: 'center bottom',
        sync: 0.95,
      }),
    });

    tl.add(
      pics[1],
      {
        duration: 1200,
        rotate: 16,
        y: '18vw',
        x: '-18vw',
        filter: 'blur(4px)',
      },
      'start'
    )
      .add(
        pics[0],
        {
          rotate: -25,
          duration: 1000,
          x: '45vw',
          y: '-5vw',
        },
        'start'
      )
      .add('', {
        duration: 150,
      });
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._startAnimation();
    });
  }
}
