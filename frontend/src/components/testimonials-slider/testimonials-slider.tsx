import { Component, h, Prop } from '@stencil/core';
import { generateId } from '../../helpers/utils';
import Glide from '@glidejs/glide';
import { Autoplay } from '@glidejs/glide/dist/glide.modular.esm'


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
      rewind: true,
      autoplay: 2000
    });

    this.glide.mount({ Autoplay });
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
                <div class="quote">{this.items[0][0]}</div>
                <div class="author">{this.items[0][1]}</div>
            </li>
            <li class="glide__slide second">
                <div class="quote">{this.items[1][0]}</div>
                <div class="author">{this.items[1][1]}</div></li>
            <li class="glide__slide third">
                <div class="quote">{this.items[2][0]}</div>
                <div class="author">{this.items[2][1]}</div>
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
