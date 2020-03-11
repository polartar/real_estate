import { Component, h, State, Prop  } from '@stencil/core';
import Glide from '@glidejs/glide';
import { generateId } from '../../helpers/utils';


@Component({
  tag: 'listing-slider',
  styleUrl: 'listing-slider.scss'
})
export class ListingSlider {
  @State() index: number = 0;
  @Prop() items: any[] = [];

  sliderClass: string = 'glide';
  glide: any;

  componentWillLoad() {
    // make instance unique
    this.sliderClass += '-' + generateId(8);
  }

  componentDidLoad() {
    setTimeout(() => {
      this.initializeSlider();
    }, 100);
  }

  initializeSlider() {
    let slides = document.querySelectorAll('.' + this.sliderClass + ' .glide__slide');

    if (!slides.length) {
      return;
    }

    this.glide = new Glide('.' + this.sliderClass, {
      type: 'slider',
      perView: 3,
      gap:10,
      focusAt: 0,
      startAt: 0,
      rewind: false,
      breakpoints: {
        575: {
          perView: 1,
          startAt: 0,
          focusAt: 0,
        }
      }
    });

    this.glide.on('build.after', () => {
      let track: HTMLElement = document.querySelector('.' + this.sliderClass + ' .glide__track');
      let slides: any = document.querySelectorAll('.' + this.sliderClass + ' .glide__slide');

      if (!track && !slides) {
        return;
      }

      let slideHeight = track.offsetHeight;
      slides.forEach(slide => {
        slideHeight = Math.max(slideHeight, slide.offsetHeight);
      });

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

  slideMove(dir) {
    const numSlides = document.querySelectorAll('.' + this.sliderClass + ' .glide__slide').length;

    const offsetRight = this.glide.settings.perView - this.glide.settings.focusAt;

    if (dir === '<' && this.glide.index > this.glide.settings.startAt) {
      this.glide.go('<');
    }

    if (dir === '>' && this.glide.index < numSlides - offsetRight) {
      this.glide.go('>');
    }
  }

  render() {
    if (!this.items.length) {
      return null;
    }

    return [
      <div class={'glide ' + this.sliderClass}>
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            { this.items.map(item => <li class="glide__slide"><listing-card item={item} /></li>)}
          </ul>
        </div>

        <div class="glide__arrows" data-glide-el="controls">
          <button aria-label="Previous slide" class="glide__arrow glide__arrow--left" data-glide-dir="<">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
          </button>

          <button aria-label="Next slide" class="glide__arrow glide__arrow--right" data-glide-dir=">">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </button>
        </div>

        {/* hidden button overlay to capture the click events going back to prevent over-scroll */}
        <button aria-label="" role="presentation" class="glide__arrow left-arrow-click-jacker" onClick={() => this.slideMove('<')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
        </button>

        {/* hidden button overlay to capture the click events going back to prevent over-scroll */}
        <button aria-label="" role="presentation" class="glide__arrow right-arrow-click-jacker" onClick={() => this.slideMove('>')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </button>
      </div>
    ];
  }
}
