import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-logo-block',
  imports: [NgOptimizedImage],
  templateUrl: './logo-block.component.html',
  styleUrl: './logo-block.component.scss',
})
export class LogoBlockComponent {}
