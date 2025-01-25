import {Directive, effect, ElementRef, inject, input} from '@angular/core';

@Directive({
  selector: '[infiniteTranslation]'
})
export class InfiniteTranslationDirective {

  private _elementRef = inject(ElementRef)

  scrollValue = input.required<number>()
  parentHeight = input<number>()

  private _totalHeightCache!: number
  private _translateFactor = 0

  constructor() {

    effect(() => {
      const parentHeight = this.parentHeight()
      if(!parentHeight) return

      const scrollValue = this.scrollValue()
      const el = this._elementRef.nativeElement as HTMLElement

      if (this._totalHeightCache !== parentHeight) {
        this._totalHeightCache = parentHeight

      } else {
        const heightMultiplied = parentHeight * this._translateFactor
        const top = el.offsetTop
        const height = el.offsetHeight

        if (scrollValue + parentHeight < parentHeight - (top + height + heightMultiplied)) {
          this._translateFactor +=1
        } else if (parentHeight - scrollValue < top + height + heightMultiplied) {
          this._translateFactor -=1
        }
      }

      el.style.transform = `translateY(${parentHeight * this._translateFactor}px)`
    });
  }
}
