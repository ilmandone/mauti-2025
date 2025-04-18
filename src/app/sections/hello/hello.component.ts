import { AfterViewInit, Component, HostBinding, inject, NgZone, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { createTimeline } from 'animejs';

@Component({
  selector: 'section[hello]',
  imports: [NgOptimizedImage],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent implements OnInit, AfterViewInit {
  private _ngZone = inject(NgZone);

  @HostBinding('class.visible') visible = false;

  ngOnInit() {
    window.setTimeout(() => {
      this.visible = true;
    }, 0);
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      const tl = createTimeline({ loop: true });

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
