import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-wrapper',
  styleUrl: 'app-wrapper.scss',
  shadow: true
})
export class AppWrapper {

  render() {
    return (
      <div class="app-wrapper">
          <slot />
      </div>
    );
  }
}
