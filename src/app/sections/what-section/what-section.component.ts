import {Component, inject} from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';
import {StateService} from '../../shared/services/state.service';

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

  private _stateSrv = inject(StateService)

  visibilityChange($event: boolean) {
    if ($event)
      this._stateSrv.setSection('what')
  }
}
