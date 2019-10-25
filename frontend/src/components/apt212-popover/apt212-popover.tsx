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

  rendered: boolean = false;

  @Method('dismiss')
  async dismiss() {
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


  componentDidRender() {
    let bounds = this.event.target.getBoundingClientRect();

    const injectedComponent: any = Object.assign(document.createElement(this.component), this.componentProps);

    // @todo - currently binds to bottom-left of element, can make configurable
    this.getWrapper().style.top = `${bounds.bottom}px`;
    this.getWrapper().style.left = `${bounds.left}px`;

    this.el.querySelector('.apt212-popover').appendChild(injectedComponent);

    // settimeout is hacky, but need it to render wihtout the class first to animate it in
    setTimeout(() => {
      document.querySelector('apt212-popover .apt212-popover').classList.add('active');
      this.rendered = true;
    }, 100);
  }


  render () {
    return (
      <Host>
        <div class="apt212-popover">
        </div>
      </Host>
    )
  }
}
