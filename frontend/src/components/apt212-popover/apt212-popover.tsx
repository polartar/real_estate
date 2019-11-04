import { Component, h, Host, Prop, Element, Method, Listen} from '@stencil/core';

@Component({
  tag: 'apt212-popover',
  styleUrl: 'apt212-popover.scss'
})
export class Apt212Popover {
  @Element() el: HTMLElement;
  @Prop() event;
  @Prop() component!: string;
  @Prop() componentProps: any = {};
  @Prop() styleOverride: any = {};
  @Prop() bindTo: any = { target: 'bottom left', popover: 'top left'};

  mutationObserver: any;
  rendered: boolean = false;
  initialized: boolean = false;

  @Method('dismiss')
  async dismiss() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    this.el.remove();
  }

  @Listen('click', {
    target: 'document'
  })
  clickListener(e) {
    if (!this.rendered) {
      return;
    }

    if (!this.el.contains(e.target)) {
      // contains can sometimes be buggy, confirm with mouse position
      const bounds = this.getWrapper().getBoundingClientRect();

      if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) {
        this.el.remove();
      }
    }
  }


  getWrapper() {
    const wrapper: any = this.el.querySelector('.apt212-popover');

    return wrapper;
  }

  getStyle() {
    let style: any = {};

    style = Object.assign(style, this.styleOverride);

    return style;
  }

  getClass() {
    let classNames: any = {
      'apt212-popover': true
    }

    let bindClass = 'bind-' + this.bindTo.popover.replace(/ /g, '-');

    classNames[bindClass] = true;

    return classNames;
  }

  /**
   * TODO - all the positioning options
   */

  positionTargetBottomLeft() {
    let bounds = this.event.target.getBoundingClientRect();

    switch (this.bindTo.popover) {
      case 'top left': {
        this.getWrapper().style.top = `${bounds.bottom}px`;
        this.getWrapper().style.left = `${bounds.left}px`;
      }
    }
  }

  positionTargetTopRight() {
    let targetBounds = this.event.target.getBoundingClientRect();
    let popoverBounds = this.getWrapper().getBoundingClientRect();

    switch (this.bindTo.popover) {
      case 'top right': {
        const left = targetBounds.left + targetBounds.width - popoverBounds.width;
        this.getWrapper().style.top = `${targetBounds.top}px`;
        this.getWrapper().style.left = `${left}px`;
      }
    }
  }

  positionTargetTopLeft() {

  }

  positionTargetBottomRight() {

  }

  mutationObserved() {
    let popoverBounds = this.getWrapper().getBoundingClientRect();

    if (popoverBounds.width > 2 && popoverBounds.height > 2) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;

      switch (this.bindTo.target) {
        case 'bottom left': {
          this.positionTargetBottomLeft();
          break;
        }

        case 'top right': {
          this.positionTargetTopRight();
          break;
        }

        case 'top left': {
          this.positionTargetTopLeft();
          break;
        }

        case 'bottom right': {
          this.positionTargetBottomRight();
          break;
        }
      }

      this.getWrapper().classList.add('initialized');

      setTimeout(() => {
        this.getWrapper().classList.add('active');
        this.rendered = true;
      }, 0);
    }
  }


  componentDidRender() {
    const config = {
      attributes: false,
      childList: true,
      subtree: true
    };

    this.mutationObserver = new MutationObserver(() => this.mutationObserved());
    this.mutationObserver.observe(this.getWrapper(), config);

    const injectedComponent: any = Object.assign(document.createElement(this.component), this.componentProps);

    this.el.querySelector('.apt212-popover').appendChild(injectedComponent);
  }


  render () {
    return (
      <Host>
        <div class={this.getClass()} style={this.getStyle()} />
      </Host>
    )
  }
}
