import {AfterViewInit, Directive, ElementRef, HostListener, inject, output} from '@angular/core';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {

  private _elementRef = inject(ElementRef)
  private _scrollValue = 0
  private _scrollValueNext = 0
  private _startY = 0

  scrollVal = output<number>()
  height = output<number>()

  /**
   * Update the host translation
   * @description Update the host position vertical translation and emit the translation value
   * @param v
   * @private
   */
  private _updateElTranslate(v: number) {
    const nEl = this._elementRef.nativeElement as HTMLElement
    nEl.style.transform = `translateY(${v}px)`
    this.scrollVal.emit(v)
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

  @HostListener('window:resize')
  onResize() {
    const el = this._elementRef.nativeElement as HTMLElement
    this.height.emit(el.offsetHeight)
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      const el = this._elementRef.nativeElement as HTMLElement
      this.height.emit(el.offsetHeight)
    })
  }
}
