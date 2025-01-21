import {Component, inject} from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';
import {StateService} from '../../shared/services/state.service';
import {TextScrambleLeftRightDirective} from '../../shared/directives/text-scramble-left-right.directive';
import {checkMobile} from '../../shared/detect.mobile';

@Component({
  selector: 'app-what-section',
  imports: [
    InViewportDirective,
    TextScrambleLeftRightDirective
  ],
  standalone: true,
  templateUrl: './what-section.component.html',
  styleUrl: './what-section.component.scss'
})
export class WhatSectionComponent {
  private _stateSrv = inject(StateService)
  private _isMobile = checkMobile()

  feVisible = false
  uxVisible = false
  cgVisible = false

  visibilityChange($event: boolean) {
    if ($event) {
      this._stateSrv.setSection('what')
    }
  }

  subVisibilityChange($event: number, index: string, cv: boolean) {
    const t = this._isMobile ? 0.25 : 0.6
    if ($event > t && !cv) {
       Object.assign(this, {[`${index}Visible`]: true})
     }
  }
}
