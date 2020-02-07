import { Component, h, Prop } from '@stencil/core';
import { generateId } from '../../helpers/utils';
import Glide from '@glidejs/glide';

@Component({
  tag: 'testimonials-slider',
  styleUrl: 'testimonials-slider.scss'
})
export class TestimonialsSlider {
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
      perView: 1,
      rewind: false,
    });

    this.glide.mount();
  }

  componentDidUnload() {
    if (this.glide) {
      this.glide.destroy();
    }
  }

  render() {
    return [
      <div class={'testimonials-slider glide ' + this.sliderClass}>
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li class="glide__slide first">
                <div class="quote">"I had an amazing experience with APT212 last summer! I saved a lot of money by going the private room route, splitting costs to live in a spacious 4-bedroom walking distance to NYU."</div>
                <div class="author">-Chris W.</div>
            </li>
            <li class="glide__slide second">
                <div class="quote">"I had an amazing experience with APT212 last summer! I saved a lot of money by going the private room route, splitting costs to live in a spacious 4-bedroom walking distance to NYU."</div>
                <div class="author">-Mike H.</div></li>
            <li class="glide__slide third">
                <div class="quote">"I had an amazing experience with APT212 last summer! I saved a lot of money by going the private room route, splitting costs to live in a spacious 4-bedroom walking distance to NYU."</div>
                <div class="author">-Hester K.</div>
            </li>
          </ul>
        </div>

        <div class="glide__bullets" data-glide-el="controls[nav]">
            <button class="glide__bullet" data-glide-dir="=0"></button>
            <button class="glide__bullet" data-glide-dir="=1"></button>
            <button class="glide__bullet" data-glide-dir="=2"></button>
        </div>

      </div>
    ];
  }
}
