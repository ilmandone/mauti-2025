import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { debounceTime, fromEvent, Subscription, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface PosCoord {
  x: number
  y: number
}

@Component({
  selector: 'char-spinner',
  imports: [],
  template: ` <div>{{ currentAngle }}</div> `,
  styleUrl: './char-spinner.component.scss',
})
export class CharSpinnerComponent implements OnInit {
  private _dRef = inject(DestroyRef)
  private _nEl = inject(ElementRef).nativeElement as HTMLElement;

  private _elPos!: PosCoord
  private _mouseEvt$ = fromEvent<MouseEvent>(document, 'mousemove')
  private _resizeEvt$ = fromEvent(window, 'resize').pipe(debounceTime(150))

  currentAngle = 0;

  private _getElementPosition():PosCoord {
    const bb = this._nEl.getBoundingClientRect()
    console.log(bb);
    console.log(this._nEl);
    return {
      x: bb.x + bb.width / 2,
      y: bb.y + bb.height / 2,
    }
  }

  private _getAngle(event:MouseEvent) {
    const deltaX = event.clientX - this._elPos.x;
    const deltaY = event.clientY - this._elPos.y;

    const angle = Math.atan2(deltaY, deltaX) + Math.PI / 2;
    this.currentAngle = this._snapTo45Degrees(Math.round(((angle * 180 / Math.PI) + 360) % 360))
  }

  private _snapTo45Degrees(angle: number): number {
    const snapped = Math.round(angle / 45) * 45;
    return snapped === 360 ? 0 : snapped;
  }

  ngOnInit() {

    // Initialize the component after 100 ms to get correct size and position
    // Note: an external interceptor observer could be used to initialize the component

    setTimeout(() => {
      this._elPos = this._getElementPosition()
      this._mouseEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe(r => {
        this._getAngle(r)
      })
      this._resizeEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe(r => {
        this._elPos = this._getElementPosition()
      })
    },100)

  }
}
