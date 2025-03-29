import { Component } from '@angular/core';
import { ColorCardComponent } from '@components/color-card/color-card.component';

@Component({
  selector: 'app-intro',
  imports: [ColorCardComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {}
