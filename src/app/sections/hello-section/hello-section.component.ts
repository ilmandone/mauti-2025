import {Component, computed, inject} from '@angular/core';
import {InViewportDirective} from '../../shared/directives/in-viewport.directive';
import {StateService} from '../../shared/services/state.service';
import {BlockToTextDirective} from '../../shared/directives/block-to-text.directive';

@Component({
  selector: 'app-hello-section',
  imports: [
    InViewportDirective,
    BlockToTextDirective
  ],
  standalone: true,
  templateUrl: './hello-section.component.html',
  styleUrl: './hello-section.component.scss'
})
export class HelloSectionComponent {

  private _stateSrv = inject(StateService)

  visible = computed(() => {
    return this._stateSrv.section() === 'hello'
  })

  visibilityChange($event: boolean) {
    if ($event)
      this._stateSrv.setSection('hello')
  }
}
