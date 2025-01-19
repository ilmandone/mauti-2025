import {Directive, effect, ElementRef, inject, input, OnInit} from '@angular/core';

@Directive({
  selector: '[hiddenText]'
})
export class HiddenTextDirective implements OnInit {

  private readonly elRef = inject(ElementRef)

  reverse = input<boolean>(false)
  visible = input<boolean | number>(false, {alias: 'hiddenText'})
  cssColor = input<string>('var(--secondary-color)')

  private _getPosValue(v: boolean | number) {
    console.log(v);
    if (typeof v === 'number') return v
    return v ? 0 : 101
  }

  private _getBg(percentage: number) {
    return `linear-gradient(${this.reverse() ? '270deg' : '90deg'}, ${this.cssColor()} ${percentage}%, rgba(0,0,0,0) ${percentage}%, rgba(0,0,0,0) 100%)`
  }

  constructor() {
    effect(() => {
      const el = this.elRef.nativeElement as HTMLElement
      el.style.backgroundPositionX = `${this._getPosValue(this.visible())}%`
    });
  }

  ngOnInit() {
    const el = this.elRef.nativeElement as HTMLElement
    el.classList.add('text-hidden')
    el.style.backgroundImage = this._getBg(50)
  }
}
