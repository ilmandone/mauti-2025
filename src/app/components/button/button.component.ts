import { ChangeDetectionStrategy, Component, computed, HostBinding, input } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  size = input<'standard' | 'small'>('standard');
  variant = input<'primary' | 'secondary' | 'tertiary' | 'neutral'>('primary')

  classes = computed(() => {
    return `${this.variant()} ${this.size()}`
  })

  @HostBinding('class') get elementClasses() {
    return this.classes()
  }
}
