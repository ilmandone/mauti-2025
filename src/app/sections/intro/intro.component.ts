import { Component, effect, HostBinding, input } from '@angular/core';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';

@Component({
  selector: 'section [intro]',
  imports: [TextScrambleLeftRightDirective],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  visible = input<boolean>(false);

  @HostBinding('class.visible') isVisible!: boolean;

  constructor() {
    effect(() => {
      this.isVisible = this.visible();
    });
  }
}
