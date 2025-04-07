import { Directive, effect, ElementRef, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { ObservableTypes, ViewportService } from '../services/viewport.service';

@Directive({
  selector: '[in-viewport]',
})
export class ViewportDirective implements OnInit, OnDestroy {
  private _elementRef = inject(ElementRef);
  private _viewport = inject(ViewportService);

  regType = input<ObservableTypes>('all');

  inPage = output<boolean>();
  ratio = output<number>();

  constructor() {
    effect(() => {
      const centered = this._viewport.centered();
      if (centered && centered.el === this._elementRef.nativeElement) {
        this.inPage.emit(centered.isIntersecting);
      }
    });

    effect(() => {
      const ratio = this._viewport.ratio();
      if (ratio && ratio.el === this._elementRef.nativeElement) {
        this.ratio.emit(ratio.value);
      }
    });
  }

  ngOnInit() {
    this._viewport.add(this._elementRef, this.regType());
  }

  ngOnDestroy() {
    this._viewport.remove(this._elementRef, this.regType());
  }
}
