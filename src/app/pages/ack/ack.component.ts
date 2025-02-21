import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';
import { SpinnersPackComponent } from '@components/spinners-pack/spinners-pack.component';
import { checkMobile } from '../../shared/detect.mobile';
import { ScreenSizeService } from '../../shared/services/screen-size.service';
import { REGISTRATION_DELAY } from '../../shared/commons';
import { AckService } from '../../shared/services/ack.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ack',
  imports: [ButtonComponent, TextScrambleLeftRightDirective, SpinnersPackComponent],
  templateUrl: './ack.component.html',
  styleUrl: './ack.component.scss',
})
class AckComponent implements OnInit {
  private _ackService = inject(AckService)
  private _router = inject(Router)
  screenSizeSrv = inject(ScreenSizeService)

  visible = false;
  spinnerActive = checkMobile()

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, REGISTRATION_DELAY);
  }

  readonly checkMobile = checkMobile;

  handleACK(b: boolean) {
    this._ackService.setAck(b)
    this._router.navigate(['/'])
  }
}

export default AckComponent;
