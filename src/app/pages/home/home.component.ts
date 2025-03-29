import { Component } from '@angular/core';
import { HelloComponent } from '../../sections/hello/hello.component';
import { IntroComponent } from '../../sections/intro/intro.component';

@Component({
  selector: 'app-home',
  imports: [HelloComponent, IntroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
