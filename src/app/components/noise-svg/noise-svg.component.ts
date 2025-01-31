import { Component } from '@angular/core';

@Component({
  selector: 'noise-svg-filter',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="svg-filter">
      <defs>
        <filter id="noise-footer" x="0" y="0" height="100%">
          <feOffset in="SourceGraphic" dx="-8" dy="-8" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="32" result="blur" />
          <feTurbulence result="waves" type="turbulence" baseFrequency="0.735 0.771" numOctaves="1"
                        seed="256"></feTurbulence>
          <feDisplacementMap in="blur" in2="waves" scale="120" xChannelSelector="R" yChannelSelector="B"
                             result="ripples"></feDisplacementMap>
          <feComposite in="waves" in2="ripples" operator="arithmetic" k1="1" k2="0" k3="1" k4="0"></feComposite>
        </filter>
        <filter id="noise-header" x="0" y="0" height="60%">
          <feOffset in="SourceGraphic" dx="-8" dy="-8" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="72" result="blur" />
          <feTurbulence result="waves" type="turbulence" baseFrequency="0.735 0.771" numOctaves="2"
                        seed="256"></feTurbulence>
          <feDisplacementMap in="blur" in2="waves" scale="-120" xChannelSelector="R" yChannelSelector="B"
                             result="ripples"></feDisplacementMap>
          <feComposite in="waves" in2="ripples" operator="arithmetic" k1="1" k2="0" k3="1" k4="0"></feComposite>
        </filter>
      </defs>
    </svg>
  `,
  styles:`
    :host {
      position: absolute;
      display: block;

      .svg-filter {
        position: absolute;
        width: 1px;
        height: 1px;
      }
    }
  `
})
export class NoiseSvgComponent {}
