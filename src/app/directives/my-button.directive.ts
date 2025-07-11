import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[my-button]',
})
export class MyButtonDirective implements OnInit {
  private _nativeEl: HTMLButtonElement = inject(ElementRef)?.nativeElement;

  mode = input<'primary' | 'secondary'>('primary');

  ngOnInit() {
    this._applyClass();
  }

  private _applyClass() {
    this._nativeEl.classList.add(`my-button--${this.mode()}`);
  }
}
