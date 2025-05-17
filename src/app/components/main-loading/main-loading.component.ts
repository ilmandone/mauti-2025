import { Component } from '@angular/core';

@Component({
  selector: 'app-main-loading',
  imports: [],
  template: `
    <h1><span class="sec">\\(</span><span class="primary">°Д°</span><span class="sec">)/</span></h1>
    <div class="dots">...</div>
  `,
  styleUrl: './main-loading.component.scss',
})
export class MainLoadingComponent {}
