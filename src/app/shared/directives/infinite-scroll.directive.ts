import { AfterViewInit, Directive, effect, ElementRef, HostListener, inject, input, output } from '@angular/core';
import { ScrollKeys, VALID_SCROLL_KEYS } from './infinite-scroll.utils';

@Directive({
  selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective implements AfterViewInit {
  private _element: HTMLElement = inject(ElementRef).nativeElement;
  private _height = 0;
  private _scrollValue = 0;
  private _scrollValueNext = 0;
  private _startY = 0;

  changeScroll = input<number>();

  scrollChange = output<number>();
  height = output<number>();
  keyScroll = output<ScrollKeys>();
  percentage = output<number>();

  /**
   * Update the host translation
   * @description Update the host position vertical translation and emit the translation value
   * @param v
   * @private
   */
  private _updateElTranslate(v: number) {
    const nEl = this._element as HTMLElement;
    nEl.style.transform = `translate3D(0,${v}px, 0)`;

    this.scrollChange.emit(v);
    const ds = ((v / this._element.offsetHeight) * -1) % 1;
    const p = Math.round((ds > 0 ? ds : 1 - Math.abs(ds)) * 100);
    this.percentage.emit(p);

    // Fix element height on update
    const eh = (this._element as HTMLElement).offsetHeight;

    if (eh !== this._height) {
      this._height = eh;
      this.height.emit(eh);
    }
  }

  constructor() {
    effect(() => {
      // if (this._state.sectionReady() === 3) {
      this._height = (this._element as HTMLElement).offsetHeight;
      this.height.emit(this._height);
      // }
    });

    effect(() => {
      const cs = this.changeScroll();
      if (cs) {
        const vToScreen = cs * (this._height / window.innerHeight);
        this._scrollValue += vToScreen;

        this._updateElTranslate(this._scrollValue);
      }
    });
  }

  ngAfterViewInit() {
    this._element.scrollTop = 0;
    this._element.style.transform = 'translate3d(0,0,0)';
  }

  //#region Mouse

  @HostListener('window:wheel', ['$event'])
  onWindowScroll(event: WheelEvent): void {
    // Your logic here
    this._scrollValue -= event.deltaY;
    this._updateElTranslate(this._scrollValue);
  }

  //#endregion

  //#region Touch events

  @HostListener('touchstart', ['$event'])
  onTouchStart(event$: TouchEvent) {
    this._startY = event$.targetTouches[0].clientY;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event$: TouchEvent) {
    const delta = this._startY - event$.targetTouches[0].clientY;
    this._scrollValueNext = this._scrollValue - delta;

    this._updateElTranslate(this._scrollValueNext);
  }

  @HostListener('touchend')
  onTouchEnd() {
    this._scrollValue = this._scrollValueNext;
    this._scrollValueNext = 0;
  }

  //#endregion

  //#regio Keyboard

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event$: KeyboardEvent) {
    const key = event$.key;

    if (!VALID_SCROLL_KEYS.includes(key)) return;
    this.keyScroll.emit(key);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event$: KeyboardEvent) {
    const key = event$.key;
    if (!VALID_SCROLL_KEYS.includes(key)) return;

    switch (key) {
      case 'ArrowDown':
        this._scrollValue -= 100;
        break;
      case 'ArrowUp':
        this._scrollValue += 100;
        break;
    }

    this.keyScroll.emit(undefined);

    this._updateElTranslate(this._scrollValue);
  }

  //#endregion

  /**
   * Window resize
   */
  @HostListener('window:resize')
  onResize() {
    const el = this._element as HTMLElement;
    this.height.emit(el.offsetHeight);
  }
}
