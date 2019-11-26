import { Component, h, Element, Listen, Prop} from '@stencil/core';

declare var window: any;
declare var ResizeObserver: any;

@Component({
  tag: 'maintain-ratio',
  styleUrl: 'maintain-ratio.scss'
})
export class MaintainRatio {
  @Element() el: HTMLElement;
  @Prop() width!: number;
  @Prop() height!: number;
  @Prop() maxHeight?: number;
  @Prop() minHeight?: number;
  @Prop() minWidth?: number;
  @Prop() maxWidth?: number;

  private initialRender: boolean = false;

  @Listen('resize', {
    target: 'window'
  })
  windowResize() {
    requestAnimationFrame(() => {
      if (this.initialRender) {
        this.enforceRatio();
      }
    });
  }

  getContainer() {
    const container: any = this.el.querySelector('.maintain-ratio');
    return container;
  }

  currentWidth() {
    return this.getContainer().clientWidth;
  }

  currentHeight() {
    return this.getContainer().clientHeight;
  }

  componentDidLoad() {
    this.initialRender = true;

    this.enforceRatio();

    if (window && window.ResizeObserver) {
      new ResizeObserver(() => { this.observe() }).observe(this.getContainer());

      setTimeout(() => this.enforceRatio(), 100); // for good measure
    }
    else {
      // no observer, let's just give it a couple of seconds of polling and assume it's settled down
      // anything more advanced can trigger a window resize event to force resizing if necessary

      let interval = setInterval(() => {
        this.enforceRatio();
      }, 250);

      setTimeout(() => {
        clearInterval(interval);
      }, 2000);
    }
  }

  observe() {
    this.enforceRatio();
  }

  enforceRatio() {
    if (this.width === 0 || this.height === 0) {
      return;
    }

    let currWidth = this.currentWidth();

    let ratio = this.width / this.height;

    let newHeight = Math.round(currWidth / ratio);

    if (!newHeight) {
      return;
    }

    this.getContainer().style.height = `${newHeight}px`;
  }

  render() {
    return (
      <div class="maintain-ratio">
        <slot />
      </div>
    )
  }
}
