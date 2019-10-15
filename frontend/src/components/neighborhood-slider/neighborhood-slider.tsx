import { Component, h, Prop } from '@stencil/core';
import Glide from '@glidejs/glide';


@Component({
  tag: 'neighborhood-slider',
  styleUrl: 'neighborhood-slider.scss'
})
export class NeighborhoodSlider {
  @Prop() items: any[] = [];
  sliderClass: string = 'glide';
  glide: any;

  componentWillLoad() {
    // make instance unique
    this.sliderClass += '-' + this.generateId(8);
  }

  componentDidLoad() {
    let slides = document.querySelectorAll('.' + this.sliderClass + ' .glide__slide');

    if (!slides.length) {
      return;
    }

    this.glide = new Glide('.' + this.sliderClass, {
      type: 'slider',
      perView: 4,
      gap:40,
      rewind: false,
      breakpoints: {
        1024: {
          perView: 3
        },
        600: {
          perView: 2
        }
      }
    });

    this.glide.on('build.after', () => {
      let track: HTMLElement = document.querySelector('.' + this.sliderClass + ' .glide__track');
      let slide: HTMLElement = document.querySelector('.' + this.sliderClass + ' .glide__slide');

      if (!track && !slide) {
        return;
      }

      var slideHeight = slide.offsetHeight;
      var glideTrack = track.offsetHeight;
      if (slideHeight != glideTrack) {
        var newHeight = slideHeight;
        track.style.height = newHeight + 'px';
      }
    });

    this.glide.mount();
  }

  componentDidUnload() {
    if (this.glide) {
      this.glide.destroy();
    }
  }

  dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }

  generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('')
  }

  render() {
    return [
      <div class={'neighborhood-slider glide ' + this.sliderClass}>
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            {this.items.map(neighborhood =>
              <li class="glide__slide"><neighborhood-card item={neighborhood} /></li>
            )}
          </ul>
        </div>

        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<" onClick={() => console.log(this.items)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
          </button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </button>
        </div>
      </div>
    ];
  }
}
