import { AfterViewInit, Component, ElementRef, inject, NgZone } from '@angular/core';
import { animate } from 'animejs';
import { getTitleAnimationOptions } from '../../shared/commons';

@Component({
  selector: 'section[web-development]',
  imports: [],
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.scss',
})
export class WebDevelopmentComponent implements AfterViewInit {
  private _elRef = inject(ElementRef);
  private _ngZone = inject(NgZone);

  private _setAnimation() {
    animate('.web-title', getTitleAnimationOptions(this._elRef.nativeElement, false));
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
