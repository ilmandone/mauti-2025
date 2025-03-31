import { Component } from '@angular/core';
import { DStripComponent } from '@components/d-strip/d-strip.component';

@Component({
  selector: 'section[design]',
  imports: [DStripComponent],
  templateUrl: './design.component.html',
  styleUrl: './design.component.scss',
})
export class DesignComponent {}
