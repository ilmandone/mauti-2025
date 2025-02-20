import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';
import { CharSpinnerComponent } from '@components/char-spinner/char-spinner.component';
import { SpinnerPackComponent } from '@components/spinner-pack/spinner-pack.component';

@Component({
  selector: 'app-ack',
  imports: [ButtonComponent, TextScrambleLeftRightDirective, CharSpinnerComponent, SpinnerPackComponent],
  templateUrl: './ack.component.html',
  styleUrl: './ack.component.scss',
})
class AckComponent implements OnInit {
  visible = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 400);
  }
}

export default AckComponent
