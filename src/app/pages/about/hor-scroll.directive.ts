import { DestroyRef, Directive, effect, ElementRef, HostListener, inject } from '@angular/core';
import { ScreenService } from '../../shared/services/screen.service';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appHorScroll]',
})
export class HorScrollDirective {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _destroyRef = inject(DestroyRef);
  private _screenSrv = inject(ScreenService);
  private _wheelEvent = fromEvent<WheelEvent>(document, 'wheel', { passive: true });

  private _touchEndEvent = fromEvent<TouchEvent>(document, 'touchend', { passive: true });
  private _touchMoveEvent = fromEvent<TouchEvent>(document, 'touchmove', { passive: true });
  private _touchStartEvent = fromEvent<TouchEvent>(document, 'touchstart', { passive: true });

  private _elementScroll = 0;
  private _elementScrollNext = 0;
  private _frameRequest!: number | null;
  private _touchStartX = 0;

  /**
   * Smooth horizontal scroll with simple easing function
   * @private
   */
  private _smoothWheelScroll() {
    const cs = this._elementRef.nativeElement.scrollLeft;
    const delta = Math.abs(cs - this._elementScroll);
    if (delta < 4 && this._frameRequest) {
      cancelAnimationFrame(this._frameRequest);
      this._elementRef.nativeElement.scrollLeft = this._elementScroll;
      this._frameRequest = null;
    } else {
      this._elementRef.nativeElement.scrollLeft =
        this._elementScroll > cs
          ? Math.ceil(cs + (this._elementScroll - cs) / 20)
          : Math.floor(cs + (this._elementScroll - cs) / 20);
      this._frameRequest = requestAnimationFrame(this._smoothWheelScroll.bind(this));
    }
  }

  constructor() {
    effect(() => {
      // Each time the screen orientation change to horizontal reset the host scrollLeft position to the beginning.
      if (this._screenSrv.screenOrientation() === 'horizontal') {
        this._elementScroll = this._elementScrollNext = 0;
        this._elementRef.nativeElement.scrollLeft = 0;
      }
    });

    this._wheelEvent.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((r) => {
      this.onScroll(r);
    });

    this._touchEndEvent.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.onTouchEnd();
    });
    this._touchMoveEvent.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((r) => {
      this.onTouchMove(r);
    });
    this._touchStartEvent.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((r) => {
      this.onTouchStart(r);
    });
  }

  protected onScroll(event$: WheelEvent) {
    let ns = this._elementScroll + event$.deltaY;
    if (ns < 0) ns = 0;
    if (ns > this._elementRef.nativeElement.scrollWidth - window.innerWidth)
      ns = this._elementRef.nativeElement.scrollWidth - window.innerWidth;

    this._elementScroll = ns;
    if (this._frameRequest) cancelAnimationFrame(this._frameRequest);
    this._frameRequest = requestAnimationFrame(this._smoothWheelScroll.bind(this));
  }

  onTouchStart(event$: TouchEvent) {
    this._touchStartX = event$.targetTouches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event$: TouchEvent) {
    const delta = this._touchStartX - event$.targetTouches[0].clientX;
    this._elementScrollNext = this._elementScroll - delta;
    this._elementRef.nativeElement.scrollLeft = -this._elementScrollNext;
  }

  onTouchEnd() {
    this._elementScroll = this._elementScrollNext;
    this._elementScrollNext = 0;
  }
}
