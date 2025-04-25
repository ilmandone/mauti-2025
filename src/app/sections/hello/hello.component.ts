import { AfterViewInit, Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { createTimeline, createTimer, onScroll, Timeline } from 'animejs';

@Component({
  selector: 'section[hello]',
  imports: [NgOptimizedImage],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent implements AfterViewInit, OnInit {
  private _emoticon = viewChild<ElementRef<HTMLElement>>('emoticon');
  private _hello = viewChild<ElementRef<HTMLElement>>('helloImg');
  private _introTL!: Timeline;

  private _handAnimation() {
    const tl = createTimeline({
      loop: true,
      autoplay: onScroll({
        target: '.hand',
        enter: 'bottom top',
        leave: 'top bottom',
      }),
    });

    tl.add('.hand', { rotate: 12, duration: 150 })
      .add('.hand', { rotate: 4, duration: 200 })
      .add('.hand', {
        rotate: 12,
        duration: 150,
      })
      .add({ duration: 100 })
      .add('.hand', { rotate: 0, duration: 400 })
      .add({ duration: 1200 });
  }

  private _introAnimation() {
    const emoticon = this._emoticon()?.nativeElement;
    const hello = this._hello()?.nativeElement;

    if (!emoticon || !hello) return;

    if (emoticon) {
      this._introTL = createTimeline({
        autoplay: false,
        onComplete: () => {
          this._handAnimation();
        },
      })
        .add(
          hello,
          {
            opacity: [{ from: 0 }, { to: 1 }],
            rotateX: [{ from: '-45deg' }, { to: 0 }],
            duration: 2500,
            ease: 'outElastic',
          },
          0
        )
        .add(
          emoticon,
          {
            y: [{ from: '-75vh' }, { to: 0 }],
            duration: 2000,
            delay: 400,
            ease: 'outBounce',
          },
          0
        )
        .init();
    }
  }

  ngOnInit() {
    this._introAnimation();
  }

  ngAfterViewInit() {
    createTimer({
      duration: 500,
      onComplete: () => {
        this._introTL.play();
      },
    });
  }
}
