import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { createTimeline, createTimer, Timeline } from 'animejs';
import { EmoticonComponent } from '@components/emoticon/emoticon.component';

@Component({
  selector: 'section[hello]',
  imports: [NgOptimizedImage, EmoticonComponent],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent implements AfterViewInit {
  // @ts-ignore
  private _emoticon = viewChild<ElementRef<EmoticonComponent>>('emoticon', { read: ElementRef });
  private _hello = viewChild<ElementRef<HTMLElement>>('helloImg');
  private _introTL!: Timeline;

  private _introAnimation() {
    const emoticon = this._emoticon();
    const hello = this._hello()?.nativeElement;

    if (!emoticon || !hello) return;

    const emoticonEl = (emoticon as ElementRef).nativeElement;

    if (emoticonEl) {
      this._introTL = createTimeline({
        autoplay: false,
      })
        .add(
          hello,
          {
            rotateX: [{ from: '-45deg' }, { to: 0 }],
            opacity: [{ from: 0 }, { to: 1 }],
            duration: 2500,
            ease: 'outElastic',
          },
          0
        )
        .add(
          emoticonEl,
          {
            y: [{ from: '-100vh' }, { to: 0 }],
            duration: 2000,
            delay: 400,
            ease: 'outBounce',
          },
          0
        )
        .init();
    }
  }

  ngAfterViewInit() {
    this._introAnimation();
    createTimer({
      duration: 500,
      onComplete: () => {
        this._introTL.play();
      },
    });
  }
}
