import { AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, OnInit, viewChild } from '@angular/core';
import { BabylonAnimation } from '../babylon-animation';
import { animate, onScroll } from 'animejs';

@Component({
  selector: 'player-babylon',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  private _ngZone = inject(NgZone);

  private _canvasEl = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasElement');
  private _animation!: BabylonAnimation;

  private _setAnimation() {
    animate(this._canvasEl().nativeElement, {
      progress: [{ from: 0 }, { to: 100 }],
      autoplay: onScroll({
        enter: 'bottom top',
        leave: 'top bottom',
        debug: true,
        sync: true,
        onEnter: () => {
          this._animation.restartLoop();
        },
        onLeave: () => {
          this._animation.pauseLoop();
        },
        onUpdate: (e) => {
          this._animation.progress(e.progress);
        },
      }),
    });
  }

  ngOnInit() {
    this._animation = new BabylonAnimation(this._canvasEl().nativeElement);
    this._animation.init();
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }

  ngOnDestroy() {
    this._animation.destroy();
  }
}
