import { Component, h, Prop, Element } from '@stencil/core';
import Glide from '@glidejs/glide';
import { generateId } from '../../../../helpers/utils';

@Component({
  tag: 'page-listing-image-slider',
  styleUrl: 'page-listing-image-slider.scss'
})
export class PageListingImageSlider {
  @Element() el: HTMLElement;
  @Prop() item!: any;

  sliderClass: string = 'glide';
  glide: any;
  images: any[] = [];

  componentWillLoad() {
    // make instance unique
    this.sliderClass += '-' + generateId(8);

    this.images = [...this.item.images];

    // make sure there are at least 3 images
    if (this.images.length) {
      while (this.images.length < 3) {
        this.images.push(this.images[0]);
      }
    }
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
      gap: 8,
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

    this.glide.on('resize', () => { this.hideShowArrows() });

    this.hideShowArrows();
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

  showImg(img) {
    const modal = document.createElement('ion-modal');
    modal.component = 'page-listing-image-modal';
    modal.componentProps = {
      src: img
    }

    modal.classList.add('listing-gallery');

    document.body.appendChild(modal);

    return modal.present();
  }

  hideShowArrows() {
    const wrapper: any = this.el.querySelector('.page-listing-image-slider-component');
    const arrowsContainer: any = this.el.querySelector('.glide__arrows');

    if (wrapper.clientWidth <= 575) {
      // only dealing with 1 image width
      if (this.images.length > 1) {
        arrowsContainer.style.display = 'block';
      }
    }
    else {
      if (this.images.length > 3) {
        arrowsContainer.style.display = 'block';
      }
      else {
        arrowsContainer.style.display = 'none';
      }
    }
  }

  render() {
    if (!this.item.images.length) {
      return null;
    }

    return (
      <div class="page-listing-image-slider-component">
        <div class={'glide ' + this.sliderClass}>
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              {
              this.images.map(img => <li class="glide__slide">
                  <maintain-ratio width={478} height={504}>
                    <lazy-image src={img} class="slider__img" onClick={() => this.showImg(img)}/>
                  </maintain-ratio>
                </li>
              )
              }
            </ul>
          </div>

          <div class="glide__arrows" data-glide-el="controls">
            <button aria-label="Previous slide" class="glide__arrow glide__arrow--left" data-glide-dir="<">
              <img src="/assets/images/icons/listing_gallery_slider_arrow.svg" />
            </button>

            <button aria-label="Next slide" class="glide__arrow glide__arrow--right" data-glide-dir=">">
              <img src="/assets/images/icons/listing_gallery_slider_arrow.svg" />
            </button>
          </div>

          {/* hidden button overlay to capture the click events going back to prevent over-scroll */}
          <button aria-label="" role="presentation" class="glide__arrow left-arrow-click-jacker" onClick={() => this.slideMove('<')}>
            <img src="/assets/images/icons/listing_gallery_slider_arrow.svg" />
          </button>

          {/* hidden button overlay to capture the click events going back to prevent over-scroll */}
          <button aria-label="" role="presentation" class="glide__arrow right-arrow-click-jacker" onClick={() => this.slideMove('>')}>
            <img src="/assets/images/icons/listing_gallery_slider_arrow.svg" />
          </button>
        </div>
      </div>
    )
  }
}