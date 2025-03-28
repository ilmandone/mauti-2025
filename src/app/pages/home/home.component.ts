import { Component } from '@angular/core';
import { HelloComponent } from '../../sections/hello/hello.component';

@Component({
  selector: 'app-home',
  imports: [HelloComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
