import {Component, Prop, Element, h} from '@stencil/core';

@Component({
  tag: 'lazy-image',
  styleUrl: 'lazy-image.scss'
})
export class LazyImage {

  @Element() el: HTMLElement;

  @Prop() src: string;
  @Prop() alt: string = '';
  private observer: IntersectionObserver;
  private observerSupported: boolean = true;

  componentDidLoad() {
    const img: HTMLImageElement = this.el.querySelector('img');

    this.observerSupported = !!window.IntersectionObserver;

    if (img && this.observerSupported) {
      this.observer = new IntersectionObserver(this.onIntersection, {rootMargin: "200px 50px 200px 50px"});
      this.observer.observe(img);
    }
  }

  private onIntersection = async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
         if (this.observer) {
             this.observer.disconnect();
         }

         if (entry.target.getAttribute('data-src')) {
             entry.target.setAttribute('src',
                        entry.target.getAttribute('data-src'));
             entry.target.removeAttribute('data-src');
         }
      }
    }
  };

  render() {
    return this.observerSupported ? <img data-src={this.src} class="lazy-image" alt={this.alt} /> : <img src={this.src} class="lazy-image" alt={this.alt} />;
  }
}