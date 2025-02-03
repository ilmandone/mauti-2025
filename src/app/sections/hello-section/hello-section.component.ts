import { Component } from '@angular/core';
import { InViewportDirective } from '../../shared/directives/in-viewport.directive';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';

@Component({
  selector: 'app-hello-section',
  imports: [InViewportDirective, TextScrambleLeftRightDirective],
  standalone: true,
  templateUrl: './hello-section.component.html',
  styleUrl: './hello-section.component.scss',
})
export class HelloSectionComponent {
  private _visible = false;

  sectionVisible = false;
  scrambleTextPaused = true;

  showSequence() {
    this._visible = true;

    setTimeout(() => {
      this.scrambleTextPaused = false;

      setTimeout(() => {
        this.sectionVisible = true;
      }, 200);
    }, 200);
  }

  visibilityChange($event: boolean) {
    console.log($event);
  }
}
