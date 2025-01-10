import {Directive, effect, ElementRef, inject, input, model} from '@angular/core';

@Directive({
  selector: '[textTransition]'
})
export class TextTransitionDirective {

  private _elRef = inject(ElementRef)

  private _queue!: string[]
  private _finalText!: string
  private _frameRequest!: number | null
  private _textCursor!: number
  private _textLength!: number

  show = input<boolean>()
  text = model.required<string>({ alias: 'textTransition' })

  constructor() {
    effect(() => {
      const element = this._elRef.nativeElement as HTMLElement
      const t = this.text()


      this._finalText = t
      this._textCursor = 0
      this._textLength = Math.max(t.length, element.innerText.length)
      this._queue = Array.from(element.innerText)

      while (this._queue.length < this._textLength) {
        this._queue.push('')
      }

      element.setAttribute('data-text', t)

      // Stop previous animation
      if (this._frameRequest) cancelAnimationFrame(this._frameRequest)

      // Start text scramble
      this._scramble()
    });
  }

  //#region Privates

  private _scramble() {
    if (this._textCursor >= this._textLength) {
      this._frameRequest = null
    }
    else {
      this._queue[this._textCursor] = this._finalText.charAt(this._textCursor) || ''
      ;(this._elRef.nativeElement as HTMLElement).innerText = this._queue.join('')

      this._textCursor ++
      this._frameRequest = requestAnimationFrame(this._scramble.bind(this))
    }

  }


  //#endregion


}
