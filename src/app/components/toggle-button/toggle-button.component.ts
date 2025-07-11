import { Component, contentChild, input, output, TemplateRef } from '@angular/core';
import { ButtonMode, MyButtonDirective } from '../../directives/my-button.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-toggle-button',
  imports: [MyButtonDirective, NgTemplateOutlet],
  standalone: true,
  template: ` <button my-button [mode]="this.mode()" (click)="onClick($event)">
    @if (!status) {
      <ng-container *ngTemplateOutlet="offChild()"></ng-container>
    } @else {
      <ng-container *ngTemplateOutlet="onChild()"></ng-container>
    }
  </button>`,
  styleUrl: './toggle-button.component.scss',
})
export class ToggleButtonComponent {
  offChild = contentChild.required<TemplateRef<HTMLElement>>('off');
  onChild = contentChild.required<TemplateRef<HTMLElement>>('on');

  mode = input<ButtonMode>('primary');

  click = output<boolean>();
  status = false;

  onClick($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.status = !this.status;
    this.click.emit(this.status);
  }
}
