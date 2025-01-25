import {AfterViewInit, Directive, ElementRef, HostListener, inject, output} from '@angular/core';
import {ScrollKeys, VALID_SCROLL_KEYS} from './infinite-scroll.utils';



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
  keyScroll = output<{key: ScrollKeys, active: boolean}>()

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

  //#region Mouse

  @HostListener('window:wheel', ['$event'])
  onWindowScroll(event: WheelEvent): void {
    // Your logic here
    this._scrollValue -= event.deltaY
    this._updateElTranslate(this._scrollValue)
  }

  //#endregion

  //#region Touch events

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

  //#endregion

  //#regio Keyboard

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event$: KeyboardEvent) {
    const key = event$.key
    if (!VALID_SCROLL_KEYS.includes(key)) return

    this.keyScroll.emit({
      key,
      active: true
    })
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event$: KeyboardEvent) {
    const key = event$.key
    if (!VALID_SCROLL_KEYS.includes(key)) return

    switch (key) {
      case 'ArrowDown' :
        this._scrollValue -= 100
        break
      case 'ArrowUp':
        this._scrollValue += 100
        break
    }

    this.keyScroll.emit({
      key,
      active: false
    })

    this._updateElTranslate(this._scrollValue)
  }

  //#endregion

  /**
   * Window resize
   */
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
