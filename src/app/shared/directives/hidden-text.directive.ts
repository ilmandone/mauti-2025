import {Directive, ElementRef, inject, input, OnInit} from '@angular/core';

@Directive({
  selector: '[hiddenText]'
})
export class HiddenTextDirective implements OnInit {

  private readonly elRef = inject(ElementRef)

  reverse = input<boolean>(false)
  visible = input<boolean | number>(false, {alias: 'hiddenText'})
  cssColor = input<string>('--secondary-color')

  private _getPosValue(v: boolean | number) {
    if (typeof v === 'number') return v
    return v ? 100 : 0
  }

  private _getBg(percentage: number) {
    return `linear-gradient(${this.reverse() ? '270deg' : '90deg'}, var(--secondary-color) ${percentage}%, rgba(0,0,0,0) ${percentage}%, rgba(0,0,0,0) 100%)`
  }

  ngOnInit() {
    const el = this.elRef.nativeElement as HTMLElement
    el.classList.add('text-hidden')
    el.style.backgroundImage = this._getBg(50)
    el.style.backgroundPositionX = `${this._getPosValue(this.visible())}%`

  }
}
