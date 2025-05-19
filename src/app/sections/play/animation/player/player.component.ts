import { AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, OnInit, viewChild } from '@angular/core';
import { animate, onScroll } from 'animejs';
import { ThreeJSAnimation } from '../threejs-animation';

@Component({
  selector: 'player-babylon',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  private _ngZone = inject(NgZone);

  private _containerEl = viewChild.required<ElementRef<HTMLCanvasElement>>('containerElement');
  private _animation!: ThreeJSAnimation;

  private _setAnimation() {
    animate(this._containerEl().nativeElement, {
      progress: [{ from: 0 }, { to: 100 }],
      autoplay: onScroll({
        enter: 'bottom top',
        leave: 'top bottom',
        sync: true,
        onUpdate: (e) => {
          this._animation.progress(e.progress);
        },
      }),
    });
  }

  ngOnInit() {
    this._animation = new ThreeJSAnimation(this._containerEl().nativeElement);
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
