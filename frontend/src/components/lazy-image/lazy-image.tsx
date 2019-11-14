import {Component, Prop, Element, h} from '@stencil/core';

@Component({
  tag: 'lazy-image',
  styleUrl: 'lazy-image.scss'
})
export class LazyImage {

  @Element() el: HTMLElement;

  @Prop() src: string;
  @Prop() alt: string = "";
  @Prop() expand: boolean = false;
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

  getClass() {
    let classObj: any = {
      'lazy-image': true
    };

    if (this.expand) {
      classObj.expand = true;
    }

    return classObj;
  }

  render() {
    const moreProps: any = {};

    if (!this.alt) {
      moreProps.role = 'presentation';
    }

    return this.observerSupported ? <img data-src={this.src} class={this.getClass()} alt={this.alt} {...moreProps} /> : <img src={this.src} class={this.getClass()} alt={this.alt} {...moreProps} />;
  }
}
