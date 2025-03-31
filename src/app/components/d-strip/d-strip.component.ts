import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface ColorStep {
  bg: string;
  color: string;
}

@Component({
  selector: 'app-d-strip',
  imports: [NgTemplateOutlet],
  templateUrl: './d-strip.component.html',
  styleUrl: './d-strip.component.scss',
})
export class DStripComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);

  private _colorSequence: ColorStep[] = [
    {
      bg: '--text-color',
      color: '--bg-color',
    },
    {
      bg: '--secondary-color',
      color: '--bg-color',
    },
    {
      bg: '--bg-color',
      color: '--text-color',
    },
    {
      bg: '--primary-color',
      color: '--bg-color',
    },
  ];

  stripList = signal<ColorStep[]>([]);

  private _generateStrip() {
    console.log('GENERATE STRIP');
  }

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(50))
      .subscribe(() => {
        this._generateStrip();
      });

    this._generateStrip();
  }
}
