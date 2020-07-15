import { Component, h, Prop, Element, State } from '@stencil/core';
import Glide from '@glidejs/glide';
import { generateId } from '../../../../../helpers/utils';

@Component({
  tag: 'page-listing-image-modal',
  styleUrl: 'page-listing-image-modal.scss'
})
export class PageListingImageModal {
  @Element() el: HTMLElement;
  @Prop() selected!: any;
  @Prop() images!: any[];

  @State() description: string = '';
  @State() title: string = '';

  sliderClass: string = 'glide';
  glide: any;
  glideControl: any;

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
    this.title = this.selected.title;
    this.description = this.selected.description;

    let slides = document.querySelectorAll('.' + this.sliderClass + ' .glide__slide');

    if (!slides.length) {
      return;
    }

    this.glide = new Glide('.' + this.sliderClass, {
      type: 'carousel',
      perView: 12,
      gap: 8,
      focusAt: 0,
      startAt: 0,
      bound: true,
      rewind: false,
      breakpoints: {
        600: {
          perView: 6,
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

  slideClick(e) {
    const target = e.target;

    if (target.tagName == 'IMG' && target.classList.contains('lazy-image')) {
      const bigImg: any = this.el.querySelector('.image-view img');

      bigImg.setAttribute('src', target.src);
    }
  }

  changeImage(dir) {
    if (this.images.length <= 1) {
      return;
    }

    const currentImage: any = this.el.querySelector('.display-image');

    const currentURL = currentImage.getAttribute('src');

    const currentIndex = this.images.findIndex(img => img.original === currentURL);

    let newIndex = 0;

    if (dir === '>') {
      if (currentIndex !== this.images.length - 1) {
        newIndex = currentIndex + 1;
      }
    }
    else {
      if (currentIndex === 0) {
        newIndex = this.images.length - 1;
      }
      else {
        newIndex = currentIndex - 1;
      }
    }

    this.glide.go('=' + newIndex);

    currentImage.setAttribute('src', this.images[newIndex].original);
    this.description = this.images[newIndex].description;
    this.title = this.images[newIndex].title;
  }

  close() {
    const modal = this.el.closest('ion-modal');

    if (modal) {
      modal.dismiss();
    }
  }

  render() {
    return (
      <div class="page-listing-image-modal-component">
        <ion-button aria-label="close" fill="clear" class="close reset" onClick={() => this.close()}>
          <ion-icon src="/assets/images/icons/cancel-white.svg" slot="icon-only" />
        </ion-button>

        <div class="image-view">
          <img src={this.selected.original} class="display-image" alt={this.title} />

          <button aria-label="Previous image" class="button-reset arrow-left" onClick={() => this.changeImage('<')}>
            <img src="/assets/images/icons/listing_gallery_slider_arrow.svg" alt="" />
          </button>

          <button aria-label="Next image" class="button-reset arrow-right" onClick={() => this.changeImage('>')}>
            <img src="/assets/images/icons/listing_gallery_slider_arrow.svg" alt="" />
          </button>
        </div>

        <div class="description">{this.description}</div>

        <div class={'glide ' + this.sliderClass} onClick={e => this.slideClick(e)}>
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              {
              this.images.map(img => <li class="glide__slide">
                    <lazy-image src={img.original} class="slider__img" alt={img.title} />
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
        </div>
      </div>
    )
  }
}
