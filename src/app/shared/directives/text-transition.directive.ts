import {Directive, effect, ElementRef, inject, input} from '@angular/core';

@Directive({
  selector: '[textTransition]',
})
export class TextTransitionDirective {

  private readonly _randomChars = '!<>-_\\/[]{}—=+*^?#________'

  private _elRef = inject(ElementRef)

  private _queue!: string[]
  private _queueDelays!: number[]
  private _finalText!: string
  private _frameRequest!: number | null
  private _scrambleIndex = 0
  private _textCursor!: number
  private _textLength!: number

  scrambleColor = input('--primary-color')

  text = input.required<string>({alias: 'textTransition'})

  constructor() {
    effect(() => {
      const element = this._elRef.nativeElement as HTMLElement
      const currentText = element.innerText

      this._textCursor = 0
      this._scrambleIndex = 0
      this._queue = []
      this._queueDelays = []

      this._finalText = this.text()
      this._textLength = Math.max(this._finalText.length, currentText.length)

      for (let i = 0; i < this._textLength; i++) {
        this._queue.push(currentText.charAt(i) || '')
        this._queueDelays.push(Math.floor(Math.random() * 8))
      }

      element.setAttribute('data-text', this._finalText)

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
    } else {
      if (this._scrambleIndex > this._queueDelays[this._textCursor]) {
        this._queue[this._textCursor] = this._finalText.charAt(this._textCursor) || ''
        this._scrambleIndex = 0
        this._textCursor++
      } else {
        this._queue[this._textCursor] =
          `<span style="color: var(${this.scrambleColor()})">${this._randomChars[Math.floor(Math.random() * this._randomChars.length)]}</span>`
        this._scrambleIndex += 1
      }

      ;(this._elRef.nativeElement as HTMLElement).innerHTML = this._queue.join('')
      this._frameRequest = requestAnimationFrame(this._scramble.bind(this))
    }
  }

  //#endregion
}
