import { Component, h, Host, Prop, Element, Method } from '@stencil/core';

@Component({
  tag: 'apt212-slideover',
  styleUrl: 'apt212-slideover.scss'
})
export class Apt212Slideover {
  @Element() el: HTMLElement;
  @Prop() component!: string;
  @Prop() componentProps: any = {};
  @Prop() styleOverride: any = {};

  mutationObserver: any;
  rendered: boolean = false;
  initialized: boolean = false;

  @Method('dismiss')
  async dismiss() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    this.getWrapper().classList.remove('active');

    setTimeout(() => {
      this.el.remove();
    }, 250);
  }

  overlayDismiss(e) {
    if (e.target && e.target.classList.contains('overlay')) {
      this.dismiss();
    }
  }


  getWrapper() {
    const wrapper: any = this.el.querySelector('.slideover');

    return wrapper;
  }

  getStyle() {
    let style: any = {};

    style = Object.assign(style, this.styleOverride);

    return style;
  }

  getClass() {
    let classNames: any = {
      'apt212-slideover': true,
      overlay: true
    }

    return classNames;
  }

  mutationObserved() {
    let popoverBounds = this.getWrapper().getBoundingClientRect();

    if (popoverBounds.width > 2 && popoverBounds.height > 2) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;

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

    this.el.querySelector('.content').appendChild(injectedComponent);
  }


  render () {
    return (
      <Host>
        <div class={this.getClass()} onClick={e => this.overlayDismiss(e) }>
          <div class="slideover" style={this.getStyle()}>
              <div class="slideover-header">
                <ion-button aria-label="close" class="reset close" onClick={() => this.dismiss()}>
                  <ion-icon src="/assets/images/icons/cancel.svg" slot="icon-only" />
                </ion-button>
              </div>
              <div class="content">

              </div>
          </div>
        </div>
      </Host>
    )
  }
}
