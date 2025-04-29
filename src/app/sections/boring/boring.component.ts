import { AfterViewChecked, Component, inject, NgZone } from '@angular/core';
import { careerSteps } from './boring.configs';

@Component({
  selector: 'section[boring]',
  imports: [],
  templateUrl: './boring.component.html',
  styleUrl: './boring.component.scss',
})
export class BoringComponent implements AfterViewChecked {
  private _ngZone = inject(NgZone);

  careerSteps = careerSteps;

  private _setAnimation() {
    console.log('START BORING ANIMATIONS');
  }

  ngAfterViewChecked() {
    this._ngZone.runOutsideAngular(() => {
      this._setAnimation();
    });
  }
}
