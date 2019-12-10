import { Component, h, Prop, Element, Host } from '@stencil/core';

export interface InlineImageInterface {
  src: string,
  alt: string,
}

@Component({
  tag: 'inline-gallery',
  styleUrl: 'inline-gallery.scss'
})
export class InlineGallery {
  @Element() el: HTMLElement;
  @Prop() images!: InlineImageInterface[];

  changeImage(dir) {
    const image: any = this.el.querySelector('.gallery-image.active');

    if (dir === 'next') {

      if (image && image.nodeName === 'LAZY-IMAGE') {
        const nextImg = image.nextSibling;
        if (nextImg && nextImg.nodeName === 'LAZY-IMAGE') {
          image.classList.remove('active');
          nextImg.classList.add('active');

          const images = this.el.querySelectorAll('.gallery-image');

          if (this.images.length > images.length) {
            // insert the next image

            const newImg = Object.assign(document.createElement('lazy-image'), {
              src: this.images[images.length].src,
              alt: this.images[images.length].alt
            });

            newImg.classList.add('gallery-image');

            nextImg.insertAdjacentElement('afterend', newImg);
          }

          if (nextImg.nextSibling.nodeName !== 'LAZY-IMAGE') {
            this.el.querySelector('.gallery .controls .next').setAttribute('disabled', 'disabled');
          }

          this.el.querySelector('.gallery .controls .previous').removeAttribute('disabled');
        }
      }
    }
    else {
      if (image && image.nodeName === 'LAZY-IMAGE') {
        const prevImg = image.previousSibling;
        if (prevImg && prevImg.nodeName === 'LAZY-IMAGE') {
          image.classList.remove('active');
          prevImg.classList.add('active');

          if (!prevImg.previousSibling || (prevImg.previousSibling && prevImg.previousSibling.nodeName !== 'LAZY-IMAGE')) {
            this.el.querySelector('.gallery .controls .previous').setAttribute('disabled', 'disabled');
          }

          this.el.querySelector('.gallery .controls .next').removeAttribute('disabled');
        }
      }
    }
  }

  render() {
    if (!this.images.length) {
      return null;
    }

    return (
      <Host class="inline-gallery-component">
        <div class="gallery-container">
        {
          this.images.filter((_i, ind) => ind < 2).map((image, index) => <lazy-image src={image.src} class={{'gallery-image': true, active: index === 0}} alt={`${image.alt}`} />)
        }

        {
          this.images.length > 1 ?
          <div class="controls">
            <button class="button-reset previous" disabled aria-label="Previous image" onClick={() => this.changeImage('prev')}>
              <ion-icon name="play" />
            </button>
            <button class="button-reset next" aria-label="Next image" onClick={() => this.changeImage('next')}>
              <ion-icon name="play" />
            </button>
          </div>
          : null
        }
        </div>
      </Host>
    )
  }
}
