import { DestroyRef, Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { StateService } from '../../shared/services/state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { waapi, WAAPIAnimation } from 'animejs';

@Directive({
  selector: '[appDStripSpinner]',
})
export class DStripSpinnerDirective implements OnInit {
  private _state = inject(StateService);
  private _elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _destroyRef = inject(DestroyRef);

  private _waapi!: WAAPIAnimation;

  private _pointerEnter = fromEvent(this._elRef.nativeElement, 'mouseenter').pipe(takeUntilDestroyed(this._destroyRef));
  private _pointerLeave = fromEvent(this._elRef.nativeElement, 'mouseleave').pipe(takeUntilDestroyed(this._destroyRef));

  target = input.required<HTMLElement>({ alias: 'appDStripSpinner' });

  constructor() {}

  ngOnInit() {
    if (!this._state.isTouch) {
      this._pointerEnter.subscribe(() => {
        this._waapi = waapi.animate(this.target(), {
          duration: 1000,
          rotateY: 720,
        });
      });

      this._pointerLeave.subscribe(() => {
        if (this._waapi) this._waapi.pause();

        this._waapi = waapi.animate(this.target(), {
          duration: 1000,
          rotateY: 0,
        });
      });
    }
  }
}
