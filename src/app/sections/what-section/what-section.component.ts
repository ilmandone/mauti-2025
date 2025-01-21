import {Component, inject} from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';
import {StateService} from '../../shared/services/state.service';
import {HiddenTextDirective} from '../../shared/directives/hidden-text.directive';

@Component({
  selector: 'app-what-section',
  imports: [
    InViewportDirective,
    HiddenTextDirective
  ],
  standalone: true,
  templateUrl: './what-section.component.html',
  styleUrl: './what-section.component.scss'
})
export class WhatSectionComponent {
  private _stateSrv = inject(StateService)
  private _visible = false

  sectionVisible = false

  private _showSequence() {
    this._visible = true

    window.setTimeout(() => {
      this.sectionVisible = true
    },200)
  }

  visibilityChange($event: boolean) {
    if ($event) {
      this._stateSrv.setSection('what')
      if (!this._visible) this._showSequence()
    }
  }
}
