import { AfterViewInit, Component, HostBinding, inject, NgZone, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { createTimeline, onScroll } from 'animejs';

@Component({
  selector: 'section[hello]',
  imports: [NgOptimizedImage],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent implements OnInit, AfterViewInit {
  private _ngZone = inject(NgZone);

  @HostBinding('class.visible') visible = false;

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

  ngOnInit() {
    window.setTimeout(() => {
      this.visible = true;
    }, 0);
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      window.setTimeout(() => {
        this._handAnimation();
      }, 1000);
    });
  }
}
