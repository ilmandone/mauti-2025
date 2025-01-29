import {Component, computed, HostListener, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {fromEvent, Subscription, take} from 'rxjs';

@Component({
  selector: 'scroller', imports: [CommonModule], template: `
    <div
      class="scroller"
      [ngStyle]="scrollerStyle()"
    ></div>
  `, styleUrl: './scroller.component.scss'
})
export class ScrollerComponent {

  private _startY = 0
  private _windowMMoveEvent = fromEvent<MouseEvent>(window, 'mousemove')
  private _windowMMoveEvent$!: Subscription
  private _windowMUpEvent = fromEvent<MouseEvent>(window, 'mouseup').pipe(take(1))

  mainHeight = input.required<number>()
  progress = input.required<number>()

  scroll = output<number>()
  dragging = output<boolean>()

  scrollerHeight = computed(() => {
    const mh = this.mainHeight()
    let h = 200

    if (mh && mh > 0) h = (window.innerHeight / this.mainHeight()) * window.innerHeight
    return Math.round(h)
  })

  delta = computed(() => {
    const p = this.progress() / -100
    let value = 0
    if (p) {
      let delta = ~~p - p
      if (delta < 0) delta += 1

      value = delta * (window.innerHeight - this.scrollerHeight())
    }
    return value
  })

  scrollerStyle = computed(() => ({
    height: `${this.scrollerHeight()}px`, transform: `translate3d(0, ${this.delta()}px, 0)`
  }))

  @HostListener('mousedown', ['$event']) mouseDown($event: MouseEvent) {
    this._startY = $event.pageY
    this.dragging.emit(true)

    this._windowMMoveEvent$ = this._windowMMoveEvent.subscribe(r => {
      this.scroll.emit(this._startY - r.clientY)
      window.setTimeout(() => {
        this._startY = r.clientY
      }, 15)
    })

    this._windowMUpEvent.subscribe((r) => {
      this._startY = r.clientY
      this.dragging.emit(false)
      this._windowMMoveEvent$.unsubscribe()
    })
  }
}
