import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective {

  private _elementRef = inject(ElementRef)
  private _scrollValue = 0
  private _scrollValueNext = 0
  private _startY = 0

  private _updateElTranslate(v: number) {
    const nEl = this._elementRef.nativeElement as HTMLElement
    nEl.style.transform = `translateY(${v}px)`
  }

  @HostListener('window:wheel', ['$event'])
  onWindowScroll(event: WheelEvent): void {
    // Your logic here
    this._scrollValue -= event.deltaY
    this._updateElTranslate(this._scrollValue)
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event$: TouchEvent) {
    this._startY = event$.targetTouches[0].clientY

  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event$: TouchEvent) {
    const delta = this._startY - event$.targetTouches[0].clientY
    this._scrollValueNext = this._scrollValue - delta

    this._updateElTranslate(this._scrollValueNext)
  }

  @HostListener('touchend')
  onTouchEnd() {
    this._scrollValue = this._scrollValueNext
    this._scrollValueNext = 0
  }



}
