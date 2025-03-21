import { Component, ElementRef, inject, input, OnInit, output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-logo',
  imports: [NgOptimizedImage],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent implements OnInit {
  private _el = inject(ElementRef).nativeElement as HTMLElement;
  private _animationEndEvent = fromEvent(this._el, 'animationend');

  orientation = input<'horizontal' | 'vertical'>('horizontal');
  logoVisible = output<boolean>();

  ngOnInit() {
    this._animationEndEvent.subscribe(() => {
      this.logoVisible.emit(true);
    });
  }
}
