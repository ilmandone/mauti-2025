import { Component, HostBinding, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'section[hello]',
  imports: [NgOptimizedImage],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent implements OnInit {
  @HostBinding('class.visible') visible = false;

  ngOnInit() {
    window.setTimeout(() => {
      this.visible = true;
    }, 0);
  }
}
