import {Component, inject} from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';
import {StateService} from '../../shared/services/state.service';

@Component({
  selector: 'app-hello-section',
  imports: [
    InViewportDirective,
  ],
  standalone: true,
  templateUrl: './hello-section.component.html',
  styleUrl: './hello-section.component.scss'
})
export class HelloSectionComponent {

  private _stateSrv = inject(StateService)

  visibilityChange($event: boolean) {
    if ($event)
      this._stateSrv.setSection('hello')
  }
}
