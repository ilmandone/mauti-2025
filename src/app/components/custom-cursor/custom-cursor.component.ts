import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StateService } from '../../shared/services/state.service';
import { shrinkAnimation } from '@components/custom-cursor/custom-cursor.animation';

interface Coords {
  x: number;
  y: number;
}

@Component({
  selector: 'custom-cursor',
  imports: [],
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss',
  animations: [shrinkAnimation],
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private readonly EASING_FACTOR = 40;

  private _destroyRef = inject(DestroyRef);
  private _element = inject(ElementRef);
  private _state = inject(StateService);

  private _raf!: number;
  private _targetCoords: Coords = { x: window.innerWidth / 2, y: -100 };
  private _currentCoords: Coords = { x: window.innerWidth / 2, y: -100 };
  private _angle = 0;
  private _minDistance = 48;

  visible = false;
  text!: string;
  textState: 'normal' | 'shrunk' = 'shrunk';

  @ViewChild('content', { read: ElementRef }) private _content!: ElementRef<HTMLElement>;

  @HostBinding('class.blended') hasBlendedClass = false;

  constructor() {
    effect(() => {
      const isAtTop = this._state.atTop();

      this._minDistance = isAtTop ? 48 : 0;
      this.hasBlendedClass = !isAtTop;
      this.textState = isAtTop ? 'normal' : 'shrunk';
    });
  }

  private _update() {
    const dx = this._targetCoords.x - this._currentCoords.x;
    const dy = this._targetCoords.y - this._currentCoords.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0.1) {
      this._angle = Math.atan2(dy, dx);
    }

    let easingFactor = this.EASING_FACTOR;

    if (distance < this._minDistance * 2) {
      easingFactor = this.EASING_FACTOR + (2 * this._minDistance - distance) * 2;
    }

    if (distance > this._minDistance) {
      this._currentCoords.x += dx / easingFactor;
      this._currentCoords.y += dy / easingFactor;
    }

    const angleInDegrees = (this._angle * 180) / Math.PI;

    this._element.nativeElement.style.transform = `translate(${this._currentCoords.x}px, ${this._currentCoords.y}px)`;
    this._content.nativeElement.style.transform = `translate(-50%, -50%) rotate(${angleInDegrees}deg)`;

    this._raf = requestAnimationFrame(this._update.bind(this));
  }

  ngOnInit() {
    this.visible = navigator.maxTouchPoints === 0;
    if (this.visible) {
      fromEvent<PointerEvent>(window, 'pointermove')
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((event: PointerEvent) => {
          this._targetCoords = { x: event.clientX, y: event.clientY };
        });

      this._raf = requestAnimationFrame(this._update.bind(this));
      this.text = 'SCROLL';
    }
  }

  ngOnDestroy() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }
}
