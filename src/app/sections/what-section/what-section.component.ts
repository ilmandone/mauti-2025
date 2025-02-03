import {AfterViewInit, Component, inject} from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';
import {StateService} from '../../shared/services/state.service';
import {TextScrambleLeftRightDirective} from '../../shared/directives/text-scramble-left-right.directive';
import {checkMobile} from '../../shared/detect.mobile';
import {REGISTRATION_DELAY} from '../../shared/commons';

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
export class WhatSectionComponent implements AfterViewInit{
  private _stateSrv = inject(StateService)
  private _isMobile = checkMobile()

  feVisible = false
  uxVisible = false
  cgVisible = false

  ngAfterViewInit() {
    setTimeout(() => {
      this._stateSrv.registerSection()
    }, REGISTRATION_DELAY)
  }

  visibilityChange($event: boolean) {
    console.log($event);
  }

  subVisibilityChange($event: number, index: string, cv: boolean) {
    const t = this._isMobile ? 0.25 : 0.1
    if ($event > t && !cv) {
       Object.assign(this, {[`${index}Visible`]: true})
     }
  }
}
