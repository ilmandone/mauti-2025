import { ElementRef, Injectable, OnDestroy, signal } from '@angular/core';

export type ObservableTypes = 'center' | 'multi' | 'all';

@Injectable({
  providedIn: 'root',
})
export class ViewportService implements OnDestroy {
  private readonly THRESHOLDS_STEPS = 30;

  private _centerObserver: IntersectionObserver;
  private _multiObserver: IntersectionObserver;

  private _centered = signal<{ el: Element; isIntersecting: boolean } | null>(null);
  private _ratio = signal<{ el: Element; value: number } | null>(null);

  /**
   * Return a list of float values for observer thresholds
   * @private
   */
  private _getThresholds() {
    return Array.from({ length: this.THRESHOLDS_STEPS + 1 }, (_, index) =>
      Number((index * (1 / this.THRESHOLDS_STEPS)).toFixed(3))
    );
  }

  //#region Getters

  get centered() {
    return this._centered.asReadonly();
  }

  get ratio() {
    return this._ratio.asReadonly();
  }

  //#endregion

  constructor() {
    this._multiObserver = new IntersectionObserver(
      ([entry]) => {
        this._ratio.set({
          el: entry.target,
          value: entry.intersectionRatio,
        });
      },
      {
        threshold: this._getThresholds(),
      }
    );

    this._centerObserver = new IntersectionObserver(
      ([entry]) => {
        this._centered.set({ el: entry.target, isIntersecting: entry.isIntersecting });
      },
      {
        threshold: [0.5],
      }
    );
  }

  //#region Add and remove elements from observable

  add(e: ElementRef, regType: ObservableTypes = 'center') {
    if (regType === 'center' || regType === 'all') this._centerObserver.observe(e.nativeElement);
    if (regType === 'multi' || regType === 'all') this._multiObserver.observe(e.nativeElement);
  }

  remove(e: ElementRef, regType: ObservableTypes = 'center') {
    if (regType === 'center' || regType === 'all') this._centerObserver.unobserve(e.nativeElement);
    if (regType === 'multi' || regType === 'all') this._multiObserver.unobserve(e.nativeElement);
  }

  //#endregion

  ngOnDestroy() {
    this._centerObserver.disconnect();
  }
}
