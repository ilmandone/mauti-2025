import { Component } from '@angular/core';

@Component({
  selector: 'noise-svg-filter',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="svg-filter">
      <defs>
        <filter id="noise-footer" x="0" y="0" height="100%">
          <feOffset in="SourceGraphic" dx="8" dy="-8" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="2" result="blur" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="waves"
            scale="30"
            xChannelSelector="G"
            yChannelSelector="B"
            result="ripples"
          ></feDisplacementMap>
        </filter>
      </defs>
    </svg>
  `,
  styles: `
    :host {
      position: absolute;
      display: block;

      .svg-filter {
        position: absolute;
        width: 1px;
        height: 1px;
      }
    }
  `,
})
export class NoiseSvgComponent {}
