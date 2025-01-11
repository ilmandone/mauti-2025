import {Directive, ElementRef, inject, input, OnInit} from '@angular/core';

@Directive({
  selector: '[blockToText]'
})
export class BlockToTextDirective implements OnInit{

  private _elementRef = inject(ElementRef)

  private _originalText!:string[]

  showText = input.required<boolean>({
    alias: 'blockToText'
  })

  ngOnInit() {
    const el = this._elementRef.nativeElement as HTMLElement

    this._elementRef.nativeElement.setAttribute('data-text', el.innerHTML)
    this._originalText = el.innerText.split(' ').map((s, i, self) => {
      return `<span class="text-block" style="transition-delay: ${Math.floor(Math.random() * 200)}ms">${s}</span>${i !== self.length - 1 ? ' ' : ''}`
    })

    el.innerHTML = this._originalText.join('')
  }
}
