import {Component, computed, input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'scroller',
  imports: [
    CommonModule
  ],
  template: `
    <div
      class="scroller"
      [ngStyle]="scrollerStyle()"
    ></div>
  `,
  styleUrl: './scroller.component.scss'
})
export class ScrollerComponent {

  mainHeight = input.required<number>()
  progress = input.required<number>()

  scrollerHeight = computed(() => {
    const mh = this.mainHeight()
    let h = 200

    if (mh && mh > 0)
      h = (window.innerHeight / this.mainHeight()) * window.innerHeight
    return Math.round(h)
  })

  delta = computed(() => {
    let value = 0
    const p = this.progress() / -100
    if (p) {
      let delta = ~~p - p
      if (delta < 0) delta += 1

      value = delta * (window.innerHeight - this.scrollerHeight())
    }
    return value
  })

  scrollerStyle = computed(() => ({
    height: `${this.scrollerHeight()}px`,
    transform: `translate3d(0, ${this.delta()}px, 0)`
  }))
}
