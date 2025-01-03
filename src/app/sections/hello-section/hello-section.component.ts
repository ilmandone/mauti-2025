import { Component } from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';

@Component({
  selector: 'app-hello-section',
  imports: [
    InViewportDirective
  ],
  standalone: true,
  templateUrl: './hello-section.component.html',
  styleUrl: './hello-section.component.scss'
})
export class HelloSectionComponent {

  visibilityChange($event: boolean) {
    console.log($event, 'hello');
  }
}
