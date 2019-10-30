import { Component, h, Element, Listen, Prop} from '@stencil/core';

declare var window: any;

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

  private initialRender: boolean = false;
  private changeInProgress: boolean = false;

  @Listen('resize', {
    target: 'window'
  })
  windowResize() {
    requestAnimationFrame(() => {
      console.log(this.width, this.height, this.initialRender);
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

  componentDidRender() {
    this.initialRender = true;

    this.enforceRatio();

    if (window && window.ResizeObserver) {
      new ResizeObserver(() => { this.observe() }).observe(this.getContainer());
    }
    else {
      // no observer, let's just give it a couple of seconds of polling and assume it's settled down

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
    if (this.changeInProgress) {
      return;
    }

    this.changeInProgress = true;

    if (this.width === 0 || this.height === 0) {
      return;
    }

    let currWidth = this.currentWidth();

    let ratio = this.width / this.height;

    let newHeight = Math.round(currWidth / ratio);

    this.getContainer().style.height = `${newHeight}px`;

    setTimeout(() => {
      this.changeInProgress = false;
    }, 50);
  }

  render() {
    return (
      <div class="maintain-ratio">
        <slot />
      </div>
    )
  }
}
