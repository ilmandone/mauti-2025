import { AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, OnInit, viewChild } from '@angular/core';
import { animate, onScroll } from 'animejs';
import { ThreeJSAnimation } from '../threejs-animation';
import { StateService } from '../../../../shared/services/state.service';
import { AudioService } from '../../../../shared/services/audio.service';

@Component({
  selector: 'player-three-js',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  private _ngZone = inject(NgZone);
  private _state = inject(StateService);
  private _audio = inject(AudioService);

  private _containerEl = viewChild.required<ElementRef<HTMLCanvasElement>>('containerElement');
  private _animation!: ThreeJSAnimation;

  private _progress = 0;

  private _setAnimation() {
    animate(this._containerEl().nativeElement, {
      progress: [{ from: 0 }, { to: 100 }],
      autoplay: onScroll({
        enter: 'bottom top',
        leave: 'top bottom',
        sync: true,
        onUpdate: (e) => {
          this._animation.progress(e.progress);

          if (this._state.soundsOn()) {
            const p = Math.floor(e.progress * 200);

            if (p !== this._progress) {
              this._progress = p;
              this._audio.exec('click3');
            }
          }
          console.log();
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
