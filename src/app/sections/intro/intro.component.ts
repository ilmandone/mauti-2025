import { Component, ElementRef, viewChild } from '@angular/core';
import { ColorCardComponent } from '@components/color-card/color-card.component';
import { LogoBlockComponent } from '@components/logo-block/logo-block.component';

@Component({
  selector: 'section[intro]',
  imports: [ColorCardComponent, LogoBlockComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  aboutEl = viewChild<ElementRef<HTMLElement>>('about');
}
