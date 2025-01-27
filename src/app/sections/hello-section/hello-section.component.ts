import {AfterViewInit, Component, inject} from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';
import {StateService} from '../../shared/services/state.service';
import {TextScrambleLeftRightDirective} from '../../shared/directives/text-scramble-left-right.directive';

@Component({
  selector: 'app-hello-section',
  imports: [
    InViewportDirective,
    TextScrambleLeftRightDirective,
  ],
  standalone: true,
  templateUrl: './hello-section.component.html',
  styleUrl: './hello-section.component.scss'
})
export class HelloSectionComponent implements AfterViewInit{

  private _stateSrv = inject(StateService)
  private _visible = false

  sectionVisible = false
  scrambleTextPaused = true

  ngAfterViewInit() {
    this._stateSrv.registerSection()
  }

  showSequence() {
    this._visible = true

    setTimeout(() => {
      this.scrambleTextPaused = false

      setTimeout(() => {
        this.sectionVisible = true
      }, 200)
    }, 200)
  }

  visibilityChange($event: boolean) {
    if ($event) {
      if (!this._visible) this.showSequence()
      this._stateSrv.setSection('hello')
    }
  }
}
