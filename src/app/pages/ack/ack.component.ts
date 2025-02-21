import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';
import { SpinnersPackComponent } from '@components/spinners-pack/spinners-pack.component';
import { checkMobile } from '../../shared/detect.mobile';
import { ScreenSizeService } from '../../shared/services/screen-size.service';
import { REGISTRATION_DELAY } from '../../shared/commons';

@Component({
  selector: 'app-ack',
  imports: [ButtonComponent, TextScrambleLeftRightDirective, SpinnersPackComponent],
  templateUrl: './ack.component.html',
  styleUrl: './ack.component.scss',
})
class AckComponent implements OnInit {
  screenSizeSrv = inject(ScreenSizeService)

  visible = false;
  spinnerActive = checkMobile()

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, REGISTRATION_DELAY);
  }

  protected readonly checkMobile = checkMobile;
}

export default AckComponent;
