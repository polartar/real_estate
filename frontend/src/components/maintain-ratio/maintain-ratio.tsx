import { Component, h, Element, Listen, Prop} from '@stencil/core';

@Component({
  tag: 'maintain-ratio',
  styleUrl: 'maintain-ratio.scss'
})
export class MaintainRatio {
  @Element() el: HTMLElement;
  @Prop() width: number;
  @Prop() height: number;

  private initialRender: boolean = false;

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
  }

  enforceRatio() {
    if (this.width === 0 || this.height === 0) {
      return;
    }

    let currWidth = this.currentWidth();

    console.log(currWidth, this.width);

    let ratio = this.width / this.height;

    console.log(ratio);

    let newHeight = Math.round(currWidth / ratio);

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
