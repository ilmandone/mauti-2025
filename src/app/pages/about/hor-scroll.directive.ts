import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { ItemOrientation } from '../../shared/commons';

@Directive({
  selector: '[appHorScroll]',
})
export class HorScrollDirective {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _elementScroll = 0;

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
}
