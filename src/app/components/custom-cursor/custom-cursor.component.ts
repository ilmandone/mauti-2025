import { Component, DestroyRef, effect, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StateService } from '../../shared/services/state.service';

interface Coords {
  x: number;
  y: number;
}

@Component({
  selector: 'custom-cursor',
  imports: [],
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss',
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private readonly EASING_FACTOR = 40;

  private _destroyRef = inject(DestroyRef);
  private _element = inject(ElementRef);
  private _state = inject(StateService);

  private _raf!: number;
  private _targetCoords: Coords = { x: 0, y: 0 };
  private _currentCoords: Coords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  private _angle = 0;
  private _minDistance = 48;

  text!: string;

  @ViewChild('content', { read: ElementRef, static: true }) private _content!: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      console.log(this._state.atTop());
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
    if (navigator.maxTouchPoints === 0) {
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
