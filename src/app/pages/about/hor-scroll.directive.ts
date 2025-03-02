import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { ItemOrientation } from '../../shared/commons';

@Directive({
  selector: '[appHorScroll]',
})
export class HorScrollDirective {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _elementScroll = 0;
  private _elementScrollNext = 0;
  private _touchStartX = 0;

  itemsOr = input<ItemOrientation>();

  @HostListener('wheel', ['$event'])
  protected onScroll(event$: WheelEvent) {
    if (this.itemsOr() === 'horizontal') return;

    let ns = this._elementScroll + event$.deltaY;
    if (ns < 0) ns = 0;
    if (ns > this._elementRef.nativeElement.scrollWidth - window.innerWidth)
      ns = this._elementRef.nativeElement.scrollWidth - window.innerWidth;
    this._elementScroll = ns;
    this._elementRef.nativeElement.scrollLeft = ns;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event$: TouchEvent) {
    this._touchStartX = event$.targetTouches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event$: TouchEvent) {
    const delta = this._touchStartX - event$.targetTouches[0].clientX;
    this._elementScrollNext = this._elementScroll - delta;

    this._elementRef.nativeElement.scrollLeft = -this._elementScrollNext;
  }

  @HostListener('touchend')
  onTouchEnd() {
    this._elementScroll = this._elementScrollNext;
    this._elementScrollNext = 0;
  }
}
