import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[my-button]',
})
export class MyButtonDirective implements OnInit {
  private _nativeEl: HTMLButtonElement = inject(ElementRef)?.nativeElement;

  ngOnInit() {
    this._applyClass();
  }

  private _applyClass() {
    this._nativeEl.classList.add('my-button');
  }
}
