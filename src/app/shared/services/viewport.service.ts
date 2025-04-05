import { ElementRef, Injectable, OnDestroy, signal } from '@angular/core';

export type ObservableTypes = 'center' | 'multi' | 'all';

@Injectable({
  providedIn: 'root',
})
export class ViewportService implements OnDestroy {
  private readonly THRESHOLDS_STEPS = 30;

  private _centerObserver: IntersectionObserver;
  private _multiObserver: IntersectionObserver;
  private _observedElements = new Map<Element, Set<ObservableTypes>>();
  private _thresholds!: number[];

  private _centered = signal<{ el: Element; isIntersecting: boolean } | null>(null);
  private _ratio = signal<{ el: Element; value: number } | null>(null);

  /**
   * Return a list of float values for observer thresholds
   * @private
   */
  private _getThresholds() {
    if (!this._thresholds)
      this._thresholds = Array.from({ length: this.THRESHOLDS_STEPS + 1 }, (_, index) =>
        Number((index * (1 / this.THRESHOLDS_STEPS)).toFixed(3))
      );
    return this._thresholds;
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
    if (!e?.nativeElement) return;

    const element = e.nativeElement;

    if (!this._observedElements.has(element)) {
      this._observedElements.set(element, new Set());
    }

    const observedTypes = this._observedElements.get(element)!;

    if ((regType === 'center' || regType === 'all') && !observedTypes.has('center')) {
      this._centerObserver.observe(element);
      observedTypes.add('center');
    }

    if ((regType === 'multi' || regType === 'all') && !observedTypes.has('multi')) {
      this._multiObserver.observe(element);
      observedTypes.add('multi');
    }
  }

  remove(e: ElementRef, regType: ObservableTypes = 'center') {
    if (!e?.nativeElement) return;

    const element = e.nativeElement;
    const observedTypes = this._observedElements.get(element);

    if (!observedTypes) return;

    if (regType === 'center' || regType === 'all') {
      this._centerObserver.unobserve(element);
      observedTypes.delete('center');
    }

    if (regType === 'multi' || regType === 'all') {
      this._multiObserver.unobserve(element);
      observedTypes.delete('multi');
    }

    if (observedTypes.size === 0) {
      this._observedElements.delete(element);
    }
  }

  //#endregion

  ngOnDestroy() {
    this._centerObserver.disconnect();
    this._multiObserver.disconnect();
  }
}
