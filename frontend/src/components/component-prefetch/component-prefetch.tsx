import { Component, h, Method, Element } from '@stencil/core';

export interface prefetchComponentInterface {
  tag: string,
  props?: any
}

@Component({
  tag: 'component-prefetch',
  styleUrl: 'component-prefetch.scss',
  shadow: true
})
export class ComponentPrefetch {
  @Element() el: HTMLElement;

  private delay: number = 1500;

  @Method('setDelay')
  async setDelay(delay: number) {
    this.delay = delay;
  }


  /**
   *
   * @param components an array of component information to prefetch
   *
   * [
   *  {
   *    tag: 'my-component',
   *    props: {
   *      myProp: value,
   *      otherProp, otherValue
   *    }
   *  }
   * ]
   */
  @Method('setComponents')
  async setComponents(components: prefetchComponentInterface[]) {
    setTimeout(() => {
      const container = this.el.shadowRoot.querySelector('.component-prefetch-component');

      components.forEach(c => {
        const props = c.hasOwnProperty('props') ? c.props : {};

        const component = Object.assign(document.createElement(c.tag), props);

        container.appendChild(component);

        requestAnimationFrame(() => {
          component.remove();
        });
      });
    }, this.delay);
  }


  render() {
    return <div class="component-prefetch-component" />
  }
}
