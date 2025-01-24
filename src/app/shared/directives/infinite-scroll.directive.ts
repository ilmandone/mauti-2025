import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective {

  private _elementRef = inject(ElementRef)
  private _scrollValue = 0

  @HostListener('window:wheel', ['$event'])
  onWindowScroll(event: WheelEvent): void {
    // Your logic here
    const nEl = this._elementRef.nativeElement as HTMLElement
    this._scrollValue -= event.deltaY
    nEl.style.transform = `translateY(${this._scrollValue}px)`
  }

}
