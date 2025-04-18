import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { createTimeline, onScroll } from 'animejs';

@Component({
  selector: 'section[hello]',
  imports: [NgOptimizedImage],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent implements OnInit, AfterViewInit {
  @HostBinding('class.visible') visible = false;

  ngOnInit() {
    window.setTimeout(() => {
      this.visible = true;
    }, 0);
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      const tl = createTimeline({
        loop: true,
        autoplay: onScroll({
          target: '.hand',
          enter: 'bottom top',
          leave: 'top bottom',
          debug: true,
        }),
      });

      tl.add('.hand', { rotate: 15, duration: 150 })
        .add('.hand', { rotate: 7, duration: 200 })
        .add('.hand', {
          rotate: 12,
          duration: 150,
        })
        .add('.hand', { rotate: 0, duration: 600 })
        .add({ duration: 1000 });
    }, 1000);
  }
}
