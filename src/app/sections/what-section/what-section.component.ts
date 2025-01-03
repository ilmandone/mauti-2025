import { Component } from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';

@Component({
  selector: 'app-what-section',
  imports: [
    InViewportDirective
  ],
  standalone: true,
  templateUrl: './what-section.component.html',
  styleUrl: './what-section.component.scss'
})
export class WhatSectionComponent {

  visibilityChange($event: boolean) {
    console.log($event, 'what');
  }
}
