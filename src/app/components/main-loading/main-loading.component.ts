import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-loading',
  imports: [],
  template: `
    <h1><span class="sec">\\(</span><span class="primary">^Д^</span><span class="sec">)/</span></h1>

    <div class="dots">{{ dots }}</div>
    <div class="message">JUST A SECOND</div>
  `,
  styleUrl: './main-loading.component.scss',
})
export class MainLoadingComponent implements OnInit {
  private readonly MAX_DOTS: number = 10;

  private _destroyRef = inject(DestroyRef);
  private _count: number = 1;
  private _isIncreasing: boolean = true;

  dots: string = '.';

  ngOnInit() {
    interval(200)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        if (this._isIncreasing) {
          this._count++;
          if (this._count >= this.MAX_DOTS) {
            this._isIncreasing = false;
          }
        } else {
          this._count--;
          if (this._count <= 1) {
            this._isIncreasing = true;
          }
        }

        this.dots = '.'.repeat(this._count);
      });
  }
}
