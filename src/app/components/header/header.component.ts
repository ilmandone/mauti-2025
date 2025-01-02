import { Component } from '@angular/core';
import {ButtonComponent} from '@components/button/button.component';
import {checkMobile} from '../../shared/detect.mobile';

@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isMobile = checkMobile()
}
